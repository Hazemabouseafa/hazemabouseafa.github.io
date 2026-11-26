"use client";

import { useState } from "react";
import { PROJECT_CATEGORIES, PROJECTS } from "@/content";
import type { Locale, ProjectCategoryId, SiteCopy } from "@/content";
import { DirectionalArrowIcon, ExternalArrowIcon } from "./Icons";
import { ProjectVisual } from "./ProjectVisual";

interface WorkGallerySectionProps {
  locale: Locale;
  copy: SiteCopy["chapterC"];
}

export function WorkGallerySection({ locale, copy }: WorkGallerySectionProps) {
  const [activeCategory, setActiveCategory] = useState<"all" | ProjectCategoryId>(
    "all"
  );
  const [showAll, setShowAll] = useState(false);

  const filteredProjects =
    activeCategory === "all"
      ? showAll
        ? PROJECTS
        : PROJECTS.filter((project) => project.featured)
      : PROJECTS.filter((project) => project.category === activeCategory);

  return (
    <section
      id="work"
      className="work-chapter-section"
      aria-labelledby="work-heading"
    >
      <div className="container">
        <div className="work-top-row">
          <div className="work-title-col">
            <h2 id="work-heading" className="studio-h2">
              {copy.heading}
            </h2>
            <p className="studio-sub">{copy.intro}</p>
          </div>

          <div className="work-count-badge">
            <span className="mono-token">
              {copy.countLabel(filteredProjects.length, PROJECTS.length)}
            </span>
          </div>
        </div>

        <div className="work-filters" role="tablist" aria-label={copy.heading}>
          <button
            type="button"
            role="tab"
            aria-selected={activeCategory === "all"}
            className={`work-filter-btn ${
              activeCategory === "all" ? "is-active" : ""
            }`}
            onClick={() => setActiveCategory("all")}
          >
            {copy.filterAll}
          </button>

          {PROJECT_CATEGORIES.map((category) => (
            <button
              key={category.id}
              type="button"
              role="tab"
              aria-selected={activeCategory === category.id}
              className={`work-filter-btn ${
                activeCategory === category.id ? "is-active" : ""
              }`}
              onClick={() => setActiveCategory(category.id)}
            >
              {category.label[locale]}
            </button>
          ))}
        </div>

        <div className="work-gallery-grid">
          {filteredProjects.map((project, index) => {
            const isLead =
              index === 0 &&
              filteredProjects.length > 2 &&
              filteredProjects.length % 2 === 1;
            return (
              <article
                key={project.id}
                id={`project-${project.id}`}
                className={`work-gallery-item ${isLead ? "is-lead" : ""}`}
              >
                <ProjectVisual project={project} locale={locale} />

                <div className="work-item-body">
                  <div className="work-item-meta">
                    <span className="mono-token work-item-idx">
                      {project.index}
                    </span>
                    <span className="work-item-cat">
                      {project.categoryLabel[locale]}
                    </span>
                  </div>

                  <h3 className="work-item-title">{project.name[locale]}</h3>
                  <p className="work-item-summary">{project.summary[locale]}</p>

                  <div className="work-item-footer">
                    {project.liveUrl ? (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="work-live-anchor"
                      >
                        <span>{copy.visitSite}</span>
                        <span className="mono-token work-domain-text">
                          {project.domainLabel}
                        </span>
                        <ExternalArrowIcon className="btn-icon" />
                      </a>
                    ) : (
                      <span
                        className="work-private-label"
                        title={copy.privateSystemNote}
                      >
                        <span className="work-private-dot" aria-hidden="true" />
                        <span>{copy.noLiveLinkLabel}</span>
                      </span>
                    )}
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {activeCategory === "all" && (
          <div className="work-expand-wrap">
            <button
              type="button"
              className="btn-studio-outline"
              onClick={() => setShowAll((prev) => !prev)}
            >
              <span>{showAll ? copy.showFeaturedButton : copy.showAllButton}</span>
              <DirectionalArrowIcon className="btn-icon rtl-flip" />
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
