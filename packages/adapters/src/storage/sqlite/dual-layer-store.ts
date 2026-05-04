import { openDb } from "./schema.js";
import { SqliteKnowledgeStore } from "./sqlite-knowledge-store.js";
import type { KnowledgeEntry } from "@teamagent/types";

export interface DualLayerStoreConfig {
  projectDbPath: string;
  userGlobalDbPath: string;
}

/**
 * Q1 决策 C —— 混合双层：
 *   <project>/.teamagent/knowledge.db   ← scope.level=personal/team
 *   ~/.teamagent/global.db              ← scope.level=global
 *
 * 查询时两层合并。team transport/sync 留到 Phase 4；本地 team scope
 * 存在 project DB 中，用 scope_level 与 personal 分开。
 */
export class DualLayerStore {
  private readonly project: SqliteKnowledgeStore;
  private readonly global: SqliteKnowledgeStore;

  constructor(cfg: DualLayerStoreConfig) {
    this.project = new SqliteKnowledgeStore(openDb(cfg.projectDbPath));
    this.global = new SqliteKnowledgeStore(openDb(cfg.userGlobalDbPath));
  }

  add(entry: KnowledgeEntry): void {
    switch (entry.scope.level) {
      case "personal":
      case "team":
        this.project.add(entry);
        return;
      case "global":
        this.global.add(entry);
        return;
      default:
        throw new Error(`unknown scope level: ${(entry.scope as any).level}`);
    }
  }

  getById(id: string): KnowledgeEntry | undefined {
    return this.project.getById(id) ?? this.global.getById(id);
  }

  findActive(): KnowledgeEntry[] {
    return [...this.project.findActive(), ...this.global.findActive()];
  }

  getAll(): KnowledgeEntry[] {
    return [...this.project.getAll(), ...this.global.getAll()];
  }

  getProjectStore(): SqliteKnowledgeStore {
    return this.project;
  }

  getGlobalStore(): SqliteKnowledgeStore {
    return this.global;
  }

  /** B-063: implement KnowledgeStore.update() — routes to the layer that owns the entry. */
  update(id: string, patch: Partial<KnowledgeEntry> & Record<string, unknown>): void {
    if (this.project.getById(id) !== undefined) {
      this.project.update(id, patch);
    } else if (this.global.getById(id) !== undefined) {
      this.global.update(id, patch);
    } else {
      throw new Error(`Knowledge entry not found in any layer: ${id}`);
    }
  }

  /** B-063: implement KnowledgeStore.delete() */
  delete(id: string): void {
    if (this.project.getById(id) !== undefined) {
      this.project.delete(id);
    } else {
      this.global.delete(id);
    }
  }

  /** B-063: implement KnowledgeStore.count() */
  count(): number {
    return this.project.count() + this.global.count();
  }

  /** B-063: implement KnowledgeStore.findByScopeLevel() */
  findByScopeLevel(level: "personal" | "team" | "global"): KnowledgeEntry[] {
    if (level === "global") return this.global.findByScopeLevel("global");
    return this.project.findByScopeLevel(level);
  }

  close(): void {
    this.project.close();
    this.global.close();
  }
}
