"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { I18N, Lang, SolutionMode, SOLUTIONS } from "@/data/content";
import { EASE, FadeUp, SPRING } from "./MotionPrimitives";

interface SolutionsSectionProps {
  lang: Lang;
  activeSolution: SolutionMode;
  onChangeSolution: (mode: SolutionMode) => void;
  onSelectCta: (mode: SolutionMode) => void;
}

export function SolutionsSection({
  lang,
  activeSolution,
  onChangeSolution,
  onSelectCta,
}: SolutionsSectionProps) {
  const reduced = useReducedMotion();
  const copy = I18N[lang];
  const data = SOLUTIONS[activeSolution];
  const solCopy = data[lang];

  return (
    <section className="wrap section" id="loesungen">
      <FadeUp className="section-head-split">
        <div>
          <h2>{copy.sol_title}</h2>
        </div>
        <p className="section-lead">{copy.sol_lead}</p>
      </FadeUp>

      <div className="solutions-bar">
        <div
          className="product-toggle"
          role="tablist"
          aria-label={
            lang === "de"
              ? "Zwischen Paketshops und Lockern wechseln"
              : "Switch between Packetshops and Lockers"
          }
        >
          <button
            type="button"
            role="tab"
            id="tabCounter"
            aria-selected={activeSolution === "counter"}
            className={`product-toggle-btn${
              activeSolution === "counter" ? " active" : ""
            }`}
            onClick={() => onChangeSolution("counter")}
          >
            {activeSolution === "counter" && (
              <motion.span
                layoutId="solution-tab-pill"
                className="product-toggle-slider"
                transition={SPRING}
                aria-hidden="true"
              />
            )}
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M3 9l9-6 9 6v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
              <polyline points="9 22 9 12 15 12 15 22" />
            </svg>
            <span>{copy.toggle_counter}</span>
          </button>

          <button
            type="button"
            role="tab"
            id="tabLocker"
            aria-selected={activeSolution === "locker"}
            className={`product-toggle-btn${
              activeSolution === "locker" ? " active" : ""
            }`}
            onClick={() => onChangeSolution("locker")}
          >
            {activeSolution === "locker" && (
              <motion.span
                layoutId="solution-tab-pill"
                className="product-toggle-slider"
                transition={SPRING}
                aria-hidden="true"
              />
            )}
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <rect x="3" y="3" width="18" height="18" rx="2" />
              <line x1="9" y1="3" x2="9" y2="21" />
              <line x1="15" y1="3" x2="15" y2="21" />
              <line x1="3" y1="12" x2="21" y2="12" />
            </svg>
            <span>{copy.toggle_locker}</span>
          </button>
        </div>
      </div>

      <div
        className="solution-card"
        id="solutionPanel"
        role="tabpanel"
        aria-labelledby={activeSolution === "counter" ? "tabCounter" : "tabLocker"}
      >
        <div className="solution-content">
          <AnimatePresence mode="wait">
            <motion.div
              key={`${activeSolution}-${lang}`}
              initial={reduced ? false : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduced ? undefined : { opacity: 0, y: -8 }}
              transition={{ duration: 0.25, ease: EASE }}
            >
              <h3>{solCopy.heading}</h3>
              <p className="solution-desc">{solCopy.desc}</p>

              <ul className="solution-bullets">
                {solCopy.bullets.map((bullet) => (
                  <li key={bullet}>
                    <span className="solution-check" aria-hidden="true">
                      <svg
                        width="12"
                        height="12"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </span>
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </AnimatePresence>

          <div className="solution-actions">
            <motion.a
              className="button"
              href="#kontakt"
              whileHover={reduced ? undefined : { y: -1 }}
              whileTap={reduced ? undefined : { scale: 0.98 }}
              onClick={(e) => {
                e.preventDefault();
                onSelectCta(activeSolution);
              }}
            >
              {solCopy.cta}
            </motion.a>
            <button
              type="button"
              className="button outline-dark"
              onClick={() =>
                onChangeSolution(
                  activeSolution === "counter" ? "locker" : "counter"
                )
              }
            >
              {solCopy.switchLabel}
            </button>
          </div>
        </div>

        <div className="solution-media">
          {/* Static grounded image — no scale, zoom, or floating */}
          <img src={data.img} alt={solCopy.alt} loading="lazy" />
        </div>
      </div>
    </section>
  );
}
