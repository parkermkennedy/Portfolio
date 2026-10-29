const token = (name) => `rgb(var(--${name}-rgb) / <alpha-value>)`;

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      // Colors come from the design-system tokens in src/styles/tokens.css.
      // The *-rgb channels keep Tailwind opacity modifiers working (e.g. bg-ink/90).
      colors: {
        paper: token('background-primary'),
        sand: token('background-secondary'),
        ink: token('text-primary'),
        muted: token('text-secondary'),
        rule: token('border-default'),
        accent: token('accent-default'),
        error: token('text-error'),
        plate: token('surface-plate'),
        'plate-label': token('text-inverse-secondary'),
        'dark-rule': token('border-inverse'),
        'dark-muted': token('text-inverse-secondary'),
      },
      fontFamily: {
        serif: 'var(--font-family-serif)',
        sans: 'var(--font-family-sans)',
        mono: 'var(--font-family-mono)',
        kr: ['"Noto Sans KR"', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
