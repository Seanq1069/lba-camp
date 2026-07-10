import type { Content } from '@/lib/content';

export default function Footer({ content: c }: { content: Content }) {
  return (
    <footer className="bg-navy-dark py-10 text-center text-white">
      <div className="mb-4 flex items-end justify-center gap-5">
        {c.lbaLogoUrl && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={c.lbaLogoUrl} alt="Leesburg Baseball Academy" className="h-16 w-16 rounded-full object-cover" />
        )}
        {c.qLogoUrl && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={c.qLogoUrl} alt="Q Athletics" className="h-12 w-12 rounded-full bg-white object-contain p-1" />
        )}
      </div>
      <p className="text-sm text-white/70">
        Presented by Leesburg Baseball Academy · Brought to you by Q Athletics
      </p>
      <p className="mt-1 text-sm text-white/70">© {new Date().getFullYear()} Leesburg Baseball Academy</p>
      <p className="mt-2 text-sm font-semibold tracking-widest text-brick">{c.motto}</p>
    </footer>
  );
}
