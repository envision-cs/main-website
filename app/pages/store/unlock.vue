<script setup lang="ts">
const password = ref("");
const errorMessage = ref("");
const isSubmitting = ref(false);
const isSuccess = ref(false);
const showLoadingIndicator = ref(false);
const { fetch: refreshSession } = useUserSession();

const fieldState = computed(() => {
  if (isSuccess.value) return "success";
  if (errorMessage.value) return "error";
  if (isSubmitting.value) return "loading";

  return "default";
});

const buttonLabel = computed(() => {
  if (isSuccess.value) return "Access granted";
  if (isSubmitting.value) return "Checking access";

  return "Unlock store";
});

const fieldMessage = computed(() => {
  if (isSuccess.value) return "Password accepted. Opening the store.";
  if (errorMessage.value) return errorMessage.value;

  return "Use the password provided by Envision. Passwords are case-sensitive.";
});

let loadingIndicatorTimer: ReturnType<typeof setTimeout> | undefined;

function clearLoadingIndicator() {
  if (loadingIndicatorTimer) clearTimeout(loadingIndicatorTimer);

  loadingIndicatorTimer = undefined;
  showLoadingIndicator.value = false;
}

function handlePasswordInput() {
  if (errorMessage.value) errorMessage.value = "";
}

async function unlock() {
  if (isSubmitting.value || isSuccess.value) return;

  errorMessage.value = "";
  isSubmitting.value = true;
  loadingIndicatorTimer = setTimeout(() => {
    showLoadingIndicator.value = isSubmitting.value;
  }, 150);

  try {
    await $fetch("/api/unlock", {
      method: "POST",
      body: { password: password.value },
    });

    await refreshSession();
    isSuccess.value = true;
    await navigateTo("/store/shop");
  } catch (error) {
    const statusCode =
      (error as { statusCode?: number; response?: { status?: number } }).statusCode ??
      (error as { response?: { status?: number } }).response?.status;

    errorMessage.value =
      statusCode === 401
        ? "That password wasn’t recognized. Check it and try again."
        : "We couldn’t verify access. Try again.";
  } finally {
    isSubmitting.value = false;
    clearLoadingIndicator();
  }
}

onBeforeUnmount(clearLoadingIndicator);
</script>

<template>
  <section class="store-unlock" aria-labelledby="store-unlock-title">
    <div class="store-unlock__inner">
      <header class="store-unlock__header">
        <p class="store-unlock__eyebrow">Company store</p>
        <app-typography
          id="store-unlock-title"
          tag="h2"
          variant="heading-lg"
          class="store-unlock__title"
        >
          Unlock the company store
        </app-typography>
        <app-typography tag="p" variant="text-md" class="store-unlock__intro">
          Enter the password supplied by Envision to view the store and place an order.
        </app-typography>
      </header>

      <form
        class="store-unlock__form"
        :data-state="fieldState"
        :aria-busy="isSubmitting"
        @submit.prevent="unlock"
      >
        <div class="store-unlock__field" :data-state="fieldState">
          <label for="store-password" class="store-unlock__label">Store password</label>
          <div class="store-unlock__input-shell">
            <input
              id="store-password"
              v-model="password"
              class="store-unlock__input"
              type="password"
              autocomplete="current-password"
              placeholder="Enter password"
              :aria-invalid="Boolean(errorMessage)"
              aria-required="true"
              aria-describedby="store-password-message"
              :disabled="isSuccess"
              required
              @input="handlePasswordInput"
            />
            <span class="store-unlock__status-icon" aria-hidden="true">
              <UIcon
                v-if="showLoadingIndicator"
                name="i-lucide-loader-circle"
                class="store-unlock__spinner"
              />
              <UIcon v-else-if="isSuccess" name="i-lucide-circle-check" />
              <UIcon v-else-if="errorMessage" name="i-lucide-circle-alert" />
            </span>
          </div>
          <p
            id="store-password-message"
            class="store-unlock__message"
            aria-live="polite"
            aria-atomic="true"
          >
            {{ fieldMessage }}
          </p>
        </div>

        <div class="store-unlock__action">
          <p class="store-unlock__session-note">
            Access stays unlocked on this browser for up to eight hours.
          </p>
          <button
            type="submit"
            class="store-unlock__submit"
            :data-state="fieldState"
            :disabled="isSubmitting || isSuccess"
          >
            <UIcon v-if="isSuccess" name="i-lucide-check" aria-hidden="true" />
            <span>{{ buttonLabel }}</span>
          </button>
        </div>
      </form>
    </div>
  </section>
</template>

<style scoped>
.store-unlock {
  --section-bg: var(--color-envision-gray-900);
  --section-color: var(--color-white);
  --store-accent: var(--color-envision-blue-500);
  --store-rule: color-mix(in oklab, var(--section-color) 14%, transparent);
  --store-muted: color-mix(in oklab, var(--section-color) 66%, transparent);
  --store-field-border: color-mix(in oklab, var(--section-color) 32%, transparent);
  --store-field-hover: color-mix(in oklab, var(--section-color) 5%, transparent);
  --store-focus: var(--color-envision-blue-400);
  --store-button: var(--color-envision-blue-400);
  --store-button-hover: var(--color-envision-blue-500);
  --store-button-ink: var(--color-envision-gray-900);
  --store-error: oklch(0.78 0.14 28);
  --store-success: var(--color-envision-green-400);
  --ease-out: cubic-bezier(0.16, 1, 0.3, 1);
  --duration-micro: 120ms;
  --duration-loader: 900ms;

  grid-column: 1 / -1;
  color: var(--section-color);
  background: var(--section-bg);
  border-block: 1px solid var(--store-rule);
}

.store-unlock__inner {
  display: grid;
  width: 100%;
  margin-inline: auto;
}

.store-unlock__header {
  display: grid;
  gap: calc(var(--spacing) * 3);
  align-content: end;
  min-height: 22rem;
  padding: calc(var(--spacing) * 8);
  border-block-end: 1px solid var(--store-rule);
}

.store-unlock__eyebrow {
  width: fit-content;
  margin: 0;
  color: var(--store-accent);
  font-size: var(--font-size-text-t4);
  font-weight: 700;
  line-height: 1;
  text-transform: uppercase;
}

.store-unlock__title {
  max-inline-size: 12ch;
  margin: 0;
  color: var(--section-color);
}

.store-unlock__intro {
  max-inline-size: 38ch;
  margin: 0;
  color: var(--store-muted);
}

.store-unlock__form {
  display: grid;
  margin: 0;
  background: var(--section-bg);
}

.store-unlock__field,
.store-unlock__action {
  display: grid;
  gap: calc(var(--spacing) * 4);
  align-content: center;
  min-width: 0;
  min-height: 12rem;
  padding: calc(var(--spacing) * 8);
  border-block-end: 1px solid var(--store-rule);
}

.store-unlock__action {
  border-block-end: 0;
}

.store-unlock__label {
  color: var(--store-muted);
  font-size: var(--font-size-text-t3);
  font-weight: 500;
  line-height: 1;
}

.store-unlock__input-shell {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 3rem;
  min-height: 3.5rem;
  overflow: clip;
  color: var(--section-color);
  background: transparent;
  border: 1px solid var(--store-field-border);
  outline: 3px solid transparent;
  outline-offset: 2px;
  transition:
    background-color var(--duration-micro) var(--ease-out),
    border-color var(--duration-micro) var(--ease-out);
}

.store-unlock__input {
  min-width: 0;
  min-height: 3.375rem;
  padding: 0 calc(var(--spacing) * 4);
  color: var(--section-color);
  background: transparent;
  border: 0;
  outline: 0;
  font: inherit;
  font-size: var(--font-size-text-t2);
}

.store-unlock__input::placeholder {
  color: var(--store-muted);
  opacity: 1;
}

.store-unlock__input:disabled {
  cursor: not-allowed;
  opacity: 0.55;
}

.store-unlock__input-shell:has(.store-unlock__input:focus-visible) {
  border-color: var(--store-focus);
  outline-color: var(--store-focus);
}

.store-unlock__status-icon {
  display: grid;
  place-items: center;
  min-width: 0;
  color: var(--store-muted);
}

.store-unlock__status-icon svg {
  width: 1.25rem;
  height: 1.25rem;
}

.store-unlock__message {
  min-height: 1.5em;
  max-width: 48ch;
  margin: 0;
  color: var(--store-muted);
  font-size: var(--font-size-text-t4);
  line-height: 1.45;
}

.store-unlock__field[data-state="error"] .store-unlock__input-shell {
  color: var(--store-error);
  border-color: var(--store-error);
}

.store-unlock__field[data-state="error"] .store-unlock__message,
.store-unlock__field[data-state="error"] .store-unlock__status-icon {
  color: var(--store-error);
}

.store-unlock__field[data-state="success"] .store-unlock__input-shell {
  color: var(--store-success);
  border-color: var(--store-success);
}

.store-unlock__field[data-state="success"] .store-unlock__message,
.store-unlock__field[data-state="success"] .store-unlock__status-icon {
  color: var(--store-success);
}

.store-unlock__spinner {
  animation: store-unlock-spin var(--duration-loader) linear infinite;
}

.store-unlock__session-note {
  max-inline-size: 38ch;
  margin: 0;
  color: var(--store-muted);
  font-size: var(--font-size-text-t3);
  line-height: 1.5;
}

.store-unlock__submit {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: calc(var(--spacing) * 2);
  width: fit-content;
  min-width: 10rem;
  min-height: 3.5rem;
  padding: 0 calc(var(--spacing) * 6);
  color: var(--store-button-ink);
  background: var(--store-button);
  border: 1px solid var(--store-button);
  border-radius: 0;
  font: inherit;
  font-size: var(--font-size-text-t3);
  font-weight: 700;
  line-height: 1;
  white-space: nowrap;
  cursor: pointer;
  transition:
    background-color var(--duration-micro) var(--ease-out),
    transform var(--duration-micro) var(--ease-out);
}

.store-unlock__submit:focus-visible {
  outline: 3px solid var(--section-color);
  outline-offset: 3px;
  box-shadow: 0 0 0 3px var(--section-bg);
}

.store-unlock__submit:active:not(:disabled) {
  transform: translateY(1px);
}

.store-unlock__submit:disabled {
  cursor: not-allowed;
  opacity: 0.55;
}

.store-unlock__submit[data-state="success"] {
  color: var(--store-button-ink);
  background: var(--store-success);
  border-color: var(--store-success);
  opacity: 1;
}

@media (hover: hover) and (pointer: fine) {
  .store-unlock__input-shell:hover:not(:has(.store-unlock__input:disabled)) {
    background: var(--store-field-hover);
  }

  .store-unlock__submit:hover:not(:disabled) {
    background: var(--store-button-hover);
    border-color: var(--store-button-hover);
  }
}

@media (min-width: 700px) {
  .store-unlock__header,
  .store-unlock__field,
  .store-unlock__action {
    padding: calc(var(--spacing) * 12);
  }

  .store-unlock__form {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .store-unlock__field {
    border-block-end: 0;
    border-inline-end: 1px solid var(--store-rule);
  }
}

@media (min-width: 1024px) {
  .store-unlock__inner {
    grid-template-columns: 1fr 1fr;
  }

  .store-unlock__header {
    min-height: auto;
    border-block-end: 0;
    border-inline-end: 1px solid var(--store-rule);
  }

  .store-unlock__form {
    grid-template-columns: 1fr;
  }

  .store-unlock__field {
    border-inline-end: 0;
    border-block-end: 1px solid var(--store-rule);
  }
}

@media (prefers-reduced-motion: reduce) {
  .store-unlock__input-shell,
  .store-unlock__submit {
    transition-duration: 0ms;
  }

  .store-unlock__spinner {
    animation-duration: 1800ms;
  }
}

@keyframes store-unlock-spin {
  to {
    transform: rotate(1turn);
  }
}
</style>
