'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { SiteSettings } from '@/types';

interface FooterProps {
  socialLinks?: SiteSettings['socialLinks'];
}

const defaultSocialLinks = {
  kick: '#',
  instagram: '#',
  discord: '#'
};

export default function Footer({ socialLinks = defaultSocialLinks }: FooterProps) {
  const t = useTranslations('footer');

  const socials = [
    {
      name: 'Kick',
      url: socialLinks.kick || '#',
      bgColor: 'bg-green-500',
      glowColor: 'bg-green-500',
      icon: (
        <svg width="48" height="14" viewBox="0 0 97 26" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g clipPath="url(#clip0_405_17277)">
            <path fillRule="evenodd" clipRule="evenodd"
              d="M0 0.0307312H8.34073V5.79423H11.1163V2.91248H13.8919V0.0307312H22.2326V8.69274H19.457V11.5745H16.6815V14.4562H19.457V17.338H22.2326V26H13.8919V23.1182H11.1163V20.2365H8.34073V26H0V0.0307312ZM55.6444 0.0307312H63.9852V5.79423H66.7608V2.91248H69.5363V0.0307312H77.8771V8.69274H75.1015V11.5745H72.3259V14.4562H75.1015V17.338H77.8771V26H69.5363V23.1182H66.7608V20.2365H63.9852V26H55.6444V0.0307312ZM25.039 0.0307312H33.3797V26H25.039V0.0307312ZM38.9462 0.0307312V2.91248H36.1706V23.1029H38.9462V25.9846H52.8535V17.3226H44.5128V8.66061H52.8535V0H38.9462V0.0307312Z"
              fill="white" />
            <path
              d="M80.4771 0.0153656H83.0543C83.4817 0.0153656 83.7862 0.107559 83.9846 0.304518C84.183 0.501477 84.2738 0.792027 84.2738 1.17337C84.2738 1.55472 84.2123 1.64552 84.1061 1.79917C84 1.9668 83.8617 2.07296 83.6941 2.13442C84.0447 2.22662 84.2738 2.45431 84.4107 2.82029C84.4567 2.95718 84.4721 3.10944 84.4721 3.27706C84.4721 3.70451 84.3659 4.00903 84.183 4.20738C83.9846 4.40574 83.6801 4.49653 83.2526 4.49653H80.4771V0V0.0153656ZM83.1157 1.31166C83.1157 1.05185 82.9789 0.930318 82.7344 0.930318H81.6365V1.8299H82.7344C82.9942 1.8299 83.1157 1.70838 83.1157 1.44856V1.32703V1.31166ZM83.3141 3.09547C83.3141 2.83565 83.1772 2.71412 82.9328 2.71412H81.6365V3.61371H82.9328C83.1926 3.61371 83.3141 3.49218 83.3141 3.23236V3.11084V3.09547Z"
              fill="white" />
            <path
              d="M88.635 4.51331H85.052V0.0153809H88.635V0.914967H86.21V1.78382H88.1167V2.68341H86.21V3.61373H88.635V4.51331Z"
              fill="white" />
            <path
              d="M91.3502 4.51356H90.1908V0.915211H88.833V0.015625H92.7065V0.915211H91.3488V4.51356H91.3502Z"
              fill="white" />
            <path
              d="M92.2503 4.51331L93.9573 0.0153809H95.2536L96.962 4.51331H95.6964L95.4072 3.70452H93.791L93.5019 4.51331H92.2363H92.2517H92.2503ZM94.0802 2.88176H95.1167L94.5984 1.37174L94.0802 2.88176Z"
              fill="white" />
          </g>
          <defs>
            <clipPath id="clip0_405_17277">
              <rect width="96.9619" height="26" fill="white" />
            </clipPath>
          </defs>
        </svg>
      )
    },
    {
      name: 'Instagram',
      url: socialLinks.instagram || '#',
      bgColor: 'bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500',
      glowColor: 'bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
        </svg>
      )
    },
    {
      name: 'Discord',
      url: socialLinks.discord || '#',
      bgColor: 'bg-indigo-600',
      glowColor: 'bg-indigo-600',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
        </svg>
      )
    }
  ];

  return (
    <footer className="bg-black py-16 px-4 mt-20">
      <div className="max-w-2xl mx-auto">
        {/* Social Media Buttons */}
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-8">
          {socials.map((social, index) => (
            <motion.div
              key={social.name}
              className="relative w-full sm:w-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <a
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`group relative flex items-center justify-center gap-3 px-8 py-4 rounded-xl min-w-[200px] font-semibold text-white overflow-hidden transition-all duration-300 hover:scale-105 hover:-translate-y-1 hover:shadow-2xl hover:shadow-black/30 ${social.bgColor}`}
              >
                {/* Background Glow Effect */}
                <div className="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-all duration-300" />

                {/* Shimmer Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out" />

                {/* Content */}
                <div className="relative z-10 flex items-center justify-center gap-3">
                  <span className="transition-transform duration-300 group-hover:scale-110">
                    {social.icon}
                  </span>
                  <span className="transition-colors duration-300 group-hover:text-white/90">
                    {social.name}
                  </span>
                </div>

                {/* Hover Border Glow */}
                <div className="absolute inset-0 border-2 border-white/0 group-hover:border-white/20 rounded-xl transition-all duration-300" />
              </a>

              {/* Floating Glow Effect */}
              <div className={`absolute inset-0 -z-10 ${social.glowColor} opacity-0 group-hover:opacity-30 blur-xl scale-110 rounded-xl transition-opacity duration-300`} />
            </motion.div>
          ))}
        </div>

        {/* Copyright */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-center text-gray-500 text-sm"
        >
          {t('copyright')}
        </motion.p>
      </div>
    </footer>
  );
}
