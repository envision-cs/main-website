<script setup lang="ts">
import {
  CollapsibleContent,
  CollapsibleRoot,
  CollapsibleTrigger,
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
const isDrawerClosing = ref(false);
const route = useRoute();
const gsap = useGSAP();

watch(() => route.fullPath, async () => {
  if (mobileDrawerOpen.value)
    await closeDrawer();
  mobileServicesOpen.value = false;
});

watch(mobileDrawerOpen, (open) => {
  if (!open)
    mobileServicesOpen.value = false;
});

function closeDrawerAndNavigate() {
  void closeDrawer();
}

function getDrawerElements() {
  const content = document.body.querySelector('[data-test="mobile-drawer"]') as HTMLElement | null;
  const overlay = document.body.querySelector('[data-test="mobile-drawer-overlay"]') as HTMLElement | null;
  const navTargets = content
    ? Array.from(content.querySelectorAll('[data-anim="mobile-nav-link"]')) as HTMLElement[]
    : [];

  return { content, overlay, navTargets };
}

function focusTarget(target: unknown, fallbackSelector: string) {
  if (target && typeof (target as { focus?: () => void }).focus === 'function') {
    (target as { focus: () => void }).focus();
    return;
  }

  const fallback = document.body.querySelector(fallbackSelector) as HTMLElement | null;
  fallback?.focus();
}

function animateDrawerOpen() {
  const { content, overlay, navTargets } = getDrawerElements();
  if (!content)
    return;

  const targets = overlay ? [overlay, content, ...navTargets] : [content, ...navTargets];
  gsap.killTweensOf(targets);

  if (overlay) {
    gsap.set(overlay, { autoAlpha: 0 });
    gsap.to(overlay, { autoAlpha: 1, duration: 0.2, ease: 'power2.out' });
  }

  gsap.set(content, { xPercent: 100 });
  if (navTargets.length)
    gsap.set(navTargets, { autoAlpha: 0, x: 24 });

  const timeline = gsap.timeline();
  timeline.to(content, { xPercent: 0, duration: 0.4, ease: 'power3.out' }, 0);

  if (navTargets.length)
    timeline.to(navTargets, { autoAlpha: 1, x: 0, duration: 0.24, stagger: 0.06, ease: 'power2.out' }, 0.1);
}

function animateDrawerClose() {
  const { content, overlay, navTargets } = getDrawerElements();
  if (!content)
    return Promise.resolve();

  const targets = overlay ? [overlay, content, ...navTargets] : [content, ...navTargets];
  gsap.killTweensOf(targets);

  return new Promise<void>((resolve) => {
    if (navTargets.length) {
      gsap.to(navTargets, {
        autoAlpha: 0,
        x: 14,
        duration: 0.14,
        stagger: { each: 0.03, from: 'end' },
        ease: 'power2.in',
      });
    }

    if (overlay)
      gsap.to(overlay, { autoAlpha: 0, duration: 0.2, ease: 'power2.inOut' });

    gsap.to(content, {
      xPercent: 100,
      duration: 0.3,
      ease: 'power3.in',
      onComplete: resolve,
    });
  });
}

async function closeDrawer() {
  if (!mobileDrawerOpen.value || isDrawerClosing.value)
    return;

  isDrawerClosing.value = true;
  await nextTick();
  await animateDrawerClose();
  mobileDrawerOpen.value = false;
  mobileServicesOpen.value = false;
  isDrawerClosing.value = false;
}

async function onDrawerOpenChange(nextOpen: boolean) {
  if (nextOpen) {
    mobileDrawerOpen.value = true;
    await nextTick();
    animateDrawerOpen();
    return;
  }

  await closeDrawer();
}

function onDrawerOpenAutoFocus(event: Event) {
  event.preventDefault();
  focusTarget(firstDrawerLinkRef.value, '[data-test="mobile-services-toggle"]');
}

function onDrawerCloseAutoFocus(event: Event) {
  event.preventDefault();
  focusTarget(menuButtonRef.value, '[data-test="mobile-menu-trigger"]');
}
</script>

<template>
  <DialogRoot :open="mobileDrawerOpen" @update:open="onDrawerOpenChange">
    <DialogTrigger as-child>
      <Button
        ref="menuButtonRef"
        size="sm"
        data-test="mobile-menu-trigger"
        aria-label="Open main menu"
        aria-haspopup="dialog"
        :aria-expanded="String(mobileDrawerOpen)"
      >
        Menu
      </Button>
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
          <Button
            size="sm"
            type="button"
            data-test="mobile-menu-close"
            aria-label="Close main menu"
            @click="closeDrawerAndNavigate"
          >
            Close
          </Button>
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
                    data-anim="mobile-nav-link"
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
                        data-anim="mobile-nav-link"
                        @click="closeDrawerAndNavigate"
                      >
                        All Services
                      </NuxtLink>
                    </li>
                    <li>
                      <NuxtLink
                        class="mobile-link"
                        to="/services/specialty-projects-division"
                        data-anim="mobile-nav-link"
                        @click="closeDrawerAndNavigate"
                      >
                        Specialty Projects Division
                      </NuxtLink>
                    </li>
                    <li>
                      <NuxtLink
                        class="mobile-link"
                        to="/services/construction-management"
                        data-anim="mobile-nav-link"
                        @click="closeDrawerAndNavigate"
                      >
                        Construction Management
                      </NuxtLink>
                    </li>
                    <li>
                      <NuxtLink
                        class="mobile-link"
                        to="/services/enhanced-preconstruction"
                        data-anim="mobile-nav-link"
                        @click="closeDrawerAndNavigate"
                      >
                        Enhanced Preconstruction
                      </NuxtLink>
                    </li>
                    <li>
                      <NuxtLink
                        class="mobile-link"
                        to="/services/design-build"
                        data-anim="mobile-nav-link"
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
                data-anim="mobile-nav-link"
                @click="closeDrawerAndNavigate"
              >
                Projects
              </NuxtLink>
            </li>
            <li>
              <NuxtLink
                class="mobile-link"
                to="/team"
                data-anim="mobile-nav-link"
                @click="closeDrawerAndNavigate"
              >
                Meet the Team
              </NuxtLink>
            </li>
            <li>
              <NuxtLink
                class="mobile-link"
                to="/about"
                data-anim="mobile-nav-link"
                @click="closeDrawerAndNavigate"
              >
                About Us
              </NuxtLink>
            </li>
            <li>
              <NuxtLink
                class="mobile-link"
                to="/contact"
                data-anim="mobile-nav-link"
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
