import type { IProjectData } from "../types";

export const PROJECTS_DATA: IProjectData[] = [
  {
    id: "homebanking",
    name: "ITBANK Homebanking",
    translationId: "homebanking",
    technologies: [
      { icon: "logos:nextjs-icon", label: "NextJS" },
      { icon: "logos:fastapi", label: "FastAPI" },
      { icon: "logos:sqlite", label: "SQLite3" },
      { icon: "logos:postgresql", label: "PostgreSQL" },
      { icon: "logos:tailwindcss", label: "TailwindCSS" },
    ],
    image: "/projects/itbank_homebanking/preview.png",
    links: [
      {
        href: "https://github.com/AgusT613/itba_full_stack_front/tree/develop",
        type: "github-front",
      },
      {
        href: "https://github.com/AgusT613/itba_full_stack_back/tree/develop",
        type: "github-back",
      },
      {
        href: "https://itba-full-stack-proyecto.vercel.app/",
        type: "live",
      },
    ],
  },
  {
    id: "ecommerce",
    name: "ECommy",
    translationId: "ecommerce",
    technologies: [
      { icon: "logos:react", label: "ReactJS" },
      { icon: "logos:css-3", label: "CSS Modules" },
    ],
    image: "/projects/ecommerce/preview.png",
    links: [
      {
        href: "https://github.com/AgusT613/ecommerce-react",
        type: "github-front",
      },
      {
        href: "https://eccomy-ecommerce-react.netlify.app/",
        type: "live",
      },
    ],
  },
  {
    id: "donBosco",
    name: "Don Bosco Labs",
    translationId: "donBosco",
    technologies: [
      { icon: "logos:react", label: "ReactJS" },
      { icon: "logos:tailwindcss-icon", label: "TailwindCSS" },
    ],
    image: "/projects/don_bosco_labs/preview.png",
    links: [
      {
        href: "https://github.com/AgusT613/don_bosco_labs_front",
        type: "github-front",
      },
      {
        href: "https://github.com/AgusT613/don_bosco_labs_back",
        type: "github-back",
      },
      {
        href: "https://kaleidoscopic-dieffenbachia-5d550d.netlify.app/",
        type: "live",
      },
    ],
  },
  {
    id: "bancoPotencia",
    nameKey: "project.bancoPotencia.title",
    translationId: "bancoPotencia",
    technologies: [
      { icon: "logos:python", label: "Python" },
      { icon: "logos:qt", label: "PyQt" },
      { icon: "simple-icons:micropython", label: "MicroPython" },
    ],
    image: "fallback",
    links: [
      {
        href: "https://github.com/AgusT613/desktop-pyqt-esp32-banco-potencia",
        type: "github-repo",
      },
      // TODO: Add link to youtube video
      // {
      //   href: "",
      //   type: "demo", 
      // }
    ],
  },
  {
    id: "pokedex",
    name: "Pokedex",
    translationId: "pokedex",
    technologies: [
      { icon: "logos:svelte", label: "Svelte" },
      { icon: "logos:tailwindcss", label: "TailwindCSS" },
      { icon: "logos:python", label: "Python" },
      { icon: "logos:fastapi", label: "FastAPI" },
      { icon: "logos:sqlite", label: "SQLite" },
    ],
    image: "fallback",
    links: [
      {
        href: "https://github.com/AgusT613/fiuba-ids-tp2-frontend",
        type: "github-front",
      },
      {
        href: "https://github.com/AgusT613/fiuba-ids-tp2-backend",
        type: "github-back",
      },
      // TODO: Add link to deployed web app
      // {
      //   href: "", 
      //   type: "live",
      // }
    ],
  },
  {
    id: "animeSearch",
    nameKey: "project.animeSearch.title",
    translationId: "animeSearch",
    technologies: [
      { icon: "logos:nextjs", label: "NextJS" },
      { icon: "logos:css-3", label: "CSS Modules" },
    ],
    image: "fallback",
    links: [
      {
        href: "https://github.com/AgusT613/consumet-series-search-app",
        type: "github-front",
      },
      // TODO: Add link to deployed web app
      // {
      //   href: "", 
      //   type: "live",
      // }
    ],
  },
  {
    id: "contadorBobinador",
    nameKey: "project.contadorBobinador.title",
    translationId: "contadorBobinador",
    technologies: [
      { icon: "logos:arduino", label: "Arduino" },
      { icon: "simple-icons:cplusplus", label: "C++" },
    ],
    image: "fallback",
    links: [
      // TODO: Add link to code repo
      // {
      //   href: "", 
      //   type: "github-repo"
      // },
      // TODO: Add link to youtube video
      // {
      //   href: "", 
      //   type: "demo"
      // }
    ],
  },
];
