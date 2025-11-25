<script setup lang="ts">
defineProps<{
  data: object[];
  name: string;
}>();
</script>

<template>
  <div class="accordion">
    <details
      v-for="item, idx in data"
      :key="item.id"
      :open="idx === 0"
      :name="name"
    >
      <summary>
        <app-typography variant="heading-md" tag="h3">
          {{ item.title }}
        </app-typography>
        <UIcon class="icon" name="i-lucide-plus" />
      </summary>
      <ContentRenderer :value="item.meta" class="" />
    </details>
  </div>
</template>

<style scoped>
details {
  padding: calc(var(--spacing) * 4);
  border: 1px solid var(--ui-border);
}

details summary {
  list-style: none;
  display: flex;
  justify-content: space-between;
  align-items: center;

  span {
    transform: rotate(0deg);
    transition: transform 0.2s ease-in-out;
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
  transition:
    height 0.2s,
    content-visibility 0.3s;
  transition-behavior: allow-discrete;
}

details[open]::details-content {
  height: auto;
}
</style>
