# Deployment Guide for IronCore Fitness Website

## Quick Deploy Options

### Option 1: Vercel (Recommended - Easiest)
1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com) and sign in with GitHub
3. Click "New Project" and import your repository
4. Vercel will auto-detect Vite and configure everything
5. Click "Deploy" - your site will be live in minutes!

### Option 2: Netlify
1. Push your code to GitHub
2. Go to [netlify.com](https://netlify.com) and sign in
3. Click "New site from Git" and select your repository
4. Build command: `npm run build`
5. Publish directory: `dist`
6. Click "Deploy site"

### Option 3: GitHub Pages
1. Install gh-pages: `npm install --save-dev gh-pages`
2. Add to package.json scripts: `"deploy": "npm run build && gh-pages -d dist"`
3. Run: `npm run deploy`
4. Enable GitHub Pages in your repo settings

## Setting Up Contact Form

The contact form uses Web3Forms (free, no signup required):

1. Go to [web3forms.com](https://web3forms.com)
2. Enter your email address
3. Copy your access key
4. Create a `.env` file in the root directory:
   ```
   VITE_WEB3FORMS_KEY=your_access_key_here
   ```
5. The form will now send emails to your inbox!

## Environment Variables

Create a `.env` file in the root directory:
```
VITE_WEB3FORMS_KEY=your_web3forms_access_key
```

## Build Commands

- **Development**: `npm run dev`
- **Production Build**: `npm run build`
- **Preview Build**: `npm run preview`

## Features

✅ Fully responsive design
✅ Dark mode toggle
✅ Smooth scrolling navigation
✅ Contact form with email integration
✅ SEO optimized
✅ Accessible (ARIA labels, keyboard navigation)
✅ Production ready

## Customization

- Update gym information in component files
- Change colors in `src/index.css` (CSS variables)
- Add your own images in `src/assets/`
- Modify content in each section component

## Support

For issues or questions, check the component files for inline comments.

