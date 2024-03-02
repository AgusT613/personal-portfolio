import NextJS from "../components/icons/NextJS.astro";
import Django from "../components/icons/Django.astro";
import SQLite3 from "../components/icons/SQLite3.astro";
import CSS from "../components/icons/CSS.astro";
import React from "../components/icons/React.astro";
import TailwindCSS from "../components/icons/TailwindCSS.astro";
import Redirect from "../components/icons/Redirect.astro";
import GitHub from "../components/icons/GitHub.astro";
import PostgreSQL from "../components/icons/PostgreSQL.astro";

const ICONS = {
  NextJS: {
    icon: NextJS,
    label: "NextJS",
  },
  React: {
    icon: React,
    label: "ReactJS",
  },
  CSS: {
    icon: CSS,
    label: "CSS Modules",
  },
  Django: {
    icon: Django,
    label: "Django",
  },
  SQLite: {
    icon: SQLite3,
    label: "SQLite3",
  },
  Tailwind: {
    icon: TailwindCSS,
    label: "TailwindCSS",
  },
  PostgreSQL: {
    icon: PostgreSQL,
    label: "PostgreSQL"
  },
  Redirect,
  GitHub,
};

export default ICONS