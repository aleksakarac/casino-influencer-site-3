'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ThemeType } from '@/types';

const themes = [
  {
    id: 'vavada' as ThemeType,
    name: 'Vavada Style',
    preview: 'linear-gradient(135deg, #0F1729 0%, #1A1F2E 100%)',
    background: 'linear-gradient(135deg, #0F1729 0%, #1A1F2E 100%)'
  },
  {
    id: 'minimal' as ThemeType,
    name: 'Minimal',
    preview: '#0A0A0A',
    background: '#0A0A0A'
  },
  {
    id: 'gradient' as ThemeType,
    name: 'Gradient',
    preview: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
  },
  {
    id: 'geometric' as ThemeType,
    name: 'Geometric',
    preview: 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)',
    background: 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)'
  },
  {
    id: 'particles' as ThemeType,
    name: 'Particles',
    preview: 'linear-gradient(135deg, #0a0e27 0%, #1a1f3a 100%)',
    background: 'linear-gradient(135deg, #0a0e27 0%, #1a1f3a 100%)'
  }
];

interface ThemeSelectorProps {
  onThemeChange: (theme: ThemeType) => void;
}

export default function ThemeSelector({ onThemeChange }: ThemeSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [currentTheme, setCurrentTheme] = useState<ThemeType>('vavada');

  useEffect(() => {
    // Load saved theme from localStorage
    const savedTheme = localStorage.getItem('casinohub-theme') as ThemeType;
    if (savedTheme) {
      setCurrentTheme(savedTheme);
      onThemeChange(savedTheme);
    }
  }, [onThemeChange]);

  const selectTheme = (themeId: ThemeType) => {
    setCurrentTheme(themeId);
    localStorage.setItem('casinohub-theme', themeId);
    onThemeChange(themeId);
    setIsOpen(false);
  };

  return (
    <>
      {/* Theme Button - Fixed bottom-right */}
      <motion.button
        onClick={() => setIsOpen(true)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-8 right-8 z-40 w-16 h-16 rounded-full bg-gradient-to-br from-amber-500 to-orange-600 border-2 border-amber-400 shadow-lg hover:shadow-amber-500/50 flex items-center justify-center text-2xl transition-all duration-300"
        aria-label="Theme Selector"
      >
        🎨
      </motion.button>

      {/* Theme Modal */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/80 z-50 backdrop-blur-sm"
            />

            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 bg-gray-900 rounded-3xl border border-amber-500/30 p-8 max-w-2xl w-full mx-4"
            >
              {/* Close button */}
              <button
                onClick={() => setIsOpen(false)}
                className="absolute top-4 right-4 text-gray-400 hover:text-white text-2xl w-10 h-10 flex items-center justify-center rounded-full hover:bg-white/10 transition-all"
                aria-label="Close"
              >
                ×
              </button>

              {/* Title */}
              <h2 className="text-3xl font-bold text-amber-400 mb-6">Choose Theme</h2>

              {/* Theme Grid */}
              <div className="grid grid-cols-2 gap-4">
                {themes.map((theme) => (
                  <motion.button
                    key={theme.id}
                    onClick={() => selectTheme(theme.id)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`relative p-4 rounded-xl border-2 transition-all ${
                      currentTheme === theme.id
                        ? 'border-amber-500 shadow-lg shadow-amber-500/30'
                        : 'border-gray-700 hover:border-amber-500/50'
                    }`}
                  >
                    {/* Preview */}
                    <div
                      className="h-24 rounded-lg mb-3"
                      style={{ background: theme.preview }}
                    />

                    {/* Name */}
                    <p className="text-white font-semibold">{theme.name}</p>

                    {/* Selected indicator */}
                    {currentTheme === theme.id && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="absolute top-2 right-2 w-6 h-6 bg-amber-500 rounded-full flex items-center justify-center"
                      >
                        <span className="text-white text-sm">✓</span>
                      </motion.div>
                    )}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
