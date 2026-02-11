<script setup lang="ts">
const { data } = await useFetch('/api/locations');

const style = 'https://tiles.openfreemap.org/styles/positron';
const zoom = 9;
</script>

<template>
  <div
    class="h-full w-full"
    style="height: 100%; width: 100%"
  >
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
  </div>
</template>

<style scoped></style>
