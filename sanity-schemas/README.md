# Sanity CMS Schema Setup Instructions

## Step 1: Install Sanity CLI
```bash
npm install -g @sanity/cli
```

## Step 2: Navigate to your project
```bash
cd sanity-studio
```

## Step 3: Initialize Sanity Studio (if not already done)
```bash
sanity init
```
- Select your project: **mvvp79j4**
- Choose dataset: **production**

## Step 4: Copy Schema Files
Copy all files from `/sanity-schemas/` to your Sanity Studio's `schemas/` directory:
- `tournament.ts`
- `heroGallery.ts`
- `siteSettings.ts`
- `index.ts`

## Step 5: Import Schemas in Sanity Config
In your `sanity.config.ts`, import and use the schemas:

```typescript
import { schemaTypes } from './schemas';

export default defineConfig({
  // ... other config
  schema: {
    types: schemaTypes,
  },
})
```

## Step 6: Start Sanity Studio
```bash
sanity dev
```

## Step 7: Deploy Studio (when ready)
```bash
sanity deploy
```

## Schemas Included:

### 1. Tournament
- Bilingual name & description (EN/SR)
- 16:9 banner image
- Prize pool & stats
- Live countdown (endDate)
- Join link
- Active/inactive toggle
- Display order

### 2. Hero Gallery
- Gallery images with alt text (EN/SR)
- Display order
- Active/inactive toggle

### 3. Site Settings (Singleton)
- Social media links (Kick, Instagram, Discord)
- SEO meta tags (bilingual)
- OG image & favicon
