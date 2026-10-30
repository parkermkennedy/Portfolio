import { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from './Icon.jsx';
import Seal from './Seal.jsx';
import { asset, EMAIL } from '../lib/assets.js';

const LINKS = [
  { label: 'Work', to: '/#work' },
  { label: 'About', to: '/#about' },
  { label: 'Résumé', to: '/#resume' },
];

export default function Nav() {
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);
  // On case-study pages the "Work" link is highlighted in the brand red.
  const workActive = pathname.startsWith('/work');
  const menuButton = useRef(null);

  // Escape closes the mobile menu and returns focus to its button.
  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e) => {
      if (e.key !== 'Escape') return;
      setOpen(false);
      menuButton.current?.focus();
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [open]);

  const isCurrent = (label) => label === 'Work' && workActive;
  const linkClass = (label) => `font-sans text-[16px] ${isCurrent(label) ? 'text-accent' : 'text-ink'}`;

  return (
    <header className="relative border-b border-rule">
      <nav
        className="gutter flex items-center justify-between py-[18px] lg:py-7"
        aria-label="Primary"
      >
        <Link
          to="/"
          className="flex items-center gap-3 lg:gap-[14px]"
          onClick={() => setOpen(false)}
        >
          <Seal imgClassName="size-8 lg:size-9" tipClassName="left-0 top-full mt-2" />
          <span className="font-sans text-[16px] font-medium tracking-[-0.005em] lg:text-[17px]">
            Parker Kennedy
          </span>
        </Link>

        {/* Desktop links */}
        <div className="hidden items-center gap-10 lg:flex">
          {LINKS.map((l) => (
            <Link
              key={l.label}
              to={l.to}
              className={linkClass(l.label)}
              aria-current={isCurrent(l.label) ? 'true' : undefined}
            >
              {l.label}
            </Link>
          ))}
          <a
            href={`mailto:${EMAIL}`}
            className="inline-flex items-center gap-[10px] font-sans text-[16px] font-medium underline"
          >
            Email
            <Icon name="arrow-ext.svg" />
          </a>
        </div>

        {/* Mobile menu button */}
        <button
          ref={menuButton}
          type="button"
          className="relative size-11 lg:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? 'Close menu' : 'Open menu'}
          onClick={() => setOpen((o) => !o)}
        >
          <img src={asset('menu-button.svg')} alt="" className="absolute inset-0 block size-full max-w-none" />
        </button>
      </nav>

      {open && (
        <div
          id="mobile-menu"
          className="absolute inset-x-0 top-full z-20 border-b border-rule bg-paper px-5 pb-6 pt-2 lg:hidden"
        >
          <ul className="flex flex-col">
            {LINKS.map((l) => (
              <li key={l.label} className="border-b border-rule last:border-b-0">
                <Link
                  to={l.to}
                  className={`block py-4 ${linkClass(l.label)}`}
                  aria-current={isCurrent(l.label) ? 'true' : undefined}
                  onClick={() => setOpen(false)}
                >
                  {l.label}
                </Link>
              </li>
            ))}
            <li>
              <a
                href={`mailto:${EMAIL}`}
                className="inline-flex items-center gap-[10px] py-4 font-sans text-[16px] font-medium underline"
              >
                Email
                <Icon name="arrow-ext.svg" />
              </a>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
