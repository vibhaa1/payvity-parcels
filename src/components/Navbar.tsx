"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { HOME_CONTENT, SectionId } from "@/data/content";
import { Lang, localizedPath } from "@/lib/seo";
import { EASE, SPRING } from "./MotionPrimitives";

interface NavbarProps {
  lang: Lang;
  activeSection?: SectionId | null;
  isHome?: boolean;
  onScrollTo?: (target: string) => void;
}

function buildSwitchHref(pathname: string | null, targetLang: Lang): string {
  if (!pathname) return localizedPath(targetLang, "/");
  const stripped = pathname.replace(/^\/(de|en)(?=\/|$)/, "");
  const route = stripped === "" ? "/" : stripped;
  return localizedPath(targetLang, route);
}

function LanguageSwitch({
  lang,
  pathname,
  layoutId,
  className,
}: {
  lang: Lang;
  pathname: string | null;
  layoutId: string;
  className?: string;
}) {
  const navCopy = HOME_CONTENT[lang].nav;

  return (
    <div
      className={className ? `switch ${className}` : "switch"}
      role="group"
      aria-label={navCopy.ariaLang}
    >
      {(["de", "en"] as const).map((code) => {
        const isActive = lang === code;
        const href = buildSwitchHref(pathname, code);
        return (
          <Link
            key={code}
            href={href}
            hrefLang={code === "de" ? "de-DE" : "en"}
            className={`switch-opt${isActive ? " active" : ""}`}
            aria-current={isActive ? "true" : undefined}
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
          </Link>
        );
      })}
    </div>
  );
}

export function Navbar({
  lang,
  activeSection = null,
  isHome = false,
  onScrollTo,
}: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const navCopy = HOME_CONTENT[lang].nav;

  useEffect(() => {
    const syncScroll = () => setScrolled(window.scrollY > 32);
    syncScroll();
    window.addEventListener("scroll", syncScroll, { passive: true });
    return () => window.removeEventListener("scroll", syncScroll);
  }, []);

  const isLockerPage = pathname?.includes("/amazon-locker");
  const homeHref = localizedPath(lang, "/");
  const lockerHref = localizedPath(lang, "/amazon-locker/");
  const ctaHref = isHome || isLockerPage ? "#kontakt" : `${homeHref}#kontakt`;

  const handleSectionLink = (
    e: React.MouseEvent<HTMLAnchorElement>,
    targetId: string
  ) => {
    setMobileOpen(false);
    if (isHome && onScrollTo) {
      e.preventDefault();
      onScrollTo(targetId);
    }
  };

  return (
    <div className={`nav-shell wrap${scrolled ? " scrolled" : ""}`}>
      <nav className="nav" aria-label={navCopy.ariaMain}>
        <Link
          className="brand"
          href={homeHref}
          aria-label="PAYVITY Parcels"
          onClick={(e) => {
            if (isHome && onScrollTo) {
              e.preventDefault();
              setMobileOpen(false);
              onScrollTo("top");
            }
          }}
        >
          <img
            src="/images/payvity-logo.png"
            alt={navCopy.logoAlt}
            width={240}
            height={33}
            className="brand-logo"
          />
        </Link>

        <div className="nav-links">
          {navCopy.items.map((item) => {
            const isActive = isHome && activeSection === item.id;
            return (
              <Link
                key={item.id}
                href={`${homeHref}#${item.id}`}
                className={isActive ? "active" : undefined}
                onClick={(e) => handleSectionLink(e, item.id)}
              >
                {item.label}
                {isActive && (
                  <motion.span
                    layoutId="nav-active-underline"
                    className="nav-active-line"
                    transition={SPRING}
                    aria-hidden="true"
                  />
                )}
              </Link>
            );
          })}
          <Link
            href={lockerHref}
            className={isLockerPage ? "active" : undefined}
          >
            {navCopy.lockerLinkLabel}
            {isLockerPage && (
              <motion.span
                layoutId="nav-active-underline"
                className="nav-active-line"
                transition={SPRING}
                aria-hidden="true"
              />
            )}
          </Link>
        </div>

        <LanguageSwitch
          lang={lang}
          pathname={pathname}
          layoutId="lang-pill-desktop"
        />

        <Link
          className="nav-cta"
          href={ctaHref}
          onClick={(e) => {
            if ((isHome || isLockerPage) && onScrollTo) {
              e.preventDefault();
              setMobileOpen(false);
              onScrollTo("kontakt");
            }
          }}
        >
          {navCopy.ctaLabel}
        </Link>

        <button
          type="button"
          className="nav-toggle"
          aria-label={navCopy.ariaMenuOpen}
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
            {navCopy.items.map((item) => (
              <Link
                key={item.id}
                href={`${homeHref}#${item.id}`}
                className="mobile-panel-item"
                onClick={(e) => handleSectionLink(e, item.id)}
              >
                {item.label}
              </Link>
            ))}
            <Link
              href={lockerHref}
              className="mobile-panel-item"
              onClick={() => setMobileOpen(false)}
            >
              {navCopy.lockerLinkLabel}
            </Link>
            <Link
              href={ctaHref}
              className="mobile-panel-item"
              onClick={(e) => {
                setMobileOpen(false);
                if ((isHome || isLockerPage) && onScrollTo) {
                  e.preventDefault();
                  onScrollTo("kontakt");
                }
              }}
            >
              {navCopy.ctaLabel}
            </Link>
            <div className="mobile-switch-wrap">
              <LanguageSwitch
                lang={lang}
                pathname={pathname}
                layoutId="lang-pill-mobile"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
