import type { Content } from '@/lib/content';

export default function Header({ content: c }: { content: Content }) {
  return (
    <header className="sticky top-0 z-50 bg-navy-dark text-white shadow-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <div className="flex items-center gap-3">
          {c.lbaLogoUrl && (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={c.lbaLogoUrl} alt="Leesburg Baseball Academy" className="h-11 w-11 rounded-full object-cover" />
          )}
          <div className="leading-tight">
            <p className="font-bold">Leesburg Baseball Academy</p>
            <p className="text-xs text-white/70">Sponsored by Q Athletics</p>
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
