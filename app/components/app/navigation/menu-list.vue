<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui';

defineProps<{
  items: NavigationMenuItem[];
}>();

const emit = defineEmits<{
  /** Parent asks us to open a submenu; we bubble up children + index */
  (e: 'open', payload: { children: NavigationMenuItem; index: number }): void;
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
  <ul v-if="items?.length">
    <app-navigation-menu-list-item
      v-for="(item, idx) in items"
      :key="item.label"
      :item="item"
      :idx="idx"
      @open="emitOpen(item.children, idx)"
    />
  </ul>

  <!-- Optional empty state -->
  <div v-else class="menu-empty">
    No items
  </div>
</template>
