<script setup lang="ts">
import type { FormSubmitEvent } from '@nuxt/ui';

import * as z from 'zod/v3';

const schema = z.object({
  name: z.string().min(2, 'Must be at least 2 characters'),
  company: z.string().optional(),
  email: z.string().email('Please enter a vaild email'),
  phone: z
    .string()
    .refine(
      v => v.replace(/\D/g, '').length === 10,
      'Enter a 10-digit phone number',
    ),
  message: z
    .string()
    .max(200, 'Message must be less than 250 characters'),
});
type Schema = z.output<typeof schema>;

const state = reactive({
  name: '',
  company: '',
  email: '',
  phone: '',
  message: '',
});

const toast = useToast();

function formatPhone(digits: string) {
  const [a, b, c] = [
    digits.slice(0, 3),
    digits.slice(3, 6),
    digits.slice(6, 10),
  ];
  return `(${a}) ${b}-${c}`;
}

function onPhoneBlur() {
  const raw = (state.phone ?? '').toString();
  const digits = raw.replace(/\D/g, '');
  if (digits.length === 10)
    state.phone = formatPhone(digits);
}

async function onSubmit(event: FormSubmitEvent<Schema>) {
  try {
    await $fetch('https://submit-form.com/1mjeYb91R', {
      method: 'POST',
      body: event.data,
    });
    toast.add({
      title: 'Success',
      description: 'Your message has been sent!',
      color: 'primary',
    });
  }
  catch (error) {
    console.error('Form submission error:', error);
    toast.add({
      title: 'Error',
      description: 'There was an issue sending your message. Please try again later.',
      color: 'error',
    });
  }
}

const text_count = computed(() => `${state.message.length} / 250`);
</script>

<template>
  <UForm
    :schema="schema"
    :state="state"
    class="space-y-4"
    @submit="onSubmit"
  >
    <div class="grid grid-cols-1 gap-4 ">
      <!-- Name -->
      <UFormField
        label="Name"
        name="name"
        size="xl"
      >
        <UInput
          v-model="state.name"
          class="w-full"
          placeholder="Your name"
        />
      </UFormField>

      <!-- Company -->
      <UFormField
        label="Company"
        name="company"
        class="w-full [&_label]:w-full"
        hint="Optional"
      >
        <UInput
          v-model="state.company"
          class="w-full"
          placeholder="Company"
          size="xl"
        />
      </UFormField>

      <!-- Email -->
      <UFormField
        label="Email"
        name="email"
        size="xl"
      >
        <UInput
          v-model="state.email"
          type="email"
          class="w-full"
          placeholder="you@example.com"
        />
      </UFormField>

      <!-- Phone -->
      <UFormField
        label="Phone"
        name="phone"
        size="xl"
      >
        <UInput
          v-model="state.phone"
          type="tel"
          inputmode="tel"
          class="w-full"
          placeholder="(555) 123-4567"
          @blur="
            () => {
              onPhoneBlur();
            }
          "
        />
      </UFormField>
    </div>

    <!-- Message -->
    <UFormField
      label="Message"
      name="message"
      size="xl"
      :hint="text_count"
    >
      <UTextarea
        v-model="state.message"
        class="w-full"
        :rows="5"
        :maxlength="250"
        placeholder="How can we help?"
      />
    </UFormField>

    <UButton
      type="submit"
      color="primary"
      block
    >
      Submit
    </UButton>
  </UForm>
</template>
