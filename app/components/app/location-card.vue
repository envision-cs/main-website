<script setup lang="ts">
defineProps<{
  title: string;
  address: string;
  phone?: string;
  email?: string;
  city?: string;
  callLabel?: string;
  emailLabel?: string;
}>();
</script>

<template>
  <article>
    <div class="card-content">
      <AppTypography
        tag="h3"
        variant="heading-sm"
        class="text-trim"
      >
        {{ title }}
      </AppTypography>
      <div class="address">
        <AppTypography
          v-if="address"
          tag="p"
          variant="text-lg"
          class="text-trim"
        >
          {{ address }}
        </AppTypography>
        <AppTypography
          tag="p"
          variant="text-lg"
          class="text-trim"
        >
          {{ city }}
        </AppTypography>
      </div>
    </div>
  </article>
</template>

<style scoped>
article {
  border-bottom: 1px solid var(--ui-border);
  padding-inline: calc(var(--spacing) * 8);
  padding-block: calc(var(--spacing) * 4);
  container-type: inline-size;
  container-name: article;

  &:first-of-type {
    border-top: 1px solid var(--ui-border);
  }

  &.selected {
    border-left: 15px solid var(--ui-primary);
    padding-inline: calc(var(--spacing) * 4);
  }
}

.card-content {
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  align-items: start;
  gap: calc(var(--spacing));

  @container article (width > 500px) {
    flex-direction: row;
    align-items: end;
    gap: calc(var(--spacing) * 4);
  }
}

.address {
  display: flex;
  gap: calc(var(--spacing));
}

.text-trim {
  text-box-trim: trim-both;
}
</style>
