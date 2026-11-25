"use client";

import { useState } from "react";
import { HOME_CONTENT, ProcessStepItem } from "@/data/content";
import type { Lang } from "@/lib/seo";
import { HowItWorksScrub } from "./HowItWorksScrub";
import { FadeUp, StaggerGrid, StaggerItem } from "./MotionPrimitives";

interface ProcessSectionProps {
  lang: Lang;
  title?: string;
  steps?: ProcessStepItem[];
  showHowItWorks?: boolean;
}

export function ProcessSection({
  lang,
  title,
  steps,
  showHowItWorks = false,
}: ProcessSectionProps) {
  const [activeStep, setActiveStep] = useState<number>(1);
  const defaults = HOME_CONTENT[lang].process;
  const heading = title ?? defaults.title;
  const list = steps ?? defaults.steps;

  return (
    <section className="wrap section" id="so-funktionierts">
      {showHowItWorks && <HowItWorksScrub lang={lang} />}

      <FadeUp
        className={
          showHowItWorks
            ? "section-head-single process-onboarding-head"
            : "section-head-single"
        }
      >
        <h2>{heading}</h2>
      </FadeUp>

      <StaggerGrid className="steps-grid" id="stepper">
        {list.map((step) => {
          const isActive = activeStep === step.step;
          return (
            <StaggerItem key={step.step}>
              <div
                className={`step-card${isActive ? " active" : ""}`}
                data-step={step.step}
                role="button"
                tabIndex={0}
                onClick={() => setActiveStep(step.step)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setActiveStep(step.step);
                  }
                }}
              >
                <div className="step-media">
                  <img
                    src={step.img}
                    alt={step.alt}
                    width={step.width}
                    height={step.height}
                    loading="lazy"
                  />
                </div>
                <div className="step-body">
                  <h3>{step.title}</h3>
                  <p>{step.desc}</p>
                </div>
              </div>
            </StaggerItem>
          );
        })}
      </StaggerGrid>
    </section>
  );
}
