<script setup lang="ts">
const route = useRoute();
const router = useRouter();

const id = computed(() => route.params.id as string);

// 1) Fetch the team member first (SSR-safe, top-level await)
const { data: teamMember } = await useFetch(`/api/team/${id.value}`);

// 2) Second fetch that depends on the first
//    Still called at top level (no if), but uses the data from teamMember.
const { data: relatedTeam } = await useFetch('/api/team/team', {
  query: {
    team: teamMember.value?.group,
    name: teamMember.value?.name,
  },
});

// 3) Make title reactive
const title = computed(() => teamMember.value?.name ?? 'Team member');

useSeoMeta({
  title,
});
</script>

<template>
  <UPage>
    <div class="mt-20">
      <UButton @click="router.back()">
        Back
      </UButton>
    </div>
    <div class="site-grid">
      <NuxtImg :src="teamMember?.image" class="image" />
      <div class="content">
        <div>
          <app-typography tag="h1" variant="heading-lg">
            {{ teamMember.name }}
          </app-typography>
          <app-typography tag="p" variant="text-lg">
            {{ teamMember.title }}
          </app-typography>
        </div>
        <div>
          <app-typography tag="p" variant="text-sm">
            {{ teamMember?.email }}
          </app-typography>
          <div class="flex gap-4">
            <UButton
              v-if="teamMember.linkedin"
              icon="i-simple-icons-linkedin"
              color="gray"
              variant="ghost"
              :to="teamMember.linkedin"
              target="_blank"
              aria-label="LinkedIn"
            />
            <UButton
              v-if="teamMember.email"
              icon="i-heroicons-envelope"
              color="gray"
              variant="ghost"
              :to="`mailto:${teamMember.email}`"
              aria-label="Email"
            />
          </div>
        </div>
      </div>
    </div>

    <ContentRenderer :value="teamMember" class="" />

    {{ relatedTeam }}
  </UPage>
</template>

<style scoped>
.hero {
  display: grid;
  grid-template-columns: 1fr 1fr;
}

.image {
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
