'use client';

import React from 'react';
import Link from 'next/link';
import { Cake, HeartHandshake, Sparkles, Smile, Gift, ArrowRight } from 'lucide-react';

export default function GiftByOccasionSection() {
  const occasions = [
    {
      title: 'Birthdays',
      desc: 'Cheerful sunflowers, bright tulips, and celebratory pastel mixes.',
      icon: Cake,
      color: 'bg-blush/40 hover:bg-blush/70 text-olive',
      link: '/shop?occasion=Birthdays',
    },
    {
      title: 'Anniversaries',
      desc: 'Romantic lavender bouquets, deep red roses, and everlasting blooms.',
      icon: HeartHandshake,
      color: 'bg-lavender/40 hover:bg-lavender/70 text-olive',
      link: '/shop?occasion=Anniversaries',
    },
    {
      title: 'Friendship Gifts',
      desc: 'Playful daisies, sunny sunflowers, and adorable mini flower cones.',
      icon: Smile,
      color: 'bg-sage-soft hover:bg-sage/20 text-olive',
      link: '/shop?occasion=Friendship+Gifts',
    },
    {
      title: 'Just Because',
      desc: 'Gentle everyday reminders of love and care that never fade.',
      icon: Sparkles,
      color: 'bg-cream hover:bg-cream-hover text-main',
      link: '/shop?occasion=Just+Because',
    },
    {
      title: 'Special Surprises',
      desc: 'Bespoke custom luxury arrangements and curated flower box sets.',
      icon: Gift,
      color: 'bg-blush-light hover:bg-blush/50 text-olive',
      link: '/shop?occasion=Special+Surprises',
    },
  ];

  return (
    <section className="py-20 bg-ivory">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs uppercase tracking-widest text-sage font-semibold">
            Thoughtful Gifting
          </span>
          <h2 className="font-editorial text-3xl sm:text-4xl font-semibold text-main mt-1 mb-3">
            Gift by Meaningful Occasion
          </h2>
          <p className="text-xs sm:text-sm text-muted">
            Find the perfect everlasting arrangement designed to evoke joy and timeless memories.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
          {occasions.map((occ) => {
            const Icon = occ.icon;
            return (
              <Link
                key={occ.title}
                href={occ.link}
                className={`p-6 rounded-2xl border border-border-warm transition-all duration-300 flex flex-col justify-between group shadow-2xs hover:shadow-md hover:-translate-y-1 ${occ.color}`}
              >
                <div>
                  <div className="w-10 h-10 rounded-full bg-white/80 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <Icon className="w-5 h-5 text-olive" />
                  </div>
                  <h3 className="font-editorial text-xl font-semibold text-main mb-2">
                    {occ.title}
                  </h3>
                  <p className="text-xs text-muted/90 leading-relaxed">
                    {occ.desc}
                  </p>
                </div>

                <div className="mt-6 flex items-center gap-1 text-xs font-semibold text-olive group-hover:underline">
                  <span>Explore blooms</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
