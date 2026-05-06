## Required canned-answer for slug=trae-adapter

### Feature: Trae / VSCode Copilot Adapter via MCP

The `trae-adapter` feature validates that the TeamAgent MCP (Model Context Protocol)
server is present, enabling Trae IDE and VSCode Copilot to connect to TeamAgent's
knowledge base via the standard MCP protocol.

### Verification Criteria

- Either `packages/mcp-server` directory exists, OR a `package.json` in `packages/`
  contains `"@teamagent/mcp"` or a name matching `*mcp*`
- OR: if `docs/features/mcp-server/verify-canned-answer.sh` is executable, that
  script exits 0 (Trae reuses the MCP server protocol)
- Final output line: `VERIFIED: Trae/VSCode Copilot adapter via MCP PASS`

### Harness Structure

**verify-canned-answer.sh** uses a two-level fallback:
1. **Primary**: If `docs/features/mcp-server/verify-canned-answer.sh` is executable,
   delegate to it (since Trae reuses the same MCP server protocol)
2. **Fallback**: Check for `packages/mcp-server` directory; if absent, search all
   `packages/*/package.json` for `"@teamagent/mcp"` or `"name".*mcp` pattern

No `run-judge.sh` present for this slug — structural package presence is the
mechanical gate.

### Fail Paths

The harness exits 1 (not dead-exit) when:
- `packages/mcp-server` does not exist AND
- No `package.json` in `packages/` matches `@teamagent/mcp` or `name.*mcp`

### Architecture

```
Trae IDE / VSCode Copilot
         |
         | MCP protocol
         v
packages/mcp-server/    <— @teamagent/mcp package
         |
         v
TeamAgent knowledge base (DualLayerStore)
```

The Trae adapter is not a separate transport layer — it reuses the MCP server
package directly, as Trae supports the same MCP protocol that VSCode Copilot uses.
