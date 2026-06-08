<script setup lang="ts">interface DropdownFeaturePanel {
  to: string;
  image: string;
  eyebrow: string;
  title: string;
  copy: string;
  linkLabel: string;
  tone?: 'services' | 'projects';
  dataTest?: string;
}

interface DropdownItem {
  id: number | string;
  slug: string;
  to: string;
  label: string;
  description?: string;
}

const props = defineProps<{
  value: string;
  label: string;
  isOpen: boolean;
  featurePanel: DropdownFeaturePanel;
  items: DropdownItem[];
  triggerDataTest: string;
  panelDataTest: string;
  gridDataTest: string;
  itemDataTest: string;
  closeMenu: (suppressMs?: number) => void;
}>();

const emit = defineEmits<{
  open: [value: string];
}>();

function openMenu() {
  emit('open', props.value);
}

function focusFirstMenuItem() {
  if (!import.meta.client)
    return;

  window.requestAnimationFrame(() => {
    const panel = document.querySelector(`[data-test="${props.panelDataTest}"]`);
    const firstLink = panel?.querySelector<HTMLElement>('a, button');

    firstLink?.focus();
  });
}

function closeOnNavigation() {
  props.closeMenu(1500);

  window.setTimeout(() => {
    props.closeMenu(1500);
  }, 0);
}

function onTriggerKeydown(event: KeyboardEvent) {
  if (event.key === 'ArrowDown') {
    event.preventDefault();
    openMenu();
    focusFirstMenuItem();
    return;
  }

  if (event.key === ' ') {
    event.preventDefault();
    openMenu();
    focusFirstMenuItem();
    return;
  }

  if (event.key === 'Escape') {
    props.closeMenu(0);
  }
}
</script>

<template>
  <NavigationMenuItem :value="props.value">
    <div class="desktop-dropdown-trigger-group">
      <NuxtLink v-slot="{ href }" :to="featurePanel.to" custom>
        <a
          :href="href"
          class="NavigationMenuTrigger desktop-inline-nav-link submenu"
          :data-test="triggerDataTest"
          :data-menu-open="isOpen ? 'true' : undefined"
          aria-haspopup="menu"
          :aria-expanded="String(isOpen)"
          @focus="openMenu"
          @focusin="openMenu"
          @pointerenter="openMenu"
          @keydown="onTriggerKeydown"
          @click="closeOnNavigation"
        >
          {{ label }}
        </a>
      </NuxtLink>
      <button
        type="button"
        class="desktop-dropdown-open-button"
        :aria-label="`Open ${label} menu`"
        :aria-expanded="isOpen"
        tabindex="0"
        @focus="openMenu"
        @keydown="onTriggerKeydown"
      >
        <UIcon name="i-lucide-chevron-down" aria-hidden="true" />
      </button>
    </div>
    <NavigationMenuContent class="NavigationMenuContent dark" :data-test="panelDataTest">
      <div class="mega-menu-shell">
        <div class="mega-menu-grid" :data-test="gridDataTest">
          <NuxtLink
            class="mega-menu-item mega-menu-item--overview"
            :data-test="featurePanel.dataTest"
            :to="featurePanel.to"
            @click="closeOnNavigation"
          >
            <span class="mega-menu-item__title">Overview</span>
            <span class="mega-menu-item__description">{{ featurePanel.copy }}</span>
          </NuxtLink>
          <NuxtLink
            v-for="item in items"
            :key="item.slug"
            :to="item.to"
            class="mega-menu-item"
            :data-test="itemDataTest"
            @click="closeOnNavigation"
          >
            <span class="mega-menu-item__title">{{ item.label }}</span>
            <span v-if="item.description" class="mega-menu-item__description">
              {{ item.description }}
            </span>
          </NuxtLink>
        </div>

        <div class="mega-menu-actions">
          <NuxtLink
            class="mega-menu-action mega-menu-action--primary"
            to="/contact"
            @click="closeOnNavigation"
          >
            Get in touch
            <UIcon name="i-lucide-arrow-right" aria-hidden="true" />
          </NuxtLink>
          <NuxtLink class="mega-menu-action" to="/trade-partners" @click="closeOnNavigation">
            Trade partners
            <UIcon name="i-lucide-arrow-right" aria-hidden="true" />
          </NuxtLink>
        </div>
      </div>
    </NavigationMenuContent>
  </NavigationMenuItem>
</template>

<style scoped>
.mega-menu-shell {
  display: grid;
  gap: calc(var(--spacing) * 10);
  padding: calc(var(--spacing) * 6);
  border: 1px solid color-mix(in oklch, var(--color-white) 10%, transparent);
  border-radius: 14px;
  background: color-mix(in oklch, var(--color-envision-gray-800) 80%, transparent);
  color: var(--color-white);
  box-shadow: 0 28px 70px rgb(0 0 0 / 18%);
  backdrop-filter: blur(22px);
  -webkit-backdrop-filter: blur(22px);
}

.mega-menu-action,
.mega-menu-item {
  color: inherit;
  text-decoration: none;
}

.mega-menu-action svg {
  width: 0.88rem;
  height: 0.88rem;
}

.mega-menu-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  align-items: start;
  column-gap: calc(var(--spacing) * 8);
  row-gap: calc(var(--spacing) * 6);
  margin: 0;
}

.mega-menu-item {
  display: grid;
  gap: calc(var(--spacing) * 1.5);
  align-items: start;
  width: 100%;
  max-width: 100%;
  padding: 0;
  color: color-mix(in oklch, var(--color-white) 80%, transparent);
  transition:
    color 180ms ease,
    opacity 180ms ease;
}

.mega-menu-item__title {
  max-width: 100%;
  overflow: visible;
  color: inherit;
  font-size: 0.95rem;
  font-weight: 700;
  line-height: 1.15;
  text-wrap: pretty;
}

.mega-menu-item__description {
  max-width: 24ch;
  color: color-mix(in oklch, var(--color-white) 56%, transparent);
  font-size: 0.78rem;
  font-weight: 500;
  line-height: 1.25;
  text-wrap: pretty;
}

.mega-menu-item--overview {
  color: var(--color-white);
}

.mega-menu-actions {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
  gap: calc(var(--spacing) * 2);
}

.mega-menu-action {
  display: inline-flex;
  min-height: 2.55rem;
  align-items: center;
  justify-content: space-between;
  gap: calc(var(--spacing) * 3);
  padding: 0 calc(var(--spacing) * 4);
  border-radius: 13px;
  background: color-mix(in oklch, var(--color-envision-gray-900) 80%, transparent);
  color: var(--color-white);
  font-size: 0.78rem;
  font-weight: 800;
  line-height: 1;
  text-transform: uppercase;
  letter-spacing: 0.08em;
}

.mega-menu-action--primary {
  background: color-mix(in oklch, var(--color-white) 92%, var(--color-envision-gray-300));
  color: var(--color-envision-gray-900);
}

.mega-menu-item:hover,
.mega-menu-action:hover {
  color: var(--color-white);
}

.mega-menu-action--primary:hover {
  background: var(--color-white);
  color: var(--color-envision-gray-900);
}

.mega-menu-item:focus-visible,
.mega-menu-action:focus-visible {
  outline: 2px solid var(--color-envision-green-500);
  outline-offset: 3px;
}

@media (max-width: 820px) {
  .mega-menu-grid,
  .mega-menu-actions {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}
</style>
