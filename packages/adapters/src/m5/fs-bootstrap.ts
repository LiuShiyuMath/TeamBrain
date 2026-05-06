import { promises as fs } from "node:fs";
import * as path from "node:path";
import type { BootstrapPort, ProjectProbe } from "@teamagent/ports";
import type { LocalState, InfectionPlan } from "@teamagent/types";

export interface FsBootstrapDeps {
  /** 探测本机 TeamAgent 版本（如读包 package.json）。注入便于测试。 */
  readTeamagentVersion: () => Promise<string | null>;
  /** 已装插件名列表来源。 */
  readInstalledPlugins: () => Promise<string[]>;
  /** 已装项目级 skill 路径列表来源。 */
  readInstalledProjectSkills: () => Promise<string[]>;
  /** 已装 hook 列表来源。 */
  readInstalledHooks: () => Promise<LocalState["installed_hooks"]>;
}

export class FsBootstrap implements BootstrapPort {
  constructor(private deps: FsBootstrapDeps) {}

  async readManifest(projectRoot: string): Promise<string | null> {
    const p = path.join(projectRoot, ".teamagent", "manifest.json");
    try {
      return await fs.readFile(p, "utf8");
    } catch (e) {
      if ((e as NodeJS.ErrnoException).code === "ENOENT") return null;
      throw e;
    }
  }

  async probeProject(projectRoot: string): Promise<ProjectProbe> {
    const exists = async (rel: string) => {
      try {
        await fs.access(path.join(projectRoot, rel));
        return true;
      } catch {
        return false;
      }
    };
    return {
      has_manifest: await exists(".teamagent/manifest.json"),
      has_team_dir: await exists(".teamagent/team"),
      has_shared_skills_dir: await exists(".teamagent/shared-skills"),
      has_shared_claude_md: await exists(".teamagent/shared-claude.md"),
      has_githooks_dir: await exists(".githooks"),
      has_pre_commit_hook: await exists(".githooks/pre-commit"),
    };
  }

  async applyInfection(
    projectRoot: string,
    plan: InfectionPlan
  ): Promise<void> {
    for (const dir of plan.dirs_to_create) {
      await fs.mkdir(path.join(projectRoot, dir), { recursive: true });
    }
    for (const [rel, content] of Object.entries(plan.files_to_create)) {
      const p = path.join(projectRoot, rel);
      await fs.mkdir(path.dirname(p), { recursive: true });
      try {
        // wx 标记：已存在则报错，确保幂等不覆盖
        await fs.writeFile(p, content, { flag: "wx" });
      } catch (e) {
        const code = (e as NodeJS.ErrnoException).code;
        if (code !== "EEXIST") throw e;
        // 已存在跳过
        continue;
      }
      if (rel.endsWith("pre-commit") || rel.endsWith(".sh")) {
        try {
          await fs.chmod(p, 0o755);
        } catch {
          // Windows 上 chmod 可能 no-op，忽略
        }
      }
    }
  }

  async getLocalState(): Promise<LocalState> {
    return {
      teamagent_version: await this.deps.readTeamagentVersion(),
      installed_plugins: await this.deps.readInstalledPlugins(),
      installed_project_skills: await this.deps.readInstalledProjectSkills(),
      installed_hooks: await this.deps.readInstalledHooks(),
    };
  }
}
