import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CustomBouquetSection from '@/components/CustomBouquetSection';
import Image from 'next/image';
import { Sparkles, HeartHandshake, CheckCircle2 } from 'lucide-react';

export const metadata = {
  title: 'Custom Bouquet Request | Bloomieee.co',
  description: 'Dream it, we will bloom it! Request a personalized handmade pipe-cleaner flower bouquet.',
};

export default function CustomBouquetPage() {
  return (
    <div className="min-h-screen flex flex-col bg-ivory">
      <Navbar />
      <main className="flex-1">
        <div className="py-12 bg-linear-to-b from-cream-light to-ivory text-center px-4 border-b border-border-warm">
          <div className="max-w-2xl mx-auto space-y-3">
            <span className="text-xs uppercase tracking-widest text-sage font-semibold bg-white px-3.5 py-1 rounded-full border border-border-warm inline-flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-sage" />
              <span>Bespoke Handcrafted Blooms</span>
            </span>
            <h1 className="font-editorial text-4xl sm:text-5xl font-semibold text-main">
              Create Your Dream Bouquet
            </h1>
            <p className="text-xs sm:text-sm text-muted leading-relaxed">
              Every love story, friendship, and celebration has its own unique colors. Tell us your vision and we will handcraft an everlasting arrangement just for you.
            </p>
          </div>
        </div>

        <CustomBouquetSection />
      </main>
      <Footer />
    </div>
  );
}
