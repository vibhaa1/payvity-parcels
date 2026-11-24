"use client";

import { ADVANTAGES, AdvantageCardItem, I18N, Lang } from "@/data/content";
import { FadeUp, StaggerGrid, StaggerItem } from "./MotionPrimitives";

function CardIcon({ type }: { type: AdvantageCardItem["icon"] }) {
  switch (type) {
    case "box":
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
          <path
            d="M4 17V7l8-4 8 4v10l-8 4-8-4Z"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinejoin="round"
          />
          <path d="M4 7l8 4 8-4M12 11v10" stroke="currentColor" strokeWidth="1.8" />
        </svg>
      );
    case "users":
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
          <path
            d="M4 20c1.6-4 4.4-6 8-6s6.4 2 8 6"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
          <circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth="1.8" />
        </svg>
      );
    case "space":
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
          <rect
            x="4"
            y="4"
            width="16"
            height="16"
            rx="2"
            stroke="currentColor"
            strokeWidth="1.8"
          />
          <path d="M4 14h16" stroke="currentColor" strokeWidth="1.8" />
        </svg>
      );
    case "network":
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
          <circle cx="7" cy="7" r="3" stroke="currentColor" strokeWidth="1.8" />
          <circle cx="17" cy="7" r="3" stroke="currentColor" strokeWidth="1.8" />
          <path
            d="M2 20c0-3 2.5-5 5-5s5 2 5 5M12 20c0-3 2.5-5 5-5s5 2 5 5"
            stroke="currentColor"
            strokeWidth="1.8"
          />
        </svg>
      );
  }
}

export function AdvantagesSection({ lang }: { lang: Lang }) {
  const copy = I18N[lang];

  return (
    <section className="wrap section" id="warum-uns">
      <FadeUp className="section-head-split">
        <div>
          <h2>{copy.why_title}</h2>
        </div>
        <p className="section-lead">{copy.why_lead}</p>
      </FadeUp>

      <StaggerGrid className="cards" id="advantageCards">
        {ADVANTAGES.map((item) => (
          <StaggerItem key={item.id}>
            <div className="card">
              <div className="card-top">
                <span className="card-icon" aria-hidden="true">
                  <CardIcon type={item.icon} />
                </span>
              </div>
              <h3>{copy[item.titleKey]}</h3>
              <p>{copy[item.descKey]}</p>
            </div>
          </StaggerItem>
        ))}
      </StaggerGrid>
    </section>
  );
}
