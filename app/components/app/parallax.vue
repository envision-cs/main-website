<script setup lang="ts">
defineProps<{
  mobileImage?: string;
  image: string;
}>();
</script>

<template>
  <section
    class="hero"
    :style="{
      '--backgroundImage': `url(${image})`,
      '--mobileImage': `url(${mobileImage || image})`,
    }"
  >
    <!-- .. -->
  </section>
</template>

<style scoped>
section {
  padding: 2rem;
  height: 70vh;
  min-height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-image: var(--backgroundImage);

  @media (max-width: 800px) {
    min-height: 300px;
    background-image: var(--mobileImage);
  }
}

section > * {
  max-width: 600px;
}

.emoji {
  z-index: 0;
  display: inline-block;
  font-size: 50px;
}

section.hero {
  position: relative;
  background-color: #1a1a1a;
  background-color: #272727;
  background-size: auto 5rem;
  background-position: 20% 30%;
  background-repeat: no-repeat;
  background-size: cover;

  animation: parallax linear;
  animation-timeline: scroll();
}

.hero-content {
  text-align: center;

  position: absolute;
  bottom: 0%;
  right: 5%;
  animation: float linear;
  animation-timeline: view(-100px);
}

.hero-content > * {
  position: relative;
}

@keyframes parallax {
  from {
    background-position: center 0%;
  }

  to {
    background-position: center 50%;
  }
}

@keyframes float {
  from {
    bottom: 0%;
  }

  to {
    bottom: 25%;
  }
}

@keyframes launch {
  from {
    transform: translate(-100px, 200px);
  }

  to {
    transform: translate(100px, -100px);
  }
}

@media (prefers-reduced-motion: reduce) {
  * {
    animation: none !important;
  }
}
</style>
