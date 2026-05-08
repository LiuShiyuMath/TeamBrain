import { describe, it, expect, beforeEach, afterEach } from "vitest";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { pathToFileURL } from "node:url";
import {
  findUpdaterBinary,
  runUpdateCommand,
  parseUpdateArgs,
  writeState,
} from "../commands/update.js";
import { defaultUpdateState } from "@teamagent/core";

let tmpHome: string;
let envBak: string | undefined;

beforeEach(() => {
  tmpHome = fs.mkdtempSync(path.join(os.tmpdir(), "tg-upd-cmd-"));
  envBak = process.env["TEAMAGENT_HOME"];
  process.env["TEAMAGENT_HOME"] = tmpHome;
});

afterEach(() => {
  if (envBak === undefined) delete process.env["TEAMAGENT_HOME"];
  else process.env["TEAMAGENT_HOME"] = envBak;
  fs.rmSync(tmpHome, { recursive: true, force: true });
});

describe("update command", () => {
  it("status default returns full snapshot", async () => {
    const s = defaultUpdateState();
    s.last_installed_sha = "abcdef1234";
    writeState(s);
    const r = await runUpdateCommand("status");
    expect(r.ok).toBe(true);
    expect(r.output).toContain("abcdef1234");
    expect(r.output).toContain("updater_binary:");
  });

  it("findUpdaterBinary exposes missing updater without running install", () => {
    const fakeModule = path.join(tmpHome, "src", "commands", "update.js");
    expect(findUpdaterBinary(`file://${fakeModule}`)).toBeNull();
  });

  it("disable creates marker, enable removes", async () => {
    const dis = await runUpdateCommand("disable");
    expect(dis.ok).toBe(true);
    expect(fs.existsSync(path.join(tmpHome, "auto-update.disabled"))).toBe(true);
    const en = await runUpdateCommand("enable");
    expect(en.ok).toBe(true);
    expect(fs.existsSync(path.join(tmpHome, "auto-update.disabled"))).toBe(false);
  });

  it("logs shows tail or empty", async () => {
    const r = await runUpdateCommand("logs");
    expect(r.output).toBe("(empty)\n");
    fs.writeFileSync(path.join(tmpHome, "update.log"), "line1\nline2\n");
    const r2 = await runUpdateCommand("logs");
    expect(r2.output).toContain("line1");
  });

  it("parseUpdateArgs picks correct subcommand", () => {
    expect(parseUpdateArgs(["--status"]).sub).toBe("status");
    expect(parseUpdateArgs(["--check"]).sub).toBe("check");
    expect(parseUpdateArgs(["--rollback", "abc"]).rest).toEqual(["abc"]);
    expect(parseUpdateArgs([]).sub).toBe("status");
  });

  it("rollback with no backups returns error", async () => {
    const r = await runUpdateCommand("rollback", []);
    expect(r.ok).toBe(false);
    expect(r.output).toContain("no backups");
  });
});

// Issue #151: findUpdaterBinary returned null in every real install layout
// because both candidate paths jumped out of dist/, but published artifacts
// keep update-*.js and bin-updater.cjs as siblings inside dist/. Regression
// guard for the three layouts the function must support.
describe("findUpdaterBinary install layouts (issue #151)", () => {
  let tmpRoot: string;

  beforeEach(() => {
    tmpRoot = fs.mkdtempSync(path.join(os.tmpdir(), "tg-find-updater-"));
  });

  afterEach(() => {
    fs.rmSync(tmpRoot, { recursive: true, force: true });
  });

  it("npm flat dist layout: locates sibling bin-updater.cjs", () => {
    // npm published artifact: <root>/dist/update-XXX.js + <root>/dist/bin-updater.cjs
    const dist = path.join(tmpRoot, "teamagent", "dist");
    fs.mkdirSync(dist, { recursive: true });
    const updaterFile = path.join(dist, "bin-updater.cjs");
    fs.writeFileSync(updaterFile, "// stub");
    const updateModule = path.join(dist, "update-NPMFLAT.js");
    fs.writeFileSync(updateModule, "// stub");

    const found = findUpdaterBinary(pathToFileURL(updateModule).href);
    expect(found).toBe(updaterFile);
  });

  it("monorepo dev tree (packages/cli/dist): locates sibling bin-updater.cjs", () => {
    const cliDist = path.join(tmpRoot, "packages", "cli", "dist");
    fs.mkdirSync(cliDist, { recursive: true });
    const updaterFile = path.join(cliDist, "bin-updater.cjs");
    fs.writeFileSync(updaterFile, "// stub");
    const updateModule = path.join(cliDist, "update-MONOREPO.js");
    fs.writeFileSync(updateModule, "// stub");

    const found = findUpdaterBinary(pathToFileURL(updateModule).href);
    expect(found).toBe(updaterFile);
  });

  it("returns null when bin-updater.cjs is absent", () => {
    const dist = path.join(tmpRoot, "teamagent", "dist");
    fs.mkdirSync(dist, { recursive: true });
    const updateModule = path.join(dist, "update-MISSING.js");
    fs.writeFileSync(updateModule, "// stub");

    const found = findUpdaterBinary(pathToFileURL(updateModule).href);
    expect(found).toBeNull();
  });
});
