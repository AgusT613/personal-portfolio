import en from "./lang/english";
import es from "./lang/spanish";

export const languages = {
  es: "Español",
  en: "English",
};

export const defaultLang = "es";

export const ui = { es, en } as const;
