#!/usr/bin/env node
import {
  executeCalibrate,
  parseCalibrateArgs,
  renderCalibrateResult
} from "./chunk-YP5NRTS6.js";
import {
  allScenarios,
  executeVerify,
  parseVerifyArgs,
  renderVerifyTerminal
} from "./chunk-TRMCJ5KI.js";
import {
  executeCompile,
  parseCompileArgs,
  renderCompileResult
} from "./chunk-AOKBNZWR.js";
import {
  executeDemoHook,
  parseDemoHookArgs
} from "./chunk-KNFCXSUB.js";
import {
  executeDocsPropagate,
  executePitfall,
  parseDocsPropagateArgs,
  parsePitfallArgs,
  renderDocsPropagationResult,
  runPitfallInteractive,
  scheduleDocsPropagation
} from "./chunk-H776XDI2.js";
import {
  installUserHook,
  uninstallUserHook
} from "./chunk-TZQSGGFV.js";
import {
  defaultWarmupStatePath,
  writeInitialPlaceholder
} from "./chunk-ZIUCUPFV.js";
import {
  executeInit,
  executePackAdd,
  executePackList,
  executePackRemove,
  findTeamagentRoot,
  packAddExitCode,
  parseInitArgs,
  parsePackArgs,
  renderInitResult,
  renderPackAdd,
  renderPackList,
  renderPackRemove
} from "./chunk-JWHKLLLH.js";
import "./chunk-MCAKDVT7.js";
import {
  executeDoctor,
  parseDoctorArgs,
  renderDoctorHelp,
  renderDoctorResult
} from "./chunk-FXEXCLLD.js";
import {
  disable,
  enable,
  parseUninstallArgs,
  renderUninstallResult,
  uninstall
} from "./chunk-OPJFYCPU.js";
import {
  installHook,
  uninstallHook
} from "./chunk-LGH7CTUI.js";
import {
  executeInstallPlugins,
  parseInstallPluginsArgs,
  renderInstallPluginsResult
} from "./chunk-HBDJW3IS.js";
import {
  parseM5ShareArgs,
  renderM5ShareResult,
  runM5Share
} from "./chunk-AXOWJFQC.js";
import {
  parseM5DeleteArgs,
  renderM5DeleteResult,
  runM5Delete
} from "./chunk-PKOXXYS4.js";
import "./chunk-ESHS5ZCN.js";
import {
  ClaudeCodeLLMClient,
  ClaudeSessionSource,
  CompositeErrorSignalCollector,
  FsBootstrap,
  InMemoryAttributionBus,
  InMemoryKnowledgeStore,
  SqliteCandidateQueue,
  SqliteEventLog,
  StdoutRenderer,
  XenovaRuleEmbedder,
  createPreToolUseHandler,
  makeSkillCompiler
} from "./chunk-HX24KLH4.js";
import {
  DualLayerStore,
  syncRuleVectors
} from "./chunk-MXJDRQEB.js";
import {
  openDb
} from "./chunk-EHS4WAHC.js";
import {
  FsTeamRuleStore
} from "./chunk-SEDU3TDZ.js";
import {
  buildErrorBatches,
  compileCursorRules,
  compileMarkdownBlock,
  computeBootstrapDiff,
  defaultCalibrator,
  defaultValidator,
  detectSensitiveText,
  detectStack,
  duckifyText,
  filterSignals,
  formatAsAgentSkill,
  llmBasedKnowledgeExtractor,
  matchRules2 as matchRules,
  mergeLwwBatch,
  parseManifest,
  parseSessionFile,
  planInfection,
  ruleBasedCorrectionDetector,
  ruleBasedSuccessDetector,
  runCalibrationPipeline,
  runCompile,
  runExtractPipeline,
  runIngestPipeline,
  runVerify,
  teamRuleToKnowledgeEntry,
  validateLevel0
} from "./chunk-7Z4K5BTU.js";
import {
  external_exports,
  parseVisibilityMode
} from "./chunk-4RSUQUKR.js";
import {
  init_esm_shims
} from "./chunk-ZWU7KJPP.js";

// ../cli/src/bin.ts
init_esm_shims();
import fs23 from "fs";
import path26 from "path";
import { fileURLToPath as fileURLToPath4 } from "url";

// ../cli/src/commands/skeleton-demo.ts
init_esm_shims();
async function runSkeletonDemo(opts = {}) {
  const env = opts.env ?? process.env;
  const now = opts.now ?? (/* @__PURE__ */ new Date()).toISOString();
  const mode = parseVisibilityMode(env.TEAMAGENT_VISIBILITY);
  const store = new InMemoryKnowledgeStore();
  const bus = new InMemoryAttributionBus();
  const entry = {
    id: "skeleton-demo-001",
    scope: { level: "personal" },
    category: "K",
    tags: ["metacognition", "skeleton"],
    type: "practice",
    nature: "subjective",
    trigger: "\u9047\u5230\u9884\u671F\u5916\u7684\u72B6\u6001",
    wrong_pattern: "",
    correct_pattern: "\u5148\u505C\u4E0B\u67E5\u6E05\u695A\u6839\u56E0\uFF0C\u518D\u52A8\u624B",
    reasoning: "\u7ED5\u8FC7\u5F0F\u4FEE\u590D\u7ECF\u5E38\u63A9\u76D6\u771F\u95EE\u9898",
    confidence: 0.8,
    enforcement: "suggest",
    status: "active",
    hit_count: 0,
    success_count: 0,
    override_count: 0,
    evidence: { success_sessions: 0, success_users: 0, correction_sessions: 0 },
    created_at: now,
    last_hit_at: "",
    last_validated_at: now,
    source: "preset",
    conflict_with: [],
    current_tier: "experimental",
    max_tier_ever: "experimental",
    tier_entered_at: "",
    demerit: 0,
    demerit_last_updated: "",
    resurrect_count: 0
  };
  store.add(entry);
  const block = compileMarkdownBlock(store.getAll(), now);
  const lineCount = block.split("\n").length;
  bus.emit({
    kind: "skeleton.knowledge-added",
    source: "skeleton",
    knowledgeId: entry.id,
    knowledgeCountBefore: 0,
    knowledgeCountAfter: store.count(),
    blockLines: lineCount,
    severity: "highlight",
    timestamp: now,
    userFacingValue: `\u6A21\u62DF\u77E5\u8BC6\u6761\u76EE\u53EF\u751F\u6210 ${lineCount} \u884C legacy/internal markdown \u9884\u89C8\uFF1B\u666E\u901A\u547D\u4EE4\u4E0D\u518D\u5199\u5165 CLAUDE.md \u89C4\u5219\u5757`,
    counterfactual: "\u6CA1\u6709 Walking Skeleton \u7684\u9AA8\u67B6\u8D2F\u901A\uFF0C\u540E\u7EED Milestone \u6CA1\u6709\u843D\u811A\u70B9"
  });
  const badEntry = {
    id: "skeleton-demo-bad",
    scope: { level: "team", paths: [] },
    // 空 paths 会触发 scope_paths_empty
    type: "avoidance",
    trigger: "bad-rule",
    wrong_pattern: "nonexistent-pattern",
    correct_pattern: "c"
  };
  const l0 = defaultValidator.validateLevel0({
    entry: badEntry,
    sourceText: "nothing matches here",
    existingRules: [],
    projectStack: ["ts"]
  });
  bus.emit({
    kind: "skeleton.l0-validation",
    source: "skeleton",
    knowledgeId: "skeleton-demo-bad",
    ok: l0.ok,
    failedChecks: l0.failed_checks,
    severity: l0.ok ? "info" : "warning",
    timestamp: now,
    userFacingValue: l0.ok ? "\uFF08\u51FA\u4E4E\u610F\u6599\uFF1AL0 \u95E8\u53E3\u6CA1\u62E6\u4F4F\u8FD9\u6761\u574F\u6761\u76EE\uFF09" : `L0 \u5982\u9884\u671F\u62E6\u4E0B\uFF1A${l0.failed_checks.join(", ")}`,
    counterfactual: "\u6CA1\u6709 L0 \u95E8\u95F8\uFF0C\u574F\u6761\u76EE\u4F1A\u6C61\u67D3\u77E5\u8BC6\u5E93"
  });
  const canonicalEntry = {
    ...entry,
    id: "skeleton-demo-canonical",
    trigger: "use-fetch-not-axios",
    correct_pattern: "fetch",
    wrong_pattern: "axios",
    reasoning: "\u9879\u76EE\u7EDF\u4E00\u539F\u751F fetch\uFF0C\u51CF\u5C11\u4F9D\u8D56",
    current_tier: "canonical",
    max_tier_ever: "canonical"
  };
  const stableEntry = {
    ...entry,
    id: "skeleton-demo-stable",
    trigger: "batch-insert-over-loop",
    correct_pattern: "batch insert",
    wrong_pattern: "for.*insert",
    reasoning: "\u6279\u91CF\u63D2\u5165\u907F\u514D\u9010\u6761\u5F80\u8FD4\u5F00\u9500",
    current_tier: "stable",
    max_tier_ever: "stable"
  };
  store.add(canonicalEntry);
  store.add(stableEntry);
  const STABLE_PLUS = /* @__PURE__ */ new Set(["stable", "canonical", "enforced"]);
  const skillCompilerStub = {
    compile(entries) {
      return entries.filter((e) => e.status === "active" && STABLE_PLUS.has(e.current_tier)).map((e) => ({ ruleId: e.id, dirname: e.id, skillMd: formatAsAgentSkill(e) }));
    },
    async write(artifacts) {
      return { written: artifacts.map((a) => a.ruleId), skipped: [] };
    },
    async cleanup(ids) {
      return { removed: ids };
    }
  };
  const compileResult = await runCompile({
    store,
    skillCompiler: skillCompilerStub,
    bus,
    dryRun: true
  });
  bus.emit({
    kind: "skeleton.skills-compiled",
    source: "skeleton",
    written: compileResult.skills.written,
    legacyDisabled: true,
    severity: "highlight",
    timestamp: now,
    userFacingValue: [
      "CLAUDE.md \u51FA\u53E3\uFF1Alegacy/internal \u5DF2\u7981\u7528\uFF08\u666E\u901A\u547D\u4EE4\u4E0D\u5199 root rule dump\uFF09",
      `Skills \u51FA\u53E3\uFF1Astable+ \u89C4\u5219 ${compileResult.skills.written.length} \u6761 \u2192 ~/.claude/skills/teamagent/ \u76EE\u5F55\uFF08dry-run\uFF0C\u672A\u5B9E\u9645\u5199\u5165\uFF09`,
      `  \u5BFC\u51FA skill: [${compileResult.skills.written.join(", ")}]`
    ].join("\n  "),
    counterfactual: "\u6CA1\u6709 Skills \u7F16\u8BD1\uFF0C\u89C4\u5219\u65E0\u6CD5\u4F5C\u4E3A Claude Code skill \u88AB\u6240\u6709\u9879\u76EE\u590D\u7528"
  });
  const renderer = new StdoutRenderer();
  return renderer.render(bus.drain(), mode);
}

// ../cli/src/commands/m5-infect.ts
init_esm_shims();
import { promises as fs } from "fs";
import * as path from "path";
import { execSync } from "child_process";
import { fileURLToPath } from "url";
async function runM5Infect(opts) {
  const port = new FsBootstrap({
    readTeamagentVersion: async () => readSelfVersion(),
    readInstalledPlugins: async () => [],
    readInstalledProjectSkills: async () => [],
    readInstalledHooks: async () => []
  });
  const snap = await port.probeProject(opts.projectRoot);
  const author = opts.author ?? gitUserName(opts.projectRoot) ?? gitUserName() ?? "unknown";
  const teamagent_version = opts.teamagentVersion ?? await readSelfVersion() ?? "0.0.0";
  const now = opts.now ?? (/* @__PURE__ */ new Date()).toISOString();
  const plan = planInfection(snap, { author, now, teamagent_version });
  if (!plan.required) {
    return { written_files: [], written_dirs: [], skipped: true };
  }
  const writeRes = await port.applyInfection(opts.projectRoot, plan);
  let git_hookspath_set = false;
  let hookspath_blocked = false;
  let hookspath_existing;
  let existingValue = null;
  try {
    existingValue = execSync("git config --get core.hooksPath", {
      cwd: opts.projectRoot,
      encoding: "utf8",
      stdio: ["ignore", "pipe", "pipe"]
    }).trim() || null;
  } catch {
    existingValue = null;
  }
  const safeExisting = existingValue === null || existingValue === ".githooks";
  if (safeExisting || opts.force) {
    try {
      execSync("git config core.hooksPath .githooks", {
        cwd: opts.projectRoot,
        encoding: "utf8",
        stdio: ["ignore", "pipe", "pipe"]
      });
      git_hookspath_set = true;
    } catch {
    }
  } else {
    hookspath_blocked = true;
    hookspath_existing = existingValue ?? "";
  }
  return {
    written_files: writeRes.written,
    chained_files: writeRes.chained,
    skipped_files: writeRes.skipped,
    written_dirs: plan.dirs_to_create,
    skipped: false,
    git_hookspath_set,
    hookspath_blocked,
    hookspath_existing
  };
}
async function readSelfVersion() {
  try {
    const here = path.dirname(fileURLToPath(import.meta.url));
    const candidates = [
      path.resolve(here, "..", "..", "..", "teamagent", "package.json"),
      path.resolve(here, "..", "..", "..", "..", "teamagent", "package.json")
    ];
    for (const p of candidates) {
      try {
        const raw = await fs.readFile(p, "utf8");
        return JSON.parse(raw).version ?? null;
      } catch {
      }
    }
    return null;
  } catch {
    return null;
  }
}
function gitUserName(cwd) {
  try {
    return execSync("git config user.name", {
      encoding: "utf8",
      ...cwd ? { cwd } : {}
    }).trim() || null;
  } catch {
    return null;
  }
}
function parseM5InfectArgs(args) {
  const opts = { projectRoot: process.cwd() };
  for (let i = 0; i < args.length; i++) {
    const a = args[i];
    if (a === void 0) continue;
    if (a === "--force") {
      opts.force = true;
      continue;
    }
    const take = (flag) => {
      if (a === flag) return args[++i];
      if (a.startsWith(flag + "=")) return a.slice(flag.length + 1);
      return void 0;
    };
    const r = take("--project-root");
    if (r !== void 0) {
      opts.projectRoot = r;
      continue;
    }
    const au = take("--author");
    if (au !== void 0) {
      opts.author = au;
      continue;
    }
    const tv = take("--teamagent-version");
    if (tv !== void 0) {
      opts.teamagentVersion = tv;
      continue;
    }
  }
  return opts;
}
function renderM5InfectResult(r) {
  if (r.skipped) {
    return "[m5-infect] \u9879\u76EE\u5DF2\u88AB\u4F20\u67D3\uFF0C\u65E0\u9700\u52A8\u4F5C\u3002";
  }
  const lines = ["[m5-infect] \u4F20\u67D3\u5B8C\u6210\u3002"];
  if (r.written_files.length) {
    lines.push("  \u5DF2\u5199\u5165\u6587\u4EF6:");
    for (const f of r.written_files) lines.push(`    - ${f}`);
  }
  if (r.chained_files && r.chained_files.length) {
    lines.push("  \u5DF2 chain-load \u8FDB\u73B0\u6709 hook (W15-003):");
    for (const f of r.chained_files) lines.push(`    - ${f}`);
  }
  if (r.skipped_files && r.skipped_files.length) {
    lines.push("  \u5DF2\u5B58\u5728\u5185\u5BB9\u3001\u4FDD\u7559\u539F\u6587\u4EF6 (idempotent):");
    for (const f of r.skipped_files) lines.push(`    - ${f}`);
  }
  if (r.written_dirs.length) {
    lines.push("  \u5DF2\u5EFA\u76EE\u5F55:");
    for (const d of r.written_dirs) lines.push(`    - ${d}`);
  }
  if (r.hookspath_blocked) {
    lines.push("");
    lines.push(
      `\u26A0\uFE0F  W15-002: core.hooksPath \u5DF2\u8BBE\u4E3A "${r.hookspath_existing}"\uFF08\u7591\u4F3C husky / lefthook / \u81EA\u5B9A\u4E49 hook \u6846\u67B6\uFF09\uFF0C\u672A\u8986\u76D6\u3002`
    );
    lines.push(
      "    \u2192 TeamAgent \u7684 .githooks/post-merge \u4E0D\u4F1A\u81EA\u52A8\u89E6\u53D1\uFF1B\u8BF7\u624B\u52A8\u628A hooks \u76EE\u5F55\u94FE\u5230 .githooks\uFF0C"
    );
    lines.push("      \u6216\u91CD\u8DD1 `teamagent m5-infect --force` \u663E\u5F0F\u8986\u76D6\u3002");
  }
  return lines.join("\n");
}

// ../cli/src/commands/m5-bootstrap.ts
init_esm_shims();
import { execSync as execSync2 } from "child_process";
import { existsSync } from "fs";
import * as path3 from "path";

// ../cli/src/m5-default-port.ts
init_esm_shims();
import { promises as fs2 } from "fs";
import * as os from "os";
import * as path2 from "path";
import { fileURLToPath as fileURLToPath2 } from "url";
var ALL_HOOK_KINDS = [
  "UserPromptSubmit",
  "PreToolUse",
  "PostToolUse",
  "Stop",
  "SessionStart",
  "SessionEnd",
  "PreCompact"
];
function createDefaultBootstrapPort(projectRoot2) {
  return new FsBootstrap({
    readTeamagentVersion: readSelfVersion2,
    readInstalledPlugins: readInstalledPluginsImpl,
    readInstalledProjectSkills: async () => [],
    readInstalledHooks: () => readInstalledHooksImpl(projectRoot2)
  });
}
async function readSelfVersion2() {
  try {
    const here = path2.dirname(fileURLToPath2(import.meta.url));
    const candidates = [
      path2.resolve(here, "..", "..", "teamagent", "package.json"),
      path2.resolve(here, "..", "..", "..", "teamagent", "package.json"),
      path2.resolve(here, "..", "..", "..", "..", "teamagent", "package.json")
    ];
    for (const p of candidates) {
      try {
        const raw = await fs2.readFile(p, "utf8");
        const v = JSON.parse(raw).version;
        if (typeof v === "string" && v.length > 0) return v;
      } catch {
      }
    }
  } catch {
  }
  return null;
}
async function readHooksFromSettingsFile(settingsPath) {
  try {
    const raw = await fs2.readFile(settingsPath, "utf8");
    const cfg = JSON.parse(raw);
    const hooks = cfg.hooks ?? {};
    return ALL_HOOK_KINDS.filter((k) => hooks[k] !== void 0);
  } catch {
    return [];
  }
}
async function readInstalledHooksFromPaths(opts) {
  const [userHooks, projectHooks] = await Promise.all([
    opts.userSettingsPath ? readHooksFromSettingsFile(opts.userSettingsPath) : Promise.resolve([]),
    opts.projectSettingsPath ? readHooksFromSettingsFile(opts.projectSettingsPath) : Promise.resolve([])
  ]);
  return Array.from(/* @__PURE__ */ new Set([...userHooks, ...projectHooks]));
}
async function readInstalledHooksImpl(projectRoot2) {
  return readInstalledHooksFromPaths({
    userSettingsPath: path2.join(os.homedir(), ".claude", "settings.json"),
    projectSettingsPath: projectRoot2 ? path2.join(projectRoot2, ".claude", "settings.local.json") : void 0
  });
}
async function readInstalledPluginsImpl() {
  const pluginsDir = path2.join(os.homedir(), ".claude", "plugins", "installed");
  try {
    const entries = await fs2.readdir(pluginsDir, { withFileTypes: true });
    return entries.filter((e) => e.isDirectory()).map((e) => e.name);
  } catch {
    return [];
  }
}

// ../cli/src/commands/m5-bootstrap.ts
async function runM5Bootstrap(opts) {
  const port = opts.port ?? createDefaultBootstrapPort(opts.projectRoot);
  const manifestRaw = await port.readManifest(opts.projectRoot);
  if (manifestRaw === null) {
    return { diff: null, reason: "no manifest (project not infected)" };
  }
  const manifest = parseManifest(manifestRaw);
  const localState = await port.getLocalState();
  const diff = computeBootstrapDiff(manifest, localState);
  if (opts.checkOnly !== false) {
    return { diff };
  }
  const applied = {};
  if (diff.install_plugins.length > 0) {
    try {
      applied.plugins = await executeInstallPlugins({
        only: diff.install_plugins
      });
    } catch (e) {
      applied.plugins = {
        ok: false,
        dryRun: false,
        marketplaces: [],
        plugins: diff.install_plugins.map((name) => ({
          name,
          status: "failed",
          detail: `install threw: ${e.message}`
        })),
        summary: {
          added: 0,
          alreadyPresent: 0,
          failed: diff.install_plugins.length,
          wouldDo: 0
        }
      };
    }
  }
  if (diff.install_teamagent_version) {
    applied.teamagent_install_command = `npm install -g github:libz-renlab-ai/TeamBrain#release  # \u5347\u7EA7\u5230 ${diff.install_teamagent_version}+`;
  }
  if (diff.install_project_skills.length > 0) {
    applied.skills_pending = diff.install_project_skills;
  }
  if (diff.install_hooks.length > 0) {
    applied.hooks_pending = diff.install_hooks;
  }
  if (existsSync(path3.join(opts.projectRoot, ".githooks"))) {
    try {
      execSync2("git config core.hooksPath .githooks", {
        cwd: opts.projectRoot,
        encoding: "utf8",
        stdio: ["ignore", "pipe", "pipe"]
      });
      applied.git_hookspath_set = true;
    } catch {
      applied.git_hookspath_set = false;
    }
  }
  return { diff, applied };
}
function parseM5BootstrapArgs(args) {
  const opts = {
    projectRoot: process.cwd(),
    checkOnly: true
  };
  for (let i = 0; i < args.length; i++) {
    const a = args[i];
    if (a === void 0) continue;
    if (a === "--project-root") {
      opts.projectRoot = args[++i] ?? process.cwd();
    } else if (a.startsWith("--project-root=")) {
      opts.projectRoot = a.slice("--project-root=".length);
    } else if (a === "--check") {
      opts.checkOnly = true;
    } else if (a === "--apply") {
      opts.checkOnly = false;
    }
  }
  return opts;
}
function renderM5BootstrapResult(r) {
  if (!r.diff) {
    return {
      output: `[m5-bootstrap] ${r.reason ?? "ok"}`,
      exitCode: 0
    };
  }
  if (!r.diff.needs_bootstrap) {
    return { output: "[m5-bootstrap] OK\uFF0C\u65E0\u9700\u52A8\u4F5C\u3002", exitCode: 0 };
  }
  if (r.applied) {
    const lines = ["[m5-bootstrap] \u81EA\u52A8\u5B89\u88C5\u5B8C\u6210\uFF08apply \u6A21\u5F0F\uFF09\uFF1A"];
    if (r.applied.plugins) {
      const s = r.applied.plugins.summary;
      lines.push(
        `  \u63D2\u4EF6\uFF1Aadded=${s.added} already=${s.alreadyPresent} failed=${s.failed}`
      );
      for (const p of r.applied.plugins.plugins) {
        lines.push(`    [${p.status}] ${p.name} \u2014 ${p.detail}`);
      }
    }
    if (r.applied.teamagent_install_command) {
      lines.push(`  CLI \u5347\u7EA7\uFF08\u624B\u52A8\u8DD1\uFF09\uFF1A${r.applied.teamagent_install_command}`);
    }
    if (r.applied.skills_pending && r.applied.skills_pending.length) {
      lines.push(`  Skill \u5F85\u8865\uFF1A${r.applied.skills_pending.join(", ")}\uFF08M5-D2 \u81EA\u52A8\uFF09`);
    }
    if (r.applied.hooks_pending && r.applied.hooks_pending.length) {
      lines.push(`  Hook \u5F85\u8865\uFF1A${r.applied.hooks_pending.join(", ")}\uFF08teamagent install-user-hook\uFF09`);
    }
    return { output: lines.join("\n"), exitCode: 0 };
  }
  return {
    output: "[m5-bootstrap] \u9700\u8981\u8865\u9F50\uFF1A\n" + JSON.stringify(r.diff, null, 2),
    exitCode: 2
  };
}

// ../cli/src/commands/m5-sync.ts
init_esm_shims();
import * as path4 from "path";
import * as os2 from "os";
import * as fs3 from "fs";
import { execSync as execSync3 } from "child_process";
import { createHash } from "crypto";
function summarizeSkipReasons(skipped) {
  const buckets = /* @__PURE__ */ new Map();
  for (const s of skipped) {
    const cat = categorizeSkipReason(s.reason);
    buckets.set(cat, (buckets.get(cat) ?? 0) + 1);
  }
  return [...buckets.entries()].sort((a, b) => b[1] - a[1]);
}
function categorizeSkipReason(reason) {
  const r = reason.toLowerCase();
  if (r.includes("json") && (r.includes("parse") || r.includes("unexpected") || r.includes("invalid"))) {
    return "JSON parse error";
  }
  if (r.includes("future")) return "future timestamp";
  if (r.includes("schema") || r.includes("validation") || r.includes("required field") || r.includes("must be")) {
    return "schema violation";
  }
  if (r.includes("eperm") || r.includes("eacces")) return "permission denied";
  if (r.includes("enoent")) return "file vanished";
  return "other";
}
function sanitizeForTerminal(s) {
  return s.replace(/[\x00-\x08\x0b-\x1f\x7f]/g, "?").replace(/\[[0-9;?]*[ -/]*[@-~]/g, "");
}
async function runM5Sync(opts) {
  const fsStore = new FsTeamRuleStore();
  const skipped = [];
  const claims = await fsStore.listAll(opts.projectRoot, {
    onSkip: (entry) => skipped.push(entry)
  });
  const merged = mergeLwwBatch(claims);
  const out = [];
  for (const [ruleId, mr] of merged) {
    out.push(formatMerged(ruleId, mr));
  }
  out.sort((a, b) => a.rule_id.localeCompare(b.rule_id));
  const result = { total_claims: claims.length, merged: out };
  if (skipped.length > 0) {
    result.skipped_files = skipped;
  }
  if (opts.apply) {
    const teamId = computeTeamId(opts.projectRoot);
    const kb = opts.kbStore ?? openProjectKb(opts.projectRoot);
    const applied = {
      upserted: [],
      deleted: [],
      skipped: []
    };
    for (const [ruleId, mr] of merged) {
      if (!mr.winner) continue;
      try {
        if (mr.winner.deleted) {
          const wasThere = kb.delete(ruleId);
          if (wasThere) applied.deleted.push(ruleId);
        } else {
          const entry = teamRuleToKnowledgeEntry(
            ruleId,
            mr.winner,
            mr.original_author ?? "unknown",
            teamId
          );
          if (kb.getById(ruleId)) {
            kb.update(ruleId, entry);
          } else {
            kb.add(entry);
          }
          applied.upserted.push(ruleId);
        }
      } catch (e) {
        applied.skipped.push({
          rule_id: ruleId,
          reason: e.message
        });
      }
    }
    result.applied = applied;
  }
  return result;
}
function computeTeamId(projectRoot2) {
  try {
    const url = execSync3("git remote get-url origin", {
      cwd: projectRoot2,
      encoding: "utf8",
      stdio: ["ignore", "pipe", "ignore"]
      // suppress stderr "No such remote"
    }).trim();
    if (!url) return void 0;
    const normalized = url.replace(/\.git$/, "").replace(/^https?:\/\/[^@\/]+@/, "https://").toLowerCase();
    return createHash("sha256").update(normalized).digest("hex").slice(0, 16);
  } catch {
    return void 0;
  }
}
function openProjectKb(projectRoot2) {
  const projectDbPath = path4.join(projectRoot2, ".teamagent", "knowledge.db");
  const userGlobalDbPath = path4.join(os2.homedir(), ".teamagent", "global.db");
  fs3.mkdirSync(path4.dirname(projectDbPath), { recursive: true });
  fs3.mkdirSync(path4.dirname(userGlobalDbPath), { recursive: true });
  return new DualLayerStore({ projectDbPath, userGlobalDbPath });
}
function formatMerged(ruleId, mr) {
  const w = mr.winner;
  if (!w) {
    return {
      rule_id: ruleId,
      state: "tombstone",
      winner_claim_author: mr.winner_claim_author ?? "",
      original_author: mr.original_author ?? ""
    };
  }
  if (w.deleted) {
    return {
      rule_id: ruleId,
      state: "tombstone",
      winner_claim_author: mr.winner_claim_author ?? "",
      original_author: mr.original_author ?? ""
    };
  }
  return {
    rule_id: ruleId,
    state: "alive",
    winner_claim_author: mr.winner_claim_author ?? "",
    original_author: mr.original_author ?? "",
    // B-130: strip ANSI escapes / control chars so a malicious rule cannot
    // clear the user's terminal or inject cursor sequences when printed.
    summary: sanitizeForTerminal(w.content.slice(0, 60))
  };
}
function parseM5SyncArgs(args) {
  const opts = { projectRoot: process.cwd() };
  for (let i = 0; i < args.length; i++) {
    const a = args[i];
    if (a === void 0) continue;
    if (a === "--project-root") {
      opts.projectRoot = args[++i] ?? process.cwd();
    } else if (a.startsWith("--project-root=")) {
      opts.projectRoot = a.slice("--project-root=".length);
    } else if (a === "--apply") {
      opts.apply = true;
    }
  }
  return opts;
}
function renderM5SyncResult(r) {
  const lines = [];
  lines.push(
    `[m5-sync] \u8BFB\u5230 ${r.total_claims} \u4E2A claim\uFF0C\u5408\u5E76\u4E3A ${r.merged.length} \u6761\u89C4\u5219\u3002`
  );
  for (const m of r.merged) {
    if (m.state === "alive") {
      lines.push(
        `  \u2713 ${m.rule_id} (claim=${m.winner_claim_author}, original=${m.original_author}): ${m.summary}`
      );
    } else {
      lines.push(
        `  \u2717 ${m.rule_id} (tombstone by ${m.winner_claim_author}, original=${m.original_author})`
      );
    }
  }
  if (r.skipped_files && r.skipped_files.length > 0) {
    lines.push(
      `[m5-sync] \u26A0 skipped ${r.skipped_files.length} file(s) (corrupt JSON / schema violation / future timestamp):`
    );
    if (r.skipped_files.length >= 5) {
      const breakdown = summarizeSkipReasons(r.skipped_files);
      for (const [cat, count] of breakdown) {
        lines.push(`    \xB7 ${cat}: ${count}`);
      }
      lines.push("");
    }
    for (const s of r.skipped_files) {
      lines.push(`  - ${s.path}: ${s.reason}`);
    }
  }
  if (r.applied) {
    lines.push(
      `[apply] upserted=${r.applied.upserted.length} deleted=${r.applied.deleted.length} skipped=${r.applied.skipped.length}`
    );
    for (const s of r.applied.skipped) {
      lines.push(`  ! skip ${s.rule_id}: ${s.reason}`);
    }
  }
  return lines.join("\n");
}

// ../cli/src/commands/m5-status.ts
init_esm_shims();
async function runM5Status(opts) {
  const port = createDefaultBootstrapPort(opts.projectRoot);
  const manifestRaw = await port.readManifest(opts.projectRoot);
  const result = {
    has_manifest: !!manifestRaw,
    team_rules_total_claims: 0,
    team_rules_alive: 0,
    team_rules_tombstoned: 0
  };
  if (manifestRaw) {
    const m = JSON.parse(manifestRaw);
    result.manifest_summary = {
      teamagent_version: m.teamagent_version,
      required_plugins: m.required_plugins,
      required_hooks: m.required_hooks,
      created_by: m.created_by
    };
    const bs = await runM5Bootstrap({
      projectRoot: opts.projectRoot,
      checkOnly: true
    });
    if (bs.diff) {
      if (bs.diff.needs_bootstrap) {
        const bits = [];
        if (bs.diff.install_teamagent_version)
          bits.push(`teamagent\u2192${bs.diff.install_teamagent_version}`);
        if (bs.diff.install_plugins.length)
          bits.push(`plugins:${bs.diff.install_plugins.join(",")}`);
        if (bs.diff.install_hooks.length)
          bits.push(`hooks:${bs.diff.install_hooks.join(",")}`);
        result.bootstrap_diff_brief = `\u9700\u8865\u9F50 ${bits.join("; ")}`;
      } else {
        result.bootstrap_diff_brief = "OK\uFF0C\u65E0\u9700\u52A8\u4F5C";
      }
    }
  }
  const sync = await runM5Sync({ projectRoot: opts.projectRoot });
  result.team_rules_total_claims = sync.total_claims;
  for (const m of sync.merged) {
    if (m.state === "alive") result.team_rules_alive++;
    else result.team_rules_tombstoned++;
  }
  return result;
}
function parseM5StatusArgs(args) {
  const opts = { projectRoot: process.cwd() };
  for (let i = 0; i < args.length; i++) {
    const a = args[i];
    if (a === void 0) continue;
    if (a === "--project-root") {
      opts.projectRoot = args[++i] ?? process.cwd();
    } else if (a.startsWith("--project-root=")) {
      opts.projectRoot = a.slice("--project-root=".length);
    }
  }
  return opts;
}
function renderM5StatusResult(r) {
  const lines = [];
  lines.push("=== TeamAgent M5 \u72B6\u6001 ===");
  if (!r.has_manifest) {
    lines.push("\u9879\u76EE\u5C1A\u672A\u4F20\u67D3\uFF08\u65E0 .teamagent/manifest.json\uFF09\u3002");
    lines.push("\u63D0\u793A\uFF1A\u8DD1 `teamagent m5-infect` \u5199\u5165\u5951\u7EA6\u3002");
    return lines.join("\n");
  }
  const m = r.manifest_summary;
  lines.push(`\u5951\u7EA6\uFF08manifest\uFF09\uFF1A`);
  lines.push(`  \u521B\u5EFA\u8005\uFF1A${m.created_by}`);
  lines.push(`  TeamAgent \u7248\u672C\uFF1A${m.teamagent_version}`);
  lines.push(`  \u5FC5\u5907\u63D2\u4EF6\uFF1A${m.required_plugins.join(", ") || "(\u65E0)"}`);
  lines.push(`  \u5FC5\u5907 hook\uFF1A${m.required_hooks.join(", ") || "(\u65E0)"}`);
  lines.push(`\u672C\u673A vs \u5951\u7EA6\uFF1A${r.bootstrap_diff_brief}`);
  lines.push(``);
  lines.push(
    `\u56E2\u961F\u89C4\u5219\u96C6\uFF1A${r.team_rules_total_claims} \u4E2A claim\uFF0C\u5408\u5E76\u540E alive=${r.team_rules_alive} / tombstoned=${r.team_rules_tombstoned}`
  );
  return lines.join("\n");
}

// ../cli/src/commands/m5-publish.ts
init_esm_shims();
import { execSync as execSync4, execFileSync } from "child_process";
import { existsSync as existsSync2 } from "fs";
import * as path5 from "path";
async function runM5Publish(opts) {
  const result = {
    changes_count: 0,
    committed: false,
    pushed: false
  };
  const CANDIDATE_PATHS = [
    ".teamagent/team",
    ".teamagent/manifest.json",
    ".githooks"
  ];
  const PATHS = CANDIDATE_PATHS.filter(
    (p) => existsSync2(path5.join(opts.projectRoot, p))
  );
  if (PATHS.length === 0) {
    result.reason = "no team-rule / manifest / githooks paths exist yet";
    return result;
  }
  let status = "";
  try {
    status = execSync4(
      `git status --porcelain -- ${PATHS.join(" ")}`,
      { cwd: opts.projectRoot, encoding: "utf8" }
    );
  } catch (e) {
    result.reason = `git status failed: ${e.message}`;
    return result;
  }
  const lines = status.split("\n").filter((l) => l.trim().length > 0);
  result.changes_count = lines.length;
  if (lines.length === 0) {
    result.reason = "no team-rule / manifest / githooks changes to publish";
    return result;
  }
  try {
    execFileSync("git", ["add", ...PATHS], {
      cwd: opts.projectRoot,
      encoding: "utf8"
    });
  } catch (e) {
    result.reason = `git add failed: ${e.message}`;
    return result;
  }
  const prefix = opts.commitMsgPrefix ?? "[teamagent-sync]";
  const msg = `${prefix} sync ${lines.length} team rule(s)`;
  try {
    execFileSync("git", ["commit", "-m", msg], {
      cwd: opts.projectRoot,
      encoding: "utf8",
      stdio: ["ignore", "pipe", "pipe"]
    });
    result.committed = true;
    result.commit_sha = execSync4("git rev-parse HEAD", {
      cwd: opts.projectRoot,
      encoding: "utf8"
    }).trim();
  } catch (e) {
    result.reason = `git commit failed: ${e.message}`;
    return result;
  }
  const shouldPush = opts.push ?? false;
  if (shouldPush) {
    try {
      execSync4("git push", {
        cwd: opts.projectRoot,
        encoding: "utf8",
        stdio: ["ignore", "pipe", "pipe"]
      });
      result.pushed = true;
    } catch (e) {
      result.push_error = e.message;
    }
  }
  return result;
}
function parseM5PublishArgs(args) {
  const opts = { projectRoot: process.cwd() };
  for (let i = 0; i < args.length; i++) {
    const a = args[i];
    if (a === void 0) continue;
    if (a === "--project-root") {
      opts.projectRoot = args[++i] ?? process.cwd();
    } else if (a.startsWith("--project-root=")) {
      opts.projectRoot = a.slice("--project-root=".length);
    } else if (a === "--push") {
      opts.push = true;
    } else if (a === "--no-push") {
      opts.push = false;
    }
  }
  return opts;
}
function renderM5PublishResult(r) {
  if (r.changes_count === 0) {
    return `[m5-publish] ${r.reason ?? "no changes"}`;
  }
  const lines = [];
  lines.push(`[m5-publish] ${r.changes_count} \u5904\u53D8\u5316`);
  if (r.committed) {
    lines.push(`  \u2713 committed: ${r.commit_sha?.slice(0, 12) ?? ""}`);
  } else {
    lines.push(`  \u2717 commit failed: ${r.reason}`);
  }
  if (r.pushed) {
    lines.push(`  \u2713 pushed to origin`);
  } else if (r.push_error) {
    lines.push(`  \u2717 push failed: ${r.push_error}`);
  }
  return lines.join("\n");
}

// ../cli/src/commands/stats.ts
init_esm_shims();
import os3 from "os";
import path6 from "path";
import fs4 from "fs";
function resolvePaths(opts) {
  const home = opts.homeDir ?? os3.homedir();
  const cwd = opts.cwd ?? process.cwd();
  return {
    projectDbPath: opts.projectDbPath ?? path6.join(cwd, ".teamagent", "knowledge.db"),
    userGlobalDbPath: opts.userGlobalDbPath ?? path6.join(home, ".teamagent", "global.db"),
    eventsDbPath: opts.eventsDbPath ?? path6.join(home, ".teamagent", "events.db")
  };
}
function aggregateConfidenceMovements(events, windowDays, now) {
  const cutoff = now.getTime() - windowDays * 24 * 3600 * 1e3;
  const recent = events.filter((e) => {
    if (e.kind !== "calibrator.adjusted") return false;
    if (!e.knowledge_id) return false;
    if (typeof e.confidence_before !== "number") return false;
    if (typeof e.confidence_after !== "number") return false;
    try {
      return new Date(e.timestamp).getTime() >= cutoff;
    } catch {
      return false;
    }
  });
  const byId = /* @__PURE__ */ new Map();
  for (const e of recent) {
    const id = e.knowledge_id;
    const delta = e.confidence_after - e.confidence_before;
    const existing = byId.get(id);
    if (existing) {
      existing.totalDelta += delta;
      if (e.status_after === "archived") existing.archivedThisWindow = true;
    } else {
      byId.set(id, {
        knowledge_id: id,
        totalDelta: delta,
        archivedThisWindow: e.status_after === "archived"
      });
    }
  }
  return [...byId.values()].sort(
    (a, b) => Math.abs(b.totalDelta) - Math.abs(a.totalDelta)
  );
}
function aggregateUpgradeEvents7d(events, windowDays, now) {
  const cutoff = now.getTime() - windowDays * 24 * 3600 * 1e3;
  const counts = {
    promptShown: 0,
    snoozed: 0,
    neverSet: 0,
    installed: 0,
    total: 0
  };
  for (const e of events) {
    if (typeof e.kind !== "string" || !e.kind.startsWith("update-")) continue;
    let ts = 0;
    try {
      ts = new Date(e.timestamp).getTime();
    } catch {
      continue;
    }
    if (!Number.isFinite(ts) || ts < cutoff) continue;
    switch (e.kind) {
      case "update-prompt-shown":
        counts.promptShown += 1;
        counts.total += 1;
        break;
      case "update-snoozed":
        counts.snoozed += 1;
        counts.total += 1;
        break;
      case "update-never-set":
        counts.neverSet += 1;
        counts.total += 1;
        break;
      case "update-installed":
        counts.installed += 1;
        counts.total += 1;
        break;
      default:
        break;
    }
  }
  return counts;
}
function renderUpgradeEvents7d(counts, windowDays) {
  if (counts.total === 0) return "";
  const lines = [];
  lines.push(`\u5347\u7EA7\u4E8B\u4EF6\uFF08\u6700\u8FD1 ${windowDays} \u5929\uFF0C\u5171 ${counts.total} \u6761\uFF09:`);
  lines.push(`  banner \u5F39\u51FA (update-prompt-shown):  ${counts.promptShown}`);
  lines.push(`  snooze \u63A8\u8FDF (update-snoozed):       ${counts.snoozed}`);
  lines.push(`  \u6C38\u4E45\u5173\u95ED (update-never-set):        ${counts.neverSet}`);
  lines.push(`  \u5B89\u88C5\u5B8C\u6210 (update-installed):        ${counts.installed}`);
  return lines.join("\n") + "\n";
}
function renderStats(byScope, movements = [], windowDays = 7, upgradeCounts = { promptShown: 0, snoozed: 0, neverSet: 0, installed: 0, total: 0 }) {
  const all = [...byScope.personal, ...byScope.team, ...byScope.global];
  const active = all.filter((e) => e.status === "active");
  const archived = all.filter((e) => e.status === "archived");
  if (all.length === 0) {
    const emptyLines = [
      "\u{1F4CA} TeamAgent \u77E5\u8BC6\u5E93\u7EDF\u8BA1",
      "",
      "\u5C1A\u65E0\u77E5\u8BC6\u6761\u76EE\u3002",
      "",
      "\u5F55\u5165\u65B9\u5F0F:",
      "  pnpm teamagent pitfall            \u4EA4\u4E92\u5F0F\u5F55\u5165",
      "  pnpm teamagent pitfall --non-interactive --trigger=... --wrong=... --correct=... --reason=...",
      ""
    ];
    const upgradeBlockEarly = renderUpgradeEvents7d(upgradeCounts, windowDays);
    if (upgradeBlockEarly) {
      emptyLines.push(upgradeBlockEarly.trimEnd(), "");
    }
    return emptyLines.join("\n");
  }
  const byCategory = { C: 0, E: 0, S: 0, K: 0 };
  for (const e of active) {
    byCategory[e.category] = (byCategory[e.category] ?? 0) + 1;
  }
  const byScopeLevel = {
    personal: byScope.personal.filter((e) => e.status === "active").length,
    team: byScope.team.filter((e) => e.status === "active").length,
    global: byScope.global.filter((e) => e.status === "active").length
  };
  const topHits = active.filter((e) => e.hit_count > 0).sort((a, b) => b.hit_count - a.hit_count).slice(0, 5);
  const recent = active.slice().sort((a, b) => b.created_at.localeCompare(a.created_at)).slice(0, 5);
  const lines = [];
  lines.push("\u{1F4CA} TeamAgent \u77E5\u8BC6\u5E93\u7EDF\u8BA1");
  lines.push("");
  lines.push(
    `\u603B\u6570: ${all.length} (\u6D3B\u8DC3 ${active.length}${archived.length > 0 ? `, \u5F52\u6863 ${archived.length}` : ""})`
  );
  lines.push("");
  lines.push("\u6309\u4F5C\u7528\u57DF:");
  lines.push(`  personal  ${byScopeLevel.personal}`);
  lines.push(`  team      ${byScopeLevel.team}`);
  lines.push(`  global    ${byScopeLevel.global}`);
  lines.push("");
  lines.push("\u6309\u5206\u7C7B:");
  lines.push(`  C \u4EE3\u7801\u5C42  ${byCategory.C}`);
  lines.push(`  E \u5DE5\u7A0B\u5C42  ${byCategory.E}`);
  lines.push(`  S \u7B56\u7565\u5C42  ${byCategory.S}`);
  lines.push(`  K \u8BA4\u77E5\u5C42  ${byCategory.K}`);
  lines.push("");
  if (topHits.length > 0) {
    lines.push(`Top ${topHits.length} \u9AD8\u9891\u547D\u4E2D:`);
    for (const e of topHits) {
      lines.push(
        `  [${e.hit_count}\u6B21] ${e.trigger} \u2192 ${e.correct_pattern} (conf=${e.confidence.toFixed(2)})`
      );
    }
    lines.push("");
  }
  lines.push(`\u6700\u8FD1 ${recent.length} \u6761\u65B0\u589E:`);
  for (const e of recent) {
    const date = e.created_at.slice(0, 10);
    lines.push(`  [${date}] ${e.category}/${e.tags[0] ?? "-"}  ${e.trigger}`);
  }
  if (movements.length > 0) {
    lines.push("");
    lines.push(`\u672C\u5468\uFF08${windowDays} \u5929\uFF09confidence \u53D8\u5316 top ${Math.min(5, movements.length)}:`);
    const triggerById = /* @__PURE__ */ new Map();
    for (const e of all) triggerById.set(e.id, e.trigger);
    for (const m of movements.slice(0, 5)) {
      const sign = m.totalDelta > 0 ? "+" : "";
      const tag = m.archivedThisWindow ? " [\u81EA\u52A8\u5F52\u6863]" : "";
      const trig = triggerById.get(m.knowledge_id) ?? "(\u5DF2\u5220)";
      lines.push(
        `  ${sign}${m.totalDelta.toFixed(2)}  ${m.knowledge_id}${tag}`
      );
      lines.push(`         ${trig.slice(0, 80)}`);
    }
  }
  const upgradeBlock = renderUpgradeEvents7d(upgradeCounts, windowDays);
  if (upgradeBlock) {
    lines.push("");
    lines.push(upgradeBlock.trimEnd());
  }
  return lines.join("\n") + "\n";
}
function renderExplain(entry, id) {
  if (!entry) {
    return `rule ${id} not found
`;
  }
  const debitUpdated = entry.demerit_last_updated || "never";
  const lines = [
    `rule ${entry.id}`,
    `  tier: ${entry.current_tier} (max ever: ${entry.max_tier_ever})`,
    `  confidence: ${entry.confidence.toFixed(3)}`,
    `  demerit: ${entry.demerit.toFixed(2)} (updated ${debitUpdated})`
  ];
  return lines.join("\n") + "\n";
}
function findStuckInPromotion(entries, stuckDays, now) {
  const cutoffMs = now.getTime() - stuckDays * 24 * 3600 * 1e3;
  return entries.filter((e) => {
    if (e.status !== "active") return false;
    if (e.current_tier !== "probation") return false;
    const enteredAt = e.tier_entered_at || e.created_at;
    if (!enteredAt) return true;
    try {
      return new Date(enteredAt).getTime() <= cutoffMs;
    } catch {
      return false;
    }
  });
}
function renderStuckInPromotion(stuck, stuckDays, now) {
  if (stuck.length === 0) {
    return `\u{1F4CC} stuck-in-promotion: \u65E0\u89C4\u5219\u5361\u5728 probation \u8D85 ${stuckDays} \u5929
`;
  }
  const lines = [];
  lines.push(`\u{1F4CC} stuck-in-promotion\uFF08probation tier > ${stuckDays} \u5929\uFF0C\u5171 ${stuck.length} \u6761\uFF09:`);
  lines.push("");
  const COL_ID = 24;
  const COL_DAYS = 6;
  lines.push(
    `  ${"ID".padEnd(COL_ID)} ${"\u5929\u6570".padStart(COL_DAYS)}  Trigger`
  );
  lines.push("  " + "\u2500".repeat(COL_ID + COL_DAYS + 14));
  for (const e of stuck) {
    const enteredAt = e.tier_entered_at || e.created_at;
    let days = "?";
    if (enteredAt) {
      try {
        const d = Math.floor((now.getTime() - new Date(enteredAt).getTime()) / (24 * 3600 * 1e3));
        days = String(d);
      } catch {
      }
    }
    lines.push(
      `  ${e.id.padEnd(COL_ID)} ${days.padStart(COL_DAYS)}  ${e.trigger.slice(0, 60)}`
    );
  }
  lines.push("");
  return lines.join("\n");
}
function renderOverrideSignals(events) {
  const counts = /* @__PURE__ */ new Map();
  for (const e of events) {
    if (e.kind !== "ai.override.ignored" && e.kind !== "ai.override.complied") continue;
    const id = e.knowledge_id ?? "(unknown)";
    const entry = counts.get(id) ?? { ignored: 0, complied: 0 };
    if (e.kind === "ai.override.ignored") entry.ignored++;
    else entry.complied++;
    counts.set(id, entry);
  }
  if (counts.size === 0) {
    return "TeamAgent Override Signals\n\n  (\u65E0\u8BB0\u5F55)\n";
  }
  const rows = [...counts.entries()].sort((a, b) => b[1].ignored - a[1].ignored);
  const lines = ["TeamAgent Override Signals", ""];
  lines.push(
    "  Rule ID".padEnd(32) + "ignored".padEnd(10) + "complied"
  );
  lines.push("  " + "\u2500".repeat(50));
  for (const [id, { ignored, complied }] of rows) {
    lines.push(
      `  ${id.slice(0, 30).padEnd(32)}ignored: ${String(ignored).padEnd(6)}complied: ${complied}`
    );
  }
  lines.push("");
  return lines.join("\n");
}
function executeStats(opts = {}) {
  const paths = resolvePaths(opts);
  const windowDays = opts.windowDays ?? 7;
  const now = (opts.now ?? (() => /* @__PURE__ */ new Date()))();
  if (opts.stuckInPromotion) {
    const stuckDays = opts.stuckDays ?? 14;
    let allEntries = [];
    try {
      const projectDbExists = fs4.existsSync(paths.projectDbPath);
      const globalDbExists = fs4.existsSync(paths.userGlobalDbPath);
      if (projectDbExists || globalDbExists) {
        fs4.mkdirSync(path6.dirname(paths.projectDbPath), { recursive: true });
        fs4.mkdirSync(path6.dirname(paths.userGlobalDbPath), { recursive: true });
        const store = new DualLayerStore({
          projectDbPath: paths.projectDbPath,
          userGlobalDbPath: paths.userGlobalDbPath
        });
        allEntries = store.getAll();
        store.close();
      }
    } catch {
    }
    const stuck = findStuckInPromotion(allEntries, stuckDays, now);
    return duckifyText(renderStuckInPromotion(stuck, stuckDays, now));
  }
  if (opts.overrideSignals) {
    let events2 = [];
    try {
      if (fs4.existsSync(paths.eventsDbPath)) {
        const eventLog = new SqliteEventLog(openDb(paths.eventsDbPath));
        events2 = eventLog.readAll();
        eventLog.close();
      }
    } catch {
    }
    return duckifyText(renderOverrideSignals(events2));
  }
  if (opts.explain !== void 0) {
    const id = opts.explain;
    let entry;
    try {
      const projectDbExists = fs4.existsSync(paths.projectDbPath);
      const globalDbExists = fs4.existsSync(paths.userGlobalDbPath);
      if (projectDbExists || globalDbExists) {
        fs4.mkdirSync(path6.dirname(paths.projectDbPath), { recursive: true });
        fs4.mkdirSync(path6.dirname(paths.userGlobalDbPath), { recursive: true });
        const store = new DualLayerStore({
          projectDbPath: paths.projectDbPath,
          userGlobalDbPath: paths.userGlobalDbPath
        });
        entry = store.getById(id);
        store.close();
      }
    } catch {
    }
    return duckifyText(renderExplain(entry, id));
  }
  let events = [];
  try {
    if (fs4.existsSync(paths.eventsDbPath)) {
      const eventLog = new SqliteEventLog(openDb(paths.eventsDbPath));
      events = eventLog.readAll();
      eventLog.close();
    }
  } catch {
  }
  const movements = aggregateConfidenceMovements(events, windowDays, now);
  const upgradeCounts = aggregateUpgradeEvents7d(events, windowDays, now);
  let personal = [];
  let team = [];
  let global = [];
  try {
    const projectDbExists = fs4.existsSync(paths.projectDbPath);
    const globalDbExists = fs4.existsSync(paths.userGlobalDbPath);
    if (projectDbExists || globalDbExists) {
      fs4.mkdirSync(path6.dirname(paths.projectDbPath), { recursive: true });
      fs4.mkdirSync(path6.dirname(paths.userGlobalDbPath), { recursive: true });
      const store = new DualLayerStore({
        projectDbPath: paths.projectDbPath,
        userGlobalDbPath: paths.userGlobalDbPath
      });
      const all = store.getAll();
      store.close();
      personal = all.filter((e) => e.scope.level === "personal");
      team = all.filter((e) => e.scope.level === "team");
      global = all.filter((e) => e.scope.level === "global");
    }
  } catch {
  }
  return duckifyText(renderStats(
    { personal, team, global },
    movements,
    windowDays,
    upgradeCounts
  ));
}

// ../cli/src/commands/install-manifest.ts
init_esm_shims();
var DEFAULT_PROJECT_SKILLS = [
  "canary",
  "design-html",
  "design-shotgun",
  "office-hours",
  "plan-ceo-review",
  "claim-to-merge"
];
var VECTOR_MODEL_SIZE_MB = 120;
var CONFIG_WRITE_KB = 1;
function renderInstallManifest(opts = {}) {
  const skillIds = opts.projectSkills ?? DEFAULT_PROJECT_SKILLS;
  const modelMb = opts.vectorModelSizeMb ?? VECTOR_MODEL_SIZE_MB;
  const configKb = opts.configWriteKb ?? CONFIG_WRITE_KB;
  return {
    config: {
      header: "[config]",
      lines: [
        `~/.teamagent/config.json  (~${configKb} KB write)`,
        "  user-level config; created on first run, idempotent on rerun."
      ]
    },
    skills: {
      header: "[skills]",
      lines: [
        `<project>/.claude/skills/  (${skillIds.length} project-level skill files: ${skillIds.join(", ")})`,
        "  user-level ~/.claude/skills/teamagent/<id>/SKILL.md is the compile output downstream of [kb] and is NOT listed here."
      ]
    },
    kb: {
      header: "[kb]",
      lines: [
        ".teamagent/kb/  (project knowledge base; user-level ~/.claude/skills/teamagent/<id>/SKILL.md is the compile output downstream of [kb], not listed here)"
      ]
    },
    download: {
      header: "[download]",
      lines: [
        `vector model: ~${modelMb} MB  (downloaded in background after install; can be stopped any time via kill or rm)`,
        "  detached warmup per ADR-0001 (revised 2026-05-09); Stage-1 install returns ~3s.",
        "  no foreground skip flag is exposed; abort by killing the warmup pid or removing in-progress files."
      ]
    },
    refusal: {
      header: "[refusal]",
      lines: [
        "Pressing No leaves no half-state; the vector-model background warmup can be killed or removed at any time."
      ]
    }
  };
}
function formatInstallManifest(manifest) {
  const sections = [
    manifest.config,
    manifest.skills,
    manifest.kb,
    manifest.download,
    manifest.refusal
  ];
  const blocks = [];
  for (const section of sections) {
    const block = [section.header, ...section.lines].join("\n");
    blocks.push(block);
  }
  return blocks.join("\n\n") + "\nExit code: 0\n";
}
function renderInstallPreviewOutput(opts = {}) {
  return formatInstallManifest(renderInstallManifest(opts));
}
function parseInstallArgs(argv) {
  return {
    preview: argv.includes("--preview"),
    yes: argv.includes("--yes") || argv.includes("-y"),
    nonInteractive: argv.includes("--non-interactive"),
    help: argv.includes("--help") || argv.includes("-h")
  };
}

// ../cli/src/commands/install.ts
init_esm_shims();
import { spawn as nodeSpawn } from "child_process";
import fs6 from "fs";
import os5 from "os";
import path8 from "path";
import { fileURLToPath as fileURLToPath3 } from "url";

// ../core/src/install-state/index.ts
init_esm_shims();

// ../core/src/install-state/schema.ts
init_esm_shims();
var STEP_KEYS = [
  "npm-global-install",
  "hook-write",
  "plugin-copy",
  "config-write",
  "migration-apply",
  "post-install-verify"
];
var StepKeySchema = external_exports.enum(STEP_KEYS);
var InstallStateV1Schema = external_exports.object({
  schemaVersion: external_exports.literal("v1"),
  projectId: external_exports.string().min(1),
  createdAt: external_exports.number().int().nonnegative(),
  updatedAt: external_exports.number().int().nonnegative(),
  completedSteps: external_exports.array(StepKeySchema),
  lastRunAt: external_exports.number().int().nonnegative()
});
var InstallStateSchema = InstallStateV1Schema;

// ../core/src/install-state/encode.ts
init_esm_shims();
function serializeState(state) {
  const validated = InstallStateSchema.parse(state);
  return JSON.stringify(validated, null, 2);
}
function parseState(raw) {
  if (raw === null || raw === void 0) {
    return { ok: false, reason: "missing" };
  }
  if (typeof raw !== "string" || raw.trim() === "") {
    return { ok: false, reason: "missing" };
  }
  let parsed;
  try {
    parsed = JSON.parse(raw);
  } catch {
    return { ok: false, reason: "invalid-json" };
  }
  const result = InstallStateSchema.safeParse(parsed);
  if (!result.success) {
    return { ok: false, reason: "schema-mismatch" };
  }
  return { ok: true, state: result.data };
}

// ../core/src/install-state/lifecycle.ts
init_esm_shims();
function makeEmptyState(projectId, now = Date.now()) {
  if (typeof projectId !== "string" || projectId.length === 0) {
    throw new Error("makeEmptyState: projectId must be a non-empty string");
  }
  if (!Number.isFinite(now) || now < 0) {
    throw new Error("makeEmptyState: now must be a non-negative finite number");
  }
  return {
    schemaVersion: "v1",
    projectId,
    createdAt: now,
    updatedAt: now,
    completedSteps: [],
    lastRunAt: now
  };
}
function isStepDone(state, step) {
  return state.completedSteps.includes(step);
}
function markStepDone(state, step, now = Date.now()) {
  if (!Number.isFinite(now) || now < 0) {
    throw new Error("markStepDone: now must be a non-negative finite number");
  }
  const completedSteps = state.completedSteps.includes(step) ? state.completedSteps : [...state.completedSteps, step];
  return {
    schemaVersion: state.schemaVersion,
    projectId: state.projectId,
    createdAt: state.createdAt,
    updatedAt: now,
    completedSteps,
    lastRunAt: now
  };
}

// ../core/src/install-state/project-id.ts
init_esm_shims();
import { createHash as createHash2 } from "crypto";
function resolveProjectId(projectDir) {
  if (typeof projectDir !== "string" || projectDir.length === 0) {
    throw new Error(
      "resolveProjectId: projectDir must be a non-empty string"
    );
  }
  const normalized = normalizeProjectDir(projectDir);
  const digest = createHash2("sha256").update(normalized).digest("hex");
  return `p_${digest.slice(0, 16)}`;
}
function normalizeProjectDir(projectDir) {
  let normalized = projectDir;
  if ((normalized.endsWith("/") || normalized.endsWith("\\")) && normalized.length > 1 && !/^[a-zA-Z]:[/\\]$/.test(normalized)) {
    normalized = normalized.slice(0, -1);
  }
  if (/^[A-Z]:/.test(normalized)) {
    normalized = normalized[0].toLowerCase() + normalized.slice(1);
  }
  return normalized;
}

// ../core/src/install-state/checkpoint.ts
init_esm_shims();
async function checkpoint(store, projectId, step, now = Date.now()) {
  const loaded = await store.load(projectId);
  const base = loaded ?? makeEmptyState(projectId, now);
  const next = markStepDone(base, step, now);
  await store.save(projectId, next);
  return next;
}

// ../cli/src/install-state-fs-store.ts
init_esm_shims();
import { promises as fs5 } from "fs";
import path7 from "path";
import os4 from "os";
var FsInstallStateStore = class {
  rootDir;
  now;
  constructor(options = {}) {
    const envHome = process.env["TEAMAGENT_HOME"];
    const defaultRoot = envHome ?? path7.join(os4.homedir(), ".teamagent");
    this.rootDir = options.rootDir ?? defaultRoot;
    this.now = options.now ?? (() => Date.now());
  }
  /** Absolute path to the JSON file for this projectId. */
  filePath(projectId) {
    return path7.join(this.rootDir, "install-state", `${projectId}.json`);
  }
  async load(projectId) {
    const file = this.filePath(projectId);
    let raw;
    try {
      raw = await fs5.readFile(file, "utf-8");
    } catch (err) {
      if (err.code === "ENOENT") return null;
      return null;
    }
    const result = parseState(raw);
    if (result.ok) {
      return result.state;
    }
    await this.renameCorrupt(file).catch(() => {
    });
    return null;
  }
  async save(projectId, state) {
    const file = this.filePath(projectId);
    const body = serializeState(state);
    await fs5.mkdir(path7.dirname(file), { recursive: true });
    const tmp = `${file}.tmp.${process.pid}.${this.now()}`;
    await fs5.writeFile(tmp, body, "utf-8");
    await fs5.rename(tmp, file);
  }
  /** Move a bad file aside so a re-run starts clean. */
  async renameCorrupt(file) {
    const corruptName = `${file}.corrupt.${this.now()}.bak`;
    await fs5.rename(file, corruptName);
  }
};

// ../cli/src/commands/install.ts
var INSTALL_STEPS = [
  {
    id: "hook-write",
    label: "Installing hooks",
    run: async (deps) => {
      const result = await deps.installHook();
      return result.alreadyInstalled ? `already installed at ${result.settingsPath}` : `registered at ${result.settingsPath}`;
    }
  },
  {
    id: "plugin-copy",
    label: "Installing plugins",
    run: async (deps) => {
      const result = await deps.installPlugins();
      if (!result.ok) throw new Error("install-plugins failed");
      return "plugins installed or already present";
    }
  },
  {
    id: "config-write",
    label: "Installing user hook",
    run: async (deps) => {
      const result = await deps.installUserHook();
      return result.alreadyInstalled ? `already installed at ${result.settingsPath}` : `registered at ${result.settingsPath}`;
    }
  }
];
function renderInstallHelp() {
  return [
    "Usage: teamagent install [--preview] [--yes|-y] [--non-interactive]",
    "",
    "Options:",
    "  --preview          Print the install manifest and exit without writes",
    "  --yes, -y          Accept the single install permission prompt",
    "  --non-interactive  CI alias for --yes; still emits the prompt line once",
    "  --help, -h         Show this help",
    "",
    "Vector model warmup runs detached after install; no foreground skip flag is exposed."
  ].join("\n") + "\n";
}
function createDefaultInstallDeps(opts = {}) {
  const cwd = opts.cwd ?? process.cwd();
  const homeDir = opts.homeDir ?? os5.homedir();
  return {
    installHook: async () => {
      const { installHook: installHook2 } = await import("./install-hook-JXR3D3KB.js");
      return installHook2({ cwd, homeDir });
    },
    installPlugins: async () => {
      const { executeInstallPlugins: executeInstallPlugins2 } = await import("./install-plugins-BSDAENEX.js");
      return executeInstallPlugins2();
    },
    installUserHook: async () => {
      const { installUserHook: installUserHook2 } = await import("./install-user-hook-AUXF2FUA.js");
      return installUserHook2({ homeDir });
    },
    healthCheck: async () => {
      const { executeDoctor: executeDoctor2 } = await import("./doctor-7P2HXLQF.js");
      const result = await executeDoctor2({ cwd, homeDir });
      return {
        status: "ok",
        hooks: result.checks.some((c) => c.name === "hook-registered" && c.status === "pass"),
        kb: result.checks.some((c) => c.name === "knowledge-db" && c.status === "pass"),
        model: "warmup-pending"
      };
    },
    warmup: () => spawnDetachedWarmup(homeDir),
    confirm: (question) => confirmPrompt(question, opts.args),
    store: new FsInstallStateStore({ rootDir: path8.join(homeDir, ".teamagent") }),
    projectId: resolveProjectId(cwd)
  };
}
async function runInstall(args, deps = createDefaultInstallDeps({ args })) {
  const lines = [];
  lines.push(formatInstallManifest(renderInstallManifest()).trimEnd());
  lines.push("");
  const question = "Install TeamAgent hooks and knowledge base? (Y/n)";
  lines.push(question);
  const accepted = await deps.confirm(question);
  const promptCount = 1;
  if (!accepted) {
    lines.push("Install refused; no files were written.");
    return {
      ok: false,
      refused: true,
      output: lines.join("\n") + "\n",
      promptCount,
      steps: [],
      warmup: null,
      health: null
    };
  }
  const state = await deps.store.load(deps.projectId);
  const firstPendingIndex = INSTALL_STEPS.findIndex((s) => !state || !isStepDone(state, s.id));
  if (state && firstPendingIndex > 0) {
    lines.push(`Resuming from step [${firstPendingIndex + 1}/${INSTALL_STEPS.length}]...`);
  }
  const steps = [];
  for (let i = 0; i < INSTALL_STEPS.length; i++) {
    const step = INSTALL_STEPS[i];
    const latest = await deps.store.load(deps.projectId);
    if (latest && isStepDone(latest, step.id)) {
      lines.push(`\u25B6 [${i + 1}/${INSTALL_STEPS.length}] ${step.label}... skipped`);
      steps.push({ id: step.id, label: step.label, status: "skipped", detail: "checkpoint exists" });
      continue;
    }
    lines.push(`\u25B6 [${i + 1}/${INSTALL_STEPS.length}] ${step.label}...`);
    const detail = await step.run(deps);
    await checkpoint(deps.store, deps.projectId, step.id);
    lines.push(`  \u2713 ${detail}`);
    steps.push({ id: step.id, label: step.label, status: "ran", detail });
  }
  const warmup = await deps.warmup();
  const warmupPid = warmup.pid === null ? "?" : String(warmup.pid);
  lines.push(`\u25B6 Spawning vector-model warmup in background (pid ${warmupPid}; parent returns immediately)`);
  if (!warmup.ok) lines.push(`  warmup launch warning: ${warmup.detail}`);
  const health = await deps.healthCheck();
  lines.push("");
  lines.push("\u2713 Install complete.");
  lines.push("");
  lines.push("Auto health check:");
  lines.push(JSON.stringify(health));
  return {
    ok: true,
    refused: false,
    output: lines.join("\n") + "\n",
    promptCount,
    steps,
    warmup,
    health
  };
}
async function confirmPrompt(question, args) {
  if (args?.yes || args?.nonInteractive) return true;
  if (!process.stdin.isTTY || !process.stdout.isTTY) return false;
  const readline2 = await import("readline/promises");
  const rl = readline2.createInterface({ input: process.stdin, output: process.stdout });
  try {
    const answer = (await rl.question(`${question} `)).trim().toLowerCase();
    return answer === "" || answer === "y" || answer === "yes";
  } finally {
    rl.close();
  }
}
async function spawnDetachedWarmup(homeDir) {
  const stateFile = defaultWarmupStatePath(homeDir);
  const teamagentDir = path8.dirname(stateFile);
  fs6.mkdirSync(teamagentDir, { recursive: true });
  writeInitialPlaceholder(stateFile, "Xenova/multilingual-e5-small");
  const entry = resolveCliEntry();
  if (!entry) {
    return {
      ok: false,
      pid: null,
      detail: "CLI entry not resolvable; run `teamagent warmup` manually",
      stateFile
    };
  }
  const logFile = path8.join(teamagentDir, "warmup.log");
  const fd = fs6.openSync(logFile, "a");
  try {
    const child = nodeSpawn(process.execPath, [entry, "warmup", "--write-state", stateFile], {
      detached: true,
      stdio: ["ignore", fd, fd]
    });
    child.unref();
    return {
      ok: true,
      pid: child.pid ?? null,
      detail: `state=${stateFile} log=${logFile}`,
      stateFile,
      logFile
    };
  } catch (err) {
    return {
      ok: false,
      pid: null,
      detail: `spawn failed: ${String(err).slice(0, 120)}`,
      stateFile,
      logFile
    };
  } finally {
    try {
      fs6.closeSync(fd);
    } catch {
    }
  }
}
function resolveCliEntry() {
  const argvEntry = process.argv[1];
  if (argvEntry && (argvEntry.endsWith("bin.js") || argvEntry.endsWith("bin.cjs"))) {
    return argvEntry;
  }
  const here = fileURLToPath3(import.meta.url);
  let dir = path8.dirname(here);
  for (let i = 0; i < 8; i++) {
    const bundled = path8.join(dir, "bin.js");
    if (fs6.existsSync(bundled)) return bundled;
    const teamagentDist = path8.join(dir, "packages", "teamagent", "dist", "bin.js");
    if (fs6.existsSync(teamagentDist)) return teamagentDist;
    const parent = path8.dirname(dir);
    if (parent === dir) break;
    dir = parent;
  }
  return void 0;
}

// ../cli/src/commands/analyze.ts
init_esm_shims();
import os6 from "os";
import path9 from "path";
import fs7 from "fs";
function hasAnyValidJsonlLine(raw) {
  for (const line of raw.split("\n")) {
    const trimmed = line.trim();
    if (!trimmed) continue;
    try {
      JSON.parse(trimmed);
      return true;
    } catch {
    }
  }
  return false;
}
async function executeAnalyze(opts = {}) {
  const home = opts.homeDir ?? os6.homedir();
  const projectsRoot = opts.projectsRoot ?? path9.join(home, ".claude", "projects");
  let session;
  let sourceDesc;
  if (opts.session) {
    if (fs7.existsSync(opts.session)) {
      const raw = fs7.readFileSync(opts.session, "utf-8");
      if (raw.trim().length > 0 && !hasAnyValidJsonlLine(raw)) {
        return [
          `# transcript parse failed`,
          ``,
          `\u8DEF\u5F84: ${opts.session}`,
          `\u75C7\u72B6: \u6587\u4EF6\u975E\u7A7A\uFF08${raw.length} \u5B57\u8282\uFF09\u4F46\u672A\u53D1\u73B0\u53EF\u89E3\u6790\u7684 JSONL \u6D88\u606F\u3002`,
          `\u5E38\u89C1\u539F\u56E0: \u6587\u4EF6\u88AB\u5916\u90E8\u5DE5\u5177\u622A\u65AD/\u635F\u574F\uFF0C\u6216\u4E0D\u662F Claude Code \u4F1A\u8BDD\u65E5\u5FD7\u683C\u5F0F\u3002`,
          `\u64CD\u4F5C: \u68C0\u67E5\u6587\u4EF6\u9996\u884C\u662F\u5426\u4E3A\u5408\u6CD5 JSON\uFF08\u5E94\u6709 {"type":"user"...} \u7B49\u7ED3\u6784\uFF09\u3002`,
          ``
        ].join("\n");
      }
      session = parseSessionFile(raw);
      sourceDesc = opts.session;
    } else {
      const src = new ClaudeSessionSource(projectsRoot);
      session = await src.loadById(opts.session);
      sourceDesc = opts.session;
    }
  } else {
    const src = new ClaudeSessionSource(projectsRoot);
    const recent = await src.listRecent(1);
    if (recent.length === 0) {
      return [
        "\u672A\u627E\u5230\u4EFB\u4F55\u4F1A\u8BDD\u65E5\u5FD7 (~/.claude/projects/ \u4E3A\u7A7A)\u3002",
        "\u5148\u7528 Claude Code \u5F00\u51E0\u6B21\u4F1A\u8BDD\u518D\u8DD1 teamagent analyze\u3002",
        ""
      ].join("\n");
    }
    session = await src.loadById(recent[0].sessionId);
    sourceDesc = `\u6700\u8FD1\u4F1A\u8BDD ${recent[0].sessionId}`;
  }
  const rawCorrections = ruleBasedCorrectionDetector.detect(session);
  const rawSuccesses = ruleBasedSuccessDetector.detect(session);
  const fromTi = opts.fromTurnIndex;
  const corrections = fromTi !== void 0 ? rawCorrections.filter((m) => m.turnIndex > fromTi) : rawCorrections;
  const successes = fromTi !== void 0 ? rawSuccesses.filter((m) => m.turnIndex > fromTi) : rawSuccesses;
  const dryRun = renderReport(
    session,
    corrections,
    successes,
    sourceDesc,
    opts.verbose ?? false,
    opts.commit === true
  );
  const lastTurnIndex = session.turns.length > 0 ? session.turns[session.turns.length - 1].turnIndex : -1;
  if (!opts.commit) {
    opts.onMeta?.({
      sessionId: session.sessionId,
      lastTurnIndex,
      correctionsFound: corrections.length,
      extracted: 0,
      skipped: 0,
      failed: 0,
      rejected: 0,
      deduped: 0,
      newEntries: []
    });
    return dryRun;
  }
  const { output: commitOutput, meta } = await runCommit(session, opts);
  opts.onMeta?.({
    sessionId: session.sessionId,
    lastTurnIndex,
    ...meta
  });
  return dryRun + "\n" + commitOutput;
}
async function runCommit(session, opts) {
  const home = opts.homeDir ?? os6.homedir();
  const cwd = opts.cwd ?? process.cwd();
  const projectDbPath = opts.projectDbPath ?? path9.join(cwd, ".teamagent", "knowledge.db");
  const userGlobalDbPath = opts.userGlobalDbPath ?? path9.join(home, ".teamagent", "global.db");
  const eventsDbPath = opts.eventsDbPath ?? path9.join(home, ".teamagent", "events.db");
  const skillsDir = opts.skillsDir ?? path9.join(home, ".claude", "skills", "teamagent");
  fs7.mkdirSync(path9.dirname(projectDbPath), { recursive: true });
  fs7.mkdirSync(path9.dirname(userGlobalDbPath), { recursive: true });
  fs7.mkdirSync(path9.dirname(eventsDbPath), { recursive: true });
  const llm = opts.llmClient ?? new ClaudeCodeLLMClient();
  const dualStore = new DualLayerStore({ projectDbPath, userGlobalDbPath });
  const projectStore = dualStore.getProjectStore();
  const now = opts.now ?? (() => /* @__PURE__ */ new Date());
  const idGen = opts.idGen ?? (() => {
    const ts = now().toISOString().replace(/[-:T.Z]/g, "").slice(0, 14);
    const rand = Math.random().toString(36).slice(2, 8);
    return `pers-${ts}-${rand}`;
  });
  const recompile = async (_activeFromProject) => {
    await runCompile({
      store: dualStore,
      skillCompiler: makeSkillCompiler({ skillsDir })
    });
  };
  const before = projectStore.count();
  const fromTurnIndex = opts.fromTurnIndex;
  const filteredDetector = fromTurnIndex !== void 0 ? {
    detect: (s) => ruleBasedCorrectionDetector.detect(s).filter((m) => m.turnIndex > fromTurnIndex)
  } : ruleBasedCorrectionDetector;
  const result = await runExtractPipeline(session, {
    detector: filteredDetector,
    extractor: llmBasedKnowledgeExtractor,
    callLLM: (prompt) => llm.complete(prompt),
    store: projectStore,
    recompile,
    scope: { level: "personal" },
    source: "accumulated",
    now,
    idGen,
    validator: defaultValidator,
    projectStack: [],
    isMomentSeen: opts.isMomentSeen,
    markMomentSeen: opts.markMomentSeen
  });
  const after = projectStore.count();
  let calibrationSummary = "";
  if (!opts.skipCalibrate) {
    try {
      const eventLog = new SqliteEventLog(openDb(eventsDbPath));
      const events = eventLog.readAll();
      for (const [label, store] of [
        ["personal", dualStore.getProjectStore()],
        ["global", dualStore.getGlobalStore()]
      ]) {
        const calResult = await runCalibrationPipeline({
          calibrator: defaultCalibrator,
          store,
          events,
          now
        });
        for (const adj of calResult.adjusted) {
          try {
            const ts = now().toISOString();
            const rand = Math.random().toString(36).slice(2, 8);
            eventLog.append({
              id: `cal-${ts.replace(/[-:T.Z]/g, "").slice(0, 14)}-${rand}`,
              kind: "calibrator.adjusted",
              knowledge_id: adj.knowledge_id,
              confidence_before: adj.before,
              confidence_after: adj.after,
              status_after: adj.status_after,
              timestamp: ts,
              schema_version: 1
            });
          } catch {
          }
        }
        if (calResult.adjusted.length > 0) {
          calibrationSummary += `  ${label}: \u8C03\u6574 ${calResult.adjusted.length} \u6761` + (calResult.archivedNew.length > 0 ? `\uFF0C\u5F52\u6863 ${calResult.archivedNew.length} \u6761` : "") + "\n";
        }
      }
      eventLog.close();
      if (calibrationSummary) {
        await recompile([]);
      }
    } catch (err) {
      calibrationSummary = `  \u26A0 \u6821\u51C6\u9636\u6BB5\u5931\u8D25: ${String(err).slice(0, 120)}
`;
    }
  }
  dualStore.close();
  if (result.extracted.length > 0) {
    try {
      await vectorizeExtractedEntries(result.extracted, projectDbPath, opts.embedder);
    } catch {
    }
    try {
      const ids = result.extracted.map((e) => e.id);
      if (opts.docsPropagationScheduler) {
        await opts.docsPropagationScheduler(ids);
      } else {
        scheduleDocsPropagation(ids, { cwd });
      }
    } catch {
    }
  }
  const lines = [];
  lines.push("\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501");
  lines.push(`  --commit \u5B8C\u6210`);
  lines.push(`  \u8BC6\u522B\u7EA0\u6B63: ${result.correctionsFound}`);
  lines.push(`  \u6210\u529F\u63D0\u53D6: ${result.extracted.length}  (\u8DF3\u8FC7 ${result.skipped}, \u5931\u8D25 ${result.failed})`);
  lines.push(`  \u77E5\u8BC6\u5E93: ${before} \u2192 ${after}`);
  lines.push(`  Skills \u5DF2\u66F4\u65B0\uFF1Bdocs propagation \u5DF2\u8C03\u5EA6`);
  if (result.extracted.length > 0) {
    lines.push("");
    lines.push("  \u65B0\u589E\u6761\u76EE:");
    for (const e of result.extracted) {
      lines.push(
        `    - [${e.category}/${e.tags[0] ?? "untagged"}] ${e.trigger} \u2192 ${e.correct_pattern}`
      );
    }
  }
  if (calibrationSummary) {
    lines.push("");
    lines.push("  \u6821\u51C6:");
    lines.push(calibrationSummary.trimEnd());
  }
  lines.push("\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501");
  return {
    output: lines.join("\n") + "\n",
    meta: {
      correctionsFound: result.correctionsFound,
      extracted: result.extracted.length,
      skipped: result.skipped,
      failed: result.failed,
      rejected: result.rejected.length,
      deduped: result.deduped,
      newEntries: result.extracted.map((e) => ({
        trigger: e.trigger,
        correct_pattern: e.correct_pattern,
        confidence: e.confidence
      }))
    }
  };
}
function renderReport(session, corrections, successes, sourceDesc, verbose, committing) {
  const lines = [];
  lines.push(
    committing ? "\u{1F4CA} TeamAgent Session Analyze (--commit \u6A21\u5F0F)" : "\u{1F4CA} TeamAgent Session Analyze (dry-run\uFF0C\u4E0D\u5199\u77E5\u8BC6\u5E93)"
  );
  lines.push("");
  lines.push(`\u6E90: ${sourceDesc}`);
  lines.push(`\u4F1A\u8BDD id: ${session.sessionId}`);
  lines.push(`\u56DE\u5408\u6570: ${session.turns.length}`);
  lines.push("");
  lines.push(`\u25B8 \u8BC6\u522B\u5230\u7EA0\u6B63\u65F6\u523B: ${corrections.length}`);
  const byCSig = {};
  for (const c of corrections) byCSig[c.signal] = (byCSig[c.signal] ?? 0) + 1;
  for (const [s, n] of Object.entries(byCSig)) {
    lines.push(`    - ${s}: ${n}`);
  }
  lines.push("");
  lines.push(`\u25B8 \u8BC6\u522B\u5230\u6210\u529F\u4FE1\u53F7: ${successes.length}`);
  const bySSig = {};
  for (const s of successes) bySSig[s.signal] = (bySSig[s.signal] ?? 0) + 1;
  for (const [s, n] of Object.entries(bySSig)) {
    lines.push(`    - ${s}: ${n}`);
  }
  lines.push("");
  if (verbose || corrections.length + successes.length <= 10) {
    if (corrections.length > 0) {
      lines.push("--- \u7EA0\u6B63\u65F6\u523B\u660E\u7EC6 ---");
      for (const c of corrections) {
        lines.push(
          `  [turn ${c.turnIndex}] ${c.signal} (w=${c.weight.toFixed(2)})`
        );
        lines.push(`    \u7528\u6237: ${truncate(c.correctionText, 80)}`);
        if (c.previousAssistantText) {
          lines.push(`    AI\u4E0A\u4E00\u53E5: ${truncate(c.previousAssistantText, 80)}`);
        }
      }
      lines.push("");
    }
    if (successes.length > 0) {
      lines.push("--- \u6210\u529F\u4FE1\u53F7\u660E\u7EC6 ---");
      for (const s of successes) {
        lines.push(
          `  [turn ${s.turnIndex}] ${s.signal} (w=${s.weight.toFixed(2)})`
        );
        lines.push(`    AI: ${truncate(s.assistantText, 80)}`);
      }
      lines.push("");
    }
  }
  lines.push("\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501");
  if (committing) {
    lines.push("  dry-run \u5B8C\u6210\uFF1B\u4E0B\u9762\u5F00\u59CB --commit \u5199\u5165\u2026");
  } else {
    lines.push("  dry-run \u5B8C\u6210\uFF0C\u672A\u5199\u5165\u77E5\u8BC6\u5E93\u3002\u52A0 --commit \u89E6\u53D1\u63D0\u53D6+\u843D\u76D8\u3002");
  }
  lines.push("\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501");
  return lines.join("\n") + "\n";
}
async function vectorizeExtractedEntries(entries, projectDbPath, embedder) {
  const { buildSemanticDescriptions } = await import("./src-COTLD4H6.js");
  const actualEmbedder = embedder ?? new XenovaRuleEmbedder();
  const embedderModelId = actualEmbedder.modelId ?? "Xenova/multilingual-e5-small";
  const vdb = openDb(projectDbPath);
  try {
    for (const entry of entries) {
      const e = entry;
      const desc = e.trigger_description?.trim() && e.pattern_description?.trim() ? { trigger_description: e.trigger_description, pattern_description: e.pattern_description } : buildSemanticDescriptions({
        trigger: entry.trigger,
        wrong_pattern: entry.wrong_pattern,
        correct_pattern: entry.correct_pattern,
        reasoning: entry.reasoning
      });
      const [tv, pv] = await actualEmbedder.embed([desc.trigger_description, desc.pattern_description]);
      if (tv && pv) {
        vdb.prepare(
          "UPDATE knowledge SET trigger_description=?, pattern_description=?, embedder_model_id=? WHERE id=?"
        ).run(desc.trigger_description, desc.pattern_description, embedderModelId, entry.id);
        syncRuleVectors(vdb, entry.id, new Float32Array(tv), new Float32Array(pv));
      }
    }
  } finally {
    vdb.close();
  }
}
function truncate(s, max) {
  const clean = s.replace(/\s+/g, " ").trim();
  if (clean.length <= max) return clean;
  return clean.slice(0, max - 1) + "\u2026";
}
function parseAnalyzeArgs(argv) {
  const opts = {};
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === "--verbose" || a === "-v") opts.verbose = true;
    else if (a === "--commit") opts.commit = true;
    else if (a.startsWith("--session=")) opts.session = a.slice("--session=".length);
    else if (a === "--session" && argv[i + 1]) {
      opts.session = argv[i + 1];
      i++;
    }
  }
  return opts;
}

// ../cli/src/commands/review.ts
init_esm_shims();
import os7 from "os";
import path10 from "path";
import fs8 from "fs";
function executeReview(opts = {}) {
  const home = opts.homeDir ?? os7.homedir();
  const cwd = opts.cwd ?? process.cwd();
  const projectDbPath = opts.projectDbPath ?? path10.join(cwd, ".teamagent", "knowledge.db");
  const userGlobalDbPath = opts.userGlobalDbPath ?? path10.join(home, ".teamagent", "global.db");
  const rows = [];
  try {
    fs8.mkdirSync(path10.dirname(projectDbPath), { recursive: true });
    fs8.mkdirSync(path10.dirname(userGlobalDbPath), { recursive: true });
    const store = new DualLayerStore({ projectDbPath, userGlobalDbPath });
    const all = store.getAll();
    store.close();
    for (const entry of all) {
      const level = entry.scope.level;
      if (opts.scope) {
        if (level !== opts.scope) continue;
      }
      rows.push({ entry, scope: level });
    }
  } catch {
  }
  rows.sort(
    (a, b) => (b.entry.created_at ?? "").localeCompare(a.entry.created_at ?? "")
  );
  const limit = opts.limit ?? 10;
  const slice = rows.slice(0, limit);
  const lines = [];
  lines.push("\u{1F4D6} TeamAgent Review \u2014 \u6700\u8FD1\u5F55\u5165\u7684\u77E5\u8BC6\u6761\u76EE");
  lines.push("");
  lines.push(`\u5171 ${rows.length} \u6761\uFF0C\u5C55\u793A\u6700\u8FD1 ${slice.length}`);
  lines.push("");
  if (rows.length === 0) {
    lines.push("(\u77E5\u8BC6\u5E93\u4E3A\u7A7A)");
    lines.push("");
    return lines.join("\n");
  }
  if (slice.length === 0) {
    return lines.join("\n");
  }
  for (const { entry, scope } of slice) {
    const date = entry.created_at ? entry.created_at.slice(0, 10) : "????-??-??";
    const tag = entry.tags[0] ?? "untagged";
    lines.push(
      `[${date}] ${scope}/${entry.category}/${tag}  conf=${entry.confidence.toFixed(2)} ${entry.enforcement}`
    );
    lines.push(`  trigger:  ${entry.trigger}`);
    if (entry.wrong_pattern) {
      lines.push(`  wrong:    ${entry.wrong_pattern}`);
    }
    lines.push(`  correct:  ${entry.correct_pattern}`);
    lines.push(`  reason:   ${entry.reasoning}`);
    lines.push(`  id:       ${entry.id}`);
    lines.push("");
  }
  lines.push("\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501");
  lines.push("  \u60F3\u8C03\u6574\uFF1F\u7528 teamagent pitfall \u6216\u76F4\u63A5\u7F16\u8F91 .teamagent/knowledge.db");
  lines.push("  \u6539\u5B8C teamagent stats \u9A8C\u8BC1\uFF0C\u518D\u5F00\u65B0 Claude Code \u4F1A\u8BDD\u751F\u6548\u3002");
  lines.push("\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501");
  return lines.join("\n") + "\n";
}
function parseReviewArgs(argv) {
  const opts = {};
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === "--limit" && argv[i + 1]) {
      opts.limit = parseInt(argv[i + 1], 10);
      i++;
    } else if (a.startsWith("--limit=")) {
      opts.limit = parseInt(a.slice("--limit=".length), 10);
    } else if (a === "--scope" && argv[i + 1]) {
      const v = argv[i + 1];
      if (v === "personal" || v === "team" || v === "global") opts.scope = v;
      i++;
    } else if (a.startsWith("--scope=")) {
      const v = a.slice("--scope=".length);
      if (v === "personal" || v === "team" || v === "global") opts.scope = v;
    } else if (/^-?\d+$/.test(a)) {
      const v = parseInt(a, 10);
      if (v < 0) {
        throw new Error(`review N \u5FC5\u987B\u662F\u6B63\u6574\u6570\uFF0C\u6536\u5230: ${a}`);
      }
      opts.limit = v;
    }
  }
  return opts;
}

// ../cli/src/commands/e2e-evaluate.ts
init_esm_shims();
import fs9 from "fs";
import os8 from "os";
import path11 from "path";
function deriveSummary(probes) {
  const results = probes.map((p) => ({
    ...p,
    pass: p.triggered === p.expectedTrigger
  }));
  const passed = results.filter((r) => r.pass).length;
  return { passed, failed: results.length - passed, results };
}
var CASES = [
  {
    id: "http-client",
    userRequest: "Please add a function that fetches user data.",
    assistantText: "I will use axios for the HTTP request.",
    toolName: "Write",
    toolInput: {
      file_path: "src/api.ts",
      content: `import axios from "axios";
export async function getUser(id: string) { return (await axios.get("/api/users/" + id)).data; }
`
    },
    correctionText: "Wrong, this project uses fetch instead of axios.",
    expectedWrong: "axios",
    expectedCorrect: "fetch",
    llm: {
      category: "E",
      tags: ["http-client"],
      type: "avoidance",
      nature: "objective",
      trigger: "When adding HTTP client code",
      wrong_pattern: "axios|Axios",
      correct_pattern: "Use built-in fetch.",
      reasoning: "The project standard avoids an extra HTTP dependency."
    },
    probes: [
      {
        id: "axios-bash-install",
        kind: "positive",
        tool_name: "Bash",
        tool_input: { command: "npm install axios" }
      },
      {
        id: "axios-import-write",
        kind: "generalization",
        tool_name: "Write",
        tool_input: {
          file_path: "src/other.ts",
          content: `import client from "axios";
export const get = client.get;
`
        }
      },
      {
        id: "axios-doc-mention",
        kind: "negative",
        tool_name: "Write",
        tool_input: {
          file_path: "docs/history.md",
          content: "Legacy docs mention axios as historical context."
        }
      }
    ]
  },
  {
    id: "date-library",
    userRequest: "Please add date formatting.",
    assistantText: "I will use moment for date formatting.",
    toolName: "Write",
    toolInput: {
      file_path: "src/date.ts",
      content: `import moment from "moment";
export const fmt = (d: Date) => moment(d).format("YYYY-MM-DD");
`
    },
    correctionText: "Wrong, use dayjs instead of moment.",
    expectedWrong: "moment",
    expectedCorrect: "dayjs",
    llm: {
      category: "E",
      tags: ["date-library"],
      type: "avoidance",
      nature: "objective",
      trigger: "When adding date formatting dependencies",
      wrong_pattern: "moment",
      correct_pattern: "Use dayjs.",
      reasoning: "The project standardizes on dayjs."
    },
    probes: [
      {
        id: "moment-install",
        kind: "positive",
        tool_name: "Bash",
        tool_input: { command: "pnpm add moment" }
      },
      {
        id: "moment-import-write",
        kind: "generalization",
        tool_name: "Write",
        tool_input: {
          file_path: "src/date2.ts",
          content: `import moment from "moment";
export const y = moment().year();
`
        }
      },
      {
        id: "momentum-substring",
        kind: "negative",
        tool_name: "Bash",
        tool_input: { command: "echo momentum is not a date library" }
      },
      {
        id: "moment-comment",
        kind: "negative",
        tool_name: "Write",
        tool_input: {
          file_path: "src/date3.ts",
          content: `// moment was used before migration
export const fmt = (d: Date) => d.toISOString();
`
        }
      }
    ]
  },
  {
    id: "state-library",
    userRequest: "Please add global UI state.",
    assistantText: "I will install Redux Toolkit and wire the store.",
    toolName: "Bash",
    toolInput: { command: "pnpm add @reduxjs/toolkit react-redux" },
    correctionText: "Wrong, use Zustand here instead of Redux.",
    expectedWrong: "redux",
    expectedCorrect: "zustand",
    llm: {
      category: "E",
      tags: ["state-library"],
      type: "avoidance",
      nature: "objective",
      trigger: "When adding client state management",
      wrong_pattern: "@reduxjs/toolkit|react-redux|redux",
      correct_pattern: "Use Zustand.",
      reasoning: "The app standardizes on Zustand for small client stores."
    },
    probes: [
      {
        id: "redux-install",
        kind: "positive",
        tool_name: "Bash",
        tool_input: { command: "pnpm add @reduxjs/toolkit react-redux" }
      },
      {
        id: "redux-generalized",
        kind: "generalization",
        tool_name: "Bash",
        tool_input: { command: "npm install redux" }
      },
      {
        id: "reducer-word",
        kind: "negative",
        tool_name: "Write",
        tool_input: {
          file_path: "src/reducer.ts",
          content: "export function reducer(state: number) { return state + 1; }\n"
        }
      }
    ]
  }
];
function parseE2EEvaluateArgs(args) {
  const opts = {};
  for (let i = 0; i < args.length; i++) {
    const a = args[i];
    if (a === "--json") opts.json = true;
    else if (a === "--keep-temp") opts.keepTemp = true;
    else if (a === "--cwd" && args[i + 1]) opts.cwd = args[++i];
    else if (a.startsWith("--cwd=")) opts.cwd = a.slice("--cwd=".length);
    else if (a === "--home-dir" && args[i + 1]) opts.homeDir = args[++i];
    else if (a.startsWith("--home-dir=")) opts.homeDir = a.slice("--home-dir=".length);
  }
  return opts;
}
async function executeE2EEvaluate(opts = {}) {
  const tempRoot = fs9.mkdtempSync(path11.join(os8.tmpdir(), "teamagent-e2e-"));
  const workspaceDir = opts.cwd ?? path11.join(tempRoot, "project");
  const homeDir = opts.homeDir ?? path11.join(tempRoot, "home");
  const sessionsDir = path11.join(tempRoot, "sessions");
  fs9.mkdirSync(workspaceDir, { recursive: true });
  fs9.mkdirSync(homeDir, { recursive: true });
  fs9.mkdirSync(sessionsDir, { recursive: true });
  fs9.mkdirSync(path11.join(workspaceDir, "src"), { recursive: true });
  fs9.mkdirSync(path11.join(workspaceDir, "docs"), { recursive: true });
  fs9.writeFileSync(path11.join(workspaceDir, "package.json"), JSON.stringify({ type: "module" }));
  const projectDbPath = path11.join(workspaceDir, ".teamagent", "knowledge.db");
  const userGlobalDbPath = path11.join(homeDir, ".teamagent", "global.db");
  const eventsDbPath = path11.join(homeDir, ".teamagent", "events.db");
  const claudeMdPath = path11.join(workspaceDir, "CLAUDE.md");
  const skillsDir = path11.join(homeDir, ".claude", "skills", "teamagent");
  const now = opts.now ?? (() => /* @__PURE__ */ new Date("2026-04-24T00:00:00Z"));
  const llmClient = opts.llmClient ?? deterministicLLM();
  const failures = [];
  const scheduledDocsRuleIds = [];
  let correctionsFound = 0;
  let extracted = 0;
  let idSeq = 0;
  try {
    for (const c of CASES) {
      const sessionPath = path11.join(sessionsDir, `${c.id}.jsonl`);
      fs9.writeFileSync(sessionPath, makeSessionJsonl(c), "utf-8");
      let meta;
      await executeAnalyze({
        session: sessionPath,
        homeDir,
        cwd: workspaceDir,
        commit: true,
        llmClient,
        projectDbPath,
        userGlobalDbPath,
        eventsDbPath,
        claudeMdPath,
        skillsDir,
        idGen: () => `e2e-${++idSeq}`,
        now,
        skipCalibrate: true,
        embedder: opts.embedder,
        docsPropagationScheduler: (ids) => {
          scheduledDocsRuleIds.push(...ids);
        },
        onMeta: (m) => {
          meta = m;
        }
      });
      correctionsFound += meta?.correctionsFound ?? 0;
      extracted += meta?.extracted ?? 0;
    }
    const store = new DualLayerStore({ projectDbPath, userGlobalDbPath });
    const eventLog = new SqliteEventLog(openDb(eventsDbPath));
    let lastRuleCount = 0;
    const matcher = {
      match: async ({ tool_name, tool_input }) => {
        const rules2 = store.findActive();
        lastRuleCount = rules2.length;
        return matchRules(
          {
            ...typeof tool_input === "object" && tool_input !== null ? tool_input : {},
            tool_name
          },
          rules2,
          {}
        );
      }
    };
    const handler = createPreToolUseHandler({
      matcher,
      eventLog,
      visibility: "silent",
      get ruleCount() {
        return lastRuleCount;
      }
    });
    const rules = store.findActive();
    const probes = [];
    for (const c of CASES) {
      for (const probe of c.probes) {
        const result = await handler({
          hook_event_name: "PreToolUse",
          tool_use_id: `probe-${probe.id}`,
          tool_name: probe.tool_name,
          tool_input: probe.tool_input
        });
        const message = result.permissionDecisionReason ?? result.systemMessage ?? "";
        const triggered = result.permissionDecision !== "allow" || message.length > 0;
        const helpful = triggered && message.toLowerCase().includes(c.expectedCorrect.toLowerCase());
        probes.push({
          id: probe.id,
          kind: probe.kind,
          triggered,
          helpful,
          expectedTrigger: probe.kind !== "negative",
          decision: result.permissionDecision,
          message
        });
      }
    }
    eventLog.close();
    store.close();
    const positives = probes.filter((p) => p.kind === "positive");
    const generalizations = probes.filter((p) => p.kind === "generalization");
    const negatives = probes.filter((p) => p.kind === "negative");
    const triggeredHelpful = probes.filter((p) => p.expectedTrigger && p.triggered);
    const skillFiles = rules.map((r) => path11.join(skillsDir, r.id, "SKILL.md"));
    const skillContents = skillFiles.filter((file) => fs9.existsSync(file)).map((file) => fs9.readFileSync(file, "utf-8"));
    const skillCorpusLower = skillContents.join("\n").toLowerCase();
    const skillsExported = skillFiles.length > 0 && skillFiles.every((file) => fs9.existsSync(file));
    const skillsHaveRules = CASES.every((c) => skillCorpusLower.includes(c.expectedCorrect.toLowerCase()));
    const scheduledDocsSet = new Set(scheduledDocsRuleIds);
    const docsPropagationCoverage = rate(
      rules.filter((r) => scheduledDocsSet.has(r.id)).length,
      rules.length
    );
    const docsPropagationScheduled = docsPropagationCoverage === 1;
    const claudeMdUntouched = !fs9.existsSync(claudeMdPath);
    const onboardingCoverage = CASES.length === 0 ? 1 : CASES.filter(
      (c) => skillCorpusLower.includes(c.expectedWrong.toLowerCase()) && skillCorpusLower.includes(c.expectedCorrect.toLowerCase())
    ).length / CASES.length;
    const metrics = {
      extractionYield: correctionsFound === 0 ? 0 : extracted / correctionsFound,
      positiveTriggerRate: rate(positives.filter((p) => p.triggered).length, positives.length),
      generalizationRate: rate(generalizations.filter((p) => p.triggered).length, generalizations.length),
      falsePositiveRate: rate(negatives.filter((p) => p.triggered).length, negatives.length),
      helpfulRate: rate(triggeredHelpful.filter((p) => p.helpful).length, triggeredHelpful.length),
      onboardingCoverage,
      docsPropagationCoverage
    };
    if (rules.length < CASES.length) failures.push(`Only learned ${rules.length}/${CASES.length} rules.`);
    if (metrics.extractionYield < 1) failures.push(`Extraction yield ${fmtPct(metrics.extractionYield)} is below 100%.`);
    if (metrics.positiveTriggerRate < 1) failures.push(`Positive trigger rate ${fmtPct(metrics.positiveTriggerRate)} is below 100%.`);
    if (metrics.generalizationRate < 1) failures.push(`Generalization rate ${fmtPct(metrics.generalizationRate)} is below 100%.`);
    if (metrics.falsePositiveRate > 0) failures.push(`False positive rate ${fmtPct(metrics.falsePositiveRate)} is above 0%.`);
    if (metrics.helpfulRate < 1) failures.push(`Helpful message rate ${fmtPct(metrics.helpfulRate)} is below 100%.`);
    if (!skillsExported) failures.push("Skills were not exported for every learned rule.");
    if (!skillsHaveRules) failures.push("Exported Skills do not contain every learned correction.");
    if (!docsPropagationScheduled) failures.push(`Docs propagation coverage ${fmtPct(metrics.docsPropagationCoverage)} is below 100%.`);
    if (!claudeMdUntouched) failures.push("CLAUDE.md was written even though Skills are the compile output.");
    if (metrics.onboardingCoverage < 1) failures.push(`Skills onboarding coverage ${fmtPct(metrics.onboardingCoverage)} is below 100%.`);
    const shouldClean = !opts.keepTemp && !opts.cwd && !opts.homeDir;
    if (shouldClean) cleanupTempRoot(tempRoot);
    return {
      ok: failures.length === 0,
      workspaceDir,
      homeDir,
      learnedRules: rules.length,
      correctionsFound,
      extracted,
      skillsExported,
      skillsHaveRules,
      docsPropagationScheduled,
      claudeMdUntouched,
      metrics,
      probes,
      failures,
      tempCleaned: shouldClean,
      ...deriveSummary(probes)
    };
  } catch (err) {
    failures.push(err instanceof Error ? err.message : String(err));
    if (!opts.keepTemp && !opts.cwd && !opts.homeDir) cleanupTempRoot(tempRoot);
    return {
      ok: false,
      workspaceDir,
      homeDir,
      learnedRules: 0,
      correctionsFound,
      extracted,
      skillsExported: false,
      skillsHaveRules: false,
      docsPropagationScheduled: false,
      claudeMdUntouched: !fs9.existsSync(claudeMdPath),
      metrics: {
        extractionYield: correctionsFound === 0 ? 0 : extracted / correctionsFound,
        positiveTriggerRate: 0,
        generalizationRate: 0,
        falsePositiveRate: 0,
        helpfulRate: 0,
        onboardingCoverage: 0,
        docsPropagationCoverage: 0
      },
      probes: [],
      failures,
      tempCleaned: !opts.keepTemp && !opts.cwd && !opts.homeDir,
      ...deriveSummary([])
    };
  }
}
function renderE2EEvaluateResult(result) {
  const lines = [
    `TeamAgent real E2E evaluation: ${result.ok ? "PASS" : "FAIL"}`,
    "",
    `Rules learned: ${result.learnedRules}`,
    `Corrections found/extracted: ${result.correctionsFound}/${result.extracted}`,
    `Skills exported: ${result.skillsExported ? "yes" : "no"}`,
    `Docs propagation scheduled: ${result.docsPropagationScheduled ? "yes" : "no"}`,
    `CLAUDE.md untouched: ${result.claudeMdUntouched ? "yes" : "no"}`,
    `Onboarding rules in Skills: ${fmtPct(result.metrics.onboardingCoverage)}`,
    "",
    "Metrics:",
    `  extraction yield: ${fmtPct(result.metrics.extractionYield)}`,
    `  positive trigger rate: ${fmtPct(result.metrics.positiveTriggerRate)}`,
    `  generalization rate: ${fmtPct(result.metrics.generalizationRate)}`,
    `  false positive rate: ${fmtPct(result.metrics.falsePositiveRate)}`,
    `  helpful message rate: ${fmtPct(result.metrics.helpfulRate)}`,
    `  docs propagation coverage: ${fmtPct(result.metrics.docsPropagationCoverage)}`,
    "",
    "Probe results:",
    ...result.probes.map((p) => {
      const expected = p.expectedTrigger ? "hit" : "pass";
      const actual = p.triggered ? "hit" : "pass";
      const status = expected === actual ? "ok" : "bad";
      return `  ${status} ${p.id} [${p.kind}]: expected ${expected}, got ${actual}`;
    })
  ];
  if (result.failures.length > 0) {
    lines.push("", "Failures:", ...result.failures.map((f) => `  - ${f}`));
  }
  if (!result.tempCleaned) {
    lines.push("", `Workspace: ${result.workspaceDir}`, `Home: ${result.homeDir}`);
  }
  return lines.join("\n") + "\n";
}
function makeSessionJsonl(c) {
  const sessionId = `e2e-${c.id}`;
  const lines = [
    {
      type: "user",
      uuid: `${c.id}-u1`,
      timestamp: "2026-04-24T00:00:00Z",
      sessionId,
      message: { role: "user", content: c.userRequest }
    },
    {
      type: "assistant",
      uuid: `${c.id}-a1`,
      timestamp: "2026-04-24T00:00:01Z",
      sessionId,
      message: {
        role: "assistant",
        content: [
          { type: "text", text: c.assistantText },
          { type: "tool_use", id: `${c.id}-tool1`, name: c.toolName, input: c.toolInput }
        ]
      }
    },
    {
      type: "user",
      uuid: `${c.id}-u2`,
      timestamp: "2026-04-24T00:00:02Z",
      sessionId,
      message: { role: "user", content: c.correctionText }
    }
  ];
  return lines.map((line) => JSON.stringify(line)).join("\n") + "\n";
}
function deterministicLLM() {
  return {
    complete: async (prompt) => {
      const lower = prompt.toLowerCase();
      const found = lower.includes("zustand") ? CASES.find((c) => c.id === "state-library") : lower.includes("dayjs") ? CASES.find((c) => c.id === "date-library") : lower.includes("fetch instead of axios") ? CASES.find((c) => c.id === "http-client") : void 0;
      if (!found) return "null";
      return "```json\n" + JSON.stringify(found.llm) + "\n```";
    }
  };
}
function rate(n, d) {
  return d === 0 ? 1 : n / d;
}
function fmtPct(v) {
  return `${Math.round(v * 1e3) / 10}%`;
}
function cleanupTempRoot(tempRoot) {
  try {
    fs9.rmSync(tempRoot, {
      recursive: true,
      force: true,
      maxRetries: 5,
      retryDelay: 100
    });
  } catch {
  }
}

// ../cli/src/commands/dogfood-report.ts
init_esm_shims();
import os9 from "os";
import path12 from "path";
import fs10 from "fs";
import { execSync as execSync5 } from "child_process";
function resolvePaths2(opts) {
  const home = opts.homeDir ?? os9.homedir();
  const cwd = opts.cwd ?? process.cwd();
  return {
    home,
    cwd,
    projectDbPath: opts.projectDbPath ?? path12.join(cwd, ".teamagent", "knowledge.db"),
    userGlobalDbPath: opts.userGlobalDbPath ?? path12.join(home, ".teamagent", "global.db"),
    eventsDbPath: opts.eventsDbPath ?? path12.join(home, ".teamagent", "events.db"),
    outputPath: opts.outputPath ?? path12.join(cwd, "docs", "dogfood", "\u81EA\u4E3E\u62A5\u544A.md")
  };
}
function readGitTimeline(cwd) {
  try {
    const out = execSync5(
      'git log --pretty=format:"%h|%ad|%s" --date=short -100',
      // stdio: pipe stderr so a missing .git directory does not leak
      // "fatal: not a git repository" to the user's terminal — the catch
      // below already returns []. Without "ignore" / "pipe" stderr, the
      // child writes directly to our stderr.
      { cwd, encoding: "utf-8", windowsHide: true, stdio: ["ignore", "pipe", "pipe"] }
    );
    return out.split("\n").map((line) => {
      const [hash, date, ...rest] = line.split("|");
      return { hash: hash ?? "", date: date ?? "", message: rest.join("|") };
    }).filter((c) => c.hash);
  } catch {
    return [];
  }
}
async function executeDogfoodReport(opts = {}) {
  const paths = resolvePaths2(opts);
  const now = (opts.now ?? (() => /* @__PURE__ */ new Date()))();
  let allEntries = [];
  try {
    fs10.mkdirSync(path12.dirname(paths.projectDbPath), { recursive: true });
    fs10.mkdirSync(path12.dirname(paths.userGlobalDbPath), { recursive: true });
    if (fs10.existsSync(paths.projectDbPath) || fs10.existsSync(paths.userGlobalDbPath)) {
      const store = new DualLayerStore({
        projectDbPath: paths.projectDbPath,
        userGlobalDbPath: paths.userGlobalDbPath
      });
      allEntries = store.getAll();
      store.close();
    }
  } catch {
  }
  const personal = allEntries.filter((e) => e.scope.level === "personal");
  const global = allEntries.filter((e) => e.scope.level === "global");
  let events = [];
  try {
    if (fs10.existsSync(paths.eventsDbPath)) {
      const eventLog = new SqliteEventLog(openDb(paths.eventsDbPath));
      events = eventLog.readAll();
      eventLog.close();
    }
  } catch {
  }
  const timeline = readGitTimeline(paths.cwd);
  const triggerById = /* @__PURE__ */ new Map();
  for (const e of allEntries) triggerById.set(e.id, e.trigger);
  const fireCount = /* @__PURE__ */ new Map();
  for (const e of events) {
    if (e.knowledge_id && /^hook-pre/.test(e.kind)) {
      fireCount.set(e.knowledge_id, (fireCount.get(e.knowledge_id) ?? 0) + 1);
    }
  }
  const topFired = [...fireCount.entries()].map(([knowledge_id, fires]) => ({
    knowledge_id,
    trigger: triggerById.get(knowledge_id) ?? "(\u5DF2\u5220)",
    fires
  })).sort((a, b) => b.fires - a.fires).slice(0, 5);
  const deltaById = /* @__PURE__ */ new Map();
  for (const e of events) {
    if (e.kind === "calibrator.adjusted" && e.knowledge_id && typeof e.confidence_before === "number" && typeof e.confidence_after === "number") {
      const d = e.confidence_after - e.confidence_before;
      deltaById.set(e.knowledge_id, (deltaById.get(e.knowledge_id) ?? 0) + d);
    }
  }
  const topConfidenceGain = [...deltaById.entries()].map(([knowledge_id, totalDelta]) => ({
    knowledge_id,
    trigger: triggerById.get(knowledge_id) ?? "(\u5DF2\u5220)",
    totalDelta
  })).sort((a, b) => Math.abs(b.totalDelta) - Math.abs(a.totalDelta)).slice(0, 5);
  const archivedCount = allEntries.filter((e) => e.status === "archived").length;
  const md = renderDogfoodReport({
    now,
    personal,
    team: [],
    global,
    events,
    timeline,
    topFired,
    topConfidenceGain,
    archivedCount
  });
  fs10.mkdirSync(path12.dirname(paths.outputPath), { recursive: true });
  fs10.writeFileSync(paths.outputPath, md, "utf-8");
  return {
    outputPath: paths.outputPath,
    totalEntries: allEntries.length,
    totalEvents: events.length,
    scopes: { personal: personal.length, team: 0, global: global.length },
    topFired,
    topConfidenceGain,
    archivedCount
  };
}
function renderDogfoodReport(input) {
  const { now, personal, team, global, events, timeline, topFired, topConfidenceGain, archivedCount } = input;
  const all = [...personal, ...team, ...global];
  const active = all.filter((e) => e.status === "active");
  const byCategory = { C: 0, E: 0, S: 0, K: 0 };
  for (const e of active) byCategory[e.category] = (byCategory[e.category] ?? 0) + 1;
  const eventKinds = {};
  for (const e of events) eventKinds[e.kind] = (eventKinds[e.kind] ?? 0) + 1;
  const corrections = events.filter((e) => /^hook-pre/.test(e.kind)).length;
  const calibrations = events.filter((e) => e.kind === "calibrator.adjusted").length;
  const lines = [];
  lines.push("# TeamAgent \u81EA\u4E3E\u62A5\u544A\uFF08Phase 2\uFF09");
  lines.push("");
  lines.push(`> \u751F\u6210\u65F6\u95F4: ${now.toISOString()}`);
  lines.push("> \u6570\u636E\u5B8C\u5168\u6765\u81EA\u7CFB\u7EDF\u81EA\u8EAB\uFF1Aevents.db + knowledge.db + git log");
  lines.push("> \u7531 `teamagent dogfood-report` \u81EA\u52A8\u751F\u6210\uFF0C\u672A\u7ECF\u4EBA\u5DE5\u4FEE\u9970");
  lines.push("");
  lines.push("## \u4E00\u53E5\u8BDD\u7ED3\u8BBA");
  lines.push("");
  lines.push(
    `Phase 2 \u671F\u95F4\u7D2F\u8BA1\u79EF\u7D2F **${all.length} \u6761\u77E5\u8BC6**\uFF08${active.length} \u6761\u6D3B\u8DC3${archivedCount > 0 ? `\u3001${archivedCount} \u6761\u81EA\u52A8\u5F52\u6863` : ""}\uFF09\uFF0CHook \u62E6\u622A **${corrections} \u6B21**\uFF0CCalibrator \u8C03\u6574 **${calibrations} \u6B21**\u3002`
  );
  lines.push("");
  lines.push("## \u77E5\u8BC6\u5E93");
  lines.push("");
  lines.push("| \u7EF4\u5EA6 | \u503C |");
  lines.push("|------|----|");
  lines.push(`| \u603B\u6761\u76EE | ${all.length} |`);
  lines.push(`| \u6D3B\u8DC3 | ${active.length} |`);
  lines.push(`| \u81EA\u52A8\u5F52\u6863 | ${archivedCount} |`);
  lines.push(`| personal | ${personal.length} |`);
  lines.push(`| global | ${global.length} |`);
  lines.push(`| C \u4EE3\u7801\u5C42 | ${byCategory.C} |`);
  lines.push(`| E \u5DE5\u7A0B\u5C42 | ${byCategory.E} |`);
  lines.push(`| S \u7B56\u7565\u5C42 | ${byCategory.S} |`);
  lines.push(`| K \u8BA4\u77E5\u5C42 | ${byCategory.K} |`);
  lines.push("");
  lines.push("## Hook \u5E72\u9884\u7EDF\u8BA1");
  lines.push("");
  lines.push("| \u4E8B\u4EF6\u7C7B\u578B | \u6B21\u6570 |");
  lines.push("|---------|------|");
  for (const [k, v] of Object.entries(eventKinds).sort((a, b) => b[1] - a[1])) {
    lines.push(`| ${k} | ${v} |`);
  }
  lines.push("");
  lines.push(`## \u547D\u4E2D\u9891\u6B21 Top ${topFired.length}`);
  lines.push("");
  if (topFired.length === 0) {
    lines.push("(\u6682\u65E0\u547D\u4E2D\u8BB0\u5F55)");
  } else {
    lines.push("| # | \u547D\u4E2D\u6570 | trigger | id |");
    lines.push("|---|-------|---------|-----|");
    topFired.forEach((r, i) => {
      lines.push(
        `| ${i + 1} | ${r.fires} | ${r.trigger.slice(0, 60)} | ${r.knowledge_id} |`
      );
    });
  }
  lines.push("");
  lines.push(`## Confidence \u53D8\u5316 Top ${topConfidenceGain.length}`);
  lines.push("");
  if (topConfidenceGain.length === 0) {
    lines.push("(\u6682\u65E0\u6821\u51C6\u8BB0\u5F55\u2014\u2014\u5C1A\u672A\u8DD1\u8FC7 calibrate)");
  } else {
    lines.push("| # | \u0394confidence | trigger | id |");
    lines.push("|---|------------|---------|-----|");
    topConfidenceGain.forEach((r, i) => {
      const sign = r.totalDelta > 0 ? "+" : "";
      lines.push(
        `| ${i + 1} | ${sign}${r.totalDelta.toFixed(2)} | ${r.trigger.slice(0, 60)} | ${r.knowledge_id} |`
      );
    });
  }
  lines.push("");
  lines.push("## Phase 2 git \u65F6\u95F4\u7EBF");
  lines.push("");
  if (timeline.length === 0) {
    lines.push("(\u65E0 git \u5386\u53F2)");
  } else {
    const milestones = timeline.filter(
      (c) => /^(feat|fix|chore|test|docs|ci)\((m[0-9]+|stage0|compiler|hotfix)\)/.test(
        c.message
      )
    );
    lines.push("| date | hash | message |");
    lines.push("|------|------|---------|");
    for (const c of milestones.slice(0, 30)) {
      lines.push(`| ${c.date} | ${c.hash} | ${c.message.slice(0, 80)} |`);
    }
  }
  lines.push("");
  lines.push("## \u5173\u4E8E\u8FD9\u4EFD\u62A5\u544A");
  lines.push("");
  lines.push(
    "Phase 2 \u8BBE\u8BA1\u610F\u56FE\uFF1A\u7CFB\u7EDF**\u81EA\u52A8\u751F\u6210**\u4E00\u4EFD\u62A5\u544A\uFF0C\u4F5C\u4E3A\u5BF9 'TeamAgent \u662F\u5426\u771F\u6709\u7528' \u8FD9\u4E2A\u95EE\u9898\u7684**\u7B2C\u4E09\u65B9\u72EC\u7ACB\u8BC1\u636E**\u2014\u2014\u6240\u6709\u6570\u5B57\u6765\u81EA\u78C1\u76D8\u4E0A\u7684 SQLite DB\uFF0C\u6CA1\u4EBA\u624B\u52A8\u6539\u3002"
  );
  return lines.join("\n") + "\n";
}
function parseDogfoodReportArgs(argv) {
  const opts = {};
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === "--output" && argv[i + 1]) {
      opts.outputPath = argv[i + 1];
      i++;
    } else if (a.startsWith("--output=")) {
      opts.outputPath = a.slice("--output=".length);
    }
  }
  return opts;
}

// ../cli/src/commands/bug-report.ts
init_esm_shims();
import fs11 from "fs";
import os10 from "os";
import path13 from "path";
import { execFileSync as execFileSync2 } from "child_process";
var MAX_LOG_BYTES = 128 * 1024;
function parseBugReportArgs(argv) {
  const opts = { stdout: false };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === "--stdout") {
      opts.stdout = true;
    } else if (a === "--out" && argv[i + 1]) {
      opts.outputPath = argv[++i];
    } else if (a.startsWith("--out=")) {
      opts.outputPath = a.slice("--out=".length);
    }
  }
  return opts;
}
async function executeBugReport(opts = {}) {
  const cwd = opts.cwd ?? process.cwd();
  const homeDir = opts.homeDir ?? os10.homedir();
  const env = opts.env ?? process.env;
  const now = opts.now ?? /* @__PURE__ */ new Date();
  const teamagentHome = env["TEAMAGENT_HOME"] ?? path13.join(homeDir, ".teamagent");
  const outputPath = opts.outputPath ?? defaultReportPath(teamagentHome, now);
  const runCommand = opts.runCommand ?? defaultRunCommand;
  const markdown = renderBugReport({
    cwd,
    homeDir,
    teamagentHome,
    now,
    env,
    runCommand,
    teamagentVersion: opts.teamagentVersion,
    stdout: opts.stdout ?? false
  });
  if (!opts.stdout) {
    fs11.mkdirSync(path13.dirname(outputPath), { recursive: true });
    fs11.writeFileSync(outputPath, markdown, "utf-8");
  }
  return {
    markdown,
    outputPath: opts.stdout ? void 0 : outputPath
  };
}
function renderBugReport(args) {
  const lines = [];
  lines.push("# TeamAgent Bug Report");
  lines.push("");
  lines.push(`Generated: ${args.now.toISOString()}`);
  lines.push("");
  if (!args.stdout) {
    lines.push("## Summary");
    lines.push("");
    lines.push("- What happened:");
    lines.push("- What you expected:");
    lines.push("- Steps to reproduce:");
    lines.push("");
  }
  lines.push("## System");
  lines.push("");
  lines.push(`- platform: ${process.platform}`);
  lines.push(`- arch: ${process.arch}`);
  lines.push(`- os: ${os10.type()} ${os10.release()}`);
  lines.push(`- cpus: ${os10.cpus().length}`);
  lines.push(`- total_memory_mb: ${Math.round(os10.totalmem() / 1024 / 1024)}`);
  lines.push(`- cwd: ${args.cwd}`);
  lines.push(`- shell: ${args.env["SHELL"] ?? "(unknown)"}`);
  lines.push(`- TEAMAGENT_HOME: ${args.teamagentHome}`);
  lines.push("");
  lines.push("## Tool Versions");
  lines.push("");
  lines.push(`- node: ${process.version} (${process.execPath})`);
  lines.push(`- npm: ${commandOrUnavailable(args.runCommand, "npm", ["--version"])}`);
  lines.push(`- pnpm: ${commandOrUnavailable(args.runCommand, "pnpm", ["--version"])}`);
  lines.push(`- claude: ${commandOrUnavailable(args.runCommand, "claude", ["--version"])}`);
  lines.push(`- teamagent: ${args.teamagentVersion ?? commandOrUnavailable(args.runCommand, "teamagent", ["--version"])}`);
  lines.push("");
  lines.push("## Install State");
  lines.push("");
  lines.push(fileStatus("user Claude settings", path13.join(args.homeDir, ".claude", "settings.json")));
  lines.push(fileStatus("project Claude settings", path13.join(args.cwd, ".claude", "settings.local.json")));
  lines.push(fileStatus("project knowledge db", path13.join(args.cwd, ".teamagent", "knowledge.db")));
  lines.push(fileStatus("update state", path13.join(args.teamagentHome, "update-state.json")));
  lines.push(fileStatus("auto-update disabled marker", path13.join(args.teamagentHome, "auto-update.disabled")));
  lines.push("");
  lines.push("## Hook Commands");
  lines.push("");
  lines.push(renderHookCommands("user", path13.join(args.homeDir, ".claude", "settings.json")));
  lines.push(renderHookCommands("project", path13.join(args.cwd, ".claude", "settings.local.json")));
  lines.push("");
  lines.push("## Raw Logs");
  lines.push("");
  for (const log of logFiles(args.cwd, args.teamagentHome)) {
    lines.push(renderFileBlock(log.label, log.file));
  }
  lines.push("");
  lines.push("## Notes");
  lines.push("");
  lines.push("- Secret-looking values are redacted before writing this report.");
  lines.push(`- Log blocks are capped at ${MAX_LOG_BYTES} bytes from the end of each file.`);
  lines.push("");
  if (args.stdout) {
    lines.push("\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500");
    lines.push("\u{1F4E4} Paste this into a new issue at:");
    lines.push("   https://github.com/libz-renlab-ai/TeamBrain/issues/new");
    lines.push("");
    lines.push("   Tip: \u5728 Summary \u6BB5\u586B\u4E0A\u4F60\u5361\u4F4F\u7684\u5177\u4F53\u52A8\u4F5C\u3002");
    lines.push("");
  }
  return lines.join("\n");
}
function defaultRunCommand(cmd, args) {
  return execFileSync2(cmd, args, {
    encoding: "utf-8",
    stdio: ["ignore", "pipe", "pipe"],
    timeout: 5e3,
    windowsHide: true
  }).trim();
}
function commandOrUnavailable(runCommand, cmd, args) {
  try {
    const out = runCommand(cmd, args).trim();
    return out.length > 0 ? firstLine(redactSecrets(out)) : "(empty output)";
  } catch (err) {
    return `(unavailable: ${redactSecrets(String(err)).slice(0, 160)})`;
  }
}
function defaultReportPath(teamagentHome, now) {
  const stamp = now.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}Z$/, "Z");
  return path13.join(teamagentHome, "bug-reports", `teamagent-bug-report-${stamp}.md`);
}
function fileStatus(label, file) {
  try {
    const stat = fs11.statSync(file);
    return `- ${label}: present (${stat.size} bytes) ${file}`;
  } catch {
    return `- ${label}: missing ${file}`;
  }
}
function renderHookCommands(label, settingsPath) {
  if (!fs11.existsSync(settingsPath)) return `### ${label}

(missing: ${settingsPath})
`;
  try {
    const parsed = JSON.parse(fs11.readFileSync(settingsPath, "utf-8"));
    const hooks = parsed.hooks ?? {};
    const lines = [`### ${label}`, ""];
    let count = 0;
    for (const [event, entries] of Object.entries(hooks)) {
      for (const entry of entries ?? []) {
        for (const hook of entry.hooks ?? []) {
          count++;
          lines.push(`- ${event}: ${hook.type ?? "command"} timeout=${hook.timeout ?? "(default)"}`);
          lines.push(`  command: ${redactSecrets(hook.command ?? "(missing)")}`);
          if (entry.matcher) lines.push(`  matcher: ${entry.matcher}`);
        }
      }
    }
    if (count === 0) lines.push("(no hooks configured)");
    lines.push("");
    return lines.join("\n");
  } catch (err) {
    return `### ${label}

(settings parse failed: ${redactSecrets(String(err))})
`;
  }
}
function logFiles(cwd, teamagentHome) {
  return [
    { label: "TEAMAGENT_HOME update.log", file: path13.join(teamagentHome, "update.log") },
    { label: "TEAMAGENT_HOME update-state.json", file: path13.join(teamagentHome, "update-state.json") },
    { label: "project events.jsonl", file: path13.join(cwd, ".teamagent", "events.jsonl") },
    { label: "project config.json", file: path13.join(cwd, ".teamagent", "config.json") }
  ];
}
function renderFileBlock(label, file) {
  const heading = `### ${label}`;
  if (!fs11.existsSync(file)) return `${heading}

(missing: ${file})
`;
  try {
    const raw = readTail(file, MAX_LOG_BYTES);
    const text = redactSecrets(raw);
    return `${heading}

path: ${file}

\`\`\`text
${text}
\`\`\`
`;
  } catch (err) {
    return `${heading}

(read failed: ${redactSecrets(String(err))})
`;
  }
}
function readTail(file, maxBytes) {
  const stat = fs11.statSync(file);
  const fd = fs11.openSync(file, "r");
  try {
    const bytesToRead = Math.min(stat.size, maxBytes);
    const buffer = Buffer.alloc(bytesToRead);
    fs11.readSync(fd, buffer, 0, bytesToRead, stat.size - bytesToRead);
    const prefix = stat.size > maxBytes ? `[truncated: showing last ${maxBytes} bytes]
` : "";
    return prefix + buffer.toString("utf-8");
  } finally {
    fs11.closeSync(fd);
  }
}
function redactSecrets(input) {
  return input.replace(/(Authorization:\s*Bearer\s+)[^\s"']+/gi, "$1[redacted]").replace(/\b(sk-ant-[A-Za-z0-9._-]+)/g, "[redacted]").replace(/\b(sk-[A-Za-z0-9]{20,})\b/g, "[redacted]").replace(/\b(gh[pousr]_[A-Za-z0-9_]{20,})\b/g, "[redacted]").replace(/\b([A-Z0-9_]*(?:TOKEN|SECRET|API_KEY|PASSWORD)[A-Z0-9_]*=)[^\s]+/gi, "$1[redacted]");
}
function firstLine(text) {
  return text.split(/\r?\n/)[0] ?? text;
}

// ../cli/src/commands/dashboard.ts
init_esm_shims();
import { spawn, spawnSync } from "child_process";
import fs12 from "fs";
import http from "http";
import os11 from "os";
import path14 from "path";
var DashboardArgsError = class extends Error {
};
function parseDurationMs(value) {
  const trimmed = value.trim();
  const match = /^(\d+)(ms|s|m)?$/.exec(trimmed);
  if (!match) throw new DashboardArgsError(`invalid interval: ${value}`);
  const n = Number(match[1]);
  const unit = match[2] ?? "ms";
  if (!Number.isFinite(n) || n <= 0) throw new DashboardArgsError(`invalid interval: ${value}`);
  if (unit === "m") return n * 6e4;
  if (unit === "s") return n * 1e3;
  return n;
}
function parseDashboardArgs(argv) {
  const opts = {
    host: "127.0.0.1",
    port: 8787,
    intervalMs: 2e3
  };
  for (let i = 0; i < argv.length; i++) {
    const arg = argv[i];
    if (arg === "--watch" || arg === "--serve") {
      opts.watch = true;
    } else if (arg === "--once") {
      opts.once = true;
    } else if (arg === "--open") {
      opts.open = true;
    } else if (arg === "--host") {
      const value = argv[++i];
      if (!value) throw new DashboardArgsError("--host requires a value");
      opts.host = value;
    } else if (arg.startsWith("--host=")) {
      opts.host = arg.slice("--host=".length);
    } else if (arg === "--port") {
      const value = argv[++i];
      if (!value) throw new DashboardArgsError("--port requires a value");
      opts.port = Number(value);
    } else if (arg.startsWith("--port=")) {
      opts.port = Number(arg.slice("--port=".length));
    } else if (arg === "--interval") {
      const value = argv[++i];
      if (!value) throw new DashboardArgsError("--interval requires a value");
      opts.intervalMs = parseDurationMs(value);
    } else if (arg.startsWith("--interval=")) {
      opts.intervalMs = parseDurationMs(arg.slice("--interval=".length));
    } else {
      throw new DashboardArgsError(`unknown dashboard option: ${arg}`);
    }
  }
  if (!Number.isInteger(opts.port) || opts.port < 0 || opts.port > 65535) {
    throw new DashboardArgsError(`--port must be an integer between 0 and 65535`);
  }
  if (!opts.watch && !opts.once) opts.watch = true;
  if (opts.watch && opts.once) {
    throw new DashboardArgsError("--watch and --once cannot be used together");
  }
  return opts;
}
function findRepoRoot(cwd) {
  let dir = path14.resolve(cwd);
  for (let i = 0; i < 8; i++) {
    if (fs12.existsSync(path14.join(dir, "pnpm-workspace.yaml")) && fs12.existsSync(path14.join(dir, "scripts", "generate-dashboard.cjs"))) {
      return dir;
    }
    const next = path14.dirname(dir);
    if (next === dir) break;
    dir = next;
  }
  return path14.resolve(cwd);
}
function dashboardPaths(cwd) {
  const root = findRepoRoot(cwd);
  return {
    root,
    generatorPath: path14.join(root, "scripts", "generate-dashboard.cjs"),
    outputPath: path14.join(root, "docs", "dashboard.html")
  };
}
function generateDashboardOnce(cwd = process.cwd()) {
  const { root, generatorPath, outputPath } = dashboardPaths(cwd);
  if (!fs12.existsSync(generatorPath)) {
    throw new Error(`dashboard generator not found: ${generatorPath}`);
  }
  const result = spawnSync(process.execPath, [generatorPath], {
    cwd: root,
    encoding: "utf8",
    stdio: ["ignore", "pipe", "pipe"]
  });
  if (result.status !== 0) {
    throw new Error(
      [
        `dashboard generator failed with exit ${result.status ?? "unknown"}`,
        result.stdout?.trim(),
        result.stderr?.trim()
      ].filter(Boolean).join("\n")
    );
  }
  return outputPath;
}
function injectAutoRefresh(html, intervalMs) {
  const script = `
<script>
(() => {
  const ms = ${JSON.stringify(intervalMs)};
  const badge = document.createElement("div");
  badge.textContent = "live refresh: " + Math.round(ms / 1000) + "s";
  badge.style.cssText = "position:fixed;right:14px;bottom:14px;z-index:99999;padding:8px 10px;border-radius:10px;background:rgba(15,23,42,.9);color:#e5e7eb;font:12px ui-monospace,Menlo,monospace";
  document.addEventListener("DOMContentLoaded", () => document.body.appendChild(badge));
  setInterval(() => window.location.reload(), ms);
})();
</script>`;
  return html.includes("</body>") ? html.replace("</body>", `${script}
</body>`) : `${html}
${script}`;
}
function openBrowser(url) {
  const platform = os11.platform();
  const command = platform === "darwin" ? "open" : platform === "win32" ? "cmd" : "xdg-open";
  const args = platform === "win32" ? ["/c", "start", "", url] : [url];
  const child = spawn(command, args, { detached: true, stdio: "ignore" });
  child.unref();
}
function dashboardHealthPayload(args) {
  const lastError = args.lastError ?? "";
  return {
    service: "teamagent-dashboard",
    ok: !lastError,
    status: lastError ? "error" : "ok",
    stableHealthSignal: "teamagent-dashboard-health",
    outputPath: args.outputPath,
    lastGeneratedAt: args.lastGeneratedAt,
    lastError
  };
}
async function launchDashboard(options = {}) {
  const cwd = options.cwd ?? process.cwd();
  const outputPath = generateDashboardOnce(cwd);
  if (options.once) {
    return { mode: "once", outputPath };
  }
  const intervalMs = options.intervalMs ?? 2e3;
  const host = options.host ?? "127.0.0.1";
  const requestedPort = options.port ?? 8787;
  let lastGeneratedAt = (/* @__PURE__ */ new Date()).toISOString();
  let lastError = "";
  const regenerate = () => {
    try {
      generateDashboardOnce(cwd);
      lastGeneratedAt = (/* @__PURE__ */ new Date()).toISOString();
      lastError = "";
    } catch (err) {
      lastError = err instanceof Error ? err.message : String(err);
    }
  };
  const timer = setInterval(regenerate, intervalMs);
  const server = http.createServer((req, res) => {
    const url2 = new URL(req.url ?? "/", `http://${host}`);
    if (url2.pathname === "/health.json") {
      res.writeHead(lastError ? 500 : 200, { "content-type": "application/json; charset=utf-8" });
      res.end(JSON.stringify(dashboardHealthPayload({ outputPath, lastGeneratedAt, lastError }), null, 2));
      return;
    }
    if (url2.pathname === "/" || url2.pathname === "/dashboard.html") {
      try {
        const html = fs12.readFileSync(outputPath, "utf8");
        res.writeHead(200, {
          "content-type": "text/html; charset=utf-8",
          "cache-control": "no-store"
        });
        res.end(injectAutoRefresh(html, intervalMs));
      } catch (err) {
        res.writeHead(500, { "content-type": "text/plain; charset=utf-8" });
        res.end(err instanceof Error ? err.message : String(err));
      }
      return;
    }
    res.writeHead(404, { "content-type": "text/plain; charset=utf-8" });
    res.end("not found");
  });
  await new Promise((resolve3, reject) => {
    server.once("error", reject);
    server.listen(requestedPort, host, () => resolve3());
  });
  server.on("close", () => clearInterval(timer));
  const address = server.address();
  const port = typeof address === "object" && address ? address.port : requestedPort;
  const url = `http://${host}:${port}/dashboard.html`;
  if (options.open) openBrowser(url);
  return { mode: "watch", outputPath, url, host, port, intervalMs };
}
function renderDashboardLaunch(result) {
  if (result.mode === "once") {
    return `Dashboard generated: ${result.outputPath}
`;
  }
  return [
    `Real-time TeamAgent dashboard: ${result.url}`,
    `Serving: ${result.outputPath}`,
    `Refresh interval: ${result.intervalMs}ms`,
    `Press Ctrl+C to stop.`,
    ""
  ].join("\n");
}

// ../cli/src/commands/ingest.ts
init_esm_shims();
import os12 from "os";
import path16 from "path";
import fs14 from "fs";
import { execSync as execSync6 } from "child_process";

// ../adapters/src/ingest/insights.ts
init_esm_shims();
var InsightItemSchema = external_exports.object({
  type: external_exports.string(),
  text: external_exports.string().min(1),
  weight: external_exports.number().min(0).max(1).default(0.7)
});
var InsightsReportSchema = external_exports.object({
  insights: external_exports.array(InsightItemSchema)
});
function parseInsightsReport(raw) {
  const parsed = InsightsReportSchema.parse(JSON.parse(raw));
  return parsed.insights.map((item) => ({
    kind: "insights",
    context: `[type=${item.type}] ${item.text}`,
    weight: item.weight
  }));
}

// ../adapters/src/ingest/npm-audit.ts
init_esm_shims();
import fs13 from "fs";
import path15 from "path";
function parseNpmAudit(raw) {
  let data;
  try {
    data = JSON.parse(raw);
  } catch {
    return [];
  }
  if (!data || typeof data !== "object") return [];
  const vulns = data.vulnerabilities;
  if (!vulns || typeof vulns !== "object") return [];
  const out = [];
  for (const [pkg, rawVuln] of Object.entries(
    vulns
  )) {
    if (!rawVuln || typeof rawVuln !== "object") continue;
    const v = rawVuln;
    const severity = typeof v.severity === "string" ? v.severity.toLowerCase() : "";
    if (severity !== "high" && severity !== "critical") continue;
    const title = typeof v.title === "string" ? v.title : "";
    const url = typeof v.url === "string" ? v.url : "";
    out.push({
      kind: "npm-audit",
      context: `[severity=${severity}] ${pkg}: ${title} (${url || "no url"})`,
      weight: severity === "critical" ? 1 : 0.8
    });
  }
  return out;
}
function detectAuditCmd(cwd) {
  const dir = cwd ?? process.cwd();
  if (fs13.existsSync(path15.join(dir, "pnpm-lock.yaml"))) return "pnpm audit --json";
  if (fs13.existsSync(path15.join(dir, "yarn.lock"))) return "yarn audit --json";
  return "npm audit --json";
}
async function getNpmAuditOutput(runner, cwd) {
  const cmd = detectAuditCmd(cwd);
  try {
    return await runner(cmd, { cwd });
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    const match = message.match(/\{[\s\S]*\}$/);
    if (match) return match[0];
    throw err;
  }
}

// ../adapters/src/ingest/pr-review.ts
init_esm_shims();
function parseGhPrReviews(raw) {
  let data;
  try {
    data = JSON.parse(raw);
  } catch {
    return [];
  }
  if (!data || typeof data !== "object") return [];
  const reviews = data.reviews;
  if (!Array.isArray(reviews)) return [];
  const out = [];
  for (const r of reviews) {
    if (!r || typeof r !== "object") continue;
    const body = typeof r.body === "string" ? r.body : "";
    const state = typeof r.state === "string" ? r.state : "";
    if (body.trim().length < 10) continue;
    if (state === "APPROVED") continue;
    const weight = state === "CHANGES_REQUESTED" ? 0.9 : 0.5;
    out.push({
      kind: "pr-review",
      context: `[state=${state || "unknown"}] ${body}`,
      weight
    });
  }
  return out;
}
async function getGhPrReviews(prNumber, runner) {
  return runner(`gh pr view ${prNumber} --json reviews`);
}
async function isGhAvailable(runner) {
  try {
    await runner("gh --version");
    return true;
  } catch {
    return false;
  }
}

// ../adapters/src/ingest/git-hotspot.ts
init_esm_shims();
var NUMSTAT_LINE = /^\s*(\d+|-)\s+(\d+|-)\s+(\S.*)$/;
function parseGitHotspots(logOutput, opts = {}) {
  const threshold = opts.threshold ?? 3;
  const counts = /* @__PURE__ */ new Map();
  for (const line of logOutput.split(/\r?\n/)) {
    const m = line.match(NUMSTAT_LINE);
    if (!m) continue;
    const filePath = m[3];
    counts.set(filePath, (counts.get(filePath) ?? 0) + 1);
  }
  return [...counts.entries()].filter(([, c]) => c >= threshold).map(([path27, change_count]) => ({ path: path27, change_count })).sort((a, b) => b.change_count - a.change_count);
}
function hotspotsToCandidateItems(hotspots) {
  return hotspots.map((h) => ({
    label: `${h.path} (changed ${h.change_count} times)`
  }));
}
async function getGitNumstat(runner, opts = {}) {
  const since = opts.sinceDays ? `--since="${opts.sinceDays} days ago"` : "";
  const cmd = `git log ${since} --numstat --pretty=format:"commit %H"`;
  return runner(cmd, { cwd: opts.cwd });
}

// ../adapters/src/ingest/ci-failure.ts
init_esm_shims();
function parseGhRunList(raw) {
  let data;
  try {
    data = JSON.parse(raw);
  } catch {
    return [];
  }
  if (!Array.isArray(data)) return [];
  const out = [];
  for (const r of data) {
    if (!r || typeof r !== "object") continue;
    const row = r;
    if (typeof row.databaseId !== "number") continue;
    out.push({
      id: row.databaseId,
      name: typeof row.name === "string" ? row.name : "",
      branch: typeof row.headBranch === "string" ? row.headBranch : "",
      createdAt: typeof row.createdAt === "string" ? row.createdAt : ""
    });
  }
  return out;
}
function runsToCandidateItems(runs) {
  return runs.map((r) => ({
    label: `Run #${r.id} (${r.name}, branch ${r.branch}) \u2014 ${r.createdAt}`
  }));
}
async function getGhRunList(runner, opts = {}) {
  const limit = opts.limit ?? 30;
  return runner(
    `gh run list --status=failure --json databaseId,name,headBranch,createdAt,conclusion --limit ${limit}`
  );
}
function filterBySince(runs, sinceDays, now) {
  if (!sinceDays || sinceDays <= 0) return runs;
  const cutoff = now.getTime() - sinceDays * 24 * 3600 * 1e3;
  return runs.filter((r) => {
    const t = Date.parse(r.createdAt);
    return Number.isNaN(t) ? true : t >= cutoff;
  });
}

// ../adapters/src/ingest/candidate-md.ts
init_esm_shims();
var SOURCE_COMMENT_RE = /<!--\s*teamagent-candidate-source:\s*([\w-]+)\s*-->/;
var CHECKBOX_LINE_RE = /^\s*-\s*\[([ xX])\]\s+(.+?)\s*$/;
function formatCandidateMd(source, items, opts = {}) {
  const lines = [];
  lines.push(`# TeamAgent ingest candidates (${source})`);
  lines.push(`<!-- teamagent-candidate-source: ${source} -->`);
  if (opts.generatedAt) {
    lines.push(`<!-- generated-at: ${opts.generatedAt} -->`);
  }
  lines.push("");
  lines.push("\u52FE\u9009 `[x]` \u4FDD\u7559\u60F3\u6444\u5165\u7684\u5019\u9009\uFF0C\u7136\u540E\u8DD1\uFF1A");
  lines.push("");
  lines.push("```");
  lines.push(`teamagent ingest --from-candidates <this-file>`);
  lines.push("```");
  lines.push("");
  if (items.length === 0) {
    lines.push("_(\u65E0\u5019\u9009)_");
  } else {
    for (const item of items) {
      lines.push(`- [ ] ${item.label}`);
      if (item.meta) lines.push(`      ${item.meta}`);
    }
  }
  return lines.join("\n") + "\n";
}
function parseCandidateMd(md) {
  const sourceMatch = md.match(SOURCE_COMMENT_RE);
  if (!sourceMatch) {
    throw new Error(
      "candidate md \u7F3A\u5C11 <!-- teamagent-candidate-source: ... --> \u6807\u8BB0"
    );
  }
  const source = sourceMatch[1];
  if (source !== "git-hotspot" && source !== "ci-failure") {
    throw new Error(`\u672A\u77E5 candidate source: ${source}`);
  }
  const checked = [];
  for (const line of md.split(/\r?\n/)) {
    const m = line.match(CHECKBOX_LINE_RE);
    if (!m) continue;
    const mark = m[1];
    if (mark !== "x" && mark !== "X") continue;
    checked.push(m[2]);
  }
  return { source, checked };
}
function candidatesToExtractionInputs(parsed) {
  const kind = parsed.source;
  return parsed.checked.map((label) => ({
    kind,
    context: label,
    weight: 0.5
  }));
}

// ../cli/src/commands/ingest.ts
function resolvePaths3(opts) {
  const home = opts.homeDir ?? os12.homedir();
  const cwd = opts.cwd ?? process.cwd();
  return {
    cwd,
    home,
    projectDbPath: opts.projectDbPath ?? path16.join(cwd, ".teamagent", "knowledge.db"),
    userGlobalDbPath: opts.userGlobalDbPath ?? path16.join(home, ".teamagent", "global.db"),
    skillsDir: opts.skillsDir ?? path16.join(home, ".claude", "skills", "teamagent"),
    candidatesDir: path16.join(cwd, ".teamagent", "candidates")
  };
}
function detectProjectStack(cwd) {
  try {
    const presence = {
      exists: (rel) => fs14.existsSync(path16.join(cwd, rel)),
      read: (rel) => {
        const full = path16.join(cwd, rel);
        return fs14.existsSync(full) ? fs14.readFileSync(full, "utf-8") : void 0;
      }
    };
    const fp = detectStack(presence);
    const langToFt = {
      typescript: "ts",
      javascript: "js",
      python: "py",
      go: "go",
      rust: "rs",
      java: "java"
    };
    return fp.languages.map((l) => langToFt[l] ?? l);
  } catch {
    return [];
  }
}
async function defaultRunner(cmd, opts = {}) {
  return execSync6(cmd, {
    cwd: opts.cwd,
    encoding: "utf-8",
    stdio: ["ignore", "pipe", "pipe"],
    maxBuffer: 10 * 1024 * 1024,
    windowsHide: true
  });
}
async function loadInputs(opts) {
  switch (opts.source) {
    case "insights": {
      if (!opts.filePath) {
        throw new Error("--from-insights \u9700\u8981 <path>");
      }
      const raw = fs14.readFileSync(opts.filePath, "utf-8");
      return parseInsightsReport(raw);
    }
    case "npm-audit": {
      const runner = opts.cmdRunner ?? defaultRunner;
      const raw = await getNpmAuditOutput(runner, opts.cwd);
      return parseNpmAudit(raw);
    }
    case "git-hotspot": {
      throw new Error(
        "git-hotspot \u6E90\u53EA\u4EA7\u51FA\u5019\u9009\u6587\u4EF6\uFF0C\u4E0D\u76F4\u63A5 ingest\u3002\u89C1 executeIngest \u7684 handleSemiAuto\u3002"
      );
    }
    case "ci-failure": {
      throw new Error(
        "ci-failure \u6E90\u53EA\u4EA7\u51FA\u5019\u9009\u6587\u4EF6\uFF0C\u4E0D\u76F4\u63A5 ingest\u3002\u89C1 executeIngest \u7684 handleSemiAuto\u3002"
      );
    }
    case "candidates": {
      if (!opts.filePath) {
        throw new Error("--from-candidates \u9700\u8981 <path>");
      }
      const raw = fs14.readFileSync(opts.filePath, "utf-8");
      const parsed = parseCandidateMd(raw);
      return candidatesToExtractionInputs(parsed);
    }
    case "pr-review": {
      if (opts.prNumber === void 0 || Number.isNaN(opts.prNumber)) {
        throw new Error("--from-pr \u9700\u8981 <number>");
      }
      const runner = opts.cmdRunner ?? defaultRunner;
      const simpleRunner = (cmd) => runner(cmd, {});
      if (!await isGhAvailable(simpleRunner)) {
        throw new Error(
          "gh CLI \u672A\u5B89\u88C5\u3002\u53C2\u8003 https://cli.github.com \u5B89\u88C5\u540E\u91CD\u8BD5\u3002"
        );
      }
      const raw = await getGhPrReviews(opts.prNumber, simpleRunner);
      return parseGhPrReviews(raw);
    }
    default:
      throw new Error(`\u6E90 '${opts.source}' \u5C1A\u672A\u5B9E\u73B0\uFF08M2.3 \u540E\u7EED task\uFF09`);
  }
}
async function executeIngest(opts) {
  const paths = resolvePaths3(opts);
  const dryRun = opts.dryRun ?? false;
  const now = opts.now ?? (() => /* @__PURE__ */ new Date());
  const idGen = opts.idGen ?? (() => {
    const ts = now().toISOString().replace(/[-:T.Z]/g, "").slice(0, 14);
    const rand = Math.random().toString(36).slice(2, 8);
    return `ing-${ts}-${rand}`;
  });
  if (opts.source === "git-hotspot" || opts.source === "ci-failure") {
    return handleSemiAuto(opts, paths, now);
  }
  fs14.mkdirSync(path16.dirname(paths.projectDbPath), { recursive: true });
  fs14.mkdirSync(path16.dirname(paths.userGlobalDbPath), { recursive: true });
  let inputs;
  try {
    inputs = await loadInputs(opts);
  } catch (err) {
    return `\u2717 \u52A0\u8F7D ingest \u6E90\u5931\u8D25: ${String(err).slice(0, 200)}
`;
  }
  if (inputs.length === 0) {
    return `\u2713 ingest \u6E90 '${opts.source}' \u626B\u63CF\u5B8C\u6210\uFF1A0 \u6761\u5019\u9009
`;
  }
  const llm = opts.llmClient ?? new ClaudeCodeLLMClient();
  const dualStore = new DualLayerStore({
    projectDbPath: paths.projectDbPath,
    userGlobalDbPath: paths.userGlobalDbPath
  });
  const projectStore = dualStore.getProjectStore();
  const projectStack = detectProjectStack(paths.cwd);
  const validator = { validateLevel0 };
  const result = await runIngestPipeline({
    inputs,
    extractor: llmBasedKnowledgeExtractor,
    callLLM: (prompt) => llm.complete(prompt),
    validator,
    store: projectStore,
    scope: { level: "personal" },
    source: "ingested",
    projectStack,
    now,
    idGen,
    dryRun
  });
  if (!dryRun && result.accepted.length > 0) {
    try {
      await runCompile({
        store: dualStore,
        skillCompiler: makeSkillCompiler({ skillsDir: paths.skillsDir })
      });
      const ids = result.accepted.map((e) => e.id);
      if (opts.docsPropagationScheduler) {
        await opts.docsPropagationScheduler(ids);
      } else {
        scheduleDocsPropagation(ids, { cwd: paths.cwd });
      }
    } catch {
    }
  }
  dualStore.close();
  return formatReport(opts.source, result, dryRun);
}
function formatReport(source, result, dryRun) {
  const lines = [];
  lines.push(
    dryRun ? `\u{1F50D} TeamAgent Ingest (${source}, dry-run)` : `\u{1F4E5} TeamAgent Ingest (${source})`
  );
  lines.push("");
  lines.push(`  \u626B\u63CF: ${result.scanned}`);
  lines.push(`  \u5165\u5E93: ${result.accepted.length}`);
  lines.push(`  L0 \u62D2\u7EDD: ${result.rejected.length}`);
  lines.push(`  LLM \u8DF3\u8FC7: ${result.skipped}`);
  lines.push(`  \u5931\u8D25: ${result.failed}`);
  if (result.accepted.length > 0) {
    lines.push("");
    lines.push("  \u65B0\u589E\u6761\u76EE:");
    for (const e of result.accepted.slice(0, 5)) {
      lines.push(
        `    - [${e.category}/${e.tags[0] ?? "untagged"}] ${e.trigger} \u2192 ${e.correct_pattern}`
      );
    }
    if (result.accepted.length > 5) {
      lines.push(`    ... (${result.accepted.length - 5} more)`);
    }
  }
  if (result.rejected.length > 0) {
    lines.push("");
    lines.push("  L0 \u62D2\u7EDD\u6458\u8981:");
    const reasonCounts = {};
    for (const r of result.rejected) {
      for (const reason of r.reasons) {
        reasonCounts[reason] = (reasonCounts[reason] ?? 0) + 1;
      }
    }
    for (const [reason, n] of Object.entries(reasonCounts)) {
      lines.push(`    - ${reason}: ${n}`);
    }
  }
  return lines.join("\n") + "\n";
}
function parseIngestArgs(argv) {
  const opts = {};
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === "--dry-run") opts.dryRun = true;
    else if (a === "--from-insights" && argv[i + 1]) {
      opts.source = "insights";
      opts.filePath = argv[++i];
    } else if (a === "--from-audit") {
      opts.source = "npm-audit";
    } else if (a === "--from-pr" && argv[i + 1]) {
      opts.source = "pr-review";
      opts.prNumber = parseInt(argv[++i], 10);
    } else if (a === "--from-git") {
      opts.source = "git-hotspot";
    } else if (a === "--from-ci") {
      opts.source = "ci-failure";
    } else if (a === "--from-candidates" && argv[i + 1]) {
      opts.source = "candidates";
      opts.filePath = argv[++i];
    } else if (a.startsWith("--since=")) {
      const raw = a.slice("--since=".length);
      const m = raw.match(/^(\d+)d?$/);
      if (m) {
        opts.sinceDays = parseInt(m[1], 10);
      } else if (raw) {
        throw new Error(`--since \u683C\u5F0F\u65E0\u6548: "${raw}"\u3002\u63A5\u53D7\u683C\u5F0F: "30d" \u6216 "45"\uFF08\u5929\u6570\uFF09`);
      }
    } else if (a.startsWith("--threshold=")) {
      opts.threshold = parseInt(a.slice("--threshold=".length), 10);
    }
  }
  if (!opts.source) {
    throw new Error(
      "ingest \u9700\u8981\u6E90\u6807\u8BB0\uFF1A--from-insights / --from-audit / --from-pr / --from-git / --from-ci / --from-candidates"
    );
  }
  return opts;
}
async function handleSemiAuto(opts, paths, now) {
  fs14.mkdirSync(paths.candidatesDir, { recursive: true });
  const runner = opts.cmdRunner ?? defaultRunner;
  const dateSlug = now().toISOString().slice(0, 10);
  if (opts.source === "git-hotspot") {
    const raw = await getGitNumstat(runner, {
      cwd: paths.cwd,
      sinceDays: opts.sinceDays
    });
    const hotspots = parseGitHotspots(raw, { threshold: opts.threshold });
    const items = hotspotsToCandidateItems(hotspots);
    const md = formatCandidateMd("git-hotspot", items, {
      generatedAt: now().toISOString()
    });
    const outPath = path16.join(
      paths.candidatesDir,
      `git-hotspot-${dateSlug}.md`
    );
    fs14.writeFileSync(outPath, md, "utf-8");
    return formatSemiAutoReport("git-hotspot", items.length, outPath);
  }
  if (opts.source === "ci-failure") {
    const simpleRunner = (cmd) => runner(cmd, {});
    if (!await isGhAvailable(simpleRunner)) {
      throw new Error(
        "gh CLI \u672A\u5B89\u88C5\u3002--from-ci \u9700\u8981 gh\uFF1B\u53C2\u8003 https://cli.github.com\u3002"
      );
    }
    const raw = await getGhRunList(simpleRunner, { limit: 30 });
    const allRuns = parseGhRunList(raw);
    const runs = filterBySince(allRuns, opts.sinceDays, now());
    const items = runsToCandidateItems(runs);
    const md = formatCandidateMd("ci-failure", items, {
      generatedAt: now().toISOString()
    });
    const outPath = path16.join(paths.candidatesDir, `ci-failure-${dateSlug}.md`);
    fs14.writeFileSync(outPath, md, "utf-8");
    return formatSemiAutoReport("ci-failure", items.length, outPath);
  }
  throw new Error(`semi-auto source '${opts.source}' \u672A\u5B9E\u73B0`);
}
function formatSemiAutoReport(source, candidateCount, outPath) {
  return [
    `\u{1F50D} TeamAgent Ingest (${source}, \u5019\u9009\u751F\u6210)`,
    "",
    `  \u5019\u9009\u6570: ${candidateCount}`,
    `  \u5199\u5165: ${outPath}`,
    "",
    `  \u7F16\u8F91\u8BE5\u6587\u4EF6\uFF0C\u628A\u60F3\u6444\u5165\u7684\u6761\u76EE\u6539\u4E3A - [x]\uFF0C\u7136\u540E\u8FD0\u884C\uFF1A`,
    `    teamagent ingest --from-candidates ${outPath}`,
    ""
  ].join("\n");
}

// ../cli/src/commands/compile-cursor.ts
init_esm_shims();
import os13 from "os";
import path17 from "path";
import fs15 from "fs";
function parseCompileCursorArgs(argv) {
  const opts = {};
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === "--out") {
      opts.out = argv[++i];
    } else if (a.startsWith("--out=")) {
      opts.out = a.slice("--out=".length);
    } else if (a === "--top") {
      opts.top = parseInt(argv[++i] ?? "20", 10);
    } else if (a.startsWith("--top=")) {
      opts.top = parseInt(a.slice("--top=".length), 10);
    }
  }
  return opts;
}
async function executeCompileCursor(opts = {}) {
  const home = opts.homeDir ?? os13.homedir();
  const cwd = opts.cwd ?? process.cwd();
  const top = opts.top ?? 20;
  const projectDbPath = opts.projectDbPath ?? path17.join(cwd, ".teamagent", "knowledge.db");
  const userGlobalDbPath = opts.userGlobalDbPath ?? path17.join(home, ".teamagent", "global.db");
  const outPath = opts.out ?? path17.join(cwd, ".cursorrules");
  fs15.mkdirSync(path17.dirname(projectDbPath), { recursive: true });
  fs15.mkdirSync(path17.dirname(userGlobalDbPath), { recursive: true });
  const store = new DualLayerStore({ projectDbPath, userGlobalDbPath });
  let entries;
  try {
    entries = store.getAll();
  } finally {
    store.close();
  }
  const sorted = [...entries].sort((a, b) => (b.confidence ?? 0) - (a.confidence ?? 0)).slice(0, top);
  const output = compileCursorRules(sorted);
  fs15.mkdirSync(path17.dirname(outPath), { recursive: true });
  fs15.writeFileSync(outPath, output, "utf8");
  return { outPath, ruleCount: sorted.length };
}
function renderCompileCursorResult(result) {
  return `Cursor rules compiled: ${result.ruleCount} rule(s) written to ${result.outPath}
`;
}

// ../cli/src/commands/config.ts
init_esm_shims();
import fs16 from "fs";
import path18 from "path";

// ../cli/src/find-teamagent-root.ts
init_esm_shims();
function findTeamagentRoot2(cwd) {
  return findTeamagentRoot(cwd) ?? cwd;
}

// ../cli/src/commands/config.ts
var DEFAULTS = {
  stop_mode: "async",
  stop_scan_errors: true,
  stop_scan_errors_timeout_ms: 9e4
};
function readTeamAgentConfig(cwd) {
  const root = findTeamagentRoot2(cwd);
  const file = path18.join(root, ".teamagent", "config.json");
  if (!fs16.existsSync(file)) return { ...DEFAULTS };
  try {
    const raw = fs16.readFileSync(file, "utf-8");
    return { ...DEFAULTS, ...JSON.parse(raw) };
  } catch {
    return { ...DEFAULTS };
  }
}
function writeTeamAgentConfig(cwd, patch) {
  const dir = path18.join(cwd, ".teamagent");
  const file = path18.join(dir, "config.json");
  fs16.mkdirSync(dir, { recursive: true });
  const existing = readTeamAgentConfig(cwd);
  const merged = { ...existing, ...patch };
  fs16.writeFileSync(file, JSON.stringify(merged, null, 2) + "\n", "utf-8");
}
function executeConfig(opts) {
  const cwd = opts.cwd ?? process.cwd();
  if (opts.subcommand === "stop-mode") {
    const val = opts.value;
    if (val !== "sync" && val !== "async") {
      throw new Error(`Invalid stop-mode value: "${val}". Use "sync" or "async".`);
    }
    writeTeamAgentConfig(cwd, { stop_mode: val });
    return `stop_mode set to "${val}"`;
  }
  if (opts.subcommand === "show") {
    const cfg = readTeamAgentConfig(cwd);
    return JSON.stringify(cfg, null, 2);
  }
  throw new Error(`Unknown config subcommand: "${opts.subcommand}"`);
}

// ../cli/src/commands/scan-errors.ts
init_esm_shims();
import os14 from "os";
import path19 from "path";
import fs17 from "fs";
var SCAN_STATE_FILENAME = "scan-state.json";
function resolveSince(sinceRaw, homeDir, now) {
  if (!sinceRaw) {
    const statePath = path19.join(homeDir, ".teamagent", SCAN_STATE_FILENAME);
    try {
      const state = JSON.parse(fs17.readFileSync(statePath, "utf-8"));
      if (state.lastScanAt) return new Date(String(state.lastScanAt));
    } catch {
    }
    return new Date(now.getTime() - 24 * 60 * 60 * 1e3);
  }
  if (/^\d+h$/.test(sinceRaw)) {
    const hours = parseInt(sinceRaw, 10);
    return new Date(now.getTime() - hours * 60 * 60 * 1e3);
  }
  if (/^\d+d$/.test(sinceRaw)) {
    const days = parseInt(sinceRaw, 10);
    return new Date(now.getTime() - days * 24 * 60 * 60 * 1e3);
  }
  const d = new Date(sinceRaw);
  if (isNaN(d.getTime())) {
    throw new Error(
      `--since \u683C\u5F0F\u65E0\u6548: "${sinceRaw}"\u3002\u63A5\u53D7\u683C\u5F0F: "24h"\uFF08\u5C0F\u65F6\uFF09\u3001"7d"\uFF08\u5929\uFF09\u6216 ISO \u65E5\u671F "2026-01-01"`
    );
  }
  return d;
}
function saveScanState(homeDir, now, mode) {
  const dir = path19.join(homeDir, ".teamagent");
  fs17.mkdirSync(dir, { recursive: true });
  fs17.writeFileSync(
    path19.join(dir, SCAN_STATE_FILENAME),
    JSON.stringify({ lastScanAt: now.toISOString(), lastScanMode: mode }, null, 2)
  );
}
function validateAndBuildEntry(raw, id, now) {
  const { category, tags, type, nature, trigger, wrong_pattern, correct_pattern, reasoning } = raw;
  if (!["C", "E", "S", "K"].includes(String(category))) return null;
  if (!["avoidance", "practice"].includes(String(type))) return null;
  if (!["objective", "subjective"].includes(String(nature))) return null;
  if (typeof trigger !== "string" || !trigger.trim()) return null;
  if (typeof correct_pattern !== "string" || !correct_pattern.trim()) return null;
  if (typeof reasoning !== "string" || !reasoning.trim()) return null;
  const ts = now.toISOString();
  return {
    id,
    scope: { level: "personal" },
    category,
    tags: Array.isArray(tags) ? tags.filter((t) => typeof t === "string") : [],
    type,
    nature,
    trigger: String(trigger).trim(),
    wrong_pattern: typeof wrong_pattern === "string" ? wrong_pattern : "",
    correct_pattern: String(correct_pattern).trim(),
    reasoning: String(reasoning).trim(),
    confidence: 0.5,
    enforcement: "suggest",
    status: "active",
    hit_count: 0,
    success_count: 0,
    override_count: 0,
    evidence: { success_sessions: 0, success_users: 0, correction_sessions: 0 },
    created_at: ts,
    last_hit_at: "",
    last_validated_at: ts,
    source: "accumulated",
    conflict_with: [],
    current_tier: "experimental",
    max_tier_ever: "experimental",
    tier_entered_at: "",
    demerit: 0,
    demerit_last_updated: "",
    resurrect_count: 0
  };
}
async function executeScanErrors(opts = { mode: "efficient", minFreq: 2, dryRun: false, quiet: false }) {
  const home = opts.homeDir ?? os14.homedir();
  const now = opts.now ? opts.now() : /* @__PURE__ */ new Date();
  const since = resolveSince(opts.sinceRaw, home, now);
  const projectsRoot = opts.projectsRoot ?? path19.join(home, ".claude", "projects");
  const eventsDbPath = opts.eventsDbPath ?? path19.join(home, ".teamagent", "events.db");
  const candidatesDbPath = opts.candidatesDbPath ?? path19.join(home, ".teamagent", "candidates.db");
  let events = [];
  if (fs17.existsSync(eventsDbPath)) {
    const eventLog = new SqliteEventLog(openDb(eventsDbPath));
    events = eventLog.readAll();
    eventLog.close();
  }
  const sessions = [];
  try {
    const src = new ClaudeSessionSource(projectsRoot);
    const recent = await src.listRecent(20);
    for (const meta of recent) {
      if (meta.startTime < since.toISOString()) continue;
      try {
        sessions.push(await src.loadById(meta.sessionId));
      } catch {
      }
    }
  } catch {
  }
  const collector = new CompositeErrorSignalCollector({ events, sessions, since, now });
  let signals = await collector.collect(since);
  if (opts.mode === "efficient") {
    signals = filterSignals(signals, {
      weightThreshold: 0.3,
      minSessions: opts.minFreq
    });
  }
  if (signals.length === 0) {
    if (!opts.quiet) return "\u{1F4ED} \u65E0\u65B0\u9519\u8BEF\u4FE1\u53F7\uFF0C\u77E5\u8BC6\u5E93\u65E0\u9700\u66F4\u65B0\u3002\n";
    return "";
  }
  const batches = buildErrorBatches(signals);
  const lines = [];
  lines.push(`\u{1F50D} scan-errors [${opts.mode} mode] \u2014 since ${since.toISOString()}`);
  lines.push(`  \u4FE1\u53F7\u6570: ${signals.length}\uFF0C\u6279\u6B21\u6570: ${batches.length}`);
  lines.push("");
  if (opts.dryRun) {
    for (const batch of batches) {
      lines.push(`  [dry-run] category=${batch.category} signals=${batch.signals.length}`);
      for (const s of batch.signals) {
        lines.push(
          `    - [${s.signalType}] w=${s.weight.toFixed(2)} ${s.context.slice(0, 80)}`
        );
      }
    }
    lines.push("");
    lines.push("  (dry-run \u6A21\u5F0F\uFF0C\u672A\u5199\u5165\u5019\u9009\u961F\u5217)");
    return lines.join("\n") + "\n";
  }
  const llm = opts.llmClient ?? new ClaudeCodeLLMClient();
  fs17.mkdirSync(path19.dirname(candidatesDbPath), { recursive: true });
  const queueDb = openDb(candidatesDbPath);
  const queue = new SqliteCandidateQueue(queueDb);
  let totalCandidates = 0;
  for (const batch of batches) {
    let rawResponse;
    try {
      rawResponse = await llm.complete(batch.prompt);
    } catch (e) {
      lines.push(
        `  \u26A0 LLM \u8C03\u7528\u5931\u8D25 (category=${batch.category}): ${String(e).slice(0, 100)}`
      );
      continue;
    }
    let entries = [];
    try {
      const fenced = rawResponse.match(/```(?:json)?\s*\n?([\s\S]*?)\n?```/);
      const json = fenced ? fenced[1].trim() : rawResponse.trim();
      const parsed = JSON.parse(json);
      if (Array.isArray(parsed)) entries = parsed;
    } catch {
      lines.push(`  \u26A0 LLM \u54CD\u5E94\u89E3\u6790\u5931\u8D25 (category=${batch.category})`);
      continue;
    }
    for (const raw of entries) {
      const ts = now.toISOString().replace(/[-:T.Z]/g, "").slice(0, 14);
      const rand = Math.random().toString(36).slice(2, 8);
      const candidateId = `cand-${ts}-${rand}`;
      const entryId = `pers-${ts}-${rand}`;
      const entry = validateAndBuildEntry(raw, entryId, now);
      if (!entry) continue;
      const sourceDesc = batch.signals.map((s) => `${s.signalType}\xD7${s.sessionIds.length}`).join(", ");
      queue.enqueue([{ id: candidateId, entry, sourceSignals: sourceDesc }]);
      totalCandidates++;
    }
  }
  queueDb.close();
  saveScanState(home, now, opts.mode);
  if (totalCandidates > 0 && fs17.existsSync(eventsDbPath)) {
    try {
      const eventLog = new SqliteEventLog(openDb(eventsDbPath));
      const addedEvent = {
        id: `ev-cand-added-${now.getTime()}`,
        kind: "error.candidate.added",
        timestamp: now.toISOString(),
        schema_version: 1
      };
      addedEvent.count = totalCandidates;
      eventLog.append(addedEvent);
      eventLog.close();
    } catch {
    }
  }
  lines.push(`  \u2713 \u65B0\u589E\u5019\u9009\u89C4\u5219: ${totalCandidates} \u6761`);
  if (totalCandidates > 0) {
    lines.push(`  \u8FD0\u884C teamagent review-candidates \u5BA1\u6838`);
  }
  return lines.join("\n") + "\n";
}
function parseScanErrorsArgs(argv) {
  const opts = {
    mode: "efficient",
    minFreq: 2,
    dryRun: false,
    quiet: false
  };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === "--mode" && argv[i + 1]) {
      const v = argv[++i];
      if (v === "full" || v === "efficient") opts.mode = v;
      else throw new Error(`--mode \u5FC5\u987B\u662F "efficient" \u6216 "full"\uFF0C\u6536\u5230: "${v}"`);
    } else if (a.startsWith("--mode=")) {
      const v = a.slice("--mode=".length);
      if (v === "full" || v === "efficient") opts.mode = v;
      else throw new Error(`--mode \u5FC5\u987B\u662F "efficient" \u6216 "full"\uFF0C\u6536\u5230: "${v}"`);
    } else if (a === "--min-freq" && argv[i + 1]) {
      const v = parseInt(argv[++i], 10);
      if (isNaN(v)) throw new Error(`--min-freq \u5FC5\u987B\u662F\u6574\u6570\uFF0C\u6536\u5230: "${argv[i]}"`);
      opts.minFreq = v;
    } else if (a.startsWith("--min-freq=")) {
      const v = parseInt(a.slice("--min-freq=".length), 10);
      if (isNaN(v)) throw new Error(`--min-freq \u5FC5\u987B\u662F\u6574\u6570\uFF0C\u6536\u5230: "${a.slice("--min-freq=".length)}"`);
      opts.minFreq = v;
    } else if (a === "--dry-run") {
      opts.dryRun = true;
    } else if (a === "--quiet") {
      opts.quiet = true;
    } else if (a === "--since" && argv[i + 1]) {
      opts.sinceRaw = argv[++i];
    } else if (a.startsWith("--since=")) {
      opts.sinceRaw = a.slice("--since=".length);
    }
  }
  return opts;
}

// ../cli/src/commands/review-candidates.ts
init_esm_shims();
import os15 from "os";
import path20 from "path";
import fs18 from "fs";
import * as readline from "readline";
async function executeReviewCandidates(opts = {}) {
  const home = opts.homeDir ?? os15.homedir();
  const cwd = opts.cwd ?? process.cwd();
  const candidatesDbPath = opts.candidatesDbPath ?? path20.join(home, ".teamagent", "candidates.db");
  const projectDbPath = opts.projectDbPath ?? path20.join(cwd, ".teamagent", "knowledge.db");
  const userGlobalDbPath = opts.userGlobalDbPath ?? path20.join(home, ".teamagent", "global.db");
  const eventsDbPath = opts.eventsDbPath ?? path20.join(home, ".teamagent", "events.db");
  const skillsDir = opts.skillsDir ?? path20.join(home, ".claude", "skills", "teamagent");
  const now = opts.now ?? (() => /* @__PURE__ */ new Date());
  const output = opts.output ?? process.stdout;
  const approveScope = opts.approveScope;
  const emitEvent = (evt) => {
    if (!fs18.existsSync(eventsDbPath)) return;
    try {
      const eventLog = new SqliteEventLog(openDb(eventsDbPath));
      eventLog.append({ ...evt, schema_version: 1 });
      eventLog.close();
    } catch {
    }
  };
  if (!fs18.existsSync(candidatesDbPath)) {
    return "\u{1F4ED} \u5019\u9009\u961F\u5217\u4E3A\u7A7A\uFF08candidates.db \u4E0D\u5B58\u5728\uFF09\u3002\u5148\u8FD0\u884C teamagent scan-errors\u3002\n";
  }
  const queueDb = openDb(candidatesDbPath);
  const queue = new SqliteCandidateQueue(queueDb);
  let pending = queue.listPending();
  if (opts.limit !== void 0) {
    pending = pending.slice(0, opts.limit);
  }
  if (pending.length === 0) {
    queueDb.close();
    return "\u2705 \u5019\u9009\u961F\u5217\u5DF2\u6E05\u7A7A\uFF0C\u65E0\u5F85\u5BA1\u6838\u6761\u76EE\u3002\n";
  }
  fs18.mkdirSync(path20.dirname(projectDbPath), { recursive: true });
  fs18.mkdirSync(path20.dirname(userGlobalDbPath), { recursive: true });
  const store = new DualLayerStore({ projectDbPath, userGlobalDbPath });
  const projectStore = store.getProjectStore();
  const rl = readline.createInterface({
    input: opts.input ?? process.stdin,
    output
  });
  const ask = (prompt) => new Promise((resolve3) => rl.question(prompt, resolve3));
  output.write(`\u{1F4CB} \u5019\u9009\u89C4\u5219\u5BA1\u6838 \u2014 \u5171 ${pending.length} \u6761\u5F85\u5BA1
`);
  output.write("\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\n");
  let approved = 0;
  let rejected = 0;
  let skipped = 0;
  const approvedRuleIds = [];
  for (let i = 0; i < pending.length; i++) {
    const candidate = pending[i];
    const e = candidate.entry;
    output.write(`
[${i + 1}/${pending.length}] category=${e.category}  tags=[${e.tags.join(", ")}]
`);
    output.write(`  trigger:  ${e.trigger}
`);
    if (e.wrong_pattern) output.write(`  wrong:    ${e.wrong_pattern}
`);
    output.write(`  correct:  ${e.correct_pattern}
`);
    output.write(`  reason:   ${e.reasoning}
`);
    output.write(`  \u6765\u6E90\u4FE1\u53F7: ${candidate.sourceSignals}
`);
    output.write(`  confidence: ${e.confidence.toFixed(2)}
`);
    output.write("\n  [a]pprove  [r]eject  [s]kip  [q]uit\n");
    const answer = (await ask("> ")).trim().toLowerCase();
    if (answer === "q") {
      output.write("\n\u9000\u51FA\u5BA1\u6838\uFF0C\u5269\u4F59\u6761\u76EE\u4FDD\u7559\u5728\u961F\u5217\u4E2D\u3002\n");
      break;
    }
    if (answer === "a") {
      try {
        const approvedEntry = approveScope ? { ...e, scope: { ...e.scope, level: approveScope } } : e;
        if (approvedEntry.scope.level === "team") {
          const findings = detectSensitiveText([
            approvedEntry.trigger,
            approvedEntry.wrong_pattern,
            approvedEntry.correct_pattern,
            approvedEntry.reasoning,
            approvedEntry.tags.join("\n")
          ].join("\n"));
          if (findings.length > 0) {
            const kinds = [...new Set(findings.map((f) => f.kind))].join(", ");
            output.write(`\u26A0 \u9690\u79C1\u5B88\u95E8\u62E6\u622A: team \u5019\u9009\u542B\u654F\u611F\u4FE1\u606F (${kinds})\uFF0C\u672A\u5199\u5165\u77E5\u8BC6\u5E93
`);
            continue;
          }
        }
        store.add(approvedEntry);
        queue.updateStatus(candidate.id, "approved");
        approved++;
        approvedRuleIds.push(approvedEntry.id);
        output.write(`\u2713 \u5DF2\u5199\u5165\u77E5\u8BC6\u5E93 (id: ${approvedEntry.id}, scope: ${approvedEntry.scope.level})
`);
        emitEvent({
          id: `ev-cand-approved-${now().getTime()}-${candidate.id.slice(-6)}`,
          kind: "error.candidate.approved",
          knowledge_id: approvedEntry.id,
          timestamp: now().toISOString()
        });
      } catch (err) {
        output.write(`\u26A0 \u5199\u5165\u5931\u8D25: ${String(err).slice(0, 100)}
`);
      }
    } else if (answer === "r") {
      queue.updateStatus(candidate.id, "rejected");
      rejected++;
      output.write("\u2717 \u5DF2\u62D2\u7EDD\n");
      emitEvent({
        id: `ev-cand-rejected-${now().getTime()}-${candidate.id.slice(-6)}`,
        kind: "error.candidate.rejected",
        timestamp: now().toISOString()
      });
    } else {
      queue.updateStatus(candidate.id, "skipped");
      skipped++;
      output.write("\u2192 \u5DF2\u8DF3\u8FC7\uFF08\u4E0B\u6B21\u5BA1\u6838\u53EF\u89C1\uFF09\n");
    }
  }
  rl.close();
  if (approved > 0) {
    output.write("\n\u91CD\u65B0\u6821\u51C6 + \u66F4\u65B0 Skills + \u8C03\u5EA6 docs propagation\u2026\n");
    try {
      await runCalibrationPipeline({
        calibrator: defaultCalibrator,
        store: projectStore,
        events: [],
        now
      });
      await runCompile({
        store,
        skillCompiler: makeSkillCompiler({ skillsDir })
      });
      if (opts.docsPropagationScheduler) {
        await opts.docsPropagationScheduler(approvedRuleIds);
      } else {
        scheduleDocsPropagation(approvedRuleIds, { cwd });
      }
      output.write("\u2713 Skills \u5DF2\u66F4\u65B0\uFF1Bdocs propagation \u5DF2\u8C03\u5EA6\n");
    } catch (err) {
      output.write(`\u26A0 \u6821\u51C6/\u5BFC\u51FA\u5931\u8D25: ${String(err).slice(0, 100)}
`);
    }
  }
  store.close();
  queueDb.close();
  return `
\u5BA1\u6838\u5B8C\u6210: \u2713\u6279\u51C6 ${approved}  \u2717\u62D2\u7EDD ${rejected}  \u2192\u8DF3\u8FC7 ${skipped}
\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501
`;
}
function parseReviewCandidatesArgs(argv) {
  const opts = { limit: Number.POSITIVE_INFINITY };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === "--limit" && argv[i + 1]) {
      opts.limit = parseInt(argv[++i], 10);
    } else if (a.startsWith("--limit=")) {
      opts.limit = parseInt(a.slice("--limit=".length), 10);
    } else if (a === "--approve-scope" && argv[i + 1]) {
      const scope = argv[++i];
      if (scope === "personal" || scope === "team" || scope === "global") {
        opts.approveScope = scope;
      }
    } else if (a.startsWith("--approve-scope=")) {
      const scope = a.slice("--approve-scope=".length);
      if (scope === "personal" || scope === "team" || scope === "global") {
        opts.approveScope = scope;
      }
    }
  }
  return opts;
}

// ../cli/src/commands/team-transfer.ts
init_esm_shims();
import fs19 from "fs";
import os16 from "os";
import path21 from "path";
function defaultPaths(cwd, homeDir) {
  return {
    projectDbPath: path21.join(cwd, ".teamagent", "knowledge.db"),
    userGlobalDbPath: path21.join(homeDir, ".teamagent", "global.db"),
    defaultOutPath: path21.join(cwd, ".teamagent", "team-rules.json")
  };
}
function sensitiveTextForEntry(entry) {
  return [
    entry.trigger,
    entry.wrong_pattern,
    entry.correct_pattern,
    entry.reasoning,
    entry.tags.join("\n")
  ].join("\n");
}
function buildTeamBundle(entries, exportedAt) {
  return {
    schema_version: 1,
    exported_at: exportedAt,
    entries: entries.map((entry) => ({
      ...entry,
      scope: { ...entry.scope, level: "team" }
    }))
  };
}
function parseTeamExportArgs(argv) {
  const opts = {};
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if ((a === "--out" || a === "--output") && argv[i + 1]) {
      opts.outPath = argv[++i];
    } else if (a.startsWith("--out=")) {
      opts.outPath = a.slice("--out=".length);
    } else if (a.startsWith("--output=")) {
      opts.outPath = a.slice("--output=".length);
    }
  }
  return opts;
}
function parseTeamImportArgs(argv) {
  const opts = {};
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if ((a === "--file" || a === "--input") && argv[i + 1]) {
      opts.filePath = argv[++i];
    } else if (a.startsWith("--file=")) {
      opts.filePath = a.slice("--file=".length);
    } else if (a.startsWith("--input=")) {
      opts.filePath = a.slice("--input=".length);
    }
  }
  return opts;
}
function executeTeamExport(opts = {}) {
  const cwd = opts.cwd ?? process.cwd();
  const homeDir = opts.homeDir ?? os16.homedir();
  const now = opts.now ?? (() => /* @__PURE__ */ new Date());
  const paths = defaultPaths(cwd, homeDir);
  const outPath = opts.outPath ?? paths.defaultOutPath;
  if (!fs19.existsSync(paths.projectDbPath)) {
    return { ok: true, exported: 0, output: `No project knowledge DB found; exported 0 team rules.
` };
  }
  fs19.mkdirSync(path21.dirname(outPath), { recursive: true });
  fs19.mkdirSync(path21.dirname(paths.userGlobalDbPath), { recursive: true });
  const store = new DualLayerStore({
    projectDbPath: paths.projectDbPath,
    userGlobalDbPath: paths.userGlobalDbPath
  });
  try {
    const entries = store.findByScopeLevel("team").filter((entry) => entry.status === "active");
    const sensitive = entries.map((entry) => ({ entry, findings: detectSensitiveText(sensitiveTextForEntry(entry)) })).filter(({ findings }) => findings.length > 0);
    if (sensitive.length > 0) {
      const details = sensitive.map(({ entry, findings }) => `${entry.id}: ${[...new Set(findings.map((f) => f.kind))].join(", ")}`).join("; ");
      return {
        ok: false,
        exported: 0,
        output: `Blocked team export: sensitive fields detected (${details}).
`
      };
    }
    const bundle = buildTeamBundle(entries, now().toISOString());
    fs19.writeFileSync(outPath, `${JSON.stringify(bundle, null, 2)}
`, "utf-8");
    return {
      ok: true,
      exported: entries.length,
      output: `Exported ${entries.length} team rules to ${outPath}
`
    };
  } finally {
    store.close();
  }
}
function executeTeamImport(opts = {}) {
  const cwd = opts.cwd ?? process.cwd();
  const homeDir = opts.homeDir ?? os16.homedir();
  const paths = defaultPaths(cwd, homeDir);
  const filePath = opts.filePath ?? paths.defaultOutPath;
  if (!fs19.existsSync(filePath)) {
    return { ok: false, imported: 0, skipped: 0, output: `Team import file not found: ${filePath}
` };
  }
  const bundle = JSON.parse(fs19.readFileSync(filePath, "utf-8"));
  if (bundle.schema_version !== 1 || !Array.isArray(bundle.entries)) {
    return { ok: false, imported: 0, skipped: 0, output: `Invalid team import bundle: ${filePath}
` };
  }
  fs19.mkdirSync(path21.dirname(paths.projectDbPath), { recursive: true });
  fs19.mkdirSync(path21.dirname(paths.userGlobalDbPath), { recursive: true });
  const store = new DualLayerStore({
    projectDbPath: paths.projectDbPath,
    userGlobalDbPath: paths.userGlobalDbPath
  });
  let imported = 0;
  let skipped = 0;
  try {
    for (const entry of bundle.entries) {
      const teamEntry = { ...entry, scope: { ...entry.scope, level: "team" } };
      if (store.getById(teamEntry.id)) {
        skipped++;
        continue;
      }
      store.add(teamEntry);
      imported++;
    }
  } finally {
    store.close();
  }
  return {
    ok: true,
    imported,
    skipped,
    output: `Imported ${imported} team rules from ${filePath}; skipped ${skipped} existing rules.
`
  };
}

// ../cli/src/commands/git-sync.ts
init_esm_shims();
import fs20 from "fs";
import path22 from "path";
import { execSync as nodeExecSync } from "child_process";
function parseGitSyncArgs(argv) {
  const [subcommand, ...flags] = argv;
  if (subcommand !== "push" && subcommand !== "pull") {
    throw new Error(`Usage: teamagent sync <push|pull> --remote <url> [--branch <branch>] [--cwd <path>]`);
  }
  let remote;
  let branch;
  let rulesFile;
  let cwd;
  for (let i = 0; i < flags.length; i++) {
    const f = flags[i];
    if (f.startsWith("--remote=")) {
      remote = f.slice("--remote=".length);
    } else if (f === "--remote" && flags[i + 1]) {
      remote = flags[++i];
    } else if (f.startsWith("--branch=")) {
      branch = f.slice("--branch=".length);
    } else if (f === "--branch" && flags[i + 1]) {
      branch = flags[++i];
    } else if (f.startsWith("--rules-file=")) {
      rulesFile = f.slice("--rules-file=".length);
    } else if (f === "--rules-file" && flags[i + 1]) {
      rulesFile = flags[++i];
    } else if (f.startsWith("--cwd=")) {
      cwd = f.slice("--cwd=".length);
    } else if (f === "--cwd" && flags[i + 1]) {
      cwd = flags[++i];
    }
  }
  if (!remote) throw new Error("Missing required flag: --remote");
  return { subcommand, remote, branch, rulesFile, cwd };
}
function executeGitSyncPush(opts) {
  const cwd = opts.cwd ?? process.cwd();
  const branch = opts.branch ?? "main";
  const rulesFile = opts.rulesFile ?? ".teamagent/team-rules.json";
  const exec = opts.execSync ?? ((cmd, o) => nodeExecSync(cmd, { ...o, stdio: "pipe" }).toString());
  const log = [];
  const outPath = path22.isAbsolute(rulesFile) ? rulesFile : path22.join(cwd, rulesFile);
  const exportResult = executeTeamExport({
    cwd,
    homeDir: opts.homeDir,
    outPath
  });
  log.push(exportResult.output.trim());
  if (!exportResult.ok) {
    return { ok: false, output: log.join("\n") };
  }
  const gitDir = path22.join(cwd, ".git");
  if (!fs20.existsSync(gitDir)) {
    exec("git init", { cwd, encoding: "utf-8" });
    exec(`git checkout -b ${branch}`, { cwd, encoding: "utf-8" });
    log.push(`Initialized git repo in ${cwd}`);
  }
  try {
    const remotes = exec("git remote", { cwd, encoding: "utf-8" });
    if (!remotes.includes("origin")) {
      exec(`git remote add origin "${opts.remote}"`, { cwd, encoding: "utf-8" });
      log.push(`Added remote origin: ${opts.remote}`);
    }
  } catch {
    exec(`git remote add origin "${opts.remote}"`, { cwd, encoding: "utf-8" });
    log.push(`Added remote origin: ${opts.remote}`);
  }
  if (!fs20.existsSync(outPath)) {
    fs20.mkdirSync(path22.dirname(outPath), { recursive: true });
    fs20.writeFileSync(outPath, JSON.stringify({ schema_version: 1, exported_at: (/* @__PURE__ */ new Date()).toISOString(), entries: [] }));
    log.push("Created empty team-rules.json (no rules to export)");
  }
  exec(`git add "${rulesFile}"`, { cwd, encoding: "utf-8" });
  let pushed = false;
  try {
    const status = exec("git status --porcelain", { cwd, encoding: "utf-8" });
    const hasChanges = status.trim().length > 0;
    if (hasChanges || !(opts.skipCleanCommit ?? true)) {
      exec(
        `git -c user.email="teamagent@sync" -c user.name="TeamAgent Sync" commit -m "sync: update team-rules.json"`,
        { cwd, encoding: "utf-8" }
      );
      log.push("Committed team-rules.json");
    } else {
      log.push("No changes to commit \u2014 rules already up to date");
    }
    exec(`git push origin ${branch}`, { cwd, encoding: "utf-8" });
    pushed = true;
    log.push(`Pushed to remote (branch: ${branch})`);
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    log.push(`Git push failed: ${msg}`);
    return { ok: false, output: log.join("\n"), pushed: false };
  }
  return {
    ok: true,
    output: log.join("\n"),
    exported: exportResult.exported,
    pushed
  };
}
function executeGitSyncPull(opts) {
  const cwd = opts.cwd ?? process.cwd();
  const branch = opts.branch ?? "main";
  const rulesFile = opts.rulesFile ?? ".teamagent/team-rules.json";
  const exec = opts.execSync ?? ((cmd, o) => nodeExecSync(cmd, { ...o, stdio: "pipe" }).toString());
  const log = [];
  const gitDir = path22.join(cwd, ".git");
  let pulled = false;
  try {
    if (!fs20.existsSync(gitDir)) {
      exec(`git clone "${opts.remote}" .`, { cwd, encoding: "utf-8" });
      log.push(`Cloned from ${opts.remote}`);
    } else {
      exec(`git fetch origin`, { cwd, encoding: "utf-8" });
      exec(`git checkout ${branch}`, { cwd, encoding: "utf-8" });
      exec(`git merge --ff-only origin/${branch}`, { cwd, encoding: "utf-8" });
      log.push(`Pulled from origin/${branch}`);
    }
    pulled = true;
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    log.push(`Git pull failed: ${msg}`);
    return { ok: false, output: log.join("\n"), pulled: false };
  }
  const filePath = path22.isAbsolute(rulesFile) ? rulesFile : path22.join(cwd, rulesFile);
  if (!fs20.existsSync(filePath)) {
    log.push(`No team-rules.json found at ${filePath} after pull \u2014 remote may be empty`);
    return { ok: false, output: log.join("\n"), pulled };
  }
  const importResult = executeTeamImport({
    cwd,
    homeDir: opts.homeDir,
    filePath
  });
  log.push(importResult.output.trim());
  return {
    ok: importResult.ok,
    output: log.join("\n"),
    imported: importResult.imported,
    skipped: importResult.skipped,
    pulled
  };
}

// ../cli/src/commands/pr-cycle.ts
init_esm_shims();
import { execSync as execSync7 } from "child_process";
var DEFAULT_WAIT_MS = 5 * 60 * 1e3;
async function executePrCycle(opts = {}) {
  const cwd = opts.cwd ?? process.cwd();
  const runner = opts.cmdRunner ?? defaultRunner2;
  const sleep = opts.sleep ?? defaultSleep;
  const waitMs = opts.waitMs ?? DEFAULT_WAIT_MS;
  const claudefastBin = opts.claudefastBin ?? "claudefast";
  const codexfastgBin = opts.codexfastgBin ?? "codexfastg";
  const lines = [];
  const createCommand = buildCreateCommand(opts);
  const initialViewCommand = buildViewCommand(opts.prNumber, opts);
  const reviewViewCommand = buildViewCommand(opts.prNumber, opts);
  if (opts.dryRun) {
    lines.push("\u{1F50D} TeamAgent PR Cycle (dry-run)");
    lines.push("");
    if (!opts.prNumber && !opts.noCreate) {
      lines.push(`  \u5C06\u521B\u5EFA PR: ${createCommand}`);
      lines.push(`  \u5C06\u5B9A\u4F4D PR: ${initialViewCommand}`);
    } else {
      lines.push(`  \u5C06\u4F7F\u7528\u73B0\u6709 PR: ${initialViewCommand}`);
    }
    lines.push(`  \u5C06\u7B49\u5F85: ${waitMs}ms`);
    lines.push(`  \u5C06\u68C0\u67E5 review: ${reviewViewCommand}`);
    lines.push("");
    lines.push("  \u82E5\u53D1\u73B0\u9700\u8981\u5904\u7406\u7684 review\uFF0C\u5C06\u963B\u585E\u76F4\u63A5\u4FEE\u590D\uFF0C\u5E76\u8981\u6C42\u5148\u66F4\u65B0\u6587\u6863/\u89C4\u5219\uFF1A");
    lines.push("  \u9A8C\u8BC1\u89C4\u5219\u7B54\u6848\uFF08\u4E8C\u9009\u4E00\uFF0C\u76F4\u5230\u7B54\u6848\u6B63\u786E\uFF09\uFF1A");
    lines.push(`    !${claudefastBin} -p "{pr_index} \u6839\u636E\u89C4\u5219\uFF0C\u6211\u4EEC\u5E94\u8BE5\u600E\u4E48\u89E3\u51B3\u8FD9\u4E2Areview\u51FA\u6765\u7684\u95EE\u9898\uFF1F"`);
    lines.push(`    !${codexfastgBin} -p "{pr_index} \u6839\u636E\u89C4\u5219\uFF0C\u6211\u4EEC\u5E94\u8BE5\u600E\u4E48\u89E3\u51B3\u8FD9\u4E2Areview\u51FA\u6765\u7684\u95EE\u9898\uFF1F"`);
    return { output: lines.join("\n") + "\n", blocked: false };
  }
  const simpleRunner = (cmd) => runner(cmd, { cwd });
  if (!await isGhAvailable(simpleRunner)) {
    return {
      output: "\u2717 gh CLI \u672A\u5B89\u88C5\u6216\u4E0D\u53EF\u7528\u3002pr-cycle \u9700\u8981 gh \u6765\u521B\u5EFA\u548C\u8BFB\u53D6 PR\u3002\n",
      blocked: true
    };
  }
  try {
    if (!opts.prNumber && !opts.noCreate) {
      lines.push(`\u{1F680} \u521B\u5EFA PR: ${createCommand}`);
      const createOut = await runner(createCommand, { cwd });
      const url = extractFirstUrl(createOut);
      if (url) lines.push(`  PR URL: ${url}`);
    }
    const initialView = parsePrView(await runner(initialViewCommand, { cwd }));
    const prNumber = opts.prNumber ?? initialView.number;
    const prUrl = initialView.url;
    if (!prNumber) {
      return {
        output: lines.concat([
          "\u2717 \u65E0\u6CD5\u5B9A\u4F4D PR number\u3002\u8BF7\u786E\u8BA4\u5F53\u524D\u5206\u652F\u5DF2\u6709 PR\uFF0C\u6216\u4F20 --pr <number>\u3002"
        ]).join("\n") + "\n",
        blocked: true
      };
    }
    lines.push(`\u2705 PR \u5DF2\u5B9A\u4F4D: #${prNumber}${prUrl ? ` ${prUrl}` : ""}`);
    lines.push(`\u23F1 \u7B49\u5F85 ${waitMs}ms \u540E\u68C0\u67E5 review`);
    await sleep(waitMs);
    const reviewView = parsePrView(await runner(buildViewCommand(prNumber, opts), { cwd }));
    const reviewInputs = parseGhPrReviews(JSON.stringify({ reviews: reviewView.reviews ?? [] }));
    if (reviewInputs.length === 0) {
      lines.push("\u2705 Review \u68C0\u67E5\u5B8C\u6210\uFF1A\u6CA1\u6709\u9700\u8981\u5148\u5199\u89C4\u5219\u7684 review\u3002");
      return { output: lines.join("\n") + "\n", blocked: false };
    }
    lines.push(`\u26D4 Review \u68C0\u67E5\u53D1\u73B0 ${reviewInputs.length} \u6761\u9700\u8981\u5904\u7406\u7684\u53CD\u9988\u3002`);
    lines.push("");
    reviewInputs.slice(0, 5).forEach((input, idx) => {
      lines.push(`  ${idx + 1}. ${input.context.replace(/\s+/g, " ").slice(0, 220)}`);
    });
    if (reviewInputs.length > 5) {
      lines.push(`  ... (${reviewInputs.length - 5} more)`);
    }
    lines.push("");
    lines.push("Gate: \u5148\u66F4\u65B0\u9879\u76EE\u6587\u6863/\u89C4\u5219\uFF0C\u5199\u6E05\u4EE5\u540E\u9047\u5230\u8FD9\u7C7B review \u5E94\u5982\u4F55\u56DE\u7B54\u548C\u5904\u7406\u3002");
    lines.push("\u6B63\u786E\u524D\u4E0D\u8981\u76F4\u63A5\u6539\u4EE3\u7801\u5904\u7406 review\uFF1B\u8BA9\u89C4\u5219\u5148\u88AB Claude Code \u8BFB\u5230\u3002");
    lines.push("");
    lines.push("\u5728 Claude Code \u4EA4\u4E92\u754C\u9762\u8FD0\u884C\u5E76\u53CD\u590D\u6821\u51C6\uFF0C\u76F4\u5230\u56DE\u7B54\u6B63\u786E\uFF08\u4E8C\u9009\u4E00\uFF09\uFF1A");
    lines.push(`  !${claudefastBin} -p "${prNumber} \u6839\u636E\u89C4\u5219\uFF0C\u6211\u4EEC\u5E94\u8BE5\u600E\u4E48\u89E3\u51B3\u8FD9\u4E2Areview\u51FA\u6765\u7684\u95EE\u9898\uFF1F"`);
    lines.push(`  !${codexfastgBin} -p "${prNumber} \u6839\u636E\u89C4\u5219\uFF0C\u6211\u4EEC\u5E94\u8BE5\u600E\u4E48\u89E3\u51B3\u8FD9\u4E2Areview\u51FA\u6765\u7684\u95EE\u9898\uFF1F"`);
    lines.push("");
    lines.push("\u56DE\u7B54\u6B63\u786E\u540E\uFF0C\u518D\u5904\u7406 review\uFF0C\u5E76\u53EF\u6444\u5165 review \u5F62\u6210\u5019\u9009\u89C4\u5219\uFF1A");
    lines.push(`  teamagent ingest --from-pr ${prNumber} --dry-run`);
    return { output: lines.join("\n") + "\n", blocked: true };
  } catch (err) {
    lines.push(`\u2717 pr-cycle \u5931\u8D25: ${err instanceof Error ? err.message : String(err)}`);
    return { output: lines.join("\n") + "\n", blocked: true };
  }
}
function parsePrCycleArgs(argv) {
  const opts = { dryRun: false };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === "--pr" && argv[i + 1]) {
      opts.prNumber = parsePositiveInt(argv[++i], "--pr");
    } else if (a.startsWith("--pr=")) {
      opts.prNumber = parsePositiveInt(a.slice("--pr=".length), "--pr");
    } else if (a === "--no-create") {
      opts.noCreate = true;
    } else if (a === "--dry-run") {
      opts.dryRun = true;
    } else if (a === "--draft") {
      throw new Error("TeamBrain PRs must be normal PRs; --draft is not supported.");
    } else if (a === "--wait-ms" && argv[i + 1]) {
      opts.waitMs = parseNonNegativeInt(argv[++i], "--wait-ms");
    } else if (a.startsWith("--wait-ms=")) {
      opts.waitMs = parseNonNegativeInt(a.slice("--wait-ms=".length), "--wait-ms");
    } else if (a === "--wait-seconds" && argv[i + 1]) {
      opts.waitMs = parseNonNegativeInt(argv[++i], "--wait-seconds") * 1e3;
    } else if (a.startsWith("--wait-seconds=")) {
      opts.waitMs = parseNonNegativeInt(a.slice("--wait-seconds=".length), "--wait-seconds") * 1e3;
    } else if (a === "--title" && argv[i + 1]) {
      opts.title = argv[++i];
    } else if (a.startsWith("--title=")) {
      opts.title = a.slice("--title=".length);
    } else if (a === "--body" && argv[i + 1]) {
      opts.body = argv[++i];
    } else if (a.startsWith("--body=")) {
      opts.body = a.slice("--body=".length);
    } else if (a === "--body-file" && argv[i + 1]) {
      opts.bodyFile = argv[++i];
    } else if (a.startsWith("--body-file=")) {
      opts.bodyFile = a.slice("--body-file=".length);
    } else if (a === "--base" && argv[i + 1]) {
      opts.base = argv[++i];
    } else if (a.startsWith("--base=")) {
      opts.base = a.slice("--base=".length);
    } else if (a === "--head" && argv[i + 1]) {
      opts.head = argv[++i];
    } else if (a.startsWith("--head=")) {
      opts.head = a.slice("--head=".length);
    } else if (a === "--repo" && argv[i + 1]) {
      opts.repo = argv[++i];
    } else if (a.startsWith("--repo=")) {
      opts.repo = a.slice("--repo=".length);
    } else if (a === "--claudefast-bin" && argv[i + 1]) {
      opts.claudefastBin = argv[++i];
    } else if (a.startsWith("--claudefast-bin=")) {
      opts.claudefastBin = a.slice("--claudefast-bin=".length);
    } else if (a === "--codexfastg-bin" && argv[i + 1]) {
      opts.codexfastgBin = argv[++i];
    } else if (a.startsWith("--codexfastg-bin=")) {
      opts.codexfastgBin = a.slice("--codexfastg-bin=".length);
    }
  }
  return { ...opts, dryRun: opts.dryRun ?? false, pr: opts.prNumber };
}
function buildCreateCommand(opts) {
  const parts = ["gh", "pr", "create"];
  if (opts.repo) parts.push("--repo", opts.repo);
  if (opts.base) parts.push("--base", opts.base);
  if (opts.head) parts.push("--head", opts.head);
  if (opts.title) parts.push("--title", opts.title);
  if (opts.body) parts.push("--body", opts.body);
  if (opts.bodyFile) parts.push("--body-file", opts.bodyFile);
  if (!opts.title && !opts.body && !opts.bodyFile) parts.push("--fill");
  return shellJoin(parts);
}
function buildViewCommand(prNumber, opts) {
  const parts = ["gh", "pr", "view"];
  if (prNumber !== void 0) parts.push(String(prNumber));
  if (opts.repo) parts.push("--repo", opts.repo);
  parts.push("--json", "number,url,reviews");
  return shellJoin(parts);
}
function parsePrView(raw) {
  try {
    const parsed = JSON.parse(raw);
    return parsed && typeof parsed === "object" ? parsed : {};
  } catch {
    return {};
  }
}
function extractFirstUrl(raw) {
  return raw.match(/https?:\/\/\S+/)?.[0] ?? null;
}
function parsePositiveInt(raw, flag) {
  const n = parseInt(raw, 10);
  if (!Number.isFinite(n) || n <= 0) {
    throw new Error(`${flag} \u5FC5\u987B\u662F\u6B63\u6574\u6570\uFF0C\u6536\u5230: "${raw}"`);
  }
  return n;
}
function parseNonNegativeInt(raw, flag) {
  const n = parseInt(raw, 10);
  if (!Number.isFinite(n) || n < 0) {
    throw new Error(`${flag} \u5FC5\u987B\u662F\u975E\u8D1F\u6574\u6570\uFF0C\u6536\u5230: "${raw}"`);
  }
  return n;
}
function shellJoin(parts) {
  return parts.map(shellQuote).join(" ");
}
function shellQuote(value) {
  if (/^[A-Za-z0-9_./:=@+,-]+$/.test(value)) return value;
  return `'${value.replace(/'/g, "'\\''")}'`;
}
async function defaultRunner2(cmd, opts = {}) {
  return execSync7(cmd, {
    cwd: opts.cwd,
    encoding: "utf-8",
    stdio: ["ignore", "pipe", "pipe"],
    maxBuffer: 10 * 1024 * 1024,
    windowsHide: true
  });
}
function defaultSleep(ms) {
  return new Promise((resolve3) => setTimeout(resolve3, ms));
}

// ../cli/src/commands/pair.ts
init_esm_shims();
import fs21 from "fs";
import os17 from "os";
import path23 from "path";
import crypto from "crypto";
import { spawnSync as spawnSync2 } from "child_process";
function executePairCapsule(opts) {
  if (!opts.name.trim()) throw new Error("--name is required");
  if (!opts.host.trim()) throw new Error("--host is required");
  const homeDir = opts.homeDir ?? os17.homedir();
  const user = opts.user ?? os17.userInfo().username;
  const port = opts.port ?? 22;
  const createdAt = opts.now?.() ?? (/* @__PURE__ */ new Date()).toISOString();
  const ttlMinutes = opts.ttlMinutes ?? 30;
  const expiresAt = new Date(Date.parse(createdAt) + ttlMinutes * 6e4).toISOString();
  const nonce = opts.nonce ?? crypto.randomBytes(16).toString("hex");
  const publicKey = opts.publicKey ?? readDefaultPublicKey(homeDir, opts.publicKeyPath);
  const publicKeyFingerprint = fingerprintPublicKey(publicKey);
  const hostAlias = `teamagent-${slugify(opts.name)}`;
  const id = `tap_${sha256Hex([
    opts.name,
    opts.host,
    user,
    String(port),
    publicKeyFingerprint,
    nonce
  ].join("|")).slice(0, 16)}`;
  const capsule = {
    version: 1,
    kind: "teamagent.pair.capsule",
    peer: {
      id,
      name: opts.name,
      hostAlias,
      host: opts.host,
      user,
      port,
      publicKeyFingerprint
    },
    createdAt,
    expiresAt,
    nonce
  };
  const token = `tap1.${base64UrlEncode(JSON.stringify(capsule))}`;
  if (opts.out) {
    fs21.mkdirSync(path23.dirname(opts.out), { recursive: true });
    fs21.writeFileSync(opts.out, JSON.stringify({ capsule, token }, null, 2) + "\n");
  }
  return { capsule, token, ...opts.out ? { outPath: opts.out } : {} };
}
function executePairAccept(opts) {
  const homeDir = opts.homeDir ?? os17.homedir();
  const sshConfigPath = opts.sshConfigPath ?? path23.join(homeDir, ".ssh", "config");
  const now = opts.now?.() ?? (/* @__PURE__ */ new Date()).toISOString();
  const capsule = decodeCapsule(opts.capsule);
  ensureCapsuleFresh(capsule, now);
  const peer = {
    ...capsule.peer,
    acceptedAt: now,
    capsuleNonce: capsule.nonce,
    source: "capsule"
  };
  const pairDir = path23.join(homeDir, ".teamagent", "pairing");
  const receiptDir = path23.join(pairDir, "receipts");
  const peerBookPath = path23.join(pairDir, "peers.json");
  const receiptPath = path23.join(receiptDir, `${slugify(peer.name)}.json`);
  const changed = [];
  const currentBook = readPeerBook(peerBookPath);
  const nextBook = upsertPeer(currentBook, peer);
  const nextBookText = JSON.stringify(nextBook, null, 2) + "\n";
  const oldBookText = fs21.existsSync(peerBookPath) ? fs21.readFileSync(peerBookPath, "utf-8") : "";
  if (oldBookText !== nextBookText) changed.push(peerBookPath);
  const receipt = {
    version: 1,
    kind: "teamagent.pair.receipt",
    localName: opts.localName ?? os17.hostname(),
    acceptedAt: now,
    peer
  };
  const nextReceiptText = JSON.stringify(receipt, null, 2) + "\n";
  const oldReceiptText = fs21.existsSync(receiptPath) ? fs21.readFileSync(receiptPath, "utf-8") : "";
  if (oldReceiptText !== nextReceiptText) changed.push(receiptPath);
  const nextSshConfig = renderManagedSshConfig(
    fs21.existsSync(sshConfigPath) ? fs21.readFileSync(sshConfigPath, "utf-8") : "",
    peer
  );
  const oldSshConfig = fs21.existsSync(sshConfigPath) ? fs21.readFileSync(sshConfigPath, "utf-8") : "";
  if (oldSshConfig !== nextSshConfig) changed.push(sshConfigPath);
  if (!opts.dryRun) {
    fs21.mkdirSync(pairDir, { recursive: true });
    fs21.mkdirSync(receiptDir, { recursive: true });
    fs21.mkdirSync(path23.dirname(sshConfigPath), { recursive: true });
    fs21.writeFileSync(peerBookPath, nextBookText);
    fs21.writeFileSync(receiptPath, nextReceiptText);
    fs21.writeFileSync(sshConfigPath, nextSshConfig);
  }
  return {
    ok: true,
    peer,
    files: { peerBookPath, receiptPath, sshConfigPath },
    changed,
    dryRun: opts.dryRun ?? false
  };
}
function executePairKnock(opts) {
  const homeDir = opts.homeDir ?? os17.homedir();
  const sshConfigPath = opts.sshConfigPath ?? path23.join(homeDir, ".ssh", "config");
  const peerBook = readPeerBook(path23.join(homeDir, ".teamagent", "pairing", "peers.json"));
  const peer = peerBook.peers.find((p) => p.name === opts.peer || p.id === opts.peer || p.hostAlias === opts.peer);
  if (!peer) {
    return {
      ok: false,
      peer: opts.peer,
      command: [],
      stdout: "",
      stderr: `unknown peer: ${opts.peer}`,
      exitCode: 2
    };
  }
  const expected = `teamagent-pair-ok:${peer.id}`;
  const command = ["ssh", "-F", sshConfigPath, peer.hostAlias, "printf", "%s\\\\n", expected];
  if (opts.simulate) {
    return {
      ok: true,
      peer: peer.name,
      peerId: peer.id,
      hostAlias: peer.hostAlias,
      command,
      stdout: `${expected}
`,
      stderr: "",
      exitCode: 0
    };
  }
  const runner = opts.runner ?? defaultSshRunner;
  const result = runner(command.slice(1));
  const ok = result.exitCode === 0 && result.stdout.trim() === expected;
  return {
    ok,
    peer: peer.name,
    peerId: peer.id,
    hostAlias: peer.hostAlias,
    command,
    stdout: result.stdout,
    stderr: result.stderr,
    exitCode: result.exitCode
  };
}
function executePairList(opts = {}) {
  const homeDir = opts.homeDir ?? os17.homedir();
  return readPeerBook(path23.join(homeDir, ".teamagent", "pairing", "peers.json"));
}
function renderPairCapsuleResult(result) {
  const lines = [
    `\u63E1\u624B\u80F6\u56CA\u5DF2\u751F\u6210: ${result.capsule.peer.name} (${result.capsule.peer.hostAlias})`,
    `peer id: ${result.capsule.peer.id}`,
    `fingerprint: ${result.capsule.peer.publicKeyFingerprint}`,
    `expires: ${result.capsule.expiresAt}`
  ];
  if (result.outPath) lines.push(`\u6587\u4EF6: ${result.outPath}`);
  lines.push(`token: ${result.token}`);
  return lines.join("\n") + "\n";
}
function renderPairAcceptResult(result) {
  const changed = result.changed.length === 0 ? "\u65E0\u53D8\u5316" : `${result.changed.length} \u4E2A\u6587\u4EF6\u5DF2\u66F4\u65B0`;
  return [
    `\u5DF2\u63A5\u53D7 ${result.peer.name} \u7684\u63E1\u624B\u80F6\u56CA`,
    `host: ${result.peer.hostAlias} -> ${result.peer.user}@${result.peer.host}:${result.peer.port}`,
    `fingerprint: ${result.peer.publicKeyFingerprint}`,
    changed
  ].join("\n") + "\n";
}
function renderPairKnockResult(result) {
  if (result.ok) {
    return `SSH knock \u6210\u529F: ${result.peer} (${result.hostAlias})
${result.stdout}`;
  }
  return `SSH knock \u5931\u8D25: ${result.peer}
exit=${result.exitCode}
${result.stderr}`;
}
function renderPairList(book) {
  if (book.peers.length === 0) return "\u5C1A\u672A\u914D\u5BF9\u4EFB\u4F55 teammate\n";
  return book.peers.map((p) => `${p.name}	${p.hostAlias}	${p.user}@${p.host}:${p.port}	${p.publicKeyFingerprint}`).join("\n") + "\n";
}
function parsePairArgs(argv) {
  const sub = argv[0];
  if (!sub || !["capsule", "accept", "knock", "list"].includes(sub)) {
    throw new Error("Usage: teamagent pair <capsule|accept|knock|list> ...");
  }
  const rest = argv.slice(1);
  const flags = parseFlags(rest);
  if (sub === "capsule") {
    const now = stringFlag(flags, "now");
    return {
      subcommand: sub,
      options: {
        name: stringFlag(flags, "name", true),
        host: stringFlag(flags, "host", true),
        user: stringFlag(flags, "user"),
        port: numberFlag(flags, "port"),
        publicKey: stringFlag(flags, "public-key"),
        publicKeyPath: stringFlag(flags, "public-key-path"),
        homeDir: stringFlag(flags, "home-dir"),
        out: stringFlag(flags, "out"),
        ttlMinutes: numberFlag(flags, "ttl-minutes"),
        nonce: stringFlag(flags, "nonce"),
        ...now ? { now: () => now } : {}
      }
    };
  }
  if (sub === "accept") {
    const capsule = flags.positionals[0];
    if (!capsule) throw new Error("Usage: teamagent pair accept <capsule-file|token|json>");
    const now = stringFlag(flags, "now");
    return {
      subcommand: sub,
      options: {
        capsule,
        homeDir: stringFlag(flags, "home-dir"),
        sshConfigPath: stringFlag(flags, "ssh-config"),
        localName: stringFlag(flags, "local-name"),
        dryRun: booleanFlag(flags, "dry-run"),
        ...now ? { now: () => now } : {}
      }
    };
  }
  if (sub === "knock") {
    const peer = flags.positionals[0];
    if (!peer) throw new Error("Usage: teamagent pair knock <peer>");
    return {
      subcommand: sub,
      options: {
        peer,
        homeDir: stringFlag(flags, "home-dir"),
        sshConfigPath: stringFlag(flags, "ssh-config"),
        json: booleanFlag(flags, "json"),
        simulate: booleanFlag(flags, "simulate")
      }
    };
  }
  return {
    subcommand: sub,
    options: {
      homeDir: stringFlag(flags, "home-dir"),
      json: booleanFlag(flags, "json")
    }
  };
}
function defaultSshRunner(args) {
  const proc = spawnSync2("ssh", args, { encoding: "utf-8", timeout: 1e4 });
  return {
    exitCode: proc.status ?? 124,
    stdout: proc.stdout ?? "",
    stderr: proc.stderr ?? (proc.error ? String(proc.error) : "")
  };
}
function readDefaultPublicKey(homeDir, explicitPath) {
  const candidates = explicitPath ? [explicitPath] : ["id_ed25519.pub", "id_rsa.pub", "id_ecdsa.pub"].map((f) => path23.join(homeDir, ".ssh", f));
  for (const candidate of candidates) {
    if (fs21.existsSync(candidate)) {
      const text = fs21.readFileSync(candidate, "utf-8").trim();
      if (text) return text;
    }
  }
  throw new Error("No SSH public key found. Pass --public-key or --public-key-path.");
}
function fingerprintPublicKey(publicKey) {
  const parts = publicKey.trim().split(/\s+/);
  if (parts.length >= 2 && parts[1]) {
    try {
      const digest = crypto.createHash("sha256").update(Buffer.from(parts[1], "base64")).digest("base64");
      return `SHA256:${digest.replace(/=+$/, "")}`;
    } catch {
    }
  }
  return `SHA256:${crypto.createHash("sha256").update(publicKey).digest("base64").replace(/=+$/, "")}`;
}
function decodeCapsule(input) {
  let text = input.trim();
  if (fs21.existsSync(text)) {
    text = fs21.readFileSync(text, "utf-8").trim();
  }
  if (text.startsWith("tap1.")) {
    text = Buffer.from(text.slice("tap1.".length), "base64url").toString("utf-8");
  }
  const parsed = JSON.parse(text);
  const capsule = "capsule" in parsed && parsed.capsule ? parsed.capsule : parsed;
  if (capsule.version !== 1 || capsule.kind !== "teamagent.pair.capsule") {
    throw new Error("Invalid TeamAgent pairing capsule");
  }
  return capsule;
}
function ensureCapsuleFresh(capsule, now) {
  if (Date.parse(now) > Date.parse(capsule.expiresAt)) {
    throw new Error(`Pairing capsule expired at ${capsule.expiresAt}`);
  }
}
function readPeerBook(peerBookPath) {
  if (!fs21.existsSync(peerBookPath)) return { version: 1, peers: [] };
  const parsed = JSON.parse(fs21.readFileSync(peerBookPath, "utf-8"));
  if (parsed.version !== 1 || !Array.isArray(parsed.peers)) return { version: 1, peers: [] };
  return parsed;
}
function upsertPeer(book, peer) {
  const peers = book.peers.filter((p) => p.id !== peer.id && p.name !== peer.name && p.hostAlias !== peer.hostAlias);
  peers.push(peer);
  peers.sort((a, b) => a.name.localeCompare(b.name));
  return { version: 1, peers };
}
function renderManagedSshConfig(current, peer) {
  const start2 = `# >>> teamagent peer:${peer.id}`;
  const end = `# <<< teamagent peer:${peer.id}`;
  const block = [
    start2,
    `Host ${peer.hostAlias}`,
    `  HostName ${peer.host}`,
    `  User ${peer.user}`,
    `  Port ${peer.port}`,
    "  IdentitiesOnly yes",
    "  StrictHostKeyChecking accept-new",
    "  UserKnownHostsFile ~/.ssh/known_hosts",
    `  # TeamAgent-Peer-Fingerprint ${peer.publicKeyFingerprint}`,
    end
  ].join("\n");
  const re = new RegExp(`${escapeRegExp(start2)}[\\s\\S]*?${escapeRegExp(end)}\\n?`, "m");
  const trimmed = current.endsWith("\n") || current.length === 0 ? current : `${current}
`;
  if (re.test(trimmed)) return trimmed.replace(re, `${block}
`);
  return `${trimmed}${trimmed.length > 0 && !trimmed.endsWith("\n\n") ? "\n" : ""}${block}
`;
}
function parseFlags(argv) {
  const values = /* @__PURE__ */ new Map();
  const positionals = [];
  for (let i = 0; i < argv.length; i++) {
    const arg = argv[i];
    if (!arg.startsWith("--")) {
      positionals.push(arg);
      continue;
    }
    const eq = arg.indexOf("=");
    if (eq >= 0) {
      values.set(arg.slice(2, eq), arg.slice(eq + 1));
      continue;
    }
    const key = arg.slice(2);
    const next = argv[i + 1];
    if (next && !next.startsWith("--")) {
      values.set(key, next);
      i++;
    } else {
      values.set(key, true);
    }
  }
  return { positionals, values };
}
function stringFlag(flags, key, required) {
  const v = flags.values.get(key);
  if (v === true || v === void 0) {
    if (required) throw new Error(`--${key} is required`);
    return void 0;
  }
  return v;
}
function numberFlag(flags, key) {
  const raw = stringFlag(flags, key);
  if (raw === void 0) return void 0;
  const n = Number(raw);
  if (!Number.isFinite(n) || n <= 0) throw new Error(`--${key} must be a positive number`);
  return n;
}
function booleanFlag(flags, key) {
  return flags.values.get(key) === true;
}
function slugify(input) {
  const slug = input.toLowerCase().replace(/[^a-z0-9._-]+/g, "-").replace(/^-+|-+$/g, "");
  return slug || "peer";
}
function sha256Hex(input) {
  return crypto.createHash("sha256").update(input).digest("hex");
}
function base64UrlEncode(input) {
  return Buffer.from(input, "utf-8").toString("base64url");
}
function escapeRegExp(input) {
  return input.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

// ../cli/src/commands/recording.ts
init_esm_shims();
import fs22 from "fs";
import os18 from "os";
import path24 from "path";
import { createHash as createHash3 } from "crypto";
var DEFAULT_MAX_INJECTION_TOKENS = 800;
var SLOW_THRESHOLD_MS = 300;
var GOLDEN_MATERIALS = [
  {
    title: "Recording Memory import design review",
    source: "docs/specs/2026-04-29-recording-memory-performance-verification.md",
    transcript: "Alice: Recording Memory should turn existing meeting transcripts and summaries into agent-loadable memory. Bob: Import must preserve source references. Chen: Do not inject the full transcript by default; cite the source and include a short summary unless explicitly expanded.",
    uploadedBy: "teamagent",
    useWhen: "Questions about recording-memory import, source references, concise prompt injection, and transcript expansion.",
    summary: "Recording Memory import stores transcripts, summaries, and source references. Default prompt injection cites the source and stays concise.",
    visibility: "public"
  },
  {
    title: "Recording Memory dashboard and latency review",
    source: "docs/specs/2026-04-29-recording-memory-performance-verification.md#dashboard",
    transcript: "Alice: We need externally visible evidence, not SelfVerify. Bob: The dashboard has to show latency numbers and counts for slow or empty queries. Chen: It should update after recording-memory activity.",
    uploadedBy: "teamagent",
    useWhen: "Questions about dashboard metrics, latency, slow retrievals, empty retrievals, failures, and oversized injections.",
    summary: "The dashboard must surface latency, slow retrievals, empty retrievals, failed retrievals, oversized injections, and latest Recording Memory activity.",
    visibility: "public"
  },
  {
    title: "Recording Memory golden prompt benchmark",
    source: "docs/specs/2026-04-29-recording-memory-performance-verification.md#golden-prompt-benchmark",
    transcript: "Alice: We should use three real examples. Bob: Ten fixed prompts are enough for the first gate. Chen: Each row needs expected recording, actual recording, pass/fail, and injection token count. Dana: Full transcript should only appear with explicit expansion.",
    uploadedBy: "teamagent",
    useWhen: "Questions about golden prompt benchmark acceptance, ten prompts, three examples, pass rate, and token budget.",
    summary: "Golden benchmark uses three recording examples and ten fixed prompts. It passes at 8/10 correct retrievals with default injection under 800 tokens.",
    visibility: "public"
  }
];
var GOLDEN_PROMPTS = [
  { prompt: "What did we decide about importing recording transcripts?", expectedSource: "docs/specs/2026-04-29-recording-memory-performance-verification.md" },
  { prompt: "Where should recording memory cite source references?", expectedSource: "docs/specs/2026-04-29-recording-memory-performance-verification.md" },
  { prompt: "Should the full transcript be injected by default?", expectedSource: "docs/specs/2026-04-29-recording-memory-performance-verification.md" },
  { prompt: "How do we monitor slow recording-memory retrievals?", expectedSource: "docs/specs/2026-04-29-recording-memory-performance-verification.md#dashboard" },
  { prompt: "What dashboard counts are required for recording memory?", expectedSource: "docs/specs/2026-04-29-recording-memory-performance-verification.md#dashboard" },
  { prompt: "What evidence should show latency and empty retrievals?", expectedSource: "docs/specs/2026-04-29-recording-memory-performance-verification.md#dashboard" },
  { prompt: "How many golden prompts are used for acceptance?", expectedSource: "docs/specs/2026-04-29-recording-memory-performance-verification.md#golden-prompt-benchmark" },
  { prompt: "What is the default recording memory token budget?", expectedSource: "docs/specs/2026-04-29-recording-memory-performance-verification.md#golden-prompt-benchmark" },
  { prompt: "What pass rate does the golden benchmark require?", expectedSource: "docs/specs/2026-04-29-recording-memory-performance-verification.md#golden-prompt-benchmark" },
  { prompt: "When is a full recording transcript allowed in context?", expectedSource: "docs/specs/2026-04-29-recording-memory-performance-verification.md#golden-prompt-benchmark" }
];
function projectRoot(cwd) {
  return findTeamagentRoot2(cwd);
}
function projectKey(cwd) {
  return createHash3("sha256").update(path24.resolve(projectRoot(cwd))).digest("hex").slice(0, 20);
}
function legacyProjectKey(cwd) {
  return createHash3("sha256").update(path24.resolve(cwd)).digest("hex").slice(0, 20);
}
function publicStorePath(cwd) {
  return path24.join(projectRoot(cwd), ".teamagent", "recordings.json");
}
function privateStorePath(cwd, homeDir) {
  return path24.join(
    homeDir,
    ".teamagent",
    "recordings",
    `${projectKey(cwd)}.json`
  );
}
function legacyPrivateStorePath(cwd, homeDir) {
  return path24.join(
    homeDir,
    ".teamagent",
    "recordings",
    `${legacyProjectKey(cwd)}.json`
  );
}
function metricsPath(cwd) {
  return path24.join(projectRoot(cwd), ".teamagent", "recording-memory", "metrics.jsonl");
}
function readJsonl(filePath) {
  try {
    return fs22.readFileSync(filePath, "utf-8").split(/\r?\n/).filter((line) => line.trim().length > 0).map((line) => JSON.parse(line));
  } catch {
    return [];
  }
}
function appendJsonl(filePath, item) {
  fs22.mkdirSync(path24.dirname(filePath), { recursive: true });
  fs22.appendFileSync(filePath, JSON.stringify(item) + "\n", "utf-8");
}
function estimateRecordingTokens(text) {
  if (!text.trim()) return 0;
  return Math.max(1, Math.ceil(text.length / 4));
}
function appendMetric(cwd, now, metric) {
  const full = {
    ...metric,
    id: `rm-${now().getTime()}-${Math.random().toString(36).slice(2, 8)}`,
    timestamp: now().toISOString(),
    slow: metric.latencyMs > SLOW_THRESHOLD_MS,
    empty: metric.status === "empty",
    failed: metric.status === "failed",
    oversized: (metric.injectionTokens ?? 0) > DEFAULT_MAX_INJECTION_TOKENS
  };
  appendJsonl(metricsPath(cwd), full);
  return full;
}
function loadRecordingMetrics(cwd) {
  return readJsonl(metricsPath(cwd));
}
function summarizeRecordingMetrics(metrics) {
  const latencies = metrics.map((m) => m.latencyMs).sort((a, b) => a - b);
  const percentile = (p) => {
    if (latencies.length === 0) return 0;
    return latencies[Math.min(latencies.length - 1, Math.floor((latencies.length - 1) * p))] ?? 0;
  };
  return {
    total: metrics.length,
    imports: metrics.filter((m) => m.operation === "import").length,
    searches: metrics.filter((m) => m.operation === "search").length,
    injections: metrics.filter((m) => m.operation === "inject").length,
    benchmarks: metrics.filter((m) => m.operation === "benchmark").length,
    slow: metrics.filter((m) => m.slow).length,
    empty: metrics.filter((m) => m.empty).length,
    failed: metrics.filter((m) => m.failed).length,
    oversized: metrics.filter((m) => m.oversized).length,
    p50LatencyMs: percentile(0.5),
    p95LatencyMs: percentile(0.95),
    latest: metrics.slice(-5).reverse()
  };
}
function readStore(filePath) {
  try {
    const raw = fs22.readFileSync(filePath, "utf-8");
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}
function writeStore(filePath, records) {
  fs22.mkdirSync(path24.dirname(filePath), { recursive: true });
  fs22.writeFileSync(filePath, JSON.stringify(records, null, 2) + "\n", "utf-8");
}
function loadPrivateStoreWithMigration(cwd, homeDir) {
  const newPath = privateStorePath(cwd, homeDir);
  if (fs22.existsSync(newPath)) return readStore(newPath);
  const legacyPath = legacyPrivateStorePath(cwd, homeDir);
  if (legacyPath !== newPath && fs22.existsSync(legacyPath)) {
    const records = readStore(legacyPath);
    if (records.length > 0) writeStore(newPath, records);
    return records;
  }
  return [];
}
function stringField(value, name) {
  if (typeof value !== "string" || value.trim().length === 0) {
    throw new Error(`${name} must be a non-empty string`);
  }
  return value.trim();
}
function optionalString(value) {
  return typeof value === "string" && value.trim().length > 0 ? value.trim() : void 0;
}
function normalizeVisibility(value) {
  if (value === "public") return "public";
  if (value === void 0 || value === null || value === "private") return "private";
  throw new Error("visibility must be private or public");
}
function materialToRecord(input, opts) {
  const now = opts.now().toISOString();
  const source = stringField(
    input.source ?? input.sourceUrl ?? input.sourcePath,
    "source"
  );
  return {
    id: opts.idGen(),
    title: stringField(input.title, "title"),
    source,
    transcript: stringField(input.transcript, "transcript"),
    uploadedBy: stringField(input.uploadedBy ?? input.uploader, "uploadedBy"),
    useWhen: stringField(input.useWhen ?? input.usage, "useWhen"),
    summary: optionalString(input.summary) ?? stringField(input.transcript, "transcript").slice(0, 240),
    visibility: normalizeVisibility(input.visibility),
    createdAt: now,
    updatedAt: now
  };
}
function sanitizeRecord(record, expandTranscript = false) {
  const { transcript, ...rest } = record;
  return expandTranscript ? { ...rest, transcript } : rest;
}
function loadVisibleRecords(cwd, homeDir, visibility = "all") {
  const records = [];
  if (visibility === "all" || visibility === "public") {
    records.push(...readStore(publicStorePath(cwd)).filter((r) => r.visibility === "public"));
  }
  if (visibility === "all" || visibility === "private") {
    records.push(...loadPrivateStoreWithMigration(cwd, homeDir).filter((r) => r.visibility === "private"));
  }
  return records;
}
function tokenize(text) {
  return [...text.toLowerCase().matchAll(/[\p{L}\p{N}]+/gu)].map((m) => m[0]).filter((t) => t.length > 1);
}
function scoreRecord(query, record) {
  const terms = [...new Set(tokenize(query))];
  if (terms.length === 0) return { score: 0, why: "" };
  const fields = [
    ["title", 4, "title"],
    ["summary", 4, "summary"],
    ["useWhen", 3, "useWhen"],
    ["transcript", 1, "transcript"],
    ["uploadedBy", 1, "uploadedBy"]
  ];
  let score = 0;
  const matchedFields = /* @__PURE__ */ new Set();
  for (const term of terms) {
    for (const [field, weight, label] of fields) {
      const value = String(record[field] ?? "").toLowerCase();
      if (value.includes(term)) {
        score += weight;
        matchedFields.add(label);
      }
    }
  }
  const coverage = matchedFields.size > 0 ? terms.length / Math.max(terms.length, 1) : 0;
  return {
    score: score + coverage,
    why: matchedFields.size > 0 ? `matched ${[...matchedFields].join(", ")}` : ""
  };
}
function searchRecords(query, records, limit, expandTranscript = false) {
  return records.map((record) => {
    const scored = scoreRecord(query, record);
    return {
      record: sanitizeRecord(record, expandTranscript),
      score: scored.score,
      whyRelevant: scored.why
    };
  }).filter((r) => r.score > 0).sort((a, b) => b.score - a.score || a.record.createdAt.localeCompare(b.record.createdAt)).slice(0, limit);
}
function parseRecordingArgs(argv) {
  if (argv.length === 0 || argv.includes("--help") || argv.includes("-h")) {
    return { action: "help" };
  }
  const [actionRaw, ...rest] = argv;
  if (actionRaw !== "import" && actionRaw !== "search" && actionRaw !== "show" && actionRaw !== "inject" && actionRaw !== "metrics" && actionRaw !== "benchmark") {
    throw new Error("recording action must be import, search, show, inject, metrics, benchmark, or --help");
  }
  const opts = { action: actionRaw };
  for (let i = 0; i < rest.length; i++) {
    const a = rest[i];
    if (a === "--file" && rest[i + 1]) opts.filePath = rest[++i];
    else if (a === "--query" && rest[i + 1]) opts.query = rest[++i];
    else if (a === "--id" && rest[i + 1]) opts.id = rest[++i];
    else if (a === "--transcript") opts.expandTranscript = true;
    else if (a === "--full") opts.expandTranscript = true;
    else if (a === "--json") opts.json = true;
    else if (a.startsWith("--report=")) opts.reportPath = a.slice("--report=".length);
    else if (a.startsWith("--visibility=")) {
      const raw = a.slice("--visibility=".length);
      if (raw !== "all" && raw !== "private" && raw !== "public") {
        throw new Error("--visibility must be all, private, or public");
      }
      opts.visibility = raw;
    } else if (a.startsWith("--limit=")) {
      const n = Number(a.slice("--limit=".length));
      if (!Number.isInteger(n) || n <= 0) throw new Error("--limit must be a positive integer");
      opts.limit = n;
    } else if (opts.action === "show" && !opts.id && !a.startsWith("--")) {
      opts.id = a;
    } else if ((opts.action === "inject" || opts.action === "search") && !opts.query && !a.startsWith("--")) {
      opts.query = a;
    }
  }
  if (opts.action === "import" && !opts.filePath) {
    throw new Error("recording import requires --file <path>");
  }
  if (opts.action === "search" && !opts.query) {
    throw new Error("recording search requires --query <text>");
  }
  if (opts.action === "inject" && !opts.query) {
    throw new Error("recording inject requires --query <text> or a query argument");
  }
  if (opts.action === "show" && !opts.id) {
    throw new Error("recording show requires <id> or --id <id>");
  }
  return opts;
}
async function executeRecording(opts) {
  const cwd = opts.cwd ?? process.cwd();
  const homeDir = opts.homeDir ?? os18.homedir();
  const now = opts.now ?? (() => /* @__PURE__ */ new Date());
  const idGen = opts.idGen ?? (() => `rec-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`);
  if (opts.action === "help") {
    return {
      kind: "help",
      command: "teamagent recording",
      subcommands: [
        {
          name: "import",
          usage: "teamagent recording import --file <material.json>",
          output: "imports transcript-first recording material"
        },
        {
          name: "search",
          usage: "teamagent recording search --query <text> [--visibility=all|private|public]",
          output: "returns source-backed recording memory hits without full transcript"
        },
        {
          name: "show",
          usage: "teamagent recording show <id> [--transcript]",
          output: "shows metadata by default; --transcript expands full transcript"
        },
        {
          name: "inject",
          usage: "teamagent recording inject --query <text> [--full]",
          output: "returns source-cited prompt context without full transcript by default"
        },
        {
          name: "metrics",
          usage: "teamagent recording metrics [--json]",
          output: "summarizes import/search/injection latency and retrieval health"
        },
        {
          name: "benchmark",
          usage: "teamagent recording benchmark [--report=<path>] [--json]",
          output: "runs 3-recording/10-prompt golden retrieval benchmark"
        }
      ]
    };
  }
  if (opts.action === "import") {
    const started = Date.now();
    const raw = fs22.readFileSync(opts.filePath, "utf-8");
    const record2 = materialToRecord(JSON.parse(raw), {
      now,
      idGen
    });
    const storePath = record2.visibility === "public" ? publicStorePath(cwd) : privateStorePath(cwd, homeDir);
    const records2 = record2.visibility === "private" ? loadPrivateStoreWithMigration(cwd, homeDir) : readStore(storePath);
    const duplicate = records2.find((r) => r.source === record2.source);
    if (duplicate) {
      appendMetric(cwd, now, {
        operation: "import",
        status: "ok",
        latencyMs: Date.now() - started,
        recordingId: duplicate.id,
        sourceReference: duplicate.source,
        fullTranscriptIncluded: false
      });
      return {
        kind: "import",
        status: "duplicate",
        record: sanitizeRecord(duplicate),
        storage: duplicate.visibility
      };
    }
    records2.push(record2);
    writeStore(storePath, records2);
    appendMetric(cwd, now, {
      operation: "import",
      status: "ok",
      latencyMs: Date.now() - started,
      recordingId: record2.id,
      sourceReference: record2.source,
      fullTranscriptIncluded: false
    });
    return {
      kind: "import",
      status: "created",
      record: sanitizeRecord(record2),
      storage: record2.visibility
    };
  }
  if (opts.action === "search") {
    const started = Date.now();
    const records2 = loadVisibleRecords(cwd, homeDir, opts.visibility ?? "all");
    const results = searchRecords(opts.query, records2, opts.limit ?? 5);
    appendMetric(cwd, now, {
      operation: "search",
      status: results.length > 0 ? "ok" : "empty",
      latencyMs: Date.now() - started,
      query: opts.query,
      recordingId: results[0]?.record.id,
      score: results[0]?.score,
      sourceReference: results[0]?.record.source,
      fullTranscriptIncluded: false
    });
    return {
      kind: "search",
      query: opts.query,
      results
    };
  }
  if (opts.action === "inject") {
    const started = Date.now();
    const records2 = loadVisibleRecords(cwd, homeDir, opts.visibility ?? "all");
    const results = searchRecords(opts.query, records2, opts.limit ?? 3, Boolean(opts.expandTranscript));
    const text = formatRecordingMemoryInjection(results, opts.expandTranscript);
    const tokenCount = estimateRecordingTokens(text);
    appendMetric(cwd, now, {
      operation: "inject",
      status: results.length > 0 ? "ok" : "empty",
      latencyMs: Date.now() - started,
      query: opts.query,
      recordingId: results[0]?.record.id,
      score: results[0]?.score,
      sourceReference: results[0]?.record.source,
      injectionTokens: tokenCount,
      fullTranscriptIncluded: Boolean(opts.expandTranscript)
    });
    return {
      kind: "inject",
      text,
      match: results[0],
      tokenCount,
      fullTranscriptIncluded: Boolean(opts.expandTranscript)
    };
  }
  if (opts.action === "metrics") {
    return {
      kind: "metrics",
      summary: summarizeRecordingMetrics(loadRecordingMetrics(cwd))
    };
  }
  if (opts.action === "benchmark") {
    return await runRecordingBenchmark({ cwd, homeDir, now, reportPath: opts.reportPath });
  }
  const records = loadVisibleRecords(cwd, homeDir, "all");
  const record = records.find((r) => r.id === opts.id);
  return {
    kind: "show",
    record: record ? sanitizeRecord(record, opts.expandTranscript) : void 0
  };
}
function formatRecordingMemoryInjection(matches, includeTranscript = false) {
  if (matches.length === 0) return "";
  const lines = ["\u25C8 TeamAgent Recording Memory \u76F8\u5173\u5F55\u97F3"];
  for (const match of matches) {
    const r = match.record;
    lines.push(
      `- ${r.title} (${r.visibility})`,
      `  \u6458\u8981: ${r.summary.slice(0, 220)}`,
      `  \u6765\u6E90: ${r.source}`,
      `  \u4E0A\u4F20\u4EBA: ${r.uploadedBy}`,
      `  \u9002\u7528\u573A\u666F: ${r.useWhen.slice(0, 180)}`,
      `  \u4E3A\u4EC0\u4E48\u76F8\u5173: ${match.whyRelevant}`,
      includeTranscript && r.transcript ? `  Transcript: ${r.transcript}` : `  \u5C55\u5F00: teamagent recording show ${r.id} --transcript`
    );
  }
  const text = lines.join("\n");
  if (includeTranscript || estimateRecordingTokens(text) <= DEFAULT_MAX_INJECTION_TOKENS) {
    return text;
  }
  return `${text.slice(0, DEFAULT_MAX_INJECTION_TOKENS * 4 - 64).trimEnd()}
[trimmed to ${DEFAULT_MAX_INJECTION_TOKENS} token budget]`;
}
function renderRecordingResult(result) {
  return JSON.stringify(result, null, 2) + "\n";
}
function renderBenchmarkReport(result) {
  const lines = [
    "# Recording Memory Golden Prompt Benchmark",
    "",
    "## Recording Examples",
    "",
    ...GOLDEN_MATERIALS.map((m) => `- ${String(m.title)} (${String(m.source)})`),
    "",
    "## Results",
    "",
    "| # | Prompt | Expected Recording | Actual Recording | Pass | Injection Tokens |",
    "|---|---|---|---|---|---|",
    ...result.rows.map(
      (row, i) => `| ${i + 1} | ${row.prompt.replace(/\|/g, "\\|")} | ${row.expectedId} | ${row.actualId || "(empty)"} | ${row.pass ? "PASS" : "FAIL"} | ${row.injectionTokens} |`
    ),
    "",
    `Pass rate: ${result.passCount}/${result.total}`,
    `Acceptance: ${result.ok ? "PASS" : "FAIL"}`,
    `Default injection budget: ${DEFAULT_MAX_INJECTION_TOKENS} tokens`,
    "Full transcript appears only after explicit expansion with `teamagent recording show <id> --transcript` or `teamagent recording inject --full`.",
    ""
  ];
  return lines.join("\n");
}
async function runRecordingBenchmark(args) {
  const started = Date.now();
  const tmpRoot = fs22.mkdtempSync(path24.join(os18.tmpdir(), "teamagent-recording-bench-"));
  const tmpHome = fs22.mkdtempSync(path24.join(os18.tmpdir(), "teamagent-recording-home-"));
  const idsBySource = /* @__PURE__ */ new Map();
  for (const [index, material] of GOLDEN_MATERIALS.entries()) {
    const filePath = path24.join(tmpRoot, `recording-${index}.json`);
    fs22.writeFileSync(filePath, JSON.stringify(material, null, 2), "utf-8");
    const imported = await executeRecording({
      action: "import",
      filePath,
      cwd: tmpRoot,
      homeDir: tmpHome,
      now: args.now,
      idGen: () => `golden-${index + 1}`
    });
    if (imported.kind === "import") idsBySource.set(imported.record.source, imported.record.id);
  }
  const evaluatedRows = [];
  for (const item of GOLDEN_PROMPTS) {
    const expectedId = idsBySource.get(item.expectedSource) ?? "";
    const injected = await executeRecording({
      action: "inject",
      query: item.prompt,
      cwd: tmpRoot,
      homeDir: tmpHome,
      now: args.now
    });
    const actualId = injected.kind === "inject" ? injected.match?.record.id ?? "" : "";
    const injectionTokens = injected.kind === "inject" ? injected.tokenCount : 0;
    evaluatedRows.push({
      prompt: item.prompt,
      expectedId,
      actualId,
      pass: actualId === expectedId && injectionTokens <= DEFAULT_MAX_INJECTION_TOKENS,
      injectionTokens
    });
  }
  const passCount = evaluatedRows.filter((r) => r.pass).length;
  const result = {
    kind: "benchmark",
    ok: passCount >= 8,
    passCount,
    total: evaluatedRows.length,
    reportPath: args.reportPath ?? path24.join(args.cwd, "docs", "verification", "recording-memory-golden-benchmark.md"),
    rows: evaluatedRows
  };
  fs22.mkdirSync(path24.dirname(result.reportPath), { recursive: true });
  fs22.writeFileSync(result.reportPath, renderBenchmarkReport(result), "utf-8");
  appendMetric(args.cwd, args.now, {
    operation: "benchmark",
    status: result.ok ? "ok" : "failed",
    latencyMs: Date.now() - started,
    injectionTokens: Math.max(...evaluatedRows.map((r) => r.injectionTokens)),
    fullTranscriptIncluded: false,
    error: result.ok ? void 0 : `passCount=${passCount}`
  });
  return result;
}

// ../cli/src/commands/digital-twin.ts
init_esm_shims();
import { homedir as osHomedir6 } from "os";
import { existsSync as existsSync10, mkdirSync as mkdirSync9, readdirSync as readdirSync3, writeFileSync as writeFileSync8 } from "fs";
import { dirname as dirname8 } from "path";
import { ulid as defaultUlid3 } from "ulid";

// ../digital-twin/src/index.ts
init_esm_shims();

// ../digital-twin/src/paths.ts
init_esm_shims();
import { homedir as homedir3 } from "os";
import { join as join5 } from "path";
function digitalTwinPaths(home = homedir3()) {
  const teamagentDir = join5(home, ".teamagent");
  const digitalTwinDir = join5(teamagentDir, "digital-twin");
  const queueDir = join5(digitalTwinDir, "queue");
  return {
    teamagentDir,
    digitalTwinDir,
    configFile: join5(teamagentDir, "digital-twin.json"),
    machineIdFile: join5(digitalTwinDir, "machine-id"),
    queueDir,
    pendingDir: join5(queueDir, "pending"),
    deadLetterDir: join5(queueDir, "dead-letter"),
    recordingTempDir: join5(queueDir, "recording_temp"),
    daemonPidFile: join5(digitalTwinDir, "daemon.pid"),
    lastHourlyScanFile: join5(digitalTwinDir, "last-hourly-scan.txt"),
    quotaCacheFile: join5(digitalTwinDir, "quota-cache.json")
  };
}
var DEFAULT_PATHS = digitalTwinPaths();

// ../digital-twin/src/limits.ts
init_esm_shims();
var MAX_PAYLOAD_BYTES = 100 * 1024 * 1024;

// ../digital-twin/src/identity.ts
init_esm_shims();
import { execSync as execSync8 } from "child_process";
import { existsSync as existsSync3, readFileSync, writeFileSync, mkdirSync as mkdirSync2, chmodSync } from "fs";
import { hostname, userInfo } from "os";
import { dirname as dirname4 } from "path";
import { ulid } from "ulid";
function getUserId() {
  try {
    const email = execSync8("git config user.email", {
      encoding: "utf8",
      stdio: ["ignore", "pipe", "ignore"]
    }).trim();
    if (email) return email;
  } catch {
  }
  return `${userInfo().username}@${hostname()}`;
}
function getMachineId(machineIdFile = DEFAULT_PATHS.machineIdFile) {
  if (existsSync3(machineIdFile)) {
    const cached = readFileSync(machineIdFile, "utf8").trim();
    if (cached) return cached;
  }
  const id = `${hostname()}-${ulid().slice(-8).toLowerCase()}`;
  mkdirSync2(dirname4(machineIdFile), { recursive: true });
  writeFileSync(machineIdFile, id, { encoding: "utf8" });
  try {
    chmodSync(machineIdFile, 384);
  } catch {
  }
  return id;
}

// ../digital-twin/src/config.ts
init_esm_shims();
import {
  existsSync as existsSync4,
  readFileSync as readFileSync2,
  writeFileSync as writeFileSync2,
  mkdirSync as mkdirSync3,
  chmodSync as chmodSync2,
  renameSync,
  unlinkSync
} from "fs";
import { dirname as dirname5 } from "path";
var DEFAULT_ENDPOINT = "http://192.168.22.88:8080";
function defaultConfig(input) {
  return {
    schema_version: "1",
    identity: {
      user_id: input.user_id,
      machine_id: input.machine_id
    },
    uploader: {
      enabled: true,
      endpoint: input.endpoint ?? DEFAULT_ENDPOINT,
      token: null
    },
    consented_at: input.consented_at ?? (/* @__PURE__ */ new Date()).toISOString()
  };
}
function loadConfig(file = DEFAULT_PATHS.configFile) {
  if (!existsSync4(file)) return null;
  try {
    const raw = readFileSync2(file, "utf8");
    return JSON.parse(raw);
  } catch {
    return null;
  }
}
function saveConfig(config, file = DEFAULT_PATHS.configFile) {
  mkdirSync3(dirname5(file), { recursive: true });
  const tmp = `${file}.tmp-${process.pid}-${Date.now()}`;
  writeFileSync2(tmp, JSON.stringify(config, null, 2), { encoding: "utf8" });
  try {
    chmodSync2(tmp, 384);
  } catch {
  }
  try {
    renameSync(tmp, file);
  } catch {
    try {
      unlinkSync(file);
    } catch {
    }
    renameSync(tmp, file);
  }
  try {
    chmodSync2(file, 384);
  } catch {
  }
}
function isEnabled(config) {
  if (!config) return false;
  if (!config.uploader.enabled) return false;
  if (!config.uploader.token) return false;
  return true;
}

// ../digital-twin/src/mock-server.ts
init_esm_shims();
import {
  createServer
} from "http";
import { gunzipSync } from "zlib";
import {
  writeFileSync as writeFileSync3,
  renameSync as renameSync2,
  unlinkSync as unlinkSync2,
  mkdirSync as mkdirSync4,
  readdirSync,
  statSync,
  existsSync as existsSync5,
  readFileSync as readFileSync3
} from "fs";
import { randomUUID } from "crypto";
import { join as join6, resolve as resolvePath, sep } from "path";

// ../digital-twin/src/dashboard-html.ts
init_esm_shims();
var DASHBOARD_HTML = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width,initial-scale=1" />
<title>TeamAgent Collector</title>
<style>
* { box-sizing: border-box; }
body { margin: 0; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; background: #f6f7f9; color: #222; }
header { display: flex; align-items: center; gap: 12px; padding: 10px 16px; background: #1f2937; color: #fff; border-bottom: 1px solid #111; }
header h1 { font-size: 16px; margin: 0; font-weight: 600; }
header .ts { color: #9ca3af; font-size: 12px; margin-left: auto; }
header button { background: #2563eb; color: #fff; border: 0; border-radius: 4px; padding: 6px 12px; font-size: 13px; cursor: pointer; }
header button:hover { background: #1d4ed8; }
.grid { display: grid; grid-template-columns: 1fr 1fr 1.5fr; gap: 8px; padding: 8px; height: 38vh; }
.panel { background: #fff; border: 1px solid #e5e7eb; border-radius: 4px; display: flex; flex-direction: column; min-height: 0; }
.panel h2 { margin: 0; padding: 8px 10px; font-size: 12px; font-weight: 600; color: #6b7280; text-transform: uppercase; letter-spacing: 0.5px; border-bottom: 1px solid #e5e7eb; }
.panel ul { list-style: none; padding: 0; margin: 0; overflow-y: auto; flex: 1; }
.panel li { padding: 6px 10px; cursor: pointer; font-size: 13px; border-bottom: 1px solid #f3f4f6; }
.panel li:hover { background: #f9fafb; }
.panel li.sel { background: #dbeafe; color: #1e3a8a; font-weight: 500; }
.panel li .meta { color: #9ca3af; font-size: 11px; margin-left: 8px; }
.preview { margin: 0 8px 8px; background: #fff; border: 1px solid #e5e7eb; border-radius: 4px; padding: 10px; min-height: 30vh; max-height: 50vh; overflow: auto; }
.preview h2 { margin: 0 0 8px; font-size: 13px; color: #6b7280; }
.preview pre { margin: 0; font-family: ui-monospace, "SF Mono", Menlo, monospace; font-size: 12px; line-height: 1.5; white-space: pre-wrap; word-break: break-word; }
.preview .ev { padding: 4px 6px; border-bottom: 1px solid #f3f4f6; }
.preview .ev .k { color: #7c3aed; }
.preview .ev .s { color: #059669; }
.preview .ev .n { color: #dc2626; }
.preview audio { width: 100%; }
.empty { color: #9ca3af; font-size: 13px; padding: 8px; }
.err { color: #dc2626; font-size: 12px; padding: 8px; }
.user-row { display: flex; align-items: center; gap: 6px; }
.user-row .uname { flex: 1; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.user-row .qslot { display: inline-flex; align-items: center; gap: 4px; }
.qbar { display: inline-block; width: 60px; height: 8px; background: #e5e7eb; border-radius: 3px; overflow: hidden; vertical-align: middle; }
.qbar > span { display: block; height: 100%; width: 0%; background: #9ca3af; transition: width 0.2s ease; }
.qbar.ok > span { background: #10b981; }
.qbar.warn > span { background: #f59e0b; }
.qbar.hot > span { background: #ef4444; }
.qbar.stale { border: 1px dashed #9ca3af; opacity: 0.5; }
.qbadge { font-family: ui-monospace, "SF Mono", Menlo, monospace; font-size: 10px; color: #6b7280; min-width: 30px; text-align: right; }
</style>
</head>
<body>
<header>
  <h1>TeamAgent Collector</h1>
  <span class="ts" id="ts"></span>
  <button id="refresh">Refresh</button>
</header>
<div class="grid">
  <div class="panel"><h2>Users</h2><ul id="users"><li class="empty">loading...</li></ul></div>
  <div class="panel"><h2>Dates</h2><ul id="dates"><li class="empty">select a user</li></ul></div>
  <div class="panel"><h2>Sessions</h2><ul id="sessions"><li class="empty">select a date</li></ul></div>
</div>
<div class="preview">
  <h2 id="ph">Preview</h2>
  <div id="pv"><div class="empty">select a session</div></div>
</div>
<script>
(function () {
  var sel = { user: null, date: null, sid: null, sext: null };
  var $ = function (id) { return document.getElementById(id); };
  function setTs() {
    var d = new Date();
    $('ts').textContent = 'last refreshed ' + d.toLocaleTimeString();
  }
  function escHtml(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }
  function render(ulId, items, fn) {
    var ul = $(ulId);
    ul.innerHTML = '';
    if (!items || items.length === 0) {
      var li = document.createElement('li');
      li.className = 'empty';
      li.textContent = '(empty)';
      ul.appendChild(li);
      return;
    }
    items.forEach(function (it) {
      var li = document.createElement('li');
      fn(li, it);
      ul.appendChild(li);
    });
  }
  function showErr(ulId, msg) {
    var ul = $(ulId);
    ul.innerHTML = '<li class="err">' + escHtml(msg) + '</li>';
  }
  function quotaBucket(util) {
    if (typeof util !== 'number' || !isFinite(util) || util < 0) return 'ok';
    if (util >= 0.8) return 'hot';
    if (util >= 0.5) return 'warn';
    return 'ok';
  }
  function todayUtc() {
    return new Date().toISOString().slice(0, 10);
  }
  function quotaSlotHtml(util, stale) {
    var bucket = quotaBucket(util);
    var pct = Math.max(0, Math.min(1, util)) * 100;
    var pctText = Math.round(pct) + '%';
    var staleCls = stale ? ' stale' : '';
    return '<span class="qslot">'
      + '<span class="qbar ' + bucket + staleCls + '"><span style="width:' + pct.toFixed(1) + '%"></span></span>'
      + '<span class="qbadge">' + pctText + '</span>'
      + '</span>';
  }
  function quotaPendingHtml() {
    return '<span class="qslot">'
      + '<span class="qbar"><span></span></span>'
      + '<span class="qbadge">\u2014</span>'
      + '</span>';
  }
  function fetchQuotaFor(u, li) {
    var url = '/api/quota?user=' + encodeURIComponent(u) + '&date=' + encodeURIComponent(todayUtc());
    fetch(url).then(function (r) {
      if (!r.ok) return null;
      return r.json();
    }).then(function (q) {
      if (!q || !li) return;
      var slots = li.querySelectorAll('.qslot');
      if (slots.length < 2) return;
      var stale = !!q.stale;
      var h5 = quotaSlotHtml(Number(q.five_hour_utilization) || 0, stale);
      var h7 = quotaSlotHtml(Number(q.seven_day_utilization) || 0, stale);
      slots[0].outerHTML = h5;
      slots[1].outerHTML = h7;
    }).catch(function () { /* keep \u2014 placeholder */ });
  }
  function loadUsers() {
    sel.user = sel.date = sel.sid = sel.sext = null;
    $('dates').innerHTML = '<li class="empty">select a user</li>';
    $('sessions').innerHTML = '<li class="empty">select a date</li>';
    $('pv').innerHTML = '<div class="empty">select a session</div>';
    $('ph').textContent = 'Preview';
    fetch('/api/users').then(function (r) { return r.json(); }).then(function (d) {
      var liByUser = {};
      render('users', d.users, function (li, u) {
        li.innerHTML = '<div class="user-row">'
          + '<span class="uname">' + escHtml(u) + '</span>'
          + quotaPendingHtml()
          + quotaPendingHtml()
          + '</div>';
        li.onclick = function () { selectUser(u, li); };
        liByUser[u] = li;
      });
      setTs();
      if (d.users && d.users.length) {
        d.users.forEach(function (u) {
          fetchQuotaFor(u, liByUser[u]);
        });
      }
    }).catch(function (e) { showErr('users', 'failed: ' + e.message); });
  }
  function selectUser(u, li) {
    sel.user = u; sel.date = sel.sid = sel.sext = null;
    Array.prototype.forEach.call($('users').querySelectorAll('li'), function (x) { x.classList.remove('sel'); });
    if (li) li.classList.add('sel');
    $('sessions').innerHTML = '<li class="empty">select a date</li>';
    $('pv').innerHTML = '<div class="empty">select a session</div>';
    $('dates').innerHTML = '<li class="empty">loading...</li>';
    fetch('/api/dates?user=' + encodeURIComponent(u)).then(function (r) { return r.json(); }).then(function (d) {
      render('dates', d.dates, function (li2, dt) {
        li2.textContent = dt;
        li2.onclick = function () { selectDate(dt, li2); };
      });
    }).catch(function (e) { showErr('dates', 'failed: ' + e.message); });
  }
  function selectDate(dt, li) {
    sel.date = dt; sel.sid = sel.sext = null;
    Array.prototype.forEach.call($('dates').querySelectorAll('li'), function (x) { x.classList.remove('sel'); });
    if (li) li.classList.add('sel');
    $('pv').innerHTML = '<div class="empty">select a session</div>';
    $('sessions').innerHTML = '<li class="empty">loading...</li>';
    var url = '/api/sessions?user=' + encodeURIComponent(sel.user) + '&date=' + encodeURIComponent(dt);
    fetch(url).then(function (r) { return r.json(); }).then(function (d) {
      render('sessions', d.sessions, function (li2, s) {
        var size = s.size < 1024 ? s.size + ' B' : (s.size / 1024).toFixed(1) + ' KB';
        li2.innerHTML = '<span>' + escHtml(s.id) + '.' + escHtml(s.ext) + '</span><span class="meta">' + size + '</span>';
        li2.onclick = function () { selectSession(s, li2); };
      });
    }).catch(function (e) { showErr('sessions', 'failed: ' + e.message); });
  }
  function selectSession(s, li) {
    sel.sid = s.id; sel.sext = s.ext;
    Array.prototype.forEach.call($('sessions').querySelectorAll('li'), function (x) { x.classList.remove('sel'); });
    if (li) li.classList.add('sel');
    var url = '/api/file?user=' + encodeURIComponent(sel.user) + '&date=' + encodeURIComponent(sel.date) + '&id=' + encodeURIComponent(s.id) + '&ext=' + encodeURIComponent(s.ext);
    $('ph').textContent = s.id + '.' + s.ext;
    if (s.ext === 'ogg') {
      $('pv').innerHTML = '<audio controls preload="metadata" src="' + escHtml(url) + '"></audio>';
      return;
    }
    $('pv').innerHTML = '<div class="empty">loading...</div>';
    fetch(url).then(function (r) { return r.text(); }).then(function (t) {
      renderJsonl(t);
    }).catch(function (e) { $('pv').innerHTML = '<div class="err">failed: ' + escHtml(e.message) + '</div>'; });
  }
  function renderJsonl(text) {
    var lines = text.split(/\\r?\\n/);
    var html = '';
    var count = 0;
    for (var i = 0; i < lines.length; i++) {
      var line = lines[i];
      if (!line.trim()) continue;
      count++;
      try {
        var obj = JSON.parse(line);
        html += '<div class="ev"><pre>' + colorize(JSON.stringify(obj, null, 2)) + '</pre></div>';
      } catch (e) {
        html += '<div class="ev"><pre>' + escHtml(line) + '</pre></div>';
      }
      if (count >= 500) {
        html += '<div class="empty">(truncated at 500 events)</div>';
        break;
      }
    }
    if (count === 0) html = '<div class="empty">(empty)</div>';
    $('pv').innerHTML = html;
  }
  function colorize(s) {
    var esc = escHtml(s);
    esc = esc.replace(/(&quot;[^&]*?&quot;)(\\s*:)/g, '<span class="k">$1</span>$2');
    esc = esc.replace(/:\\s*(&quot;[^&]*?&quot;)/g, function (m, p) { return ': <span class="s">' + p + '</span>'; });
    esc = esc.replace(/:\\s*(-?\\d+(?:\\.\\d+)?)/g, ': <span class="n">$1</span>');
    return esc;
  }
  $('refresh').onclick = loadUsers;
  loadUsers();
})();
</script>
</body>
</html>`;

// ../digital-twin/src/mock-server.ts
var MAX_BODY_BYTES = 32 * 1024 * 1024;
var MAX_DECOMPRESSED_BYTES = 256 * 1024 * 1024;
var ROUTE_CC_SESSIONS = "/v1/cc-sessions";
var ROUTE_RECORDINGS = "/v1/recordings";
var DATE_RE = /^\d{4}-\d{2}-\d{2}$/;
var ID_RE = /^[A-Za-z0-9._-]+$/;
function send(res, status, body) {
  res.statusCode = status;
  if (body !== void 0) {
    res.setHeader("content-type", "application/json");
    res.end(JSON.stringify(body));
  } else {
    res.end();
  }
}
function safeUserId(raw) {
  if (typeof raw !== "string" || raw.length === 0) return "unknown";
  let cleaned = raw.replace(/[^a-zA-Z0-9._@+-]/g, "_").slice(0, 80);
  cleaned = cleaned.replace(/\.{2,}/g, "_");
  cleaned = cleaned.replace(/^[._-]+/, "").replace(/[._-]+$/, "");
  return cleaned.length > 0 ? cleaned : "unknown";
}
function dateStamp(raw, now) {
  let d = now;
  if (typeof raw === "string" && raw.length > 0) {
    const parsed = new Date(raw);
    if (!Number.isNaN(parsed.getTime())) d = parsed;
  }
  const yyyy = d.getUTCFullYear().toString().padStart(4, "0");
  const mm = (d.getUTCMonth() + 1).toString().padStart(2, "0");
  const dd = d.getUTCDate().toString().padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
}
function validateUserParam(raw) {
  if (typeof raw !== "string" || raw.length === 0) return null;
  if (raw.includes("/") || raw.includes("\\") || raw.includes("..")) return null;
  if (safeUserId(raw) !== raw) return null;
  return raw;
}
function validateDateParam(raw) {
  if (typeof raw !== "string") return null;
  if (!DATE_RE.test(raw)) return null;
  const parts = raw.split("-");
  const yyyy = Number(parts[0]);
  const mm = Number(parts[1]);
  const dd = Number(parts[2]);
  if (!Number.isFinite(yyyy) || !Number.isFinite(mm) || !Number.isFinite(dd)) {
    return null;
  }
  if (mm < 1 || mm > 12) return null;
  if (dd < 1 || dd > 31) return null;
  const probe = new Date(Date.UTC(yyyy, mm - 1, dd));
  if (probe.getUTCFullYear() !== yyyy || probe.getUTCMonth() !== mm - 1 || probe.getUTCDate() !== dd) {
    return null;
  }
  return raw;
}
function validateIdParam(raw) {
  if (typeof raw !== "string" || raw.length === 0) return null;
  if (raw.includes("..")) return null;
  return ID_RE.test(raw) ? raw : null;
}
function isValidQuotaBlock(v) {
  if (typeof v !== "object" || v === null) return false;
  const o = v;
  return typeof o.subscription_tier === "string" && typeof o.five_hour_utilization === "number" && Number.isFinite(o.five_hour_utilization) && typeof o.seven_day_utilization === "number" && Number.isFinite(o.seven_day_utilization) && typeof o.five_hour_reset_at === "number" && Number.isFinite(o.five_hour_reset_at) && typeof o.seven_day_reset_at === "number" && Number.isFinite(o.seven_day_reset_at) && typeof o.probed_at === "string" && typeof o.stale === "boolean";
}
function atomicWriteFileSync(target, data) {
  const tmp = `${target}.tmp-${process.pid}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
  writeFileSync3(tmp, data);
  try {
    renameSync2(tmp, target);
  } catch {
    try {
      unlinkSync2(target);
    } catch {
    }
    renameSync2(tmp, target);
  }
}
function validateExtParam(raw) {
  return raw === "jsonl" || raw === "ogg" ? raw : null;
}
function isUnder(parent, child) {
  const p = resolvePath(parent);
  const c = resolvePath(child);
  if (c === p) return true;
  return c.startsWith(p + sep);
}
function listDirNames(dir) {
  if (!existsSync5(dir)) return [];
  try {
    return readdirSync(dir, { withFileTypes: true }).filter((d) => d.isDirectory()).map((d) => d.name);
  } catch {
    return [];
  }
}
function listSessions(dir) {
  if (!existsSync5(dir)) return [];
  let entries = [];
  try {
    const files = readdirSync(dir, { withFileTypes: true }).filter((d) => d.isFile());
    for (const f of files) {
      const m = /^(.+)\.(jsonl|ogg)$/.exec(f.name);
      if (!m || m[1] === void 0 || m[2] === void 0) continue;
      const id = m[1];
      const ext = m[2];
      try {
        const st = statSync(join6(dir, f.name));
        entries.push({
          id,
          ext,
          size: st.size,
          mtime: st.mtime.toISOString()
        });
      } catch {
      }
    }
  } catch {
    return [];
  }
  entries.sort((a, b) => a.mtime < b.mtime ? 1 : a.mtime > b.mtime ? -1 : 0);
  return entries;
}
function parseQuery(url) {
  const idx = url.indexOf("?");
  return new URLSearchParams(idx >= 0 ? url.slice(idx + 1) : "");
}
function handleGet(req, res, outputDir) {
  const url = req.url ?? "";
  const path27 = url.split("?")[0];
  if (path27 === "/" || path27 === "/index.html") {
    res.statusCode = 200;
    res.setHeader("content-type", "text/html; charset=utf-8");
    res.end(DASHBOARD_HTML);
    return;
  }
  const q = parseQuery(url);
  if (path27 === "/api/users") {
    const users = listDirNames(outputDir).sort((a, b) => a.localeCompare(b));
    send(res, 200, { users });
    return;
  }
  if (path27 === "/api/dates") {
    const user = validateUserParam(q.get("user") ?? void 0);
    if (!user) {
      send(res, 400, { error: "invalid user" });
      return;
    }
    const userDir = join6(outputDir, user);
    if (!isUnder(outputDir, userDir)) {
      send(res, 400, { error: "invalid path" });
      return;
    }
    const dates = listDirNames(userDir).filter((n) => DATE_RE.test(n)).sort((a, b) => a < b ? 1 : a > b ? -1 : 0);
    send(res, 200, { dates });
    return;
  }
  if (path27 === "/api/sessions") {
    const user = validateUserParam(q.get("user") ?? void 0);
    const date = validateDateParam(q.get("date") ?? void 0);
    if (!user) {
      send(res, 400, { error: "invalid user" });
      return;
    }
    if (!date) {
      send(res, 400, { error: "invalid date" });
      return;
    }
    const dir = join6(outputDir, user, date);
    if (!isUnder(outputDir, dir)) {
      send(res, 400, { error: "invalid path" });
      return;
    }
    send(res, 200, { sessions: listSessions(dir) });
    return;
  }
  if (path27 === "/api/quota") {
    const user = validateUserParam(q.get("user") ?? void 0);
    const date = validateDateParam(q.get("date") ?? void 0);
    if (!user) {
      send(res, 400, { error: "invalid user" });
      return;
    }
    if (!date) {
      send(res, 400, { error: "invalid date" });
      return;
    }
    const quotaFile = join6(outputDir, user, date, "quota.json");
    if (!isUnder(outputDir, quotaFile)) {
      send(res, 400, { error: "invalid path" });
      return;
    }
    if (!existsSync5(quotaFile)) {
      send(res, 404, { error: "not found" });
      return;
    }
    try {
      const raw = readFileSync3(quotaFile, "utf8");
      const parsed = JSON.parse(raw);
      send(res, 200, parsed);
    } catch (err) {
      send(res, 500, {
        error: "read failed",
        detail: err instanceof Error ? err.message : String(err)
      });
    }
    return;
  }
  if (path27 === "/api/file") {
    const user = validateUserParam(q.get("user") ?? void 0);
    const date = validateDateParam(q.get("date") ?? void 0);
    const id = validateIdParam(q.get("id") ?? void 0);
    const ext = validateExtParam(q.get("ext") ?? void 0);
    if (!user) {
      send(res, 400, { error: "invalid user" });
      return;
    }
    if (!date) {
      send(res, 400, { error: "invalid date" });
      return;
    }
    if (!id) {
      send(res, 400, { error: "invalid id" });
      return;
    }
    if (!ext) {
      send(res, 400, { error: "invalid ext" });
      return;
    }
    const filePath = join6(outputDir, user, date, `${id}.${ext}`);
    if (!isUnder(outputDir, filePath)) {
      send(res, 400, { error: "invalid path" });
      return;
    }
    if (!existsSync5(filePath)) {
      send(res, 404, { error: "not found" });
      return;
    }
    try {
      const buf = readFileSync3(filePath);
      res.statusCode = 200;
      if (ext === "jsonl") {
        res.setHeader("content-type", "text/plain; charset=utf-8");
      } else {
        res.setHeader("content-type", "audio/ogg");
      }
      res.setHeader("content-length", String(buf.length));
      res.on("error", () => {
      });
      res.end(buf);
    } catch (err) {
      send(res, 500, {
        error: "read failed",
        detail: err instanceof Error ? err.message : String(err)
      });
    }
    return;
  }
  send(res, 404);
}
async function startMockServer(opts) {
  const outputDir = opts.outputDir ?? join6(process.cwd(), "test-output");
  mkdirSync4(outputDir, { recursive: true });
  const host = opts.host ?? "127.0.0.1";
  const now = opts.now ?? (() => /* @__PURE__ */ new Date());
  const server = createServer((req, res) => {
    if (req.method === "GET") {
      handleGet(req, res, outputDir);
      return;
    }
    if (req.method !== "POST") {
      send(res, 405);
      return;
    }
    const route = req.url ?? "";
    if (route !== ROUTE_CC_SESSIONS && route !== ROUTE_RECORDINGS) {
      send(res, 404);
      return;
    }
    let bodyBytes = 0;
    let aborted = false;
    const chunks = [];
    req.on("data", (chunk) => {
      if (aborted) return;
      bodyBytes += chunk.length;
      if (bodyBytes > MAX_BODY_BYTES) {
        aborted = true;
        send(res, 413, { error: "payload too large", limit: MAX_BODY_BYTES });
        return;
      }
      chunks.push(chunk);
    });
    req.on("end", () => {
      if (aborted) return;
      let json;
      try {
        json = JSON.parse(Buffer.concat(chunks).toString("utf8"));
      } catch (err) {
        send(res, 400, {
          error: "invalid json",
          detail: err instanceof Error ? err.message : String(err)
        });
        return;
      }
      const isLog = route === ROUTE_CC_SESSIONS;
      const obj = json;
      const envelope = obj.envelope ?? {};
      const idRaw = isLog ? envelope.session_id : envelope.recording_id;
      let id;
      if (typeof idRaw === "string" && idRaw.length > 0) {
        const validated = validateIdParam(idRaw);
        if (validated === null) {
          send(res, 400, { error: "invalid id", detail: 'id must match [A-Za-z0-9._-]+ and not contain ".."' });
          return;
        }
        id = validated;
      } else {
        id = `unknown-${Date.now()}-${randomUUID().slice(0, 8)}`;
      }
      const payloadBlock = isLog ? obj.transcript : obj.audio;
      const contentB64 = payloadBlock?.content;
      if (typeof contentB64 !== "string" || contentB64.length === 0) {
        send(res, 400, { error: "missing content", route });
        return;
      }
      try {
        const buf = Buffer.from(contentB64, "base64");
        const decoded = isLog ? gunzipSync(buf, { maxOutputLength: MAX_DECOMPRESSED_BYTES }) : buf;
        if (decoded.length > MAX_DECOMPRESSED_BYTES) {
          send(res, 413, {
            error: "decompressed payload too large",
            limit: MAX_DECOMPRESSED_BYTES
          });
          return;
        }
        const ext = isLog ? "jsonl" : "ogg";
        const userIdSafe = safeUserId(envelope.user_id);
        const date = dateStamp(envelope.captured_at, now());
        const targetDir = join6(outputDir, userIdSafe, date);
        const targetFile = join6(targetDir, `${id}.${ext}`);
        if (!isUnder(outputDir, targetFile)) {
          send(res, 400, { error: "invalid path" });
          return;
        }
        mkdirSync4(targetDir, { recursive: true });
        atomicWriteFileSync(targetFile, decoded);
        if (isLog) {
          const quotaCandidate = obj.envelope?.quota;
          if (isValidQuotaBlock(quotaCandidate)) {
            const quotaFile = join6(targetDir, "quota.json");
            if (isUnder(outputDir, quotaFile)) {
              try {
                const quotaBuf = Buffer.from(JSON.stringify(quotaCandidate), "utf8");
                atomicWriteFileSync(quotaFile, quotaBuf);
              } catch {
              }
            }
          }
        }
        send(res, 200, { ok: true, id, user_id: userIdSafe, date });
      } catch (err) {
        send(res, 500, {
          error: "decode or write failed",
          detail: err instanceof Error ? err.message : String(err)
        });
      }
    });
    req.on("error", () => {
      if (!res.headersSent) {
        send(res, 500);
      }
    });
  });
  const sockets = /* @__PURE__ */ new Set();
  server.on("connection", (socket) => {
    sockets.add(socket);
    socket.once("close", () => sockets.delete(socket));
  });
  return new Promise((resolve3, reject) => {
    server.once("error", reject);
    server.listen(opts.port, host, () => {
      const addr = server.address();
      if (!addr || typeof addr === "string") {
        reject(new Error("mock server failed to bind"));
        return;
      }
      resolve3({
        url: `http://${host}:${addr.port}`,
        port: addr.port,
        outputDir,
        close: () => new Promise((r, rej) => {
          server.close((err) => err ? rej(err) : r());
          for (const s of sockets) s.destroy();
          sockets.clear();
        })
      });
    });
  });
}

// ../digital-twin/src/bin-prod-server.ts
init_esm_shims();
import { homedir as homedir4 } from "os";
import { join as join7 } from "path";
async function runProdServer(deps = {}) {
  const env = deps.env ?? process.env;
  const home = (deps.homedir ?? homedir4)();
  const log = deps.log ?? ((msg) => process.stderr.write(`${msg}
`));
  const portRaw = env.PORT ?? "8080";
  const portParsed = Number(portRaw);
  if (!Number.isInteger(portParsed) || portParsed < 0 || portParsed > 65535) {
    throw new Error(
      `[teamagent-collector] invalid PORT='${portRaw}' \u2014 must be an integer 0-65535`
    );
  }
  const port = portParsed;
  const host = env.HOST ?? "0.0.0.0";
  const outputDir = env.TEAMAGENT_COLLECTOR_DIR ?? join7(home, "teamagent-collector");
  const handle = await startMockServer({ port, host, outputDir });
  log(`[teamagent-collector] listening on ${handle.url}`);
  log(`[teamagent-collector] outputDir = ${handle.outputDir}`);
  deps.onReady?.({ url: handle.url, outputDir: handle.outputDir });
  return handle.close;
}
var argv1 = process.argv[1] ?? "";
if (argv1.includes("bin-prod-server")) {
  runProdServer().then((close) => {
    const shutdown = (signal) => {
      process.stderr.write(`[teamagent-collector] ${signal} received \u2014 shutting down
`);
      close().then(() => process.exit(0)).catch((err) => {
        process.stderr.write(`shutdown error: ${String(err)}
`);
        process.exit(1);
      });
    };
    process.on("SIGTERM", () => shutdown("SIGTERM"));
    process.on("SIGINT", () => shutdown("SIGINT"));
  }).catch((err) => {
    process.stderr.write(`[teamagent-collector] fatal: ${String(err)}
`);
    process.exit(1);
  });
}

// ../digital-twin/src/hooks/tap-session.ts
init_esm_shims();
import { existsSync as existsSync6, copyFileSync, mkdirSync as mkdirSync5, writeFileSync as writeFileSync4, statSync as statSync2 } from "fs";
import { join as join8 } from "path";
import { homedir as osHomedir, platform as osPlatform, arch as osArch, hostname as hostname2 } from "os";
import { spawn as nodeSpawn2 } from "child_process";
import { ulid as defaultUlid } from "ulid";
function projectDirForCwd(cwd) {
  return cwd.replace(/[:/\\]/g, "-");
}
function claudeTranscriptPath(home, cwd, sessionId) {
  return join8(home, ".claude", "projects", projectDirForCwd(cwd), `${sessionId}.jsonl`);
}
function tapSession(input, deps = {}) {
  try {
    const home = (deps.homedir ?? osHomedir)();
    const ulidFn = deps.ulid ?? defaultUlid;
    const now = deps.now ?? (() => /* @__PURE__ */ new Date());
    const platform = deps.platform ?? osPlatform();
    const arch = deps.arch ?? osArch();
    const host = deps.hostname ?? hostname2();
    const transcriptPath = claudeTranscriptPath(home, input.cwd, input.sessionId);
    if (!existsSync6(transcriptPath)) {
      return { status: "no-log" };
    }
    let sourceSize = 0;
    try {
      sourceSize = statSync2(transcriptPath).size;
    } catch {
    }
    const sizeCap = deps.maxPayloadBytes ?? MAX_PAYLOAD_BYTES;
    if (sourceSize > sizeCap) {
      return { status: "too-large", payload_size: sourceSize };
    }
    const paths = digitalTwinPaths(home);
    mkdirSync5(paths.pendingDir, { recursive: true });
    const id = ulidFn();
    const payloadPath = join8(paths.pendingDir, `${id}.payload`);
    const metadataPath = join8(paths.pendingDir, `${id}.json`);
    copyFileSync(transcriptPath, payloadPath);
    let payloadSize = 0;
    try {
      payloadSize = statSync2(payloadPath).size;
    } catch {
    }
    const projectName = input.cwd.split(/[/\\]/).filter(Boolean).pop() ?? "";
    const metadata = {
      id,
      kind: "cc-session",
      session_id: input.sessionId,
      cwd: input.cwd,
      project_name: projectName,
      transcript_path: transcriptPath,
      payload_size: payloadSize,
      captured_at: now().toISOString(),
      source: "stop-hook",
      host: { os: platform, arch, hostname: host },
      teamagent_version: deps.teamagentVersion ?? "unknown",
      schema_version: 1,
      // Issue #283: forward quota only when caller provided one — keeps the
      // field absent from the JSON on pre-#283 Stop taps (no JSON churn).
      ...input.quota ? { quota: input.quota } : {}
    };
    writeFileSync4(metadataPath, JSON.stringify(metadata, null, 2), "utf-8");
    if (deps.daemonBin && existsSync6(deps.daemonBin)) {
      const spawnFn = deps.spawn ?? nodeSpawn2;
      try {
        const nodeBin = deps.nodeBin ?? process.execPath;
        const child = spawnFn(nodeBin, [deps.daemonBin], {
          detached: true,
          stdio: "ignore",
          windowsHide: true,
          cwd: paths.digitalTwinDir
        });
        child.on("error", () => {
        });
        child.unref();
      } catch {
      }
    }
    return { status: "tapped", payloadPath, metadataPath };
  } catch (err) {
    return { status: "error", error: err instanceof Error ? err.message : String(err) };
  }
}

// ../digital-twin/src/schemas/cc-session.ts
init_esm_shims();
import { gzipSync } from "zlib";
function buildCcSessionEnvelope(input) {
  const compressed = gzipSync(input.payloadBytes);
  const payloadB64 = compressed.toString("base64");
  const env = {
    schema_version: 1,
    envelope: {
      id: input.metadata.id,
      user_id: input.identity.user_id,
      machine_id: input.identity.machine_id,
      session_id: input.metadata.session_id,
      cwd: input.metadata.cwd,
      project_name: input.metadata.project_name,
      transcript_path: input.metadata.transcript_path,
      payload_size: input.metadata.payload_size,
      captured_at: input.metadata.captured_at,
      source: input.metadata.source,
      host: input.metadata.host,
      teamagent_version: input.metadata.teamagent_version,
      consented_at: input.identity.consented_at ?? null
    },
    transcript: {
      compression: "gzip+base64",
      content: payloadB64
    }
  };
  if (input.quota) env.quota = input.quota;
  return env;
}
function isCcSessionMetadata(v) {
  if (typeof v !== "object" || v === null) return false;
  const o = v;
  return typeof o.id === "string" && o.kind === "cc-session" && typeof o.session_id === "string" && typeof o.cwd === "string" && typeof o.transcript_path === "string" && typeof o.captured_at === "string";
}

// ../digital-twin/src/quota/probe.ts
init_esm_shims();

// ../digital-twin/src/quota/state.ts
init_esm_shims();
import {
  existsSync as defaultExistsSync,
  readFileSync as defaultReadFileSync,
  writeFileSync as defaultWriteFileSync,
  mkdirSync as defaultMkdirSync
} from "fs";
import { dirname as dirname6, join as join9 } from "path";

// ../digital-twin/src/quota/scheduler.ts
init_esm_shims();
import {
  existsSync as defaultExistsSync2,
  readFileSync as defaultReadFileSync2,
  openSync as defaultOpenSync,
  writeSync as defaultWriteSync,
  closeSync as defaultCloseSync,
  mkdirSync as defaultMkdirSync2,
  unlinkSync as defaultUnlinkSync,
  writeFileSync as defaultWriteFileSync2
} from "fs";
import { dirname as dirname7 } from "path";

// ../digital-twin/src/incremental/scan.ts
init_esm_shims();
import {
  existsSync as defaultExistsSync3,
  readdirSync as defaultReaddirSync,
  statSync as defaultStatSync
} from "fs";
import { join as join10 } from "path";

// ../digital-twin/src/quota/hourly.ts
init_esm_shims();

// ../digital-twin/src/daemon/uploader.ts
init_esm_shims();

// ../digital-twin/src/schemas/recording.ts
init_esm_shims();
var RECORDING_CODEC_DEFAULTS = Object.freeze({
  codec: "opus",
  bitrate: 24e3,
  sample_rate: 16e3,
  channels: 1,
  container: "ogg"
});
function buildRecordingEnvelope(input) {
  const payloadB64 = input.payloadBytes.toString("base64");
  return {
    schema_version: 1,
    envelope: {
      id: input.metadata.id,
      recording_id: input.metadata.id,
      user_id: input.identity.user_id,
      machine_id: input.identity.machine_id,
      started_at: input.metadata.started_at,
      ended_at: input.metadata.ended_at,
      duration_ms: input.metadata.duration_ms,
      payload_size: input.metadata.payload_size,
      source: input.metadata.source,
      host: input.metadata.host,
      teamagent_version: input.metadata.teamagent_version,
      consented_at: input.identity.consented_at ?? null
    },
    audio: {
      compression: "none",
      codec: input.metadata.codec,
      bitrate: input.metadata.bitrate,
      sample_rate: input.metadata.sample_rate,
      channels: input.metadata.channels,
      container: input.metadata.container,
      content: payloadB64
    }
  };
}
function isRecordingMetadata(v) {
  if (typeof v !== "object" || v === null) return false;
  const o = v;
  return typeof o.id === "string" && o.kind === "recording" && typeof o.started_at === "string" && typeof o.ended_at === "string" && typeof o.duration_ms === "number" && o.codec === "opus" && typeof o.bitrate === "number" && typeof o.sample_rate === "number" && typeof o.channels === "number" && o.container === "ogg" && typeof o.payload_size === "number" && typeof o.source === "string" && typeof o.teamagent_version === "string" && o.schema_version === 1;
}

// ../digital-twin/src/daemon/uploader.ts
var ROUTE_BY_KIND = {
  "cc-session": "/v1/cc-sessions",
  recording: "/v1/recordings"
};
var defaultBuildEnvelope = (input) => {
  if (input.metadata.kind === "recording") {
    return buildRecordingEnvelope({
      metadata: input.metadata,
      payloadBytes: input.payloadBytes,
      identity: input.identity
    });
  }
  return buildCcSessionEnvelope({
    metadata: input.metadata,
    payloadBytes: input.payloadBytes,
    identity: input.identity,
    quota: input.metadata.quota
  });
};
async function uploadEntry(input, deps = {}) {
  const buildFn = deps.buildEnvelope ?? defaultBuildEnvelope;
  const fetchFn = deps.fetchFn ?? globalThis.fetch;
  if (!fetchFn) {
    return { kind: "network-error", error: "global fetch is not available" };
  }
  const envelope = buildFn(input);
  const url = stripTrailingSlash(input.endpoint) + ROUTE_BY_KIND[input.metadata.kind];
  let res;
  try {
    res = await fetchFn(url, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${input.token}`,
        "idempotency-key": input.metadata.id
      },
      body: JSON.stringify(envelope)
    });
  } catch (err) {
    return {
      kind: "network-error",
      error: err instanceof Error ? err.message : String(err)
    };
  }
  return classifyResponse(res.status, await safeReadBody(res));
}
async function safeReadBody(res) {
  try {
    return await res.text();
  } catch {
    return void 0;
  }
}
function classifyResponse(status, body) {
  if (status === 200 || status === 204) return { kind: "success", status };
  if (status === 401) return { kind: "auth-failed", status, body };
  if (status === 429 || status >= 500 && status < 600) {
    return { kind: "transient", status, body };
  }
  return { kind: "permanent-failure", status, body };
}
function stripTrailingSlash(s) {
  return s.endsWith("/") ? s.slice(0, -1) : s;
}

// ../digital-twin/src/daemon/queue.ts
init_esm_shims();
import {
  readdirSync as readdirSync2,
  statSync as statSync3,
  readFileSync as readFileSync4,
  writeFileSync as writeFileSync5,
  unlinkSync as unlinkSync3,
  renameSync as renameSync3,
  mkdirSync as mkdirSync6,
  existsSync as existsSync7
} from "fs";
import path25 from "path";
import { homedir as osHomedir2 } from "os";
var DEFAULT_QUEUE_CAPACITY_BYTES = 5e3 * 1024 * 1024;
function getPaths(home) {
  return digitalTwinPaths(home);
}
function safeStat(p) {
  try {
    const s = statSync3(p);
    return { mtimeMs: s.mtimeMs, size: s.size };
  } catch {
    return null;
  }
}
function listPending(home = osHomedir2()) {
  const paths = getPaths(home);
  if (!existsSync7(paths.pendingDir)) return [];
  const names = readdirSync2(paths.pendingDir);
  const ids = /* @__PURE__ */ new Set();
  for (const n of names) {
    if (n.endsWith(".payload")) ids.add(n.slice(0, -".payload".length));
    else if (n.endsWith(".json")) ids.add(n.slice(0, -".json".length));
  }
  const out = [];
  for (const id of ids) {
    const payloadPath = path25.join(paths.pendingDir, `${id}.payload`);
    const metadataPath = path25.join(paths.pendingDir, `${id}.json`);
    const ps = safeStat(payloadPath);
    const ms = safeStat(metadataPath);
    if (!ps || !ms) continue;
    out.push({
      id,
      payloadPath,
      metadataPath,
      mtimeMs: ms.mtimeMs,
      payloadSize: ps.size,
      metadataSize: ms.size
    });
  }
  out.sort((a, b) => a.mtimeMs - b.mtimeMs);
  return out;
}
function isEntryTooLarge(entry, maxBytes = MAX_PAYLOAD_BYTES) {
  return entry.payloadSize > maxBytes;
}
function loadEntry(entry) {
  let payloadBytes;
  try {
    payloadBytes = readFileSync4(entry.payloadPath);
  } catch {
    return null;
  }
  let metadataRaw;
  try {
    metadataRaw = readFileSync4(entry.metadataPath, "utf-8");
  } catch {
    return null;
  }
  let parsed;
  try {
    parsed = JSON.parse(metadataRaw);
  } catch {
    return null;
  }
  if (isCcSessionMetadata(parsed)) {
    return { entry, payloadBytes, metadata: parsed };
  }
  if (isRecordingMetadata(parsed)) {
    return { entry, payloadBytes, metadata: parsed };
  }
  return null;
}
function writeMetadataAtomic(metadataPath, metadata) {
  const tmp = `${metadataPath}.tmp`;
  writeFileSync5(tmp, JSON.stringify(metadata, null, 2), "utf-8");
  renameSync3(tmp, metadataPath);
}
function removeEntry(entry) {
  for (const p of [entry.payloadPath, entry.metadataPath]) {
    try {
      unlinkSync3(p);
    } catch {
    }
  }
}
function moveToDeadLetter(entry, home = osHomedir2()) {
  const paths = getPaths(home);
  mkdirSync6(paths.deadLetterDir, { recursive: true });
  for (const src of [entry.payloadPath, entry.metadataPath]) {
    const base = path25.basename(src);
    const dst = path25.join(paths.deadLetterDir, base);
    try {
      renameSync3(src, dst);
    } catch {
    }
  }
}
function enforceCapacity(home = osHomedir2(), maxBytes = DEFAULT_QUEUE_CAPACITY_BYTES) {
  const paths = getPaths(home);
  const units = [];
  for (const dir of [paths.pendingDir, paths.deadLetterDir]) {
    if (!existsSync7(dir)) continue;
    const idToFiles = /* @__PURE__ */ new Map();
    for (const n of readdirSync2(dir)) {
      let id;
      if (n.endsWith(".payload")) id = n.slice(0, -".payload".length);
      else if (n.endsWith(".json")) id = n.slice(0, -".json".length);
      else continue;
      const abs = path25.join(dir, n);
      const list = idToFiles.get(id);
      if (list) list.push(abs);
      else idToFiles.set(id, [abs]);
    }
    for (const filesForId of idToFiles.values()) {
      let totalSize = 0;
      let oldestMtimeMs = Number.POSITIVE_INFINITY;
      for (const abs of filesForId) {
        const s = safeStat(abs);
        if (!s) continue;
        totalSize += s.size;
        if (s.mtimeMs < oldestMtimeMs) oldestMtimeMs = s.mtimeMs;
      }
      if (!Number.isFinite(oldestMtimeMs)) continue;
      units.push({ paths: filesForId, totalSize, oldestMtimeMs });
    }
  }
  let total = units.reduce((acc, u) => acc + u.totalSize, 0);
  if (total <= maxBytes) return [];
  units.sort((a, b) => a.oldestMtimeMs - b.oldestMtimeMs);
  const deleted = [];
  for (const u of units) {
    if (total <= maxBytes) break;
    for (const p of u.paths) {
      try {
        unlinkSync3(p);
        deleted.push(p);
      } catch {
      }
    }
    total -= u.totalSize;
  }
  return deleted;
}

// ../digital-twin/src/daemon/backoff.ts
init_esm_shims();
var MAX_BACKOFF_MS = 24 * 60 * 60 * 1e3;
var DEAD_LETTER_AFTER_MS = 24 * 60 * 60 * 1e3;
function shouldDeadLetter(firstFailedAt, now) {
  if (!firstFailedAt) return false;
  const startedMs = Date.parse(firstFailedAt);
  if (!Number.isFinite(startedMs)) return false;
  return now.getTime() - startedMs >= DEAD_LETTER_AFTER_MS;
}

// ../digital-twin/src/daemon/process-manager.ts
init_esm_shims();
import {
  existsSync as existsSync8,
  readFileSync as readFileSync5,
  writeFileSync as writeFileSync6,
  unlinkSync as unlinkSync4,
  mkdirSync as mkdirSync7
} from "fs";
import { homedir as osHomedir3 } from "os";
function isPidAlive(pid) {
  if (pid <= 0) return false;
  try {
    process.kill(pid, 0);
    return true;
  } catch (err) {
    const code = err.code;
    if (code === "EPERM") return true;
    return false;
  }
}
function readPidFile(home = osHomedir3()) {
  const paths = digitalTwinPaths(home);
  if (!existsSync8(paths.daemonPidFile)) return null;
  try {
    const raw = readFileSync5(paths.daemonPidFile, "utf-8");
    const obj = JSON.parse(raw);
    if (typeof obj.pid !== "number" || typeof obj.start_at !== "string") return null;
    return { pid: obj.pid, start_at: obj.start_at };
  } catch {
    return null;
  }
}
function acquirePidLock(home = osHomedir3(), deps = {}) {
  const paths = digitalTwinPaths(home);
  const myPid = deps.pid ?? process.pid;
  const now = deps.now ?? (() => /* @__PURE__ */ new Date());
  const aliveCheck = deps.isPidAlive ?? isPidAlive;
  mkdirSync7(paths.digitalTwinDir, { recursive: true });
  const payload = JSON.stringify({
    pid: myPid,
    start_at: now().toISOString()
  });
  if (tryWritePidLockAtomic(paths.daemonPidFile, payload)) return true;
  const existing = readPidFile(home);
  if (existing?.pid === myPid) {
    return true;
  }
  if (existing && aliveCheck(existing.pid)) {
    return false;
  }
  try {
    unlinkSync4(paths.daemonPidFile);
  } catch {
  }
  return tryWritePidLockAtomic(paths.daemonPidFile, payload);
}
function tryWritePidLockAtomic(path27, payload) {
  try {
    writeFileSync6(path27, payload, { flag: "wx", encoding: "utf-8" });
    return true;
  } catch (err) {
    if (err.code === "EEXIST") return false;
    throw err;
  }
}
function releasePidLock(home = osHomedir3()) {
  const paths = digitalTwinPaths(home);
  try {
    unlinkSync4(paths.daemonPidFile);
  } catch {
  }
}
async function runUploadCycle(config, home = osHomedir3(), deps = {}) {
  const uploader = deps.uploader ?? uploadEntry;
  const now = deps.now ?? (() => /* @__PURE__ */ new Date());
  const maxBytes = deps.maxPayloadBytes;
  const entries = listPending(home);
  const outcomes = [];
  let authFailed = false;
  for (const entry of entries) {
    if (authFailed) break;
    const out = await processEntry(entry, config, uploader, deps.fetchFn, home, now, maxBytes);
    outcomes.push(out);
    if (out.outcome === "auth-failed") {
      authFailed = true;
    }
  }
  return { scanned: entries.length, outcomes, authFailed };
}
async function processEntry(entry, config, uploader, fetchFn, home, now, maxPayloadBytes) {
  if (isEntryTooLarge(entry, maxPayloadBytes)) {
    moveToDeadLetter(entry, home);
    return { id: entry.id, outcome: "too-large", payload_size: entry.payloadSize };
  }
  const loaded = loadEntry(entry);
  if (!loaded) {
    moveToDeadLetter(entry, home);
    return { id: entry.id, outcome: "invalid-metadata" };
  }
  const result = await uploader(
    {
      metadata: loaded.metadata,
      payloadBytes: loaded.payloadBytes,
      endpoint: config.endpoint,
      token: config.token,
      identity: {
        user_id: config.user_id,
        machine_id: config.machine_id,
        consented_at: config.consented_at ?? null
      }
    },
    { fetchFn }
  );
  return classifyAndAct(entry, loaded, result, home, now());
}
function classifyAndAct(entry, loaded, result, home, now) {
  switch (result.kind) {
    case "success": {
      removeEntry(entry);
      return { id: entry.id, outcome: "uploaded" };
    }
    case "auth-failed": {
      return { id: entry.id, outcome: "auth-failed" };
    }
    case "permanent-failure": {
      moveToDeadLetter(entry, home);
      const out = {
        id: entry.id,
        outcome: "dead-letter",
        reason: "permanent-failure",
        status: result.status
      };
      if (loaded.metadata.first_failed_at) {
        out.first_failed_at = loaded.metadata.first_failed_at;
      }
      return out;
    }
    case "transient":
    case "network-error": {
      let firstFailedAt = loaded.metadata.first_failed_at ?? null;
      if (!firstFailedAt) {
        firstFailedAt = now.toISOString();
        try {
          writeMetadataAtomic(entry.metadataPath, {
            ...loaded.metadata,
            first_failed_at: firstFailedAt
          });
        } catch {
        }
      }
      if (shouldDeadLetter(firstFailedAt, now)) {
        moveToDeadLetter(entry, home);
        return {
          id: entry.id,
          outcome: "dead-letter",
          reason: "too-old",
          first_failed_at: firstFailedAt,
          status: "status" in result ? result.status : void 0
        };
      }
      return {
        id: entry.id,
        outcome: "transient",
        first_failed_at: firstFailedAt,
        status: "status" in result ? result.status : void 0,
        error: "error" in result ? result.error : void 0
      };
    }
  }
}
var POLL_INTERVAL_MS = 6e4;
var IDLE_EXIT_MS = 15 * 6e4;
async function mainLoop(config, home = osHomedir3(), deps = {}) {
  const sleep = deps.sleep ?? defaultSleep2;
  const runCycle = deps.runCycle ?? runUploadCycle;
  const shouldStop = deps.shouldStop ?? (() => false);
  const pollMs = deps.pollIntervalMs ?? POLL_INTERVAL_MS;
  const idleMs = deps.idleExitMs ?? IDLE_EXIT_MS;
  let idleAccumulatedMs = 0;
  while (!shouldStop()) {
    enforceCapacity(home);
    const summary = await runCycle(config, home, { fetchFn: deps.fetchFn });
    deps.onCycle?.(summary);
    if (summary.authFailed) {
      return { reason: "auth-failed" };
    }
    if (summary.scanned === 0) {
      idleAccumulatedMs += pollMs;
      if (idleAccumulatedMs >= idleMs) {
        return { reason: "idle" };
      }
    } else {
      idleAccumulatedMs = 0;
    }
    if (shouldStop()) break;
    await sleep(pollMs);
  }
  return { reason: "stopped" };
}
function defaultSleep2(ms) {
  return new Promise((resolve3) => {
    const t = setTimeout(resolve3, ms);
    if (typeof t === "object" && t !== null && "unref" in t) {
      t.unref();
    }
  });
}

// ../digital-twin/src/bin-uploader.ts
init_esm_shims();
import { homedir as osHomedir4 } from "os";
async function runDaemon(deps = {}) {
  const home = (deps.homedir ?? osHomedir4)();
  const exit = deps.exit ?? ((code) => process.exit(code));
  const log = deps.log ?? ((msg) => process.stderr.write(`${msg}
`));
  const cfg = loadConfig(digitalTwinPaths(home).configFile);
  if (!isEnabled(cfg)) {
    log("digital-twin: config missing or disabled \u2014 daemon exiting");
    return exit(2);
  }
  const acquired = acquirePidLock(home);
  if (!acquired) {
    log("digital-twin: another daemon is already running \u2014 exiting");
    return exit(0);
  }
  let exitCode = 0;
  try {
    const daemonCfg = {
      endpoint: cfg.uploader.endpoint,
      token: cfg.uploader.token,
      user_id: cfg.identity.user_id,
      machine_id: cfg.identity.machine_id,
      // Issue #146 F9: forward consented_at into every envelope so the
      // server-side audit trail can answer "when did this user first agree".
      consented_at: cfg.consented_at ?? null
    };
    const result = await mainLoop(daemonCfg, home);
    if (result.reason === "auth-failed") {
      log("digital-twin: auth failed (HTTP 401) \u2014 token invalid");
      exitCode = 1;
    } else {
      log(`digital-twin: daemon exiting (${result.reason})`);
    }
  } finally {
    releasePidLock(home);
  }
  return exit(exitCode);
}
var argv12 = process.argv[1] ?? "";
if (argv12.includes("bin-uploader")) {
  runDaemon().catch((err) => {
    process.stderr.write(`digital-twin daemon crash: ${String(err)}
`);
    process.exit(1);
  });
}

// ../digital-twin/src/recorder/platform-input.ts
init_esm_shims();
function resolvePlatformInput(opts) {
  switch (opts.platform) {
    case "darwin":
      return { format: "avfoundation", device: opts.deviceArg ?? ":0" };
    case "win32":
      return {
        format: "dshow",
        device: opts.deviceArg ?? "audio=virtual-audio-capturer"
      };
    case "linux":
      return { format: "pulse", device: opts.deviceArg ?? "default" };
    default:
      throw new Error(
        `unsupported platform for ffmpeg recorder: ${opts.platform}. supported: darwin, win32, linux`
      );
  }
}
function installHintForPlatform(platform) {
  switch (platform) {
    case "darwin":
      return "install ffmpeg with: brew install ffmpeg";
    case "win32":
      return "install ffmpeg from https://ffmpeg.org/download.html or run: scoop install ffmpeg";
    case "linux":
      return "install ffmpeg with: apt-get install ffmpeg (Debian/Ubuntu) or dnf install ffmpeg (Fedora/RHEL)";
    default:
      return "install ffmpeg from https://ffmpeg.org/download.html";
  }
}

// ../digital-twin/src/recorder/ffmpeg-wrapper.ts
init_esm_shims();
import {
  existsSync as existsSync9,
  mkdirSync as mkdirSync8,
  readFileSync as readFileSync6,
  renameSync as renameSync4,
  statSync as statSync4,
  unlinkSync as unlinkSync5,
  writeFileSync as writeFileSync7
} from "fs";
import { join as join11 } from "path";
import {
  spawn as nodeSpawn3,
  spawnSync as nodeSpawnSync
} from "child_process";
import {
  homedir as osHomedir5,
  platform as osPlatform2,
  arch as osArch2,
  hostname as osHostname
} from "os";
import { ulid as defaultUlid2 } from "ulid";
var RECORDING_CODEC_FLAGS = Object.freeze([
  "-vn",
  "-c:a",
  "libopus",
  "-b:a",
  "24k",
  "-ar",
  "16000",
  "-ac",
  "1"
]);
var cachedProbe = null;
function detectFfmpegDefault() {
  if (cachedProbe) return cachedProbe;
  try {
    const r = nodeSpawnSync("ffmpeg", ["-version"], {
      stdio: ["ignore", "pipe", "pipe"]
    });
    if (r.status === 0 && r.stdout) {
      const out = r.stdout.toString("utf-8");
      const m = /ffmpeg version (\S+)/.exec(out);
      cachedProbe = { available: true, version: m?.[1] ?? "unknown" };
      return cachedProbe;
    }
  } catch {
  }
  cachedProbe = { available: false };
  return cachedProbe;
}
function ensureFfmpegOrThrow(probe, platform) {
  if (probe.available) return;
  throw new Error(
    `ffmpeg not found on PATH. ${installHintForPlatform(platform)}`
  );
}
function start(input, deps = {}) {
  const platform = deps.platform ?? osPlatform2();
  const detect = deps.detectFfmpeg ?? detectFfmpegDefault;
  const spawnFn = deps.spawn ?? nodeSpawn3;
  const now = deps.now ?? (() => /* @__PURE__ */ new Date());
  const probe = detect();
  ensureFfmpegOrThrow(probe, platform);
  const inputDevice = resolvePlatformInput({ platform, deviceArg: input.deviceArg });
  const oggPath = `${input.output}.ogg`;
  const args = [
    "-y",
    "-f",
    inputDevice.format,
    "-i",
    inputDevice.device,
    ...RECORDING_CODEC_FLAGS,
    oggPath
  ];
  const child = spawnFn("ffmpeg", args, {
    detached: true,
    stdio: "ignore",
    windowsHide: true
  });
  const pid = child.pid;
  if (typeof pid !== "number") {
    throw new Error("failed to spawn ffmpeg: no pid returned");
  }
  try {
    child.unref();
  } catch {
  }
  try {
    child.on("error", () => {
    });
  } catch {
  }
  writeFileSync7(`${input.output}.pid`, String(pid), "utf-8");
  writeFileSync7(
    `${input.output}.start.json`,
    JSON.stringify({ id: input.id, started_at: now().toISOString() }),
    "utf-8"
  );
  return { id: input.id, pid, output: oggPath };
}
var DEFAULT_MAX_WAIT_MS = 1e4;
var DEFAULT_POLL_INTERVAL_MS = 100;
function defaultIsAlive(pid) {
  try {
    process.kill(pid, 0);
    return true;
  } catch {
    return false;
  }
}
function defaultKill(pid, signal) {
  return process.kill(pid, signal ?? "SIGTERM");
}
function defaultSleep3(ms) {
  return new Promise((res) => setTimeout(res, ms));
}
async function stop(input, deps = {}) {
  const platform = deps.platform ?? osPlatform2();
  const home = (deps.homedir ?? osHomedir5)();
  const ulidFn = deps.ulid ?? defaultUlid2;
  const now = deps.now ?? (() => /* @__PURE__ */ new Date());
  const arch = deps.arch ?? osArch2();
  const host = deps.hostname ?? osHostname();
  const isAlive = deps.isAlive ?? defaultIsAlive;
  const kill = deps.kill ?? defaultKill;
  const sleep = deps.sleep ?? defaultSleep3;
  const spawnFn = deps.spawn ?? nodeSpawn3;
  const maxWaitMs = deps.maxWaitMs ?? DEFAULT_MAX_WAIT_MS;
  const pollIntervalMs = deps.pollIntervalMs ?? DEFAULT_POLL_INTERVAL_MS;
  const pidFile = `${input.output}.pid`;
  const startMetaFile = `${input.output}.start.json`;
  const oggPath = `${input.output}.ogg`;
  if (!existsSync9(pidFile)) {
    return { status: "no-pid" };
  }
  const pidStr = readFileSync6(pidFile, "utf-8").trim();
  const pid = Number(pidStr);
  if (!Number.isFinite(pid) || pid <= 0) {
    return { status: "error", error: `invalid pid in ${pidFile}: ${pidStr}` };
  }
  try {
    kill(pid, "SIGTERM");
  } catch (err) {
    if (platform === "win32") {
      try {
        const child = spawnFn("taskkill", ["/PID", String(pid), "/F"], {
          stdio: "ignore",
          windowsHide: true
        });
        try {
          child.unref();
        } catch {
        }
      } catch (spawnErr) {
        return {
          status: "error",
          error: `failed to kill pid ${pid}: ${spawnErr.message ?? String(spawnErr)}`
        };
      }
    } else {
      return {
        status: "error",
        error: `failed to kill pid ${pid}: ${err.message ?? String(err)}`
      };
    }
  }
  const deadline = Date.now() + maxWaitMs;
  let alive = isAlive(pid);
  while (alive && Date.now() < deadline) {
    await sleep(pollIntervalMs);
    alive = isAlive(pid);
  }
  if (alive) {
    return { status: "timeout" };
  }
  let startedAt = now().toISOString();
  let recId = input.id;
  try {
    const sm = JSON.parse(readFileSync6(startMetaFile, "utf-8"));
    if (typeof sm.started_at === "string") startedAt = sm.started_at;
    if (typeof sm.id === "string") recId = sm.id;
  } catch {
  }
  if (!existsSync9(oggPath)) {
    cleanupTempFiles(pidFile, startMetaFile);
    return { status: "error", error: `ffmpeg did not produce output: ${oggPath}` };
  }
  const endedAtDate = now();
  const endedAt = endedAtDate.toISOString();
  const startedAtMs = Date.parse(startedAt);
  const duration = Number.isFinite(startedAtMs) ? Math.max(0, endedAtDate.getTime() - startedAtMs) : 0;
  const paths = digitalTwinPaths(home);
  mkdirSync8(paths.pendingDir, { recursive: true });
  let payloadSize = 0;
  try {
    payloadSize = statSync4(oggPath).size;
  } catch {
  }
  const sizeCap = deps.maxPayloadBytes ?? MAX_PAYLOAD_BYTES;
  if (payloadSize > sizeCap) {
    cleanupTempFiles(pidFile, startMetaFile);
    return {
      status: "too-large",
      oversizePath: oggPath,
      payload_size: payloadSize
    };
  }
  const newId = ulidFn();
  const payloadPath = join11(paths.pendingDir, `${newId}.payload`);
  const metadataPath = join11(paths.pendingDir, `${newId}.json`);
  try {
    renameSync4(oggPath, payloadPath);
  } catch {
    try {
      const buf = readFileSync6(oggPath);
      writeFileSync7(payloadPath, buf);
      unlinkSync5(oggPath);
    } catch (copyErr) {
      cleanupTempFiles(pidFile, startMetaFile);
      return {
        status: "error",
        error: `failed to move OGG into pending/: ${copyErr.message ?? String(copyErr)}`
      };
    }
  }
  const metadata = {
    id: newId,
    kind: "recording",
    started_at: startedAt,
    ended_at: endedAt,
    duration_ms: duration,
    codec: RECORDING_CODEC_DEFAULTS.codec,
    bitrate: RECORDING_CODEC_DEFAULTS.bitrate,
    sample_rate: RECORDING_CODEC_DEFAULTS.sample_rate,
    channels: RECORDING_CODEC_DEFAULTS.channels,
    container: RECORDING_CODEC_DEFAULTS.container,
    payload_size: payloadSize,
    source: "recorder",
    host: { os: platform, arch, hostname: host },
    teamagent_version: deps.teamagentVersion ?? "unknown",
    schema_version: 1
  };
  const metaWithCorrelation = { ...metadata, correlation_id: recId };
  writeFileSync7(metadataPath, JSON.stringify(metaWithCorrelation, null, 2), "utf-8");
  cleanupTempFiles(pidFile, startMetaFile);
  return { status: "stopped", payloadPath, metadataPath };
}
function cleanupTempFiles(...files) {
  for (const f of files) {
    try {
      if (existsSync9(f)) unlinkSync5(f);
    } catch {
    }
  }
}
function importRecording(input, deps = {}) {
  const platform = deps.platform ?? osPlatform2();
  const detect = deps.detectFfmpeg ?? detectFfmpegDefault;
  const probe = detect();
  ensureFfmpegOrThrow(probe, platform);
  const spawnSyncFn = deps.spawnSync ?? nodeSpawnSync;
  const home = (deps.homedir ?? osHomedir5)();
  const ulidFn = deps.ulid ?? defaultUlid2;
  const now = deps.now ?? (() => /* @__PURE__ */ new Date());
  const arch = deps.arch ?? osArch2();
  const host = deps.hostname ?? osHostname();
  const oggPath = `${input.output}.ogg`;
  const args = [
    "-y",
    "-i",
    input.inputPath,
    ...RECORDING_CODEC_FLAGS,
    oggPath
  ];
  const r = spawnSyncFn("ffmpeg", args, {
    stdio: ["ignore", "pipe", "pipe"],
    windowsHide: true
  });
  if (r.status !== 0) {
    const stderr = r.stderr ? r.stderr.toString("utf-8") : "";
    return {
      status: "failed",
      error: stderr.trim() || `ffmpeg exited with status ${r.status}`
    };
  }
  if (!existsSync9(oggPath)) {
    return {
      status: "failed",
      error: `ffmpeg reported success but output missing: ${oggPath}`
    };
  }
  const paths = digitalTwinPaths(home);
  mkdirSync8(paths.pendingDir, { recursive: true });
  const id = ulidFn();
  const payloadPath = join11(paths.pendingDir, `${id}.payload`);
  const metadataPath = join11(paths.pendingDir, `${id}.json`);
  let payloadSize = 0;
  try {
    payloadSize = statSync4(oggPath).size;
  } catch {
  }
  try {
    renameSync4(oggPath, payloadPath);
  } catch {
    try {
      const buf = readFileSync6(oggPath);
      writeFileSync7(payloadPath, buf);
      unlinkSync5(oggPath);
    } catch (copyErr) {
      return {
        status: "failed",
        error: `failed to move imported OGG: ${copyErr.message ?? String(copyErr)}`
      };
    }
  }
  const nowDate = now();
  const metadata = {
    id,
    kind: "recording",
    started_at: nowDate.toISOString(),
    ended_at: nowDate.toISOString(),
    duration_ms: 0,
    codec: RECORDING_CODEC_DEFAULTS.codec,
    bitrate: RECORDING_CODEC_DEFAULTS.bitrate,
    sample_rate: RECORDING_CODEC_DEFAULTS.sample_rate,
    channels: RECORDING_CODEC_DEFAULTS.channels,
    container: RECORDING_CODEC_DEFAULTS.container,
    payload_size: payloadSize,
    source: "import",
    host: { os: platform, arch, hostname: host },
    teamagent_version: deps.teamagentVersion ?? "unknown",
    schema_version: 1
  };
  writeFileSync7(metadataPath, JSON.stringify(metadata, null, 2), "utf-8");
  return { status: "imported", payloadPath, metadataPath };
}

// ../cli/src/commands/digital-twin.ts
var DigitalTwinArgError = class extends Error {
  constructor(message) {
    super(message);
    this.name = "DigitalTwinArgError";
  }
};
function parseDigitalTwinArgs(rest) {
  const sub = rest[0];
  if (!sub) {
    throw new DigitalTwinArgError(
      "Usage: teamagent digital-twin <login|logout|status|pause|resume|inject-mock> [args]"
    );
  }
  switch (sub) {
    case "login": {
      const token = rest[1];
      if (!token) {
        throw new DigitalTwinArgError("Usage: teamagent digital-twin login <token>");
      }
      return { sub: "login", token };
    }
    case "logout":
    case "status":
    case "pause":
    case "resume":
      return { sub };
    case "inject-mock": {
      const result = { sub: "inject-mock" };
      for (let i = 1; i < rest.length; i++) {
        const a = rest[i];
        if (a === "--cwd" && rest[i + 1]) {
          result.cwd = rest[++i];
        } else if (a.startsWith("--cwd=")) {
          result.cwd = a.slice("--cwd=".length);
        } else if (a === "--session-id" && rest[i + 1]) {
          result.sessionId = rest[++i];
        } else if (a.startsWith("--session-id=")) {
          result.sessionId = a.slice("--session-id=".length);
        }
      }
      return result;
    }
    default:
      throw new DigitalTwinArgError(
        `Unknown digital-twin subcommand: ${sub}. Use one of login|logout|status|pause|resume|inject-mock.`
      );
  }
}
function resolveDeps(deps) {
  return {
    homedir: deps.homedir ?? osHomedir6,
    print: deps.print ?? ((m) => process.stdout.write(m + "\n")),
    printErr: deps.printErr ?? ((m) => process.stderr.write(m + "\n")),
    getUserId: deps.getUserId,
    getMachineId: deps.getMachineId,
    isPidAlive: deps.isPidAlive,
    ulid: deps.ulid ?? defaultUlid3,
    cwd: deps.cwd ?? (() => process.cwd()),
    tapSession: deps.tapSession ?? tapSession
  };
}
function executeDigitalTwinLogin(token, deps = {}) {
  const r = resolveDeps(deps);
  const home = r.homedir();
  const paths = digitalTwinPaths(home);
  const existing = loadConfig(paths.configFile);
  let config;
  if (existing) {
    config = { ...existing, uploader: { ...existing.uploader, token } };
  } else {
    const userIdFn = r.getUserId ?? getUserId;
    const machineIdFn = r.getMachineId ?? (() => getMachineId(paths.machineIdFile));
    config = defaultConfig({
      user_id: userIdFn(),
      machine_id: machineIdFn()
    });
    config.uploader.token = token;
  }
  saveConfig(config, paths.configFile);
  r.print(`digital-twin: token saved (endpoint: ${config.uploader.endpoint})`);
  return { exitCode: 0 };
}
function executeDigitalTwinLogout(deps = {}) {
  const r = resolveDeps(deps);
  const home = r.homedir();
  const paths = digitalTwinPaths(home);
  const existing = loadConfig(paths.configFile);
  if (!existing) {
    r.print("digital-twin: not configured");
    return { exitCode: 0 };
  }
  const config = { ...existing, uploader: { ...existing.uploader, token: null } };
  saveConfig(config, paths.configFile);
  r.print("digital-twin: logged out");
  return { exitCode: 0 };
}
function executeDigitalTwinPause(deps = {}) {
  const r = resolveDeps(deps);
  const home = r.homedir();
  const paths = digitalTwinPaths(home);
  const existing = loadConfig(paths.configFile);
  if (!existing) {
    r.printErr(
      "digital-twin: not configured (run `teamagent digital-twin login <token>` first)"
    );
    return { exitCode: 1 };
  }
  const config = { ...existing, uploader: { ...existing.uploader, enabled: false } };
  saveConfig(config, paths.configFile);
  r.print("digital-twin: paused");
  return { exitCode: 0 };
}
function executeDigitalTwinResume(deps = {}) {
  const r = resolveDeps(deps);
  const home = r.homedir();
  const paths = digitalTwinPaths(home);
  const existing = loadConfig(paths.configFile);
  if (!existing) {
    r.printErr(
      "digital-twin: not configured (run `teamagent digital-twin login <token>` first)"
    );
    return { exitCode: 1 };
  }
  const config = { ...existing, uploader: { ...existing.uploader, enabled: true } };
  saveConfig(config, paths.configFile);
  r.print("digital-twin: resumed");
  return { exitCode: 0 };
}
function countDeadLetter(home) {
  const paths = digitalTwinPaths(home);
  if (!existsSync10(paths.deadLetterDir)) return 0;
  try {
    const names = readdirSync3(paths.deadLetterDir);
    return names.filter((n) => n.endsWith(".payload")).length;
  } catch {
    return 0;
  }
}
function executeDigitalTwinStatus(deps = {}) {
  const r = resolveDeps(deps);
  const home = r.homedir();
  const paths = digitalTwinPaths(home);
  const existing = loadConfig(paths.configFile);
  if (!existing) {
    r.print(
      "digital-twin: not configured (run `teamagent digital-twin login <token>`)"
    );
    return { exitCode: 0 };
  }
  const pending = listPending(home).length;
  const deadLetter = countDeadLetter(home);
  const pid = readPidFile(home);
  const aliveFn = r.isPidAlive ?? isPidAlive;
  const lines = [];
  lines.push("digital-twin status");
  lines.push(`  config:    ${paths.configFile}`);
  lines.push(`  enabled:   ${existing.uploader.enabled ? "true" : "false"}`);
  lines.push(`  endpoint:  ${existing.uploader.endpoint}`);
  lines.push(`  user_id:   ${existing.identity.user_id}`);
  lines.push(`  machine_id: ${existing.identity.machine_id}`);
  lines.push(`  token:     ${existing.uploader.token ? "[redacted]" : "(none)"}`);
  lines.push("  queue:");
  lines.push(`    pending:     ${pending}`);
  lines.push(`    dead-letter: ${deadLetter}`);
  lines.push("  daemon:");
  if (pid) {
    lines.push(`    pid:        ${pid.pid}`);
    lines.push(`    started_at: ${pid.start_at}`);
    lines.push(`    alive:      ${aliveFn(pid.pid) ? "yes" : "no"}`);
  } else {
    lines.push("    pid:        (none)");
    lines.push("    alive:      no");
  }
  r.print(lines.join("\n"));
  return { exitCode: 0 };
}
function executeDigitalTwinInjectMock(parsed, deps = {}) {
  const r = resolveDeps(deps);
  const home = r.homedir();
  const cwd = parsed.cwd ?? r.cwd();
  const sessionId = parsed.sessionId ?? r.ulid();
  const transcript = claudeTranscriptPath(home, cwd, sessionId);
  try {
    mkdirSync9(dirname8(transcript), { recursive: true });
    const fakeJsonl = JSON.stringify({
      type: "user",
      message: { role: "user", content: "inject-mock probe" },
      sessionId,
      cwd,
      timestamp: (/* @__PURE__ */ new Date()).toISOString()
    }) + "\n" + JSON.stringify({
      type: "assistant",
      message: { role: "assistant", content: "inject-mock ack" },
      sessionId,
      cwd,
      timestamp: (/* @__PURE__ */ new Date()).toISOString()
    }) + "\n";
    writeFileSync8(transcript, fakeJsonl, "utf-8");
  } catch (err) {
    r.printErr(
      `digital-twin inject-mock: failed to write fake transcript at ${transcript}: ${err instanceof Error ? err.message : String(err)}`
    );
    return { exitCode: 1 };
  }
  const result = r.tapSession(
    { cwd, sessionId },
    { homedir: () => home }
  );
  if (result.status === "tapped") {
    r.print(
      `digital-twin: injected mock transcript (session=${sessionId}) -> ${result.payloadPath ?? "(unknown)"}`
    );
    return { exitCode: 0 };
  }
  r.printErr(
    `digital-twin inject-mock: tapSession status=${result.status}${result.error ? ` error=${result.error}` : ""}`
  );
  return { exitCode: 1 };
}
async function executeDigitalTwin(parsed, deps = {}) {
  switch (parsed.sub) {
    case "login":
      return executeDigitalTwinLogin(parsed.token, deps);
    case "logout":
      return executeDigitalTwinLogout(deps);
    case "status":
      return executeDigitalTwinStatus(deps);
    case "pause":
      return executeDigitalTwinPause(deps);
    case "resume":
      return executeDigitalTwinResume(deps);
    case "inject-mock":
      return executeDigitalTwinInjectMock(parsed, deps);
  }
}

// ../cli/src/commands/record.ts
init_esm_shims();
import { mkdirSync as mkdirSync10, readdirSync as readdirSync4 } from "fs";
import { homedir as osHomedir7 } from "os";
import { join as join12 } from "path";
import { ulid as defaultUlid4 } from "ulid";
var RecordArgError = class extends Error {
  constructor(message) {
    super(message);
    this.name = "RecordArgError";
  }
};
function parseRecordArgs(rest) {
  const sub = rest[0];
  if (!sub) {
    throw new RecordArgError(
      "Usage: teamagent record <start|stop|import> [args]"
    );
  }
  switch (sub) {
    case "start":
    case "stop": {
      const result = { sub };
      for (let i = 1; i < rest.length; i++) {
        const a = rest[i];
        if (a === "--id" && rest[i + 1]) {
          result.id = rest[++i];
        } else if (a.startsWith("--id=")) {
          result.id = a.slice("--id=".length);
        } else if (a === "--label" && rest[i + 1]) {
          result.label = rest[++i];
        } else if (a.startsWith("--label=")) {
          result.label = a.slice("--label=".length);
        }
      }
      return result;
    }
    case "import": {
      const file = rest[1];
      if (!file) {
        throw new RecordArgError("Usage: teamagent record import <file> [--label <l>]");
      }
      const result = { sub: "import", filePath: file };
      for (let i = 2; i < rest.length; i++) {
        const a = rest[i];
        if (a === "--label" && rest[i + 1]) {
          result.label = rest[++i];
        } else if (a.startsWith("--label=")) {
          result.label = a.slice("--label=".length);
        }
      }
      return result;
    }
    default:
      throw new RecordArgError(
        `Unknown record subcommand: ${sub}. Use one of start|stop|import.`
      );
  }
}
function defaultListRecordingTemp(dir) {
  try {
    return readdirSync4(dir);
  } catch {
    return [];
  }
}
function findLatestRecordingId(recordingTempDir, list) {
  const names = list(recordingTempDir);
  const pidFiles = names.filter((n) => n.endsWith(".pid"));
  if (pidFiles.length === 0) return null;
  pidFiles.sort();
  const last = pidFiles[pidFiles.length - 1];
  return last.slice(0, -".pid".length);
}
function resolveDeps2(deps) {
  return {
    homedir: deps.homedir ?? osHomedir7,
    ulid: deps.ulid ?? defaultUlid4,
    print: deps.print ?? ((m) => process.stdout.write(m + "\n")),
    printErr: deps.printErr ?? ((m) => process.stderr.write(m + "\n")),
    ffmpegStart: deps.ffmpegStart ?? start,
    ffmpegStop: deps.ffmpegStop ?? stop,
    ffmpegImport: deps.ffmpegImport ?? importRecording,
    detectFfmpeg: deps.detectFfmpeg ?? detectFfmpegDefault,
    startDeps: deps.startDeps ?? {},
    stopDeps: deps.stopDeps ?? {},
    importDeps: deps.importDeps ?? {},
    listRecordingTemp: deps.listRecordingTemp ?? defaultListRecordingTemp
  };
}
function executeRecordStart(parsed, deps = {}) {
  const r = resolveDeps2(deps);
  const paths = digitalTwinPaths(r.homedir());
  try {
    mkdirSync10(paths.recordingTempDir, { recursive: true });
  } catch (err) {
    r.printErr(`record start: cannot create ${paths.recordingTempDir}: ${err instanceof Error ? err.message : String(err)}`);
    return { exitCode: 1 };
  }
  const id = parsed.id ?? r.ulid();
  const output = join12(paths.recordingTempDir, id);
  try {
    const result = r.ffmpegStart(
      { id, output },
      { detectFfmpeg: r.detectFfmpeg, ...r.startDeps }
    );
    r.print(
      `record: started id=${result.id} pid=${result.pid} output=${result.output}`
    );
    return { exitCode: 0 };
  } catch (err) {
    r.printErr(
      `record start failed: ${err instanceof Error ? err.message : String(err)}`
    );
    return { exitCode: 1 };
  }
}
async function executeRecordStop(parsed, deps = {}) {
  const r = resolveDeps2(deps);
  const paths = digitalTwinPaths(r.homedir());
  const id = parsed.id ?? findLatestRecordingId(paths.recordingTempDir, r.listRecordingTemp);
  if (!id) {
    r.printErr(
      "record stop: no --id provided and no active recording found in queue/recording_temp/"
    );
    return { exitCode: 1 };
  }
  const output = join12(paths.recordingTempDir, id);
  try {
    const result = await r.ffmpegStop({ id, output }, r.stopDeps);
    if (result.status === "stopped") {
      r.print(
        `record: stopped id=${id} payload=${result.payloadPath ?? "(unknown)"}`
      );
      return { exitCode: 0 };
    }
    r.printErr(
      `record stop: status=${result.status}${result.error ? ` error=${result.error}` : ""}`
    );
    return { exitCode: 1 };
  } catch (err) {
    r.printErr(
      `record stop failed: ${err instanceof Error ? err.message : String(err)}`
    );
    return { exitCode: 1 };
  }
}
async function executeRecordImport(parsed, deps = {}) {
  const r = resolveDeps2(deps);
  if (!parsed.filePath) {
    r.printErr("record import: missing <file> argument");
    return { exitCode: 1 };
  }
  const paths = digitalTwinPaths(r.homedir());
  try {
    mkdirSync10(paths.pendingDir, { recursive: true });
  } catch (err) {
    r.printErr(`record import: cannot create ${paths.pendingDir}: ${err instanceof Error ? err.message : String(err)}`);
    return { exitCode: 1 };
  }
  const id = r.ulid();
  const output = join12(paths.pendingDir, id);
  try {
    const result = r.ffmpegImport(
      { inputPath: parsed.filePath, output },
      { detectFfmpeg: r.detectFfmpeg, ...r.importDeps }
    );
    if (result.status === "imported") {
      r.print(
        `record: imported ${parsed.filePath} -> ${result.payloadPath ?? "(unknown)"}`
      );
      return { exitCode: 0 };
    }
    r.printErr(
      `record import: status=${result.status}${result.error ? ` error=${result.error}` : ""}`
    );
    return { exitCode: 1 };
  } catch (err) {
    r.printErr(
      `record import failed: ${err instanceof Error ? err.message : String(err)}`
    );
    return { exitCode: 1 };
  }
}
async function executeRecord(parsed, deps = {}) {
  switch (parsed.sub) {
    case "start":
      return executeRecordStart(parsed, deps);
    case "stop":
      return executeRecordStop(parsed, deps);
    case "import":
      return executeRecordImport(parsed, deps);
  }
}

// ../cli/src/commands/fixture-replay.ts
init_esm_shims();
var FixtureReplayArgError = class extends Error {
  constructor(message) {
    super(message);
    this.name = "FixtureReplayArgError";
  }
};
function parseFixtureReplayArgs(argv) {
  const subcommand = argv[0];
  if (subcommand !== "replay") {
    throw new FixtureReplayArgError(
      "fixture: expected subcommand 'replay'. Usage: teamagent fixture replay --tier=a [--scenario <id>] [--json]"
    );
  }
  const opts = { subcommand: "replay", tier: "a" };
  for (let i = 1; i < argv.length; i++) {
    const a = argv[i];
    if (a === "--tier") {
      opts.tier = parseTier(readValue(argv, ++i, "--tier"));
    } else if (a.startsWith("--tier=")) {
      opts.tier = parseTier(a.slice("--tier=".length));
    } else if (a === "--scenario" || a === "--slug") {
      opts.scenarioId = readValue(argv, ++i, a);
    } else if (a.startsWith("--scenario=")) {
      opts.scenarioId = readInlineValue(a, "--scenario");
    } else if (a.startsWith("--slug=")) {
      opts.scenarioId = readInlineValue(a, "--slug");
    } else if (a === "--json") {
      opts.json = true;
    } else if (a === "--help" || a === "-h") {
      throw new FixtureReplayArgError(renderFixtureReplayHelp());
    } else if (a.startsWith("--")) {
      throw new FixtureReplayArgError(`fixture replay: unknown flag "${a}"`);
    }
  }
  return opts;
}
function readValue(argv, index, flag) {
  const value = argv[index];
  if (!value || value.startsWith("--")) {
    throw new FixtureReplayArgError(`fixture replay: ${flag} requires a value`);
  }
  return value;
}
function readInlineValue(arg, flag) {
  const value = arg.slice(`${flag}=`.length);
  if (!value) {
    throw new FixtureReplayArgError(`fixture replay: ${flag} requires a value`);
  }
  return value;
}
function parseTier(value) {
  if (value === "a") return "a";
  throw new FixtureReplayArgError(
    `fixture replay: unsupported tier "${value}". This implementation currently supports --tier=a.`
  );
}
function renderFixtureReplayHelp() {
  return [
    "Usage: teamagent fixture replay --tier=a [--scenario <id>] [--json]",
    "",
    "Replays deterministic scenario fixtures through the existing TeamAgent",
    "three-phase harness: correction detection -> rule extraction -> intercept.",
    "",
    "Options:",
    "  --tier=a          Run the deterministic offline replay tier",
    "  --scenario ID     Run one scenario only, e.g. moment-dayjs",
    "  --slug ID         Alias for --scenario, matching ADR-0010 docs",
    "  --json            Print machine-readable JSON",
    ""
  ].join("\n");
}
async function executeFixtureReplay(opts) {
  const scenarios = opts.scenarioId ? allScenarios.filter((s) => s.id === opts.scenarioId) : allScenarios;
  if (opts.scenarioId && scenarios.length === 0) {
    throw new FixtureReplayArgError(
      `fixture replay: unknown scenario "${opts.scenarioId}"`
    );
  }
  const verify = await runVerify(scenarios, {
    detector: ruleBasedCorrectionDetector,
    extractor: llmBasedKnowledgeExtractor,
    makeStore: () => new InMemoryKnowledgeStore(),
    now: () => /* @__PURE__ */ new Date("2026-05-11T00:00:00Z")
  });
  const replayScenarios = verify.scenarios.map((s) => ({
    id: s.scenarioId,
    passed: s.passed,
    prr: s.prr,
    kp: s.kp,
    phases: {
      correctionDetected: s.phaseA.passed,
      ruleGenerated: s.phaseB.passed,
      interceptMatched: s.phaseC.passed,
      expectedBehavior: s.phaseC.expectedBehavior,
      actualBehavior: s.phaseC.actualBehavior
    }
  }));
  return {
    ok: verify.passed === verify.total,
    command: "fixture replay",
    tier: opts.tier,
    total: verify.total,
    passed: verify.passed,
    scenarios: replayScenarios
  };
}
function renderFixtureReplayResult(result) {
  const lines = [];
  lines.push("TeamAgent fixture replay");
  lines.push(`tier: ${result.tier}`);
  lines.push(`passed: ${result.passed}/${result.total}`);
  lines.push("");
  for (const s of result.scenarios) {
    const mark = s.passed ? "PASS" : "FAIL";
    lines.push(
      `${mark} ${s.id} PRR=${s.prr} KP=${s.kp.toFixed(2)} expected=${s.phases.expectedBehavior} actual=${s.phases.actualBehavior}`
    );
  }
  return lines.join("\n") + "\n";
}

// ../cli/src/bin.ts
function findPackageVersion() {
  let dir = path26.dirname(fileURLToPath4(import.meta.url));
  let workspaceRoot = null;
  for (let i = 0; i < 8; i++) {
    if (!workspaceRoot && (fs23.existsSync(path26.join(dir, "pnpm-workspace.yaml")) || fs23.existsSync(path26.join(dir, "packages", "teamagent", "package.json")))) {
      workspaceRoot = dir;
    }
    const pkgPath = path26.join(dir, "package.json");
    if (fs23.existsSync(pkgPath)) {
      try {
        const pkg = JSON.parse(fs23.readFileSync(pkgPath, "utf-8"));
        if (pkg.name === "teamagent" && pkg.bin?.["teamagent"] && pkg.version) {
          return pkg.version;
        }
      } catch {
      }
    }
    const next = path26.dirname(dir);
    if (next === dir) break;
    dir = next;
  }
  if (workspaceRoot) {
    try {
      const tpkgPath = path26.join(workspaceRoot, "packages", "teamagent", "package.json");
      const tpkg = JSON.parse(fs23.readFileSync(tpkgPath, "utf-8"));
      if (tpkg.version) return tpkg.version;
    } catch {
    }
  }
  return "unknown";
}
async function main() {
  const command = process.argv[2];
  const rawRest = process.argv.slice(3);
  const duckCliFlag = "--explain-like-ceo-duck";
  if (rawRest.includes(duckCliFlag)) {
    const envObj = globalThis.process.env;
    envObj["TEAMAGENT_EXPLAIN_LIKE_CEO_DUCK"] = "1";
  }
  const rest = rawRest.filter((a) => a !== duckCliFlag);
  switch (command) {
    case "--version":
    case "-V":
    case "version": {
      process.stdout.write(`${findPackageVersion()}
`);
      return;
    }
    case "skeleton-demo": {
      const output = await runSkeletonDemo();
      if (output) process.stdout.write(output + "\n");
      return;
    }
    case "m5-infect": {
      const opts = parseM5InfectArgs(rest);
      const result = await runM5Infect(opts);
      process.stdout.write(renderM5InfectResult(result) + "\n");
      return;
    }
    case "m5-bootstrap": {
      const opts = parseM5BootstrapArgs(rest);
      try {
        const result = await runM5Bootstrap(opts);
        const { output, exitCode } = renderM5BootstrapResult(result);
        process.stdout.write(output + "\n");
        if (exitCode !== 0) process.exit(exitCode);
      } catch (err) {
        process.stderr.write(
          `[m5-bootstrap] ${err instanceof Error ? err.message : String(err)}
`
        );
        process.exit(2);
      }
      return;
    }
    case "m5-share": {
      const opts = parseM5ShareArgs(rest);
      if (!opts.text) {
        process.stderr.write(
          '[m5-share] \u5FC5\u987B\u63D0\u4F9B --text "<\u89C4\u5219\u6587\u672C>"\n'
        );
        process.exit(1);
      }
      try {
        const result = await runM5Share(opts);
        process.stdout.write(renderM5ShareResult(result) + "\n");
      } catch (err) {
        const { M5ShareValidationError } = await import("./m5-share-CWGKOMSC.js");
        if (err instanceof M5ShareValidationError) {
          process.stderr.write(`[m5-share] ${err.message}
`);
          process.exit(2);
        }
        throw err;
      }
      return;
    }
    case "m5-sync": {
      const opts = parseM5SyncArgs(rest);
      const result = await runM5Sync(opts);
      process.stdout.write(renderM5SyncResult(result) + "\n");
      return;
    }
    case "m5-delete": {
      const opts = parseM5DeleteArgs(rest);
      if (!opts.ruleId) {
        process.stderr.write("[m5-delete] \u5FC5\u987B\u63D0\u4F9B --rule-id <id>\n");
        process.exit(1);
      }
      try {
        const result = await runM5Delete(opts);
        process.stdout.write(renderM5DeleteResult(result) + "\n");
      } catch (err) {
        const { M5DeleteValidationError } = await import("./m5-delete-ZFIDYXUY.js");
        if (err instanceof M5DeleteValidationError) {
          process.stderr.write(`[m5-delete] ${err.message}
`);
          process.exit(2);
        }
        throw err;
      }
      return;
    }
    case "m5-status": {
      const opts = parseM5StatusArgs(rest);
      const result = await runM5Status(opts);
      process.stdout.write(renderM5StatusResult(result) + "\n");
      return;
    }
    case "m5-publish": {
      const opts = parseM5PublishArgs(rest);
      const result = await runM5Publish(opts);
      process.stdout.write(renderM5PublishResult(result) + "\n");
      return;
    }
    case "pitfall": {
      let nonInteractive;
      try {
        nonInteractive = parsePitfallArgs(rest);
      } catch (err) {
        const { PitfallValidationError } = await import("./pitfall-MLJNISMU.js");
        if (err instanceof PitfallValidationError) {
          process.stderr.write(err.message + "\n");
          process.exit(2);
        }
        throw err;
      }
      const output = nonInteractive ? await executePitfall(nonInteractive) : await runPitfallInteractive();
      if (output) process.stdout.write(output + "\n");
      return;
    }
    case "stats": {
      const statsOpts = {};
      for (let i = 0; i < rest.length; i++) {
        const a = rest[i];
        if (a === "--stuck-in-promotion") {
          statsOpts.stuckInPromotion = true;
        } else if (a === "--explain" && rest[i + 1]) {
          statsOpts.explain = rest[++i];
        } else if (a.startsWith("--explain=")) {
          statsOpts.explain = a.slice("--explain=".length);
        } else if (a.startsWith("--stuck-days=")) {
          const v = parseInt(a.slice("--stuck-days=".length), 10);
          if (isNaN(v) || v < 0) {
            process.stderr.write(`--stuck-days \u5FC5\u987B\u662F\u6B63\u6574\u6570\uFF0C\u6536\u5230: "${a.slice("--stuck-days=".length)}"
`);
            process.exit(1);
          }
          statsOpts.stuckDays = v;
        } else if (a === "--override-signals") {
          statsOpts.overrideSignals = true;
        }
      }
      process.stdout.write(executeStats(statsOpts));
      return;
    }
    case "try": {
      const { executeTry } = await import("./try-Q6XVQIQG.js");
      if (rest.includes("--help") || rest.includes("-h")) {
        const r2 = await executeTry({ help: true });
        process.stdout.write(r2.output);
        process.exit(r2.exitCode);
      }
      const r = await executeTry({});
      process.stdout.write(r.output);
      process.exit(r.exitCode);
    }
    case "demo": {
      const sub = rest[0];
      if (sub === "hook") {
        const opts = parseDemoHookArgs(rest.slice(1));
        if (!opts) {
          process.stderr.write(
            `\u7528\u6CD5: teamagent demo hook <tool> <key=value>... \u4F8B: teamagent demo hook Bash 'command=npm install moment'
\u591A\u5B57\u6BB5\uFF1A\u7528\u7A7A\u683C\u5206\u9694\u591A\u4E2A 'key=value' \u69FD\u4F4D\uFF0C\u6216\u4F20\u5355\u4E2A JSON \u5BF9\u8C61\uFF0C\u4F8B: teamagent demo hook Write '{"file_path":"a.js","content":"hi"}'
`
          );
          process.exit(1);
        }
        process.stdout.write(executeDemoHook(opts).output);
        return;
      }
      const { parseDemoArgs, executeDemo } = await import("./demo-26ZCGNPW.js");
      const demoArgs = parseDemoArgs(rest);
      const r = await executeDemo(demoArgs);
      process.stdout.write(r.output);
      if (r.exitCode !== 0) process.exit(r.exitCode);
      return;
    }
    case "install-hook": {
      const r = installHook();
      if (r.alreadyInstalled) {
        process.stdout.write(
          `\u2713 Hook \u5DF2\u5B89\u88C5\uFF08\u65E0\u53D8\u5316\uFF09: ${r.settingsPath}
  \u5165\u53E3: ${r.hookEntry}
`
        );
      } else {
        process.stdout.write(
          `\u2705 Hook \u5DF2\u6CE8\u518C\u5230 Claude Code: ${r.settingsPath}
  \u5165\u53E3: ${r.hookEntry}
  \u4E0B\u6B21\u5F00 Claude Code \u65F6\u751F\u6548\u3002\u53EF\u7528 'teamagent demo hook ...' \u79BB\u7EBF\u6D4B\u8BD5\u3002
`
        );
      }
      return;
    }
    case "uninstall-hook": {
      const r = uninstallHook();
      if (r.removed) {
        process.stdout.write(`\u2705 Hook \u5DF2\u79FB\u9664: ${r.settingsPath}
`);
      } else {
        process.stdout.write(`\u672A\u627E\u5230 TeamAgent hook \u6CE8\u518C\u3002\u65E0\u9700\u79FB\u9664\u3002
`);
      }
      return;
    }
    case "install-user-hook": {
      if (rest.includes("--dry-run")) {
        process.stderr.write(
          `install-user-hook \u4E0D\u652F\u6301 --dry-run\uFF08\u8BE5\u547D\u4EE4\u76F4\u63A5\u4FEE\u6539 ~/.claude/settings.json\uFF09\u3002
\u5982\u9700\u67E5\u770B\u6CE8\u518C\u8DEF\u5F84\uFF0C\u5148\u8FD0\u884C: teamagent install-user-hook \u540E\u7528 cat ~/.claude/settings.json \u67E5\u770B\uFF0C\u6216\u7528 teamagent uninstall-user-hook \u64A4\u9500\u3002
`
        );
        process.exit(2);
      }
      const r = installUserHook();
      if (r.alreadyInstalled) {
        process.stdout.write(
          `\u2713 \u7528\u6237\u7EA7 SessionStart hook \u5DF2\u5B89\u88C5 (\u65E0\u53D8\u5316): ${r.settingsPath}
`
        );
      } else {
        process.stdout.write(
          `\u2705 \u7528\u6237\u7EA7 SessionStart hook \u5DF2\u6CE8\u518C: ${r.settingsPath}
` + (r.backupPath ? `   \u539F\u914D\u7F6E\u5DF2\u5907\u4EFD: ${r.backupPath}
` : "") + `   \u5165\u53E3: ${r.hookEntry}
   \u6253\u5F00\u4EFB\u4F55\u65B0\u9879\u76EE\u65F6\u5C06\u81EA\u52A8\u68C0\u6D4B\u5E76 init
`
        );
      }
      return;
    }
    case "uninstall-user-hook": {
      if (rest.includes("--dry-run")) {
        process.stderr.write(
          `uninstall-user-hook \u4E0D\u652F\u6301 --dry-run\uFF08\u8BE5\u547D\u4EE4\u76F4\u63A5\u4FEE\u6539 ~/.claude/settings.json\uFF09\u3002
`
        );
        process.exit(2);
      }
      const r = uninstallUserHook();
      if (r.removed) {
        process.stdout.write(`\u2705 \u7528\u6237\u7EA7 SessionStart hook \u5DF2\u79FB\u9664: ${r.settingsPath}
`);
      } else {
        process.stdout.write(`\u672A\u627E\u5230\u7528\u6237\u7EA7 SessionStart hook\uFF0C\u65E0\u9700\u79FB\u9664
`);
      }
      return;
    }
    case "analyze": {
      const opts = parseAnalyzeArgs(rest);
      const output = await executeAnalyze(opts);
      process.stdout.write(output);
      return;
    }
    case "review": {
      const opts = parseReviewArgs(rest);
      process.stdout.write(executeReview(opts));
      return;
    }
    case "init": {
      if (rest.includes("--help") || rest.includes("-h")) {
        process.stdout.write(
          "Usage: teamagent init [--dry-run] [--skip-import] [--skip-hook] [--skip-seed]\n                      [--skip-warmup] [--install-plugins]\n                      [--target=claude|codex|both] [--pack <all|name1,name2>]\n                      [--no-user-level-hook] [--force-nested-init]\n                      [--cwd=<path>] [--home=<path>]\n\nOptions:\n  --dry-run              Preview what init would do without making changes\n  --skip-import          Skip LLM-based rule import step\n  --skip-hook            Skip hook registration\n  --skip-seed            Skip bundled seed-rule injection\n  --skip-warmup          Skip embedding model warmup\n  --install-plugins      Also install team plugins (playground/code-review/code-simplifier/...)\n  --target=TARGET        claude (default), codex, or both\n  --pack=NAMES           Install stack packs without showing the agent prompt.\n                         NAMES may be 'all' or a comma-separated list (e.g. frontend-js,ops-safety).\n  --no-user-level-hook   Issue #161 escape hatch: do NOT register hooks in\n                         ~/.claude/settings.json. Default behaviour registers\n                         user-level hooks so cc launched from sub-directories\n                         still triggers TeamAgent (project DB resolved via walk-up).\n  --force-nested-init    Issue #161 escape hatch: allow `init` to create a\n                         child .teamagent/ even when an ancestor already has\n                         one. Default refuses to avoid duplicate state.\n  --cwd=<path>           Override target project dir (default: process.cwd()).\n                         Required for third-party judge harnesses that land init\n                         on a sandbox without `cd` (Feature \u2460 openable-and-usable).\n  --home=<path>          Override user home dir for state files / skills mirror\n                         (default: os.homedir()). Use together with --cwd to fully\n                         isolate a fresh-repo smoke run from existing TeamAgent state.\n\nScaffolds TeamAgent config in the current project:\n  - Creates .teamagent/ directory and initializes knowledge DB\n  - Injects meta-principles into global store\n  - Imports rules from CLAUDE.md / AGENTS.md / .cursorrules\n  - Registers Claude Code hook (PreToolUse) at project AND user level\n  - Exports compiled Skills\n\nRun teamagent doctor after init to verify the installation.\n"
        );
        return;
      }
      const opts = parseInitArgs(rest);
      const result = await executeInit(opts);
      process.stdout.write(renderInitResult(result));
      if (!result.ok) process.exit(1);
      return;
    }
    case "install-codex": {
      const opts = parseInitArgs(rest);
      const result = await executeInit({ ...opts, target: "codex" });
      process.stdout.write(renderInitResult(result));
      if (!result.ok) process.exit(1);
      return;
    }
    case "install": {
      const installArgs = parseInstallArgs(rest);
      if (installArgs.help) {
        process.stdout.write(renderInstallHelp());
        return;
      }
      if (installArgs.preview) {
        process.stdout.write(renderInstallPreviewOutput());
        return;
      }
      const result = await runInstall(installArgs);
      process.stdout.write(result.output);
      if (!result.ok) process.exit(1);
      return;
    }
    case "disable": {
      const r = disable();
      if (r.removed) {
        process.stdout.write(`\u2713 Hook \u5DF2\u7981\u7528: ${r.settingsPath}
  \u6570\u636E\u4FDD\u7559\uFF1B\u7528 'teamagent enable' \u6062\u590D
`);
      } else {
        process.stdout.write(`\u672A\u627E\u5230\u5DF2\u6CE8\u518C\u7684 TeamAgent hook\uFF0C\u65E0\u9700\u7981\u7528
`);
      }
      return;
    }
    case "enable": {
      const r = enable();
      if (r.alreadyInstalled) {
        process.stdout.write(`\u2713 Hook \u5DF2\u542F\u7528\uFF08\u65E0\u53D8\u5316\uFF09: ${r.settingsPath}
`);
      } else {
        process.stdout.write(`\u2705 Hook \u5DF2\u91CD\u65B0\u542F\u7528: ${r.settingsPath}
  \u4E0B\u6B21\u5F00 Claude Code \u65F6\u751F\u6548
`);
      }
      return;
    }
    case "uninstall": {
      let opts;
      try {
        opts = parseUninstallArgs(rest);
      } catch (err) {
        const { UninstallArgError } = await import("./uninstall-E34S3Q37.js");
        if (err instanceof UninstallArgError) {
          process.stderr.write(err.message + "\n");
          process.exit(2);
        }
        throw err;
      }
      const r = uninstall(opts);
      process.stdout.write(renderUninstallResult(r));
      return;
    }
    case "calibrate": {
      let opts;
      try {
        opts = parseCalibrateArgs(rest);
      } catch (err) {
        const { CalibrateArgError } = await import("./calibrate-WWLPJPPV.js");
        if (err instanceof CalibrateArgError) {
          process.stderr.write(err.message + "\n");
          process.exit(2);
        }
        throw err;
      }
      const r = await executeCalibrate(opts);
      process.stdout.write(renderCalibrateResult(r));
      return;
    }
    case "verify": {
      let opts;
      try {
        opts = parseVerifyArgs(rest);
      } catch (err) {
        const { VerifyArgError } = await import("./verify-IMB4RCYN.js");
        if (err instanceof VerifyArgError) {
          process.stderr.write(err.message + "\n");
          process.exit(2);
        }
        throw err;
      }
      const { result, reportPath } = await executeVerify(opts);
      process.stdout.write(renderVerifyTerminal(result));
      if (reportPath) {
        process.stdout.write(`
\u{1F4C4} \u8BE6\u7EC6\u62A5\u544A: ${reportPath}
`);
      }
      if (result.passed !== result.total) process.exit(1);
      return;
    }
    case "e2e-evaluate": {
      const opts = parseE2EEvaluateArgs(rest);
      const result = await executeE2EEvaluate(opts);
      if (opts.json) {
        process.stdout.write(JSON.stringify(result, null, 2) + "\n");
      } else {
        process.stdout.write(renderE2EEvaluateResult(result));
      }
      if (!result.ok) process.exit(1);
      return;
    }
    case "ingest": {
      let opts;
      try {
        opts = parseIngestArgs(rest);
      } catch (err) {
        process.stderr.write(
          `${err instanceof Error ? err.message : String(err)}
`
        );
        process.exit(1);
        return;
      }
      const output = await executeIngest(opts);
      if (output.startsWith("\u2717")) {
        process.stderr.write(output);
        process.exit(1);
        return;
      }
      process.stdout.write(output);
      return;
    }
    case "dogfood-report": {
      if (rest.includes("--help") || rest.includes("-h")) {
        process.stdout.write(
          "Usage: teamagent dogfood-report [--output=path]\n\nOptions:\n  --output=PATH    Write report to PATH (default: docs/dogfood/\u81EA\u4E3E\u62A5\u544A.md)\n\nScans events.db + knowledge.db + git log to generate a self-bootstrapping\ndogfood report. Shows knowledge stats, hook interventions, top fired rules,\nand confidence changes across all sandbox tiers.\n\nTier isolation: operates on current sandbox state without crossing tier\nboundaries. Use --output to redirect to a different path.\n"
        );
        return;
      }
      const opts = parseDogfoodReportArgs(rest);
      const r = await executeDogfoodReport(opts);
      process.stdout.write(
        `\u{1F4CA} \u81EA\u4E3E\u62A5\u544A\u751F\u6210: ${r.outputPath}
  ${r.totalEntries} \u6761\u77E5\u8BC6 / ${r.totalEvents} \u4E2A\u4E8B\u4EF6 / ${r.archivedCount} \u81EA\u52A8\u5F52\u6863
`
      );
      return;
    }
    case "bug-report": {
      if (rest.includes("--help") || rest.includes("-h")) {
        process.stdout.write(
          "Usage: teamagent bug-report [--out=path] [--stdout]\n\nOptions:\n  --out=PATH       Write report to PATH (default: ~/.teamagent/bug-reports/...md)\n  --stdout         Print report to stdout instead of writing to file\n\nGenerates a diagnostic bug report with system info, tool versions,\nhook config, and raw logs. Attach to GitHub issues when reporting\nfirst-install or hook failures. Secrets are auto-redacted.\n\nIncludes: system info, how-to-reproduce steps, raw logs (auto-redacted).\n"
        );
        return;
      }
      const opts = parseBugReportArgs(rest);
      const result = await executeBugReport({
        ...opts,
        cwd: process.cwd(),
        teamagentVersion: findPackageVersion()
      });
      if (opts.stdout) {
        process.stdout.write(result.markdown);
      } else {
        process.stdout.write(
          `Bug report written: ${result.outputPath}
Attach this file when reporting first-install or hook failures.
`
        );
      }
      return;
    }
    case "dashboard": {
      if (rest.includes("--help") || rest.includes("-h")) {
        process.stdout.write(
          "Usage: teamagent dashboard [--watch|--once] [--host=127.0.0.1] [--port=8787] [--interval=2s] [--open]\n\nOptions:\n  --watch          Start HTTP server; regenerate dashboard on interval (default)\n  --once           Generate docs/dashboard.html once and exit\n  --open           Open browser after server starts\n  --host=HOST      Bind host (default 127.0.0.1)\n  --port=PORT      Port (default 8787)\n  --interval=DUR   Refresh interval, e.g. 2s, 500ms (default 2s)\n\nDashboard shows VERIFIED / PLANNED feature status and live rule/event stats.\n"
        );
        return;
      }
      try {
        const opts = parseDashboardArgs(rest);
        const result = await launchDashboard(opts);
        process.stdout.write(renderDashboardLaunch(result));
      } catch (err) {
        if (err instanceof DashboardArgsError) {
          process.stderr.write(
            `${err.message}
Usage: teamagent dashboard [--watch|--once] [--host=127.0.0.1] [--port=8787] [--interval=2s] [--open]
`
          );
          process.exit(2);
        }
        throw err;
      }
      return;
    }
    case "recording": {
      try {
        const opts = parseRecordingArgs(rest);
        const result = await executeRecording({ ...opts, cwd: process.cwd() });
        process.stdout.write(renderRecordingResult(result));
      } catch (err) {
        process.stderr.write(`${err instanceof Error ? err.message : String(err)}
`);
        process.exit(2);
      }
      return;
    }
    case "pack": {
      if (rest.length === 0 || rest.includes("--help") || rest.includes("-h")) {
        process.stdout.write(
          "Usage:\n  teamagent pack list [--json]\n  teamagent pack add <names>      e.g. pack add frontend-js,ops-safety\n  teamagent pack remove <names>\n\nManages stack packs (per ADR 0002 \u2014 agent-driven detection).\nPack rules are written to ~/.teamagent/global.db with tag pack:<name>.\n"
        );
        return;
      }
      let args;
      try {
        args = parsePackArgs(rest);
      } catch (err) {
        process.stderr.write(
          `${err instanceof Error ? err.message : String(err)}
`
        );
        process.exit(2);
        return;
      }
      if (args.sub === "list") {
        const result = executePackList({});
        process.stdout.write(renderPackList(result, args.json));
        return;
      }
      if (args.sub === "add") {
        const result = executePackAdd(args.names, {});
        process.stdout.write(renderPackAdd(result));
        const code = packAddExitCode(result);
        if (code !== 0) process.exit(code);
        return;
      }
      if (args.sub === "remove") {
        const result = executePackRemove(args.names, {});
        process.stdout.write(renderPackRemove(result));
        return;
      }
      return;
    }
    case "digital-twin": {
      if (rest.length === 0 || rest.includes("--help") || rest.includes("-h")) {
        process.stdout.write(
          "Usage:\n  teamagent digital-twin login <token>     Save the bearer token to ~/.teamagent/digital-twin.json\n  teamagent digital-twin logout            Clear uploader.token\n  teamagent digital-twin status            Show config + queue + daemon status\n  teamagent digital-twin pause             Disable uploader (uploader.enabled=false)\n  teamagent digital-twin resume            Enable uploader (uploader.enabled=true)\n  teamagent digital-twin inject-mock       Write a synthetic transcript and tap it (end-to-end smoke test)\n         [--cwd <path>] [--session-id <id>]\n\nManages the TeamBrain Digital Twin sidecar configuration in ~/.teamagent/.\n"
        );
        return;
      }
      let parsed;
      try {
        parsed = parseDigitalTwinArgs(rest);
      } catch (err) {
        if (err instanceof DigitalTwinArgError) {
          process.stderr.write(err.message + "\n");
          process.exit(2);
        }
        throw err;
      }
      const result = await executeDigitalTwin(parsed);
      if (result.exitCode !== 0) process.exit(result.exitCode);
      return;
    }
    case "record": {
      if (rest.length === 0 || rest.includes("--help") || rest.includes("-h")) {
        process.stdout.write(
          "Usage:\n  teamagent record start [--id <id>] [--label <l>]   Spawn ffmpeg detached, write pid sidecar to queue/recording_temp/\n  teamagent record stop  [--id <id>]                 SIGTERM ffmpeg, finalize ogg + metadata to queue/pending/\n  teamagent record import <file> [--label <l>]       Transcode to Opus/OGG and drop into queue/pending/\n\nRecords local work audio to ~/.teamagent/digital-twin/queue/ via ffmpeg.\nRequires ffmpeg on PATH; install hint printed on failure.\n"
        );
        return;
      }
      let parsed;
      try {
        parsed = parseRecordArgs(rest);
      } catch (err) {
        if (err instanceof RecordArgError) {
          process.stderr.write(err.message + "\n");
          process.exit(2);
        }
        throw err;
      }
      const result = await executeRecord(parsed);
      if (result.exitCode !== 0) process.exit(result.exitCode);
      return;
    }
    case "fixture": {
      try {
        if (rest.length === 0 || rest.includes("--help") || rest.includes("-h")) {
          process.stdout.write(renderFixtureReplayHelp());
          return;
        }
        const opts = parseFixtureReplayArgs(rest);
        const result = await executeFixtureReplay(opts);
        process.stdout.write(
          opts.json ? JSON.stringify(result, null, 2) + "\n" : renderFixtureReplayResult(result)
        );
        if (!result.ok) process.exit(1);
      } catch (err) {
        if (err instanceof FixtureReplayArgError) {
          process.stderr.write(err.message.endsWith("\n") ? err.message : err.message + "\n");
          process.exit(2);
        }
        throw err;
      }
      return;
    }
    case "compile": {
      let opts;
      try {
        opts = parseCompileArgs(rest);
      } catch (err) {
        const { CompileArgError } = await import("./compile-UKFHPHGN.js");
        if (err instanceof CompileArgError) {
          process.stderr.write(err.message + "\n");
          process.exit(2);
        }
        throw err;
      }
      const result = await executeCompile(opts);
      process.stdout.write(renderCompileResult(result, opts.dryRun));
      return;
    }
    case "compile-cursor": {
      const opts = parseCompileCursorArgs(rest);
      const result = await executeCompileCursor(opts);
      process.stdout.write(renderCompileCursorResult(result));
      return;
    }
    case "docs-propagate": {
      const opts = parseDocsPropagateArgs(rest);
      const result = await executeDocsPropagate(opts);
      process.stdout.write(renderDocsPropagationResult(result));
      if (!result.ok) process.exit(1);
      return;
    }
    case "config": {
      const sub = rest[0];
      const val = rest[1];
      if (!sub || sub !== "show" && sub !== "stop-mode") {
        console.error("Usage: teamagent config stop-mode <sync|async>");
        console.error("       teamagent config show");
        process.exit(1);
      }
      try {
        const out = executeConfig({ subcommand: sub, value: val });
        console.log(out);
      } catch (e) {
        console.error(String(e));
        process.exit(1);
      }
      break;
    }
    case "migrate-v6": {
      const { assertNoUnknownFlags, UnknownFlagError } = await import("./arg-utils-XGBSYGII.js");
      try {
        assertNoUnknownFlags("migrate-v6", rest, /* @__PURE__ */ new Set([
          "--dry-run",
          "--fast",
          "--repair-all",
          "--limit",
          "--db"
        ]));
      } catch (err) {
        if (err instanceof UnknownFlagError) {
          process.stderr.write(err.message + "\n");
          process.exit(2);
        }
        throw err;
      }
      const dryRun = rest.includes("--dry-run");
      const fast = rest.includes("--fast");
      const repairAll = rest.includes("--repair-all");
      const limitArg = rest.find((a) => a.startsWith("--limit="));
      const limit = limitArg ? Number(limitArg.split("=")[1]) : void 0;
      const dbArg = rest.find((a) => a.startsWith("--db="));
      const dbPath = dbArg ? dbArg.split("=").slice(1).join("=") : void 0;
      const { executeMigrateV6 } = await import("./migrate-v6-RK3M2XBD.js");
      const result = await executeMigrateV6({ dryRun, dbPath, limit, fast, repairAll });
      process.stdout.write(`migrated=${result.migrated} resurrected=${result.resurrected} skipped=${result.skipped}
`);
      return;
    }
    case "migrate-v7": {
      const { assertNoUnknownFlags, UnknownFlagError } = await import("./arg-utils-XGBSYGII.js");
      try {
        assertNoUnknownFlags("migrate-v7", rest, /* @__PURE__ */ new Set([
          "--dry-run",
          "--limit",
          "--db"
        ]));
      } catch (err) {
        if (err instanceof UnknownFlagError) {
          process.stderr.write(err.message + "\n");
          process.exit(2);
        }
        throw err;
      }
      const dryRun = rest.includes("--dry-run");
      const limitArg = rest.find((a) => a.startsWith("--limit="));
      const limit = limitArg ? parseInt(limitArg.split("=")[1], 10) : void 0;
      const dbArg = rest.find((a) => a.startsWith("--db="));
      const dbPath = dbArg ? dbArg.split("=").slice(1).join("=") : void 0;
      const { executeMigrateV7 } = await import("./migrate-v7-Z3MMUIGB.js");
      await executeMigrateV7({ dryRun, dbPath, limit, cwd: process.cwd() });
      return;
    }
    case "migrate": {
      const { assertNoUnknownFlags, UnknownFlagError } = await import("./arg-utils-XGBSYGII.js");
      try {
        assertNoUnknownFlags("migrate", rest, /* @__PURE__ */ new Set(["--dry-run"]));
      } catch (err) {
        if (err instanceof UnknownFlagError) {
          process.stderr.write(err.message + "\n");
          process.exit(2);
        }
        throw err;
      }
      const dryRun = rest.includes("--dry-run");
      const { executeMigrate } = await import("./migrate-v1-to-v2-FCAFODBT.js");
      const r = await executeMigrate({ dryRun });
      process.stdout.write(`Phase 1 \u2192 v2 \u8FC1\u79FB:
`);
      process.stdout.write(`  \u8BFB\u53D6\u6761\u76EE: ${r.readEntries}
`);
      process.stdout.write(`    personal: ${r.byScope.personal}
`);
      process.stdout.write(`    team: ${r.byScope.team}
`);
      process.stdout.write(`    global: ${r.byScope.global}
`);
      if (dryRun) {
        process.stdout.write(`
(dry-run \u6A21\u5F0F\uFF0C\u672A\u5199\u5165 SQLite)
`);
      } else {
        process.stdout.write(`  \u5199\u5165: ${r.written} \u6761; \u62D2\u7EDD: ${r.rejected} \u6761
`);
        if (r.rejectionLog.length > 0) {
          for (const entry of r.rejectionLog) {
            process.stderr.write(`  rejected ${entry.id}: ${entry.reason}
`);
          }
        }
      }
      return;
    }
    case "scan-errors": {
      const scanOpts = parseScanErrorsArgs(rest);
      const output = await executeScanErrors(scanOpts);
      if (output) process.stdout.write(output);
      return;
    }
    case "review-candidates": {
      const reviewOpts = parseReviewCandidatesArgs(rest);
      const output = await executeReviewCandidates(reviewOpts);
      if (output) process.stdout.write(output);
      return;
    }
    case "team-export": {
      const result = executeTeamExport(parseTeamExportArgs(rest));
      process.stdout.write(result.output);
      if (!result.ok) process.exit(1);
      return;
    }
    case "team-import": {
      const result = executeTeamImport(parseTeamImportArgs(rest));
      process.stdout.write(result.output);
      if (!result.ok) process.exit(1);
      return;
    }
    case "sync": {
      let syncArgs;
      try {
        syncArgs = parseGitSyncArgs(rest);
      } catch (err) {
        process.stderr.write(`${err instanceof Error ? err.message : String(err)}
`);
        process.exit(1);
        return;
      }
      const syncOpts = { ...syncArgs, cwd: syncArgs.cwd ?? process.cwd() };
      const syncResult = syncArgs.subcommand === "push" ? executeGitSyncPush(syncOpts) : executeGitSyncPull(syncOpts);
      process.stdout.write(syncResult.output + "\n");
      if (!syncResult.ok) process.exit(1);
      return;
    }
    case "pr-cycle": {
      if (rest.includes("--help") || rest.includes("-h")) {
        process.stdout.write(
          "Usage: teamagent pr-cycle [--pr=N] [--wait-ms=300000] [--dry-run]\n\nOptions:\n  --pr=N           Target existing PR number instead of creating one\n  --no-create      Skip PR creation; locate current branch PR\n  --wait-ms=N      Wait N ms before checking review (default 300000)\n  --dry-run        Preview commands without running them\n  --base=BRANCH    Base branch for new PR\n  --title=TITLE    PR title\n  --body=BODY      PR body\n\nCreates/locates a PR, waits, then checks review. Blocks if Codex review\nfinds issues requiring doc/rule updates before code changes.\n"
        );
        return;
      }
      let opts;
      try {
        opts = parsePrCycleArgs(rest);
      } catch (err) {
        process.stderr.write(`${err instanceof Error ? err.message : String(err)}
`);
        process.exit(1);
        return;
      }
      const result = await executePrCycle(opts);
      if (result.blocked) {
        process.stderr.write(result.output);
        process.exit(2);
        return;
      }
      process.stdout.write(result.output);
      return;
    }
    case "doctor": {
      if (rest.includes("--help") || rest.includes("-h")) {
        process.stdout.write(renderDoctorHelp());
        return;
      }
      const opts = parseDoctorArgs(rest);
      const result = await executeDoctor({ ...opts, cwd: opts.cwd ?? process.cwd() });
      if (opts.json) {
        process.stdout.write(JSON.stringify(result, null, 2) + "\n");
      } else if (!opts.postinstall || !result.allPassed) {
        process.stdout.write(renderDoctorResult(result));
      }
      if (!result.allPassed) process.exit(1);
      return;
    }
    case "install-plugins": {
      const opts = parseInstallPluginsArgs(rest);
      const result = await executeInstallPlugins(opts);
      process.stdout.write(renderInstallPluginsResult(result));
      if (!result.ok) process.exit(1);
      return;
    }
    case "warmup": {
      const { runWarmup } = await import("./warmup-BVYKLCUV.js");
      let stateFilePath;
      for (let i = 0; i < rest.length; i++) {
        if (rest[i] === "--write-state" && rest[i + 1]) {
          stateFilePath = rest[i + 1];
          i++;
        } else if (rest[i]?.startsWith("--write-state=")) {
          stateFilePath = rest[i].slice("--write-state=".length);
        }
      }
      const result = await runWarmup({ stateFilePath });
      process.exit(result.ok ? 0 : 1);
    }
    case "migrate-auto": {
      const { assertNoUnknownFlags, UnknownFlagError } = await import("./arg-utils-XGBSYGII.js");
      try {
        assertNoUnknownFlags("migrate-auto", rest, /* @__PURE__ */ new Set([]));
      } catch (err) {
        if (err instanceof UnknownFlagError) {
          process.stderr.write(err.message + "\n");
          process.exit(2);
        }
        throw err;
      }
      const { runMigrateAuto } = await import("./migrate-auto-PNP3F6GW.js");
      const r = await runMigrateAuto();
      process.stderr.write(JSON.stringify(r, null, 2) + "\n");
      process.exit(r.ok ? 0 : 1);
    }
    case "update": {
      const { runUpdateCommand, parseUpdateArgs } = await import("./update-4SFG3EAD.js");
      const { sub, rest: subRest } = parseUpdateArgs(rest);
      const r = await runUpdateCommand(sub, subRest);
      process.stdout.write(r.output);
      process.exit(r.ok ? 0 : 1);
    }
    case "whatsnew": {
      const { executeWhatsNew, parseWhatsNewArgs } = await import("./whatsnew-P54YQIUO.js");
      const opts = parseWhatsNewArgs(rest);
      const r = executeWhatsNew(opts);
      process.stdout.write(r.output);
      process.exit(r.ok ? 0 : 1);
    }
    case "pair": {
      const parsed = parsePairArgs(rest);
      if (parsed.subcommand === "capsule") {
        const result = executePairCapsule(parsed.options);
        process.stdout.write(renderPairCapsuleResult(result));
        return;
      }
      if (parsed.subcommand === "accept") {
        const result = executePairAccept(parsed.options);
        process.stdout.write(renderPairAcceptResult(result));
        return;
      }
      if (parsed.subcommand === "knock") {
        const opts = parsed.options;
        const result = executePairKnock(opts);
        if (opts.json) {
          process.stdout.write(JSON.stringify(result, null, 2) + "\n");
        } else {
          process.stdout.write(renderPairKnockResult(result));
        }
        if (!result.ok) process.exit(1);
        return;
      }
      const book = executePairList(parsed.options);
      if (parsed.options.json) {
        process.stdout.write(JSON.stringify(book, null, 2) + "\n");
      } else {
        process.stdout.write(renderPairList(book));
      }
      return;
    }
    case "reclassify": {
      if (rest.includes("--help") || rest.includes("-h") || rest[0] === "--help" || rest[0] === "-h") {
        process.stdout.write(
          "Usage:\n  teamagent reclassify apply --plan <path> [--dry-run] [--min-conf=0.7]\n  teamagent reclassify rollback --audit <audit-id>\n\nSubcommands:\n  apply      Apply a reclassification plan to rule channel/enforcement in knowledge.db\n  rollback   Reverse a previous apply using its audit-id\n\nOptions for apply:\n  --plan=PATH      JSON plan file produced by scripts/reclassify-rules.ts\n  --dry-run        Preview without writing to DB\n  --min-conf=N     Minimum confidence threshold (default 0.7)\n\nOptions for rollback:\n  --audit=ID       Audit-id from a previous apply\n\nReclassifies rules by scope, changing channel and enforcement fields.\n"
        );
        return;
      }
      const sub = rest[0];
      const subArgs = rest.slice(1);
      const { runReclassifyApply, runReclassifyRollback } = await import("./reclassify-OHWDWLR3.js");
      if (sub === "apply") {
        const planIdx = subArgs.findIndex((a) => a === "--plan");
        const planFile = planIdx >= 0 ? subArgs[planIdx + 1] : void 0;
        if (!planFile) {
          process.stderr.write("Usage: teamagent reclassify apply --plan <path> [--dry-run] [--min-conf=0.7]\n");
          process.exit(1);
        }
        const dryRun = subArgs.includes("--dry-run");
        const minConfArg = subArgs.find((a) => a.startsWith("--min-conf="));
        const minConfidence = minConfArg ? parseFloat(minConfArg.split("=")[1]) : 0.7;
        runReclassifyApply({ plan: planFile, dryRun, minConfidence });
        return;
      }
      if (sub === "rollback") {
        const auditIdx = subArgs.findIndex((a) => a === "--audit");
        const auditId = auditIdx >= 0 ? subArgs[auditIdx + 1] : void 0;
        if (!auditId) {
          process.stderr.write("Usage: teamagent reclassify rollback --audit <audit-id>\n");
          process.exit(1);
        }
        runReclassifyRollback({ auditId });
        return;
      }
      process.stderr.write(
        "Usage:\n  teamagent reclassify apply --plan <path> [--dry-run] [--min-conf=0.7]\n  teamagent reclassify rollback --audit <audit-id>\n"
      );
      process.exit(1);
      return;
    }
    case void 0: {
      const { runFirstRunWizard } = await import("./first-run-S66W5IEI.js");
      await runFirstRunWizard();
      return;
    }
    case "--help":
    case "-h":
    case "help": {
      process.stdout.write(
        [
          "teamagent \u2014 TeamAgent CLI",
          "",
          "\u7528\u6CD5:",
          "  teamagent try                    30 \u79D2\u4E00\u952E\u4F53\u9A8C\uFF1A\u4F9D\u6B21\u64AD\u653E 5 \u4E2A\u7ECF\u5178 hook \u62E6\u622A\u573A\u666F\uFF08\u9996\u6B21\u5B89\u88C5\u63A8\u8350\u5165\u53E3\uFF09",
          "  teamagent skeleton-demo          M0 Walking Skeleton \u6F14\u793A",
          "  teamagent m5-infect [--project-root=<path>] [--author=<name>]",
          "                                   [M5-A] \u628A TeamAgent \u75C5\u6BD2\u5F0F\u5951\u7EA6\u5199\u5165\u9879\u76EE\uFF08\u5E42\u7B49\uFF09",
          "  teamagent m5-bootstrap [--project-root=<path>] [--check]",
          "                                   [M5-A] \u8BFB\u9879\u76EE manifest\uFF0C\u62A5\u544A\u672C\u673A\u4E0E\u5951\u7EA6\u7684\u5DEE\u5F02",
          '  teamagent m5-share [--project-root=<path>] --text="<\u89C4\u5219\u6587\u672C>" [--rule-id=<id>] [--scope=personal|team] [--author=<n>]',
          "                                   [M5-B] \u8DD1\u95F8\u95E8 1+2 \u51B3\u5B9A\u89C4\u5219\u5F52\u5BBF\uFF1Bshareable \u7684\u5199\u5230 .teamagent/team/",
          "  teamagent m5-sync [--project-root=<path>]",
          "                                   [M5-C] \u8BFB .teamagent/team/ \u6240\u6709 claim\uFF0CLWW \u5408\u5E76\u62A5\u544A\u56E2\u961F\u89C4\u5219\u96C6",
          "  teamagent m5-delete --rule-id=<id> [--by=<n>] [--reason=<text>]",
          "                                   [M5-C] \u5199 tombstone\uFF08\u4EFB\u610F\u4EBA\u5220\u4EFB\u610F\u89C4\u5219\uFF09",
          "  teamagent m5-status [--project-root=<path>]",
          "                                   [M5-D] \u7EFC\u5408\u9762\u677F\uFF1A\u5951\u7EA6 + \u672C\u673A diff + \u56E2\u961F\u89C4\u5219\u96C6\u7EDF\u8BA1",
          "  teamagent m5-publish [--project-root=<path>] [--push]",
          "                                   [M5-E] \u81EA\u52A8 commit .teamagent/team/ \u5F85\u53D8\u5316\uFF08--push \u540C\u65F6\u63A8 origin\uFF09",
          "  teamagent pitfall                \u624B\u52A8\u8BB0\u5F55\u4E00\u6761\u8E29\u5751\u7ECF\u9A8C (\u4EA4\u4E92)",
          "  teamagent pitfall --non-interactive --trigger=... --wrong=... --correct=... --reason=...",
          "                                   \u975E\u4EA4\u4E92\u6A21\u5F0F (\u53EF\u9009: --category=C|E|S|K --tags=a,b --level=personal|team|global --nature=objective|subjective)",
          "  teamagent stats [--stuck-in-promotion] [--stuck-days=N] [--explain=<id>]",
          "                                   \u5C55\u793A\u77E5\u8BC6\u5E93\u7EDF\u8BA1\uFF1B--stuck-in-promotion \u5217\u51FA\u5361\u5728 probation \u8D85 N \u5929\u7684\u89C4\u5219",
          `  teamagent demo hook <tool> <k=v>...    [advanced] \u79BB\u7EBF\u6A21\u62DF PreToolUse hook\uFF08\u591A\u5B57\u6BB5\u8BF7\u7528\u7A7A\u683C\u5206\u9694\u591A\u4E2A slot\uFF0C\u6216\u4F20\u5355\u4E2A JSON\uFF1A'{"file_path":"a","content":"b"}'\uFF09`,
          "                                   \u4F8B\uFF1Ateamagent demo hook Bash 'command=npm install moment'",
          "                                   \u4F8B\uFF1Ateamagent demo hook Write file_path=a.js content='console.log(1)'",
          "  teamagent install-hook           \u628A PreToolUse hook \u6CE8\u518C\u5230\u5F53\u524D\u9879\u76EE .claude/settings.local.json",
          "  teamagent uninstall-hook         \u79FB\u9664 PreToolUse hook \u6CE8\u518C",
          "  teamagent install-user-hook      \u628A SessionStart hook \u6CE8\u518C\u5230 ~/.claude/settings.json",
          "                                   (\u6253\u5F00\u4EFB\u4F55\u65B0\u9879\u76EE\u65F6\u81EA\u52A8 init, \u4E00\u6B21\u88C5\u6C38\u4E45\u751F\u6548)",
          "  teamagent uninstall-user-hook    \u79FB\u9664\u7528\u6237\u7EA7 SessionStart hook \u6CE8\u518C",
          "  teamagent analyze [--session=<id|path>] [--verbose] [--commit]",
          "                                   \u5206\u6790 Claude Code \u4F1A\u8BDD\u65E5\u5FD7\uFF0C\u8BC6\u522B\u7EA0\u6B63\u65F6\u523B+\u6210\u529F\u4FE1\u53F7",
          "                                   --commit: \u901A\u8FC7 LLM \u63D0\u53D6\u6210\u77E5\u8BC6\u6761\u76EE\u5E76\u5199\u5165\u77E5\u8BC6\u5E93 + \u66F4\u65B0 Skills + \u8C03\u5EA6 docs propagation",
          "  teamagent review [N] [--scope=personal|team|global]",
          "                                   \u5217\u51FA\u6700\u8FD1 N \u6761\u77E5\u8BC6\uFF08\u9ED8\u8BA4 10\uFF09\uFF0C\u4F9B\u4EBA\u5DE5\u590D\u6838",
          "  teamagent init [--dry-run] [--skip-import] [--skip-hook] [--install-plugins] [--target=claude|codex|both]",
          "                                   \u4E00\u952E\u5B89\u88C5\u5230\u5F53\u524D\u9879\u76EE\uFF1A\u5EFA\u76EE\u5F55 + \u6CE8\u5165\u5143\u539F\u5219 + \u5BFC\u5165\u5DF2\u6709\u89C4\u5219 + \u6CE8\u518C Hook + \u5BFC\u51FA Skills",
          "                                   \u9ED8\u8BA4 target=claude\uFF1Bcodex \u4F1A\u521B\u5EFA .codex/skills \u8F6F\u94FE\u63A5\u4E14\u4E0D\u6CE8\u518C Claude hook",
          "                                   --install-plugins: \u540C\u65F6\u6CE8\u518C\u56E2\u961F\u6807\u914D\u63D2\u4EF6\uFF08opt-in\uFF0C\u6539\u5199\u7528\u6237\u5168\u5C40 settings\uFF09",
          "  teamagent install-codex [--dry-run] [--skip-import]",
          "                                   Codex \u5FEB\u6377\u5B89\u88C5\uFF1A\u5BFC\u51FA Skills\uFF0C\u5E76\u521B\u5EFA .codex/skills \u8F6F\u94FE\u63A5",
          "  teamagent doctor [--fix [--dry-run]] [--json] [--cwd=<path>] [--help]",
          "                                   \u8BCA\u65AD\u5B89\u88C5\u73AF\u5883\uFF08Node\u7248\u672C/Claude Code/sqlite-vec/Hook/CLAUDE.md\uFF09",
          "                                   --fix: \u81EA\u52A8\u4FEE\u590D\u80FD\u4FEE\u7684\u9879\uFF1B\u5199 CLAUDE.md \u524D\u5148\u5907\u4EFD\u5230 ~/.teamagent/backups/",
          "                                          - \u65E7\u7248 TEAMAGENT:START \u751F\u6210\u5757\uFF08\u5265\u79BB\uFF09",
          "                                          - \u77E5\u8BC6\u5E93\u672A\u521D\u59CB\u5316\uFF08teamagent init\uFF09",
          "                                          - hook \u672A\u6CE8\u518C\uFF08teamagent install-hook\uFF09",
          "                                          \u914D --dry-run \u9884\u89C8 unified diff\uFF0C\u4E0D\u5199\u5165\uFF1B\u8BE6\u7EC6\u5E2E\u52A9\u89C1 `teamagent doctor --help`",
          "                                   --json: \u8F93\u51FA\u673A\u5668\u53EF\u8BFB JSON\uFF08\u542B fixOutcomes \u4E0E dryRun \u5B57\u6BB5\uFF09",
          "  teamagent install-plugins [--dry-run] [--only=a,b] [--scope=user|project|local]",
          "                                   \u6CE8\u518C\u56E2\u961F\u6807\u914D plugins\uFF08\u4E0E .claude/settings.json:enabledPlugins \u540C\u6B65\uFF09",
          "                                   \u901A\u8FC7 'claude plugin marketplace add' + 'claude plugin install' \u8C03 CC CLI",
          "                                   \u9ED8\u8BA4\u88C5\u5168\u90E8\uFF1B--only \u9650\u5B9A\u5B50\u96C6\uFF1B--dry-run \u53EA\u9884\u89C8",
          "  teamagent pair capsule --name=<device> --host=<host> [--user=<user>] [--out=<file>]",
          "                                   \u751F\u6210\u77ED\u671F teammate \u914D\u5BF9\u80F6\u56CA\uFF08\u4E0D\u5305\u542B SSH \u79C1\u94A5\uFF09",
          "  teamagent pair accept <capsule-file|token> [--local-name=<device>]",
          "                                   \u63A5\u53D7\u80F6\u56CA\uFF0C\u5199\u5165 peer \u8D26\u672C\u3001SSH config \u53D7\u7BA1\u5757\u548C\u6536\u636E",
          "  teamagent pair knock <peer> [--json] [--simulate]",
          "                                   \u901A\u8FC7 SSH \u9A8C\u8BC1\u914D\u5BF9\uFF1B--simulate \u7528\u4E8E\u79BB\u7EBF\u9A8C\u6536",
          "  teamagent pair list              \u5217\u51FA\u5DF2\u914D\u5BF9 teammate",
          "  teamagent disable                \u4E34\u65F6\u7981\u7528 Hook\uFF08\u4FDD\u7559\u6570\u636E\uFF09",
          "  teamagent enable                 \u91CD\u65B0\u542F\u7528 Hook",
          "  teamagent uninstall [--delete-data] [--dry-run]",
          "                                   \u5B8C\u5168\u5378\u8F7D\uFF1A\u79FB\u9664 Hook \u6CE8\u518C + \u6E05\u6389 CLAUDE.md \u533A\u5757\uFF1B\u52A0 --delete-data \u540C\u65F6\u6E05\u6570\u636E",
          "  teamagent calibrate [--days=7] [--dry-run]",
          "                                   \u6839\u636E events.jsonl \u91CD\u7B97 confidence + \u81EA\u52A8\u5F52\u6863\u4F4E\u5206\u6761\u76EE",
          "  teamagent verify [--report=path]",
          "                                   \u8DD1 5 \u4E2A\u9A8C\u8BC1\u573A\u666F\uFF08\u8E29\u5751\u2192\u5B66\u4E60\u2192\u907F\u5751\uFF09\uFF0C\u8F93\u51FA PRR/KP \u6307\u6807",
          "  teamagent e2e-evaluate [--json] [--keep-temp]",
          "                                   \u771F\u5B9E SQLite + analyze + compile + PreToolUse \u6D4B\u8BC4\u5B66\u4E60\u3001\u89E6\u53D1\u3001\u8BEF\u89E6\u53D1\u548C\u65B0\u6210\u5458\u53EF\u89C1\u6027",
          "  teamagent recording --help",
          "                                   Recording Memory \u5BFC\u5165\u3001\u68C0\u7D22\u3001\u6CE8\u5165\u3001\u6307\u6807\u548C golden benchmark",
          "  teamagent dogfood-report [--output=path]",
          "                                   \u626B events.jsonl + knowledge.jsonl + git log\uFF0C\u81EA\u52A8\u751F\u6210\u81EA\u4E3E\u62A5\u544A",
          "  teamagent bug-report [--out=path] [--stdout]",
          "                                   \u751F\u6210\u53EF\u9644\u5230 issue \u7684\u8BCA\u65AD\u62A5\u544A\uFF1A\u7CFB\u7EDF\u4FE1\u606F + hook \u914D\u7F6E + \u539F\u59CB\u65E5\u5FD7\uFF08\u81EA\u52A8\u8131\u654F\uFF09",
          "  teamagent dashboard --watch [--open] [--port=8787] [--interval=2s]",
          "                                   \u542F\u52A8\u5B9E\u65F6 HTML dashboard\uFF1A\u751F\u6210 docs/dashboard.html\uFF0C\u5468\u671F\u5237\u65B0\u771F\u5B9E\u89C4\u5219/\u4E8B\u4EF6\u6570\u636E\u5E76\u672C\u5730\u670D\u52A1",
          "  teamagent dashboard --once",
          "                                   \u53EA\u751F\u6210\u4E00\u6B21 docs/dashboard.html\uFF0C\u4E0D\u542F\u52A8\u670D\u52A1\u5668",
          "  teamagent compile [--dry-run] [--skills-only] [--markdown-only] [--force] [--legacy-claude-md] [--target=claude|codex|both]",
          "                                   \u7F16\u8BD1 Agent Skills (stable+)\uFF1BCLAUDE.md \u89C4\u5219\u5757\u8F93\u51FA\u5DF2\u7981\u7528",
          "                                   --legacy-claude-md: \u663E\u5F0F\u6062\u590D\u65E7 CLAUDE.md managed block \u8F93\u51FA",
          "                                   --dry-run: \u9884\u89C8\u5C06\u5199/\u5220\u54EA\u4E9B\u6587\u4EF6\uFF0C\u4E0D\u5B9E\u9645\u5199\u5165",
          "                                   --skills-only / --markdown-only: legacy flags",
          "  teamagent docs-propagate --rule-id=<id>",
          "                                   \u5C06\u65B0\u89C4\u5219\u81EA\u7136\u4F20\u64AD\u5230 docs/ \u5E76\u7528 cheap runner \u9A8C\u8BC1",
          "  teamagent config stop-mode <sync|async>  \u5207\u6362 Stop hook \u8FD0\u884C\u6A21\u5F0F\uFF08\u9ED8\u8BA4 sync\uFF09",
          "  teamagent config show                    \u67E5\u770B\u5F53\u524D\u914D\u7F6E",
          "  teamagent scan-errors [--mode=efficient|full] [--since=<duration|ISO>] [--min-freq=N] [--dry-run] [--quiet]",
          "                                   \u81EA\u52A8\u91C7\u96C6\u9519\u8BEF\u4FE1\u53F7 \u2192 \u63D0\u53D6\u5019\u9009\u89C4\u5219 \u2192 \u5199\u5165\u5019\u9009\u961F\u5217",
          "  teamagent review-candidates [--limit=N] [--approve-scope=personal|team|global]",
          "                                   \u4EA4\u4E92\u5F0F\u5BA1\u6838\u5019\u9009\u89C4\u5219\uFF1A[a]\u6279\u51C6 [r]\u62D2\u7EDD [s]\u8DF3\u8FC7 [q]\u9000\u51FA\uFF1B\u53EF\u628A\u6279\u51C6\u9879\u63D0\u5347\u4E3A\u672C\u5730 team scope",
          "  teamagent team-export [--out=path]",
          "                                   \u5BFC\u51FA\u672C\u5730 active team scope \u89C4\u5219\u5230 JSON\uFF1B\u5BFC\u51FA\u524D\u6267\u884C\u9690\u79C1\u5B88\u95E8",
          "  teamagent team-import [--file=path]",
          "                                   \u4ECE team-export JSON \u5BFC\u5165\u672C\u5730 team scope \u89C4\u5219\uFF0C\u5DF2\u5B58\u5728 id \u4F1A\u8DF3\u8FC7",
          "  teamagent pr-cycle [--pr=N] [--wait-ms=300000] [--dry-run]",
          "                                   \u521B\u5EFA/\u5B9A\u4F4D PR\uFF0C\u7B49\u5F85\u540E\u68C0\u67E5 review\uFF1B\u6709\u53CD\u9988\u65F6\u8981\u6C42\u5148\u66F4\u65B0\u6587\u6863/\u89C4\u5219\u5E76\u7528 claudefast/codexfastg \u9A8C\u8BC1\u7B54\u6848",
          "  teamagent migrate-v6 [--dry-run] [--limit=N] [--db=<path>]",
          "                                   \u8FC1\u79FB\u65E7\u89C4\u5219\uFF08trigger_description \u4E3A\u7A7A\uFF09\u901A\u8FC7 LLM \u751F\u6210\u53CC\u63CF\u8FF0\uFF0C\u5E76\u5199\u5165 vec0 \u548C FTS5",
          "  teamagent migrate-v7 [--dry-run] [--limit=N] [--db=<path>]",
          "                                   \u6279\u91CF\u4E3A\u5B58\u91CF\u89C4\u5219\u751F\u6210 tool_context_description\uFF0C\u5E76\u5199\u5165 knowledge_tool_vec",
          "  teamagent pack list [--json]",
          "                                   \u5217\u51FA\u5DF2\u5B89\u88C5 / \u53EF\u7528\u7684 stack packs\uFF08ADR 0002 \u2014 agent \u51B3\u5B9A\u88C5\u54EA\u4E9B\uFF09",
          "  teamagent pack add <names>       \u4F8B pack add frontend-js,ops-safety\uFF1B\u4ECE seed/packs/<name>.{jsonl,meta.json} \u8BFB\u53D6\u5E76\u6CE8\u5165\u7528\u6237\u5168\u5C40 store",
          "  teamagent pack remove <names>    \u6309 tag pack:<name> \u8FC7\u6EE4\u5220\u9664\u5168\u5C40 store \u4E2D\u5BF9\u5E94\u89C4\u5219",
          "  teamagent digital-twin <login|logout|status|pause|resume|inject-mock>",
          "                                   \u7BA1\u7406 TeamBrain Digital Twin sidecar \u914D\u7F6E\uFF08~/.teamagent/digital-twin.json\uFF09\uFF1Binject-mock \u8D70\u7AEF\u5230\u7AEF smoke",
          "  teamagent record <start|stop|import>",
          "                                   \u672C\u5730\u5DE5\u4F5C\u5F55\u97F3\u5B50\u547D\u4EE4\uFF08ffmpeg \u2192 Opus/OGG \u2192 queue/pending/\uFF09",
          "  teamagent ingest --from-insights <path> | --from-audit | --from-pr <n>",
          "                   | --from-git [--since=30d] | --from-ci [--since=30d] | --from-candidates <path>",
          "                                   \u591A\u6E90\u6444\u5165\uFF1AClaude /insights / npm audit / PR review / git hotspot / CI failure",
          "                                   \u534A\u81EA\u52A8\u6E90\u52A0 --dry-run \u53EA\u4EA7\u51FA\u5019\u9009 md \u4F9B\u4EBA\u5DE5\u52FE\u9009",
          "",
          "\u73AF\u5883\u53D8\u91CF:",
          "  TEAMAGENT_VISIBILITY=silent|smart|verbose    \u5F52\u56E0\u6E32\u67D3\u6A21\u5F0F\uFF08\u9ED8\u8BA4 verbose\uFF09",
          ""
        ].join("\n")
      );
      return;
    }
    default:
      process.stderr.write(`\u672A\u77E5\u547D\u4EE4: ${command}
`);
      process.exit(1);
  }
}
main().catch((err) => {
  process.stderr.write(`Error: ${err instanceof Error ? err.message : String(err)}
`);
  process.exit(1);
});
