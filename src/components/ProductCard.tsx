'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Heart, Plus, Sparkles, Check } from 'lucide-react';
import { Product } from '@/lib/db';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const [justAdded, setJustAdded] = React.useState(false);

  const isFavorited = isInWishlist(product.id);
  const discountPercent = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1500);
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product.id);
  };

  return (
    <div className="group relative flex flex-col bg-white/80 rounded-2xl border border-border-warm/80 overflow-hidden shadow-2xs hover:shadow-xl hover:border-sage/40 transition-all duration-300">
      {/* Image container */}
      <Link
        href={`/product/${product.slug}`}
        className="relative aspect-4/5 w-full overflow-hidden bg-cream-light block"
      >
        <Image
          src={product.images[0] || '/images/products/lavender-romance-bouquet.jpg'}
          alt={product.title}
          fill
          className="object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
        />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
          {product.isBestseller && (
            <span className="bg-sage text-ivory text-[10px] font-semibold uppercase tracking-wider px-2.5 py-0.5 rounded-full shadow-xs flex items-center gap-1">
              <Sparkles className="w-2.5 h-2.5 text-blush" />
              Bestseller
            </span>
          )}
          {discountPercent > 0 && (
            <span className="bg-blush text-olive text-[10px] font-bold px-2 py-0.5 rounded-full shadow-xs">
              Save {discountPercent}%
            </span>
          )}
          {product.inStock <= 3 && product.inStock > 0 && (
            <span className="bg-amber-100 text-amber-800 text-[10px] font-medium px-2 py-0.5 rounded-full">
              Only {product.inStock} left
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          onClick={handleWishlist}
          className={`absolute top-3 right-3 p-2 rounded-full transition-all duration-200 z-10 ${
            isFavorited
              ? 'bg-blush text-olive shadow-xs scale-105'
              : 'bg-white/80 text-muted hover:text-main hover:bg-white shadow-xs'
          }`}
          aria-label="Save to Wishlist"
        >
          <Heart className={`w-4 h-4 ${isFavorited ? 'fill-current' : ''}`} />
        </button>

        {/* Quick Add Overlay on hover */}
        <div className="absolute bottom-3 inset-x-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10">
          <button
            onClick={handleQuickAdd}
            disabled={product.inStock === 0}
            className={`w-full py-2.5 rounded-xl text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all shadow-md ${
              justAdded
                ? 'bg-sage text-ivory'
                : 'bg-white/95 hover:bg-olive hover:text-ivory text-main'
            }`}
          >
            {justAdded ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span>Added to Bag</span>
              </>
            ) : product.inStock === 0 ? (
              <span>Sold Out</span>
            ) : (
              <>
                <Plus className="w-3.5 h-3.5" />
                <span>Quick Add</span>
              </>
            )}
          </button>
        </div>
      </Link>

      {/* Product Information */}
      <div className="p-4 flex flex-col flex-1 justify-between bg-white/60">
        <div>
          <div className="flex items-center justify-between text-[11px] text-sage font-medium uppercase tracking-wider mb-1">
            <span>{product.category}</span>
            <span className="text-muted/70 text-[10px]">Handmade</span>
          </div>

          <Link href={`/product/${product.slug}`}>
            <h3 className="font-editorial text-base sm:text-lg font-semibold text-main line-clamp-1 group-hover:text-olive transition-colors">
              {product.title}
            </h3>
          </Link>

          <p className="text-xs text-muted/80 line-clamp-1 mt-0.5">
            {product.flowerTypes.join(' • ')}
          </p>
        </div>

        {/* Price & Rating */}
        <div className="mt-3 pt-2.5 border-t border-border-warm/50 flex items-center justify-between">
          <div className="flex items-baseline gap-2">
            <span className="text-base font-bold text-main">₹{product.price}</span>
            {product.originalPrice && (
              <span className="text-xs text-muted line-through">₹{product.originalPrice}</span>
            )}
          </div>

          <div className="flex items-center text-[11px] text-sage-dark font-medium">
            <span>★ {product.rating}</span>
            <span className="text-muted/60 text-[10px] ml-1">({product.reviewCount})</span>
          </div>
        </div>
      </div>
    </div>
  );
}
