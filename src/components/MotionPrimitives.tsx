"use client";

import { ReactNode, useCallback, useEffect, useRef, useState } from "react";
import {
  animate,
  motion,
  useInView,
  useReducedMotion,
  useScroll,
  useSpring,
} from "framer-motion";

export const EASE = [0.19, 1, 0.22, 1] as const;

export const SPRING = {
  type: "spring" as const,
  stiffness: 420,
  damping: 34,
};

export function ScrollProgressBar() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 260,
    damping: 32,
    restDelta: 0.001,
  });

  return <motion.div className="scroll-progress" style={{ scaleX }} aria-hidden="true" />;
}

interface FadeUpProps {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}

/**
 * Keeps initial opacity at 1 so prerendered SSR HTML and non-scrolled sections
 * are always crawlable and immediately readable.
 */
export function FadeUp({ children, delay = 0, y = 10, className }: FadeUpProps) {
  const reduced = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={false}
      whileInView={reduced ? undefined : { y: [y, 0] }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{ duration: 0.45, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

interface StaggerGridProps {
  children: ReactNode;
  className?: string;
  id?: string;
}

export function StaggerGrid({ children, className, id }: StaggerGridProps) {
  return (
    <div id={id} className={className}>
      {children}
    </div>
  );
}

interface StaggerItemProps {
  children: ReactNode;
  className?: string;
}

export function StaggerItem({ children, className }: StaggerItemProps) {
  return <div className={className}>{children}</div>;
}

interface AnimatedCounterProps {
  target: number;
  suffix?: string;
  triggerKey?: number;
}

export function AnimatedCounter({
  target,
  suffix = "",
  triggerKey = 0,
}: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const inView = useInView(ref, { once: true, amount: 0.35 });
  const reduced = useReducedMotion();
  const [value, setValue] = useState<number>(target);
  const hasPlayedRef = useRef(false);

  const runAnimation = useCallback(() => {
    if (reduced) {
      setValue(target);
      return () => {};
    }
    setValue(1);
    const controls = animate(1, target, {
      duration: 1.35,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (latest) => {
        setValue(Math.max(1, Math.round(latest)));
      },
    });
    return () => controls.stop();
  }, [reduced, target]);

  useEffect(() => {
    if (!inView || hasPlayedRef.current) return;
    hasPlayedRef.current = true;
    const stop = runAnimation();
    return stop;
  }, [inView, runAnimation]);

  useEffect(() => {
    if (triggerKey === 0) return;
    const stop = runAnimation();
    return stop;
  }, [triggerKey, runAnimation]);

  return (
    <span ref={ref} className="stat-number">
      {value}
      {suffix}
    </span>
  );
}
