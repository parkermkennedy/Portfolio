/**
 * The site's icon set. It mirrors the Icons section of the Personal Design
 * System Figma file, which is the source of truth.
 *
 * Every icon follows the same rules:
 * - drawn on a 16 × 16 frame, with the glyph reaching the frame edges at most
 * - stroke only: 1.5px, centered on the path, round caps and joins
 * - no color of its own: it takes the color of the text around it
 *
 * The stroke stays 1.5px at every size, so a 56px arrow is as light as a 16px one.
 */
const GRID = 16;
const STROKE = 1.5;

const ICONS = {
  'arrow-right': <path d="M0 8H16M9.333 16L16 8L9.333 0" />,
  'arrow-left': <path d="M16 8H0M6.667 16L0 8L6.667 0" />,
  'arrow-down': <path d="M8 0V16M16 9.333L8 16L0 9.333" />,
  'arrow-up-right': <path d="M0 16L16 0M16 12V0H4" />,
  lock: <path d="M1 7H15V16H1ZM3.5 7V4C3.5 1.8 5.5 0 8 0C10.5 0 12.5 1.8 12.5 4V7" />,
  menu: <path d="M0 0H16M0 8H16M0 16H16" />,
  repeat: <path d="M13.5 8A5.5 5.5 0 1 1 11.9 4.1M12.5 1.5V4.5H9.5" />,
  sun: (
    <>
      <circle cx="8" cy="8" r="3.5" />
      <path d="M8 0V1.75M8 14.25V16M0 8H1.75M14.25 8H16M2.34 2.34L3.58 3.58M12.42 12.42L13.66 13.66M2.34 13.66L3.58 12.42M12.42 3.58L13.66 2.34" />
    </>
  ),
  moon: <path d="M15.25 9.3A7.25 7.25 0 1 1 6.7 0.75A5.75 5.75 0 0 0 15.25 9.3Z" />,
};

export const ICON_NAMES = Object.keys(ICONS);

/**
 * Renders one icon from the set as a square of `size` pixels (16 by default).
 * The stroke may extend up to 0.75px past the square, as it does in Figma.
 */
export default function Icon({ name, size = GRID, className = '' }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${GRID} ${GRID}`}
      fill="none"
      stroke="currentColor"
      strokeWidth={(STROKE * GRID) / size}
      strokeLinecap="round"
      strokeLinejoin="round"
      overflow="visible"
      aria-hidden="true"
      className={`inline-block shrink-0 ${className}`}
    >
      {ICONS[name]}
    </svg>
  );
}
