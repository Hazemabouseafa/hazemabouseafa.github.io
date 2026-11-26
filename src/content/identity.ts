import type { IdentityConfig, Locale } from "./types";

export const IDENTITY: IdentityConfig = {
  brand: "ENG HAZEM",
  arabicName: "حازم أبوسعيفة",
  englishName: "Hazem Abouseafa",
  title: {
    ar: "مهندس برمجيات",
    en: "Software Engineer",
  },
  location: {
    ar: "مصر",
    en: "Egypt",
  },
  domain: "hazem.my",
  siteUrl: "https://hazem.my",
  motto: {
    ar: "هندسة تصنع الفرق",
    en: "ENGINEERED TO BE DIFFERENT",
  },
  whatsappNumberDisplay: "+20 155 061 2361",
  whatsappNumberRaw: "201550612361",
  whatsappBaseUrl: "https://wa.me/201550612361",
  whatsappPrefill: {
    ar: "أهلاً يا بشمهندس حازم، شفت أعمالك وحابب أتكلم معاك بخصوص مشروع.",
    en: "Hello Eng. Hazem, I reviewed your portfolio and would like to discuss a project.",
  },
  facebookUrl: "https://www.facebook.com/profile.php?id=61594629166013",
};

export function getWhatsAppHref(locale: Locale, customMessage?: string): string {
  const message = customMessage ?? IDENTITY.whatsappPrefill[locale];
  return `${IDENTITY.whatsappBaseUrl}?text=${encodeURIComponent(message)}`;
}

export function isConfiguredExternalUrl(url: string | null | undefined): url is string {
  if (!url) return false;
  const trimmed = url.trim();
  if (!trimmed || trimmed.includes("FACEBOOK_PAGE_URL_HERE")) return false;
  return /^https?:\/\/.+/i.test(trimmed);
}
