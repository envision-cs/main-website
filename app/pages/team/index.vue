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
        <div class="members-section">
          <NuxtLink
            v-for="member in team.members"
            :key="member.name"
            class="team-member"
            :to="member.path"
          >
            <article>
              <NuxtImg
                height="400"
                width="400"
                fit="cover"
                format="webp"
                :src="member.image"
                :alt="member.name"
                class="w-full mb-4"
              />
              <div>
                <app-typography tag="h3" variant="heading-sm">
                  {{ member.name }}
                </app-typography>
                <app-typography
                  tag="p"
                  variant="text-md"
                  class="text-primary-500 dark:text-primary-400"
                >
                  {{ member.title }}
                </app-typography>
                <div class="flex gap-4">
                  <UButton
                    v-if="member.linkedin"
                    icon="i-simple-icons-linkedin"
                    color="neutral"
                    variant="ghost"
                    :to="member.linkedin"
                    target="_blank"
                    aria-label="LinkedIn"
                  />
                  <UButton
                    v-if="member.email"
                    icon="i-heroicons-envelope"
                    color="neutral"
                    variant="ghost"
                    :to="`mailto:${member.email}`"
                    aria-label="Email"
                  />
                </div>
              </div>
            </article>
          </NuxtLink>
        </div>
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

.members-section {
  display: grid;
  grid-column: 1/-1;
  grid-template-columns: 1fr;
  gap: calc(var(--spacing) * 6);
  border-top: 1px solid var(--ui-border);
  padding-top: calc(var(--spacing) * 4);

  @media (min-width: 450px) {
    grid-template-columns: 1fr 1fr;
  }
}

article {
  display: grid;
  grid-template-columns: 1fr;
  align-items: center;
  gap: calc(var(--spacing) * 4);

  @media (min-width: 700px) {
    grid-template-columns: 1fr 1fr;
  }
}
</style>
