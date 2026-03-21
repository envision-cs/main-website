import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vite-plus/test';

const pageSource = readFileSync(
  resolve(process.cwd(), 'app/pages/projects/[id]/[project].vue'),
  'utf8',
);

describe('project page image lightbox accessibility', () => {
  it('gives the popover a dialog role and accessible name', () => {
    expect(pageSource).toMatch(/<aside[\s\S]*role="dialog"/);
    expect(pageSource).toMatch(/<aside[\s\S]*aria-label=/);
  });

  it('gives the icon-only close button an accessible name', () => {
    expect(pageSource).toMatch(/<button[\s\S]*aria-label=/);
  });
});
