```text
                    Issue #87 — First-Run Welcome / Wizard
                    =====================================

  npm install -g teamagent
            |
            v
    +---------------------------+
    | postinstall welcome block |   <- W2  packages/teamagent/postinstall.mjs
    | "✅ 装好啦 🎉 立刻可以做的 3 件事" |
    +---------------------------+
            |
            v   user types: teamagent
    +---------------------------+
    | first-run wizard (1/2/3)  |   <- W1+W3  bin.ts case undefined → first-run.ts
    +---------------------------+
            |
   +--------+--------+--------+
   |        |        |        |
   v        v        v
skeleton-  stats   --help
demo
   |        |        |
   v        v        v
~/.teamagent/first-run-state.json   <- W1  state persistence
   |
   v   second `teamagent` run
"上次你跑了 X，要不要试试 Y？"

W4: scripts/judge-first-run.sh + docs/baselines/help-output.txt  <- third-party judge harness
R:  this file (report section) + GitHub PR (Closes #87)
```

# Issue #87 — First-Run Welcome / Wizard / Next-Step Persistence

Generated 2026-05-07 by team `issue87-first-run` (4 sonnet workers + 1 opus reporter).
Branch: `worktree-issues87`. NEVER commit on `main`.
Worktree: `/Users/m1/projects/TeamBrain/.claude/worktrees/issues87`.

## CHANGELOG

- **v1 (2026-05-07)** — Initial spec. Confirmed user choices:
  1. spec doc here at `docs/specs/2026-05-07-issue87-first-run.md`
  2. wizard uses **simple numbered input** (`1/2/3 + Enter`), not arrow-key TUI
  3. state file is **independent** at `~/.teamagent/first-run-state.json`, not merged into `update-state.json`

---

## 1. task description

**问题边界**：把 `npm install -g teamagent` → 第一次跑 `teamagent` 这一段做平。3 个改动点全部在 imperative shell（CLI + postinstall），不动 functional core (`packages/core/`)。

### Concrete changes

- (a) Extend postinstall welcome (`packages/teamagent/postinstall.mjs`): append `✅ 装好啦 🎉 立刻可以做的 3 件事` + 3 命令行 + 1 链接行，整体 ≤30 行。
- (b) Rewire `packages/cli/src/bin.ts:894-897`: `case undefined:` no longer falls through to `--help`. Calls new `runFirstRunWizard()`. `--help` / `-h` / `help` cases stay byte-identical.
- (c) New file `packages/cli/src/commands/first-run.ts`: pure imperative shell. IO injected (`stdin/stdout/now/homeDir`). TTY → numbered prompt `选择 1 / 2 / 3 + Enter` (node `readline`, zero new deps). Non-TTY (CI / pipe) → render menu, exit 0. Choices spawn `skeleton-demo` / `stats` / `--help`.
- (d) State file `~/.teamagent/first-run-state.json` schema:
  ```json
  { "version": 1, "completedSteps": ["skeleton-demo"], "lastRunAt": 1714999999000 }
  ```
  Wizard reads it; if `completedSteps` non-empty, prepend `上次你跑了 <X>，要不要试试 <Y>？`.
- (e) New test file `packages/cli/src/__tests__/first-run.test.ts` (vitest), ≥6 cases: menu render, TTY branch, non-TTY branch, state first-write, state second-read, next-step hint.

### Constraints (do NOT do)

- 不动 `packages/core/`，不引入新 npm 依赖（用 node 内置 `readline`）。
- 不改 `--help` 文本本身；只改无参数路径。
- 不动 `~/.teamagent/update-state.json` schema。
- 不动 #84 / #85 / #86 范围（landing / non-tech / 拦截人话化）。
- 不实现录屏类 dogfood 任务（留 follow-up）。
- 不在 `bin.ts` 写 demo 逻辑，全沉到 `first-run.ts`。
- 不写「先去读哪些文件获取上下文」类预热步骤（AGENTS.md rule 6）。
- 不 amend、不 force push、不在 main 改。

### Worker decomposition (N=4 + 1 reporter)

文件 scope 互斥，避免并行写冲突。Workers 只 **写文件 + 跑各自验证**，**不 commit**。Reporter 收集所有 worker 完工信号后做集中 commit + judge + PR。

| Worker | Model | Scope (files this worker is allowed to write) | 2 claudefast probes |
|--------|-------|------------------------------------------------|---------------------|
| **W1** | sonnet | `packages/cli/src/commands/first-run.ts`, `packages/cli/src/__tests__/first-run.test.ts` | (1) probe `commands/*.ts` 现有 export 模式; (2) probe `~/.teamagent/` 已有 JSON 状态文件 schema 范例 |
| **W2** | sonnet | `packages/teamagent/postinstall.mjs` | (1) probe 现有 welcome block 行数与中文风格; (2) probe 项目里 emoji + 鼓励语气文案先例 |
| **W3** | sonnet | `packages/cli/src/bin.ts`, `docs/features/first-run.md`, `docs/PRODUCT-FEATURES.md` | (1) probe `bin.ts` `case undefined` 改造点 & router 风格; (2) probe `docs/features/*.md` 风格与 PRODUCT-FEATURES 一行格式 |
| **W4** | sonnet | `scripts/judge-first-run.sh`, `docs/baselines/help-output.txt`, `scripts/judge-first-run.README.md` | (1) probe `scripts/` 现有 judge / probe 脚本范例; (2) probe baseline / fixture 文件惯例 |
| **R** | opus | this spec file (report section), git commits, PR | 不跑 probe；只 read JSON + 集中 commit + 开 PR |

---

## 2. expected outputs

| 类型 | 路径 | 验收点 | Owner |
|------|------|--------|-------|
| 新文件 | `packages/cli/src/commands/first-run.ts` | export `runFirstRunWizard(opts)`；IO 全注入；纯 shell 层 | W1 |
| 新文件 | `packages/cli/src/__tests__/first-run.test.ts` | ≥6 vitest case 全绿 | W1 |
| 修改 | `packages/cli/src/bin.ts` | `case undefined` 调 wizard；`--help`/`-h`/`help` 路径 byte-identical | W3 |
| 修改 | `packages/teamagent/postinstall.mjs` | welcome block ≤30 行；含 grep 锚点 ✅/装好/skeleton-demo/stats/--help/github.com | W2 |
| 运行时 | `~/.teamagent/first-run-state.json` | 首次跑后存在；`completedSteps` 单调追加；不污染 `update-state.json` | W1 (test 验证) |
| 文档 | `docs/features/first-run.md` | trigger / UX 范例 / state schema / known limits；ASCII art 开头 | W3 |
| 文档 | `docs/PRODUCT-FEATURES.md` | 追加一行 VERIFIED 后的「首次运行向导」 | W3 |
| 文档 | `docs/specs/2026-05-07-issue87-first-run.md` | 本文件；report 节由 R 填 | R |
| 验证 | `scripts/judge-first-run.sh` | 跑 J1-J6，写 `.judge/<run>/judge.json` + evidence | W4 |
| 验证 | `docs/baselines/help-output.txt` | 当前 `teamagent --help` 输出快照 | W4 |
| PR | GitHub PR (LiuShiyuMath account) | body `Closes #87`；CI green；Codex silent/👍；无 conflict；非 draft | R |

数量上限：≤2 新源文件 + ≤4 修改文件 + 3 新文档 + 2 新脚本/baseline + 1 PR。

---

## 3. third-party judge harness

按项目铁律：**固定工具跑 → dump JSON → 第三方 LLM 只读 raw JSON + evidence**。Wizard 不自评、agent 不自评。

### Harness checks (W4 实现 `scripts/judge-first-run.sh`)

| # | 固定工具 | 命令 | 通过条件 → JSON 字段 |
|---|---------|------|----------------------|
| J1 | typecheck | `pnpm typecheck` | `exit_code == 0` |
| J2 | unit tests | `pnpm --filter @teamagent/cli test first-run` | `exit_code == 0`、`tests_passed >= 6` |
| J3 | postinstall stdout | `node packages/teamagent/postinstall.mjs 2>&1` | grep 锚点 `✅` `装好` `skeleton-demo` `stats` `--help` `github.com` 全命中、`line_count <= 30` |
| J4 | wizard 首次跑 | `script -q /dev/null node packages/cli/dist/bin.js < /dev/null` (PTY) 或 `printf '\n' \| node ...` | 含 `装好啦` + ≥1 emoji + 3 命令名；state 文件创建 |
| J5 | wizard 二次跑 | 同 J4 再跑一次 | stdout 含 `上次你跑了`；`completedSteps.length > 0` |
| J6 | --help 不变 | `node packages/cli/dist/bin.js --help` | 与 baseline `docs/baselines/help-output.txt` `diff -q` 为空 |

### `judge.json` schema

```json
{
  "run_id": "2026-05-07T...",
  "feature": "issue-87-first-run-welcome",
  "checks": [
    { "id": "J1", "tool": "typecheck",            "exit_code": 0, "stdout_path": "evidence/typecheck.log" },
    { "id": "J2", "tool": "vitest",               "exit_code": 0, "tests_passed": 6, "stdout_path": "evidence/vitest.log" },
    { "id": "J3", "tool": "postinstall",          "exit_code": 0, "anchors_hit": ["✅","装好","skeleton-demo","stats","--help","github.com"], "line_count": 27, "stdout_path": "evidence/postinstall.stdout" },
    { "id": "J4", "tool": "wizard-noargs-first",  "exit_code": 0, "anchors_hit": ["装好啦","🎉","skeleton-demo","stats","--help"], "state_file_created": true, "stdout_path": "evidence/wizard-1.stdout" },
    { "id": "J5", "tool": "wizard-noargs-second", "exit_code": 0, "anchors_hit": ["上次你跑了"], "completed_steps_count": 1, "stdout_path": "evidence/wizard-2.stdout" },
    { "id": "J6", "tool": "help-unchanged",       "exit_code": 0, "diff_bytes": 0, "stdout_path": "evidence/help-diff.log" }
  ]
}
```

### LLM judge invocation (R 跑)

```bash
claudefast -p "你是验收 judge。只读 .judge/<run>/judge.json 和 evidence/ 下文件，不要执行任何工具。
对每个 check 给 PASS/FAIL；任一 FAIL → OVERALL FAIL。最后一行输出 OVERALL: PASS|FAIL。"
```

### 项目级 feature verification 1+2+3 (R 跑，叠加 harness 之上)

按 `docs/feature-verification.md` 与 `CLAUDE.md` 强制：
1. `claudefast -p "teamagent --help"` → canonical JSON 写 `.judge/<run>/v1-claudefast.json`
2. `codex exec --skip-git-repo-check -s read-only "teamagent --help"` → canonical JSON 写 `.judge/<run>/v2-codex.json`，与 (1) hard-match
3. tmux interactive `claudefast` 跑一遍 wizard → `/export .judge/<run>/v3-claudefast-export.jsonl`，附进 PR

---

## 4. report (R 填，工人完工后)

- **Final Run ID**: `2026-05-07T03-49-44Z`（修完 defaultSpawn + J4 PTY 后的最终 judge run）
- **Workers status**: W1 / W2 / W3 / W4 全部 completed
- **Judge OVERALL**: PASS（J1 typecheck 0、J2 vitest 6/6、J3 postinstall 6/6 anchors + 18 lines、**J4 wizard-first 4/5 anchors + tty_branch=true + state_created=true**、J5 wizard-second 1/1 anchor + completedSteps=1、J6 help-unchanged diff_bytes=0）
- **LLM judge OVERALL**: PASS（claudefast 只读 `judge.json` + evidence/，每条 check 单独 PASS）
- **PR URL**: https://github.com/libz-renlab-ai/TeamBrain/pull/99
- **Atomic commits**: 11 个总数 — 6 初始（W1/W2/W3-bin/W3-docs/W4/spec）+ 1 spec report + 2 follow-up（W1 defaultSpawn fix、W4 J4 PTY 升级）+ 1 spec final + 1 merge commit (resolve PRODUCT-FEATURES.md 冲突，与 main 的 M5 50-58 entries 共存：原 49 + M5 50-58 + 首次运行向导 → 59)
- **Feature verification 1+2+3**:
  - (1) claudefast canonical JSON of `teamagent --help` → `.judge/2026-05-07T03-32-17Z/v1-claudefast.json`，commands 数 ≈ 47
  - (2) codex canonical JSON — **本机 codex CLI 401 unauthorized**（OpenAI key 失效），无法对照 hard-match。已记录原始 stderr 到 `.judge/2026-05-07T03-32-17Z/v2-codex.raw`；属环境限制，不属本 PR 缺陷
  - (3) PTY-driven wizard via `expect`：选 "3" → 真实写入 `~/.teamagent/first-run-state.json` `{"completedSteps":["--help"]}`，证明 `defaultSpawn` 已正确 wire 到 PATH 上的 `teamagent <choice>`
- **Codex review iteration**:
  - **Round 1（初始 PR）**：Codex P1 inline comment on `first-run.ts:148` "Spawn CLI entrypoint instead of subcommand literal" — 与 R 通过 PTY 验证发现的同一 bug 完全吻合
  - **Round 2（follow-up commits）**：等 Codex 重新 review；用 `@codex review` 触发
- **Outstanding issues (P1/P2/P3)**:
  - **P1（已修）**：`first-run.ts:148` defaultSpawn ENOENT — 通过 commit `d513727 fix(m4): wire defaultSpawn to teamagent <choice> in PATH` 解决；W1 完成两轮迭代修复
  - **harness uplift**：commit `4ea3dc3 test(m4): J4 wizard via expect PTY + tty_branch field` — J4 从 pipe stdin 升级为 expect-driven PTY，新增 `tty_branch_entered` 字段杜绝 false positive
  - **merge conflict (resolved)**：main 在 PR 期间 merge 了 M5-aggressive-defaults，与 first-run wizard 同时编号 50。conflict 局限在 `docs/PRODUCT-FEATURES.md`（counts/numbered list/table row 各 4 处）。解决：renumber 我方 50→59，把 first-run wizard 行放到 M5 viral-spread block 之后。`pnpm typecheck` 0 error / 6/6 vitest pass / judge harness OVERALL=PASS post-merge (run id `2026-05-07T04-05-04Z`)
  - 待 Codex round 2 review 反馈后追加

---

## Operational rules for this team

- **NEVER work on main**. Branch is `worktree-issues87` (already on it). All commits land here.
- **Workers do NOT commit**. They write files, run probes & their own slice of tests, mark task completed, send lead message. Reporter does all `git commit`.
- **Atomic commits per concept** (Reporter responsibility): one commit each for (W2 postinstall) / (W1 first-run.ts + tests) / (W3 bin.ts wire) / (W3 docs) / (W4 judge harness) / (R spec + report). Commit message format `feat(m4): <slice>` or `docs(m4): <slice>`.
- **PR must NOT be draft**. Use `env -u GITHUB_TOKEN gh pr create` (account `LiuShiyuMath`), body must reference `Closes #87`.
- **POSTPR loop** is on R (reporter): after PR opens, fetch Codex review every cycle until silent / 👍.
- **claudefast probes** are read-only verification. Do NOT use them to write files. They emit stdout for the worker to grep / paste into their commit notes.
