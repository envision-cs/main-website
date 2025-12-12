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
  <article
    class="location-card"
    role="group"
    aria-label="Location card"
  >
    <header class="location-card__header">
      <app-typography
        tag="h3"
        variant="heading-sm"
        class="location-card__title"
      >
        {{ title }}
      </app-typography>
    </header>

    <div class="location-card__address">
      <app-typography
        tag="p"
        variant="text-xl"
        class="location-card__address-line"
      >
        {{ address }}
      </app-typography>
      <app-typography
        tag="p"
        variant="text-xl"
        class="location-card__address-line"
      >
        {{ phone }}
      </app-typography>
      <app-typography
        tag="p"
        variant="text-xl"
        class="location-card__address-line"
      >
        {{ email }}
      </app-typography>
    </div>

    <div v-if="hasActions" class="location-card__actions">
      <a
        v-if="email"
        :href="emailLink"
        class="location-card__action"
        aria-label="Email this office"
      >
        <span class="location-card__icon">
          <UIcon name="i-lucide-mail" size="20" />
        </span>
        <span class="location-card__action-label">
          {{ emailLabel }}
        </span>
      </a>

      <a
        v-if="phone"
        :href="phoneLink"
        class="location-card__action"
        aria-label="Call this office"
      >
        <span class="location-card__icon">
          <UIcon name="i-lucide-phone-call" size="20" />
        </span>
        <span class="location-card__action-label">
          {{ callLabel }}
        </span>
      </a>
    </div>
  </article>
</template>

<style scoped>
.location-card {
  border: 1px solid var(--ui-border);
  display: grid;
  row-gap: calc(var(--spacing) * 2);
  flex-basis: 50%;
  flex-grow: 1;
}

.location-card__header {
  padding: calc(var(--spacing) * 4) calc(var(--spacing) * 4) 0;
}

.location-card__title {
  margin: 0;
  font-weight: 600;
  color: #3f3f46;
}

.location-card__address {
  padding: 0 calc(var(--spacing) * 4) calc(var(--spacing) * 3);
  display: grid;
  gap: calc(var(--spacing) * 1);
}

.location-card__address-line {
  margin: 0;
  line-height: 1.5;
  color: inherit;
}

.location-card__actions {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(0, 1fr));
  border-top: 1px solid var(--ui-border);
}

.location-card__action {
  padding: calc(var(--spacing) * 2);
  display: grid;
  gap: calc(var(--spacing) * 2);
  place-items: center;
  text-decoration: none;
  color: #020618;
  font-weight: 700;
  border-right: 1px solid var(--ui-border);
  transition:
    background-color 0.2s ease-in-out,
    color 0.2s ease-in-out;
}

.location-card__action:last-child {
  border-right: none;
}

.location-card__action:hover {
  color: #fff;
  background: var(--ui-primary);
}

.location-card__icon {
  width: 42px;
  height: 42px;
  border-radius: 999px;
  display: grid;
  place-items: center;
}

.location-card__action-label {
  font-size: 0.8125rem;
  letter-spacing: 0.02em;
}
</style>
