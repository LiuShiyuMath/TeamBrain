import { execSync } from "node:child_process";
import type { TeamRuleFile } from "@teamagent/core";
import { FsTeamRuleStore } from "@teamagent/adapters/m5/fs-team-rule-store";
import { mergeLwwBatch } from "@teamagent/core";

export interface M5DeleteOptions {
  projectRoot: string;
  ruleId: string;
  /** 谁来删（默认 git config user.name） */
  deletedBy?: string;
  /** 删除理由（可选） */
  reason?: string;
  now?: string;
}

export interface M5DeleteResult {
  rule_id: string;
  written_path: string;
  original_author: string;
  /** 是否已经存在 tombstone（这次只是新建一个新的 claim） */
  was_already_tombstoned: boolean;
}

export async function runM5Delete(
  opts: M5DeleteOptions
): Promise<M5DeleteResult> {
  const store = new FsTeamRuleStore();
  const claims = await store.listAll(opts.projectRoot);
  const merged = mergeLwwBatch(claims);
  const cur = merged.get(opts.ruleId);

  // 沿用 lineage：原 author 不变；如果完全没找到，用 deletedBy 做默认 author
  const deletedBy =
    opts.deletedBy ?? gitUserName() ?? "unknown";
  const originalAuthor = cur?.original_author ?? deletedBy;
  const now = opts.now ?? new Date().toISOString();

  const tomb: TeamRuleFile = {
    rule_id: opts.ruleId,
    author: originalAuthor,
    current: {
      deleted: true,
      deleted_by: deletedBy,
      deleted_ts: now,
      ...(opts.reason ? { reason: opts.reason } : {}),
    },
  };

  await store.writeRule(opts.projectRoot, deletedBy, tomb);

  return {
    rule_id: opts.ruleId,
    written_path: `.teamagent/team/${deletedBy}/${opts.ruleId}.json`,
    original_author: originalAuthor,
    was_already_tombstoned:
      cur?.winner !== undefined && cur.winner.deleted === true,
  };
}

function gitUserName(): string | null {
  try {
    return execSync("git config user.name", { encoding: "utf8" }).trim() || null;
  } catch {
    return null;
  }
}

export function parseM5DeleteArgs(args: readonly string[]): M5DeleteOptions {
  const opts: M5DeleteOptions = { projectRoot: process.cwd(), ruleId: "" };
  for (let i = 0; i < args.length; i++) {
    const a = args[i];
    if (a === undefined) continue;
    const take = (flag: string): string | undefined => {
      if (a === flag) return args[++i];
      if (a.startsWith(flag + "=")) return a.slice(flag.length + 1);
      return undefined;
    };
    const r = take("--project-root");
    if (r !== undefined) {
      opts.projectRoot = r;
      continue;
    }
    const id = take("--rule-id");
    if (id !== undefined) {
      opts.ruleId = id;
      continue;
    }
    const by = take("--by");
    if (by !== undefined) {
      opts.deletedBy = by;
      continue;
    }
    const reason = take("--reason");
    if (reason !== undefined) {
      opts.reason = reason;
      continue;
    }
    const ts = take("--now");
    if (ts !== undefined) {
      opts.now = ts;
      continue;
    }
  }
  return opts;
}

export function renderM5DeleteResult(r: M5DeleteResult): string {
  const lines = [
    `[m5-delete] rule_id=${r.rule_id} 已写 tombstone`,
    `  写入: ${r.written_path}`,
    `  原作者 (lineage): ${r.original_author}`,
  ];
  if (r.was_already_tombstoned) {
    lines.push(`  (注：该规则之前已是 tombstone；本次写入新的 ts 形成新 claim)`);
  }
  return lines.join("\n");
}
