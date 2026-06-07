import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vite-plus/test';

const pageSource = readFileSync(
  resolve(process.cwd(), 'app/pages/projects/[id]/index.vue'),
  'utf8',
);

describe('project category page hardening', () => {
  it('returns a 404 for empty or unknown category slugs', () => {
    expect(pageSource).toContain('Project category not found');
    expect(pageSource).toMatch(/statusCode:\s*404/);
    expect(pageSource).toMatch(/!categorySlug\.value \|\| !activeCategory\.value/);
  });

  it('does not fall back to rendering every project for invalid categories', () => {
    expect(pageSource).not.toContain('return data.value;');
  });

  it('surfaces project API failures instead of rendering an empty grid', () => {
    expect(pageSource).toContain('error: projectsError');
    expect(pageSource).toContain('hasProjectsError');
    expect(pageSource).toContain('role="alert"');
    expect(pageSource).toContain('Projects could not load');
    expect(pageSource).toContain('refresh: refreshProjects');
    expect(pageSource).not.toContain('console.error("API error:"');
    expect(pageSource).not.toMatch(/catch\s*\([\s\S]*return \[\];/);
  });

  it('skips malformed project cards instead of assuming image and sector data exists', () => {
    expect(pageSource).toContain('const projectCards = computed<ProjectCardItem[]>');
    expect(pageSource).toContain('const image = project.mainImage?.url');
    expect(pageSource).toContain('const sectorSlug = activeCategory.value?.slug');
    expect(pageSource).toContain('if (!image || !sectorSlug || !project.slug)');
    expect(pageSource).toContain(':image="project.image"');
    expect(pageSource).not.toContain('project.mainImage.url');
    expect(pageSource).not.toContain('project.sector.slug');
  });

  it('matches projects against every sector in the project sector array', () => {
    expect(pageSource).toContain('projectBelongsToSector(project, activeCategory.value?.slug)');
    expect(pageSource).not.toContain('project.sector?.slug === activeCategory.value?.slug');
  });

  it('sorts category projects from newest completed date to oldest', () => {
    expect(pageSource).toContain('getProjectCompletedTime');
    expect(pageSource).toContain('getProjectCompletedTime(right) - getProjectCompletedTime(left)');
  });

  it('provides a section heading before project card headings', () => {
    expect(pageSource).toContain('projectListTitle');
    expect(pageSource).toMatch(/<section[\s\S]*aria-labelledby="projects-list-title"/);
    expect(pageSource).toMatch(/id="projects-list-title"[\s\S]*tag="h2"/);
    expect(pageSource).toContain('u-visually-hidden');
  });
});
