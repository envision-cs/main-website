import { defineCollection, defineContentConfig } from '@nuxt/content';
import { z } from 'zod';

export default defineContentConfig({
  collections: {
    projects: defineCollection({
      type: 'page',
      source: 'projects/*.md',
      schema: z.object({
        title: z.string(),
        slug: z.string(),
        completed: z.string(),
        location: z.string(),
        area: z.string(),
        sector: z.string(),
        sectorSlug: z.string(),
        main_image: z.string(),
        gallery: z.array(z.string()),
      }),
    }),
    team: defineCollection({
      type: 'page',
      source: 'team/*.md',
      schema: z.object({
        name: z.string(),
        title: z.string(),
        image: z.string(),
        bio: z.string(),
        group: z.string(),
        linkedin: z.string().optional(),
        email: z.string().optional(),
      }),
    }),
    locations: defineCollection({
      type: 'data',
      source: 'locations/**.md',
      schema: z.object({
        location: z.string(),
        address: z.string(),
        phone: z.string(),
        city: z.string(),
        email: z.string(),
        latitude: z.number(),
        longitude: z.number(),
        image: z.string(),
      }),
    }),
    teams: defineCollection({
      type: 'data',
      source: 'teams/*.md',
      schema: z.object({
        name: z.string(),
        color: z.string(),
        role: z.string(),
        description: z.string(),
      }),
    }),
    services: defineCollection({
      type: 'data',
      source: 'services/*.md',
      schema: z.object({
        param: z.string(),
        title: z.string(),
        description: z.string().optional(),
        image: z.string().optional(),
      }),
    }),
    process: defineCollection({
      type: 'data',
      source: 'process/*.md',
      schema: z.object({
        title: z.string(),
        image: z.string().optional(),
      }),
    }),
    threeUniques: defineCollection({
      type: 'data',
      source: 'threeUniques/*.md',
      schema: z.object({
        title: z.string(),
        image: z.string().optional(),
      }),
    }),
    coreValues: defineCollection({
      type: 'data',
      source: 'coreValues/*.md',
      schema: z.object({
        title: z.string(),
        image: z.string().optional(),
      }),
    }),
  },
});
