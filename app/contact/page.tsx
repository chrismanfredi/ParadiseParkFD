export default function ContactPage() {
  return (
    <section className="w-full rounded-3xl border border-zinc-200 bg-white px-8 py-12 shadow-sm">
      <p className="text-xs font-semibold uppercase tracking-[0.4em] text-rose-500">
        Contact
      </p>
      <h1 className="mt-4 text-4xl font-semibold text-zinc-900">Reach the Paradise Park FD team</h1>
      <p className="mt-4 text-lg text-zinc-600">
        Command staff monitors submissions from this page daily. Use it to request access, report a training need, or
        coordinate town events with our community engagement unit.
      </p>
      <div className="mt-10 grid gap-6 md:grid-cols-2">
        <div className="rounded-2xl border border-zinc-100 bg-zinc-50 px-6 py-6">
          <h2 className="text-base font-semibold text-zinc-900">Station phone</h2>
          <p className="mt-2 text-sm text-zinc-600">555-0199 (duty officer line)</p>

          <h2 className="mt-6 text-base font-semibold text-zinc-900">Email</h2>
          <p className="mt-2 text-sm text-zinc-600">command@paradiseparkfd.gov</p>
        </div>
        <form className="rounded-2xl border border-zinc-100 bg-zinc-50 px-6 py-6 space-y-4">
          <label className="flex flex-col text-sm font-medium text-zinc-700">
            Name
            <input
              type="text"
              placeholder="Captain Jamie Park"
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
              placeholder="Let us know what you need help with..."
              className="mt-1 rounded-xl border border-zinc-200 px-3 py-2 text-sm text-zinc-900 focus:border-rose-400 focus:outline-none"
            />
          </label>
          <button
            type="button"
            className="w-full rounded-full bg-zinc-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-zinc-800"
          >
            Send message
          </button>
        </form>
      </div>
    </section>
  );
}
