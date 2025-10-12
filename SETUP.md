# CasinoHub Influencer - Setup Guide

## Project Overview

A promotional one-page website for a gaming influencer to post bonus codes and showcase tournaments. Built with Next.js 15, Sanity CMS, and Tailwind CSS.

## Phase 1 Features ✅

- ✅ Desktop-only responsive design (1024px+)
- ✅ Header with language toggle (EN/SR)
- ✅ Hero gallery with auto-play carousel
- ✅ Middle bar with 3 feature boxes
- ✅ Game cards grid (placeholder for Phase 1)
- ✅ Tournament cards with live countdown timers
- ✅ Footer with social media links
- ✅ Vavada-style animated background
- ✅ Dual language support (English/Serbian)
- ✅ SEO optimization

## Prerequisites

- Node.js 18+ installed
- pnpm package manager
- A Sanity account (free at https://www.sanity.io)

## Step 1: Clone and Install

```bash
cd casinohub-influencer
pnpm install
```

## Step 2: Set Up Sanity Project

1. Go to https://www.sanity.io/manage
2. Click "Create Project"
3. Name it "CasinoHub Influencer"
4. Choose "Production" dataset
5. Copy your Project ID

## Step 3: Configure Environment Variables

Open `.env.local` and update:

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=your-project-id-here
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2024-01-01
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

## Step 4: Start Development Server

```bash
pnpm dev
```

The site will be available at: http://localhost:3000

## Step 5: Access Sanity Studio

Navigate to: http://localhost:3000/studio

On first visit, you'll be prompted to log in with your Sanity account.

## Step 6: Add Initial Content

### 1. Create Site Settings (optional)

- Go to "Site Settings" in the studio
- Add site title, description
- Choose background theme (default: Vavada)
- Add social media links

### 2. Create Hero Gallery

- Go to "Hero Gallery Settings"
- Upload 3-5 hero images (recommended: 1920x800px)
- Set auto-play speed (default: 5 seconds)
- Add alt text for each image (EN/SR)

### 3. Add Tournaments

- Go to "Tournament" → Click "+"
- Fill in tournament details:
  - Name (EN/SR)
  - Description (EN/SR)
  - Upload tournament image (800x600px recommended)
  - Prize pool (e.g., "$50,000 Prize Pool")
  - Number of players
  - Buy-in amount
  - Winner prize
  - Table type (EN/SR)
  - **Important**: Set end date/time in the future
  - Add join link (external tournament URL)
  - Toggle "Is Active" to true

## Project Structure

```
/app
  /[locale]              # Internationalized routes
    /page.tsx            # Main page
    /layout.tsx          # Locale-specific layout
  /components            # React components
  /hooks                 # Custom hooks (useCountdown)
  /lib                   # Sanity client & queries
  /studio                # Sanity Studio route
  /globals.css           # Global styles
/messages
  /en.json              # English translations
  /sr.json              # Serbian translations
/sanity
  /schemas              # Sanity content schemas
/public                 # Static assets
```

## Available Routes

- `/` or `/en` - English homepage
- `/sr` - Serbian homepage
- `/studio` - Sanity CMS dashboard

## Key Components

### Header
- Logo (links to top)
- Language toggle (EN/SR)

### HeroGallery
- Auto-playing carousel
- CMS-managed images
- Configurable speed

### MiddleBar
- 3 feature boxes
- Icons: Games, Tournaments, Rewards
- "Coming Soon" placeholders

### GameGrid
- 3x2 grid of game cards
- Placeholder data (will be CMS-managed in Phase 2)
- HOT badges
- Player counts & prize pools

### TournamentGrid
- Full CMS integration
- Live countdown timers
- Tournament details from Sanity
- External join links

### Footer
- Social media buttons (Kick, Instagram, Discord)
- Footer links (Privacy, Terms, Support)
- Responsible gaming disclaimer

## Customization

### Change Colors

Edit `app/globals.css`:

```css
:root {
  --primary-orange: #FFA500;
  --bg-dark: #0A0A0A;
  --card-bg: #1E2A3A;
  /* ... more colors */
}
```

### Change Background Theme

In Sanity Studio → Site Settings → Background Theme:
- Vavada Style (default)
- Minimal Dark
- Animated Gradient
- Geometric Grid
- Particle Field

### Update Translations

Edit `messages/en.json` and `messages/sr.json` files.

## Deployment

### Vercel (Recommended)

1. Push code to GitHub
2. Connect repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy!

### Environment Variables for Production

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=your-project-id
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2024-01-01
NEXT_PUBLIC_SITE_URL=https://yourdomain.com
```

## Troubleshooting

### Dev server won't start
- Make sure you ran `pnpm install`
- Check that Node.js 18+ is installed
- Try deleting `.next` folder and restart

### Sanity Studio shows error
- Verify Project ID in `.env.local`
- Make sure you're logged in to Sanity
- Check that dataset is "production"

### Images not loading
- Verify Unsplash is not blocked
- Check browser console for errors
- In production, replace placeholder images with client assets

### Language toggle not working
- Clear browser cache
- Check middleware configuration
- Verify translation files exist

## Phase 2 Features (Coming Next Week)

- Mobile responsive design
- Full game card CMS integration
- Mobile navigation menu
- Google Analytics
- Client training documentation
- Performance optimizations

## Support

For issues or questions:
- Check the troubleshooting section above
- Review Next.js docs: https://nextjs.org/docs
- Review Sanity docs: https://www.sanity.io/docs
- Contact developer: [Your contact info]

## Notes

- Desktop-only for Phase 1 (screens 1024px+)
- Game cards are placeholders (Phase 2 will make them CMS-managed)
- All placeholder images are from Unsplash
- Countdown timers update every second
- Social links are placeholders until client provides real URLs
