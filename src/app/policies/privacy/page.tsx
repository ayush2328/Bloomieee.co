import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata = {
  title: 'Privacy Policy | Bloomieee.co',
};

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen flex flex-col bg-ivory">
      <Navbar />
      <main className="flex-1 max-w-3xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-14 space-y-6 text-main">
        <span className="text-xs uppercase tracking-widest text-sage font-semibold">Store Policy</span>
        <h1 className="font-editorial text-4xl font-semibold">Privacy Policy</h1>
        <div className="text-xs sm:text-sm text-muted space-y-4 leading-relaxed bg-white p-8 rounded-3xl border border-border-warm shadow-2xs">
          <p>
            Your privacy is deeply respected at Bloomieee.co. We collect only necessary details (such as your name, shipping address, contact phone, and email) to fulfill your orders and deliver your handcrafted bouquets safely.
          </p>
          <h2 className="text-sm font-bold text-main uppercase tracking-wider pt-2">1. Payment Security</h2>
          <p>
            We never store credit card numbers or banking passwords on our servers. All digital transactions are securely processed through PCI-DSS compliant gateways like Razorpay.
          </p>
          <h2 className="text-sm font-bold text-main uppercase tracking-wider pt-2">2. Communication &amp; Newsletter</h2>
          <p>
            If you subscribe to Letters &amp; Little Blooms, we send occasional seasonal announcements. You can unsubscribe at any point with one click.
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
