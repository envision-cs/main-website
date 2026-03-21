<script setup lang="ts">const mobileDrawerOpen = ref(false);
const mobileServicesOpen = ref(false);
const menuButtonRef = ref<HTMLButtonElement | null>(null);
const firstDrawerLinkRef = ref<HTMLElement | null>(null);
const isDrawerClosing = ref(false);
const serviceLinks = [
  { title: 'All Services', to: '/services/' },
  { title: 'Specialty Projects Division', to: '/services/specialty-projects-division' },
  { title: 'Construction Management', to: '/services/construction-management' },
  { title: 'Enhanced Preconstruction', to: '/services/enhanced-preconstruction' },
  { title: 'Design Build', to: '/services/design-build' },
] as const;

const primaryLinks = [
  { title: 'Projects', to: '/projects' },
  { title: 'Meet the Team', to: '/team' },
  { title: 'About Us', to: '/about' },
  { title: 'Contact', to: '/contact', accent: true },
] as const;

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
    <DialogTrigger class="mobile-trigger" as-child>
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
          <div class="mobile-brand-block">
            <span class="mobile-brand-block__eyebrow">Navigation</span>
            <div class="mobile-brand-block__mark">
              <Icon
                name="logos:envision"
                size="28"
                alt="envision construction logo"
              />
            </div>
          </div>
          <Button
            size="sm"
            type="button"
            class="mobile-nav-close"
            data-test="mobile-menu-close"
            aria-label="Close main menu"
            @click="closeDrawerAndNavigate"
          >
            Close
          </Button>
        </div>

        <nav class="mobile-nav" aria-label="Mobile primary">
          <div class="mobile-nav-intro" data-anim="mobile-nav-link">
            <p class="mobile-nav-intro__label">
              Envision Construction
            </p>
            <p class="mobile-nav-intro__copy">
              Presentation, precision, and craftsmanship carried through every project category and service line.
            </p>
          </div>

          <ul class="mobile-nav-list">
            <li class="mobile-nav-list__item">
              <CollapsibleRoot v-model:open="mobileServicesOpen">
                <CollapsibleTrigger as-child>
                  <button
                    class="mobile-services-toggle"
                    type="button"
                    data-test="mobile-services-toggle"
                    data-anim="mobile-nav-link"
                  >
                    <span class="mobile-services-toggle__label">Services</span>
                    <span class="mobile-services-toggle__meta">{{ String(serviceLinks.length).padStart(2, '0') }}</span>
                  </button>
                </CollapsibleTrigger>
                <CollapsibleContent class="mobile-services-panel" data-test="mobile-services-panel">
                  <ul class="mobile-services-list">
                    <li
                      v-for="(link, index) in serviceLinks"
                      :key="link.to"
                      class="mobile-services-list__item"
                    >
                      <NuxtLink
                        :ref="index === 0 ? firstDrawerLinkRef : undefined"
                        class="mobile-link"
                        :to="link.to"
                        data-anim="mobile-nav-link"
                        @click="closeDrawerAndNavigate"
                      >
                        <span class="mobile-link__index">{{ String(index + 1).padStart(2, '0') }}</span>
                        <span class="mobile-link__label">{{ link.title }}</span>
                      </NuxtLink>
                    </li>
                  </ul>
                </CollapsibleContent>
              </CollapsibleRoot>
            </li>
            <li
              v-for="(link, index) in primaryLinks"
              :key="link.to"
              class="mobile-nav-list__item"
            >
              <NuxtLink
                class="mobile-link"
                :class="{ 'mobile-link--accent': link.accent }"
                :to="link.to"
                data-anim="mobile-nav-link"
                @click="closeDrawerAndNavigate"
              >
                <span class="mobile-link__index">{{ String(index + 1).padStart(2, '0') }}</span>
                <span class="mobile-link__label">{{ link.title }}</span>
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
  display: block;
}

.mobile-overlay {
  position: fixed;
  inset: 0;
  background: rgb(15 31 52 / 14%);
  z-index: 200;
}

.mobile-content {
  position: fixed;
  top: 0;
  right: 0;
  height: 100dvh;
  width: min(28rem, 92vw);
  margin: 0;
  border-left: 1px solid color-mix(in oklch, var(--color-envision-blue-900) 12%, white);
  background: color-mix(in oklch, white 98%, var(--color-envision-blue-50) 2%);
  color: color-mix(in oklch, var(--color-envision-blue-950) 88%, var(--color-envision-green-900) 12%);
  z-index: 201;
  overflow-y: auto;
  padding: 0;
}

.mobile-content-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 1rem;
  padding: 1rem 1rem 0;
}

.mobile-brand-block {
  display: grid;
  gap: 0.45rem;
}

.mobile-brand-block__eyebrow {
  font-size: 0.68rem;
  font-weight: 600;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: color-mix(in oklch, var(--color-envision-blue-900) 52%, white);
}

.mobile-brand-block__mark {
  display: inline-flex;
  align-items: center;
}

.mobile-nav-close {
  flex: 0 0 auto;
}

.mobile-nav-close :deep(.btn-main) {
  border: 1px solid var(--color-envision-blue-900);
  border-radius: 0;
  background: white;
}

.mobile-nav-close :deep(.btn-main--sm) {
  padding: 0.58rem 0.92rem;
  font-size: 0.74rem;
  letter-spacing: 0.14em;
}

.mobile-nav-close :deep(.btn-text) {
  color: var(--color-envision-blue-900);
}

.mobile-nav-close :deep(.btn-overlay) {
  display: none;
}

.mobile-nav {
  padding: 0.75rem 1rem 1rem;
}

.mobile-nav-intro {
  display: grid;
  gap: 0.55rem;
  padding: 0 0 1rem;
  border-bottom: 1px solid color-mix(in oklch, var(--color-envision-blue-900) 10%, white);
  margin-bottom: 0.2rem;
}

.mobile-nav-intro__label {
  margin: 0;
  font-size: 0.72rem;
  font-weight: 600;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: color-mix(in oklch, var(--color-envision-blue-900) 56%, white);
}

.mobile-nav-intro__copy {
  margin: 0;
  max-width: 25ch;
  font-size: 1rem;
  line-height: 1.35;
}

.mobile-nav-list,
.mobile-services-list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  gap: 0;
}

.mobile-nav-list__item,
.mobile-services-list__item {
  border-bottom: 1px solid color-mix(in oklch, var(--color-envision-blue-900) 9%, white);
}

.mobile-link,
.mobile-services-toggle {
  display: grid;
  grid-template-columns: auto 1fr;
  align-items: center;
  column-gap: 0.85rem;
  width: 100%;
  min-height: 4.25rem;
  text-transform: uppercase;
  font-size: 0.92rem;
  text-decoration: none;
  color: inherit;
  background: transparent;
  transition:
    background-color 180ms ease,
    color 180ms ease;
}

.mobile-link {
  padding: 0.95rem 0;
}

.mobile-link__index,
.mobile-services-toggle__meta {
  font-size: 0.68rem;
  font-weight: 600;
  letter-spacing: 0.18em;
  color: color-mix(in oklch, var(--ui-primary) 60%, white);
}

.mobile-link__label,
.mobile-services-toggle__label {
  font-size: 1.32rem;
  font-weight: 600;
  line-height: 1;
  letter-spacing: -0.03em;
  text-transform: none;
}

.mobile-link--accent {
  background: var(--color-envision-blue-900);
  color: white;
  padding-inline: 1rem;
}

.mobile-link--accent .mobile-link__index {
  color: rgb(255 255 255 / 0.66);
}

.mobile-services-toggle {
  width: 100%;
  border: 0;
  background: transparent;
  padding: 0.95rem 0;
  text-align: left;
}

.mobile-link:hover,
.mobile-link:focus-visible,
.mobile-services-toggle:hover,
.mobile-services-toggle:focus-visible {
  background: color-mix(in oklch, var(--color-envision-blue-50) 34%, white);
  outline: none;
}

.mobile-link--accent:hover,
.mobile-link--accent:focus-visible {
  background: color-mix(in oklch, var(--color-envision-blue-900) 92%, white);
}

.mobile-services-panel {
  background: linear-gradient(180deg, color-mix(in oklch, white 93%, var(--color-envision-blue-50) 7%), white);
  border-top: 1px solid color-mix(in oklch, var(--color-envision-blue-900) 8%, white);
}

.mobile-services-list {
  padding-left: 0.9rem;
}

.mobile-services-list .mobile-link {
  min-height: 3.5rem;
}

.mobile-services-list .mobile-link__label {
  font-size: 1rem;
  line-height: 1.1;
}

.mobile-services-list .mobile-link__index {
  color: color-mix(in oklch, var(--color-envision-green-600) 58%, white);
}

@media (min-width: 768px) {
  .mobile-trigger,
  .mobile-overlay,
  .mobile-content {
    display: none;
  }
}
</style>
