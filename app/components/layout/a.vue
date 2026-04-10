<script setup lang="ts">
const slots = useSlots();
const hasAsideSlot = computed(() => Boolean(slots["aside-slot"]));
</script>

<template>
  <div class="main-layout site-grid">
    <header class="header">
      <slot name="header-slot" />
    </header>
    <aside v-if="hasAsideSlot" class="catagories">
      <slot name="aside-slot" />
    </aside>
    <main class="main" :class="{ 'main--full': !hasAsideSlot }">
      <slot name="main-slot" />
    </main>
  </div>
</template>

<style scoped>
.main-layout {
  margin-top: 0;
  min-height: 100dvb;
  grid-template-rows: min-content min-content auto;
}

.header {
  grid-column: 1/-1;
  border-bottom: 1px solid var(--ui-border);
}

.catagories {
  grid-column: 1/-1;
  border-bottom: 1px solid var(--ui-border);
}

.main {
  grid-column: 1/-1;
  border-bottom: 1px solid var(--ui-border);
  padding-bottom: calc(var(--spacing) * 4);
}

.main--full {
  grid-column: 1/-1;
}

@media (min-width: 700px) {
  .main-layout {
    grid-template-rows: min-content auto;
  }

  .catagories {
    grid-column: 1/4;
    border-right: 1px solid var(--ui-border);
  }

  .main {
    grid-column: 4/-1;
  }

  .main--full {
    grid-column: 1/-1;
  }
}

@media (min-width: 1024px) {
  .catagories {
    grid-column: 1/6;
  }

  .main {
    grid-column: 6/-1;
  }

  .main--full {
    grid-column: 1/-1;
  }
}
</style>
