# IronCore Fitness - Modern Gym Website

A beautiful, fully functional gym website built with React, TypeScript, and Tailwind CSS.

## 🚀 Quick Start

```sh
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 📋 Features

- ✅ Fully responsive design (mobile, tablet, desktop)
- ✅ Dark mode toggle
- ✅ Smooth scrolling navigation
- ✅ Contact form with email integration (Web3Forms)
- ✅ SEO optimized
- ✅ Accessible (ARIA labels, keyboard navigation)
- ✅ Modern UI with shadcn/ui components
- ✅ Production ready

## 🌐 Deploy Now

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed deployment instructions.

**Quick Deploy Options:**
- **Vercel**: Push to GitHub → Import to Vercel → Deploy (easiest!)
- **Netlify**: Push to GitHub → Import to Netlify → Deploy
- **GitHub Pages**: Run `npm run deploy` (after setup)

## 📧 Contact Form Setup

**📖 [Complete Setup Guide →](./CONTACT_FORM_SETUP.md)**

Quick steps:
1. Get your free Web3Forms access key from [web3forms.com](https://web3forms.com)
2. Create a `.env` file: `VITE_WEB3FORMS_KEY=your_key_here`
3. For production: Add the same variable in Vercel/Netlify environment settings
4. The form will send emails directly to your inbox!

**Important**: Make sure to add `VITE_WEB3FORMS_KEY` as an environment variable in your hosting platform (Vercel/Netlify) for production!

## 🎨 Customization

- Update content in component files (`src/components/`)
- Change colors in `src/index.css` (CSS variables)
- Add images to `src/assets/`
- Modify sections as needed

## 📁 Project Structure

```
src/
├── components/     # React components (Navbar, Hero, etc.)
├── pages/         # Page components
├── lib/           # Utilities
├── assets/        # Images and static files
└── index.css      # Global styles
```

## 🛠️ Technologies

- **React 18** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **shadcn/ui** - UI components
- **React Router** - Navigation

## 📝 How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/REPLACE_WITH_PROJECT_ID) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/REPLACE_WITH_PROJECT_ID) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/features/custom-domain#custom-domain)
