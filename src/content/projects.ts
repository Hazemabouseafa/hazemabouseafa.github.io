import type { ProjectCategoryId, ProjectItem, LocalizedText } from "./types";

export interface CategoryFilter {
  id: ProjectCategoryId;
  label: LocalizedText;
}

export const PROJECT_CATEGORIES: CategoryFilter[] = [
  {
    id: "ecommerce",
    label: { ar: "متاجر إلكترونية", en: "E-Commerce" },
  },
  {
    id: "company-websites",
    label: { ar: "مواقع شركات", en: "Company Websites" },
  },
  {
    id: "platforms",
    label: { ar: "منصات رقمية", en: "Platforms" },
  },
  {
    id: "business-software",
    label: { ar: "أنظمة أعمال", en: "Business Software" },
  },
  {
    id: "mobile-apps",
    label: { ar: "تطبيقات موبايل", en: "Mobile Apps" },
  },
];

export const PROJECTS: ProjectItem[] = [
  {
    id: "sulafcosmetics",
    index: "01",
    name: {
      ar: "سُلاف · Sulaf Cosmetics",
      en: "Sulaf Cosmetics",
    },
    category: "ecommerce",
    categoryLabel: { ar: "متاجر إلكترونية", en: "E-Commerce" },
    summary: {
      ar: "متجر إلكتروني وهوية رقمية لعلامة سُلاف لمنتجات العناية بالبشرة، يجمع بين العرض العلمي للمنتجات وتجربة التسوق المباشرة.",
      en: "E-commerce storefront and brand presentation for Sulaf Cosmetics, combining formulation-led storytelling with direct online ordering.",
    },
    liveUrl: "https://sulafcosmetics.com",
    domainLabel: "sulafcosmetics.com",
    screenshotSrc: "/projects/sulafcosmetics.webp",
    screenshotAlt: {
      ar: "لقطة شاشة حية من متجر سُلاف sulafcosmetics.com",
      en: "Live screenshot of Sulaf Cosmetics store at sulafcosmetics.com",
    },
    featured: true,
    coverTone: "stone",
    mediumTag: { ar: "متجر عناية بالبشرة", en: "Cosmeceutical Store" },
  },
  {
    id: "21clothingwear",
    index: "02",
    name: {
      ar: "21 Clothing Wear",
      en: "21 Clothing Wear",
    },
    category: "ecommerce",
    categoryLabel: { ar: "متاجر إلكترونية", en: "E-Commerce" },
    summary: {
      ar: "متجر إلكتروني لملابس الشارع القاهرية (Cairo Streetwear)، يعرض المجموعات والمنتجات بتجربة شراء مباشرة.",
      en: "Online storefront for 21 Clothing Wear, a Cairo streetwear label designed for fast catalog browsing and checkout.",
    },
    liveUrl: "https://21clothingwear.com",
    domainLabel: "21clothingwear.com",
    screenshotSrc: "/projects/21clothingwear.webp",
    screenshotAlt: {
      ar: "لقطة شاشة حية من متجر 21 Clothing Wear",
      en: "Live screenshot of 21 Clothing Wear storefront at 21clothingwear.com",
    },
    featured: true,
    coverTone: "slate",
    mediumTag: { ar: "متجر أزياء أونلاين", en: "Streetwear Storefront" },
  },
  {
    id: "sokhmwear",
    index: "03",
    name: {
      ar: "Sokhmwear",
      en: "Sokhmwear",
    },
    category: "ecommerce",
    categoryLabel: { ar: "متاجر إلكترونية", en: "E-Commerce" },
    summary: {
      ar: "متجر إلكتروني لعلامة SOKHM للأزياء، مصمم لإبراز الهوية البصرية للمنتجات وتسهيل الطلب الإلكتروني.",
      en: "E-commerce storefront for SOKHM apparel brand, highlighting product collections and straightforward online ordering.",
    },
    liveUrl: "https://sokhmwear.com",
    domainLabel: "sokhmwear.com",
    screenshotSrc: "/projects/sokhmwear.webp",
    screenshotAlt: {
      ar: "لقطة شاشة حية من متجر Sokhmwear",
      en: "Live screenshot of Sokhmwear storefront at sokhmwear.com",
    },
    featured: true,
    coverTone: "vermilion",
    mediumTag: { ar: "متجر ملابس رقمي", en: "Apparel E-Commerce" },
  },
  {
    id: "madartrans",
    index: "04",
    name: {
      ar: "مدار للنقل البري · Madartrans",
      en: "Madartrans · Land Transport & Logistics",
    },
    category: "company-websites",
    categoryLabel: { ar: "مواقع شركات", en: "Company Websites" },
    summary: {
      ar: "موقع شركة مدار للنقل البري والخدمات اللوجستية، يقدّم خدمات نقل الحاويات المبردة والجافة من وإلى الموانئ البحرية المصرية مع طلب تسعير وشحن مباشر.",
      en: "Corporate website for Madar Land Transport & Logistics, presenting refrigerated and dry container transport services to and from seaports with direct quote requests.",
    },
    liveUrl: "https://madartrans.com",
    domainLabel: "madartrans.com",
    screenshotSrc: "/projects/madartrans.webp",
    screenshotAlt: {
      ar: "لقطة شاشة حية من موقع شركة مدار للنقل البري madartrans.com",
      en: "Live screenshot of Madartrans corporate website at madartrans.com",
    },
    featured: true,
    coverTone: "slate",
    mediumTag: { ar: "موقع شركة لوجستية", en: "Logistics Web Presence" },
  },
  {
    id: "protherme",
    index: "05",
    name: {
      ar: "بروتيرم للحلول الهندسية · Protherme",
      en: "Protherme Engineering Solutions",
    },
    category: "company-websites",
    categoryLabel: { ar: "مواقع شركات", en: "Company Websites" },
    summary: {
      ar: "الموقع الرسمي لشركة بروتيرم للحلول الهندسية، الممثل المعتمد لأفلام العزل الحراري وحماية الأسطح وأفلام حماية السيارات.",
      en: "Official corporate presence for Protherme Engineering Solutions, authorized representative for thermal insulation, architectural surface films, and automotive PPF.",
    },
    liveUrl: "https://protherme.com",
    domainLabel: "protherme.com",
    screenshotSrc: "/projects/protherme.webp",
    screenshotAlt: {
      ar: "لقطة شاشة حية من موقع بروتيرم للحلول الهندسية protherme.com",
      en: "Live screenshot of Protherme Engineering Solutions website at protherme.com",
    },
    featured: true,
    coverTone: "vermilion",
    mediumTag: { ar: "موقع شركة هندسية", en: "Engineering Showcase" },
  },
  {
    id: "abeergadacademy",
    index: "06",
    name: {
      ar: "أكاديمية عبير جاد · Abeer Gad Academy",
      en: "Abeer Gad Academy",
    },
    category: "platforms",
    categoryLabel: { ar: "منصات تعليمية", en: "Platforms" },
    summary: {
      ar: "منصة تعليمية لبرامج اللغة العربية وقراءة وحفظ القرآن الكريم، منظمة لتيسير استكشاف الدورات والتسجيل للدارسين.",
      en: "Educational platform for Arabic language, Quran reading, and memorization programs, structured for course discovery and student enrollment.",
    },
    liveUrl: "https://abeergadacademy.com",
    domainLabel: "abeergadacademy.com",
    screenshotSrc: "/projects/abeergadacademy.webp",
    screenshotAlt: {
      ar: "لقطة شاشة حية من منصة أكاديمية عبير جاد abeergadacademy.com",
      en: "Live screenshot of Abeer Gad Academy platform at abeergadacademy.com",
    },
    featured: true,
    coverTone: "charcoal",
    mediumTag: { ar: "منصة تعليمية تفاعلية", en: "Learning Platform" },
  },
  {
    id: "elwaseet",
    index: "07",
    name: {
      ar: "الوسيط · Elwaseet",
      en: "Elwaseet",
    },
    category: "business-software",
    categoryLabel: { ar: "أنظمة إدارة الأعمال", en: "Business Software" },
    summary: {
      ar: "نظام إدارة أعمال متخصص في متابعة المخزون وحركة المبيعات وتنظيم عمل المندوبين الميدانيين.",
      en: "Business management software built for inventory tracking, sales operations, and field sales representative management.",
    },
    liveUrl: null,
    domainLabel: null,
    screenshotSrc: null,
    screenshotAlt: null,
    featured: false,
    coverTone: "charcoal",
    mediumTag: { ar: "نظام مخزون ومندوبين", en: "Inventory & Field Ops" },
  },
  {
    id: "naseebak",
    index: "08",
    name: {
      ar: "نَصِيبُكَ · Naseebak",
      en: "Naseebak (نَصِيبُكَ)",
    },
    category: "mobile-apps",
    categoryLabel: { ar: "تطبيقات موبايل", en: "Mobile Apps" },
    summary: {
      ar: "تطبيق أندرويد للتوفيق والزواج، مصمم بواجهة عربية واضحة ومسار استخدام يحترم الخصوصية.",
      en: "Android marriage matching application engineered with a clear Arabic-first flow and respectful user experience.",
    },
    liveUrl: null,
    domainLabel: null,
    screenshotSrc: null,
    screenshotAlt: null,
    featured: false,
    coverTone: "vermilion",
    mediumTag: { ar: "تطبيق أندرويد اجتماعي", en: "Android Application" },
  },
  {
    id: "khashala",
    index: "09",
    name: {
      ar: "خُشـاله · Khashala",
      en: "Khashala (خشاله)",
    },
    category: "platforms",
    categoryLabel: { ar: "منصات رقمية", en: "Platforms" },
    summary: {
      ar: "منصة عربية للإعلانات المبوبة لبيع وشراء السيارات والعقارات والأجهزة والخدمات بتواصل مباشر بدون وسيط.",
      en: "Arabic classifieds marketplace platform connecting buyers and sellers directly across vehicles, real estate, electronics, and services.",
    },
    liveUrl: "https://khashala.site",
    domainLabel: "khashala.site",
    screenshotSrc: null,
    screenshotAlt: null,
    featured: false,
    coverTone: "stone",
    mediumTag: { ar: "سوق إعلانات مبوبة", en: "Classifieds Marketplace" },
  },
  {
    id: "aswan-transport",
    index: "10",
    name: {
      ar: "نقل أسوان · Aswan Transport",
      en: "Aswan Transport",
    },
    category: "mobile-apps",
    categoryLabel: { ar: "تطبيقات موبايل", en: "Mobile Apps" },
    summary: {
      ar: "تطبيق أندرويد للنقل المحلي في أسوان، يسهّل الوصول إلى خدمات التنقل اليومية.",
      en: "Android local transportation application built for everyday mobility in Aswan.",
    },
    liveUrl: null,
    domainLabel: null,
    screenshotSrc: null,
    screenshotAlt: null,
    featured: false,
    coverTone: "charcoal",
    mediumTag: { ar: "تطبيق نقل محلي", en: "Mobility Android App" },
  },
];
