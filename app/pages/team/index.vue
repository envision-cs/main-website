<script setup lang="ts">
import { computed } from 'vue';

const { data: teamMembers } = useFetch('/api/team');

const groupedTeamMembers = computed(() => {
  if (!teamMembers.value) {
    return {};
  }
  return teamMembers.value.reduce((acc, member) => {
    const group = member.group || 'Unassigned';
    if (!acc[group]) {
      acc[group] = [];
    }
    acc[group].push(member);
    return acc;
  }, {});
});
</script>

<template>
  <UPage>
    <UPageHeader title="Meet the Team" description="Our dedicated team of construction professionals." />

    <UPageBody>
      <div
        v-for="(members, group) in groupedTeamMembers"
        :key="group"
        class="mb-12"
      >
        <h2 class="text-2xl font-bold mb-4" :class="`text-${group.toLowerCase().split(' ')[0]}-500`">
          {{ group }}
        </h2>
        <div class="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          <UCard v-for="member in members" :key="member.name">
            <template #header>
              <img
                :src="member.image"
                :alt="member.name"
                class="w-full h-48 object-cover rounded-md mb-4"
              >
              <h3 class="text-xl font-bold">
                {{ member.name }}
              </h3>
              <p class="text-primary-500 dark:text-primary-400">
                {{ member.title }}
              </p>
            </template>
            <p>{{ member.bio }}</p>
            <template #footer>
              <div class="flex gap-4">
                <UButton
                  v-if="member.linkedin"
                  icon="i-simple-icons-linkedin"
                  color="gray"
                  variant="ghost"
                  :to="member.linkedin"
                  target="_blank"
                  aria-label="LinkedIn"
                />
                <UButton
                  v-if="member.email"
                  icon="i-heroicons-envelope"
                  color="gray"
                  variant="ghost"
                  :to="`mailto:${member.email}`"
                  aria-label="Email"
                />
              </div>
            </template>
          </UCard>
        </div>
      </div>
    </UPageBody>
  </UPage>
</template>
