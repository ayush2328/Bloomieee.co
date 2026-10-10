'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Lock, ArrowRight, Sparkles, AlertCircle } from 'lucide-react';

export default function AdminLoginPage() {
  const router = useRouter();
  const [pin, setPin] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await fetch('/api/admin/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pin }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Invalid Admin PIN');
      }

      sessionStorage.setItem('bloomieee_admin_token', data.token);
      router.push('/admin');
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-b from-ivory to-cream-light flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-3xl border border-border-warm shadow-xl p-8 space-y-6">
        <div className="text-center space-y-3">
          <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-sage/40 mx-auto bg-cream shadow-xs">
            <Image src="/images/brand/bloomieee-logo.png" alt="Logo" fill className="object-cover" />
          </div>
          <h1 className="font-editorial text-3xl font-semibold text-main">Bloomieee Studio</h1>
          <p className="text-xs text-muted">Owner &amp; Artisan Management Portal</p>
        </div>

        {error && (
          <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-xs text-red-700 flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-main mb-1.5">
              Admin Access PIN
            </label>
            <div className="relative">
              <input
                type="password"
                required
                value={pin}
                onChange={(e) => setPin(e.target.value)}
                placeholder="Enter PIN..."
                autoFocus
                className="w-full bg-cream-light border border-border-warm rounded-xl pl-10 pr-4 py-3 text-sm text-main focus:outline-hidden focus:border-sage"
              />
              <Lock className="w-4 h-4 text-muted absolute left-3.5 top-3.5" />
            </div>
            <p className="text-[11px] text-muted/70 mt-1">Default Studio PIN: <code className="bg-cream px-1.5 py-0.5 rounded text-olive font-semibold">bloom2026</code></p>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-olive hover:bg-olive-dark text-ivory py-3.5 rounded-full text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-md cursor-pointer disabled:opacity-50"
          >
            <span>{loading ? 'Verifying...' : 'Sign In to Studio'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="pt-4 border-t border-border-warm text-center">
          <Link href="/" className="text-xs text-sage hover:underline">
            ← Back to Storefront
          </Link>
        </div>
      </div>
    </div>
  );
}
