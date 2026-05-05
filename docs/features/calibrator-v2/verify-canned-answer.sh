#!/usr/bin/env bash
# Calibrator v2 feature verification gate.
# Runs prod-judge.sh if it exists, else falls back to run-judge.sh.
# Asserts exit 0, then echoes VERIFIED.
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

if [[ -f "$SCRIPT_DIR/prod-judge.sh" ]]; then
  bash "$SCRIPT_DIR/prod-judge.sh"
  EXIT_CODE=$?
else
  bash "$SCRIPT_DIR/run-judge.sh"
  EXIT_CODE=$?
fi

if [[ $EXIT_CODE -ne 0 ]]; then
  echo "FAILED: calibrator-v2 judge exited $EXIT_CODE" >&2
  exit 1
fi

echo "VERIFIED: calibrator-v2 prod loop PASS"
