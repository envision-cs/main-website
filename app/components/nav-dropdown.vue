<script setup lang="ts">
import {
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuRoot,
  NavigationMenuTrigger,
} from 'reka-ui';
import { ref, watch } from 'vue';
import { useRoute } from 'vue-router';

const props = defineProps({
  buttonText: String,
  image: {
    type: String,
    default: 'https://ik.imagekit.io/pnixsw7lg/main-website/small_5000_acline_drive_office_01_20b859f5db.jpg?updatedAt=1770956670122',
  },
});

const route = useRoute();
const menuValue = 'services';
const openMenu = ref('');

watch(() => route.fullPath, () => {
  openMenu.value = '';
});
</script>

<template>
  <NavigationMenuRoot
    v-model="openMenu"
    class="container"
    :delay-duration="0"
    :skip-delay-duration="0"
    disable-click-trigger
  >
    <NavigationMenuList>
      <NavigationMenuItem :value="menuValue">
        <NavigationMenuTrigger as-child>
          <button
            type="button"
            class="anchor-button"
            aria-haspopup="menu"
          >
            {{ props.buttonText }}
          </button>
        </NavigationMenuTrigger>

        <NavigationMenuContent class="styled-popover">
          <div class="popover-image-wrapper">
            <NuxtImg
              v-if="props.image"
              :src="props.image"
              alt=""
              class="popover-image"
            />
          </div>
          <div class="popover-content">
            <slot />
          </div>
        </NavigationMenuContent>
      </NavigationMenuItem>
    </NavigationMenuList>
  </NavigationMenuRoot>
</template>

<style scoped>
.container {
  display: inline-flex;
}

.container :deep(ul) {
  list-style: none;
  margin: 0;
  padding: 0;
}

.anchor-button {
  border: 0;
  background: none;
  color: inherit;
  font: inherit;
  text-transform: uppercase;
  cursor: pointer;
  padding: 0;
  white-space: nowrap;
}

.styled-popover {
  margin: 0;
  border: 0;
  padding: calc(var(--spacing) * 2);
  border-radius: 2px;
  background: white;
  display: grid;
  grid-template-columns: minmax(18rem, 1fr) 3fr;
  align-items: start;
  max-height: min(32rem, calc(100dvh - 4rem));
  width: 100dvw;
  max-width: none;
  overflow-y: auto;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  transform-origin: top left;
  animation: menu-enter 0.2s var(--ease-base);
  z-index: 120;
}

.popover-image-wrapper {
  background-color: var(--ui-primary);
  width: 100%;
  height: clamp(12rem, 20vw, 17rem);
  overflow: hidden;
  display: flex;
}

.popover-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: grayscale(100%);
  mix-blend-mode: multiply;
  display: block;
}

@keyframes menu-enter {
  from {
    opacity: 0;
    transform: translateY(8px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
