# Judge Playbook: Codex Raw Chat TEAMBRAIN Visibility (verify-codex-raw-chat)

> Replaces archived script `scripts/verify-codex-raw-chat.sh` per project rule
> "third-party judge harness forbidden fixed scripts; MUST use md playbook"
> (`docs/HOWTO-PLAN-PR.md` § 3b).

## Origin

- Replaced script: `docs/legacy/judge-scripts/scripts/verify-codex-raw-chat.sh`
- Original purpose: Verify that `codex exec` can read the project's AGENTS.md/CLAUDE.md and sees the TeamBrain managed block, using `gpt-5.4-mini` to answer `TEAMBRAIN_VISIBLE` vs `TEAMBRAIN_MISSING`.
- Status: **ACTIVE** (re-classified iter-5) — the underlying feature ("does `codex exec` actually read CLAUDE.md and see content we put in it?") is alive and useful. iter-4's classification as DEPRECATED was based on the assumption that the TEAMAGENT-managed block is absent by default since M4, but in this checkout the auto-managed block IS present (3 `TEAMAGENT:START` hits in CLAUDE.md, refreshed by `pnpm teamagent compile`, see commit `02c2d95`). When the managed block is present, this playbook is a real test of codex's context-loading; when it's absent (e.g. fresh checkout that hasn't run compile), the playbook gracefully SKIPs.

## §V1 RUN

Commands the MAIN agent dispatches (via subagent or `claudefast -p` probe).
Capture stdout/stderr to `evidence_dir = .judge/<run_id>/`.

- Step 1: Check whether a managed block currently exists: `grep -c 'TEAMAGENT:START' CLAUDE.md > .judge/<run_id>/managed-block-check.txt 2>&1; echo $? > .judge/<run_id>/managed-block.exit`
- Step 2: Run `codex exec -C . -m gpt-4o-mini --json -o .judge/<run_id>/last-message.txt "Read the project instructions. If you can see a TeamAgent or TeamBrain managed block, answer exactly TEAMBRAIN_VISIBLE. Otherwise answer TEAMBRAIN_MISSING." > .judge/<run_id>/codex-stream.jsonl 2>&1; echo $? > .judge/<run_id>/codex.exit`
- Step 3: `grep -c TEAMBRAIN_VISIBLE .judge/<run_id>/last-message.txt > .judge/<run_id>/visible-check.txt 2>&1; echo $? > .judge/<run_id>/visible.exit`

## §V2 DUMP

Canonical JSON written to `.judge/<run_id>/judge.json`:

```json
{
  "exit_code": 1,
  "metrics": {
    "managed_block_present": false,
    "codex_exec_exit_code": 0,
    "teambrain_visible_in_response": false,
    "model_used": "gpt-4o-mini"
  },
  "evidence_dir": ".judge/<run_id>",
  "stdout_path": ".judge/<run_id>/codex-stream.jsonl",
  "stderr_path": ".judge/<run_id>/last-message.txt",
  "feature_status": "active"
}
```

## §V3 READ

LLM judge prompt (run via `claudefast -p`):

> Read `.judge/<run_id>/judge.json` and supporting evidence in
> `evidence_dir`. Emit verdict `PASS` / `FAIL` / `SKIP`. Criteria:
>
> - **PASS** if `managed_block_present == true` AND `codex_exec_exit_code == 0` AND `teambrain_visible_in_response == true`. The managed block is present in CLAUDE.md and codex correctly read and reported it.
> - **FAIL** if `managed_block_present == true` AND `codex_exec_exit_code == 0` AND `teambrain_visible_in_response == false`. The managed block is present but codex didn't see it — context-loading regression (codex no longer reads CLAUDE.md, or the managed-block content changed in a way that makes it undetectable).
> - **SKIP** if `managed_block_present == false`. This checkout doesn't have a managed block compiled into CLAUDE.md (e.g. fresh clone before running `pnpm teamagent compile --legacy-claude-md`); the playbook is not applicable. Record reason `managed block absent in this checkout`.
> - **SKIP** if `codex_exec_exit_code != 0` (codex CLI unavailable, auth failure, or model unreachable). Record stderr in evidence.

## Notes

- Original logic summary: The script ran `codex exec` with a binary-answer prompt — if the Codex model could see the managed block in the project's context, it answered `TEAMBRAIN_VISIBLE`; otherwise `TEAMBRAIN_MISSING`. The check `grep -q "TEAMBRAIN_VISIBLE"` determined pass/fail. The model name `gpt-5.4-mini` in the original script may be a placeholder; substitute the current default Codex model.
- Known limitations / dependencies:
  - Requires `codex` CLI on PATH.
  - The managed block (`TEAMAGENT:START` ... `TEAMAGENT:END`) is no longer written to CLAUDE.md by default; `pnpm teamagent compile --legacy-claude-md` would restore it.
  - PASS is unreachable in current default state; SKIP is the correct verdict per current project configuration.
  - Model name `gpt-5.4-mini` used in original may not exist; use `gpt-4o-mini` or current Codex default.

## Phase 2 fix log
Resolved 2026-05-08: #9 (P3) rewrote §V3 SKIP/FAIL logic: removed `managed_block_present` gate; SKIP now triggers when `TEAMAGENT:START` is absent from CLAUDE.md (deletion confirmed, expected path); FAIL triggers when trigger phrase regresses back. Commit fee007b.

Re-resolved 2026-05-08 (iter-5): the iter-4-era fix had the same root bug as the canned-answers/teamwork playbooks — `TEAMAGENT:START` is the *opening marker* of the auto-managed learned-knowledge block (refreshed by `pnpm teamagent compile`, see commit `02c2d95`), not a deleted canned-answer trigger. It returns 3 hits in current CLAUDE.md, so the iter-4 fix's "SKIP if absent / FAIL if present" logic was inverted relative to reality. iter-5 reclassified Status as **ACTIVE**: this playbook now tests whether codex actually reads CLAUDE.md when the managed block IS present (PASS), with explicit SKIP for checkouts that haven't compiled the block. See iter-5 review commit.
