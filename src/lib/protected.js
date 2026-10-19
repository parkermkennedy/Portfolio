// Decrypts a password-protected case study produced by scripts/encrypt.mjs.
// GitHub Pages has no server, so the password is never checked anywhere:
// it is the key. A wrong password simply fails AES-GCM authentication.

const fromB64 = (s) => Uint8Array.from(atob(s), (c) => c.charCodeAt(0));
const storageKey = (slug) => `protected:${slug}`;

export class WrongPasswordError extends Error {}

export async function decryptCaseStudy(slug, password) {
  const res = await fetch(`${import.meta.env.BASE_URL}protected/${slug}.json`);
  if (!res.ok) throw new Error(`Couldn’t load the case study (${res.status}).`);
  const { iterations, salt, iv, data } = await res.json();

  const baseKey = await crypto.subtle.importKey(
    'raw',
    new TextEncoder().encode(password),
    'PBKDF2',
    false,
    ['deriveKey']
  );
  const key = await crypto.subtle.deriveKey(
    { name: 'PBKDF2', salt: fromB64(salt), iterations, hash: 'SHA-256' },
    baseKey,
    { name: 'AES-GCM', length: 256 },
    false,
    ['decrypt']
  );

  let plaintext;
  try {
    plaintext = await crypto.subtle.decrypt({ name: 'AES-GCM', iv: fromB64(iv) }, key, fromB64(data));
  } catch {
    throw new WrongPasswordError();
  }
  const { content, images } = JSON.parse(new TextDecoder().decode(plaintext));
  return resolveImages(content, images);
}

// Swap image names back to the data URLs embedded alongside the content.
function resolveImages(node, images) {
  if (Array.isArray(node)) return node.map((n) => resolveImages(n, images));
  if (node && typeof node === 'object') {
    return Object.fromEntries(
      Object.entries(node).map(([k, v]) => [k, k === 'src' ? images[v] ?? v : resolveImages(v, images)])
    );
  }
  return node;
}

// Remember the password for this browser tab only, so a refresh or a trip
// back to the home page doesn't ask again.
export function rememberPassword(slug, password) {
  try {
    sessionStorage.setItem(storageKey(slug), password);
  } catch {
    // Storage blocked (private mode etc.): the visitor just re-enters it.
  }
}

export function recallPassword(slug) {
  try {
    return sessionStorage.getItem(storageKey(slug));
  } catch {
    return null;
  }
}

export function forgetPassword(slug) {
  try {
    sessionStorage.removeItem(storageKey(slug));
  } catch {
    // ignore
  }
}
