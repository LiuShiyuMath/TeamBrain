```
 ____  ____  ___  ____  _  _  ___  ____    ____  ____  __   ____  _  _  ____  ____  ____
(  _ \(  _ \/ _ \(  _ \/ )( \/ __)(_  _)  (  __)(  __)(  ) (  __)/ )( \(  _ \(  __)/ ___)
 ) __/ )   /( (_) )) __/) \/ (( (__  )(    ) _)  ) _)  )(   ) _) ) \/ ( )   / ) _) \___ \
(__)  (__\_) \___/(__)  \____/ \___)  (__)  (__)  (____)(__) (____)\____/(__\_)(____)(____/

VERIFIED ──► WIP/PARTIAL ──► PLANNED ──► MISSING
    9            14             22           4
```

# TeamBrain Product Feature Inventory

Complete feature list across all maturity tiers. Counts: VERIFIED=9, WIP/PARTIAL=14,
PLANNED=22, MISSING=4, Total=49.

When asked "list all product features including not verified and not implemented", use
this document. The `product-features` canned-answer (CEO/VC deck) covers VERIFIED-only;
this doc covers everything.

---

## VERIFIED (9) — running in prod, verify scripts pass

| Feature | Evidence |
|---------|----------|
| Product menu opens; system is not an empty shell | `docs/ship-status/2026-05-03-ceo-duck-ship-status.csv` |
| Minimum learning loop: record → compile → attribute, demoable end-to-end | ship-status CSV (`pnpm teamagent skeleton-demo`) |
| AI warned before repeating known mistake; wrong moves blocked pre-execution | ship-status CSV (positiveTriggerRate=1, falsePositiveRate=0) |
| Correct AI once; system remembers and reuses that lesson automatically | ship-status CSV (correctionsFound=3, learnedRules=3, skillsExported=true) |
| Useful knowledge grows more trusted; stale knowledge auto-demoted | ship-status CSV (calibration loop verified) |
| Visible stats: count of learnings, layers, recent additions | ship-status CSV (`teamagent stats`) |
| User can proactively record a pitfall without waiting for AI to fail | ship-status CSV (`pitfall --non-interactive`) |
| Safe sandbox: test changes in isolation before touching main workspace (Tier 2/3) | `docs/dogfood/verify-canned-answer.sh` |
| Stable canned-answer rules: 9 triggers (postpr/dogfood/bugreport/fastprobe/etc.) | `docs/rule-verify/INDEX.md` |

---

## WIP / PARTIAL (14) — code exists, known gaps or failures

| Feature | Evidence | Known Gap |
|---------|----------|-----------|
| Auto-capture corrections from every session | `docs/features/auto-capture.md` | ~10% extraction rate; not calibrated in prod |
| Knowledge confidence self-calibrates from real usage | `docs/features/calibrator-v2.md` | 0 adjustments in prod; no e2e verify |
| Silent background learning while devs use Claude Code | ship-status CSV | no clean install-to-run verify |
| Three-layer knowledge scope: personal / team / global | `docs/features/team-share.md` | local-only; review/privacy gates open |
| Team-scope knowledge visible to teammates on same project | `docs/features/team-share.md` | cross-machine sync not built |
| Multi-tool: Cursor + MCP Server receive team rules | `docs/features/multi-tool.md` | Cursor compiler NOT YET; MCP NOT YET (Phase 2) |
| Environment health check shows team what is ready | ship-status CSV | `hook-registered` check fails |
| Full-feature sandbox E2E covers all user scenarios | `sandbox-all-features.test.ts` | covers non-interactive paths only |
| System scrubs sensitive data before sharing with teammates | `packages/core/src/pii/redactor.ts` | new in 5c99a61; no verify script |
| User can export/import brain knowledge between teams | `packages/cli/src/commands/team-transfer.ts` | new in 5c99a61; no e2e verify |
| `dashboard` command wired in CLI | `packages/cli/src/bin.ts` | undeclared; not in PRESHIP |
| `pr-cycle` / `bug-report` / `dogfood-report` commands wired in CLI | `packages/cli/src/bin.ts` | undeclared; not in PRESHIP |
| `reclassify` command wired in CLI | `packages/cli/src/bin.ts` | no test; undeclared |
| `init` command stubbed; `migrate-v6` semantic upgrade wired | `packages/cli/src/bin.ts` | stub / no real impl for `init` |

---

## PLANNED (22) — roadmap only, no implementation code

### Phase 2
| Feature | Source |
|---------|--------|
| AI MCP `check_pitfall` — real-time pitfall lookup from IDE | Phase 2 roadmap |
| Session Monitor: live in-session warnings as user types | Phase 2 roadmap |
| SQLite migration for rule storage | Phase 2 roadmap |
| Calibrator v2: Wilson LB + 5-tier confidence bands | Phase 2 roadmap |
| Rule quality validator (detects low-signal/duplicate rules) | Phase 2 roadmap |
| AI override closed-loop feedback | Phase 2 roadmap |
| 6-source rule ingestion pipeline | Phase 2 roadmap |
| Embedding-based conflict detection for new rules | Phase 2 roadmap |
| Inline wiki injection into AI context | Phase 2 roadmap |
| A/B benchmark vs bare Claude / Auto-Memory / Codacy | Phase 2 roadmap |

### Phase 3
| Feature | Source |
|---------|--------|
| Live Knowledge Portal: HTTP + WebSocket UI | Phase 3 roadmap |
| `teamagent doctor` install diagnostic command | Phase 3 roadmap |
| `npm install -g teamagent` one-line install | Phase 3 roadmap |
| README + 5-min onboarding guide (zh/en) | Phase 3 roadmap |

### Phase 4
| Feature | Source |
|---------|--------|
| Cross-machine git-sync for team knowledge | Phase 4 roadmap |
| Team review gate: privacy redaction + merge workflow | Phase 4 roadmap |
| Team dashboard for shared knowledge health | Phase 4 roadmap |
| Auto-promote personal rules → team rules | Phase 4 roadmap |

### Phase 5–6
| Feature | Source |
|---------|--------|
| Internet RAG: papers, blogs, docs as rule sources | Phase 5 roadmap |
| Tech-taste extraction from team commit history | Phase 5 roadmap |
| Cursor `.cursorrules` compiler adapter | Phase 6 roadmap |
| Trae/VSCode Copilot adapter via MCP | Phase 6 roadmap |

---

## MISSING (4) — explicitly absent, no code or verify script

| Gap | Detail |
|-----|--------|
| Verify scripts for auto-capture, real-time-intercept, calibrator-v2 | 4 of 5 feature docs in `docs/features/` lack `verify-canned-answer.sh` |
| Cross-machine sync | `docs/features/team-share.md` explicitly notes NOT YET; no impl |
| Cursor `.cursorrules` compiler | Phase 6; zero source files |
| Clean install-to-run E2E (new machine onboarding) | Phase 3; no verify script or test |

---

## Biggest Known Weaknesses

1. **Auto-capture extraction ~10%** — most sessions teach nothing; core learning loop is thin.
2. **Calibrator never ran in prod** — confidence scores unvalidated against real usage.
3. **`hook-registered` check fails** — interception layer may silently miss hooks on fresh installs.
4. **MCP Server and Cursor compiler entirely unbuilt** — "multi-tool" support exists only in docs.
5. **Cross-machine team sync not implemented** — "team knowledge" is local-only, unusable for distributed teams.

See `docs/features/INDEX.md` for per-feature detail docs.
See `docs/superpowers/specs/2026-04-15-product-roadmap.md` for Phase 2–6 roadmap.
