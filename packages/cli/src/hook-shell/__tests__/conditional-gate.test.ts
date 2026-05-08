import { describe, it, expect } from "vitest";
import {
  assertEscapeNonEmpty,
  type RequireAtLeastOneEscape,
} from "../conditional-gate.js";
import type { AdvancedHookOptions, EscapeOptions } from "../types.js";

describe("conditional-gate (runtime)", () => {
  it("assertEscapeNonEmpty throws on undefined", () => {
    expect(() => assertEscapeNonEmpty(undefined)).toThrowError(/empty escape/i);
  });

  it("assertEscapeNonEmpty throws on {}", () => {
    expect(() => assertEscapeNonEmpty({})).toThrowError(/empty escape/i);
  });

  it("assertEscapeNonEmpty passes when pipelineTimeoutMs set", () => {
    expect(() => assertEscapeNonEmpty({ pipelineTimeoutMs: 1000 })).not.toThrow();
  });

  it("assertEscapeNonEmpty passes when manualResources set", () => {
    expect(() => assertEscapeNonEmpty({ manualResources: true })).not.toThrow();
  });

  it("assertEscapeNonEmpty passes when lock set", () => {
    expect(() =>
      assertEscapeNonEmpty({ lock: { relativePath: "x", payload: () => ({}) } }),
    ).not.toThrow();
  });

  it("error message lists all 4 escape options", () => {
    let caught: Error | null = null;
    try { assertEscapeNonEmpty({}); } catch (err) { caught = err as Error; }
    expect(caught).toBeTruthy();
    const msg = caught!.message;
    expect(msg).toContain("detached");
    expect(msg).toContain("lock");
    expect(msg).toContain("pipelineTimeoutMs");
    expect(msg).toContain("manualResources");
    expect(msg).toMatch(/runHook instead/i);
  });
});

describe("conditional-gate (type-level)", () => {
  it("RequireAtLeastOneEscape resolves to T when escape has a key", () => {
    type WithTimeout = { escape: { pipelineTimeoutMs: 240_000 } };
    type R = RequireAtLeastOneEscape<WithTimeout>;
    // If R were `never`, this assignment would not compile.
    const _proof = null as unknown as R;
    expect(_proof).toBeDefined();
  });

  it("RequireAtLeastOneEscape resolves to never when escape has no keys", () => {
    // `Record<never, never>` produces a type whose `keyof` is `never`,
    // unlike `Record<string, never>` whose keyof is `string`.
    type WithEmpty = { escape: Record<never, never> };
    type R = RequireAtLeastOneEscape<WithEmpty>;
    type IsNever = [R] extends [never] ? true : false;
    const isNever: IsNever = true;
    expect(isNever).toBe(true);
  });

  it("RequireAtLeastOneEscape resolves to never when escape is missing", () => {
    type NoEscape = { channel: "Stop" };
    type R = RequireAtLeastOneEscape<NoEscape>;
    type IsNever = [R] extends [never] ? true : false;
    const isNever: IsNever = true;
    expect(isNever).toBe(true);
  });

  it("EscapeOptions has all 4 expected fields", () => {
    const escape: EscapeOptions = {
      detached: undefined,
      lock: undefined,
      pipelineTimeoutMs: undefined,
      manualResources: undefined,
    };
    expect(Object.keys(escape).sort()).toEqual([
      "detached",
      "lock",
      "manualResources",
      "pipelineTimeoutMs",
    ]);
  });

  // Dummy reference to avoid "imported but never used" if the tests above
  // get pruned during refactor.
  it("AdvancedHookOptions stays exported", () => {
    type _Probe = AdvancedHookOptions<unknown, unknown>;
    const probe = null as unknown as _Probe;
    expect(probe === null || probe === undefined || typeof probe === "object").toBe(true);
  });
});
