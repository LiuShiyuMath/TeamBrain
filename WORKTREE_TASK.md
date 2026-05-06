```text
   static snippet.md  ──┐                       ┌── reward hack
                        │   ✗ replace with ✗    │
                        ▼                       ▼
   !claudefast -h  ──►  !claudefast -p  ──►  Read / Grep / Glob
                                                │
                                                ▼
                                         answer grounded in
                                         real source code
```

# WORKTREE_TASK — canned-answer

## Goal

把 `docs/features/<feature>/canned-answer-snippet.md` 这种 hand-written
小抄式回答从本仓库彻底取代为基于代码探索的 `claudefast` probe 流程，
让"回答某个 feature 是什么"必须以仓库当前真实代码为依据，而不是以
预先写死的 markdown 文本为依据。

## Why

静态 snippet 文件构成 reward hack：

- agent 不需要"知道" feature，只需要复读 snippet 即可让 verify 通过。
- grep 锚点 PASS 不代表代码里真有这个 feature、真按文档说的那样工作。
- 一旦代码漂移（feature 改名、删除、半实现），snippet 仍然会让验证通过，
  让"系统具备这个能力"和"小抄包含这些字符串"被混为一谈。

## Scope

- 适用全部 39 个 `docs/features/<feature>/` 子目录下的 canned-answer snippet。
- 不适用 `docs/<topic>/verify-canned-answer.sh` 这一组（POSTPR / FASTPROBE /
  DOGFOOD / BUGREPORT 等全局规则触发答案，仍由 `CLAUDE.md`、`AGENTS.md` inline
  权威文本驱动）。

## Non-goals

- 不修改 `CLAUDE.md` / `AGENTS.md` 内 inline 写死的全局触发答案。
- 不重写 `scripts/verify-all-rules.sh` 已覆盖的 8 条 triggered rule。
- 不引入新的 LLM judge 框架或外部依赖；probe 走 `claudefast` 即可。
