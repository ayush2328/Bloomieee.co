'use client';

import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Image from 'next/image';
import { Search, Package, Truck, CheckCircle2, Clock, AlertCircle } from 'lucide-react';
import { Order } from '@/lib/db';

export default function OrderTrackingPage() {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [orders, setOrders] = useState<Order[] | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    setErrorMsg(null);
    setOrders(null);

    try {
      const res = await fetch(`/api/orders?track=${encodeURIComponent(query.trim())}`);
      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Failed to search order.');
      }
      if (data.orders.length === 0) {
        setErrorMsg('No orders found matching this Order Number, Email, or Phone number.');
      } else {
        setOrders(data.orders);
      }
    } catch (err: unknown) {
      setErrorMsg(err instanceof Error ? err.message : 'Error retrieving order.');
    } finally {
      setLoading(false);
    }
  };

  const getStepIndex = (status: string) => {
    switch (status.toLowerCase()) {
      case 'pending':
        return 1;
      case 'crafting':
        return 2;
      case 'shipped':
        return 3;
      case 'delivered':
        return 4;
      default:
        return 1;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-ivory">
      <Navbar />

      <main className="flex-1 max-w-4xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center max-w-xl mx-auto mb-10">
          <span className="text-xs uppercase tracking-widest text-sage font-semibold">
            Real-Time Updates
          </span>
          <h1 className="font-editorial text-3xl sm:text-4xl font-semibold text-main mt-1 mb-3">
            Track Your Everlasting Bouquet
          </h1>
          <p className="text-xs sm:text-sm text-muted">
            Enter your order reference ID (e.g. BLM-2026-9281), your email, or your phone number to check the crafting and shipping progress.
          </p>

          <form onSubmit={handleSearch} className="mt-6 flex gap-2 max-w-md mx-auto">
            <input
              type="text"
              required
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Order ID, Email, or Phone..."
              className="flex-1 bg-white border border-border-warm rounded-full px-5 py-3 text-xs sm:text-sm text-main focus:outline-hidden focus:border-sage shadow-2xs"
            />
            <button
              type="submit"
              disabled={loading}
              className="bg-olive hover:bg-olive-dark text-ivory text-xs font-semibold uppercase tracking-wider px-6 py-3 rounded-full transition-all shadow-md shrink-0 disabled:opacity-50 flex items-center gap-1.5"
            >
              <Search className="w-3.5 h-3.5" />
              <span>{loading ? 'Searching...' : 'Track'}</span>
            </button>
          </form>

          {/* Quick test prompt for convenience */}
          <p className="text-[11px] text-muted/70 mt-2">
            Try sample order ID: <button onClick={() => setQuery('BLM-9281')} className="underline text-sage font-medium">BLM-9281</button>
          </p>
        </div>

        {errorMsg && (
          <div className="p-4 bg-red-50 border border-red-200 rounded-2xl text-xs text-red-700 flex items-center justify-center gap-2 max-w-md mx-auto mb-8">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        {orders && orders.length > 0 && (
          <div className="space-y-8">
            {orders.map((ord) => {
              const currentStep = getStepIndex(ord.orderStatus);
              const steps = [
                { label: 'Order Received', desc: 'Confirmed & in queue' },
                { label: 'Crafting in Studio', desc: 'Petals hand-sculpted' },
                { label: 'Dispatched', desc: 'With courier partner' },
                { label: 'Delivered', desc: 'Arrived at your door' },
              ];

              return (
                <div
                  key={ord.id}
                  className="bg-white rounded-3xl border border-border-warm p-6 sm:p-8 shadow-sm space-y-6"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-border-warm gap-2">
                    <div>
                      <span className="text-[10px] uppercase tracking-wider text-sage font-semibold">
                        Order #{ord.id}
                      </span>
                      <h2 className="font-editorial text-2xl font-semibold text-main">
                        Status: <span className="capitalize text-olive">{ord.orderStatus}</span>
                      </h2>
                    </div>
                    <div className="text-left sm:text-right text-xs text-muted">
                      <p>Placed: {new Date(ord.createdAt).toLocaleDateString()}</p>
                      <p>Total: <strong>₹{ord.total}</strong> ({ord.paymentStatus})</p>
                    </div>
                  </div>

                  {/* Progress Tracker */}
                  <div className="py-4">
                    <div className="grid grid-cols-4 gap-2 relative">
                      {steps.map((st, sIdx) => {
                        const stepNum = sIdx + 1;
                        const isDone = stepNum <= currentStep;
                        const isCurrent = stepNum === currentStep;

                        return (
                          <div key={st.label} className="flex flex-col items-center text-center">
                            <div
                              className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs mb-2 transition-colors ${
                                isDone
                                  ? 'bg-olive text-ivory'
                                  : 'bg-cream text-muted border border-border-warm'
                              } ${isCurrent ? 'ring-4 ring-sage/20' : ''}`}
                            >
                              {isDone ? <CheckCircle2 className="w-5 h-5" /> : stepNum}
                            </div>
                            <span
                              className={`text-xs font-semibold ${
                                isDone ? 'text-main' : 'text-muted'
                              }`}
                            >
                              {st.label}
                            </span>
                            <span className="text-[10px] text-muted hidden sm:inline">
                              {st.desc}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {ord.trackingNumber && (
                    <div className="p-3.5 bg-sage-soft rounded-2xl text-xs text-olive flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Truck className="w-4 h-4 text-sage" />
                        <span>Courier Tracking: <strong>{ord.trackingNumber}</strong></span>
                      </div>
                      <span className="text-[11px] underline font-medium">In Transit</span>
                    </div>
                  )}

                  {/* Items Ordered */}
                  <div className="space-y-3 pt-2">
                    <h4 className="text-xs font-semibold uppercase tracking-wider text-main">
                      Items in this shipment
                    </h4>
                    <div className="divide-y divide-border-warm">
                      {ord.items.map((it, iIdx) => (
                        <div key={iIdx} className="py-2.5 flex items-center justify-between text-xs">
                          <div className="flex items-center gap-3">
                            <div className="relative w-12 h-14 rounded-lg overflow-hidden bg-cream border border-border-warm">
                              <Image src={it.image} alt={it.title} fill className="object-cover" />
                            </div>
                            <div>
                              <p className="font-semibold text-main">{it.title}</p>
                              <p className="text-[11px] text-muted">
                                {it.selectedColor} • Qty: {it.quantity}
                              </p>
                            </div>
                          </div>
                          <span className="font-semibold text-main">₹{it.price * it.quantity}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Delivery destination */}
                  <div className="pt-2 border-t border-border-warm text-xs text-muted">
                    <p className="font-medium text-main">Shipping Destination:</p>
                    <p>
                      {ord.customer.name} • {ord.shippingAddress.street}, {ord.shippingAddress.city},{' '}
                      {ord.shippingAddress.state} - {ord.shippingAddress.postalCode}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
