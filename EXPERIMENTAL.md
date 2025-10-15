# 🧪 Experimental Features Guide

This document explains how to work with experimental branches without affecting production.

## Branch Structure

```
master              → Production (acajankovic.com)
dev                 → Stable development
experimental/base   → Main experimental branch (you are here!)
  ├── experimental/3d-effects
  ├── experimental/animations
  ├── experimental/ui-redesign
  └── experimental/gamification
```

## Quick Start

### Create a New Experimental Feature

```bash
# Start from experimental/base
git checkout experimental/base
git pull origin experimental/base

# Create your feature branch
git checkout -b experimental/your-feature-name

# Work on your crazy ideas!
# ...make changes...

# Commit and push
git add .
git commit -m "Add crazy feature: description"
git push -u origin experimental/your-feature-name
```

### Test Locally

```bash
# Clean build to avoid cache issues
rm -rf .next
npm run dev

# View at http://localhost:3000
```

### Preview on Cloudflare (Optional)

If you want to share your experimental work without affecting production:

```bash
# Deploy to a separate Cloudflare Worker
npm run deploy:cloudflare
```

**Note:** This will deploy to production! To test experimental features safely, only use localhost.

## Workflow

### 1. **Working on Experiments**
- Always branch from `experimental/base`
- Name branches: `experimental/feature-name`
- Test everything on localhost only
- Never deploy experimental branches to Cloudflare

### 2. **Merging Good Features to Dev**
```bash
# If you like an experimental feature and want to keep it:
git checkout dev
git merge experimental/your-feature-name
git push origin dev

# Then deploy from dev
npm run deploy:cloudflare
```

### 3. **Discarding Failed Experiments**
```bash
# Just delete the branch, no harm done!
git branch -D experimental/failed-feature
git push origin --delete experimental/failed-feature
```

### 4. **Syncing with Latest Dev**
```bash
# Keep experimental/base up to date with dev
git checkout experimental/base
git merge dev
git push origin experimental/base
```

## Suggested Experimental Features

### 🎨 **experimental/3d-effects**
- 3D card flips
- Parallax scrolling
- Three.js integrations
- Perspective transforms

### ✨ **experimental/animations**
- Page transitions
- Particle effects
- Liquid animations
- Scroll-triggered animations

### 🎯 **experimental/ui-redesign**
- Completely new layouts
- Alternative color schemes
- Different navigation patterns
- Mobile-first redesigns

### 🎮 **experimental/gamification**
- Achievement system
- Progress tracking
- Streak counters
- Reward animations

## Safety Rules

✅ **DO:**
- Create as many experimental branches as you want
- Try crazy ideas
- Break things (it's experimental!)
- Test on localhost extensively
- Share via screen recording

❌ **DON'T:**
- Deploy experimental branches to production
- Merge untested features to `dev` or `master`
- Delete `experimental/base` branch
- Work directly on `dev` or `master`

## Current Branch

You're currently on: `experimental/base`

This is the base for all experiments. Keep it relatively stable and in sync with `dev`.

## Useful Commands

```bash
# See all branches
git branch -a

# Switch branches
git checkout branch-name

# See current branch
git branch --show-current

# Delete local branch
git branch -D branch-name

# Delete remote branch
git push origin --delete branch-name

# Stash changes (save for later)
git stash
git stash pop  # restore later

# See what changed
git status
git diff
```

## Need Help?

Just ask! We can:
- Create new experimental branches
- Merge good features to dev
- Clean up failed experiments
- Try wild new ideas together

---

**Remember:** Experimental branches are your playground. Break things, learn, and have fun! 🚀
