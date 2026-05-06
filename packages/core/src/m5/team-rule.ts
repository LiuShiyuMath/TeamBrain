import type {
  TeamRuleFile,
  TeamRuleState,
  TeamRuleAlive,
} from "@teamagent/types";

export type { TeamRuleFile, TeamRuleState, TeamRuleAlive };
export type { TeamRuleTombstone } from "@teamagent/types";

/** 把 TeamRuleFile 序列化成稳定 JSON（key-sorted、2-space indent，diff 友好）。 */
export function serializeTeamRule(r: TeamRuleFile): string {
  return JSON.stringify(sortDeep(r), null, 2);
}

/** 反向：解析 JSON 字符串到 TeamRuleFile。校验最小字段。 */
export function parseTeamRule(json: string): TeamRuleFile {
  let raw: unknown;
  try {
    raw = JSON.parse(json);
  } catch (e) {
    throw new Error(`team-rule: invalid JSON: ${(e as Error).message}`);
  }
  validateTeamRule(raw as TeamRuleFile);
  return raw as TeamRuleFile;
}

export function validateTeamRule(r: TeamRuleFile): void {
  if (!r || typeof r !== "object") {
    throw new Error("team-rule: must be an object");
  }
  if (typeof r.rule_id !== "string" || r.rule_id.length === 0) {
    throw new Error("team-rule: rule_id required");
  }
  if (typeof r.author !== "string" || r.author.length === 0) {
    throw new Error("team-rule: author required");
  }
  const c = r.current as TeamRuleState;
  if (!c || typeof c !== "object") {
    throw new Error("team-rule: current required");
  }
  if (c.deleted === true) {
    if (typeof c.deleted_by !== "string") {
      throw new Error("team-rule: deleted requires deleted_by");
    }
    if (typeof c.deleted_ts !== "string") {
      throw new Error("team-rule: deleted requires deleted_ts");
    }
  } else {
    const alive = c as TeamRuleAlive;
    if (typeof alive.content !== "string") {
      throw new Error("team-rule: alive requires content");
    }
    if (typeof alive.modified_by !== "string") {
      throw new Error("team-rule: alive requires modified_by");
    }
    if (typeof alive.modified_ts !== "string") {
      throw new Error("team-rule: alive requires modified_ts");
    }
  }
}

function sortDeep(value: unknown): unknown {
  if (Array.isArray(value)) return value.map(sortDeep);
  if (value && typeof value === "object") {
    const o: Record<string, unknown> = {};
    for (const k of Object.keys(value as Record<string, unknown>).sort()) {
      o[k] = sortDeep((value as Record<string, unknown>)[k]);
    }
    return o;
  }
  return value;
}
