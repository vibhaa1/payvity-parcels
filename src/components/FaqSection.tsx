"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { FaqItem, HOME_CONTENT } from "@/data/content";
import type { Lang } from "@/lib/seo";
import { EASE, FadeUp } from "./MotionPrimitives";

interface FaqSectionProps {
  lang: Lang;
  onScrollTo?: (target: string) => void;
  title?: string;
  lead?: string;
  helpTitle?: string;
  helpDesc?: string;
  helpCta?: string;
  items?: FaqItem[];
}

export function FaqSection({
  lang,
  title,
  items,
}: FaqSectionProps) {
  const defaults = HOME_CONTENT[lang].faq;
  const list = items ?? defaults.items;
  const [openId, setOpenId] = useState<string | null>(list[0]?.id ?? null);
  const reduced = useReducedMotion();

  return (
    <section className="wrap section" id="faq">
      <FadeUp className="section-head-single faq-head-single">
        <h2>{title ?? defaults.title}</h2>
      </FadeUp>

      <div className="faq" id="faqList">
          {list.map((item) => {
            const isOpen = openId === item.id;
            const panelId = `${item.id}-panel`;
            return (
              <div
                key={item.id}
                className={`faq-item${isOpen ? " open" : ""}`}
              >
                <button
                  type="button"
                  className="faq-q"
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  onClick={() => setOpenId(isOpen ? null : item.id)}
                >
                  <span>{item.question}</span>
                  <motion.span
                    className="faq-plus"
                    animate={reduced ? undefined : { rotate: isOpen ? 45 : 0 }}
                    transition={{ duration: 0.24, ease: EASE }}
                    aria-hidden="true"
                  >
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 16 16"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                    >
                      <path d="M8 3.25v9.5M3.25 8h9.5" />
                    </svg>
                  </motion.span>
                </button>

                <div
                  id={panelId}
                  className="accordion-panel"
                  data-open={isOpen ? "true" : "false"}
                >
                  <div className="accordion-panel-inner">
                    <div className="faq-a">
                      <div className="faq-a-inner">
                        <p>{item.answer}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </section>
  );
}
