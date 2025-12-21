<script setup lang="ts">
import type { ContentFile } from '@nuxt/content';

defineProps<{
  data: ContentFile[];
  name: string;
}>();
</script>

<template>
  <div class="accordion">
    <details
      v-for="item, idx in data"
      :id="`acc-${name}-${idx}`"
      :key="idx"
      :open="idx === 0"
      :name="name"
    >
      <summary
        :id="`acc-${name}-${idx}-summary`"
        :aria-controls="`acc-panel-${name}-${idx}`"
      >
        <app-typography
          variant="heading-md"
          tag="h3"
        >
          {{ item?.title }}
        </app-typography>
        <UIcon
          class="icon"
          name="i-lucide-plus"
          aria-hidden="true"
          focusable="false"
          size="32"
        />
      </summary>
      <div
        :id="`acc-panel-${name}-${idx}`"
        role="region"
        :aria-labelledby="`acc-${name}-${idx}-summary`"
      >
        <ContentRenderer
          v-if="item.meta"
          :value="item.meta"
          class=" prose [&_p]:max-w-[60ch] [&_p]:text-balance"
        />
      </div>
    </details>
  </div>
</template>

<style scoped>
.accordion {
  display: flex;
  flex-direction: column;
  height: 100%;
  min-height: 50vh;
}

details {
  flex: 0 0 auto;
  overflow: hidden;
  padding: calc(var(--spacing) * 4);
  will-change: true;
  transition:
    background-color 0.4s ease-in-out,
    color 0.4s ease-in-out;
  border-bottom: 1px solid var(--ui-border);

  &:last-of-type {
    border-bottom: none;
  }
}

details[open] {
  flex: 1 1 auto;
  overflow: auto;
  color: #fff;
  background-color: var(--ui-primary);
}

details summary {
  list-style: none;
  display: flex;
  justify-content: space-between;
  align-items: center;

  span {
    transform: rotate(0deg);
    transition: transform 0.3s ease-in-out;
  }
}

details[open] summary {
  span {
    transform: rotate(45deg);
  }
}

/* Webkit */
details summary::-webkit-details-marker {
  display: none;
}

details::details-content {
  overflow: hidden;
  height: 0;
}

@media (prefers-reduced-motion: no-preference) {
  details::details-content {
    transition:
      height 0.4s ease,
      content-visibility 0.3s;
    transition-behavior: allow-discrete;
  }

  details[open]::details-content {
    height: auto;
  }
}
</style>
