'use client';

import React, { useState, useEffect, use } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
import { Product } from '@/lib/db';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import {
  Heart,
  ShoppingBag,
  Sparkles,
  ShieldCheck,
  Truck,
  RotateCcw,
  Check,
  ChevronRight,
  Info,
  Gift,
} from 'lucide-react';

export default function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const router = useRouter();
  const resolvedParams = use(params);
  const slug = resolvedParams.slug;

  const { addItem, openCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();

  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  // User selections
  const [selectedImage, setSelectedImage] = useState<string>('');
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [selectedWrap, setSelectedWrap] = useState<string>('');
  const [giftMessage, setGiftMessage] = useState<string>('');
  const [quantity, setQuantity] = useState<number>(1);
  const [activeTab, setActiveTab] = useState<'details' | 'care' | 'packaging' | 'shipping'>('details');
  const [addedNotice, setAddedNotice] = useState(false);

  useEffect(() => {
    fetch(`/api/products/${slug}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.product) {
          setProduct(data.product);
          setSelectedImage(data.product.images[0] || '/images/products/lavender-romance-bouquet.jpg');
          setSelectedColor(data.product.colors[0] || '');
          setSelectedWrap(data.product.wrapOptions?.[0] || 'Standard Wrap');
        }
      })
      .catch(console.error)
      .finally(() => setLoading(false));

    // Fetch related products
    fetch('/api/products')
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          const others = data.products.filter((p: Product) => p.slug !== slug);
          setRelatedProducts(others.slice(0, 4));
        }
      })
      .catch(console.error);
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-ivory flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center space-y-3">
            <div className="w-10 h-10 border-3 border-sage border-t-transparent rounded-full animate-spin mx-auto" />
            <p className="text-xs text-muted font-medium">Loading bouquet details...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-ivory flex flex-col">
        <Navbar />
        <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
          <h2 className="font-editorial text-3xl font-semibold text-main mb-2">Bouquet Not Found</h2>
          <p className="text-xs text-muted max-w-sm mb-6">
            The flower arrangement you are looking for may have been archived or updated.
          </p>
          <Link
            href="/shop"
            className="bg-olive text-ivory text-xs font-semibold px-6 py-3 rounded-full"
          >
            Explore All Blooms
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const isFavorited = isInWishlist(product.id);
  const discountPercent = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  const handleAddToCart = () => {
    addItem(product, {
      color: selectedColor,
      wrap: selectedWrap,
      giftMessage,
      quantity,
    });
    setAddedNotice(true);
    setTimeout(() => setAddedNotice(false), 2000);
  };

  const handleBuyNow = () => {
    addItem(product, {
      color: selectedColor,
      wrap: selectedWrap,
      giftMessage,
      quantity,
    });
    router.push('/checkout');
  };

  return (
    <div className="min-h-screen flex flex-col bg-ivory">
      <Navbar />

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-2 text-xs text-muted mb-8">
          <Link href="/" className="hover:text-main">
            Home
          </Link>
          <ChevronRight className="w-3 h-3" />
          <Link href="/shop" className="hover:text-main">
            Shop All
          </Link>
          <ChevronRight className="w-3 h-3" />
          <Link href={`/shop?category=${encodeURIComponent(product.category)}`} className="hover:text-main">
            {product.category}
          </Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-main font-medium truncate max-w-xs">{product.title}</span>
        </nav>

        {/* Product Details Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-start">
          {/* Left Column: Image Gallery */}
          <div className="lg:col-span-7 space-y-4">
            {/* Main Hero Image */}
            <div className="relative aspect-4/5 w-full rounded-3xl overflow-hidden bg-cream-light border border-border-warm shadow-md group">
              <Image
                src={selectedImage}
                alt={product.title}
                fill
                priority
                className="object-cover object-center transition-transform duration-500 ease-out group-hover:scale-105"
                sizes="(max-width: 1024px) 100vw, 55vw"
              />

              {/* Floating badges */}
              <div className="absolute top-4 left-4 flex flex-col gap-2">
                {product.isBestseller && (
                  <span className="bg-sage text-ivory text-xs font-semibold px-3 py-1 rounded-full shadow-xs flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-blush" />
                    Bestseller
                  </span>
                )}
                {discountPercent > 0 && (
                  <span className="bg-blush text-olive text-xs font-bold px-2.5 py-1 rounded-full shadow-xs">
                    Save {discountPercent}%
                  </span>
                )}
              </div>

              {/* Wishlist Button */}
              <button
                onClick={() => toggleWishlist(product.id)}
                className={`absolute top-4 right-4 p-3 rounded-full transition-all duration-200 ${
                  isFavorited
                    ? 'bg-blush text-olive shadow-md scale-105'
                    : 'bg-white/80 text-muted hover:text-main hover:bg-white shadow-xs'
                }`}
                aria-label="Save to Wishlist"
              >
                <Heart className={`w-5 h-5 ${isFavorited ? 'fill-current' : ''}`} />
              </button>
            </div>

            {/* Thumbnail Selectors */}
            {product.images.length > 1 && (
              <div className="flex gap-3 overflow-x-auto pb-2">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(img)}
                    className={`relative w-20 h-24 rounded-xl overflow-hidden bg-cream border-2 transition-all shrink-0 ${
                      selectedImage === img
                        ? 'border-sage shadow-xs scale-102'
                        : 'border-border-warm opacity-70 hover:opacity-100'
                    }`}
                  >
                    <Image src={img} alt={`View angle ${idx + 1}`} fill className="object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right Column: Information & Actions */}
          <div className="lg:col-span-5 flex flex-col space-y-6">
            <div>
              <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-sage font-semibold mb-2">
                <span>{product.category}</span>
                <span>•</span>
                <span>Everlasting Pipe Cleaner Florals</span>
              </div>

              <h1 className="font-editorial text-3xl sm:text-4xl font-semibold text-main leading-tight">
                {product.title}
              </h1>

              {/* Price & Rating */}
              <div className="flex items-center justify-between mt-3 pb-4 border-b border-border-warm">
                <div className="flex items-baseline gap-3">
                  <span className="text-2xl sm:text-3xl font-bold text-main">₹{product.price}</span>
                  {product.originalPrice && (
                    <span className="text-base text-muted line-through">₹{product.originalPrice}</span>
                  )}
                  <span className="text-xs text-muted font-normal">(Inclusive of all taxes)</span>
                </div>

                <div className="flex items-center text-xs font-semibold text-sage-dark bg-sage-soft px-2.5 py-1 rounded-full">
                  <span>★ {product.rating}</span>
                  <span className="text-muted/70 ml-1">({product.reviewCount} reviews)</span>
                </div>
              </div>
            </div>

            {/* Stock indicator */}
            <div className="flex items-center gap-2 text-xs">
              {product.inStock > 0 ? (
                <div className="flex items-center gap-1.5 text-sage font-medium">
                  <span className="w-2 h-2 rounded-full bg-sage animate-pulse" />
                  <span>
                    In Stock ({product.inStock} bouquets available) • Handcrafted in {product.dispatchTime}
                  </span>
                </div>
              ) : (
                <div className="text-red-500 font-medium">Sold Out — Made to order upon request</div>
              )}
            </div>

            {/* 1. Color Variant Picker */}
            {product.colors.length > 0 && (
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-main mb-2">
                  Flower Color: <span className="font-medium text-muted normal-case">{selectedColor}</span>
                </label>
                <div className="flex flex-wrap gap-2">
                  {product.colors.map((color) => (
                    <button
                      key={color}
                      type="button"
                      onClick={() => setSelectedColor(color)}
                      className={`text-xs px-3.5 py-2 rounded-xl border transition-all ${
                        selectedColor === color
                          ? 'bg-olive text-ivory border-olive font-medium shadow-xs'
                          : 'bg-white text-main border-border-warm hover:border-sage'
                      }`}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* 2. Wrap Option Picker */}
            {product.wrapOptions && product.wrapOptions.length > 0 && (
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-main mb-2">
                  Wrapping Style: <span className="font-medium text-muted normal-case">{selectedWrap}</span>
                </label>
                <div className="flex flex-wrap gap-2">
                  {product.wrapOptions.map((wrap) => (
                    <button
                      key={wrap}
                      type="button"
                      onClick={() => setSelectedWrap(wrap)}
                      className={`text-xs px-3.5 py-2 rounded-xl border transition-all ${
                        selectedWrap === wrap
                          ? 'bg-sage text-ivory border-sage font-medium shadow-xs'
                          : 'bg-white text-main border-border-warm hover:border-sage'
                      }`}
                    >
                      {wrap}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* 3. Complimentary Gift Message Card */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-main mb-1.5 flex items-center gap-1.5">
                <Gift className="w-3.5 h-3.5 text-sage" />
                <span>Complimentary Handwritten Gift Card Note</span>
              </label>
              <textarea
                rows={2}
                value={giftMessage}
                onChange={(e) => setGiftMessage(e.target.value)}
                placeholder="Write a sweet message to the recipient (e.g. 'Happy Birthday Tanvi! Love forever ♡')..."
                className="w-full bg-cream-light border border-border-warm rounded-xl p-3 text-xs text-main focus:outline-hidden focus:border-sage resize-none"
              />
            </div>

            {/* 4. Quantity & Action Buttons */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center gap-3">
                {/* Quantity */}
                <div className="flex items-center border border-border-warm rounded-full bg-white px-3 py-2 shrink-0">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="text-xs text-muted hover:text-main px-2"
                  >
                    -
                  </button>
                  <span className="text-xs font-semibold px-3 text-main">{quantity}</span>
                  <button
                    onClick={() => setQuantity((q) => Math.min(product.inStock, q + 1))}
                    className="text-xs text-muted hover:text-main px-2"
                  >
                    +
                  </button>
                </div>

                {/* Add to Cart */}
                <button
                  onClick={handleAddToCart}
                  disabled={product.inStock === 0}
                  className="flex-1 bg-white hover:bg-cream-light text-main border-2 border-olive py-3.5 rounded-full text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-xs hover:shadow-md cursor-pointer disabled:opacity-50"
                >
                  {addedNotice ? (
                    <>
                      <Check className="w-4 h-4 text-sage" />
                      <span>Added to Bag!</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-4 h-4 text-olive" />
                      <span>Add to Flower Bag</span>
                    </>
                  )}
                </button>
              </div>

              {/* Buy Now Button */}
              <button
                onClick={handleBuyNow}
                disabled={product.inStock === 0}
                className="w-full bg-olive hover:bg-olive-dark text-ivory py-3.5 rounded-full text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-md hover:shadow-lg cursor-pointer disabled:opacity-50"
              >
                <span>Buy It Now • ₹{product.price * quantity}</span>
              </button>
            </div>

            {/* Quick Guarantees */}
            <div className="grid grid-cols-2 gap-3 pt-4 border-t border-border-warm text-xs text-muted">
              <div className="flex items-center gap-2">
                <Truck className="w-4 h-4 text-sage shrink-0" />
                <span>Free shipping above ₹999</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-sage shrink-0" />
                <span>Damage-free secure box</span>
              </div>
            </div>

            {/* Product Details Tabs */}
            <div className="pt-4 border-t border-border-warm">
              <div className="flex border-b border-border-warm text-xs font-medium">
                <button
                  onClick={() => setActiveTab('details')}
                  className={`pb-2.5 mr-6 transition-colors border-b-2 ${
                    activeTab === 'details'
                      ? 'border-olive text-olive font-semibold'
                      : 'border-transparent text-muted hover:text-main'
                  }`}
                >
                  Description
                </button>
                <button
                  onClick={() => setActiveTab('care')}
                  className={`pb-2.5 mr-6 transition-colors border-b-2 ${
                    activeTab === 'care'
                      ? 'border-olive text-olive font-semibold'
                      : 'border-transparent text-muted hover:text-main'
                  }`}
                >
                  Care Guide
                </button>
                <button
                  onClick={() => setActiveTab('packaging')}
                  className={`pb-2.5 mr-6 transition-colors border-b-2 ${
                    activeTab === 'packaging'
                      ? 'border-olive text-olive font-semibold'
                      : 'border-transparent text-muted hover:text-main'
                  }`}
                >
                  Gift Packaging
                </button>
                <button
                  onClick={() => setActiveTab('shipping')}
                  className={`pb-2.5 transition-colors border-b-2 ${
                    activeTab === 'shipping'
                      ? 'border-olive text-olive font-semibold'
                      : 'border-transparent text-muted hover:text-main'
                  }`}
                >
                  Shipping
                </button>
              </div>

              <div className="pt-4 text-xs sm:text-sm text-muted leading-relaxed">
                {activeTab === 'details' && (
                  <div className="space-y-3">
                    <p>{product.description}</p>
                    <p>
                      <strong>Included Flowers:</strong> {product.flowerTypes.join(', ')}
                    </p>
                    <p>
                      <strong>Perfect for:</strong> {product.occasions.join(', ')}
                    </p>
                  </div>
                )}
                {activeTab === 'care' && (
                  <div className="space-y-2">
                    <p>{product.careInstructions}</p>
                    <p className="text-[11px] text-sage font-medium">
                      💡 Tip: Chenille wire has a flexible interior core. If any stem or leaf shifts during transport, simply reshape it gently with your fingertips!
                    </p>
                  </div>
                )}
                {activeTab === 'packaging' && (
                  <div className="space-y-2">
                    <p>{product.packagingInfo}</p>
                    <p className="text-[11px] text-muted">
                      Arrives ready to gift right out of the box with zero assembly required.
                    </p>
                  </div>
                )}
                {activeTab === 'shipping' && (
                  <div className="space-y-2">
                    <p>
                      All bouquets are handcrafted to order in our studio. Dispatch time: {product.dispatchTime}.
                    </p>
                    <p>
                      Standard courier delivery takes 3-5 business days across India. Express courier options available at checkout.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-24 pt-12 border-t border-border-warm">
            <h3 className="font-editorial text-2xl sm:text-3xl font-semibold text-main mb-8">
              You May Also Love
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((rel) => (
                <ProductCard key={rel.id} product={rel} />
              ))}
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
