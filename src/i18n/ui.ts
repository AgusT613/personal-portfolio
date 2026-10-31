import es from "./locales/es.json";
import en from "./locales/en.json";

export const languages = {
  es: "Español",
  en: "English",
} as const;

export type Locale = keyof typeof languages;
export const locales = Object.keys(languages) as Locale[];
export const defaultLang: Locale = "es";

// Type parity check: ensures 'en' complies with 'es' structure
const _typeParityCheck: typeof es = en;

export const ui = { es, en } as const;
export type TranslationSchema = typeof es;
