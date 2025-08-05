// Place any global data in this file.
// You can import this data from anywhere in your site by using the `import` keyword.

import type { Site, Socials, Metadata } from "./types";

export const SITE_TITLE = "Bradley Dettmer";
export const SITE_DESCRIPTION = "Bradley's personal portfolio";

export const SITE: Site = {
  NAME: "Bradley Dettmer",
  EMAIL: "bdettmer@gmail.com",
};

export const HOME: Metadata = {
  TITLE: "Home",
  DESCRIPTION: "Bradley Dettmer's personal portfolio",
};

export const WORK: Metadata = {
  TITLE: "Work",
  DESCRIPTION: "Places Bradley Dettmer has worked",
};

export const PROJECTS: Metadata = {
  TITLE: "Projects",
  DESCRIPTION: "Different projects Bradley Dettmer has worked on",
};

export const SOCIALS: Socials = [
  { NAME: "linkedin", HREF: "https://www.linkedin.com/in/bdettmer/" },
  { NAME: "github", HREF: "https://github.com/redslug" },
  { NAME: "medium", HREF: "https://medium.com/@bdettmer" },
];
