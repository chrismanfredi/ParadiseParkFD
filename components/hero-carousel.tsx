"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";

type Slide = {
  id: number;
  title: string;
  description: string;
  image: string;
};

const SLIDE_INTERVAL = 6000;

export function HeroCarousel() {
  const slides: Slide[] = useMemo(
    () => [
      {
        id: 1,
        title: "Training readiness, simplified",
        description:
          "Review upcoming drills, hazard refreshers, and post-incident lessons in one unified view.",
        image: "/firetrucks.jpeg",
      },
      {
        id: 2,
        title: "Town outreach calendar",
        description:
          "Stay ahead of community events, school visits, and safety demonstrations happening around Paradise Park.",
        image: "/paradiseparksign.jpeg",
      },
      {
        id: 3,
        title: "Unified staff directory",
        description:
          "See who is on shift, reach captains quickly, and keep personal details current without spreadsheets.",
        image: "/paradiseparksign.jpeg",
      },
    ],
    []
  );

  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % slides.length);
    }, SLIDE_INTERVAL);

    return () => clearInterval(timer);
  }, [slides.length]);

  const goTo = (index: number) => {
    setActiveIndex((index + slides.length) % slides.length);
  };

  const activeSlide = slides[activeIndex];

  return (
    <section className="relative w-full overflow-hidden border border-zinc-200 text-white shadow-lg">
      <div className="relative min-h-[640px]">
        <Image
          src={activeSlide.image}
          alt={activeSlide.title}
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-black/45" />
        <div className="relative z-10 flex h-full flex-col justify-center gap-5 px-8 py-10 sm:px-16">
          <p className="text-xs font-semibold uppercase tracking-[0.4em] text-rose-300">
            Paradise Park FD
          </p>
          <h2 className="text-4xl font-semibold leading-tight text-white sm:text-5xl">
            {activeSlide.title}
          </h2>
          <p className="max-w-2xl text-lg text-zinc-100">{activeSlide.description}</p>
        </div>
      </div>

      <button
        type="button"
        aria-label="Previous slide"
        className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full border border-white/20 bg-white/10 p-2 text-white transition hover:bg-white/20"
        onClick={() => goTo(activeIndex - 1)}
      >
        &#8592;
      </button>
      <button
        type="button"
        aria-label="Next slide"
        className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full border border-white/20 bg-white/10 p-2 text-white transition hover:bg-white/20"
        onClick={() => goTo(activeIndex + 1)}
      >
        &#8594;
      </button>

      <div className="absolute bottom-5 left-1/2 flex -translate-x-1/2 gap-2">
        {slides.map((slide, index) => (
          <button
            key={slide.id}
            type="button"
            className={`h-2 w-8 rounded-full transition ${
              index === activeIndex ? "bg-white" : "bg-white/40"
            }`}
            aria-label={`Go to slide ${index + 1}`}
            onClick={() => goTo(index)}
          />
        ))}
      </div>
    </section>
  );
}
