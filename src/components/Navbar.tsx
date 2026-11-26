"use client";

import { useEffect, useLayoutEffect, useState } from "react";
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

const LANG_SCROLL_STORAGE_KEY = "payvity:lang-scroll";
const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

interface SavedLangScroll {
  route: string;
  targetLang: Lang;
  y: number;
  anchorId: string | null;
  anchorOffset: number;
  ts: number;
}

function normalizeRouteWithoutLang(pathname: string | null): string {
  if (!pathname) return "/";
  const stripped = pathname.replace(/^\/(de|en)(?=\/|$)/, "");
  if (!stripped || stripped === "/") return "/";
  const withLeading = stripped.startsWith("/") ? stripped : `/${stripped}`;
  return withLeading.endsWith("/") ? withLeading : `${withLeading}/`;
}

function buildSwitchHref(pathname: string | null, targetLang: Lang): string {
  return localizedPath(targetLang, normalizeRouteWithoutLang(pathname));
}

function scrollInstant(top: number): void {
  const root = document.documentElement;
  const prev = root.style.scrollBehavior;
  root.style.scrollBehavior = "auto";
  window.scrollTo(0, Math.max(0, Math.round(top)));
  root.style.scrollBehavior = prev;
}

function saveScrollPositionForLangSwitch(
  pathname: string | null,
  targetLang: Lang
): void {
  try {
    let anchorId: string | null = null;
    let anchorOffset = 0;
    const sections = document.querySelectorAll<HTMLElement>("section[id]");
    sections.forEach((el) => {
      const top = el.getBoundingClientRect().top;
      if (top <= 120) {
        anchorId = el.id;
        anchorOffset = Math.round(-top);
      }
    });

    const payload: SavedLangScroll = {
      route: normalizeRouteWithoutLang(pathname),
      targetLang,
      y: Math.round(window.scrollY),
      anchorId,
      anchorOffset,
      ts: Date.now(),
    };
    window.sessionStorage.setItem(
      LANG_SCROLL_STORAGE_KEY,
      JSON.stringify(payload)
    );
  } catch {
    // Ignore storage quota/privacy-mode errors
  }
}

function computeTargetScrollY(saved: SavedLangScroll): number {
  if (saved.anchorId) {
    const el = document.getElementById(saved.anchorId);
    if (el) {
      return el.getBoundingClientRect().top + window.scrollY + saved.anchorOffset;
    }
  }
  return saved.y;
}

function LanguageSwitch({
  lang,
  pathname,
  layoutId,
  className,
  onSwitch,
}: {
  lang: Lang;
  pathname: string | null;
  layoutId: string;
  className?: string;
  onSwitch?: () => void;
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
            scroll={false}
            className={`switch-opt${isActive ? " active" : ""}`}
            aria-current={isActive ? "true" : undefined}
            onClick={(e) => {
              if (isActive) {
                e.preventDefault();
                return;
              }
              saveScrollPositionForLangSwitch(pathname, code);
              onSwitch?.();
            }}
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

  useIsomorphicLayoutEffect(() => {
    let saved: SavedLangScroll | null = null;
    try {
      const raw = window.sessionStorage.getItem(LANG_SCROLL_STORAGE_KEY);
      if (!raw) return;
      const parsed = JSON.parse(raw) as Partial<SavedLangScroll>;
      if (
        !parsed ||
        typeof parsed.ts !== "number" ||
        Date.now() - parsed.ts > 10_000
      ) {
        window.sessionStorage.removeItem(LANG_SCROLL_STORAGE_KEY);
        return;
      }
      if (
        parsed.targetLang !== lang ||
        parsed.route !== normalizeRouteWithoutLang(pathname)
      ) {
        return;
      }
      saved = {
        route: parsed.route,
        targetLang: parsed.targetLang,
        y: typeof parsed.y === "number" ? parsed.y : 0,
        anchorId: typeof parsed.anchorId === "string" ? parsed.anchorId : null,
        anchorOffset:
          typeof parsed.anchorOffset === "number" ? parsed.anchorOffset : 0,
        ts: parsed.ts,
      };
      window.sessionStorage.removeItem(LANG_SCROLL_STORAGE_KEY);
    } catch {
      return;
    }

    if (!saved) return;
    const target = saved;

    const restore = () => {
      scrollInstant(computeTargetScrollY(target));
      setScrolled(window.scrollY > 32);
      window.dispatchEvent(new Event("scroll"));
    };

    restore();
    const raf = window.requestAnimationFrame(restore);
    return () => window.cancelAnimationFrame(raf);
  }, [lang, pathname]);

  const isLockerPage = pathname?.includes("/amazon-locker");
  const isHeroPage = isHome || Boolean(isLockerPage);
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
    <div
      className={`nav-shell wrap${isHeroPage ? " is-hero" : ""}${
        scrolled ? " scrolled" : ""
      }`}
    >
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
                onSwitch={() => setMobileOpen(false)}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
