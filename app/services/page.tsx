const services = [
  {
    title: "Training management",
    description:
      "Plan, publish, and recap hands-on drills plus virtual refreshers with attendance tracking backed by Supabase.",
  },
  {
    title: "Town events",
    description:
      "Coordinate open houses, neighborhood preparedness fairs, and school visits with volunteer assignments.",
  },
  {
    title: "Staff directory",
    description:
      "Keep Clerk users in sync with the operations roster so captains can quickly find the right contact.",
  },
  {
    title: "Resource library",
    description:
      "Store SOPs, after-action reports, and community handouts so personnel always reference the latest version.",
  },
];

export default function ServicesPage() {
  return (
    <section className="w-full rounded-3xl border border-zinc-200 bg-white px-8 py-12 shadow-sm">
      <p className="text-xs font-semibold uppercase tracking-[0.4em] text-rose-500">
        Services
      </p>
      <h1 className="mt-4 text-4xl font-semibold text-zinc-900">What the portal delivers</h1>
      <p className="mt-4 text-lg text-zinc-600">
        Every module is purpose-built for Paradise Park FD. It saves time on coordination and puts reliable information
        at the center of every shift.
      </p>
      <div className="mt-10 grid gap-6 md:grid-cols-2">
        {services.map((service) => (
          <div
            key={service.title}
            className="rounded-2xl border border-zinc-100 bg-zinc-50 px-6 py-6 transition hover:border-zinc-300"
          >
            <h2 className="text-xl font-semibold text-zinc-900">{service.title}</h2>
            <p className="mt-2 text-sm text-zinc-600">{service.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
