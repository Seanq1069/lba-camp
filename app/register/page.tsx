import type { Metadata } from 'next';
import Link from 'next/link';
import { getContent } from '@/lib/content';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import RegisterForm from '@/components/RegisterForm';

export const revalidate = 60;

export const metadata: Metadata = {
  title: 'Register | Leesburg Baseball Academy Camp',
  description:
    'Register your camper for the Leesburg Baseball Academy Camp, brought to you by Q Athletics.',
};

export default async function RegisterPage() {
  const c = await getContent();
  const formspreeId = process.env.NEXT_PUBLIC_FORMSPREE_ID || '';

  return (
    <main className="bg-cream">
      <Header content={c} />
      <div className="mx-auto max-w-3xl px-4 py-12">
        <Link href="/" className="text-sm font-semibold text-brick hover:underline">
          ← Back to camp info
        </Link>
        <p className="mb-2 mt-4 text-sm font-semibold uppercase tracking-widest text-brick">Register</p>
        <h1 className="text-3xl font-extrabold text-navy-dark md:text-4xl">Camper Registration</h1>
        <p className="mt-3 text-navy-light">
          {c.dates} · {c.location} · Ages {c.ages.split('(')[0].trim()} · {c.tuition}
        </p>
        <p className="mt-2 text-navy-light">
          Enrollment is limited to {c.maxEnrollment}. Submit the form below to reserve your camper&apos;s spot.
        </p>
        <p className="mt-3 rounded-lg border border-brick/30 bg-brick/5 p-4 text-sm font-semibold text-navy-dark">
          Important: the signed waiver and payment are both due at the field on the first morning of camp. Campers
          cannot participate without them.
        </p>
        {c.waiverUrl && (
          <div className="mt-8 flex flex-col items-start gap-3 rounded-xl border border-navy/10 bg-white p-6 shadow-sm sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-lg font-bold text-navy-dark">Camp waiver</h2>
              <p className="mt-1 text-sm text-navy-light">
                Download the waiver, sign it, and bring it with your payment to check-in on the first day — both are required before your camper can take the field.
              </p>
            </div>
            <a
              href={c.waiverUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="shrink-0 rounded-md bg-navy px-5 py-2.5 font-semibold text-white transition-colors hover:bg-navy-light"
            >
              Download waiver (PDF)
            </a>
          </div>
        )}
        <div className="mt-8">
          {formspreeId ? (
            <RegisterForm formspreeId={formspreeId} />
          ) : (
            <a
              href={`mailto:${c.contactEmail}?subject=LBA%20Camp%20Registration`}
              className="inline-block rounded-md bg-brick px-6 py-3 font-semibold text-white transition-colors hover:bg-brick-dark"
            >
              Email us to register
            </a>
          )}
        </div>
        <p className="mt-6 text-sm text-navy-light">
          Questions?{' '}
          <a href={`mailto:${c.contactEmail}`} className="underline hover:text-navy-dark">
            {c.contactEmail}
          </a>
        </p>
      </div>
      <Footer content={c} />
    </main>
  );
}
