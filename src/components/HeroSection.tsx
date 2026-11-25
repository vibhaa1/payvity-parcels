"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { I18N, Lang, STATS } from "@/data/content";
import { AnimatedCounter, EASE } from "./MotionPrimitives";

interface HeroSectionProps {
  lang: Lang;
  onScrollTo: (target: string) => void;
}

export function HeroSection({ lang, onScrollTo }: HeroSectionProps) {
  const heroRef = useRef<HTMLDivElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const reduced = useReducedMotion();
  const [statTriggers, setStatTriggers] = useState<Record<string, number>>({});
  const copy = I18N[lang];

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
    <section
      className="hero-shell"
      aria-label="Payvity Amazon Locker und Paketshops"
    >
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
          preload="auto"
          poster="/video/amazon-hero-poster.jpg"
          aria-hidden="true"
          tabIndex={-1}
        >
          <source src="/video/amazon-hero.webm" type="video/webm" />
        </video>

        <div className="hero-content wrap">
          <div className="hero-inner">
            <div className="hero-copy">
              <motion.h1
                initial={reduced ? false : { opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.65, ease: EASE }}
              >
                {copy.hero_title}
              </motion.h1>

              <motion.p
                initial={reduced ? false : { opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.65, delay: 0.08, ease: EASE }}
              >
                {copy.hero_sub}
              </motion.p>

              <motion.div
                className="hero-actions"
                initial={reduced ? false : { opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.65, delay: 0.16, ease: EASE }}
              >
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
                  {copy.hero_cta_primary}
                </motion.a>
                <motion.a
                  className="button ghost"
                  href="#loesungen"
                  whileHover={reduced ? undefined : { y: -2 }}
                  whileTap={reduced ? undefined : { scale: 0.98 }}
                  onClick={(e) => {
                    e.preventDefault();
                    onScrollTo("loesungen");
                  }}
                >
                  {copy.hero_cta_secondary}
                </motion.a>
              </motion.div>
            </div>
          </div>

          <motion.div
            className="stats"
            id="stats"
            initial={reduced ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.22, ease: EASE }}
          >
            {STATS.map((stat) => (
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
                <span className="stat-label">{copy[stat.labelKey]}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
