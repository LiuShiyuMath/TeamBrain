import { describe, it, expect } from "vitest";
import { promises as fs } from "node:fs";
import * as os from "node:os";
import * as path from "node:path";
import { runM5Infect } from "../commands/m5-infect.js";
import { runM5Bootstrap } from "../commands/m5-bootstrap.js";
import { FsBootstrap } from "@teamagent/adapters/m5/fs-bootstrap";

/** Stub port that reports "本机什么都没装"——测试需要确定性，不依赖实际机器配置。 */
function makeStubPort(): FsBootstrap {
  return new FsBootstrap({
    readTeamagentVersion: async () => null,
    readInstalledPlugins: async () => [],
    readInstalledProjectSkills: async () => [],
    readInstalledHooks: async () => [],
  });
}

describe("m5-infect command", () => {
  it("infects a clean project with all artifacts", async () => {
    const root = await fs.mkdtemp(path.join(os.tmpdir(), "m5-cli-"));
    try {
      const r = await runM5Infect({
        projectRoot: root,
        author: "tester",
        teamagentVersion: "0.9.4",
        now: "2026-05-06T10:00:00Z",
      });
      expect(r.skipped).toBe(false);
      expect(r.written_files).toContain(".teamagent/manifest.json");
      expect(r.written_files).toContain(".githooks/pre-commit");
      expect(r.written_dirs).toContain(".teamagent/team");
      const manifest = await fs.readFile(
        path.join(root, ".teamagent", "manifest.json"),
        "utf8"
      );
      expect(manifest).toContain('"created_by": "tester"');
      expect(manifest).toContain('"teamagent_version": "0.9.4"');
    } finally {
      await fs.rm(root, { recursive: true, force: true });
    }
  });

  it("is idempotent on already-infected project", async () => {
    const root = await fs.mkdtemp(path.join(os.tmpdir(), "m5-cli-"));
    try {
      await runM5Infect({
        projectRoot: root,
        author: "a",
        teamagentVersion: "0.9.4",
        now: "2026-05-06T10:00:00Z",
      });
      const r2 = await runM5Infect({
        projectRoot: root,
        author: "b",
        teamagentVersion: "0.9.5",
        now: "2026-05-06T11:00:00Z",
      });
      expect(r2.skipped).toBe(true);
      const manifest = await fs.readFile(
        path.join(root, ".teamagent", "manifest.json"),
        "utf8"
      );
      // 不被覆盖：仍是第一次的 author / 版本
      expect(manifest).toContain('"created_by": "a"');
    } finally {
      await fs.rm(root, { recursive: true, force: true });
    }
  });
});

describe("m5-bootstrap command", () => {
  it("returns diff=null on uninfected project", async () => {
    const root = await fs.mkdtemp(path.join(os.tmpdir(), "m5-cli-"));
    try {
      const r = await runM5Bootstrap({ projectRoot: root, checkOnly: true, port: makeStubPort() });
      expect(r.diff).toBeNull();
      expect(r.reason).toContain("no manifest");
    } finally {
      await fs.rm(root, { recursive: true, force: true });
    }
  });

  it("returns needs_bootstrap=true when manifest requires plugins missing locally", async () => {
    const root = await fs.mkdtemp(path.join(os.tmpdir(), "m5-cli-"));
    try {
      await runM5Infect({
        projectRoot: root,
        author: "tester",
        teamagentVersion: "0.9.4",
        now: "2026-05-06T10:00:00Z",
      });
      // 改 manifest 加 required_plugins
      const mPath = path.join(root, ".teamagent", "manifest.json");
      const raw = await fs.readFile(mPath, "utf8");
      const m = JSON.parse(raw);
      m.required_plugins = ["caveman", "superpowers"];
      await fs.writeFile(mPath, JSON.stringify(m, null, 2));
      const r = await runM5Bootstrap({ projectRoot: root, checkOnly: true, port: makeStubPort() });
      expect(r.diff?.needs_bootstrap).toBe(true);
      expect(r.diff?.install_plugins).toEqual(["caveman", "superpowers"]);
    } finally {
      await fs.rm(root, { recursive: true, force: true });
    }
  });
});
