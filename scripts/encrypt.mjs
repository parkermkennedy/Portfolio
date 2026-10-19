// Encrypts the password-protected case studies so the plaintext never ships.
//
//   PASSWORD='…' npm run encrypt
//
// Reads private/<slug>.json (gitignored), embeds every image it references
// from private/, and writes AES-256-GCM ciphertext to
// public/protected/<slug>.json. Only the ciphertext is committed and deployed;
// src/lib/protected.js decrypts it in the browser with the same password.
import { readFileSync, writeFileSync, mkdirSync, readdirSync } from 'node:fs';
import { extname, join } from 'node:path';
import { webcrypto as crypto } from 'node:crypto';

const PRIVATE_DIR = 'private';
const OUT_DIR = 'public/protected';
// Keep in sync with src/lib/protected.js.
const ITERATIONS = 600_000;
const MIME = { '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.webp': 'image/webp', '.svg': 'image/svg+xml' };

const password = process.env.PASSWORD;
if (!password) {
  console.error('Set PASSWORD, e.g.  PASSWORD=\'your-password\' npm run encrypt');
  process.exit(1);
}

const toB64 = (buf) => Buffer.from(buf).toString('base64');

// Collect every image referenced by `src` so each file is embedded once, as a
// data URL in `images`; the browser swaps the names back in after decrypting.
function collectImages(node, images = {}) {
  if (Array.isArray(node)) node.forEach((n) => collectImages(n, images));
  else if (node && typeof node === 'object') {
    for (const [k, v] of Object.entries(node)) {
      if (k === 'src' && typeof v === 'string' && !(v in images)) {
        const mime = MIME[extname(v).toLowerCase()];
        if (!mime) throw new Error(`Unsupported image type: ${v}`);
        images[v] = `data:${mime};base64,${toB64(readFileSync(join(PRIVATE_DIR, v)))}`;
      } else collectImages(v, images);
    }
  }
  return images;
}

async function encrypt(plaintext) {
  const salt = crypto.getRandomValues(new Uint8Array(16));
  const iv = crypto.getRandomValues(new Uint8Array(12));
  const baseKey = await crypto.subtle.importKey('raw', new TextEncoder().encode(password), 'PBKDF2', false, ['deriveKey']);
  const key = await crypto.subtle.deriveKey(
    { name: 'PBKDF2', salt, iterations: ITERATIONS, hash: 'SHA-256' },
    baseKey,
    { name: 'AES-GCM', length: 256 },
    false,
    ['encrypt']
  );
  const data = await crypto.subtle.encrypt({ name: 'AES-GCM', iv }, key, new TextEncoder().encode(plaintext));
  return { v: 1, iterations: ITERATIONS, salt: toB64(salt), iv: toB64(iv), data: toB64(data) };
}

mkdirSync(OUT_DIR, { recursive: true });
for (const file of readdirSync(PRIVATE_DIR).filter((f) => f.endsWith('.json'))) {
  const content = JSON.parse(readFileSync(join(PRIVATE_DIR, file), 'utf8'));
  const payload = await encrypt(JSON.stringify({ content, images: collectImages(content) }));
  writeFileSync(join(OUT_DIR, file), JSON.stringify(payload));
  console.log(`Encrypted ${file} → ${join(OUT_DIR, file)}`);
}
