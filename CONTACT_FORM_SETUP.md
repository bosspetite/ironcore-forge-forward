# Contact Form Setup Guide

## Quick Setup (5 minutes)

Your contact form uses **Web3Forms** - a free service that sends form submissions directly to your email inbox. No backend required!

### Step 1: Get Your Free Access Key

1. Go to **[web3forms.com](https://web3forms.com)**
2. Enter your email address (where you want to receive messages)
3. Click "Get Access Key"
4. Copy the access key that appears

### Step 2: Add the Key to Your Project

#### For Local Development:
1. Create a file named `.env` in the root directory (same folder as `package.json`)
2. Add this line:
   ```
   VITE_WEB3FORMS_KEY=your_access_key_here
   ```
3. Replace `your_access_key_here` with the key you copied
4. Restart your dev server (`npm run dev`)

#### For Production (Vercel):
1. Go to your Vercel project dashboard
2. Click on **Settings** → **Environment Variables**
3. Add a new variable:
   - **Name**: `VITE_WEB3FORMS_KEY`
   - **Value**: Your access key from Web3Forms
4. Click **Save**
5. Redeploy your site (or it will auto-deploy)

#### For Production (Netlify):
1. Go to your Netlify project dashboard
2. Click on **Site settings** → **Environment variables**
3. Click **Add a variable**
4. Set:
   - **Key**: `VITE_WEB3FORMS_KEY`
   - **Value**: Your access key from Web3Forms
5. Click **Save**
6. Redeploy your site

### Step 3: Test It!

1. Visit your website
2. Scroll to the "Get In Touch" section
3. Fill out and submit the form
4. Check your email inbox - you should receive the message!

## What Information You'll Receive

Each form submission will include:
- **Name**: The person's full name
- **Email**: Their email address (so you can reply)
- **Interest**: What they're interested in (Membership, Training, etc.)
- **Message**: Their message/question

## Troubleshooting

### Form shows "Contact form is not configured"
- Make sure you've added the `VITE_WEB3FORMS_KEY` environment variable
- For production, make sure you've redeployed after adding the variable
- Check that the key is correct (no extra spaces)

### Form shows "Failed to send message"
- Check your internet connection
- Verify your Web3Forms access key is still valid
- Check the browser console for detailed error messages

### Not receiving emails
- Check your spam/junk folder
- Verify the email address you used when getting the access key
- Make sure your email provider isn't blocking the messages
- Try getting a new access key from Web3Forms

## Features

✅ **Free** - No cost, no credit card required  
✅ **No Backend** - Works directly from your frontend  
✅ **Spam Protection** - Built-in honeypot protection  
✅ **Instant Delivery** - Messages arrive in seconds  
✅ **Reliable** - Used by thousands of websites  

## Need Help?

- Web3Forms Documentation: [docs.web3forms.com](https://docs.web3forms.com)
- Check the form component: `src/components/ContactSection.tsx`

