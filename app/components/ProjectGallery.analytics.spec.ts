import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vite-plus/test';

const gallerySource = readFileSync(
  resolve(process.cwd(), 'app/components/ProjectGallery.vue'),
  'utf8',
);
const openHandler = gallerySource.slice(
  gallerySource.indexOf('async function openLightbox'),
  gallerySource.indexOf('function getImageKitPath'),
);

describe('ProjectGallery analytics', () => {
  it('captures the one-shot gallery interaction before starting async lightbox setup', () => {
    const interactionCapture = openHandler.indexOf("track('project_gallery_interacted'");
    const lightboxOpen = openHandler.indexOf('lightbox.open(index)');

    expect(interactionCapture).toBeGreaterThan(-1);
    expect(interactionCapture).toBeLessThan(lightboxOpen);
    expect(openHandler).toContain('if (!hasTrackedGalleryInteraction.value)');
    expect(openHandler).toContain("funnel_stage: 'middle'");
    expect(openHandler).toContain("conversion_role: 'process_milestone'");
    expect(openHandler).toContain("funnel_movement: 'neutral'");
    expect(openHandler).toContain("intent: 'medium'");
  });
});
