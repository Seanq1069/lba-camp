'use client';

import { useState } from 'react';

const inputClass =
  'w-full rounded-md border border-white/20 bg-white/10 px-4 py-2.5 text-white placeholder-white/40 focus:border-brick focus:outline-none';

export default function RegisterForm({ formspreeId }: { formspreeId: string }) {
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
      <div className="rounded-xl bg-white/10 p-8 text-center">
        <p className="text-2xl font-bold">Registration received! ⚾</p>
        <p className="mt-2 text-white/80">
          Thanks for signing up. We&apos;ll email you shortly with payment instructions to confirm your camper&apos;s
          spot.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-4 sm:grid-cols-2">
      <div>
        <label className="mb-1 block text-sm font-semibold">Parent / guardian name *</label>
        <input name="Parent Name" required className={inputClass} placeholder="Full name" />
      </div>
      <div>
        <label className="mb-1 block text-sm font-semibold">Email *</label>
        <input name="email" type="email" required className={inputClass} placeholder="you@example.com" />
      </div>
      <div>
        <label className="mb-1 block text-sm font-semibold">Phone *</label>
        <input name="Phone" type="tel" required className={inputClass} placeholder="(555) 555-5555" />
      </div>
      <div>
        <label className="mb-1 block text-sm font-semibold">Camper name *</label>
        <input name="Camper Name" required className={inputClass} placeholder="Camper's full name" />
      </div>
      <div>
        <label className="mb-1 block text-sm font-semibold">Camper age *</label>
        <input name="Camper Age" type="number" min={7} max={16} required className={inputClass} placeholder="9–14" />
      </div>
      <div>
        <label className="mb-1 block text-sm font-semibold">Experience level</label>
        <select name="Experience Level" className={inputClass} defaultValue="">
          <option value="" disabled>
            Select one
          </option>
          <option>Beginner</option>
          <option>Rec league</option>
          <option>Travel / club</option>
          <option>School team</option>
        </select>
      </div>
      <div className="sm:col-span-2">
        <label className="mb-1 block text-sm font-semibold">T-shirt size</label>
        <select name="Shirt Size" className={inputClass} defaultValue="">
          <option value="" disabled>
            Select one
          </option>
          <option>Youth S</option>
          <option>Youth M</option>
          <option>Youth L</option>
          <option>Adult S</option>
          <option>Adult M</option>
          <option>Adult L</option>
        </select>
      </div>
      <div className="sm:col-span-2">
        <label className="mb-1 block text-sm font-semibold">
          Allergies, medical notes or anything we should know
        </label>
        <textarea name="Notes" rows={3} className={inputClass} placeholder="Optional" />
      </div>
      <div className="sm:col-span-2">
        <button
          type="submit"
          disabled={status === 'submitting'}
          className="w-full rounded-md bg-brick px-6 py-3 font-semibold hover:bg-brick-dark transition-colors disabled:opacity-60 sm:w-auto"
        >
          {status === 'submitting' ? 'Submitting…' : 'Submit Registration'}
        </button>
        {status === 'error' && (
          <p className="mt-2 text-sm text-red-300">Something went wrong — please try again or email us directly.</p>
        )}
      </div>
    </form>
  );
}
