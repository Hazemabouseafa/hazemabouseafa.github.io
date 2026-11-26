import type { Locale, ProjectItem } from "@/content";

interface ProjectVisualProps {
  project: ProjectItem;
  locale: Locale;
}

export function ProjectVisual({ project, locale }: ProjectVisualProps) {
  if (project.screenshotSrc) {
    return (
      <div className="work-media-frame work-media-live">
        <img
          src={project.screenshotSrc}
          alt={project.screenshotAlt?.[locale] ?? project.name[locale]}
          width={1280}
          height={800}
          loading={project.featured ? "eager" : "lazy"}
          decoding="async"
          className="work-capture-img"
        />
        <span className="work-medium-chip">{project.mediumTag[locale]}</span>
      </div>
    );
  }

  return (
    <div className="work-media-frame work-typographic-cover">
      <div className="typo-cover-top">
        <span className="mono-token typo-cover-index">{project.index}</span>
        <span className="typo-cover-medium">{project.mediumTag[locale]}</span>
      </div>

      <div className="typo-cover-center">
        {project.domainLabel ? (
          <>
            <p dir="ltr" className="mono-token typo-cover-specimen">
              {project.domainLabel}
            </p>
            <p className="typo-cover-note">
              {locale === "ar"
                ? "بوابة إلكترونية مباشرة بدون لقطة محفوظة"
                : "Live platform without stored screenshot preview"}
            </p>
          </>
        ) : (
          <>
            <p className="typo-cover-specimen-ar">
              {locale === "ar"
                ? "بناء برمجي مخصص"
                : "Dedicated Software Release"}
            </p>
            <p className="typo-cover-note">
              {locale === "ar"
                ? "بيئة تشغيل خاصة بدون رابط عرض عام"
                : "Private operational deployment without public URL"}
            </p>
          </>
        )}
      </div>

      <div className="typo-cover-bottom">
        <span className="typo-cover-cat">
          {locale === "ar" ? "غلاف تعريفي طباعي" : "Typographic plate"}
        </span>
        <span className="typo-cover-plum-dot" aria-hidden="true" />
      </div>
    </div>
  );
}
