# Apeiron Personal Site & Blog Template

## About

Apeiron is a minimalist, responsive theme built with [Astro](https://docs.astro.build), [TailwindCSS](https://tailwindcss.com/) (with the [Tailwind Typography](https://github.com/tailwindlabs/tailwindcss-typography) plugin) for personal websites, portfolios, and blogs.

## Features:

- ✅ Minimal styling (make it your own!)
- ✅ 100/100 Lighthouse performance
- ✅ SEO-friendly with canonical URLs and OpenGraph data
- ✅ Sitemap support
- ✅ RSS Feed support
- ✅ Markdown & MDX support

## Project Structure

Inside of this project, you'll see the following folders and files:

```text
├── public/
├── src/
│   ├── components/
│   ├── content/
│   │   ├── blog/
│   │   ├── projects/
│   │   └── work/
│   ├── layouts/
│   ├── pages/
│   └── styles/
├── astro.config.mjs
├── consts.ts
├── content.config.ts
├── README.md
├── package.json
└── tsconfig.json
```

Astro looks for `.astro` or `.md` files in the `src/pages/` directory. Each page is exposed as a route based on its file name (e.g., `work.astro`, `projects.astro`).

The `src/components/` contains all of the Astro components.

The `src/content/` directory contains "collections" of related Markdown and MDX documents. Use `getCollection()` to retrieve posts from `src/content/blog/`, and type-check your frontmatter using an optional schema. See [Astro's Content Collections docs](https://docs.astro.build/en/guides/content-collections/) to learn more.

Any static assets, like images, can be placed in the `src/assets` directory.

## Set up

### Spinning up

To launch the development server, enter `npm run dev` in the terminal of the root directory of your project. Open the link in terminal or navigate to `localhost:4321` in your browser. The Apeiron template should be there!

### Constants

After adding this repository to your local machine, open `consts.ts`. This is where some basic information about you that will be automatically rendred on pages and components.

- For example, in the `SOCIALS` constant, you can add and update any social media links you would like to appear in the footer of your site.
- Note: this site uses [Phosphor Icons](https://phosphoricons.com/), which are pulled automatically based on the `NAME` variable.

### Adding Content

In the `content/` directory, you will find default markdown pages for the Work, Projects, and Blog aspects of your site in their own separate directories. Edit the content of and/or remove any files as you see fit. Saved changes will automatically be updated for the respective components.

Afterwards, update the content for the rest of the site's pages in the `pages/` directory (note: in the `blog/` subdirectory, you only need to edit the `index` file).

The site is set up for either of the following configurations:

1. A two-page website consisting of a home page with sections for projects, work experience, etc. and a blog.
2. A multi-page website consisting of a home page, a work page, a projects page, and a blog page.

Decide for yourself how you would like to organize your site, and then deploy it wherever!

## Upcoming improvements

- [ ] Light/Dark mode
- [ ] Publications collection and components
