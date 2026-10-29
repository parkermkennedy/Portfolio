import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { Outlet, useLocation } from 'react-router-dom';
import Nav from './Nav.jsx';

// Focus a non-interactive element (a heading or section) so screen readers
// read from there. tabindex="-1" makes it focusable without adding a tab stop.
export function focusElement(el) {
  if (!el) return;
  if (!el.hasAttribute('tabindex')) el.setAttribute('tabindex', '-1');
  el.focus({ preventScroll: true });
}

function ScrollManager() {
  const { pathname, hash } = useLocation();
  const firstRender = useRef(true);
  useEffect(() => {
    // Leave focus alone on the initial page load; screen readers start at the top.
    const moveFocus = !firstRender.current;
    firstRender.current = false;
    if (hash) {
      // Wait a tick so the target section exists after a route change.
      const id = decodeURIComponent(hash.slice(1));
      const t = setTimeout(() => {
        const target = document.getElementById(id);
        target?.scrollIntoView();
        if (moveFocus) focusElement(target);
      }, 0);
      return () => clearTimeout(t);
    }
    window.scrollTo(0, 0);
    // On a new page, start screen readers and keyboard users at its heading.
    if (moveFocus) focusElement(document.querySelector('main h1') ?? document.getElementById('main'));
  }, [pathname, hash]);
  return null;
}

/** Renders children into one of the Layout's slots outside <main> (see below). */
export function PageSlot({ name, children }) {
  const [slot, setSlot] = useState(null);
  // The slot lives in Layout; wait for it to mount.
  useEffect(() => setSlot(document.getElementById(`page-${name}`)), [name]);
  return slot ? createPortal(children, slot) : null;
}

export default function Layout() {
  return (
    <>
      <ScrollManager />
      <a
        href="#main"
        className="skip-link"
        onClick={(e) => {
          e.preventDefault();
          focusElement(document.getElementById('main'));
        }}
      >
        Skip to content
      </a>
      {/* Pages can portal a full-width banner above the nav (e.g. the NDA notice). */}
      <div id="page-banner" />
      <Nav />
      <main id="main">
        <Outlet />
      </main>
      {/* Pages portal their footer here so it's the page's footer landmark, not part of <main>. */}
      <div id="page-footer" />
    </>
  );
}
