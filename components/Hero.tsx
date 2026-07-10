import type { Content } from '@/lib/content';

export default function Hero({ content: c }: { content: Content }) {
  return (
    <section className="relative overflow-hidden bg-navy-dark text-white">
      {c.heroImageUrl && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={c.heroImageUrl}
          alt=""
          className="absolute inset-0 h-full w-full object-cover opacity-30"
        />
      )}
      <div className="relative mx-auto max-w-6xl px-4 py-20 md:py-28">
        <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-brick">
          {c.campName}
        </p>
        <h1 className="max-w-3xl text-4xl font-extrabold leading-tight md:text-5xl">
          {c.headline}
        </h1>
        <p className="mt-5 max-w-2xl text-lg text-white/85">{c.subheadline}</p>

        <div className="mt-6 inline-flex items-center gap-2 rounded-full bg-white/10 py-1.5 pl-1.5 pr-4">
          {c.qLogoUrl && (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={c.qLogoUrl} alt="Q Athletics" className="h-8 w-8 rounded-full bg-white object-contain p-1" />
          )}
          <span className="text-sm font-semibold text-white/85">Sponsored by Q Athletics</span>
        </div>

        <dl className="mt-8 grid max-w-2xl grid-cols-2 gap-4 sm:grid-cols-4">
          {[
            ['Dates', c.dates],
            ['Location', c.location.split('(')[0].trim()],
            ['Ages', c.ages.split('(')[0].trim()],
            ['Tuition', c.tuition],
          ].map(([k, v]) => (
            <div key={k} className="rounded-lg bg-white/10 p-3">
              <dt className="text-xs uppercase tracking-wide text-white/60">{k}</dt>
              <dd className="font-bold">{v}</dd>
            </div>
          ))}
        </dl>

        <div className="mt-8 flex flex-wrap gap-4">
          <a href="/register" className="rounded-md bg-brick px-6 py-3 font-semibold hover:bg-brick-dark transition-colors">
            Register Now
          </a>
          <a href="#details" className="rounded-md border border-white/40 px-6 py-3 font-semibold hover:bg-white/10 transition-colors">
            Camp details →
          </a>
        </div>
      </div>
    </section>
  );
}
