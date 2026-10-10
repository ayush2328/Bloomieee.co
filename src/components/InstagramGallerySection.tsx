'use client';

import React from 'react';
import Image from 'next/image';
import { ExternalLink, Heart } from 'lucide-react';
import InstagramIcon from './InstagramIcon';

export default function InstagramGallerySection() {
  const feedItems = [
    {
      image: '/images/products/royal-blue-velvet-tulips.jpg',
      caption: 'Royal blue tulips with handcrafted lily centerpiece 💙 #bloomieee #pipecleanerflowers',
      likes: '142',
    },
    {
      image: '/images/products/lavender-buttercream-roses.jpg',
      caption: 'Pastel purple roses with our signature handmade wire heart stem 💜 #floralart #everlasting',
      likes: '198',
    },
    {
      image: '/images/products/sunlit-sunflower-daisy.jpg',
      caption: 'A touch of sunshine that will never fade 🌻 #sunflowerbouquet #giftideas',
      likes: '230',
    },
    {
      image: '/images/products/scarlet-rose-keepsake.jpg',
      caption: 'Single scarlet red rose in aesthetic clear carrier sleeve 🌹 #singleflower #minimalist',
      likes: '175',
    },
    {
      image: '/images/products/burgundy-bloom-scalloped.jpg',
      caption: 'Moody burgundy tulips in scalloped Korean wrap ✨ #pipecleanercraft #aestheticflowers',
      likes: '164',
    },
    {
      image: '/images/products/roseate-star-lily.jpg',
      caption: 'Roseate star pink lily with pearl stamen accents 🌸 #lilylove #handmadewithlove',
      likes: '210',
    },
    {
      image: '/images/products/sunset-blush-lilies.jpg',
      caption: 'Peach sunset tones in striped wrap paper 🌾 #goldenhour #bloomieeeco',
      likes: '189',
    },
    {
      image: '/images/products/lavender-romance-bouquet.jpg',
      caption: 'Lavender Romance in ruffled tulle editorial piece 🎀 #luxurybouquet #foreverflowers',
      likes: '312',
    },
  ];

  return (
    <section className="py-20 bg-cream/20 border-t border-border-warm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-12">
          <div className="flex items-center justify-center gap-2 text-xs uppercase tracking-widest text-sage font-semibold mb-2">
            <InstagramIcon className="w-4 h-4 text-olive" />
            <span>@bloomieee.co</span>
          </div>
          <h2 className="font-editorial text-3xl sm:text-4xl font-semibold text-main mb-3">
            A Little Bloom on Your Feed
          </h2>
          <p className="text-xs sm:text-sm text-muted">
            Behind-the-scenes crafting, new floral drops, and custom bouquet stories direct from our Instagram.
          </p>
        </div>

        {/* Instagram Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
          {feedItems.map((item, idx) => (
            <a
              key={idx}
              href="https://www.instagram.com/bloomieee.co/"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative aspect-square rounded-2xl overflow-hidden bg-cream border border-border-warm shadow-2xs hover:shadow-xl transition-all duration-300 block"
            >
              <Image
                src={item.image}
                alt={item.caption}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-500 ease-out"
                sizes="(max-width: 640px) 50vw, 25vw"
              />
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex flex-col justify-between p-4 text-ivory">
                <div className="flex justify-end">
                  <ExternalLink className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-[11px] line-clamp-2 leading-relaxed text-ivory/90 mb-2">
                    {item.caption}
                  </p>
                  <div className="flex items-center gap-1 text-[11px] font-medium text-blush">
                    <Heart className="w-3.5 h-3.5 fill-current" />
                    <span>{item.likes}</span>
                  </div>
                </div>
              </div>
            </a>
          ))}
        </div>

        {/* CTA to follow */}
        <div className="text-center mt-10">
          <a
            href="https://www.instagram.com/bloomieee.co/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 bg-white hover:bg-cream-light text-main border border-border-warm px-7 py-3 rounded-full text-xs font-semibold uppercase tracking-wider transition-all shadow-xs hover:border-sage"
          >
            <InstagramIcon className="w-4 h-4 text-olive" />
            <span>Follow Our Blooms @bloomieee.co</span>
          </a>
        </div>
      </div>
    </section>
  );
}
