'use client';

import React, { useEffect, useState, use } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Order } from '@/lib/db';
import { CheckCircle2, PackageCheck, Sparkles, Truck, ArrowRight, Printer } from 'lucide-react';

export default function OrderConfirmationPage({
  params,
}: {
  params: Promise<{ orderId: string }>;
}) {
  const resolvedParams = use(params);
  const orderId = resolvedParams.orderId;

  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/orders/${orderId}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.order) {
          setOrder(data.order);
        }
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [orderId]);

  return (
    <div className="min-h-screen flex flex-col bg-ivory">
      <Navbar />

      <main className="flex-1 max-w-4xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-12">
        {loading ? (
          <div className="text-center py-24 space-y-3">
            <div className="w-10 h-10 border-3 border-sage border-t-transparent rounded-full animate-spin mx-auto" />
            <p className="text-xs text-muted">Retrieving your order details...</p>
          </div>
        ) : !order ? (
          <div className="text-center py-16 bg-white/70 border border-border-warm rounded-3xl p-8">
            <h2 className="font-editorial text-2xl font-semibold text-main mb-2">Order Not Found</h2>
            <p className="text-xs text-muted mb-6">Could not locate order ID #{orderId}.</p>
            <Link
              href="/"
              className="bg-olive text-ivory text-xs font-semibold px-6 py-2.5 rounded-full"
            >
              Return Home
            </Link>
          </div>
        ) : (
          <div className="bg-white rounded-3xl border border-border-warm shadow-md p-6 sm:p-10 space-y-8">
            {/* Header Badge */}
            <div className="text-center space-y-3 pb-8 border-b border-border-warm">
              <div className="w-16 h-16 rounded-full bg-sage-soft text-olive mx-auto flex items-center justify-center">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <span className="text-xs uppercase tracking-widest text-sage font-semibold">
                Thank You For Your Order!
              </span>
              <h1 className="font-editorial text-3xl sm:text-4xl font-semibold text-main">
                Your Blooms Are Being Prepared ♡
              </h1>
              <p className="text-xs sm:text-sm text-muted max-w-md mx-auto">
                We have received your order <strong>#{order.id}</strong>. A confirmation has been sent to <strong>{order.customer.email}</strong>.
              </p>
            </div>

            {/* Quick Summary Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs bg-cream-light p-4 rounded-2xl border border-border-warm">
              <div>
                <p className="text-muted text-[11px]">Order Number</p>
                <p className="font-bold text-main">{order.id}</p>
              </div>
              <div>
                <p className="text-muted text-[11px]">Date &amp; Status</p>
                <p className="font-bold text-main capitalize">
                  {new Date(order.createdAt).toLocaleDateString()} •{' '}
                  <span className="text-olive">{order.orderStatus}</span>
                </p>
              </div>
              <div>
                <p className="text-muted text-[11px]">Payment Method</p>
                <p className="font-bold text-main uppercase">
                  {order.paymentMethod} ({order.paymentStatus})
                </p>
              </div>
            </div>

            {/* Items Ordered */}
            <div className="space-y-4">
              <h3 className="font-editorial text-xl font-semibold text-main">
                Ordered Flower Bouquets
              </h3>
              <div className="divide-y divide-border-warm border-y border-border-warm">
                {order.items.map((item, idx) => (
                  <div key={idx} className="py-4 flex gap-4 items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="relative w-16 h-20 rounded-xl overflow-hidden bg-cream shrink-0 border border-border-warm">
                        <Image src={item.image} alt={item.title} fill className="object-cover" />
                      </div>
                      <div>
                        <h4 className="text-xs sm:text-sm font-semibold text-main">{item.title}</h4>
                        <p className="text-[11px] text-muted">
                          Color: {item.selectedColor} • Wrap: {item.selectedWrap} • Qty: {item.quantity}
                        </p>
                        {item.giftMessage && (
                          <p className="text-[10px] text-sage italic mt-0.5">
                            Card Note: &ldquo;{item.giftMessage}&rdquo;
                          </p>
                        )}
                      </div>
                    </div>
                    <span className="text-xs sm:text-sm font-bold text-main">
                      ₹{item.price * item.quantity}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Totals & Delivery Address */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 pt-4">
              <div className="text-xs space-y-1.5 text-muted">
                <h4 className="font-semibold text-main text-xs uppercase tracking-wider mb-2">
                  Delivery Details
                </h4>
                <p className="font-medium text-main">{order.customer.name}</p>
                <p>{order.shippingAddress.street}</p>
                {order.shippingAddress.apartment && <p>{order.shippingAddress.apartment}</p>}
                <p>
                  {order.shippingAddress.city}, {order.shippingAddress.state} - {order.shippingAddress.postalCode}
                </p>
                <p>Phone: {order.customer.phone}</p>
                {order.giftMessage && (
                  <div className="mt-3 p-3 bg-blush-light rounded-xl border border-blush text-olive text-[11px] italic">
                    💌 Gift Note: &ldquo;{order.giftMessage}&rdquo;
                  </div>
                )}
              </div>

              <div className="text-xs space-y-2 text-muted sm:border-l sm:border-border-warm sm:pl-8">
                <h4 className="font-semibold text-main text-xs uppercase tracking-wider mb-2">
                  Price Breakdown
                </h4>
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-medium text-main">₹{order.subtotal}</span>
                </div>
                {order.discount > 0 && (
                  <div className="flex justify-between text-sage font-medium">
                    <span>Discount</span>
                    <span>-₹{order.discount}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Shipping Fee</span>
                  <span className="font-medium text-main">
                    {order.shippingFee === 0 ? 'FREE' : `₹${order.shippingFee}`}
                  </span>
                </div>
                <div className="flex justify-between text-base font-bold text-main border-t border-border-warm pt-2">
                  <span>Total Paid</span>
                  <span>₹{order.total}</span>
                </div>
              </div>
            </div>

            {/* Next Steps CTA */}
            <div className="pt-8 border-t border-border-warm flex flex-col sm:flex-row items-center justify-between gap-4">
              <Link
                href="/track"
                className="inline-flex items-center gap-2 text-xs font-semibold text-olive hover:underline"
              >
                <Truck className="w-4 h-4 text-sage" />
                <span>Track Order Status Anytime</span>
              </Link>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => window.print()}
                  className="bg-cream hover:bg-border-warm text-main text-xs font-semibold px-4 py-2.5 rounded-full border border-border-warm flex items-center gap-1.5 transition-colors"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Print Receipt</span>
                </button>
                <Link
                  href="/shop"
                  className="bg-olive hover:bg-olive-dark text-ivory text-xs font-semibold px-6 py-2.5 rounded-full transition-colors flex items-center gap-1.5"
                >
                  <span>Continue Shopping</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
