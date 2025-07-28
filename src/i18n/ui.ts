import en from "./lang/english";
import es from "./lang/spanish";

export const languages = {
  es: "es",
  en: "en",
};

export const defaultLang = languages.es;

export const ui = { es, en } as const;
