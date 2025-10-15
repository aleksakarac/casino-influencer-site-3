'use client';

import { useState, useEffect } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { motion, AnimatePresence, PanInfo } from 'framer-motion';
import { client, urlFor } from '@/app/lib/sanity';
import type { SanityImageSource } from '@sanity/image-url/lib/types/types';
import { haptics } from '@/app/utils/haptics';

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
  const [direction, setDirection] = useState(0);

  // Swipe handlers
  const swipeConfidenceThreshold = 10000;
  const swipePower = (offset: number, velocity: number) => {
    return Math.abs(offset) * velocity;
  };

  const paginate = (newDirection: number) => {
    setDirection(newDirection);
    setCurrentIndex((prevIndex) => {
      let newIndex = prevIndex + newDirection;
      if (newIndex < 0) newIndex = images.length - 1;
      if (newIndex >= images.length) newIndex = 0;
      return newIndex;
    });
    // Haptic feedback on swipe
    haptics.light();
  };

  const handleDragEnd = (e: MouseEvent | TouchEvent | PointerEvent, { offset, velocity }: PanInfo) => {
    const swipe = swipePower(offset.x, velocity.x);

    if (swipe < -swipeConfidenceThreshold) {
      paginate(1);
    } else if (swipe > swipeConfidenceThreshold) {
      paginate(-1);
    }
  };

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

  const variants = {
    enter: (direction: number) => {
      return {
        x: direction > 0 ? 1000 : -1000,
        opacity: 0
      };
    },
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => {
      return {
        zIndex: 0,
        x: direction < 0 ? 1000 : -1000,
        opacity: 0
      };
    }
  };

  return (
    <section className="relative w-full h-64 overflow-hidden bg-black">
      {/* Image Carousel */}
      <AnimatePresence initial={false} custom={direction}>
        <motion.div
          key={currentIndex}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: "spring", stiffness: 300, damping: 30 },
            opacity: { duration: 0.2 }
          }}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={1}
          onDragEnd={handleDragEnd}
          className="absolute inset-0 cursor-grab active:cursor-grabbing"
        >
          {/* Desktop image - hidden on mobile */}
          <img
            src={images[currentIndex].desktopUrl}
            alt="Hero gallery image"
            className="hidden md:block w-full h-full object-cover object-center pointer-events-none"
            draggable={false}
          />
          {/* Mobile image - hidden on desktop */}
          <img
            src={images[currentIndex].mobileUrl}
            alt="Hero gallery image"
            className="block md:hidden w-full h-full object-cover object-center pointer-events-none"
            draggable={false}
          />
        </motion.div>
      </AnimatePresence>


      {/* Navigation Indicators */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-3 z-20">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              setCurrentIndex(index);
              haptics.selection();
            }}
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
