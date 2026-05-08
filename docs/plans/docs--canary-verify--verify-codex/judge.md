# Judge Playbook: Canary Skill — Codex Registry Probe

> Replaces archived script `docs/legacy/judge-scripts/docs/canary-verify/verify-codex.sh` per rule
> "third-party judge harness forbidden fixed scripts; MUST use md playbook"
> (`docs/HOWTO-PLAN-PR.md` § 3b).

## Origin
- Replaced script: `docs/legacy/judge-scripts/docs/canary-verify/verify-codex.sh`
- Original purpose: Use `codex debug prompt-input` to capture Codex's rendered model-visible prompt and assert that the `canary` skill appears in the `### Available skills` section, confirming it is registered in Codex's in-memory skill registry.
- Status: **ACTIVE**

## §V1 RUN
Commands MAIN agent dispatches; capture stdout/stderr to `evidence_dir = .judge/<run_id>/`:

- Step 1: Confirm `codex` binary is available and capture help output.
  ```
  codex --help > .judge/<run_id>/codex.help.txt 2>&1
  ```
- Step 2: Run `codex debug prompt-input` with the canary verification prompt to render the full model-visible context including registered skills.
  ```
  codex debug prompt-input \
    "Without reading any file from disk, confirm whether you have a registered skill named exactly 'canary'. Use only your in-memory skill registry." \
    > .judge/<run_id>/codex-prompt-input.json \
    2> .judge/<run_id>/codex.stderr.log
  ```
- Step 3: Assert that the rendered prompt input contains the `### Available skills` section listing `canary` with its skill path shorthand.

  > **Note — `r0/` shorthand convention**: Codex renders skill paths using a short-form
  > alias `r0/<skill-name>/SKILL.md` rather than the absolute filesystem path. The
  > `r0/` prefix maps to repo root 0 in Codex's internal registry. Do NOT assert the
  > absolute path (e.g. `/Users/.../TeamBrain/.codex/skills/canary/SKILL.md`) — Codex
  > will not emit it and the assertion will always fail even when the skill is correctly
  > registered.

  ```bash
  # Use test(regex) instead of contains(absolute-path):
  jq -e '
    any(
      .. | objects;
      .type? == "input_text"
      and (.text? | type == "string")
      and (.text | contains("### Available skills"))
      and (.text | contains("- canary:"))
      and (.text | test("r[0-9]+/canary/SKILL\\.md"))
    )
  ' .judge/<run_id>/codex-prompt-input.json
  ```
- Step 4: Write normalized result JSON.
  ```
  # If step 3 passes:
  jq -n -S '{registered: true, name: "canary", status: "found"}' \
    > .judge/<run_id>/codex-registry.json
  # If step 3 fails:
  jq -n -S '{registered: false, name: null, status: "missing"}' \
    > .judge/<run_id>/codex-registry.json
  ```

## §V2 DUMP
Canonical JSON to `.judge/<run_id>/judge.json`:
```json
{
  "exit_code": 0,
  "metrics": {
    "skill_registered": true,
    "skill_name": "canary",
    "registry_status": "found",
    "prompt_input_contains_available_skills_section": true,
    "prompt_input_contains_canary_entry": true,
    "prompt_input_contains_skill_path_shorthand": true,
    "skill_path_shorthand_pattern": "r[0-9]+/canary/SKILL\\.md"
  },
  "evidence_dir": ".judge/<run_id>/",
  "stdout_path": ".judge/<run_id>/codex-registry.json",
  "stderr_path": ".judge/<run_id>/codex.stderr.log",
  "feature_status": "active"
}
```

## §V3 READ
`claudefast -p` prompt:
> Read `.judge/<run_id>/judge.json` and evidence in `evidence_dir`.
> Emit `PASS` / `FAIL` / `SKIP`.
> PASS criteria: `exit_code` is 0; `metrics.skill_registered` is `true`; `metrics.registry_status` is `"found"`; all prompt-input assertion metrics are `true` (including `prompt_input_contains_skill_path_shorthand`).
> FAIL criteria: `exit_code` non-zero; `skill_registered` is `false`; any prompt-input assertion metric is `false`; `codex-registry.json` is absent or malformed.
>   Note: if `prompt_input_contains_skill_path_shorthand` is false but `skill_registered` is true, the likely cause is an absolute-path assertion — switch to the `r[0-9]+/canary/SKILL\\.md` regex pattern in §V1 Step 3.
> SKIP if `codex` binary is not on PATH or `.codex/skills/canary/SKILL.md` does not exist.

## Notes
- Original logic summary: The script ran `codex debug prompt-input` to capture the full JSON of Codex's model-visible context (which includes a `### Available skills` section injected by the Codex runtime). It then used `jq` to search every `input_text` block for simultaneous presence of `"### Available skills"`, `"- canary:"`, and the skill's path. This approach avoids any model invocation; it inspects only the static prompt rendering to confirm skill registration. On success it wrote `{registered:true, name:"canary", status:"found"}`; on failure `{registered:false, name:null, status:"missing"}`.
- **`r0/` shorthand**: Codex renders skill paths as `r0/<skill-name>/SKILL.md` (or `r<N>/...` for multi-repo setups), not as absolute filesystem paths. The original script used an absolute-path assertion which always fails. The correct assertion uses `test("r[0-9]+/canary/SKILL\\.md")` in jq.
- Known dependencies / limitations:
  - Requires `codex` CLI on PATH with `debug prompt-input` subcommand support.
  - Requires `.codex/skills/canary/SKILL.md` to exist.
  - The `jq` traversal searches the full nested JSON for any matching `input_text` object; if Codex changes its prompt-input schema the path-search may need updating.
  - No model is invoked, so this verifier is fast but tests only static rendering, not runtime model behavior.

## Phase 2 fix log
Resolved 2026-05-08: #8 (P3) replaced absolute-path jq assertion with `test("r[0-9]+/canary/SKILL\\.md")` regex in §V1 Step 3; updated §V2 metric to `prompt_input_contains_skill_path_shorthand`; updated §V3 FAIL guidance; added `r0/` shorthand note. Commit de67193.
