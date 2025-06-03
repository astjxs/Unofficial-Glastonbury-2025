# Quick Deploy to GitHub

## Files to Upload to https://github.com/astjxs/Unofficial-Glastonbury-2025

Upload ALL files from this Replit project to your GitHub repository. Here's the complete file structure:

### Core Application Files
```
├── client/                     # Complete frontend folder
├── server/                     # Complete backend folder  
├── shared/                     # Shared schemas
├── attached_assets/            # Original setlist data
├── components.json
├── drizzle.config.ts
├── package.json               # Dependencies and scripts
├── package-lock.json          # Lock file for consistent installs
├── postcss.config.js
├── tailwind.config.ts
├── tsconfig.json
├── vite.config.ts
├── .gitignore
├── README.md
├── DEPLOYMENT.md
└── .env.example
```

## Instant Deploy Options

### 1. Vercel (Recommended - 1 minute deploy)
1. Go to [vercel.com](https://vercel.com)
2. Click "Import Project"
3. Paste: `https://github.com/astjxs/Unofficial-Glastonbury-2025`
4. Click Deploy
5. Your app will be live at `yourproject.vercel.app`

### 2. Railway (Alternative)
1. Go to [railway.app](https://railway.app)
2. "Deploy from GitHub repo"
3. Select your repository
4. Automatic deployment

### 3. Render (Free tier available)
1. Go to [render.com](https://render.com)
2. "New Web Service"
3. Connect GitHub repository
4. Build: `npm install`
5. Start: `npm run dev`

## Environment Variables (if needed)
Most hosting platforms auto-detect Node.js projects. If prompted:
- Build Command: `npm run build`
- Start Command: `npm run dev`
- Node Version: 18+

## Your App Features
- 400+ Glastonbury 2025 artists across 10+ stages
- Real-time search and filtering
- Smart conflict detection for overlapping shows
- Mobile-responsive with prominent search
- Dark/light theme toggle
- Export personal schedule as text file
- In-memory storage (no database required)

The app will work immediately after deployment with no additional setup required!