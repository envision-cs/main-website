<script setup lang="ts">
import { computed } from 'vue';

type ButtonVariant = 'solid' | 'outline' | 'soft' | 'ghost' | 'link';
type ButtonSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
type ButtonColor = 'primary' | 'neutral' | 'black' | 'white' | 'success' | 'warning' | 'error' | string;

type Action = {
  label: string;
  to?: string | undefined;
  href?: string | undefined;
  variant?: ButtonVariant | undefined;
  color?: ButtonColor | undefined;
  size?: ButtonSize;
  external?: boolean;
};

type Props = {
  title?: string;
  description?: string;
  imageSrc?: string;
  imageAlt?: string;
  primaryAction?: Action | null;
  secondaryAction?: Action | null;
  headingTag?: string;
  align?: 'top' | 'center' | 'bottom';
  overlay?: boolean;
  fullHeight?: boolean;
  containerClass?: string;
};

const props = withDefaults(defineProps<Props>(), {
  title: 'You need a builder who sees the bigger picture.',
  description: 'We manage construction projects with excellence, purpose, and people-first precision.',
  imageSrc: '/hero-small.png',
  imageAlt: 'Construction site hero image',
  primaryAction: () => ({ label: 'Start Your Project', to: '#', color: 'primary', size: 'xl', variant: 'solid' }),
  secondaryAction: () => ({ label: 'See Our Work', to: '#cta', color: 'neutral', size: 'xl', variant: 'outline' }),
  headingTag: 'h1',
  align: 'bottom',
  overlay: true,
  fullHeight: true,
  containerClass: '',
});

const alignClasses = computed(() => {
  switch (props.align) {
    case 'top':
      return 'items-start';
    case 'center':
      return 'items-center';
    default:
      return 'items-end';
  }
});
</script>

<template>
  <section
    id="hero"
    role="region"
    aria-label="Hero"
    class="relative overflow-hidden"
  >
    <NuxtImg
      :src="props.imageSrc"
      :alt="props.imageAlt"
      sizes="sm:100vw md:100vw lg:100vw"
      densities="x1 x2"
      class="w-full object-cover"
      :class="[props.fullHeight ? 'h-dvh' : 'min-h-[60vh]']"
      preload
    />

    <div v-if="props.overlay" class="pointer-events-none absolute inset-0 bg-linear-to-t from-black/60 to-black/0" />

    <div class="absolute inset-0">
      <UContainer
        class="h-full flex px-4 md:px-6"
        :class="[alignClasses, props.fullHeight ? 'pb-10 md:pb-20' : 'py-10 md:py-16', props.containerClass]"
      >
        <div class="text-white max-w-6xl">
          <slot name="title">
            <component
              :is="props.headingTag"
              class="mt-2 uppercase text-balance text-3xl sm:text-4xl lg:text-6xl font-medium leading-none"
            >
              {{ props.title }}
            </component>
          </slot>

          <slot name="description">
            <p class="mt-2 md:mt-3 text-base/5 sm:text-2xl/8 text-white/80 text-balance">
              {{ props.description }}
            </p>
          </slot>

          <slot name="actions">
            Hellp
            <div class="mt-6 flex flex-wrap gap-3">
              <UButton
                v-if="props.primaryAction"
                v-bind="props.primaryAction"
                :to="props.primaryAction?.to"
              >
                {{ props.primaryAction?.label }}
              </UButton>
              <UButton v-if="props.secondaryAction" v-bind="props.secondaryAction">
                {{ props.secondaryAction?.label }}
              </UButton>
            </div>
          </slot>
        </div>
      </UContainer>
    </div>
  </section>
</template>
