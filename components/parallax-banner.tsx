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

  useEffect(() => {
    const target = backgroundRef.current;
    const container = containerRef.current;
    if (!target || !container) return;

    let initialOffset = container.getBoundingClientRect().top + window.scrollY;
    let rafId: number | null = null;
    const desktopQuery = window.matchMedia("(min-width: 769px)");
    let isDesktop = desktopQuery.matches;

    const updateMode = () => {
      initialOffset = container.getBoundingClientRect().top + window.scrollY;
      isDesktop = desktopQuery.matches;
      handleScroll();
    };

    const handleScroll = () => {
      if (!target) return;
      if (rafId !== null) return;
      rafId = window.requestAnimationFrame(() => {
        const distance = window.scrollY - initialOffset;
        const speed = isDesktop ? 0.25 : mobileSpeed;
        const yPos = distance * speed;
        target.style.transform = `translate3d(0, ${yPos}px, 0)`;
        rafId = null;
      });
    };

    updateMode();
    handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", updateMode);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", updateMode);
      if (rafId) {
        cancelAnimationFrame(rafId);
      }
    };
  }, [mobileSpeed]);

  return (
    <section ref={containerRef} className="relative isolate w-full overflow-hidden bg-zinc-900" style={{ height }}>
      <div
        ref={backgroundRef}
        className="absolute inset-0 bg-cover bg-center will-change-transform md:bg-fixed"
        style={{
          backgroundImage: `url(${image})`,
          height: "200%",
          top: "-50%",
        }}
      />
      <div className="absolute inset-0 bg-black/35" />
    </section>
  );
}
