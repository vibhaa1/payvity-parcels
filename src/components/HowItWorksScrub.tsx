"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import {
  HOME_CONTENT,
  HowItWorksIconKey,
  HowItWorksStepItem,
} from "@/data/content";
import type { Lang } from "@/lib/seo";
import { FadeUp } from "./MotionPrimitives";

const TOTAL_FRAMES = 150;

function frameSrc(index: number): string {
  const clamped = Math.min(TOTAL_FRAMES - 1, Math.max(0, index));
  return `/scroll/frames/frame_${String(clamped + 1).padStart(4, "0")}.jpg`;
}

function StepIcon({ icon }: { icon: HowItWorksIconKey }) {
  const svgProps = {
    width: 18,
    height: 18,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.8,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true as const,
  };

  switch (icon) {
    case "app":
      return (
        <svg {...svgProps}>
          <rect x="6" y="2.5" width="12" height="19" rx="2.5" />
          <path d="M10.5 18.5h3" />
        </svg>
      );
    case "select":
      return (
        <svg {...svgProps}>
          <path d="M5.5 4.5 19 10.5l-5.6 1.9L11.5 18 5.5 4.5Z" />
          <path d="m13.4 12.4 4.6 4.6" />
        </svg>
      );
    case "code":
      return (
        <svg {...svgProps}>
          <path d="M4 8V5.5A1.5 1.5 0 0 1 5.5 4H8" />
          <path d="M16 4h2.5A1.5 1.5 0 0 1 20 5.5V8" />
          <path d="M20 16v2.5a1.5 1.5 0 0 1-1.5 1.5H16" />
          <path d="M8 20H5.5A1.5 1.5 0 0 1 4 18.5V16" />
          <path d="M4 12h16" />
        </svg>
      );
    case "parcel":
      return (
        <svg {...svgProps}>
          <path d="M12 3 4.5 7.2v9.6L12 21l7.5-4.2V7.2L12 3Z" />
          <path d="M4.5 7.2 12 11.4l7.5-4.2" />
          <path d="M12 11.4V21" />
        </svg>
      );
    case "done":
      return (
        <svg {...svgProps}>
          <circle cx="12" cy="12" r="9" />
          <path d="m8.5 12.3 2.4 2.4 4.8-5" />
        </svg>
      );
  }
}

function computeRailPercent(
  frameFloat: number,
  steps: HowItWorksStepItem[]
): number {
  const count = steps.length;
  if (count <= 1) return 100;

  if (frameFloat <= steps[0].startFrame) return 0;
  const lastIndex = count - 1;
  if (frameFloat >= steps[lastIndex].startFrame) return 100;

  for (let i = 0; i < lastIndex; i++) {
    const start = steps[i].startFrame;
    const nextStart = steps[i + 1].startFrame;
    if (frameFloat >= start && frameFloat <= nextStart) {
      const span = Math.max(1, nextStart - start);
      const local = (frameFloat - start) / span;
      return ((i + local) / lastIndex) * 100;
    }
  }

  return 100;
}

function findStepIndex(
  frameIndex: number,
  steps: HowItWorksStepItem[]
): number {
  for (let i = 0; i < steps.length; i++) {
    if (frameIndex >= steps[i].startFrame && frameIndex <= steps[i].endFrame) {
      return i;
    }
  }
  return Math.max(0, steps.length - 1);
}

export function HowItWorksScrub({ lang }: { lang: Lang }) {
  const data = HOME_CONTENT[lang].howItWorks;
  const steps = data.steps;
  const reduced = useReducedMotion();

  const [activeStepIndex, setActiveStepIndex] = useState(0);
  const activeStepRef = useRef(0);

  const trackRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const railFillRef = useRef<HTMLDivElement | null>(null);

  const imagesRef = useRef<Array<HTMLImageElement | null>>([]);
  const loadStartedRef = useRef(false);
  const lastDrawnRef = useRef(-1);

  const targetProgressRef = useRef(0);
  const displayProgressRef = useRef(0);
  const rafRef = useRef<number | null>(null);

  const drawFrame = useCallback((targetIndex: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const images = imagesRef.current;
    let img: HTMLImageElement | null = images[targetIndex] ?? null;
    if (!img || !img.complete || img.naturalWidth === 0) {
      img = null;
      for (let d = 1; d < TOTAL_FRAMES; d++) {
        const left = targetIndex - d;
        const right = targetIndex + d;
        const leftImg = left >= 0 ? images[left] : null;
        if (leftImg && leftImg.complete && leftImg.naturalWidth > 0) {
          img = leftImg;
          break;
        }
        const rightImg = right < TOTAL_FRAMES ? images[right] : null;
        if (rightImg && rightImg.complete && rightImg.naturalWidth > 0) {
          img = rightImg;
          break;
        }
      }
    }

    if (!img) return;
    if (
      canvas.width !== img.naturalWidth ||
      canvas.height !== img.naturalHeight
    ) {
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;
    }
    ctx.drawImage(img, 0, 0);
    lastDrawnRef.current = targetIndex;
  }, []);

  const loadFrame = useCallback(
    (index: number, onReady?: () => void) => {
      if (index < 0 || index >= TOTAL_FRAMES) return;
      const existing = imagesRef.current[index];
      if (existing) {
        if (existing.complete && existing.naturalWidth > 0) {
          onReady?.();
        }
        return;
      }

      const img = new Image();
      img.decoding = "async";
      img.onload = () => {
        if (lastDrawnRef.current === -1 || index === lastDrawnRef.current) {
          drawFrame(lastDrawnRef.current === -1 ? index : lastDrawnRef.current);
        }
        onReady?.();
      };
      img.src = frameSrc(index);
      imagesRef.current[index] = img;
    },
    [drawFrame]
  );

  const startProgressivePreload = useCallback(() => {
    if (loadStartedRef.current) return;
    loadStartedRef.current = true;

    for (let i = 0; i < TOTAL_FRAMES; i += 4) {
      loadFrame(i);
    }
    for (let i = 0; i < TOTAL_FRAMES; i++) {
      if (i % 4 !== 0) {
        loadFrame(i);
      }
    }
  }, [loadFrame]);

  useEffect(() => {
    if (imagesRef.current.length !== TOTAL_FRAMES) {
      imagesRef.current = new Array<HTMLImageElement | null>(TOTAL_FRAMES).fill(
        null
      );
    }

    loadFrame(0, () => {
      if (lastDrawnRef.current === -1) {
        drawFrame(0);
      }
    });
    steps.forEach((step) => {
      loadFrame(step.representativeFrame);
    });

    const trackEl = trackRef.current;
    if (!trackEl || typeof IntersectionObserver === "undefined") {
      startProgressivePreload();
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          startProgressivePreload();
          observer.disconnect();
        }
      },
      { rootMargin: "700px 0px" }
    );
    observer.observe(trackEl);
    return () => observer.disconnect();
  }, [drawFrame, loadFrame, startProgressivePreload, steps]);

  useEffect(() => {
    const syncToProgress = (progress: number) => {
      const frameFloat = progress * (TOTAL_FRAMES - 1);
      const frameIndex = Math.round(frameFloat);

      if (frameIndex !== lastDrawnRef.current) {
        drawFrame(frameIndex);
      }

      if (railFillRef.current) {
        railFillRef.current.style.height = `${computeRailPercent(
          frameFloat,
          steps
        )}%`;
      }

      const nextStep = findStepIndex(frameIndex, steps);
      if (nextStep !== activeStepRef.current) {
        activeStepRef.current = nextStep;
        setActiveStepIndex(nextStep);
      }
    };

    const tick = () => {
      const diff = targetProgressRef.current - displayProgressRef.current;
      if (Math.abs(diff) < 0.0004) {
        displayProgressRef.current = targetProgressRef.current;
        syncToProgress(displayProgressRef.current);
        rafRef.current = null;
        return;
      }

      displayProgressRef.current += diff * 0.16;
      syncToProgress(displayProgressRef.current);
      rafRef.current = window.requestAnimationFrame(tick);
    };

    const updateTargetFromScroll = () => {
      const trackEl = trackRef.current;
      if (!trackEl) return;

      if (reduced || window.innerWidth <= 960) {
        if (rafRef.current !== null) {
          window.cancelAnimationFrame(rafRef.current);
          rafRef.current = null;
        }
        const rep = steps[activeStepRef.current]?.representativeFrame ?? 0;
        drawFrame(rep);
        if (railFillRef.current) {
          const pct =
            steps.length > 1
              ? (activeStepRef.current / (steps.length - 1)) * 100
              : 100;
          railFillRef.current.style.height = `${pct}%`;
        }
        return;
      }

      const rect = trackEl.getBoundingClientRect();
      const scrollable = Math.max(1, trackEl.offsetHeight - window.innerHeight);
      const raw = Math.min(1, Math.max(0, -rect.top / scrollable));
      targetProgressRef.current = raw;

      if (rafRef.current === null) {
        rafRef.current = window.requestAnimationFrame(tick);
      }
    };

    updateTargetFromScroll();
    window.addEventListener("scroll", updateTargetFromScroll, { passive: true });
    window.addEventListener("resize", updateTargetFromScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", updateTargetFromScroll);
      window.removeEventListener("resize", updateTargetFromScroll);
      if (rafRef.current !== null) {
        window.cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
    };
  }, [drawFrame, reduced, steps]);

  const handleStepClick = (idx: number) => {
    const targetStep = steps[idx];
    if (!targetStep) return;

    if (!reduced && typeof window !== "undefined" && window.innerWidth > 960) {
      const trackEl = trackRef.current;
      if (trackEl) {
        const trackTop =
          window.scrollY + trackEl.getBoundingClientRect().top;
        const scrollable = Math.max(
          1,
          trackEl.offsetHeight - window.innerHeight
        );
        const progress = targetStep.representativeFrame / (TOTAL_FRAMES - 1);
        window.scrollTo({
          top: trackTop + progress * scrollable,
          behavior: "smooth",
        });
        return;
      }
    }

    activeStepRef.current = idx;
    setActiveStepIndex(idx);
    loadFrame(targetStep.representativeFrame, () =>
      drawFrame(targetStep.representativeFrame)
    );
    drawFrame(targetStep.representativeFrame);
    if (railFillRef.current) {
      const pct = steps.length > 1 ? (idx / (steps.length - 1)) * 100 : 100;
      railFillRef.current.style.height = `${pct}%`;
    }
  };

  return (
    <div className="hiw-wrap">
      <FadeUp className="hiw-head">
        <h2>{data.title}</h2>
        <p className="section-lead">{data.lead}</p>
      </FadeUp>

      <div className="hiw-scroll-track" ref={trackRef}>
        <div className="hiw-sticky-stage">
          <div className="hiw-timeline-col">
            <div className="hiw-timeline" role="list" aria-label={data.title}>
              <div className="hiw-rail" aria-hidden="true">
                <div className="hiw-rail-track" />
                <div className="hiw-rail-fill" ref={railFillRef}>
                  <span className="hiw-rail-dot" />
                </div>
              </div>

              {steps.map((step, idx) => {
                const status =
                  idx < activeStepIndex
                    ? "done"
                    : idx === activeStepIndex
                      ? "active"
                      : "upcoming";

                const card = (
                  <button
                    type="button"
                    className="hiw-step-card"
                    onClick={() => handleStepClick(idx)}
                  >
                    <h3>{step.title}</h3>
                    <p>{step.desc}</p>
                  </button>
                );

                return (
                  <div
                    key={step.id}
                    role="listitem"
                    className={`hiw-step-row hiw-step-row--${step.side} is-${status}`}
                  >
                    {step.side === "left" ? (
                      card
                    ) : (
                      <div className="hiw-step-spacer" aria-hidden="true" />
                    )}

                    <button
                      type="button"
                      className="hiw-step-node"
                      aria-label={step.title}
                      aria-current={status === "active" ? "step" : undefined}
                      onClick={() => handleStepClick(idx)}
                    >
                      <StepIcon icon={step.icon} />
                    </button>

                    {step.side === "right" ? (
                      card
                    ) : (
                      <div className="hiw-step-spacer" aria-hidden="true" />
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          <div className="hiw-media-col">
            <canvas
              ref={canvasRef}
              className="hiw-canvas"
              aria-label={steps[activeStepIndex]?.title ?? data.title}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
