import Link from "next/link";

const footerLinks = [
  {
    title: "Operations",
    items: [
      { label: "Trainings", href: "/services" },
      { label: "Events", href: "/contact" },
    ],
  },
  {
    title: "Departments",
    items: [
      { label: "Fire Prevention", href: "/about" },
      { label: "Community Outreach", href: "/services" },
    ],
  },
];

export function SiteFooter() {
  return (
    <footer className="mt-16 border-t border-zinc-200 bg-zinc-100">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-6 py-10">
        <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
          <div>
            <p className="text-lg font-semibold text-zinc-900">Paradise Park FD</p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
            {footerLinks.map((section) => (
              <div key={section.title}>
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-rose-500">{section.title}</p>
                <ul className="mt-3 space-y-2 text-sm text-zinc-600">
                  {section.items.map((item) => (
                    <li key={item.label}>
                      <Link className="transition hover:text-zinc-900" href={item.href}>
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm">
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <p className="text-lg font-semibold text-zinc-900">Visit Paradise Park FD</p>
              <p className="mt-2 text-sm text-zinc-600">
                Discover the heart of our community at the Paradise Park Fire Department, where dedication, safety, and service come together. Located in the heart of our park, the department is more than just first responders — it’s a gathering place for neighbors and friends.
Our volunteer firefighters proudly serve the area with professionalism and compassion, providing emergency response, fire safety education, and community outreach. Throughout the year, we host fun and family-friendly events like open houses, cookouts, and safety demonstrations that bring everyone together.
              </p>
            </div>
            <div className="overflow-hidden rounded-2xl border border-zinc-100">
              <iframe
                title="Paradise Park RV Park Map"
                src="https://www.google.com/maps?q=Paradise+Park+Punta+Gorda&output=embed"
                className="h-[220px] w-full"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
        <div className="flex flex-col border-t border-zinc-100 pt-6 text-sm text-zinc-500 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Paradise Park Fire Department. All rights reserved.</p>
          <div className="mt-4 flex items-center gap-4 sm:mt-0">
            <Link className="transition hover:text-zinc-900" href="/about">
              About
            </Link>
            <Link className="transition hover:text-zinc-900" href="/contact">
              Contact
            </Link>
            <Link className="transition hover:text-zinc-900" href="#">
              Privacy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
