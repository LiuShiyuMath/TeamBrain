/**
 * M5 SessionStart 集成：用户在任意 git 项目里活动时
 *   1. 自动 infect（如果项目尚未传染）
 *   2. 自动 bootstrap --apply（如果本机配置不齐）
 *   3. 自动 sync --apply（拉团队规则到本地 KB）
 *
 * 全部非阻塞、不抛错——SessionStart hook 设计契约。
 */
import * as fs from "node:fs";
import * as path from "node:path";
import { runM5Infect } from "./commands/m5-infect.js";
import { runM5Bootstrap } from "./commands/m5-bootstrap.js";
import { runM5Sync } from "./commands/m5-sync.js";

export interface M5SessionResult {
  infected: boolean;
  bootstrapped: boolean;
  synced: boolean;
  errors: string[];
}

/**
 * 检测当前用户机器是否已经"装了 TeamAgent"——按是否有用户级 knowledge.db 判断。
 * 这是"传染源"判定：只有自己装过 TA 的用户，进新项目才会自动 infect。
 */
export function userHasTeamAgent(homeDir: string): boolean {
  const dbPath = path.join(homeDir, ".teamagent", "global.db");
  return fs.existsSync(dbPath);
}

/** 当前项目是否是 git 仓库（infect 的前提）。 */
export function isGitProject(projectRoot: string): boolean {
  // worktree 时 .git 是文件，主仓库是目录——都算
  return fs.existsSync(path.join(projectRoot, ".git"));
}

/** 当前项目是否已被 infect。 */
export function isInfected(projectRoot: string): boolean {
  return fs.existsSync(path.join(projectRoot, ".teamagent", "manifest.json"));
}

/**
 * 在 SessionStart 阶段自动跑 M5 全套。降级模式：任一失败不影响其它。
 */
export async function runM5Session(input: {
  projectRoot: string;
  homeDir: string;
  /** 是否真的"传染"——默认按 userHasTeamAgent 判断 */
  shouldInfect?: boolean;
}): Promise<M5SessionResult> {
  const r: M5SessionResult = {
    infected: false,
    bootstrapped: false,
    synced: false,
    errors: [],
  };

  if (!isGitProject(input.projectRoot)) {
    return r; // 非 git 项目不动
  }

  // 1) 传染：如果当前用户是 "传染源" 且项目未被传染，自动 infect
  const shouldInfect =
    input.shouldInfect ?? userHasTeamAgent(input.homeDir);
  if (shouldInfect && !isInfected(input.projectRoot)) {
    try {
      const inf = await runM5Infect({ projectRoot: input.projectRoot });
      r.infected = !inf.skipped;
    } catch (e) {
      r.errors.push(`infect: ${(e as Error).message}`);
    }
  }

  // 2) bootstrap apply：项目已被 infect 时检查并补齐本机
  if (isInfected(input.projectRoot)) {
    try {
      const bs = await runM5Bootstrap({
        projectRoot: input.projectRoot,
        checkOnly: false,
      });
      r.bootstrapped = !!(bs.applied && bs.diff?.needs_bootstrap);
    } catch (e) {
      r.errors.push(`bootstrap: ${(e as Error).message}`);
    }
  }

  // 3) sync apply：把团队规则拉进本地 KB
  if (isInfected(input.projectRoot)) {
    try {
      const sync = await runM5Sync({
        projectRoot: input.projectRoot,
        apply: true,
      });
      r.synced =
        !!sync.applied &&
        (sync.applied.upserted.length > 0 || sync.applied.deleted.length > 0);
    } catch (e) {
      r.errors.push(`sync: ${(e as Error).message}`);
    }
  }

  return r;
}

/** 渲染成 stderr 友好的 banner（SessionStart 的输出渠道）。 */
export function renderM5SessionBanner(r: M5SessionResult): string | null {
  const parts: string[] = [];
  if (r.infected) parts.push("🦠 项目已自动 infect");
  if (r.bootstrapped) parts.push("📦 本机已自动补齐缺失项");
  if (r.synced) parts.push("🔄 已同步团队规则");
  if (r.errors.length) {
    parts.push(`⚠ M5 部分失败: ${r.errors.join("; ")}`);
  }
  if (parts.length === 0) return null;
  return `[teamagent M5] ${parts.join("，")}`;
}
