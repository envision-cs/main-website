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
:root {
  --button-width: max(
    245px,
    calc(
      0.1875 * (calc(100 * var(--vw, 1vw)) - 2 * var(1rem, 0px)) - (1 - 0.1875) * var(1rem, 0px) + 0 *
        var(--grid-gutter, 0px)
    )
  );
}

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
  width: var(--button-width);
  padding: calc(var(--spacing) * 1) calc(var(--spacing) * 1);
  min-height: 3.25em;
  min-width: 8em;
  align-items: flex-end;
  position: relative;
  overflow: hidden;
  text-transform: uppercase;
  transition:
    color 0.4s ease-in-out,
    box-shadow 0.4s ease-in-out;
  box-shadow: inset 0 0 0 0 var(--button-accent);
  text-decoration: none;

  span {
    z-index: 2;
  }
}

.app-button:hover {
  color: var(--button-hover-text);
  box-shadow: inset 100vmax 0 0 0 var(--button-accent);
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
