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
  <article class="location-card">
    <header class="header">
      <app-typography
        tag="h3"
        variant="heading-md"
        class="title"
      >
        {{ title }}
      </app-typography>
    </header>

    <div class="details">
      <app-typography
        tag="p"
        variant="text-xl"
        class="address"
      >
        {{ address }}
      </app-typography>
      <app-typography
        v-if="phone"
        tag="p"
        variant="text-xl"
        class="contact-info"
      >
        {{ phone }}
      </app-typography>
      <app-typography
        v-if="email"
        tag="p"
        variant="text-xl"
        class="contact-info"
      >
        {{ email }}
      </app-typography>
    </div>

    <footer v-if="hasActions" class="actions">
      <UButton
        v-if="email"
        :to="emailLink"
        variant="ghost"
        color="gray"
        icon="i-lucide-mail"
        :label="emailLabel"
        class="action-btn"
      />

      <UButton
        v-if="phone"
        :to="phoneLink"
        variant="ghost"
        color="gray"
        icon="i-lucide-phone-call"
        :label="callLabel"
        class="action-btn"
      />
    </footer>
  </article>
</template>

<style scoped>
.location-card {
  container-type: inline-size;
  border-bottom: 1px solid var(--ui-border);
  background: transparent;
  transition:
    background 0.4s ease,
    color 0.4s ease;
  padding: calc(var(--spacing) * 4);
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  height: 100%;
}

.location-card:hover {
  background: var(--color-envision-blue-500);
}

.header {
  margin-bottom: 0.5rem;
}

.details {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.actions {
  display: flex;
  gap: 1rem;
  margin-top: auto;
  border-top: 1px solid var(--ui-border); /* Optional: Separator like UCard footer */
  padding-top: 1rem;
}

/* Remove border-top from actions on hover if it looks weird against the blue bg,
   or adjust the border color. For now, let's keep it simple.
   Actually, ProjectCard doesn't have a visible footer border, it relies on alignment.
   I'll remove the border-top for a cleaner look.
*/
.actions {
  border-top: none;
  padding-top: 0;
}

/* Style buttons to inherit color or be white on hover */
.action-btn {
  /* Ensure text is visible on dark background */
}

.location-card:hover :deep(.action-btn) {
  /* Force white text on hover if the background is dark blue */
  /* This depends on the button variant. 'ghost' color 'gray' might be invisible on blue. */
  /* We might need to override the button styling dynamically or via CSS */
  color: white;
}
</style>
