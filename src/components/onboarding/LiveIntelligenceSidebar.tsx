"use client";

import type { OnboardingLocaleCopy } from "@/data/onboardingContent";
import { CONTACT_LANGUAGES } from "@/data/onboardingContent";
import type { InterestOption } from "@/data/content";
import type { ContactLanguageCode, LegalForm } from "@/lib/onboardingUtils";
import { CONTACT_EMAIL, Lang } from "@/lib/seo";

interface LiveIntelligenceSidebarProps {
  lang: Lang;
  copy: OnboardingLocaleCopy;
  currentStepMeta: OnboardingLocaleCopy["steps"][number];
  readinessPct: number;
  interest: InterestOption;
  legalForm: LegalForm;
  contactLanguage: ContactLanguageCode;
  postalCode: string;
  city: string;
  state: string;
  uploadedCount: number;
  totalDocCount: number;
  deferDocs: boolean;
  openDays: number;
  weeklyHours: number;
}

export function LiveIntelligenceSidebar({
  lang,
  copy,
  currentStepMeta,
  readinessPct,
  interest,
  legalForm,
  contactLanguage,
  postalCode,
  city,
  state,
  uploadedCount,
  totalDocCount,
  deferDocs,
  openDays,
  weeklyHours,
}: LiveIntelligenceSidebarProps) {
  const radius = 32;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset =
    circumference - (Math.min(100, Math.max(0, readinessPct)) / 100) * circumference;

  const langObj = CONTACT_LANGUAGES.find((l) => l.code === contactLanguage);
  const langDisplay = langObj
    ? `${langObj.badge} · ${langObj.nativeLabel}`
    : contactLanguage.toUpperCase();

  const legalDisplay =
    legalForm === "einzelunternehmen"
      ? copy.step1.einzelTitle
      : copy.step1.gesellschaftTitle;

  const locationDisplay =
    postalCode || city
      ? [postalCode, city].filter(Boolean).join(" ") +
        (state ? `, ${state}` : "")
      : copy.sidebar.notSet;

  const docsDisplay = deferDocs
    ? lang === "de"
      ? "Nach Gespräch"
      : "After call"
    : `${uploadedCount} / ${totalDocCount}`;

  const hoursDisplay = `${openDays}d · ${weeklyHours} ${lang === "de" ? "Std." : "hrs"}`;

  return (
    <aside className="sidebar-panel" aria-label={copy.sidebar.dossierTitle}>
      <div className="sidebar-card">
        <div className="sidebar-readiness">
          <div className="readiness-ring-wrap">
            <svg
              className="readiness-ring"
              width="78"
              height="78"
              viewBox="0 0 78 78"
              aria-hidden="true"
            >
              <circle
                cx="39"
                cy="39"
                r={radius}
                className="readiness-ring-bg"
                strokeWidth="6"
                fill="none"
              />
              <circle
                cx="39"
                cy="39"
                r={radius}
                className="readiness-ring-fg"
                strokeWidth="6"
                fill="none"
                strokeLinecap="round"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                transform="rotate(-90 39 39)"
              />
            </svg>
            <span className="readiness-pct">{readinessPct}%</span>
          </div>
          <div>
            <span className="sidebar-kicker">{copy.sidebar.readinessTitle}</span>
            <h4>{copy.sidebar.dossierTitle}</h4>
          </div>
        </div>

        <dl className="telemetry-list">
          <div className="telemetry-row">
            <dt>{copy.sidebar.programLabel}</dt>
            <dd>{interest}</dd>
          </div>
          <div className="telemetry-row">
            <dt>{copy.sidebar.legalFormLabel}</dt>
            <dd>{legalDisplay}</dd>
          </div>
          <div className="telemetry-row">
            <dt>{copy.sidebar.languageLabel}</dt>
            <dd>{langDisplay}</dd>
          </div>
          <div className="telemetry-row">
            <dt>{copy.sidebar.locationLabel}</dt>
            <dd>{locationDisplay}</dd>
          </div>
          <div className="telemetry-row">
            <dt>{copy.sidebar.docsLabel}</dt>
            <dd>{docsDisplay}</dd>
          </div>
          <div className="telemetry-row">
            <dt>{copy.sidebar.hoursLabel}</dt>
            <dd>{hoursDisplay}</dd>
          </div>
        </dl>
      </div>

      <div className="sidebar-card sidebar-guide">
        <span className="sidebar-kicker">
          Step {String(currentStepMeta.number).padStart(2, "0")}
        </span>
        <h4>{currentStepMeta.title}</h4>
        <p>{currentStepMeta.whyWeAsk}</p>
        {currentStepMeta.tips.length > 0 && (
          <ul className="sidebar-tips">
            {currentStepMeta.tips.map((tip) => (
              <li key={tip}>{tip}</li>
            ))}
          </ul>
        )}
      </div>

      <div className="sidebar-card sidebar-support">
        <h4>{copy.sidebar.supportTitle}</h4>
        <p>{copy.sidebar.supportDesc}</p>
        <a className="sidebar-mail" href={`mailto:${CONTACT_EMAIL}`}>
          {CONTACT_EMAIL}
        </a>
        <p className="sidebar-langs">{copy.sidebar.supportLangLine}</p>
      </div>
    </aside>
  );
}
