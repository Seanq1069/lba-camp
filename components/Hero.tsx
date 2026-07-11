import { Anton } from 'next/font/google';
import type { Content } from '@/lib/content';

const anton = Anton({ weight: '400', subsets: ['latin'] });

const COLOR_MARKS: Record<string, string> = {
  brick: '#c94a5a',
  gold: '#e8c15a',
  lightblue: '#9db8e8',
  navy: '#25407a',
  lightgrey: '#c8ccd4',
};

function RichHeadline({ blocks }: { blocks: any[] }) {
  return (
    <>
      {blocks.map((block, i) => (
        <span key={block._key || i}>
          {i > 0 && <br />}
          {(block.children || []).map((child: any, j: number) => {
            let el: React.ReactNode = child.text;
            for (const m of child.marks || []) {
              if (m === 'strong') el = <strong>{el}</strong>;
              else if (m === 'em') el = <em>{el}</em>;
              else if (COLOR_MARKS[m]) el = <span style={{ color: COLOR_MARKS[m] }}>{el}</span>;
            }
            return <span key={child._key || j}>{el}</span>;
          })}
        </span>
      ))}
    </>
  );
}

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
        <h1 className={`${anton.className} max-w-3xl text-5xl uppercase leading-[1.05] md:text-6xl`} style={{ color: c.headlineColor }}>
          {c.headlineRich ? <RichHeadline blocks={c.headlineRich} /> : c.headline}
        </h1>
        <p className="mt-5 max-w-2xl text-lg text-white/85">{c.subheadline}</p>

        <a href="https://qathletics.net/" target="_blank" rel="noopener noreferrer" className="mt-6 inline-flex items-center gap-2 rounded-full bg-white/10 py-1.5 pl-1.5 pr-4 transition-colors hover:bg-white/20">
          {c.qLogoUrl && (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={c.qLogoUrl} alt="Q Athletics" className="h-8 w-8 rounded-full bg-white object-contain p-1" />
          )}
          <span className="text-sm font-semibold text-white/85">Brought to you by Q Athletics</span>
        </a>

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
