'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';

// Placeholder images - will be replaced with Sanity CMS images
const PLACEHOLDER_IMAGES = [
  'https://images.unsplash.com/photo-1596838132731-3301c3fd4317?w=1920&h=800&fit=crop',
  'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=1920&h=800&fit=crop',
  'https://images.unsplash.com/photo-1579547945478-a6681fb3c3c9?w=1920&h=800&fit=crop',
];

export default function HeroGallery() {
  const t = useTranslations('Hero');
  const [currentIndex, setCurrentIndex] = useState(0);
  const autoPlaySpeed = 5000; // 5 seconds

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % PLACEHOLDER_IMAGES.length);
    }, autoPlaySpeed);

    return () => clearInterval(interval);
  }, []);

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
            style={{ backgroundImage: `url(${PLACEHOLDER_IMAGES[currentIndex]})` }}
          ></div>
        </motion.div>
      </AnimatePresence>

      {/* Overlay System - Layer 1: Dark */}
      <div className="absolute inset-0 bg-black/40"></div>

      {/* Overlay System - Layer 2: Theme gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[var(--primary-orange)] to-yellow-600 opacity-30"></div>

      {/* Content - Layer 3 */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center px-6">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-bold text-center text-white drop-shadow-2xl"
        >
          {t('title')}
        </motion.h1>
        <div className="w-24 h-1 bg-gradient-to-r from-[var(--primary-orange)] to-yellow-600 rounded-full mt-2"></div>
      </div>

      {/* Navigation Indicators */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-3 z-20">
        {PLACEHOLDER_IMAGES.map((_, index) => (
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
