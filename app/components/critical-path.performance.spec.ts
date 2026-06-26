import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vite-plus/test';

const mobileDrawerSource = readFileSync(
  resolve(process.cwd(), 'app/components/app/mobile-nav-drawer.vue'),
  'utf8',
);
const contentSliderSource = readFileSync(
  resolve(process.cwd(), 'app/components/content-slider.vue'),
  'utf8',
);

describe('critical-path animation loading', () => {
  it('loads GSAP only when the mobile navigation is requested', () => {
    expect(mobileDrawerSource).not.toContain('useGSAP()');
    expect(mobileDrawerSource).toMatch(/import\(["']gsap["']\)/);
    expect(mobileDrawerSource).toContain('await loadGsap()');
  });

  it('keeps ScrollTrigger out of the initial module graph', () => {
    expect(contentSliderSource).not.toMatch(/^import\s+\{\s*ScrollTrigger\s*\}/m);
    expect(contentSliderSource).not.toContain('useGSAP()');
    expect(contentSliderSource).toMatch(/import\(["']gsap\/ScrollTrigger["']\)/);
  });
});
