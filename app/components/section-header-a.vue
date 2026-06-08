<script setup lang="ts">defineProps<{
  eyebrow?: string;
  title?: string;
  body?: string;
  buttonLabel?: string;
  buttonTo?: string;
  showBody?: boolean;
  neutral?: boolean;
}>();
</script>

<template>
  <div
    class="section-header l-stack"
    :style="{
      '--_color': neutral ? 'var(--color-envision-gray-900)' : 'var(--color-envision-blue-500)',
    }"
  >
    <app-typography v-if="eyebrow" tag="p" variant="text-lg" class="eyebrow">
      {{ eyebrow }}
    </app-typography>

    <slot name="title">
      <app-typography tag="h2" variant="heading-lg" class="title">
        {{ title }}
      </app-typography>
    </slot>

    <slot name="body" />

    <app-typography v-if="body" tag="p" variant="text-lg" class="body">
      {{ body }}
    </app-typography>

    <div v-if="buttonTo" class="action mt-6">
      <my-button :to="buttonTo" variant="outline" size="md">
        {{ buttonLabel }}
      </my-button>
    </div>
  </div>
</template>

<style scoped>
.l-stack {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: calc(var(--spacing) * 2);
}

.section-header {
  margin: calc(var(--spacing) * 4);
  max-width: 80ch;
}

.eyebrow {
  text-transform: uppercase;
  font-weight: bold;
  letter-spacing: 6%;
  color: var(--accent-color);
}

.title {
  color: inherit;
}

.body {
  color: var(--text-color-dimmed);
  text-wrap: balance;
}

.action {
  --color-primary: var(--color-envision-blue-500);
  margin-block-start: 0;
}
</style>
