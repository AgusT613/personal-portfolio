import ICONS from "../utils/icons.js";

const PROJECTS = [
  {
    name: "ITBANK Homebanking",
    description:
      "Proyecto para un programa de capacitación en FullStack Developer, junto a un equipo de desarrollo. Aplicación web de homebanking, amigable al usuario y de facil navegación. API REST y autenticación desarrollada con django-rest-framework.",
    technologies: [
      ICONS.NextJS,
      ICONS.Django,
      ICONS.SQLite,
      ICONS.CSS,
      ICONS.Tailwind,
    ],
    image: {
      src: "projects/itbank_homebanking/preview.png",
      alt: "Prevista de la aplicación de homebanking desarrollada para la web. La plataforma se llama ITBANK y allí se pueden realizar operaciones bancarias desde a comodidad de un celular.",
    },
    links: [
      {
        href: "https://github.com/AgusT613/itba_full_stack_front/tree/develop",
        label: "GitHub Frontend",
        icon: ICONS.GitHub,
      },
      {
        href: "https://github.com/AgusT613/itba_full_stack_back/tree/develop",
        label: "Github Backend",
        icon: ICONS.GitHub,
      },
      {
        href: "https://itba-full-stack-proyecto.vercel.app/",
        label: "Página Web",
        icon: ICONS.RedirectIcon,
      },
    ],
  },
  {
    name: "Don Bosco Labs",
    description:
      "Sistema de laboratorio de análisis clínicos desarrollada para una practica. Marco de trabajo Scrum. Encargado de desarrollar la página web del laboratorio.",
    technologies: [ICONS.React, ICONS.CSS, ICONS.Tailwind],
    image: {
      src: "projects/don_bosco_labs/preview.png",
      alt: "Prevista del sistema de laboratorio de análisis clínicos en donde lo primero que se muestra es la sección de inicio con una imagen de una mujer con vestimenta de laboratorio en brazos cruzados.",
    },
    links: [
      {
        href: "https://github.com/AgusT613/don_bosco_labs",
        label: "GitHub Frontend",
        icon: ICONS.GitHub,
      },
      {
        href: "https://kaleidoscopic-dieffenbachia-5d550d.netlify.app/",
        label: "Página Web",
        icon: ICONS.RedirectIcon,
      },
    ],
  },
  {
    name: "Entrevista Técnica - Liftun",
    description:
      "Interfaz que permite a los usuarios configurar distintos elementos fundamentales para crear una acción sostenible para el medio ambiente. API REST y base de datos para almacenar las acciones.",
    technologies: [ICONS.NextJS, ICONS.Django, ICONS.SQLite, ICONS.PostgreSQL, ICONS.Tailwind],
    image: {
      src: "projects/entrevista_tecnica_uno/preview.png",
      alt: "REDACTAR",
    },
    links: [
      {
        href: "https://github.com/AgusT613/liftun_entrevista_front",
        label: "GitHub Frontend",
        icon: ICONS.GitHub,
      },
      {
        href: "https://github.com/AgusT613/liftun_entrevista_back",
        label: "GitHub Backend",
        icon: ICONS.GitHub,
      },
      // TODO: Publicar página web y desplegar el backend
      {
        href: "https://liftun-entrevista-front.vercel.app/",
        label: "Página Web",
        icon: ICONS.RedirectIcon,
      },
    ],
  },
];

export default PROJECTS