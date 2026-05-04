```text
   ┌─────────────────────────────────────────────────────────────┐
   │     TeamBrain Feature: Team Knowledge Sharing               │
   │                                                             │
   │   ┌─ personal ─┐   ┌─ team ─────┐   ┌─ global ──────────┐   │
   │   │ project DB │   │ project DB │   │ user global DB    │   │
   │   │ local      │   │ local      │   │ machine-local     │   │
   │   └────────────┘   └────────────┘   └───────────────────┘   │
   │                                                             │
   │   Phase 4 NOT YET: git transport / redaction / review gates │
   └─────────────────────────────────────────────────────────────┘
```

# Team Knowledge Sharing

Source index: [../README.md](../README.md) · [../SYSTEM/08-knowledge-store.md](../SYSTEM/08-knowledge-store.md)

## Goal

Let a team share rules / canon / wisdom across machines via a layered knowledge store whose **routing IS the privacy boundary**.

## Status

### IMPLEMENTED

- **Dual physical store**: project-level `<cwd>/.teamagent/knowledge.db` + machine-level `~/.teamagent/global.db`
- **Three logical scopes**: `personal`, `team`, and `global` are preserved in `scope_level`
- **Local team scope**: `scope.level=team` writes to the project DB and remains queryable as `team`
- **Read CLI supports team filtering**: `teamagent review --scope=team` shows team entries without mixing personal entries
- **Stats show team separately**: `teamagent stats` reports personal / team / global buckets
- **Runtime retrieval covers team**: PreToolUse and UserPromptSubmit can query project DB team-scope rules
- **Local review gate**: `teamagent review-candidates --approve-scope=team` can approve a pending candidate into local team scope
- **Local privacy gate**: team approval blocks candidates containing emails, token-shaped secrets, internal hosts, private paths, UUIDs, or private IPs

### NOT YET

- **No cross-machine git-sync transport**: no `teamagent sync pull/push`, no `.teamagent/rules/*.mdc` codec, no SessionStart auto-pull
- **No outbound sync/export redactor** because the sync/export transport is not implemented yet
- **No completed team sharing gate** from reviewed local team knowledge → conflict-checked artifact → shared to other machines
- **No multi-variant model** (`problem_cluster_id` + `variant_id`) — single-row knowledge entries only

## How it works

### Scope routing

| `scope.level` | Write path                                      | Read path                                    | Physical medium                         | Status |
|---------------|-------------------------------------------------|----------------------------------------------|-----------------------------------------|--------|
| `personal`    | `DualLayerStore.add → project.add`              | `findByScopeLevel("personal")`               | `<cwd>/.teamagent/knowledge.db`         | works |
| `team`        | `DualLayerStore.add → project.add`              | `findByScopeLevel("team")` / `review --scope=team` | `<cwd>/.teamagent/knowledge.db` | local-only |
| `global`      | `DualLayerStore.add → global.add`               | `findByScopeLevel("global")`                 | `~/.teamagent/global.db`                | works |

### Code references

- Write router: `packages/adapters/src/storage/sqlite/dual-layer-store.ts`
- Team-scope CLI write: `packages/cli/src/commands/pitfall.ts`
- Team-scope review filter: `packages/cli/src/commands/review.ts`
- Candidate approval to team scope: `packages/cli/src/commands/review-candidates.ts`
- Local PII detector: `packages/core/src/pii/redactor.ts`
- Stats buckets: `packages/cli/src/commands/stats.ts`
- Runtime prompt retrieval: `packages/cli/src/user-prompt-rule-retriever.ts`
- Schema with all three scopes: `packages/adapters/src/storage/sqlite/schema.ts`

## How to verify

```bash
pnpm exec vitest run \
  packages/adapters/src/storage/sqlite/__tests__/dual-layer-store.test.ts \
  packages/cli/src/__tests__/pitfall.test.ts \
  packages/cli/src/__tests__/review.test.ts \
  packages/cli/src/__tests__/review-candidates.test.ts \
  packages/core/src/pii/__tests__/redactor.test.ts \
  packages/cli/src/__tests__/stats.test.ts \
  packages/cli/src/__tests__/m5-e2e.test.ts
```

Expected product wording: **local team scope is partially verified; team sharing is not complete**.

## Known limitations

- Two laptops on the same project still do not automatically exchange TeamAgent learnings.
- `teamagent doctor --json` still reports `team-sharing` as `skip/PARTIAL`.
- Do not claim privacy-safe team sync until transport/export uses the same privacy gate and conflict review exists.

## Links

- Phase 4 plan: `docs/superpowers/plans/2026-05-01-phase4-team-memory-plan.md`
- System knowledge-store doc: `docs/SYSTEM/08-knowledge-store.md`
- System limitations: `docs/SYSTEM/09-limitations.md`
- Original v5.2 design with `scope.level` field: `docs/specs/2026-04-13-teamagent-design.md`
