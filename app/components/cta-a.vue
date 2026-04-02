<script setup lang="ts">
const props = defineProps<{
  body?: string;
  image?: string;
  flip?: boolean;
  href?: string;
}>();
</script>

<template>
  <section class="cta-win-section">
    <div class="cta-win-window" :class="{ 'is-flipped': props.flip }">
      <!-- Title bar -->
      <div class="win-titlebar" role="presentation">
        <span>
          <slot name="title">
            <slot />
          </slot>
        </span>
        <div class="win-titlebar-buttons" aria-hidden="true">
          <button class="win-titlebar-btn" tabindex="-1">_</button>
          <button class="win-titlebar-btn" tabindex="-1">&#9633;</button>
          <button class="win-titlebar-btn" tabindex="-1">&#x2715;</button>
        </div>
      </div>

      <div class="cta-win-body">
        <!-- Image pane -->
        <NuxtLink v-if="href" :to="href" class="cta-win-image">
          <NuxtImg
            :src="image"
            provider="imagekit"
            :modifiers="{ focus: 'bottom' }"
            format="webp"
            loading="lazy"
            class="cta-win-img"
            fit="cover"
            placeholder
          />
          <div class="cta-win-img-overlay" aria-hidden="true" />
        </NuxtLink>
        <div v-else class="cta-win-image">
          <NuxtImg
            :src="image"
            provider="imagekit"
            :modifiers="{ focus: 'bottom' }"
            format="webp"
            loading="lazy"
            class="cta-win-img"
            fit="cover"
            placeholder
          />
          <div class="cta-win-img-overlay" aria-hidden="true" />
        </div>

        <!-- Text pane -->
        <div class="cta-win-text">
          <div class="cta-win-text-inner">
            <p class="cta-win-body-text">{{ body }}</p>
            <slot name="body" />
            <div class="cta-win-separator" />
            <div class="cta-win-actions">
              <template v-if="href">
                <NuxtLink :to="href" class="win-button win-button-primary">Learn More</NuxtLink>
              </template>
              <slot name="action" />
            </div>
          </div>
          <div class="cta-win-status">
            <span>&#9679;</span>
            <span>Envision Construction Services</span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.cta-win-section {
  grid-column: 1 / -1;
  background: var(--color-win-gray-light);
  padding: 16px;
  display: flex;
  justify-content: center;
}

.cta-win-window {
  background: var(--color-win-gray-light);
  box-shadow: var(--win-border-raised);
  width: 100%;
  max-width: 1100px;
}

.win-titlebar {
  background: var(--win-titlebar);
  color: #fff;
  font-weight: bold;
  font-size: 11px;
  font-family: "Tahoma", sans-serif;
  padding: 3px 4px 3px 6px;
  display: flex;
  align-items: center;
  gap: 4px;
  user-select: none;
}

.win-titlebar-buttons {
  margin-left: auto;
  display: flex;
  gap: 2px;
}

.win-titlebar-btn {
  width: 16px;
  height: 14px;
  background: var(--color-win-gray-light);
  box-shadow: var(--win-border-button);
  font-size: 9px;
  font-weight: bold;
  color: var(--color-win-black);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  border: 0;
  padding: 0;
}

.cta-win-body {
  display: grid;
  grid-template-columns: 1fr;
  min-height: 300px;

  @media (min-width: 700px) {
    grid-template-columns: 1.2fr 1fr;
  }
}

.is-flipped .cta-win-body {
  @media (min-width: 700px) {
    direction: rtl;

    > * {
      direction: ltr;
    }
  }
}

.cta-win-image {
  position: relative;
  overflow: hidden;
  min-height: 220px;
  border-right: 2px solid #808080;
  box-shadow: inset -2px 0 0 #ffffff;
  display: block;
  text-decoration: none;
}

.is-flipped .cta-win-image {
  border-right: none;
  border-left: 2px solid #808080;
  box-shadow: inset 2px 0 0 #ffffff;
}

.cta-win-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: saturate(0.6) contrast(0.85);
  display: block;
}

.cta-win-img-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, rgba(0,0,128,0.15) 0%, transparent 60%);
  pointer-events: none;
}

.cta-win-text {
  display: flex;
  flex-direction: column;
  background: var(--color-win-white);
  box-shadow: var(--win-border-sunken);
  margin: 8px;
}

.cta-win-text-inner {
  flex: 1;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.cta-win-body-text {
  font-size: 11px;
  font-family: "Tahoma", sans-serif;
  color: var(--color-win-black);
  line-height: 1.5;
  margin: 0;
}

.cta-win-separator {
  height: 0;
  border-top: 1px solid #808080;
  border-bottom: 1px solid #ffffff;
}

.cta-win-actions {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.win-button {
  background: var(--color-win-gray-light);
  box-shadow: var(--win-border-button);
  color: var(--color-win-black);
  font-family: "Tahoma", sans-serif;
  font-size: 11px;
  padding: 3px 14px 4px;
  cursor: pointer;
  border: 0;
  text-decoration: none;
  display: inline-block;
  min-width: 75px;
  text-align: center;
}

.win-button:active {
  box-shadow: var(--win-border-sunken);
  padding: 4px 14px 3px;
}

.win-button-primary {
  outline: 1px solid #000;
  outline-offset: -1px;
}

.cta-win-status {
  background: var(--color-win-gray-light);
  border-top: 1px solid #808080;
  padding: 2px 8px;
  font-size: 10px;
  font-family: "Tahoma", sans-serif;
  display: flex;
  align-items: center;
  gap: 6px;
}
</style>
