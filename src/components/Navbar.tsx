"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { I18N, Lang, NAV_ITEMS, SectionId } from "@/data/content";
import { EASE, SPRING } from "./MotionPrimitives";

interface NavbarProps {
  lang: Lang;
  onChangeLang: (lang: Lang) => void;
  activeSection: SectionId | null;
  onScrollTo: (target: string) => void;
}

function LanguageSwitch({
  lang,
  onChangeLang,
  layoutId,
  className,
}: {
  lang: Lang;
  onChangeLang: (lang: Lang) => void;
  layoutId: string;
  className?: string;
}) {
  return (
    <div
      className={className ? `switch ${className}` : "switch"}
      role="group"
      aria-label={lang === "de" ? "Sprache wählen" : "Select language"}
    >
      {(["de", "en"] as const).map((code) => {
        const isActive = lang === code;
        return (
          <button
            key={code}
            type="button"
            className={`switch-opt${isActive ? " active" : ""}`}
            aria-pressed={isActive}
            onClick={() => onChangeLang(code)}
          >
            {isActive && (
              <motion.span
                layoutId={layoutId}
                className="switch-pill"
                transition={SPRING}
                aria-hidden="true"
              />
            )}
            <span>{code.toUpperCase()}</span>
          </button>
        );
      })}
    </div>
  );
}

export function Navbar({
  lang,
  onChangeLang,
  activeSection,
  onScrollTo,
}: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const copy = I18N[lang];

  useEffect(() => {
    const syncScroll = () => setScrolled(window.scrollY > 32);
    syncScroll();
    window.addEventListener("scroll", syncScroll, { passive: true });
    return () => window.removeEventListener("scroll", syncScroll);
  }, []);

  const handleNavClick = (targetId: string) => {
    setMobileOpen(false);
    onScrollTo(targetId);
  };

  return (
    <div className={`nav-shell wrap${scrolled ? " scrolled" : ""}`}>
      <nav
        className="nav"
        aria-label={lang === "de" ? "Hauptnavigation" : "Main navigation"}
      >
        <a
          className="brand"
          href="#top"
          aria-label="Payvity Parcels"
          onClick={(e) => {
            e.preventDefault();
            handleNavClick("top");
          }}
        >
          <img
            src="/images/payvity-logo.png"
            alt="Payvity Parcels — Offizieller Partner von Amazon"
            className="brand-logo"
          />
        </a>

        <div className="nav-links">
          {NAV_ITEMS.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                type="button"
                className={isActive ? "active" : undefined}
                onClick={() => handleNavClick(item.id)}
              >
                {copy[item.labelKey]}
                {isActive && (
                  <motion.span
                    layoutId="nav-active-underline"
                    className="nav-active-line"
                    transition={SPRING}
                    aria-hidden="true"
                  />
                )}
              </button>
            );
          })}
        </div>

        <LanguageSwitch
          lang={lang}
          onChangeLang={onChangeLang}
          layoutId="lang-pill-desktop"
        />

        <motion.a
          className="nav-cta"
          href="#kontakt"
          whileHover={{ y: -1 }}
          whileTap={{ scale: 0.98 }}
          onClick={(e) => {
            e.preventDefault();
            handleNavClick("kontakt");
          }}
        >
          {copy.nav_cta}
        </motion.a>

        <button
          type="button"
          className="nav-toggle"
          aria-label={lang === "de" ? "Menü öffnen" : "Open menu"}
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen((prev) => !prev)}
        >
          <span />
          <span />
          <span />
        </button>
      </nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="mobile-panel"
            initial={{ opacity: 0, y: -8, scale: 0.985 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.985 }}
            transition={{ duration: 0.22, ease: EASE }}
          >
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                type="button"
                className="mobile-panel-item"
                onClick={() => handleNavClick(item.id)}
              >
                {copy[item.labelKey]}
              </button>
            ))}
            <button
              type="button"
              className="mobile-panel-item"
              onClick={() => handleNavClick("kontakt")}
            >
              {copy.nav_cta}
            </button>
            <div className="mobile-switch-wrap">
              <LanguageSwitch
                lang={lang}
                onChangeLang={onChangeLang}
                layoutId="lang-pill-mobile"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
