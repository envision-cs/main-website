<script setup lang="ts">
const { data } = useFetch('/api/team', {
  key: 'team',
});
</script>

<template>
  <div class="">
    <app-banner-b class="col-start-1 -col-end-1" image="meet-the-team.jpg">
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
    >
      <template #header>
        <div class="section-head">
          <app-typography tag="h2" variant="heading-md">
            {{ team.name }}
          </app-typography>
          <div
            class="w-80 h-3"
            :class="[team.color]"
            :style="{
              backgroundColor: team.color,
            }"
          />
          <app-typography tag="p" variant="heading-sm">
            {{ team.role }}
          </app-typography>
          <app-typography
            tag="p"
            variant="text-lg"
            class="mt-auto max-w-sm"
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
            :path="member.slug"
            :name="member.name"
            :title="member.title"
            :image="member.photo.url"
            :linkedin="member.linkedin"
            :email="member.email"
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
}

.section-head {
  display: flex;
  padding: calc(var(--spacing) * 4);
  flex-direction: column;
  gap: calc(var(--spacing) * 3);
}
</style>
