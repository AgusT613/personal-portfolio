# AGENTS.md - Guía de Desarrollo y Arquitectura del Proyecto

Este documento es una guía exhaustiva para agentes de Inteligencia Artificial y desarrolladores de software que trabajen en este repositorio. Describe la arquitectura, patrones de diseño, convenciones de código, flujo de internacionalización, estilos y directrices para realizar cambios, ampliaciones o rediseños de manera consistente.

---

## 1. Resumen del Proyecto

- **Propósito:** Portafolio personal y profesional de desarrollo de software de Agustín (Facundo) Torres.
- **Tecnologías Principales:**
  - **Framework:** [Astro](https://astro.build/) v7.2.4 (SSG - Static Site Generation).
  - **Estilos:** [Tailwind CSS](https://tailwindcss.com/) v4.3.3 vía `@tailwindcss/vite` + CSS Modular y Scoped.
  - **Lenguaje:** TypeScript / JavaScript (ESM).
  - **Tipografía:** *Roboto Slab* gestionada mediante `fontProviders.fontsource()` en `astro.config.mjs`.
  - **Internacionalización (i18n):** Sistema bilingüe nativo (Español `es` por defecto, Inglés `en`).

---

## 2. Estructura del Directorio

> **Nota:** Las carpetas `node_modules/`, `dist/`, `.astro/` y `private/` contienen artefactos compilados, dependencias o datos privados. No deben modificarse manualmente ni versionarse.

```
personal-portfolio/
├── public/                     # Archivos estáticos servidos directamente en la raíz
│   ├── favicon.ico             # Ícono del sitio
│   ├── portrait.jpg            # Foto de perfil para la sección "Sobre Mí"
│   ├── profile_image.png       # Avatar principal del Hero
│   ├── torres-facundo-cv-en.pdf # CV descargable en inglés
│   ├── torres-facundo-cv-es.pdf # CV descargable en español
│   └── projects/               # Capturas y vistas previas de proyectos
│       ├── don_bosco_labs/
│       ├── ecommerce/
│       ├── entrevista_tecnica_uno/
│       └── itbank_homebanking/
├── src/
│   ├── components/             # Componentes reutilizables y secciones
│   │   ├── about_me/           # Sección "Sobre Mí" (AboutMe.astro + about_me.css)
│   │   ├── experience/         # Sección de experiencia laboral / formación
│   │   ├── footer/             # Pie de página y enlaces de contacto
│   │   ├── header/             # Navegación lateral/superior fija y responsive
│   │   ├── hero/               # Banner principal de presentación
│   │   ├── icons/              # Componentes SVG de íconos y banderas de idiomas
│   │   ├── project/            # Sección y tarjetas de proyectos
│   │   ├── Badge.astro         # Etiqueta visual para skills / tags
│   │   ├── CopyEmailBtn.astro  # Botón interactivo para copiar email al portapapeles
│   │   ├── CustomActionBtn.astro # Botón base reutilizable con estilos comunes
│   │   ├── CustomH3.astro      # Tipografía H3 estandarizada y responsive
│   │   ├── CustomParagraph.astro # Párrafo base estilizado
│   │   ├── DownloadCVBtn.astro # Botón de descarga de CV con soporte i18n
│   │   ├── KeyWord.astro       # Resaltador de palabras clave en texto
│   │   ├── LanguagePicker.astro # Selector desplegable de idioma
│   │   ├── MessageContainer.astro # Notificación flotante (toast) al copiar email
│   │   ├── TechnologiesUsed.astro # Lista de badges de tecnologías con íconos
│   │   ├── TitleSection.astro  # Título de sección h2 unificado
│   │   └── ToggleMenu.astro    # Botones colapsar/expandir menú lateral
│   ├── i18n/                   # Sistema de internacionalización
│   │   ├── lang/
│   │   │   ├── english.ts      # Diccionario de textos en inglés
│   │   │   └── spanish.ts      # Diccionario de textos en español
│   │   ├── ui.ts               # Configuración de lenguajes disponibles y ui map
│   │   └── utils.ts            # Helpers getLangFromUrl() y useTranslations()
│   ├── layouts/
│   │   ├── Layout.astro        # Layout principal HTML (Head, Header, Body, Footer)
│   │   └── layout.css          # Estilos de la grilla principal (grid-wrapper)
│   ├── pages/
│   │   ├── [lang]/
│   │   │   └── index.astro     # Página principal dinámica según idioma (/es, /en)
│   │   └── index.astro         # Página raíz (manejada por redirección i18n de Astro)
│   ├── styles/
│   │   └── global.css          # Import de Tailwind v4, fuentes y variables globales
│   ├── types/
│   │   └── index.ts            # Interfaces TypeScript del dominio (IProject, IExperience, etc.)
│   ├── utils/
│   │   └── icons.js            # Registro centralizado de íconos tecnológicos
│   └── env.d.ts                # Declaraciones de tipos para el entorno Astro
├── astro.config.mjs            # Configuración de Astro, i18n, Tailwind Vite y Fuentes
├── package.json                # Dependencias y scripts del proyecto
├── tailwind.config.mjs         # Configuración de animaciones y keyframes de Tailwind
└── tsconfig.json               # Configuración de TypeScript
```

---

## 3. Arquitectura y Patrones Clave

### 3.1. Sistema de Internacionalización (i18n)

El proyecto utiliza un sistema de i18n basado en rutas (`/[lang]`):

1. **Configuración en `astro.config.mjs`:**
   ```javascript
   i18n: {
     defaultLocale: "es",
     locales: ["es", "en"],
     routing: {
       prefixDefaultLocale: true,
       redirectToDefaultLocale: true,
     },
   }
   ```
2. **Diccionarios (`src/i18n/lang/`):**
   - Todos los textos visibles en pantalla deben extraerse a `spanish.ts` y `english.ts`.
   - Se utiliza una nomenclatura con notación de puntos: `categoria.seccion.elemento` (por ejemplo: `hero.greeting`, `experience.red.mascotera.title`).
3. **Uso en Componentes:**
   ```astro
   ---
   import { getLangFromUrl, useTranslations } from "../../i18n/utils";
   const t = useTranslations(getLangFromUrl(Astro.url));
   ---
   <h2>{t("experience.section.title")}</h2>
   ```

### 3.2. Layout y Responsive Grid

- **Estructura:** Definida en `src/layouts/Layout.astro` y `src/layouts/layout.css`.
- **Desktop (>= 900px):**
  - Barra de navegación (`Header.astro`) fija a la izquierda ocupando `100dvh` (Grid area: `header`).
  - Contenido principal centrado (`main-wrapper`).
  - Footer al pie del contenido principal (`footer`).
- **Tablet / Mobile (< 900px y <= 600px):**
  - El Header pasa a ser una barra superior horizontal fija (`position: fixed; width: 100%`) con efecto `backdrop-filter: blur(24px)`.
  - En pantallas muy pequeñas (<= 600px), se activa el menú desplegable móvil (`#drop-drown-btn` y `#drop-down-nav-bar-container`).

### 3.3. Detección de Sección Activa (Scroll Spy)

En `src/pages/[lang]/index.astro`, un script del cliente con `IntersectionObserver` monitorea la visibilidad de cada `<section>`. Al hacer scroll:
- Agrega la clase `current-section-focused`, `bg-blue-500` y `scale-110` al ícono del menú correspondiente.
- Resalta el texto del enlace de navegación activo.
- Maneja `document.onvisibilitychange` para pausar y reanudar el observador cuando la pestaña pierde foco.

### 3.4. Catálogo Centralizado de Íconos (`src/utils/icons.js`)

Los componentes de íconos SVG residen en `src/components/icons/`. Cada ícono propaga `{...Astro.props}` para aceptar clases Tailwind personalizadas.

Para evitar imports redundantes en múltiples componentes, `src/utils/icons.js` exporta un objeto `ICONS` con objetos de tecnología (`{ icon, label }`) y referencias directas a componentes de íconos.

### 3.5. Modelos de Datos (`src/types/index.ts`)

- `ITechnologiesUsed`: `{ icon: any; label: string; }`
- `IImage`: `{ src: string; alt: string; }`
- `IProjectLinks`: `{ href: string; label: string; icon: any; }`
- `IProject`: `{ name: string; description: string; technologies: ITechnologiesUsed[]; image: IImage; links: IProjectLinks[]; }`
- `IExperience`: `{ title: string; date: string; description: string; tags: string[]; settings: IExperienceSettings; }`

---

## 4. Guía para Implementaciones y Modificaciones

### 4.1. Cómo agregar un nuevo Proyecto

1. **Guardar la imagen:**
   Colocar la imagen de vista previa en `public/projects/<nombre_proyecto>/preview.png`.
2. **Agregar los textos traducidos:**
   En `src/i18n/lang/spanish.ts` y `src/i18n/lang/english.ts`:
   ```typescript
   // Spanish
   "project.<id>.description": "Descripción en español...",
   "project.<id>.img.alt": "Texto alternativo...",

   // English
   "project.<id>.description": "Description in English...",
   "project.<id>.img.alt": "Alt text...",
   ```
3. **Registrar las tecnologías en `src/utils/icons.js`:**
   Si el proyecto usa una tecnología nueva, crear su componente SVG en `src/components/icons/<Tech>.astro` y agregarlo al objeto `ICONS`.
4. **Agregar el objeto a la lista `PROJECTS` en `src/components/project/ProjectSection.astro`:**
   ```typescript
   {
     name: "Nombre del Proyecto",
     description: t("project.<id>.description"),
     technologies: [ICONS.NextJS, ICONS.Tailwind],
     image: {
       src: "../projects/<nombre_proyecto>/preview.png",
       alt: t("project.<id>.img.alt"),
     },
     links: [
       {
         href: "https://github.com/...",
         label: "GitHub Frontend",
         icon: ICONS.GitHub,
       },
       {
         href: "https://demo.vercel.app/",
         label: t("project.section.webpage.btn.label"),
         icon: ICONS.RedirectIcon,
       },
     ],
   }
   ```

### 4.2. Cómo agregar una nueva Experiencia Laboral / Formación

1. **Agregar textos i18n:**
   En `spanish.ts` y `english.ts`:
   ```typescript
   "experience.<id>.title": "...",
   "experience.<id>.date": "...",
   "experience.<id>.description": "...",
   ```
2. **Agregar entrada en `EXPERIENCES` en `src/components/experience/ExperienceSection.astro`:**
   ```typescript
   {
     title: t("experience.<id>.title"),
     date: t("experience.<id>.date"),
     description: t("experience.<id>.description"),
     tags: ["React", "TypeScript", "TailwindCSS"],
     settings: {
       hasProjectUrls: true,
       projectUrl: "https://...",
     },
   }
   ```

### 4.3. Cómo agregar un nuevo Idioma

1. Crear el archivo de traducciones `src/i18n/lang/<idioma>.ts`.
2. Actualizar `src/i18n/ui.ts` agregando la clave del idioma y exportándolo en `ui`.
3. Actualizar `astro.config.mjs` agregando el código de idioma a `i18n.locales`.
4. Actualizar `getStaticPaths()` en `src/pages/[lang]/index.astro` agregando `{ params: { lang: "<nuevo_idioma>" } }`.
5. Agregar el ícono de la bandera en `src/components/icons/languages/` e integrarlo en `src/components/LanguagePicker.astro`.
6. Añadir el archivo PDF del CV correspondiente en `public/` y configurar su enlace en el diccionario.

---

## 5. Convenciones y Reglas de Desarrollo

### 5.1. Reglas Generales
- **No duplicar textos hardcodeados:** Cualquier texto legible por el usuario final debe pasar obligatoriamente por el sistema i18n (`t(...)`).
- **Preservar la accesibilidad (a11y):** Asegurarse de mantener atributos `aria-label`, `alt` en imágenes y enlaces semánticos con `target="_blank"` y estructura jerárquica de encabezados (`h1`, `h2`, `h3`).
- **Consistencia de estilos:** Utilizar Tailwind CSS v4 para espaciado, colores y tipografía. Para reglas de media query complejas vinculadas a componentes individuales, utilizar archivos `.css` complementarios en la misma carpeta del componente.
- **Rendimiento e Interactividad:** Astro favorece el envío de cero JavaScript por defecto. Mantener los scripts del cliente ligeros en `<script>` nativos sin frameworks pesados innecesarios, a menos que se requiera interactividad compleja (en cuyo caso usar Astro Islands con `client:load` o `client:visible`).

### 5.2. Scripts de NPM Disponibles

| Comando | Descripción |
|---|---|
| `npm run dev` | Inicia el servidor de desarrollo local de Astro. |
| `npm run build` | Compila el sitio estático para producción en la carpeta `dist/`. |
| `npm run preview` | Previsualiza localmente el build generado en `dist/`. |
| `npm run astro` | Ejecuta comandos CLI directos de Astro. |

---

## 6. Oportunidades de Mejora y Recomendaciones para Futuros Rediseños

Para agentes o desarrolladores que realicen mejoras en la base de código:

1. **Optimización de Imágenes con `astro:assets`:**
   Actualmente varias imágenes se cargan con `<img>` directo desde `/public`. Se recomienda migrar a `<Image />` o `<Picture />` de `astro:assets` en `src/assets/` para optimización automática de formatos (WebP/AVIF), lazy-loading y prevención de CLS.
2. **Migración a Astro Content Collections:**
   Para proyectos y experiencias, migrar de arrays estáticos en componentes a colecciones tipadas (`src/content/projects/` y `src/content/experience/`) con esquemas Zod en `src/content.config.ts`.
3. **Tipado Estricto de Íconos:**
   Refactorizar `src/utils/icons.js` a TypeScript (`icons.ts`) y sustituir los tipos `any` en `src/types/index.ts` por `astro.HTMLAttributes<'svg'>` o `Component` de Astro.
4. **Toast / Message Container State:**
   El botón de copiado de email manipula clases CSS directamente. Se podría encapsular como un Web Component autónomo (`<copy-email-button>`) o usar un custom event desacoplado.
