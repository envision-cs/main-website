<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui';

defineProps<{
  item: NavigationMenuItem;
  idx: number;
}>();

const emit = defineEmits<{
  /** Parent asks us to open a submenu; we bubble up children + index */
  (e: 'open', payload: { children: NavigationMenuItem[]; index: number }): void;
}>();

function emitOpen(children: NavigationMenuItem[] | undefined, index: number) {
  if (!children || children.length === 0) {
    if (import.meta.client) {
      console.warn('[MainMenuList] Tried to open, but no children provided at index:', index);
    }
    return;
  }
  emit('open', { children, index });
}
</script>

<template>
  <li class="menu-item" role="none">
    <!-- Branch: Parent item (has children) -->
    <button
      v-if="item.children?.length"
      class="menu-parent"
      role="menuitem"
      aria-haspopup="true"
      aria-expanded="false"
      @click="emitOpen(item.children, idx)"
      @keydown.enter.prevent="emitOpen(item.children, idx)"
    >
      {{ item.label }}
    </button>

    <!-- Branch: Leaf link -->
    <NuxtLink
      v-else
      :to="item.to"
      role="menuitem"
    >
      {{ item.label }}
    </NuxtLink>

    <!-- Decor: Arrow indicator, only for parents -->
    <div
      v-if="item.children?.length"
      :id="`arrow-${idx}`"
      class="arrow"
      aria-hidden="true"
    >
      <UIcon name="i-lucide-arrow-left" />
    </div>
  </li>
</template>

<style scoped>
.menu-item {
  position: relative;
}

.menu-parent:hover + .arrow,
.menu-parent:focus-visible + .arrow {
  opacity: 1;
  transform: translate(0, -50%);
}

.arrow {
  position: absolute;
  top: 50%;
  left: -4rem;
  opacity: 0;
  display: grid;
  padding: calc(var(--spacing) * 2);
  background: var(--ui-bg);
  transform: translate(6px, -50%);
  transition:
    opacity 0.18s ease,
    transform 0.18s ease;
}
</style>
