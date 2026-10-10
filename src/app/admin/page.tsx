'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import {
  Package,
  ShoppingBag,
  Sparkles,
  Users,
  Settings,
  Plus,
  Trash2,
  Pencil,
  ExternalLink,
  LogOut,
  Truck,
  CheckCircle2,
  AlertCircle,
  Save,
  MessageCircle,
} from 'lucide-react';
import { Product, Order, CustomRequest, StoreSettings, NewsletterSubscriber } from '@/lib/db';

export default function AdminDashboardPage() {
  const router = useRouter();
  const [token, setToken] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'overview' | 'products' | 'orders' | 'custom' | 'newsletter' | 'settings'>('overview');

  // Data states
  const [products, setProducts] = useState<Product[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [requests, setRequests] = useState<CustomRequest[]>([]);
  const [subscribers, setSubscribers] = useState<NewsletterSubscriber[]>([]);
  const [settings, setSettings] = useState<StoreSettings | null>(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState<string | null>(null);

  // New product form modal
  const [isNewProductOpen, setIsNewProductOpen] = useState(false);
  const [newProd, setNewProd] = useState({
    title: '',
    category: 'Tulip Bouquets',
    price: 1299,
    originalPrice: 1599,
    inStock: 10,
    isFeatured: true,
    isBestseller: false,
    images: ['/images/products/royal-blue-velvet-tulips.jpg'],
    flowerTypes: 'Tulips, Star Lilies',
    colors: 'Cobalt Blue & Pearl',
    description: 'Artisan handcrafted pipe-cleaner floral arrangement.',
  });

  // Edit product modal
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [editProd, setEditProd] = useState({
    title: '',
    category: 'Tulip Bouquets',
    price: 0,
    originalPrice: 0,
    inStock: 0,
    isFeatured: false,
    isBestseller: false,
    flowerTypes: '',
    colors: '',
    description: '',
    images: '',
  });

  const openEditModal = (p: Product) => {
    setEditingProduct(p);
    setEditProd({
      title: p.title,
      category: p.category,
      price: p.price,
      originalPrice: p.originalPrice ?? 0,
      inStock: p.inStock,
      isFeatured: p.isFeatured,
      isBestseller: p.isBestseller,
      flowerTypes: p.flowerTypes.join(', '),
      colors: p.colors.join(', '),
      description: p.description,
      images: p.images.join('\n'),
    });
  };

  const handleEditProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token || !editingProduct) return;
    try {
      const payload = {
        ...editProd,
        flowerTypes: editProd.flowerTypes.split(',').map((s) => s.trim()),
        colors: editProd.colors.split(',').map((s) => s.trim()),
        images: editProd.images
          .split('\n')
          .map((s) => s.trim())
          .filter(Boolean),
      };
      const res = await fetch(`/api/products/${editingProduct.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (data.success) {
        setProducts((prev) =>
          prev.map((p) => (p.id === editingProduct.id ? { ...p, ...data.product } : p))
        );
        setEditingProduct(null);
        setMessage(`"${editProd.title}" updated successfully!`);
        setTimeout(() => setMessage(null), 2500);
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Verify auth on mount
  useEffect(() => {
    const saved = sessionStorage.getItem('bloomieee_admin_token');
    if (!saved) {
      router.push('/admin/login');
      return;
    }
    setToken(saved);
    fetchAllData(saved);
  }, [router]);

  const fetchAllData = async (adminPin: string) => {
    setLoading(true);
    try {
      const headers = { Authorization: `Bearer ${adminPin}` };

      const [pRes, oRes, cRes, nRes, sRes] = await Promise.all([
        fetch('/api/products').then((r) => r.json()),
        fetch('/api/orders', { headers }).then((r) => r.json()),
        fetch('/api/custom-requests', { headers }).then((r) => r.json()),
        fetch('/api/newsletter', { headers }).then((r) => r.json()),
        fetch('/api/settings').then((r) => r.json()),
      ]);

      if (pRes.success) setProducts(pRes.products);
      if (oRes.success) setOrders(oRes.orders);
      if (cRes.success) setRequests(cRes.requests);
      if (nRes.success) setSubscribers(nRes.subscribers);
      if (sRes.success) setSettings(sRes.settings);
    } catch (e) {
      console.error('Error fetching admin data', e);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem('bloomieee_admin_token');
    router.push('/admin/login');
  };

  const handleSaveStock = async (product: Product, newStock: number) => {
    if (!token) return;
    try {
      const res = await fetch(`/api/products/${product.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ inStock: newStock }),
      });
      if (res.ok) {
        setProducts((prev) =>
          prev.map((p) => (p.id === product.id ? { ...p, inStock: newStock } : p))
        );
        setMessage(`Stock for "${product.title}" updated.`);
        setTimeout(() => setMessage(null), 2500);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleDeleteProduct = async (id: string) => {
    if (!token || !confirm('Are you sure you want to delete this product?')) return;
    try {
      const res = await fetch(`/api/products/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        setProducts((prev) => prev.filter((p) => p.id !== id));
        setMessage('Product removed successfully.');
        setTimeout(() => setMessage(null), 2500);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleCreateProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) return;
    try {
      const payload = {
        ...newProd,
        flowerTypes: newProd.flowerTypes.split(',').map((s) => s.trim()),
        colors: newProd.colors.split(',').map((s) => s.trim()),
      };
      const res = await fetch('/api/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (data.success) {
        setProducts((prev) => [data.product, ...prev]);
        setIsNewProductOpen(false);
        setMessage('New bouquet created successfully!');
        setTimeout(() => setMessage(null), 2500);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleUpdateOrderStatus = async (orderId: string, newStatus: string) => {
    if (!token) return;
    try {
      const res = await fetch(`/api/orders/${orderId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ orderStatus: newStatus }),
      });
      if (res.ok) {
        setOrders((prev) =>
          prev.map((o) => (o.id === orderId ? { ...o, orderStatus: newStatus as Order['orderStatus'] } : o))
        );
        setMessage(`Order #${orderId} marked as ${newStatus}.`);
        setTimeout(() => setMessage(null), 2500);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleUpdateTracking = async (orderId: string, trackingNumber: string) => {
    if (!token) return;
    try {
      const res = await fetch(`/api/orders/${orderId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ trackingNumber }),
      });
      if (res.ok) {
        setOrders((prev) =>
          prev.map((o) => (o.id === orderId ? { ...o, trackingNumber } : o))
        );
        setMessage(`Tracking updated for #${orderId}.`);
        setTimeout(() => setMessage(null), 2500);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleUpdateRequestStatus = async (reqId: string, status: string) => {
    if (!token) return;
    try {
      const res = await fetch('/api/custom-requests', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ id: reqId, status }),
      });
      if (res.ok) {
        setRequests((prev) =>
          prev.map((r) => (r.id === reqId ? { ...r, status: status as CustomRequest['status'] } : r))
        );
        setMessage(`Custom request updated to ${status}.`);
        setTimeout(() => setMessage(null), 2500);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token || !settings) return;
    try {
      const res = await fetch('/api/settings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(settings),
      });
      if (res.ok) {
        setMessage('Studio settings saved successfully.');
        setTimeout(() => setMessage(null), 2500);
      }
    } catch (e) {
      console.error(e);
    }
  };

  // Analytics
  const totalRevenue = orders.reduce((sum, o) => sum + (o.paymentStatus === 'paid' ? o.total : 0), 0);
  const totalItemsSold = orders.reduce((sum, o) => sum + o.items.reduce((s, i) => s + i.quantity, 0), 0);

  return (
    <div className="min-h-screen bg-cream/30 flex flex-col">
      {/* Top Admin Navbar */}
      <header className="bg-white border-b border-border-warm px-6 py-4 flex items-center justify-between sticky top-0 z-30 shadow-2xs">
        <div className="flex items-center gap-3">
          <div className="relative w-10 h-10 rounded-full overflow-hidden border border-sage/40 bg-cream">
            <Image src="/images/brand/bloomieee-logo.png" alt="Logo" fill className="object-cover" />
          </div>
          <div>
            <span className="font-editorial text-xl font-bold text-main">Bloomieee Studio</span>
            <span className="text-[10px] bg-sage-soft text-olive px-2 py-0.5 rounded-full font-semibold ml-2">
              Owner Panel
            </span>
          </div>
        </div>

        <div className="flex items-center gap-4 text-xs">
          <Link
            href="/"
            target="_blank"
            className="hidden sm:flex items-center gap-1.5 text-muted hover:text-main"
          >
            <span>View Live Store</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>
          <button
            onClick={handleLogout}
            className="flex items-center gap-1.5 text-red-600 hover:text-red-700 font-semibold p-1.5"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </button>
        </div>
      </header>

      {/* Toast Alert */}
      {message && (
        <div className="fixed bottom-6 right-6 z-50 bg-olive text-ivory text-xs px-5 py-3 rounded-2xl shadow-xl flex items-center gap-2 animate-in fade-in slide-in-from-bottom">
          <CheckCircle2 className="w-4 h-4 text-blush" />
          <span>{message}</span>
        </div>
      )}

      {/* Main Container */}
      <div className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
        {/* Navigation Tabs */}
        <div className="flex gap-2 overflow-x-auto pb-4 mb-6 border-b border-border-warm">
          {[
            { id: 'overview', label: 'Overview & Metrics', icon: Sparkles },
            { id: 'products', label: `Products (${products.length})`, icon: Package },
            { id: 'orders', label: `Orders (${orders.length})`, icon: ShoppingBag },
            { id: 'custom', label: `Custom Requests (${requests.length})`, icon: MessageCircle },
            { id: 'newsletter', label: `Subscribers (${subscribers.length})`, icon: Users },
            { id: 'settings', label: 'Store Settings', icon: Settings },
          ].map((tab) => {
            const Icon = tab.icon;
            const active = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as typeof activeTab)}
                className={`flex items-center gap-2 text-xs font-semibold px-4 py-2.5 rounded-full whitespace-nowrap transition-all ${
                  active
                    ? 'bg-olive text-ivory shadow-xs'
                    : 'bg-white hover:bg-cream text-muted border border-border-warm'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* 1. OVERVIEW TAB */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              <div className="bg-white p-6 rounded-3xl border border-border-warm shadow-2xs">
                <span className="text-xs text-muted">Paid Revenue</span>
                <p className="font-editorial text-3xl font-bold text-main mt-1">₹{totalRevenue}</p>
                <span className="text-[10px] text-sage font-medium">From fulfilled &amp; online orders</span>
              </div>
              <div className="bg-white p-6 rounded-3xl border border-border-warm shadow-2xs">
                <span className="text-xs text-muted">Total Orders</span>
                <p className="font-editorial text-3xl font-bold text-main mt-1">{orders.length}</p>
                <span className="text-[10px] text-sage font-medium">{totalItemsSold} bouquets sold</span>
              </div>
              <div className="bg-white p-6 rounded-3xl border border-border-warm shadow-2xs">
                <span className="text-xs text-muted">Custom Bouquet Inquiries</span>
                <p className="font-editorial text-3xl font-bold text-main mt-1">{requests.length}</p>
                <span className="text-[10px] text-amber-600 font-medium">
                  {requests.filter((r) => r.status === 'new').length} new pending reply
                </span>
              </div>
              <div className="bg-white p-6 rounded-3xl border border-border-warm shadow-2xs">
                <span className="text-xs text-muted">Newsletter Subscribers</span>
                <p className="font-editorial text-3xl font-bold text-main mt-1">{subscribers.length}</p>
                <span className="text-[10px] text-sage font-medium">Floral circle members</span>
              </div>
            </div>

            {/* Recent Orders Preview */}
            <div className="bg-white rounded-3xl border border-border-warm p-6 shadow-2xs">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-editorial text-xl font-semibold text-main">Recent Studio Orders</h3>
                <button
                  onClick={() => setActiveTab('orders')}
                  className="text-xs text-sage hover:underline font-semibold"
                >
                  View All Orders →
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="text-muted border-b border-border-warm bg-cream-light/60">
                    <tr>
                      <th className="p-3">Order ID</th>
                      <th className="p-3">Customer</th>
                      <th className="p-3">Items</th>
                      <th className="p-3">Total</th>
                      <th className="p-3">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border-warm">
                    {orders.slice(0, 5).map((ord) => (
                      <tr key={ord.id} className="hover:bg-cream-light/40">
                        <td className="p-3 font-semibold text-main">#{ord.id}</td>
                        <td className="p-3">
                          <p className="font-medium text-main">{ord.customer.name}</p>
                          <p className="text-[10px] text-muted">{ord.customer.phone}</p>
                        </td>
                        <td className="p-3 text-muted">
                          {ord.items.map((i) => i.title).join(', ')}
                        </td>
                        <td className="p-3 font-semibold text-main">₹{ord.total}</td>
                        <td className="p-3">
                          <span
                            className={`px-2 py-0.5 rounded-full text-[10px] font-semibold capitalize ${
                              ord.orderStatus === 'delivered'
                                ? 'bg-green-100 text-green-800'
                                : ord.orderStatus === 'shipped'
                                ? 'bg-blue-100 text-blue-800'
                                : 'bg-amber-100 text-amber-800'
                            }`}
                          >
                            {ord.orderStatus}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* 2. PRODUCTS TAB */}
        {activeTab === 'products' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-editorial text-2xl font-semibold text-main">Product Inventory</h2>
                <p className="text-xs text-muted">Manage pipe-cleaner flower bouquet listings, pricing, and stock.</p>
              </div>
              <button
                onClick={() => setIsNewProductOpen(true)}
                className="bg-olive hover:bg-olive-dark text-ivory text-xs font-semibold px-4 py-2.5 rounded-full flex items-center gap-1.5 shadow-xs"
              >
                <Plus className="w-4 h-4" />
                <span>Add New Bouquet</span>
              </button>
            </div>

            <div className="bg-white rounded-3xl border border-border-warm overflow-hidden shadow-2xs">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-cream-light text-muted border-b border-border-warm">
                    <tr>
                      <th className="p-3.5">Image</th>
                      <th className="p-3.5">Bouquet Title</th>
                      <th className="p-3.5">Category</th>
                      <th className="p-3.5">Price (₹)</th>
                      <th className="p-3.5">Stock</th>
                      <th className="p-3.5">Tags</th>
                      <th className="p-3.5 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border-warm">
                    {products.map((p) => (
                      <tr key={p.id} className="hover:bg-cream-light/30">
                        <td className="p-3.5">
                          <div className="relative w-12 h-14 rounded-lg overflow-hidden bg-cream border border-border-warm">
                            <Image src={p.images[0] || '/images/products/lavender-romance-bouquet.jpg'} alt={p.title} fill className="object-cover" />
                          </div>
                        </td>
                        <td className="p-3.5">
                          <Link href={`/product/${p.slug}`} target="_blank" className="font-semibold text-main hover:text-olive">
                            {p.title}
                          </Link>
                          <p className="text-[10px] text-muted">{p.flowerTypes.join(', ')}</p>
                        </td>
                        <td className="p-3.5 text-muted">{p.category}</td>
                        <td className="p-3.5 font-semibold text-main">₹{p.price}</td>
                        <td className="p-3.5">
                          <input
                            type="number"
                            defaultValue={p.inStock}
                            onBlur={(e) => handleSaveStock(p, Number(e.target.value))}
                            className="w-16 bg-cream-light border border-border-warm rounded-lg px-2 py-1 text-xs text-center font-semibold text-main"
                          />
                        </td>
                        <td className="p-3.5">
                          <div className="flex gap-1">
                            {p.isFeatured && <span className="bg-sage-soft text-olive text-[10px] px-2 py-0.5 rounded-full font-medium">Featured</span>}
                            {p.isBestseller && <span className="bg-blush text-olive text-[10px] px-2 py-0.5 rounded-full font-medium">Bestseller</span>}
                          </div>
                        </td>
                        <td className="p-3.5 text-right">
                          <div className="flex items-center justify-end gap-1">
                            <button
                              onClick={() => openEditModal(p)}
                              className="p-1.5 text-muted hover:text-olive rounded-lg transition-colors"
                              title="Edit product"
                            >
                              <Pencil className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleDeleteProduct(p.id)}
                              className="p-1.5 text-muted hover:text-red-500 rounded-lg transition-colors"
                              title="Delete product"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* 3. ORDERS TAB */}
        {activeTab === 'orders' && (
          <div className="space-y-6">
            <div>
              <h2 className="font-editorial text-2xl font-semibold text-main">Customer Orders</h2>
              <p className="text-xs text-muted">Update fulfillment status, courier tracking, and view handwritten card notes.</p>
            </div>

            <div className="space-y-4">
              {orders.map((ord) => (
                <div key={ord.id} className="bg-white rounded-3xl border border-border-warm p-6 shadow-2xs space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-border-warm gap-2">
                    <div>
                      <span className="font-bold text-main text-sm">#{ord.id}</span>
                      <span className="text-xs text-muted ml-2">{new Date(ord.createdAt).toLocaleDateString()}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-xs font-semibold text-muted">Status:</span>
                      <select
                        value={ord.orderStatus}
                        onChange={(e) => handleUpdateOrderStatus(ord.id, e.target.value)}
                        className="bg-cream-light border border-border-warm rounded-xl px-3 py-1.5 text-xs text-main font-semibold capitalize"
                      >
                        <option value="pending">Pending</option>
                        <option value="crafting">Crafting in Studio</option>
                        <option value="shipped">Shipped</option>
                        <option value="delivered">Delivered</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
                    </div>
                  </div>

                  {/* Customer details & address */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-muted bg-cream-light/50 p-4 rounded-2xl">
                    <div>
                      <p className="font-semibold text-main">Customer</p>
                      <p>{ord.customer.name}</p>
                      <p>{ord.customer.email}</p>
                      <p className="text-olive font-medium">{ord.customer.phone}</p>
                    </div>

                    <div>
                      <p className="font-semibold text-main">Delivery Address</p>
                      <p>{ord.shippingAddress.street}</p>
                      {ord.shippingAddress.apartment && <p>{ord.shippingAddress.apartment}</p>}
                      <p>
                        {ord.shippingAddress.city}, {ord.shippingAddress.state} - {ord.shippingAddress.postalCode}
                      </p>
                    </div>

                    <div>
                      <p className="font-semibold text-main">Courier Tracking</p>
                      <input
                        type="text"
                        defaultValue={ord.trackingNumber || ''}
                        placeholder="e.g. DTDC-928174"
                        onBlur={(e) => handleUpdateTracking(ord.id, e.target.value)}
                        className="w-full bg-white border border-border-warm rounded-lg px-2.5 py-1 text-xs mt-1"
                      />
                    </div>
                  </div>

                  {/* Gift Card Message if any */}
                  {ord.giftMessage && (
                    <div className="p-3 bg-blush-light rounded-xl border border-blush text-olive text-xs italic">
                      💌 Handwritten Gift Card: &ldquo;{ord.giftMessage}&rdquo;
                    </div>
                  )}

                  {/* Items */}
                  <div className="divide-y divide-border-warm pt-1">
                    {ord.items.map((it, idx) => (
                      <div key={idx} className="py-2 flex items-center justify-between text-xs">
                        <div className="flex items-center gap-2.5">
                          <div className="relative w-10 h-12 rounded bg-cream border border-border-warm overflow-hidden">
                            <Image src={it.image} alt={it.title} fill className="object-cover" />
                          </div>
                          <div>
                            <span className="font-semibold text-main">{it.title}</span>
                            <span className="text-muted ml-2">({it.selectedColor} • Qty: {it.quantity})</span>
                          </div>
                        </div>
                        <span className="font-bold text-main">₹{it.price * it.quantity}</span>
                      </div>
                    ))}
                  </div>

                  <div className="flex justify-between items-center text-xs pt-2 border-t border-border-warm font-semibold">
                    <span>Payment: <strong className="uppercase">{ord.paymentMethod}</strong> ({ord.paymentStatus})</span>
                    <span className="text-sm font-bold text-main">Total: ₹{ord.total}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 4. CUSTOM REQUESTS TAB */}
        {activeTab === 'custom' && (
          <div className="space-y-6">
            <div>
              <h2 className="font-editorial text-2xl font-semibold text-main">Bespoke Bouquet Inquiries</h2>
              <p className="text-xs text-muted">Customer submissions from the &ldquo;Dream It. We&apos;ll Bloom It.&rdquo; interactive builder.</p>
            </div>

            <div className="space-y-4">
              {requests.map((req) => (
                <div key={req.id} className="bg-white rounded-3xl border border-border-warm p-6 shadow-2xs space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-border-warm gap-2">
                    <div>
                      <span className="font-bold text-main text-sm">#{req.id} • {req.customerName}</span>
                      <span className="text-xs text-muted ml-2">{new Date(req.createdAt).toLocaleDateString()}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <a
                        href={`https://wa.me/${req.contact.replace(/\D/g, '')}?text=Hi%20${encodeURIComponent(req.customerName)},%20thank%20you%20for%20your%20custom%20bouquet%20request%20with%20Bloomieee.co!`}
                        target="_blank"
                        rel="noreferrer"
                        className="bg-green-600 hover:bg-green-700 text-white text-xs px-3 py-1.5 rounded-xl font-medium flex items-center gap-1 shadow-2xs"
                      >
                        <MessageCircle className="w-3.5 h-3.5" />
                        <span>Chat on WhatsApp</span>
                      </a>

                      <select
                        value={req.status}
                        onChange={(e) => handleUpdateRequestStatus(req.id, e.target.value)}
                        className="bg-cream-light border border-border-warm rounded-xl px-3 py-1.5 text-xs text-main font-semibold capitalize"
                      >
                        <option value="new">New</option>
                        <option value="contacted">Contacted</option>
                        <option value="crafting">Crafting</option>
                        <option value="completed">Completed</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs bg-cream-light p-3.5 rounded-2xl">
                    <div>
                      <span className="text-muted text-[10px]">Flower Types:</span>
                      <p className="font-semibold text-main">{req.flowerTypes.join(', ')}</p>
                    </div>
                    <div>
                      <span className="text-muted text-[10px]">Desired Colors:</span>
                      <p className="font-semibold text-main">{req.preferredColors}</p>
                    </div>
                    <div>
                      <span className="text-muted text-[10px]">Bouquet Size &amp; Budget:</span>
                      <p className="font-semibold text-main">{req.bouquetSize} ({req.budgetRange})</p>
                    </div>
                    <div>
                      <span className="text-muted text-[10px]">Occasion:</span>
                      <p className="font-semibold text-main">{req.occasion}</p>
                    </div>
                  </div>

                  {req.notes && (
                    <div className="text-xs text-muted bg-white p-3 rounded-xl border border-border-warm">
                      <strong>Customer Notes:</strong> {req.notes}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 5. NEWSLETTER SUBSCRIBERS */}
        {activeTab === 'newsletter' && (
          <div className="space-y-6">
            <div>
              <h2 className="font-editorial text-2xl font-semibold text-main">Letters &amp; Little Blooms Audience</h2>
              <p className="text-xs text-muted">Subscribers who opted in to receive studio updates.</p>
            </div>

            <div className="bg-white rounded-3xl border border-border-warm p-6 shadow-2xs">
              <div className="divide-y divide-border-warm">
                {subscribers.map((sub) => (
                  <div key={sub.id} className="py-3 flex items-center justify-between text-xs">
                    <span className="font-semibold text-main">{sub.email}</span>
                    <span className="text-muted">Subscribed on {new Date(sub.subscribedAt).toLocaleDateString()}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* 6. SETTINGS TAB */}
        {activeTab === 'settings' && settings && (
          <div className="max-w-2xl bg-white rounded-3xl border border-border-warm p-8 shadow-2xs space-y-6">
            <h2 className="font-editorial text-2xl font-semibold text-main">Storefront Configuration</h2>

            <form onSubmit={handleSaveSettings} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-main mb-1.5">
                  Announcement Bar Banner Text
                </label>
                <input
                  type="text"
                  value={settings.announcementText}
                  onChange={(e) => setSettings({ ...settings, announcementText: e.target.value })}
                  className="w-full bg-cream-light border border-border-warm rounded-xl px-4 py-2.5 text-xs text-main"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-main mb-1.5">
                    Free Shipping Threshold (₹)
                  </label>
                  <input
                    type="number"
                    value={settings.freeShippingThreshold}
                    onChange={(e) => setSettings({ ...settings, freeShippingThreshold: Number(e.target.value) })}
                    className="w-full bg-cream-light border border-border-warm rounded-xl px-4 py-2.5 text-xs text-main"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-main mb-1.5">
                    Standard Courier Fee (₹)
                  </label>
                  <input
                    type="number"
                    value={settings.standardShippingFee}
                    onChange={(e) => setSettings({ ...settings, standardShippingFee: Number(e.target.value) })}
                    className="w-full bg-cream-light border border-border-warm rounded-xl px-4 py-2.5 text-xs text-main"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-main mb-1.5">
                  Instagram Profile URL
                </label>
                <input
                  type="text"
                  value={settings.instagramUrl}
                  onChange={(e) => setSettings({ ...settings, instagramUrl: e.target.value })}
                  className="w-full bg-cream-light border border-border-warm rounded-xl px-4 py-2.5 text-xs text-main"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-main mb-1.5">
                  WhatsApp Support Number
                </label>
                <input
                  type="text"
                  value={settings.whatsappNumber}
                  onChange={(e) => setSettings({ ...settings, whatsappNumber: e.target.value })}
                  className="w-full bg-cream-light border border-border-warm rounded-xl px-4 py-2.5 text-xs text-main"
                />
              </div>

              <button
                type="submit"
                className="bg-olive hover:bg-olive-dark text-ivory text-xs font-semibold uppercase tracking-wider px-6 py-3 rounded-full flex items-center gap-2 shadow-xs"
              >
                <Save className="w-4 h-4" />
                <span>Save Storefront Settings</span>
              </button>
            </form>
          </div>
        )}
      </div>

      {/* Add New Product Modal */}
      {isNewProductOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 space-y-4 shadow-2xl max-h-[90vh] overflow-y-auto">
            <h3 className="font-editorial text-2xl font-semibold text-main">Add New Handcrafted Bouquet</h3>

            <form onSubmit={handleCreateProduct} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-main mb-1">Bouquet Name</label>
                <input
                  type="text"
                  required
                  value={newProd.title}
                  onChange={(e) => setNewProd({ ...newProd, title: e.target.value })}
                  placeholder="e.g. Cobalt Velvet Bloom"
                  className="w-full bg-cream-light border border-border-warm rounded-xl p-2.5 text-xs"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-main mb-1">Category</label>
                  <select
                    value={newProd.category}
                    onChange={(e) => setNewProd({ ...newProd, category: e.target.value })}
                    className="w-full bg-cream-light border border-border-warm rounded-xl p-2.5 text-xs"
                  >
                    <option value="Tulip Bouquets">Tulip Bouquets</option>
                    <option value="Rose Bouquets">Rose Bouquets</option>
                    <option value="Lily Bouquets">Lily Bouquets</option>
                    <option value="Mini Flower Gifts">Mini Flower Gifts</option>
                    <option value="Custom Bouquets">Custom Bouquets</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-main mb-1">Price (₹)</label>
                  <input
                    type="number"
                    required
                    value={newProd.price}
                    onChange={(e) => setNewProd({ ...newProd, price: Number(e.target.value) })}
                    className="w-full bg-cream-light border border-border-warm rounded-xl p-2.5 text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-main mb-1">Flower Types (comma separated)</label>
                <input
                  type="text"
                  value={newProd.flowerTypes}
                  onChange={(e) => setNewProd({ ...newProd, flowerTypes: e.target.value })}
                  className="w-full bg-cream-light border border-border-warm rounded-xl p-2.5 text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-main mb-1">Available Colors</label>
                <input
                  type="text"
                  value={newProd.colors}
                  onChange={(e) => setNewProd({ ...newProd, colors: e.target.value })}
                  className="w-full bg-cream-light border border-border-warm rounded-xl p-2.5 text-xs"
                />
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsNewProductOpen(false)}
                  className="flex-1 bg-cream py-2.5 rounded-full text-xs font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-olive text-ivory py-2.5 rounded-full text-xs font-semibold"
                >
                  Create Listing
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Product Modal */}
      {editingProduct && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 space-y-4 shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between">
              <h3 className="font-editorial text-2xl font-semibold text-main">Edit Bouquet</h3>
              <button
                onClick={() => setEditingProduct(null)}
                className="text-muted hover:text-main p-1"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>

            <form onSubmit={handleEditProduct} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-main mb-1">Bouquet Name</label>
                <input
                  type="text"
                  required
                  value={editProd.title}
                  onChange={(e) => setEditProd({ ...editProd, title: e.target.value })}
                  className="w-full bg-cream-light border border-border-warm rounded-xl p-2.5 text-xs"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-main mb-1">Category</label>
                  <select
                    value={editProd.category}
                    onChange={(e) => setEditProd({ ...editProd, category: e.target.value })}
                    className="w-full bg-cream-light border border-border-warm rounded-xl p-2.5 text-xs"
                  >
                    <option value="Tulip Bouquets">Tulip Bouquets</option>
                    <option value="Rose Bouquets">Rose Bouquets</option>
                    <option value="Lily Bouquets">Lily Bouquets</option>
                    <option value="Mini Flower Gifts">Mini Flower Gifts</option>
                    <option value="Custom Bouquets">Custom Bouquets</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-main mb-1">Price (₹)</label>
                  <input
                    type="number"
                    required
                    value={editProd.price}
                    onChange={(e) => setEditProd({ ...editProd, price: Number(e.target.value) })}
                    className="w-full bg-cream-light border border-border-warm rounded-xl p-2.5 text-xs"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-main mb-1">Original Price (₹)</label>
                  <input
                    type="number"
                    value={editProd.originalPrice}
                    onChange={(e) => setEditProd({ ...editProd, originalPrice: Number(e.target.value) })}
                    className="w-full bg-cream-light border border-border-warm rounded-xl p-2.5 text-xs"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-main mb-1">Stock Qty</label>
                  <input
                    type="number"
                    value={editProd.inStock}
                    onChange={(e) => setEditProd({ ...editProd, inStock: Number(e.target.value) })}
                    className="w-full bg-cream-light border border-border-warm rounded-xl p-2.5 text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-main mb-1">Flower Types (comma separated)</label>
                <input
                  type="text"
                  value={editProd.flowerTypes}
                  onChange={(e) => setEditProd({ ...editProd, flowerTypes: e.target.value })}
                  className="w-full bg-cream-light border border-border-warm rounded-xl p-2.5 text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-main mb-1">Available Colors (comma separated)</label>
                <input
                  type="text"
                  value={editProd.colors}
                  onChange={(e) => setEditProd({ ...editProd, colors: e.target.value })}
                  className="w-full bg-cream-light border border-border-warm rounded-xl p-2.5 text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-main mb-1">Description</label>
                <textarea
                  rows={3}
                  value={editProd.description}
                  onChange={(e) => setEditProd({ ...editProd, description: e.target.value })}
                  className="w-full bg-cream-light border border-border-warm rounded-xl p-2.5 text-xs resize-none"
                />
              </div>

              {/* Product Images */}
              <div>
                <label className="block text-xs font-semibold text-main mb-1">
                  Product Images
                  <span className="font-normal text-muted ml-1">(one URL per line)</span>
                </label>
                <textarea
                  rows={3}
                  value={editProd.images}
                  onChange={(e) => setEditProd({ ...editProd, images: e.target.value })}
                  placeholder={`/images/products/my-bouquet.jpg\n/images/products/my-bouquet-2.jpg`}
                  className="w-full bg-cream-light border border-border-warm rounded-xl p-2.5 text-xs font-mono resize-none"
                />
                {/* Live preview grid */}
                {editProd.images.split('\n').filter(s => s.trim()).length > 0 && (
                  <div className="mt-2 flex gap-2 flex-wrap">
                    {editProd.images
                      .split('\n')
                      .map(s => s.trim())
                      .filter(Boolean)
                      .map((url, i) => (
                        <div
                          key={i}
                          className="relative w-16 h-20 rounded-lg overflow-hidden border-2 border-border-warm bg-cream shadow-xs shrink-0"
                        >
                          <Image
                            src={url}
                            alt={`Preview ${i + 1}`}
                            fill
                            className="object-cover"
                            onError={(e) => {
                              (e.target as HTMLImageElement).style.opacity = '0.2';
                            }}
                          />
                          <span className="absolute bottom-0.5 right-0.5 bg-black/50 text-white text-[9px] px-1 rounded">
                            {i + 1}
                          </span>
                        </div>
                      ))}
                  </div>
                )}
              </div>


              <div className="flex items-center gap-4 text-xs">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={editProd.isFeatured}
                    onChange={(e) => setEditProd({ ...editProd, isFeatured: e.target.checked })}
                    className="accent-olive"
                  />
                  <span className="font-medium text-main">Featured</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={editProd.isBestseller}
                    onChange={(e) => setEditProd({ ...editProd, isBestseller: e.target.checked })}
                    className="accent-olive"
                  />
                  <span className="font-medium text-main">Bestseller</span>
                </label>
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setEditingProduct(null)}
                  className="flex-1 bg-cream py-2.5 rounded-full text-xs font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-olive text-ivory py-2.5 rounded-full text-xs font-semibold flex items-center justify-center gap-1.5"
                >
                  <Save className="w-3.5 h-3.5" />
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
