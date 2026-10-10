'use client';

import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Mail, Phone, MapPin, Send, CheckCircle2 } from 'lucide-react';
import InstagramIcon from '@/components/InstagramIcon';

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-ivory">
      <Navbar />

      <main className="flex-1 max-w-5xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-14">
        <div className="text-center max-w-xl mx-auto mb-14">
          <span className="text-xs uppercase tracking-widest text-sage font-semibold">
            We&apos;d Love to Hear From You
          </span>
          <h1 className="font-editorial text-4xl sm:text-5xl font-semibold text-main mt-1 mb-3">
            Contact Bloomieee.co
          </h1>
          <p className="text-xs sm:text-sm text-muted">
            Have a question about a custom order, wedding favor inquiries, or an existing shipment? Reach out to us directly.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          {/* Direct Details */}
          <div className="md:col-span-5 space-y-6 bg-white/70 border border-border-warm rounded-3xl p-6 sm:p-8 shadow-2xs">
            <h2 className="font-editorial text-2xl font-semibold text-main">Studio Details</h2>

            <div className="space-y-4 text-xs text-muted">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-sage shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-main">Crafting Studio</p>
                  <p>Bloomieee Handmade Floral Studio, Surat / Ahmedabad, Gujarat, India</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-sage shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-main">WhatsApp &amp; Support</p>
                  <p>+91 98765 43210 (Mon-Sat, 10 AM - 7 PM IST)</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-sage shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-main">Email Inquiries</p>
                  <p>hello@bloomieee.co</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <InstagramIcon className="w-5 h-5 text-sage shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-main">Instagram DM</p>
                  <a
                    href="https://www.instagram.com/bloomieee.co/"
                    target="_blank"
                    rel="noreferrer"
                    className="text-sage hover:underline"
                  >
                    @bloomieee.co
                  </a>
                </div>
              </div>
            </div>

            <div className="p-4 bg-cream-light rounded-2xl border border-border-warm text-xs text-muted">
              <p className="font-semibold text-main mb-1">Bulk &amp; Wedding Inquiries</p>
              <p>Planning bridesmaids bouquets or event favors? WhatsApp us for bulk artisan discounts!</p>
            </div>
          </div>

          {/* Contact Message Form */}
          <div className="md:col-span-7 bg-white rounded-3xl border border-border-warm p-6 sm:p-8 shadow-md">
            {submitted ? (
              <div className="py-12 text-center space-y-3">
                <CheckCircle2 className="w-12 h-12 text-sage mx-auto" />
                <h3 className="font-editorial text-2xl font-semibold text-main">Message Received!</h3>
                <p className="text-xs text-muted max-w-sm mx-auto">
                  Thank you for reaching out. A member of our team will reply within 1 business day.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="bg-cream hover:bg-border-warm text-xs font-semibold px-5 py-2 rounded-full mt-4"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <h2 className="font-editorial text-2xl font-semibold text-main mb-4">
                  Send a Note
                </h2>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-main mb-1.5">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Radhika Roy"
                    className="w-full bg-cream-light border border-border-warm rounded-xl px-4 py-2.5 text-xs text-main focus:outline-hidden focus:border-sage"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-main mb-1.5">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="radhika@example.com"
                    className="w-full bg-cream-light border border-border-warm rounded-xl px-4 py-2.5 text-xs text-main focus:outline-hidden focus:border-sage"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-main mb-1.5">
                    Your Message / Question *
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="How can we help make your floral moment unforgettable?"
                    className="w-full bg-cream-light border border-border-warm rounded-xl p-3 text-xs text-main focus:outline-hidden focus:border-sage resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-olive hover:bg-olive-dark text-ivory py-3.5 rounded-full text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-md"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Send Message</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
