"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { HOME_CONTENT } from "@/data/content";
import type { Lang } from "@/lib/seo";
import { EASE, FadeUp } from "./MotionPrimitives";

export function TrustSection({ lang }: { lang: Lang }) {
  const [openIndex, setOpenIndex] = useState<string | null>("01");
  const reduced = useReducedMotion();
  const trust = HOME_CONTENT[lang].trust;

  return (
    <section className="wrap section" id="warum-uns">
      <div className="trust-split">
        <FadeUp className="trust-visual">
          <img
            src={trust.imageSrc}
            alt={trust.imageAlt}
            width={trust.imageWidth}
            height={trust.imageHeight}
            loading="lazy"
          />
        </FadeUp>

        <div className="trust-content">
          <FadeUp>
            <h2>{trust.title}</h2>
            <p className="section-lead">{trust.lead}</p>
          </FadeUp>

          <div className="why-list" id="whyList">
            {trust.items.map((item) => {
              const isOpen = openIndex === item.index;
              const panelId = `trust-panel-${item.index}`;
              return (
                <div
                  key={item.index}
                  className={`why-row${isOpen ? " open" : ""}`}
                >
                  <button
                    type="button"
                    className="why-row-head"
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => setOpenIndex(isOpen ? null : item.index)}
                  >
                    <div className="why-row-left">
                      <span className="why-index">{item.index}</span>
                      <h3>{item.title}</h3>
                    </div>
                    <motion.span
                      className="why-plus"
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
                      <div className="why-body">
                        <p>{item.desc}</p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
