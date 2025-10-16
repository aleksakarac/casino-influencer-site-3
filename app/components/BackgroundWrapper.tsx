'use client';

import { ReactNode } from 'react';
import { motion } from 'framer-motion';

export default function BackgroundWrapper({ children }: { children: ReactNode }) {
  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Base Gradient Background */}
      <div className="fixed inset-0 -z-50 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950" />

      {/* Animated Gradient Orbs - Subtle & Premium */}
      <motion.div
        animate={{
          x: [0, 50, -30, 0],
          y: [0, -40, 30, 0],
          scale: [1, 1.1, 0.95, 1],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="fixed top-0 left-0 w-[600px] h-[600px] bg-purple-600/20 rounded-full blur-3xl -z-40 opacity-60"
      />

      <motion.div
        animate={{
          x: [0, -40, 60, 0],
          y: [0, 50, -30, 0],
          scale: [1, 0.9, 1.15, 1],
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 5
        }}
        className="fixed top-1/3 right-0 w-[500px] h-[500px] bg-gold-500/15 rounded-full blur-3xl -z-40 opacity-50"
      />

      <motion.div
        animate={{
          x: [0, 40, -50, 0],
          y: [0, -35, 45, 0],
          scale: [1, 1.05, 0.92, 1],
        }}
        transition={{
          duration: 28,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 10
        }}
        className="fixed bottom-0 left-1/3 w-[550px] h-[550px] bg-purple-500/18 rounded-full blur-3xl -z-40 opacity-55"
      />

      {/* Subtle Grid Pattern */}
      <div
        className="fixed inset-0 -z-35 opacity-[0.02]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(148, 163, 184, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(148, 163, 184, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px'
        }}
      />

      {/* Radial Gradients for Depth */}
      <div className="fixed inset-0 -z-30 opacity-30">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-purple-600/10 via-transparent to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-gold-500/10 via-transparent to-transparent" />
      </div>

      {/* Floating Particles - Minimal */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          animate={{
            y: [0, -80, 0],
            opacity: [0, 0.4, 0],
          }}
          transition={{
            duration: 15 + i * 2,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 2
          }}
          className="fixed w-1 h-1 bg-gold-400 rounded-full blur-sm -z-25"
          style={{
            left: `${10 + i * 12}%`,
            top: `${20 + (i * 8) % 60}%`,
          }}
        />
      ))}

      {/* Vignette Effect */}
      <div className="fixed inset-0 -z-15 bg-[radial-gradient(ellipse_at_center,_transparent_0%,_rgba(10,11,15,0.6)_100%)]" />

      {/* Noise Texture for Premium Feel */}
      <div
        className="fixed inset-0 -z-10 opacity-[0.015] mix-blend-overlay"
        style={{
          backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 400 400\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")',
        }}
      />

      {/* Content */}
      {children}
    </div>
  );
}
