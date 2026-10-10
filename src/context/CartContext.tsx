'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product } from '@/lib/db';

export interface CartItem {
  id: string; // unique item key: prodId + color + wrap
  productId: string;
  title: string;
  slug: string;
  price: number;
  originalPrice?: number;
  quantity: number;
  image: string;
  selectedColor?: string;
  selectedWrap?: string;
  giftMessage?: string;
}

interface CartContextType {
  items: CartItem[];
  addItem: (
    product: Product,
    options?: {
      color?: string;
      wrap?: string;
      giftMessage?: string;
      quantity?: number;
    }
  ) => void;
  removeItem: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  isCartOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  subtotal: number;
  itemCount: number;
  couponCode: string;
  discount: number;
  applyCoupon: (code: string) => { success: boolean; message: string };
  removeCoupon: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [couponCode, setCouponCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem('bloomieee_cart');
      if (savedCart) {
        setItems(JSON.parse(savedCart));
      }
      const savedCoupon = localStorage.getItem('bloomieee_coupon');
      if (savedCoupon) {
        setCouponCode(savedCoupon);
      }
    } catch (e) {
      console.error('Error loading cart from storage', e);
    }
    setIsLoaded(true);
  }, []);

  // Save to localStorage
  useEffect(() => {
    if (isLoaded) {
      try {
        localStorage.setItem('bloomieee_cart', JSON.stringify(items));
      } catch (e) {
        console.error('Error saving cart to storage', e);
      }
    }
  }, [items, isLoaded]);

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  // Recalculate discount whenever subtotal or coupon changes
  useEffect(() => {
    if (!couponCode) {
      setDiscount(0);
      return;
    }
    if (couponCode.toUpperCase() === 'BLOOM10') {
      setDiscount(Math.round(subtotal * 0.1));
    } else if (couponCode.toUpperCase() === 'FIRSTBLOOM') {
      setDiscount(Math.min(subtotal, 150));
    } else {
      setDiscount(0);
    }
  }, [couponCode, subtotal]);

  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  const addItem = (
    product: Product,
    options?: {
      color?: string;
      wrap?: string;
      giftMessage?: string;
      quantity?: number;
    }
  ) => {
    const qty = options?.quantity || 1;
    const color = options?.color || product.colors[0] || 'Default';
    const wrap = options?.wrap || product.wrapOptions?.[0] || 'Standard';
    const giftMessage = options?.giftMessage || '';
    const uniqueKey = `${product.id}-${color}-${wrap}`;

    setItems((prev) => {
      const existingIndex = prev.findIndex((i) => i.id === uniqueKey);
      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += qty;
        return updated;
      } else {
        return [
          ...prev,
          {
            id: uniqueKey,
            productId: product.id,
            title: product.title,
            slug: product.slug,
            price: product.price,
            originalPrice: product.originalPrice,
            quantity: qty,
            image: product.images[0] || '/images/products/lavender-romance-bouquet.jpg',
            selectedColor: color,
            selectedWrap: wrap,
            giftMessage,
          },
        ];
      }
    });

    setIsCartOpen(true);
  };

  const removeItem = (itemId: string) => {
    setItems((prev) => prev.filter((i) => i.id !== itemId));
  };

  const updateQuantity = (itemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(itemId);
      return;
    }
    setItems((prev) =>
      prev.map((item) => (item.id === itemId ? { ...item, quantity } : item))
    );
  };

  const clearCart = () => {
    setItems([]);
    setCouponCode('');
    setDiscount(0);
    try {
      localStorage.removeItem('bloomieee_cart');
      localStorage.removeItem('bloomieee_coupon');
    } catch (e) {
      console.error(e);
    }
  };

  const applyCoupon = (code: string) => {
    const formatted = code.trim().toUpperCase();
    if (formatted === 'BLOOM10') {
      setCouponCode('BLOOM10');
      try {
        localStorage.setItem('bloomieee_coupon', 'BLOOM10');
      } catch (e) {}
      return { success: true, message: 'Code BLOOM10 applied! 10% discount added.' };
    } else if (formatted === 'FIRSTBLOOM') {
      setCouponCode('FIRSTBLOOM');
      try {
        localStorage.setItem('bloomieee_coupon', 'FIRSTBLOOM');
      } catch (e) {}
      return { success: true, message: 'Welcome code FIRSTBLOOM applied! ₹150 off added.' };
    } else {
      return { success: false, message: 'Invalid coupon code. Try BLOOM10 or FIRSTBLOOM.' };
    }
  };

  const removeCoupon = () => {
    setCouponCode('');
    setDiscount(0);
    try {
      localStorage.removeItem('bloomieee_coupon');
    } catch (e) {}
  };

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        isCartOpen,
        openCart: () => setIsCartOpen(true),
        closeCart: () => setIsCartOpen(false),
        subtotal,
        itemCount,
        couponCode,
        discount,
        applyCoupon,
        removeCoupon,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
