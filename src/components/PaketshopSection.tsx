"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { HOME_CONTENT, InterestOption } from "@/data/content";
import { Lang, localizedPath } from "@/lib/seo";
import { FadeUp } from "./MotionPrimitives";

interface PaketshopSectionProps {
  lang: Lang;
  onSelectCta?: (interest: InterestOption) => void;
}

export function PaketshopSection({ lang, onSelectCta }: PaketshopSectionProps) {
  const reduced = useReducedMotion();
  const data = HOME_CONTENT[lang].paketshop;
  const lockerHref = localizedPath(lang, "/amazon-locker/");

  return (
    <section className="wrap section" id="paketshop">
      <FadeUp className="section-head-split">
        <div>
          <h2>{data.title}</h2>
        </div>
        <p className="section-lead">{data.lead}</p>
      </FadeUp>

      <div className="solution-card">
        <div className="solution-content">
          <div>
            <h3>{data.cardHeading}</h3>
            <p className="solution-desc">{data.cardDesc}</p>

            <ul className="solution-bullets">
              {data.bullets.map((bullet) => (
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
          </div>

          <div className="solution-actions">
            <motion.a
              className="button"
              href="#kontakt"
              whileHover={reduced ? undefined : { y: -1 }}
              whileTap={reduced ? undefined : { scale: 0.98 }}
              onClick={(e) => {
                if (onSelectCta) {
                  e.preventDefault();
                  onSelectCta("Amazon Paketshop");
                }
              }}
            >
              {data.ctaLabel}
            </motion.a>
            <Link className="button outline-dark" href={lockerHref}>
              {data.secondaryLinkLabel}
            </Link>
          </div>
        </div>

        <div className="solution-media">
          <img
            src={data.imageSrc}
            alt={data.imageAlt}
            width={data.imageWidth}
            height={data.imageHeight}
            loading="lazy"
          />
        </div>
      </div>

      <div className="vertical-strip">
        <div className="vertical-strip-head">
          <h3>{data.verticalsHeading}</h3>
          <p>{data.verticalsLead}</p>
        </div>

        <ul className="vertical-chips">
          {data.verticals.map((sector) => (
            <li key={sector} className="vertical-chip">
              {sector}
            </li>
          ))}
        </ul>

        <p className="vertical-note">{data.multiCarrierNote}</p>
      </div>
    </section>
  );
}
