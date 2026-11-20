import { asset } from '../lib/assets.js';

/** CSS that paints an exported SVG in the current text color, so icons follow the theme. */
export function maskStyle(name) {
  const mask = `url("${asset(name)}") center / 100% 100% no-repeat`;
  return { WebkitMask: mask, mask, backgroundColor: 'currentColor' };
}

/**
 * Renders one of the exported Figma SVGs. The wrapper keeps the frame size
 * from the design (16px by default) and the inset reproduces the stroke bleed.
 * The SVG is used as a mask, so the icon takes the color of the text around it.
 */
export default function Icon({ name, size = 16, height = size, inset = '-4.69%', className = '' }) {
  return (
    <span
      className={`relative inline-block shrink-0 ${className}`}
      style={{ width: size, height }}
      aria-hidden="true"
    >
      <span className="absolute" style={{ inset, ...maskStyle(name) }} />
    </span>
  );
}
