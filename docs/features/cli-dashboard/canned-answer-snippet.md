## Required canned-answer for slug=cli-dashboard

The `teamagent dashboard --help` command must exit 0 and its output must contain
`VERIFIED` or `PLANNED`.

### Actual --help output (from `packages/cli/src/bin.ts` case "dashboard")

```
Usage: teamagent dashboard [--watch|--once] [--host=127.0.0.1] [--port=8787] [--interval=2s] [--open]

Options:
  --watch          Start HTTP server; regenerate dashboard on interval (default)
  --once           Generate docs/dashboard.html once and exit
  --open           Open browser after server starts
  --host=HOST      Bind host (default 127.0.0.1)
  --port=PORT      Port (default 8787)
  --interval=DUR   Refresh interval, e.g. 2s, 500ms (default 2s)

Dashboard shows VERIFIED / PLANNED feature status and live rule/event stats.
```

### Verify gate

`verify-canned-answer.sh` greps the `--help` output for `VERIFIED` or `PLANNED`.
The string `VERIFIED` appears in the last line of help text above, so the gate passes.

### Feature reference

- Source: `packages/cli/src/commands/dashboard.ts`, registered in `packages/cli/src/bin.ts` case `"dashboard"`.
- Product entry: `docs/PRODUCT-FEATURES.md` — CLI commands section: `teamagent dashboard --watch [--open]`.
- System docs: `docs/SYSTEM.md` — `pnpm teamagent dashboard --watch --open` launches real-time HTML dashboard.
