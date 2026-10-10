'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Sparkles, Heart, Clock, Palette } from 'lucide-react';

export default function BrandStorySection() {
  return (
    <section className="py-20 lg:py-28 bg-ivory relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Image with luxury layered badge */}
          <div className="lg:col-span-6 relative">
            <div className="relative aspect-4/3 sm:aspect-square w-full rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-cream">
              <Image
                src="/images/brand/luxury-gift-box.jpg"
                alt="Bloomieee Handmade Crafting Studio and Luxury Packaging"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/40 via-transparent to-transparent" />
            </div>

            {/* Overlapping circular logo badge */}
            <div className="absolute -bottom-6 -right-6 sm:bottom-6 sm:-right-8 bg-white/95 backdrop-blur-md p-4 rounded-3xl shadow-xl border border-border-warm flex items-center gap-3 max-w-xs">
              <div className="relative w-12 h-12 rounded-full overflow-hidden shrink-0 border border-sage/40">
                <Image
                  src="/images/brand/bloomieee-logo.png"
                  alt="Bloomieee Logo"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="text-left text-xs">
                <p className="font-editorial text-sm font-semibold text-main">Bloomieee.co</p>
                <p className="text-muted text-[11px]">Hand-spun pipe cleaner florals, made to cherish forever.</p>
              </div>
            </div>
          </div>

          {/* Right Column: Editorial Copy */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            <div className="inline-flex items-center gap-1.5 text-xs uppercase tracking-widest text-sage font-semibold mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Our Philosophy</span>
            </div>

            <h2 className="font-editorial text-3xl sm:text-4xl md:text-5xl font-semibold text-main leading-tight mb-6">
              Not Just Flowers.{' '}
              <span className="italic text-olive font-semibold">Little Pieces of Forever.</span>
            </h2>

            <div className="space-y-4 text-sm sm:text-base text-muted font-normal leading-relaxed mb-8">
              <p>
                Fresh flowers bring joy for a few fleeting days before wilting away. At Bloomieee.co, we believe the special gestures in life — love, gratitude, friendship, and celebration — deserve to be held onto forever.
              </p>
              <p>
                Every single petal, stamen, and leaf is hand-sculpted in our studio using plush, velvet-touch chenille pipe cleaners. Each bouquet is an artistic labor of patience, shaped with gentle precision and wrapped in editorial Korean and pleated tulle papers.
              </p>
            </div>

            {/* 3 Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8 pt-4 border-t border-border-warm">
              <div className="flex items-start gap-2.5">
                <Clock className="w-5 h-5 text-sage shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-semibold text-main">Everlasting</h4>
                  <p className="text-[11px] text-muted">Never wilts, fades, or sheds petals.</p>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <Palette className="w-5 h-5 text-olive shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-semibold text-main">Custom Tones</h4>
                  <p className="text-[11px] text-muted">Curated color palettes you won't find in nature.</p>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <Heart className="w-5 h-5 text-blush-dark shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-semibold text-main">Gift Ready</h4>
                  <p className="text-[11px] text-muted">Bespoke ribbons and keepsake cards included.</p>
                </div>
              </div>
            </div>

            <div>
              <Link
                href="/about"
                className="inline-flex items-center gap-2 bg-cream hover:bg-border-warm text-main border border-border-warm px-6 py-3 rounded-full text-xs font-semibold uppercase tracking-wider transition-all group"
              >
                <span>Discover Our Story</span>
                <ArrowRight className="w-4 h-4 text-sage group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
