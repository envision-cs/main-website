<script setup lang="ts">
defineProps<{
  path: string;
  image: string;
  name: string;
  title: string;
  linkedin?: string;
  email?: string;
}>();

const contentRef = useTemplateRef<HTMLDivElement | null>('contentRef');
const contentHeight = ref(0);

onMounted(() => {
  if (contentRef.value) {
    contentHeight.value = contentRef.value.clientHeight;
  }
});
</script>

<template>
  <NuxtLink
    :to="path"
    :aria-label="name"
    prefetch-on="interaction"
    class="team-wrapper"
  >
    <article class="team-card">
      <NuxtImg
        :src="image"
        :alt="name"
        class="image w-full h-full object-cover"
        format="webp"
        sizes="(max-width: 768px) 100vw, 300px"
      />
      <div class="content" :style="{ '--titleHeight': `${contentHeight - 8}px` }">
        <header ref="contentRef" class="title">
          <app-typography class="h3" variant="heading-sm">
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
</template>

<style scoped>
:global(:root) {
  --ease: var(--ease-base);
}

.team-wrapper {
  container-type: inline-size;
  display: block;
  overflow: hidden;

  &:hover {
    .image {
      transform: scale(1.1);
    }

    .content,
    .actions {
      transform: translateY(0);
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

  &::after {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(to top, rgba(12, 44, 69, 0.85) 0%, rgba(12, 44, 69, 0.4) 25%, rgba(12, 44, 69, 0) 50%);
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
  transition: transform 0.5s var(--ease);
}

.content {
  z-index: 2;
  transform: translateY(calc(100% - var(--titleHeight)));
  transition: transform 0.5s var(--ease);
}

.title,
.actions {
  position: relative;
  z-index: 2;
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
  transform: translateY(100%);
  transition: transform 0.5s var(--ease);
  transition-delay: 150ms;
}
</style>
