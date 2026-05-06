## Required canned-answer for slug=calibrator-v2

```
Calibrator v2 — Confidence / Demerit Calibration Loop
======================================================

Feature:
  pnpm teamagent calibrate
  Reads events from .teamagent/events.db + rules from .teamagent/knowledge.db,
  adjusts rule confidence (promote rules with positive signals, demote rules with
  negative signals), writes changes back to SQLite stores.

Harness: prod-judge.sh (preferred) or run-judge.sh (fallback)

prod-judge.sh (TRUE prod e2e — 5 steps):
  1. Seed: _prod-seed.ts → inserts test rules + feedback events into isolated SQLite
  2. Pre-snapshot: _snap.ts → exports current confidence values to pre.json
  3. Capture structured JSON: _calibrate.ts → runs executeCalibrate(), writes calibrate-cli.json
  4. Post-snapshot: _snap.ts → exports post-calibration confidence to post.json
  5. Mechanical assert: _prod-judge.ts → reads pre/post/cal JSON, asserts:
       - rules_demoted >= 1   (at least one rule confidence DECREASED)
       - rules_promoted >= 1  (at least one rule confidence INCREASED)
       - adjustments_total >= 2
     Emits judge.json with fields: rules_demoted, rules_promoted, adjustments_total,
       pass (bool), run_id, evidence_dir

run-judge.sh (same flow, uses _seed.ts instead of _prod-seed.ts):
  Same 5 steps but with labeled fixture data.

Isolation:
  All SQLite paths are under tmp/.judge/calib-prod/<run_id>/
  HOME override ensures os.homedir() points to isolated dir.

Judge output: .judge/calib-prod/<run_id>/judge.json
  Fields: run_id, rules_demoted, rules_promoted, adjustments_total, pass,
          evidence_dir, pre_stats_path, post_stats_path

Run:    bash docs/features/calibrator-v2/prod-judge.sh
     OR bash docs/features/calibrator-v2/run-judge.sh
Verify: bash docs/features/calibrator-v2/verify-canned-answer.sh
```
