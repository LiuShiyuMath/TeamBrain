export type SensitiveFindingKind =
  | "email"
  | "secret"
  | "uuid"
  | "private-ip"
  | "internal-host"
  | "private-path";

export interface SensitiveFinding {
  kind: SensitiveFindingKind;
  match: string;
}

const PATTERNS: Array<{ kind: SensitiveFindingKind; pattern: RegExp }> = [
  { kind: "email", pattern: /\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b/gi },
  {
    kind: "secret",
    pattern: /\b(?:Authorization:\s*Bearer\s+[^\s"']+|[A-Z0-9_]*(?:TOKEN|SECRET|API_KEY|PASSWORD)[A-Z0-9_]*=[^\s"']+|sk-ant-[A-Za-z0-9._-]+|sk-[A-Za-z0-9]{20,}|gh[pousr]_[A-Za-z0-9_]{20,})\b/gi,
  },
  {
    kind: "uuid",
    pattern: /\b[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}\b/gi,
  },
  {
    kind: "private-ip",
    pattern: /\b(?:10|192\.168|172\.(?:1[6-9]|2[0-9]|3[01]))\.(?:[0-9]{1,3}\.){1,2}[0-9]{1,3}\b/g,
  },
  {
    kind: "internal-host",
    pattern: /\b[a-z0-9-]+(?:\.[a-z0-9-]+)*\.(?:internal|corp|local|lan)\b/gi,
  },
  {
    kind: "private-path",
    pattern: /(?:\/Users\/[^\s"'`]+|\/home\/[^\s"'`]+|[A-Za-z]:\\Users\\[^\s"'`]+)/g,
  },
];

export function detectSensitiveText(text: string): SensitiveFinding[] {
  const findings: SensitiveFinding[] = [];
  for (const { kind, pattern } of PATTERNS) {
    pattern.lastIndex = 0;
    for (const match of text.matchAll(pattern)) {
      if (match[0]) findings.push({ kind, match: match[0] });
    }
  }
  return findings;
}

export function redactSensitiveText(text: string): string {
  let redacted = text;
  for (const { pattern } of PATTERNS) {
    pattern.lastIndex = 0;
    redacted = redacted.replace(pattern, "[redacted]");
  }
  return redacted;
}
