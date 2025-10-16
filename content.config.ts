import { defineCollection, defineContentConfig } from '@nuxt/content';
import { z } from 'zod';

export default defineContentConfig({
  collections: {
    projects: defineCollection({
      type: 'page',
      source: 'projects/*.md',
      schema: z.object({
        title: z.string(),
        completed: z.string(),
        location: z.string(),
        area: z.string(),
        sector: z.array(z.string()),
        main_image: z.string(),
        gallery: z.array(z.string()),
      }),
    }),
  },
});
