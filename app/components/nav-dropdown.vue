<script setup>
import { useId } from 'vue';

defineProps({
  buttonText: String,
});
const popoverId = useId();
// Create a unique CSS variable name for the anchor
const anchorName = `--anchor-${popoverId.replace(/:/g, '')}`;
</script>

<template>
  <div class="container">
    <button
      :popovertarget="popoverId"
      :style="{ anchorName }"
      class="anchor-button"
    >
      {{ buttonText }}
    </button>

    <div
      :id="popoverId"
      popover
      :style="{ positionAnchor: anchorName }"
      class="styled-popover"
    >
      <div class="popover-content">
        <slot />
      </div>
    </div>
  </div>
</template>

<style scoped>
.styled-popover {
  --_duration: 0.2s;

  margin: 0;
  inset: auto;
  position-area: bottom span-all;
  margin-top: calc(var(--spacing));

  padding: calc(var(--spacing) * 2);
  border-radius: 2px;
  background: white;

  opacity: 0;
  transform: translateY(8px);
  transition:
    opacity var(--_duration) var(--ease-base),
    transform var(--_duration) var(--ease-base),
    overlay var(--_duration) allow-discrete,
    display var(--_duration) allow-discrete;
}

.styled-popover:popover-open {
  opacity: 1;
  transform: translateY(0);

  @starting-style {
    opacity: 0;
    transform: translateY(8px);
  }
}

/* Fallback for browsers that don't support anchor positioning yet */
@supports not (anchor-name: --test) {
  .styled-popover:popover-open {
    inset: 0;
    margin: auto;
    width: fit-content;
    height: fit-content;
  }
}

@keyframes fade {
  from {
    opacity: 1;
    translate: 0 0;
  }

  to {
    opacity: 0;
    translate: 0 1em;
  }
}
</style>
