# CasinoHub - Influencer Gaming Website

A Next.js 14 application for casino gaming influencers with live tournament countdowns, multilingual support (EN/SR), and Sanity CMS integration.

## 🚀 Features

### Phase 1 (Desktop Only - 1024px+)
✅ **Sticky Header** with logo and language toggle (top-right)
✅ **Hero Gallery** - Auto-playing image carousel (CMS-managed)
✅ **Middle Bar** - 3 quick access link placeholders
✅ **Game Cards** - 6 placeholder game cards (3x2 grid)
✅ **Tournament Cards** - Live countdown timers with real-time updates
✅ **Footer** - Social media links (Kick, Instagram, Discord)
✅ **Theme Selector** - 5 background themes with localStorage persistence
✅ **Internationalization** - English/Serbian with next-intl
✅ **Sanity CMS** - Full headless CMS integration

## 🛠️ Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Animations:** Framer Motion
- **CMS:** Sanity
- **i18n:** next-intl
- **Deployment:** Vercel (recommended)

## 📦 Installation

### 1. Install Dependencies
```bash
npm install
```

### 2. Environment Variables
Create `.env.local`:
```env
NEXT_PUBLIC_SANITY_PROJECT_ID=mvvp79j4
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2024-01-01
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### 3. Set Up Sanity Studio
See `/sanity-schemas/README.md` for detailed setup instructions.

Quick steps:
1. Install Sanity CLI: `npm install -g @sanity/cli`
2. Copy schemas from `/sanity-schemas/` to your Sanity Studio
3. Import schemas in `sanity.config.ts`
4. Run `sanity dev` to start studio
5. Add content (tournaments, hero images, site settings)

### 4. Run Development Server
```bash
npm run dev
```

Visit: http://localhost:3000

## 🎨 Key Components

### Tournament Cards (Critical Feature)
- **Live Countdown**: Updates every 1 second
- **Urgent State**: Red pulsing when < 1 hour remaining
- **Expired State**: Shows "Tournament Ended", disables join button
- **Stats Grid**: Players, Buy-In, Winner Prize, Table Type

### Theme Selector
- 5 themes: Vavada, Minimal, Gradient, Geometric, Particles
- Fixed bottom-right button
- localStorage persistence

### Language Toggle
- Top-right header position
- Instant UI update (EN/SR)
- localStorage + URL routing

## 🗂️ Sanity CMS Schemas

1. **Tournament** - Live tournaments with countdowns
2. **Hero Gallery** - Auto-playing carousel images
3. **Site Settings** - Social links & SEO

## 🚀 Deployment

### Vercel
1. Push to GitHub
2. Import project in Vercel
3. Set environment variables
4. Deploy

### Deploy Sanity Studio
```bash
cd sanity-studio
npx sanity deploy
```

## 🧪 Testing Checklist

- [ ] Language toggle works and persists
- [ ] Tournament countdown updates in real-time
- [ ] Hero gallery auto-plays
- [ ] Theme selector saves choice
- [ ] Social links open correctly

## 📝 Phase 2 Roadmap

- Mobile responsive (<1024px)
- Game bonus codes + copy functionality
- Google Analytics 4

---

**Built with ❤️ using Next.js 14, TypeScript, and Sanity CMS**
