"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { OnboardingLocaleCopy } from "@/data/onboardingContent";

interface StepIndicatorProps {
  steps: OnboardingLocaleCopy["steps"];
  currentStep: number;
  maxVisitedStep: number;
  onSelectStep: (stepNumber: number) => void;
}

export function StepIndicator({
  steps,
  currentStep,
  maxVisitedStep,
  onSelectStep,
}: StepIndicatorProps) {
  const reduced = useReducedMotion();
  const progressPct = ((currentStep - 1) / (steps.length - 1)) * 100;

  return (
    <div className="wizard-stepper-wrap">
      <div className="wizard-progress-track" aria-hidden="true">
        <motion.div
          className="wizard-progress-fill"
          initial={false}
          animate={{ width: `${progressPct}%` }}
          transition={
            reduced ? { duration: 0 } : { duration: 0.35, ease: [0.19, 1, 0.22, 1] }
          }
        />
      </div>

      <ol className="wizard-stepper">
        {steps.map((step) => {
          const isActive = step.number === currentStep;
          const isDone = step.number < currentStep;
          const canJump = step.number <= maxVisitedStep || step.number <= currentStep + 1;

          return (
            <li key={step.number}>
              <button
                type="button"
                className={`wizard-step-btn${isActive ? " is-active" : ""}${
                  isDone ? " is-done" : ""
                }`}
                aria-current={isActive ? "step" : undefined}
                disabled={!canJump}
                onClick={() => onSelectStep(step.number)}
              >
                <span className="wizard-step-dot" aria-hidden="true">
                  {isDone ? (
                    <svg
                      width="13"
                      height="13"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  ) : (
                    <span>{String(step.number).padStart(2, "0")}</span>
                  )}
                </span>
                <span className="wizard-step-label">{step.shortTitle}</span>
              </button>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
