import type { Content } from '@/lib/content';

export default function Footer({ content: c }: { content: Content }) {
  return (
    <footer className="bg-navy-dark py-10 text-center text-white">
      <div className="mb-4 flex items-center justify-center gap-4">
        {c.lbaLogoUrl && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={c.lbaLogoUrl} alt="LBA" className="h-12 w-12 rounded-full object-cover" />
        )}
        {c.qLogoUrl && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={c.qLogoUrl} alt="Q Athletics" className="h-12 w-12 rounded-full object-cover bg-white p-1" />
        )}
      </div>
      <p className="text-sm text-white/70">
        © {new Date().getFullYear()} Leesburg Baseball Academy · {c.presentedBy}
      </p>
      <p className="mt-1 text-sm font-semibold tracking-widest text-brick">{c.motto}</p>
    </footer>
  );
}
