"use client";

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
  return (
    <div className="wizard-stepper-wrap">
      <ol className="wizard-stepper">
        {steps.map((step) => {
          const isActive = step.number === currentStep;
          const isDone = step.number < currentStep;
          const canJump =
            step.number <= maxVisitedStep || step.number <= currentStep + 1;

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
                  ) : (
                    <span>{step.number}</span>
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
