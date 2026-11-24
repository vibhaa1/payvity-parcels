"use client";

import type { InterestOption } from "@/data/content";
import type { Lang } from "@/lib/seo";
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
    <OnboardingWizard
      lang={lang}
      selectedInterest={selectedInterest}
      defaultInterest={defaultInterest}
      onChangeInterest={onChangeInterest}
    />
  );
}
