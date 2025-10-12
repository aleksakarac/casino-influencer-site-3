'use client';

import { ReactNode, useMemo } from 'react';

// For Phase 1, using default Vavada-style background
// Phase 2 will add client-selectable themes via Sanity

export default function BackgroundWrapper({ children }: { children: ReactNode }) {
  // Generate stable particle positions (same on server and client)
  const particles = useMemo(() => {
    return Array.from({ length: 20 }, (_, i) => {
      // Use index-based seed for consistent positioning
      const seed = (i * 2654435761) % 2 ** 32;
      const random1 = (seed / 2 ** 32) * 100;
      const random2 = ((seed * 1664525 + 1013904223) % 2 ** 32 / 2 ** 32) * 100;
      const random3 = ((seed * 48271) % 2147483647 / 2147483647) * 10;
      const random4 = ((seed * 69621) % 2147483647 / 2147483647) * 20;

      return {
        left: random1,
        top: random2,
        delay: random3,
        duration: 20 + random4,
      };
    });
  }, []);

  return (
    <div className="relative min-h-screen">
      {/* Vavada-style animated background */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        {/* Base gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#0F1729] via-[#1A1F35] to-[#0A0A0A]"></div>

        {/* Animated diagonal streaks */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-transparent via-blue-500/10 to-transparent animate-[slide_20s_linear_infinite]"></div>
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-tl from-transparent via-purple-500/10 to-transparent animate-[slide_30s_linear_infinite]"></div>
        </div>

        {/* Floating particles */}
        <div className="absolute inset-0">
          {particles.map((particle, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-white/20 rounded-full animate-float"
              style={{
                left: `${particle.left}%`,
                top: `${particle.top}%`,
                animationDelay: `${particle.delay}s`,
                animationDuration: `${particle.duration}s`,
              }}
            ></div>
          ))}
        </div>

        {/* Vignette effect */}
        <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-black/60"></div>
      </div>

      {children}

      <style jsx>{`
        @keyframes slide {
          0% {
            transform: translateX(-100%) translateY(-100%);
          }
          100% {
            transform: translateX(100%) translateY(100%);
          }
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0) translateX(0);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          90% {
            opacity: 1;
          }
          100% {
            transform: translateY(-100vh) translateX(50px);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
}
