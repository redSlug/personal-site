import { glob } from "astro/loaders";
import { defineCollection, z } from "astro:content";

const blog = defineCollection({
  // Load Markdown and MDX files in the `src/content/blog/` directory.
  loader: glob({ base: "./src/content/blog", pattern: "**/*.{md,mdx}" }),
  // Type-check frontmatter using a schema
  schema: z.object({
    title: z.string(),
    description: z.string(),
    // Transform string to Date object
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    heroImage: z.string().optional(),
  }),
});

const projects = defineCollection({
  // Load Markdown and MDX files in the `src/content/projects/` directory
  loader: glob({ base: "./src/content/projects", pattern: "**/*.{md,mdx}" }),
  // Type-check frontmatter using a schema
  schema: z.object({
    title: z.string(),
    link: z.string().optional(),
    tags: z.array(z.string()).optional(),
    // Transform string to Date object
    date: z.coerce.date().optional(),
    description: z.string().optional(),
    priority: z.number().optional(),
    github: z.string().optional(),
    heroImage: z.string().optional(),
  }),
});

const work = defineCollection({
  // Load Markdown and MDX files in the `src/content/projects/` directory
  loader: glob({ base: "./src/content/work", pattern: "**/*.{md,mdx}" }),
  // Type-check frontmatter using a schema
  schema: z.object({
    role: z.string(),
    organization: z.string(),
    location: z.string().optional(),
    // Transform string to Date object
    dateStart: z.coerce.date(),
    dateEnd: z.coerce.date().optional(),
  }),
});

export const collections = { blog, work, projects };
