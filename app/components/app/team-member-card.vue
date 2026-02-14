<script setup lang="ts">
type TypographyVariant = 'heading-sm' | 'heading-md' | 'heading-lg' | 'text-sm' | 'text-md' | 'text-lg';

const props = defineProps<{
  path: string;
  image: string;
  name: string;
  title: string;
  linkedin?: string;
  email?: string;
  titleSize: TypographyVariant;
  color?: string;
}>();

const overlay = computed(() => {
  const teamColor = props.color || '#0c2c45';
  return `linear-gradient(
    to top,
    color-mix(in srgb, ${teamColor} 75%, transparent) 0%,
    color-mix(in srgb, ${teamColor} 45%, transparent) 10%,
    transparent 30%
  )`;
});
</script>

<template>
  <li>
    <app-reveal-card
      :to="path"
      :aria-label="name"
      :image="image"
      :alt="name"
      link-mode="overlay"
      aspect-ratio="3/4"
      image-sizes="(max-width: 768px) 100vw, 300px"
      :image-hover-blur="0"
      :image-hover-scale="1.1"
      :overlay="overlay"
      :container-type="true"
      :rounded="false"
      :outlined="false"
      :meta-border="false"
      :meta-fade="false"
      details-delay="0ms"
      meta-delay="150ms"
      class="team-wrapper team-card"
    >
      <template #title>
        <app-typography class="h3 team-title" :variant="titleSize">
          {{ name }}
        </app-typography>
        <app-typography
          tag="p"
          variant="text-md"
          class="role text-primary-200 dark:text-primary-200"
        >
          {{ title }}
        </app-typography>
      </template>
      <template #meta>
        <div class="actions">
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
      </template>
    </app-reveal-card>
  </li>
</template>

<style scoped>
.team-wrapper {
  position: relative;
}

.team-card {
  :deep(.reveal-card__content) {
    color: white;
  }

  :deep(.reveal-card__meta) {
    justify-content: flex-start;
  }
}

.team-title {
  margin-bottom: 0.75rem;
  text-wrap: balance;
}

.role {
  opacity: 0.85;
}

.actions {
  display: flex;
  gap: 0.5rem;
}
</style>
