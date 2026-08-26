/**
 * AUTO-CAPTURED content snapshot from https://envision-cs.com (de-CMS migration).
 * This is now the site's source of truth for content — edit these files to change the site.
 * Regenerate with scratchpad/snapshot.mjs if ever reconnected to a CMS.
 */
import homeHero from './home-hero';
import homepageFeatured from './homepage-featured';
import sectors from './sectors';
import locations from './locations';
import services from './services';
import team from './team';
import projects from './projects';
import projectDetails from './project-details';
import serviceDetails from './service-details';
import teamMemberDetails from './team-member-details';
import contact from './contact';

export const snapshots = {
  singletons: {
    '/api/home-hero': homeHero,
    '/api/homepage-featured-project-section': homepageFeatured,
    '/api/sectors': sectors,
    '/api/locations': locations,
    '/api/services': services,
    '/api/team': team,
    '/api/projects': projects,
    '/api/contact': contact,
  },
  maps: {
    '/api/projects/': projectDetails as Record<string, unknown>,
    '/api/services/': serviceDetails as Record<string, unknown>,
    '/api/team/': teamMemberDetails as Record<string, unknown>,
  },
};
