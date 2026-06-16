<script setup lang="ts">/* oxlint-disable @stylistic/quotes, @stylistic/arrow-parens, @stylistic/operator-linebreak, @stylistic/no-multiple-empty-lines */
import { parseMarkdown } from '@nuxtjs/mdc/runtime';

definePageMeta({
  layout: 'default',
});

const route = useRoute();
const id = computed(() => route.params.id as string);

const asyncDataKey = computed(() => `team-member-page-${id.value}`);

const { data } = await useAsyncData(
  asyncDataKey,
  async () => {
    const response = await $fetch(`/api/team/${id.value}`);
    const ast = response?.teamMember?.bio ? await parseMarkdown(response.teamMember.bio) : null;

    return {
      ...response,
      ast,
    };
  },
  { watch: [id] },
);

const relatedTeam = computed(() => data.value?.team || []);
const relatedMembers = computed(() => {
  return relatedTeam.value.filter((member) => member.slug !== id.value).slice(0, 3);
});

const teamMember = computed(() => data.value?.teamMember);
const teamName = computed(() => teamMember.value?.team?.name || 'Envision');
const teamRole = computed(() => teamMember.value?.team?.role || 'Meet the Team');
const teamColor = computed(
  () => teamMember.value?.team?.color || 'var(--color-envision-green-500)',
);
const portraitFailed = ref(false);
const memberInitials = computed(() => {
  return (
    teamMember.value?.name
      ?.split(' ')
      .filter(Boolean)
      .slice(0, 2)
      .map((part) => part[0])
      .join('') || 'EV'
  );
});

watch(id, () => {
  portraitFailed.value = false;
});

const contactActions = computed(() => [
  {
    label: 'LinkedIn',
    to: teamMember.value?.linkedin,
    icon: 'i-simple-icons-linkedin',
    show: Boolean(teamMember.value?.linkedin),
  },
  {
    label: 'Email',
    to: teamMember.value?.email ? `mailto:${teamMember.value.email}` : undefined,
    icon: 'i-heroicons-envelope',
    show: Boolean(teamMember.value?.email),
  },
]);

const profileCards = computed(() => [
  {
    label: 'Role',
    description: teamMember.value?.title || 'Team member',
  },
  {
    label: 'Team',
    description: teamName.value,
  },
  {
    label: 'Focus',
    description:
      teamMember.value?.team?.description ||
      'Helping Envision deliver steady, detailed work for clients across Central Florida.',
  },
]);

const title = computed(() => data.value?.teamMember?.name);

function toSeoDescription(text?: string) {
  return (
    text
      ?.replace(/```[\s\S]*?```/g, ' ')
      .replace(/!\[[^\]]*\]\([^)]*\)/g, ' ')
      .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
      .replace(/[#*_>`~|-]/g, ' ')
      .replace(/\s+/g, ' ')
      .trim()
      .slice(0, 160) || ''
  );
}

const seoTitle = computed(() =>
  title.value ? `${title.value} | Envision` : 'Meet the Team | Envision',
);

const seoDescription = computed(() => {
  const fromBio = toSeoDescription(teamMember.value?.bio);
  if (fromBio)
    return fromBio;

  const role = teamMember.value?.title ? `${teamMember.value.title}, ` : '';
  return `${role}part of the ${teamName.value} at Envision. Meet the people delivering organized, high-quality construction across Tampa Bay and Central Florida.`;
});

useSeoMeta(() => ({
  title: seoTitle.value,
  description: seoDescription.value,
  ogTitle: seoTitle.value,
  ogDescription: seoDescription.value,
  ogImage: teamMember.value?.photo?.url,
  ogType: 'profile',
  twitterCard: teamMember.value?.photo?.url ? 'summary_large_image' : 'summary',
  twitterTitle: seoTitle.value,
  twitterDescription: seoDescription.value,
  twitterImage: teamMember.value?.photo?.url,
}));
</script>

<template>
  <UPage v-if="teamMember" class="team-profile-page pt-24">
    <section
      class="team-profile-hero dark"
      :style="{ '--team-accent': teamColor }"
      aria-labelledby="team-profile-title"
    >
      <div class="team-profile-hero__inner">
        <div class="team-profile-hero__content">
          <NuxtLink to="/team" class="team-profile-hero__back">
            <UIcon name="i-lucide-arrow-left" aria-hidden="true" />
            Back to Team
          </NuxtLink>

          <div class="team-profile-hero__heading">
            <app-typography tag="p" variant="eyebrow-md" class="eyebrow">
              {{ teamRole }}
            </app-typography>
            <app-typography id="team-profile-title" tag="h1" variant="heading-huge" class="title">
              {{ teamMember.name }}
            </app-typography>
            <app-typography tag="p" variant="text-xl" class="role">
              {{ teamMember.title }}
            </app-typography>
          </div>

          <!-- <div class="team-profile-hero__actions" aria-label="Team member actions">
            <app-button
              v-for="action in contactActions.filter((item) => item.show)"
              :key="action.label"
              :to="action.to"
              :icon="action.icon"
              variant="ghost"
              color="secondary"
              :target="action.label === 'LinkedIn' ? '_blank' : undefined"
              :aria-label="action.label"
            >
              {{ action.label }}
            </app-button>
          </div> -->
        </div>

        <figure class="team-profile-hero__portrait">
          <img
            v-if="teamMember.photo?.url && !portraitFailed"
            :src="teamMember.photo?.url"
            :alt="`${teamMember.name}, ${teamMember.title}`"
            class="portrait-image"
            fetchpriority="high"
            @error="portraitFailed = true"
          >
          <div v-else class="portrait-fallback" aria-hidden="true">
            {{ memberInitials }}
          </div>
        </figure>
      </div>
    </section>

    <section class="team-profile-bio dark" :style="{ '--team-accent': teamColor }">
      <div class="team-profile-bio__inner">
        <div class="team-profile-bio__copy">
          <div v-if="data.ast?.body" class="rich-text">
            <MDCRenderer :body="data.ast.body" :data="data.ast.data" />
          </div>
        </div>

        <div class="team-profile-bio__cards" :style="{ '--accent-color': teamColor }">
          <card-a
            v-for="(item, index) in profileCards"
            :key="item.label"
            :item="item"
            :idx="index"
          />
        </div>
      </div>
    </section>

    <section-e
      v-if="relatedMembers.length"
      :key="teamName"
      no-padding
      bgcolor="dark"
      class="team-section"
      :style="{ '--teamColor': teamColor }"
    >
      <template #header>
        <div class="team-color" :class="{ '--border': teamColor }">
          <section-header-a neutral :eyebrow="teamRole" :title="teamName" />
        </div>
      </template>
      <template #body>
        <app-team-member-list class="light">
          <li v-for="member in relatedMembers" :key="member.id">
            <project-card
              :to="`/team/${member.slug}`"
              :aria-label="member.name"
              :image="member.photo?.url"
              :alt="member.name"
              link-mode="overlay"
              aspect-ratio="3/4"
              image-sizes="(max-width: 768px) 100vw, 300px"
              :image-hover-scale="1.1"
              :outlined="false"
              :meta-border="false"
              class="team-member-card"
            >
              <template #title>
                <app-typography class="h3 team-member-title" variant="heading-md">
                  {{ member.name }}
                </app-typography>
                <app-typography tag="p" variant="text-md" class="team-member-role">
                  {{ member.title }}
                </app-typography>
              </template>
            </project-card>
          </li>
        </app-team-member-list>
      </template>
    </section-e>
  </UPage>
  <div v-else class="team-profile-empty">
    <app-typography tag="h1" variant="heading-lg"> Team member not found. </app-typography>
    <MButton to="/team" variant="outline">
      <template #icon>
        <UIcon name="i-lucide-arrow-left" aria-hidden="true" />
      </template>
      Back to Team
    </MButton>
  </div>
</template>

<style scoped>
.team-profile-page {
  background: var(--color-envision-gray-900);
}

.team-profile-hero,
.team-profile-bio {
  grid-column: 1 / -1;
  background: var(--section-bg);
  color: var(--section-color);
}

.team-profile-hero {
  padding: calc(var(--spacing) * 8) calc(var(--spacing) * 4) calc(var(--spacing) * 6);
  border-bottom: 1px solid color-mix(in oklab, var(--section-color) 12%, transparent);
}

.team-profile-hero__inner,
.team-profile-bio__inner {
  width: min(100%, 1300px);
  margin-inline: auto;
}

.team-profile-hero__inner {
  display: grid;
  align-items: center;
  gap: calc(var(--spacing) * 6);
}

.team-profile-hero__content {
  display: grid;
  align-content: center;
  gap: calc(var(--spacing) * 5);
  min-width: 0;
}

.team-profile-hero__back {
  width: fit-content;
  display: inline-flex;
  align-items: center;
  gap: calc(var(--spacing) * 1.5);
  color: color-mix(in oklab, var(--section-color) 72%, transparent);
  font-size: var(--font-size-text-t4);
  font-weight: var(--font-weight-bold);
  letter-spacing: 0.08em;
  text-transform: uppercase;
  text-decoration: none;
  transition:
    color 180ms ease,
    transform 180ms ease;
}

.team-profile-hero__back:hover {
  color: var(--section-color);
  transform: translateX(-0.25rem);
}

.team-profile-hero__back:focus-visible {
  outline: 3px solid var(--team-accent);
  outline-offset: 4px;
}

.team-profile-hero__heading {
  display: grid;
  gap: calc(var(--spacing) * 2);
}

.eyebrow {
  color: var(--team-accent);
  letter-spacing: 0.1em;
}

.title {
  max-width: 11ch;
}

.role {
  color: color-mix(in oklab, var(--section-color) 76%, transparent);
  max-width: 34ch;
}

.team-profile-hero__actions {
  display: flex;
  flex-wrap: wrap;
  gap: calc(var(--spacing) * 2);
}

.team-profile-hero__portrait {
  position: relative;
  overflow: hidden;
  height: min(128vw, 680px);
  margin: 0;
  background: color-mix(in oklab, var(--team-accent) 34%, var(--color-envision-gray-900));
}

.portrait-image {
  width: 100%;
  height: 100%;
  display: block;
  object-fit: cover;
}

.portrait-fallback {
  width: 100%;
  height: 100%;
  display: grid;
  place-items: center;
  color: color-mix(in oklab, white 72%, transparent);
  font-size: clamp(5rem, 14vw, 12rem);
  font-weight: var(--font-weight-bold);
  letter-spacing: 0.04em;
  background:
    linear-gradient(to bottom, rgb(0 0 0 / 0.16), rgb(0 0 0 / 0.44)),
    color-mix(in oklab, var(--team-accent) 52%, var(--color-envision-gray-900));
}

.team-profile-bio {
  padding: calc(var(--spacing) * 8) calc(var(--spacing) * 4);
}

.team-profile-bio__inner {
  display: grid;
  gap: calc(var(--spacing) * 6);
}

.team-profile-bio__copy {
  display: grid;
  gap: calc(var(--spacing) * 3);
}

.rich-text {
  color: color-mix(in oklab, var(--section-color) 80%, transparent);
  font-size: var(--font-size-text-t3);
  line-height: 1.65;
  max-width: 72ch;
}

.rich-text :deep(p + p) {
  margin-top: 1rem;
}

.rich-text :deep(a) {
  color: var(--team-accent);
  text-decoration-thickness: 1px;
  text-underline-offset: 0.18em;
}

.team-profile-bio__cards {
  display: grid;
  gap: calc(var(--spacing) * 4);
}

.team-section {
  --accent-color: #fff;
  display: grid;
  grid-column: 1/-1;
  border-top: 1px solid var(--ui-border);
  color: var(--section-color);
  background: var(--section-bg);
}

.team-color {
  border-left: 8px solid var(--teamColor);
}

.team-member-card {
  :deep(.reveal-card__content) {
    color: white;
  }

  :deep(.reveal-card__meta) {
    justify-content: flex-start;
  }
}

.team-member-title {
  margin-bottom: 0.75rem;
  text-wrap: balance;
}

.team-member-role {
  opacity: 0.85;
  color: white;
}

.team-profile-empty {
  display: grid;
  place-content: center;
  gap: calc(var(--spacing) * 4);
  min-height: 70vh;
  padding: calc(var(--spacing) * 4);
  background: var(--color-envision-gray-900);
  color: white;
}

@media (min-width: 768px) {
  .team-profile-hero {
    padding-block: calc(var(--spacing) * 10);
  }

  .team-profile-hero__inner {
    grid-template-columns: minmax(0, 0.95fr) minmax(320px, 0.65fr);
  }

  .team-profile-hero__portrait {
    height: clamp(420px, 46vw, 650px);
  }

  .team-profile-bio__inner {
    grid-template-columns: minmax(0, 1.1fr) minmax(300px, 0.65fr);
    align-items: start;
  }
}

@media (min-width: 1100px) {
  .team-profile-hero {
    padding-block: calc(var(--spacing) * 12) calc(var(--spacing) * 8);
  }

  .team-profile-hero__inner {
    grid-template-columns: minmax(0, 1.05fr) minmax(360px, 0.56fr);
  }

  .team-profile-bio {
    padding-inline: calc(var(--spacing) * 6);
  }
}

@media (max-width: 480px) {
  .team-profile-hero,
  .team-profile-bio {
    padding-inline: calc(var(--spacing) * 3);
  }
}
</style>
