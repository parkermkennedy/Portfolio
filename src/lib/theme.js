import { useSyncExternalStore } from 'react';

// The theme is the data-theme attribute on <html>. An inline script in
// index.html sets it before first paint (saved choice, else the system setting);
// this module changes it afterwards and tells every toggle on the page.
const KEY = 'theme';
const systemQuery = window.matchMedia('(prefers-color-scheme: dark)');
const listeners = new Set();

function savedTheme() {
  try {
    const t = localStorage.getItem(KEY);
    return t === 'light' || t === 'dark' ? t : null;
  } catch {
    return null;
  }
}

const getTheme = () =>
  document.documentElement.dataset.theme ?? (systemQuery.matches ? 'dark' : 'light');

function setTheme(theme) {
  document.documentElement.dataset.theme = theme;
  listeners.forEach((notify) => notify());
}

// Follow the system setting until the visitor picks a theme themselves.
systemQuery.addEventListener('change', (e) => {
  if (!savedTheme()) setTheme(e.matches ? 'dark' : 'light');
});

function subscribe(notify) {
  listeners.add(notify);
  return () => listeners.delete(notify);
}

function toggle() {
  const next = getTheme() === 'dark' ? 'light' : 'dark';
  try {
    localStorage.setItem(KEY, next);
  } catch {
    // Storage can be blocked (private windows); the choice then lasts for this visit.
  }
  setTheme(next);
}

/** Returns the active theme and a function that switches it and remembers the choice. */
export function useTheme() {
  return { theme: useSyncExternalStore(subscribe, getTheme), toggle };
}
