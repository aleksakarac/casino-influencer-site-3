'use client';

import { ReactNode } from 'react';
import { motion } from 'framer-motion';

export default function BackgroundWrapper({ children }: { children: ReactNode }) {
  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Base Dark Background */}
      <div className="fixed inset-0 -z-50 bg-gradient-to-br from-gray-950 via-purple-950 to-gray-950"></div>

      {/* Animated Gradient Orbs */}
      <motion.div
        animate={{
          x: [0, 100, -50, 0],
          y: [0, -100, 50, 0],
          scale: [1, 1.2, 0.8, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="fixed top-1/4 left-1/4 w-96 h-96 bg-purple-500/30 rounded-full blur-3xl -z-40"
      />

      <motion.div
        animate={{
          x: [0, -150, 100, 0],
          y: [0, 100, -50, 0],
          scale: [1, 0.8, 1.3, 1],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2
        }}
        className="fixed top-1/2 right-1/4 w-[32rem] h-[32rem] bg-pink-500/20 rounded-full blur-3xl -z-40"
      />

      <motion.div
        animate={{
          x: [0, 80, -80, 0],
          y: [0, -80, 80, 0],
          scale: [1, 1.1, 0.9, 1],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 4
        }}
        className="fixed bottom-1/4 left-1/3 w-80 h-80 bg-cyan-500/25 rounded-full blur-3xl -z-40"
      />

      <motion.div
        animate={{
          x: [0, -100, 120, 0],
          y: [0, 120, -80, 0],
          scale: [1, 0.9, 1.2, 1],
        }}
        transition={{
          duration: 22,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1
        }}
        className="fixed top-3/4 right-1/3 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl -z-40"
      />

      {/* Gradient Mesh Overlay */}
      <div className="fixed inset-0 -z-30 opacity-40">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-purple-600/20 via-transparent to-transparent"></div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-pink-600/20 via-transparent to-transparent"></div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-cyan-600/10 via-transparent to-transparent"></div>
      </div>

      {/* Animated Grid Pattern */}
      <motion.div
        animate={{
          backgroundPosition: ['0% 0%', '100% 100%'],
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: "linear"
        }}
        className="fixed inset-0 -z-35 opacity-10"
        style={{
          backgroundImage: `
            linear-gradient(rgba(139, 92, 246, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(139, 92, 246, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px'
        }}
      />

      {/* Floating Particles */}
      {[...Array(15)].map((_, i) => (
        <motion.div
          key={i}
          animate={{
            y: [0, -100, 0],
            x: [0, Math.sin(i) * 50, 0],
            opacity: [0, 0.6, 0],
          }}
          transition={{
            duration: 10 + i * 2,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.5
          }}
          className="fixed w-1 h-1 bg-purple-400 rounded-full blur-sm -z-25"
          style={{
            left: `${(i * 7) % 100}%`,
            top: `${(i * 13) % 100}%`,
          }}
        />
      ))}

      {/* Scan Line Effect */}
      <motion.div
        animate={{
          top: ['-10%', '110%'],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "linear"
        }}
        className="fixed left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500/30 to-transparent -z-20"
      />

      {/* Vignette */}
      <div className="fixed inset-0 -z-15 bg-[radial-gradient(ellipse_at_center,_transparent_0%,_rgba(0,0,0,0.4)_100%)]" />

      {/* Noise Texture */}
      <div
        className="fixed inset-0 -z-10 opacity-5"
        style={{
          backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 400 400\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")',
        }}
      />

      {children}

      <style jsx global>{`
        @keyframes float-smooth {
          0%, 100% {
            transform: translateY(0) translateX(0);
          }
          50% {
            transform: translateY(-20px) translateX(10px);
          }
        }

        @keyframes pulse-glow {
          0%, 100% {
            opacity: 0.5;
            filter: blur(20px);
          }
          50% {
            opacity: 0.8;
            filter: blur(25px);
          }
        }
      `}</style>
    </div>
  );
}
