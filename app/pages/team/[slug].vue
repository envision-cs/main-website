<script setup lang="ts">
const route = useRoute();
const { data: teamMember } = await useAsyncData(`team-member-${route.params.slug}`, () =>
  queryContent('/team')
    .where({ _file: `${route.params.slug}.md` })
    .findOne());

if (!teamMember.value) {
  throw createError({ statusCode: 404, statusMessage: 'Team member not found', fatal: true });
}
</script>

<template>
  <UPage>
    <UPageHeader
      :title="teamMember.name"
      :description="teamMember.title"
    />

    <UPageBody>
      <div class="flex flex-col md:flex-row gap-8">
        <div class="md:w-1/3">
          <img
            :src="teamMember.image"
            :alt="teamMember.name"
            class="w-full h-auto object-cover rounded-lg shadow-md"
          >
          <div class="flex gap-4 mt-4">
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
        <div class="md:w-2/3">
          <ContentRenderer :value="teamMember" class="prose dark:prose-invert" />
        </div>
      </div>
    </UPageBody>
  </UPage>
</template>
