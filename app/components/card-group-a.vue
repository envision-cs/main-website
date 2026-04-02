<script setup lang="ts">
interface Card {
  title: string;
  link: string;
  image: string;
  sector: string;
  completed: string;
}

const props = defineProps<{
  cards: Card[];
  spacing?: string;
}>();

const visibleCards = computed(() => props.cards.slice(0, 3));
</script>

<template>
  <section class="cards-win-section">
    <div class="cards-win-window">
      <!-- Title bar -->
      <div class="win-titlebar" role="presentation">
        <span>Featured Projects</span>
        <div class="win-titlebar-buttons" aria-hidden="true">
          <button class="win-titlebar-btn" tabindex="-1">_</button>
          <button class="win-titlebar-btn" tabindex="-1">&#9633;</button>
          <button class="win-titlebar-btn" tabindex="-1">&#x2715;</button>
        </div>
      </div>

      <!-- Toolbar row -->
      <div class="cards-win-toolbar">
        <span class="cards-win-toolbar-label">View:</span>
        <button class="cards-toolbar-btn cards-toolbar-btn--active">Large Icons</button>
        <button class="cards-toolbar-btn">Details</button>
        <button class="cards-toolbar-btn">List</button>
        <div class="cards-toolbar-spacer" />
        <NuxtLink to="/projects" class="win-button win-button-small">View All Projects</NuxtLink>
      </div>

      <!-- File/folder grid -->
      <div class="cards-win-body">
        <ul v-if="visibleCards.length" class="cards-win-grid">
          <li v-for="(card, index) in visibleCards" :key="index" class="card-win-item">
            <NuxtLink :to="card.link" class="card-win-link">
              <div class="card-win-image-wrap">
                <NuxtImg
                  :src="card.image"
                  provider="imagekit"
                  format="webp"
                  loading="lazy"
                  fit="cover"
                  class="card-win-img"
                  :alt="card.title"
                />
              </div>
              <div class="card-win-info">
                <div class="win-titlebar win-titlebar--mini" role="presentation">
                  <span>{{ card.title }}</span>
                  <div class="win-titlebar-buttons" aria-hidden="true">
                    <button class="win-titlebar-btn win-titlebar-btn--tiny" tabindex="-1">&#x2715;</button>
                  </div>
                </div>
                <div class="card-win-meta">
                  <div class="card-win-row"><span class="card-win-key">Sector:</span> <span>{{ card.sector }}</span></div>
                  <div class="card-win-row"><span class="card-win-key">Completed:</span> <span>{{ card.completed }}</span></div>
                  <div class="card-win-row"><span class="card-win-key">Status:</span> <span class="card-win-completed">&#9679; Completed</span></div>
                </div>
                <div class="card-win-actions">
                  <span class="win-button win-button-small">See Project</span>
                </div>
              </div>
            </NuxtLink>
          </li>
        </ul>
        <div v-else class="cards-win-empty">
          <span>No items to display.</span>
        </div>
      </div>

      <div class="win-status-bar cards-win-status">
        <span>&#9679;</span>
        <span>{{ visibleCards.length }} object(s)</span>
        <div class="cards-sep" />
        <span>Double-click a project to open</span>
      </div>
    </div>
  </section>
</template>

<style scoped>
.cards-win-section {
  grid-column: 1 / -1;
  background: var(--color-win-gray-light);
  padding: 16px;
  display: flex;
  justify-content: center;
}

.cards-win-window {
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

.win-titlebar--mini {
  font-size: 10px;
  padding: 2px 4px;
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

.win-titlebar-btn--tiny {
  width: 12px;
  height: 11px;
  font-size: 8px;
}

.cards-win-toolbar {
  display: flex;
  align-items: center;
  gap: 4px;
  background: var(--color-win-gray-light);
  padding: 4px 8px;
  border-bottom: 2px solid #808080;
  box-shadow: 0 2px 0 #ffffff;
  flex-wrap: wrap;
}

.cards-win-toolbar-label {
  font-size: 11px;
  font-family: "Tahoma", sans-serif;
  margin-right: 4px;
}

.cards-toolbar-btn {
  background: var(--color-win-gray-light);
  box-shadow: var(--win-border-button);
  color: var(--color-win-black);
  font-size: 10px;
  font-family: "Tahoma", sans-serif;
  padding: 2px 8px 3px;
  cursor: pointer;
  border: 0;
}

.cards-toolbar-btn--active {
  box-shadow: var(--win-border-sunken);
}

.cards-toolbar-spacer {
  flex: 1;
}

.win-button {
  background: var(--color-win-gray-light);
  box-shadow: var(--win-border-button);
  color: var(--color-win-black);
  font-family: "Tahoma", sans-serif;
  font-size: 11px;
  padding: 3px 14px 4px;
  cursor: pointer;
  border: 0;
  text-decoration: none;
  display: inline-block;
  min-width: 75px;
  text-align: center;
}

.win-button:active,
.win-button-small:active {
  box-shadow: var(--win-border-sunken);
}

.win-button-primary {
  outline: 1px solid #000;
  outline-offset: -1px;
}

.win-button-small {
  background: var(--color-win-gray-light);
  box-shadow: var(--win-border-button);
  color: var(--color-win-black);
  font-family: "Tahoma", sans-serif;
  font-size: 10px;
  padding: 2px 10px 3px;
  cursor: pointer;
  border: 0;
  text-decoration: none;
  display: inline-block;
  text-align: center;
  white-space: nowrap;
}

.cards-win-body {
  padding: 8px;
  background: var(--color-win-white);
  box-shadow: var(--win-border-sunken);
  margin: 8px;
  min-height: 200px;
}

.cards-win-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 8px;
  list-style: none;
  padding: 0;
  margin: 0;

  @media (min-width: 600px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: 900px) {
    grid-template-columns: repeat(3, 1fr);
  }
}

.card-win-item {
  background: var(--color-win-gray-light);
  box-shadow: var(--win-border-raised);
}

.card-win-link {
  display: flex;
  flex-direction: column;
  text-decoration: none;
  color: var(--color-win-black);
  height: 100%;
}

.card-win-link:hover .card-win-image-wrap .card-win-img {
  filter: saturate(0.6) brightness(0.85);
}

.card-win-image-wrap {
  position: relative;
  overflow: hidden;
  aspect-ratio: 4/3;
}

.card-win-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: saturate(0.6) contrast(0.85);
  display: block;
}

.card-win-info {
  display: flex;
  flex-direction: column;
  flex: 1;
}

.card-win-meta {
  padding: 8px 10px 4px;
  display: flex;
  flex-direction: column;
  gap: 2px;
  background: var(--color-win-white);
  box-shadow: var(--win-border-sunken);
  margin: 6px 6px 0;
  flex: 1;
}

.card-win-row {
  font-size: 10px;
  font-family: "Tahoma", sans-serif;
  line-height: 1.4;
}

.card-win-key {
  font-weight: bold;
  color: #404040;
}

.card-win-completed {
  color: var(--color-win-green);
  font-weight: bold;
  font-size: 10px;
}

.card-win-actions {
  padding: 6px;
  display: flex;
  justify-content: flex-end;
}

.cards-win-empty {
  padding: 24px;
  text-align: center;
  font-size: 11px;
  font-family: "Tahoma", sans-serif;
  color: #808080;
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

.cards-sep {
  width: 1px;
  height: 12px;
  background: #808080;
  box-shadow: 1px 0 0 #ffffff;
}
</style>
