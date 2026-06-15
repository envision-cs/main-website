<script setup lang="ts">interface BannerStat {
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
    aria-labelledby="banner-title"
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
          fetchpriority="high"
        format="avif"
                  loading="eager"
                  preload
          class="banner__image"
        />
      </slot>
    </div>

    <div class="banner__overlay" aria-hidden="true" />

    <div class="banner__inner site-grid">
      <div class="banner__copy">
        <app-typography v-if="hasEyebrow" variant="heading-sm" tag="p" class="eyebrow mb-3">
          <slot name="eyebrow">
            <slot name="title" />
          </slot>
        </app-typography>

        <app-typography
          id="banner-title"
          tag="h1"
          variant="heading-huge"
          class="max-w-full md:max-w-[60vw] text-balance"
        >
          <slot />
        </app-typography>

        <app-typography v-if="hasBody" id="banner-body" tag="p" variant="text-xl" class="text">
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
  min-height: clamp(600px, 78svh, 820px);
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
    radial-gradient(ellipse at bottom left, rgba(6, 11, 18, 0.7) 0%, rgba(6, 11, 18, 0) 50%),
    radial-gradient(ellipse at top left, rgba(6, 11, 18, 0.6) 0%, rgba(6, 11, 18, 0) 25%);
}

.banner__inner {
  z-index: 2;
  position: relative;
  width: 100%;
  align-self: end;
  gap: calc(var(--spacing) * 8);
  padding: calc(var(--spacing) * 28) calc(var(--spacing) * 4) calc(var(--spacing) * 12);
}

.banner__copy {
  display: grid;
  grid-column: 1 / -1;
  align-content: end;
  gap: calc(var(--spacing) * 5);
  z-index: 2;
  max-width: 60rem;
}

.eyebrow {
  text-transform: uppercase;
  font-weight: 600;
  letter-spacing: 0.08em;
  color: #fff;
}

.text {
  color: color-mix(in srgb, var(--color-white) 84%, transparent);
  max-width: 44rem;
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
  letter-spacing: 0.08em;
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
  .banner__inner {
    padding-inline: calc(var(--spacing) * 8);
    padding-bottom: calc(var(--spacing) * 16);
  }

  .banner__copy {
    grid-column: 1 / 10;
  }

  .banner__rail {
    grid-column: 8 / -1;
  }
}

@media (min-width: 1024px) {
  .banner__inner {
    align-items: end;
  }

  .banner__copy {
    grid-column: 1 / 15;
  }

  .banner__rail {
    grid-column: 17 / -1;
  }
}

@media (min-width: 1280px) {
  .banner__copy {
    grid-column: 1 / 14;
  }

  .banner__rail {
    grid-column: 16 / -1;
  }
}
</style>
