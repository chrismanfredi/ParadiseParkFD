import Link from "next/link";

const footerLinks = [
  {
    title: "Operations",
    items: [
      { label: "Dashboard", href: "/dashboard" },
      { label: "Trainings", href: "/services" },
      { label: "Events", href: "/contact" },
    ],
  },
  {
    title: "Departments",
    items: [
      { label: "Fire Prevention", href: "/about" },
      { label: "Community Outreach", href: "/services" },
      { label: "Admin Center", href: "/contact" },
    ],
  },
  {
    title: "Resources",
    items: [
      { label: "Documentation", href: "https://nextjs.org/docs" },
      { label: "Support", href: "/contact" },
      { label: "Status", href: "#" },
    ],
  },
];

export function SiteFooter() {
  return (
    <footer className="mt-16 border-t border-zinc-200 bg-white">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-6 py-10">
        <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
          <div>
            <p className="text-lg font-semibold text-zinc-900">Paradise Park FD</p>
            <p className="mt-2 max-w-sm text-sm text-zinc-600">
              Secure access to trainings, operations, and community coordination for Paradise Park Fire Department staff.
            </p>
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
