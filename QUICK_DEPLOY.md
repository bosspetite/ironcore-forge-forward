# Quick Deploy Guide

## 🚀 Deploy to Vercel (Recommended - 5 minutes)

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Ready for deployment"
   git push origin main
   ```

2. **Deploy on Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Sign in with GitHub
   - Click "New Project"
   - Import your repository
   - Click "Deploy" (Vercel auto-detects Vite!)

3. **Add Environment Variable**
   - In Vercel dashboard → Settings → Environment Variables
   - Add: `VITE_WEB3FORMS_KEY` = `your_access_key_from_web3forms`
   - Redeploy

4. **Done!** Your site is live! 🎉

## 📧 Set Up Contact Form

**Before deploying**, make sure to:
1. Get your free access key from [web3forms.com](https://web3forms.com)
2. Add it as `VITE_WEB3FORMS_KEY` in Vercel environment variables
3. See [CONTACT_FORM_SETUP.md](./CONTACT_FORM_SETUP.md) for details

## ✅ Checklist Before Deploying

- [ ] Code pushed to GitHub
- [ ] Web3Forms access key obtained
- [ ] Environment variable added in Vercel
- [ ] Tested form locally (optional but recommended)

## 🎯 Your Site Will Have

✅ Fully responsive design  
✅ Dark mode toggle  
✅ Working contact form  
✅ Smooth scrolling  
✅ SEO optimized  
✅ Production ready  

