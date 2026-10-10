'use client';

import React, { useState } from 'react';
import { Mail, CheckCircle2, AlertCircle } from 'lucide-react';

export default function NewsletterSection() {
  const [email, setEmail] = useState('');
  const [consent, setConsent] = useState(true);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ text: string; error?: boolean } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setMessage({ text: 'Please enter a valid email address.', error: true });
      return;
    }
    if (!consent) {
      setMessage({ text: 'Please agree to receive our floral letters.', error: true });
      return;
    }

    setLoading(true);
    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Subscription failed');
      }
      setMessage({ text: data.message });
      setEmail('');
    } catch (err: unknown) {
      setMessage({
        text: err instanceof Error ? err.message : 'Could not complete subscription. Try again.',
        error: true,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-20 bg-linear-to-b from-ivory to-cream-light border-t border-border-warm">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="w-12 h-12 rounded-full bg-sage-soft text-olive mx-auto flex items-center justify-center mb-4">
          <Mail className="w-5 h-5 text-sage" />
        </div>

        <h2 className="font-editorial text-3xl sm:text-4xl md:text-5xl font-semibold text-main mb-3">
          Letters &amp; Little Blooms
        </h2>
        <p className="text-xs sm:text-sm text-muted max-w-md mx-auto mb-8 leading-relaxed">
          Join our intimate circle. Receive exclusive seasonal drops, behind-the-scenes sculpting stories, and an instant 10% welcome voucher.
        </p>

        {message?.error === false ? (
          <div className="p-4 bg-sage-soft border border-sage/30 rounded-2xl text-xs text-olive inline-flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-sage" />
            <span>{message.text}</span>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-3">
            <div className="flex gap-2">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address..."
                className="flex-1 bg-white border border-border-warm rounded-full px-5 py-3 text-xs sm:text-sm text-main focus:outline-hidden focus:border-sage shadow-2xs"
              />
              <button
                type="submit"
                disabled={loading}
                className="bg-olive hover:bg-olive-dark text-ivory text-xs font-semibold uppercase tracking-wider px-6 py-3 rounded-full transition-all shadow-md shrink-0 disabled:opacity-50"
              >
                {loading ? 'Subscribing...' : 'Subscribe'}
              </button>
            </div>

            <div className="flex items-center justify-center gap-2 text-[11px] text-muted pt-1">
              <input
                type="checkbox"
                id="consent-check"
                checked={consent}
                onChange={(e) => setConsent(e.target.checked)}
                className="rounded border-border-warm text-sage focus:ring-sage"
              />
              <label htmlFor="consent-check" className="cursor-pointer">
                I agree to receive sweet floral emails. Unsubscribe anytime.
              </label>
            </div>

            {message?.error && (
              <p className="text-xs text-red-600 flex items-center justify-center gap-1.5 mt-2">
                <AlertCircle className="w-3.5 h-3.5" />
                <span>{message.text}</span>
              </p>
            )}
          </form>
        )}
      </div>
    </section>
  );
}
