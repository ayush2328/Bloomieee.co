import React from 'react';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import FeaturedCategories from '@/components/FeaturedCategories';
import BestsellersSection from '@/components/BestsellersSection';
import BrandStorySection from '@/components/BrandStorySection';
import GiftByOccasionSection from '@/components/GiftByOccasionSection';
import CustomBouquetSection from '@/components/CustomBouquetSection';
import InstagramGallerySection from '@/components/InstagramGallerySection';
import TestimonialsSection from '@/components/TestimonialsSection';
import NewsletterSection from '@/components/NewsletterSection';
import Footer from '@/components/Footer';
import { getDatabase } from '@/lib/db';

export default function HomePage() {
  const db = getDatabase();
  const products = db.products.filter((p) => !p.isArchived);

  return (
    <div className="min-h-screen flex flex-col bg-ivory">
      <Navbar />
      <main className="flex-1">
        <HeroSection />
        <FeaturedCategories />
        <BestsellersSection initialProducts={products} />
        <BrandStorySection />
        <GiftByOccasionSection />
        <CustomBouquetSection />
        <InstagramGallerySection />
        <TestimonialsSection />
        <NewsletterSection />
      </main>
      <Footer />
    </div>
  );
}
