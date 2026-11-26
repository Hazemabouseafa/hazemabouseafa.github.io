"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  IDENTITY,
  getWhatsAppHref,
  isConfiguredExternalUrl,
} from "@/content";
import type { Locale, SiteCopy } from "@/content";
import {
  CheckIcon,
  CopyIcon,
  DirectionalArrowIcon,
  FacebookIcon,
  WhatsAppIcon,
} from "./Icons";
import { ScrollSequenceCanvas } from "./ScrollSequenceCanvas";

interface ContactStorySectionProps {
  locale: Locale;
  copy: SiteCopy["chapterD"];
  isReducedMotion: boolean;
  isDesktop: boolean;
}

export function ContactStorySection({
  locale,
  copy,
  isReducedMotion,
  isDesktop,
}: ContactStorySectionProps) {
  const runwayRef = useRef<HTMLElement>(null);
  const [progress, setProgress] = useState(0);
  const [copied, setCopied] = useState(false);

  const interactiveDesktop = isDesktop && !isReducedMotion;
  const whatsappHref = getWhatsAppHref(locale);
  const hasFacebook = isConfiguredExternalUrl(IDENTITY.facebookUrl);
  const phoneShort = "01550612361";

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
        },
      });
    }, runway);

    return () => ctx.revert();
  }, [interactiveDesktop]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(phoneShort);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2600);
    } catch {
      window.location.href = `tel:+${IDENTITY.whatsappNumberRaw}`;
    }
  };

  // Contact motion window:
  // 0.00 -> 0.58: desk pose to palm-up welcoming gesture
  // 0.58 -> 1.00: hold final welcoming still clearly
  const contactSeqProgress = Math.min(1, progress / 0.58);
  const holdWelcomingStill = progress >= 0.56;

  const renderContactActions = () => (
    <div className="chapter-d-card">
      <h2 id="contact-heading" className="chapter-d-title">
        {copy.heading}
      </h2>

      <div className="chapter-d-primary-row">
        <a
          href={whatsappHref}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-plum-primary btn-contact-wa"
        >
          <WhatsAppIcon className="btn-icon" />
          <span>{copy.whatsappCta}</span>
        </a>

        <a
          href={`tel:+${IDENTITY.whatsappNumberRaw}`}
          className="btn-studio-outline"
        >
          <span>{copy.callCta}</span>
          <DirectionalArrowIcon className="btn-icon rtl-flip" />
        </a>
      </div>

      <div className="chapter-d-channels">
        <div className="contact-channel-box">
          <span className="contact-channel-label">{copy.directNumberLabel}</span>
          <div className="contact-number-row">
            <span dir="ltr" className="mono-token contact-number-val">
              {IDENTITY.whatsappNumberDisplay}
            </span>
            <button
              type="button"
              onClick={handleCopy}
              className="btn-copy-number"
              aria-live="polite"
            >
              {copied ? (
                <>
                  <CheckIcon className="btn-icon" />
                  <span>
                    {copy.copiedFeedback} {phoneShort}
                  </span>
                </>
              ) : (
                <>
                  <CopyIcon className="btn-icon" />
                  <span>{copy.copyPhoneCta}</span>
                </>
              )}
            </button>
          </div>
        </div>

        {hasFacebook ? (
          <a
            href={IDENTITY.facebookUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="contact-channel-box contact-fb-link"
          >
            <span className="contact-fb-icon">
              <FacebookIcon className="btn-icon" />
            </span>
            <span className="contact-fb-meta">
              <span className="contact-channel-label">{copy.facebookCta}</span>
              <strong className="contact-fb-name">{IDENTITY.brand}</strong>
            </span>
            <DirectionalArrowIcon className="btn-icon rtl-flip" />
          </a>
        ) : (
          <div className="contact-channel-box">
            <span className="contact-channel-label">{copy.facebookCta}</span>
            <span className="contact-fb-missing">{copy.facebookMissingNote}</span>
          </div>
        )}
      </div>
    </div>
  );

  if (!interactiveDesktop) {
    return (
      <section
        id="contact"
        className="mobile-chapter-d"
        aria-labelledby="contact-heading"
      >
        <div className="container">
          <div className="mobile-desk-stage">
            <img
              src="/studio/portrait-welcoming.webp"
              alt={
                locale === "ar"
                  ? "حازم بإشارة ترحيبية للتواصل ومناقشة مشروعك القادم"
                  : "Hazem offering an open welcoming gesture at the studio desk"
              }
              width={1280}
              height={720}
              className="mobile-desk-img"
            />
          </div>
          {renderContactActions()}
        </div>
      </section>
    );
  }

  return (
    <section
      ref={runwayRef}
      id="contact"
      className="contact-story-runway"
      aria-labelledby="contact-heading"
    >
      <div className="contact-sticky-viewport">
        <div className="contact-media-cover">
          <ScrollSequenceCanvas
            basePath="/studio/contact-seq"
            frameCount={56}
            progress={contactSeqProgress}
            posterSrc="/studio/portrait-desk.webp"
            posterAlt={
              locale === "ar"
                ? "حازم يستقبل فكرة مشروعك في الاستوديو"
                : "Hazem transitioning from desk pose to a welcoming gesture"
            }
          />
          <img
            src="/studio/portrait-welcoming.webp"
            alt=""
            aria-hidden="true"
            width={1280}
            height={720}
            className="studio-hold-desk"
            style={{ opacity: holdWelcomingStill ? 1 : 0 }}
          />
        </div>

        <div className="studio-right-scrim" aria-hidden="true" />

        <div className="studio-right-stage contact-right-stage">
          {renderContactActions()}
        </div>
      </div>
    </section>
  );
}
