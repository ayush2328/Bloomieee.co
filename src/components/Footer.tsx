'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Mail, Phone, MapPin, Heart } from 'lucide-react';
import InstagramIcon from './InstagramIcon';

export default function Footer() {
  return (
    <footer className="bg-cream-light border-t border-border-warm text-main/90">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-3">
              <div className="relative w-11 h-11 rounded-full overflow-hidden border border-sage/40 bg-cream">
                <Image
                  src="/images/brand/bloomieee-logo.png"
                  alt="Bloomieee Logo"
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <span className="font-editorial text-2xl font-semibold text-main tracking-tight">
                  Bloomieee.co
                </span>
                <span className="text-[10px] uppercase tracking-widest text-sage font-medium block">
                  Handmade Pipe-Cleaner Flowers
                </span>
              </div>
            </Link>

            <p className="text-xs sm:text-sm text-muted leading-relaxed max-w-sm">
              Artisan handcrafted pipe-cleaner flower bouquets and bespoke floral keepsakes. Made with love in India to turn your little moments into everlasting memories.
            </p>

            <div className="pt-2 flex items-center gap-3 text-muted">
              <a
                href="https://www.instagram.com/bloomieee.co/"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-cream border border-border-warm flex items-center justify-center hover:bg-olive hover:text-ivory transition-colors"
                aria-label="Instagram"
              >
                <InstagramIcon className="w-4 h-4" />
              </a>
              <a
                href="mailto:hello@bloomieee.co"
                className="w-9 h-9 rounded-full bg-cream border border-border-warm flex items-center justify-center hover:bg-olive hover:text-ivory transition-colors"
                aria-label="Email"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Shop Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-olive">
              Collections
            </h4>
            <ul className="space-y-2 text-xs text-muted">
              <li>
                <Link href="/shop" className="hover:text-olive transition-colors">
                  Shop All Blooms
                </Link>
              </li>
              <li>
                <Link href="/shop?category=Tulip+Bouquets" className="hover:text-olive transition-colors">
                  Tulip Bouquets
                </Link>
              </li>
              <li>
                <Link href="/shop?category=Rose+Bouquets" className="hover:text-olive transition-colors">
                  Rose Bouquets
                </Link>
              </li>
              <li>
                <Link href="/shop?category=Lily+Bouquets" className="hover:text-olive transition-colors">
                  Lily Bouquets
                </Link>
              </li>
              <li>
                <Link href="/shop?category=Mini+Flower+Gifts" className="hover:text-olive transition-colors">
                  Mini Keepsake Gifts
                </Link>
              </li>
              <li>
                <Link href="/custom-bouquet" className="text-sage font-medium hover:underline">
                  Bespoke Custom Orders
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Care */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-olive">
              Customer Care
            </h4>
            <ul className="space-y-2 text-xs text-muted">
              <li>
                <Link href="/track" className="hover:text-olive transition-colors">
                  Track Your Order
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-olive transition-colors">
                  Frequently Asked Questions
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-olive transition-colors">
                  About Our Studio
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-olive transition-colors">
                  Contact &amp; Custom Inquiries
                </Link>
              </li>
              <li>
                <Link href="/policies/shipping" className="hover:text-olive transition-colors">
                  Shipping &amp; Delivery Policy
                </Link>
              </li>
              <li>
                <Link href="/policies/returns" className="hover:text-olive transition-colors">
                  Returns &amp; Cancellations
                </Link>
              </li>
            </ul>
          </div>

          {/* Studio Contact */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-olive">
              Studio &amp; Inquiries
            </h4>
            <ul className="space-y-2.5 text-xs text-muted">
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-sage shrink-0 mt-0.5" />
                <span>Surat / Ahmedabad, Gujarat, India</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-sage shrink-0" />
                <span>WhatsApp: +91 98765 43210</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-sage shrink-0" />
                <span>hello@bloomieee.co</span>
              </li>
              <li className="pt-2">
                <span className="text-[11px] bg-sage-soft text-olive px-2.5 py-1 rounded-full font-medium inline-block">
                  Dispatch: 1-3 Business Days
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-border-warm flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted">
          <p className="flex items-center gap-1">
            © 2026 Bloomieee.co. Handcrafted with{' '}
            <Heart className="w-3.5 h-3.5 text-blush-dark fill-current" /> in India.
          </p>

          <div className="flex flex-wrap items-center gap-4 text-[11px]">
            <Link href="/policies/privacy" className="hover:underline">
              Privacy Policy
            </Link>
            <Link href="/policies/terms" className="hover:underline">
              Terms &amp; Conditions
            </Link>
            <Link href="/admin/login" className="text-muted/60 hover:text-sage">
              Admin Portal
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
