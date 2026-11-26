import type { ITechnologyCategory } from "../types";

export const TECHNOLOGIES_DATA: ITechnologyCategory[] = [
  {
    id: "frontend",
    titleKey: "technologies.categories.frontend",
    items: [
      { name: "TypeScript", icon: "logos:typescript-icon" },
      { name: "JavaScript", icon: "logos:javascript" },
      { name: "React", icon: "logos:react" },
      { name: "Next.js", icon: "logos:nextjs-icon" },
      { name: "Svelte", icon: "logos:svelte-icon" },
      { name: "Tailwind CSS", icon: "logos:tailwindcss-icon" },
      { name: "HTML5", icon: "logos:html-5" },
      { name: "CSS3", icon: "logos:css-3" },
    ],
  },
  {
    id: "backend",
    titleKey: "technologies.categories.backend",
    items: [
      { name: "Python", icon: "logos:python" },
      { name: "FastAPI", icon: "logos:fastapi" },
      { name: "Django", icon: "logos:django-icon" },
      { name: "Node.js", icon: "logos:nodejs-icon" },
      { name: "Express.js", icon: "logos:express" },
    ],
  },
  {
    id: "databaseAndCloud",
    titleKey: "technologies.categories.databaseAndCloud",
    items: [
      { name: "PostgreSQL", icon: "logos:postgresql" },
      { name: "SQLite", icon: "logos:sqlite" },
      { name: "Docker", icon: "logos:docker-icon" },
      { name: "Google Cloud", icon: "logos:google-cloud" },
      { name: "Git & GitHub", icon: "logos:git-icon" },
      { name: "Linux", icon: "logos:linux-tux" },
    ],
  },
  {
    id: "hardwareAndDesktop",
    titleKey: "technologies.categories.hardwareAndDesktop",
    items: [
      { name: "PyQt", icon: "logos:qt" },
      { name: "MicroPython", icon: "simple-icons:micropython" },
      { name: "Arduino", icon: "logos:arduino" },
      { name: "C++", icon: "simple-icons:cplusplus" },
    ],
  },
];
