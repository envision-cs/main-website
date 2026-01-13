<script setup lang="ts">
const route = useRoute();
const id = computed(() => route.params.id as string);

// 1) Fetch team member (reactive to route param)
const { data: teamMember, error: memberError } = await useAsyncData(
  `team-member-${id.value}`, // Fixed: key should be string, not arrow function
  () => $fetch(`/api/team/${id.value}`), // Fixed: template literal syntax
  {
    watch: [id],
    lazy: false,
    server: true,
  },
);

// 2) Fetch full team list (one time)
const { data: team, error: teamError } = await useAsyncData(
  'team',
  () => $fetch('/api/team'),
  {
    // Cache this since it's shared across pages
    getCachedData: key => useNuxtApp().static.data[key],
  },
);

// 3) Related groups - optimized logic
const relatedTeam = computed(() => {
  if (!team.value?.length || !teamMember.value?.group)
    return [];

  const groupName = teamMember.value.group.toLowerCase();
  return team.value.filter(t => t.name?.toLowerCase() === groupName);
});

const filteredRelatedTeam = computed(() => {
  if (!teamMember.value)
    return relatedTeam.value;

  const currentMemberName = teamMember.value.name;
  return relatedTeam.value
    .map(group => ({
      ...group,
      members: group.members.filter(m => m.name !== currentMemberName),
    }))
    .filter(group => group.members.length > 0); // Remove empty groups
});

// 4) Page metadata
const title = computed(() => teamMember.value?.name ?? 'Team Member');

useSeoMeta({
  title,
  ogTitle: title,
  description: computed(() =>
    teamMember.value
      ? `Learn more about ${teamMember.value.name} from our team`
      : 'Meet our team member',
  ),
});

definePageMeta({
  layout: 'layout-b',
});

// 5) Handle errors gracefully
watchEffect(() => {
  if (memberError.value) {
    console.error('Error fetching team member:', memberError.value);
  }
  if (teamError.value) {
    console.error('Error fetching team:', teamError.value);
  }
});
</script>

<template>
  <UPage class="mt-[25px]">
    <app-section-a>
      <template #header>
        <NuxtImg
          :src="teamMember?.image"
          class="image"
          sizes="100vw sm:500px md:770px"
          format="webp"
        />
      </template>
      <template #body>
        <div class="grid items-content-center h-full">
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
              <!-- <app-typography tag="p" variant="text-sm">
                {{ teamMember?.email }}
              </app-typography> -->
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
          <ContentRenderer :value="teamMember" class="" />
        </div>
      </template>
    </app-section-a>
    <div class="site-grid mt-40" />

    <app-section-a
      v-for="t in filteredRelatedTeam"
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
            :class="[t.color]"
            :style="{
              backgroundColor: t.color,
            }"
          />
          <app-typography tag="p" variant="heading-sm">
            {{ t.role }}
          </app-typography>
          <app-typography
            tag="p"
            variant="text-lg"
            class="mt-auto max-w-sm"
          >
            {{ t.description }}
          </app-typography>
        </div>
      </template>
      <template #body>
        <app-team-member-list>
          <app-team-member-card
            v-for="member in t.members"
            :key="member.name"
            :path="member.path"
            :name="member.name"
            :title="member.title"
            :image="member.image"
            :linkedin="member.linkedin"
            :email="member.email"
          />
        </app-team-member-list>
      </template>
    </app-section-a>
  </UPage>
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
