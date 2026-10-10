'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Search, ShoppingBag, Heart, Menu, X, Sparkles } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';

const NAV_LINKS = [
  { href: '/shop', label: 'Shop All' },
  { href: '/shop?category=Tulip+Bouquets', label: 'Tulips' },
  { href: '/shop?category=Rose+Bouquets', label: 'Roses' },
  { href: '/shop?category=Lily+Bouquets', label: 'Lilies' },
  { href: '/about', label: 'Our Story' },
];

export default function Navbar() {
  const { openCart, itemCount } = useCart();
  const { wishlistCount } = useWishlist();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [announcementText, setAnnouncementText] = useState(
    'Free shipping across India on orders above ₹999 ♡'
  );

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    fetch('/api/settings')
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.settings?.announcementText) {
          setAnnouncementText(data.settings.announcementText);
        }
      })
      .catch(() => {});
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/shop?search=${encodeURIComponent(searchQuery.trim())}`;
    }
  };

  return (
    <>
      {/* Announcement Bar */}
      <div className="bg-sage text-ivory text-[11px] tracking-widest uppercase py-2 px-4 text-center font-medium">
        {announcementText}
      </div>

      {/* Main Header */}
      <header
        className={`sticky top-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-ivory/95 backdrop-blur-md shadow-[0_1px_12px_rgba(0,0,0,0.06)] border-b border-border-warm/80'
            : 'bg-ivory border-b border-border-warm/50'
        }`}
      >
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 h-16 flex items-center justify-between gap-6">

          {/* LEFT — Logo */}
          <Link href="/" className="flex items-center gap-2.5 group shrink-0">
            <div className="relative w-9 h-9 rounded-full overflow-hidden border border-sage/25 shadow-xs group-hover:scale-105 transition-transform duration-300">
              <Image
                src="/images/brand/bloomieee-logo.png"
                alt="Bloomieee.co"
                fill
                className="object-cover"
                priority
              />
            </div>
            <span className="font-editorial text-[19px] tracking-tight text-main font-semibold group-hover:text-olive transition-colors leading-none">
              Bloomieee.co
            </span>
          </Link>

          {/* CENTER — Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-6 text-[13px] font-medium text-main/75 tracking-wide">
            {NAV_LINKS.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className="hover:text-olive transition-colors relative after:absolute after:left-0 after:-bottom-0.5 after:h-px after:w-0 after:bg-sage after:transition-all hover:after:w-full"
              >
                {label}
              </Link>
            ))}
            <Link
              href="/custom-bouquet"
              className="flex items-center gap-1.5 text-[12px] font-semibold text-olive bg-sage/10 hover:bg-sage hover:text-ivory px-3.5 py-1.5 rounded-full transition-all border border-sage/20 hover:border-sage"
            >
              <Sparkles className="w-3 h-3" />
              Custom Order
            </Link>
          </nav>

          {/* RIGHT — Actions */}
          <div className="flex items-center gap-1 sm:gap-2">
            {/* Search — desktop pill */}
            <button
              onClick={() => setSearchOpen(true)}
              className="hidden lg:flex items-center gap-2 text-[12px] text-muted hover:text-main bg-cream hover:bg-cream-light border border-border-warm px-3 py-1.5 rounded-full transition-all"
              aria-label="Search"
            >
              <Search className="w-3.5 h-3.5 text-sage" />
              <span>Search…</span>
            </button>

            {/* Search — mobile icon */}
            <button
              onClick={() => setSearchOpen(true)}
              className="lg:hidden p-2 text-main hover:text-sage transition-colors"
              aria-label="Search"
            >
              <Search className="w-[18px] h-[18px]" />
            </button>

            {/* Wishlist */}
            <Link
              href="/shop?wishlist=true"
              className="relative p-2 text-main hover:text-olive transition-colors"
              aria-label="Wishlist"
            >
              <Heart className="w-[18px] h-[18px]" />
              {wishlistCount > 0 && (
                <span className="absolute top-1 right-1 bg-blush text-[9px] font-bold w-3.5 h-3.5 rounded-full flex items-center justify-center">
                  {wishlistCount}
                </span>
              )}
            </Link>

            {/* Cart */}
            <button
              onClick={openCart}
              className="relative flex items-center gap-1.5 bg-olive hover:bg-olive-dark text-ivory text-[12px] font-semibold px-3.5 py-1.5 rounded-full transition-all cursor-pointer"
              aria-label="Open Cart"
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>{itemCount}</span>
            </button>

            {/* Mobile menu toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-main hover:text-sage transition-colors ml-1"
              aria-label="Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Search Modal */}
      {searchOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-start justify-center pt-20 px-4"
          onClick={() => setSearchOpen(false)}
        >
          <div
            className="bg-ivory border border-border-warm rounded-2xl w-full max-w-lg p-5 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 border-b border-border-warm mb-4">
              <span className="font-editorial text-lg font-medium text-main">Find your blooms</span>
              <button onClick={() => setSearchOpen(false)} className="text-muted hover:text-main p-1">
                <X className="w-4 h-4" />
              </button>
            </div>
            <form onSubmit={handleSearchSubmit} className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search tulips, roses, lily, sunflower…"
                autoFocus
                className="w-full bg-cream border border-border-warm rounded-xl pl-10 pr-20 py-3 text-sm text-main focus:outline-none focus:border-sage focus:ring-2 focus:ring-sage/20 transition-all"
              />
              <Search className="w-4 h-4 text-sage absolute left-3.5 top-3.5" />
              <button
                type="submit"
                className="absolute right-2 top-1.5 bg-sage hover:bg-sage-dark text-ivory text-xs font-medium px-4 py-1.5 rounded-lg transition-colors"
              >
                Go
              </button>
            </form>
            <div className="mt-3 flex flex-wrap items-center gap-2 text-xs text-muted">
              <span className="text-[11px]">Try:</span>
              {['Blue Tulips', 'Lavender', 'Sunflower', 'Pink Rose'].map((tag) => (
                <button
                  key={tag}
                  type="button"
                  onClick={() => {
                    window.location.href = `/shop?search=${encodeURIComponent(tag)}`;
                  }}
                  className="bg-cream hover:bg-border-warm text-main px-2.5 py-1 rounded-full transition-colors text-[11px]"
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/50 lg:hidden"
          onClick={() => setMobileMenuOpen(false)}
        >
          <div
            className="fixed top-0 left-0 bottom-0 w-[78%] max-w-xs bg-ivory shadow-2xl flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Mobile menu header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-border-warm">
              <div className="flex items-center gap-2.5">
                <div className="relative w-8 h-8 rounded-full overflow-hidden border border-sage/30">
                  <Image src="/images/brand/bloomieee-logo.png" alt="Logo" fill className="object-cover" />
                </div>
                <span className="font-editorial text-[17px] font-semibold text-main">Bloomieee.co</span>
              </div>
              <button onClick={() => setMobileMenuOpen(false)} className="p-1.5 text-muted hover:text-main">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Mobile nav links */}
            <nav className="flex flex-col px-5 py-4 gap-1 flex-1">
              {[
                { href: '/', label: 'Home' },
                { href: '/shop', label: 'Shop All' },
                { href: '/shop?category=Tulip+Bouquets', label: 'Tulip Bouquets' },
                { href: '/shop?category=Rose+Bouquets', label: 'Rose Bouquets' },
                { href: '/shop?category=Lily+Bouquets', label: 'Lily Bouquets' },
                { href: '/about', label: 'Our Story' },
                { href: '/track', label: 'Track Order' },
              ].map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="py-2.5 px-2 text-[15px] font-medium text-main hover:text-sage hover:bg-cream rounded-lg transition-all"
                >
                  {label}
                </Link>
              ))}
              <Link
                href="/custom-bouquet"
                onClick={() => setMobileMenuOpen(false)}
                className="mt-2 py-2.5 px-4 bg-sage/10 text-olive rounded-xl flex items-center justify-between font-semibold text-[14px] border border-sage/20"
              >
                <span>Custom Bouquet</span>
                <Sparkles className="w-4 h-4 text-sage" />
              </Link>
            </nav>

            {/* Mobile menu footer */}
            <div className="px-5 py-4 border-t border-border-warm text-[11px] text-muted space-y-1.5">
              <p>📍 Handcrafted with love in India</p>
              <p>💌 hello@bloomieee.co</p>
              <a
                href="https://www.instagram.com/bloomieee.co/"
                target="_blank"
                rel="noreferrer"
                className="block text-sage font-medium hover:underline mt-2"
              >
                @bloomieee.co on Instagram
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
