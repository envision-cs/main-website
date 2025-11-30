<script setup lang="ts">
defineProps<{
  title: string;
  path: string;
  description?: string;
  image?: string;
}>();
</script>

<template>
  <NuxtLink :to="path" class="p-4 flex flex-wrap gap-4 items-center border-t border-muted">
    <NuxtPicture
      v-if="image"
      :src="image"
      format="webp"
      height="300"
      width="300"
    />
    <div>
      <app-typography tag="h3" variant="heading-md">
        {{ title }}
      </app-typography>
      <app-typography
        tag="p"
        variant="text-md"
        class="text-muted"
      >
        {{ description }}
      </app-typography>
    </div>
  </NuxtLink>
</template>
