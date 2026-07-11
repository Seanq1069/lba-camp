import type { Content } from '@/lib/content';

export default function Header({ content: c }: { content: Content }) {
  return (
    <header className="sticky top-0 z-50 bg-navy-dark text-white shadow-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <div className="flex items-center gap-3">
          <a href="/" aria-label="Leesburg Baseball Academy home">
            {c.lbaLogoUrl && (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={c.lbaLogoUrl} alt="Leesburg Baseball Academy" className="h-11 w-11 rounded-full object-cover" />
            )}
          </a>
          <div className="leading-tight">
            <a href="/" className="block font-bold hover:underline">
              Leesburg Baseball Academy
            </a>
            <a
              href="https://qathletics.net/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-white/70 hover:text-white hover:underline"
            >
              Brought to you by Q Athletics
            </a>
          </div>
        </div>
        <a
          href="/register"
          className="rounded-md bg-brick px-4 py-2 text-sm font-semibold hover:bg-brick-dark transition-colors"
        >
          Register Now
        </a>
      </div>
    </header>
  );
}
