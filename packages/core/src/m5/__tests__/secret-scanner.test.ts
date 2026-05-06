import { describe } from "vitest";
import { runSecretScanPortContract } from "@teamagent/ports/contracts";
import { createSecretScanner } from "../secret-scanner.js";

describe("secret-scanner (regex)", () => {
  runSecretScanPortContract(() => createSecretScanner());
});
