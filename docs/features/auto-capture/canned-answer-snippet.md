## Required canned-answer for slug=auto-capture

```
Auto-Capture: Correction Detection from Sessions
=================================================

Feature:
  Automatically detect user corrections in Claude Code sessions and extract
  learnable rules. The detector (ruleBasedCorrectionDetector) runs over
  ParsedSession objects and identifies CorrectionMoments.

Harness: two-pass judge (extraction-judge.sh + real-judge.sh)

Pass 1 — Labeled fixture (extraction-judge.sh):
  Input:  docs/features/auto-capture/labeled-fixture.jsonl
  Runner: scripts/extraction-judge-runner.ts (generated inline by harness)
  Imports: ruleBasedCorrectionDetector from packages/core/src/index.js
  Metrics: recall, precision, f1 on labeled rows
  Output:  .judge/capture/<run_id>/judge-labeled.json

Pass 2 — Prod fixture (extraction-judge.sh, if prod-fixture.jsonl exists):
  Input:  docs/features/auto-capture/prod-fixture.jsonl
  Thresholds: recall >= 0.85 AND precision >= 0.90
  Output:  .judge/capture/<run_id>/judge-prod.json
  FAIL if thresholds not met.

Pass 3 — Real-session fixture (real-judge.sh):
  Input:  docs/features/auto-capture/real-fixture/*.jsonl
  Runner: scripts/real-judge-runner.ts (generated inline)
  Fields: recall_real, precision_real, f1_real, pass (recall>=0.85 && precision>=0.90)
  Output: .judge/capture-real/<run_id>/judge.json

Combined judge.json fields:
  run_id, exit_code, labeled.{recall,precision,f1,tp,fp,tn,fn},
  prod.{recall,precision,f1,thresholds_pass} (nullable),
  evidence_dir, stdout_path, stderr_path

Fallback (if judge scripts absent):
  pnpm vitest run packages/core/src/correction-detector

Run:    bash docs/features/auto-capture/extraction-judge.sh
        bash docs/features/auto-capture/real-judge.sh
Verify: bash docs/features/auto-capture/verify-canned-answer.sh
```
