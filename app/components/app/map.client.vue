<script setup lang="ts">
const style = 'https://tiles.openfreemap.org/styles/positron';
const center = [-82.4588, 27.9517];
const zoom = 14;
</script>

<template>
  <MglMap
    :map-style="style"
    :center="center"
    :zoom="zoom"
  >
    <MglNavigationControl />
  </MglMap>
</template>
