import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata = {
  title: 'Shipping & Delivery Policy | Bloomieee.co',
};

export default function ShippingPolicyPage() {
  return (
    <div className="min-h-screen flex flex-col bg-ivory">
      <Navbar />
      <main className="flex-1 max-w-3xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-14 space-y-6 text-main">
        <span className="text-xs uppercase tracking-widest text-sage font-semibold">Store Policy</span>
        <h1 className="font-editorial text-4xl font-semibold">Shipping &amp; Delivery Policy</h1>
        <div className="text-xs sm:text-sm text-muted space-y-4 leading-relaxed bg-white p-8 rounded-3xl border border-border-warm shadow-2xs">
          <p>
            Welcome to Bloomieee.co. Because all our flower arrangements and bouquets are individually sculpted by hand, we appreciate your patience while we craft your everlasting blooms.
          </p>
          <h2 className="text-sm font-bold text-main uppercase tracking-wider pt-2">1. Handcrafting &amp; Processing Time</h2>
          <p>
            Standard ready-designed bouquets require <strong>1 to 3 business days</strong> for hand-assembly, stem-binding, wrapping, and quality inspection. Custom bouquets may require <strong>3 to 4 business days</strong>.
          </p>
          <h2 className="text-sm font-bold text-main uppercase tracking-wider pt-2">2. Delivery Timelines Across India</h2>
          <p>
            Once dispatched from our studio, parcels typically reach metro destinations in <strong>2 to 4 business days</strong>, and non-metro/regional areas in <strong>3 to 6 business days</strong>.
          </p>
          <h2 className="text-sm font-bold text-main uppercase tracking-wider pt-2">3. Shipping Rates &amp; Free Shipping</h2>
          <p>
            • Free standard courier shipping is automatically applied on all orders of <strong>₹999 and above</strong>.<br />
            • For orders below ₹999, a flat delivery fee of <strong>₹79</strong> is charged at checkout.
          </p>
          <h2 className="text-sm font-bold text-main uppercase tracking-wider pt-2">4. Tracking Your Shipment</h2>
          <p>
            You will receive a tracking link via email and WhatsApp as soon as your parcel is picked up by our courier partners (BlueDart, DTDC, or Delhivery). You can also track your status on our <a href="/track" className="text-sage underline font-medium">Order Tracking page</a>.
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
