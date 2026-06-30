<script setup lang="ts">
import type { VNode } from 'vue';
import { Comment, Text } from 'vue';

interface BannerStat {
  id?: number;
  label: string;
  description?: string;
}

const props = defineProps<{
  image?: string;
  imageAlt?: string;
  body?: string;
  cta?: string;
  ctaTo?: string;
  featureImage?: string;
  featureImageAlt?: string;
  featureTitle?: string;
  featureEyebrow?: string;
  featureTo?: string;
  featureCta?: string;
  stats?: BannerStat[];
  position?: string;
}>();

const slots = useSlots();

function hasRenderableSlot(nodes: VNode[] = []): boolean {
  return nodes.some((node) => {
    if (node.type === Comment) return false;

    if (node.type === Text) return String(node.children ?? '').trim().length > 0;

    if (Array.isArray(node.children)) return hasRenderableSlot(node.children as VNode[]);

    if (typeof node.children === 'string') return node.children.trim().length > 0;

    return true;
  });
}

const hasTitle = computed(() => hasRenderableSlot(slots.default?.() ?? []));
const hasEyebrow = computed(() => Boolean(slots.eyebrow || slots.title));
const hasBody = computed(() => Boolean(slots.body || props.body));
const hasMedia = computed(() => Boolean(slots.image || props.image));
const hasActions = computed(() => Boolean(slots.actions || props.ctaTo));
const featureImage = computed(() => props.featureImage || props.image);
const featureTo = computed(() => props.featureTo || props.ctaTo);
const featureCta = computed(() => props.featureCta || props.cta || 'Read more');
const hasFeatureCard = computed(() =>
  Boolean(slots.card || (featureImage.value && featureTo.value && featureCta.value)),
);
const statItems = computed<Item[]>(() =>
  (props.stats ?? []).map((stat, index) => ({
    id: stat.id ?? index,
    label: stat.label,
    description: stat.description,
  })),
);
const hasStats = computed(() => Boolean(slots.stats || statItems.value.length));
const hasRail = computed(() => hasFeatureCard.value || hasStats.value);
</script>

<template>
  <section
    class="banner"
    :aria-labelledby="hasTitle ? 'banner-title' : undefined"
    :aria-describedby="hasBody ? 'banner-body' : undefined"
    role="region"
  >
    <div
      v-if="hasMedia"
      class="banner__media"
      :style="{
        '--image-position': position ?? 'center',
      }"
    >
      <slot name="image">
        <NuxtImg
          v-if="image"
          :src="image"
          :alt="imageAlt || ''"
          sizes="100vw sm:640px md:768px lg:1024px xl:1280px 2xl:1536px"
          fit="cover"
          :quality="80"
          fetchpriority="high"
          format="avif"
          loading="eager"
          preload
          class="banner__image"
        />
      </slot>
    </div>

    <div v-if="hasTitle" class="banner__overlay" aria-hidden="true" />

    <div class="banner__inner site-grid">
      <div class="banner__copy">
        <app-typography v-if="hasEyebrow" variant="eyebrow-md" tag="p" class="eyebrow">
          <slot name="eyebrow">
            <slot name="title" />
          </slot>
        </app-typography>

        <app-typography
          v-if="hasTitle"
          id="banner-title"
          tag="h1"
          variant="heading-xl"
          class="banner__title"
        >
          <slot />
        </app-typography>

        <app-typography v-if="hasBody" id="banner-body" tag="p" variant="text-md" class="text">
          <slot name="body">
            {{ body }}
          </slot>
        </app-typography>

        <div v-if="hasActions" class="banner__actions">
          <slot name="actions">
            <m-button
              v-if="ctaTo"
              variant="outline"
              size="md"
              :to="ctaTo"
              icon="i-lucide-arrow-right"
            >
              {{ cta || 'Start your project' }}
            </m-button>
          </slot>
        </div>
      </div>

      <aside v-if="hasRail" class="banner__rail" aria-label="Featured banner details">
        <slot name="stats">
          <ul v-if="statItems.length" class="banner__stats">
            <li v-for="item in statItems" :key="item.id">
              <card-e :item="item" small />
            </li>
          </ul>
        </slot>
      </aside>
    </div>
  </section>
</template>

<style scoped>
.banner {
  --banner-edge: color-mix(in srgb, var(--color-white) 18%, transparent);
  --accent-color: var(--color-envision-green-500);
  --section-bg: var(--color-envision-gray-900);
  --section-color: var(--color-white);

  display: grid;
  isolation: isolate;
  position: relative;
  min-height: 640px;
  grid-column: 1 / -1;
  color: var(--color-white);
  background: var(--color-envision-gray-900);
  overflow: hidden;
}

.banner__media,
.banner__overlay {
  position: absolute;
  inset: 0;
}

.banner__media {
  z-index: 0;
  overflow: hidden;
}

.banner__image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: var(--image-position, center);
}

.banner__overlay {
  z-index: 1;
  background:
    radial-gradient(
      ellipse at 20% 82%,
      rgb(7 12 18 / 0.82) 0%,
      rgb(7 12 18 / 0.62) 28%,
      rgb(7 12 18 / 0.18) 56%,
      transparent 76%
    ),
    linear-gradient(0deg, rgb(7 12 18 / 0.34) 0%, rgb(7 12 18 / 0.12) 38%, transparent 68%);
}

.banner__inner {
  z-index: 2;
  position: relative;
  width: 100%;
  align-self: end;
  gap: calc(var(--spacing) * 8);
  padding: calc(var(--spacing) * 30) calc(var(--spacing) * 4) calc(var(--spacing) * 12);
}

.banner__copy {
  display: grid;
  grid-column: 1 / -1;
  align-content: end;
  gap: calc(var(--spacing) * 4);
  z-index: 2;
  max-width: 42rem;
}

.eyebrow {
  text-transform: uppercase;
  font-weight: 700;
  letter-spacing: 0;
  color: #fff;
}

.banner__title {
  max-inline-size: 20ch;
  color: var(--color-white);
  text-wrap: balance;
  overflow-wrap: break-word;
}

.text {
  color: color-mix(in srgb, var(--color-white) 84%, transparent);
  max-width: 34rem;
  font-weight: 500;
  text-wrap: pretty;
}

.banner__actions {
  display: flex;
  flex-wrap: wrap;
  gap: calc(var(--spacing) * 3);
  align-items: center;
}

.banner__actions :deep(.app-btn) {
  border-radius: 4px;
  text-transform: none;
}

.banner__rail {
  display: grid;
  grid-column: 1 / -1;
  gap: calc(var(--spacing) * 4);
  align-self: end;
  min-width: 0;
}

.banner__stats {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(8rem, 1fr));
  gap: calc(var(--spacing) * 3);
  color: var(--color-white);
}

.banner__stats :deep(.card) {
  border-left-color: var(--accent-color);
  background: rgb(255 255 255 / 0.04);
}

.banner__feature-card {
  outline: 1px solid var(--banner-edge);
}

.banner__feature-eyebrow {
  margin-bottom: calc(var(--spacing) * 1);
  color: color-mix(in srgb, var(--color-white) 82%, transparent);
  letter-spacing: 0;
}

.banner__feature-title {
  max-width: 18rem;
  text-wrap: balance;
}

.banner__feature-meta {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: calc(var(--spacing) * 3);
  width: 100%;
}

@media (min-width: 700px) {
  .banner {
    min-height: 680px;
  }

  .banner__inner {
    padding-inline: calc(var(--spacing) * 8);
    padding-bottom: calc(var(--spacing) * 16);
  }

  .banner__copy {
    grid-column: 1 / 10;
    max-width: 36rem;
  }

  .banner__title {
    max-inline-size: 20ch;
  }

  .text {
    max-width: 32rem;
  }

  .banner__rail {
    grid-column: 8 / -1;
  }
}

@media (min-width: 1024px) {
  .banner {
    min-height: 720px;
  }

  .banner__inner {
    align-items: end;
  }

  .banner__copy {
    grid-column: 1 / 15;
    max-width: 42rem;
  }

  .banner__title {
    max-inline-size: 20ch;
  }

  .text {
    max-width: 35rem;
  }

  .banner__rail {
    grid-column: 17 / -1;
  }
}

@media (min-width: 1280px) {
  .banner {
    min-height: 760px;
  }

  .banner__copy {
    grid-column: 1 / 14;
  }

  .banner__rail {
    grid-column: 16 / -1;
  }
}

@media (max-width: 699px) {
  .banner {
    min-height: 100svh;
  }

  .banner__image {
    object-position: var(--image-position, center top);
  }

  .banner__overlay {
    background:
      radial-gradient(
        ellipse at 24% 78%,
        rgb(7 12 18 / 0.84) 0%,
        rgb(7 12 18 / 0.64) 34%,
        rgb(7 12 18 / 0.24) 62%,
        transparent 82%
      ),
      linear-gradient(0deg, rgb(7 12 18 / 0.38) 0%, rgb(7 12 18 / 0.14) 42%, transparent 72%);
  }

  .banner__inner {
    align-self: end;
    padding-block: calc(var(--spacing) * 24) calc(var(--spacing) * 12);
  }

  .banner__copy {
    align-content: end;
    gap: calc(var(--spacing) * 3);
    max-width: 30rem;
  }

  .banner__title {
    max-inline-size: 11ch;
  }

  .eyebrow {
    font-size: var(--font-size-text-t4);
    line-height: 1;
  }

  .text {
    max-width: 28rem;
    display: -webkit-box;
    overflow: hidden;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 5;
  }
}

@media (max-width: 399px) {
  .banner__title {
    max-inline-size: 10ch;
  }

  .text {
    -webkit-line-clamp: 4;
  }
}
</style>
