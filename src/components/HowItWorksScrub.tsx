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
    width: 24,
    height: 24,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.75,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true as const,
  };

  switch (icon) {
    case "app":
      return (
        <svg {...svgProps}>
          <rect
            x="6"
            y="2.25"
            width="12"
            height="19.5"
            rx="2.75"
            fill="currentColor"
            fillOpacity="0.1"
          />
          <path d="M10 5.25h4" />
          <rect x="8.5" y="7.5" width="7" height="7.5" rx="1.2" />
          <path d="M10.5 18.25h3" />
        </svg>
      );
    case "select":
      return (
        <svg {...svgProps}>
          <rect
            x="3"
            y="4"
            width="14"
            height="4"
            rx="1.25"
            fill="currentColor"
            fillOpacity="0.14"
          />
          <path d="M3 12h7.5" />
          <path d="M3 16h5.5" />
          <path
            d="m12.5 10.5 8 3.6-3.4 1.3-1.4 3.4-3.2-8.3Z"
            fill="currentColor"
            fillOpacity="0.18"
          />
        </svg>
      );
    case "code":
      return (
        <svg {...svgProps}>
          <path d="M4 8V5.5A1.5 1.5 0 0 1 5.5 4H8" />
          <path d="M16 4h2.5A1.5 1.5 0 0 1 20 5.5V8" />
          <path d="M20 16v2.5a1.5 1.5 0 0 1-1.5 1.5H16" />
          <path d="M8 20H5.5A1.5 1.5 0 0 1 4 18.5V16" />
          <path d="M7.5 8.5v7" />
          <path d="M10.5 8.5v7" />
          <path d="M13.5 8.5v7" />
          <path d="M16.5 8.5v7" />
          <path d="M3.5 12h17" />
        </svg>
      );
    case "parcel":
      return (
        <svg {...svgProps}>
          <path
            d="M12 2.75 4 7.25v9.5l8 4.5 8-4.5v-9.5l-8-4.5Z"
            fill="currentColor"
            fillOpacity="0.1"
          />
          <path d="m4 7.25 8 4.5 8-4.5" />
          <path d="M12 11.75v9.5" />
          <path d="m8 5 8 4.5" />
          <rect
            x="14.5"
            y="12.5"
            width="3.5"
            height="2.5"
            rx="0.5"
            fill="currentColor"
            fillOpacity="0.2"
          />
        </svg>
      );
    case "done":
      return (
        <svg {...svgProps}>
          <circle
            cx="12"
            cy="12"
            r="8.5"
            fill="currentColor"
            fillOpacity="0.14"
          />
          <path d="m8.25 12.25 2.5 2.5 5-5.25" />
          <path d="M19 4.5v1.5M20.5 6H19M5 17.5V19M3.5 19H5" />
        </svg>
      );
  }
}

function computeRailPercent(
  frameFloat: number,
  steps: HowItWorksStepItem[],
  nodePercents: number[]
): number {
  const count = steps.length;
  if (count <= 1) return 100;

  const getAnchor = (idx: number) =>
    nodePercents.length === count
      ? nodePercents[idx]
      : (idx / (count - 1)) * 100;

  if (frameFloat <= steps[0].startFrame) return getAnchor(0);
  const lastIndex = count - 1;
  if (frameFloat >= steps[lastIndex].startFrame) return getAnchor(lastIndex);

  for (let i = 0; i < lastIndex; i++) {
    const start = steps[i].startFrame;
    const nextStart = steps[i + 1].startFrame;
    if (frameFloat >= start && frameFloat <= nextStart) {
      const span = Math.max(1, nextStart - start);
      const local = (frameFloat - start) / span;
      const fromPct = getAnchor(i);
      const toPct = getAnchor(i + 1);
      return Math.min(100, Math.max(0, fromPct + local * (toPct - fromPct)));
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
  const timelineRef = useRef<HTMLDivElement | null>(null);
  const railRef = useRef<HTMLDivElement | null>(null);
  const railFillRef = useRef<HTMLDivElement | null>(null);
  const railDotRef = useRef<HTMLSpanElement | null>(null);
  const nodeRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const nodePercentsRef = useRef<number[]>([]);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const imagesRef = useRef<Array<HTMLImageElement | null>>([]);
  const loadStartedRef = useRef(false);
  const lastDrawnRef = useRef(-1);

  const targetProgressRef = useRef(0);
  const displayProgressRef = useRef(0);
  const rafRef = useRef<number | null>(null);

  const applyRailVisual = useCallback((pct: number) => {
    const clamped = Math.min(100, Math.max(0, pct));
    if (railFillRef.current) {
      railFillRef.current.style.height = `${clamped}%`;
    }
    if (railDotRef.current) {
      railDotRef.current.style.opacity =
        clamped > 0.8 && clamped < 99.2 ? "1" : "0";
    }
  }, []);

  const measureRail = useCallback(() => {
    const timelineEl = timelineRef.current;
    const railEl = railRef.current;
    if (!timelineEl || !railEl || steps.length < 2) return;

    const timelineRect = timelineEl.getBoundingClientRect();
    const centers: number[] = [];
    for (let i = 0; i < steps.length; i++) {
      const el = nodeRefs.current[i];
      if (!el) return;
      const rect = el.getBoundingClientRect();
      centers.push(rect.top + rect.height / 2 - timelineRect.top);
    }

    const first = centers[0];
    const last = centers[centers.length - 1];
    if (last <= first) return;

    railEl.style.top = `${first}px`;
    railEl.style.height = `${last - first}px`;
    nodePercentsRef.current = centers.map(
      (c) => ((c - first) / (last - first)) * 100
    );
  }, [steps.length]);

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
    measureRail();
    const timelineEl = timelineRef.current;
    let resizeObserver: ResizeObserver | null = null;
    if (timelineEl && typeof ResizeObserver !== "undefined") {
      resizeObserver = new ResizeObserver(() => {
        measureRail();
      });
      resizeObserver.observe(timelineEl);
    }
    window.addEventListener("resize", measureRail, { passive: true });
    return () => {
      window.removeEventListener("resize", measureRail);
      resizeObserver?.disconnect();
    };
  }, [measureRail]);

  useEffect(() => {
    const syncToProgress = (progress: number) => {
      const frameFloat = progress * (TOTAL_FRAMES - 1);
      const frameIndex = Math.round(frameFloat);

      if (frameIndex !== lastDrawnRef.current) {
        drawFrame(frameIndex);
      }

      applyRailVisual(
        computeRailPercent(frameFloat, steps, nodePercentsRef.current)
      );

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

      displayProgressRef.current += diff * 0.28;
      syncToProgress(displayProgressRef.current);
      rafRef.current = window.requestAnimationFrame(tick);
    };

    const updateTargetFromScroll = () => {
      const trackEl = trackRef.current;
      if (!trackEl) return;

      measureRail();

      if (reduced || window.innerWidth <= 960) {
        if (rafRef.current !== null) {
          window.cancelAnimationFrame(rafRef.current);
          rafRef.current = null;
        }
        const rep = steps[activeStepRef.current]?.representativeFrame ?? 0;
        drawFrame(rep);
        const pct =
          nodePercentsRef.current[activeStepRef.current] ??
          (steps.length > 1
            ? (activeStepRef.current / (steps.length - 1)) * 100
            : 100);
        applyRailVisual(pct);
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
  }, [applyRailVisual, drawFrame, measureRail, reduced, steps]);

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
    const pct =
      nodePercentsRef.current[idx] ??
      (steps.length > 1 ? (idx / (steps.length - 1)) * 100 : 100);
    applyRailVisual(pct);
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
            <div
              className="hiw-timeline"
              ref={timelineRef}
              role="list"
              aria-label={data.title}
            >
              <div className="hiw-rail" ref={railRef} aria-hidden="true">
                <div className="hiw-rail-track" />
                <div className="hiw-rail-fill" ref={railFillRef}>
                  <span className="hiw-rail-dot" ref={railDotRef} />
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
                      ref={(el) => {
                        nodeRefs.current[idx] = el;
                      }}
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
