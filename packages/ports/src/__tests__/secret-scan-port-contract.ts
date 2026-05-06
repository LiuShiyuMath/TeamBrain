import { describe, it, expect } from "vitest";
import type { SecretScanPort } from "../secret-scan-port.js";

/**
 * SecretScanPort 契约：黄金集——这些必须命中或必须放行。
 */
export function runSecretScanPortContract(
  factory: () => SecretScanPort
): void {
  describe("SecretScanPort contract", () => {
    const port = factory();

    // ===== 必须命中 =====
    const mustHit: Array<{ name: string; text: string; kind: string }> = [
      {
        name: "absolute path /Users/",
        text: "数据库密码在 /Users/alice/.config/db.json",
        kind: "absolute_path",
      },
      {
        name: "absolute path C:\\Users\\",
        text: "config 在 C:\\Users\\alice\\app\\settings.toml",
        kind: "absolute_path",
      },
      {
        name: "absolute path /home/",
        text: "see /home/bob/secrets.env",
        kind: "absolute_path",
      },
      {
        name: "email",
        text: "联系 alice@example.com 拿到了 token",
        kind: "email",
      },
      {
        name: "openai sk- token",
        text: "API key=sk-abcdef1234567890ABCDEFghijkl",
        kind: "api_token",
      },
      {
        name: "github gh_pat",
        text: "PAT: ghp_aaaaBBBBccccDDDDeeeeFFFFggggHHHHiiii",
        kind: "api_token",
      },
      {
        name: "slack xoxb",
        text: "slack hook xoxb-123-456-abcdefghijklmnopq",
        kind: "api_token",
      },
      {
        name: "JWT three-segment",
        text: "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c",
        kind: "jwt",
      },
    ];

    for (const c of mustHit) {
      it(`HITS: ${c.name}`, async () => {
        const r = await port.scan(c.text);
        expect(r.hit, `expected ${c.kind} to hit on: ${c.text}`).toBe(true);
        expect(r.matches.some((m) => m.kind === c.kind)).toBe(true);
      });
    }

    // ===== 必须放行 =====
    const mustPass: Array<{ name: string; text: string }> = [
      {
        name: "纯流程经验",
        text: "PR 合并后必须跑 codex review 直到 silent",
      },
      {
        name: "代码模式建议",
        text: "用 readonly 修饰参数，避免意外修改",
      },
      {
        name: "项目级约定",
        text: "新增 Port 必须先写契约测试再写实现",
      },
      {
        name: "短小 token-like 正常单词",
        text: "把 commit message 里的 fix 改成 feat",
      },
    ];

    for (const c of mustPass) {
      it(`PASSES: ${c.name}`, async () => {
        const r = await port.scan(c.text);
        expect(r.hit, `expected pass for: ${c.text}, but matches=${JSON.stringify(r.matches)}`).toBe(false);
      });
    }
  });
}
