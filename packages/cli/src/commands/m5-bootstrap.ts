import { parseManifest, computeBootstrapDiff } from "@teamagent/core";
import { FsBootstrap } from "@teamagent/adapters/m5/fs-bootstrap";
import type { BootstrapDiff } from "@teamagent/types";

export interface M5BootstrapOptions {
  projectRoot: string;
  /** 仅检查、不执行安装动作（M5-A 默认行为）。 */
  checkOnly?: boolean;
}

export interface M5BootstrapResult {
  diff: BootstrapDiff | null;
  reason?: string;
}

export async function runM5Bootstrap(
  opts: M5BootstrapOptions
): Promise<M5BootstrapResult> {
  const port = new FsBootstrap({
    readTeamagentVersion: async () => null,
    readInstalledPlugins: async () => [],
    readInstalledProjectSkills: async () => [],
    readInstalledHooks: async () => [],
  });

  const manifestRaw = await port.readManifest(opts.projectRoot);
  if (!manifestRaw) {
    return { diff: null, reason: "no manifest (project not infected)" };
  }
  const manifest = parseManifest(manifestRaw);
  const localState = await port.getLocalState();
  const diff = computeBootstrapDiff(manifest, localState);

  // M5-A 不做实际安装；只输出 diff（实际安装行为留给 M5-A2 / M5-D）
  return { diff };
}

export function parseM5BootstrapArgs(
  args: readonly string[]
): M5BootstrapOptions {
  const opts: M5BootstrapOptions = {
    projectRoot: process.cwd(),
    checkOnly: true,
  };
  for (let i = 0; i < args.length; i++) {
    const a = args[i];
    if (a === "--project-root") {
      opts.projectRoot = args[++i] ?? process.cwd();
    } else if (a.startsWith("--project-root=")) {
      opts.projectRoot = a.slice("--project-root=".length);
    } else if (a === "--check") {
      opts.checkOnly = true;
    }
  }
  return opts;
}

export function renderM5BootstrapResult(r: M5BootstrapResult): {
  output: string;
  exitCode: number;
} {
  if (!r.diff) {
    return {
      output: `[m5-bootstrap] ${r.reason ?? "ok"}`,
      exitCode: 0,
    };
  }
  if (!r.diff.needs_bootstrap) {
    return { output: "[m5-bootstrap] OK，无需动作。", exitCode: 0 };
  }
  return {
    output:
      "[m5-bootstrap] 需要补齐：\n" + JSON.stringify(r.diff, null, 2),
    exitCode: 2,
  };
}
