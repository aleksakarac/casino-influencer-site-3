🎴 GAME CARDS SYSTEM: Complete Implementation SpecificationOVERVIEW
Replace the current placeholder game cards with a dynamic, CMS-managed card system supporting 3 card types: Bonus Cards, Play Cards, and Welcome Bonus Cards. All cards are created and managed in Sanity CMS with configurable ordering, tags, and styling.1. SANITY CMS SCHEMA DESIGNA. Card Type Configuration Document (Global Settings)First, create a global configuration for card types to manage border colors:
// sanity/schemas/cardTypeConfig.ts
export default {
  name: 'cardTypeConfig',
  title: 'Card Type Configuration',
  type: 'document',
  fields: [
    {
      name: 'bonusCardBorderColor',
      title: 'Bonus Card Border Color',
      type: 'color',
      description: 'Border color for all Bonus cards',
    },
    {
      name: 'playCardBorderColor',
      title: 'Play Card Border Color',
      type: 'color',
      description: 'Border color for all Play cards',
    },
    {
      name: 'welcomeCardBorderColor',
      title: 'Welcome Bonus Border Color',
      type: 'color',
      description: 'Border color for all Welcome Bonus cards',
    }
  ]
}
B. Tag Configuration DocumentCreate a reusable tag system with configurable colors:
// sanity/schemas/cardTag.ts
export default {
  name: 'cardTag',
  title: 'Card Tags',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Tag Name',
      type: 'string',
      description: 'E.g., NEW, HOT, EXCLUSIVE, VIP',
      validation: Rule => Rule.required()
    },
    {
      name: 'color',
      title: 'Tag Color',
      type: 'color',
      description: 'Background color for this tag',
      validation: Rule => Rule.required()
    },
    {
      name: 'textColor',
      title: 'Text Color',
      type: 'color',
      description: 'Text color for readability',
      options: {
        disableAlpha: true
      }
    }
  ]
}
C. Bonus Card Schema
// sanity/schemas/bonusCard.ts
export default {
  name: 'bonusCard',
  title: 'Bonus Card',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Card Title',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'backgroundImage',
      title: 'Background Image',
      type: 'image',
      options: {
        hotspot: true
      },
      validation: Rule => Rule.required()
    },
    {
      name: 'tag',
      title: 'Tag (Optional)',
      type: 'reference',
      to: [{ type: 'cardTag' }],
      description: 'Select a tag like NEW, HOT, etc. Leave empty for no tag'
    },
    {
      name: 'activationsCount',
      title: 'Activations Count',
      type: 'number',
      description: 'Number of available code activations (e.g., 12)',
      validation: Rule => Rule.required().min(0)
    },
    {
      name: 'bonusCode',
      title: 'Bonus Code',
      type: 'string',
      description: 'The code users will copy (e.g., SZYMOOL)',
      validation: Rule => Rule.required()
    },
    {
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Lower numbers appear first (left to right, top to bottom)',
      validation: Rule => Rule.required().min(0)
    },
    {
      name: 'isActive',
      title: 'Active',
      type: 'boolean',
      description: 'Only active cards are displayed on the site',
      initialValue: true
    }
  ]
}
D. Play Card Schema
// sanity/schemas/playCard.ts
export default {
  name: 'playCard',
  title: 'Play Card',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Game Title',
      type: 'string',
      description: 'E.g., Sweet Rush Bonanza, Dead West',
      validation: Rule => Rule.required()
    },
    {
      name: 'gameImage',
      title: 'Game Image',
      type: 'image',
      options: {
        hotspot: true
      },
      validation: Rule => Rule.required()
    },
    {
      name: 'tag',
      title: 'Tag (Optional)',
      type: 'reference',
      to: [{ type: 'cardTag' }]
    },
    {
      name: 'order',
      title: 'Display Order',
      type: 'number',
      validation: Rule => Rule.required().min(0)
    },
    {
      name: 'isActive',
      title: 'Active',
      type: 'boolean',
      initialValue: true
    }
  ]
}
E. Welcome Bonus Card Schema
// sanity/schemas/welcomeCard.ts
export default {
  name: 'welcomeCard',
  title: 'Welcome Bonus Card',
  type: 'document',
  fields: [
    {
      name: 'backgroundImage',
      title: 'Background Image',
      type: 'image',
      options: {
        hotspot: true
      },
      validation: Rule => Rule.required()
    },
    {
      name: 'tag',
      title: 'Tag (Optional)',
      type: 'reference',
      to: [{ type: 'cardTag' }]
    },
    {
      name: 'bonusCode',
      title: 'Welcome Bonus Code',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'benefits',
      title: 'Benefits List',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Bullet points of benefits (e.g., "100 Besplatnih Spinova")',
      validation: Rule => Rule.required().min(1)
    },
    {
      name: 'order',
      title: 'Display Order',
      type: 'number',
      validation: Rule => Rule.required().min(0)
    },
    {
      name: 'isActive',
      title: 'Active',
      type: 'boolean',
      initialValue: true
    }
  ]
}
2. DATA FETCHING STRATEGY
Fetch All Cards with Ordering
Create a unified query that fetches all card types and sorts by order:
// lib/sanity/queries.ts
export const gameCardsQuery = `{
  "bonusCards": *[_type == "bonusCard" && isActive == true] | order(order asc) {
    _id,
    title,
    "backgroundImage": backgroundImage.asset->url,
    "tag": tag->{name, "color": color.hex, "textColor": textColor.hex},
    activationsCount,
    bonusCode,
    order
  },
  "playCards": *[_type == "playCard" && isActive == true] | order(order asc) {
    _id,
    title,
    "gameImage": gameImage.asset->url,
    "tag": tag->{name, "color": color.hex, "textColor": textColor.hex},
    order
  },
  "welcomeCards": *[_type == "welcomeCard" && isActive == true] | order(order asc) {
    _id,
    "backgroundImage": backgroundImage.asset->url,
    "tag": tag->{name, "color": color.hex, "textColor": textColor.hex},
    bonusCode,
    benefits,
    order
  },
  "cardConfig": *[_type == "cardTypeConfig"][0] {
    "bonusBorder": bonusCardBorderColor.hex,
    "playBorder": playCardBorderColor.hex,
    "welcomeBorder": welcomeCardBorderColor.hex
  },
  "vavadaLink": *[_type == "siteSettings"][0].vavadaRefLink
}`
Merge and Sort All Cards
// In your component
const data = await client.fetch(gameCardsQuery)

// Add type identifier to each card
const allCards = [
  ...data.bonusCards.map(card => ({ ...card, cardType: 'bonus' })),
  ...data.playCards.map(card => ({ ...card, cardType: 'play' })),
  ...data.welcomeCards.map(card => ({ ...card, cardType: 'welcome' }))
].sort((a, b) => a.order - b.order)
3. COMPONENT ARCHITECTURE
A. Main GameCardsGrid Component
// components/GameCardsGrid.tsx
'use client'

import { BonusCard } from './cards/BonusCard'
import { PlayCard } from './cards/PlayCard'
import { WelcomeCard } from './cards/WelcomeCard'

export function GameCardsGrid({ cards, cardConfig, vavadaLink }) {
  return (
    <section id="games-section" className="py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-3 gap-6">
          {cards.map((card) => {
            const borderColor = 
              card.cardType === 'bonus' ? cardConfig.bonusBorder :
              card.cardType === 'play' ? cardConfig.playBorder :
              cardConfig.welcomeBorder

            switch (card.cardType) {
              case 'bonus':
                return (
                  <BonusCard
                    key={card._id}
                    card={card}
                    borderColor={borderColor}
                    vavadaLink={vavadaLink}
                  />
                )
              case 'play':
                return (
                  <PlayCard
                    key={card._id}
                    card={card}
                    borderColor={borderColor}
                    vavadaLink={vavadaLink}
                  />
                )
              case 'welcome':
                return (
                  <WelcomeCard
                    key={card._id}
                    card={card}
                    borderColor={borderColor}
                    vavadaLink={vavadaLink}
                  />
                )
            }
          })}
        </div>
      </div>
    </section>
  )
}
B. Bonus Card Component 
// components/cards/BonusCard.tsx
'use client'

import { useState } from 'react'
import { toast } from 'sonner' // or your toast library
import Image from 'next/image'

export function BonusCard({ card, borderColor, vavadaLink }) {
  const [copying, setCopying] = useState(false)

  const copyCode = async (e: React.MouseEvent) => {
    e.stopPropagation()
    setCopying(true)
    
    await navigator.clipboard.writeText(card.bonusCode)
    toast.success('Kod kopiran!', {
      description: `${card.bonusCode} je kopiran u clipboard`
    })
    
    setTimeout(() => setCopying(false), 2000)
  }

  return (
    <div
      className="relative rounded-xl overflow-hidden aspect-[3/4] border-4 hover:scale-105 transition-transform duration-200"
      style={{ borderColor }}
    >
      {/* Background Image */}
      <Image
        src={card.backgroundImage}
        alt={card.title}
        fill
        className="object-cover"
      />

      {/* Overlay Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/80" />

      {/* Tag (Top Right) */}
      {card.tag && (
        <div
          className="absolute top-0 right-0 px-4 py-2 text-sm font-bold uppercase shadow-lg"
          style={{
            backgroundColor: card.tag.color,
            color: card.tag.textColor,
            clipPath: 'polygon(0 0, 100% 0, 100% 100%, 15% 100%)'
          }}
        >
          {card.tag.name}
        </div>
      )}

      {/* Content */}
      <div className="absolute inset-0 p-6 flex flex-col justify-between">
        {/* Title (Top Left) */}
        <h3 className="text-2xl font-bold text-yellow-400 drop-shadow-lg">
          {card.title}
        </h3>

        {/* Bottom Section */}
        <div className="space-y-3">
          {/* Activations Count */}
          <p className="text-white text-sm font-medium">
            {card.activationsCount} Aktivacija
          </p>

          {/* Claim Button */}
          
            href={vavadaLink}
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full bg-yellow-500 hover:bg-yellow-400 text-black font-bold py-3 px-4 rounded-lg text-center transition-colors"
          >
            Claim Bonus
          </a>

          {/* Code Box */}
          <div className="bg-black/60 backdrop-blur-sm rounded-lg p-3 flex items-center justify-between">
            <span className="text-white font-mono text-sm">
              Kod: <span className="font-bold">{card.bonusCode}</span>
            </span>
            <button
              onClick={copyCode}
              disabled={copying}
              className="text-white hover:text-yellow-400 transition-colors"
              aria-label="Copy code"
            >
              {copying ? (
                <CheckIcon className="w-5 h-5" />
              ) : (
                <CopyIcon className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
C. Play Card Component
// components/cards/PlayCard.tsx
'use client'

import { useState } from 'react'
import Image from 'next/image'
import { PlayIcon } from 'lucide-react' // or your icon library

export function PlayCard({ card, borderColor, vavadaLink }) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    
      href={vavadaLink}
      target="_blank"
      rel="noopener noreferrer"
      className="block relative rounded-xl overflow-hidden aspect-[3/4] border-4 hover:scale-105 transition-transform duration-200"
      style={{ borderColor }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Tag */}
      {card.tag && (
        <div
          className="absolute top-0 right-0 z-10 px-4 py-2 text-sm font-bold uppercase shadow-lg"
          style={{
            backgroundColor: card.tag.color,
            color: card.tag.textColor,
            clipPath: 'polygon(0 0, 100% 0, 100% 100%, 15% 100%)'
          }}
        >
          {card.tag.name}
        </div>
      )}

      {/* Image Section (80-90% height) */}
      <div className="relative h-[85%] overflow-hidden">
        <Image
          src={card.gameImage}
          alt={card.title}
          fill
          className={`object-cover transition-all duration-300 ${
            isHovered ? 'brightness-50' : 'brightness-100'
          }`}
        />

        {/* Play Button Overlay */}
        {isHovered && (
          <div className="absolute inset-0 flex items-center justify-center animate-fadeIn">
            <div className="bg-yellow-500 rounded-full p-6 shadow-2xl">
              <PlayIcon className="w-12 h-12 text-black fill-black" />
            </div>
          </div>
        )}
      </div>

      {/* Title Section (10-20% height) */}
      <div className="h-[15%] bg-gray-900 flex items-center justify-center px-4">
        <h3 className="text-white font-bold text-center text-lg truncate">
          {card.title}
        </h3>
      </div>
    </a>
  )
}
D. Welcome Card Component
// components/cards/WelcomeCard.tsx
'use client'

import { useState } from 'react'
import { toast } from 'sonner'
import Image from 'next/image'

export function WelcomeCard({ card, borderColor, vavadaLink }) {
  const [copying, setCopying] = useState(false)

  const copyCode = async (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setCopying(true)
    
    await navigator.clipboard.writeText(card.bonusCode)
    toast.success('Kod kopiran!', {
      description: `${card.bonusCode} je kopiran u clipboard`
    })
    
    setTimeout(() => setCopying(false), 2000)
  }

  return (
    <div
      className="relative rounded-xl overflow-hidden aspect-[3/4] border-4"
      style={{ borderColor }}
    >
      {/* Background Image */}
      <Image
        src={card.backgroundImage}
        alt="Welcome Bonus"
        fill
        className="object-cover"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-black/70" />

      {/* Tag */}
      {card.tag && (
        <div
          className="absolute top-0 right-0 z-10 px-4 py-2 text-sm font-bold uppercase shadow-lg"
          style={{
            backgroundColor: card.tag.color,
            color: card.tag.textColor,
            clipPath: 'polygon(0 0, 100% 0, 100% 100%, 15% 100%)'
          }}
        >
          {card.tag.name}
        </div>
      )}

      {/* Content */}
      <div className="absolute inset-0 p-6 flex flex-col justify-between items-center text-center">
        {/* Title */}
        <h3 className="text-3xl font-bold text-yellow-400 drop-shadow-lg">
          Bonus
        </h3>

        {/* Code Box */}
        <div className="w-full bg-black/70 backdrop-blur-sm rounded-lg p-4 border-2 border-yellow-500">
          <div className="flex items-center justify-between">
            <span className="text-white font-mono text-lg">
              Kod: <span className="font-bold text-yellow-400">{card.bonusCode}</span>
            </span>
            <button
              onClick={copyCode}
              disabled={copying}
              className="text-white hover:text-yellow-400 transition-colors"
            >
              {copying ? <CheckIcon className="w-5 h-5" /> : <CopyIcon className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Benefits */}
        <div className="w-full space-y-2">
          {card.benefits.map((benefit, index) => (
            <div key={index} className="text-white text-left flex items-start">
              <span className="text-yellow-400 mr-2">•</span>
              <span>{benefit}</span>
            </div>
          ))}
        </div>

        {/* Button */}
        
          href={vavadaLink}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full bg-yellow-500 hover:bg-yellow-400 text-black font-bold py-3 px-6 rounded-lg transition-colors"
        >
          Iskoristi Kod
        </a>
      </div>
    </div>
  )
}
4. TOAST NOTIFICATION SETUP
Install Sonner (or use your preferred toast library):
npm install sonner
Add to root layout:
// app/layout.tsx
import { Toaster } from 'sonner'

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <Toaster position="bottom-right" richColors />
      </body>
    </html>
  )
}
5. STYLING REQUIREMENTS
Tailwind Configuration
Add fade-in animation:
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      animation: {
        fadeIn: 'fadeIn 0.3s ease-in-out'
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'scale(0.9)' },
          '100%': { opacity: '1', transform: 'scale(1)' }
        }
      }
    }
  }
}
Responsive Grid (Future Mobile Support)
// For later: add responsive classes
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
6. IMPLEMENTATION CHECKLIST
Step 1: Sanity Schema Setup

 Create cardTag.ts schema
 Create cardTypeConfig.ts schema
 Create bonusCard.ts schema
 Create playCard.ts schema
 Create welcomeCard.ts schema
 Add all schemas to Sanity config
 Deploy schemas to Sanity Studio

Step 2: Sanity Studio - Add Sample Data

 Create 2-3 tags (NEW, HOT, VIP) with colors
 Configure card type border colors in cardTypeConfig
 Create 2-3 sample Bonus Cards
 Create 2-3 sample Play Cards
 Create 1 Welcome Card

Step 3: Create Components

 Create GameCardsGrid.tsx
 Create BonusCard.tsx
 Create PlayCard.tsx
 Create WelcomeCard.tsx
 Add copy icons (use lucide-react or similar)

Step 4: Data Fetching

 Create unified query in lib/sanity/queries.ts
 Fetch data in landing page
 Merge and sort cards by order
 Pass data to GameCardsGrid component

Step 5: Toast Setup

 Install Sonner: npm install sonner
 Add Toaster to root layout
 Test copy functionality

Step 6: Styling & Polish

 Add fade-in animation to Tailwind config
 Style tag ribbons with clip-path
 Test hover states on Play Cards
 Ensure all cards have identical dimensions
 Test border colors from Sanity

Step 7: Integration

 Replace placeholder GameGrid with new GameCardsGrid
 Ensure section has id="games-section" for scroll navigation
 Test with MiddleBar "Pokupi Bonuse" button
 Verify Vavada link integration

Step 8: Testing

 Test card ordering (change order numbers in Sanity)
 Test tag display (with and without tags)
 Test code copying on all card types
 Test Play Card hover animations
 Test all external links open in new tabs
 Test with different border colors


7. KEY IMPLEMENTATION NOTES
Card Dimensions

Aspect Ratio: 3:4 (width:height)
Grid Gap: 24px (gap-6)
Container: max-w-7xl with padding

Border Colors

Fetched from cardTypeConfig in Sanity
Applied via inline styles: style={{ borderColor }}
Border width: 4px (border-4)

Tag Styling

Position: Absolute top-right
Style: Diagonal ribbon using clip-path: polygon()
Colors: Both background and text configurable per tag
Conditional: Only renders if tag is set

Copy Functionality

Uses navigator.clipboard.writeText()
Shows toast notification with Sonner
Icon changes to checkmark for 2 seconds
Prevents event bubbling with e.stopPropagation()

Play Card Hover

Image dims: brightness-50 on hover
Play button fades in with animation
Entire card is clickable link
Opens Vavada in new tab


8. SANITY STUDIO WORKFLOW
After implementation, content editors can:

Create Tags:

Go to "Card Tags" in Sanity Studio
Add tag name (NEW, HOT, etc.)
Choose tag color and text color
Save


Configure Border Colors:

Go to "Card Type Configuration"
Set border color for each card type
Save (applies to all cards of that type)


Create Cards:

Choose card type (Bonus/Play/Welcome)
Upload background/game image
Add title, code, benefits, etc.
Optionally select a tag
Set order number (determines display position)
Toggle active/inactive
Publish


Reorder Cards:

Simply change the "Display Order" field
Lower numbers appear first
Site automatically updates




FINAL NOTES

Performance: Use Next.js Image component for optimized images
Accessibility: All buttons have proper ARIA labels
Future Mobile: Grid already structured for responsive breakpoints
Card Types: Easy to extend - just add new schema and component
Order System: Supports any number of cards with flexible ordering

Claude Code, implement this specification step-by-step. Start with Sanity schemas, then components, then integration. Test each card type individually before testing the complete grid. Ask questions if anything is unclear!