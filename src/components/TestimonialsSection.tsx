'use client';

import React from 'react';
import { Star, CheckCircle2, Quote } from 'lucide-react';

export default function TestimonialsSection() {
  const reviews = [
    {
      name: 'Simran K.',
      location: 'New Delhi',
      rating: 5,
      product: 'Royal Blue Velvet Tulips',
      date: 'March 2026',
      review:
        'The royal blue tulips look even more stunning in person than on Instagram! My best friend cried tears of joy when she opened the box. The craftsmanship is pure perfection.',
    },
    {
      name: 'Arjun & Sneha',
      location: 'Bengaluru',
      rating: 5,
      product: 'Lavender Romance Bouquet',
      date: 'February 2026',
      review:
        'Ordered the Lavender Romance bouquet for our 2nd anniversary. The fact that these flowers will never wilt and sit beautifully on our dresser forever makes them so special.',
    },
    {
      name: 'Meera Trivedi',
      location: 'Ahmedabad',
      rating: 5,
      product: 'Sunlit Sunflower Bouquet',
      date: 'March 2026',
      review:
        'The team at Bloomieee customized my sunflower bouquet exactly how I imagined it. Super fast delivery and the handwritten note card was so heartwarming!',
    },
  ];

  return (
    <section className="py-20 bg-ivory">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-14">
          <span className="text-xs uppercase tracking-widest text-sage font-semibold">
            Kind Words
          </span>
          <h2 className="font-editorial text-3xl sm:text-4xl font-semibold text-main mt-1 mb-3">
            Cherished by Flower Lovers
          </h2>
          <p className="text-xs sm:text-sm text-muted">
            Read heartfelt stories from customers who gifted little pieces of forever.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviews.map((rev, idx) => (
            <div
              key={idx}
              className="p-7 rounded-3xl bg-cream/35 border border-border-warm flex flex-col justify-between shadow-2xs hover:shadow-md transition-shadow"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex gap-1 text-amber-500">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  <Quote className="w-6 h-6 text-sage/40" />
                </div>

                <p className="text-xs sm:text-sm text-main/90 leading-relaxed italic mb-6">
                  &ldquo;{rev.review}&rdquo;
                </p>
              </div>

              <div className="pt-4 border-t border-border-warm/70 flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-semibold text-main">{rev.name}</span>
                    <span title="Verified Customer">
                      <CheckCircle2 className="w-3.5 h-3.5 text-sage" />
                    </span>
                  </div>
                  <span className="text-[11px] text-muted">{rev.location}</span>
                </div>
                <div className="text-right">
                  <span className="text-[10px] text-sage font-medium block">{rev.product}</span>
                  <span className="text-[10px] text-muted">{rev.date}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
