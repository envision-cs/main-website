<script setup lang="ts">import 'maplibre-gl/dist/maplibre-gl.css';

const style = 'https://tiles.openfreemap.org/styles/positron';
const zoom = 9;

const mapLoaded = ref(false);
const mapFailed = ref(false);

const office = {
  name: 'Tampa Office',
  address: '5000 Acline Drive East, Tampa, FL 33619',
  coordinates: [-82.4, 27.95] as [number, number],
  directionsUrl:
    'https://www.google.com/maps/search/?api=1&query=5000%20Acline%20Drive%20East%2C%20Tampa%2C%20FL%2033619',
};

function handleMapLoad() {
  mapLoaded.value = true;
  mapFailed.value = false;
}

function handleMapError() {
  mapFailed.value = true;
}
</script>

<template>
  <div class="location-map" aria-label="Map showing Envision's Tampa office location">
    <MglMap
      v-if="!mapFailed"
      :map-style="style"
      :center="[-82.452606, 27.964157]"
      :zoom="zoom"
      :drag-pan="false"
      :scroll-zoom="false"
      :drag-rotate="false"
      :double-click-zoom="false"
      :touch-zoom-rotate="false"
      :keyboard="false"
      @map:load="handleMapLoad"
      @map:error="handleMapError"
    >
      <MglMarker :coordinates="office.coordinates">
        <template #marker>
          <Icon name="lucide:map-pin" size="55" class="map-pin" aria-hidden="true" />
        </template>
      </MglMarker>
    </MglMap>

    <div v-if="!mapLoaded || mapFailed" class="map-fallback" :class="{ 'is-error': mapFailed }">
      <div class="map-fallback__content">
        <Icon name="lucide:map-pin" size="32" class="map-fallback__icon" aria-hidden="true" />
        <div>
          <p class="map-fallback__eyebrow">
            {{ mapFailed ? 'Map unavailable' : 'Loading map' }}
          </p>
          <p class="map-fallback__title">{{ office.name }}</p>
          <p class="map-fallback__address">{{ office.address }}</p>
        </div>
      </div>
      <NuxtLink class="map-fallback__link" :to="office.directionsUrl" target="_blank">
        Open directions
      </NuxtLink>
    </div>
  </div>
</template>

<style scoped>
.location-map {
  position: relative;
  min-height: 500px;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background:
    linear-gradient(135deg, color-mix(in srgb, var(--ui-primary) 8%, transparent), transparent 38%),
    var(--color-envision-blue-50);
}

.map-pin {
  color: var(--ui-primary);
  filter: drop-shadow(0 2px 6px rgb(0 0 0 / 25%));
}

.map-fallback {
  position: absolute;
  inset: 0;
  z-index: 1;
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: calc(var(--spacing) * 4);
  padding: calc(var(--spacing) * 6);
  background:
    linear-gradient(
      180deg,
      transparent 0%,
      color-mix(in srgb, var(--color-white) 92%, transparent) 72%
    ),
    repeating-linear-gradient(
      -35deg,
      color-mix(in srgb, var(--ui-border) 30%, transparent) 0 1px,
      transparent 1px 18px
    );
  pointer-events: none;
}

.map-fallback:not(.is-error) {
  opacity: 0.92;
}

.map-fallback__content {
  display: flex;
  min-width: 0;
  align-items: flex-start;
  gap: calc(var(--spacing) * 3);
}

.map-fallback__icon {
  flex: 0 0 auto;
  color: var(--ui-primary);
}

.map-fallback__eyebrow,
.map-fallback__address {
  color: var(--text-color-muted);
}

.map-fallback__eyebrow {
  font-size: var(--font-size-text-t4);
  text-transform: uppercase;
  letter-spacing: 0.08em;
}

.map-fallback__title {
  color: var(--color-envision-gray-900);
  font-size: var(--font-size-h4);
  font-weight: 600;
  overflow-wrap: break-word;
}

.map-fallback__address {
  max-width: 34ch;
  font-size: var(--font-size-text-t2);
  overflow-wrap: break-word;
}

.map-fallback__link {
  flex: 0 0 auto;
  min-height: 44px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: 1px solid var(--ui-primary);
  padding-inline: calc(var(--spacing) * 4);
  color: var(--ui-primary);
  font-weight: 600;
  text-decoration: none;
  pointer-events: auto;
}

.map-fallback__link:focus-visible {
  outline: 3px solid var(--ui-primary);
  outline-offset: 2px;
}

@media (max-width: 520px) {
  .map-fallback {
    align-items: flex-start;
    flex-direction: column;
    justify-content: flex-end;
  }

  .map-fallback__link {
    width: 100%;
  }
}
</style>
