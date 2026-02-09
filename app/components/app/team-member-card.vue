<script setup lang="ts">
import { useResizeObserver } from '@vueuse/core';

type TypographyVariant = 'heading-sm' | 'heading-md' | 'heading-lg' | 'text-sm' | 'text-md' | 'text-lg';

defineProps<{
  path: string;
  image: string;
  name: string;
  title: string;
  linkedin?: string;
  email?: string;
  titleSize: TypographyVariant;
  color?: string;
}>();

const contentRef = useTemplateRef<HTMLDivElement | null>('contentRef');
const contentHeight = ref(0);

function updateHeight() {
  contentHeight.value = contentRef.value?.clientHeight ?? 0;
}

useResizeObserver(contentRef, (entries) => {
  const entry = entries[0];
  if (entry) {
    contentHeight.value = entry.contentRect.height;
  }
});

onMounted(() => {
  updateHeight();
});
</script>

<template>
  <li>
    <NuxtLink
      :to="path"
      :aria-label="name"
      prefetch-on="interaction"
      class="team-wrapper"
    >
      <article class="team-card" :style="{ '--teamColor': color || '#0c2c45' }">
        <NuxtImg
          :src="image"
          :alt="name"
          class="image w-full h-full object-cover"
          format="webp"
          sizes="(max-width: 768px) 100vw, 300px"
        />
        <div class="content" :style="{ '--titleHeight': `${contentHeight - 8}px` }">
          <header ref="contentRef" class="title">
            <app-typography class="h3" :variant="titleSize">
              {{ name }}
            </app-typography>
            <app-typography
              tag="p"
              variant="text-md"
              class="role text-primary-200 dark:text-primary-200"
            >
              {{ title }}
            </app-typography>
          </header>
          <footer class="actions">
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
          </footer>
        </div>
      </article>
    </NuxtLink>
  </li>
</template>

<style scoped>
.team-wrapper {
  container-type: inline-size;
  display: block;
  overflow: hidden;

  &:hover {
    .image {
      transform: scale(1.1) translateZ(0);
    }

    .content,
    .actions {
      transform: translate3d(0, 0, 0);
    }
  }
}

.team-card {
  position: relative;
  aspect-ratio: 3 / 4;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 1.5rem;
  color: white;
  isolation: isolate;
  transform-style: preserve-3d;

  &::after {
    content: '';
    position: absolute;
    inset: 0;
    --darkerColor: color-mix(in srgb, var(--teamColor) 70%, black);
    background: linear-gradient(
      to top,
      color-mix(in srgb, var(--darkerColor) 75%, transparent) 0%,
      color-mix(in srgb, var(--darkerColor) 45%, transparent) 10%,
      transparent 30%
    );
    z-index: 1;
    pointer-events: none;
  }
}

.image {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: 0;
  transition: transform 0.5s var(--ease-base);
  will-change: transform;
  backface-visibility: hidden;
  transform: scale(1) translateZ(0);
}

.content {
  z-index: 2;
  transform: translateY(calc(100% - var(--titleHeight))) translateZ(0);
  transition: transform 0.5s var(--ease-base);
  will-change: transform;
  backface-visibility: hidden;
}

.title,
.actions {
  position: relative;
  z-index: 2;
  backface-visibility: hidden;
}

.title {
  margin-bottom: 0.75rem;
  text-wrap: balance;
}

.role {
  opacity: 0.85;
}

.actions {
  display: flex;
  gap: 0.5rem;
  transform: translate3d(0, 100%, 0);
  transition: transform 0.5s var(--ease-base);
  transition-delay: 150ms;
  will-change: transform;
}
</style>
