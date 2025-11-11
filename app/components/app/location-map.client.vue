<script setup lang="ts">
const { data } = useNuxtData('locations');

const style = 'https://tiles.openfreemap.org/styles/positron';
const zoom = 9;
</script>

<template>
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
    <template v-for="location in data" :key="location.id">
      <MglMarker :coordinates="[location.longitude, location.latitude]">
        <template #marker>
          <Icon
            name="logos:icon"
            size="55"
            class="icon"
          />
        </template>
      </MglMarker>
    </template>
  </MglMap>
</template>

<style scoped></style>
