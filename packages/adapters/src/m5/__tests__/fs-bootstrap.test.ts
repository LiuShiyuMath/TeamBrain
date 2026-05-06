import { describe } from "vitest";
import { runBootstrapPortContract } from "@teamagent/ports/contracts";
import { promises as fs } from "node:fs";
import * as os from "node:os";
import * as path from "node:path";
import { FsBootstrap } from "../fs-bootstrap.js";

describe("FsBootstrap", () => {
  runBootstrapPortContract(async () => {
    const projectRoot = await fs.mkdtemp(
      path.join(os.tmpdir(), "m5-fs-bootstrap-")
    );
    const port = new FsBootstrap({
      readTeamagentVersion: async () => "0.9.4",
      readInstalledPlugins: async () => ["superpowers"],
      readInstalledProjectSkills: async () => [],
      readInstalledHooks: async () => ["UserPromptSubmit", "Stop"],
    });
    return {
      port,
      projectRoot,
      cleanup: async () => {
        await fs.rm(projectRoot, { recursive: true, force: true });
      },
    };
  });
});
