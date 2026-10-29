// @ts-check
import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import vercel from "@astrojs/vercel";

import tailwindcss from "@tailwindcss/vite";
import rehypeImageCaptions from "./src/plugins/rehype-image-captions.mjs";

// https://astro.build/config
export default defineConfig({
  site: "https://www.bradleydettmer.me",
  redirects: {
    "/blog/mountain-biking-china-camp": {
      status: 308,
      destination: "/blog/mountain-biking-china-camp-state-park/",
    },
    "/blog/mountain-biking-china-camp/": {
      status: 308,
      destination: "/blog/mountain-biking-china-camp-state-park/",
    },
  },
  // Site stays static by default; src/pages/api/log-question.ts opts into
  // on-demand rendering (export const prerender = false) since it needs to
  // run server-side on every request.
  adapter: vercel(),
  integrations: [mdx(), sitemap()],
  image: {
    domains: ["images.bradleydettmer.me"],
  },
  markdown: {
    rehypePlugins: [rehypeImageCaptions],
  },
  vite: {
    plugins: [tailwindcss()],
  },
});
