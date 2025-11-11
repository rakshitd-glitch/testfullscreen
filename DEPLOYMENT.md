# 🚀 Deploying Endless Runner to Render

This guide explains how to deploy your game to Render (free static site hosting).

## 📦 Option 1: Deploy from GitHub (Recommended)

### Step 1: Push to GitHub

1. **Initialize Git repository** (if not already done):
```bash
git init
git add .
git commit -m "Initial commit - Endless Runner game with mobile fullscreen support"
```

2. **Create a GitHub repository**:
   - Go to https://github.com/new
   - Create a new repository (e.g., `endless-runner-familyman`)
   - Don't initialize with README (you already have code)

3. **Push your code**:
```bash
git remote add origin https://github.com/YOUR_USERNAME/endless-runner-familyman.git
git branch -M main
git push -u origin main
```

### Step 2: Deploy on Render

1. **Go to Render**: https://render.com/
2. **Sign up/Login** (you can use your GitHub account)
3. **Click "New +" → "Static Site"**
4. **Connect your GitHub repository**
5. **Render will auto-detect the settings from `render.yaml`**:
   - Build Command: `npm install && npm run build`
   - Publish Directory: `dist`
6. **Click "Create Static Site"**
7. **Wait for deployment** (usually 2-3 minutes)
8. **Your game will be live!** 🎉

The URL will be something like: `https://endless-runner-familyman.onrender.com`

---

## 📁 Option 2: Manual Deploy (No GitHub needed)

### Step 1: Build Locally

```bash
npm run build
```

This creates a `dist/` folder with all production files.

### Step 2: Deploy the dist folder

1. **Go to Render**: https://render.com/
2. **Click "New +" → "Static Site"**
3. **Choose "Deploy an existing static site"**
4. **Upload the `dist` folder**
5. **Your game will be live!** 🎉

---

## 🎮 What Happens During Build

When you run `npm run build`, Vite will:

1. ✅ **Compile TypeScript** → JavaScript
2. ✅ **Bundle all code** into optimized chunks
3. ✅ **Minify JavaScript** (remove console.logs in production)
4. ✅ **Optimize assets** (images, fonts, sprites)
5. ✅ **Generate production-ready files** in `dist/` folder
6. ✅ **Create vendor chunks** (Phaser separate from your game code)

### Build Output Structure:
```
dist/
├── index.html           # Entry point
├── assets/              # Your game assets (images, fonts, etc.)
├── js/
│   ├── vendor-phaser-[hash].js    # Phaser library
│   ├── game-src-[hash].js         # Your game code
│   └── index-[hash].js            # Entry point
```

---

## ⚙️ Configuration Files Explained

### `render.yaml`
Tells Render how to build and deploy your game:
- **Build Command**: Installs dependencies and builds
- **Publish Path**: Where the built files are (`dist/`)
- **Headers**: Caching strategy for better performance
- **Routes**: SPA routing support

### `package.json` (updated)
- **build script**: Now includes `--mode production` flag
- **serve script**: Preview production build locally

### `.renderignore`
Files/folders NOT to upload to Render (similar to `.gitignore`)

---

## 🧪 Test Production Build Locally

Before deploying, test your production build:

```bash
# Build the project
npm run build

# Preview the production build
npm run serve
```

Open `http://localhost:4173` to test the built version.

---

## 🔧 Troubleshooting

### Issue: Assets not loading
**Solution**: Check that asset paths in your code use relative paths (not absolute).

### Issue: Build fails on Render
**Solution**: 
1. Check the build logs on Render dashboard
2. Ensure `package.json` and `package-lock.json` are committed
3. Make sure all dependencies are in `dependencies` (not just `devDependencies`)

### Issue: Fullscreen not working after deployment
**Solution**: This should work fine! The fullscreen implementation works on production. Test on actual mobile devices.

### Issue: Page is blank after deployment
**Solution**: 
1. Check browser console for errors
2. Ensure `base: "./"` is set in `vite.config.ts` (already done)
3. Clear browser cache and hard reload

---

## 🌐 Custom Domain (Optional)

To use your own domain:

1. Go to your Render dashboard
2. Click on your static site
3. Go to "Settings" → "Custom Domain"
4. Add your domain and follow DNS instructions

---

## 📊 Performance Tips

Your build is already optimized with:
- ✅ Code splitting (Phaser separate from game code)
- ✅ Minification (smaller file sizes)
- ✅ Tree shaking (removes unused code)
- ✅ Aggressive caching (faster subsequent loads)
- ✅ Console.log removal in production

---

## 🔄 Update Your Game

### If using GitHub:
1. Make changes to your code
2. Commit and push:
```bash
git add .
git commit -m "Update game"
git push
```
3. Render automatically rebuilds and deploys! 🚀

### If using manual deploy:
1. Make changes
2. Run `npm run build`
3. Upload new `dist/` folder to Render

---

## 💰 Render Free Tier

- ✅ **Free for static sites**
- ✅ **Automatic HTTPS**
- ✅ **Global CDN**
- ✅ **Unlimited bandwidth**
- ✅ **Auto-deploy from GitHub**

Perfect for game hosting! 🎮

---

## 📝 Quick Command Reference

```bash
# Development
npm run dev              # Start dev server

# Production
npm run build            # Build for production
npm run serve            # Preview production build locally

# Deployment
git push                 # Auto-deploys on Render (if connected to GitHub)
```

---

## ✅ Checklist Before Deployment

- [ ] Test game locally (`npm run dev`)
- [ ] Test fullscreen on mobile
- [ ] Build successfully (`npm run build`)
- [ ] Preview production build (`npm run serve`)
- [ ] All assets loading correctly
- [ ] No console errors
- [ ] Push to GitHub (or prepare dist folder)
- [ ] Deploy on Render
- [ ] Test live URL on mobile devices

---

## 🎉 You're Ready!

Your game is production-ready with:
- Mobile fullscreen support ✅
- Optimized build ✅
- Proper caching ✅
- Easy deployment ✅

Deploy and share your game with the world! 🚀🎮

