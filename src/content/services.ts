import type { ProcessStep, ServiceItem } from "./types";

export const SERVICES: ServiceItem[] = [
  {
    id: "web-development",
    index: "01",
    icon: "web",
    title: {
      ar: "تطوير المتاجر الإلكترونية ومواقع الشركات",
      en: "E-Commerce Stores & Company Websites",
    },
    audienceLead: {
      ar: "متاجر بيع متكاملة وواجهات رقمية تمثّل علامتك التجارية وتُسهّل على عملائك الشراء والتواصل.",
      en: "Online stores and digital brand sites built for clarity, speed, and customer conversion.",
    },
    description: {
      ar: "أبني متاجر إلكترونية متكاملة ومواقع شركات سريعة ومهيأة لمحركات البحث، بتجربة مستخدم واضحة بالعربية والإنجليزية وتوافق كامل مع الهواتف.",
      en: "I build full-featured online stores and fast, search-ready company websites with clear Arabic/English journeys and dependable mobile checkout.",
    },
    deliverables: {
      ar: ["متاجر إلكترونية متكاملة", "مواقع تعريفية للشركات", "تعدد اللغات RTL / LTR"],
      en: ["Online stores", "Corporate websites", "Bilingual RTL / LTR"],
    },
  },
  {
    id: "mobile-applications",
    index: "02",
    icon: "mobile",
    title: {
      ar: "تطبيقات الهواتف (Android & iOS)",
      en: "Mobile Applications (Android & iOS)",
    },
    audienceLead: {
      ar: "تطبيقات عملية في متناول عملائك بأداء سلس وواجهة مريحة.",
      en: "Practical mobile products in your customers' hands with responsive, intuitive flows.",
    },
    description: {
      ar: "أصمم وأبرمج تطبيقات أندرويد وآيفون لخدمة مجالات النقل، الخدمات، والتواصل، مع اهتمام خاص بوضوح الخطوات واستقرار التشغيل.",
      en: "I design and engineer Android and iOS applications for transport, consumer services, and marketplaces with clear user flows and reliable performance.",
    },
    deliverables: {
      ar: ["تطبيقات أندرويد وآيفون", "ربط مباشر بالأنظمة", "تجربة استخدام يومية واضحة"],
      en: ["Android & iOS apps", "API integration", "Everyday usability"],
    },
  },
  {
    id: "platforms-business",
    index: "03",
    icon: "platform",
    title: {
      ar: "المنصات وأنظمة إدارة الأعمال",
      en: "Platforms & Business Systems",
    },
    audienceLead: {
      ar: "أنظمة مصممة على مقاس طريقة عمل شركتك، لا العكس.",
      en: "Software tailored around how your business actually operates—not rigid off-the-shelf templates.",
    },
    description: {
      ar: "أطوّر منصات تعليمية، أسواق إلكترونية، وأنظمة لإدارة المخزون والمبيعات والمندوبين تمنحك رؤية دقيقة وتنظّم العمل اليومي.",
      en: "I develop educational platforms, digital marketplaces, and inventory & sales-representative systems that organize daily operations and give owners clear control.",
    },
    deliverables: {
      ar: ["منصات تعليمية وتدريبية", "أنظمة مخزون ومندوبين", "بوابات إعلانات وأسواق رقمية"],
      en: ["Educational platforms", "Inventory & field sales", "Digital marketplaces"],
    },
  },
  {
    id: "backend-dashboards",
    index: "04",
    icon: "backend",
    title: {
      ar: "الواجهات الخلفية ولوحات التحكم (APIs)",
      en: "APIs, Backends & Admin Dashboards",
    },
    audienceLead: {
      ar: "البنية التحتية الصامتة التي تجعل كل شاشة تعمل بدقة وأمان.",
      en: "The structured backbone that keeps every storefront, app, and team tool accurate and secure.",
    },
    description: {
      ar: "أصمم واجهات برمجة التطبيقات (APIs) وقواعد البيانات ولوحات التحكم الإدارية التي تربط الموقع والتطبيق وإدارة الفريق في منظومة واحدة.",
      en: "I architect APIs, databases, and admin dashboards that connect your website, mobile app, and internal team inside one unified system.",
    },
    deliverables: {
      ar: ["تطوير APIs آمنة", "لوحات تحكم وتقارير", "إدارة الصلاحيات والبيانات"],
      en: ["Structured APIs", "Admin control panels", "Role & data management"],
    },
  },
];

export const PROCESS_STEPS: ProcessStep[] = [
  {
    id: "understand",
    stepNumber: "01",
    label: {
      ar: "الفهم",
      en: "Understand",
    },
    summary: {
      ar: "أبدأ بفهم نشاطك التجاري، احتياجات عملائك، والمشكلة الحقيقية التي نحتاج إلى حلها قبل كتابة سطر كود واحد.",
      en: "I start by mapping your business goals, user workflows, and the exact problem worth solving before writing a single line of code.",
    },
    outputNote: {
      ar: "وثيقة نطاق المشروع ومتطلباته",
      en: "Clear scope & functional map",
    },
  },
  {
    id: "design",
    stepNumber: "02",
    label: {
      ar: "التصميم",
      en: "Design",
    },
    summary: {
      ar: "أصيغ هيكل التجربة والهوية البصرية بحيث تكون كل شاشة واضحة ومقنعة، وتخدم الهدف التجاري دون تعقيد.",
      en: "I shape the interface architecture and visual system so every screen feels intentional, legible, and aligned with your brand.",
    },
    outputNote: {
      ar: "تخطيط الشاشات وهوية الواجهة",
      en: "Interface hierarchy & visual system",
    },
  },
  {
    id: "build",
    stepNumber: "03",
    label: {
      ar: "البناء",
      en: "Build",
    },
    summary: {
      ar: "أطوّر الواجهات الأمامية والأنظمة الخلفية كأجزاء مترابطة قابلة للصيانة والتوسع، مع عناية بالتفاصيل والأداء.",
      en: "I engineer frontend surfaces, backends, and mobile components as modular, maintainable parts built to work together cleanly.",
    },
    outputNote: {
      ar: "تطوير متكامل وقابل للتوسع",
      en: "Modular frontend & backend build",
    },
  },
  {
    id: "test",
    stepNumber: "04",
    label: {
      ar: "الاختبار",
      en: "Test",
    },
    summary: {
      ar: "أراجع كل مسار استخدام على أحجام الشاشات المختلفة، وأتحقق من سرعة التحميل، وضوح النصوص، وسلامة التدفقات.",
      en: "I verify every user path across desktop and mobile viewports, checking responsiveness, speed, bilingual layout, and edge cases.",
    },
    outputNote: {
      ar: "فحص الجودة والتوافق والأداء",
      en: "Cross-device & flow verification",
    },
  },
  {
    id: "launch",
    stepNumber: "05",
    label: {
      ar: "الإطلاق",
      en: "Launch",
    },
    summary: {
      ar: "أسلّم المنتج جاهزاً للتشغيل الفعلي، مع تنظيم واضح يسهّل عليك إدارة المحتوى أو التطوير المستقبلي بثقة.",
      en: "I ship the finished product ready for real customers, organized cleanly so you can operate and grow it with confidence.",
    },
    outputNote: {
      ar: "نشر مستقر وتسليم واضح",
      en: "Production deployment & handoff",
    },
  },
];
