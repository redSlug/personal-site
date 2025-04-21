// Place any global data in this file.
// You can import this data from anywhere in your site by using the `import` keyword.

import type { Site, Socials, Metadata } from "./types";

export const SITE_TITLE = "Apeiron Template";
export const SITE_DESCRIPTION = "Welcome to my website!";

export const SITE: Site = {
  NAME: "Jane Doe",
  EMAIL: "jane@doe.com",
};

export const HOME: Metadata = {
  TITLE: "Home",
  DESCRIPTION: "Home page for my site",
};

export const WORK: Metadata = {
  TITLE: "Work",
  DESCRIPTION: "An overview of the places I have worked",
};

export const PROJECTS: Metadata = {
  TITLE: "Projects",
  DESCRIPTION: "A list of different projects I have worked on",
};

export const SOCIALS: Socials = [
  { NAME: "linkedin", HREF: "https://linkedin.com/#" },
  { NAME: "github", HREF: "https://github.com/#" },
  { NAME: "codepen", HREF: "https://codepen.io/#" },
];
