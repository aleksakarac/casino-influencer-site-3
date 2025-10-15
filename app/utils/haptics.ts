/**
 * Haptic feedback utility for mobile devices
 * Provides tactile feedback for user interactions
 * Supports both Android (vibrate API) and iOS (Haptic Engine via audio)
 */

// Detect iOS
const isIOS = () => {
  if (typeof window === 'undefined') return false;
  return /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as any).MSStream;
};

// Create silent audio context for iOS haptic triggering
let audioContext: AudioContext | null = null;
let isAudioInitialized = false;

const initializeAudio = () => {
  if (isAudioInitialized || !isIOS()) return;

  try {
    if (typeof window !== 'undefined' && 'AudioContext' in window) {
      audioContext = new AudioContext();
      isAudioInitialized = true;
    }
  } catch (e) {
    console.warn('Failed to initialize audio context for haptics:', e);
  }
};

// Play a silent tone to trigger iOS haptics
const triggerIOSHaptic = (intensity: 'light' | 'medium' | 'heavy') => {
  if (!isIOS() || !audioContext) {
    initializeAudio();
    if (!audioContext) return;
  }

  try {
    // Create a very short, nearly silent oscillator
    const oscillator = audioContext!.createOscillator();
    const gainNode = audioContext!.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext!.destination);

    // Set volume based on intensity (very quiet to trigger haptic without audible sound)
    const volume = intensity === 'light' ? 0.001 : intensity === 'medium' ? 0.002 : 0.003;
    gainNode.gain.setValueAtTime(volume, audioContext!.currentTime);

    // Set frequency
    oscillator.frequency.setValueAtTime(20, audioContext!.currentTime); // Sub-bass, barely audible

    // Play very brief tone
    const duration = intensity === 'light' ? 0.01 : intensity === 'medium' ? 0.02 : 0.03;
    oscillator.start(audioContext!.currentTime);
    oscillator.stop(audioContext!.currentTime + duration);
  } catch (e) {
    console.warn('Failed to trigger iOS haptic:', e);
  }
};

export const haptics = {
  /**
   * Light haptic feedback - for subtle interactions
   * Use for: button taps, selections, navigation
   */
  light: () => {
    if (typeof window === 'undefined') return;

    if (isIOS()) {
      triggerIOSHaptic('light');
    } else if ('vibrate' in navigator) {
      navigator.vibrate(10);
    }
  },

  /**
   * Medium haptic feedback - for confirmations
   * Use for: successful copy, form submissions, toggles
   */
  medium: () => {
    if (typeof window === 'undefined') return;

    if (isIOS()) {
      triggerIOSHaptic('medium');
    } else if ('vibrate' in navigator) {
      navigator.vibrate(20);
    }
  },

  /**
   * Heavy haptic feedback - for important actions
   * Use for: errors, warnings, critical actions
   */
  heavy: () => {
    if (typeof window === 'undefined') return;

    if (isIOS()) {
      triggerIOSHaptic('heavy');
    } else if ('vibrate' in navigator) {
      navigator.vibrate(30);
    }
  },

  /**
   * Success pattern - double tap feedback
   * Use for: successful operations like copy to clipboard
   */
  success: () => {
    if (typeof window === 'undefined') return;

    if (isIOS()) {
      triggerIOSHaptic('medium');
      setTimeout(() => triggerIOSHaptic('medium'), 50);
    } else if ('vibrate' in navigator) {
      navigator.vibrate([15, 50, 15]);
    }
  },

  /**
   * Selection feedback - quick tap
   * Use for: selecting items, changing tabs
   */
  selection: () => {
    if (typeof window === 'undefined') return;

    if (isIOS()) {
      triggerIOSHaptic('light');
    } else if ('vibrate' in navigator) {
      navigator.vibrate(5);
    }
  },

  /**
   * Initialize audio context (call this on first user interaction for iOS)
   * This should be called when user first taps anywhere on the page
   */
  initialize: () => {
    if (isIOS()) {
      initializeAudio();
    }
  },
};
