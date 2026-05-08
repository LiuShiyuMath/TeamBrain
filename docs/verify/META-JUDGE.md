```
        __
   <(o )___    META-JUDGE: 不评判 feature, 只评判 loop 进度
    ( ._> /
     `---'
```

# META-JUDGE — verification loop 进度裁判

主 agent 在 [RUN-VERIFY-LOOP](RUN-VERIFY-LOOP.md) 里跑完每轮 JUDGE 后调用本判定。
META-JUDGE 不看 feature 对不对，只看 **loop 还动不动**。

## 输入

| 字段 | 说明 |
|---|---|
| `goal` | 当前 feature 的 [GOAL.md](GOAL-COMPOSER.md) 内容（产品语言） |
| `iterations[]` | 最近 K 轮 `{verdict, reason, code_diff_summary, trace_size}` |
| `K` | 自适应：起步 K=2；遇 INCONCLUSIVE 时 K=3；逼近 token 预算回退 K=2 |

## Prompt 模板

```text
You are a META-JUDGE. You do NOT verify the feature.
Your only job: decide whether the verification loop is still
making meaningful progress, or stuck.

GOAL (product language):
<<<{goal}>>>

ITERATION HISTORY (newest last):
[iter N-K] verdict={v} reason="{r}" diff_summary="{d}"
...
[iter N]   verdict={v} reason="{r}" diff_summary="{d}"

Decide ONE of three:
  - STILL_MOVING: judge's complaints are evolving, fixes are
                  addressing them, or new info is surfacing.
  - STUCK_REPEATING: same complaint + same kind of fix across
                  >=2 iterations. Loop won't converge on its own.
  - STUCK_DESIGN_FLAW: judge keeps flagging something that needs
                  architecture change, not code tweak.

Output ONLY this JSON (no prose):
{
  "decision": "STILL_MOVING|STUCK_REPEATING|STUCK_DESIGN_FLAW",
  "rationale": "<2-3 sentences citing iteration numbers>",
  "confidence": 0.0-1.0,
  "evidence_iters": [<iter numbers cited>]
}
```

## 调用方式 — 必须 `--bare`

```bash
timeout 180 claudefast --bare -p "<META-JUDGE prompt above>" < /dev/null > meta-out.txt 2>&1
```

### 关键 flags 经验（dogfood 验证 2026-05-08, claudefast 2.1.133）

| flag | 用 / 不用 |
|---|---|
| `--bare` | ✅ 必须 — 否则 Stop hook 会把 `<self-report>` block 注进输出 |
| `< /dev/null` | ✅ 必须 — 不加会有 3s stdin warning |
| `--max-turns N` | ❌ 不加 — N=1 会 hard fail with `Reached max turns (1)` |
| `--max-budget-usd $X` | ❌ 不加（默认 $0.10 不够 1.4KB 提示） |
| `--output-format json` | ⚠️ 可选 — prompt 里要求 JSON-only 已足够 |
| `--max-tokens` | ❌ 该 flag 不存在 |

### 为什么 `--bare`

| 不用 `--bare` 时会发生什么 | 影响 META-JUDGE |
|---|---|
| 项目 Stop hook 注入 12-field `<self-report>` 模板要求 | judge 输出被强塞 self-report，破坏 JSON |
| CLAUDE.md auto-discovery 把 64 features / canned-answer 全装进 context | judge 被项目语境污染，倾向给业务侧 verdict |
| Plugin sync 拉 gstack / teamagent skills | 增加冷启动延迟；可能匹配到不该触发的 skill |
| PreToolUse hook 拦截 judge 自己的工具调用 | judge 想 grep trace 时被项目拦截器挡了 |

`--bare` 把 META-JUDGE 拉回纯 LLM 状态，只看 prompt + 自由推理。

### JUDGE vs META-JUDGE 的 `--bare` 矩阵

| 角色 | 用 `--bare` 吗 | 理由 |
|---|---|---|
| JUDGE（feature 是否过关） | ❌ 不用 | 要懂项目语境（rule 名、feature 描述） |
| META-JUDGE（loop 是否进展） | ✅ 必须用 | 不能被项目语境污染对进度的判断 |

## 输出契约

主 agent 解析 JSON 后按 `decision` 分支。**不解析自由文本**。

- 无效 JSON → 当作 INCONCLUSIVE，重跑一次
- 仍无效 → 默认 STILL_MOVING（保守往下走，避免误停 loop）

## 失败模式 + 兜底

- META-JUDGE 自身 hallucinate decision → 看 `confidence`，< 0.4 时主 agent 忽略本次决策、按上一轮处理
- META-JUDGE 一直 STILL_MOVING 但 loop 实际原地转 → 这是**唯一**会自然发散的 case。靠用户偶尔 `wc -l docs/features/*/iterations.jsonl` 看异常长 backlog 触发抽查（人工，非自动）

## 联动

- 上游：[RUN-VERIFY-LOOP](RUN-VERIFY-LOOP.md) Step 5
- 输入 `goal`：[GOAL-COMPOSER](GOAL-COMPOSER.md) 产出
