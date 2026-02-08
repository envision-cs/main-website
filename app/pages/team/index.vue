<script setup lang="ts">
const { data } = useFetch('/api/team', {
  key: 'team',
});
</script>

<template>
  <div class="">
    <app-banner-b
      class="col-start-1 -col-end-1"
      image="meet-the-team.jpg"
      body="Collaborating with Colors (CWC) is how we define teams within our team and their function in relation to Envision. Our six teams—the Orange Team, Gray Team, COL Team, Red Team, Blue Team, and Green Team—collaborate to deliver high-quality projects on time and within budget. We chose to empower our team members by recognizing their strengths, discovering where they best fit into daily operations, and developing a title that best illustrates the value that the team member adds to the company. Meet the Envision team"
    >
      Meet the team
      <template #image>
        <NuxtImg
          src=""
          class="h-full w-full object-cover -z-10"
          fit="cover"
          format="webp"
        />
      </template>
    </app-banner-b>
    <app-section-a
      v-for="team in data"
      :key="team.name"
      class="team-section"
      no-padding
      :style="{ '--teamColor': team.color }"
    >
      <template #header>
        <div class="section-head" :style="{ '--teamColor': team.color }">
          <div class="team-role">
            <span class="team-role-dot" aria-hidden="true" />
            <app-typography
              tag="p"
              variant="text-sm"
              class="team-role-label"
            >
              {{ team.role }}
            </app-typography>
          </div>
          <app-typography tag="h2" variant="heading-md">
            {{ team.name }}
          </app-typography>
          <div class="team-accent" aria-hidden="true" />
          <app-typography
            tag="p"
            variant="text-lg"
            class="mt-auto max-w-sm team-description"
          >
            {{ team.description }}
          </app-typography>
        </div>
      </template>
      <template #body>
        <app-team-member-list>
          <app-team-member-card
            v-for="member in team.team_members"
            :key="member.name"
            :path="`/team/${member.slug}`"
            :name="member.name"
            :title="member.title"
            :image="member.photo?.url"
            :linkedin="member.linkedin"
            :email="member.email"
            :color="team.color"
            title-size="heading-md"
          />
        </app-team-member-list>
      </template>
    </app-section-a>
  </div>
</template>

<style scoped>
.team-section {
  display: grid;
  grid-column: 1/-1;
  border-top: 1px solid var(--ui-border);
  background: linear-gradient(
    140deg,
    color-mix(in srgb, var(--teamColor) 12%, white) 0%,
    color-mix(in srgb, var(--teamColor) 3%, white) 35%,
    white 75%
  );
}

.section-head {
  --teamColor: var(--ui-primary);
  position: relative;
  overflow: hidden;
  display: flex;
  padding: calc(var(--spacing) * 4);
  flex-direction: column;
  gap: calc(var(--spacing) * 3);
}

.team-role {
  width: fit-content;
  display: inline-flex;
  align-items: center;
  gap: 0.55rem;
  padding: 0.4rem 0.85rem;
  border-radius: 999px;
  background: color-mix(in srgb, var(--teamColor) 18%, white);
}

.team-role-dot {
  width: 0.65rem;
  height: 0.65rem;
  border-radius: 999px;
  flex-shrink: 0;
  background: var(--teamColor);
}

.team-role-label {
  letter-spacing: 0.04em;
  text-transform: uppercase;
}

.team-accent {
  width: min(100%, 12rem);
  height: 0.35rem;
  border-radius: 999px;
  background-color: var(--teamColor);
}

.team-description {
  line-height: 1.4;
  max-width: 38ch;
}

@media (min-width: 1024px) {
  .section-head {
    padding: calc(var(--spacing) * 5);
    gap: calc(var(--spacing) * 3.5);
  }
}
</style>
