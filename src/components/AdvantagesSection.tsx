"use client";

import { AdvantageCardItem, HOME_CONTENT } from "@/data/content";
import type { Lang } from "@/lib/seo";
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
    case "app":
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
          <rect
            x="6"
            y="2.5"
            width="12"
            height="19"
            rx="2.5"
            stroke="currentColor"
            strokeWidth="1.8"
          />
          <path
            d="M9.5 11.5l1.8 1.8 3.7-3.8"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
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
  const data = HOME_CONTENT[lang].advantages;

  return (
    <section className="wrap section" id="vorteile">
      <FadeUp className="section-head-split">
        <div>
          <h2>{data.title}</h2>
        </div>
        <p className="section-lead">{data.lead}</p>
      </FadeUp>

      <StaggerGrid className="cards" id="advantageCards">
        {data.cards.map((item) => (
          <StaggerItem key={item.id}>
            <div className="card">
              <div className="card-top">
                <span className="card-icon" aria-hidden="true">
                  <CardIcon type={item.icon} />
                </span>
              </div>
              <h3>{item.title}</h3>
              <p>{item.desc}</p>
            </div>
          </StaggerItem>
        ))}
      </StaggerGrid>
    </section>
  );
}
