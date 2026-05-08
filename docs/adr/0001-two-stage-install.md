---
Status: accepted
Date: 2026-05-07
Revised: 2026-05-07 (split into V1 vector-deps-absent default + opt-in install; npm 10 quirk discovered)
Implementation:
  - packages/teamagent/package.json (@xenova/transformers + onnxruntime-node REMOVED from deps; install fits ~3s)
  - release/install.sh (default = tarball only; TEAMAGENT_INCLUDE_OPTIONAL=1 = explicit multi-package install)
  - packages/teamagent/postinstall.mjs (vectorOptionalsInstalled detection; Stage 2 detached when present, skipped when absent)
  - packages/cli/src/commands/init.ts (same detection in spawnDetachedWarmup gate)
  - packages/cli/src/warmup-state.ts (atomic state file; unchanged)
  - packages/cli/src/bin-pre-tool-use.ts (legacy substring fallback when state !== "ready"; unchanged)
Verifier: docs/plans/2026-05-07-fix-install/judge.md (MD playbook), scripts/verify-real-install-30s.sh + scripts/verify-postinstall-detached.sh (evidence collectors)
Real install measured: 2.76s / 3.32s / 3.44s (3 runs, fresh cache, npm 10.9.4, --prefix=tmp + --cache=tmp)
---

# Two-stage install: legacy substring immediate, vector model opt-in upgrade

We install TeamAgent in two stages so that `npm install -g …` returns in **≤5 seconds** with the legacy substring matcher and the universal avoidance pack already active and protecting the user. The ~120 MB Xenova vector model + its `onnxruntime-node` backend (~80 MB) are NOT pulled by the default install; users who want BM25+dense RRF semantic ranking opt in by setting `TEAMAGENT_INCLUDE_OPTIONAL=1` before running `install.sh`, which then runs an explicit `npm install -g <tarball> @xenova/transformers onnxruntime-node` that adds the heavy deps in a single command. This trades initial semantic-matching accuracy (substring matching is coarser and more prone to false negatives on paraphrased prompts) for a 20× faster time-to-first-interception, which is critical for the landing copy's 30-second-hook promise.

## Why opt-in instead of detached background download

The original ADR §V1 proposed a `detached background download after install` so that the model would be ready ~10 minutes after a normal install. **We measured that approach and it does not work**: when `@xenova/transformers` and `onnxruntime-node` are listed under `optionalDependencies`, `npm install -g <tarball>` in npm 10.9.4 ignores `--omit=optional` / `--no-optional` and pulls them anyway (npm bug for tarball installs). The only reliable way to keep them out is to **omit them from `package.json` entirely** — at which point a "background download to upgrade" can no longer rely on npm to fetch them. Hence the opt-in flag.

A future V2 may add a `teamagent install-vector` runtime command that uses npm or pnpm under the hood to install the optionals into the user's global prefix, then triggers warmup. That is intentionally out of scope for V1 (avoids a CLI-spawning-package-manager hairball).

## Considered Options

- **(a) Keep current single-stage install (~5–10 minutes including vector model download)** — Rejected. A 5–10 minute install window breaks the landing copy's core conversion claim ("see it work in 30 seconds"). Users who queue up a long install and walk away are unlikely to complete onboarding.
- **(b) Docker image** — Rejected. Docker introduces a persistent daemon model that is architecturally misaligned with TeamAgent's design as a Claude Code local-hook sidecar. It also adds heavy setup friction for developers who simply want hooks, not a container runtime.
- **(c) brew / apt packaging** — Rejected. Platform-specific packaging (Homebrew on macOS, apt on Debian/Ubuntu) is distro-specific, increases release logistics, and does not solve the underlying vector-model warmup time problem — the 120 MB model still needs to download regardless of how the CLI itself was installed.
- **(d) `optionalDependencies` + detached background warmup** — Considered but blocked. npm 10 ignores `--omit=optional` for tarball installs (verified: 51s wall-clock with `--omit=optional`, optionals still installed). Requires moving the optionals out of `package.json` entirely, which precludes the "auto background upgrade" UX.

## Consequences

- Documentation must be transparent that semantic matching (BM25+dense RRF) is **not** active by default; users who want it must set `TEAMAGENT_INCLUDE_OPTIONAL=1` before running `install.sh`, or run `npm install -g @xenova/transformers onnxruntime-node` after the fact (alongside the same global prefix).
- The universal avoidance pack (`seed/packs/universal.jsonl`) **must use substring-friendly patterns** — literal keyword anchors such as `moment`, `/Users/`, `.env`, `rm -rf`, `hardcode` — so that the legacy matcher can produce reliable hits from the first session. Rules using only semantic paraphrases or vague descriptions will be silent until the vector deps are added.
- `postinstall.mjs` and `init.ts` both detect optional-deps presence via bounded `fs.existsSync` checks (sibling/local node_modules; no `createRequire` walk that could pick up an unrelated globally-installed @xenova). When absent, warmup is skipped entirely and the state file is not written, so `bin-pre-tool-use` never sees a stuck "downloading" placeholder.
- A `teamagent install-vector` runtime opt-in command remains a clear V2 follow-up.
