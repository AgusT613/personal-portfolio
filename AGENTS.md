# AGENTS.md - Guía de Desarrollo y Arquitectura del Proyecto

Este documento es una guía exhaustiva para agentes de Inteligencia Artificial y desarrolladores de software que trabajen en este repositorio. Describe la arquitectura, patrones de diseño, convenciones de código, flujo de internacionalización, estilos y directrices para realizar cambios, ampliaciones o rediseños de manera consistente.

---

## 1. Resumen del Proyecto

- **Propósito:** Portafolio personal y profesional de desarrollo de software de Agustín (Facundo) Torres.
- **Tecnologías Principales:**
  - **Entorno de Ejecución:** Node.js v26.13.0 (LTS actual especificado en `.nvmrc`).
  - **Framework:** [Astro](https://astro.build/) v7.4.13 (SSG - Static Site Generation).
  - **Íconos:** [astro-icon](https://github.com/natemoo-re/astro-icon) v1.2.0 con `@iconify-json/logos`, `@iconify-json/tabler` y `@iconify-json/simple-icons` (inlining estático en tiempo de compilación con 0 JS en el cliente).
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
│   ├── favicon.ico / .png      # Favicons del sitio
│   ├── personal-portfolio-preview.png # Imagen de vista previa para redes sociales y README
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
│   │   ├── about_me/           # Sección "Sobre Mí" (AboutMe.astro + about_me.css con tabs: Me, Educación, Intereses)
│   │   ├── experience/         # Sección de experiencia laboral en timeline (ExperienceSection.astro + ExperienceContainer.astro)
│   │   ├── footer/             # Pie de página moderno y responsive (Footer.astro + footer.css + footerLinks.ts)
│   │   ├── header/             # Navegación superior fija y responsive (Header.astro + header.css)
│   │   ├── hero/               # Banner principal de presentación (Hero.astro + hero.css)
│   │   ├── project/            # Sección y tarjetas de proyectos con filtrado interactivo (ProjectSection.astro + ProjectContainer.astro)
│   │   ├── technologies/       # Sección de tecnologías categorizadas (TechnologiesSection.astro)
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
│   │   ├── TransformString.astro # Parseador e inyector de tags semánticos (<kw>)
│   │   └── ViewCVBtn.astro     # Botón para navegar a la página dedicada del visor de CV
│   ├── data/                   # Módulos de datos desacoplados
│   │   ├── experience.ts       # Datos técnicos de experiencias laborales (tags, URLs)
│   │   ├── projects.ts         # Datos estructurales de proyectos (links, imagen, identificadores de íconos)
│   │   └── technologies.ts     # Catálogo de tecnologías categorizadas (Frontend, Backend, Cloud, Desktop)
│   ├── i18n/                   # Sistema de internacionalización
│   │   ├── locales/
│   │   │   ├── en.json         # Diccionario de textos en inglés (único JSON jerárquico)
│   │   │   └── es.json         # Diccionario de textos en español (único JSON jerárquico)
│   │   ├── ui.ts               # Idiomas disponibles, locale por defecto y chequeo de tipos
│   │   └── utils.ts            # Helper useTranslations(), getLangFromUrl() y tipado profundo
│   ├── icons/                  # Directorio para SVGs locales en astro-icon (con .gitkeep para evitar advertencias de build)
│   ├── layouts/
│   │   ├── Layout.astro        # Layout principal HTML (Head, Header, Body, Footer con metadatos OG completos)
│   │   └── layout.css          # Estilos de la grilla principal (grid-wrapper)
│   ├── pages/
│   │   ├── [lang]/
│   │   │   ├── index.astro     # Página principal dinámica según idioma (/es, /en)
│   │   │   └── resume.astro    # Visor interactivo de CV con PDF.js (/es/resume, /en/resume)
│   │   └── index.astro         # Página raíz (manejada por redirección i18n de Astro)
│   ├── styles/
│   │   └── global.css          # Import de Tailwind v4, fuentes y variables globales
│   ├── types/
│   │   └── index.ts            # Interfaces TypeScript del dominio (IProject, IExperience, ITechnologyCategory, etc.)
│   └── env.d.ts                # Declaraciones de tipos para el entorno Astro
├── .nvmrc                      # Versión de Node.js fijada (LTS v26.13.0)
├── astro.config.mjs            # Configuración de Astro, i18n, Tailwind Vite y Fuentes
├── package.json                # Dependencias y scripts del proyecto
├── README.md                   # Documentación principal con preview del portafolio
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
   - Todos los textos se centralizan en un único archivo JSON por idioma (`es.json`, `en.json`) estructurado de forma jerárquica (`head`, `header`, `hero`, `experience`, `technologies`, `project`, `about`, `footer`).
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

En `src/pages/[lang]/index.astro`, un script del cliente con `IntersectionObserver` monitorea la visibilidad de cada `<section>` (`#top`, `#projects`, `#experience`, `#technologies`, `#about-me`, `#contact`):
- Asigna la clase `current-section-focused` al enlace de navegación correspondiente, aplicando un subrayado indicador y resaltado de color.
- Maneja `document.onvisibilitychange` para pausar y reanudar el observador cuando la pestaña pierde foco.

### 3.4. Sistema de Íconos con `astro-icon`

El proyecto utiliza [`astro-icon`](https://github.com/natemoo-re/astro-icon) para la gestión e inyección de íconos vectoriales:
- **Zero Runtime JavaScript:** Los íconos se resuelven y compilan como elementos `<svg>` puros directamente en el HTML estático en tiempo de build.
- **Colecciones Offline (Iconify):**
  - `@iconify-json/logos`: Logotipos oficiales coloreados de tecnologías (`logos:nextjs-icon`, `logos:react`, `logos:django-icon`, etc.).
  - `@iconify-json/tabler`: Íconos de interfaz modernos y consistentes (`tabler:download`, `tabler:copy`, `tabler:external-link`, `tabler:menu-2`, `tabler:language`, `tabler:check`, etc.).
  - `@iconify-json/simple-icons`: Logos tecnológicos complementarios.
- **Directorio de Íconos Locales (`src/icons/`):**
  - Se mantiene esta carpeta con un archivo `.gitkeep` para **evitar la advertencia `[WARN] [astro-icon] Failed to load icons from "src/icons": ENOENT...`** durante la compilación.

### 3.5. Modelos de Datos (`src/types/index.ts`)

- `ITechnologiesUsed`: `{ icon: string; label: string; }`
- `IImage`: `{ src: string; alt: string; }`
- `IProjectLinks`: `{ href: string; label: string; icon: string; }`
- `IProject`: `{ name: string; description: string; technologies: ITechnologiesUsed[]; image: IImage; links: IProjectLinks[]; }`
- `IExperience`: `{ title: string; date: string; description: string; tags: string[]; settings: IExperienceSettings; }`
- `ITechnologyItem`: `{ name: string; icon: string; }`
- `ITechnologyCategory`: `{ id: string; titleKey: string; items: ITechnologyItem[]; }`

### 3.6. Visor de CV con PDF.js (`src/pages/[lang]/resume.astro`)

- **Rutas dedicadas:** `/es/resume` y `/en/resume`, sincronizadas con la selección de idioma en `LanguagePicker.astro`.
- **Worker Local y Polyfill:** Utiliza `pdfjs-dist` (v4.10.38) con worker servido desde `/pdfjs/pdf.worker.min.mjs` y polyfill de `Promise.withResolvers` para compatibilidad completa en navegadores móviles (iOS Safari < 17.4, WebViews de LinkedIn, Instagram, etc.).
- **Ajuste Responsive y Rendimiento:** El canvas adapta su escala dinámicamente (`fitToWidth`), con protección de memoria en móviles (capando `devicePixelRatio` a un máximo de `2.0`).

### 3.7. Sub-sección "Sobre Mí" con Pestañas Interactivas (`src/components/about_me/`)

- **Estructura en pestañas (Tabs accesible vía ARIA):**
  1. **`Biografía` (`me`):** Contiene el texto biográfico original con palabras clave `<kw>` y foto de perfil en formato circular/responsive.
  2. **`Educación` (`education`):** Tarjetas estructuradas que cubren carrera universitaria (Ingeniería Informática - UBA), formación técnica secundaria (Técnico Electromecánico), y lista de cursos/certificaciones (Talento Tech GEAR en IA, Google Cloud GCP, ITBA Full Stack, Inglés B2).
  3. **`Intereses & Visión` (`interests`):** Tres pilares de presentación personal: *Filosofía de Trabajo* (código limpio y soluciones sostenibles), *Pasiones Tecnológicas* (IA, Cloud y hardware embebido/IoT) y *Valores Clave*.
- **Comportamiento sin dependencias pesadas:** Tab navigation en vanilla JavaScript con animación suave de entrada y soporte para eventos de ciclo de vida (`astro:page-load`).

### 3.8. Sección de Tecnologías (`src/components/technologies/`)

- Organiza el stack técnico en una cuadrícula de 2 columnas (responsive a 1 columna en móvil) con 4 categorías:
  - *Frontend*
  - *Backend*
  - *Bases de Datos & Cloud*
  - *Desktop & Hardware*
- Datos centralizados en `src/data/technologies.ts`.

### 3.9. Filtrado Interactivo de Proyectos (`src/components/project/`)

- Sistema de pills de filtrado interactivo con contadores dinámicos calculados a partir de los datos.
- Permite filtrar proyectos por tecnologías de forma acumulativa y restablecer la vista mediante un botón de limpiar filtros o la píldora *Todos*.
- Estado visual vacío accesible cuando ninguna tarjeta coincide con la combinación de filtros.

### 3.10. Línea de Tiempo de Experiencia (`src/components/experience/`)

- Rediseño con eje vertical iluminado y nodos circulares con icono de portafolio.
- Tarjetas con fecha en badge, enlaces directos si existe URL del proyecto y lista de tecnologías empleadas.

### 3.11. Footer Moderno (`src/components/footer/`)

- Integrado con la paleta de colores global (`rgba(34, 43, 60, 0.85)` y borde superior `rgba(255, 255, 255, 0.08)`).
- Conserva el ancla `<section id="contact">` para ser monitoreado por el `IntersectionObserver`.
- Mantiene la leyenda original `"Desarrollado con Astro"` con el logotipo de Astro a la derecha.

---

## 4. Guía de Estilos y Paleta de Colores Oficial

> **REGLA ESTRICTA DE DISEÑO:** Bajo ninguna circunstancia deben introducirse colores fuera de la paleta oficial establecida. Todas las secciones, botones, tarjetas e interactividades deben ceñirse estrictamente a los siguientes tokens:

| Token / Elemento | Valor CSS | Propósito |
|---|---|---|
| **Fondo Base Global** | `#1a202c` / `#0f172a` | Background del documento `html` |
| **Fondos Traslúcidos (Header/Footer)** | `rgba(34, 43, 60, 0.85)` | Efecto glassmorphism con `backdrop-filter: blur(16px)` |
| **Fondo de Tarjetas** | `rgba(30, 41, 59, 0.45)` | Slate 800 traslúcido para proyectos, categorías y educación |
| **Fondo de Ítems / Sub-tarjetas** | `rgba(15, 23, 42, 0.55)` | Slate 900 semitransparente para items secundarios |
| **Bordes Estándar** | `1px solid rgba(255, 255, 255, 0.08)` | Bordes sutiles en tarjetas y divisores |
| **Acento Primario (Púrpura)** | `#a855f7` / `#c084fc` / `#d8b4fe` | Títulos principales, nodos activos, enlaces y hover de tarjetas |
| **Píldora Activa (Púrpura traslúcido)** | `rgba(168, 85, 247, 0.22)` con borde `#a855f7` | Tabs activas y filtros de tecnología activos |
| **Acento Secundario (Azul)** | `#2563eb` - `#3b82f6` / `#60a5fa` | Botones de acción principales (`CustomActionBtn`) y `<kw>` |
| **Insignias y Estado (Esmeralda)** | `#34d399` / `#6ee7b7` (`rgba(16, 185, 129, 0.12)`) | Insignias (`Badge.astro`) y punto de disponibilidad |
| **Texto Principal** | `#efeded` / `#f8fafc` | Encabezados y títulos de tarjetas |
| **Texto Secundario** | `#cbd5e1` / `#94a3b8` | Párrafos descriptivos, subtítulos e íconos inactivos |

---

## 5. Guía para Implementaciones y Modificaciones

### 5.1. Cómo agregar un nuevo Proyecto

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
3. **Seleccionar el ícono de tecnología:**
   Utilizar identificadores de Iconify de `@iconify-json/logos` o `@iconify-json/tabler`.
4. **Agregar el objeto a `PROJECTS_DATA` en `src/data/projects.ts`:**
   ```typescript
   {
     id: "miProyecto",
     name: "Nombre del Proyecto",
     translationId: "miProyecto",
     technologies: [
       { icon: "logos:nextjs-icon", label: "Next.js" },
       { icon: "logos:tailwindcss-icon", label: "Tailwind CSS" },
     ],
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

### 5.2. Cómo agregar una nueva Experiencia Laboral / Formación

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

### 5.3. Cómo agregar un nuevo Idioma

1. Crear el archivo `src/i18n/locales/<código_idioma>.json` copiando la estructura jerárquica de `es.json`.
2. Registrar el nuevo idioma en `src/i18n/ui.ts` (en `languages` y en el objeto `ui`).
3. Añadir el código de idioma a `i18n.locales` en `astro.config.mjs`.
4. Añadir el archivo PDF del CV correspondiente en `public/`.

---

## 6. Convenciones y Reglas de Desarrollo

### 6.1. Reglas Generales
- **No duplicar textos hardcodeados:** Cualquier texto legible por el usuario final debe pasar obligatoriamente por el sistema i18n (`t(...)`).
- **Respetar la paleta de colores establecida:** Utilizar siempre las clases y tokens descritos en la sección 4.
- **Preservar la accesibilidad (a11y):** Asegurarse de mantener atributos `aria-label`, `alt` en imágenes y enlaces semánticos con `target="_blank"`, `rel="noopener noreferrer"` y roles ARIA (`role="tab"`, `role="tabpanel"`).
- **Consistencia de estilos:** Utilizar Tailwind CSS v4 para espaciado y tipografía. Para estilos scoped complejos, emplear archivos `.css` complementarios en la carpeta del componente.
- **Rendimiento e Interactividad:** Mantener los scripts del cliente ligeros en `<script>` nativos sin frameworks pesados innecesarios.

### 6.2. Scripts de NPM Disponibles

| Comando | Descripción |
|---|---|
| `npm run dev` | Inicia el servidor de desarrollo local de Astro. |
| `npm run build` | Compila el sitio estático para producción en la carpeta `dist/`. |
| `npm run preview` | Previsualiza localmente el build generado en `dist/`. |
| `npm run astro` | Ejecuta comandos CLI directos de Astro. |
