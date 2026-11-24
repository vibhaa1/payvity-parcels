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

export function FadeUp({ children, delay = 0, y = 20, className }: FadeUpProps) {
  const reduced = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduced ? { opacity: 1, y: 0 } : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.16 }}
      transition={{ duration: 0.55, delay, ease: EASE }}
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
  const reduced = useReducedMotion();
  return (
    <motion.div
      id={id}
      className={className}
      initial={reduced ? "visible" : "hidden"}
      whileInView="visible"
      viewport={{ once: true, amount: 0.14 }}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: 0.07,
          },
        },
      }}
    >
      {children}
    </motion.div>
  );
}

interface StaggerItemProps {
  children: ReactNode;
  className?: string;
}

export function StaggerItem({ children, className }: StaggerItemProps) {
  const reduced = useReducedMotion();
  return (
    <motion.div
      className={className}
      variants={{
        hidden: reduced ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.5, ease: EASE },
        },
      }}
    >
      {children}
    </motion.div>
  );
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
