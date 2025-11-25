<script setup>
import { computed } from 'vue';

const props = defineProps({
  theme: { type: String, default: 'light', validator: v => ['light', 'dark'].includes(v) },
  backgroundAlt: { type: Boolean, default: false },
});

const themeClass = computed(() => `theme-${props.theme}`);
const backgroundClass = computed(() => props.backgroundAlt ? 'bg-alt' : '');
</script>

<template>
  <div class="feature-card" :class="[themeClass, backgroundClass]">
    <div class="feature-card-content">
      <div class="feature-card-copy">
        <h3 class="label">
          <slot name="label" />
        </h3>
        <div>
          <p class="headline">
            <slot name="headline" />
          </p>
          <p class="body">
            <slot name="body" />
          </p>
        </div>
      </div>
      <figure class="feature-card-image">
        <slot name="image" />
      </figure>
    </div>
    <slot name="control" />
  </div>
</template>

<style scoped>
.feature-card {
  border-radius: 1.125rem;
  overflow: hidden;
  position: relative;
  transition: transform 0.3s ease;
  background-color: var(--card-bg);
  color: var(--card-text);
  min-height: 500px;
  display: flex;
  flex-direction: column;
}

.feature-card:hover {
  transform: scale(1.02);
}

.theme-light {
  --card-bg: #f5f5f7;
  --card-text: #1d1d1f;
}

.bg-alt {
  background-color: #fbfbfd;
}

.feature-card-content {
  padding: 2.5rem 1.875rem;
  flex-grow: 1;
}

.label {
  font-size: 0.75rem;
  text-transform: uppercase;
  color: #6e6e73;
  margin-bottom: 0.5rem;
}

.headline {
  font-size: 1.75rem;
  margin-bottom: 1rem;
}

.body {
  font-size: 1.0625rem;
}

.feature-card-image {
  margin-top: auto;
}

@media (max-width: 1068px) {
  .headline {
    font-size: 1.5rem;
  }
}

@media (max-width: 734px) {
  .feature-card-content {
    padding: 1.875rem 1.25rem;
    min-height: 450px;
  }

  .headline {
    font-size: 1.3125rem;
  }
}
</style>
