'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { X, Plus, Minus, Trash2, ShoppingBag, ArrowRight, Sparkles, Tag } from 'lucide-react';
import { useCart } from '@/context/CartContext';

export default function CartDrawer() {
  const {
    items,
    isCartOpen,
    closeCart,
    removeItem,
    updateQuantity,
    subtotal,
    itemCount,
    couponCode,
    discount,
    applyCoupon,
    removeCoupon,
  } = useCart();

  const [inputCoupon, setInputCoupon] = useState('');
  const [couponMsg, setCouponMsg] = useState<{ text: string; error?: boolean } | null>(null);

  if (!isCartOpen) return null;

  const freeShippingGoal = 999;
  const progressPercent = Math.min(100, Math.round((subtotal / freeShippingGoal) * 100));
  const amountNeeded = Math.max(0, freeShippingGoal - subtotal);
  const shippingFee = subtotal >= freeShippingGoal || subtotal === 0 ? 0 : 79;
  const finalTotal = Math.max(0, subtotal + shippingFee - discount);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputCoupon.trim()) return;
    const res = applyCoupon(inputCoupon);
    setCouponMsg({ text: res.message, error: !res.success });
    if (res.success) setInputCoupon('');
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/40 backdrop-blur-xs transition-opacity"
        onClick={closeCart}
      />

      {/* Drawer */}
      <div className="relative z-10 w-full max-w-md bg-ivory shadow-2xl flex flex-col h-full animate-in slide-in-from-right duration-300 border-l border-border-warm">
        {/* Header */}
        <div className="p-5 border-b border-border-warm flex items-center justify-between bg-cream/50">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-olive" />
            <h3 className="font-editorial text-xl font-semibold text-main">Your Flower Bag</h3>
            <span className="text-xs bg-sage/20 text-olive px-2 py-0.5 rounded-full font-medium">
              {itemCount} {itemCount === 1 ? 'item' : 'items'}
            </span>
          </div>
          <button
            onClick={closeCart}
            className="p-1.5 text-muted hover:text-main rounded-full hover:bg-border-warm/50 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Free Shipping Progress Bar */}
        <div className="bg-sage-soft/60 px-5 py-3 border-b border-border-warm text-xs">
          {subtotal >= freeShippingGoal ? (
            <div className="flex items-center gap-1.5 text-olive font-medium">
              <Sparkles className="w-4 h-4 text-sage shrink-0" />
              <span>Yay! You've unlocked <strong>FREE Shipping</strong> across India!</span>
            </div>
          ) : (
            <div>
              <p className="text-muted mb-1.5">
                Add <strong className="text-olive">₹{amountNeeded}</strong> more for <strong>FREE Shipping</strong>
              </p>
              <div className="w-full bg-cream rounded-full h-1.5 overflow-hidden">
                <div
                  className="bg-sage h-1.5 rounded-full transition-all duration-500"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>
          )}
        </div>

        {/* Items List */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center py-12 px-4">
              <div className="w-16 h-16 rounded-full bg-cream flex items-center justify-center mb-4 text-sage">
                <ShoppingBag className="w-8 h-8 stroke-1" />
              </div>
              <h4 className="font-editorial text-2xl font-medium text-main mb-2">
                Your bag is empty
              </h4>
              <p className="text-xs text-muted max-w-xs mb-6">
                Fill it with everlasting pipe-cleaner blooms crafted with love that will stay vibrant forever.
              </p>
              <Link
                href="/shop"
                onClick={closeCart}
                className="inline-flex items-center gap-2 bg-olive hover:bg-olive-dark text-ivory px-6 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all shadow-xs"
              >
                <span>Explore Bouquets</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          ) : (
            items.map((item) => (
              <div
                key={item.id}
                className="flex gap-3.5 p-3 rounded-xl bg-white/70 border border-border-warm/70 shadow-2xs group"
              >
                <div className="relative w-20 h-22 rounded-lg overflow-hidden bg-cream shrink-0 border border-border-warm/40">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>

                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start gap-1">
                      <h4 className="text-xs font-medium text-main line-clamp-1 group-hover:text-olive">
                        {item.title}
                      </h4>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-muted/60 hover:text-red-500 p-0.5 transition-colors"
                        title="Remove item"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="text-[11px] text-muted space-y-0.5 mt-0.5">
                      {item.selectedColor && (
                        <p>
                          <span className="text-muted/80">Color:</span> {item.selectedColor}
                        </p>
                      )}
                      {item.selectedWrap && (
                        <p>
                          <span className="text-muted/80">Wrap:</span> {item.selectedWrap}
                        </p>
                      )}
                      {item.giftMessage && (
                        <p className="italic text-[10px] text-sage truncate">
                          "{item.giftMessage}"
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    <div className="flex items-center border border-border-warm rounded-full bg-cream-light">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="p-1 hover:text-olive text-muted transition-colors"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="text-xs font-semibold px-2">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="p-1 hover:text-olive text-muted transition-colors"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>

                    <div className="text-right">
                      <span className="text-xs font-semibold text-main">
                        ₹{item.price * item.quantity}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer & Calculations */}
        {items.length > 0 && (
          <div className="p-5 border-t border-border-warm bg-cream/40 space-y-3.5">
            {/* Coupon Code Section */}
            <div>
              {couponCode ? (
                <div className="flex items-center justify-between bg-sage-soft px-3 py-1.5 rounded-lg text-xs text-olive">
                  <div className="flex items-center gap-1.5 font-medium">
                    <Tag className="w-3.5 h-3.5 text-sage" />
                    <span>Coupon <strong>{couponCode}</strong> applied</span>
                  </div>
                  <button
                    onClick={removeCoupon}
                    className="text-xs text-muted hover:text-red-500 underline ml-2"
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <form onSubmit={handleApplyCoupon} className="flex gap-2">
                  <input
                    type="text"
                    value={inputCoupon}
                    onChange={(e) => setInputCoupon(e.target.value)}
                    placeholder="Coupon (e.g. BLOOM10)"
                    className="flex-1 bg-white border border-border-warm rounded-lg px-3 py-1.5 text-xs text-main focus:outline-hidden focus:border-sage uppercase"
                  />
                  <button
                    type="submit"
                    className="bg-cream hover:bg-border-warm text-main text-xs font-semibold px-3 py-1.5 rounded-lg border border-border-warm transition-colors"
                  >
                    Apply
                  </button>
                </form>
              )}
              {couponMsg && (
                <p
                  className={`text-[10px] mt-1 ${
                    couponMsg.error ? 'text-red-600' : 'text-sage-dark'
                  }`}
                >
                  {couponMsg.text}
                </p>
              )}
            </div>

            {/* Calculations breakdown */}
            <div className="text-xs space-y-1.5 pt-1 text-muted border-t border-border-warm/60">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="text-main font-medium">₹{subtotal}</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-sage-dark font-medium">
                  <span>Special Discount</span>
                  <span>-₹{discount}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Shipping Across India</span>
                <span className="text-main font-medium">
                  {shippingFee === 0 ? <span className="text-sage font-semibold">FREE</span> : `₹${shippingFee}`}
                </span>
              </div>
              <div className="flex justify-between text-sm font-semibold text-main pt-1.5 border-t border-border-warm">
                <span className="font-editorial text-base">Estimated Total</span>
                <span>₹{finalTotal}</span>
              </div>
            </div>

            {/* Checkout CTA */}
            <Link
              href="/checkout"
              onClick={closeCart}
              className="w-full flex items-center justify-center gap-2 bg-olive hover:bg-olive-dark text-ivory py-3.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all shadow-md hover:shadow-lg"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <p className="text-[10px] text-center text-muted">
              🔒 Safe & Secure Checkout • Handmade with Love
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
