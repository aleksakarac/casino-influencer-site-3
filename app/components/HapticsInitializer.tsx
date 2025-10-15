'use client';

import { useEffect } from 'react';
import { haptics } from '@/app/utils/haptics';

/**
 * Initializes haptic feedback on first user interaction
 * Required for iOS to enable the audio context for haptics
 */
export default function HapticsInitializer() {
  useEffect(() => {
    const initializeOnFirstTouch = () => {
      haptics.initialize();
      // Remove listeners after first initialization
      document.removeEventListener('touchstart', initializeOnFirstTouch);
      document.removeEventListener('click', initializeOnFirstTouch);
    };

    // Listen for first user interaction
    document.addEventListener('touchstart', initializeOnFirstTouch, { passive: true });
    document.addEventListener('click', initializeOnFirstTouch);

    return () => {
      document.removeEventListener('touchstart', initializeOnFirstTouch);
      document.removeEventListener('click', initializeOnFirstTouch);
    };
  }, []);

  return null; // This component doesn't render anything
}
