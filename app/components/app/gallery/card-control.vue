<script setup>
const props = defineProps({
  href: String,
  modalId: String,
  ariaLabel: { type: String, required: true },
  icon: { type: String, default: 'plus' },
});
const emit = defineEmits(['click']);
const tag = computed(() => props.href ? 'a' : 'button');
const handleClick = e => emit('click', e);
</script>

<template>
  <component
    :is="tag"
    :href="href"
    :data-modal-open="modalId"
    class="card-control"
    :aria-label="ariaLabel"
    @click="handleClick"
  >
    <div class="control-icon">
      <svg
        v-if="icon === 'plus'"
        class="icon"
        viewBox="0 0 36 36"
      >
        <path
          d="M24 16.5h-4.5v-4.5a1.5 1.5 0 0 0-3 0v4.5H12a1.5 1.5 0 0 0 0 3h4.5v4.5a1.5 1.5 0 0 0 3 0v-4.5H24a1.5 1.5 0 0 0 0-3z"
        />
      </svg>
      <svg
        v-else
        class="icon"
        viewBox="0 0 36 36"
      >
        <path
          d="M22.56 16.938l-5.508-5.5a1.5 1.5 0 0 0-2.116 2.125l4.444 4.437-4.444 4.437a1.5 1.5 0 1 0 2.116 2.125l5.508-5.5a1.5 1.5 0 0 0 0-2.124z"
        />
      </svg>
    </div>
  </component>
</template>

<style scoped>
.card-control {
  position: absolute;
  bottom: 30px;
  right: 30px;
}

.control-icon {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.08);
}

.icon {
  width: 18px;
  height: 18px;
  fill: #1d1d1f;
}
</style>
