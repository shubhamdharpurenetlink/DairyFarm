"use client";

import { useEffect, useState } from "react";

export const useScrollDirection = (threshold = 8) => {
  const [direction, setDirection] = useState<"up" | "down">("up");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    let lastY = window.scrollY;
    let ticking = false;
    const handler = () => {
      const y = window.scrollY;
      setScrolled(y > 16);
      if (Math.abs(y - lastY) >= threshold) {
        setDirection(y > lastY ? "down" : "up");
        lastY = y;
      }
      ticking = false;
    };
    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(handler);
        ticking = true;
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [threshold]);

  return { direction, scrolled };
};
