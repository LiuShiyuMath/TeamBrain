// packages/cli/src/__tests__/doctor.test.ts
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { describe, it, expect } from "vitest";
import { openDb } from "@teamagent/adapters";
import {
  checkClaudeMd,
  executeDoctor,
  renderDoctorResult,
  parseDoctorArgs,
  checkClaudeCode,
  checkTeamSharingStatus,
  pathContainsNodeModulesBin,
  checkSettingsJsonScope,
  checkPluginSync,
  checkCodexBin,
  checkMcpReachability,
  type ClaudeProbe,
  type ClaudeProbeResult,
  type CodexProbe,
  type McpProbe,
  type DoctorCheckResult,
  type DoctorResult,
} from "../commands/doctor.js";

function makeResult(overrides: Partial<DoctorResult> = {}): DoctorResult {
  return {
    checks: [],
    passed: 0,
    failed: 0,
    skipped: 0,
    allPassed: true,
    ...overrides,
  };
}

describe("renderDoctorResult", () => {
  it("shows all-pass message when allPassed=true", () => {
    const out = renderDoctorResult(makeResult({ allPassed: true, passed: 8 }));
    expect(out).toContain("全部检查通过");
    expect(out).toContain("TeamAgent 运行正常");
  });

  it("shows failure count and fix hint when failed > 0", () => {
    const checks: DoctorCheckResult[] = [
      { name: "node-version", status: "fail", detail: "v18.0.0 (需要 ≥ 22)", fix: "nvm install 22" },
      { name: "claude-code", status: "skip", detail: "跳过" },
    ];
    const out = renderDoctorResult(makeResult({
      checks,
      passed: 0,
      failed: 1,
      skipped: 1,
      allPassed: false,
    }));
    expect(out).toContain("❌ node-version");
    expect(out).toContain("nvm install 22");
    expect(out).toContain("⏭");
    expect(out).toContain("1 项失败");
  });

  it("shows ✅ for passing checks", () => {
    const checks: DoctorCheckResult[] = [
      { name: "node-version", status: "pass", detail: "v22.4.0" },
    ];
    const out = renderDoctorResult(makeResult({ checks, passed: 1, allPassed: true }));
    expect(out).toContain("✅ node-version");
    expect(out).toContain("v22.4.0");
  });

  it("does not say everything passed when checks are skipped", () => {
    const checks: DoctorCheckResult[] = [
      { name: "hook-script", status: "skip", detail: "knowledge.db 先修" },
    ];
    const out = renderDoctorResult(makeResult({ checks, skipped: 1, allPassed: true }));
    expect(out).not.toContain("全部检查通过");
    expect(out).toContain("跳过项");
  });
});

describe("checkTeamSharingStatus", () => {
  it("reports M5 viral-sync as pass after end-to-end verification (B-150 fix)", () => {
    const result = checkTeamSharingStatus();
    expect(result.status).toBe("pass");
    expect(result.detail).toContain("M5 viral-sync");
    expect(result.detail).toContain("gate-1");
    expect(result.detail).toContain("LWW");
  });
});

describe("parseDoctorArgs", () => {
  it("defaults all false", () => {
    const opts = parseDoctorArgs([]);
    expect(opts.fix).toBe(false);
    expect(opts.json).toBe(false);
    expect(opts.postinstall).toBe(false);
  });

  it("parses --fix --json --postinstall", () => {
    const opts = parseDoctorArgs(["--fix", "--json", "--postinstall"]);
    expect(opts.fix).toBe(true);
    expect(opts.json).toBe(true);
    expect(opts.postinstall).toBe(true);
  });
});

describe("doctor CLAUDE.md checks", () => {
  it("parseDoctorArgs recognizes --fix", () => {
    expect(parseDoctorArgs(["--fix"]).fix).toBe(true);
  });

  it("does not require CLAUDE.md or suggest compile as a fix", () => {
    const root = fs.mkdtempSync(path.join(os.tmpdir(), "doctor-cli-"));
    try {
      const claudeMd = checkClaudeMd(path.join(root, "CLAUDE.md"));
      expect(claudeMd?.status).not.toBe("fail");
      expect(claudeMd?.fix).toBeUndefined();
    } finally {
      fs.rmSync(root, { recursive: true, force: true });
    }
  });

  it("flags old generated TEAMAGENT blocks and points users at --fix (B-109)", () => {
    const root = fs.mkdtempSync(path.join(os.tmpdir(), "doctor-cli-"));
    try {
      fs.writeFileSync(
        path.join(root, "CLAUDE.md"),
        "# Manual\n\n<!-- TEAMAGENT:START - old -->\n- generated\n<!-- TEAMAGENT:END -->\n",
      );
      const claudeMd = checkClaudeMd(path.join(root, "CLAUDE.md"));
      expect(claudeMd?.status).toBe("fail");
      expect(claudeMd?.detail).toContain("旧 TEAMAGENT:START");
      // The fix suggestion must NOT call `compile` (which would re-write the
      // block); it must point at `doctor --fix` which strips the block.
      expect(claudeMd?.fix).toBeDefined();
      expect(claudeMd?.fix).toContain("doctor --fix");
      expect(claudeMd?.fix).not.toMatch(/\bcompile\b/);
    } finally {
      fs.rmSync(root, { recursive: true, force: true });
    }
  });
});

describe("executeDoctor team-sharing boundary", () => {
  const passingClaudeProbe: ClaudeProbe = () => ({
    ok: true,
    stdout: "2.1.126 (Claude Code)\n",
    stderr: "",
  });

  function makeTempWorkspace(): { cwd: string; homeDir: string; cleanup: () => void } {
    const root = fs.mkdtempSync(path.join(os.tmpdir(), "teamagent-doctor-"));
    const cwd = path.join(root, "workspace");
    const homeDir = path.join(root, "home");
    fs.mkdirSync(cwd, { recursive: true });
    fs.mkdirSync(homeDir, { recursive: true });
    return {
      cwd,
      homeDir,
      cleanup: () => fs.rmSync(root, { recursive: true, force: true }),
    };
  }

  function createKnowledgeDb(cwd: string): void {
    const dbPath = path.join(cwd, ".teamagent", "knowledge.db");
    fs.mkdirSync(path.dirname(dbPath), { recursive: true });
    const db = openDb(dbPath);
    db.close();
  }

  it("reports team-sharing pass even when knowledge.db is missing (M5 viral-sync is independent of L1 knowledge.db)", async () => {
    const workspace = makeTempWorkspace();
    try {
      const result = await executeDoctor({
        cwd: workspace.cwd,
        homeDir: workspace.homeDir,
        claudeProbe: passingClaudeProbe,
      });
      const names = result.checks.map((check) => check.name);
      expect(names).toContain("knowledge-db");
      expect(names).toContain("team-sharing");
      expect(result.checks.find((check) => check.name === "knowledge-db")?.status).toBe("fail");
      expect(result.checks.find((check) => check.name === "team-sharing")).toMatchObject({
        status: "pass",
        detail: expect.stringContaining("M5 viral-sync"),
      });
    } finally {
      workspace.cleanup();
    }
  });

  it("reports team-sharing pass when hook registration is missing (team sync layer is decoupled from per-clone hook install)", async () => {
    const workspace = makeTempWorkspace();
    try {
      createKnowledgeDb(workspace.cwd);
      const result = await executeDoctor({
        cwd: workspace.cwd,
        homeDir: workspace.homeDir,
        claudeProbe: passingClaudeProbe,
      });
      const names = result.checks.map((check) => check.name);
      expect(names).toContain("hook-registered");
      expect(names).toContain("team-sharing");
      expect(result.checks.find((check) => check.name === "hook-registered")?.status).toBe("fail");
      expect(result.checks.find((check) => check.name === "team-sharing")).toMatchObject({
        status: "pass",
        detail: expect.stringContaining("M5 viral-sync"),
      });
    } finally {
      workspace.cleanup();
    }
  });

  // From #74: user-level settings.json should satisfy hook-registered
  it("passes hook-registered when only user-level settings.json has a teamagent hook", async () => {
    const workspace = makeTempWorkspace();
    try {
      createKnowledgeDb(workspace.cwd);
      const userClaudeDir = path.join(workspace.homeDir, ".claude");
      fs.mkdirSync(userClaudeDir, { recursive: true });
      fs.writeFileSync(
        path.join(userClaudeDir, "settings.json"),
        JSON.stringify({
          hooks: {
            SessionStart: [
              {
                _teamagentTag: "teamagent-session-start",
                hooks: [{ type: "command", command: "node /fake/bin-session-start.cjs", timeout: 10 }],
              },
            ],
          },
        }),
      );
      const result = await executeDoctor({
        cwd: workspace.cwd,
        homeDir: workspace.homeDir,
        claudeProbe: passingClaudeProbe,
      });
      expect(result.checks.find((c) => c.name === "hook-registered")?.status).toBe("pass");
    } finally {
      workspace.cleanup();
    }
  });

  // B-109: doctor --fix should strip the legacy TEAMAGENT block from CLAUDE.md
  it("--fix strips legacy TEAMAGENT:START block and re-checks pass (B-109)", async () => {
    const workspace = makeTempWorkspace();
    try {
      createKnowledgeDb(workspace.cwd);
      const claudeMdPath = path.join(workspace.cwd, "CLAUDE.md");
      fs.writeFileSync(
        claudeMdPath,
        "# Project\n\nManual notes here.\n\n<!-- TEAMAGENT:START - old -->\n- generated rule\n<!-- TEAMAGENT:END -->\n\nFooter.\n",
      );
      const result = await executeDoctor({
        cwd: workspace.cwd,
        homeDir: workspace.homeDir,
        claudeProbe: passingClaudeProbe,
        fix: true,
      });
      const claudeMd = result.checks.find((c) => c.name === "claude-md");
      expect(claudeMd?.status).toBe("pass");
      const after = fs.readFileSync(claudeMdPath, "utf-8");
      expect(after).not.toContain("TEAMAGENT:START");
      expect(after).toContain("Manual notes here.");
      expect(after).toContain("Footer.");
    } finally {
      workspace.cleanup();
    }
  });

  it("--fix removes CLAUDE.md when the file was only the legacy block (B-109)", async () => {
    const workspace = makeTempWorkspace();
    try {
      createKnowledgeDb(workspace.cwd);
      const claudeMdPath = path.join(workspace.cwd, "CLAUDE.md");
      fs.writeFileSync(
        claudeMdPath,
        "<!-- TEAMAGENT:START - old -->\n- only rule\n<!-- TEAMAGENT:END -->\n",
      );
      await executeDoctor({
        cwd: workspace.cwd,
        homeDir: workspace.homeDir,
        claudeProbe: passingClaudeProbe,
        fix: true,
      });
      expect(fs.existsSync(claudeMdPath)).toBe(false);
    } finally {
      workspace.cleanup();
    }
  });
});

describe("checkClaudeCode", () => {
  function makeProbe(opts: {
    localResult: ClaudeProbeResult;
    globalResult?: ClaudeProbeResult;
  }): { probe: ClaudeProbe; callCount: () => number } {
    let count = 0;
    const probe: ClaudeProbe = (env) => {
      count += 1;
      if (env === undefined) return opts.localResult;
      return opts.globalResult ?? { ok: false, stdout: "", stderr: "command not found: claude" };
    };
    return { probe, callCount: () => count };
  }

  // process.env.PATH must contain node_modules/.bin for the retry path to fire
  // (envWithoutNodeModulesBin returns null when there's nothing to strip).
  function withInjectedNodeModulesPath(fn: () => void): void {
    const originalPath = process.env.PATH;
    if (!originalPath || !pathContainsNodeModulesBin(originalPath)) {
      process.env.PATH = `/repo/node_modules/.bin${originalPath ? ":" + originalPath : ""}`;
    }
    try {
      fn();
    } finally {
      if (originalPath !== undefined) process.env.PATH = originalPath;
      else delete process.env.PATH;
    }
  }

  const BROKEN_STUB_STDERR =
    "Error: claude native binary not installed.\n\nEither postinstall did not run (--ignore-scripts, some pnpm configs)\nor the platform-native optional dependency was not downloaded\n(--omit=optional).\n\nRun the postinstall manually:\n  node node_modules/@anthropic-ai/claude-code/install.cjs\n";

  it("(a) local broken + global working → pass with fallback note", () => {
    withInjectedNodeModulesPath(() => {
      const { probe, callCount } = makeProbe({
        localResult: { ok: false, stdout: "", stderr: BROKEN_STUB_STDERR },
        globalResult: { ok: true, stdout: "2.1.126 (Claude Code)\n", stderr: "" },
      });
      const result = checkClaudeCode(probe);
      expect(result.status).toBe("pass");
      expect(result.detail).toContain("2.1.126");
      expect(result.detail).toMatch(/全局|fallback|本地 pnpm 副本损坏/);
      expect(callCount()).toBe(2);
    });
  });

  it("(b) local broken + global missing → fail with new fix message", () => {
    withInjectedNodeModulesPath(() => {
      const { probe } = makeProbe({
        localResult: { ok: false, stdout: "", stderr: BROKEN_STUB_STDERR },
        globalResult: { ok: false, stdout: "", stderr: "claude: command not found" },
      });
      const result = checkClaudeCode(probe);
      expect(result.status).toBe("fail");
      expect(result.detail).toContain("本地 pnpm 副本");
      expect(result.fix).toContain("install.cjs");
      expect(result.fix).toContain("全局 claude");
    });
  });

  it("(c) global pass on first try → pass as today", () => {
    const { probe, callCount } = makeProbe({
      localResult: { ok: true, stdout: "2.1.126 (Claude Code)\n", stderr: "" },
    });
    const result = checkClaudeCode(probe);
    expect(result.status).toBe("pass");
    expect(result.detail).toBe("2.1.126 (Claude Code)");
    expect(result.fix).toBeUndefined();
    expect(callCount()).toBe(1);
  });

  it("(d) generic command-not-found (no broken-stub signature) → original fail message", () => {
    const { probe } = makeProbe({
      localResult: { ok: false, stdout: "", stderr: "claude: command not found" },
    });
    const result = checkClaudeCode(probe);
    expect(result.status).toBe("fail");
    expect(result.detail).toBe("未找到 claude 命令");
    expect(result.fix).toBe("npm install -g @anthropic-ai/claude-code");
  });
});

describe("checkSettingsJsonScope", () => {
  function makeTmpDir(): { dir: string; cleanup: () => void } {
    const dir = fs.mkdtempSync(path.join(os.tmpdir(), "doctor-scope-"));
    return { dir, cleanup: () => fs.rmSync(dir, { recursive: true, force: true }) };
  }

  function writeHookSettings(filePath: string): void {
    fs.mkdirSync(path.dirname(filePath), { recursive: true });
    fs.writeFileSync(filePath, JSON.stringify({
      hooks: {
        PreToolUse: [{ _teamagentTag: "teamagent-pre-tool-use", hooks: [] }],
      },
    }));
  }

  it("pass when project-level settings.local.json has hook", () => {
    const { dir, cleanup } = makeTmpDir();
    try {
      const projectSettings = path.join(dir, ".claude", "settings.local.json");
      writeHookSettings(projectSettings);
      const result = checkSettingsJsonScope(projectSettings, path.join(dir, "user", ".claude", "settings.json"));
      expect(result.status).toBe("pass");
      expect(result.detail).toContain("项目级");
    } finally { cleanup(); }
  });

  it("pass when only user-level settings.json has hook", () => {
    const { dir, cleanup } = makeTmpDir();
    try {
      const userSettings = path.join(dir, ".claude", "settings.json");
      writeHookSettings(userSettings);
      const result = checkSettingsJsonScope(
        path.join(dir, "project", ".claude", "settings.local.json"),
        userSettings,
      );
      expect(result.status).toBe("pass");
      expect(result.detail).toContain("用户级");
    } finally { cleanup(); }
  });

  it("fail when neither settings file has a hook", () => {
    const { dir, cleanup } = makeTmpDir();
    try {
      const result = checkSettingsJsonScope(
        path.join(dir, "no-project", ".claude", "settings.local.json"),
        path.join(dir, "no-user", ".claude", "settings.json"),
      );
      expect(result.status).toBe("fail");
      expect(result.fix).toContain("install-hook");
    } finally { cleanup(); }
  });
});

describe("checkPluginSync", () => {
  function makeTmpDir(): { dir: string; cleanup: () => void } {
    const dir = fs.mkdtempSync(path.join(os.tmpdir(), "doctor-plugins-"));
    return { dir, cleanup: () => fs.rmSync(dir, { recursive: true, force: true }) };
  }

  it("pass when project .claude/plugins has at least one plugin dir", () => {
    const { dir, cleanup } = makeTmpDir();
    try {
      const pluginsDir = path.join(dir, ".claude", "plugins", "some-plugin");
      fs.mkdirSync(pluginsDir, { recursive: true });
      const result = checkPluginSync(dir, path.join(dir, "home"));
      expect(result.status).toBe("pass");
      expect(result.detail).toContain("1");
    } finally { cleanup(); }
  });

  it("pass when user .claude/plugins has at least one plugin dir", () => {
    const { dir, cleanup } = makeTmpDir();
    try {
      const pluginsDir = path.join(dir, "home", ".claude", "plugins", "plugin-a");
      fs.mkdirSync(pluginsDir, { recursive: true });
      const result = checkPluginSync(path.join(dir, "project"), path.join(dir, "home"));
      expect(result.status).toBe("pass");
      expect(result.detail).toContain("用户级");
    } finally { cleanup(); }
  });

  it("fail when plugins dir does not exist", () => {
    const { dir, cleanup } = makeTmpDir();
    try {
      const result = checkPluginSync(dir, path.join(dir, "home"));
      expect(result.status).toBe("fail");
      expect(result.fix).toContain("install-plugins");
    } finally { cleanup(); }
  });

  it("fail when plugins dir is empty", () => {
    const { dir, cleanup } = makeTmpDir();
    try {
      fs.mkdirSync(path.join(dir, ".claude", "plugins"), { recursive: true });
      const result = checkPluginSync(dir, path.join(dir, "home"));
      expect(result.status).toBe("fail");
      expect(result.detail).toContain("空");
    } finally { cleanup(); }
  });
});

describe("checkCodexBin", () => {
  it("pass when codex probe returns ok", () => {
    const probe: CodexProbe = () => ({ ok: true, stdout: "0.1.0 codex\n", stderr: "" });
    const result = checkCodexBin(probe);
    expect(result.status).toBe("pass");
    expect(result.detail).toContain("0.1.0");
  });

  it("fail when codex probe fails", () => {
    const probe: CodexProbe = () => ({ ok: false, stdout: "", stderr: "command not found" });
    const result = checkCodexBin(probe);
    expect(result.status).toBe("fail");
    expect(result.detail).toContain("codex");
    expect(result.fix).toBeDefined();
  });
});

describe("checkMcpReachability", () => {
  function makeTmpDir(): { dir: string; cleanup: () => void } {
    const dir = fs.mkdtempSync(path.join(os.tmpdir(), "doctor-mcp-"));
    return { dir, cleanup: () => fs.rmSync(dir, { recursive: true, force: true }) };
  }

  it("skip when no mcpServers configured", async () => {
    const { dir, cleanup } = makeTmpDir();
    try {
      const result = await checkMcpReachability(dir);
      expect(result.status).toBe("skip");
    } finally { cleanup(); }
  });

  it("pass when all MCP servers are reachable", async () => {
    const { dir, cleanup } = makeTmpDir();
    try {
      const settingsPath = path.join(dir, ".claude", "settings.local.json");
      fs.mkdirSync(path.dirname(settingsPath), { recursive: true });
      fs.writeFileSync(settingsPath, JSON.stringify({
        mcpServers: { my_server: { url: "http://localhost:12345" } },
      }));
      const probe: McpProbe = async () => ({ reachable: true, detail: "HTTP 200" });
      const result = await checkMcpReachability(dir, probe);
      expect(result.status).toBe("pass");
      expect(result.detail).toContain("1");
    } finally { cleanup(); }
  });

  it("fail when an MCP server is unreachable", async () => {
    const { dir, cleanup } = makeTmpDir();
    try {
      const settingsPath = path.join(dir, ".claude", "settings.local.json");
      fs.mkdirSync(path.dirname(settingsPath), { recursive: true });
      fs.writeFileSync(settingsPath, JSON.stringify({
        mcpServers: { bad: { url: "http://localhost:1" } },
      }));
      const probe: McpProbe = async () => ({ reachable: false, detail: "ECONNREFUSED" });
      const result = await checkMcpReachability(dir, probe);
      expect(result.status).toBe("fail");
      expect(result.detail).toContain("http://localhost:1");
      expect(result.fix).toBeDefined();
    } finally { cleanup(); }
  });
});
