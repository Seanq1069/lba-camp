import Link from 'next/link';
import type { Content } from '@/lib/content';

export default function RegisterSection({ content: c }: { content: Content }) {
  return (
    <section id="register" className="bg-navy-dark py-16 text-white">
      <div className="mx-auto max-w-3xl px-4 text-center">
        <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-brick">Register</p>
        <h2 className="text-3xl font-extrabold">Secure your spot</h2>
        <p className="mx-auto mt-3 max-w-xl text-white/80">
          Spots are limited to {c.maxEnrollment}. Registration takes about two minutes. Signed waiver and payment are
          due at check-in on the first day of camp.
        </p>
        <Link
          href="/register"
          className="mt-8 inline-block rounded-md bg-brick px-10 py-4 text-lg font-semibold transition-colors hover:bg-brick-dark"
        >
          Register Now
        </Link>
        <p className="mt-6 text-sm text-white/60">
          Questions?{' '}
          <a href={`mailto:${c.contactEmail}`} className="underline hover:text-white">
            {c.contactEmail}
          </a>
        </p>
      </div>
    </section>
  );
}
