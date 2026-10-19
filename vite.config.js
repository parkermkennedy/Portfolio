import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Custom domain (parkermkennedy.com) is served from the root, so base is "/".
export default defineConfig({
  plugins: [react()],
  base: '/',
});
