import Link from "next/link";

export default function AboutPage() {
  return (
    <section className="w-full rounded-3xl border border-zinc-200 bg-white px-8 py-12 shadow-sm">
      <p className="text-xs font-semibold uppercase tracking-[0.4em] text-rose-500">
        About
      </p>
      <h1 className="mt-4 text-4xl font-semibold text-zinc-900">
        Built for Paradise Park Fire Department
      </h1>
      <p className="mt-4 text-lg text-zinc-600">
        This portal keeps Paradise Park FD staff aligned on training, readiness, and community outreach. It centralizes
        information so every firefighter, captain, and coordinator can quickly find the resources they need without
        digging through spreadsheets or scattered email threads.
      </p>
      <div className="mt-8 grid gap-6 md:grid-cols-3">
        <div className="rounded-2xl border border-zinc-100 bg-zinc-50 px-5 py-6">
          <h2 className="text-base font-semibold text-zinc-900">Trainings</h2>
          <p className="mt-2 text-sm text-zinc-600">
            Track recurring drills, special certifications, and after-action lessons.
          </p>
        </div>
        <div className="rounded-2xl border border-zinc-100 bg-zinc-50 px-5 py-6">
          <h2 className="text-base font-semibold text-zinc-900">Events</h2>
          <p className="mt-2 text-sm text-zinc-600">
            Coordinate town engagements, open houses, and school safety visits with clear visibility.
          </p>
        </div>
        <div className="rounded-2xl border border-zinc-100 bg-zinc-50 px-5 py-6">
          <h2 className="text-base font-semibold text-zinc-900">People</h2>
          <p className="mt-2 text-sm text-zinc-600">
            Keep an accurate staff roster synced from Clerk directly into Supabase.
          </p>
        </div>
      </div>
      <div className="mt-10 flex flex-wrap gap-4 text-sm">
        <Link
          href="/services"
          className="rounded-full bg-zinc-900 px-6 py-3 font-semibold text-white transition hover:bg-zinc-800"
        >
          Explore services
        </Link>
        <Link
          href="/contact"
          className="rounded-full border border-zinc-200 px-6 py-3 font-semibold text-zinc-900 transition hover:bg-zinc-50"
        >
          Contact command staff
        </Link>
      </div>
    </section>
  );
}
