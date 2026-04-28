<script setup lang="ts">
defineProps<{
  eyebrow?: string;
  title?: string;
  body?: string;
  buttonLabel?: string;
  buttonTo?: string;
  showBody?: boolean;
}>();
</script>

<template>
  <div class="section-header l-stack">
    <app-typography v-if="eyebrow" tag="p" variant="text-lg" class="eyebrow">
      {{ eyebrow }}
    </app-typography>

    <app-typography tag="h2" variant="heading-lg" class="title">
      {{ title }}
    </app-typography>

    <app-typography v-if="body" tag="p" variant="text-lg" class="body">
      {{ body }}
    </app-typography>

    <div v-if="buttonTo" class="action">
      <my-button :to="buttonTo" variant="outline" size="md">
        {{ buttonLabel }}
        <template #icon>
          <UIcon name="i-lucide-circle-play" aria-hidden="true" />
        </template>
      </my-button>
    </div>
  </div>
</template>

<style scoped>
.l-stack {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: calc(var(--spacing) * 4);
}

.section-header {
  color: #fff;
  margin: calc(var(--spacing) * 4);
  max-width: 60ch;
}

.eyebrow,
.body {
  color: #fff;
  line-height: 1.5;
}

.title {
  color: inherit;
  line-height: 1;
}

.body {
  color: #fff;
  text-wrap: balance;
}

.action {
  --color-primary: var(--color-envision-blue-500);

  margin-block-start: 0;
}
</style>
