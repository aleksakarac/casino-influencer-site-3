# CasinoHub Setup Instructions

## Sanity CMS Configuration

### 1. Configure CORS Origins

To allow the Next.js app to fetch data from Sanity, you need to add CORS origins:

1. Go to https://www.sanity.io/manage
2. Select your project: **mvvp79j4**
3. Navigate to **API** → **CORS Origins**
4. Click **Add CORS origin**
5. Add the following origins:
   - `http://localhost:3000` (for development)
   - Your production domain (when deployed)
6. Enable credentials: **Yes**

### 2. Create API Token (Optional but Recommended)

For better security and to avoid CORS issues:

1. Go to https://www.sanity.io/manage
2. Select your project: **mvvp79j4**
3. Navigate to **API** → **Tokens**
4. Click **Add API token**
5. Name: `Frontend Read Token`
6. Permissions: **Viewer** (read-only)
7. Copy the token and add it to your `.env.local`:
   ```
   SANITY_API_TOKEN=your_token_here
   ```

### 3. Add Sample Content

1. Open Sanity Studio at http://localhost:3333
2. Create a few **Hero Gallery** images:
   - Upload images
   - Add alt text
   - Mark as active
   - Set display order

3. Create **Tournaments**:
   - Add name (EN & SR)
   - Add description (EN & SR)
   - Upload image (16:9 ratio recommended)
   - Set prize pool
   - Add stats (players, buy-in, winner prize, table type)
   - **Set end date** (for countdown timer)
   - Add join link
   - Mark as active
   - Set display order

4. Configure **Site Settings**:
   - Add social media links
   - Configure SEO settings

## Running the Project

### Development Mode

1. **Start Sanity Studio** (port 3333):
   ```bash
   cd casinohub/sanity-studio
   npm run dev
   ```

2. **Start Next.js App** (port 3000):
   ```bash
   cd casinohub
   npm run dev
   ```

3. Open http://localhost:3000 in your browser

### Environment Variables

Make sure your `.env.local` file contains:

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=mvvp79j4
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2024-01-01
NEXT_PUBLIC_SITE_URL=http://localhost:3000
SANITY_API_TOKEN=your_token_here  # Optional
```

## Features

- ✅ Dual language support (EN/SR)
- ✅ Live tournament countdown timers
- ✅ 5 theme variations with localStorage persistence
- ✅ Sanity CMS integration
- ✅ Hero image gallery
- ✅ Tournament cards with real-time countdowns
- ✅ Responsive design (desktop-first)

## Tech Stack

- Next.js 15.5.4 (App Router + Turbopack)
- TypeScript
- Tailwind CSS v4
- next-intl (i18n)
- Framer Motion
- Sanity CMS v3.58.0
- React 19

## Troubleshooting

### CORS Errors

If you see CORS errors in the console:
1. Follow the CORS configuration steps above
2. Add http://localhost:3000 to allowed origins
3. Restart the Next.js dev server

### No Data Showing

If no tournaments or images appear:
1. Make sure you've created content in Sanity Studio
2. Ensure content is marked as "Active"
3. Check that the content is published (click Publish in Sanity Studio)

### Port Already in Use

If port 3000 or 3333 is already in use:

**Windows:**
```bash
# Find the process
netstat -ano | findstr :3000

# Kill the process
taskkill /F /PID <PID_NUMBER>
```

**Mac/Linux:**
```bash
# Find and kill the process
lsof -ti:3000 | xargs kill -9
```
