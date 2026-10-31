import ICONS from "../utils/icons.js";
import type { IProjectData } from "../types";

export const PROJECTS_DATA: IProjectData[] = [
  {
    id: "homebanking",
    name: "ITBANK Homebanking",
    translationId: "homebanking",
    technologies: [ICONS.NextJS, ICONS.Django, ICONS.SQLite, ICONS.CSS],
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
    technologies: [ICONS.React, ICONS.CSS],
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
    technologies: [ICONS.React, ICONS.CSS, ICONS.Tailwind],
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
    id: "techInterview",
    nameKey: "project.techInterview.title",
    translationId: "techInterview",
    technologies: [
      ICONS.NextJS,
      ICONS.Django,
      ICONS.SQLite,
      ICONS.PostgreSQL,
      ICONS.Tailwind,
    ],
    image: "/projects/entrevista_tecnica_uno/preview.png",
    links: [
      {
        href: "https://github.com/AgusT613/liftun_entrevista_front",
        type: "github-front",
      },
      {
        href: "https://github.com/AgusT613/liftun_entrevista_back",
        type: "github-back",
      },
      {
        href: "https://liftun-entrevista-front.vercel.app/",
        type: "live",
      },
    ],
  },
];
