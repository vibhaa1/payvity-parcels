"use client";

import type { InterestOption } from "@/data/content";
import type { Lang } from "@/lib/seo";
import { ContactPickerCard } from "./ContactPickerCard";
import { OnboardingWizard } from "./onboarding/OnboardingWizard";

interface FinalCtaSectionProps {
  lang: Lang;
  selectedInterest?: InterestOption;
  defaultInterest?: InterestOption;
  onChangeInterest?: (interest: InterestOption) => void;
}

export function FinalCtaSection({
  lang,
  selectedInterest,
  defaultInterest = "Amazon Paketshop",
  onChangeInterest,
}: FinalCtaSectionProps) {
  return (
    <section className="wrap section" id="kontakt" style={{ paddingTop: "16px" }}>
      <div className="contact-split">
        <aside className="contact-picker-aside">
          <ContactPickerCard lang={lang} />
        </aside>
        <div className="contact-wizard-col">
          <OnboardingWizard
            lang={lang}
            selectedInterest={selectedInterest}
            defaultInterest={defaultInterest}
            onChangeInterest={onChangeInterest}
          />
        </div>
      </div>
    </section>
  );
}
