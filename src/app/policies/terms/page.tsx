import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata = {
  title: 'Terms & Conditions | Bloomieee.co',
};

export default function TermsPage() {
  return (
    <div className="min-h-screen flex flex-col bg-ivory">
      <Navbar />
      <main className="flex-1 max-w-3xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-14 space-y-6 text-main">
        <span className="text-xs uppercase tracking-widest text-sage font-semibold">Store Policy</span>
        <h1 className="font-editorial text-4xl font-semibold">Terms &amp; Conditions</h1>
        <div className="text-xs sm:text-sm text-muted space-y-4 leading-relaxed bg-white p-8 rounded-3xl border border-border-warm shadow-2xs">
          <p>
            By accessing or ordering from Bloomieee.co, you agree to the following terms:
          </p>
          <h2 className="text-sm font-bold text-main uppercase tracking-wider pt-2">1. Handcrafted Variations</h2>
          <p>
            Because each flower petal, stamen, and arrangement is made by hand with chenille pipe cleaners, slight natural variations in petal curvature, wrapping paper folds, and stem angles are a celebrated hallmark of authentic handmade craftsmanship.
          </p>
          <h2 className="text-sm font-bold text-main uppercase tracking-wider pt-2">2. Pricing &amp; Currency</h2>
          <p>
            All prices listed on the site are in Indian Rupees (INR ₹) and are inclusive of relevant taxes.
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
