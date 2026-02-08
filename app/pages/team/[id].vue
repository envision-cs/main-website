<script setup lang="ts">
import { parseMarkdown } from '@nuxtjs/mdc/runtime';

const route = useRoute();
const id = computed(() => route.params.id as string);

const asyncDataKey = computed(() => `team-member-page-${id.value}`);

const { data } = await useAsyncData(
  asyncDataKey,
  async () => {
    const response = await $fetch(`/api/team/${id.value}`);
    const ast = response?.teamMember?.bio
      ? await parseMarkdown(response.teamMember.bio)
      : null;

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

definePageMeta({
  layout: 'layout-b',
});
</script>

<template>
  <UPage v-if="data?.teamMember" class="mt-6.25">
    <app-section-a>
      <template #header>
        <NuxtImg
          :src="data.teamMember?.photo?.url"
          class="image"
          fetch-priority="high"
          sizes="100vw sm:500px md:770px"
          format="webp"
        />
      </template>
      <template #body>
        <div class="grid items-content-center h-full">
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
                <UButton
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
    </app-section-a>
    <div class="site-grid mt-40" />

    <app-section-a
      v-if="data.teamMember?.team"
      :key="data.teamMember.team.name"
      no-padding
      class="team-section border-t border-muted"
      :style="{ '--teamColor': data.teamMember.team.color }"
    >
      <template #header>
        <div class="section-head" :style="{ '--teamColor': data.teamMember.team.color }">
          <div class="team-role">
            <span class="team-role-dot" aria-hidden="true" />
            <app-typography
              tag="p"
              variant="text-sm"
              class="team-role-label"
            >
              {{ data.teamMember.team.role }}
            </app-typography>
          </div>
          <app-typography tag="h2" variant="heading-md">
            {{ data.teamMember.team.name }}
          </app-typography>
          <div class="team-accent" aria-hidden="true" />
          <app-typography
            tag="p"
            variant="text-lg"
            class="mt-auto max-w-sm team-description"
          >
            {{ data.teamMember.team.description }}
          </app-typography>
        </div>
      </template>
      <template #body>
        <app-team-member-list>
          <app-team-member-card
            v-for="member in relatedTeam"
            :key="member.id"
            :path="`/team/${member.slug}`"
            :name="member.name"
            :title="member.title"
            :image="member.photo?.url"
            :linkedin="member.linkedin"
            :email="member.email"
            :color="data.teamMember.team.color"
            title-size="heading-md"
          />
        </app-team-member-list>
      </template>
    </app-section-a>
  </UPage>
  <div v-else>
    Nothing Here
  </div>
</template>

<style scoped>
.team-section {
  display: grid;
  grid-column: 1/-1;
  border-top: 1px solid var(--ui-border);
  background: linear-gradient(
    140deg,
    color-mix(in srgb, var(--teamColor) 12%, white) 0%,
    color-mix(in srgb, var(--teamColor) 3%, white) 35%,
    white 75%
  );
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
  border-radius: 999px;
  background: color-mix(in srgb, var(--teamColor) 18%, white);
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
  grid-column: span 12;

  @media (min-width: 1024px) {
    column-span: 12;
  }
}

.content {
  align-self: end;
  grid-column: span 12;
}
</style>
