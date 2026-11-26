import type { Locale } from "./types";

export interface SiteCopy {
  nav: {
    services: string;
    work: string;
    contact: string;
    talkCta: string;
    menuLabel: string;
    closeMenuLabel: string;
    skipToContent: string;
    langSwitchLabel: string;
  };
  chapterA: {
    nameHeadline: string;
    valueHeadline: string;
    roleTitle: string;
    workCta: string;
    contactCta: string;
    scrollCue: string;
  };
  chapterB: {
    sectionTitle: string;
    sectionSub: string;
    serviceLabelPrefix: string;
  };
  chapterC: {
    heading: string;
    intro: string;
    laptopTag: string;
    filterAll: string;
    showAllButton: string;
    showFeaturedButton: string;
    visitSite: string;
    privateSystemNote: string;
    noLiveLinkLabel: string;
    countLabel: (shown: number, total: number) => string;
  };
  chapterD: {
    heading: string;
    whatsappCta: string;
    copyPhoneCta: string;
    copiedFeedback: string;
    callCta: string;
    facebookCta: string;
    facebookMissingNote: string;
    directNumberLabel: string;
  };
  footer: {
    rights: string;
    locationLine: string;
    backToTop: string;
  };
}

export const COPY: Record<Locale, SiteCopy> = {
  ar: {
    nav: {
      services: "الخدمات",
      work: "الأعمال",
      contact: "تواصل",
      talkCta: "احكيلي فكرتك",
      menuLabel: "القائمة",
      closeMenuLabel: "إغلاق القائمة",
      skipToContent: "تخطي إلى المحتوى",
      langSwitchLabel: "EN",
    },
    chapterA: {
      nameHeadline: "أنا حازم",
      valueHeadline: "أحوّل فكرتك لمنتج الناس تستخدمه",
      roleTitle: "Software Engineer",
      workCta: "شوف أعمالي",
      contactCta: "احكيلي فكرتك",
      scrollCue: "تصفّح القصة بالأسفل",
    },
    chapterB: {
      sectionTitle: "ما الذي أبنيه",
      sectionSub: "أنقل مشروعك من الفكرة إلى نظام واضح يعمل بثبات.",
      serviceLabelPrefix: "الخدمة",
    },
    chapterC: {
      heading: "أعمال حقيقية على الشاشة",
      intro:
        "مشاريع حقيقية ما بين مواقع شركات، متاجر إلكترونية، منصات، أنظمة أعمال خاصة، وتطبيقات أندرويد — بلقطات فعلية أو ببطاقات تعريفية أمينة للأنظمة الخاصة.",
      laptopTag: "معاينة من أعمالي الحية",
      filterAll: "الكل",
      showAllButton: "عرض كل المشاريع العشرة",
      showFeaturedButton: "الاكتفاء بالمختارات",
      visitSite: "زيارة الموقع",
      privateSystemNote: "نظام خاص أو تطبيق أندرويد بدون رابط عام",
      noLiveLinkLabel: "ملف تعريفي للنظام",
      countLabel: (shown, total) => `${shown} من ${total}`,
    },
    chapterD: {
      heading: "المشروع الجاي ممكن يكون مشروعك",
      whatsappCta: "احكيلي فكرتك",
      copyPhoneCta: "نسخ الرقم",
      copiedFeedback: "تم النسخ:",
      callCta: "اتصال مباشر",
      facebookCta: "صفحة فيسبوك",
      facebookMissingNote: "رابط فيسبوك غير مُعدّ بعد",
      directNumberLabel: "واتساب وهاتف",
    },
    footer: {
      rights: "ENG HAZEM · حازم أبوسعيفة",
      locationLine: "Software Engineer · hazem.my",
      backToTop: "الأعلى",
    },
  },
  en: {
    nav: {
      services: "Services",
      work: "Work",
      contact: "Contact",
      talkCta: "Tell me your idea",
      menuLabel: "Menu",
      closeMenuLabel: "Close menu",
      skipToContent: "Skip to content",
      langSwitchLabel: "عربي",
    },
    chapterA: {
      nameHeadline: "I’m Hazem",
      valueHeadline: "I turn your idea into a product people actually use",
      roleTitle: "Software Engineer",
      workCta: "See my work",
      contactCta: "Tell me your idea",
      scrollCue: "Scroll to follow the story",
    },
    chapterB: {
      sectionTitle: "What I Build",
      sectionSub: "From early scope to reliable daily operation.",
      serviceLabelPrefix: "Service",
    },
    chapterC: {
      heading: "Selected Work on Screen",
      intro:
        "Production websites, online storefronts, learning and classified platforms, private business software, and Android apps—shown with real captures or clean typographic briefs where deployments are private.",
      laptopTag: "Live work showcase",
      filterAll: "All",
      showAllButton: "Show all 10 projects",
      showFeaturedButton: "Featured only",
      visitSite: "Visit site",
      privateSystemNote: "Private business software or Android build",
      noLiveLinkLabel: "Typographic system cover",
      countLabel: (shown, total) => `${shown} of ${total}`,
    },
    chapterD: {
      heading: "The next project could be yours",
      whatsappCta: "Tell me your idea",
      copyPhoneCta: "Copy Number",
      copiedFeedback: "Copied:",
      callCta: "Direct Call",
      facebookCta: "Facebook Page",
      facebookMissingNote: "Facebook URL not configured",
      directNumberLabel: "WhatsApp & Phone",
    },
    footer: {
      rights: "ENG HAZEM · Hazem Abouseafa",
      locationLine: "Software Engineer · hazem.my",
      backToTop: "Top",
    },
  },
};
