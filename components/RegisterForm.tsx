'use client';

import { useState } from 'react';

const inputClass =
  'w-full rounded-md border border-navy/20 bg-white px-4 py-2.5 text-navy-dark placeholder-navy/40 focus:border-brick focus:outline-none';

const POSITIONS = [
  'Pitcher',
  'Catcher',
  'First Base',
  'Second Base',
  'Third Base',
  'Shortstop',
  'Outfield',
  'Utility / Not sure',
];

function Field({
  label,
  required,
  children,
  span2,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
  span2?: boolean;
}) {
  return (
    <div className={span2 ? 'sm:col-span-2' : ''}>
      <label className="mb-1 block text-sm font-semibold text-navy-dark">
        {label} {required && <span className="text-brick">*</span>}
      </label>
      {children}
    </div>
  );
}

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="mt-2 border-b border-navy/10 pb-2 text-lg font-bold text-navy sm:col-span-2">
      {children}
    </h3>
  );
}

export default function RegisterForm({
  formspreeId,
  agesHint = '',
}: {
  formspreeId: string;
  agesHint?: string;
}) {
  const ageNums = (agesHint.match(/\d+/g) || []).map(Number);
  const minAge = ageNums.length ? Math.min(...ageNums) : 7;
  const maxAge = ageNums.length ? Math.max(...ageNums) : 16;
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus('submitting');
    const data = new FormData(e.currentTarget);
    try {
      const res = await fetch(`https://formspree.io/f/${formspreeId}`, {
        method: 'POST',
        body: data,
        headers: { Accept: 'application/json' },
      });
      setStatus(res.ok ? 'success' : 'error');
    } catch {
      setStatus('error');
    }
  }

  if (status === 'success') {
    return (
      <div className="rounded-xl border border-navy/10 bg-white p-8 text-center shadow-sm">
        <p className="text-2xl font-bold text-navy">Registration received! ⚾</p>
        <p className="mt-2 text-navy-light">
          Thanks for signing up — your spot is reserved. Remember: bring the signed waiver and payment to check-in on
          the first morning of camp. Campers cannot participate without both.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="grid gap-4 rounded-xl border border-navy/10 bg-white p-6 shadow-sm sm:grid-cols-2 sm:p-8"
    >
      <SectionHeading>Parent / Guardian Information</SectionHeading>

      <Field label="Parent/guardian full name" required>
        <input name="Parent Name" required className={inputClass} placeholder="Full name" />
      </Field>
      <Field label="Email address" required>
        <input name="email" type="email" required className={inputClass} placeholder="you@example.com" />
      </Field>
      <Field label="Mobile phone number" required>
        <input name="Mobile Phone" type="tel" required className={inputClass} placeholder="(555) 555-5555" />
      </Field>
      <Field label="Preferred contact method" required>
        <select name="Preferred Contact Method" required className={inputClass} defaultValue="">
          <option value="" disabled>
            Select one
          </option>
          <option>Email</option>
          <option>Call</option>
          <option>Text</option>
        </select>
      </Field>
      <Field label="Home address" required span2>
        <input name="Home Address" required className={inputClass} placeholder="Street, city, state, ZIP" />
      </Field>
      <Field label="Second parent/guardian name">
        <input name="Second Parent Name" className={inputClass} placeholder="Optional" />
      </Field>
      <Field label="Second phone number">
        <input name="Second Phone" type="tel" className={inputClass} placeholder="Optional" />
      </Field>

      <SectionHeading>Camper Information</SectionHeading>

      <Field label="Camper full name" required>
        <input name="Camper Name" required className={inputClass} placeholder="Camper's full name" />
      </Field>
      <Field label="Date of birth" required>
        <input name="Camper Date of Birth" type="date" required className={inputClass} />
      </Field>
      <Field label="Age at start of camp" required>
        <input name="Age at Start of Camp" type="number" min={minAge} max={maxAge} required className={inputClass} placeholder={agesHint || `${minAge}–${maxAge}`} />
      </Field>
      <Field label="Current grade" required>
        <input name="Current Grade" required className={inputClass} placeholder="e.g., 5th" />
      </Field>

      <SectionHeading>Baseball Background</SectionHeading>

      <Field label="Primary position">
        <select name="Primary Position" className={inputClass} defaultValue="">
          <option value="" disabled>
            Select one
          </option>
          {POSITIONS.map((p) => (
            <option key={p}>{p}</option>
          ))}
        </select>
      </Field>
      <Field label="Secondary position">
        <select name="Secondary Position" className={inputClass} defaultValue="">
          <option value="" disabled>
            Select one
          </option>
          <option>None</option>
          {POSITIONS.map((p) => (
            <option key={p}>{p}</option>
          ))}
        </select>
      </Field>
      <Field label="Years of baseball experience">
        <input name="Years of Experience" type="number" min={0} max={12} className={inputClass} placeholder="e.g., 3" />
      </Field>
      <Field label="Playing level">
        <select name="Playing Level" className={inputClass} defaultValue="">
          <option value="" disabled>
            Select one
          </option>
          <option>Beginner</option>
          <option>Recreation league</option>
          <option>Travel baseball</option>
          <option>Other</option>
        </select>
      </Field>
      <Field label="Bats">
        <select name="Bats" className={inputClass} defaultValue="">
          <option value="" disabled>
            Select one
          </option>
          <option>Right</option>
          <option>Left</option>
          <option>Switch</option>
        </select>
      </Field>
      <Field label="Throws">
        <select name="Throws" className={inputClass} defaultValue="">
          <option value="" disabled>
            Select one
          </option>
          <option>Right</option>
          <option>Left</option>
        </select>
      </Field>

      <div className="sm:col-span-2">
        <button
          type="submit"
          disabled={status === 'submitting'}
          className="w-full rounded-md bg-brick px-6 py-3 font-semibold text-white transition-colors hover:bg-brick-dark disabled:opacity-60 sm:w-auto"
        >
          {status === 'submitting' ? 'Submitting…' : 'Submit Registration'}
        </button>
        {status === 'error' && (
          <p className="mt-2 text-sm text-brick">Something went wrong — please try again or email us directly.</p>
        )}
      </div>
    </form>
  );
}
