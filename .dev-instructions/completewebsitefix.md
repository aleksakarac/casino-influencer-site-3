# CasinoHub Website - Complete Component Specifications

## Table of Contents
1. [App Structure & Navigation](#app-structure--navigation)
2. [Navbar Component](#navbar-component)
3. [Image Gallery (Carousel)](#image-gallery-carousel)
4. [Middle Bar (Navigation Tabs)](#middle-bar-navigation-tabs)
5. [HomePage Components](#homepage-components)
   - [Content Grid (Featured Games)](#content-grid-featured-games)
   - [Tournament Card](#tournament-card)
6. [Footer Component](#footer-component)
7. [Color Palette & Design System](#color-palette--design-system)
8. [Animation Timeline](#animation-timeline)
9. [Required Imports & Libraries](#required-imports--libraries)

---

## App Structure & Navigation

### Main App Container
```tsx
<div className="min-h-screen bg-gradient-to-b from-gray-900 via-black to-gray-900">
  <Navbar />
  <ImageGallery />
  <MiddleBar />
  {renderPage()}
  <Toaster />
</div>
```

### Navigation Provider
```tsx
// Navigation types
export type Page = 'home' | 'leaderboard' | 'events' | 'links' | 'vavada';

// Context structure
interface NavigationContextType {
  currentPage: Page;
  navigateTo: (page: Page) => void;
}

// Features:
// - Manages current page state
// - Smooth scroll to top on navigation
// - Behavior: window.scrollTo({ top: 0, behavior: 'smooth' })
```

### HomePage Structure
```tsx
export function HomePage() {
  return (
    <>
      <ContentGrid />
      <TournamentCard />
      <Footer />
    </>
  );
}
```

**Specifications:**
- Background: `bg-gradient-to-b from-gray-900 via-black to-gray-900`
- Min height: `min-h-screen`
- Page order: Navbar → Gallery → MiddleBar → Content → Footer

---

## Navbar Component

### Container
```tsx
<motion.nav 
  initial={{ y: -100 }}
  animate={{ y: 0 }}
  className="relative h-16 bg-gradient-to-r from-gray-900 via-black to-gray-900 border-b border-amber-500/30 backdrop-blur-sm"
>
```

### Background Overlay
```tsx
<div className="absolute inset-0 bg-gradient-to-r from-amber-500/10 via-transparent to-amber-500/10 opacity-20" />
```

### Content Container
```tsx
<div className="relative max-w-7xl mx-auto px-4 h-full flex items-center justify-center sm:justify-between">
```

### Logo & Brand
```tsx
<motion.div 
  initial={{ opacity: 0, x: -20 }}
  animate={{ opacity: 1, x: 0 }}
  className="flex items-center space-x-2 cursor-pointer"
  onClick={() => navigateTo('home')}
>
  <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-amber-400 to-yellow-600 shadow-lg" />
  <h1 className="text-2xl font-bold bg-gradient-to-r from-amber-400 to-yellow-600 bg-clip-text text-transparent">
    CasinoHub
  </h1>
</motion.div>
```

### Bottom Glow Effect
```tsx
<div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1/3 h-px bg-gradient-to-r from-transparent via-amber-400 to-transparent opacity-60" />
```

**Specifications:**
- Height: `h-16` (64px)
- Background: `bg-gradient-to-r from-gray-900 via-black to-gray-900`
- Border bottom: `border-b border-amber-500/30`
- Logo size: `w-8 h-8` (32px square)
- Logo gradient: `from-amber-400 to-yellow-600`
- Title font size: `text-2xl`
- Title gradient: `from-amber-400 to-yellow-600 bg-clip-text text-transparent`
- Max width: `max-w-7xl`
- Padding: `px-4`
- Mobile: Centered (`justify-center`)
- Desktop: Left-aligned (`sm:justify-between`)
- Animation: Slides down from top (`initial={{ y: -100 }}`)
- Logo animation: Fades in from left (`initial={{ opacity: 0, x: -20 }}`)
- Backdrop blur: `backdrop-blur-sm`
- Clickable: Navigates to home page

---

## Image Gallery (Carousel)

### Container
```tsx
<div className="relative h-36 md:h-64 w-full overflow-hidden bg-black">
```

### Image Slide (AnimatePresence)
```tsx
<AnimatePresence mode="wait">
  <motion.div
    key={currentIndex}
    initial={{ opacity: 0, scale: 1.1 }}
    animate={{ opacity: 1, scale: 1 }}
    exit={{ opacity: 0, scale: 0.95 }}
    transition={{ duration: 0.8, ease: "easeInOut" }}
    className="absolute inset-0"
  >
```

### Image & Overlays
```tsx
{/* Main Image */}
<ImageWithFallback
  src={galleryImages[currentIndex].url}
  alt={galleryImages[currentIndex].title}
  className="w-full h-full object-cover"
/>

{/* Dark overlay */}
<div className="absolute inset-0 bg-black/40" />

{/* Gradient overlay */}
<div className="absolute inset-0 bg-gradient-to-r from-amber-500/30 to-yellow-500/30 opacity-30" />
```

### Content Overlay
```tsx
<div className="absolute inset-0 flex items-center justify-center">
  <motion.div
    initial={{ y: 30, opacity: 0 }}
    animate={{ y: 0, opacity: 1 }}
    transition={{ delay: 0.3, duration: 0.6 }}
    className="text-center"
  >
    <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 drop-shadow-2xl">
      {galleryImages[currentIndex].title}
    </h2>
    <div className="w-24 h-1 bg-gradient-to-r from-amber-400 to-yellow-600 mx-auto rounded-full shadow-lg" />
  </motion.div>
</div>
```

### Slide Indicators
```tsx
<div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
  {galleryImages.map((_, index) => (
    <motion.button
      key={index}
      onClick={() => setCurrentIndex(index)}
      className={`w-3 h-3 rounded-full transition-all duration-300 ${
        index === currentIndex 
          ? 'bg-amber-400 shadow-lg shadow-amber-400/50' 
          : 'bg-white/30 hover:bg-white/50'
      }`}
      whileHover={{ scale: 1.2 }}
      whileTap={{ scale: 0.9 }}
    />
  ))}
</div>
```

### Bottom Decorative Border
```tsx
<div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-amber-400 to-transparent opacity-60" />
```

**Specifications:**
- Height mobile: `h-36` (144px)
- Height desktop: `md:h-64` (256px)
- Background: `bg-black`
- Auto-change interval: 4000ms (4 seconds)
- Image transition duration: 800ms
- Image animation: Zoom in effect (`scale: 1.1` to `1`)
- Exit animation: Scale down to 0.95
- Title font size mobile: `text-4xl`
- Title font size desktop: `md:text-5xl`
- Title color: `text-white`
- Title shadow: `drop-shadow-2xl`
- Title margin bottom: `mb-4`
- Underline bar: Width `w-24`, Height `h-1`
- Underline gradient: `from-amber-400 to-yellow-600`
- Underline shape: `rounded-full`
- Dark overlay: `bg-black/40`
- Gradient overlay: `from-amber-500/30 to-yellow-500/30 opacity-30`
- Content animation delay: 0.3s
- Content animation: Slides up from `y: 30`
- Indicators size: `w-3 h-3`
- Active indicator: `bg-amber-400 shadow-lg shadow-amber-400/50`
- Inactive indicator: `bg-white/30`
- Indicator hover: `hover:bg-white/50`
- Indicator position: `bottom-4`
- Indicators gap: `space-x-2`
- Bottom border height: `h-1`
- Bottom border gradient: `from-transparent via-amber-400 to-transparent`
- Bottom border opacity: `opacity-60`
- Overflow: `overflow-hidden`

**Gallery Images Array:**
```tsx
const galleryImages = [
  {
    url: "...",
    title: "Premium Slots Experience"
  },
  {
    url: "...",
    title: "Elite Poker Tables"
  },
  {
    url: "...",
    title: "Luxury Roulette"
  }
];
```

---

## Middle Bar (Navigation Tabs)

### Container
```tsx
<div className="relative bg-gradient-to-r from-gray-900 via-slate-900 to-gray-900 border-b border-white/5">
  {/* Subtle background overlay */}
  <div className="absolute inset-0 bg-gradient-to-r from-amber-500/5 via-transparent to-amber-500/5 opacity-20" />
  
  <div className="relative max-w-7xl mx-auto px-4">
```

### Tab Bar Background
```tsx
{/* Tabs bar background - simulates Chrome's tab bar */}
<div className="absolute bottom-0 left-0 right-0 h-px bg-white/10" />
```

### Tabs Container
```tsx
<div className="flex justify-center items-end gap-1">
```

### Individual Tab Button
```tsx
<motion.button
  key={index}
  onClick={item.action}
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ delay: index * 0.08 }}
  className={`
    group relative flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2 px-2 sm:px-4 py-3 sm:py-4 
    transition-all duration-300 cursor-pointer min-w-[60px] sm:min-w-[140px]
    bg-transparent border-0
    ${isActive 
      ? 'bg-black/40 rounded-t-xl border-t border-x border-white/10' 
      : 'hover:bg-white/5 rounded-t-lg'
    }
  `}
  style={{
    marginBottom: isActive ? '-1px' : '0',
    paddingBottom: isActive ? 'calc(0.75rem + 1px)' : '0.75rem'
  }}
>
```

### Chrome Tab Curves (Active Only)
```tsx
{isActive && (
  <>
    {/* Left curve */}
    <div className="absolute left-0 bottom-0 w-2 h-2 overflow-hidden">
      <div className="absolute bottom-0 left-0 w-4 h-4 bg-white/10 rounded-br-full" />
    </div>
    {/* Right curve */}
    <div className="absolute right-0 bottom-0 w-2 h-2 overflow-hidden">
      <div className="absolute bottom-0 right-0 w-4 h-4 bg-white/10 rounded-bl-full" />
    </div>
    
    {/* Active tab highlight */}
    <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent rounded-t-xl pointer-events-none" />
  </>
)}
```

### Icon Container
```tsx
<div 
  className={`
    relative p-1.5 sm:p-2 rounded-lg transition-all duration-300
    ${isActive 
      ? `bg-gradient-to-br ${item.color} shadow-lg` 
      : 'bg-gray-800/50 group-hover:bg-gradient-to-br group-hover:' + item.color
    }
  `}
>
  <item.icon 
    size={16} 
    className={`sm:w-[18px] sm:h-[18px] ${isActive ? 'text-white' : 'text-gray-400 group-hover:text-white'} transition-colors duration-300`}
    strokeWidth={2.5} 
  />
  
  {/* Icon glow effect on active */}
  {isActive && (
    <div className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-50 blur-lg rounded-lg -z-10`} />
  )}
</div>
```

### Text Label
```tsx
<span 
  className={`
    text-[10px] sm:text-xs font-bold tracking-wide transition-colors duration-300 text-center
    ${isActive 
      ? 'text-white ' + item.textColor.replace('text-', 'drop-shadow-[0_0_8px_var(--tw-shadow-color)] shadow-')
      : item.textColor + ' group-hover:text-white'
    }
  `}
>
  {item.title}
</span>
```

### Active Indicator Line
```tsx
{isActive && (
  <motion.div 
    layoutId="activeTab"
    className={`absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r ${item.color}`}
    transition={{ type: "spring", stiffness: 380, damping: 30 }}
  />
)}
```

### Top Decorative Line
```tsx
<div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
```

**Navigation Items Data:**
```tsx
const items = [
  { 
    icon: ExternalLink, 
    title: "VAVADA", 
    color: "from-cyan-400 to-teal-500", 
    textColor: "text-cyan-400", 
    action: () => navigateTo('vavada'),
    isPage: true,
    pageId: 'vavada'
  },
  { 
    icon: Home, 
    title: "Pokupi bonuse", 
    color: "from-orange-400 to-red-500", 
    textColor: "text-orange-400", 
    action: () => navigateTo('home'),
    isPage: true,
    pageId: 'home'
  },
  { 
    icon: Trophy, 
    title: "Rang lista", 
    color: "from-purple-400 to-indigo-500", 
    textColor: "text-purple-400", 
    action: () => navigateTo('leaderboard'),
    isPage: true,
    pageId: 'leaderboard'
  },
  { 
    icon: Calendar, 
    title: "Turniri", 
    color: "from-amber-400 to-yellow-500", 
    textColor: "text-amber-400", 
    action: () => scrollToSection('events'),
    isPage: false,
    pageId: null
  },
  { 
    icon: Link, 
    title: "Social", 
    color: "from-green-400 to-emerald-500", 
    textColor: "text-green-400", 
    action: () => scrollToSection('links'),
    isPage: false,
    pageId: null
  }
];
```

**Specifications:**
- Background: `bg-gradient-to-r from-gray-900 via-slate-900 to-gray-900`
- Border bottom: `border-b border-white/5`
- Overlay gradient: `from-amber-500/5 via-transparent to-amber-500/5 opacity-20`
- Tab layout mobile: `flex-col` (icon above text)
- Tab layout desktop: `sm:flex-row` (icon beside text)
- Tab min width mobile: `min-w-[60px]`
- Tab min width desktop: `sm:min-w-[140px]`
- Tab padding mobile: `px-2 py-3`
- Tab padding desktop: `sm:px-4 sm:py-4`
- Tab gap mobile: `gap-1`
- Tab gap desktop: `sm:gap-2`
- Tabs container gap: `gap-1`
- Active tab background: `bg-black/40`
- Active tab border radius: `rounded-t-xl`
- Active tab border: `border-t border-x border-white/10`
- Inactive hover background: `hover:bg-white/5`
- Inactive hover border radius: `rounded-t-lg`
- Active tab extends below border: `marginBottom: -1px`
- Active tab extra padding: `paddingBottom: calc(0.75rem + 1px)`
- Icon padding mobile: `p-1.5`
- Icon padding desktop: `sm:p-2`
- Icon size mobile: `16px`
- Icon size desktop: `sm:w-[18px] sm:h-[18px]`
- Icon stroke width: `strokeWidth={2.5}`
- Active icon background: Gradient with item color + `shadow-lg`
- Inactive icon background: `bg-gray-800/50`
- Active icon color: `text-white`
- Inactive icon color: `text-gray-400`
- Icon hover background: Gradient with item color
- Icon glow blur: `blur-lg`
- Icon glow opacity: `opacity-50`
- Text size mobile: `text-[10px]`
- Text size desktop: `sm:text-xs`
- Text font weight: `font-bold`
- Text tracking: `tracking-wide`
- Active text color: `text-white`
- Inactive text color: Item's textColor
- Active text shadow: Drop shadow with color
- Text hover color: `text-white`
- Active indicator height: `h-0.5`
- Active indicator gradient: Item's color gradient
- Active indicator animation: Spring transition (stiffness: 380, damping: 30)
- Active indicator layoutId: `"activeTab"` (for smooth transitions)
- Tab animation: Stagger by `0.08s` per tab
- Tab initial animation: `opacity: 0, y: 20`
- Chrome curve size: `w-2 h-2` (visible area), `w-4 h-4` (actual curve)
- Chrome curve position: Bottom corners
- Top decorative line height: `h-px`
- Top decorative line gradient: `from-transparent via-white/10 to-transparent`

**Scroll Behavior:**
- For page navigation: Uses `navigateTo()` function
- For section scrolling: Uses `scrollToSection()` function
- Scroll behavior: `{ behavior: 'smooth', block: 'start' }`
- If not on home page: Navigates to home first, then scrolls after 100ms

---

## HomePage Components

### Content Grid (Featured Games)

#### Container
```tsx
<div className="pt-8 pb-6 bg-gradient-to-b from-gray-900 to-black">
  <div className="max-w-7xl mx-auto px-4 lg:px-8">
```

#### Section Header
```tsx
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  className="text-center mb-8"
>
  <h2 className="text-3xl font-bold bg-gradient-to-r from-amber-400 to-yellow-600 bg-clip-text text-transparent mb-2">
    Featured Games
  </h2>
  <p className="text-gray-400">Experience premium casino gaming</p>
</motion.div>
```

#### Games Grid
```tsx
<div className="grid grid-cols-2 md:grid-cols-3 gap-6 lg:gap-6 px-[12.5%]">
```

#### Individual Game Card
```tsx
<motion.div
  key={game.id}
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ delay: index * 0.1 }}
  whileHover={{ y: -8, scale: 1.05 }}
  className="group cursor-pointer aspect-square md:aspect-auto"
>
  <div className="relative bg-gradient-to-b from-gray-800/90 to-black/90 border border-amber-500/30 rounded-xl overflow-hidden backdrop-blur-sm hover:border-amber-400/60 transition-all duration-300 hover:shadow-2xl hover:shadow-amber-500/20 h-full flex flex-col">
```

#### Hot Badge
```tsx
{game.hot && (
  <div className="absolute top-2 right-2 z-10 bg-gradient-to-r from-red-500 to-orange-500 text-white text-xs px-2 py-1 rounded-md flex items-center gap-1">
    <Flame size={10} />
    HOT
  </div>
)}
```

#### Game Image
```tsx
<div className="relative h-32 md:h-24 lg:h-32 overflow-hidden flex-shrink-0">
  <ImageWithFallback
    src={game.image}
    alt={game.title}
    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
  />
  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
  
  {/* Play Button Overlay */}
  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
    <div className="w-12 h-12 bg-amber-500/90 rounded-full flex items-center justify-center backdrop-blur-sm">
      <Play size={16} className="text-black ml-1" fill="currentColor" />
    </div>
  </div>
</div>
```

#### Game Info Section
```tsx
<div className="p-3">
  <div className="flex items-center gap-1 mb-1">
    <game.icon size={12} className="text-amber-400" />
    <h3 className="text-white text-sm font-semibold truncate group-hover:text-amber-200 transition-colors">
      {game.title}
    </h3>
  </div>
  
  <p className="text-gray-400 text-xs mb-2 truncate">
    {game.subtitle}
  </p>

  {/* Stats */}
  <div className="flex justify-between items-center text-xs">
    <div className="flex items-center gap-1 text-green-400">
      <Users size={10} />
      <span>{game.players}</span>
    </div>
    <div className="flex items-center gap-1 text-amber-400">
      <Trophy size={10} />
      <span>{game.jackpot}</span>
    </div>
  </div>
</div>
```

#### Hover Glow Effect
```tsx
<div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl bg-gradient-to-r from-amber-500/10 via-transparent to-amber-500/10 pointer-events-none" />
```

#### View All Button
```tsx
<motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ delay: 0.8 }}
  className="text-center mt-8"
>
  <button className="px-8 py-3 bg-gradient-to-r from-amber-500 to-yellow-600 text-black font-semibold rounded-xl hover:from-amber-400 hover:to-yellow-500 transition-all duration-300 hover:shadow-lg hover:shadow-amber-500/30 transform hover:scale-105">
    View All Games
  </button>
</motion.div>
```

**Game Card Specifications:**
- Grid columns mobile: `grid-cols-2`
- Grid columns desktop: `md:grid-cols-3`
- Gap: `gap-6 lg:gap-6`
- Horizontal padding: `px-[12.5%]` (centers grid with padding)
- Card aspect ratio mobile: `aspect-square`
- Card aspect ratio desktop: `md:aspect-auto`
- Card background: `bg-gradient-to-b from-gray-800/90 to-black/90`
- Card border: `border border-amber-500/30`
- Card hover border: `hover:border-amber-400/60`
- Card border radius: `rounded-xl`
- Card shadow on hover: `hover:shadow-2xl hover:shadow-amber-500/20`
- Card hover animation: `y: -8, scale: 1.05`
- Card animation delay: `index * 0.1` (staggered)
- Hot badge position: `top-2 right-2`
- Hot badge gradient: `from-red-500 to-orange-500`
- Hot badge font size: `text-xs`
- Hot badge padding: `px-2 py-1`
- Hot badge icon size: `10px`
- Image height mobile: `h-32`
- Image height tablet: `md:h-24`
- Image height desktop: `lg:h-32`
- Image hover scale: `group-hover:scale-110`
- Image overlay: `bg-gradient-to-t from-black/60 via-transparent to-transparent`
- Play button size: `w-12 h-12`
- Play button background: `bg-amber-500/90`
- Play button shape: `rounded-full`
- Play button icon size: `16px`
- Play button position offset: `ml-1` (centers play triangle)
- Play button visibility: `opacity-0` → `group-hover:opacity-100`
- Info padding: `p-3`
- Title icon size: `12px`
- Title icon color: `text-amber-400`
- Title font size: `text-sm`
- Title font weight: `font-semibold`
- Title color: `text-white`
- Title hover color: `group-hover:text-amber-200`
- Subtitle font size: `text-xs`
- Subtitle color: `text-gray-400`
- Subtitle margin: `mb-2`
- Stats font size: `text-xs`
- Stats icon size: `10px`
- Players color: `text-green-400`
- Jackpot color: `text-amber-400`
- Hover glow: `from-amber-500/10 via-transparent to-amber-500/10`
- Button padding: `px-8 py-3`
- Button gradient: `from-amber-500 to-yellow-600`
- Button hover gradient: `hover:from-amber-400 hover:to-yellow-500`
- Button shadow on hover: `hover:shadow-lg hover:shadow-amber-500/30`
- Button scale on hover: `hover:scale-105`
- Button text color: `text-black`
- Button font: `font-semibold`
- Button border radius: `rounded-xl`
- Section padding top: `pt-8`
- Section padding bottom: `pb-6`
- Section background: `bg-gradient-to-b from-gray-900 to-black`
- Header margin bottom: `mb-8`
- Button margin top: `mt-8`
- Button animation delay: `0.8s`

**Game Data Structure:**
```tsx
interface Game {
  id: number;
  title: string;
  subtitle: string;
  image: string;
  players: string;
  jackpot: string;
  hot: boolean;
  icon: LucideIcon;
}

// Example:
{
  id: 1,
  title: "Ultra Slots",
  subtitle: "Premium Slot Games",
  image: "https://...",
  players: "2.4k",
  jackpot: "$125k",
  hot: true,
  icon: Flame
}
```

---

### Tournament Card

#### Container
```tsx
<div id="events" className="pt-6 pb-12 bg-gradient-to-b from-black to-gray-900 scroll-mt-32">
  <div className="max-w-4xl mx-auto px-4">
```

#### Section Header
```tsx
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  className="text-center mb-8"
>
  <h2 className="text-3xl font-bold bg-gradient-to-r from-amber-400 to-yellow-600 bg-clip-text text-transparent mb-2">
    Featured Tournament
  </h2>
  <p className="text-gray-400">Join the ultimate gaming competition</p>
</motion.div>
```

#### Card Wrapper
```tsx
<motion.div
  initial={{ opacity: 0, scale: 0.95 }}
  animate={{ opacity: 1, scale: 1 }}
  transition={{ delay: 0.2 }}
  whileHover={{ scale: 1.02 }}
  className="group"
>
  <Card className="bg-gradient-to-b from-gray-800/90 to-black/90 border-amber-500/30 backdrop-blur-sm overflow-hidden relative">
```

#### Background Glow
```tsx
<div className="absolute inset-0 bg-gradient-to-r from-amber-500/5 to-yellow-500/5 opacity-5 group-hover:opacity-10 transition-opacity duration-500" />
```

#### Grid Layout
```tsx
<div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
```

#### Image Section
```tsx
<div className="relative h-64 lg:h-auto overflow-hidden">
  <ImageWithFallback
    src="..."
    alt="Championship Tournament"
    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
  />
  <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent" />
  
  {/* Prize pool badge */}
  <div className="absolute top-4 left-4">
    <Badge className="bg-gradient-to-r from-amber-400 to-yellow-600 text-black font-bold px-3 py-1 shadow-lg">
      $50,000 Prize Pool
    </Badge>
  </div>
</div>
```

#### Content Section
```tsx
<CardContent className="p-8 flex flex-col justify-between">
  <div>
    <CardHeader className="p-0 mb-6">
      <CardTitle className="text-2xl font-bold text-white mb-2 group-hover:text-amber-200 transition-colors duration-300">
        Championship Series 2024
      </CardTitle>
      <p className="text-gray-400 group-hover:text-gray-300 transition-colors duration-300">
        The ultimate poker tournament with massive prizes and glory
      </p>
    </CardHeader>
```

#### Tournament Stats
```tsx
<div className="grid grid-cols-2 gap-4 mb-6">
  <div className="flex items-center space-x-2">
    <Users size={16} className="text-amber-400" />
    <span className="text-sm text-gray-300">1,247 Players</span>
  </div>
  <div className="flex items-center space-x-2">
    <Trophy size={16} className="text-amber-400" />
    <span className="text-sm text-gray-300">Buy-in: $100</span>
  </div>
  <div className="flex items-center space-x-2">
    <Coins size={16} className="text-amber-400" />
    <span className="text-sm text-gray-300">Winner: $15,000</span>
  </div>
  <div className="flex items-center space-x-2">
    <Clock size={16} className="text-amber-400" />
    <span className="text-sm text-gray-300">Multi-table</span>
  </div>
</div>
```

#### Countdown Timer
```tsx
<div className="mb-6">
  <div className="flex items-center space-x-2 mb-3">
    <Clock size={16} className="text-amber-400" />
    <span className="text-sm text-gray-300">Tournament ends in:</span>
  </div>
  <div className="grid grid-cols-4 gap-2">
    {[
      { label: 'Days', value: timeLeft.days },
      { label: 'Hours', value: timeLeft.hours },
      { label: 'Min', value: timeLeft.minutes },
      { label: 'Sec', value: timeLeft.seconds }
    ].map((time, index) => (
      <div key={index} className="text-center">
        <div className="bg-gradient-to-b from-gray-700 to-gray-800 rounded-lg p-2 border border-amber-500/20 shadow-lg">
          <motion.div 
            key={time.value}
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            className="text-lg font-bold text-amber-400"
          >
            {time.value.toString().padStart(2, '0')}
          </motion.div>
        </div>
        <div className="text-xs text-gray-500 mt-1">{time.label}</div>
      </div>
    ))}
  </div>
</div>
```

#### Action Button
```tsx
<Button
  className="w-full bg-gradient-to-r from-amber-400 to-yellow-600 hover:shadow-lg hover:shadow-amber-400/25 text-black font-bold py-3 transition-all duration-300 group-hover:scale-105"
>
  Join Tournament
</Button>
```

**Tournament Card Specifications:**
- Section ID: `id="events"` (for scrolling)
- Scroll margin top: `scroll-mt-32` (offset for fixed headers)
- Section padding top: `pt-6`
- Section padding bottom: `pb-12`
- Section background: `bg-gradient-to-b from-black to-gray-900`
- Max width: `max-w-4xl`
- Card background: `bg-gradient-to-b from-gray-800/90 to-black/90`
- Card border: `border-amber-500/30`
- Card backdrop blur: `backdrop-blur-sm`
- Card hover scale: `scale: 1.02`
- Background glow opacity: `opacity-5` → `group-hover:opacity-10`
- Background glow transition: `duration-500`
- Grid columns mobile: `grid-cols-1`
- Grid columns desktop: `lg:grid-cols-2`
- Grid gap: `gap-0` (no gap between image and content)
- Image height mobile: `h-64`
- Image height desktop: `lg:h-auto` (matches content height)
- Image hover scale: `group-hover:scale-105`
- Image scale transition: `duration-500`
- Image overlay: `bg-gradient-to-r from-black/60 to-transparent`
- Prize badge position: `top-4 left-4`
- Prize badge gradient: `from-amber-400 to-yellow-600`
- Prize badge text color: `text-black`
- Prize badge font: `font-bold`
- Prize badge padding: `px-3 py-1`
- Prize badge shadow: `shadow-lg`
- Content padding: `p-8`
- Content layout: `flex flex-col justify-between`
- Header padding: `p-0` (override CardHeader default)
- Header margin bottom: `mb-6`
- Title font size: `text-2xl`
- Title font weight: `font-bold`
- Title color: `text-white`
- Title hover color: `group-hover:text-amber-200`
- Title margin bottom: `mb-2`
- Description color: `text-gray-400`
- Description hover color: `group-hover:text-gray-300`
- Stats grid: `grid-cols-2 gap-4`
- Stats margin bottom: `mb-6`
- Stats icon size: `16px`
- Stats icon color: `text-amber-400`
- Stats text size: `text-sm`
- Stats text color: `text-gray-300`
- Stats icon-text gap: `space-x-2`
- Timer header margin bottom: `mb-3`
- Timer grid: `grid-cols-4 gap-2`
- Timer box background: `bg-gradient-to-b from-gray-700 to-gray-800`
- Timer box border: `border border-amber-500/20`
- Timer box shadow: `shadow-lg`
- Timer box border radius: `rounded-lg`
- Timer box padding: `p-2`
- Timer value font size: `text-lg`
- Timer value font weight: `font-bold`
- Timer value color: `text-amber-400`
- Timer value animation: `scale: 1.1` → `1` (on change)
- Timer label font size: `text-xs`
- Timer label color: `text-gray-500`
- Timer label margin top: `mt-1`
- Timer padding format: `.padStart(2, '0')` (e.g., "05" instead of "5")
- Button width: `w-full`
- Button gradient: `from-amber-400 to-yellow-600`
- Button hover shadow: `hover:shadow-lg hover:shadow-amber-400/25`
- Button text color: `text-black`
- Button font: `font-bold`
- Button padding: `py-3`
- Button hover scale: `group-hover:scale-105`
- Button transition: `duration-300`
- Section header animation: Fades from bottom, no delay
- Card animation: Fades and scales from 0.95, delay 0.2s
- Header margin bottom: `mb-8`

**Countdown Timer Logic:**
```tsx
const [timeLeft, setTimeLeft] = useState({
  days: 0,
  hours: 23,
  minutes: 42,
  seconds: 15
});

useEffect(() => {
  const interval = setInterval(() => {
    setTimeLeft(prev => {
      let { days, hours, minutes, seconds } = prev;
      
      if (seconds > 0) {
        seconds--;
      } else if (minutes > 0) {
        minutes--;
        seconds = 59;
      } else if (hours > 0) {
        hours--;
        minutes = 59;
        seconds = 59;
      } else if (days > 0) {
        days--;
        hours = 23;
        minutes = 59;
        seconds = 59;
      }
      
      return { days, hours, minutes, seconds };
    });
  }, 1000);

  return () => clearInterval(interval);
}, []);
```

---

## Footer Component

### Container
```tsx
<footer id="links" className="relative bg-gradient-to-b from-gray-900 to-black border-t border-amber-500/20 scroll-mt-32">
  <div className="absolute inset-0 bg-gradient-to-r from-amber-500/5 via-transparent to-amber-500/5 opacity-20" />
  
  <div className="relative max-w-7xl mx-auto px-4 py-12">
```

### Header Section
```tsx
<div className="text-center mb-8">
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="mb-6"
  >
    <h3 className="text-2xl font-bold bg-gradient-to-r from-amber-400 to-yellow-600 bg-clip-text text-transparent mb-2">
      Join Our Community
    </h3>
    <p className="text-gray-400 max-w-md mx-auto">
      Connect with fellow players and stay updated on the latest tournaments and events
    </p>
  </motion.div>
```

### Social Media Buttons Container
```tsx
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ delay: 0.2 }}
  className="flex flex-row justify-center items-center gap-2 sm:gap-4 mb-8 max-w-2xl mx-auto"
>
```

### Individual Social Button
```tsx
<motion.div
  key={social.name}
  initial={{ opacity: 0, x: -20 }}
  animate={{ opacity: 1, x: 0 }}
  transition={{ delay: 0.3 + index * 0.1 }}
  whileHover={{ scale: 1.05, y: -3 }}
  whileTap={{ scale: 0.98 }}
  className="group relative"
>
  <a
    href={social.href}
    className={`relative flex items-center justify-center gap-2 px-3 py-3 sm:px-8 sm:py-4 rounded-xl ${social.bgColor} text-white font-semibold transition-all duration-300 overflow-hidden group min-w-[80px] sm:min-w-[200px] hover:shadow-2xl hover:shadow-black/30`}
  >
    {/* Background glow effect */}
    <div className="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-all duration-300" />
    
    {/* Shimmer effect */}
    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out" />
    
    {/* Content */}
    <div className="relative z-10 flex items-center justify-center gap-2 sm:gap-3">
      <social.icon 
        size={16}
        className="sm:w-5 sm:h-5 text-white group-hover:scale-110 transition-transform duration-300" 
      />
      <span className="text-xs sm:text-base text-white group-hover:text-white/90 transition-colors duration-300">
        {social.name}
      </span>
    </div>
    
    {/* Hover border glow */}
    <div className={`absolute inset-0 rounded-xl bg-gradient-to-r ${social.color} opacity-0 group-hover:opacity-30 blur-xl transition-opacity duration-300 -z-10`} />
  </a>
</motion.div>
```

### Copyright Section
```tsx
<motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ delay: 0.6 }}
  className="text-center text-gray-500 text-sm pt-6 border-t border-gray-800"
>
  <p>&copy; {new Date().getFullYear()} CasinoHub. All rights reserved.</p>
</motion.div>
```

### Bottom Decorative Line
```tsx
<div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-400/30 to-transparent" />
```

**Social Links Data:**
```tsx
const socialLinks = [
  { 
    icon: KickIcon, 
    name: "Kick", 
    href: "#", 
    color: "from-green-400 to-emerald-500",
    bgColor: "bg-green-600",
    description: "Watch stream"
  },
  { 
    icon: Instagram, 
    name: "Instagram", 
    href: "#", 
    color: "from-pink-400 to-purple-500",
    bgColor: "bg-gradient-to-r from-pink-600 to-purple-600",
    description: "Follow updates"
  },
  { 
    icon: DiscordIcon, 
    name: "Discord", 
    href: "#", 
    color: "from-indigo-400 to-purple-500",
    bgColor: "bg-indigo-600",
    description: "Join community"
  }
];
```

**Custom SVG Icons:**
```tsx
// Kick Icon
const KickIcon = ({ size = 20, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M8.5 4.5v15l7-7.5-7-7.5z" />
    <path d="M15.5 8.5L19 12l-3.5 3.5" />
  </svg>
);

// Discord Icon
const DiscordIcon = ({ size = 20, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.195.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
  </svg>
);
```

**Footer Specifications:**
- Section ID: `id="links"` (for scrolling)
- Scroll margin top: `scroll-mt-32`
- Background: `bg-gradient-to-b from-gray-900 to-black`
- Border top: `border-t border-amber-500/20`
- Overlay gradient: `from-amber-500/5 via-transparent to-amber-500/5 opacity-20`
- Max width: `max-w-7xl`
- Padding: `px-4 py-12`
- Header title font size: `text-2xl`
- Header title font weight: `font-bold`
- Header title gradient: `from-amber-400 to-yellow-600 bg-clip-text text-transparent`
- Header title margin bottom: `mb-2`
- Header description color: `text-gray-400`
- Header description max width: `max-w-md mx-auto`
- Header margin bottom: `mb-6`
- Social buttons container: `flex flex-row justify-center items-center`
- Social buttons gap mobile: `gap-2`
- Social buttons gap desktop: `sm:gap-4`
- Social buttons container margin bottom: `mb-8`
- Social buttons container max width: `max-w-2xl mx-auto`
- Individual button min width mobile: `min-w-[80px]`
- Individual button min width desktop: `sm:min-w-[200px]`
- Individual button padding mobile: `px-3 py-3`
- Individual button padding desktop: `sm:px-8 sm:py-4`
- Individual button border radius: `rounded-xl`
- Individual button font: `font-semibold`
- Individual button hover scale: `scale: 1.05, y: -3`
- Individual button tap scale: `scale: 0.98`
- Individual button hover shadow: `hover:shadow-2xl hover:shadow-black/30`
- Button icon size mobile: `16px`
- Button icon size desktop: `sm:w-5 sm:h-5`
- Button icon hover scale: `group-hover:scale-110`
- Button text size mobile: `text-xs`
- Button text size desktop: `sm:text-base`
- Button background glow: `bg-white/0` → `group-hover:bg-white/10`
- Button shimmer effect: Gradient moves from left to right on hover
- Button shimmer duration: `duration-700`
- Button hover border glow opacity: `opacity-0` → `group-hover:opacity-30`
- Button hover border glow blur: `blur-xl`
- Copyright padding top: `pt-6`
- Copyright border top: `border-t border-gray-800`
- Copyright text color: `text-gray-500`
- Copyright text size: `text-sm`
- Bottom decorative line height: `h-px`
- Bottom decorative line gradient: `from-transparent via-amber-400/30 to-transparent`
- Header animation: Fades from bottom, no delay
- Social container animation: Fades from bottom, delay 0.2s
- Social button animation: Fades from left, stagger by 0.1s starting at 0.3s
- Copyright animation: Fades in, delay 0.6s

**Social Button Colors:**
- **Kick:**
  - Background: `bg-green-600`
  - Gradient glow: `from-green-400 to-emerald-500`
- **Instagram:**
  - Background: `bg-gradient-to-r from-pink-600 to-purple-600`
  - Gradient glow: `from-pink-400 to-purple-500`
- **Discord:**
  - Background: `bg-indigo-600`
  - Gradient glow: `from-indigo-400 to-purple-500`

---

## Color Palette & Design System

### Primary Colors
- **Gold/Amber Primary:** `from-amber-400 to-yellow-600`
- **Gold/Amber Secondary:** `from-amber-500 to-yellow-600`
- **Gold/Amber Tertiary:** `from-amber-500/5 to-yellow-500/5`

### Background Colors
- **Main Background:** `bg-gradient-to-b from-gray-900 via-black to-gray-900`
- **Section Dark:** `bg-gradient-to-b from-gray-900 to-black`
- **Section Light:** `bg-gradient-to-b from-black to-gray-900`
- **Card Background:** `bg-gradient-to-b from-gray-800/90 to-black/90`
- **Navbar Background:** `bg-gradient-to-r from-gray-900 via-black to-gray-900`
- **Middle Bar Background:** `bg-gradient-to-r from-gray-900 via-slate-900 to-gray-900`

### Text Colors
- **Primary White:** `text-white`
- **Secondary Gray:** `text-gray-400`
- **Tertiary Gray:** `text-gray-500`
- **Light Gray:** `text-gray-300`
- **Gold:** `text-amber-400`
- **Success Green:** `text-green-400`
- **Error Red:** `text-red-400`

### Border Colors
- **Primary Border:** `border-amber-500/30`
- **Hover Border:** `border-amber-400/60`
- **Light Border:** `border-white/5`
- **Medium Border:** `border-white/10`
- **Dark Border:** `border-gray-800`
- **Top Border:** `border-amber-500/20`

### Shadow Colors
- **Amber Shadow:** `shadow-amber-500/20`
- **Strong Amber Shadow:** `shadow-amber-500/30`
- **Amber Indicator:** `shadow-amber-400/50`
- **Black Shadow:** `shadow-black/30`
- **2xl Shadow:** `shadow-2xl`

### Navigation Tab Colors
- **VAVADA:** `from-cyan-400 to-teal-500` / `text-cyan-400`
- **Home (Pokupi bonuse):** `from-orange-400 to-red-500` / `text-orange-400`
- **Leaderboard (Rang lista):** `from-purple-400 to-indigo-500` / `text-purple-400`
- **Tournaments (Turniri):** `from-amber-400 to-yellow-500` / `text-amber-400`
- **Social:** `from-green-400 to-emerald-500` / `text-green-400`

### Social Media Colors
- **Kick:** `bg-green-600` / Glow: `from-green-400 to-emerald-500`
- **Instagram:** `bg-gradient-to-r from-pink-600 to-purple-600` / Glow: `from-pink-400 to-purple-500`
- **Discord:** `bg-indigo-600` / Glow: `from-indigo-400 to-purple-500`

### Special Effect Colors
- **Hot Badge:** `bg-gradient-to-r from-red-500 to-orange-500`
- **Play Button:** `bg-amber-500/90`
- **Countdown Timer Box:** `bg-gradient-to-b from-gray-700 to-gray-800`

### Overlay Colors
- **Dark Overlay:** `bg-black/40`
- **Strong Dark Overlay:** `bg-black/60`
- **Gradient Overlay:** `from-amber-500/30 to-yellow-500/30 opacity-30`
- **Subtle Overlay:** `from-amber-500/10 via-transparent to-amber-500/10 opacity-20`

---

## Animation Timeline

### Page Load Sequence

**Navbar (Immediate):**
- Navbar container: Slides down from top, no delay
- Logo: Fades in from left, no delay

**Image Gallery (Immediate):**
- Gallery container: Immediate display
- First image: Fades in and zooms out
- Title overlay: Slides up after 0.3s
- Indicators: Display immediately

**Middle Bar (Staggered):**
- Tab 1 (VAVADA): Delay 0s (slides up from bottom)
- Tab 2 (Home): Delay 0.08s
- Tab 3 (Leaderboard): Delay 0.16s
- Tab 4 (Tournaments): Delay 0.24s
- Tab 5 (Social): Delay 0.32s

**Content Grid (Staggered):**
- Section header: Fades in from bottom, no delay
- Game card 1: Delay 0s
- Game card 2: Delay 0.1s
- Game card 3: Delay 0.2s
- Game card 4: Delay 0.3s
- Game card 5: Delay 0.4s
- Game card 6: Delay 0.5s
- View All button: Delay 0.8s

**Tournament Card:**
- Section header: Fades in from bottom, no delay
- Card wrapper: Fades and scales, delay 0.2s

**Footer (Staggered):**
- Header title: Fades in from bottom, no delay
- Social buttons container: Fades in from bottom, delay 0.2s
- Kick button: Fades in from left, delay 0.3s
- Instagram button: Fades in from left, delay 0.4s
- Discord button: Fades in from left, delay 0.5s
- Copyright: Fades in, delay 0.6s

### Interaction Animations

**Hover Effects:**
- Game cards: Move up 8px, scale to 1.05
- Social buttons: Scale to 1.05, move up 3px
- Tournament card: Scale to 1.02
- Navigation tabs: Background changes, icon scales
- Gallery indicators: Scale to 1.2
- View All button: Scale to 1.05

**Tap/Click Effects:**
- Gallery indicators: Scale to 0.9
- Social buttons: Scale to 0.98

**Continuous Animations:**
- Gallery auto-change: Every 4 seconds
- Countdown timer: Updates every 1 second
- Timer value animation: Scale pulse on change
- Shimmer effect: Slides across on hover (700ms)

### Transition Durations
- Fast: `duration-300` (most hover effects)
- Medium: `duration-500` (background glows)
- Slow: `duration-700` (shimmer effects)
- Very Slow: `duration-800` (image transitions)

### Animation Easing
- Default: `ease` or `ease-in-out`
- Gallery images: `easeInOut`
- Shimmer: `ease-out`
- Active tab indicator: Spring animation (stiffness: 380, damping: 30)

---

## Required Imports & Libraries

### Core React & Animation
```tsx
import { useState, useEffect, createContext, useContext } from 'react';
import { motion, AnimatePresence } from 'motion/react';
```

### Lucide Icons
```tsx
import { 
  Trophy, Medal, Crown, TrendingUp,     // Leaderboard
  Play, Users, Flame, Zap,                // Games
  Clock, Coins, Calendar,                 // Tournament
  ExternalLink, Home, Link,               // Navigation
  Instagram                                // Social
} from 'lucide-react';
```

### Components
```tsx
// UI Components (ShadCN)
import { Button } from './components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './components/ui/card';
import { Badge } from './components/ui/badge';
import { Toaster } from './components/ui/sonner';

// Custom Components
import { ImageWithFallback } from './components/figma/ImageWithFallback';
import { NavigationProvider, useNavigation } from './components/NavigationProvider';
import { Navbar } from './components/Navbar';
import { ImageGallery } from './components/ImageGallery';
import { MiddleBar } from './components/MiddleBar';
import { ContentGrid } from './components/ContentGrid';
import { TournamentCard } from './components/TournamentCard';
import { Footer } from './components/Footer';
import { HomePage } from './components/pages/HomePage';
import { Leaderboard } from './components/pages/Leaderboard';
```

### TypeScript Types
```tsx
export type Page = 'home' | 'leaderboard' | 'events' | 'links' | 'vavada';

interface NavigationContextType {
  currentPage: Page;
  navigateTo: (page: Page) => void;
}

interface Game {
  id: number;
  title: string;
  subtitle: string;
  image: string;
  players: string;
  jackpot: string;
  hot: boolean;
  icon: LucideIcon;
}

interface SocialLink {
  icon: React.ComponentType<{ size?: number; className?: string }>;
  name: string;
  href: string;
  color: string;
  bgColor: string;
  description: string;
}

interface GalleryImage {
  url: string;
  title: string;
}
```

---

## Responsive Breakpoints

### Tailwind Breakpoints Used
- **sm:** 640px (Small tablets and up)
- **md:** 768px (Tablets and up)
- **lg:** 1024px (Desktops and up)

### Mobile-First Responsive Patterns

**Navbar:**
- Mobile: Centered logo
- Desktop (`sm`): Left-aligned logo

**Image Gallery:**
- Mobile: `h-36` (144px)
- Desktop (`md`): `h-64` (256px)
- Title: `text-4xl` → `md:text-5xl`

**Middle Bar:**
- Mobile: Icon above text (`flex-col`), `min-w-[60px]`, `px-2 py-3`
- Desktop (`sm`): Icon beside text (`sm:flex-row`), `sm:min-w-[140px]`, `sm:px-4 sm:py-4`
- Icon size: `16px` → `sm:w-[18px] sm:h-[18px]`
- Text size: `text-[10px]` → `sm:text-xs`

**Content Grid:**
- Mobile: `grid-cols-2`, game cards are square (`aspect-square`)
- Tablet (`md`): `grid-cols-3`, cards are auto-height (`md:aspect-auto`)
- Image height: `h-32` → `md:h-24` → `lg:h-32`

**Tournament Card:**
- Mobile: Single column (`grid-cols-1`), image `h-64`
- Desktop (`lg`): Two columns (`lg:grid-cols-2`), image `lg:h-auto`

**Footer:**
- Social button gap: `gap-2` → `sm:gap-4`
- Button padding: `px-3 py-3` → `sm:px-8 sm:py-4`
- Button min width: `min-w-[80px]` → `sm:min-w-[200px]`
- Icon size: `16px` → `sm:w-5 sm:h-5`
- Text size: `text-xs` → `sm:text-base`

**Leaderboard (Rang Lista):**
- Prize grid: `grid-cols-2` → `md:grid-cols-4`
- Watch time stats: `hidden` → `sm:block`
- Change numbers: `hidden` → `md:block`
- Title: `text-4xl` → `md:text-5xl`

---

## Additional Notes

### Scroll Behavior
- All navigation uses smooth scrolling: `{ behavior: 'smooth' }`
- Section anchors use `scroll-mt-32` to account for fixed headers
- Sections have IDs: `#events`, `#links`

### Performance Optimizations
- Images use `ImageWithFallback` component
- AnimatePresence with `mode="wait"` prevents multiple animations
- Countdown timer properly cleaned up with `useEffect` cleanup
- Motion animations use `layoutId` for smooth transitions

### Accessibility Considerations
- All buttons are keyboard accessible
- Icons have proper size attributes
- Text has good contrast ratios
- Hover states are clearly visible
- Interactive elements have cursor pointer

### Design Patterns
- Chrome-style tabs for navigation (rounded top corners, active state)
- Casino/Vegas aesthetic (gold, black, dramatic lighting)
- Card-based layouts with hover effects
- Gradient overlays for depth
- Consistent spacing and padding
- Staggered animations for visual interest
- Glow effects on interactive elements

---

## File Structure Reference
```
/
├── App.tsx (Main app with routing)
├── components/
│   ├── Navbar.tsx
│   ├── ImageGallery.tsx
│   ├── MiddleBar.tsx
│   ├── ContentGrid.tsx
│   ├── TournamentCard.tsx
│   ├── Footer.tsx
│   ├── NavigationProvider.tsx
│   ├── pages/
│   │   ├── HomePage.tsx
│   │   └── Leaderboard.tsx
│   ├── figma/
│   │   └── ImageWithFallback.tsx
│   └── ui/
│       ├── button.tsx
│       ├── card.tsx
│       ├── badge.tsx
│       └── sonner.tsx
└── styles/
    └── globals.css
```

---

This specification document provides exact, pixel-perfect details for recreating the entire CasinoHub website. Every component, animation, color, spacing, and interaction is documented for accurate implementation.
