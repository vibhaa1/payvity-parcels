"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { HOME_CONTENT, InterestOption } from "@/data/content";
import { Lang, localizedPath } from "@/lib/seo";
import { FadeUp } from "./MotionPrimitives";
import { VerticalMarquee } from "./VerticalMarquee";

interface PaketshopSectionProps {
  lang: Lang;
  onSelectCta?: (interest: InterestOption) => void;
}

const BANNER_REPEATS = [0, 1, 2, 3] as const;

export function PaketshopSection({ lang, onSelectCta }: PaketshopSectionProps) {
  const reduced = useReducedMotion();
  const data = HOME_CONTENT[lang].paketshop;
  const lockerHref = localizedPath(lang, "/amazon-locker/");

  return (
    <section className="wrap section" id="paketshop">
      <FadeUp className="section-head-single">
        <h2>{data.title}</h2>
      </FadeUp>

      <div className="paketshop-card">
        <div className="paketshop-rotating-banner">
          <div className="paketshop-rotating-track">
            <div className="paketshop-rotating-half">
              {BANNER_REPEATS.map((idx) => (
                <img
                  key={`a-${idx}`}
                  src={data.imageSrc}
                  alt={idx === 0 ? data.imageAlt : ""}
                  aria-hidden={idx === 0 ? undefined : true}
                  width={data.imageWidth}
                  height={data.imageHeight}
                  className="paketshop-rotating-img"
                />
              ))}
            </div>
            <div className="paketshop-rotating-half" aria-hidden="true">
              {BANNER_REPEATS.map((idx) => (
                <img
                  key={`b-${idx}`}
                  src={data.imageSrc}
                  alt=""
                  width={data.imageWidth}
                  height={data.imageHeight}
                  className="paketshop-rotating-img"
                />
              ))}
            </div>
          </div>
        </div>

        <div className="paketshop-card-body">
          <p className="paketshop-desc">{data.cardDesc}</p>

          <ul className="paketshop-bullets">
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
      </div>

      <div className="vertical-strip">
        <div className="vertical-strip-head">
          <h3>{data.verticalsHeading}</h3>
        </div>

        <VerticalMarquee
          items={data.verticals}
          ariaLabel={data.verticalsHeading}
          variant="featured"
        />
      </div>
    </section>
  );
}
