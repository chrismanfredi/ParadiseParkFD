import { SignedIn } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";
import Image from "next/image";
import { sql } from "drizzle-orm";
import Link from "next/link";
import { HeroCarousel } from "@/components/hero-carousel";
import { CommunityCalendar } from "@/components/community-calendar";
import { db } from "@/db";
import { staff } from "@/db/schema";

const fullBleedClass = "relative left-1/2 right-1/2 w-screen -translate-x-1/2";

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
      <div className={fullBleedClass}>
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

      <div className={fullBleedClass}>
        <section className="relative h-[360px] w-full overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center md:bg-fixed"
            style={{
              backgroundImage: "url(/firetrucks.jpeg)",
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

      <section className="rounded-3xl border border-zinc-200 bg-white px-6 py-10 shadow-sm">
        <div className="flex flex-col gap-3 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.4em] text-rose-500">Community events</p>
          <h2 className="text-3xl font-semibold text-zinc-900">Upcoming neighborhood touchpoints</h2>
          <p className="text-sm text-zinc-600">
            Engage with residents through preparedness classes, open houses, and seasonal celebrations.
          </p>
        </div>
          <CommunityCalendar />
      </section>

      <section className="grid gap-6 rounded-3xl border border-zinc-200 bg-white px-6 py-10 shadow-sm md:grid-cols-2">
        <form className="space-y-4">
          <p className="text-xs font-semibold uppercase tracking-[0.4em] text-rose-500">Contact us</p>
          <h2 className="text-3xl font-semibold text-zinc-900">Share what you need</h2>
          <p className="text-sm text-zinc-600">
            Reach out for training requests, community partnerships, or station information.
          </p>
          <label className="flex flex-col text-sm font-medium text-zinc-700">
            Name
            <input
              type="text"
              placeholder="Your full name"
              className="mt-1 rounded-xl border border-zinc-200 px-3 py-2 text-sm text-zinc-900 focus:border-rose-400 focus:outline-none"
            />
          </label>
          <label className="flex flex-col text-sm font-medium text-zinc-700">
            Email
            <input
              type="email"
              placeholder="you@paradiseparkfd.gov"
              className="mt-1 rounded-xl border border-zinc-200 px-3 py-2 text-sm text-zinc-900 focus:border-rose-400 focus:outline-none"
            />
          </label>
          <label className="flex flex-col text-sm font-medium text-zinc-700">
            Message
            <textarea
              rows={4}
              placeholder="Describe how we can help..."
              className="mt-1 rounded-xl border border-zinc-200 px-3 py-2 text-sm text-zinc-900 focus:border-rose-400 focus:outline-none"
            />
          </label>
          <button className="w-full rounded-full bg-zinc-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-zinc-800">
            Send message
          </button>
        </form>

        <div className="rounded-2xl border border-zinc-100 bg-zinc-50 px-6 py-8">
          <p className="text-xs font-semibold uppercase tracking-[0.4em] text-rose-500">Always ready to help</p>
          <h3 className="mt-3 text-2xl font-semibold text-zinc-900">Paradise Park Fire Department</h3>
          <ul className="mt-6 space-y-4 text-sm text-zinc-700">
            <li>
              <p className="text-xs uppercase tracking-[0.3em] text-zinc-500">Phone</p>
              <p className="text-lg font-semibold text-zinc-900">555-0199 (duty officer)</p>
            </li>
            <li>
              <p className="text-xs uppercase tracking-[0.3em] text-zinc-500">Email</p>
              <p className="text-lg font-semibold text-zinc-900">command@paradiseparkfd.gov</p>
            </li>
            <li>
              <p className="text-xs uppercase tracking-[0.3em] text-zinc-500">Address</p>
              <p className="text-lg font-semibold text-zinc-900">101 Station Way, Paradise Park</p>
            </li>
          </ul>
          <div className="mt-8 space-y-2 text-sm text-zinc-600">
            <p>Open 24/7 for emergencies.</p>
            <p>Administrative hours: Mon–Fri, 8am–5pm.</p>
          </div>
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
