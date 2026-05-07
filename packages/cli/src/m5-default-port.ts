/**
 * M5 共享 BootstrapPort 工厂——给 `m5-infect`、`m5-bootstrap`、`m5-status` 使用。
 *
 * 之前各命令各自 new FsBootstrap({ readTeamagentVersion: async () => null, ... })
 * 用 stub 探测器，导致 m5-status 永远报"需补齐 teamagent→x.x.x"，即使本机已装。
 *
 * 这里提供真实的探测器：
 *   - readTeamagentVersion: 从 packages/teamagent/package.json 读 self version
 *   - readInstalledHooks: parse ~/.claude/settings.json 的 hooks 字段（user-level）
 *   - readInstalledPlugins: 列 ~/.claude/plugins/installed/ 子目录
 *   - readInstalledProjectSkills: 仍 stub（M5-D2 范围）
 *
 * 探测器全部 fail-soft：读不到当 null/[] 处理，**不抛错**，避免 SessionStart hook
 * 走全链时被 IO 错误中断。
 */
import { promises as fs } from "node:fs";
import * as os from "node:os";
import * as path from "node:path";
import { fileURLToPath } from "node:url";
import { FsBootstrap } from "@teamagent/adapters/m5/fs-bootstrap";
import type { HookKind } from "@teamagent/types";

const ALL_HOOK_KINDS: HookKind[] = [
  "UserPromptSubmit",
  "PreToolUse",
  "PostToolUse",
  "Stop",
  "SessionStart",
  "SessionEnd",
  "PreCompact",
];

export function createDefaultBootstrapPort(): FsBootstrap {
  return new FsBootstrap({
    readTeamagentVersion: readSelfVersion,
    readInstalledPlugins: readInstalledPluginsImpl,
    readInstalledProjectSkills: async () => [],
    readInstalledHooks: readInstalledHooksImpl,
  });
}

/** 从 packages/teamagent/package.json 读自身版本。读不到返回 null。 */
export async function readSelfVersion(): Promise<string | null> {
  try {
    const here = path.dirname(fileURLToPath(import.meta.url));
    // 从 packages/cli/{src,dist}/ 上溯，覆盖 dev (tsx 直跑) 与 dist (打包后) 两种布局
    const candidates = [
      path.resolve(here, "..", "..", "teamagent", "package.json"),
      path.resolve(here, "..", "..", "..", "teamagent", "package.json"),
      path.resolve(here, "..", "..", "..", "..", "teamagent", "package.json"),
    ];
    for (const p of candidates) {
      try {
        const raw = await fs.readFile(p, "utf8");
        const v = (JSON.parse(raw) as { version?: string }).version;
        if (typeof v === "string" && v.length > 0) return v;
      } catch {
        /* try next */
      }
    }
  } catch {
    /* fall through */
  }
  return null;
}

/**
 * 读 user-level ~/.claude/settings.json 的 hooks 字段，返回已注册的 HookKind 列表。
 * Claude Code 把 hooks 按事件名分组：`{"hooks": {"UserPromptSubmit": [...], "Stop": [...]}}`，
 * 所以只需看哪些 key 存在就行。
 */
export async function readInstalledHooksImpl(): Promise<HookKind[]> {
  const settingsPath = path.join(os.homedir(), ".claude", "settings.json");
  try {
    const raw = await fs.readFile(settingsPath, "utf8");
    const cfg = JSON.parse(raw) as { hooks?: Record<string, unknown> };
    const hooks = cfg.hooks ?? {};
    return ALL_HOOK_KINDS.filter((k) => hooks[k] !== undefined);
  } catch {
    return [];
  }
}

/** 列 ~/.claude/plugins/installed/ 子目录名作为已装插件。读不到返回空数组。 */
export async function readInstalledPluginsImpl(): Promise<string[]> {
  const pluginsDir = path.join(os.homedir(), ".claude", "plugins", "installed");
  try {
    const entries = await fs.readdir(pluginsDir, { withFileTypes: true });
    return entries.filter((e) => e.isDirectory()).map((e) => e.name);
  } catch {
    return [];
  }
}
