'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { HeroImage } from '@/types';

interface HeroGalleryProps {
  images: HeroImage[];
  locale: string;
}

export default function HeroGallery({ images, locale }: HeroGalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (images.length <= 1 || isPaused) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 5000); // 5 seconds per slide

    return () => clearInterval(interval);
  }, [images.length, isPaused]);

  if (!images || images.length === 0) {
    // Placeholder when no images
    return (
      <div className="relative h-[220px] bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-2 rounded-full bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center">
            <span className="text-2xl">🎰</span>
          </div>
          <p className="text-gray-400 text-sm">Hero Gallery - Add images in CMS</p>
        </div>
      </div>
    );
  }

  return (
    <div
      className="relative h-[220px] overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0"
        >
          <Image
            src={images[currentIndex].imageUrl || '/placeholder-hero.jpg'}
            alt={images[currentIndex].altText?.[locale as 'en' | 'sr'] || 'Hero image'}
            fill
            className="object-cover"
            priority={currentIndex === 0}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        </motion.div>
      </AnimatePresence>

      {/* Navigation Dots */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3 z-10">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentIndex
                ? 'bg-amber-500 w-8'
                : 'bg-white/50 hover:bg-white/80'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
