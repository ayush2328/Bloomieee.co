'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useCart } from '@/context/CartContext';
import { Trash2, Plus, Minus, ArrowRight, ShoppingBag, Sparkles, Tag } from 'lucide-react';

export default function CartPage() {
  const {
    items,
    removeItem,
    updateQuantity,
    subtotal,
    itemCount,
    couponCode,
    discount,
    applyCoupon,
    removeCoupon,
  } = useCart();

  const [inputCoupon, setInputCoupon] = React.useState('');
  const [couponMsg, setCouponMsg] = React.useState<{ text: string; error?: boolean } | null>(null);

  const freeShippingGoal = 999;
  const shippingFee = subtotal >= freeShippingGoal || subtotal === 0 ? 0 : 79;
  const finalTotal = Math.max(0, subtotal + shippingFee - discount);

  const handleApply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputCoupon.trim()) return;
    const res = applyCoupon(inputCoupon);
    setCouponMsg({ text: res.message, error: !res.success });
    if (res.success) setInputCoupon('');
  };

  return (
    <div className="min-h-screen flex flex-col bg-ivory">
      <Navbar />

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-10">
        <h1 className="font-editorial text-3xl sm:text-4xl font-semibold text-main mb-8">
          Your Flower Bag ({itemCount})
        </h1>

        {items.length === 0 ? (
          <div className="py-20 text-center bg-white/70 border border-border-warm rounded-3xl p-8 max-w-md mx-auto">
            <div className="w-16 h-16 rounded-full bg-cream mx-auto flex items-center justify-center text-sage mb-4">
              <ShoppingBag className="w-8 h-8 stroke-1" />
            </div>
            <h2 className="font-editorial text-2xl font-semibold text-main mb-2">
              Your bag is currently empty
            </h2>
            <p className="text-xs text-muted mb-6">
              Pick handcrafted bouquets crafted with soft chenille that stay lively forever.
            </p>
            <Link
              href="/shop"
              className="bg-olive hover:bg-olive-dark text-ivory text-xs font-semibold uppercase tracking-wider px-6 py-3 rounded-full transition-all inline-flex items-center gap-2 shadow-xs"
            >
              <span>Explore Bouquets</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            {/* Items Column */}
            <div className="lg:col-span-8 space-y-4">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="bg-white/80 border border-border-warm rounded-2xl p-4 sm:p-5 flex gap-4 sm:gap-6 items-center justify-between shadow-2xs"
                >
                  <div className="flex items-center gap-4">
                    <div className="relative w-20 h-24 sm:w-24 sm:h-28 rounded-xl overflow-hidden bg-cream shrink-0 border border-border-warm">
                      <Image src={item.image} alt={item.title} fill className="object-cover" />
                    </div>

                    <div>
                      <Link href={`/product/${item.slug}`}>
                        <h3 className="font-editorial text-base sm:text-lg font-semibold text-main hover:text-olive">
                          {item.title}
                        </h3>
                      </Link>
                      <p className="text-xs text-muted mt-0.5">
                        Color: {item.selectedColor || 'Standard'} • Wrap: {item.selectedWrap || 'Classic'}
                      </p>
                      {item.giftMessage && (
                        <p className="text-[11px] text-sage italic mt-1 max-w-sm line-clamp-1">
                          Card: &ldquo;{item.giftMessage}&rdquo;
                        </p>
                      )}
                      <p className="text-xs font-semibold text-main mt-2">₹{item.price}</p>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row items-end sm:items-center gap-4">
                    {/* Quantity */}
                    <div className="flex items-center border border-border-warm rounded-full bg-cream-light px-2.5 py-1">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="text-xs text-muted hover:text-main px-1.5"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="text-xs font-semibold px-2 text-main">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="text-xs text-muted hover:text-main px-1.5"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>

                    <span className="text-sm font-bold text-main w-16 text-right">
                      ₹{item.price * item.quantity}
                    </span>

                    <button
                      onClick={() => removeItem(item.id)}
                      className="text-muted hover:text-red-500 p-1"
                      title="Remove"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Summary Column */}
            <div className="lg:col-span-4 bg-white/90 border border-border-warm rounded-3xl p-6 sm:p-7 space-y-5 shadow-sm">
              <h2 className="font-editorial text-xl font-semibold text-main pb-3 border-b border-border-warm">
                Order Summary
              </h2>

              {/* Coupon */}
              <div>
                {couponCode ? (
                  <div className="flex items-center justify-between bg-sage-soft px-3.5 py-2 rounded-xl text-xs text-olive">
                    <div className="flex items-center gap-1.5 font-medium">
                      <Tag className="w-3.5 h-3.5 text-sage" />
                      <span>Code <strong>{couponCode}</strong> applied</span>
                    </div>
                    <button
                      onClick={removeCoupon}
                      className="text-xs text-muted hover:text-red-500 underline"
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleApply} className="flex gap-2">
                    <input
                      type="text"
                      value={inputCoupon}
                      onChange={(e) => setInputCoupon(e.target.value)}
                      placeholder="Coupon code (BLOOM10)"
                      className="flex-1 bg-cream-light border border-border-warm rounded-xl px-3 py-2 text-xs text-main focus:outline-hidden uppercase"
                    />
                    <button
                      type="submit"
                      className="bg-cream hover:bg-border-warm text-main text-xs font-semibold px-4 py-2 rounded-xl border border-border-warm transition-colors"
                    >
                      Apply
                    </button>
                  </form>
                )}
                {couponMsg && (
                  <p
                    className={`text-[11px] mt-1.5 ${
                      couponMsg.error ? 'text-red-600' : 'text-sage-dark'
                    }`}
                  >
                    {couponMsg.text}
                  </p>
                )}
              </div>

              {/* Calculations */}
              <div className="space-y-2 text-xs text-muted border-t border-border-warm pt-4">
                <div className="flex justify-between">
                  <span>Bag Subtotal</span>
                  <span className="text-main font-semibold">₹{subtotal}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-sage font-medium">
                    <span>Discount</span>
                    <span>-₹{discount}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Shipping Across India</span>
                  <span className="text-main font-semibold">
                    {shippingFee === 0 ? <span className="text-sage">FREE</span> : `₹${shippingFee}`}
                  </span>
                </div>
                {shippingFee > 0 && (
                  <p className="text-[10px] text-sage">
                    Add ₹{freeShippingGoal - subtotal} more for free courier delivery!
                  </p>
                )}
                <div className="flex justify-between text-base font-bold text-main border-t border-border-warm pt-3">
                  <span>Total</span>
                  <span>₹{finalTotal}</span>
                </div>
              </div>

              {/* Checkout CTA */}
              <Link
                href="/checkout"
                className="w-full bg-olive hover:bg-olive-dark text-ivory py-4 rounded-full text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-md hover:shadow-lg"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
