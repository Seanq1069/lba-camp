import type { Content } from '@/lib/content';
import RegisterForm from './RegisterForm';

export default function RegisterSection({
  content: c,
  formspreeId,
}: {
  content: Content;
  formspreeId: string;
}) {
  return (
    <section id="register" className="bg-navy-dark py-16 text-white">
      <div className="mx-auto max-w-3xl px-4">
        <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-brick">Register</p>
        <h2 className="text-3xl font-extrabold">Secure your spot</h2>
        <p className="mt-3 text-white/80">
          Spots are limited to {c.maxEnrollment}. Submit the registration form below and we&apos;ll follow up by email
          with payment instructions to confirm your camper&apos;s spot.
        </p>
        <div className="mt-8">
          {formspreeId ? (
            <RegisterForm formspreeId={formspreeId} />
          ) : (
            <a
              href={`mailto:${c.contactEmail}?subject=LBA%20Camp%20Registration`}
              className="inline-block rounded-md bg-brick px-6 py-3 font-semibold hover:bg-brick-dark transition-colors"
            >
              Email us to register
            </a>
          )}
        </div>
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
