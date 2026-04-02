<script setup lang="ts">
import { ScrollTrigger } from "gsap/ScrollTrigger";

const process = [
  {
    id: 1,
    title: "Built on Faith, Driven by Purpose",
    description:
      "Our foundation is God, our work is built on integrity, and our mission is to serve with excellence.",
    image:
      "https://ik.imagekit.io/pnixsw7lg/main-website/20250519_134053.jpg?updatedAt=1771548280364",
    color: "#000080",
  },
  {
    id: 2,
    title: "Impact Beyond Construction",
    description:
      "We don't just build—we leave a mark. Every project is an opportunity to create something lasting, from the spaces we shape to the relationships we forge. With heart, craftsmanship, and purpose, we build legacies that elevate communities for generations to come.",
    image:
      "https://ik.imagekit.io/pnixsw7lg/main-website/117812314_10158747995319553_8729798724554644994_o.jpg?updatedAt=1771547653476",
    color: "#008000",
  },
  {
    id: 3,
    title: "Versatile. Adaptive. Enhanced Approach",
    description:
      "No two projects are the same, and neither is our approach. Whether it's a small renovation or a large-scale build, we move with precision, flexibility, and care—delivering the personal attention of a local partner with the expertise of a national leader.",
    image:
      "https://ik.imagekit.io/pnixsw7lg/main-website/USFSP%20Residence%20Hall%20-%20Dusk%20Window%20View%20to%20Locker.jpg?updatedAt=1771547653634",
    color: "#404040",
  },
];
</script>

<template>
  <section class="uniques-win-section">
    <div class="uniques-win-window">
      <!-- Title bar -->
      <div class="win-titlebar" role="presentation">
        <span>Our Three Uniques</span>
        <div class="win-titlebar-buttons" aria-hidden="true">
          <button class="win-titlebar-btn" tabindex="-1">_</button>
          <button class="win-titlebar-btn" tabindex="-1">&#9633;</button>
          <button class="win-titlebar-btn" tabindex="-1">&#x2715;</button>
        </div>
      </div>

      <!-- Intro text -->
      <div class="uniques-win-intro">
        <div class="uniques-intro-inner">
          <p>
            At Envision, every decision we make is guided by a clear philosophy—three core principles
            that define how we work, why we work, and the impact we strive to create. These
            <strong>"Three Uniques"</strong> are more than values; they are the driving force behind
            our approach, shaping every project, partnership, and interaction.
          </p>
        </div>
      </div>

      <!-- Cards -->
      <div class="uniques-win-body">
        <ul class="uniques-win-list">
          <li v-for="p in process" :key="p.id" class="unique-win-item">
            <!-- Mini window for each unique -->
            <div class="unique-win-card">
              <div
                class="win-titlebar unique-titlebar"
                :style="{ background: `linear-gradient(to right, ${p.color}, ${p.color}aa)` }"
                role="presentation"
              >
                <span>{{ p.title }}</span>
              </div>
              <div class="unique-win-image-wrap">
                <NuxtImg
                  :src="p.image"
                  provider="imagekit"
                  fit="cover"
                  class="unique-win-img"
                  :alt="p.title"
                  loading="lazy"
                />
                <div
                  class="unique-win-overlay"
                  :style="{ background: `${p.color}99` }"
                  aria-hidden="true"
                />
              </div>
              <div class="unique-win-text">
                <p>{{ p.description }}</p>
              </div>
              <div class="unique-win-status">
                <span>&#9679;</span>
                <span>Core Value #{{ p.id }}</span>
              </div>
            </div>
          </li>
        </ul>
      </div>

      <div class="win-status-bar uniques-win-status">
        <span>&#9679;</span>
        <span>3 core values</span>
        <div class="uniques-sep" />
        <span>Envision Construction Services Philosophy</span>
      </div>
    </div>
  </section>
</template>

<style scoped>
.uniques-win-section {
  grid-column: 1 / -1;
  background: var(--color-win-gray-light);
  padding: 16px;
  display: flex;
  justify-content: center;
}

.uniques-win-window {
  background: var(--color-win-gray-light);
  box-shadow: var(--win-border-raised);
  width: 100%;
  max-width: 1100px;
  display: flex;
  flex-direction: column;
}

.win-titlebar {
  background: var(--win-titlebar);
  color: #fff;
  font-weight: bold;
  font-size: 11px;
  font-family: "Tahoma", sans-serif;
  padding: 3px 4px 3px 6px;
  display: flex;
  align-items: center;
  gap: 4px;
  user-select: none;
  flex-shrink: 0;
}

.win-titlebar-buttons {
  margin-left: auto;
  display: flex;
  gap: 2px;
}

.win-titlebar-btn {
  width: 16px;
  height: 14px;
  background: var(--color-win-gray-light);
  box-shadow: var(--win-border-button);
  font-size: 9px;
  font-weight: bold;
  color: var(--color-win-black);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  border: 0;
  padding: 0;
}

.uniques-win-intro {
  padding: 8px;
}

.uniques-intro-inner {
  background: var(--color-win-white);
  box-shadow: var(--win-border-sunken);
  padding: 10px 12px;
  font-size: 11px;
  font-family: "Tahoma", sans-serif;
  line-height: 1.5;

  p { margin: 0; }
}

.uniques-win-body {
  padding: 8px;
}

.uniques-win-list {
  display: grid;
  grid-template-columns: 1fr;
  gap: 8px;
  list-style: none;
  padding: 0;
  margin: 0;

  @media (min-width: 600px) {
    grid-template-columns: repeat(3, 1fr);
  }
}

.unique-win-item {
  display: flex;
  flex-direction: column;
}

.unique-win-card {
  background: var(--color-win-gray-light);
  box-shadow: var(--win-border-raised);
  display: flex;
  flex-direction: column;
  height: 100%;
}

.unique-titlebar {
  font-size: 10px;
  padding: 2px 6px;
}

.unique-win-image-wrap {
  position: relative;
  overflow: hidden;
  aspect-ratio: 4/3;
}

.unique-win-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: grayscale(0.7) contrast(0.85);
  display: block;
}

.unique-win-overlay {
  position: absolute;
  inset: 0;
  mix-blend-mode: multiply;
  pointer-events: none;
}

.unique-win-text {
  padding: 10px;
  background: var(--color-win-white);
  box-shadow: var(--win-border-sunken);
  margin: 6px;
  flex: 1;

  p {
    font-size: 10px;
    font-family: "Tahoma", sans-serif;
    line-height: 1.45;
    margin: 0;
  }
}

.unique-win-status {
  background: var(--color-win-gray-light);
  border-top: 1px solid #808080;
  padding: 2px 6px;
  font-size: 10px;
  font-family: "Tahoma", sans-serif;
  display: flex;
  align-items: center;
  gap: 4px;
}

.win-status-bar {
  background: var(--color-win-gray-light);
  border-top: 1px solid #808080;
  padding: 2px 8px;
  font-size: 10px;
  font-family: "Tahoma", sans-serif;
  display: flex;
  align-items: center;
  gap: 6px;
}

.uniques-sep {
  width: 1px;
  height: 12px;
  background: #808080;
  box-shadow: 1px 0 0 #ffffff;
}
</style>
