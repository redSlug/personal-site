// @ts-check
import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";

import tailwindcss from "@tailwindcss/vite";
import rehypeImageCaptions from "./src/plugins/rehype-image-captions.mjs";

// https://astro.build/config
export default defineConfig({
  site: "https://bradleydettmer.me",
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
