/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        paper: '#f5f3ee',
        sand: '#ece9e2',
        ink: '#151515',
        muted: '#54514b',
        rule: '#d8d4cb',
        accent: '#d51b36',
        plate: '#1c1c1b',
        'plate-label': '#bdbab5',
        'dark-rule': '#40403d',
        'dark-muted': '#b8b5ad',
      },
      fontFamily: {
        serif: ['Newsreader', 'Georgia', 'serif'],
        sans: ['"IBM Plex Sans"', 'system-ui', 'sans-serif'],
        mono: ['"IBM Plex Mono"', 'ui-monospace', 'monospace'],
        kr: ['"Noto Sans KR"', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
