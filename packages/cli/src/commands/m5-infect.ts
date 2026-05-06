import { promises as fs } from "node:fs";
import * as path from "node:path";
import { execSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import { planInfection } from "@teamagent/core";
import { FsBootstrap } from "@teamagent/adapters/m5/fs-bootstrap";

export interface M5InfectOptions {
  projectRoot: string;
  /** 注入 manifest.json 的 author。默认尝试读 git config user.name。 */
  author?: string;
  /** 注入 manifest.json 的 teamagent_version。默认从 teamagent 包的 package.json 读。 */
  teamagentVersion?: string;
  /** 注入 manifest.json 的 created_at。默认 new Date().toISOString()。 */
  now?: string;
}

export interface M5InfectResult {
  written_files: string[];
  written_dirs: string[];
  skipped: boolean;
}

export async function runM5Infect(
  opts: M5InfectOptions
): Promise<M5InfectResult> {
  const port = new FsBootstrap({
    readTeamagentVersion: async () => readSelfVersion(),
    readInstalledPlugins: async () => [],
    readInstalledProjectSkills: async () => [],
    readInstalledHooks: async () => [],
  });

  const snap = await port.probeProject(opts.projectRoot);
  const author = opts.author ?? gitUserName() ?? "unknown";
  const teamagent_version =
    opts.teamagentVersion ?? (await readSelfVersion()) ?? "0.0.0";
  const now = opts.now ?? new Date().toISOString();

  const plan = planInfection(snap, { author, now, teamagent_version });

  if (!plan.required) {
    return { written_files: [], written_dirs: [], skipped: true };
  }

  await port.applyInfection(opts.projectRoot, plan);

  return {
    written_files: Object.keys(plan.files_to_create),
    written_dirs: plan.dirs_to_create,
    skipped: false,
  };
}

async function readSelfVersion(): Promise<string | null> {
  try {
    const here = path.dirname(fileURLToPath(import.meta.url));
    // 从 packages/cli/src/commands/ 上溯到 packages/teamagent/package.json
    const candidates = [
      path.resolve(here, "..", "..", "..", "teamagent", "package.json"),
      path.resolve(here, "..", "..", "..", "..", "teamagent", "package.json"),
    ];
    for (const p of candidates) {
      try {
        const raw = await fs.readFile(p, "utf8");
        return (JSON.parse(raw).version as string) ?? null;
      } catch {
        // 试下一个候选
      }
    }
    return null;
  } catch {
    return null;
  }
}

function gitUserName(): string | null {
  try {
    return execSync("git config user.name", { encoding: "utf8" }).trim() || null;
  } catch {
    return null;
  }
}

export function parseM5InfectArgs(args: readonly string[]): M5InfectOptions {
  const opts: M5InfectOptions = { projectRoot: process.cwd() };
  for (let i = 0; i < args.length; i++) {
    const a = args[i];
    if (a === "--project-root") {
      opts.projectRoot = args[++i] ?? process.cwd();
    } else if (a === "--author") {
      opts.author = args[++i];
    } else if (a === "--teamagent-version") {
      opts.teamagentVersion = args[++i];
    }
  }
  return opts;
}

export function renderM5InfectResult(r: M5InfectResult): string {
  if (r.skipped) {
    return "[m5-infect] 项目已被传染，无需动作。";
  }
  const lines = ["[m5-infect] 传染完成。"];
  if (r.written_files.length) {
    lines.push("  已写入文件:");
    for (const f of r.written_files) lines.push(`    - ${f}`);
  }
  if (r.written_dirs.length) {
    lines.push("  已建目录:");
    for (const d of r.written_dirs) lines.push(`    - ${d}`);
  }
  return lines.join("\n");
}
