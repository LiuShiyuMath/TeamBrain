# Stop Hooks

This document describes the current stop-hook configuration for the TeamBrain project (effective after PR #106).

## Active Project-Level Stop Hook

**`.claude/settings.json` → `.claude/hooks/self-report-fused.sh`**

- Source: vendored from `user level /Users/m1/.claude/scripts/hooks/self-report-fused.sh` into the project
- Timeout: 10s
- Enforces a complete 12-field `<self-report>` block at the end of every assistant message:
  - Fields: `premature_stopping` / `permission_seeking` / `ownership_dodging` / `simplest_fix` / `reasoning_loop` / `known_limitation` / `skipped_repo_search` / `fabricated_value` / `placeholder_used` / `ambiguity_unresolved` / `contradiction_unresolved` / `silent_fallback`
- Decision logic:
  - Missing block or any field not `true`|`false` → `decision: block` + correction template
  - Any field `true` → `decision: block` + signals list (`uniform: true = bad`)
  - All fields `false` → `{"continue": true, "suppressOutput": true}`
- Log destination: `$HOME/.claude/self-report/log.jsonl`

## Per-Host Mirror

**`.claude/settings.local.json`** (gitignored, per-host) points to the same `self-report-fused.sh` script with the same 10s timeout.

## Orphaned Scripts

These scripts are still present in the git tree but are no longer wired in `settings.json`:

- `.claude/hooks/teamagent-stop.sh` — legacy TeamAgent learning loop shim (previously ran `bin-stop.cjs`)
- `.claude/hooks/laziness-self-report.sh` — legacy 6-field `<laziness-self-report>` version, superseded by the 12-field `<self-report>` format

## Other Hook Channels

These are wired via `.claude/settings.local.json` on the local host and are **not** Stop hooks:

- `PreToolUse` / `PostToolUse` / `UserPromptSubmit` → `packages/cli/dist/bin-*.cjs`

## User-Level Hook Status

The Stop hook entry in `~/.claude/settings.json` carries a `true # DISABLED 2026-05-07` prefix and does not apply to the TeamBrain project path. The active (un-disabled) version is the vendored copy at project level described above.
