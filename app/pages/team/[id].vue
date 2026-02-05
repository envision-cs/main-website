<script setup lang="ts">
const route = useRoute();
const id = computed(() => route.params.id as string);

const { data } = useFetch(`/api/team/${id.value}`, {
  params: {
    id: id.value,
  },
});

// 3) Related groups - optimized logic
const relatedTeam = data.value?.team;

// 4) Page metadata
const title = computed(() => data.value?.teamMember.name);

useSeoMeta({
  title: title.value,
});

definePageMeta({
  layout: 'layout-b',
});
</script>

<template>
  <UPage v-if="data?.teamMember" class="mt-[25px]">
    <app-section-a>
      <template #header>
        <NuxtImg
          :src="data.teamMember?.photo.url"
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
              <!-- <app-typography tag="p" variant="text-sm">
                {{ teamMember?.email }}
              </app-typography> -->
              <div class="flex gap-4">
                <UButton
                  v-if="data.teamMember.linkedin"
                  icon="i-simple-icons-linkedin"
                  color="gray"
                  variant="ghost"
                  :to="data.teamMember.linkedin"
                  target="_blank"
                  aria-label="LinkedIn"
                />
                <!-- <UButton
                  v-if="teamMember.email"
                  icon="i-heroicons-envelope"
                  color="gray"
                  variant="ghost"
                  :to="`mailto:${teamMember.email}`"
                  aria-label="Email"
                /> -->
              </div>
            </div>
          </div>
          <ContentRenderer :value="data.teamMember.bio" class="" />
        </div>
      </template>
    </app-section-a>
    <div class="site-grid mt-40" />

    <app-section-a
      v-for="t in data.team"
      :key="t.name"
      class="team-section border-t border-muted"
    >
      <template #header>
        <div class="section-head">
          <app-typography tag="h2" variant="heading-md">
            {{ t.name }}
          </app-typography>
          <div
            class="w-80 h-3"
            :class="[t.title]"
            :style="{
              backgroundColor: t.team.color,
            }"
          />
          <app-typography tag="p" variant="heading-sm">
            {{ t.team.role }}
          </app-typography>
          <app-typography
            tag="p"
            variant="text-lg"
            class="mt-auto max-w-sm"
          >
            {{ t.team.description }}
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
            :image="member.photo.url"
            :linkedin="member.linkedin"
            :email="member.email"
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
}

.section-head {
  display: flex;
  padding: calc(var(--spacing) * 4);
  flex-direction: column;
  gap: calc(var(--spacing) * 3);
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
