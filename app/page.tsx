import { SignedIn } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { HeroCarousel } from "@/components/hero-carousel";
import { ParallaxBanner } from "@/components/parallax-banner";
import { CommunityCalendar } from "@/components/community-calendar";

const fullBleedClass = "relative left-1/2 right-1/2 w-screen -translate-x-1/2";
const fullBleedStatic = "w-screen" as const;

export default function Home() {
  return (
    <div className="flex w-full flex-col gap-10">
      <div className={fullBleedClass}>
        <HeroCarousel />
      </div>
      <section className="grid gap-8 rounded-3xl border border-zinc-200 bg-white px-6 py-10 shadow-sm md:grid-cols-2">
        <div className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="relative aspect-[3/4] overflow-hidden rounded-3xl">
              <Image
                src="/firetrucks.jpeg"
                alt="Crew briefing"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 80vw, 320px"
                priority
              />
            </div>
            <div className="relative aspect-[3/4] overflow-hidden rounded-3xl sm:mt-8">
              <Image
                src="/paradiseparksign.jpeg"
                alt="Community outreach"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 80vw, 320px"
              />
            </div>
          </div>
        </div>
        <div className="space-y-4">
          <h2 className="text-3xl font-semibold text-zinc-900">About Paradise Park FD</h2>
          <p className="text-base text-zinc-600">
            Located in the heart of Paradise Park, the Paradise Park Fire Department is more than just a team of first responders — we’re neighbors helping neighbors. Our department is dedicated to keeping residents and visitors safe through fire protection, emergency response, and community education.
          </p>
          <ul className="space-y-3 text-sm text-zinc-600">
            <li className="rounded-2xl border border-zinc-100 px-4 py-3">
              <p className="text-base font-semibold text-zinc-900">Meet Our Team</p>
              <p>Our firefighters and volunteers come from all walks of life, united by a shared dedication to serving others. Get to know the brave men and women who keep Paradise Park safe day and night.</p>
            </li>
            <li className="rounded-2xl border border-zinc-100 px-4 py-3">
              <p className="text-base font-semibold text-zinc-900">Community Events</p>
              <p> From our annual Pancake Breakfast to Family Safety Day, the Paradise Park Fire Department loves bringing the community together. Join us for fun, food, and friendship — all while learning about fire safety and preparedness. </p>
            </li>
          </ul>
        </div>
      </section>
      <section className="rounded-3xl border border-zinc-200 bg-white px-6 py-10 shadow-sm">
        <div className="text-center">
          <h2 className="mt-3 text-3xl font-semibold text-zinc-900">Meet the Paradise Park crew</h2>
          <p className="mt-2 text-sm text-zinc-600">
            Neighbors helping neighbors—professionals and volunteers who make the department run.
          </p>
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {[
            { name: "Jason Smith", title: "Chief", image: "/member.png" },
            { name: "Jason Smith", title: "Member", image: "/member.png" },
            { name: "Jason Smith", title: "Member", image: "/member.png" },
          ].map((member) => (
            <div key={member.name} className="rounded-2xl border border-zinc-100 bg-zinc-50 p-4 text-center">
              <div className="mx-auto h-32 w-32 overflow-hidden rounded-full border border-zinc-200">
                <Image
                  src={member.image}
                  alt={member.name}
                  width={128}
                  height={128}
                  className="h-full w-full object-cover"
                />
              </div>
              <p className="mt-4 text-lg font-semibold text-zinc-900">{member.name}</p>
              <p className="text-sm text-zinc-600">{member.title}</p>
            </div>
          ))}
        </div>
      </section>

      <div className={fullBleedStatic} style={{ marginLeft: "calc(50% - 50vw)" }}>
        <ParallaxBanner image="/1.jpeg" height={520} />
      </div>

      <section className="space-y-6 rounded-3xl border border-zinc-200 bg-white px-6 py-10 shadow-sm">
        <div className="text-center">
          <h2 className="mt-3 text-3xl font-semibold text-zinc-900">Moments from Paradise Park</h2>
          <p className="mt-2 text-sm text-zinc-600">
            Training, outreach, and rapid response in action across the neighborhood.
          </p>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {[
            { title: "Ladder drill", image: "/firetrucks.jpeg" },
            { title: "Town parade", image: "/3.jpeg" },
            { title: "Kids Day", image: "/2.jpeg" },
          ].map((card) => (
            <div key={card.title} className="group rounded-3xl border border-zinc-100 bg-zinc-50 p-4">
              <div className="relative mx-auto h-48 w-full max-w-[240px] overflow-hidden rounded-2xl">
                <Image
                  src={card.image}
                  alt={card.title}
                  fill
                  className="object-cover transition duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 70vw, 240px"
                />
              </div>
              <p className="mt-4 text-center text-lg font-semibold text-zinc-900">{card.title}</p>
            </div>
          ))}
        </div>
      </section>

      <div className={`${fullBleedClass} bg-zinc-100`}>
        <div className="mx-auto flex w-full max-w-6xl flex-col px-6 py-10">
          <section className="rounded-3xl border border-zinc-200 bg-white px-6 py-10 shadow-sm">
            <div className="flex flex-col gap-3 text-center">
              <h2 className="text-3xl font-semibold text-zinc-900 mb-10">Upcoming neighborhood Events</h2>
            </div>
            <CommunityCalendar />
          </section>
        </div>
      </div>

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
