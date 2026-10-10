'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Sparkles, Send, CheckCircle2, AlertCircle, HeartHandshake } from 'lucide-react';

export default function CustomBouquetSection() {
  const [formData, setFormData] = useState({
    customerName: '',
    contact: '',
    flowerTypes: ['Tulips', 'Lilies'],
    preferredColors: '',
    bouquetSize: 'Standard Bouquet (5-7 stems)',
    budgetRange: '₹1000 - ₹2000',
    occasion: 'Birthday',
    notes: '',
  });

  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const availableFlowers = ['Tulips', 'Roses', 'Lilies', 'Sunflowers', 'Daisies', 'Lavender', 'Hyacinth'];
  const sizeOptions = [
    { label: 'Mini / Single Stem (1-3 stems)', price: '₹499 - ₹899' },
    { label: 'Standard Bouquet (5-7 stems)', price: '₹1,299 - ₹1,899' },
    { label: 'Grand Deluxe (10-15 stems)', price: '₹2,199 - ₹3,499' },
  ];
  const colorSuggestions = [
    'Pastel Lilac & Blush',
    'Royal Cobalt & White',
    'Buttercream & Lavender',
    'Sunset Peach & Cream',
    'Crimson & Wine Burgundy',
    'Golden Sunshine & Kraft',
  ];

  const handleFlowerToggle = (flower: string) => {
    setFormData((prev) => {
      const exists = prev.flowerTypes.includes(flower);
      if (exists) {
        return { ...prev, flowerTypes: prev.flowerTypes.filter((f) => f !== flower) };
      } else {
        return { ...prev, flowerTypes: [...prev.flowerTypes, flower] };
      }
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setSuccessMsg(null);

    if (!formData.customerName.trim() || !formData.contact.trim()) {
      setErrorMsg('Please provide your name and WhatsApp / contact information.');
      return;
    }
    if (!formData.preferredColors.trim()) {
      setErrorMsg('Please specify your desired flower colors or select one from the palette.');
      return;
    }

    setLoading(true);
    try {
      const res = await fetch('/api/custom-requests', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Submission failed');
      }

      setSuccessMsg(data.message || 'Your custom bouquet request has been received! We will WhatsApp you shortly.');
      setFormData({
        customerName: '',
        contact: '',
        flowerTypes: ['Tulips'],
        preferredColors: '',
        bouquetSize: 'Standard Bouquet (5-7 stems)',
        budgetRange: '₹1000 - ₹2000',
        occasion: 'Birthday',
        notes: '',
      });
    } catch (err: unknown) {
      setErrorMsg(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="custom-bouquet-section" className="py-20 bg-cream/40 relative overflow-hidden">
      {/* Decorative background blurs */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-blush/30 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-lavender/30 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs uppercase tracking-widest text-sage font-semibold bg-sage-soft px-3 py-1 rounded-full inline-flex items-center gap-1.5 mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            Bespoke Floral Artistry
          </span>
          <h2 className="font-editorial text-3xl sm:text-4xl md:text-5xl font-semibold text-main mb-4">
            Dream It. We&apos;ll Bloom It.
          </h2>
          <p className="text-sm sm:text-base text-muted font-normal leading-relaxed">
            Have a dream color palette or favorite blooms in mind? Tell us what you envision, and our floral artisan will hand-sculpt a bespoke everlasting pipe-cleaner bouquet tailored just for you.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Visual Showcase Card */}
          <div className="lg:col-span-5 bg-white rounded-3xl p-6 sm:p-8 border border-border-warm shadow-md flex flex-col justify-between h-full">
            <div>
              <div className="relative aspect-4/3 rounded-2xl overflow-hidden bg-cream mb-6">
                <Image
                  src="/images/products/lavender-romance-bouquet.jpg"
                  alt="Custom Handmade Pipe-Cleaner Bouquet"
                  fill
                  className="object-cover"
                />
                <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-xs px-3 py-1.5 rounded-full text-xs font-medium text-olive shadow-xs flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-sage" />
                  <span>100% Handcrafted Chenille Velvet</span>
                </div>
              </div>

              <h3 className="font-editorial text-2xl font-semibold text-main mb-3">
                How Custom Orders Work
              </h3>
              <ul className="space-y-3.5 text-xs sm:text-sm text-muted">
                <li className="flex items-start gap-3">
                  <span className="w-5 h-5 rounded-full bg-sage-soft text-olive font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                    1
                  </span>
                  <span>Share your favorite flowers, colors, occasion, and wrapping preference.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-5 h-5 rounded-full bg-sage-soft text-olive font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                    2
                  </span>
                  <span>We contact you on WhatsApp with stem mockups and final design confirmation.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-5 h-5 rounded-full bg-sage-soft text-olive font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                    3
                  </span>
                  <span>We sculpt each petal, send you approval photos, and ship safely in our boutique box!</span>
                </li>
              </ul>
            </div>

            <div className="mt-8 pt-6 border-t border-border-warm flex items-center gap-3 bg-cream-light p-4 rounded-2xl">
              <HeartHandshake className="w-6 h-6 text-sage shrink-0" />
              <div className="text-xs text-muted">
                <p className="font-semibold text-main">Photo Approval Before Dispatch</p>
                <p>You inspect and approve the finished bouquet before we send it out!</p>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Form */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-border-warm shadow-md">
            {successMsg ? (
              <div className="py-12 px-6 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-sage-soft text-olive mx-auto flex items-center justify-center">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h3 className="font-editorial text-3xl font-semibold text-main">
                  Request Received With Love ♡
                </h3>
                <p className="text-sm text-muted max-w-md mx-auto leading-relaxed">
                  {successMsg}
                </p>
                <button
                  onClick={() => setSuccessMsg(null)}
                  className="bg-olive hover:bg-olive-dark text-ivory text-xs font-semibold uppercase tracking-wider px-6 py-2.5 rounded-full transition-all mt-4"
                >
                  Submit Another Request
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {errorMsg && (
                  <div className="p-3.5 bg-red-50 border border-red-200 rounded-xl text-xs text-red-700 flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{errorMsg}</span>
                  </div>
                )}

                {/* 1. Flower Types */}
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-main mb-2">
                    1. Preferred Flower Types
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {availableFlowers.map((flower) => {
                      const selected = formData.flowerTypes.includes(flower);
                      return (
                        <button
                          key={flower}
                          type="button"
                          onClick={() => handleFlowerToggle(flower)}
                          className={`text-xs px-3.5 py-1.5 rounded-full border transition-all ${
                            selected
                              ? 'bg-sage text-ivory border-sage font-medium shadow-xs'
                              : 'bg-cream-light text-main border-border-warm hover:border-sage'
                          }`}
                        >
                          {selected ? `✓ ${flower}` : `+ ${flower}`}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* 2. Color Palette */}
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-main mb-1.5">
                    2. Desired Colors / Vibe
                  </label>
                  <input
                    type="text"
                    value={formData.preferredColors}
                    onChange={(e) => setFormData({ ...formData, preferredColors: e.target.value })}
                    placeholder="e.g. Royal Blue & Pearl White, Soft Pastels, or Sunflower Yellow"
                    className="w-full bg-cream-light border border-border-warm rounded-xl px-4 py-2.5 text-xs text-main focus:outline-hidden focus:border-sage"
                  />
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    <span className="text-[11px] text-muted self-center mr-1">Popular:</span>
                    {colorSuggestions.map((col) => (
                      <button
                        key={col}
                        type="button"
                        onClick={() => setFormData({ ...formData, preferredColors: col })}
                        className="text-[10px] bg-cream hover:bg-border-warm text-main px-2 py-0.5 rounded-full transition-colors"
                      >
                        {col}
                      </button>
                    ))}
                  </div>
                </div>

                {/* 3. Bouquet Size & Budget */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-main mb-1.5">
                      3. Bouquet Size
                    </label>
                    <select
                      value={formData.bouquetSize}
                      onChange={(e) => setFormData({ ...formData, bouquetSize: e.target.value })}
                      className="w-full bg-cream-light border border-border-warm rounded-xl px-3 py-2.5 text-xs text-main focus:outline-hidden focus:border-sage"
                    >
                      {sizeOptions.map((opt) => (
                        <option key={opt.label} value={opt.label}>
                          {opt.label} ({opt.price})
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-main mb-1.5">
                      4. Occasion
                    </label>
                    <select
                      value={formData.occasion}
                      onChange={(e) => setFormData({ ...formData, occasion: e.target.value })}
                      className="w-full bg-cream-light border border-border-warm rounded-xl px-3 py-2.5 text-xs text-main focus:outline-hidden focus:border-sage"
                    >
                      {['Birthday', 'Anniversary', 'Graduation', 'Just Because', 'Special Surprise', 'Wedding / Bridal'].map(
                        (occ) => (
                          <option key={occ} value={occ}>
                            {occ}
                          </option>
                        )
                      )}
                    </select>
                  </div>
                </div>

                {/* 5. Personalization Notes */}
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-main mb-1.5">
                    5. Personalization Notes & Special Requests
                  </label>
                  <textarea
                    rows={2}
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    placeholder="Tell us if you want specific wrapping (e.g. pleated tulle, kraft paper, clear bag) or a special handwritten note card..."
                    className="w-full bg-cream-light border border-border-warm rounded-xl px-4 py-2.5 text-xs text-main focus:outline-hidden focus:border-sage resize-none"
                  />
                </div>

                {/* 6. Customer Details */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-border-warm">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-main mb-1.5">
                      Your Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.customerName}
                      onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
                      placeholder="e.g. Priyanshi Mehta"
                      className="w-full bg-cream-light border border-border-warm rounded-xl px-4 py-2.5 text-xs text-main focus:outline-hidden focus:border-sage"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-main mb-1.5">
                      WhatsApp Number / Email *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.contact}
                      onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                      placeholder="e.g. +91 98765 43210"
                      className="w-full bg-cream-light border border-border-warm rounded-xl px-4 py-2.5 text-xs text-main focus:outline-hidden focus:border-sage"
                    />
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-olive hover:bg-olive-dark text-ivory py-3.5 rounded-full text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-md hover:shadow-lg disabled:opacity-50 cursor-pointer"
                >
                  {loading ? (
                    <span>Submitting Your Request...</span>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Request Your Custom Bouquet</span>
                    </>
                  )}
                </button>

                <p className="text-[11px] text-center text-muted">
                  ✨ No advance payment required for initial inquiry. We will contact you with exact photos and pricing.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
