# VibeStudio – Modern Web App Store & APK Hub 🚀

VibeStudio is a minimal, Google Play Store-inspired Progressive Web App (PWA) and APK Store built with **React**, **Tailwind CSS**, and **Lucide Icons**.

Featuring direct APK downloads for:
- ⌨️ **Likhon Bangla Keyboard (লিখন বাংলা কীবোর্ড)** (v2.4.0) — AI Proofreading, Avro/Jatiyo/Probhat, Frosted Glass themes, Tri-Calendar.
- 🛠️ **ToolsMate** (v1.0.0) — All-in-One Smart Utility Toolkit.
- 📊 **Finance Note** (v1.2.0) — Smart Expense & Budget Manager with SQLite & Biometric Lock.

---

## 🌐 Deploy to GitHub Pages in 1-Click

This repository is pre-configured with **GitHub Actions** (`.github/workflows/deploy.yml`) and **Vite relative base paths (`./`)** for GitHub Pages.

### How to Deploy:
1. **Commit and Push to your GitHub repo**:
   ```bash
   git add .
   git commit -m "Deploy VibeStudio to GitHub Pages"
   git push origin main
   ```
2. **Enable GitHub Pages in your repo settings**:
   - Go to your repository on GitHub.
   - Navigate to **Settings** > **Pages**.
   - Under **Build and deployment** > **Source**, select **GitHub Actions**.
3. **Done!** Whenever you push changes to `main` or `master`, GitHub Actions will automatically build and deploy your VibeStudio App Store to `https://<your-username>.github.io/<repo-name>/`.

---

## 🛠️ Local Development

```bash
# Install dependencies
npm install

# Run dev server (Port 3000)
npm run dev

# Build production bundle
npm run build
```

---

## 📁 Custom `apps.json` Support
You can manage or host your own `apps.json` file on GitHub. In VibeStudio, tap the **Source JSON** icon in the header to enter your custom raw GitHub URL.
