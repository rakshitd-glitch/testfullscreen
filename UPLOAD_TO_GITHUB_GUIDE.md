# 📤 Drag & Drop Upload to GitHub - Simple Guide

## 🎯 Quick Answer

**Upload these folders/files:**
- ✅ `src/` folder
- ✅ `assets/` folder
- ✅ `index.html`
- ✅ `package.json`
- ✅ `package-lock.json`
- ✅ `tsconfig.json`
- ✅ `vite.config.ts`
- ✅ `render.yaml`
- ✅ `.gitignore`
- ✅ `.renderignore`
- ✅ `types/` folder
- ✅ `DEPLOYMENT.md` (optional)
- ✅ `RENDER_QUICK_START.md` (optional)

**DON'T Upload:**
- ❌ `node_modules/` folder
- ❌ `dist/` folder

---

## 📋 Step-by-Step Instructions

### Step 1: Create GitHub Repository

1. Go to: https://github.com/new
2. **Repository name:** `endless-runner-familyman`
3. **Public** or **Private** (your choice)
4. ✅ Check: "Add a README file"
5. **Click:** "Create repository"

### Step 2: Select Files to Upload

In your project folder, **select these files/folders:**

```
✅ Select and drag:
   - src/
   - assets/
   - types/
   - index.html
   - package.json
   - package-lock.json
   - tsconfig.json
   - vite.config.ts
   - render.yaml
   - .gitignore
   - .renderignore
   - DEPLOYMENT.md
   - RENDER_QUICK_START.md
   - GIT_DEPLOYMENT_STEPS.md

❌ SKIP these:
   - node_modules/
   - dist/
```

### Step 3: Upload to GitHub

1. Open your repository on GitHub
2. Click: **"Add file"** → **"Upload files"**
3. **Drag and drop** the selected folders/files
4. **Commit message:** "Initial commit - Endless Runner game"
5. Click: **"Commit changes"**
6. Wait for upload to complete ⏱️

---

## 🚀 Step 4: Deploy on Render

1. Go to: https://render.com/
2. **Sign up/Login** (use GitHub for easy connection)
3. Click: **"New +"** → **"Static Site"**
4. **Connect GitHub** account (if first time)
5. **Select repository:** `endless-runner-familyman`
6. Render will auto-detect from `render.yaml`:
   - Build Command: `npm install && npm run build`
   - Publish Directory: `./dist`
7. Click: **"Create Static Site"**
8. **Wait 2-3 minutes** for deployment
9. **Your game is LIVE!** 🎉

---

## 📸 Visual Guide - What to Upload

### ✅ UPLOAD THESE:

```
📁 Your Project Folder
├── 📁 src/                      ← UPLOAD (TypeScript code)
│   ├── config/
│   ├── managers/
│   ├── scenes/
│   ├── systems/
│   ├── utils/
│   └── main.ts
├── 📁 assets/                   ← UPLOAD (images, fonts, sprites)
│   ├── fonts/
│   ├── images/
│   ├── sprites/
│   ├── landingBg.png
│   └── ...
├── 📁 types/                    ← UPLOAD (TypeScript types)
├── 📄 index.html                ← UPLOAD
├── 📄 package.json              ← UPLOAD (important!)
├── 📄 package-lock.json         ← UPLOAD (important!)
├── 📄 tsconfig.json             ← UPLOAD
├── 📄 vite.config.ts            ← UPLOAD
├── 📄 render.yaml               ← UPLOAD (important!)
├── 📄 .gitignore                ← UPLOAD
├── 📄 .renderignore             ← UPLOAD
├── 📄 DEPLOYMENT.md             ← UPLOAD (optional)
├── 📄 RENDER_QUICK_START.md     ← UPLOAD (optional)
└── 📄 GIT_DEPLOYMENT_STEPS.md   ← UPLOAD (optional)
```

### ❌ DON'T UPLOAD THESE:

```
📁 Your Project Folder
├── 📁 node_modules/             ← DON'T UPLOAD (huge, 100+ MB)
└── 📁 dist/                     ← DON'T UPLOAD (will be built by Render)
```

---

## 💡 Pro Tips

### Tip 1: Hidden Files (.gitignore, .renderignore)

On Windows, to see hidden files starting with `.`:
1. Open File Explorer
2. Click **"View"** tab
3. Check **"Hidden items"**
4. Now you can see `.gitignore` and `.renderignore`

### Tip 2: Upload in Batches (if needed)

If GitHub has upload limits:
1. First: Upload all files (not folders)
2. Then: Upload `src/` folder
3. Then: Upload `assets/` folder
4. Then: Upload `types/` folder

### Tip 3: Verify Upload

After uploading, your GitHub repo should show:
- ✅ All folders and files visible
- ✅ No `node_modules/` folder
- ✅ No `dist/` folder
- ✅ `render.yaml` present
- ✅ `package.json` present

---

## 🔍 File Checklist (Copy This)

Before uploading, check you have selected:

**Root Files:**
- [ ] index.html
- [ ] package.json
- [ ] package-lock.json
- [ ] tsconfig.json
- [ ] vite.config.ts
- [ ] render.yaml
- [ ] .gitignore
- [ ] .renderignore

**Folders:**
- [ ] src/
- [ ] assets/
- [ ] types/

**Optional Documentation:**
- [ ] DEPLOYMENT.md
- [ ] RENDER_QUICK_START.md
- [ ] GIT_DEPLOYMENT_STEPS.md
- [ ] UPLOAD_TO_GITHUB_GUIDE.md

**Make sure NOT selected:**
- [ ] node_modules/ (should NOT be checked)
- [ ] dist/ (should NOT be checked)

---

## 🎮 What Happens Next

```
1. You upload files to GitHub
   ↓
2. Files stored in your repository
   ↓
3. You connect Render to GitHub
   ↓
4. Render clones your files
   ↓
5. Render runs: npm install (creates node_modules/)
   ↓
6. Render runs: npm run build (creates dist/)
   ↓
7. Render serves your game from dist/
   ↓
8. Your game is LIVE! 🎉
```

---

## 🆘 Troubleshooting

### Issue: Can't see .gitignore or .renderignore

**Solution:**
- **Windows:** View → Show → Hidden items
- **Mac:** Press `Cmd + Shift + .`
- Or just skip them - not critical for drag & drop

### Issue: Upload too large

**Solution:**
- Make sure you're NOT uploading `node_modules/`
- Make sure you're NOT uploading `dist/`
- Upload should be ~20 MB only

### Issue: Missing package-lock.json

**Solution:**
- It should be in your project folder
- If missing, that's okay - Render will create it

### Issue: Render build fails

**Solution:**
1. Check that `package.json` was uploaded
2. Check that `render.yaml` was uploaded
3. View build logs on Render for specific error

---

## 📊 Upload Size Guide

Your upload should be approximately:

| Item | Size |
|------|------|
| assets/ | ~18 MB (images) |
| src/ | ~50 KB (code) |
| types/ | ~5 KB |
| All other files | ~500 KB |
| **Total** | **~20 MB** |

If your upload is 100+ MB, you probably included `node_modules/` by mistake!

---

## ✅ Success Indicators

After upload, on GitHub you should see:
- ✅ File count: ~70 files
- ✅ Folders visible: src/, assets/, types/
- ✅ render.yaml visible in root
- ✅ package.json visible in root
- ✅ NO node_modules/ folder
- ✅ NO dist/ folder

---

## 🎉 You're Ready!

**Simple Process:**
1. Select the right files (use checklist above)
2. Drag & drop to GitHub
3. Connect Render to your repo
4. Game goes live automatically!

**No command line needed!** 🚀

