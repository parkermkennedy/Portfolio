// GitHub Pages has no server-side routing. Copying index.html to 404.html makes
// deep links (e.g. /work/calman-5-workflow-makeover) load the SPA and let
// React Router take over.
import { copyFileSync } from 'node:fs';
copyFileSync('dist/index.html', 'dist/404.html');
console.log('Created dist/404.html for SPA routing on GitHub Pages');
