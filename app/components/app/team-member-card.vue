<script setup lang="ts">
defineProps<{
  path: string;
  image: string;
  name: string;
  title: string;
  linkedin?: string;
  email?: string;
}>();
</script>

<template>
  <NuxtLink class="team-member" :to="path">
    <article>
      <NuxtImg
        height="400"
        width="400"
        fit="cover"
        format="webp"
        :src="image"
        :alt="name"
        class="w-full mb-4"
      />
      <div>
        <app-typography tag="h3" variant="heading-sm">
          {{ name }}
        </app-typography>
        <app-typography
          tag="p"
          variant="text-md"
          class="text-primary-500 dark:text-primary-400"
        >
          {{ title }}
        </app-typography>
        <div class="flex gap-4">
          <UButton
            v-if="linkedin"
            icon="i-simple-icons-linkedin"
            color="neutral"
            variant="ghost"
            :to="linkedin"
            target="_blank"
            aria-label="LinkedIn"
          />
          <UButton
            v-if="email"
            icon="i-heroicons-envelope"
            color="neutral"
            variant="ghost"
            :to="`mailto:${email}`"
            aria-label="Email"
          />
        </div>
      </div>
    </article>
  </NuxtLink>
</template>

<style scoped>
.team-member {
  display: block;
  container-type: inline-size;
}

article {
  display: grid;
  grid-template-columns: 1fr;
  align-items: center;
  gap: calc(var(--spacing) * 4);
}

@container (min-width: 700px) {
  article {
    grid-template-columns: 1fr 1fr;
  }
}
</style>
