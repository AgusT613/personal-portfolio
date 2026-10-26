import { ui, languages, defaultLang, type Locale, type TranslationSchema } from "./ui";

type NestedKeyOf<ObjectType extends object> = {
  [Key in keyof ObjectType & (string | number)]: ObjectType[Key] extends object
    ? `${Key}.${NestedKeyOf<ObjectType[Key]>}`
    : `${Key}`;
}[keyof ObjectType & (string | number)];

export type TranslationKey = NestedKeyOf<TranslationSchema>;

export function getLangFromLocale(locale?: string | null): Locale {
  if (locale && locale in languages) return locale as Locale;
  return defaultLang;
}

export function getLangFromUrl(url: URL): Locale {
  const [, lang] = url.pathname.split("/");
  return getLangFromLocale(lang);
}

function getNestedValue(obj: any, path: string): string | undefined {
  if (!obj || typeof obj !== "object") return undefined;
  return path.split(".").reduce((acc, part) => (acc ? acc[part] : undefined), obj);
}

export function useTranslations(localeOrUrl?: string | null | URL) {
  let lang: Locale = defaultLang;

  if (localeOrUrl instanceof URL) {
    lang = getLangFromUrl(localeOrUrl);
  } else if (typeof localeOrUrl === "string") {
    lang = getLangFromLocale(localeOrUrl);
  }

  const localized = ui[lang];
  const fallback = ui[defaultLang];

  return function t(
    key: TranslationKey,
    params?: Record<string, string | number>
  ): string {
    let result =
      getNestedValue(localized, key) ?? getNestedValue(fallback, key) ?? key;

    if (typeof result !== "string") {
      result = String(result);
    }

    if (params) {
      for (const [k, v] of Object.entries(params)) {
        result = result.replaceAll(`{{${k}}}`, String(v));
      }
    }

    return result;
  };
}
