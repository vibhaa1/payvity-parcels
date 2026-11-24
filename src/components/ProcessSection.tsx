"use client";

import { useState } from "react";
import { I18N, Lang, PROCESS_STEPS } from "@/data/content";
import { FadeUp, StaggerGrid, StaggerItem } from "./MotionPrimitives";

export function ProcessSection({ lang }: { lang: Lang }) {
  const [activeStep, setActiveStep] = useState<number>(1);
  const copy = I18N[lang];

  return (
    <section className="wrap section" id="so-funktionierts">
      <FadeUp className="section-head-split">
        <div>
          <h2>{copy.proc_title}</h2>
        </div>
        <p className="section-lead">{copy.proc_lead}</p>
      </FadeUp>

      <StaggerGrid className="steps-grid" id="stepper">
        {PROCESS_STEPS.map((step) => {
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
                  {/* Static illustration — anchored in surface container */}
                  <img src={step.img} alt={step.alt[lang]} loading="lazy" />
                </div>
                <div className="step-body">
                  <h3>{copy[step.titleKey]}</h3>
                  <p>{copy[step.descKey]}</p>
                </div>
              </div>
            </StaggerItem>
          );
        })}
      </StaggerGrid>
    </section>
  );
}
