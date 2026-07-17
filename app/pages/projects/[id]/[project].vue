<script setup lang="ts">
import type { Project } from '~~/shared/types/content-types';
import type { GalleryImage } from '~~/shared/types/global';

import { parseMarkdown } from '@nuxtjs/mdc/runtime';
import { buildProjectImageAlt, buildProjectImageFilename } from '~/utils/project-seo';

interface StatItem {
  id: number;
  label: string;
  description: string;
}

const route = useRoute();
const posthog = usePostHog();
const { formatMonthYear } = useFormatDate();

// ── Route params ───────────────────────────────────────────────────────────
const slug = computed(() => {
  const param = route.params.project;
  if (typeof param !== 'string') return '';

  const normalized = param.trim();
  if (!normalized || normalized === 'null' || normalized === 'undefined') return '';

  return normalized;
});

const sectorSlug = computed(() =>
  typeof route.params.id === 'string' ? route.params.id.trim() : '',
);

// ── Project data ───────────────────────────────────────────────────────────
// Reactive key (Nuxt ≥ 3.17): re-fetches automatically when the slug changes,
// no `watch` option needed. Markdown is parsed inside the handler so the AST
// ships in the same payload entry instead of a second useAsyncData round-trip.
const { data: projectData, error: projectError } = await useAsyncData(
  () => `project-page-${slug.value}`,
  async () => {
    if (!slug.value) {
      throw createError({ statusCode: 404, statusMessage: 'Project not found' });
    }

    const entry = await $fetch<Project>(`/api/projects/${encodeURIComponent(slug.value)}`);
    const descriptionAst = entry.description ? await parseMarkdown(entry.description) : null;

    return { entry, descriptionAst };
  },
  { default: () => null },
);

if (projectError.value) {
  throw createError({
    statusCode: projectError.value.statusCode || 500,
    statusMessage: projectError.value.statusMessage || 'Unable to load project',
    fatal: true,
  });
}

const ast = computed(() => projectData.value?.descriptionAst ?? null);

const page = computed(() => {
  const entry = projectData.value?.entry;
  if (!entry) return null;

  const sector = formatProjectSectorLabel(entry) || 'Project';
  const gallery: GalleryImage[] = (entry.gallery || []).map((image, index) => ({
    url: image.url,
    altText:
      typeof image.alternativeText === 'string' && image.alternativeText.trim()
        ? image.alternativeText.trim()
        : buildProjectImageAlt({
            projectTitle: entry.title,
            location: entry.location,
            sector,
            index,
          }),
    recommendedFilename: buildProjectImageFilename({
      projectSlug: entry.slug,
      location: entry.location,
      index,
      extension: image.ext,
    }),
  }));

  return {
    id: entry.id,
    title: entry.title,
    slug: entry.slug,
    main_image: entry.mainImage?.url,
    location: entry.location,
    sector,
    area: entry.area,
    completed: entry.completed,
    gallery,
    beck: entry.beck,
    description: entry.description,
    deliveryMethod: entry.deliveryMethod,
    projectType: entry.projectType,
    facilityType: entry.facilityType,
    challenge: entry.challenge,
    strategy: entry.strategy,
    preconstructionApproach: entry.preconstructionApproach,
    tradeCollaboration: entry.tradeCollaboration,
    outcome: entry.outcome,
    seoTitle: entry.seoTitle,
    seoDescription: entry.seoDescription,
    publishedAt: entry.publishedAt,
    updatedAt: entry.updatedAt,
  };
});

const hasNarrative = computed(() =>
  Boolean(
    page.value &&
    (page.value.challenge ||
      page.value.strategy ||
      page.value.preconstructionApproach ||
      page.value.tradeCollaboration ||
      page.value.outcome),
  ),
);

// ── SEO / head / schema (extracted) ────────────────────────────────────────
const { projectHeading } = useProjectSeoMeta({ page, slug, sectorSlug });

// ── Stats ──────────────────────────────────────────────────────────────────
const stats = computed<StatItem[]>(() => {
  if (!page.value) return [];

  return [
    { id: 1, label: page.value.location, description: 'Location' },
    { id: 2, label: page.value.projectType || page.value.sector, description: 'Project type' },
    { id: 3, label: page.value.deliveryMethod, description: 'Delivery method' },
    {
      id: 4,
      label: page.value.completed ? formatMonthYear(page.value.completed) : '',
      description: 'Completion',
    },
    { id: 5, label: page.value.area, description: 'Area' },
  ].filter((item): item is StatItem => Boolean(item.label));
});

// ── Related projects ───────────────────────────────────────────────────────
interface RelatedProjectCard {
  id: number;
  image: string;
  title: string;
  to: string;
  location?: string;
  completed?: string;
  sector?: string;
  slug: string;
  sectors: string[];
}

// Transform trims the SSR payload to just what the cards need, and
// getCachedData (explicit here; the Nuxt 4 default behaves the same) reuses
// the list when navigating between project pages instead of re-fetching.
const { data: projectCards } = await useAsyncData(
  'project-related-cards',
  () => $fetch<Project[]>('/api/projects').catch(() => []),
  {
    default: () => [],
    transform: (projects): RelatedProjectCard[] =>
      projects.flatMap((p) => {
        const image = p.mainImage?.url;
        const primarySector = getPrimaryProjectSector(p);

        if (!image || !primarySector || !p.slug) return [];

        // If projectBelongsToSector matches on more than `sectors[].slug`,
        // mirror that logic here so the cached card list stays equivalent.
        const sectors = (p.sectors ?? []).map((s) => s.slug).filter(Boolean);
        if (!sectors.length) sectors.push(primarySector.slug);

        return [
          {
            id: p.id,
            image,
            title: p.title,
            to: `/projects/${primarySector.slug}/${p.slug}`,
            location: p.location,
            completed: p.completed ? formatMonthYear(p.completed) : undefined,
            sector: formatProjectSectorLabel(p),
            slug: p.slug,
            sectors,
          },
        ];
      }),
    getCachedData: (key, nuxtApp) => nuxtApp.payload.data[key] ?? nuxtApp.static.data[key],
  },
);

const relatedProjects = computed(() => {
  const current = page.value;
  if (!current) return [];

  const currentSectorSlug = projectData.value?.entry
    ? getPrimaryProjectSector(projectData.value.entry)?.slug
    : undefined;
  const targetSector = currentSectorSlug || sectorSlug.value;
  if (!targetSector) return [];

  return projectCards.value
    .filter((card) => card.slug !== current.slug && card.sectors.includes(targetSector))
    .slice(0, 3);
});

const relatedProjectsTitle = computed(
  () => `Related Commercial Projects in ${page.value?.sector || 'This Sector'}`,
);

// ── Analytics ──────────────────────────────────────────────────────────────
usePageView({
  eventName: 'project_details_page_viewed',
  funnelEvent: {
    funnel_stage: 'middle',
    conversion_role: 'process_milestone',
    intent: 'medium',
    funnel_movement: 'down',
  },
  properties: { project_title: page.value?.title ?? '' },
});

useEngagementTracking({
  eventName: 'project_details_page_session_engaged',
  funnelEvent: {
    funnel_stage: 'middle',
    conversion_role: 'process_milestone',
    funnel_movement: 'down',
    intent: 'low',
  },
  properties: { project_title: page.value?.title ?? '' },
});

function trackRelatedProjectClick(project: RelatedProjectCard) {
  posthog?.capture('related_project_clicked', {
    funnel_stage: 'middle',
    conversion_role: 'process_milestone',
    funnel_movement: 'down',
    intent: 'medium-high',
    current_project: page.value?.title,
    project_title: project.title,
  });
}
</script>

<template>
  <div>
    <banner-b :image="page?.main_image" />

    <section-e
      v-if="page"
      bgcolor="dark"
      no-padding
      class="dark grid grid-cols-1 min-[800px]:grid-cols-2"
    >
      <template #header>
        <section class="project-intro" aria-labelledby="project-title">
          <p v-if="page.sector" class="project-intro__eyebrow">
            {{ page.sector }}
          </p>
          <app-typography
            id="project-title"
            tag="h1"
            variant="heading-lg"
            class="project-intro__title"
          >
            {{ projectHeading }}
          </app-typography>

          <app-typography tag="h2" variant="heading-sm" class="u-visually-hidden">
            Project Overview &amp; Commercial Scope
          </app-typography>

          <dl v-if="stats.length" class="project-intro__stats" aria-label="Project details">
            <div v-for="item in stats" :key="item.id" class="project-intro__stat">
              <dt>{{ item.description }}</dt>
              <dd>{{ item.label }}</dd>
            </div>
          </dl>

          <div v-if="ast?.body" class="project-intro__body">
            <MDCRenderer :body="ast.body" :data="ast.data" />
          </div>

          <div
            v-if="page.beck"
            class="project-intro__partner"
            role="img"
            aria-label="Beck affiliated project"
          >
            <Icon name="logos:belogo" size="60" aria-hidden="true" />
          </div>
        </section>
      </template>
      <template #body>
        <ProjectGallery
          :images="page.gallery"
          :project-title="page.title"
          :project-slug="page.slug"
        />
      </template>
    </section-e>
    <div v-else>Oh no! Page not found.</div>

    <section
      v-if="hasNarrative && page"
      class="project-narrative dark"
      aria-label="Project execution details"
    >
      <div v-if="page.challenge" class="project-narrative__section">
        <app-typography tag="h2" variant="heading-md">
          The Challenge: Preconstruction &amp; Scheduling Hurdles
        </app-typography>
        <app-typography tag="p" variant="text-md">{{ page.challenge }}</app-typography>
      </div>

      <div
        v-if="page.strategy || page.preconstructionApproach || page.tradeCollaboration"
        class="project-narrative__section"
      >
        <app-typography tag="h2" variant="heading-md">
          The Strategy: How Envision Executed the
          {{ page.deliveryMethod || 'Project Plan' }}
        </app-typography>
        <app-typography v-if="page.strategy" tag="p" variant="text-md">
          {{ page.strategy }}
        </app-typography>

        <div v-if="page.preconstructionApproach" class="project-narrative__subsection">
          <app-typography tag="h3" variant="heading-sm">
            Enhanced Preconstruction &amp; Cost Estimating
          </app-typography>
          <app-typography tag="p" variant="text-md">
            {{ page.preconstructionApproach }}
          </app-typography>
        </div>

        <div v-if="page.tradeCollaboration" class="project-narrative__subsection">
          <app-typography tag="h3" variant="heading-sm">
            Specialty Project Management &amp; Trade Collaboration
          </app-typography>
          <app-typography tag="p" variant="text-md">
            {{ page.tradeCollaboration }}
          </app-typography>
        </div>
      </div>

      <div v-if="page.outcome" class="project-narrative__section">
        <app-typography tag="h2" variant="heading-md">
          The Outcome: Delivering a Premier
          {{ page.facilityType || page.projectType || page.sector }} Facility
        </app-typography>
        <app-typography tag="p" variant="text-md">{{ page.outcome }}</app-typography>
      </div>
    </section>

    <section-e
      v-if="page && relatedProjects.length"
      no-padding
      bgcolor="dark"
      class="related-projects dark"
    >
      <template #header>
        <section-header-a :eyebrow="page.sector" :title="relatedProjectsTitle" />
      </template>
      <template #body>
        <div class="projects">
          <div class="projects-grid">
            <project-card
              v-for="project in relatedProjects"
              :key="project.id"
              :image="project.image"
              :alt="project.title"
              :aria-label="project.title"
              :to="project.to"
              aspect-ratio="3/4"
              image-densities="x1 x2"
              :outlined="false"
              :title="project.title"
              :location="project.location"
              :completed="project.completed"
              :sector="project.sector"
              @click="trackRelatedProjectClick(project)"
            />
          </div>
        </div>
      </template>
    </section-e>
  </div>
</template>

<style scoped>
.project-intro {
  --project-intro-rule: color-mix(in oklab, var(--section-color) 18%, transparent);
  --project-intro-muted: color-mix(in oklab, var(--section-color) 68%, transparent);

  display: grid;
  gap: calc(var(--spacing) * 6);
  align-content: start;
  max-width: 44rem;
  min-height: 100%;
  margin: calc(var(--spacing) * 2);
  padding-block: calc(var(--spacing) * 4);
  padding-inline-start: calc(var(--spacing) * 5);
}

.project-intro__eyebrow {
  width: fit-content;
  margin: 0;
  padding-block-end: calc(var(--spacing) * 2);
  color: var(--accent-color);
  font-size: var(--font-size-text-t4);
  font-weight: 700;
  line-height: 1;
  text-transform: uppercase;
}

.project-intro__title {
  max-inline-size: 25ch;
  color: var(--section-color);
}

.project-intro__stats {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(8.5rem, 1fr));
  gap: 1px;
  margin: 0;
  border-block: 1px solid var(--project-intro-rule);
  background: var(--project-intro-rule);
}

.project-intro__stat {
  min-width: 0;
  padding-block: calc(var(--spacing) * 4);
  padding-inline: calc(var(--spacing) * 4);
  background: var(--section-bg);
}

.project-intro__stat dt {
  margin-block-end: calc(var(--spacing) * 1.5);
  color: var(--project-intro-muted);
  font-size: var(--font-size-text-t4);
  font-weight: 700;
  line-height: 1;
  text-transform: uppercase;
}

.project-intro__stat dd {
  margin: 0;
  color: var(--section-color);
  font-size: var(--font-size-text-t2);
  font-weight: 700;
  line-height: 1.05;
  overflow-wrap: anywhere;
}

.project-intro__body {
  max-width: 66ch;
  color: var(--project-intro-muted);
}

.project-intro__body :deep(p) {
  margin: 0;
  font-size: var(--font-size-text-t3);
  line-height: 1.55;
}

.project-intro__body :deep(p + p) {
  margin-block-start: calc(var(--spacing) * 4);
}

.project-intro__partner {
  width: fit-content;
  padding-block-start: calc(var(--spacing) * 4);
  border-block-start: 1px solid var(--project-intro-rule);
  color: var(--section-color);
}

@media (max-width: 649px) {
  .project-intro {
    margin: 0;
    padding-inline-start: calc(var(--spacing) * 4);
  }

  .project-intro__title {
    max-inline-size: 100%;
  }
}

.project-narrative {
  display: grid;
  gap: calc(var(--spacing) * 14);
  padding: calc(var(--spacing) * 12) max(calc(var(--spacing) * 6), 6vw);
  color: var(--color-white);
  background: var(--color-envision-gray-900);
}

.project-narrative__section {
  display: grid;
  gap: calc(var(--spacing) * 5);
  width: min(100%, 68rem);
  margin-inline: auto;
  padding-block-start: calc(var(--spacing) * 8);
  border-block-start: 1px solid color-mix(in oklab, currentcolor 18%, transparent);
}

.project-narrative__subsection {
  display: grid;
  gap: calc(var(--spacing) * 3);
  max-width: 52rem;
  margin-block-start: calc(var(--spacing) * 4);
}

.related-projects {
  border-top: 1px solid color-mix(in oklab, white 12%, transparent);
}

.related-projects :deep(.reveal-card__content) {
  color: white;
}

.projects {
  container-type: inline-size;
  container-name: projects;
  position: relative;
  background: var(--color-envision-gray-800);
}

.projects-grid {
  display: grid;
  grid-template-columns: 1fr;
  container: projects;
  background: var(--color-envision-gray-800);
}

@container projects (width > 550px) {
  .projects-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@container projects (width > 1000px) {
  .projects-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

@container projects (width > 1400px) {
  .projects-grid {
    grid-template-columns: repeat(4, 1fr);
  }
}
</style>
