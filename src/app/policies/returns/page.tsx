import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata = {
  title: 'Returns & Cancellation Policy | Bloomieee.co',
};

export default function ReturnsPolicyPage() {
  return (
    <div className="min-h-screen flex flex-col bg-ivory">
      <Navbar />
      <main className="flex-1 max-w-3xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-14 space-y-6 text-main">
        <span className="text-xs uppercase tracking-widest text-sage font-semibold">Store Policy</span>
        <h1 className="font-editorial text-4xl font-semibold">Returns &amp; Cancellation Policy</h1>
        <div className="text-xs sm:text-sm text-muted space-y-4 leading-relaxed bg-white p-8 rounded-3xl border border-border-warm shadow-2xs">
          <p>
            At Bloomieee.co, each flower bouquet is handmade specifically for your order with extensive care and dedication.
          </p>
          <h2 className="text-sm font-bold text-main uppercase tracking-wider pt-2">1. Cancellation Window</h2>
          <p>
            You may cancel your order within <strong>12 hours</strong> of placement for a full refund, before crafting begins. Once stems are prepared and assembled, cancellations cannot be processed.
          </p>
          <h2 className="text-sm font-bold text-main uppercase tracking-wider pt-2">2. Returns &amp; Replacements</h2>
          <p>
            Due to the delicate, handcrafted nature of custom floral keepsakes, we do not accept general returns once delivered. However, if your order arrives damaged or defective in transit:
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Please record an unboxing video upon receiving the package.</li>
            <li>Contact us via WhatsApp (+91 98765 43210) or email (hello@bloomieee.co) within <strong>48 hours</strong> of delivery.</li>
            <li>We will promptly dispatch a brand new replacement bouquet at zero additional cost to you!</li>
          </ul>
        </div>
      </main>
      <Footer />
    </div>
  );
}
