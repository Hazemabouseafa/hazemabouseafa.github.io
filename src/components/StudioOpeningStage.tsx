"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SERVICES, getWhatsAppHref } from "@/content";
import type { Locale, SiteCopy } from "@/content";
import {
  LAPTOP_SCREEN_NORM,
  computeCssMatrix3d,
  type Point2D,
} from "@/lib/homography";
import { CapabilityIcon, DirectionalArrowIcon, WhatsAppIcon } from "./Icons";
import { ScrollSequenceCanvas } from "./ScrollSequenceCanvas";

interface StudioOpeningStageProps {
  locale: Locale;
  chapterA: SiteCopy["chapterA"];
  chapterB: SiteCopy["chapterB"];
  laptopTag: string;
  isReducedMotion: boolean;
  isDesktop: boolean;
  onJumpToWork: () => void;
  onScrollToFraction?: (targetScrollY: number) => void;
}

const SCREEN_W = 360;
const SCREEN_H = 225;

export function StudioOpeningStage({
  locale,
  chapterA,
  chapterB,
  laptopTag,
  isReducedMotion,
  isDesktop,
  onJumpToWork,
  onScrollToFraction,
}: StudioOpeningStageProps) {
  const runwayRef = useRef<HTMLDivElement>(null);
  const frameBoxRef = useRef<HTMLDivElement>(null);

  const [progress, setProgress] = useState(0);
  const [manualServiceIdx, setManualServiceIdx] = useState<number | null>(null);
  const [frameSize, setFrameSize] = useState<{ w: number; h: number }>({
    w: 1440,
    h: 810,
  });

  const interactiveDesktop = isDesktop && !isReducedMotion;

  useEffect(() => {
    if (!interactiveDesktop) return;

    const updateCoverFrame = () => {
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      const ratio = 16 / 9;
      let w = vw;
      let h = vw / ratio;
      if (h < vh) {
        h = vh;
        w = vh * ratio;
      }
      setFrameSize({ w: Math.round(w), h: Math.round(h) });
    };

    updateCoverFrame();
    window.addEventListener("resize", updateCoverFrame);
    return () => window.removeEventListener("resize", updateCoverFrame);
  }, [interactiveDesktop]);

  useEffect(() => {
    if (!interactiveDesktop) return;
    gsap.registerPlugin(ScrollTrigger);
    const runway = runwayRef.current;
    if (!runway) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: runway,
        start: "top top",
        end: "bottom bottom",
        scrub: true,
        onUpdate: (self) => {
          setProgress(self.progress);
          if (self.progress > 0.3 && self.progress < 0.82) {
            setManualServiceIdx(null);
          }
        },
      });
    }, runway);

    return () => ctx.revert();
  }, [interactiveDesktop]);

  const laptopMatrix = useMemo(() => {
    const { w, h } = frameSize;
    const dst: [Point2D, Point2D, Point2D, Point2D] = [
      { x: LAPTOP_SCREEN_NORM[0].x * w, y: LAPTOP_SCREEN_NORM[0].y * h },
      { x: LAPTOP_SCREEN_NORM[1].x * w, y: LAPTOP_SCREEN_NORM[1].y * h },
      { x: LAPTOP_SCREEN_NORM[2].x * w, y: LAPTOP_SCREEN_NORM[2].y * h },
      { x: LAPTOP_SCREEN_NORM[3].x * w, y: LAPTOP_SCREEN_NORM[3].y * h },
    ];
    return computeCssMatrix3d(SCREEN_W, SCREEN_H, dst);
  }, [frameSize]);

  // Sequence progress:
  // 0.00 -> 0.06: Chapter A hold on close-up
  // 0.06 -> 0.36: hazem-intro pull-back (0 -> 1)
  // 0.36 -> 0.82: Chapter B hold steady on wide desk frame
  // 0.82 -> 1.00: Laptop screen entry zoom & transition into Work
  const introSeqProgress =
    progress <= 0.06
      ? 0
      : progress >= 0.36
        ? 1
        : (progress - 0.06) / 0.3;

  const isDeskSettled = progress >= 0.35;

  const chapterAOpacity =
    progress <= 0.08 ? 1 : progress >= 0.24 ? 0 : 1 - (progress - 0.08) / 0.16;

  const chapterBOpacity =
    progress < 0.26
      ? 0
      : progress < 0.34
        ? (progress - 0.26) / 0.08
        : progress <= 0.8
          ? 1
          : progress >= 0.88
            ? 0
            : 1 - (progress - 0.8) / 0.08;

  const scrollServiceIdx =
    progress < 0.44
      ? 0
      : progress < 0.56
        ? 1
        : progress < 0.68
          ? 2
          : 3;

  const activeServiceIdx =
    manualServiceIdx !== null ? manualServiceIdx : scrollServiceIdx;
  const activeService = SERVICES[activeServiceIdx] ?? SERVICES[0];

  // Chapter C laptop preview lights up as services settle, then zooms smoothly into #work
  const laptopGlowOpacity =
    progress < 0.7
      ? 0
      : progress < 0.8
        ? (progress - 0.7) / 0.1
        : 1;

  const zoomPhase =
    progress <= 0.82 ? 0 : Math.min(1, (progress - 0.82) / 0.18);
  const easedZoom = 1 - Math.pow(1 - zoomPhase, 2);
  const stageScale = 1 + easedZoom * 0.56;
  const veilIntoWorkOpacity = zoomPhase < 0.45 ? 0 : (zoomPhase - 0.45) / 0.55;

  const handleSelectServiceTab = (idx: number) => {
    setManualServiceIdx(idx);
    if (runwayRef.current && onScrollToFraction) {
      const rect = runwayRef.current.getBoundingClientRect();
      const topY = window.scrollY + rect.top;
      const travel = runwayRef.current.offsetHeight - window.innerHeight;
      const stops = [0.38, 0.5, 0.62, 0.74];
      onScrollToFraction(topY + travel * (stops[idx] ?? 0.38));
    }
  };

  const whatsappHref = getWhatsAppHref(locale);

  if (!interactiveDesktop) {
    return (
      <div className="story-fallback-root">
        {/* Chapter A — Close-up Portrait */}
        <section id="hero" className="mobile-chapter-a" aria-labelledby="hero-heading">
          <div className="mobile-portrait-wrap">
            <img
              src="/studio/portrait-closeup.webp"
              alt={
                locale === "ar"
                  ? "صورة مقربة للمهندس حازم أبوسعيفة"
                  : "Close-up studio portrait of Hazem Abouseafa"
              }
              width={1280}
              height={720}
              className="mobile-portrait-closeup"
              fetchPriority="high"
            />
            <div className="mobile-portrait-fade" aria-hidden="true" />
          </div>

          <div className="container mobile-hero-copy">
            <h1 id="hero-heading" className="chapter-a-title">
              {chapterA.nameHeadline}
            </h1>
            <p className="chapter-a-value">{chapterA.valueHeadline}</p>
            <p className="chapter-role-inline">{chapterA.roleTitle}</p>

            <div className="chapter-a-actions">
              <button
                type="button"
                onClick={onJumpToWork}
                className="btn-plum-primary"
              >
                <span>{chapterA.workCta}</span>
                <DirectionalArrowIcon className="btn-icon rtl-flip" />
              </button>

              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-studio-outline"
              >
                <WhatsAppIcon className="btn-icon" />
                <span>{chapterA.contactCta}</span>
              </a>
            </div>
          </div>
        </section>

        {/* Chapter B — Seated Desk Wide Composition + Accessible Services */}
        <section
          id="services"
          className="mobile-chapter-b"
          aria-labelledby="services-mobile-heading"
        >
          <div className="container">
            <div className="mobile-desk-stage">
              <img
                src="/studio/portrait-desk.webp"
                alt={
                  locale === "ar"
                    ? "حازم جالساً أمام مكتبه مع اللابتوب المفتوح"
                    : "Hazem seated at the walnut desk beside an open laptop"
                }
                width={1280}
                height={720}
                className="mobile-desk-img"
              />
            </div>

            <div className="mobile-services-header">
              <h2 id="services-mobile-heading" className="studio-h2">
                {chapterB.sectionTitle}
              </h2>
              <p className="studio-sub">{chapterB.sectionSub}</p>
            </div>

            <div className="mobile-services-tabs" role="tablist" aria-label={chapterB.sectionTitle}>
              {SERVICES.map((srv, idx) => (
                <button
                  key={srv.id}
                  type="button"
                  role="tab"
                  aria-selected={activeServiceIdx === idx}
                  className={`service-pill-tab ${
                    activeServiceIdx === idx ? "is-active" : ""
                  }`}
                  onClick={() => setManualServiceIdx(idx)}
                >
                  <span className="mono-token">{srv.index}</span>
                  <span>{srv.title[locale]}</span>
                </button>
              ))}
            </div>

            <div className="service-detail-panel">
              <div className="service-detail-top">
                <span className="service-icon-frame">
                  <CapabilityIcon kind={activeService.icon} className="btn-icon" />
                </span>
                <span className="mono-token service-count">
                  {activeService.index} / 0{SERVICES.length}
                </span>
              </div>
              <h3 className="service-detail-title">
                {activeService.title[locale]}
              </h3>
              <p className="service-detail-lead">
                {activeService.audienceLead[locale]}
              </p>
              <p className="service-detail-desc">
                {activeService.description[locale]}
              </p>
              <ul className="service-deliverables">
                {activeService.deliverables[locale].map((d) => (
                  <li key={d}>{d}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      </div>
    );
  }

  return (
    <section
      ref={runwayRef}
      id="hero"
      className="story-upper-runway"
      aria-labelledby="hero-heading"
    >
      <div className="story-sticky-viewport">
        <div
          ref={frameBoxRef}
          className="studio-frame-16x9"
          style={{
            width: `${frameSize.w}px`,
            height: `${frameSize.h}px`,
            transformOrigin: "60.1% 69.5%",
            transform: `translate(-50%, -50%) scale(${stageScale.toFixed(4)})`,
          }}
        >
          <ScrollSequenceCanvas
            basePath="/studio/intro-seq"
            frameCount={81}
            progress={introSeqProgress}
            posterSrc="/studio/portrait-closeup.webp"
            posterAlt={
              locale === "ar"
                ? "استوديو المهندس حازم أبوسعيفة"
                : "Hazem Abouseafa cinematic studio"
            }
          />

          {/* Crisp full-res static portrait held seamlessly while services change */}
          <img
            src="/studio/portrait-desk.webp"
            alt=""
            aria-hidden="true"
            width={1280}
            height={720}
            className="studio-hold-desk"
            style={{ opacity: isDeskSettled ? 1 : 0 }}
          />

          {/* Perspective-aligned Laptop Screen HTML Layer (Chapter C entry) */}
          <div
            className="laptop-screen-overlay"
            aria-hidden="true"
            style={{
              width: `${SCREEN_W}px`,
              height: `${SCREEN_H}px`,
              transform: laptopMatrix,
              opacity: laptopGlowOpacity,
            }}
          >
            <img
              src="/projects/sulafcosmetics.webp"
              alt=""
              className="laptop-screen-capture"
            />
            <div className="laptop-screen-hud">
              <span className="laptop-screen-dot" />
              <span>{laptopTag}</span>
            </div>
          </div>
        </div>

        <div className="studio-right-scrim" aria-hidden="true" />

        {/* Transition wash into accessible HTML Selected Work section */}
        <div
          className="chapter-c-wash"
          aria-hidden="true"
          style={{ opacity: veilIntoWorkOpacity }}
        />

        {/* Quiet Negative Space Stage on the RIGHT side of frame */}
        <div className="studio-right-stage">
          {/* Chapter A: Introduction (fades gently as camera pulls back) */}
          <div
            className="chapter-a-layer"
            aria-hidden={chapterAOpacity <= 0.05}
            inert={chapterAOpacity <= 0.05 ? true : undefined}
            style={{
              opacity: chapterAOpacity,
              transform: `translateY(${(1 - chapterAOpacity) * -28}px)`,
              pointerEvents: chapterAOpacity > 0.25 ? "auto" : "none",
            }}
          >
            <h1 id="hero-heading" className="chapter-a-title">
              {chapterA.nameHeadline}
            </h1>
            <p className="chapter-a-value">{chapterA.valueHeadline}</p>
            <p className="chapter-role-inline">{chapterA.roleTitle}</p>

            <div className="chapter-a-actions">
              <button
                type="button"
                onClick={onJumpToWork}
                className="btn-plum-primary"
              >
                <span>{chapterA.workCta}</span>
                <DirectionalArrowIcon className="btn-icon rtl-flip" />
              </button>

              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-studio-outline"
              >
                <WhatsAppIcon className="btn-icon" />
                <span>{chapterA.contactCta}</span>
              </a>
            </div>

            <p className="chapter-scroll-cue">{chapterA.scrollCue}</p>
          </div>

          {/* Chapter B: Services (appears in negative space over settled desk frame) */}
          <div
            id="services"
            className="chapter-b-layer"
            aria-hidden={chapterBOpacity <= 0.05}
            inert={chapterBOpacity <= 0.05 ? true : undefined}
            style={{
              opacity: chapterBOpacity,
              transform: `translateY(${(1 - chapterBOpacity) * 18}px)`,
              pointerEvents: chapterBOpacity > 0.25 ? "auto" : "none",
            }}
          >
            <div className="chapter-b-top-row">
              <div className="chapter-b-head">
                <h2 className="chapter-b-title">{chapterB.sectionTitle}</h2>
                <p className="chapter-b-sub">{chapterB.sectionSub}</p>
              </div>

              <div
                className="chapter-b-tabs"
                role="tablist"
                aria-label={chapterB.sectionTitle}
              >
                {SERVICES.map((srv, idx) => (
                  <button
                    key={srv.id}
                    type="button"
                    role="tab"
                    aria-selected={activeServiceIdx === idx}
                    className={`chapter-b-tab ${
                      activeServiceIdx === idx ? "is-active" : ""
                    }`}
                    onClick={() => handleSelectServiceTab(idx)}
                  >
                    <span className="mono-token">{srv.index}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="chapter-b-card">
              <div className="chapter-b-card-top">
                <span className="service-icon-frame">
                  <CapabilityIcon kind={activeService.icon} className="btn-icon" />
                </span>
                <span className="mono-token service-count">
                  {chapterB.serviceLabelPrefix} {activeService.index} / 0
                  {SERVICES.length}
                </span>
              </div>

              <h3 className="chapter-b-service-title">
                {activeService.title[locale]}
              </h3>
              <p className="chapter-b-service-lead">
                {activeService.audienceLead[locale]}
              </p>
              <p className="chapter-b-service-desc">
                {activeService.description[locale]}
              </p>

              <ul className="chapter-b-deliverables">
                {activeService.deliverables[locale].map((d) => (
                  <li key={d}>{d}</li>
                ))}
              </ul>
            </div>

            <div className="chapter-b-skip">
              <button
                type="button"
                onClick={onJumpToWork}
                className="btn-skip-work"
              >
                <span>{chapterA.workCta}</span>
                <DirectionalArrowIcon className="btn-icon rtl-flip" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
