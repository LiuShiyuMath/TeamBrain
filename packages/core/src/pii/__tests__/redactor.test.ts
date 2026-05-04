import { describe, expect, it } from "vitest";
import { detectSensitiveText, redactSensitiveText } from "../redactor.js";

describe("PII redactor", () => {
  it("detects team-sharing sensitive identifiers", () => {
    const findings = detectSensitiveText([
      "owner alice@example.com",
      "Authorization: Bearer sk-ant-api03-secret",
      "host prod-db.internal",
      "path /Users/alice/acme/private.env",
      "uuid 123e4567-e89b-12d3-a456-426614174000",
      "ip 10.1.2.3",
    ].join("\n"));

    expect(findings.map((f) => f.kind)).toEqual(
      expect.arrayContaining(["email", "secret", "internal-host", "private-path", "uuid", "private-ip"]),
    );
  });

  it("redacts sensitive values without removing ordinary lesson text", () => {
    const out = redactSensitiveText(
      "Use fetch instead of axios. Contact alice@example.com; token GITHUB_TOKEN=ghp_abcdef1234567890123456.",
    );
    expect(out).toContain("Use fetch instead of axios");
    expect(out).toContain("[redacted]");
    expect(out).not.toContain("alice@example.com");
    expect(out).not.toContain("ghp_abcdef");
  });
});
