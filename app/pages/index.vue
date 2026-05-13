<script setup lang="ts">
interface FeaturedProjectCard {
  title: string;
  link: string;
  image: string;
  sector: string;
  completed: string;
}

interface HomepageFeaturedProjectsResponse {
  sectionOne: FeaturedProjectCard[];
  sectionTwo: FeaturedProjectCard[];
}

interface HomepageTestimonial {
  quote: string;
  name: string;
  title: string;
  detail: string;
  tone: "green" | "blue" | "charcoal";
}

const { $posthog } = useNuxtApp();

const testimonials: HomepageTestimonial[] = [
  {
    quote:
      "Envision has consistently impressed us with their commitment to timely project completion.",
    name: "Kelvin Mack",
    title: "Maintenance Director, Hillsborough County Public Schools",
    detail: "K-12 facilities",
    tone: "green",
  },
  {
    quote: "It was a pleasure working with the Envision team.",
    name: "John Luksas",
    title: "Assistant Director, Operations at USF College of Nursing",
    detail: "Higher education",
    tone: "blue",
  },
  {
    quote:
      "Strong endorsement of Envision. We were very pleased with the professionalism and quality of the work.",
    name: "Darryl Shaw",
    title: "Co-Owner, USL Super League",
    detail: "Sports and hospitality",
    tone: "charcoal",
  },
  {
    quote:
      "Their dedication, expertise, and attention to detail were evident throughout the entire process, and the final result speaks for itself.",
    name: "Paola Feliz",
    title: "Project Manager, University of South Florida",
    detail: "Complex institutional work",
    tone: "green",
  },
];

const { data: featuredProjectCards } = useAsyncData<HomepageFeaturedProjectsResponse>(
  "homepage-featured-projects",
  async () => {
    try {
      return await $fetch("/api/homepage-featured-project-section");
    } catch (err) {
      console.error("Failed to fetch homepage featured projects:", err);
      return {
        sectionOne: [],
        sectionTwo: [],
      };
    }
  },
  {
    default: () => ({
      sectionOne: [],
      sectionTwo: [],
    }),
  },
);

const stats = [
  { id: 1, label: "2009", description: "Established" },
  { id: 2, label: "$180M+", description: "Projects Delivery" },
  { id: 2, label: "90%", description: "Repeat Clients" },
];

if ($posthog) {
  $posthog().capture("$pageview");
}
</script>

<template>
  <main>
    <hero-banner />
    <section-d
      bgcolor="blue"
      eyebrow="Regional Coverage"
      title="Greater Tampa Bay + Central Florida"
    >
      <list-e :items="stats" />
    </section-d>
    <card-group-a :cards="featuredProjectCards.sectionOne" />
    <cta-a
      title="Listen. Plan. Execute. Cultivate."
      body="Great projects start with the right partner"
      image="https://ik.imagekit.io/pnixsw7lg/main-website/IMG_1915.jpg"
      flip
      content-position="bottom-left"
      href="about"
      label="Learn more about us"
    />
    <card-group-a :cards="featuredProjectCards.sectionTwo" />
    <quote
      :testimonials="testimonials"
      section-body="The work only matters if the team behind it stays steady under pressure. These testimonials show how Envision is experienced by the people responsible for outcomes."
    />
  </main>
</template>
