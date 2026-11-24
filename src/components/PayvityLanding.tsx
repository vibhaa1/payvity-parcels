"use client";

import { useCallback, useEffect, useState } from "react";
import { MotionConfig } from "framer-motion";
import { HOME_CONTENT, InterestOption, SectionId } from "@/data/content";
import type { Lang } from "@/lib/seo";
import { ScrollProgressBar } from "./MotionPrimitives";
import { Navbar } from "./Navbar";
import { HeroSection } from "./HeroSection";
import { PaketshopSection } from "./PaketshopSection";
import { AdvantagesSection } from "./AdvantagesSection";
import { ProcessSection } from "./ProcessSection";
import { TrustSection } from "./TrustSection";
import { LockerTeaserSection } from "./LockerTeaserSection";
import { FaqSection } from "./FaqSection";
import { FinalCtaSection } from "./FinalCtaSection";
import { Footer } from "./Footer";

const SPY_IDS: SectionId[] = [
  "paketshop",
  "vorteile",
  "so-funktionierts",
  "faq",
];

export function PayvityLanding({ lang }: { lang: Lang }) {
  const [selectedInterest, setSelectedInterest] =
    useState<InterestOption>("Amazon Paketshop");
  const [activeSection, setActiveSection] = useState<SectionId | null>(null);

  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") return;
    const elements = SPY_IDS.map((id) => document.getElementById(id)).filter(
      (el): el is HTMLElement => Boolean(el)
    );
    const spy = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id as SectionId);
          }
        });
      },
      { rootMargin: "-35% 0px -55% 0px" }
    );
    elements.forEach((el) => spy.observe(el));
    return () => spy.disconnect();
  }, []);

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

  const handlePaketshopCta = useCallback(
    (interest: InterestOption) => {
      setSelectedInterest(interest);
      scrollTo("kontakt");
    },
    [scrollTo]
  );

  const faqCopy = HOME_CONTENT[lang].faq;

  return (
    <MotionConfig reducedMotion="user">
      <ScrollProgressBar />
      <Navbar
        lang={lang}
        activeSection={activeSection}
        isHome={true}
        onScrollTo={scrollTo}
      />
      <main id="top">
        <HeroSection lang={lang} onScrollTo={scrollTo} />
        <PaketshopSection lang={lang} onSelectCta={handlePaketshopCta} />
        <AdvantagesSection lang={lang} />
        <ProcessSection lang={lang} />
        <TrustSection lang={lang} />
        <LockerTeaserSection lang={lang} />
        <FaqSection
          lang={lang}
          onScrollTo={scrollTo}
          title={faqCopy.title}
          lead={faqCopy.lead}
          helpTitle={faqCopy.helpTitle}
          helpDesc={faqCopy.helpDesc}
          helpCta={faqCopy.helpCta}
          items={faqCopy.items}
        />
        <FinalCtaSection
          lang={lang}
          selectedInterest={selectedInterest}
          onChangeInterest={setSelectedInterest}
        />
      </main>
      <Footer lang={lang} />
    </MotionConfig>
  );
}
