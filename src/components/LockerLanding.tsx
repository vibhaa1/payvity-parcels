"use client";

import { useCallback, useState } from "react";
import Link from "next/link";
import { MotionConfig } from "framer-motion";
import { InterestOption } from "@/data/content";
import { LOCKER_CONTENT } from "@/data/lockerContent";
import { Lang, localizedPath } from "@/lib/seo";
import { ScrollProgressBar } from "./MotionPrimitives";
import { Navbar } from "./Navbar";
import { ProcessSection } from "./ProcessSection";
import { FaqSection } from "./FaqSection";
import { FinalCtaSection } from "./FinalCtaSection";
import { Footer } from "./Footer";

export function LockerLanding({ lang }: { lang: Lang }) {
  const [selectedInterest, setSelectedInterest] =
    useState<InterestOption>("Amazon Locker");
  const content = LOCKER_CONTENT[lang];
  const homeHref = localizedPath(lang, "/");

  const scrollTo = useCallback((target: string) => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const behavior = reduced ? "auto" : "smooth";
    if (!target || target === "top") {
      window.scrollTo({ top: 0, behavior });
      return;
    }
    const el = document.getElementById(target);
    if (el) {
      el.scrollIntoView({ behavior, block: "start" });
    }
  }, []);

  return (
    <MotionConfig reducedMotion="user">
      <ScrollProgressBar />
      <Navbar lang={lang} isHome={false} onScrollTo={scrollTo} />

      <main id="top">
        <section className="subpage-hero">
          <div className="wrap">
            <nav className="breadcrumb" aria-label="Breadcrumb">
              <Link href={homeHref}>{content.breadcrumbHome}</Link>
              <span aria-hidden="true">/</span>
              <span aria-current="page">{content.breadcrumbCurrent}</span>
            </nav>

            <span className="hero-eyebrow">{content.hero.eyebrow}</span>
            <h1>{content.hero.title}</h1>
            <p className="subpage-lead">{content.hero.subtitle}</p>

            <div className="hero-actions">
              <a
                className="button"
                href="#kontakt"
                onClick={(e) => {
                  e.preventDefault();
                  setSelectedInterest("Amazon Locker");
                  scrollTo("kontakt");
                }}
              >
                {content.hero.ctaPrimary}
              </a>
              <Link className="button ghost" href={homeHref}>
                {content.hero.ctaPaketshop}
              </Link>
            </div>
          </div>
        </section>

        <section className="wrap section">
          <div className="section-head-split">
            <div>
              <h2>{content.overview.title}</h2>
            </div>
            <p className="section-lead">{content.overview.lead}</p>
          </div>

          <div className="solution-card">
            <div className="solution-content">
              <div>
                <ul className="solution-bullets">
                  {content.overview.bullets.map((bullet) => (
                    <li key={bullet}>
                      <span className="solution-check" aria-hidden="true">
                        <svg
                          width="12"
                          height="12"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="3"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      </span>
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>

                <div className="locker-sites-block">
                  <h3>{content.overview.siteTypesTitle}</h3>
                  <ul className="vertical-chips">
                    {content.overview.siteTypes.map((siteType) => (
                      <li key={siteType} className="vertical-chip">
                        {siteType}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="solution-actions">
                <a
                  className="button"
                  href="#kontakt"
                  onClick={(e) => {
                    e.preventDefault();
                    setSelectedInterest("Amazon Locker");
                    scrollTo("kontakt");
                  }}
                >
                  {content.hero.ctaPrimary}
                </a>
                <Link className="button outline-dark" href={homeHref}>
                  {content.hero.ctaPaketshop}
                </Link>
              </div>
            </div>

            <div className="solution-media">
              <img
                src={content.overview.imageSrc}
                alt={content.overview.imageAlt}
                width={content.overview.imageWidth}
                height={content.overview.imageHeight}
                loading="lazy"
              />
            </div>
          </div>
        </section>

        <section className="wrap section">
          <div className="section-head-split">
            <div>
              <h2>{content.requirements.title}</h2>
            </div>
            <p className="section-lead">{content.requirements.lead}</p>
          </div>

          <div className="cards cards-3">
            {content.requirements.items.map((item) => (
              <div key={item.title} className="card">
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <ProcessSection
          lang={lang}
          title={content.process.title}
          lead={content.process.lead}
          steps={content.process.steps}
        />

        <section className="wrap section locker-teaser-wrap">
          <div className="locker-teaser">
            <div className="locker-teaser-copy">
              <span className="locker-badge">
                {content.paketshopCrossLink.badge}
              </span>
              <h2>{content.paketshopCrossLink.title}</h2>
              <p>{content.paketshopCrossLink.desc}</p>
            </div>
            <div className="locker-teaser-actions">
              <Link className="button" href={homeHref}>
                {content.paketshopCrossLink.ctaLabel}
              </Link>
            </div>
          </div>
        </section>

        <FaqSection
          lang={lang}
          onScrollTo={scrollTo}
          title={content.faq.title}
          lead={content.faq.lead}
          helpTitle={content.faq.helpTitle}
          helpDesc={content.faq.helpDesc}
          helpCta={content.faq.helpCta}
          items={content.faq.items}
        />

        <FinalCtaSection
          lang={lang}
          selectedInterest={selectedInterest}
          defaultInterest="Amazon Locker"
          onChangeInterest={setSelectedInterest}
        />
      </main>

      <Footer lang={lang} />
    </MotionConfig>
  );
}
