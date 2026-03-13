import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';

const heroSource = readFileSync(
  resolve(process.cwd(), 'app/components/home/hero-banner.vue'),
  'utf8',
);

describe('home hero cinematic frame', () => {
  it('renders a cinematic content frame with an eyebrow label', () => {
    expect(heroSource).toContain('class="hero-frame"');
    expect(heroSource).toContain('class="hero-eyebrow"');
  });

  it('includes dedicated atmospheric layers for the cinematic treatment', () => {
    expect(heroSource).toContain('class="hero-vignette"');
    expect(heroSource).toContain('class="hero-glow"');
    expect(heroSource).toMatch(/class="hero-gridline [^"]+"/);
  });
});
