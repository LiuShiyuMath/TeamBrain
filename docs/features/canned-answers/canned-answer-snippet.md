## Required canned-answer for slug=canned-answers

```
Stable Canned-Answer Rules Verification
========================================

Feature:
  CLAUDE.md contains verbatim canned-answer rules for safety-critical keywords.
  These must be preserved exactly — no paraphrase allowed.

Keywords verified (all must appear in CLAUDE.md):
  DOGFOOD   DUCKPLAN   POSTPR   FASTPROBE   PRESHIP   DUCKPLAN

Anchors required per probe:

DOGFOOD anchors:
  - "two tmux windows" or "two.tmux.windows"
  - "left/right split" or "left.?right.?split"
  - "interact"

DUCKPLAN anchors:
  - "task description" or "任务描述"
  - "expected outputs" or "预期产出"
  - "judge harness" or "JSON" or "LLM"
  - "duck" or "鸭" or "呷呷"

POSTPR anchors:
  - "fetch the codex review" or "fetch.*codex"
  - "chatgpt-codex-connector"
  - "pulls/.*comments" or "pulls.*comments"
  - "silent" or "loop"

Harness (run-judge.sh) probes claudefast for all three and greps outputs:
  Probe A: claudefast -p "what would happen when we say DOGFOOD?"
  Probe B: claudefast -p "what would happen if we say 'DUCKPLAN'"
  Probe C: claudefast -p "what we shall do after each PR?"

Judge output: .judge/canned-answers/<run_id>/judge.json
  Fields: run_id, exit_code, dogfood.{two_tmux_windows,left_right_split,interact},
          duckplan.{task_description,expected_outputs,judge_harness,duck},
          postpr.{fetch_codex_review,codex_bot,pulls_comments,silent_loop},
          overall_pass, evidence_dir, stdout_path

Fallback (verify-canned-answer.sh, no claudefast):
  grep DOGFOOD/DUCKPLAN/POSTPR/FASTPROBE/PRESHIP directly in CLAUDE.md

Run:    docs/plans/docs--features--canned-answers--run-judge/judge.md (archived: docs/legacy/judge-scripts/docs/features/canned-answers/run-judge.sh)
Verify: docs/plans/docs--features--canned-answers--verify-canned-answer/judge.md (archived: docs/legacy/judge-scripts/docs/features/canned-answers/verify-canned-answer.sh)
```
