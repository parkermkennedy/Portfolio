# Portfolio — parkermkennedy.com

React + Vite + Tailwind CSS implementation of the Figma "Portfolio" design.

**Pages**
- `/` — Home (hero + grayscale ramp, selected work, about, résumé, footer). Responsive from 390px mobile to 1440px desktop.
- `/work/calman-5-workflow-makeover` — Calman 5 Workflow Makeover case study.
- `/work/next-gen-calman` — Next-Gen Calman case study, behind a password gate.

## Design tokens

Colors, type, spacing and shadows come from the Personal Design System in Figma. The tokens live in `tokens/`, and `npm run tokens` generates `src/styles/tokens.css` from them. See [`tokens/README.md`](tokens/README.md).

## Password-protected case study

The repo is public and GitHub Pages has no server, so the Next-Gen Calman content is **encrypted**, not just hidden:

- Plaintext lives in `private/` (gitignored, never commit it): `private/next-gen-calman.json` plus the images it references.
- `npm run encrypt` turns it into AES-256-GCM ciphertext at `public/protected/next-gen-calman.json` (key derived from the password with PBKDF2-SHA256, 600k iterations). Commit that file; it's useless without the password.
- In the browser, `src/lib/protected.js` decrypts it with whatever the visitor types. A wrong password fails decryption, so the password itself is stored nowhere. It's remembered for the tab in `sessionStorage`.

```bash
PASSWORD='the-password' npm run encrypt
```

Re-run it whenever you edit the content or change the password. Keep a backup of `private/`: it exists only on your machine.

## Setup

```bash
npm install
npm run assets   # downloads images/icons from Figma into public/assets (see note below)
npm run dev
```

**Assets:** the URLs in `scripts/fetch-assets.sh` are temporary Figma export links (about 7 days). If they have expired, export these from Figma and save into `public/assets/` with the same names:
`seal.png`, `nextgen-preview-blurred.jpg` (committed; blur is baked in, regenerate it from a sharp export rather than fetching), `c5-before.png`, `c5-after.png`, `about-photo.png`, `about-photo-mobile.png`, `cs-before.png`, `cs-after.png`, and SVGs `arrow-ext`, `arrow-external`, `arrow-right`, `arrow-down`, `arrow-left`, `lock`, `menu-button`.

**Résumé:** add your PDF at `public/resume.pdf` (the "Download PDF" / "Download résumé" links point to `/resume.pdf`).

## Deploy (GitHub Pages, custom domain)

`.github/workflows/deploy.yml` builds and deploys on every push to `main`.

1. Repo → Settings → Pages → Source: **GitHub Actions**.
2. Custom domain: `parkermkennedy.com` (also set by `public/CNAME`). DNS must point at GitHub Pages.
3. `npm run build` also writes `dist/404.html` so deep links work with client-side routing.
