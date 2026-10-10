'use client';

import React, { useState, useEffect, useMemo, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
import { Product } from '@/lib/db';
import { Filter, SlidersHorizontal, Search, RotateCcw, Heart, Sparkles, X } from 'lucide-react';
import { useWishlist } from '@/context/WishlistContext';

function ShopContent() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get('category') || 'All';
  const initialSearch = searchParams.get('search') || '';
  const initialOccasion = searchParams.get('occasion') || '';
  const initialWishlistOnly = searchParams.get('wishlist') === 'true';

  const { wishlist } = useWishlist();

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  // Filter states
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);
  const [searchQuery, setSearchQuery] = useState<string>(initialSearch);
  const [selectedOccasion, setSelectedOccasion] = useState<string>(initialOccasion);
  const [selectedFlower, setSelectedFlower] = useState<string>('All');
  const [selectedColor, setSelectedColor] = useState<string>('All');
  const [priceRange, setPriceRange] = useState<number>(3000);
  const [inStockOnly, setInStockOnly] = useState<boolean>(false);
  const [wishlistOnly, setWishlistOnly] = useState<boolean>(initialWishlistOnly);
  const [sortBy, setSortBy] = useState<string>('featured');
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Sync with URL params on navigation
  useEffect(() => {
    if (searchParams.get('category')) {
      setSelectedCategory(searchParams.get('category') || 'All');
    }
    if (searchParams.get('search')) {
      setSearchQuery(searchParams.get('search') || '');
    }
    if (searchParams.get('occasion')) {
      setSelectedOccasion(searchParams.get('occasion') || '');
    }
    if (searchParams.get('wishlist') === 'true') {
      setWishlistOnly(true);
    }
  }, [searchParams]);

  useEffect(() => {
    fetch('/api/products')
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setProducts(data.products);
        }
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const categories = ['All', 'Tulip Bouquets', 'Rose Bouquets', 'Lily Bouquets', 'Mini Flower Gifts', 'Custom Bouquets'];
  const flowerTypes = ['All', 'Tulips', 'Roses', 'Lilies', 'Sunflowers', 'Daisies', 'Lavender'];
  const colorOptions = ['All', 'Blue', 'Lavender', 'Yellow', 'Red', 'Pink', 'Burgundy', 'Peach'];

  // Filtering & Sorting
  const filteredProducts = useMemo(() => {
    let result = [...products];

    if (wishlistOnly) {
      result = result.filter((p) => wishlist.includes(p.id));
    }

    if (selectedCategory !== 'All') {
      result = result.filter(
        (p) =>
          p.category.toLowerCase() === selectedCategory.toLowerCase() ||
          p.secondaryCategories?.some((c) => c.toLowerCase() === selectedCategory.toLowerCase())
      );
    }

    if (selectedOccasion) {
      result = result.filter((p) =>
        p.occasions.some((o) => o.toLowerCase() === selectedOccasion.toLowerCase())
      );
    }

    if (selectedFlower !== 'All') {
      result = result.filter((p) =>
        p.flowerTypes.some((f) => f.toLowerCase().includes(selectedFlower.toLowerCase()))
      );
    }

    if (selectedColor !== 'All') {
      result = result.filter((p) =>
        p.colors.some((c) => c.toLowerCase().includes(selectedColor.toLowerCase()))
      );
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.flowerTypes.some((f) => f.toLowerCase().includes(q)) ||
          p.category.toLowerCase().includes(q)
      );
    }

    result = result.filter((p) => p.price <= priceRange);

    if (inStockOnly) {
      result = result.filter((p) => p.inStock > 0);
    }

    // Sort
    if (sortBy === 'price-low') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-high') {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'rating') {
      result.sort((a, b) => b.rating - a.rating);
    } else if (sortBy === 'newest') {
      result.reverse();
    } else {
      // Featured
      result.sort((a, b) => {
        if (a.isFeatured && !b.isFeatured) return -1;
        if (!a.isFeatured && b.isFeatured) return 1;
        return (b.isBestseller ? 1 : 0) - (a.isBestseller ? 1 : 0);
      });
    }

    return result;
  }, [
    products,
    selectedCategory,
    selectedOccasion,
    selectedFlower,
    selectedColor,
    searchQuery,
    priceRange,
    inStockOnly,
    wishlistOnly,
    wishlist,
    sortBy,
  ]);

  const handleResetFilters = () => {
    setSelectedCategory('All');
    setSearchQuery('');
    setSelectedOccasion('');
    setSelectedFlower('All');
    setSelectedColor('All');
    setPriceRange(3000);
    setInStockOnly(false);
    setWishlistOnly(false);
    setSortBy('featured');
  };

  return (
    <div className="min-h-screen flex flex-col bg-ivory">
      <Navbar />

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-10">
        {/* Page Banner / Header */}
        <div className="border-b border-border-warm pb-8 mb-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <span className="text-xs uppercase tracking-widest text-sage font-semibold">
                Boutique Catalog
              </span>
              <h1 className="font-editorial text-3xl sm:text-4xl md:text-5xl font-semibold text-main mt-1">
                {wishlistOnly
                  ? 'Your Saved Wishlist'
                  : selectedCategory !== 'All'
                  ? selectedCategory
                  : 'All Everlasting Blooms'}
              </h1>
              <p className="text-xs sm:text-sm text-muted mt-2 max-w-lg">
                Discover 100% handcrafted pipe-cleaner flower arrangements, crafted with plush chenille velvet that stay radiant for a lifetime.
              </p>
            </div>

            {/* Quick stats and active filter count */}
            <div className="flex items-center gap-3">
              <span className="text-xs text-muted">
                Showing <strong className="text-main">{filteredProducts.length}</strong> items
              </span>
              <button
                onClick={() => setMobileFilterOpen(true)}
                className="lg:hidden flex items-center gap-1.5 bg-white border border-border-warm px-3.5 py-2 rounded-xl text-xs font-medium text-main shadow-2xs"
              >
                <SlidersHorizontal className="w-4 h-4 text-sage" />
                <span>Filters</span>
              </button>
            </div>
          </div>

          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pt-6 pb-2 no-scrollbar">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  setSelectedCategory(cat);
                  setWishlistOnly(false);
                }}
                className={`text-xs px-4 py-2 rounded-full whitespace-nowrap transition-all ${
                  selectedCategory === cat && !wishlistOnly
                    ? 'bg-olive text-ivory font-semibold shadow-xs'
                    : 'bg-white/80 hover:bg-cream text-main border border-border-warm'
                }`}
              >
                {cat}
              </button>
            ))}
            <button
              onClick={() => setWishlistOnly(!wishlistOnly)}
              className={`text-xs px-4 py-2 rounded-full whitespace-nowrap flex items-center gap-1.5 transition-all ${
                wishlistOnly
                  ? 'bg-blush text-olive font-semibold border border-blush shadow-xs'
                  : 'bg-white/80 hover:bg-cream text-main border border-border-warm'
              }`}
            >
              <Heart className={`w-3.5 h-3.5 ${wishlistOnly ? 'fill-current' : ''}`} />
              <span>Wishlist ({wishlist.length})</span>
            </button>
          </div>
        </div>

        {/* Layout: Sidebar + Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
          {/* Desktop Filter Sidebar */}
          <aside className="hidden lg:block bg-white/70 border border-border-warm rounded-2xl p-6 sticky top-28 space-y-6 shadow-2xs">
            <div className="flex items-center justify-between pb-3 border-b border-border-warm">
              <div className="flex items-center gap-2 text-sm font-semibold text-main">
                <Filter className="w-4 h-4 text-sage" />
                <span>Filter Blooms</span>
              </div>
              <button
                onClick={handleResetFilters}
                className="text-xs text-muted hover:text-olive flex items-center gap-1"
                title="Reset all filters"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset</span>
              </button>
            </div>

            {/* Live Search Input */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-main mb-2">
                Search
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Flower, color, style..."
                  className="w-full bg-cream-light border border-border-warm rounded-xl pl-9 pr-3 py-2 text-xs text-main focus:outline-hidden focus:border-sage"
                />
                <Search className="w-3.5 h-3.5 text-muted absolute left-3 top-2.5" />
              </div>
            </div>

            {/* Flower Type */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-main mb-2">
                Flower Type
              </label>
              <div className="flex flex-wrap gap-1.5">
                {flowerTypes.map((ft) => (
                  <button
                    key={ft}
                    onClick={() => setSelectedFlower(ft)}
                    className={`text-xs px-2.5 py-1 rounded-lg border transition-all ${
                      selectedFlower === ft
                        ? 'bg-sage text-ivory border-sage font-medium'
                        : 'bg-white text-muted border-border-warm hover:text-main'
                    }`}
                  >
                    {ft}
                  </button>
                ))}
              </div>
            </div>

            {/* Color Filter */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-main mb-2">
                Color Palette
              </label>
              <div className="flex flex-wrap gap-1.5">
                {colorOptions.map((c) => (
                  <button
                    key={c}
                    onClick={() => setSelectedColor(c)}
                    className={`text-xs px-2.5 py-1 rounded-lg border transition-all ${
                      selectedColor === c
                        ? 'bg-sage text-ivory border-sage font-medium'
                        : 'bg-white text-muted border-border-warm hover:text-main'
                    }`}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>

            {/* Max Price Slider */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-xs font-semibold uppercase tracking-wider text-main">
                  Max Price
                </label>
                <span className="text-xs font-bold text-olive">₹{priceRange}</span>
              </div>
              <input
                type="range"
                min="400"
                max="2500"
                step="50"
                value={priceRange}
                onChange={(e) => setPriceRange(Number(e.target.value))}
                className="w-full accent-olive cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-muted mt-1">
                <span>₹400</span>
                <span>₹2,500</span>
              </div>
            </div>

            {/* Stock Availability */}
            <div className="pt-2 border-t border-border-warm">
              <label className="flex items-center gap-2 cursor-pointer text-xs text-main">
                <input
                  type="checkbox"
                  checked={inStockOnly}
                  onChange={(e) => setInStockOnly(e.target.checked)}
                  className="rounded border-border-warm text-sage focus:ring-sage"
                />
                <span>In-Stock Only</span>
              </label>
            </div>
          </aside>

          {/* Products Grid & Sorting Header */}
          <div className="lg:col-span-3 space-y-6">
            {/* Sorting bar */}
            <div className="bg-white/80 border border-border-warm rounded-2xl px-4 py-3 flex flex-wrap items-center justify-between gap-3 shadow-2xs">
              <div className="flex items-center gap-2 text-xs text-muted">
                <span>Sorted by:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-cream-light border border-border-warm rounded-lg px-2.5 py-1.5 text-xs text-main font-medium focus:outline-hidden focus:border-sage"
                >
                  <option value="featured">Featured &amp; Bestsellers</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                  <option value="newest">Newest Arrivals</option>
                </select>
              </div>

              {selectedOccasion && (
                <div className="flex items-center gap-1.5 text-xs bg-sage-soft text-olive px-3 py-1 rounded-full">
                  <span>Occasion: <strong>{selectedOccasion}</strong></span>
                  <button onClick={() => setSelectedOccasion('')} className="p-0.5 hover:text-red-500">
                    <X className="w-3 h-3" />
                  </button>
                </div>
              )}
            </div>

            {/* Product Grid */}
            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div key={i} className="aspect-4/5 rounded-2xl bg-cream animate-pulse" />
                ))}
              </div>
            ) : filteredProducts.length === 0 ? (
              <div className="text-center py-20 px-4 bg-white/60 border border-border-warm rounded-3xl">
                <div className="w-14 h-14 rounded-full bg-cream mx-auto flex items-center justify-center text-sage mb-4">
                  <Sparkles className="w-7 h-7 stroke-1" />
                </div>
                <h3 className="font-editorial text-2xl font-semibold text-main mb-2">
                  No blooms match your criteria
                </h3>
                <p className="text-xs text-muted max-w-sm mx-auto mb-6">
                  Try adjusting your filters or search terms. You can also request a fully customized bouquet made to your exact preferences!
                </p>
                <div className="flex justify-center gap-3">
                  <button
                    onClick={handleResetFilters}
                    className="bg-cream hover:bg-border-warm text-main text-xs font-semibold px-5 py-2.5 rounded-full border border-border-warm transition-colors"
                  >
                    Clear All Filters
                  </button>
                  <a
                    href="/custom-bouquet"
                    className="bg-olive hover:bg-olive-dark text-ivory text-xs font-semibold px-5 py-2.5 rounded-full transition-colors"
                  >
                    Dream Custom Bouquet
                  </a>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />

      {/* Mobile Filters Modal */}
      {mobileFilterOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 lg:hidden flex justify-end">
          <div className="w-full max-w-xs bg-ivory h-full p-6 overflow-y-auto space-y-6 animate-in slide-in-from-right">
            <div className="flex items-center justify-between pb-4 border-b border-border-warm">
              <h3 className="font-editorial text-xl font-semibold text-main">Filter Blooms</h3>
              <button onClick={() => setMobileFilterOpen(false)} className="p-1">
                <X className="w-5 h-5 text-muted" />
              </button>
            </div>

            {/* Category Select */}
            <div>
              <label className="block text-xs font-semibold text-main mb-2">Category</label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full bg-cream-light border border-border-warm rounded-xl p-2.5 text-xs text-main"
              >
                {categories.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>

            {/* Price slider */}
            <div>
              <div className="flex justify-between text-xs font-semibold mb-2">
                <span>Max Price</span>
                <span className="text-olive">₹{priceRange}</span>
              </div>
              <input
                type="range"
                min="400"
                max="2500"
                step="50"
                value={priceRange}
                onChange={(e) => setPriceRange(Number(e.target.value))}
                className="w-full accent-olive"
              />
            </div>

            <div className="pt-4 border-t border-border-warm flex gap-2">
              <button
                onClick={handleResetFilters}
                className="flex-1 bg-cream py-2.5 rounded-xl text-xs font-semibold"
              >
                Reset
              </button>
              <button
                onClick={() => setMobileFilterOpen(false)}
                className="flex-1 bg-olive text-ivory py-2.5 rounded-xl text-xs font-semibold"
              >
                Apply
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function ShopPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-ivory flex items-center justify-center">Loading Bloomieee Boutique...</div>}>
      <ShopContent />
    </Suspense>
  );
}
