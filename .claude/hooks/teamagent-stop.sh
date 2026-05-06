#!/bin/bash
# B-103: TeamAgent Stop hook shim — committed to project-shared
# .claude/settings.json so a fresh clone of this repo gets the teamagent
# learning loop (analyze → calibrate → compile) wired up by default,
# without requiring developers to remember `teamagent install-hook`.
#
# The hook script is portable: it does not hard-code an absolute path.
# Instead it tries known binary locations in priority order:
#
#   1. <repo>/packages/cli/dist/bin-stop.cjs   (dev mode after `pnpm build`)
#   2. <repo>/packages/teamagent/dist/bin-stop.cjs   (alternative dev build)
#   3. $(npm root -g)/teamagent/dist/bin-stop.cjs    (global teamagent install)
#
# If none are found (e.g. fresh clone, no `pnpm build` yet, no global
# install), the hook silently exits 0 — never blocks session close.
# Once any of the three become available the hook starts working
# automatically, with no settings change.

set -uo pipefail

# Read hook payload up front; we may forward it to the chosen binary
INPUT=$(cat)

resolve_project_dir() {
  if [[ -n "${CLAUDE_PROJECT_DIR:-}" ]]; then
    printf '%s' "$CLAUDE_PROJECT_DIR"
    return
  fi
  cd "$(dirname "${BASH_SOURCE[0]}")/../.." 2>/dev/null && pwd
}

PROJECT_DIR="$(resolve_project_dir)"

CANDIDATES=()
if [[ -n "$PROJECT_DIR" ]]; then
  CANDIDATES+=("$PROJECT_DIR/packages/cli/dist/bin-stop.cjs")
  CANDIDATES+=("$PROJECT_DIR/packages/teamagent/dist/bin-stop.cjs")
fi

# Resolve npm global root (cross-platform: works on Windows/macOS/Linux as
# long as npm is on PATH). Failures are non-fatal — we just skip this
# candidate. `2>/dev/null` swallows the typical "npm command not found".
NPM_GLOBAL_ROOT=$(npm root -g 2>/dev/null || echo "")
if [[ -n "$NPM_GLOBAL_ROOT" ]]; then
  CANDIDATES+=("$NPM_GLOBAL_ROOT/teamagent/dist/bin-stop.cjs")
fi

for BIN in "${CANDIDATES[@]}"; do
  if [[ -f "$BIN" ]]; then
    printf '%s' "$INPUT" | node "$BIN" || true
    exit 0
  fi
done

# Nothing found — silently exit 0 so we never block session close.
# Developers who want the learning loop should run `pnpm build` (dev) or
# `npm install -g <release tarball>` (production).
exit 0
