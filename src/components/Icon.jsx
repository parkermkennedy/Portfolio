import { asset } from '../lib/assets.js';

/**
 * Renders one of the exported Figma SVGs. The wrapper keeps the frame size
 * from the design (16px by default) and the inset reproduces the stroke bleed.
 */
export default function Icon({ name, size = 16, height = size, inset = '-4.69%', className = '' }) {
  return (
    <span
      className={`relative inline-block shrink-0 ${className}`}
      style={{ width: size, height }}
      aria-hidden="true"
    >
      <span className="absolute" style={{ inset }}>
        <img alt="" src={asset(name)} className="block h-full w-full max-w-none" />
      </span>
    </span>
  );
}
