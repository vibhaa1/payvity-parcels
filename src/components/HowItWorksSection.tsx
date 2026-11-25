"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import {
  HOW_IT_WORKS_STEPS,
  HowItWorksStepItem,
  I18N,
  Lang,
} from "@/data/content";
import { EASE } from "./MotionPrimitives";

const TOTAL_FRAMES = 150;
const FRAME_WIDTH = 360;
const FRAME_HEIGHT = 640;

function getFrameSrc(index: number): string {
  const frameNumber = String(index + 1).padStart(4, "0");
  return `/scroll-frames/frame_${frameNumber}.jpg`;
}

function StepIcon({ icon }: { icon: HowItWorksStepItem["icon"] }) {
  switch (icon) {
    case "app":
      return (
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <rect x="7" y="2" width="10" height="20" rx="2.5" />
          <path d="M11 18h2" />
        </svg>
      );
    case "select":
      return (
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M8 6h13" />
          <path d="M8 12h13" />
          <path d="M8 18h13" />
          <circle cx="4" cy="6" r="1" fill="currentColor" />
          <circle cx="4" cy="12" r="1" fill="currentColor" />
          <circle cx="4" cy="18" r="1" fill="currentColor" />
        </svg>
      );
    case "code":
      return (
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M3 7V5a2 2 0 0 1 2-2h2" />
          <path d="M17 3h2a2 2 0 0 1 2 2v2" />
          <path d="M21 17v2a2 2 0 0 1-2 2h-2" />
          <path d="M7 21H5a2 2 0 0 1-2-2v-2" />
          <path d="M7 8v8" />
          <path d="M11 8v8" />
          <path d="M15 8v8" />
          <path d="M17 8v8" />
        </svg>
      );
    case "parcel":
      return (
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M12 3l8 4.5v9L12 21l-8-4.5v-9L12 3z" />
          <path d="M12 12l8-4.5" />
          <path d="M12 12v9" />
          <path d="M12 12L4 7.5" />
        </svg>
      );
    case "done":
      return (
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <circle cx="12" cy="12" r="9" />
          <path d="M8.5 12.5l2.5 2.5 4.5-5" />
        </svg>
      );
  }
}

export function HowItWorksSection({ lang }: { lang: Lang }) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const framesRef = useRef<(HTMLImageElement | null)[]>(
    Array(TOTAL_FRAMES).fill(null)
  );
  const currentFrameRef = useRef<number>(0);
  const rafRef = useRef<number | null>(null);

  const reduced = useReducedMotion();
  const [activeStep, setActiveStep] = useState<number>(0);
  const copy = I18N[lang];

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 280,
    damping: 32,
    restDelta: 0.001,
  });
  const dotTop = useTransform(smoothProgress, [0, 1], ["0%", "100%"]);

  const drawFrame = useCallback((index: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const frames = framesRef.current;
    let img = frames[index];

    if (!img || !img.complete || img.naturalWidth === 0) {
      // Fallback to nearest already-loaded frame so the canvas never flashes blank.
      for (let offset = 1; offset < TOTAL_FRAMES; offset++) {
        const prev = index - offset >= 0 ? frames[index - offset] : null;
        if (prev && prev.complete && prev.naturalWidth > 0) {
          img = prev;
          break;
        }
        const next = index + offset < TOTAL_FRAMES ? frames[index + offset] : null;
        if (next && next.complete && next.naturalWidth > 0) {
          img = next;
          break;
        }
      }
    }

    if (img && img.complete && img.naturalWidth > 0) {
      ctx.clearRect(0, 0, FRAME_WIDTH, FRAME_HEIGHT);
      ctx.drawImage(img, 0, 0, FRAME_WIDTH, FRAME_HEIGHT);
    }
  }, []);

  useEffect(() => {
    let cancelled = false;
    const frames = framesRef.current;

    const loadFrame = (idx: number) => {
      const img = new Image();
      img.decoding = "async";
      img.onload = () => {
        if (cancelled) return;
        frames[idx] = img;
        if (idx === currentFrameRef.current) {
          drawFrame(idx);
        }
      };
      img.src = getFrameSrc(idx);
    };

    // Load frame 0 first for immediate initial paint, then preload remaining frames.
    loadFrame(0);
    for (let i = 1; i < TOTAL_FRAMES; i++) {
      loadFrame(i);
    }

    return () => {
      cancelled = true;
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [drawFrame]);

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (reduced) return;

    const frameIdx = Math.min(
      TOTAL_FRAMES - 1,
      Math.max(0, Math.round(latest * (TOTAL_FRAMES - 1)))
    );

    if (frameIdx !== currentFrameRef.current) {
      currentFrameRef.current = frameIdx;
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
      }
      rafRef.current = requestAnimationFrame(() => {
        drawFrame(frameIdx);
      });
    }

    const foundIdx = HOW_IT_WORKS_STEPS.findIndex(
      (step) => frameIdx <= step.endFrame
    );
    const nextStepIdx =
      foundIdx === -1 ? HOW_IT_WORKS_STEPS.length - 1 : foundIdx;

    setActiveStep((prev) => (prev === nextStepIdx ? prev : nextStepIdx));
  });

  const handleStepSelect = (idx: number, representativeFrame: number) => {
    const section = sectionRef.current;
    if (!section) return;

    if (reduced) {
      currentFrameRef.current = representativeFrame;
      setActiveStep(idx);
      drawFrame(representativeFrame);
      return;
    }

    const rect = section.getBoundingClientRect();
    const sectionTop = window.scrollY + rect.top;
    const maxScroll = Math.max(1, section.offsetHeight - window.innerHeight);
    const progress = representativeFrame / (TOTAL_FRAMES - 1);

    window.scrollTo({
      top: sectionTop + progress * maxScroll,
      behavior: "smooth",
    });
  };

  return (
    <section
      id="how-it-works"
      ref={sectionRef}
      className="hiw-section"
      aria-labelledby="hiw-heading"
    >
      <div className="hiw-sticky">
        <div className="wrap hiw-inner">
          <div className="section-head-split hiw-head">
            <div>
              <h2 id="hiw-heading">{copy.hiw_title}</h2>
            </div>
            <div className="hiw-lead-group">
              <p className="section-lead">{copy.hiw_lead}</p>
              <span className="hiw-scroll-hint">{copy.hiw_scroll_hint}</span>
            </div>
          </div>

          <div className="hiw-grid">
            {/* Left: Alternating vertical timeline without numbering */}
            <div className="hiw-timeline" role="list">
              <div className="hiw-track" aria-hidden="true">
                <motion.div
                  className="hiw-track-fill"
                  style={
                    reduced
                      ? { scaleY: (activeStep + 1) / HOW_IT_WORKS_STEPS.length }
                      : { scaleY: smoothProgress }
                  }
                />
                <motion.span
                  className="hiw-track-dot"
                  style={
                    reduced
                      ? {
                          top: `${
                            ((activeStep + 0.5) / HOW_IT_WORKS_STEPS.length) *
                            100
                          }%`,
                        }
                      : { top: dotTop }
                  }
                />
              </div>

              {HOW_IT_WORKS_STEPS.map((step, idx) => {
                const isReached = idx <= activeStep;
                const isCurrent = idx === activeStep;
                const cardElement = (
                  <motion.button
                    type="button"
                    className={`hiw-card${isReached ? " reached" : ""}${
                      isCurrent ? " active" : ""
                    }`}
                    onClick={() =>
                      handleStepSelect(idx, step.representativeFrame)
                    }
                    aria-current={isCurrent ? "step" : undefined}
                    whileHover={reduced ? undefined : { y: -2 }}
                    transition={{ duration: 0.2, ease: EASE }}
                  >
                    <h3>{copy[step.titleKey]}</h3>
                    <p>{copy[step.descKey]}</p>
                  </motion.button>
                );

                return (
                  <div
                    key={step.id}
                    className={`hiw-row hiw-row-${step.side}`}
                    role="listitem"
                  >
                    <div className="hiw-slot hiw-slot-left">
                      {step.side === "left" ? cardElement : null}
                    </div>

                    <div className="hiw-node-col">
                      <button
                        type="button"
                        className={`hiw-node${isReached ? " reached" : ""}${
                          isCurrent ? " active" : ""
                        }`}
                        onClick={() =>
                          handleStepSelect(idx, step.representativeFrame)
                        }
                        aria-label={copy[step.titleKey]}
                      >
                        <StepIcon icon={step.icon} />
                      </button>
                    </div>

                    <div className="hiw-slot hiw-slot-right">
                      {step.side === "right" ? cardElement : null}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Right: Scroll-to-animate canvas showcase */}
            <div className="hiw-stage">
              <div className="hiw-stage-frame">
                <canvas
                  ref={canvasRef}
                  width={FRAME_WIDTH}
                  height={FRAME_HEIGHT}
                  className="hiw-canvas"
                  aria-label={copy[HOW_IT_WORKS_STEPS[activeStep].titleKey]}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
