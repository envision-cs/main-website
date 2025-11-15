<script setup lang="ts">
import { computed } from 'vue';

const { data: teamMembers } = useFetch('/api/team');

const groupedTeamMembers = computed(() => {
  if (!teamMembers.value) {
    return {};
  }
  return Object.groupBy(teamMembers.value, ({ group }) => group);
});
</script>

<template>
  <UPage>
    <UPageBody>
      <div
        v-for="(members, group) in groupedTeamMembers"
        :key="group"
        class="mb-12"
      >
        <h2 class="text-2xl font-bold mb-4" :class="`text-${group.toLowerCase().split(' ')[0]}-500`">
          {{ group }}
        </h2>
        <div class="grid grid-cols-1 gap-8 sm:grid-cols-2 ">
          <NuxtLink
            v-for="member in members"
            :key="member.name"
            :to="member.path"
          >
            <article>
              <NuxtImg
                height="400"
                width="300"
                fit="cover"
                format="webp"
                :src="member.image"
                :alt="member.name"
                class=""
              />
              <div>
                <h3 class="text-xl font-bold">
                  {{ member.name }}
                </h3>
                <p class="text-primary-500 dark:text-primary-400">
                  {{ member.title }}
                </p>
                <p>{{ member.bio }}</p>
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
              </div>
            </article>
          </NuxtLink>
        </div>
      </div>
    </UPageBody>
  </UPage>
</template>

<style scoped>
article {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
}
</style>
