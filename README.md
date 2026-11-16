# ⚡ React Test — Hosting & Design Showcase App

A fast, modern React + Vite application crafted for testing deployments, hosting environments (GitHub Pages, Vercel, Netlify), asset paths, and responsiveness with a small, aesthetic design system.

---

## ✨ Features

- 🌐 **Live Hosting & Environment Diagnostics**: Detects hostname, protocol, viewport, user agent, and simulated latency ping in real time.
- 🎨 **Small Design System Showcase**: Polished micro-components built with Tailwind CSS (Action buttons, loading spinners, pill status badges, modal dialog, and dynamic theme tinting).
- ⚡ **Interactive Reactivity Playground**: Live state counter, debounce typing test, and an interactive deployment verification checklist.
- 🚀 **1-Click Hosting Ready**:
  - Pre-configured `base: './'` for subdirectory hosting (avoids 404s on GitHub Pages).
  - Production bundle under **60 KB** gzipped.
  - Automated GitHub Pages CI/CD workflow (`.github/workflows/deploy.yml`).

---

## 🛠️ Quickstart

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to view the app.

### 3. Production Build & Local Preview
```bash
npm run build
npm run preview
```

---

## 🚀 How to Host

### Option A: GitHub Pages (Automated via GitHub Actions)
1. Push this repository to GitHub:
   ```bash
   git add .
   git commit -m "feat: complete React test hosting app"
   git push origin main
   ```
2. In your GitHub repository, navigate to **Settings > Pages**.
3. Under **Build and deployment > Source**, select **GitHub Actions**.
4. GitHub Actions will automatically run the build and publish your site!

### Option B: Vercel
```bash
npx vercel
```

### Option C: Netlify
```bash
npx netlify deploy --prod --dir=dist
```
Or connect your GitHub repository directly on Netlify / Vercel with build command `npm run build` and publish directory `dist`.
