<script setup lang="ts">
defineProps<{
  data: any[] | undefined | null;
  name: string;
}>();
</script>

<template>
  <div class="accordion">
    <details
      v-for="(item, idx) in (data || [])"
      :id="`acc-${name}-${idx}`"
      :key="idx"
      open
    >
      <summary
        :id="`acc-${name}-${idx}-summary`"
        :aria-controls="`acc-panel-${name}-${idx}`"
      >
        <app-typography
          variant="heading-sm"
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
        class="panel"
      >
        <div class="panel__inner">
          <ContentRenderer
            :value="item.meta"
            class=" prose [&_p]:max-w-[60ch] [&_p]:text-balance"
          />
        </div>
      </div>
    </details>
  </div>
</template>

<style scoped>
.accordion {
  display: flex;
  flex-direction: column;
  height: 100%;
}

details {
  flex: 0 0 auto;
  overflow: hidden;
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
  flex: 0 0 auto;
  overflow: hidden;
}

details summary {
  list-style: none;
  display: flex;
  padding: 1rem;
  justify-content: space-between;
  align-items: center;
  border-bottom: 0px solid var(--ui-border);
  transition: all 0.3s ease-in-out;

  span {
    transform: rotate(0deg);
    transition: transform 0.3s ease-in-out;
  }
}

details[open] summary {
  border-bottom: 1px solid var(--ui-border);
  span {
    transform: rotate(45deg);
  }
}

summary {
  cursor: pointer;

  &:hover {
    color: var(--ui-primary);
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

details::details-content {
  transition:
    height 0.4s ease,
    content-visibility 0.3s;
  transition-behavior: allow-discrete;
}

details[open]::details-content {
  height: auto;
}

.panel {
  display: grid;
  grid-template-rows: 0fr;
  transition: grid-template-rows 0.4s ease;
  padding-inline: 1rem;
}

.panel__inner {
  overflow: hidden;
}

/* when open, expand */
details[open] .panel {
  grid-template-rows: 1fr;
}

/* optional: if you want scroll, put it here */
details[open] .panel__inner {
  max-height: 60vh;
  overflow: auto;
}
</style>
