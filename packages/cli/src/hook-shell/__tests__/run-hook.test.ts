/**
 * Smoke tests for `runHook` — exercise the lifecycle invariants documented
 * in the file header of `index.ts` against a real temp-dir sqlite state.
 *
 * Strategy:
 *   - point HOME at a tmp dir so sqlite paths land in tmp
 *   - feed JSON via a fake `process.stdin` (Readable.from)
 *   - intercept `process.exit` so the test doesn't bail
 *   - capture `process.stdout` / `process.stderr` writes
 *   - assert: handler called with parsed input, stdout payload formatted,
 *     exit 0 reached, no thrown exceptions escape the shell
 *
 * Full per-channel contract coverage lives in commit 5+ (bin canaries).
 */
import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import * as fs from "node:fs";
import * as os from "node:os";
import * as path from "node:path";
import { Readable } from "node:stream";

import { runHook } from "../index.js";
import type { DefaultHookContext } from "../types.js";
import * as adapters from "@teamagent/adapters";

let tmpHome: string;
let tmpCwd: string;
let origTeamagentHome: string | undefined;
let origClaudeProjectDir: string | undefined;
let origExit: typeof process.exit;
let origStdin: NodeJS.ReadStream;
let stdoutBuf: string[];
let stderrBuf: string[];
let origStdoutWrite: typeof process.stdout.write;
let origStderrWrite: typeof process.stderr.write;
let exitCode: number | undefined;

function feedStdin(text: string): void {
  const stream = Readable.from([Buffer.from(text, "utf-8")]) as unknown as NodeJS.ReadStream;
  Object.defineProperty(process, "stdin", {
    configurable: true,
    get: () => stream,
  });
}

beforeEach(() => {
  tmpHome = fs.mkdtempSync(path.join(os.tmpdir(), "teamagent-hook-shell-home-"));
  tmpCwd = fs.mkdtempSync(path.join(os.tmpdir(), "teamagent-hook-shell-cwd-"));

  // TEAMAGENT_HOME is the production-honored override for "where TeamAgent
  // keeps its state directories". Setting it redirects the shell's home
  // without monkey-patching `node:os` (whose `homedir()` ignores
  // `process.env.HOME` in worker threads due to libuv caching).
  origTeamagentHome = process.env.TEAMAGENT_HOME;
  process.env.TEAMAGENT_HOME = tmpHome;

  // Save and clear CLAUDE_PROJECT_DIR so cwd-priority tests start clean.
  origClaudeProjectDir = process.env.CLAUDE_PROJECT_DIR;
  delete process.env.CLAUDE_PROJECT_DIR;

  origExit = process.exit;
  exitCode = undefined;
  (process as { exit: (code?: number) => never }).exit = ((code?: number) => {
    exitCode = code ?? 0;
    throw new Error("__EXIT__");
  }) as never;

  origStdin = process.stdin;
  stdoutBuf = [];
  stderrBuf = [];
  origStdoutWrite = process.stdout.write.bind(process.stdout);
  origStderrWrite = process.stderr.write.bind(process.stderr);
  process.stdout.write = ((chunk: string | Uint8Array): boolean => {
    stdoutBuf.push(typeof chunk === "string" ? chunk : Buffer.from(chunk).toString("utf-8"));
    return true;
  }) as typeof process.stdout.write;
  process.stderr.write = ((chunk: string | Uint8Array): boolean => {
    stderrBuf.push(typeof chunk === "string" ? chunk : Buffer.from(chunk).toString("utf-8"));
    return true;
  }) as typeof process.stderr.write;
});

afterEach(() => {
  if (origTeamagentHome === undefined) delete process.env.TEAMAGENT_HOME;
  else process.env.TEAMAGENT_HOME = origTeamagentHome;
  if (origClaudeProjectDir === undefined) delete process.env.CLAUDE_PROJECT_DIR;
  else process.env.CLAUDE_PROJECT_DIR = origClaudeProjectDir;
  process.exit = origExit;
  Object.defineProperty(process, "stdin", { configurable: true, value: origStdin });
  process.stdout.write = origStdoutWrite;
  process.stderr.write = origStderrWrite;
  try { fs.rmSync(tmpHome, { recursive: true, force: true }); } catch { /* ignore */ }
  try { fs.rmSync(tmpCwd, { recursive: true, force: true }); } catch { /* ignore */ }
});

async function runUntilExit(fn: () => Promise<unknown>): Promise<void> {
  try { await fn(); } catch (err) {
    if ((err as Error).message !== "__EXIT__") throw err;
  }
}

describe("runHook lifecycle (default layer)", () => {
  it("parses stdin, calls handler, writes stdout, exits 0", async () => {
    feedStdin(JSON.stringify({ tool_name: "Bash", cwd: tmpCwd }));

    let handlerInput: { tool_name: string } | null = null;
    let handlerCwdSeen: string | null = null;

    await runUntilExit(() =>
      runHook<{ tool_name: string }, { ok: boolean }>({
        channel: "PreToolUse",
        parseInput: (raw: unknown) => {
          if (!raw || typeof raw !== "object") return null;
          const r = raw as Record<string, unknown>;
          if (typeof r.tool_name !== "string") return null;
          // Narrow: only carry tool_name into ctx.input.
          return { tool_name: r.tool_name };
        },
        handler: async (ctx: DefaultHookContext<{ tool_name: string }>) => {
          handlerInput = ctx.input;
          handlerCwdSeen = ctx.cwd;
          expect(ctx.store).toBeDefined();
          expect(ctx.eventLog).toBeDefined();
          expect(ctx.bus).toBeDefined();
          return { ok: true };
        },
      }),
    );

    expect(handlerInput).toEqual({ tool_name: "Bash" });
    // normalizeCwd is a no-op on POSIX (only handles MSYS paths) — so the
    // ctx.cwd equals the input cwd verbatim, no realpath resolution.
    expect(handlerCwdSeen).toBe(tmpCwd);
    expect(exitCode).toBe(0);
    expect(stdoutBuf.join("")).toBe(JSON.stringify({ ok: true }));
  });

  it("empty stdin → fast-exit 0 without calling handler", async () => {
    feedStdin("");

    let handlerCalled = false;
    await runUntilExit(() =>
      runHook<unknown, undefined>({
        channel: "PostToolUse",
        // null input (empty stdin) propagates through parseInput → fast-exit.
        parseInput: (raw: unknown) => raw === null ? null : raw,
        handler: () => { handlerCalled = true; return undefined; },
      }),
    );

    expect(handlerCalled).toBe(false);
    expect(exitCode).toBe(0);
  });

  it("parseInput returns null → fast-exit 0", async () => {
    feedStdin(JSON.stringify({ irrelevant: true }));

    let handlerCalled = false;
    await runUntilExit(() =>
      runHook<unknown, undefined>({
        channel: "Stop",
        parseInput: (_raw: unknown) => null,
        handler: () => { handlerCalled = true; return undefined; },
      }),
    );

    expect(handlerCalled).toBe(false);
    expect(exitCode).toBe(0);
  });

  it("handler throws → stderr fallback log + exit 0 (never blocks)", async () => {
    feedStdin(JSON.stringify({ x: 1, cwd: tmpCwd }));

    await runUntilExit(() =>
      runHook<unknown, undefined>({
        channel: "Stop",
        parseInput: (raw: unknown) => raw,
        handler: () => { throw new Error("boom"); },
      }),
    );

    expect(exitCode).toBe(0);
    expect(stderrBuf.join("")).toContain("Stop-hook");
    expect(stderrBuf.join("")).toContain("handler");
  });

  it("envelope wraps handler return value before stdout", async () => {
    feedStdin(JSON.stringify({ x: 1, cwd: tmpCwd }));

    await runUntilExit(() =>
      runHook<unknown, { decision: string }>({
        channel: "PreToolUse",
        parseInput: (raw: unknown) => raw,
        handler: () => ({ decision: "allow" }),
        envelope: (out: { decision: string }) => ({ wrapped: out }),
      }),
    );

    expect(stdoutBuf.join("")).toBe(JSON.stringify({ wrapped: { decision: "allow" } }));
  });

  it("malformed JSON → stderr fallback + exit 0", async () => {
    feedStdin("not json {{{");

    let handlerCalled = false;
    await runUntilExit(() =>
      runHook<unknown, undefined>({
        channel: "PreToolUse",
        parseInput: (_raw: unknown) => null,
        handler: () => { handlerCalled = true; return undefined; },
      }),
    );

    expect(handlerCalled).toBe(false);
    expect(exitCode).toBe(0);
    expect(stderrBuf.join("")).toContain("PreToolUse-hook");
    expect(stderrBuf.join("")).toContain("stdin parse");
  });

  it("handler can call mirrorSystemMessage which writes to stderr", async () => {
    feedStdin(JSON.stringify({ x: 1, cwd: tmpCwd }));

    await runUntilExit(() =>
      runHook<unknown, undefined>({
        channel: "PreToolUse",
        parseInput: (raw: unknown) => raw,
        handler: (ctx: DefaultHookContext<unknown>) => {
          ctx.mirrorSystemMessage("hello from handler");
          return undefined;
        },
      }),
    );

    expect(stderrBuf.join("")).toContain("hello from handler");
    expect(exitCode).toBe(0);
  });

  it("creates .teamagent dirs when handler accesses ctx.store", async () => {
    feedStdin(JSON.stringify({ x: 1, cwd: tmpCwd }));

    await runUntilExit(() =>
      runHook<unknown, undefined>({
        channel: "Stop",
        parseInput: (raw: unknown) => raw,
        // Access ctx.store to trigger the lazy open (and dir creation).
        handler: (ctx: DefaultHookContext<unknown>) => {
          void ctx.store; // trigger getter
          return undefined;
        },
      }),
    );

    expect(fs.existsSync(path.join(tmpCwd, ".teamagent"))).toBe(true);
    expect(fs.existsSync(path.join(tmpHome, ".teamagent"))).toBe(true);
  });

  it("does NOT open DualLayerStore if handler skips ctx.store", async () => {
    feedStdin(JSON.stringify({ x: 1, cwd: tmpCwd }));

    // Cast to `any` is intentional: vi.spyOn requires a key whose value is a
    // function/constructor, but `keyof typeof adapters` now includes string-
    // constant exports (e.g. INIT_SQL from schema.ts) that widen the union
    // beyond what the overload accepts. The target "DualLayerStore" is a class
    // constructor, so the spy is correct at runtime.
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const constructorSpy = vi
      .spyOn(adapters as Record<string, unknown> as any, "DualLayerStore")
      .mockImplementation(function (this: unknown) {
        // Should never be called in this test.
        throw new Error("DualLayerStore unexpectedly constructed");
      } as never);

    try {
      await runUntilExit(() =>
        runHook<unknown, undefined>({
          channel: "PostToolUse",
          parseInput: (raw: unknown) => raw,
          // Handler deliberately skips ctx.store and ctx.eventLog.
          handler: () => undefined,
        }),
      );
    } finally {
      constructorSpy.mockRestore();
    }

    expect(constructorSpy).not.toHaveBeenCalled();
    expect(exitCode).toBe(0);
    // Belt-and-suspenders: lock in the no-filesystem-side-effect guarantee at
    // the OS level. If ensureDirsOnce is ever decoupled from the DualLayerStore
    // constructor path (e.g. called eagerly by the bus), the spy still passes
    // but these fs assertions would catch the regression.
    expect(fs.existsSync(path.join(tmpCwd, ".teamagent"))).toBe(false);
    expect(fs.existsSync(path.join(tmpHome, ".teamagent"))).toBe(false);
  });

  it("does NOT open DualLayerStore via {...ctx} spread", async () => {
    // Regression guard for the enumerable:false property descriptor on ctx.store
    // and ctx.eventLog. If either getter is ever made enumerable, spreading ctx
    // (e.g. in a logging or serialisation path) would fire the getter as a side
    // effect and open SQLite on disk — defeating the lazy-open guarantee.
    feedStdin(JSON.stringify({ x: 1, cwd: tmpCwd }));

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const constructorSpy = vi
      .spyOn(adapters as Record<string, unknown> as any, "DualLayerStore")
      .mockImplementation(function (this: unknown) {
        throw new Error("DualLayerStore unexpectedly constructed via spread");
      } as never);

    try {
      await runUntilExit(() =>
        runHook<unknown, undefined>({
          channel: "PostToolUse",
          parseInput: (raw: unknown) => raw,
          handler: (ctx: DefaultHookContext<unknown>) => {
            // Spread ctx — must NOT trigger the store/eventLog getters.
            const _ = { ...ctx };
            void _;
            return undefined;
          },
        }),
      );
    } finally {
      constructorSpy.mockRestore();
    }

    expect(constructorSpy).not.toHaveBeenCalled();
    expect(exitCode).toBe(0);
  });

  // ── cwd resolution priority chain (Codex P2 fix on PR #152) ──────────────

  it("cwd priority 1: raw.cwd from stdin takes precedence over CLAUDE_PROJECT_DIR", async () => {
    // Create two distinct real tmpdirs — one sent via stdin, one via env.
    const stdinCwd = fs.mkdtempSync(path.join(os.tmpdir(), "hook-cwd-stdin-"));
    const envCwd = fs.mkdtempSync(path.join(os.tmpdir(), "hook-cwd-env-"));
    try {
      // Stdin payload carries cwd; env fallback is also set.
      process.env.CLAUDE_PROJECT_DIR = envCwd;
      feedStdin(JSON.stringify({ tool_name: "Bash", cwd: stdinCwd }));

      let capturedCwd: string | undefined;
      await runUntilExit(() =>
        runHook<unknown, undefined>({
          channel: "PreToolUse",
          parseInput: (raw: unknown) => raw,
          handler: (ctx: DefaultHookContext<unknown>) => {
            capturedCwd = ctx.cwd;
            return undefined;
          },
        }),
      );

      // Stdin cwd wins — env fallback must NOT be used.
      expect(capturedCwd).toBe(stdinCwd);
      expect(capturedCwd).not.toBe(envCwd);
      expect(exitCode).toBe(0);
    } finally {
      try { fs.rmSync(stdinCwd, { recursive: true, force: true }); } catch { /* ignore */ }
      try { fs.rmSync(envCwd, { recursive: true, force: true }); } catch { /* ignore */ }
    }
  });

  it("cwd priority 2: CLAUDE_PROJECT_DIR used when stdin has no cwd field", async () => {
    // Stdin payload has NO cwd field; env provides the project dir.
    const envCwd = fs.mkdtempSync(path.join(os.tmpdir(), "hook-cwd-env-"));
    try {
      process.env.CLAUDE_PROJECT_DIR = envCwd;
      // Deliberately omit the `cwd` key from stdin.
      feedStdin(JSON.stringify({ tool_name: "Bash" }));

      let capturedCwd: string | undefined;
      await runUntilExit(() =>
        runHook<unknown, undefined>({
          channel: "PreToolUse",
          parseInput: (raw: unknown) => raw,
          handler: (ctx: DefaultHookContext<unknown>) => {
            capturedCwd = ctx.cwd;
            return undefined;
          },
        }),
      );

      // Env fallback wins — process.cwd() must NOT be used.
      expect(capturedCwd).toBe(envCwd);
      expect(exitCode).toBe(0);
    } finally {
      try { fs.rmSync(envCwd, { recursive: true, force: true }); } catch { /* ignore */ }
    }
  });

  it("cwd priority 3: process.cwd() used as last resort when no stdin cwd and no CLAUDE_PROJECT_DIR", async () => {
    // Ensure the env var is absent (beforeEach already deleted it, belt-and-suspenders).
    delete process.env.CLAUDE_PROJECT_DIR;
    // Stdin payload has no cwd field.
    feedStdin(JSON.stringify({ tool_name: "Bash" }));

    let capturedCwd: string | undefined;
    await runUntilExit(() =>
      runHook<unknown, undefined>({
        channel: "PreToolUse",
        parseInput: (raw: unknown) => raw,
        handler: (ctx: DefaultHookContext<unknown>) => {
          capturedCwd = ctx.cwd;
          return undefined;
        },
      }),
    );

    // normalizeCwd is a no-op on POSIX (only rewrites MSYS /c/... paths),
    // so ctx.cwd should equal process.cwd() verbatim.
    expect(capturedCwd).toBe(process.cwd());
    expect(exitCode).toBe(0);
  });
});
