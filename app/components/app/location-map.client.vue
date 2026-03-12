<script setup lang="ts">
import { MglMap, MglMarker } from '@indoorequal/vue-maplibre-gl';

const style = 'https://tiles.openfreemap.org/styles/positron';
const zoom = 9;
</script>

<template>
  <div class="h-full w-full" style="height: 100%; width: 100%">
    <MglMap
      :map-style="style"
      :center="[-82.452606, 27.964157]"
      :zoom="zoom"
      :drag-pan="false"
      :scroll-zoom="false"
      :drag-rotate="false"
      :double-click-zoom="false"
      :touch-zoom-rotate="false"
      :keyboard="false"
    >
      <MglMarker :coordinates="[-82.4, 27.95]">
        <template #marker>
          <Icon
            name="lucide:map-pin"
            size="55"
            class="icon"
          />
        </template>
      </MglMarker>
    </MglMap>
  </div>
</template>

<style scoped></style>
