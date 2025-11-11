# 🚀 Quick Start: Deploy to Render

## Two Simple Options

### Option A: Deploy from GitHub (Recommended) ⭐

**1. Push your code to GitHub:**
```bash
git init
git add .
git commit -m "Ready for deployment"
git remote add origin https://github.com/YOUR_USERNAME/your-repo-name.git
git push -u origin main
```

**2. Deploy on Render:**
1. Go to https://render.com and login
2. Click **"New +"** → **"Static Site"**
3. Connect your GitHub repo
4. Render auto-detects settings from `render.yaml`
5. Click **"Create Static Site"**
6. Wait 2-3 minutes ⏱️
7. Done! Your game is live! 🎉

---

### Option B: Manual Deploy (No GitHub) 📦

**1. Build locally:**
```bash
npm run build
```

**2. Deploy the `dist/` folder:**
1. Go to https://render.com
2. Click **"New +"** → **"Static Site"**
3. Choose **"Deploy an existing site"**
4. Upload the **`dist`** folder
5. Done! 🎉

---

## ⚙️ Build Configuration (Already Done!)

Your project is ready for deployment with:

✅ **`render.yaml`** - Tells Render how to build
✅ **`package.json`** - Updated build scripts
✅ **`.renderignore`** - Excludes unnecessary files
✅ **Production optimizations** - Minification, code splitting, caching

---

## 📋 What You Need

- [x] Render account (free): https://render.com
- [x] GitHub account (if using Option A): https://github.com
- [x] Your game code (you have it!)

---

## 🎮 Answer to Your Question

**Do you build or put the repo as-is?**

**Answer: Put the repo as-is! ✅**

- Upload your **entire project folder** (all source files)
- **DON'T** upload the `dist/` folder
- **DON'T** upload `node_modules/`
- Render will **automatically build** for you using `npm run build`

**Why?**
- Render runs the build process on their servers
- This ensures consistent builds
- Automatic rebuilds when you push updates

---

## 📁 What to Upload to Render

Upload these files/folders:
```
✅ src/                    (your game code)
✅ assets/                 (images, fonts, sprites)
✅ index.html              (entry point)
✅ package.json            (dependencies)
✅ package-lock.json       (lock file)
✅ tsconfig.json           (TypeScript config)
✅ vite.config.ts          (build config)
✅ render.yaml             (Render config) ⭐
✅ .renderignore           (exclude files)

❌ node_modules/          (excluded automatically)
❌ dist/                  (built on Render)
❌ .git/                  (if manual deploy)
```

---

## 🔄 What Happens on Render

1. Render receives your code
2. Runs `npm install` (installs dependencies)
3. Runs `npm run build` (creates production build)
4. Publishes the `dist/` folder
5. Your game is live! 🎉

---

## 🧪 Test Before Deploy

```bash
# Test production build locally
npm run build
npm run serve

# Open http://localhost:4173
```

---

## 💡 Pro Tips

1. **First time?** Use GitHub option - easier to update later
2. **Quick test?** Use manual deploy - faster initial setup
3. **Multiple updates?** GitHub auto-deploys on every push
4. **Stuck?** Check Render build logs for errors

---

## 🆘 Troubleshooting

**Build fails?**
- Check that `package.json` and `package-lock.json` exist
- Ensure Node.js version compatibility (Render uses Node 18+)

**Assets not loading?**
- Already fixed! Using relative paths in `vite.config.ts`

**Blank page?**
- Check browser console
- View Render deployment logs

---

## 📞 Need Help?

1. Read full guide: `DEPLOYMENT.md`
2. Check Render docs: https://render.com/docs/static-sites
3. View build logs on Render dashboard

---

## ✨ Summary

**Short answer:** Push your repo as-is to GitHub, connect to Render, and it builds automatically!

**Longer answer:** You can also build locally and upload just the `dist/` folder, but GitHub integration is better for ongoing updates.

**Your project is 100% ready for deployment!** 🚀

