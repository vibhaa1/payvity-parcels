"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { HOME_CONTENT } from "@/data/content";
import type { Lang } from "@/lib/seo";
import { AnimatedCounter } from "./MotionPrimitives";

interface HeroSectionProps {
  lang: Lang;
  onScrollTo: (target: string) => void;
}

export function HeroSection({ lang, onScrollTo }: HeroSectionProps) {
  const heroRef = useRef<HTMLDivElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const reduced = useReducedMotion();
  const [statTriggers, setStatTriggers] = useState<Record<string, number>>({});
  const hero = HOME_CONTENT[lang].hero;

  useEffect(() => {
    const videoEl = videoRef.current;
    const heroEl = heroRef.current;
    if (!videoEl) return;

    if (reduced) {
      videoEl.pause();
      return;
    }

    videoEl.muted = true;
    videoEl.play().catch(() => {});

    if (!heroEl || typeof IntersectionObserver === "undefined") return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) videoEl.play().catch(() => {});
          else videoEl.pause();
        });
      },
      { threshold: 0.05 }
    );
    obs.observe(heroEl);
    return () => obs.disconnect();
  }, [reduced]);

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (reduced || !heroRef.current) return;
    const rect = heroRef.current.getBoundingClientRect();
    heroRef.current.style.setProperty("--gx", `${e.clientX - rect.left}px`);
    heroRef.current.style.setProperty("--gy", `${e.clientY - rect.top}px`);
  };

  const retriggerStat = (id: string) => {
    setStatTriggers((prev) => ({ ...prev, [id]: (prev[id] ?? 0) + 1 }));
  };

  return (
    <section className="hero-shell" aria-label={hero.ariaLabel}>
      <div
        className="hero"
        id="hero"
        ref={heroRef}
        onPointerMove={handlePointerMove}
      >
        <div className="hero-glow" id="heroGlow" />
        <video
          ref={videoRef}
          className="hero-video"
          id="heroVideo"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster="/video/amazon-hero-poster.jpg"
          aria-hidden="true"
          tabIndex={-1}
        >
          <source src="/video/amazon-hero.webm" type="video/webm" />
        </video>

        <div className="hero-content wrap">
          <div className="hero-inner">
            <div className="hero-copy">
              <h1>{hero.title}</h1>
              <p>{hero.subtitle}</p>

              <div className="hero-actions">
                <motion.a
                  className="button"
                  href="#kontakt"
                  whileHover={reduced ? undefined : { y: -2 }}
                  whileTap={reduced ? undefined : { scale: 0.98 }}
                  onClick={(e) => {
                    e.preventDefault();
                    onScrollTo("kontakt");
                  }}
                >
                  {hero.ctaPrimary}
                </motion.a>
                <motion.a
                  className="button ghost"
                  href="#paketshop"
                  whileHover={reduced ? undefined : { y: -2 }}
                  whileTap={reduced ? undefined : { scale: 0.98 }}
                  onClick={(e) => {
                    e.preventDefault();
                    onScrollTo("paketshop");
                  }}
                >
                  {hero.ctaSecondary}
                </motion.a>
              </div>
            </div>
          </div>

          <div className="stats" id="stats">
            {hero.stats.map((stat) => (
              <div
                key={stat.id}
                className="stat"
                tabIndex={0}
                onMouseEnter={() => retriggerStat(stat.id)}
                onFocus={() => retriggerStat(stat.id)}
              >
                <AnimatedCounter
                  target={stat.target}
                  suffix={stat.suffix}
                  triggerKey={statTriggers[stat.id] ?? 0}
                />
                <span className="stat-label">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
