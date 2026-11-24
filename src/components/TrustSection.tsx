"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { I18N, Lang, TRUST_IMAGE, TRUST_ITEMS } from "@/data/content";
import { EASE, FadeUp } from "./MotionPrimitives";

export function TrustSection({ lang }: { lang: Lang }) {
  const [openIndex, setOpenIndex] = useState<string | null>("01");
  const reduced = useReducedMotion();
  const copy = I18N[lang];

  return (
    <section className="wrap section">
      <div className="trust-split">
        <FadeUp className="trust-visual">
          {/* Static image */}
          <img src={TRUST_IMAGE} alt={copy.trust_alt} loading="lazy" />
        </FadeUp>

        <div className="trust-content">
          <FadeUp>
            <h2>{copy.trust_title}</h2>
            <p className="section-lead">{copy.trust_lead}</p>
          </FadeUp>

          <div className="why-list" id="whyList">
            {TRUST_ITEMS.map((item) => {
              const isOpen = openIndex === item.index;
              return (
                <div
                  key={item.index}
                  className={`why-row${isOpen ? " open" : ""}`}
                >
                  <button
                    type="button"
                    className="why-row-head"
                    aria-expanded={isOpen}
                    onClick={() => setOpenIndex(isOpen ? null : item.index)}
                  >
                    <div className="why-row-left">
                      <span className="why-index">{item.index}</span>
                      <h3>{copy[item.titleKey]}</h3>
                    </div>
                    <motion.span
                      className="why-plus"
                      animate={{ rotate: isOpen ? 45 : 0 }}
                      transition={{ duration: 0.24, ease: EASE }}
                      aria-hidden="true"
                    >
                      +
                    </motion.span>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        className="why-body"
                        initial={reduced ? false : { height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={reduced ? undefined : { height: 0, opacity: 0 }}
                        transition={{ duration: 0.28, ease: EASE }}
                      >
                        <p>{copy[item.descKey]}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
