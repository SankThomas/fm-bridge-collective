import { useEffect, useRef, useState } from "react";

export function useCountUp(target, decimals, suffix, shouldStart) {
  const prefersReducedMotion = window.matchMedia(
    "prefers-reduced-motion: reduce",
  ).matches;
  const [display, setDisplay] = useState(prefersReducedMotion ? target : 0);
  const frameRef = useRef(null);

  useEffect(() => {
    if (!shouldStart) return;
    if (prefersReducedMotion) {
      setDisplay(target);
      return;
    }

    const duration = 1600;
    const start = performance.now();
    const animate = (now) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(target * eased);

      if (progress < 1) {
        frameRef.current = requestAnimationFrame(animate);
      }
    };

    frameRef.current = requestAnimationFrame(animate);

    return () => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
    };
  }, [shouldStart, target, prefersReducedMotion]);

  const formatted = display.toLocaleString("en-US", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });

  return formatted + suffix;
}
