# Portfolio — parkermkennedy.com

React + Vite + Tailwind CSS implementation of the Figma "Portfolio" design.

**Pages**
- `/` — Home (hero + grayscale ramp, selected work, about, résumé, footer). Responsive from 390px mobile to 1440px desktop.
- `/work/calman-5-workflow-makeover` — Calman 5 Workflow Makeover case study.

The Next-Gen Calman case study (password protected) and its gate screen are intentionally **not built yet**. Its cards on the home page and the "next project" link are rendered but disabled.

## Setup

```bash
npm install
npm run assets   # downloads images/icons from Figma into public/assets (see note below)
npm run dev
```

**Assets:** the URLs in `scripts/fetch-assets.sh` are temporary Figma export links (about 7 days). If they have expired, export these from Figma and save into `public/assets/` with the same names:
`seal.png`, `nextgen-desktop.png`, `nextgen-mobile.png`, `c5-before.png`, `c5-after.png`, `about-photo.png`, `about-photo-mobile.png`, `cs-before.png`, `cs-after.png`, and SVGs `arrow-ext`, `arrow-external`, `arrow-right`, `arrow-down`, `arrow-left`, `lock`, `menu-button`.

**Résumé:** add your PDF at `public/resume.pdf` (the "Download PDF" / "Download résumé" links point to `/resume.pdf`).

## Deploy (GitHub Pages, custom domain)

`.github/workflows/deploy.yml` builds and deploys on every push to `main`.

1. Repo → Settings → Pages → Source: **GitHub Actions**.
2. Custom domain: `parkermkennedy.com` (also set by `public/CNAME`). DNS must point at GitHub Pages.
3. `npm run build` also writes `dist/404.html` so deep links work with client-side routing.
