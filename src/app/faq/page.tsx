'use client';

import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { ChevronDown, Sparkles } from 'lucide-react';

export default function FAQPage() {
  const faqs = [
    {
      q: 'What are pipe-cleaner flowers made of?',
      a: 'Our flowers are crafted using high-grade, plush chenille pipe cleaners spun around flexible copper/iron floral wire. The fuzzy texture resembles soft velvet, and each petal and leaf is shaped entirely by hand.',
    },
    {
      q: 'How long do Bloomieee pipe-cleaner flowers last?',
      a: 'They last literally forever! Unlike fresh flowers that wither in days or dried flowers that crumble, chenille velvet flowers maintain their vibrant colors, shape, and structure indefinitely with zero watering or sunlight required.',
    },
    {
      q: 'How do I clean and care for my bouquet?',
      a: 'Care is wonderfully simple: keep away from direct liquids or heavy moisture. To dust, lightly sweep petals with a soft clean makeup brush or a dry microfiber cloth. If a petal or leaf bends during handling, gently reposition it with your fingertips!',
    },
    {
      q: 'How long does handcrafting and delivery take?',
      a: 'Because every bouquet is handmade to order in our studio, crafting takes 2 to 3 business days. Once dispatched, standard courier delivery takes 3 to 5 business days across India.',
    },
    {
      q: 'Can I request a custom bouquet with specific colors?',
      a: 'Yes, absolutely! Head over to our "Custom Orders" page. You can choose your preferred flower types (tulips, roses, lilies, sunflowers, etc.), color palette, wrapping aesthetic, and size. We even send approval photos on WhatsApp before dispatching.',
    },
    {
      q: 'What is your shipping policy and delivery fee?',
      a: 'We offer FREE courier shipping across India on orders above ₹999. For orders below ₹999, a flat shipping fee of ₹79 is applied.',
    },
    {
      q: 'Will the flowers get crushed during shipping?',
      a: 'No! We use reinforced rigid corrugated cartons with shock-absorbing tissue bedding, internal stem anchors, and protective sleeves. Stems are also flexible and can be fluffed to original volume easily.',
    },
  ];

  const [openIdx, setOpenIdx] = useState<number | null>(0);

  return (
    <div className="min-h-screen flex flex-col bg-ivory">
      <Navbar />

      <main className="flex-1 max-w-3xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-14">
        <div className="text-center mb-12">
          <span className="text-xs uppercase tracking-widest text-sage font-semibold">
            Common Questions
          </span>
          <h1 className="font-editorial text-4xl sm:text-5xl font-semibold text-main mt-1 mb-3">
            Frequently Asked Questions
          </h1>
          <p className="text-xs sm:text-sm text-muted">
            Everything you need to know about our handmade pipe-cleaner flower bouquets, custom orders, and shipping.
          </p>
        </div>

        <div className="space-y-3.5">
          {faqs.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={idx}
                className="bg-white/80 border border-border-warm rounded-2xl overflow-hidden shadow-2xs transition-all"
              >
                <button
                  onClick={() => setOpenIdx(isOpen ? null : idx)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 font-editorial text-lg sm:text-xl font-medium text-main hover:text-olive transition-colors"
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-sage shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 text-xs sm:text-sm text-muted leading-relaxed border-t border-border-warm/40 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </main>

      <Footer />
    </div>
  );
}
