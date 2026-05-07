```
        __        verification loop = 主 agent 自己读、自己跑的 playbook
   <(o )___      不是 daemon、不是 cron
    ( ._> /
     `---'
```

# RUN-VERIFY-LOOP — 主 agent 跑 verification loop 的引导

本文档**面向主 agent 自己**。用户随时可以说「跑一下 #3 的验证」，
主 agent 读这份 playbook，按下面 6 步走。

**不是 cron，不是 daemon**——主 agent 会话内读 → 跑 → 决定下一步。

## Step 0 · Pick feature

触发方式（任一）：

- **用户指定**：`feature_id = N`
- **主 agent 主动**：读 `docs/verify/backlog.jsonl`，挑昨天 STUCK_REPEATING 状态最久的一条
- **PR 触发**：用户 PR 改动了 `packages/...`，对应 feature_id 自动入队

## Step 1 · Compose GOAL.md

照 [GOAL-COMPOSER](GOAL-COMPOSER.md) 走。

**遇歧义必须 `AskUserQuestion`，不要默默猜。**

## Step 2 · RUN

- 主 agent 决定 RUN harness（每 feature 不同，参考 `docs/features/<name>/`）
- dump trace 到 `/tmp/verify-<feature>-<ts>.txt`
- **不要求 trace 结构化**；judge 看不懂时下一轮主 agent 决定加什么 logging

## Step 3 · JUDGE（注意：**不**用 `--bare`）

```bash
claudefast -p "<JUDGE prompt with trace + GOAL>"
```

解析 verdict：

- PASS → 跳 Step 6
- FAIL / INCONCLUSIVE → Step 4

## Step 4 · 写 iteration 记录

追加到 `docs/features/<name>/iterations.jsonl`：

```json
{
  "ts": "2026-05-07T12:34:56Z",
  "iter_n": 3,
  "verdict": "FAIL",
  "reason": "...",
  "code_diff_summary": "...",
  "trace_path": "/tmp/verify-3-1746...txt"
}
```

## Step 5 · META-JUDGE（**必须用 `--bare`**）

照 [META-JUDGE](META-JUDGE.md) 跑。按 `decision` 分支：

- **STILL_MOVING** → 把 judge 的 reason 当 fix prompt 应用到自己（改 code/docs），回 Step 2
- **STUCK_REPEATING** → 写入 `docs/verify/backlog.jsonl`（明天再 pick），结束本轮
- **STUCK_DESIGN_FLAW** → 写入 backlog 加 flag、`@<owner>`，结束本轮

## Step 6 · 收工

### PASS 时

- 写 `docs/features/<name>/last-verified.md`
- 从 backlog 移除
- 静默，**不打扰用户**（除非用户问）

### STUCK 时

- 不 page、不 alert、**不 pause**
- 用户下次问「#3 验证状态？」主 agent 读 `last-verified.md` + `iterations.jsonl` 自然回答

## 长跑特性

- **主 agent 会话间无状态**：所有进度落 `iterations.jsonl` / `backlog.jsonl`
- 用户可以中途 Ctrl-C；下次会话继续从 backlog 接
- 没有「跑完所有 64 个」的 demand——一次跑 1-2 个就够，自然摊到不同 session

## 设计原则（不要破坏）

- ❌ 不要加固定 N 次循环上限
- ❌ 不要加 token / 时间预算
- ❌ 不要 page 人工
- ✅ 所有「停」决定走 META-JUDGE 语义判定
- ✅ 所有「进度」记录落文件，跨 session 可恢复
- ✅ JUDGE 带项目语境（不用 `--bare`），META-JUDGE 不带（用 `--bare`）

## 联动

- Step 1 → [GOAL-COMPOSER](GOAL-COMPOSER.md)
- Step 5 → [META-JUDGE](META-JUDGE.md)
