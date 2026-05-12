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
}>();

const emit = defineEmits<{
  open: [value: string];
  toggle: [value: string];
}>();
</script>

<template>
  <NavigationMenuItem :value="props.value">
    <NavigationMenuTrigger as-child>
      <button
        type="button"
        class="NavigationMenuTrigger desktop-inline-nav-link submenu"
        :data-test="triggerDataTest"
        :aria-expanded="isOpen"
        @pointerenter="emit('open', props.value)"
        @click="emit('toggle', props.value)"
      >
        {{ label }}
      </button>
    </NavigationMenuTrigger>
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
          />

          <div class="services-grid" :data-test="gridDataTest">
            <NuxtLink
              v-for="(item, idx) in items"
              :key="item.slug"
              :to="item.to"
              class="services-grid-item"
              :data-test="itemDataTest"
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
