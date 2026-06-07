import { describe, expect, it } from 'vite-plus/test';

import type { Project, Sector } from '~~/shared/types/content-types';
import {
  formatProjectSectorLabel,
  getPrimaryProjectSector,
  getProjectSectors,
  projectBelongsToSector,
} from './use-sectors';

function sector(name: string, slug: string): Sector {
  return { name, slug } as Sector;
}

function projectWithSectors(sectors: Sector[] | null): Project {
  return { sector: sectors } as Project;
}

function projectWithPluralSectors(sectors: Sector[] | null): Project {
  return { sectors } as Project;
}

function projectWithSector(sector: Sector): Project {
  return { sector } as unknown as Project;
}

describe('project sector helpers', () => {
  it('filters malformed sectors before exposing project sectors', () => {
    const project = projectWithSectors([
      sector('Education', 'education'),
      sector('', 'missing-name'),
      sector('Missing slug', ''),
      sector('Athletics', 'athletics'),
    ]);

    expect(getProjectSectors(project).map((item) => item.slug)).toEqual(['education', 'athletics']);
  });

  it('uses the first valid sector as the primary sector', () => {
    const project = projectWithSectors([
      sector('', 'missing-name'),
      sector('Healthcare', 'healthcare'),
      sector('Civic', 'civic'),
    ]);

    expect(getPrimaryProjectSector(project)?.slug).toBe('healthcare');
  });

  it('uses plural sectors from the current projects API payload', () => {
    const project = projectWithPluralSectors([
      sector('Education', 'education'),
      sector('Athletics', 'athletics'),
    ]);

    expect(getPrimaryProjectSector(project)?.slug).toBe('education');
    expect(formatProjectSectorLabel(project)).toBe('Education, Athletics');
  });

  it('keeps legacy single-sector payloads visible during API transition', () => {
    const project = projectWithSector(sector('Education', 'education'));

    expect(getPrimaryProjectSector(project)?.slug).toBe('education');
    expect(formatProjectSectorLabel(project)).toBe('Education');
  });

  it('matches any valid sector slug and formats all valid sector names', () => {
    const project = projectWithSectors([sector('Business', 'business'), sector('Civic', 'civic')]);

    expect(projectBelongsToSector(project, 'civic')).toBe(true);
    expect(projectBelongsToSector(project, 'education')).toBe(false);
    expect(formatProjectSectorLabel(project)).toBe('Business, Civic');
  });

  it('handles missing sector arrays', () => {
    const project = projectWithSectors(null);

    expect(getProjectSectors(project)).toEqual([]);
    expect(getPrimaryProjectSector(project)).toBeUndefined();
    expect(formatProjectSectorLabel(project)).toBeUndefined();
  });
});
