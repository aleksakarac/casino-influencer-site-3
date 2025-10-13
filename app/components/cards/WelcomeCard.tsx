'use client';

import { Crown } from 'lucide-react';

interface WelcomeCardProps {
  card: {
    _id: string;
    backgroundImage: string;
    tag?: {
      name: string;
      color: string;
      textColor: string;
    };
    bonusCode: string;
    benefits: string[];
  };
  borderColor: string;
  vavadaLink: string;
}

export function WelcomeCard({ card, borderColor, vavadaLink }: WelcomeCardProps) {
  return (
    <div
      className="relative rounded-xl overflow-hidden aspect-square border w-full group hover:scale-105 transition-all duration-300 bg-gradient-to-br from-purple-900 to-indigo-950"
      style={{
        borderColor,
        borderWidth: '1px',
      }}
    >
      {/* Gradient Overlay for depth */}
      <div className="absolute inset-0 bg-gradient-to-b from-purple-800/20 via-transparent to-black/40" />

      {/* Star Icon (Top Right) */}
      <div className="absolute top-2 right-2 md:top-2 md:right-2 z-10 bg-gradient-to-br from-purple-500 to-pink-600 p-1.5 md:p-1.5 rounded-md shadow-lg">
        <Crown size={9} className="md:hidden text-white" />
        <Crown size={10} className="hidden md:block text-white" />
      </div>

      {/* Tag (Top Left) - NEW badge */}
      {card.tag && (
        <div
          className="absolute top-2 left-2 md:top-2 md:left-2 z-10 px-2 py-0.5 md:px-2.5 md:py-0.5 text-[9px] md:text-[10px] font-bold uppercase shadow-lg rounded-full border-2 bg-black/30 backdrop-blur-sm"
          style={{
            borderColor: card.tag.color,
            color: card.tag.color,
          }}
        >
          {card.tag.name}
        </div>
      )}

      {/* Content */}
      <div className="absolute inset-0 p-2 flex flex-col justify-between items-center text-center">
        {/* Title & Subtitle */}
        <div className="mt-8 md:mt-6 w-full">
          <h3 className="text-sm md:text-base font-bold text-white drop-shadow-lg mb-0.5">
            Welcome Package
          </h3>
          <p className="text-[9px] md:text-[10px] text-purple-200">
            Sign Up with Code {card.bonusCode}
          </p>
        </div>

        {/* Benefits - Desktop Only */}
        <div className="hidden md:flex md:flex-col md:items-center md:justify-center w-full space-y-1.5 flex-1">
          {card.benefits && card.benefits.map((benefit, index) => (
            <div key={index} className="text-gray-200 text-center flex items-center text-xs">
              <span className="text-purple-400 mr-2">✓</span>
              <span>{benefit}</span>
            </div>
          ))}
        </div>

        {/* Bottom Section */}
        <div className="w-full flex flex-col md:flex-row items-center justify-center gap-1.5">
          {/* Code Display with Crown Icon */}
          <div className="flex items-center gap-1.5 bg-purple-800/40 px-2.5 h-[24px] md:h-[30px] rounded-md border border-purple-500/30">
            <span className="text-purple-200 text-[9px] md:text-[10px]">Code:</span>
            <Crown size={10} className="md:hidden text-yellow-400" />
            <Crown size={11} className="hidden md:block text-yellow-400" />
            <span className="font-bold text-white font-mono text-[9px] md:text-[10px] tracking-wider">
              {card.bonusCode}
            </span>
          </div>

          {/* Claim Button */}
          <a
            href={vavadaLink}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="flex items-center justify-center w-[72%] md:w-auto h-[24px] md:h-[30px] bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-400 hover:to-pink-500 text-white text-[9px] md:text-[10px] font-bold px-2 md:px-4 rounded text-center transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105 whitespace-nowrap"
          >
            CLAIM
          </a>
        </div>
      </div>
    </div>
  );
}
