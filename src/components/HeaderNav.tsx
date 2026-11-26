"use client";

import { useEffect } from "react";
import { IDENTITY, getWhatsAppHref } from "@/content";
import type { Locale, SiteCopy } from "@/content";
import { CloseIcon, MenuIcon, WhatsAppIcon } from "./Icons";

interface HeaderNavProps {
  locale: Locale;
  onToggleLocale: () => void;
  copy: SiteCopy["nav"];
  activeSection: string;
  mobileMenuOpen: boolean;
  onMobileMenuChange: (open: boolean) => void;
  onSkipTo?: (id: string) => void;
}

export function HeaderNav({
  locale,
  onToggleLocale,
  copy,
  activeSection,
  mobileMenuOpen,
  onMobileMenuChange,
  onSkipTo,
}: HeaderNavProps) {
  const navLinks = [
    { id: "services", label: copy.services },
    { id: "work", label: copy.work },
    { id: "contact", label: copy.contact },
  ];

  const whatsappHref = getWhatsAppHref(locale);

  useEffect(() => {
    if (!mobileMenuOpen) return;

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onMobileMenuChange(false);
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [mobileMenuOpen, onMobileMenuChange]);

  const handleLinkClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    targetId: string
  ) => {
    onMobileMenuChange(false);
    if (onSkipTo) {
      e.preventDefault();
      onSkipTo(targetId);
    }
  };

  return (
    <>
      <header className="studio-header">
        <a href="#main-content" className="skip-to-content">
          {copy.skipToContent}
        </a>

        <nav
          className="container studio-nav-bar"
          aria-label={locale === "ar" ? "التنقل الرئيسي" : "Primary navigation"}
        >
          <a
            href="#hero"
            className="studio-brand-link"
            onClick={(e) => handleLinkClick(e, "hero")}
          >
            <span className="studio-plum-dot" aria-hidden="true" />
            <span className="studio-brand-en">{IDENTITY.brand}</span>
            <span className="studio-brand-sep" aria-hidden="true">·</span>
            <span className="studio-brand-ar">{IDENTITY.arabicName}</span>
          </a>

          <ul className="studio-nav-links">
            {navLinks.map((link) => {
              const isCurrent = activeSection === link.id;
              return (
                <li key={link.id}>
                  <a
                    href={`#${link.id}`}
                    aria-current={isCurrent ? "location" : undefined}
                    className={`studio-nav-item ${isCurrent ? "is-active" : ""}`}
                    onClick={(e) => handleLinkClick(e, link.id)}
                  >
                    {link.label}
                  </a>
                </li>
              );
            })}
          </ul>

          <div className="studio-nav-actions">
            <button
              type="button"
              onClick={onToggleLocale}
              className="btn-studio-lang"
              aria-label={
                locale === "ar"
                  ? "Switch language to English"
                  : "التبديل إلى العربية"
              }
            >
              {copy.langSwitchLabel}
            </button>

            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-studio-talk"
              aria-label={copy.talkCta}
            >
              <WhatsAppIcon className="nav-wa-icon" />
              <span className="nav-wa-text">{copy.talkCta}</span>
            </a>

            <button
              type="button"
              className="btn-studio-menu"
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-nav-drawer"
              aria-label={mobileMenuOpen ? copy.closeMenuLabel : copy.menuLabel}
              onClick={() => onMobileMenuChange(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <CloseIcon className="btn-icon" />
              ) : (
                <MenuIcon className="btn-icon" />
              )}
            </button>
          </div>
        </nav>
      </header>

      {mobileMenuOpen && (
        <div
          id="mobile-nav-drawer"
          className="studio-mobile-drawer"
          role="dialog"
          aria-modal="true"
          aria-label={copy.menuLabel}
        >
          <div className="container studio-drawer-inner">
            <ul className="studio-drawer-links">
              {navLinks.map((link) => (
                <li key={link.id}>
                  <a
                    href={`#${link.id}`}
                    className={`studio-drawer-link ${
                      activeSection === link.id ? "is-active" : ""
                    }`}
                    onClick={(e) => handleLinkClick(e, link.id)}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>

            <div className="studio-drawer-footer">
              <button
                type="button"
                onClick={() => {
                  onToggleLocale();
                  onMobileMenuChange(false);
                }}
                className="btn-drawer-lang"
              >
                {locale === "ar"
                  ? "Switch to English"
                  : "التبديل إلى اللغة العربية"}
              </button>

              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-plum-primary studio-drawer-cta"
                onClick={() => onMobileMenuChange(false)}
              >
                <WhatsAppIcon className="btn-icon" />
                <span>{copy.talkCta}</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
