<script setup lang="ts">
import {
  CollapsibleContent,
  CollapsibleRoot,
  CollapsibleTrigger,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogOverlay,
  DialogPortal,
  DialogRoot,
  DialogTitle,
  DialogTrigger,
  VisuallyHidden,
} from 'reka-ui';

const mobileDrawerOpen = ref(false);
const mobileServicesOpen = ref(false);
const menuButtonRef = ref<HTMLButtonElement | null>(null);
const firstDrawerLinkRef = ref<HTMLElement | null>(null);
const route = useRoute();

watch(() => route.fullPath, () => {
  mobileDrawerOpen.value = false;
  mobileServicesOpen.value = false;
});

watch(mobileDrawerOpen, (open) => {
  if (!open)
    mobileServicesOpen.value = false;
});

function closeDrawerAndNavigate() {
  mobileDrawerOpen.value = false;
}

function onDrawerOpenAutoFocus(event: Event) {
  event.preventDefault();
  firstDrawerLinkRef.value?.focus();
}

function onDrawerCloseAutoFocus(event: Event) {
  event.preventDefault();
  menuButtonRef.value?.focus();
}
</script>

<template>
  <DialogRoot v-model:open="mobileDrawerOpen">
    <DialogTrigger as-child>
      <button
        ref="menuButtonRef"
        class="mobile-trigger"
        type="button"
        data-test="mobile-menu-trigger"
        aria-label="Open main menu"
        aria-haspopup="dialog"
        :aria-expanded="String(mobileDrawerOpen)"
      >
        Menu
      </button>
    </DialogTrigger>

    <DialogPortal>
      <DialogOverlay class="mobile-overlay" data-test="mobile-drawer-overlay" />
      <DialogContent
        class="mobile-content"
        data-test="mobile-drawer"
        aria-label="Main menu"
        @open-auto-focus="onDrawerOpenAutoFocus"
        @close-auto-focus="onDrawerCloseAutoFocus"
      >
        <VisuallyHidden>
          <DialogTitle>Main menu</DialogTitle>
          <DialogDescription>Primary site navigation links</DialogDescription>
        </VisuallyHidden>

        <div class="mobile-content-header">
          <DialogClose as-child>
            <button
              class="mobile-close"
              type="button"
              data-test="mobile-menu-close"
              aria-label="Close main menu"
            >
              Close
            </button>
          </DialogClose>
        </div>

        <nav class="mobile-nav" aria-label="Mobile primary">
          <ul class="mobile-nav-list">
            <li>
              <CollapsibleRoot v-model:open="mobileServicesOpen">
                <CollapsibleTrigger as-child>
                  <button
                    class="mobile-services-toggle"
                    type="button"
                    data-test="mobile-services-toggle"
                  >
                    Services
                  </button>
                </CollapsibleTrigger>
                <CollapsibleContent class="mobile-services-panel" data-test="mobile-services-panel">
                  <ul class="mobile-services-list">
                    <li>
                      <NuxtLink
                        ref="firstDrawerLinkRef"
                        class="mobile-link"
                        to="/services/"
                        @click="closeDrawerAndNavigate"
                      >
                        All Services
                      </NuxtLink>
                    </li>
                    <li>
                      <NuxtLink
                        class="mobile-link"
                        to="/services/specialty-projects-division"
                        @click="closeDrawerAndNavigate"
                      >
                        Specialty Projects Division
                      </NuxtLink>
                    </li>
                    <li>
                      <NuxtLink
                        class="mobile-link"
                        to="/services/construction-management"
                        @click="closeDrawerAndNavigate"
                      >
                        Construction Management
                      </NuxtLink>
                    </li>
                    <li>
                      <NuxtLink
                        class="mobile-link"
                        to="/services/enhanced-preconstruction"
                        @click="closeDrawerAndNavigate"
                      >
                        Enhanced Preconstruction
                      </NuxtLink>
                    </li>
                    <li>
                      <NuxtLink
                        class="mobile-link"
                        to="/services/design-build"
                        @click="closeDrawerAndNavigate"
                      >
                        Design Build
                      </NuxtLink>
                    </li>
                  </ul>
                </CollapsibleContent>
              </CollapsibleRoot>
            </li>
            <li>
              <NuxtLink
                class="mobile-link"
                to="/projects"
                @click="closeDrawerAndNavigate"
              >
                Projects
              </NuxtLink>
            </li>
            <li>
              <NuxtLink
                class="mobile-link"
                to="/team"
                @click="closeDrawerAndNavigate"
              >
                Meet the Team
              </NuxtLink>
            </li>
            <li>
              <NuxtLink
                class="mobile-link"
                to="/about"
                @click="closeDrawerAndNavigate"
              >
                About Us
              </NuxtLink>
            </li>
            <li>
              <NuxtLink
                class="mobile-link"
                to="/contact"
                @click="closeDrawerAndNavigate"
              >
                Contact
              </NuxtLink>
            </li>
          </ul>
        </nav>
      </DialogContent>
    </DialogPortal>
  </DialogRoot>
</template>

<style scoped>
.mobile-trigger {
  min-height: 44px;
  min-width: 44px;
  border: 1px solid #d1d5db;
  background: #fff;
  color: #111827;
  padding: 0.5rem 0.75rem;
}

.mobile-overlay {
  position: fixed;
  inset: 0;
  background: rgb(0 0 0 / 50%);
  z-index: 200;
}

.mobile-content {
  position: fixed;
  top: 0;
  right: 0;
  height: 100dvh;
  width: min(28rem, 92vw);
  margin: 0;
  border: 0;
  background: #fff;
  color: #111827;
  z-index: 201;
  overflow-y: auto;
  padding: 1rem;
}

.mobile-content-header {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 0.5rem;
}

.mobile-close {
  min-height: 44px;
  border: 1px solid #d1d5db;
  background: white;
  padding: 0.5rem 0.75rem;
}

.mobile-nav-list,
.mobile-services-list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  gap: 0.25rem;
}

.mobile-link,
.mobile-services-toggle {
  display: flex;
  align-items: center;
  min-height: 44px;
  text-transform: uppercase;
  font-size: 0.9rem;
}

.mobile-services-toggle {
  width: 100%;
  border: 1px solid #d1d5db;
  background: #f9fafb;
  padding: 0.5rem 0.75rem;
}

.mobile-services-panel {
  margin-left: 0.5rem;
}

@media (min-width: 768px) {
  .mobile-trigger,
  .mobile-overlay,
  .mobile-content {
    display: none;
  }
}
</style>
