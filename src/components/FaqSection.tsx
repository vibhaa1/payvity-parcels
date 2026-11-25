"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { FAQ_ITEMS, I18N, Lang } from "@/data/content";
import { EASE, FadeUp } from "./MotionPrimitives";

interface FaqSectionProps {
  lang: Lang;
  onScrollTo: (target: string) => void;
}

export function FaqSection({ lang, onScrollTo }: FaqSectionProps) {
  const [openId, setOpenId] = useState<string | null>("faq-1");
  const reduced = useReducedMotion();
  const copy = I18N[lang];

  return (
    <section className="wrap section" id="faq">
      <div className="faq-split">
        <FadeUp className="faq-aside">
          <h2>{copy.faq_title}</h2>
          <p className="section-lead">{copy.faq_lead}</p>
          <div className="faq-help-box">
            <h4>{copy.faq_help_t}</h4>
            <p>{copy.faq_help_p}</p>
            <motion.a
              className="button"
              href="#kontakt"
              whileHover={reduced ? undefined : { y: -1 }}
              whileTap={reduced ? undefined : { scale: 0.98 }}
              onClick={(e) => {
                e.preventDefault();
                onScrollTo("kontakt");
              }}
            >
              {copy.faq_help_cta}
            </motion.a>
          </div>
        </FadeUp>

        <div className="faq" id="faqList">
          {FAQ_ITEMS.map((item) => {
            const isOpen = openId === item.id;
            return (
              <div
                key={item.id}
                className={`faq-item${isOpen ? " open" : ""}`}
              >
                <button
                  type="button"
                  className="faq-q"
                  aria-expanded={isOpen}
                  onClick={() => setOpenId(isOpen ? null : item.id)}
                >
                  <span>{copy[item.qKey]}</span>
                  <motion.span
                    className="faq-plus"
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
                      className="faq-a"
                      initial={reduced ? false : { height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={reduced ? undefined : { height: 0, opacity: 0 }}
                      transition={{ duration: 0.28, ease: EASE }}
                    >
                      <div className="faq-a-inner">
                        <p>{copy[item.aKey]}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
