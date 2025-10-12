# Rang Lista (Leaderboard) Page - Complete Component Specifications

## Page Container
```tsx
// Main wrapper
<div className="min-h-screen pt-8 pb-12 bg-gradient-to-b from-gray-900 to-black">
  <div className="max-w-[57.6rem] mx-auto px-4">
```

---

## 1. Header Section

### Container
```tsx
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  className="text-center mb-12"
>
```

### Title with Icon
```tsx
<div className="flex items-center justify-center gap-3 mb-4">
  <Trophy size={40} className="text-amber-400" />
  <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-amber-400 to-yellow-600 bg-clip-text text-transparent">
    Top Viewers
  </h1>
</div>
```

### Subtitle
```tsx
<p className="text-gray-400 text-lg">
  Most dedicated viewers of Aca Jankovic on Kick • Updated live
</p>
```

**Specifications:**
- Icon: Trophy from lucide-react, size: 40px, color: `text-amber-400`
- Title font size: `text-4xl` on mobile, `md:text-5xl` on desktop
- Title gradient: `bg-gradient-to-r from-amber-400 to-yellow-600 bg-clip-text text-transparent`
- Subtitle: `text-gray-400 text-lg`
- Section margin bottom: `mb-12`
- Flex gap between icon and title: `gap-3`
- Title margin bottom: `mb-4`

---

## 2. Prize Cards Grid

### Grid Container
```tsx
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ delay: 0.1 }}
  className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
>
```

### Individual Prize Card
```tsx
<motion.div 
  key={index}
  initial={{ opacity: 0, scale: 0.9 }}
  animate={{ opacity: 1, scale: 1 }}
  transition={{ delay: 0.1 + index * 0.1 }}
  whileHover={{ scale: 1.05, y: -4 }}
  className={`bg-gradient-to-br ${prize.gradient} border ${prize.border} rounded-xl overflow-hidden backdrop-blur-sm transition-all duration-300 hover:shadow-xl hover:shadow-amber-500/20`}
>
```

### Prize Image Section
```tsx
<div className="relative h-32 overflow-hidden">
  <ImageWithFallback
    src={prize.image}
    alt={prize.label}
    className="w-full h-full object-cover"
  />
  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
  
  {/* Rank Badge */}
  <div className="absolute top-2 right-2 px-2 py-1 bg-black/70 backdrop-blur-sm rounded-lg border border-amber-500/30">
    <span className="text-xs font-bold text-amber-400">{prize.rank}</span>
  </div>
</div>
```

### Prize Label
```tsx
<div className="p-3 text-center">
  <div className="font-bold text-white text-sm">{prize.label}</div>
</div>
```

**Prize Card Colors by Rank:**
- **1st Place:** 
  - Gradient: `from-yellow-500/20 to-amber-600/20`
  - Border: `border-yellow-500/40`
- **2nd Place:**
  - Gradient: `from-gray-400/20 to-slate-500/20`
  - Border: `border-gray-400/40`
- **3rd Place:**
  - Gradient: `from-amber-600/20 to-orange-700/20`
  - Border: `border-amber-600/40`
- **4th Place:**
  - Gradient: `from-green-500/20 to-emerald-600/20`
  - Border: `border-green-500/40`

**Specifications:**
- Grid: `grid-cols-2` on mobile, `md:grid-cols-4` on desktop
- Gap between cards: `gap-4`
- Section margin bottom: `mb-8`
- Image height: `h-32`
- Card border radius: `rounded-xl`
- Hover effects: `scale: 1.05, y: -4`
- Shadow on hover: `hover:shadow-xl hover:shadow-amber-500/20`
- Rank badge position: `top-2 right-2`
- Rank badge padding: `px-2 py-1`
- Rank badge bg: `bg-black/70 backdrop-blur-sm`
- Rank badge border: `border border-amber-500/30`
- Label padding: `p-3`
- Label font: `font-bold text-white text-sm`
- Animation delay: Staggered by `0.1s` per card

---

## 3. Leaderboard Table/List

### Container
```tsx
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ delay: 0.2 }}
  className="space-y-3"
>
```

### Individual Viewer Row
```tsx
<motion.div
  key={viewer.rank}
  initial={{ opacity: 0, x: -20 }}
  animate={{ opacity: 1, x: 0 }}
  transition={{ delay: 0.3 + index * 0.05 }}
  whileHover={{ scale: 1.02, x: 8 }}
  className={`bg-gradient-to-r ${getRankBgColor(viewer.rank)} border rounded-xl p-4 backdrop-blur-sm transition-all duration-300 hover:shadow-xl hover:shadow-amber-500/10`}
>
```

### Row Content Structure
```tsx
<div className="flex items-center justify-between gap-4">
  {/* Left Section: Rank & Avatar */}
  <div className="flex items-center gap-4 flex-1 min-w-0">
    {/* Rank Icon */}
    <div className="flex-shrink-0 w-12 flex items-center justify-center">
      {getRankIcon(viewer.rank)}
    </div>
    
    {/* Avatar */}
    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-amber-400 to-yellow-600 flex items-center justify-center text-2xl flex-shrink-0">
      {viewer.avatar}
    </div>
    
    {/* Viewer Info */}
    <div className="flex-1 min-w-0">
      <div className="flex items-center gap-2 mb-1">
        <h3 className="font-bold text-white truncate">{viewer.name}</h3>
        <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-gradient-to-r from-amber-400 to-yellow-600 text-black">
          {viewer.badge}
        </span>
      </div>
      <div className="flex items-center gap-3 text-xs text-gray-400">
        <span className="flex items-center gap-1">
          <Trophy size={12} />
          {viewer.daysWatched} days
        </span>
        <span className="flex items-center gap-1">
          <TrendingUp size={12} />
          {viewer.avgDaily}h avg
        </span>
      </div>
    </div>
  </div>

  {/* Right Section: Watch Time & Change */}
  <div className="flex items-center gap-4 flex-shrink-0">
    <div className="text-right hidden sm:block">
      <div className="text-xl font-bold text-amber-400">
        {viewer.watchTime.toLocaleString()}h
      </div>
      <div className="text-xs text-gray-500">watch time</div>
    </div>
    
    <div className={`flex items-center gap-1 font-bold ${getChangeColor(viewer.change)}`}>
      {viewer.change !== '0' && (
        <span className="text-lg">
          {viewer.change.startsWith('+') ? '↑' : '↓'}
        </span>
      )}
      <span className="hidden md:block">{viewer.change !== '0' ? viewer.change.replace(/[+-]/, '') : '—'}</span>
    </div>
  </div>
</div>
```

**Rank Background Colors:**
- **Rank 1:** `from-yellow-500/20 to-amber-600/20 border-yellow-500/40`
- **Rank 2:** `from-gray-400/20 to-slate-500/20 border-gray-400/40`
- **Rank 3:** `from-amber-600/20 to-orange-700/20 border-amber-600/40`
- **Rank 4-10:** `from-gray-800/50 to-gray-900/50 border-amber-500/20`

**Rank Icons:**
- **Rank 1:** `<Crown size={24} className="text-yellow-400" />`
- **Rank 2:** `<Medal size={24} className="text-gray-300" />`
- **Rank 3:** `<Medal size={24} className="text-amber-600" />`
- **Rank 4+:** `<span className="text-lg font-bold text-gray-400">#{rank}</span>`

**Change Indicator Colors:**
- Positive (+): `text-green-400`
- Negative (-): `text-red-400`
- No change (0): `text-gray-500`, display as `—`

**Specifications:**
- Row spacing: `space-y-3` between rows
- Row padding: `p-4`
- Row border radius: `rounded-xl`
- Row hover: `scale: 1.02, x: 8`
- Rank icon container width: `w-12`
- Avatar size: `w-12 h-12`
- Avatar gradient: `bg-gradient-to-br from-amber-400 to-yellow-600`
- Avatar font size: `text-2xl`
- Name font: `font-bold text-white truncate`
- Badge padding: `px-2 py-0.5`
- Badge font: `text-xs font-semibold`
- Badge gradient: `bg-gradient-to-r from-amber-400 to-yellow-600 text-black`
- Stats icons size: `12px`
- Stats font: `text-xs text-gray-400`
- Watch time font: `text-xl font-bold text-amber-400`
- Watch time label: `text-xs text-gray-500`
- Change arrow font size: `text-lg`
- Animation: Rows stagger by `0.05s` per row, starting at `0.3s`

---

## 4. Bottom CTA Section

```tsx
<motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ delay: 1 }}
  className="text-center mt-12"
>
  <p className="text-gray-400 mb-4">Want to see your name here?</p>
  <a 
    href="https://kick.com/acajankovic" 
    target="_blank" 
    rel="noopener noreferrer"
    className="inline-block px-8 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-semibold rounded-xl hover:from-green-400 hover:to-emerald-500 transition-all duration-300 hover:shadow-lg hover:shadow-green-500/30 transform hover:scale-105"
  >
    Watch Aca on Kick
  </a>
</motion.div>
```

**Specifications:**
- Section margin top: `mt-12`
- Text: `text-gray-400 mb-4`
- Button padding: `px-8 py-3`
- Button gradient: `bg-gradient-to-r from-green-500 to-emerald-600`
- Button hover gradient: `hover:from-green-400 hover:to-emerald-500`
- Button border radius: `rounded-xl`
- Button hover shadow: `hover:shadow-lg hover:shadow-green-500/30`
- Button hover scale: `hover:scale-105`
- Button font: `text-white font-semibold`

---

## 5. Footer Component

The Footer component is imported from `../Footer.tsx` and placed at the bottom of the page.

---

## Animation Timeline

1. **Header**: Fades in from bottom, delay: 0s
2. **Prize Grid**: Fades in from bottom, delay: 0.1s
3. **Prize Cards**: Each card staggers by 0.1s (0.1s, 0.2s, 0.3s, 0.4s)
4. **Leaderboard Container**: Fades in from bottom, delay: 0.2s
5. **Leaderboard Rows**: Each row staggers by 0.05s starting at 0.3s
6. **Bottom CTA**: Fades in, delay: 1s

---

## Responsive Breakpoints

- **Mobile (default):**
  - Prize grid: 2 columns
  - Title: `text-4xl`
  - Watch time stats: hidden
  - Change numbers: hidden on mobile, only show arrows
  
- **Desktop (md and up):**
  - Prize grid: 4 columns
  - Title: `text-5xl`
  - Watch time stats: visible
  - Change numbers: visible

---

## Color Palette Summary

- **Primary Gold/Amber:** `from-amber-400 to-yellow-600`
- **Background:** `from-gray-900 to-black`
- **Text Primary:** `text-white`
- **Text Secondary:** `text-gray-400`
- **Text Tertiary:** `text-gray-500`
- **1st Place:** Yellow/Gold (`yellow-400`, `yellow-500`, `amber-600`)
- **2nd Place:** Silver/Gray (`gray-300`, `gray-400`, `slate-500`)
- **3rd Place:** Bronze/Amber (`amber-600`, `orange-700`)
- **Positive Change:** `text-green-400`
- **Negative Change:** `text-red-400`
- **Kick CTA:** `from-green-500 to-emerald-600`

---

## Required Imports

```tsx
import { motion } from 'motion/react';
import { Footer } from '../Footer';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { Trophy, Medal, Crown, TrendingUp } from 'lucide-react';
```

---

## Data Structure

```tsx
interface Viewer {
  rank: number;
  name: string;
  avatar: string; // emoji
  watchTime: number; // hours
  daysWatched: number;
  avgDaily: number;
  badge: string; // "Legend" | "Diamond" | "Platinum" | "Gold"
  change: string; // "+2" | "-1" | "0"
}

interface Prize {
  label: string;
  rank: string; // "1st Place"
  image: string; // URL
  gradient: string; // Tailwind classes
  border: string; // Tailwind classes
}
```
