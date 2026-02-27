<template>
  <div class="team-background">
    <slot />
  </div>
</template>

<style scoped>
.team-background {
  background: linear-gradient(
    140deg,
    color-mix(in srgb, var(--teamColor, var(--ui-primary)) 12%, white) 0%,
    color-mix(in srgb, var(--teamColor, var(--ui-primary)) 3%, white) 35%,
    white 75%
  );
}
</style>
