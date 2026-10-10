'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Sparkles, Heart, Flower2, ShieldCheck } from 'lucide-react';

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden pt-8 pb-12 sm:pb-16 lg:py-20 bg-linear-to-b from-ivory via-cream-light to-ivory">
      {/* Botanical backdrop */}
      <div className="absolute top-12 left-4 sm:left-10 w-48 sm:w-72 h-48 sm:h-72 rounded-full bg-blush/25 blur-3xl pointer-events-none" />
      <div className="absolute top-20 right-4 sm:right-10 w-56 sm:w-80 h-56 sm:h-80 rounded-full bg-lavender/25 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-72 sm:w-96 h-72 sm:h-96 rounded-full bg-cream blur-2xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 items-center">

          {/* Left Column: Copy */}
          <div className="lg:col-span-6 flex flex-col justify-center text-left order-2 lg:order-1">
            {/* Pill Badge */}
            <div className="inline-flex items-center gap-2 bg-cream border border-border-warm px-3 py-1.5 rounded-full text-xs text-olive font-medium shadow-2xs mb-5 w-fit">
              <Sparkles className="w-3 h-3 text-sage" />
              <span>India&apos;s Independent Everlasting Floral Studio</span>
            </div>

            {/* Headline */}
            <h1 className="font-editorial text-[36px] sm:text-5xl md:text-6xl lg:text-[64px] leading-[1.1] font-medium text-main tracking-tight mb-5">
              Flowers That <span className="italic text-olive font-semibold">Stay</span>, Memories That{' '}
              <span className="italic text-sage font-semibold">Bloom</span>.
            </h1>

            {/* Sub-copy */}
            <p className="text-sm sm:text-base text-muted/90 max-w-xl font-normal leading-relaxed mb-7">
              Handcrafted pipe-cleaner blooms, made to make your little moments unforgettable. Sculpted petal by petal with soft chenille velvet — everlasting, romantic, and made with love.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 mb-8">
              <Link
                href="/shop"
                className="inline-flex items-center justify-center gap-2 bg-olive hover:bg-olive-dark text-ivory px-6 py-3.5 rounded-full text-sm font-semibold uppercase tracking-wider transition-all duration-200 shadow-md hover:shadow-lg group"
              >
                <span>Shop the Collection</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/custom-bouquet"
                className="inline-flex items-center justify-center gap-2 bg-white hover:bg-cream-light text-main border border-border-warm px-5 py-3.5 rounded-full text-sm font-semibold uppercase tracking-wider transition-all duration-200 shadow-2xs hover:border-sage"
              >
                <Sparkles className="w-4 h-4 text-sage shrink-0" />
                <span>Custom Bouquet</span>
              </Link>
            </div>

            {/* Trust Badges */}
            <div className="pt-5 border-t border-border-warm/70 flex flex-wrap gap-x-5 gap-y-2.5 text-xs text-muted">
              <div className="flex items-center gap-2">
                <Flower2 className="w-4 h-4 text-sage shrink-0" />
                <span className="font-medium">Never Wilts or Dries</span>
              </div>
              <div className="flex items-center gap-2">
                <Heart className="w-4 h-4 text-blush-dark shrink-0" />
                <span className="font-medium">100% Hand-Sculpted</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-sage shrink-0" />
                <span className="font-medium">All-India Shipping</span>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Image */}
          <div className="lg:col-span-6 relative flex justify-center items-center order-1 lg:order-2">
            <div className="relative w-full max-w-[340px] sm:max-w-md lg:max-w-lg aspect-4/5 rounded-3xl overflow-hidden shadow-2xl border-4 border-white/80 bg-cream mx-auto">
              <Image
                src="/images/products/lavender-romance-bouquet.jpg"
                alt="Bloomieee.co Signature Lavender Pipe-Cleaner Bouquet"
                fill
                priority
                className="object-cover object-center"
              />

              {/* Floating badges */}
              <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-full text-xs font-semibold text-olive shadow-md border border-border-warm flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-sage animate-ping" />
                <span>Handmade Artistry</span>
              </div>

              <div className="absolute top-14 right-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-[11px] font-medium text-main shadow-md border border-border-warm">
                ✨ Zero Maintenance
              </div>

              <div className="absolute bottom-4 right-4 left-4 sm:left-auto sm:right-4 sm:max-w-[200px] bg-white/95 backdrop-blur-md px-4 py-2.5 rounded-2xl shadow-xl border border-border-warm text-left">
                <p className="text-[10px] uppercase tracking-wider text-sage font-semibold">Featured Bouquet</p>
                <p className="font-editorial text-sm font-semibold text-main">Lavender Romance in Pleated Tulle</p>
                <div className="flex items-center justify-between mt-1">
                  <span className="text-xs font-bold text-olive">₹1,699</span>
                  <Link
                    href="/product/lavender-romance-bouquet"
                    className="text-[11px] text-sage hover:underline font-medium"
                  >
                    View →
                  </Link>
                </div>
              </div>
            </div>

            {/* Accent card — hidden on very small screens */}
            <div className="hidden sm:block absolute -bottom-6 -left-2 lg:-left-6 w-28 h-32 lg:w-36 lg:h-36 rounded-2xl overflow-hidden border-2 border-white shadow-xl bg-cream">
              <Image
                src="/images/products/royal-blue-velvet-tulips.jpg"
                alt="Blue Velvet Tulips"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
