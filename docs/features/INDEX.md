```
docs/features/
    │
    ├── INDEX.md               ← this file (feature doc index)
    ├── auto-capture.md        ← PARTIAL: ~10% extraction, not calibrated in prod
    ├── real-time-intercept.md ← PARTIAL: non-interactive paths only
    ├── calibrator-v2.md       ← PARTIAL: 0 adjustments in prod
    ├── team-share.md          ← PARTIAL: local only, no cross-machine sync
    ├── multi-tool.md          ← PARTIAL: MCP/Cursor NOT YET
    └── planned/               ← PLANNED stubs (Phase 2–6, no code)
        ├── mcp-server.md
        ├── cursor-compiler.md
        ├── cross-machine-sync.md
        └── session-monitor.md
```

# Features Index

Per-feature docs. Each follows the 6-section template
(`Goal`, `Status`, `How it works`, `How to verify`, `Known limitations`, `Links`)
and stays ≤ 180 lines.

For the **full feature inventory across all maturity tiers** (VERIFIED + WIP + PLANNED +
MISSING, 49 total), see [`docs/PRODUCT-FEATURES.md`](../PRODUCT-FEATURES.md).

## Shipped / WIP feature docs

| Feature | Status | One-liner | Doc |
|---------|--------|-----------|-----|
| Auto-capture correction moments | PARTIAL | Auto-extracts corrections at Stop — ~10% extraction rate, calibration never ran in prod | [auto-capture.md](auto-capture.md) |
| Real-time intercept (PreToolUse) | PARTIAL | Intercept tool calls pre-execution; non-interactive paths only verified | [real-time-intercept.md](real-time-intercept.md) |
| Calibrator v2 | PARTIAL | Self-calibrate rule confidence from usage — 0 real adjustments in prod | [calibrator-v2.md](calibrator-v2.md) |
| Team knowledge sharing | PARTIAL | personal/team/global scopes local only; cross-machine sync is Phase 4 NOT YET | [team-share.md](team-share.md) |
| Multi-tool adaptation | PARTIAL | PreToolUse/Stop/AttributionBus live; MCP Server NOT YET; Cursor compiler NOT YET | [multi-tool.md](multi-tool.md) |

## Planned feature stubs (no code yet)

| Feature | Phase | Status | Doc |
|---------|-------|--------|-----|
| MCP Server (`check_pitfall` from IDE) | 2 | PLANNED | [planned/mcp-server.md](planned/mcp-server.md) |
| Session Monitor (live in-session warnings) | 2 | PLANNED | [planned/session-monitor.md](planned/session-monitor.md) |
| Cursor `.cursorrules` compiler | 6 | PLANNED | [planned/cursor-compiler.md](planned/cursor-compiler.md) |
| Cross-machine git-sync for team knowledge | 4 | PLANNED | [planned/cross-machine-sync.md](planned/cross-machine-sync.md) |

## Missing verify scripts

4 of 5 shipped feature docs lack a `verify-canned-answer.sh`:
- `auto-capture.md` — no verify script
- `real-time-intercept.md` — no verify script
- `calibrator-v2.md` — no verify script
- `team-share.md` — no verify script
- `multi-tool.md` — has verify script ✅

When asked _"how does feature X work?"_ — pick the matching row, open the
doc, summarise from `Status` + `How it works`.
