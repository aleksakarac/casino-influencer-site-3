📱 MOBILE RESPONSIVE DESIGN: Complete Implementation Specification
OVERVIEW
Implement mobile-responsive design for the CasinoHub influencer website with mobile-first breakpoint at < 768px. The persistent layout architecture (Carousel → Middle Bar → Content → Footer) remains the same on mobile, but with optimized layouts, spacing, and touch interactions.

1. RESPONSIVE BREAKPOINT STRATEGY
Tailwind Breakpoint Configuration
Use standard Tailwind breakpoints:

Mobile: < 768px (default, no prefix)
Desktop: ≥ 768px (use md: prefix)

Implementation Pattern
// Mobile-first approach
<div className="px-2 py-8 md:px-4 md:py-16">
  {/* Mobile styles are default, desktop uses md: prefix */}
</div>
2. HEADER COMPONENT - MOBILE LAYOUT
Requirements

Logo + Title: Centered horizontally
Language Toggle: Top-right corner (absolute positioned)
Background: Same dark theme
Height: Reduced on mobile (e.g., 64px vs 80px desktop)

Implementation
// components/Header.tsx
export function Header() {
  return (
    <header className="relative bg-gray-900 h-16 md:h-20 flex items-center justify-center px-2 md:px-4">
      {/* Logo + Title (Centered) */}
      <div className="flex items-center gap-2 md:gap-4">
        <Image 
          src="/logo.png" 
          alt="CasinoHub" 
          width={40} 
          height={40}
          className="md:w-12 md:h-12"
        />
        <h1 className="text-xl md:text-3xl font-bold text-yellow-400">
          CasinoHub
        </h1>
      </div>

      {/* Language Toggle (Top-Right) */}
      <div className="absolute right-2 top-1/2 -translate-y-1/2 md:right-4">
        <LanguageToggle />
      </div>
    </header>
  )
}
3. HERO CAROUSEL - MOBILE OPTIMIZATIONS
Requirements

Same auto-play speed as desktop
NO navigation controls (no dots, no arrows)
Full-screen width (no side padding)
Reduced height on mobile
Adjusted aspect ratio for mobile viewing

Implementation
// components/HeroCarousel.tsx
export function HeroCarousel({ slides }) {
  return (
    <div className="relative w-full h-48 md:h-96 overflow-hidden">
      {/* Carousel Container */}
      <div className="relative h-full">
        {slides.map((slide, index) => (
          <div
            key={slide._id}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              currentSlide === index ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <Image
              src={slide.image}
              alt={slide.title}
              fill
              className="object-cover object-center"
              priority={index === 0}
            />
            
            {/* Overlay Text (Optional) */}
            <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
              <h2 className="text-2xl md:text-5xl font-bold text-white text-center px-4">
                {slide.title}
              </h2>
            </div>
          </div>
        ))}
      </div>

      {/* NO NAVIGATION ON MOBILE */}
      {/* Navigation only shown on desktop if needed */}
    </div>
  )
}
Key Changes

Height: h-48 mobile (192px) vs h-96 desktop (384px)
Navigation: Completely removed on mobile
Aspect Ratio: Auto-adjusts via object-cover
Text Size: Smaller on mobile (text-2xl vs text-5xl)


4. MIDDLE BAR - MOBILE LAYOUT
Requirements

Icon above text (vertical stack)
5 buttons equally distributed across width
Smaller buttons (~60px each on mobile)
Responsive sizing to screen width
Active state: Underline only (no background)
Tap feedback: Visual response + haptic

Implementation
// components/MiddleBar.tsx
'use client'

import { usePathname, useRouter } from 'next/navigation'
import { ExternalLink, Home, Trophy, Calendar, Link as LinkIcon } from 'lucide-react'
import { useActiveSection } from '@/hooks/useActiveSection'

export function MiddleBar({ vavadaLink }) {
  const pathname = usePathname()
  const router = useRouter()
  const activeSection = useActiveSection()

  const getActiveButton = () => {
    if (pathname === '/leaderboard') return 'rang-lista'
    if (activeSection === 'games') return 'pokupi-bonuse'
    if (activeSection === 'tournaments') return 'turniri'
    return null
  }

  const activeButton = getActiveButton()

  const handleTap = (action: () => void) => {
    // Haptic feedback (if supported)
    if (navigator.vibrate) {
      navigator.vibrate(10) // 10ms gentle vibration
    }
    action()
  }

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      const offset = 200 // Header + middle bar height
      const top = element.offsetTop - offset
      window.scrollTo({ top, behavior: 'smooth' })
    }
  }

  return (
    <nav className="bg-[#1A1F2E] border-b border-gray-700">
      <div className="flex items-center justify-around h-16 md:h-20">
        {/* VAVADA Button */}
        
          href={vavadaLink}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => {
            e.preventDefault()
            handleTap(() => window.open(vavadaLink, '_blank'))
          }}
          className="flex flex-col items-center justify-center gap-1 w-full h-full transition-all active:scale-95 active:bg-white/5"
        >
          <ExternalLink className="w-5 h-5 md:w-6 md:h-6 text-cyan-400" />
          <span className="text-[10px] md:text-sm font-medium text-cyan-400">
            VAVADA
          </span>
        </a>

        {/* Pokupi Bonuse Button */}
        <button
          onClick={() => handleTap(() => {
            if (pathname === '/leaderboard') {
              router.push('/#games')
            } else {
              scrollToSection('games-section')
            }
          })}
          className={`flex flex-col items-center justify-center gap-1 w-full h-full transition-all active:scale-95 active:bg-white/5 relative ${
            activeButton === 'pokupi-bonuse' ? 'after:absolute after:bottom-0 after:left-0 after:right-0 after:h-1 after:bg-purple-500' : ''
          }`}
        >
          <Home className="w-5 h-5 md:w-6 md:h-6 text-orange-500" />
          <span className="text-[10px] md:text-sm font-medium text-orange-500 truncate px-1">
            BONUSI
          </span>
        </button>

        {/* Rang Lista Button */}
        <button
          onClick={() => handleTap(() => router.push('/leaderboard'))}
          className={`flex flex-col items-center justify-center gap-1 w-full h-full transition-all active:scale-95 active:bg-white/5 relative ${
            activeButton === 'rang-lista' ? 'after:absolute after:bottom-0 after:left-0 after:right-0 after:h-1 after:bg-purple-500' : ''
          }`}
        >
          <Trophy className="w-5 h-5 md:w-6 md:h-6 text-white" />
          <span className="text-[10px] md:text-sm font-medium text-white truncate px-1">
            RANG
          </span>
        </button>

        {/* Turniri Button */}
        <button
          onClick={() => handleTap(() => {
            if (pathname === '/leaderboard') {
              router.push('/#tournaments')
            } else {
              scrollToSection('tournaments-section')
            }
          })}
          className={`flex flex-col items-center justify-center gap-1 w-full h-full transition-all active:scale-95 active:bg-white/5 relative ${
            activeButton === 'turniri' ? 'after:absolute after:bottom-0 after:left-0 after:right-0 after:h-1 after:bg-purple-500' : ''
          }`}
        >
          <Calendar className="w-5 h-5 md:w-6 md:h-6 text-orange-500" />
          <span className="text-[10px] md:text-sm font-medium text-orange-500 truncate px-1">
            TURNIRI
          </span>
        </button>

        {/* Social Button */}
        <button
          onClick={() => handleTap(() => scrollToSection('footer-section'))}
          className="flex flex-col items-center justify-center gap-1 w-full h-full transition-all active:scale-95 active:bg-white/5"
        >
          <LinkIcon className="w-5 h-5 md:w-6 md:h-6 text-green-400" />
          <span className="text-[10px] md:text-sm font-medium text-green-400 truncate px-1">
            SOCIAL
          </span>
        </button>
      </div>
    </nav>
  )
}
Key Features

Vertical Stack: Icon above text using flex-col
Equal Distribution: justify-around splits space evenly
Touch Feedback:

active:scale-95 - slight shrink on tap
active:bg-white/5 - subtle background flash


Haptic: navigator.vibrate(10) for 10ms tap feedback
Active Underline: after: pseudo-element with bottom border
Responsive Text: text-[10px] md:text-sm
Icon Size: w-5 h-5 md:w-6 md:h-6


5. GAME CARDS - MOBILE GRID LAYOUT
Requirements

2 columns on mobile (vs 3 on desktop)
Same 3:4 aspect ratio
Smaller gap: 12px mobile vs 24px desktop
Touch-optimized interactions

Implementation
// components/GameCardsGrid.tsx
export function GameCardsGrid({ cards, cardConfig, vavadaLink }) {
  return (
    <section id="games-section" className="py-8 px-2 md:py-16 md:px-4">
      <div className="max-w-7xl mx-auto">
        {/* 2 columns mobile, 3 columns desktop */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-6">
          {cards.map((card) => {
            const borderColor = 
              card.cardType === 'bonus' ? cardConfig.bonusBorder :
              card.cardType === 'play' ? cardConfig.playBorder :
              cardConfig.welcomeBorder

            switch (card.cardType) {
              case 'bonus':
                return <BonusCard key={card._id} card={card} borderColor={borderColor} vavadaLink={vavadaLink} />
              case 'play':
                return <PlayCard key={card._id} card={card} borderColor={borderColor} vavadaLink={vavadaLink} />
              case 'welcome':
                return <WelcomeCard key={card._id} card={card} borderColor={borderColor} vavadaLink={vavadaLink} />
            }
          })}
        </div>
      </div>
    </section>
  )
}
Mobile Card Adjustments
Bonus Card Mobile
// components/cards/BonusCard.tsx - Mobile adjustments
<div className="absolute inset-0 p-3 md:p-6 flex flex-col justify-between">
  {/* Title - Smaller on mobile */}
  <h3 className="text-lg md:text-2xl font-bold text-yellow-400">
    {card.title}
  </h3>

  <div className="space-y-2 md:space-y-3">
    {/* Activations - Smaller text */}
    <p className="text-white text-xs md:text-sm font-medium">
      {card.activationsCount} Aktivacija
    </p>

    {/* Button - Smaller padding */}
    
      href={vavadaLink}
      target="_blank"
      rel="noopener noreferrer"
      className="block w-full bg-yellow-500 text-black font-bold py-2 md:py-3 px-3 md:px-4 rounded-lg text-center text-sm md:text-base transition-transform active:scale-95"
    >
      Claim Bonus
    </a>

    {/* Code Box - Smaller */}
    <div className="bg-black/60 rounded-lg p-2 md:p-3 flex items-center justify-between">
      <span className="text-white font-mono text-xs md:text-sm">
        Kod: <span className="font-bold">{card.bonusCode}</span>
      </span>
      <button
        onClick={copyCode}
        className="text-white active:scale-90 transition-transform"
      >
        <CopyIcon className="w-4 h-4 md:w-5 md:h-5" />
      </button>
    </div>
  </div>
</div>
Play Card Mobile - Always Show Play Button
// components/cards/PlayCard.tsx
export function PlayCard({ card, borderColor, vavadaLink }) {
  // Remove hover state logic for mobile
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768

  return (
    
      href={vavadaLink}
      target="_blank"
      rel="noopener noreferrer"
      className="block relative rounded-lg md:rounded-xl overflow-hidden aspect-[3/4] border-2 md:border-4 active:scale-95 transition-transform"
      style={{ borderColor }}
    >
      {/* Image Section */}
      <div className="relative h-[85%] overflow-hidden">
        <Image
          src={card.gameImage}
          alt={card.title}
          fill
          className="object-cover brightness-75 md:brightness-100 md:hover:brightness-50 transition-all"
        />

        {/* Play Button - ALWAYS VISIBLE on mobile, hover on desktop */}
        <div className="absolute inset-0 flex items-center justify-center md:opacity-0 md:hover:opacity-100 transition-opacity">
          <div className="bg-yellow-500 rounded-full p-4 md:p-6 shadow-2xl">
            <PlayIcon className="w-8 h-8 md:w-12 md:h-12 text-black fill-black" />
          </div>
        </div>
      </div>

      {/* Title Section */}
      <div className="h-[15%] bg-gray-900 flex items-center justify-center px-2 md:px-4">
        <h3 className="text-white font-bold text-center text-sm md:text-lg truncate">
          {card.title}
        </h3>
      </div>
    </a>
  )
}
Welcome Card Mobile
// Similar adjustments: smaller padding, text, buttons
<div className="absolute inset-0 p-3 md:p-6 flex flex-col justify-between items-center text-center">
  <h3 className="text-xl md:text-3xl font-bold text-yellow-400">
    Bonus
  </h3>
  
  {/* Smaller code box */}
  <div className="w-full bg-black/70 rounded-lg p-3 md:p-4 border-2 border-yellow-500">
    <span className="text-white font-mono text-sm md:text-lg">
      Kod: <span className="font-bold text-yellow-400">{card.bonusCode}</span>
    </span>
  </div>

  {/* Smaller benefits text */}
  <div className="w-full space-y-1 md:space-y-2">
    {card.benefits.map((benefit, index) => (
      <div key={index} className="text-white text-xs md:text-base text-left flex items-start">
        <span className="text-yellow-400 mr-2">•</span>
        <span>{benefit}</span>
      </div>
    ))}
  </div>

  {/* Smaller button */}
  
    href={vavadaLink}
    target="_blank"
    className="w-full bg-yellow-500 text-black font-bold py-2 md:py-3 px-4 md:px-6 rounded-lg text-sm md:text-base active:scale-95 transition-transform"
  >
    Iskoristi Kod
  </a>
</div>
6. TOURNAMENT CARDS - MOBILE LAYOUT
Requirements

1 column on mobile (vs multi-column desktop)
Keep desktop layout structure (will be redesigned later)
Smaller fonts and spacing
Full-width cards

Implementation
// components/TournamentGrid.tsx
export function TournamentGrid({ tournaments }) {
  return (
    <section id="tournaments-section" className="py-8 px-2 md:py-16 md:px-4">
      <div className="max-w-7xl mx-auto">
        {/* 1 column mobile, 2 columns desktop (or whatever desktop uses) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          {tournaments.map((tournament) => (
            <TournamentCard key={tournament._id} tournament={tournament} />
          ))}
        </div>
      </div>
    </section>
  )
}
// components/TournamentCard.tsx - Mobile adjustments
export function TournamentCard({ tournament }) {
  return (
    <div className="bg-gray-800 rounded-lg md:rounded-xl overflow-hidden border-2 md:border-4 border-purple-500 active:scale-98 transition-transform">
      {/* Image Section */}
      <div className="relative h-40 md:h-64">
        <Image src={tournament.image} alt={tournament.name} fill className="object-cover" />
      </div>

      {/* Content - Smaller padding and text on mobile */}
      <div className="p-3 md:p-6">
        <h3 className="text-lg md:text-2xl font-bold text-white mb-2 md:mb-4">
          {tournament.name}
        </h3>
        
        <p className="text-xs md:text-base text-gray-300 mb-3 md:mb-6 line-clamp-2 md:line-clamp-3">
          {tournament.description}
        </p>

        {/* Stats Grid - Smaller on mobile */}
        <div className="grid grid-cols-2 gap-2 md:gap-4 mb-3 md:mb-6">
          <div className="bg-gray-700 rounded p-2 md:p-3">
            <div className="text-yellow-400 text-xs md:text-sm">Prize Pool</div>
            <div className="text-white font-bold text-sm md:text-lg">{tournament.prizePool}</div>
          </div>
          {/* More stats... */}
        </div>

        {/* Countdown - Smaller */}
        <div className="text-center mb-3 md:mb-4">
          <div className="text-xs md:text-sm text-gray-400 mb-1 md:mb-2">Time Remaining</div>
          <CountdownTimer endDate={tournament.endDate} className="text-sm md:text-xl" />
        </div>

        {/* Button - Smaller */}
        
          href={tournament.joinLink}
          target="_blank"
          className="block w-full bg-purple-600 text-white font-bold py-2 md:py-3 rounded-lg text-center text-sm md:text-base active:scale-95 transition-transform"
        >
          Join Tournament
        </a>
      </div>
    </div>
  )
}
7. FOOTER/SOCIAL SECTION - MOBILE
Requirements

Same layout as desktop
Smaller buttons and spacing
Touch-optimized
// components/Footer.tsx
export function Footer({ socialLinks }) {
  return (
    <footer id="footer-section" className="bg-gray-900 py-8 md:py-16 px-2 md:px-4">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-xl md:text-3xl font-bold text-yellow-400 mb-3 md:mb-6">
          Join Our Community
        </h2>
        <p className="text-sm md:text-lg text-gray-400 mb-6 md:mb-12 px-4">
          Connect with fellow players and stay updated on the latest tournaments and events
        </p>

        {/* Social Buttons - Stack on very small screens */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 md:gap-6">
          
            href={socialLinks.kick}
            target="_blank"
            className="w-full sm:w-auto bg-green-500 text-white font-bold py-3 px-8 rounded-lg text-sm md:text-base active:scale-95 transition-transform flex items-center justify-center gap-2"
          >
            <PlayIcon className="w-4 h-4 md:w-5 md:h-5" />
            Kick
          </a>
          
          
            href={socialLinks.instagram}
            target="_blank"
            className="w-full sm:w-auto bg-pink-600 text-white font-bold py-3 px-8 rounded-lg text-sm md:text-base active:scale-95 transition-transform flex items-center justify-center gap-2"
          >
            <InstagramIcon className="w-4 h-4 md:w-5 md:h-5" />
            Instagram
          </a>

          
            href={socialLinks.discord}
            target="_blank"
            className="w-full sm:w-auto bg-blue-600 text-white font-bold py-3 px-8 rounded-lg text-sm md:text-base active:scale-95 transition-transform flex items-center justify-center gap-2"
          >
            <MessageSquareIcon className="w-4 h-4 md:w-5 md:h-5" />
            Discord
          </a>
        </div>

        {/* Copyright - Smaller */}
        <p className="text-xs md:text-sm text-gray-500 mt-8 md:mt-12">
          © 2025 CasinoHub. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
8. LEADERBOARD PAGE - MOBILE
Requirements

Same centered layout
Smaller text sizes
Maintain readability
// app/leaderboard/page.tsx
export default function LeaderboardPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-gray-900 to-gray-800 px-4">
      <div className="text-center">
        <h1 className="text-4xl md:text-6xl font-bold text-yellow-500 mb-3 md:mb-4">
          🏆 Top Viewers
        </h1>
        <p className="text-sm md:text-lg text-gray-400 mb-8 md:mb-12 px-2">
          Most dedicated viewers of Aca Jankovic on Kick • Updated live
        </p>
        <div className="text-2xl md:text-4xl font-semibold text-gray-300">
          Coming Soon
        </div>
      </div>
    </div>
  )
}
8. LEADERBOARD PAGE - MOBILE
Requirements

Same centered layout
Smaller text sizes
Maintain readability
// app/leaderboard/page.tsx
export default function LeaderboardPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-gray-900 to-gray-800 px-4">
      <div className="text-center">
        <h1 className="text-4xl md:text-6xl font-bold text-yellow-500 mb-3 md:mb-4">
          🏆 Top Viewers
        </h1>
        <p className="text-sm md:text-lg text-gray-400 mb-8 md:mb-12 px-2">
          Most dedicated viewers of Aca Jankovic on Kick • Updated live
        </p>
        <div className="text-2xl md:text-4xl font-semibold text-gray-300">
          Coming Soon
        </div>
      </div>
    </div>
  )
}
9. GLOBAL MOBILE OPTIMIZATIONS
A. Prevent Accidental Double-Taps
// utils/preventDoubleTap.ts
export function preventDoubleTap(callback: () => void, delay: number = 300) {
  let lastTap = 0
  
  return () => {
    const now = Date.now()
    if (now - lastTap < delay) {
      return // Ignore double-tap
    }
    lastTap = now
    callback()
  }
}

// Usage in components
const handleClick = preventDoubleTap(() => {
  router.push('/leaderboard')
}, 300)
B. Disable Text Selection on Buttons
/* globals.css */
button, a[role="button"] {
  -webkit-tap-highlight-color: transparent;
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  user-select: none;
}
C. Safe Area Insets (for notched devices)
// app/layout.tsx
<body className="min-h-screen pb-safe">
  {/* Content */}
</body>
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      spacing: {
        'safe': 'env(safe-area-inset-bottom)',
      }
    }
  }
}
10. TESTING CHECKLIST
Mobile Testing Steps
Step 1: Browser DevTools Testing

 Open Chrome DevTools (F12)
 Toggle device toolbar (Ctrl+Shift+M)
 Test on iPhone SE (375px)
 Test on iPhone 12/13 (390px)
 Test on Pixel 5 (393px)
 Test on Samsung Galaxy S20 (360px)

Step 2: Component Testing

 Header: Logo centered, language toggle top-right
 Carousel: Full-width, no navigation, proper height
 Middle Bar: 5 buttons, icon above text, equal spacing
 Game Cards: 2 columns, proper aspect ratio, 12px gap
 Tournament Cards: 1 column, readable text
 Footer: Social buttons stack properly, touch feedback

Step 3: Navigation Testing

 Tap each middle bar button (verify haptic if available)
 Test scroll to sections (games, tournaments, social)
 Test navigation to leaderboard page
 Test browser back/forward buttons
 Verify active state underline appears correctly

Step 4: Touch Interaction Testing

 Test tap feedback (scale animation)
 Test copy code functionality with toast
 Test Play Card always-visible play button
 Test external link opens in new tab
 Verify no double-tap issues

Step 5: Performance Testing

 Check page load time on 3G network
 Verify images load progressively
 Test smooth scrolling performance
 Check animation frame rate


11. IMPLEMENTATION STEPS
Phase 1: Core Layout (2-3 hours)

 Add mobile breakpoints to all components
 Update Header with centered logo + top-right language
 Reduce Carousel height and remove navigation
 Test persistent layout on mobile

Phase 2: Middle Bar Mobile (2-3 hours)

 Refactor MiddleBar to vertical stack layout
 Add tap feedback and haptic vibration
 Change active state to underline-only
 Test all navigation flows on mobile
 Add double-tap prevention

Phase 3: Game Cards Mobile (2-3 hours)

 Change grid to 2 columns on mobile
 Reduce gap to 12px
 Make Play Card play button always visible
 Adjust padding and text sizes in all card types
 Test copy functionality with toast

Phase 4: Tournament Cards Mobile (1-2 hours)

 Change grid to 1 column on mobile
 Reduce text sizes and padding
 Test countdown timer display
 Verify join button touch feedback

Phase 5: Footer & Leaderboard (1 hour)

 Update Footer social buttons for mobile
 Stack buttons on very small screens
 Update Leaderboard page text sizes
 Test all links and buttons

Phase 6: Polish & Testing (2-3 hours)

 Add tap highlight removal CSS
 Add safe area insets for notched devices
 Test on real devices if available
 Fix any spacing/alignment issues
 Verify smooth scrolling
 Test haptic feedback on supported devices


12. KEY MOBILE DESIGN PRINCIPLES
Touch Target Sizes

Minimum: 44×44px (iOS) / 48×48px (Android)
Our Implementation: 60-64px button height for middle bar
Card Buttons: Full-width buttons ensure easy tapping

Spacing

Mobile padding: 8px (0.5rem) between sections
Card gaps: 12px minimum for touchable separation
Button padding: Generous padding for fat-finger friendliness

Typography

Headings: 1.5-2× smaller on mobile
Body text: Minimum 14px (0.875rem) for readability
Button text: Minimum 14px, bold weight

Performance

Image Optimization: Use Next.js Image component
Lazy Loading: Load cards below fold lazily
Animation: Use transforms (not position) for 60fps


FINAL NOTES

Mobile-First: All styles start with mobile, use md: for desktop
Touch Optimized: All interactions have visual + haptic feedback
No Hover States: Desktop hover becomes always-visible on mobile
Progressive Enhancement: Features work without JavaScript
Accessibility: Maintain ARIA labels and keyboard support

Claude Code, implement mobile responsive design following this specification. Test thoroughly on multiple screen sizes using browser DevTools. Focus on touch interactions and ensure all navigation works correctly on mobile devices. Ask questions if anything needs clarification!
