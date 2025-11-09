import { SignedIn } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";
import type { CSSProperties } from "react";
import Image from "next/image";
import { sql } from "drizzle-orm";
import Link from "next/link";
import { HeroCarousel } from "@/components/hero-carousel";
import { db } from "@/db";
import { staff } from "@/db/schema";

const fullBleedStyle: CSSProperties = {
  width: "100vw",
  marginLeft: "calc(50% - 50vw)",
};

export default async function Home() {
  const user = await currentUser();
  let staffCount = 0;
  try {
    const result = await db.select({ total: sql<number>`count(*)::int` }).from(staff);
    staffCount = result[0]?.total ?? 0;
  } catch (error) {
    console.error("Unable to load staff count:", error);
  }

  return (
    <div className="flex w-full flex-col gap-10">
      <div style={fullBleedStyle}>
        <HeroCarousel />
      </div>
      <section className="grid gap-8 rounded-3xl border border-zinc-200 bg-white px-6 py-10 shadow-sm md:grid-cols-2">
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="relative aspect-[3/4] overflow-hidden rounded-3xl">
            <Image
              src="/hero/staff.svg"
              alt="Crew briefing"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 80vw, 320px"
              priority
            />
          </div>
          <div className="relative aspect-[3/4] overflow-hidden rounded-3xl sm:mt-8">
            <Image
              src="/hero/events.svg"
              alt="Community outreach"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 80vw, 320px"
            />
          </div>
        </div>
        <div className="space-y-4">
          <p className="text-xs font-semibold uppercase tracking-[0.4em] text-rose-500">About Paradise Park FD</p>
          <h2 className="text-3xl font-semibold text-zinc-900">We are always ready to help</h2>
          <p className="text-base text-zinc-600">
            {user
              ? `Welcome back, ${user.firstName ?? user.username ?? "operator"}.`
              : "The Paradise Park portal"}{" "}
            keeps trainings, operations, and outreach aligned for {staffCount} active personnel. Crews can review
            drills, coordinate town events, and share critical updates from one secure workspace.
          </p>
          <ul className="space-y-3 text-sm text-zinc-600">
            <li className="rounded-2xl border border-zinc-100 px-4 py-3">
              <p className="text-base font-semibold text-zinc-900">Firefighter equipment</p>
              <p>Monitor apparatus readiness and PPE lifecycle without spreadsheets.</p>
            </li>
            <li className="rounded-2xl border border-zinc-100 px-4 py-3">
              <p className="text-base font-semibold text-zinc-900">Technical rescue</p>
              <p>Log high-angle, confined-space, and water rescue trainings with attendance.</p>
            </li>
            <li className="rounded-2xl border border-zinc-100 px-4 py-3">
              <p className="text-base font-semibold text-zinc-900">Operations force</p>
              <p>Coordinate crews across stations using real-time roster data from Supabase.</p>
            </li>
          </ul>
        </div>
      </section>

      <div style={fullBleedStyle}>
        <section className="relative h-[360px] w-full overflow-hidden">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: "url(/firetrucks.jpeg)",
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundAttachment: "fixed",
            }}
          />
          <div className="absolute inset-0 bg-black/50" />
          <div className="relative z-10 flex h-full flex-col items-center justify-center gap-3 text-center text-white">
            <p className="text-xs font-semibold uppercase tracking-[0.4em] text-rose-300">
              Field Ready
            </p>
            <h3 className="text-3xl font-semibold">Prepared for every call</h3>
            <p className="max-w-2xl text-sm text-zinc-200">
              High-fidelity training imagery keeps teams focused on the mission ahead.
            </p>
          </div>
        </section>
      </div>

      <section className="space-y-6 rounded-3xl border border-zinc-200 bg-white px-6 py-10 shadow-sm">
        <div className="text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.4em] text-rose-500">Community impact</p>
          <h2 className="mt-3 text-3xl font-semibold text-zinc-900">Moments from Paradise Park</h2>
          <p className="mt-2 text-sm text-zinc-600">
            Training, outreach, and rapid response in action across the neighborhood.
          </p>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {[
            { title: "Ladder drill", image: "/hero/training.svg" },
            { title: "Town parade", image: "/hero/events.svg" },
            { title: "Night operations", image: "/hero/staff.svg" },
          ].map((card) => (
            <div key={card.title} className="group relative aspect-[4/5] overflow-hidden rounded-3xl">
              <Image
                src={card.image}
                alt={card.title}
                fill
                className="object-cover transition duration-500 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 320px"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-t from-black/80 via-black/20 to-transparent p-6 text-center transition duration-300 group-hover:bg-black/50">
                <p className="text-lg font-semibold text-white opacity-0 transition duration-300 group-hover:opacity-100">
                  {card.title}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
      <section className="grid gap-6 md:grid-cols-2">
        <SignedIn>
          <div className="rounded-2xl border border-zinc-200 bg-white px-6 py-6 shadow-sm">
            <h2 className="text-xl font-semibold text-zinc-900">Your shortcuts</h2>
            <p className="mt-2 text-sm text-zinc-600">
              Jump right back into the tools you use the most.
            </p>
            <div className="mt-6 flex flex-col gap-3">
              <Link
                href="/dashboard"
                className="rounded-xl border border-zinc-200 px-4 py-3 text-sm font-medium text-zinc-800 transition hover:border-zinc-400"
              >
                Open dashboard
              </Link>
              <Link
                href="/settings"
                className="rounded-xl border border-zinc-200 px-4 py-3 text-sm font-medium text-zinc-800 transition hover:border-zinc-400"
              >
                Update profile
              </Link>
            </div>
          </div>
        </SignedIn>
      </section>
    </div>
  );
}
