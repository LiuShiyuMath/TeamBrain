import { promises as fs } from "node:fs";
import * as path from "node:path";
import type {
  TeamRuleStorePort,
  TeamRuleClaim,
} from "@teamagent/ports";
import type { TeamRuleFile } from "@teamagent/types";
import { parseTeamRule, serializeTeamRule } from "@teamagent/core";

/**
 * 文件系统 TeamRuleStorePort 实现：
 *   .teamagent/team/<claim_author>/<rule_id>.json
 *
 * writeRule 用 atomic write（写 .tmp 再 rename）确保不留半文件。
 */
export class FsTeamRuleStore implements TeamRuleStorePort {
  async listAll(projectRoot: string): Promise<TeamRuleClaim[]> {
    const teamDir = path.join(projectRoot, ".teamagent", "team");
    const out: TeamRuleClaim[] = [];

    let authors: string[];
    try {
      authors = await fs.readdir(teamDir);
    } catch (e) {
      if ((e as NodeJS.ErrnoException).code === "ENOENT") return out;
      throw e;
    }

    for (const claimAuthor of authors) {
      const authorDir = path.join(teamDir, claimAuthor);
      let stat;
      try {
        stat = await fs.stat(authorDir);
      } catch {
        continue;
      }
      if (!stat.isDirectory()) continue;

      let entries: string[];
      try {
        entries = await fs.readdir(authorDir);
      } catch {
        continue;
      }
      for (const entry of entries) {
        if (!entry.endsWith(".json")) continue;
        const filePath = path.join(authorDir, entry);
        try {
          const raw = await fs.readFile(filePath, "utf8");
          const file = parseTeamRule(raw);
          out.push({ claim_author: claimAuthor, file });
        } catch {
          // 跳过非法/损坏文件，不阻塞其他规则同步
        }
      }
    }
    return out;
  }

  async readRule(
    projectRoot: string,
    claimAuthor: string,
    ruleId: string
  ): Promise<TeamRuleFile | null> {
    const p = path.join(
      projectRoot,
      ".teamagent",
      "team",
      sanitize(claimAuthor),
      `${sanitize(ruleId)}.json`
    );
    try {
      const raw = await fs.readFile(p, "utf8");
      return parseTeamRule(raw);
    } catch (e) {
      if ((e as NodeJS.ErrnoException).code === "ENOENT") return null;
      throw e;
    }
  }

  async writeRule(
    projectRoot: string,
    claimAuthor: string,
    rule: TeamRuleFile
  ): Promise<void> {
    const dir = path.join(
      projectRoot,
      ".teamagent",
      "team",
      sanitize(claimAuthor)
    );
    await fs.mkdir(dir, { recursive: true });
    const finalPath = path.join(dir, `${sanitize(rule.rule_id)}.json`);
    const tmpPath = `${finalPath}.tmp.${process.pid}.${Date.now()}`;
    const content = serializeTeamRule(rule);
    await fs.writeFile(tmpPath, content, "utf8");
    await fs.rename(tmpPath, finalPath);
  }
}

/** 把 id / author 中可能不安全的文件系统字符替换成 _。 */
function sanitize(id: string): string {
  return id.replace(/[^A-Za-z0-9._-]/g, "_");
}

/** 公开的 author 名 sanitization——CLI 调用层也可用，写 dir 前 normalize。 */
export function sanitizeAuthor(name: string): string {
  return sanitize(name);
}
