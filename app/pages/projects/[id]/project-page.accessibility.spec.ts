import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vite-plus/test';

const pageSource = readFileSync(
  resolve(process.cwd(), 'app/pages/projects/[id]/[project].vue'),
  'utf8',
);

describe('project page image lightbox accessibility', () => {
  it('uses a native modal dialog with an accessible name', () => {
    expect(pageSource).toMatch(/<dialog[\s\S]*aria-label=/);
    expect(pageSource).toContain('showModal()');
  });

  it('gives the icon-only close button an accessible name', () => {
    expect(pageSource).toMatch(/<button[\s\S]*aria-label=/);
  });

  it('uses native buttons for gallery image open actions', () => {
    expect(pageSource).toMatch(/<button[\s\S]*class="gallery-trigger"/);
    expect(pageSource).not.toContain('to="#"');
  });

  it('provides project-specific SEO metadata', () => {
    expect(pageSource).toContain('description: seoDescription.value');
    expect(pageSource).toContain('ogImage: page.value?.main_image');
    expect(pageSource).toContain('rel: "canonical"');
    expect(pageSource).toContain('href: canonicalPath.value');
  });

  it('shows an explicit fallback when the active image fails', () => {
    expect(pageSource).toContain('hasImageError');
    expect(pageSource).toContain('@error="onImageError"');
    expect(pageSource).toContain('role="status"');
  });

  it('does not use unsupported lazy props on the active dialog image', () => {
    expect(pageSource).not.toContain('lazy="true"');
  });

  it('moves focus into the dialog and restores focus on close', () => {
    expect(pageSource).toContain('closeButtonRef.value?.focus()');
    expect(pageSource).toContain('restoreFocusRef.value?.focus()');
  });
});
