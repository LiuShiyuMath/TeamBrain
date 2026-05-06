import { mergeLwwBatch, type MergeResult } from "@teamagent/core";
import { FsTeamRuleStore } from "@teamagent/adapters/m5/fs-team-rule-store";

export interface M5SyncOptions {
  projectRoot: string;
}

export interface M5SyncResult {
  total_claims: number;
  /** 经 LWW 合并后的状态：rule_id → effective state */
  merged: Array<{
    rule_id: string;
    state: "alive" | "tombstone";
    winner_claim_author: string;
    original_author: string;
    /** alive 时 content 摘要（前 60 字符） */
    summary?: string;
  }>;
}

export async function runM5Sync(opts: M5SyncOptions): Promise<M5SyncResult> {
  const store = new FsTeamRuleStore();
  const claims = await store.listAll(opts.projectRoot);
  const merged = mergeLwwBatch(claims);

  const out: M5SyncResult["merged"] = [];
  for (const [ruleId, mr] of merged) {
    out.push(formatMerged(ruleId, mr));
  }
  out.sort((a, b) => a.rule_id.localeCompare(b.rule_id));

  return { total_claims: claims.length, merged: out };
}

function formatMerged(
  ruleId: string,
  mr: MergeResult
): M5SyncResult["merged"][number] {
  const w = mr.winner;
  if (!w) {
    return {
      rule_id: ruleId,
      state: "tombstone",
      winner_claim_author: mr.winner_claim_author ?? "",
      original_author: mr.original_author ?? "",
    };
  }
  if (w.deleted) {
    return {
      rule_id: ruleId,
      state: "tombstone",
      winner_claim_author: mr.winner_claim_author ?? "",
      original_author: mr.original_author ?? "",
    };
  }
  return {
    rule_id: ruleId,
    state: "alive",
    winner_claim_author: mr.winner_claim_author ?? "",
    original_author: mr.original_author ?? "",
    summary: w.content.slice(0, 60),
  };
}

export function parseM5SyncArgs(args: readonly string[]): M5SyncOptions {
  const opts: M5SyncOptions = { projectRoot: process.cwd() };
  for (let i = 0; i < args.length; i++) {
    const a = args[i];
    if (a === undefined) continue;
    if (a === "--project-root") {
      opts.projectRoot = args[++i] ?? process.cwd();
    } else if (a.startsWith("--project-root=")) {
      opts.projectRoot = a.slice("--project-root=".length);
    }
  }
  return opts;
}

export function renderM5SyncResult(r: M5SyncResult): string {
  const lines: string[] = [];
  lines.push(
    `[m5-sync] 读到 ${r.total_claims} 个 claim，合并为 ${r.merged.length} 条规则。`
  );
  for (const m of r.merged) {
    if (m.state === "alive") {
      lines.push(
        `  ✓ ${m.rule_id} (claim=${m.winner_claim_author}, original=${m.original_author}): ${m.summary}`
      );
    } else {
      lines.push(
        `  ✗ ${m.rule_id} (tombstone by ${m.winner_claim_author}, original=${m.original_author})`
      );
    }
  }
  return lines.join("\n");
}
