'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useCart } from '@/context/CartContext';
import {
  ShieldCheck,
  CreditCard,
  Truck,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  Gift,
  Lock,
} from 'lucide-react';

export default function CheckoutPage() {
  const router = useRouter();
  const { items, subtotal, discount, couponCode, clearCart } = useCart();

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Form Fields
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    street: '',
    apartment: '',
    city: '',
    state: 'Maharashtra',
    postalCode: '',
    country: 'India',
    giftMessage: '',
    notes: '',
    paymentMethod: 'razorpay' as 'razorpay' | 'cod' | 'manual_upi',
  });

  const indianStates = [
    'Andhra Pradesh',
    'Assam',
    'Bihar',
    'Chandigarh',
    'Delhi NCR',
    'Goa',
    'Gujarat',
    'Haryana',
    'Karnataka',
    'Kerala',
    'Madhya Pradesh',
    'Maharashtra',
    'Punjab',
    'Rajasthan',
    'Tamil Nadu',
    'Telangana',
    'Uttar Pradesh',
    'West Bengal',
  ];

  const freeShippingGoal = 999;
  const shippingFee = subtotal >= freeShippingGoal || subtotal === 0 ? 0 : 79;
  const grandTotal = Math.max(0, subtotal + shippingFee - discount);

  const handleSubmitOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (items.length === 0) {
      setErrorMsg('Your cart is empty. Please add items before checking out.');
      return;
    }

    if (!formData.name.trim() || !formData.email.trim() || !formData.phone.trim()) {
      setErrorMsg('Please provide your full name, email address, and 10-digit mobile number.');
      return;
    }

    if (!formData.street.trim() || !formData.city.trim() || !formData.postalCode.trim()) {
      setErrorMsg('Please provide your complete shipping street address, city, and 6-digit postal pincode.');
      return;
    }

    setLoading(true);

    try {
      const orderPayload = {
        customer: {
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
        },
        shippingAddress: {
          street: formData.street,
          apartment: formData.apartment,
          city: formData.city,
          state: formData.state,
          postalCode: formData.postalCode,
          country: formData.country,
        },
        items: items.map((i) => ({
          productId: i.productId,
          title: i.title,
          slug: i.slug,
          price: i.price,
          quantity: i.quantity,
          image: i.image,
          selectedColor: i.selectedColor,
          selectedWrap: i.selectedWrap,
          giftMessage: i.giftMessage,
        })),
        paymentMethod: formData.paymentMethod,
        couponCode: couponCode || undefined,
        notes: formData.notes,
        giftMessage: formData.giftMessage,
      };

      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderPayload),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Failed to place order.');
      }

      // Clear cart
      clearCart();

      // Redirect to confirmation receipt
      router.push(`/order-confirmation/${data.order.id}`);
    } catch (err: unknown) {
      setErrorMsg(err instanceof Error ? err.message : 'Checkout encountered an error.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-ivory">
      <Navbar />

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-10">
        <div className="max-w-2xl mx-auto mb-8 text-center">
          <span className="text-xs uppercase tracking-widest text-sage font-semibold">
            Secure Boutique Checkout
          </span>
          <h1 className="font-editorial text-3xl sm:text-4xl font-semibold text-main mt-1">
            Complete Your Floral Gift
          </h1>
          <p className="text-xs text-muted mt-1">
            Handcrafted with chenille velvet and safely packaged in our signature floral presentation box.
          </p>
        </div>

        {items.length === 0 ? (
          <div className="text-center py-16 bg-white/70 border border-border-warm rounded-3xl p-8 max-w-md mx-auto">
            <h2 className="font-editorial text-2xl font-semibold text-main mb-2">No items to checkout</h2>
            <p className="text-xs text-muted mb-6">Your shopping bag is currently empty.</p>
            <Link
              href="/shop"
              className="bg-olive text-ivory text-xs font-semibold px-6 py-3 rounded-full"
            >
              Back to Catalog
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmitOrder}>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
              {/* Left Column: Form Fields */}
              <div className="lg:col-span-7 space-y-8">
                {errorMsg && (
                  <div className="p-4 bg-red-50 border border-red-200 rounded-2xl text-xs text-red-700 flex items-center gap-2.5">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{errorMsg}</span>
                  </div>
                )}

                {/* 1. Contact Information */}
                <div className="bg-white/80 border border-border-warm rounded-3xl p-6 sm:p-7 space-y-4 shadow-2xs">
                  <h2 className="font-editorial text-xl font-semibold text-main border-b border-border-warm pb-3">
                    1. Contact Information
                  </h2>
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-main mb-1.5">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Meera Singhania"
                      className="w-full bg-cream-light border border-border-warm rounded-xl px-4 py-2.5 text-xs text-main focus:outline-hidden focus:border-sage"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-main mb-1.5">
                        Email Address (for tracking & receipt) *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="meera@example.com"
                        className="w-full bg-cream-light border border-border-warm rounded-xl px-4 py-2.5 text-xs text-main focus:outline-hidden focus:border-sage"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-main mb-1.5">
                        Phone / WhatsApp (for delivery updates) *
                      </label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+91 98765 43210"
                        className="w-full bg-cream-light border border-border-warm rounded-xl px-4 py-2.5 text-xs text-main focus:outline-hidden focus:border-sage"
                      />
                    </div>
                  </div>
                </div>

                {/* 2. Shipping Address */}
                <div className="bg-white/80 border border-border-warm rounded-3xl p-6 sm:p-7 space-y-4 shadow-2xs">
                  <h2 className="font-editorial text-xl font-semibold text-main border-b border-border-warm pb-3">
                    2. Shipping Address (India)
                  </h2>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-main mb-1.5">
                      Flat / House No. / Street Address *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.street}
                      onChange={(e) => setFormData({ ...formData, street: e.target.value })}
                      placeholder="Flat 302, Palm Heights, Linking Road"
                      className="w-full bg-cream-light border border-border-warm rounded-xl px-4 py-2.5 text-xs text-main focus:outline-hidden focus:border-sage"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-main mb-1.5">
                      Apartment / Landmark / Area (Optional)
                    </label>
                    <input
                      type="text"
                      value={formData.apartment}
                      onChange={(e) => setFormData({ ...formData, apartment: e.target.value })}
                      placeholder="Near City Park / Behind Metro Station"
                      className="w-full bg-cream-light border border-border-warm rounded-xl px-4 py-2.5 text-xs text-main focus:outline-hidden focus:border-sage"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-main mb-1.5">
                        City *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.city}
                        onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                        placeholder="Mumbai"
                        className="w-full bg-cream-light border border-border-warm rounded-xl px-4 py-2.5 text-xs text-main focus:outline-hidden focus:border-sage"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-main mb-1.5">
                        State *
                      </label>
                      <select
                        value={formData.state}
                        onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                        className="w-full bg-cream-light border border-border-warm rounded-xl px-3 py-2.5 text-xs text-main focus:outline-hidden focus:border-sage"
                      >
                        {indianStates.map((st) => (
                          <option key={st} value={st}>
                            {st}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-main mb-1.5">
                        PIN Code *
                      </label>
                      <input
                        type="text"
                        required
                        maxLength={6}
                        value={formData.postalCode}
                        onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })}
                        placeholder="400050"
                        className="w-full bg-cream-light border border-border-warm rounded-xl px-4 py-2.5 text-xs text-main focus:outline-hidden focus:border-sage"
                      />
                    </div>
                  </div>
                </div>

                {/* 3. Gift Note Card & Notes */}
                <div className="bg-white/80 border border-border-warm rounded-3xl p-6 sm:p-7 space-y-4 shadow-2xs">
                  <h2 className="font-editorial text-xl font-semibold text-main border-b border-border-warm pb-3 flex items-center gap-2">
                    <Gift className="w-5 h-5 text-sage" />
                    <span>3. Gift Message & Delivery Notes</span>
                  </h2>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-main mb-1.5">
                      Handwritten Note Card Message (Optional)
                    </label>
                    <textarea
                      rows={2}
                      value={formData.giftMessage}
                      onChange={(e) => setFormData({ ...formData, giftMessage: e.target.value })}
                      placeholder="Write words of love, celebration, or care. We will handwrite this on a Bloomieee card with a botanical wax seal..."
                      className="w-full bg-cream-light border border-border-warm rounded-xl p-3 text-xs text-main focus:outline-hidden focus:border-sage resize-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-main mb-1.5">
                      Order Instructions (e.g. Ring doorbell, leave with guard)
                    </label>
                    <input
                      type="text"
                      value={formData.notes}
                      onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                      placeholder="Any specific delivery instructions"
                      className="w-full bg-cream-light border border-border-warm rounded-xl px-4 py-2 text-xs text-main focus:outline-hidden"
                    />
                  </div>
                </div>

                {/* 4. Payment Selection */}
                <div className="bg-white/80 border border-border-warm rounded-3xl p-6 sm:p-7 space-y-4 shadow-2xs">
                  <h2 className="font-editorial text-xl font-semibold text-main border-b border-border-warm pb-3">
                    4. Select Payment Method
                  </h2>

                  <div className="space-y-3">
                    {/* Razorpay Online */}
                    <label
                      className={`p-4 rounded-2xl border flex items-center justify-between cursor-pointer transition-all ${
                        formData.paymentMethod === 'razorpay'
                          ? 'bg-sage-soft border-sage text-olive shadow-xs'
                          : 'bg-white border-border-warm hover:border-sage/40'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <input
                          type="radio"
                          name="paymentMethod"
                          value="razorpay"
                          checked={formData.paymentMethod === 'razorpay'}
                          onChange={() => setFormData({ ...formData, paymentMethod: 'razorpay' })}
                          className="text-sage focus:ring-sage"
                        />
                        <div>
                          <p className="text-xs font-semibold text-main">
                            Razorpay Secure (UPI, Cards, NetBanking, Wallets)
                          </p>
                          <p className="text-[11px] text-muted">
                            Fastest checkout via Google Pay, PhonePe, Paytm, or Credit/Debit Cards.
                          </p>
                        </div>
                      </div>
                      <CreditCard className="w-5 h-5 text-olive shrink-0" />
                    </label>

                    {/* Cash on Delivery */}
                    <label
                      className={`p-4 rounded-2xl border flex items-center justify-between cursor-pointer transition-all ${
                        formData.paymentMethod === 'cod'
                          ? 'bg-sage-soft border-sage text-olive shadow-xs'
                          : 'bg-white border-border-warm hover:border-sage/40'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <input
                          type="radio"
                          name="paymentMethod"
                          value="cod"
                          checked={formData.paymentMethod === 'cod'}
                          onChange={() => setFormData({ ...formData, paymentMethod: 'cod' })}
                          className="text-sage focus:ring-sage"
                        />
                        <div>
                          <p className="text-xs font-semibold text-main">
                            Cash on Delivery (COD)
                          </p>
                          <p className="text-[11px] text-muted">
                            Pay in cash upon doorstep delivery anywhere in India.
                          </p>
                        </div>
                      </div>
                      <Truck className="w-5 h-5 text-olive shrink-0" />
                    </label>
                  </div>
                </div>
              </div>

              {/* Right Column: Order Summary & Confirmation CTA */}
              <div className="lg:col-span-5 bg-white/90 border border-border-warm rounded-3xl p-6 sm:p-7 space-y-6 sticky top-28 shadow-sm">
                <h2 className="font-editorial text-xl font-semibold text-main border-b border-border-warm pb-3">
                  In Your Floral Bag ({items.length})
                </h2>

                <div className="max-h-72 overflow-y-auto space-y-3 pr-1">
                  {items.map((item) => (
                    <div key={item.id} className="flex gap-3 items-center text-xs">
                      <div className="relative w-14 h-16 rounded-lg overflow-hidden bg-cream shrink-0 border border-border-warm">
                        <Image src={item.image} alt={item.title} fill className="object-cover" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium text-main line-clamp-1">{item.title}</h4>
                        <p className="text-[10px] text-muted">
                          Qty: {item.quantity} • {item.selectedColor}
                        </p>
                      </div>
                      <span className="font-semibold text-main">₹{item.price * item.quantity}</span>
                    </div>
                  ))}
                </div>

                <div className="space-y-2 text-xs text-muted border-t border-border-warm pt-4">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span className="text-main font-semibold">₹{subtotal}</span>
                  </div>
                  {discount > 0 && (
                    <div className="flex justify-between text-sage font-medium">
                      <span>Discount ({couponCode})</span>
                      <span>-₹{discount}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span>Courier Delivery Across India</span>
                    <span className="text-main font-semibold">
                      {shippingFee === 0 ? <span className="text-sage font-bold">FREE</span> : `₹${shippingFee}`}
                    </span>
                  </div>
                  <div className="flex justify-between text-lg font-bold text-main border-t border-border-warm pt-3">
                    <span className="font-editorial">Grand Total</span>
                    <span>₹{grandTotal}</span>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-olive hover:bg-olive-dark text-ivory py-4 rounded-full text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-md hover:shadow-lg disabled:opacity-50 cursor-pointer"
                >
                  {loading ? (
                    <span>Placing Your Order...</span>
                  ) : (
                    <>
                      <Lock className="w-3.5 h-3.5" />
                      <span>Confirm &amp; Place Order • ₹{grandTotal}</span>
                    </>
                  )}
                </button>

                <div className="pt-2 text-center space-y-2">
                  <p className="text-[11px] text-muted flex items-center justify-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-sage" />
                    <span>256-Bit SSL Encrypted &amp; Secure Verification</span>
                  </p>
                  <p className="text-[10px] text-muted/70">
                    Your everlasting bouquet will be hand-sculpted in 2-3 business days.
                  </p>
                </div>
              </div>
            </div>
          </form>
        )}
      </main>

      <Footer />
    </div>
  );
}
