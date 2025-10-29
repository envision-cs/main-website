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

function emitOpen(children: NavigationMenuItem[], index: number) {
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
      class="menuitem"
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
      <UIcon
        class="arrow-icon"
        name="i-lucide-arrow-left"
        size="32"
      />
    </div>
  </li>
</template>

<style scoped>
.menu-item {
  position: relative;
}

.menuitem,
.menu-parent {
  font-size: var(--text-xl);
  color: var(--ui-text);
  line-height: 1.3;
  cursor: pointer;
  transition: color 0.3s ease;

  @media (min-width: 1024px) {
    font-size: var(--text-2xl);
  }
}

.menuitem:hover,
.menu-parent:hover {
  color: var(--ui-text-dimmed);
}

/* arrow container */
.arrow {
  position: absolute;
  top: 50%;
  left: -6rem;
  display: grid;
  padding: calc(var(--spacing) * 2);
  background: var(--ui-bg);

  /* initial state */
  opacity: 0;
  transform: translate(100%, -50%);

  /* animate both directions */
  transition:
    transform 0.4s ease,
    opacity 0.4s ease;
}

/* icon inside arrow */
.arrow-icon {
  opacity: 0;
  transition: opacity 0.2s ease 0.3s;
}

/* hover state: slide in + fade in */
.menu-parent:hover + .arrow,
.menu-parent:focus-visible + .arrow {
  opacity: 1;
  transform: translate(0, -50%);
}

.menu-parent:hover + .arrow .arrow-icon,
.menu-parent:focus-visible + .arrow .arrow-icon {
  opacity: 1;
}
</style>
