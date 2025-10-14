# GitHub Actions Deployment Setup

This document explains how to configure GitHub Actions for automatic Cloudflare deployment.

## Required GitHub Secrets

You need to add the following secrets to your GitHub repository:

### 1. Navigate to GitHub Secrets
1. Go to your repository on GitHub
2. Click **Settings** > **Secrets and variables** > **Actions**
3. Click **New repository secret** for each secret below

### 2. Add These Secrets

#### CLOUDFLARE_API_TOKEN
- **Where to get it**: Cloudflare Dashboard > My Profile > API Tokens
- **Required permissions**:
  - Account - Cloudflare Workers Scripts - Edit
  - Zone - Workers Routes - Edit
- **Create token**: Click "Create Token" > Use "Edit Cloudflare Workers" template

#### CLOUDFLARE_ACCOUNT_ID
- **Where to get it**: Cloudflare Dashboard > Workers & Pages > Overview
- **Look for**: "Account ID" on the right sidebar
- **Format**: A 32-character hex string (e.g., `abc123def456...`)

#### NEXT_PUBLIC_SANITY_PROJECT_ID
- **Value**: `1s30e0de`
- **Source**: From your Sanity project configuration

#### NEXT_PUBLIC_SANITY_DATASET
- **Value**: `production`
- **Source**: Your Sanity dataset name

#### NEXT_PUBLIC_SANITY_API_VERSION
- **Value**: `2024-01-01`
- **Source**: Sanity API version

#### NEXT_PUBLIC_SITE_URL
- **Value**: `https://acajankovic.karacdev.workers.dev`
- **Source**: Your Cloudflare Workers URL

## How Deployment Works

### Automatic Deployment
- **Trigger**: Every push to the `master` branch
- **Platform**: Runs on Ubuntu Linux (no Windows compatibility issues)
- **Process**:
  1. Checks out your code
  2. Installs Node.js 18
  3. Installs dependencies
  4. Builds and deploys to Cloudflare

### Manual Deployment
- Go to **Actions** tab in GitHub
- Click **Deploy to Cloudflare** workflow
- Click **Run workflow** button
- Select branch and click **Run workflow**

## Verifying Deployment

1. Go to **Actions** tab in your GitHub repository
2. Click on the latest workflow run
3. Check the deployment logs
4. If successful, your site will be live at your Cloudflare Workers URL

## Troubleshooting

### Deployment Fails
- Check that all secrets are correctly set
- Verify Cloudflare API token has correct permissions
- Check workflow logs for specific error messages

### Build Errors
- Ensure all TypeScript errors are resolved locally first
- Check that environment variables are correctly configured

## Local Deployment via WSL

If you prefer to deploy manually from WSL:

```bash
# Navigate to project
cd /mnt/c/Users/Aleksa/Documents/Projects/Website/casinohub-influencer

# Install dependencies
npm install

# Deploy to Cloudflare
npm run deploy:cloudflare
```

## Notes

- GitHub Actions uses Ubuntu, avoiding Windows/OpenNext compatibility issues
- Deployment typically takes 2-3 minutes
- You can deploy from either GitHub Actions OR WSL
- GitHub Actions is recommended for production deployments
