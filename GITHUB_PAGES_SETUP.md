# GitHub Pages Deployment Fix

## The Problem
If you're seeing a white blank page on GitHub Pages, it's usually because:
1. Assets aren't loading (wrong base path)
2. Client-side routing isn't working
3. Build output isn't configured correctly

## Solutions

### Option 1: Use HashRouter (Easiest - Works Immediately)

If your site is at `username.github.io/repo-name`, change `BrowserRouter` to `HashRouter` in `src/App.tsx`:

```tsx
import { HashRouter } from "react-router-dom";
// Change BrowserRouter to HashRouter
<HashRouter>
```

This uses `#` in URLs (like `yoursite.com/#/social`) but works perfectly on static hosts.

### Option 2: Configure Base Path (For Subdirectory Deployments)

If your repo is NOT at the root (e.g., `username.github.io/repo-name`), update `vite.config.ts`:

```ts
export default defineConfig({
  base: '/your-repo-name/', // Change this to your repo name
  // ... rest of config
});
```

### Option 3: Use 404.html Redirect (Already Set Up)

The `public/404.html` file will redirect all routes to `index.html`. Make sure:
1. GitHub Pages is set to use the `dist` folder
2. The 404.html file is copied to the dist folder during build

## Quick Fix Steps

1. **Rebuild your site:**
   ```bash
   npm run build
   ```

2. **Check the `dist` folder** - make sure `index.html` and all assets are there

3. **Push to GitHub:**
   ```bash
   git add .
   git commit -m "Fix GitHub Pages deployment"
   git push
   ```

4. **In GitHub Settings:**
   - Go to Settings → Pages
   - Source: Deploy from a branch
   - Branch: `gh-pages` (or `main` if using Actions)
   - Folder: `/dist` or `/ (root)` depending on your setup

## Recommended: Use Vercel Instead

For React Router with BrowserRouter, **Vercel is much easier**:
- Automatic deployments
- No configuration needed
- Better performance
- Free hosting

Just connect your GitHub repo to Vercel and it works automatically!

