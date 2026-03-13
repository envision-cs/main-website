import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';

const buttonSource = readFileSync(resolve(process.cwd(), 'app/components/button.vue'), 'utf8');
const linkButtonSource = readFileSync(resolve(process.cwd(), 'app/components/link-button.vue'), 'utf8');

describe('legacy CTA motion styles', () => {
  it('avoids transition: all on the legacy button components', () => {
    expect(buttonSource).not.toContain('transition: all');
    expect(linkButtonSource).not.toContain('transition: all');
  });

  it('shifts CTA labels with transforms instead of padding changes', () => {
    expect(buttonSource).toContain('transform: translateX(1.25em);');
    expect(linkButtonSource).toContain('transform: translateX(1.25em);');
    expect(buttonSource).not.toContain('padding-left: 1.25em;');
    expect(linkButtonSource).not.toContain('padding-left: 1.25em;');
  });
});
