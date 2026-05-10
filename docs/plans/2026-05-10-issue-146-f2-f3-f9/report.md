```
   _____
  ( o>    issue-146 F2 + F3 + F9 — fused PR #263 squash-merged
   \\_<_)  schema reshape · daemon recording routing · first-run consent
    |  |   one fused commit (option B, skipped FIXEDFLOW per user)
  ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

  step 0           step 1           step 2-4          step 5
  ───────          ──────           ────────────      ─────────
  user picks       worktree at      F2 reshape →      push → PR #263
  option B        .codex/...        F3 dispatch →     auto-merge on
  + "one fused"    feat/issue-      F9 consent →      CI green → squash
                   146-f2-f3-f9     2241 tests        (commit c2def24)
```

# Issue #146 — F2 + F3 + F9 post-merge report

| 字段 | 值 |
|------|-----|
| issue | [#146](https://github.com/libz-renlab-ai/TeamBrain/issues/146) (multi-part — F1 already merged via #252; F2/F3/F9 closed by this PR; F4-F8 not in this batch) |
| PR | [#263](https://github.com/libz-renlab-ai/TeamBrain/pull/263) |
| squash commit | `c2def24` on `main` |
| branch | `feat/issue-146-f2-f3-f9` (local + remote both deleted) |
| commit count on branch | 1 (per user "one fused" mandate) |
| /review iter | 0 — self-review only (option B = skip FIXEDFLOW; user did not request the local /review skill) |
| time window | ~2026-05-10 12:00 → 13:00 UTC |

## Implementation chain

| step | 动作 | 锚点 |
|------|------|------|
| 0 | sanity scan: confirm `grill-ready` queue empty + #146 has no qualifying body for FIXEDFLOW; user authorizes option B | `gh issue list --label grill-ready` empty; #146 body > 50 字 |
| 1 | worktree `.codex/worktrees/issue-146-f2-f3-f9` off `origin/main` + `feat/issue-146-f2-f3-f9` branch | `git worktree add` clean |
| 2 | locate F-series spec: `docs/plans/issue-146-f1/report.md` lines 「Open follow-ups」给出 F2/F3/F9 一句话标题；scope hypotheses 拿到用户 ack | report.md L60-63 |
| 3 | F2 schema reshape: `cc-session.ts` / `recording.ts` 转 nested `{schema_version, envelope:{...}, transcript\|audio:{...}}` 形状对齐 mock-server.ts 验证 reader | mock-server.ts L375-415 |
| 4 | F3 dispatch: `loadEntry` 接受 `CcSessionMetadata \| RecordingMetadata`；`uploadEntry` (renamed) 按 `metadata.kind` 路由 `/v1/cc-sessions` 或 `/v1/recordings`；`ffmpeg-wrapper` `stop()` + `importRecording()` 落地改 `pending/` | uploader.ts L62-90 |
| 5 | F9 consent: `DigitalTwinConfig.consented_at`；`ensureDefaultConfig` 加 `now`/`notify` deps；`FIRST_RUN_BANNER` 一句单行 stderr；fresh-create + pre-F9 token-patch 各 fire 一次；enabled=false silent backfill | config.ts L120-188 |
| 6 | tests: 单元 + skema 测试覆盖 nested shape、F9 banner-once、pre-F9 backfill、kind dispatch；`uploader.test.ts` 加显式 `/v1/recordings` 路由断言 | 见 J5/J6/J7 |
| 7 | typecheck + 全 187 文件 / 2241 测试 regress 通过 | `pnpm typecheck` exit 0 |
| 8 | fused commit `24b6a83`：13 files, +586/-180；commit message 列三段 "Did" + 一段 "Did not"，与 user "one fused" 指令一致 | git log |
| 9 | push + `gh pr create` 普通 PR (非 draft) → PR #263 | github.com/.../pull/263 |
| 10 | `gh pr merge 263 --squash --auto` 设 auto-merge | gh CLI |
| 11 | CI 三平台 (ubuntu, windows, claude-review) 全绿 → auto-merge fire → squash 落到 `c2def24` | merge timestamp 2026-05-10T04:57:56Z |
| 12 | 清 worktree + delete local branch + delete remote branch + `git pull --ff-only` 同步父 checkout main | 见上文 git log |

## Deviations from spec

1. **No FIXEDFLOW**：用户 option B 明确说跳过 grill / driver；本 PR 是普通 maintainer-driven PR，不是 fixed-flow-driver skill 输出。F-series sub-tasks 没单独开 issue，因为 #146 的 mental model 把 F1-F9 视作一个 multi-part umbrella，给每个 F# 单独开 issue 反而违反「一个 issue 一句话」原则（实际 spec 在 PR description + report.md 里）。
2. **No /review iter**：option B 把 /review 留给 reviewer 在 PR review 阶段做（CI 的 `claude-review` cloud bot 提供了 informational pass）。本地 /review skill 没在这条链上跑——若后续发现 P1/P2 finding，按 `docs/PR-PLAN.md` 在同 PR branch 修；但 PR 已 squash-merged，新 finding 走 follow-up F# 子 issue。
3. **`recording_temp/` 目录保留**：F3 把新 recordings 改写到 `pending/`，但没删 `digitalTwinPaths.recordingTempDir` 字段——pre-F3 leftover OGGs 仍然能被诊断工具读到。Follow-up housekeeping PR 在下一个 release cycle 后可移除。
4. **F4-F8 不在本 PR**：仅 F2+F3+F9。F4 (recording-not-attached-to-daemon) 的 PR-4 描述其实已部分覆盖；本 PR 把那条线收口（recordings 进 daemon）。F4 标签和 F3 在 report.md 的 mapping 有歧义（PR-252 body 说 F4，report 说 F3），统一按 report.md 的 F3 = recording attachment 处理。

## Verification evidence

| Judge | 命令 / 锚点 | 结果 |
|-------|------------|------|
| J1 typecheck | `pnpm typecheck` | exit 0（多次跑） |
| J2 digital-twin suite | `pnpm exec vitest run packages/digital-twin` | 14 文件 / 185 tests passed |
| J3 cross-pkg regress | `pnpm exec vitest run packages/cli packages/core packages/digital-twin` | 187 文件 / **2241 tests passed** |
| J4 mock-server schema parity | `packages/digital-twin/src/__tests__/mock-server.test.ts` | 37 passed —— 服务端校验逻辑没改动，daemon 改了 envelope 形状对齐它，二者真的对齐 |
| J5 F2 wire | `uploader.test.ts: cc-session POST` —— 断言 `body.envelope.user_id`/`body.envelope.session_id`/`body.transcript.content` 出现，旧 flat 字段不存在 | passed |
| J6 F3 dispatch | `uploader.test.ts: recording POST` —— url 命中 `/v1/recordings`、`body.envelope.recording_id`、`body.audio.compression='none'` | passed |
| J7 F9 banner | `config.test.ts` 4 条新 case：fresh-create banner、pre-F9 token-patch banner、pre-F9 paused 静默、idempotent 不再 fire | passed |
| CI ubuntu | GitHub Actions | passed |
| CI windows | GitHub Actions | passed |
| CI claude-review | GitHub Actions | passed |

## 后续 / 风险

- **F4-F8 仍 open**：`docs/plans/issue-146-f1/report.md` 没列 F4-F8 的明确 scope；用户后续若要推进，需要 (a) 给每个 F# 单独 ≤50 字 issue + grill 走 FIXEDFLOW，或 (b) 像本 PR 一样 option B 直接干。
- **`consented_at` 写两次**：pre-F9 enabled=true&token=null 路径 `save(patched)`；fresh-create 路径 `save(fresh)`。两条路径都对，但 pre-F9 enabled=false 的 silent backfill 也走了 `save(backfilled)`——三条 save 都是单 field 添加，不影响其他 field。Follow-up 可以合成 helper，但当前重复极小。
- **`recording_temp/` 双轨**：tooling 仍能读 pre-F3 leftovers；新的 record stop/import 不写它。一旦确认无 leftover，可以从 `digitalTwinPaths` 删字段。
- **`uploadCcSession` deprecated alias**：`export const uploadCcSession = uploadEntry` 留作 back-compat 转向 outside callers；本仓库内部已统一成 `uploadEntry`。下一个 release 后可删 alias。

## 链接

- PR: https://github.com/libz-renlab-ai/TeamBrain/pull/263
- squash commit: https://github.com/libz-renlab-ai/TeamBrain/commit/c2def24
- F1 report (sibling)：[`docs/plans/issue-146-f1/report.md`](../issue-146-f1/report.md)
- 父 issue：[#146](https://github.com/libz-renlab-ai/TeamBrain/issues/146)（仍 OPEN，本 PR 不闭）
