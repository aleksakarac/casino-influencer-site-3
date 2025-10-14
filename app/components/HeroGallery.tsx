'use client';

import { useState, useEffect } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
import { client, urlFor } from '@/app/lib/sanity';
import type { SanityImageSource } from '@sanity/image-url/lib/types/types';

// Placeholder images - will be used if Sanity images are not available
const PLACEHOLDER_IMAGES = [
  'https://images.unsplash.com/photo-1596838132731-3301c3fd4317?w=1920&h=800&fit=crop',
  'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=1920&h=800&fit=crop',
  'https://images.unsplash.com/photo-1579547945478-a6681fb3c3c9?w=1920&h=800&fit=crop',
];

export default function HeroGallery() {
  const t = useTranslations('Hero');
  const locale = useLocale() as 'en' | 'sr';
  const [currentIndex, setCurrentIndex] = useState(0);
  const [images, setImages] = useState<string[]>(PLACEHOLDER_IMAGES);
  const [autoPlaySpeed, setAutoPlaySpeed] = useState(5000);

  useEffect(() => {
    const fetchGalleryImages = async () => {
      try {
        const gallery = await client.fetch(
          `*[_type == "gallerySettings"][0]{ images, autoPlaySpeed }`
        );

        if (gallery?.images && gallery.images.length > 0) {
          const imageUrls = gallery.images.map((img: { image: SanityImageSource }) =>
            urlFor(img.image).width(1920).height(800).url()
          );
          setImages(imageUrls);
        }

        if (gallery?.autoPlaySpeed) {
          setAutoPlaySpeed(gallery.autoPlaySpeed * 1000); // Convert to milliseconds
        }
      } catch (error) {
        console.error('Error fetching gallery images:', error);
      }
    };

    fetchGalleryImages();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, autoPlaySpeed);

    return () => clearInterval(interval);
  }, [images.length, autoPlaySpeed]);

  return (
    <section className="relative w-full h-64 overflow-hidden bg-black">
      {/* Image Carousel */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className="absolute inset-0"
        >
          <div
            className="w-full h-full bg-cover bg-center"
            style={{ backgroundImage: `url(${images[currentIndex]})` }}
          ></div>
        </motion.div>
      </AnimatePresence>


      {/* Navigation Indicators */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-3 z-20">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentIndex
                ? 'bg-[var(--primary-orange)] shadow-[0_0_10px_rgba(251,191,36,0.6)]'
                : 'bg-white/30 hover:bg-white/50'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Decorative Border */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[var(--primary-orange)] to-transparent opacity-60"></div>
    </section>
  );
}
