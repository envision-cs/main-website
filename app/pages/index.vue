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

const siteUrl = "https://www.envision-cs.com";
const homeUrl = `${siteUrl}/`;
const organizationId = `${siteUrl}/#organization`;
const websiteId = `${siteUrl}/#website`;
const homepageId = `${homeUrl}#webpage`;
const servicesPageId = `${siteUrl}/services#webpage`;
const projectsPageId = `${siteUrl}/projects#webpage`;
const contactPageId = `${siteUrl}/contact#webpage`;
const homepageImage = "https://ik.imagekit.io/pnixsw7lg/main-website/IMG_1915.jpg";

useSeoMeta({
  title: "Envision Construction Services | Tampa Bay & Central Florida",
  description:
    "Envision is a Tampa Bay construction partner delivering organized, high-quality projects on time and on budget. 200+ projects delivered since 2009 with a 90% repeat-client rate.",
  ogTitle: "Envision Construction Services | Tampa Bay & Central Florida",
  ogDescription:
    "Construction management, design-build, and preconstruction across Greater Tampa Bay and Central Florida. Listen. Plan. Execute. Cultivate.",
  ogImage: homepageImage,
  ogType: "website",
  twitterCard: "summary_large_image",
  twitterTitle: "Envision Construction Services | Tampa Bay & Central Florida",
  twitterDescription:
    "Construction management, design-build, and preconstruction across Greater Tampa Bay and Central Florida. Listen. Plan. Execute. Cultivate.",
  twitterImage: homepageImage,
});

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
  { id: 1, label: "2009", description: "Year Established" },
  { id: 2, label: "200+", description: "Projects Delivered. On Time & On Budget." },
  { id: 3, label: "90%", description: "Repeat Clients" },
];

const homepageSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": ["Organization", "LocalBusiness", "GeneralContractor"],
      "@id": organizationId,
      name: "Envision Construction Services",
      alternateName: "Envision",
      url: homeUrl,
      logo: `${siteUrl}/favicon.svg`,
      image: homepageImage,
      description:
        "Envision is a Tampa Bay construction partner delivering organized, high-quality projects on time and on budget.",
      foundingDate: "2009",
      telephone: "+1-813-997-0330",
      email: "pursuits@envision-cs.com",
      address: {
        "@type": "PostalAddress",
        streetAddress: "5000 Acline Drive East",
        addressLocality: "Tampa",
        addressRegion: "FL",
        postalCode: "33619",
        addressCountry: "US",
      },
      areaServed: [
        {
          "@type": "Place",
          name: "Greater Tampa Bay",
        },
        {
          "@type": "Place",
          name: "Central Florida",
        },
      ],
      slogan: "Listen. Plan. Execute. Cultivate.",
      sameAs: [
        "https://www.facebook.com/envisioncstampa",
        "https://www.linkedin.com/company/envision-cs/",
      ],
      makesOffer: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Construction Management",
            serviceType: "Construction management",
            areaServed: "Greater Tampa Bay and Central Florida",
            url: `${siteUrl}/services/construction-management`,
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Design-Build",
            serviceType: "Design-build construction",
            areaServed: "Greater Tampa Bay and Central Florida",
            url: `${siteUrl}/services/design-build`,
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Enhanced Preconstruction",
            serviceType: "Preconstruction planning and estimating",
            areaServed: "Greater Tampa Bay and Central Florida",
            url: `${siteUrl}/services/enhanced-preconstruction`,
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Tenant Improvements",
            serviceType: "Tenant improvement construction",
            areaServed: "Greater Tampa Bay and Central Florida",
            url: `${siteUrl}/services/tenant-improvements`,
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Specialty Projects Division",
            serviceType: "Specialty construction projects",
            areaServed: "Greater Tampa Bay and Central Florida",
            url: `${siteUrl}/services/specialty-projects-division`,
          },
        },
      ],
    },
    {
      "@type": "WebSite",
      "@id": websiteId,
      url: homeUrl,
      name: "Envision Construction Services",
      publisher: {
        "@id": organizationId,
      },
      inLanguage: "en-US",
    },
    {
      "@type": "WebPage",
      "@id": homepageId,
      url: homeUrl,
      name: "Envision Construction Services | Tampa Bay & Central Florida",
      description:
        "Envision is a Tampa Bay construction partner delivering organized, high-quality projects on time and on budget. 200+ projects delivered since 2009 with a 90% repeat-client rate.",
      isPartOf: {
        "@id": websiteId,
      },
      about: {
        "@id": organizationId,
      },
      primaryImageOfPage: {
        "@type": "ImageObject",
        url: homepageImage,
      },
      significantLink: [servicesPageId, projectsPageId, contactPageId],
      mainEntity: {
        "@id": organizationId,
      },
      review: testimonials.map((testimonial) => ({
        "@type": "Review",
        reviewBody: testimonial.quote,
        author: {
          "@type": "Person",
          name: testimonial.name,
          jobTitle: testimonial.title,
        },
        itemReviewed: {
          "@id": organizationId,
        },
      })),
      inLanguage: "en-US",
    },
  ],
};

useHead({
  script: [
    {
      key: "schema-org-homepage",
      type: "application/ld+json",
      innerHTML: JSON.stringify(homepageSchema),
    },
  ],
});
</script>

<template>
  <main>
    <hero-banner />
    <section-d
      bgcolor="dark"
      eyebrow="Regional Coverage"
      title="Greater Tampa Bay + Central Florida"
    >
      <div :style="{ '--accent-color': 'var(--color-envision-green-500)' }">
        <list-e :items="stats" />
      </div>
    </section-d>
    <card-group-a :cards="featuredProjectCards.sectionOne" />
    <cta-a
      bgcolor="dark"
      title="Listen. Plan. Execute. Cultivate."
      body="Great projects start with the right partner"
      image="https://ik.imagekit.io/pnixsw7lg/main-website/Home_Listen_Plan_Execute_Cultivate_d371e56e7f.jpeg?updatedAt=1780673607902"
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
