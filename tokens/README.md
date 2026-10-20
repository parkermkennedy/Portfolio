# Design tokens

The site's colors, type, spacing and shadows come from the **Personal Design System** Figma file:
https://www.figma.com/design/0IfgNuj1RZuWn8IELujhR8/Personal-Design-System

Figma is the source of truth. This folder holds a snapshot of it.

| File | What it is |
| --- | --- |
| `figma-export.json` | Raw export of the Figma variables (Light/Dark modes, with aliases), text styles and effect styles. |
| `tokens.json` | Generated. The same tokens in [W3C Design Tokens](https://tr.designtokens.org/format/) format, for other tools. |
| `../src/styles/tokens.css` | Generated. CSS custom properties, imported by `src/index.css`. |

## Updating

1. Change the design system in Figma and publish the library.
2. Re-export the variables and styles into `figma-export.json`. Ask Claude to "re-export the design tokens from Figma".
3. Run `npm run tokens` and commit all three files.

## Using tokens

- **Tailwind:** the existing color names (`paper`, `ink`, `muted`, `rule`, `accent`, `plate`, …) and font families in `tailwind.config.js` point at the tokens. Keep using `bg-paper`, `text-muted`, `bg-ink/90`, etc.
- **CSS variables:** any token by its Figma code-syntax name, e.g. `var(--text-secondary)`, `var(--spacing-24)`, `var(--component-radius-sm)`, `var(--shadow-image)`.
- **Text styles:** each Figma text style is a class. `text/h1` → `.type-h1`, `text/body/large` → `.type-body-large`, `text/mobile/display` → `.type-mobile-display`.
- **Dark mode:** the tokens include it, but it's off. Setting `data-theme="dark"` on `<html>` switches every token.

Don't edit the generated files by hand. The next `npm run tokens` overwrites them.
