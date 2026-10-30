import { useEffect, useRef, useState } from 'react';
import { asset } from '../lib/assets.js';

/**
 * The red name seal, with a label on hover showing what it reads.
 * `interactive` makes it a button so touch and keyboard users can toggle the
 * label too; leave it off when the seal already sits inside a link.
 * `tipClassName` positions the label (e.g. above or below, left or right edge).
 */
export default function Seal({ alt = '', className = '', imgClassName = '', tipClassName = '', tone = 'dark', interactive = false }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  // Close on a tap outside or Escape.
  useEffect(() => {
    if (!open) return undefined;
    const onPointer = (e) => !ref.current?.contains(e.target) && setOpen(false);
    const onKey = (e) => e.key === 'Escape' && setOpen(false);
    document.addEventListener('pointerdown', onPointer);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('pointerdown', onPointer);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  const tip = (
    // The name is already in the image's alt text, so screen readers skip the visual label.
    <span
      aria-hidden="true"
      data-open={open}
      className={`pointer-events-none absolute z-20 whitespace-nowrap rounded-[2px] px-[10px] py-[6px] font-sans text-[13px] font-medium leading-[1.3] opacity-0 transition-opacity duration-150 group-hover/seal:opacity-100 group-focus-visible/seal:opacity-100 data-[open=true]:opacity-100 ${
        tone === 'dark' ? 'bg-ink text-paper' : 'bg-paper text-ink'
      } ${tipClassName}`}
    >
      <span lang="ko" className="font-kr font-normal">박광민</span> - Park Kwang Min
    </span>
  );
  const img = <img src={asset('seal.png')} alt={alt} className={`block object-cover ${imgClassName}`} />;

  if (!interactive) {
    return (
      <span className={`group/seal relative inline-flex shrink-0 ${className}`}>
        {img}
        {tip}
      </span>
    );
  }
  return (
    <button
      ref={ref}
      type="button"
      onClick={() => setOpen((o) => !o)}
      className={`group/seal relative inline-flex shrink-0 cursor-help ${className}`}
    >
      {img}
      {tip}
    </button>
  );
}
