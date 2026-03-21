import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vite-plus/test';

const mainCss = readFileSync(
  resolve(process.cwd(), 'app/assets/css/main.css'),
  'utf8',
);

describe('main theme tokens', () => {
  it('defines the shared white token in the global theme layer', () => {
    expect(mainCss).toMatch(/--color-white:\s*#fff;/);
  });

  it('defines the shared muted text token from the existing gray palette', () => {
    expect(mainCss).toMatch(/--text-color-muted:\s*var\(--color-envision-gray-600\);/);
  });
});
