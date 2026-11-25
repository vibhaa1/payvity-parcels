"use client";

import { useCallback, useEffect, useState } from "react";
import { MotionConfig } from "framer-motion";
import { InterestOption, Lang, SectionId, SolutionMode } from "@/data/content";
import { ScrollProgressBar } from "./MotionPrimitives";
import { Navbar } from "./Navbar";
import { HeroSection } from "./HeroSection";
import { HowItWorksSection } from "./HowItWorksSection";
import { SolutionsSection } from "./SolutionsSection";
import { AdvantagesSection } from "./AdvantagesSection";
import { ProcessSection } from "./ProcessSection";
import { TrustSection } from "./TrustSection";
import { FaqSection } from "./FaqSection";
import { FinalCtaSection } from "./FinalCtaSection";
import { Footer } from "./Footer";

const SPY_IDS: SectionId[] = [
  "how-it-works",
  "loesungen",
  "warum-uns",
  "so-funktionierts",
  "faq",
];

export function PayvityLanding() {
  const [lang, setLang] = useState<Lang>("de");
  const [activeSolution, setActiveSolution] = useState<SolutionMode>("counter");
  const [selectedInterest, setSelectedInterest] =
    useState<InterestOption>("Paketshop");
  const [activeSection, setActiveSection] = useState<SectionId | null>(null);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

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

  const handleSolutionCta = useCallback(
    (mode: SolutionMode) => {
      setSelectedInterest(mode === "counter" ? "Paketshop" : "Amazon Locker");
      scrollTo("kontakt");
    },
    [scrollTo]
  );

  return (
    <MotionConfig reducedMotion="user">
      <ScrollProgressBar />
      <Navbar
        lang={lang}
        onChangeLang={setLang}
        activeSection={activeSection}
        onScrollTo={scrollTo}
      />
      <main id="top">
        <HeroSection lang={lang} onScrollTo={scrollTo} />
        <HowItWorksSection lang={lang} />
        <SolutionsSection
          lang={lang}
          activeSolution={activeSolution}
          onChangeSolution={setActiveSolution}
          onSelectCta={handleSolutionCta}
        />
        <AdvantagesSection lang={lang} />
        <ProcessSection lang={lang} />
        <TrustSection lang={lang} />
        <FaqSection lang={lang} onScrollTo={scrollTo} />
        <FinalCtaSection
          lang={lang}
          selectedInterest={selectedInterest}
          onChangeInterest={setSelectedInterest}
        />
        <Footer lang={lang} />
      </main>
    </MotionConfig>
  );
}
