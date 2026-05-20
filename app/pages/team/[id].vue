<script setup lang="ts">
import { parseMarkdown } from "@nuxtjs/mdc/runtime";

definePageMeta({
  layout: "default",
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

// 3) Related groups - optimized logic
const relatedTeam = computed(() => data.value?.team || []);

// 4) Page metadata
const title = computed(() => data.value?.teamMember?.name);

useSeoMeta({
  title: title.value,
});
</script>

<template>
  <UPage v-if="data?.teamMember" class="">
    <section-e no-padding-main>
      <template #header>
        <NuxtImg
          :src="data.teamMember?.photo?.url"
          :alt="`${data.teamMember.name}, ${data.teamMember.title}`"
          class="image"
          fetch-priority="high"
          sizes="100vw sm:500px md:770px"
          format="webp"
        />
      </template>
      <template #body>
        <div class="grid items-content-center h-full pt-10">
          <div class="content">
            <div>
              <app-typography tag="h1" variant="heading-lg">
                {{ data.teamMember.name }}
              </app-typography>
              <app-typography tag="p" variant="text-lg">
                {{ data.teamMember.title }}
              </app-typography>
            </div>
            <div>
              <div class="flex gap-4">
                <app-button
                  v-if="data.teamMember.linkedin"
                  icon="i-simple-icons-linkedin"
                  variant="ghost"
                  :to="data.teamMember.linkedin"
                  target="_blank"
                  aria-label="LinkedIn"
                />
              </div>
            </div>
          </div>
          <div v-if="data.ast?.body">
            <MDCRenderer :body="data.ast?.body" :data="data.ast?.data" />
          </div>
        </div>
      </template>
    </section-e>
    <div class="site-grid" />

    <section-e
      v-if="data.teamMember?.team"
      :key="data.teamMember.team.name"
      no-padding
      bgcolor="dark"
      class="team-section border-t border-muted"
      :style="{ '--teamColor': data.teamMember.team.color }"
    >
      <template #header>
        <div class="team-color">
          <section-header-a
            neutral
            :eyebrow="data.teamMember.team.role"
            :title="data.teamMember.team.name"
            :body="data.teamMember.team.description"
          />
        </div>
      </template>
      <template #body>
        <app-team-member-list class="light">
          <li v-for="member in relatedTeam.filter((m) => m.slug !== id)" :key="member.id">
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
                <app-typography
                  tag="p"
                  variant="text-md"
                  class="team-member-role text-primary-200 dark:text-primary-200"
                >
                  {{ member.title }}
                </app-typography>
              </template>
            </project-card>
          </li>
        </app-team-member-list>
      </template>
    </section-e>
  </UPage>
  <div v-else>Nothing Here</div>
</template>

<style scoped>
.team-section {
  --accent-color: #fff;
  display: grid;
  grid-column: 1/-1;
  border-top: 1px solid var(--ui-border);
  color: var(--section-color);
  background: var(--section-bg);
}

.section-head {
  --teamColor: var(--ui-primary);
  position: relative;
  overflow: hidden;
  display: flex;
  padding: calc(var(--spacing) * 4);
  flex-direction: column;
  gap: calc(var(--spacing) * 3);
}

.team-role {
  width: fit-content;
  display: inline-flex;
  align-items: center;
  gap: 0.55rem;
  padding: 0.4rem 0.85rem;
  border-left: calc(var(--spacing) * 2) solid var(--teamColor);
}

.team-role-dot {
  width: 0.65rem;
  height: 0.65rem;
  border-radius: 999px;
  flex-shrink: 0;
  background: var(--teamColor);
}

.team-role-label {
  letter-spacing: 0.04em;
  text-transform: uppercase;
}

.team-accent {
  width: min(100%, 12rem);
  height: 0.35rem;
  border-radius: 999px;
  background-color: var(--teamColor);
}

.team-description {
  line-height: 1.4;
  max-width: 38ch;
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
}

.team-member-actions {
  display: flex;
  gap: 0.5rem;
}

@media (min-width: 1024px) {
  .section-head {
    padding: calc(var(--spacing) * 5);
    gap: calc(var(--spacing) * 3.5);
  }
}

.hero {
  display: grid;
  grid-template-columns: 1fr 1fr;
}

.image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  grid-column: span 12;

  @media (min-width: 1024px) {
    column-span: 12;
  }
}

.content {
  align-self: end;
  grid-column: span 12;
}

.team-color {
  border-left: 8px solid var(--teamColor);
}
</style>
