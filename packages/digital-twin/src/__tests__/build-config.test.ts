import { describe, it, expect } from 'vitest';
import { readFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

/**
 * Issue-146 regression guard. The original F1 bug was: `bin-uploader.ts`
 * existed in source but was never added to `package.json:scripts.build`,
 * so `dist/bin-uploader.cjs` never existed in any release. The Stop hook
 * then silently skipped the daemon spawn → 0 transcripts uploaded.
 *
 * This static check catches future regressions of the same class without
 * requiring an actual build to run in tests.
 */
describe('digital-twin package.json build script', () => {
  const here = dirname(fileURLToPath(import.meta.url));
  const pkgJsonPath = join(here, '..', '..', 'package.json');
  const pkg = JSON.parse(readFileSync(pkgJsonPath, 'utf-8')) as {
    scripts?: { build?: string };
  };

  it('includes bin-uploader.ts in the CJS tsup entry list', () => {
    const buildScript = pkg.scripts?.build ?? '';
    expect(buildScript).toMatch(/src\/bin-uploader\.ts/);
  });

  it('includes bin-prod-server.ts in the CJS tsup entry list', () => {
    // Sibling regression guard — same class of bug, different binary.
    const buildScript = pkg.scripts?.build ?? '';
    expect(buildScript).toMatch(/src\/bin-prod-server\.ts/);
  });
});
