<script setup lang="ts">
const props = withDefaults(defineProps<{
  title: string;
  address: string;
  phone?: string;
  email?: string;
  callLabel?: string;
  emailLabel?: string;
}>(), {
  callLabel: 'Call Us',
  emailLabel: 'Email Us',
});

const hasActions = computed(() => Boolean(props.phone || props.email));

const phoneLink = computed(() => {
  if (!props.phone)
    return undefined;
  const cleaned = props.phone.replace(/[^\d+]/g, '');
  return `tel:${cleaned}`;
});

const emailLink = computed(() => {
  if (!props.email)
    return undefined;
  return props.email.startsWith('mailto:') ? props.email : `mailto:${props.email}`;
});
</script>

<template>
  <UCard class="location-card" :ui="{ body: { padding: 'p-0 sm:p-0' }, footer: { padding: 'p-0 sm:p-0' } }">
    <template #header>
      <app-typography
        tag="h3"
        variant="heading-sm"
        class="font-semibold text-gray-700 dark:text-gray-200"
      >
        {{ title }}
      </app-typography>
    </template>

    <div class="p-4 space-y-1">
      <app-typography
        tag="p"
        variant="text-xl"
        class="leading-snug"
      >
        {{ address }}
      </app-typography>
      <app-typography
        v-if="phone"
        tag="p"
        variant="text-xl"
        class="leading-snug"
      >
        {{ phone }}
      </app-typography>
      <app-typography
        v-if="email"
        tag="p"
        variant="text-xl"
        class="leading-snug"
      >
        {{ email }}
      </app-typography>
    </div>

    <template v-if="hasActions" #footer>
      <div class="flex border-t border-gray-200 dark:border-gray-700 divide-x divide-gray-200 dark:divide-gray-700">
        <UButton
          v-if="email"
          :to="emailLink"
          variant="ghost"
          color="gray"
          icon="i-lucide-mail"
          :label="emailLabel"
          class="flex-1 justify-center rounded-none hover:bg-primary-500 hover:text-white transition-colors py-3"
        />

        <UButton
          v-if="phone"
          :to="phoneLink"
          variant="ghost"
          color="gray"
          icon="i-lucide-phone-call"
          :label="callLabel"
          class="flex-1 justify-center rounded-none hover:bg-primary-500 hover:text-white transition-colors py-3"
        />
      </div>
    </template>
  </UCard>
</template>

<style scoped>
.location-card {
  flex-basis: 50%;
  flex-grow: 1;
}
</style>
