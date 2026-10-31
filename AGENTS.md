# AGENTS.md - Guía de Desarrollo y Arquitectura del Proyecto

Este documento es una guía exhaustiva para agentes de Inteligencia Artificial y desarrolladores de software que trabajen en este repositorio. Describe la arquitectura, patrones de diseño, convenciones de código, flujo de internacionalización, estilos y directrices para realizar cambios, ampliaciones o rediseños de manera consistente.

---

## 1. Resumen del Proyecto

- **Propósito:** Portafolio personal y profesional de desarrollo de software de Agustín (Facundo) Torres.
- **Tecnologías Principales:**
  - **Entorno de Ejecución:** Node.js v26.13.0 (LTS actual especificado en `.nvmrc`).
  - **Framework:** [Astro](https://astro.build/) v7.4.4 (SSG - Static Site Generation).
  - **Estilos:** [Tailwind CSS](https://tailwindcss.com/) v4.3.3 vía `@tailwindcss/vite` + CSS Modular y Scoped.
  - **Renderizado de Documentos:** [PDF.js](https://mozilla.github.io/pdf.js/) (`pdfjs-dist` v4.10.38) con worker local para visor de CV integrado y responsive.
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
│   ├── pdfjs/                  # Assets de soporte para PDF.js
│   │   └── pdf.worker.min.mjs  # Worker local de PDF.js con polyfill integrado
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
│   │   ├── ToggleMenu.astro    # Botones colapsar/expandir menú lateral
│   │   ├── TransformString.astro # Parseador e inyector de tags semánticos (<kw>)
│   │   └── ViewCVBtn.astro     # Botón para navegar a la página dedicada del visor de CV
│   ├── data/                   # Módulos de datos desacoplados
│   │   ├── experience.ts       # Datos técnicos de experiencias laborales (tags, URLs)
│   │   └── projects.ts         # Datos estructurales de proyectos (links, imagen, iconos)
│   ├── i18n/                   # Sistema de internacionalización
│   │   ├── locales/
│   │   │   ├── en.json         # Diccionario de textos en inglés (único JSON)
│   │   │   └── es.json         # Diccionario de textos en español (único JSON)
│   │   ├── ui.ts               # Idiomas disponibles, locale por defecto y chequeo de tipos
│   │   └── utils.ts            # Helper useTranslations(), getLangFromUrl() y tipado profundo
│   ├── layouts/
│   │   ├── Layout.astro        # Layout principal HTML (Head, Header, Body, Footer)
│   │   └── layout.css          # Estilos de la grilla principal (grid-wrapper)
│   ├── pages/
│   │   ├── [lang]/
│   │   │   ├── index.astro     # Página principal dinámica según idioma (/es, /en)
│   │   │   └── resume.astro    # Visor interactivo de CV con PDF.js (/es/resume, /en/resume)
│   │   └── index.astro         # Página raíz (manejada por redirección i18n de Astro)
│   ├── styles/
│   │   └── global.css          # Import de Tailwind v4, fuentes y variables globales
│   ├── types/
│   │   └── index.ts            # Interfaces TypeScript del dominio (IProject, IExperience, etc.)
│   ├── utils/
│   │   └── icons.js            # Registro centralizado de íconos tecnológicos
│   └── env.d.ts                # Declaraciones de tipos para el entorno Astro
├── .nvmrc                      # Versión de Node.js fijada (LTS v26.13.0)
├── astro.config.mjs            # Configuración de Astro, i18n, Tailwind Vite y Fuentes
├── package.json                # Dependencias y scripts del proyecto
├── tailwind.config.mjs         # Configuración de animaciones y keyframes de Tailwind
└── tsconfig.json               # Configuración de TypeScript
```

---

## 3. Arquitectura y Patrones Clave

### 3.1. Sistema de Internacionalización (i18n)

El proyecto utiliza un sistema de i18n basado en rutas (`/[lang]`) aprovechando las APIs nativas de Astro:

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
2. **Diccionarios Únicos por Idioma (`src/i18n/locales/`):**
   - Todos los textos se centralizan en un único archivo JSON por idioma (`es.json`, `en.json`) estructurado de forma jerárquica (`head`, `header`, `hero`, `experience`, `project`, `about`, `footer`).
   - Soporte automático para la extensión de editor **i18n Ally** (configurado en `.vscode/settings.json`).
3. **Tags Semánticos y `<TransformString />`:**
   - En lugar de fragmentar oraciones en múltiples subclaves, los párrafos completos se escriben como una sola cadena natural usando etiquetas semánticas como `<kw>texto destacado</kw>`.
   - El componente `TransformString.astro` procesa el texto e inyecta dinámicamente `KeyWord.astro`.
4. **Uso en Componentes:**
   ```astro
   ---
   import { useTranslations } from "../../i18n/utils";
   const t = useTranslations(Astro.currentLocale);
   ---
   <h2>{t("experience.sectionTitle")}</h2>
   ```
5. **Generación de Rutas Seguras:**
   - En `LanguagePicker.astro`, se utiliza `getRelativeLocaleUrl(lang)` de `astro:i18n`.
   - En `src/pages/[lang]/index.astro`, `getStaticPaths()` mapea dinámicamente el array de `locales`.

### 3.2. Layout y Header Sticky Superior

- **Estructura:** Definida en `src/layouts/Layout.astro` y `src/layouts/layout.css` con `flex-direction: column`.
- **Header Superior Sticky (`src/components/header/Header.astro` + `header.css`):**
  - Barra de navegación fija en la parte superior (`position: sticky; top: 0; width: 100%; z-index: 50;`) con efecto blur translúcido (`backdrop-filter: blur(16px)`).
  - **Izquierda:** Componente `LanguagePicker.astro` mostrando el ícono de idioma y el nombre del idioma activo con selector desplegable en CSS puro.
  - **Centro / Derecha (Desktop > 768px):** Enlaces horizontales directos a las secciones.
  - **Móvil (<= 768px):** Botón hamburguesa (`#drop-drown-btn`) que abre el menú overlay a pantalla completa (`#drop-down-nav-bar-container`).

### 3.3. Detección de Sección Activa (Scroll Spy)

En `src/pages/[lang]/index.astro`, un script del cliente con `IntersectionObserver` monitorea la visibilidad de cada `<section>`. Al hacer scroll:
- Asigna la clase `current-section-focused` al enlace de navegación correspondiente, aplicando un subrayado indicador y resaltado de color.
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

### 3.6. Visor de CV con PDF.js (`src/pages/[lang]/resume.astro`)

- **Rutas dedicadas:** `/es/resume` y `/en/resume`, sincronizadas con la selección de idioma en `LanguagePicker.astro` (preserva la ruta al cambiar idioma).
- **Worker Local y Polyfill:** Utiliza `pdfjs-dist` (v4.10.38) con su worker servido desde `/pdfjs/pdf.worker.min.mjs` y polyfill de `Promise.withResolvers` para compatibilidad completa en navegadores móviles (iOS Safari < 17.4, WebViews de LinkedIn, Instagram, etc.).
- **Ajuste Responsive y Rendimiento:** El canvas adapta su escala dinámicamente (`fitToWidth`), con protección de memoria en móviles (capando `devicePixelRatio` a un máximo de `2.0` para evitar saturación del búfer gráfico en pantallas Retina/OLED). Incluye toolbar con controles de zoom, ajuste y descarga directa.

---

## 4. Guía para Implementaciones y Modificaciones

### 4.1. Cómo agregar un nuevo Proyecto

1. **Guardar la imagen:**
   Colocar la imagen de vista previa en `public/projects/<nombre_proyecto>/preview.png`.
2. **Agregar los textos traducidos:**
   En `src/i18n/locales/es.json` y `src/i18n/locales/en.json` dentro de `"project"`:
   ```json
   // es.json
   "miProyecto": {
     "description": "Descripción en español...",
     "imageAlt": "Texto alternativo..."
   }

   // en.json
   "miProyecto": {
     "description": "Description in English...",
     "imageAlt": "Alt text..."
   }
   ```
3. **Registrar las tecnologías en `src/utils/icons.js`:**
   Si el proyecto usa una tecnología nueva, crear su componente SVG en `src/components/icons/<Tech>.astro` y agregarlo al objeto `ICONS`.
4. **Agregar el objeto a `PROJECTS_DATA` en `src/data/projects.ts`:**
   ```typescript
   {
     id: "miProyecto",
     name: "Nombre del Proyecto",
     translationId: "miProyecto",
     technologies: [ICONS.NextJS, ICONS.Tailwind],
     image: "/projects/<nombre_proyecto>/preview.png",
     links: [
       {
         href: "https://github.com/...",
         type: "github-front",
       },
       {
         href: "https://demo.vercel.app/",
         type: "live",
       },
     ],
   }
   ```

### 4.2. Cómo agregar una nueva Experiencia Laboral / Formación

1. **Agregar textos i18n:**
   En `es.json` y `en.json` dentro de `"experience"`:
   ```json
   "miExperiencia": {
     "title": "...",
     "date": "...",
     "description": "..."
   }
   ```
2. **Agregar entrada en `EXPERIENCES_DATA` en `src/data/experience.ts`:**
   ```typescript
   {
     id: "miExperiencia",
     tags: ["React", "TypeScript", "TailwindCSS"],
     projectUrl: "https://...",
   }
   ```

### 4.3. Cómo agregar un nuevo Idioma

1. Crear el archivo `src/i18n/locales/<código_idioma>.json` copiando la estructura de `es.json`.
2. Registrar el nuevo idioma en `src/i18n/ui.ts` (en `languages` y en el objeto `ui`).
3. Añadir el código de idioma a `i18n.locales` en `astro.config.mjs`.
4. Agregar el ícono de la bandera en `src/components/icons/languages/` e integrarlo en `src/components/LanguagePicker.astro`.
5. Añadir el archivo PDF del CV correspondiente en `public/` y configurar su enlace en el JSON.
6. (Opcional): `getStaticPaths()` en `src/pages/[lang]/index.astro` reconocerá el nuevo idioma automáticamente sin cambios manuales.

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
