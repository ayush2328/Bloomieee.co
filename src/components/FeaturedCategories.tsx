'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';

export default function FeaturedCategories() {
  const categories = [
    {
      title: 'Tulip Bouquets',
      description: 'Plush velvet tulips in cobalt, burgundy, and pastel tones',
      image: '/images/products/royal-blue-velvet-tulips.jpg',
      link: '/shop?category=Tulip+Bouquets',
      count: '6 arrangements',
    },
    {
      title: 'Rose Bouquets',
      description: 'Everlasting sculpted roses, buttercream petals & heart stems',
      image: '/images/products/lavender-buttercream-roses.jpg',
      link: '/shop?category=Rose+Bouquets',
      count: '5 arrangements',
    },
    {
      title: 'Lily Bouquets',
      description: 'Graceful open star lilies with pearl stamens & textured wheat',
      image: '/images/products/roseate-star-lily.jpg',
      link: '/shop?category=Lily+Bouquets',
      count: '4 arrangements',
    },
    {
      title: 'Mini Flower Gifts',
      description: 'Single-stem aesthetic keepsakes in chic transparent totes',
      image: '/images/products/scarlet-rose-keepsake.jpg',
      link: '/shop?category=Mini+Flower+Gifts',
      count: 'Starting ₹599',
    },
    {
      title: 'Custom Bouquets',
      description: 'Craft your dream color palette and floral combination',
      image: '/images/brand/luxury-gift-box.jpg',
      link: '/custom-bouquet',
      count: 'Bespoke Order',
    },
  ];

  return (
    <section className="py-20 bg-ivory">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <span className="text-xs uppercase tracking-widest text-sage font-semibold">
              Curated Collections
            </span>
            <h2 className="font-editorial text-3xl sm:text-4xl font-semibold text-main mt-1">
              Handcrafted Flower Categories
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-muted max-w-md mt-2 md:mt-0">
            Each bloom is individually shaped using premium fuzzy chenille wire to create everlasting floral keepsakes that brighten any space.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {categories.map((cat) => (
            <Link
              key={cat.title}
              href={cat.link}
              className="group relative flex flex-col rounded-2xl overflow-hidden bg-white border border-border-warm shadow-2xs hover:shadow-xl hover:border-sage/40 transition-all duration-300"
            >
              <div className="relative aspect-4/5 w-full bg-cream overflow-hidden">
                <Image
                  src={cat.image}
                  alt={cat.title}
                  fill
                  className="object-cover group-hover:scale-108 transition-transform duration-500 ease-out"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/10 to-transparent" />
                <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/80 backdrop-blur-xs flex items-center justify-center text-main group-hover:bg-olive group-hover:text-ivory transition-colors">
                  <ArrowUpRight className="w-4 h-4" />
                </div>
                <div className="absolute bottom-3 left-3 right-3 text-ivory">
                  <span className="text-[10px] uppercase tracking-wider text-blush font-medium">
                    {cat.count}
                  </span>
                  <h3 className="font-editorial text-lg font-semibold leading-snug">
                    {cat.title}
                  </h3>
                </div>
              </div>
              <div className="p-3 text-[11px] text-muted line-clamp-2 bg-cream-light/50">
                {cat.description}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
