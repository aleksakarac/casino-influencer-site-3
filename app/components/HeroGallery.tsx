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
    <section className="relative w-full h-64 overflow-hidden">
      {/* Glassmorphism Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-950 via-black to-pink-950" />

      {/* Animated Gradient Overlay */}
      <motion.div
        animate={{
          background: [
            'linear-gradient(135deg, rgba(139, 92, 246, 0.2) 0%, rgba(236, 72, 153, 0.2) 100%)',
            'linear-gradient(135deg, rgba(236, 72, 153, 0.2) 0%, rgba(59, 130, 246, 0.2) 100%)',
            'linear-gradient(135deg, rgba(59, 130, 246, 0.2) 0%, rgba(139, 92, 246, 0.2) 100%)',
            'linear-gradient(135deg, rgba(139, 92, 246, 0.2) 0%, rgba(236, 72, 153, 0.2) 100%)',
          ],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "linear"
        }}
        className="absolute inset-0 z-0"
      />

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
          className="absolute inset-0 cursor-grab active:cursor-grabbing z-10"
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

          {/* Image Overlay with Vignette */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30 pointer-events-none" />
        </motion.div>
      </AnimatePresence>

      {/* Floating Sparkles */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          animate={{
            y: [0, -30, 0],
            x: [0, Math.sin(i) * 20, 0],
            opacity: [0.2, 0.6, 0.2],
            scale: [0.8, 1.2, 0.8],
          }}
          transition={{
            duration: 5 + i,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.4
          }}
          className="absolute w-2 h-2 bg-purple-400 rounded-full blur-sm z-15"
          style={{
            left: `${(i * 12) + 10}%`,
            top: `${30 + (i % 3) * 20}%`,
          }}
        />
      ))}

      {/* Navigation Indicators */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-3 z-20">
        {images.map((_, index) => (
          <motion.button
            key={index}
            onClick={() => {
              setCurrentIndex(index);
              haptics.selection();
            }}
            whileHover={{ scale: 1.3 }}
            whileTap={{ scale: 0.9 }}
            className="relative group"
          >
            {/* Outer Glow Ring */}
            {index === currentIndex && (
              <motion.div
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.4, 0, 0.4],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeOut"
                }}
                className="absolute inset-0 rounded-full bg-purple-500 blur-md"
              />
            )}

            {/* Dot */}
            <div
              className={`relative w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentIndex
                  ? 'bg-gradient-to-r from-purple-400 to-pink-500 shadow-[0_0_15px_rgba(168,85,247,0.8)]'
                  : 'bg-white/30 group-hover:bg-white/50'
              }`}
            />

            {/* Inner Sparkle */}
            {index === currentIndex && (
              <motion.div
                animate={{
                  scale: [0.5, 1, 0.5],
                  opacity: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="absolute inset-0 rounded-full bg-white"
              />
            )}
          </motion.button>
        ))}
      </div>

      {/* Decorative Bottom Border with Animation */}
      <motion.div
        animate={{
          x: ['-100%', '100%'],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "linear"
        }}
        className="absolute bottom-0 left-0 w-1/3 h-[2px] bg-gradient-to-r from-transparent via-purple-500 to-transparent z-20"
      />

      {/* Static Bottom Glow */}
      <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-pink-400/50 to-transparent z-15" />

      {/* Top Border Accent */}
      <motion.div
        animate={{
          opacity: [0.3, 0.7, 0.3],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-purple-400/60 to-transparent z-20"
      />
    </section>
  );
}
