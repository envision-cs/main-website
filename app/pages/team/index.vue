<script setup lang="ts">
const { data } = useFetch('/api/team');
</script>

<template>
  <UPage>
    <UPageBody>
      <app-inner-hero />
      <section
        v-for="team in data"
        :key="team.name"
        class="team-section site-grid gap-4"
      >
        <div class="section-head">
          <app-typography tag="h2" variant="heading-lg">
            {{ team.name }}
          </app-typography>
          <div
            class="w-80 h-3"
            :class="[team.color]"
            :style="{
              backgroundColor: team.color,
            }"
          />
          <app-typography tag="p" variant="heading-md">
            {{ team.role }}
          </app-typography>
          <app-typography
            tag="p"
            variant="text-lg"
            class="mt-auto"
          >
            {{ team.description }}
          </app-typography>
        </div>
        <app-team-member-list>
          <app-team-member-card
            v-for="member in team.members"
            :key="member.name"
            :path="member.path"
            :name="member.name"
            :title="member.title"
            :image="member.image"
            :linkedin="member.linkedin"
            :email="member.email"
          />
        </app-team-member-list>
      </section>
    </UPageBody>
  </UPage>
</template>

<style scoped>
.team-section {
  display: grid;
  grid-template-columns: subgrid;

  border-top: 1px solid var(--ui-border);

  @media (min-width: 700px) {
  }
}

.section-head {
  display: flex;
  padding: calc(var(--spacing) * 4);
  flex-direction: column;
  min-height: calc(var(--spacing) * 100);
  grid-column: 1 / -1;
  gap: calc(var(--spacing) * 3);
  border-right: none;

  @media (min-width: 700px) {
    grid-column: 1 / 7;
    border-right: 1px solid var(--ui-border);
  }

  @media (min-width: 1024px) {
    grid-column: 1 / 12;
  }
}
</style>
