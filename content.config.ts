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
        email: z.string().email().optional(),
      }),
    }),
  },
});
