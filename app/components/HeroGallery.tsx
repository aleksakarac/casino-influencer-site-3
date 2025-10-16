'use client';

import { useState, useEffect } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
import { client, urlFor } from '@/app/lib/sanity';
import type { SanityImageSource } from '@sanity/image-url/lib/types/types';

// Placeholder images - will be used if Sanity images are not available
const PLACEHOLDER_IMAGES = {
  desktop: [
    'https://images.unsplash.com/photo-1596838132731-3301c3fd4317?w=1920&h=600&fit=crop',
    'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=1920&h=600&fit=crop',
    'https://images.unsplash.com/photo-1579547945478-a6681fb3c3c9?w=1920&h=600&fit=crop',
  ],
  mobile: [
    'https://images.unsplash.com/photo-1596838132731-3301c3fd4317?w=1920&h=800&fit=crop',
    'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=1920&h=800&fit=crop',
    'https://images.unsplash.com/photo-1579547945478-a6681fb3c3c9?w=1920&h=800&fit=crop',
  ],
};

interface GalleryImage {
  desktopUrl: string;
  mobileUrl: string;
}

export default function HeroGallery() {
  const t = useTranslations('Hero');
  const locale = useLocale() as 'en' | 'sr';
  const [currentIndex, setCurrentIndex] = useState(0);
  const [images, setImages] = useState<GalleryImage[]>(
    PLACEHOLDER_IMAGES.desktop.map((desktop, i) => ({
      desktopUrl: desktop,
      mobileUrl: PLACEHOLDER_IMAGES.mobile[i],
    }))
  );
  const [autoPlaySpeed, setAutoPlaySpeed] = useState(5000);

  useEffect(() => {
    const fetchGalleryImages = async () => {
      try {
        const gallery = await client.fetch(
          `*[_type == "gallerySettings"][0]{ images, autoPlaySpeed }`
        );

        if (gallery?.images && gallery.images.length > 0) {
          const imageData: GalleryImage[] = gallery.images.map((img: {
            desktopImage?: SanityImageSource;
            mobileImage?: SanityImageSource;
            image?: SanityImageSource;
          }, index: number) => {
            // Support both old (single 'image' field) and new (desktopImage/mobileImage) formats
            if (img.desktopImage && img.mobileImage) {
              // New format with both desktop and mobile images
              return {
                desktopUrl: urlFor(img.desktopImage).width(1920).height(600).url(),
                mobileUrl: urlFor(img.mobileImage).width(1920).height(800).url(),
              };
            } else if (img.desktopImage) {
              // Only desktop image available
              return {
                desktopUrl: urlFor(img.desktopImage).width(1920).height(600).url(),
                mobileUrl: urlFor(img.desktopImage).width(1920).height(800).url(),
              };
            } else if (img.mobileImage) {
              // Only mobile image available
              return {
                desktopUrl: urlFor(img.mobileImage).width(1920).height(600).url(),
                mobileUrl: urlFor(img.mobileImage).width(1920).height(800).url(),
              };
            } else if (img.image) {
              // Old format with single image - use for both desktop and mobile
              return {
                desktopUrl: urlFor(img.image).width(1920).height(600).url(),
                mobileUrl: urlFor(img.image).width(1920).height(800).url(),
              };
            } else {
              // Fallback to placeholder if no image found
              const placeholderIndex = index % PLACEHOLDER_IMAGES.desktop.length;
              return {
                desktopUrl: PLACEHOLDER_IMAGES.desktop[placeholderIndex],
                mobileUrl: PLACEHOLDER_IMAGES.mobile[placeholderIndex],
              };
            }
          });
          setImages(imageData);
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
    <section className="relative w-full h-64 overflow-hidden bg-slate-950">
      {/* Image Carousel */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="absolute inset-0"
        >
          <picture className="w-full h-full block">
            <source
              media="(min-width: 768px)"
              srcSet={images[currentIndex].desktopUrl}
            />
            <img
              src={images[currentIndex].mobileUrl}
              alt="Hero gallery image"
              className="w-full h-full object-cover object-center"
            />
          </picture>
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
        </motion.div>
      </AnimatePresence>

      {/* Navigation Indicators */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-20">
        <div className="glass-elevated rounded-full px-3 py-2 flex items-center gap-2 shadow-lg">
          {images.map((_, index) => (
            <motion.button
              key={index}
              onClick={() => setCurrentIndex(index)}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              className="relative"
              aria-label={`Go to slide ${index + 1}`}
            >
              <motion.div
                animate={{
                  scale: index === currentIndex ? 1 : 0.8,
                  opacity: index === currentIndex ? 1 : 0.5,
                }}
                transition={{ duration: 0.3 }}
                className={`w-2 h-2 rounded-full ${
                  index === currentIndex
                    ? 'bg-gold-400'
                    : 'bg-slate-400'
                }`}
              />
              {index === currentIndex && (
                <motion.div
                  layoutId="activeIndicator"
                  className="absolute inset-0 rounded-full bg-gold-400 blur-sm"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Decorative Border */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold-500/50 to-transparent" />
    </section>
  );
}
