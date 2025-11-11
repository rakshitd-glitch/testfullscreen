# 🚀 Complete Git → GitHub → Render Deployment

## Step-by-Step Guide (Copy & Paste Commands)

### ✅ Step 1: Prepare Your Repository (DONE!)

Your files are already staged! Here's what's included:
- ✅ All source code (src/)
- ✅ All assets (images, fonts, sprites)
- ✅ Configuration files (package.json, vite.config.ts, etc.)
- ✅ Render deployment config (render.yaml)
- ❌ node_modules/ (excluded)
- ❌ dist/ (excluded)

---

### 📝 Step 2: Commit Your Code

Run this command in your terminal:

```bash
git commit -m "Initial commit - Endless Runner with mobile fullscreen support"
```

---

### 🌐 Step 3: Create GitHub Repository

1. **Go to GitHub:** https://github.com/new
2. **Repository name:** `endless-runner-familyman` (or your preferred name)
3. **Visibility:** Public or Private (both work with Render)
4. **DON'T check:** "Add README" or "Add .gitignore" (you already have them)
5. **Click:** "Create repository"

---

### 🔗 Step 4: Push to GitHub

After creating the repo, GitHub will show you commands. Use these:

**Replace `YOUR_USERNAME` with your GitHub username:**

```bash
git remote add origin https://github.com/YOUR_USERNAME/endless-runner-familyman.git
git branch -M main
git push -u origin main
```

**Example:**
```bash
git remote add origin https://github.com/john-doe/endless-runner-familyman.git
git branch -M main
git push -u origin main
```

---

### 🚀 Step 5: Deploy on Render

1. **Go to Render:** https://render.com/
2. **Sign Up/Login** (use GitHub account for easier connection)
3. **Click:** "New +" → "Static Site"
4. **Connect Repository:**
   - Click "Connect account" (if first time)
   - Select your repository: `endless-runner-familyman`
5. **Render Auto-Detects Settings** from `render.yaml`:
   - Name: `endless-runner-familyman`
   - Build Command: `npm install && npm run build`
   - Publish Directory: `./dist`
6. **Click:** "Create Static Site"
7. **Wait 2-3 minutes** for deployment ⏱️
8. **Your game is LIVE!** 🎉

You'll get a URL like: `https://endless-runner-familyman.onrender.com`

---

## 📋 Quick Command Summary

```bash
# 1. Commit (files already staged)
git commit -m "Initial commit - Endless Runner with mobile fullscreen"

# 2. Add GitHub remote (replace YOUR_USERNAME)
git remote add origin https://github.com/YOUR_USERNAME/endless-runner-familyman.git

# 3. Push to GitHub
git branch -M main
git push -u origin main

# 4. Go to render.com and connect your repo
# Render will automatically build and deploy!
```

---

## 🔄 Future Updates (After Initial Deploy)

When you make changes to your game:

```bash
# 1. Stage changes
git add .

# 2. Commit with descriptive message
git commit -m "Add new feature or fix bug"

# 3. Push to GitHub
git push

# Render automatically rebuilds and deploys! 🚀
```

---

## 📊 What Happens on Render

```
GitHub Repository → Render detects push
                 ↓
        Clone your repo
                 ↓
    Run: npm install (installs dependencies)
                 ↓
    Run: npm run build (builds production files)
                 ↓
    Publish from dist/ folder
                 ↓
        Game is LIVE! 🎉
```

---

## ✅ Verification Checklist

Before pushing to GitHub:
- [x] Git initialized
- [x] Files staged (excluding node_modules/ and dist/)
- [x] .gitignore configured
- [x] render.yaml created
- [x] Ready to commit!

After pushing to GitHub:
- [ ] Repository created on GitHub
- [ ] Code pushed successfully
- [ ] Can see files on GitHub web interface

After deploying on Render:
- [ ] Build succeeded (check Render logs)
- [ ] Site is live (click the URL)
- [ ] Game loads correctly
- [ ] Mobile fullscreen works

---

## 🆘 Troubleshooting

### Issue: Git push asks for credentials
**Solution:** 
- Use Personal Access Token (not password)
- Or use SSH key
- GitHub guide: https://docs.github.com/en/authentication

### Issue: Build fails on Render
**Solution:**
1. Check Render build logs
2. Verify package.json is committed
3. Ensure render.yaml is in root directory

### Issue: Can't find repository on Render
**Solution:**
- Make sure repository is public OR
- Grant Render access to private repos in GitHub settings

---

## 💡 Pro Tips

1. **Use meaningful commit messages:**
   ```bash
   git commit -m "Fix: Mobile fullscreen on iOS"
   git commit -m "Add: New character animations"
   git commit -m "Update: Improve obstacle spawning"
   ```

2. **Check status before committing:**
   ```bash
   git status
   ```

3. **See what changed:**
   ```bash
   git diff
   ```

4. **View commit history:**
   ```bash
   git log --oneline
   ```

---

## 🎉 You're Ready!

Your repository is properly configured:
- ✅ Source code staged
- ✅ node_modules/ excluded
- ✅ dist/ excluded  
- ✅ Render config ready
- ✅ Mobile fullscreen implemented

**Just commit, push, and deploy!** 🚀

