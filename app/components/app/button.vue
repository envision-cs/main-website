<script setup lang="ts">
import { toRefs } from 'vue';

const props = withDefaults(
  defineProps<{
    color?: 'primary' | 'secondary' | 'white';
    href?: string;
  }>(),
  {
    color: 'primary',
  },
);

const { color, href } = toRefs(props);
</script>

<template>
  <NuxtLink
    v-if="href"
    :to="href"
    class="app-button"
    :class="`app-button--${color}`"
  >
    <app-typography tag="span" variant="text-lg">
      <slot />
    </app-typography>
  </NuxtLink>
  <button
    v-else
    type="button"
    class="app-button"
    :class="`app-button--${color}`"
  >
    <app-typography variant="text-lg">
      <slot />
    </app-typography>
  </button>
</template>

<style scoped>
.app-button {
  --button-accent: var(--ui-primary);
  --button-bg: white;
  --button-text: var(--ui-text-inverted);
  --button-hover-text: #fff;

  appearance: none;
  background: var(--button-bg);
  border: none;
  color: var(--button-text);
  cursor: pointer;
  display: inline-flex;
  gap: 0.35em;
  padding: 0.9em 1.35em;
  min-height: 3em;
  min-width: 7.5em;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  font-weight: 600;
  transition:
    color 0.4s ease-in-out,
    box-shadow 0.4s ease-in-out,
    transform 0.25s ease;
  box-shadow: inset 0 0 0 0 var(--button-accent);
  text-decoration: none;

  span {
    z-index: 2;
  }
}

.app-button:hover {
  color: var(--button-hover-text);
  box-shadow: inset 100vmax 0 0 0 var(--button-accent);
  transform: translateY(-1px);
}

.app-button:focus-visible {
  outline: 2px solid var(--button-accent);
  outline-offset: 2px;
}

.app-button--primary {
  --button-bg: var(--ui-primary);
  --button-accent: var(--ui-secondary);
  --button-text: var(--ui-text-inverted);
}

.app-button--secondary {
  --button-bg: var(--ui-secondary);
  --button-accent: var(--ui-secondary);
  --button-text: var(--ui-text-muted);
}

.app-button--white {
  --button-accent: #fff;
  --button-bg: transparent;
  --button-text: #fff;
  --button-hover-text: var(--ui-primary);
}
</style>
