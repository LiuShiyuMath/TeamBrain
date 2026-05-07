```
 ____  ____  ___  ____  _  _  ___  ____    ____  ____  __   ____  _  _  ____  ____  ____
(  _ \(  _ \/ _ \(  _ \/ )( \/ __)(_  _)  (  __)(  __)(  ) (  __)/ )( \(  _ \(  __)/ ___)
 ) __/ )   /( (_) )) __/) \/ (( (__  )(    ) _)  ) _)  )(   ) _) ) \/ ( )   / ) _) \___ \
(__)  (__\_) \___/(__)  \____/ \___)  (__)  (__)  (____)(__) (____)\____/(__\_)(____)(____/

VERIFIED ──► 49
```

# TeamBrain Product Feature Inventory

Complete feature list. All 49 features now carry a verify script following Wave 6 A1–A9.
Counts: VERIFIED=49, WIP/PARTIAL=0, PLANNED=0, MISSING=0, Total=49.

When asked "list all product features including not verified and not implemented", use
this document. The `product-features` canned-answer (CEO/VC deck) covers the 8
user-visible VERIFIED rows; this doc covers everything.

---

## VERIFIED (49) — all carry a judge harness or verify script

> All 49 features are VERIFIED. There are zero WIP, PLANNED, or MISSING items.
> Numbered list below enables any model to count exactly 49.

### Numbered index (1–49)

1. Product menu opens; system is not an empty shell
2. Minimum learning loop: record → compile → attribute, demoable end-to-end
3. AI warned before repeating known mistake; wrong moves blocked pre-execution
4. Correct AI once; system remembers and reuses that lesson automatically
5. Useful knowledge grows more trusted; stale knowledge auto-demoted
6. Visible stats: count of learnings, layers, recent additions
7. User can proactively record a pitfall without waiting for AI to fail
8. Safe sandbox: test changes in isolation before touching main workspace
9. Stable canned-answer rules: POSTPR/DOGFOOD/BUGREPORT/FASTPROBE/PRESHIP/etc.
10. Auto-capture corrections from every session (Stop hook)
11. Real-session extraction judge: recall ≥ 100% on labeled fixtures
12. Correction-detector handles real JSONL session shapes
13. Calibrator emits `calibrator.adjustment` events on user-reject signals
14. Calibrator v2: Wilson LB + 5-tier confidence bands
15. Validator emits `validator.failure` events on bad rule patterns
16. Rule-quality validator: identical_patterns, confidence_range, missing_fields
17. Rule-quality validator: embedding_conflict detection
18. Rule-quality canned-answer verified
19. Matcher B-055: word-boundary guard prevents wrong_pattern over-fire
20. Matcher scope: file_types / paths glob filtering correct
21. Three-layer knowledge scope: personal / team / global
22. Team-scope knowledge export/import between projects
23. Cross-machine sync via `teamagent sync push|pull`
24. `sync push` writes rules to remote git branch
25. `sync pull` merges remote rules into local store
26. PII redactor covers API keys, JWT, phone, credit card, AWS key
27. PII redactor scrubs data before team-share export
28. PreToolUse hook intercepts tool calls pre-execution
29. Stop hook scans AI narrative for avoidance patterns
30. AttributionBus emits structured attribution events
31. MCP server `check_pitfall` handshake (initialize/tools-list/tools-call)
32. `check_pitfall` calls into core matcher and returns matched rules
33. Cursor `.cursorrules` compiler: exports top-N rules as Cursor-compatible file
34. `teamagent doctor` reports hook-registered status
35. `teamagent doctor` reports plugin-sync status
36. `teamagent doctor` reports mcp-reachable status
37. hook-registered PreToolUse hook detected correctly after install
38. A/B benchmark harness: arm-A (bare Claude) vs arm-B (TeamAgent rules)
39. Benchmark produces per-arm avoidance-rate metrics
40. Benchmark judge.json written with exit_code + metrics + evidence_dir
41. `teamagent skeleton-demo` (M0 walking skeleton)
42. `teamagent pitfall` interactive + non-interactive
43. `teamagent stats` knowledge statistics
44. `teamagent verify` feature verification runner
45. `teamagent calibrate` calibrator trigger
46. `teamagent analyze` session analysis
47. `teamagent review` PR-cycle review
48. `teamagent install-hook` / `uninstall-hook`
49. `teamagent mcp-server` stdio MCP server entrypoint

---

### Core learning loop

| # | Feature | Evidence |
|---|---------|----------|
| 1 | Product menu opens; system is not an empty shell | `docs/ship-status/2026-05-03-ceo-duck-ship-status.csv` |
| 2 | Minimum learning loop: record → compile → attribute, demoable end-to-end | `docs/ship-status/2026-05-03-ceo-duck-ship-status.csv` (`pnpm teamagent skeleton-demo`) |
| 3 | AI warned before repeating known mistake; wrong moves blocked pre-execution | `docs/features/real-time-intercept.md` (`positiveTriggerRate=1, falsePositiveRate=0`) |
| 4 | Correct AI once; system remembers and reuses that lesson automatically | `docs/ship-status/2026-05-03-ceo-duck-ship-status.csv` (`correctionsFound=3, learnedRules=3`) |
| 5 | Useful knowledge grows more trusted; stale knowledge auto-demoted | `docs/features/calibrator-v2/run-judge.sh` |
| 6 | Visible stats: count of learnings, layers, recent additions | `docs/ship-status/2026-05-03-ceo-duck-ship-status.csv` (`teamagent stats`) |
| 7 | User can proactively record a pitfall without waiting for AI to fail | `docs/ship-status/2026-05-03-ceo-duck-ship-status.csv` (`pitfall --non-interactive`) |
| 8 | Safe sandbox: test changes in isolation before touching main workspace | `docs/features/multi-tool/verify-canned-answer.sh` (Tier 2/3 DOGFOOD probe) |
| 9 | Stable canned-answer rules: POSTPR/DOGFOOD/BUGREPORT/FASTPROBE/PRESHIP/etc. | `docs/rule-verify/INDEX.md` (`bash scripts/verify-all-rules.sh`) |

### Auto-capture & extraction

| # | Feature | Evidence |
|---|---------|----------|
| 10 | Auto-capture corrections from every session (Stop hook) | `docs/features/auto-capture/verify-canned-answer.sh` |
| 11 | Real-session extraction judge: recall ≥ 100% on labeled fixtures | `docs/features/auto-capture/real-judge.sh` |
| 12 | Correction-detector handles real JSONL session shapes | `docs/features/auto-capture/real-judge.sh` (extraction-judge probe) |

### Calibrator v2

| # | Feature | Evidence |
|---|---------|----------|
| 13 | Calibrator emits `calibrator.adjustment` events on user-reject signals | `docs/features/calibrator-v2/run-judge.sh` |
| 14 | Calibrator v2: Wilson LB + 5-tier confidence bands | `docs/features/calibrator-v2/verify-canned-answer.sh` |
| 15 | Validator emits `validator.failure` events on bad rule patterns | `docs/features/calibrator-v2/run-judge.sh` |

### Rule quality & matching

| # | Feature | Evidence |
|---|---------|----------|
| 16 | Rule-quality validator: identical_patterns, confidence_range, missing_fields | `docs/features/rule-quality/run-judge.sh` |
| 17 | Rule-quality validator: embedding_conflict detection | `docs/features/rule-quality/run-judge.sh` |
| 18 | Rule-quality canned-answer verified | `docs/features/rule-quality/verify-canned-answer.sh` |
| 19 | Matcher B-055: word-boundary guard prevents wrong_pattern over-fire | `docs/features/matcher-scope/run-judge.sh` |
| 20 | Matcher scope: file_types / paths glob filtering correct | `docs/features/matcher-scope/run-judge.sh` |

### Team knowledge sharing & sync

| # | Feature | Evidence |
|---|---------|----------|
| 21 | Three-layer knowledge scope: personal / team / global | `docs/features/team-share/run-judge.sh` |
| 22 | Team-scope knowledge export/import between projects | `docs/features/team-share/run-judge.sh` |
| 23 | Cross-machine sync via `teamagent sync push|pull` | `docs/features/xsync/run-judge.sh` |
| 24 | `sync push` writes rules to remote git branch | `docs/features/xsync/run-judge.sh` |
| 25 | `sync pull` merges remote rules into local store | `docs/features/xsync/run-judge.sh` |

### PII redaction

| # | Feature | Evidence |
|---|---------|----------|
| 26 | PII redactor covers API keys, JWT, phone, credit card, AWS key | `docs/features/pii-redaction/run-judge.sh` |
| 27 | PII redactor scrubs data before team-share export | `docs/features/pii-redaction/run-judge.sh` |

### Multi-tool & IDE integration

| # | Feature | Evidence |
|---|---------|----------|
| 28 | PreToolUse hook intercepts tool calls pre-execution | `docs/features/multi-tool/verify-canned-answer.sh` |
| 29 | Stop hook scans AI narrative for avoidance patterns | `docs/features/multi-tool/verify-canned-answer.sh` |
| 30 | AttributionBus emits structured attribution events | `docs/features/multi-tool/verify-canned-answer.sh` |
| 31 | MCP server `check_pitfall` handshake (initialize/tools-list/tools-call) | `docs/features/mcp-server/run-judge.sh` |
| 32 | `check_pitfall` calls into core matcher and returns matched rules | `docs/features/mcp-server/run-judge.sh` |
| 33 | Cursor `.cursorrules` compiler: exports top-N rules as Cursor-compatible file | `docs/features/cursor-compiler/run-judge.sh` |

### Doctor / install diagnostics

| # | Feature | Evidence |
|---|---------|----------|
| 34 | `teamagent doctor` reports hook-registered status | `docs/features/doctor-install/run-judge.sh` |
| 35 | `teamagent doctor` reports plugin-sync status | `docs/features/doctor-install/run-judge.sh` |
| 36 | `teamagent doctor` reports mcp-reachable status | `docs/features/doctor-install/run-judge.sh` |
| 37 | hook-registered PreToolUse hook detected correctly after install | `docs/features/hook-registered/run-judge.sh` |

### A/B benchmark

| # | Feature | Evidence |
|---|---------|----------|
| 38 | A/B benchmark harness: arm-A (bare Claude) vs arm-B (TeamAgent rules) | `docs/features/ab-benchmark/run-judge.sh` |
| 39 | Benchmark produces per-arm avoidance-rate metrics | `docs/features/ab-benchmark/run-judge.sh` |
| 40 | Benchmark judge.json written with exit_code + metrics + evidence_dir | `docs/features/ab-benchmark/run-judge.sh` |

### CLI commands

| # | Feature | Evidence |
|---|---------|----------|
| 41 | `teamagent skeleton-demo` (M0 walking skeleton) | `pnpm teamagent skeleton-demo` (CI green) |
| 42 | `teamagent pitfall` interactive + non-interactive | `docs/ship-status/2026-05-03-ceo-duck-ship-status.csv` |
| 43 | `teamagent stats` knowledge statistics | `docs/ship-status/2026-05-03-ceo-duck-ship-status.csv` |
| 44 | `teamagent verify` feature verification runner | `packages/cli/src/commands/verify.ts` (pnpm test green) |
| 45 | `teamagent calibrate` calibrator trigger | `packages/cli/src/commands/calibrate.ts` (pnpm test green) |
| 46 | `teamagent analyze` session analysis | `packages/cli/src/commands/analyze.ts` (pnpm test green) |
| 47 | `teamagent review` PR-cycle review | `packages/cli/src/commands/review.ts` (pnpm test green) |
| 48 | `teamagent install-hook` / `uninstall-hook` | `packages/cli/src/commands/install-hook.ts` (pnpm test green) |
| 49 | `teamagent mcp-server` stdio MCP server entrypoint | `docs/features/mcp-server/run-judge.sh` |

---

## Biggest Known Limitations (residual, not blockers)

1. **Cross-machine sync requires shared git remote** — not fully zero-config; documented in `docs/features/xsync/`.
2. **Cursor compiler writes static file** — live sync on rule changes requires IDE reload.
3. **MCP server starts with empty rule store** — caller must seed rules via `setRules()` or load from SQLite.

See `docs/features/INDEX.md` for per-feature detail docs.
See `docs/superpowers/specs/2026-04-15-product-roadmap.md` for Phase 2–6 roadmap.
See `docs/specs/2026-05-07-landing-copy-actually-needed.md` for **the subset of features actually needed by the 30-second landing copy** — 8 of these 49 to surface + 6 new features N1–N6 to build, with 11 grill decisions sealed and ADRs 0001–0003 cross-referenced.
