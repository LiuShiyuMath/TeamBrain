import { describe } from "vitest";
import { runScopeClassifierPortContract } from "@teamagent/ports/contracts";
import { createScopeClassifier } from "../scope-classifier.js";

describe("scope-classifier (heuristic)", () => {
  runScopeClassifierPortContract(() => createScopeClassifier());
});
