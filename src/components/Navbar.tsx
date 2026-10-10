'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Search, ShoppingBag, Heart, Menu, X, Sparkles } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';

export default function Navbar() {
  const { openCart, itemCount } = useCart();
  const { wishlistCount } = useWishlist();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [announcementText, setAnnouncementText] = useState(
    'Little blooms, made with love ♡ Free shipping across India on orders above ₹999'
  );

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
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
      {/* 1. Slim Announcement Bar */}
      <div className="bg-sage text-ivory text-xs sm:text-sm py-2 px-4 text-center tracking-wide font-medium flex items-center justify-center gap-2 transition-all">
        <Sparkles className="w-3.5 h-3.5 text-blush animate-pulse shrink-0" />
        <span>{announcementText}</span>
        <Sparkles className="w-3.5 h-3.5 text-blush animate-pulse shrink-0" />
      </div>

      {/* 2. Main Navigation Header */}
      <header
        className={`sticky top-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'glass-panel shadow-sm py-3.5 border-b border-border-warm'
            : 'bg-ivory/95 py-5 border-b border-border-warm/60'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Mobile Menu Button */}
          <div className="flex items-center gap-3 lg:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-1.5 text-main hover:text-sage transition-colors"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
            <button
              onClick={() => setSearchOpen(true)}
              className="p-1.5 text-main hover:text-sage transition-colors"
              aria-label="Search flowers"
            >
              <Search className="w-5 h-5" />
            </button>
          </div>

          {/* Brand Logo & Title */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative w-11 h-11 sm:w-12 sm:h-12 rounded-full overflow-hidden border-2 border-sage/30 shadow-xs group-hover:scale-105 transition-transform duration-300 bg-cream">
              <Image
                src="/images/brand/bloomieee-logo.png"
                alt="Bloomieee.co Logo"
                fill
                className="object-cover"
                priority
              />
            </div>
            <div className="flex flex-col">
              <span className="font-editorial text-2xl sm:text-3xl tracking-tight text-main font-semibold group-hover:text-olive transition-colors leading-none">
                Bloomieee.co
              </span>
              <span className="text-[10px] uppercase tracking-widest text-sage font-medium mt-0.5">
                Handmade Pipe-Cleaner Flowers
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-main/90 tracking-wide">
            <Link
              href="/"
              className="hover:text-olive transition-colors py-1 border-b-2 border-transparent hover:border-sage"
            >
              Home
            </Link>
            <Link
              href="/shop"
              className="hover:text-olive transition-colors py-1 border-b-2 border-transparent hover:border-sage"
            >
              Shop All
            </Link>
            <Link
              href="/shop?category=Tulip+Bouquets"
              className="hover:text-olive transition-colors py-1 border-b-2 border-transparent hover:border-sage"
            >
              Tulips
            </Link>
            <Link
              href="/shop?category=Rose+Bouquets"
              className="hover:text-olive transition-colors py-1 border-b-2 border-transparent hover:border-sage"
            >
              Roses
            </Link>
            <Link
              href="/shop?category=Lily+Bouquets"
              className="hover:text-olive transition-colors py-1 border-b-2 border-transparent hover:border-sage"
            >
              Lilies
            </Link>
            <Link
              href="/custom-bouquet"
              className="text-olive bg-sage-soft px-3.5 py-1.5 rounded-full hover:bg-sage hover:text-ivory transition-all shadow-xs flex items-center gap-1.5 font-medium"
            >
              <Sparkles className="w-3.5 h-3.5" />
              Custom Orders
            </Link>
            <Link
              href="/about"
              className="hover:text-olive transition-colors py-1 border-b-2 border-transparent hover:border-sage"
            >
              Our Story
            </Link>
          </nav>

          {/* Action Icons */}
          <div className="flex items-center gap-2 sm:gap-3.5">
            <button
              onClick={() => setSearchOpen(true)}
              className="hidden lg:flex items-center gap-2 text-xs text-muted hover:text-main bg-cream-light hover:bg-cream border border-border-warm px-3.5 py-2 rounded-full transition-all"
            >
              <Search className="w-3.5 h-3.5 text-sage" />
              <span>Search blooms...</span>
            </button>

            <Link
              href="/shop?wishlist=true"
              className="relative p-2 text-main hover:text-olive rounded-full hover:bg-cream transition-colors"
              aria-label="Wishlist"
            >
              <Heart className="w-5 h-5" />
              {wishlistCount > 0 && (
                <span className="absolute top-1 right-1 bg-blush text-olive text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center border border-ivory">
                  {wishlistCount}
                </span>
              )}
            </Link>

            <button
              onClick={openCart}
              className="relative flex items-center gap-2 bg-olive hover:bg-olive-dark text-ivory px-3.5 py-2 rounded-full transition-all duration-200 shadow-xs hover:shadow-md cursor-pointer"
              aria-label="Open Cart"
            >
              <ShoppingBag className="w-4 h-4" />
              <span className="text-xs font-semibold">{itemCount}</span>
            </button>

            <Link
              href="/admin/login"
              className="hidden md:inline-block text-[11px] uppercase tracking-wider text-muted/70 hover:text-sage transition-colors ml-1 px-1"
              title="Admin Portal"
            >
              Studio
            </Link>
          </div>
        </div>
      </header>

      {/* 3. Search Modal Overlay */}
      {searchOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-start justify-center pt-24 px-4"
          onClick={() => setSearchOpen(false)}
        >
          <div
            className="bg-ivory border border-border-warm rounded-2xl w-full max-w-xl p-6 shadow-2xl animate-in fade-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 border-b border-border-warm mb-4">
              <span className="font-editorial text-xl font-medium text-main">Search Everlasting Blooms</span>
              <button
                onClick={() => setSearchOpen(false)}
                className="text-muted hover:text-main p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleSearchSubmit} className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by flower type (tulips, sunflower, lily), color, or bouquet..."
                autoFocus
                className="w-full bg-cream-light border border-border-warm rounded-xl pl-11 pr-24 py-3.5 text-sm text-main focus:outline-hidden focus:border-sage focus:ring-2 focus:ring-sage/20 transition-all"
              />
              <Search className="w-5 h-5 text-sage absolute left-3.5 top-3.5" />
              <button
                type="submit"
                className="absolute right-2 top-2 bg-sage hover:bg-sage-dark text-ivory text-xs font-medium px-4 py-2 rounded-lg transition-colors"
              >
                Search
              </button>
            </form>
            <div className="mt-4 flex flex-wrap items-center gap-2 text-xs text-muted">
              <span>Popular:</span>
              {['Blue Tulips', 'Lavender', 'Sunflower', 'Single Rose', 'Pink Lily'].map((tag) => (
                <button
                  key={tag}
                  type="button"
                  onClick={() => {
                    window.location.href = `/shop?search=${encodeURIComponent(tag)}`;
                  }}
                  className="bg-cream hover:bg-border-warm text-main px-2.5 py-1 rounded-full transition-colors"
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 4. Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 lg:hidden" onClick={() => setMobileMenuOpen(false)}>
          <div
            className="fixed top-0 left-0 bottom-0 w-4/5 max-w-sm bg-ivory shadow-2xl p-6 flex flex-col justify-between"
            onClick={(e) => e.stopPropagation()}
          >
            <div>
              <div className="flex items-center justify-between pb-6 border-b border-border-warm mb-6">
                <div className="flex items-center gap-3">
                  <div className="relative w-10 h-10 rounded-full overflow-hidden border border-sage/40">
                    <Image src="/images/brand/bloomieee-logo.png" alt="Logo" fill className="object-cover" />
                  </div>
                  <div>
                    <h3 className="font-editorial text-xl font-semibold text-main">Bloomieee.co</h3>
                    <p className="text-[10px] text-sage font-medium uppercase tracking-wider">Handmade Flowers</p>
                  </div>
                </div>
                <button onClick={() => setMobileMenuOpen(false)} className="p-1 text-muted">
                  <X className="w-6 h-6" />
                </button>
              </div>

              <nav className="flex flex-col gap-4 text-base font-medium text-main">
                <Link
                  href="/"
                  onClick={() => setMobileMenuOpen(false)}
                  className="py-1.5 hover:text-sage transition-colors"
                >
                  Home
                </Link>
                <Link
                  href="/shop"
                  onClick={() => setMobileMenuOpen(false)}
                  className="py-1.5 hover:text-sage transition-colors"
                >
                  Shop All Collections
                </Link>
                <Link
                  href="/shop?category=Tulip+Bouquets"
                  onClick={() => setMobileMenuOpen(false)}
                  className="py-1.5 text-muted hover:text-sage transition-colors pl-2"
                >
                  Tulip Bouquets
                </Link>
                <Link
                  href="/shop?category=Rose+Bouquets"
                  onClick={() => setMobileMenuOpen(false)}
                  className="py-1.5 text-muted hover:text-sage transition-colors pl-2"
                >
                  Rose Bouquets
                </Link>
                <Link
                  href="/shop?category=Lily+Bouquets"
                  onClick={() => setMobileMenuOpen(false)}
                  className="py-1.5 text-muted hover:text-sage transition-colors pl-2"
                >
                  Lily Bouquets
                </Link>
                <Link
                  href="/custom-bouquet"
                  onClick={() => setMobileMenuOpen(false)}
                  className="py-2.5 px-4 bg-sage-soft text-olive rounded-xl flex items-center justify-between font-semibold"
                >
                  <span>Dream Your Custom Bouquet</span>
                  <Sparkles className="w-4 h-4 text-sage" />
                </Link>
                <Link
                  href="/about"
                  onClick={() => setMobileMenuOpen(false)}
                  className="py-1.5 hover:text-sage transition-colors"
                >
                  Our Story
                </Link>
                <Link
                  href="/track"
                  onClick={() => setMobileMenuOpen(false)}
                  className="py-1.5 hover:text-sage transition-colors"
                >
                  Track Your Order
                </Link>
              </nav>
            </div>

            <div className="pt-6 border-t border-border-warm text-xs text-muted space-y-2">
              <p>📍 Handcrafted with love in India</p>
              <p>💌 hello@bloomieee.co</p>
              <div className="flex gap-4 pt-2">
                <a
                  href="https://www.instagram.com/bloomieee.co/"
                  target="_blank"
                  rel="noreferrer"
                  className="text-sage font-medium hover:underline"
                >
                  Instagram @bloomieee.co
                </a>
                <Link href="/admin/login" className="text-muted/60 hover:underline">
                  Admin Login
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
