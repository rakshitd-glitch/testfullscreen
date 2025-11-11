# 🔧 Fix Render Build Error

## ❌ **The Error:**
```
Failed to resolve /src/main.ts from /opt/render/project/src/index.html
```

## 🎯 **The Problem:**

Render is looking for `index.html` in the **`src/`** folder, but it should be in the **root** folder!

---

## ✅ **The Fix (2 Steps):**

### **STEP 1: Update render.yaml on GitHub**

**I've updated your local `render.yaml` file.** Now upload it to GitHub:

1. Go to your GitHub repo
2. Click on `render.yaml`
3. Click **✏️** (edit)
4. Replace the contents with this:

```yaml
services:
  - type: web
    name: endless-runner-familyman
    runtime: static
    rootDir: .
    buildCommand: npm install && npm run build
    staticPublishPath: ./dist
    pullRequestPreviewsEnabled: true
    headers:
      - path: /*
        name: Cache-Control
        value: public, max-age=31536000, immutable
      - path: /index.html
        name: Cache-Control
        value: no-cache
    routes:
      - type: rewrite
        source: /*
        destination: /index.html
```

**Key change:** Added `rootDir: .` on line 5

5. Commit message: "Fix: Add rootDir to render.yaml"
6. Click "Commit changes"

---

### **STEP 2: Verify File Structure on GitHub**

Make sure your GitHub repo looks like this:

```
✅ CORRECT:
your-repo/
├── assets/              ← Folder
├── src/                 ← Folder
│   ├── config/
│   ├── main.ts
│   └── ...
├── types/               ← Folder
├── index.html          ← HERE! (root level)
├── package.json
├── render.yaml
├── vite.config.ts
└── tsconfig.json


❌ WRONG:
your-repo/
├── src/
│   ├── index.html      ← NOT HERE!
│   ├── main.ts
```

**If `index.html` is inside `src/` folder:**

1. Click on `src/index.html`
2. Click **⋯** (three dots) → "Delete file"
3. Commit: "Remove misplaced index.html"
4. Go back to root
5. Click "Add file" → "Upload files"
6. Upload your local `index.html`
7. Commit: "Add index.html to root"

---

### **STEP 3: Trigger Render Redeploy**

After updating `render.yaml`:

**Option A: Automatic (Wait 30 seconds)**
- Render will detect the GitHub change
- Auto-deploys

**Option B: Manual (Instant)**
1. Go to https://dashboard.render.com
2. Click your static site
3. Click **"Manual Deploy"**
4. Click **"Clear build cache & deploy"**

---

## 🎯 **Why This Happened:**

The error path shows:
```
/opt/render/project/src/index.html
```

This means Render was looking for files starting from the `src/` folder instead of the root folder.

Adding `rootDir: .` tells Render:
> "Start from the root directory (`.`), not from `src/`"

---

## ✅ **What Should Happen Now:**

After updating `render.yaml` and redeploying:

```
✅ Render finds index.html in root
✅ Vite finds /src/main.ts correctly
✅ Build succeeds
✅ Deploy completes
✅ Your game is live!
```

---

## 🧪 **Build Output Should Show:**

```
vite v7.1.12 building for production...
✓ 64 modules transformed.
✓ built in 44.51s
```

Instead of:
```
✗ Build failed in 41ms
error during build:
```

---

## 🆘 **If Still Failing:**

### **Check 1: File Locations**
Make sure on GitHub:
- ✅ `index.html` is at root (not in `src/`)
- ✅ `src/main.ts` exists
- ✅ `package.json` exists
- ✅ `render.yaml` has `rootDir: .`

### **Check 2: Clear Render Cache**
1. Render Dashboard → Your Site
2. "Manual Deploy" → "Clear build cache & deploy"

### **Check 3: Build Logs**
1. Click "Logs" tab on Render
2. Look for what directory it's starting from
3. Should show: `Working directory: /opt/render/project/src`

---

## 📋 **Quick Fix Checklist:**

- [ ] Update `render.yaml` with `rootDir: .`
- [ ] Commit to GitHub
- [ ] Verify `index.html` is in root (not in `src/`)
- [ ] Wait for Render auto-deploy OR
- [ ] Trigger manual deploy with cache clear
- [ ] Check build logs
- [ ] ✅ Build succeeds!

---

## 🎉 **After Fix:**

Your game will build successfully and deploy! The Construct 2 fullscreen approach will work on mobile! 🚀

