import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';

const coreValuesSource = readFileSync(
  resolve(process.cwd(), 'app/components/core-values.vue'),
  'utf8',
);

describe('core values section', () => {
  it('uses a rigid grid layout instead of the accordion', () => {
    expect(coreValuesSource).toContain('class="core-values-grid"');
    expect(coreValuesSource).not.toContain('<app-accordion');
  });

  it('renders a dedicated lead panel and numbered value cards', () => {
    expect(coreValuesSource).toContain('class="core-values-lead"');
    expect(coreValuesSource).toContain('class="core-values-card"');
    expect(coreValuesSource).toContain('class="core-values-card__index"');
  });
});
