"use client";

import { useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { I18N, InterestOption, Lang } from "@/data/content";
import { EASE, FadeUp, SPRING } from "./MotionPrimitives";

interface FinalCtaSectionProps {
  lang: Lang;
  selectedInterest: InterestOption;
  onChangeInterest: (interest: InterestOption) => void;
}

const INTEREST_OPTIONS: Array<{
  value: InterestOption;
  labelKey: "int_counter" | "int_locker" | "int_both";
}> = [
  { value: "Paketshop", labelKey: "int_counter" },
  { value: "Amazon Locker", labelKey: "int_locker" },
  { value: "Beides", labelKey: "int_both" },
];

export function FinalCtaSection({
  lang,
  selectedInterest,
  onChangeInterest,
}: FinalCtaSectionProps) {
  const ctaRef = useRef<HTMLDivElement | null>(null);
  const [email, setEmail] = useState("");
  const [submittedNote, setSubmittedNote] = useState<string | null>(null);
  const reduced = useReducedMotion();
  const copy = I18N[lang];

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (reduced || !ctaRef.current) return;
    const rect = ctaRef.current.getBoundingClientRect();
    ctaRef.current.style.setProperty("--gx", `${e.clientX - rect.left}px`);
    ctaRef.current.style.setProperty("--gy", `${e.clientY - rect.top}px`);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmittedNote(`${copy.cta_thanks} (${selectedInterest})`);
    setEmail("");
  };

  return (
    <section className="wrap section" id="kontakt" style={{ paddingTop: "16px" }}>
      <FadeUp>
        <div
          className="final-cta"
          id="finalCta"
          ref={ctaRef}
          onPointerMove={handlePointerMove}
        >
          <div className="hero-glow" />
          <div className="final-cta-copy">
            <h2>{copy.cta_title}</h2>
            <p>{copy.cta_lead}</p>
          </div>

          <div className="final-cta-form-box">
            <span className="interest-label">{copy.cta_interest_label}</span>
            <div className="interest-pills" id="interestPills">
              {INTEREST_OPTIONS.map((opt) => {
                const isActive = selectedInterest === opt.value;
                return (
                  <button
                    key={opt.value}
                    type="button"
                    className={`interest-pill${isActive ? " active" : ""}`}
                    onClick={() => onChangeInterest(opt.value)}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="interest-pill-bg"
                        className="interest-pill-bg"
                        transition={SPRING}
                        aria-hidden="true"
                      />
                    )}
                    <span>{copy[opt.labelKey]}</span>
                  </button>
                );
              })}
            </div>

            <form className="newsletter" id="leadForm" onSubmit={handleSubmit}>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={copy.cta_placeholder}
                aria-label={lang === "de" ? "E-Mail-Adresse" : "Email address"}
              />
              <motion.button
                type="submit"
                whileHover={reduced ? undefined : { y: -1 }}
                whileTap={reduced ? undefined : { scale: 0.98 }}
              >
                {copy.cta_submit}
              </motion.button>
            </form>

            <div className="newsletter-note" id="leadNote" aria-live="polite">
              <AnimatePresence mode="wait">
                {submittedNote && (
                  <motion.span
                    key={submittedNote}
                    initial={reduced ? false : { opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={reduced ? undefined : { opacity: 0 }}
                    transition={{ duration: 0.25, ease: EASE }}
                  >
                    {submittedNote}
                  </motion.span>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </FadeUp>
    </section>
  );
}
