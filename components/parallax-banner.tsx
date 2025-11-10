"use client";

import { useEffect, useRef } from "react";

type ParallaxBannerProps = {
  image: string;
  height?: number;
  mobileSpeed?: number;
};

export function ParallaxBanner({ image, height = 360, mobileSpeed = 0.6 }: ParallaxBannerProps) {
  const containerRef = useRef<HTMLElement>(null);
  const backgroundRef = useRef<HTMLDivElement>(null);
  const baseOffset = Math.min(height * 0.2, 120);

  useEffect(() => {
    const target = backgroundRef.current;
    const container = containerRef.current;
    if (!target || !container) return;

    const reduceMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const desktopQuery = window.matchMedia("(min-width: 769px)");
    const baseScale = 1.2;

    let initialOffset = 0;
    let isDesktop = desktopQuery.matches;
    let rafId: number | null = null;

    const applyTransform = (offset: number) => {
      target.style.transform = `translate3d(0, ${offset + baseOffset}px, 0) scale(${baseScale})`;
    };

    const handleScroll = () => {
      if (reduceMotionQuery.matches) {
        target.style.transform = `translate3d(0, ${baseOffset}px, 0) scale(${baseScale})`;
        return;
      }

      if (rafId !== null) return;
      rafId = window.requestAnimationFrame(() => {
        const distance = window.scrollY - initialOffset;
        const speed = isDesktop ? 0.25 : mobileSpeed;
        const maxOffset = height / 3;
        const offset = Math.max(Math.min(distance * speed, maxOffset), -maxOffset);
        applyTransform(offset);
        rafId = null;
      });
    };

    const updateMetrics = () => {
      initialOffset = container.getBoundingClientRect().top + window.scrollY;
      isDesktop = desktopQuery.matches;
      handleScroll();
    };

    updateMetrics();

    const motionHandler = () => handleScroll();
    const addMotionListener = () => {
      if (typeof reduceMotionQuery.addEventListener === "function") {
        reduceMotionQuery.addEventListener("change", motionHandler);
        return () => reduceMotionQuery.removeEventListener("change", motionHandler);
      }
      reduceMotionQuery.addListener(motionHandler);
      return () => reduceMotionQuery.removeListener(motionHandler);
    };

    const removeMotionListener = addMotionListener();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", updateMetrics);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", updateMetrics);
      removeMotionListener();
      if (rafId !== null) {
        cancelAnimationFrame(rafId);
      }
    };
  }, [baseOffset, height, mobileSpeed]);

  return (
    <section ref={containerRef} className="relative isolate w-full overflow-hidden bg-zinc-900" style={{ height }}>
      <div
        ref={backgroundRef}
        className="absolute inset-0 bg-cover bg-center will-change-transform"
        style={{
          backgroundImage: `url(${image})`,
          transform: `translate3d(0, ${baseOffset}px, 0) scale(1.2)`,
          transformOrigin: "center",
        }}
      />
      <div className="absolute inset-0 bg-black/35" />
    </section>
  );
}
