export type Locale = "ar" | "en";

export interface LocalizedText {
  ar: string;
  en: string;
}

export type ProjectCategoryId =
  | "company-websites"
  | "ecommerce"
  | "platforms"
  | "business-software"
  | "mobile-apps";

export interface ProjectItem {
  id: string;
  index: string;
  name: LocalizedText;
  category: ProjectCategoryId;
  categoryLabel: LocalizedText;
  summary: LocalizedText;
  liveUrl: string | null;
  domainLabel: string | null;
  screenshotSrc: string | null;
  screenshotAlt: LocalizedText | null;
  featured: boolean;
  coverTone: "charcoal" | "stone" | "vermilion" | "slate";
  mediumTag: LocalizedText;
}

export interface ServiceItem {
  id: string;
  index: string;
  icon: "web" | "mobile" | "platform" | "backend";
  title: LocalizedText;
  audienceLead: LocalizedText;
  description: LocalizedText;
  deliverables: {
    ar: string[];
    en: string[];
  };
}

export interface ProcessStep {
  id: string;
  stepNumber: string;
  label: LocalizedText;
  summary: LocalizedText;
  outputNote: LocalizedText;
}

export interface IdentityConfig {
  brand: string;
  arabicName: string;
  englishName: string;
  title: LocalizedText;
  location: LocalizedText;
  domain: string;
  siteUrl: string;
  motto: LocalizedText;
  whatsappNumberDisplay: string;
  whatsappNumberRaw: string;
  whatsappBaseUrl: string;
  whatsappPrefill: LocalizedText;
  facebookUrl: string;
}
