<script setup lang="ts">
interface DropdownFeaturePanel {
  to: string;
  image: string;
  eyebrow: string;
  title: string;
  copy: string;
  linkLabel: string;
  tone?: "services" | "projects";
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

function closeOnNavigation() {
  props.closeMenu(1500);

  window.setTimeout(() => {
    props.closeMenu(1500);
  }, 0);
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
          @pointerenter="emit('open', props.value)"
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
        @focus="emit('open', props.value)"
      >
        <UIcon name="i-lucide-chevron-down" aria-hidden="true" />
      </button>
    </div>
    <NavigationMenuContent class="NavigationMenuContent dark" :data-test="panelDataTest">
      <div class="mega-menu-shell">
        <div class="mega-menu-grid">
          <app-navigation-services-feature-panel
            :data-test="featurePanel.dataTest"
            :to="featurePanel.to"
            :image="featurePanel.image"
            :eyebrow="featurePanel.eyebrow"
            :title="featurePanel.title"
            :copy="featurePanel.copy"
            :link-label="featurePanel.linkLabel"
            :tone="featurePanel.tone"
            @click="closeOnNavigation"
          />

          <div class="services-grid" :data-test="gridDataTest">
            <NuxtLink
              v-for="(item, idx) in items"
              :key="item.slug"
              :to="item.to"
              class="services-grid-item"
              :data-test="itemDataTest"
              @click="closeOnNavigation"
            >
              <card-f
                :idx
                :item="{ id: item.id, label: item.label, description: item.description }"
                small
              />
            </NuxtLink>
          </div>
        </div>
      </div>
    </NavigationMenuContent>
  </NavigationMenuItem>
</template>
