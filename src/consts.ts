// Place any global data in this file.
// You can import this data from anywhere in your site by using the `import` keyword.

import type { Site, Socials, Metadata } from "./types";

export const SITE_TITLE = "Apeiron Template";
export const SITE_DESCRIPTION = "Welcome to my website!";

export const NAME = "Samuel Serif";
export const EMAIL = "me@me.com";
export const TAGLINE = "Scholar and Developer";

export const SITE: Site = {
  NAME: "Colin Robinson",
  EMAIL: "colin@robinson.com",
};

export const HOME: Metadata = {
  TITLE: "Home",
  DESCRIPTION: "Home page for Colin's site",
};

export const WORK: Metadata = {
  TITLE: "Work",
  DESCRIPTION: "An overview of the places I have worked",
};

export const PUBLICATIONS: Metadata = {
  TITLE: "Publications",
  DESCRIPTION: "A list of my publications and presentations",
};

export const PROJECTS: Metadata = {
  TITLE: "Projects",
  DESCRIPTION: "A list of different projects I have worked on",
};

export const SOCIALS: Socials = [
  { NAME: "linkedin", HREF: "linkedin.com/user/colin" },
  { NAME: "github", HREF: "github.com/colin" },
];
