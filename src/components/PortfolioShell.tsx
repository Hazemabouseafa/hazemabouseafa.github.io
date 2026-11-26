"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { COPY, IDENTITY, getWhatsAppHref, isConfiguredExternalUrl } from "@/content";
import type { Locale } from "@/content";
import { HeaderNav } from "./HeaderNav";
import { StudioOpeningStage } from "./StudioOpeningStage";
import { WorkGallerySection } from "./WorkGallerySection";
import { ContactStorySection } from "./ContactStorySection";
import { DirectionalArrowIcon, FacebookIcon, WhatsAppIcon } from "./Icons";

export function PortfolioShell() {
  const [locale, setLocale] = useState<Locale>("ar");
  const [activeSection, setActiveSection] = useState<string>("hero");
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [isReducedMotion, setIsReducedMotion] = useState<boolean>(false);
  const [isDesktop, setIsDesktop] = useState<boolean>(true);

  const lenisRef = useRef<Lenis | null>(null);

  const copy = COPY[locale];
  const hasFacebook = isConfiguredExternalUrl(IDENTITY.facebookUrl);

  useEffect(() => {
    const html = document.documentElement;
    html.lang = locale;
    html.dir = locale === "ar" ? "rtl" : "ltr";
  }, [locale]);

  useEffect(() => {
    const mqMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const mqDesktop = window.matchMedia("(min-width: 960px)");

    const syncFlags = () => {
      setIsReducedMotion(mqMotion.matches);
      setIsDesktop(mqDesktop.matches);
    };

    syncFlags();
    mqMotion.addEventListener("change", syncFlags);
    mqDesktop.addEventListener("change", syncFlags);

    return () => {
      mqMotion.removeEventListener("change", syncFlags);
      mqDesktop.removeEventListener("change", syncFlags);
    };
  }, []);

  // Single Lenis instance synchronized strictly with GSAP ticker + ScrollTrigger
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    if (isReducedMotion) {
      lenisRef.current?.destroy();
      lenisRef.current = null;
      return;
    }

    const lenis = new Lenis({
      duration: 0.85,
      smoothWheel: true,
    });
    lenisRef.current = lenis;

    const onScroll = () => ScrollTrigger.update();
    lenis.on("scroll", onScroll);

    const tick = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);
    ScrollTrigger.refresh();

    return () => {
      gsap.ticker.remove(tick);
      lenis.off("scroll", onScroll);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, [isReducedMotion]);

  useEffect(() => {
    const ids = ["hero", "services", "work", "contact"];
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el));

    if (!elements.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        }
      },
      { rootMargin: "-30% 0px -50% 0px", threshold: 0.05 }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [isDesktop, isReducedMotion]);

  const scrollToTargetId = useCallback((id: string) => {
    const el = document.getElementById(id);
    if (!el) return;

    if (id === "services" && isDesktop && !isReducedMotion) {
      const runway = document.getElementById("hero");
      if (runway) {
        const rect = runway.getBoundingClientRect();
        const travel = runway.offsetHeight - window.innerHeight;
        const y = window.scrollY + rect.top + travel * 0.42;
        if (lenisRef.current) {
          lenisRef.current.scrollTo(y);
        } else {
          window.scrollTo({ top: y, behavior: "smooth" });
        }
        return;
      }
    }

    if (lenisRef.current) {
      lenisRef.current.scrollTo(el, { offset: id === "hero" ? 0 : -16 });
    } else {
      el.scrollIntoView({ behavior: isReducedMotion ? "auto" : "smooth" });
    }
  }, [isDesktop, isReducedMotion]);

  const scrollToY = useCallback((targetY: number) => {
    if (lenisRef.current) {
      lenisRef.current.scrollTo(targetY);
    } else {
      window.scrollTo({ top: targetY, behavior: "smooth" });
    }
  }, []);

  const toggleLocale = () => {
    setLocale((prev) => (prev === "ar" ? "en" : "ar"));
  };

  return (
    <div className="studio-shell" data-locale={locale}>
      <HeaderNav
        locale={locale}
        onToggleLocale={toggleLocale}
        copy={copy.nav}
        activeSection={activeSection}
        mobileMenuOpen={mobileMenuOpen}
        onMobileMenuChange={setMobileMenuOpen}
        onSkipTo={scrollToTargetId}
      />

      <main
        id="main-content"
        inert={mobileMenuOpen ? true : undefined}
        className="studio-main"
      >
        <StudioOpeningStage
          locale={locale}
          chapterA={copy.chapterA}
          chapterB={copy.chapterB}
          laptopTag={copy.chapterC.laptopTag}
          isReducedMotion={isReducedMotion}
          isDesktop={isDesktop}
          onJumpToWork={() => scrollToTargetId("work")}
          onScrollToFraction={scrollToY}
        />

        <WorkGallerySection locale={locale} copy={copy.chapterC} />

        <ContactStorySection
          locale={locale}
          copy={copy.chapterD}
          isReducedMotion={isReducedMotion}
          isDesktop={isDesktop}
        />
      </main>

      <footer
        inert={mobileMenuOpen ? true : undefined}
        className="studio-footer"
      >
        <div className="container studio-footer-row">
          <div className="studio-footer-meta">
            <span className="studio-footer-rights">{copy.footer.rights}</span>
            <span className="studio-footer-loc">{copy.footer.locationLine}</span>
          </div>

          <div className="studio-footer-links">
            <a
              href={getWhatsAppHref(locale)}
              target="_blank"
              rel="noopener noreferrer"
              className="studio-footer-chip"
            >
              <WhatsAppIcon className="btn-icon" />
              <span>WhatsApp</span>
            </a>

            {hasFacebook && (
              <a
                href={IDENTITY.facebookUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="studio-footer-chip"
              >
                <FacebookIcon className="btn-icon" />
                <span>Facebook</span>
              </a>
            )}

            <button
              type="button"
              onClick={() => scrollToTargetId("hero")}
              className="studio-footer-chip"
            >
              <span>{copy.footer.backToTop}</span>
              <DirectionalArrowIcon className="btn-icon rtl-flip" />
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
