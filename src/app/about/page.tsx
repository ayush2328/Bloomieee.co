import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Image from 'next/image';
import Link from 'next/link';
import { Sparkles, Heart, Flower2, Clock, Palette } from 'lucide-react';

export const metadata = {
  title: 'Our Story | Bloomieee.co Handmade Floral Boutique',
  description: 'Learn about Bloomieee.co, our passion for handcrafted pipe-cleaner flower art and everlasting gifts.',
};

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col bg-ivory">
      <Navbar />

      <main className="flex-1 py-14 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-sage/40 mx-auto bg-cream shadow-xs relative">
            <Image src="/images/brand/bloomieee-logo.png" alt="Bloomieee Logo" fill className="object-cover" />
          </div>
          <span className="text-xs uppercase tracking-widest text-sage font-semibold">
            Handcrafted with Love
          </span>
          <h1 className="font-editorial text-4xl sm:text-5xl font-semibold text-main">
            The Story Behind Bloomieee.co
          </h1>
          <p className="text-sm sm:text-base text-muted leading-relaxed">
            Where soft chenille velvet meets timeless floral romance. Handcrafted in India to turn fleeting gestures into lasting keepsakes.
          </p>
        </div>

        {/* Editorial Story Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-16">
          <div className="relative aspect-4/3 sm:aspect-square rounded-3xl overflow-hidden shadow-xl border-4 border-white bg-cream">
            <Image
              src="/images/products/lavender-romance-bouquet.jpg"
              alt="Handmade bouquet crafted by Bloomieee studio"
              fill
              className="object-cover"
            />
          </div>

          <div className="space-y-5 text-sm text-muted leading-relaxed">
            <h2 className="font-editorial text-3xl font-semibold text-main">
              Why Pipe Cleaner Flowers?
            </h2>
            <p>
              It started with a simple thought: flowers are one of humanity&apos;s oldest love languages, yet they wither away within days. We wanted to preserve the sentiment behind every gift without compromising on beauty, texture, or elegance.
            </p>
            <p>
              Using dense, fuzzy chenille pipe cleaners and sturdy floral wire, our artisans hand-twist every single petal, curl delicate stamens, and bind stems into full, lavish arrangements. The tactile feel is plush, warm, and playful — giving our flowers an irresistible warmth you just want to touch.
            </p>
            <p>
              Unlike plastic artificial flowers, pipe-cleaner bouquets are soft, artistic, and visibly handmade with heart. Each piece carries the gentle fingerprint of an artisan who spent hours sculpting it.
            </p>
          </div>
        </div>

        {/* 4 Brand Values */}
        <div className="bg-white rounded-3xl border border-border-warm p-8 sm:p-12 shadow-sm mb-16">
          <h2 className="font-editorial text-2xl sm:text-3xl font-semibold text-main text-center mb-10">
            What Makes Our Studio Unique
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="space-y-2 text-center sm:text-left">
              <div className="w-10 h-10 rounded-full bg-sage-soft text-olive flex items-center justify-center mb-3 mx-auto sm:mx-0">
                <Clock className="w-5 h-5 text-sage" />
              </div>
              <h3 className="text-sm font-semibold text-main">Everlasting Memories</h3>
              <p className="text-xs text-muted leading-relaxed">
                Flowers that stay fresh and colorful year after year with zero water or sunlight required.
              </p>
            </div>

            <div className="space-y-2 text-center sm:text-left">
              <div className="w-10 h-10 rounded-full bg-blush-soft text-olive flex items-center justify-center mb-3 mx-auto sm:mx-0">
                <Palette className="w-5 h-5 text-blush-dark" />
              </div>
              <h3 className="text-sm font-semibold text-main">Custom Palettes</h3>
              <p className="text-xs text-muted leading-relaxed">
                From royal blues and muted sage to dreamy lilac and sunset peach — bespoke colors made for you.
              </p>
            </div>

            <div className="space-y-2 text-center sm:text-left">
              <div className="w-10 h-10 rounded-full bg-lavender-soft text-olive flex items-center justify-center mb-3 mx-auto sm:mx-0">
                <Heart className="w-5 h-5 text-olive" />
              </div>
              <h3 className="text-sm font-semibold text-main">Made with Love</h3>
              <p className="text-xs text-muted leading-relaxed">
                Small-batch independent boutique production ensuring unmatched attention to detail.
              </p>
            </div>

            <div className="space-y-2 text-center sm:text-left">
              <div className="w-10 h-10 rounded-full bg-cream text-olive flex items-center justify-center mb-3 mx-auto sm:mx-0">
                <Flower2 className="w-5 h-5 text-sage" />
              </div>
              <h3 className="text-sm font-semibold text-main">Luxury Gifting</h3>
              <p className="text-xs text-muted leading-relaxed">
                Delivered in reinforced gift cartons with satin ribbons and wax-sealed handwritten cards.
              </p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center space-y-4">
          <h3 className="font-editorial text-2xl font-semibold text-main">
            Ready to bring a little forever bloom into your home?
          </h3>
          <div className="flex justify-center gap-4">
            <Link
              href="/shop"
              className="bg-olive hover:bg-olive-dark text-ivory text-xs font-semibold uppercase tracking-wider px-7 py-3.5 rounded-full transition-all shadow-md"
            >
              Explore the Bouquets
            </Link>
            <Link
              href="/custom-bouquet"
              className="bg-cream hover:bg-border-warm text-main border border-border-warm text-xs font-semibold uppercase tracking-wider px-7 py-3.5 rounded-full transition-all"
            >
              Custom Order
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
