```
 ┌──────────────────────────────────────────────────────────────────────┐
 │  Report — Issue #84 实际执行 vs 计划                                │
 │                                                                      │
 │  pending ──► in-progress ──► verified ──► shipped                  │
 │     ▲                                          │                     │
 │     └────────── 偏差 / 风险 / follow-up ◄─────┘                    │
 │                                                                      │
 │  随每个 phase 完成后追加；最终发版前必须含 verdict.json 摘要 +     │
 │  真实陌生用户 TTHW 评论链接 + Codex 最终 silent/👍 commit SHA     │
 └──────────────────────────────────────────────────────────────────────┘
```

# Issue #84 — Report (live)

GitHub: <https://github.com/libz-renlab-ai/TeamBrain/issues/84>
对应 plan: `docs/plans/issue-84/plan.md`
对应 research: `docs/plans/issue-84/research.md`

---

## 0. 状态总览

| 阶段 | 状态 | 负责人 | 备注 |
|------|------|--------|------|
| R1 决策固化 | done | LiuShiyuMath | spec 7 条决策已存在；FASTPROBE round 1 完成，contradictions 见 research §G |
| R2 产物拓扑 | done | LiuShiyuMath | FASTPROBE round 2 R2 完成；产物 see r2/INDEX.md（apps/landing/、release-prep/、workflow、4 worker summary） |
| P1 设计探索 | pending | LiuShiyuMath | 跑 `/design-shotgun` ≥ 3 variant |
| P2 安装产物 | pending | LiuShiyuMath | release 分支 + install.sh |
| I1 GitHub Pages | pending | LiuShiyuMath | actions/deploy-pages |
| I2 文档同步 | pending | LiuShiyuMath | CLAUDE.md / README.md |
| V1 真用户 dogfood | pending | LiuShiyuMath | ≥1 真实陌生用户 |
| Verdict | pending | LLM judge | `verdict.json.passed=true` 是合并门禁 |

---

## 1. 实际产出（按阶段写）

> 每个阶段完成时往这里追加：实际改动文件、commit SHA、对应验证 evidence path、与 plan 的偏差。

- [2026-05-07] FASTPROBE round 1 complete by issue-84-team (4 sonnet workers + 1 opus 1M reporter)：8 probes consolidated。Artifacts: `.fastprobe/issue84/p[1-8].{stream.json,json,debug.log}` + `docs/plans/issue-84/probes/p[1-2,3-4,5-6,7-8].md`。跨 probe contradictions surfaced in `research.md §G` (G1–G6，其中 G1–G4 标注 ⚠️、G5/G6 仅记录无矛盾)；open questions in `research.md §H` (H1–H7)。Workers + reporter 总 0 commit / 0 push。
- [2026-05-07] R2 产物拓扑完成 by issue-84-team (worker-5..8 sonnet + reporter-r2 opus 1M)：12 R2 artifact 落到 `apps/landing/`、`release-prep/`、`.github/workflows/`、`docs/plans/issue-84/r2/`。Index: `docs/plans/issue-84/r2/INDEX.md`。所有 worker 总 0 commit / 0 push。关键决策：Pages source = Option 3（apps/landing/dist + Actions deploy，G3 escalation closed）；install.sh 双轨 URL（release 分支 raw + Release asset tarball，G4 closed，H1/H5/H6 部分 punt）；P4 7 项 mitigation 在 install.sh.draft 全覆盖（bash -n OK）；CLAUDE.md / README install block diff 草稿就绪（I2 apply）。⚠️ 矛盾：(1) pages-source-decision §R1 主张「hash 化 asset」与 package.json build 实际为纯 `cp -r` 不一致；(2) `pnpm-workspace.yaml` 仍只 `packages/*`，I2 必补 `apps/*` glob 否则 landing-deploy CI 失败。

---

## 2. 验证证据

| Probe | 期望产物 | 实际路径 | 结果 |
|-------|----------|----------|------|
| Pages live | `.judge/issue-84-<run_id>/page.html` + `http.txt` | _pending_ | _pending_ |
| install.sh syntax | `.judge/.../install_syntax.txt` | _pending_ | _pending_ |
| install.sh dry-run | `.judge/.../install_dryrun.log` | _pending_ | _pending_ |
| Lighthouse | `.judge/.../lh.json` | _pending_ | _pending_ |
| HTML lint | `.judge/.../htmlhint.json` | _pending_ | _pending_ |
| Link check | `.judge/.../linkinator.json` | _pending_ | _pending_ |
| Slop / design review | `.judge/.../design_review.json` | _pending_ | _pending_ |
| Feature truth | `.judge/.../stats.json` + `feature_match.json` | _pending_ | _pending_ |
| TTHW dogfood | `.judge/.../tthw.json` + `session.cast` | _pending_ | _pending_ |
| PR canon | `.judge/.../{pnpm-test,typecheck,verify-all-rules,postpr-canned}.json` | _pending_ | _pending_ |
| **Verdict** | `verdict.json` | _pending_ | _pending_ |

---

## 3. 真用户 dogfood 记录

| 用户 | 起点 | 终点 | TTHW (mm:ss) | 评论链接 |
|------|------|------|--------------|----------|
| _pending_ | landing URL | `teamagent demo` 第一次拦截 | _pending_ | _pending_ |

issue 验收要求 ≥ 1 行真实陌生用户。codex web for github 自动 session 不算。

---

## 4. 偏差 / 风险触发记录

> 偏离 plan 或触发 research §E 风险时记这里。

- [2026-05-07 / R2] ⚠️ pages-source-decision §R1 vs package.json build 措辞 drift：decision 主张 build 步生成 content-hash 化 asset（如 `index.a1b2c3d4.js`），但 package.json scripts.build 是 `cp -r`，未引入 hash 工具。需要在 P1 / I1 阶段二选一：改 decision 措辞，或升级 build 引入最小 hash 化。Option 3 决策本身保留（preview deployment 仍成立）。
- [2026-05-07 / R2] ⚠️ `pnpm-workspace.yaml` 仍只含 `packages/*`，I2 必补 `apps/*` glob。否则 `.github/workflows/landing-deploy.yml:31` 的 `pnpm install --filter landing` 将在 CI 失败。已记录在 r5-summary.md，本 report §4 升级为前置阻塞项。

---

## 5. Codex review loop

POSTPR 规范：每次 push 后跑 `env -u GITHUB_TOKEN gh api repos/libz-renlab-ai/TeamBrain/pulls/<n>/comments --jq ...` 抓 `chatgpt-codex-connector[bot]`，按 P1/P2/P3 triage 直到 silent/👍。

| Round | Commit SHA | Codex 评论数 (P1/P2/P3) | 处理动作 | 状态 |
|-------|-----------|-------------------------|----------|------|
| 1 | _pending_ | _pending_ | _pending_ | _pending_ |

合并条件：CI green ∧ 无 merge conflict ∧ Codex 在最新 commit silent 或 👍。

---

## 6. Follow-up（不在本 PR 范围）

- 自定义域名 + CNAME（issue 已声明留 follow-up）
- `install.sh --mirror` fallback（research §E R2）
- `teamagent pack` 子命令的 stack 自动检测（spec 决策 6 显式委托给用户 agent，不做硬编码）
- 多语言 landing（zh/en）

---

## 7. 最终交付摘要（合并前必填）

- PR URL: _pending_
- 合并 commit SHA: _pending_
- `verdict.json.passed`: _pending_
- 真用户 TTHW: _pending_
- Codex 最终状态: _pending_
- Pages 线上 URL 截图 / 录屏: _pending_
