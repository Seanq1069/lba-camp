import type { Content } from '@/lib/content';

const SKILLS: [string, string[]][] = [
  ['Hitting', ['Swing fundamentals', 'Tee & front-toss work', 'Situational hitting', 'Bat-speed & exit-velo drills']],
  ['Defense', ['Infield & outfield fundamentals', 'Footwork & throwing mechanics', 'Position-specific instruction', 'Communication & team defense']],
  ['Baserunning', ['Leads & secondary leads', 'Reading the ball', 'First-to-third technique', 'Competitive baserunning']],
  ['Competition', ['Daily skills competitions', 'Team challenges', 'Situational games', 'Awards on the final day']],
];

function Kicker({ children }: { children: React.ReactNode }) {
  return <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-brick">{children}</p>;
}

export default function Sections({ content: c }: { content: Content }) {
  return (
    <>
      {/* Experience */}
      <section className="mx-auto max-w-6xl px-4 py-16">
        <Kicker>The Experience</Kicker>
        <h2 className="max-w-2xl text-3xl font-extrabold">{c.experienceHeading}</h2>
        <p className="mt-3 max-w-2xl text-navy-light">{c.experienceIntro}</p>
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {c.experienceCards.map((card, i) => (
            <div key={card.title + i} className="rounded-xl border border-navy/10 bg-white p-6 shadow-sm">
              <p className="text-sm font-bold text-brick">{String(i + 1).padStart(2, '0')}</p>
              <h3 className="mt-1 text-xl font-bold">{card.title}</h3>
              <p className="mt-2 text-navy-light">{card.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Coaches */}
      <section className="bg-navy py-16 text-white">
        <div className="mx-auto max-w-6xl px-4">
          <Kicker>The Staff</Kicker>
          <h2 className="text-3xl font-extrabold">Meet the coaches</h2>
          <p className="mt-3 max-w-2xl text-white/80">
            A staff of active college players and career coaches — every camper gets real reps and real feedback.
          </p>
          <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {c.coaches.map((coach) => (
              <div key={coach.name} className="rounded-xl bg-white/5 p-5">
                {coach.photoUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={coach.photoUrl}
                    alt={coach.name}
                    className="mb-4 aspect-square w-full rounded-lg object-cover object-top"
                  />
                ) : (
                  <div className="mb-4 flex aspect-square w-full items-center justify-center rounded-lg bg-white/10 text-4xl font-extrabold text-white/40">
                    {coach.name.split(' ').map((w) => w[0]).join('')}
                  </div>
                )}
                <h3 className="text-lg font-bold">{coach.name}</h3>
                <p className="text-sm font-semibold text-brick">{coach.role}</p>
                <p className="mt-2 text-sm text-white/80">{coach.bio}</p>
                <ul className="mt-3 space-y-1 text-sm text-white/70">
                  {coach.highlights.map((h) => (
                    <li key={h}>• {h}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills */}
      <section className="mx-auto max-w-6xl px-4 py-16">
        <Kicker>On the Field</Kicker>
        <h2 className="text-3xl font-extrabold">What campers will do</h2>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {SKILLS.map(([title, items]) => (
            <div key={title} className="rounded-xl border border-navy/10 bg-white p-6 shadow-sm">
              <h3 className="text-xl font-bold text-brick">{title}</h3>
              <ul className="mt-3 space-y-2 text-navy-light">
                {items.map((i) => (
                  <li key={i}>• {i}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Schedule */}
      <section className="bg-white py-16">
        <div className="mx-auto max-w-3xl px-4">
          <Kicker>A Day at Camp</Kicker>
          <h2 className="text-3xl font-extrabold">Sample daily schedule</h2>
          <p className="mt-3 text-navy-light">
            Every day is built around focused instruction, high reps and competitive play. Times finalize once field
            availability is confirmed.
          </p>
          <div className="mt-8 divide-y divide-navy/10 rounded-xl border border-navy/10">
            {c.schedule.map((item) => (
              <div key={item.time + item.activity} className="flex items-center gap-6 px-5 py-3">
                <span className="w-24 shrink-0 font-bold text-brick">{item.time}</span>
                <span>{item.activity}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Details */}
      <section id="details" className="mx-auto max-w-6xl px-4 py-16">
        <Kicker>The Details</Kicker>
        <h2 className="text-3xl font-extrabold">Camp details & tuition</h2>
        <div className="mt-8 grid gap-8 lg:grid-cols-5">
          <div className="rounded-xl bg-navy p-8 text-white lg:col-span-2">
            <p className="text-sm uppercase tracking-wide text-white/60">Camp Tuition</p>
            <p className="mt-1 text-5xl font-extrabold">{c.tuition}</p>
            <p className="mt-4 text-white/85">{c.tuitionIncludes}</p>
            <p className="mt-4 text-white/85">
              Enrollment is limited to <strong>{c.maxEnrollment}</strong> to preserve a productive player-to-coach
              ratio.
            </p>
            <a
              href="/register"
              className="mt-6 inline-block rounded-md bg-brick px-6 py-3 font-semibold hover:bg-brick-dark transition-colors"
            >
              Register Now
            </a>
          </div>
          <dl className="grid gap-4 sm:grid-cols-2 lg:col-span-3">
            {[
              ['Dates', c.dates],
              ['Daily Hours', c.dailyHours],
              ['Location', c.location],
              ['Ages', c.ages],
              ['Max Enrollment', c.maxEnrollment],
              ['Bring', c.bring],
              ['Weather', c.weatherPolicy],
              ['Refunds', c.refundPolicy],
            ].map(([k, v]) => (
              <div key={k} className="rounded-lg border border-navy/10 bg-white p-4">
                <dt className="text-xs font-semibold uppercase tracking-wide text-brick">{k}</dt>
                <dd className="mt-1 text-sm">{v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>
    </>
  );
}
