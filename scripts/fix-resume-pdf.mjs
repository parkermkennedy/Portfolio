// Cleans the text layer of the résumé PDF exported from Figma, so that copy,
// search, and résumé-scanning software read whole words ("Built", not "B uilt").
//
//   npm run resume          (after exporting the résumé to public/resume.pdf)
//
// Figma draws the visible text as vector shapes and lays an invisible text
// layer over it for selection and search. That layer is what gets read, and it
// is untidy: kerning and letter-spacing are written as small gaps, and lines
// restart mid-word, all of which text extractors mistake for spaces. This
// rewrites the invisible layer as whole lines. The visible page is untouched.
// Safe to run twice.
import { readFileSync, writeFileSync } from 'node:fs';
import { inflateSync, deflateSync } from 'node:zlib';

const FILE = process.argv[2] ?? 'public/resume.pdf';
// Largest gap (in em) treated as kerning rather than a real space or tab.
const KERN_MAX = 0.1;

// latin1 keeps one character per byte, so offsets match the file.
let pdf = readFileSync(FILE).toString('latin1');

const NUM = '(-?[\\d.]+)';
const STRING = /\((?:\\.|[^\\)])*\)/g;

function objectBody(id) {
  const m = new RegExp(`\\n${id} 0 obj\\n([\\s\\S]*?)endobj`).exec(pdf);
  if (!m) throw new Error(`Object ${id} not found`);
  return m[1];
}

// Glyph widths per font resource name (/F1 …), indexed by character code.
const widths = {};
for (const [, name, id] of pdf.matchAll(/\/(F\d+) (\d+) 0 R/g)) {
  const font = objectBody(id);
  const ref = /\/Widths (\d+) 0 R/.exec(font);
  const first = /\/FirstChar (\d+)/.exec(font);
  if (!ref || !first) continue;
  const list = objectBody(ref[1]).match(/-?[\d.]+/g).map(Number);
  widths[name] = (code) => list[code - Number(first[1])] ?? 0;
}

const ESCAPES = { n: 10, r: 13, t: 9, b: 8, f: 12 };
function charCodes(literal) {
  const codes = [];
  const s = literal.slice(1, -1);
  for (let i = 0; i < s.length; i++) {
    if (s[i] !== '\\') codes.push(s.charCodeAt(i));
    else if (/[0-7]/.test(s[i + 1])) {
      const oct = /^[0-7]{1,3}/.exec(s.slice(i + 1))[0];
      codes.push(parseInt(oct, 8));
      i += oct.length;
    } else {
      i += 1;
      codes.push(ESCAPES[s[i]] ?? s.charCodeAt(i));
    }
  }
  return codes;
}

// A TJ array as a list of string literals and numeric adjustments.
const parseItems = (body) =>
  body.match(/\((?:\\.|[^\\)])*\)|-?[\d.]+/g).map((t) => (t[0] === '(' ? t : Number(t)));

// Horizontal advance of a run, in em (adjustments are thousandths of an em).
function advance(items, font) {
  let em = 0;
  for (const it of items) {
    if (typeof it === 'number') em -= it / 1000;
    else for (const c of charCodes(it)) em += widths[font](c);
  }
  return em;
}

const stats = { gaps: 0, joins: 0, tracked: 0 };
const isGlyph = (it) => typeof it !== 'number';

// Letter-spaced text (the section headings) has a widening gap after nearly
// every glyph. Returns that spacing in em, or 0 for ordinary text.
function tracking(items) {
  const gaps = items.filter((it, i) => !isGlyph(it) && it < 0 && i > 0 && i < items.length - 1);
  const glyphs = items.filter(isGlyph);
  if (glyphs.length < 3 || gaps.length <= glyphs.length / 2) return 0;
  if (glyphs.some((g) => charCodes(g).length !== 1)) return 0;
  return -gaps.sort((x, y) => x - y)[Math.floor(gaps.length / 2)] / 1000;
}

// Moves letter-spacing out of the per-glyph gaps and into the Tc operator,
// which extractors understand; what is left over is ordinary kerning.
function withoutTracking(items, tc) {
  const out = [];
  items.forEach((it, i) => {
    if (!isGlyph(it)) return;
    if (i > 0) {
      const gap = isGlyph(items[i - 1]) ? 0 : items[i - 1];
      const inside = out.length > 0;
      out.push(inside ? gap + tc * 1000 : gap);
    }
    out.push(it);
  });
  return out.filter((it) => isGlyph(it) || Math.abs(it) >= 0.5);
}

// Drops the small widening gaps between glyphs, which read as spaces.
function dropKerningGaps(items) {
  return items.filter((it, i) => {
    const between = i > 0 && i < items.length - 1;
    const isGap = !isGlyph(it) && it < 0 && it > -KERN_MAX * 1000 && between;
    if (isGap) stats.gaps += 1;
    return !isGap;
  });
}

const RUN = new RegExp(
  `${NUM} ${NUM} ${NUM} ${NUM} ${NUM} ${NUM} Tm\\n/(F\\d+) ${NUM} Tf\\n\\[ ([\\s\\S]*?)\\] TJ\\n?`,
  'y',
);
const fmt = (n) => n.toFixed(6);

// Rewrites one BT … ET block as whole lines: one position per line, then the
// text, switching font without repositioning. Returns the block unchanged if
// it isn't the simple "matrix, font, text" sequence Figma writes.
function fixTextBlock(block) {
  const lines = [];
  let pos = 0;
  while (pos < block.length) {
    RUN.lastIndex = pos;
    const m = RUN.exec(block);
    if (!m) return block;
    pos = RUN.lastIndex;
    const matrix = m.slice(1, 7).map(Number);
    const [a, b, c, , e] = matrix;
    const font = m[7];
    if (!widths[font]) return block;
    const raw = parseItems(m[9]);
    const tc = tracking(raw);
    if (tc) stats.tracked += 1;
    const seg = { font, size: m[8], tc, items: dropKerningGaps(tc ? withoutTracking(raw, tc) : raw) };
    const endX = e + a * advance(raw, font);

    const line = lines[lines.length - 1];
    const sameLine =
      line && b === 0 && c === 0 && seg.size === line.size && [0, 1, 2, 3, 5].every((i) => line.matrix[i] === matrix[i]);
    // Distance from where the previous run ends to where this one starts.
    const gap = sameLine ? (e - line.endX) / a - line.segs[line.segs.length - 1].tc : Infinity;
    const startsWord = line && line.segs.length === 1 && gap > KERN_MAX && gap < 1;
    if (Math.abs(gap) <= KERN_MAX || startsWord) {
      // Same word, restarted. A first glyph left stranded short of the rest of
      // its word is moved up to it; a tightening gap is kept; a widening one
      // would read as a space again, so it goes.
      if (startsWord) line.head[4] = fmt(line.matrix[4] + gap * a);
      else if (gap < -0.0005) seg.items.unshift(-gap * 1000);
      const last = line.segs[line.segs.length - 1];
      if (last.font === seg.font && last.tc === seg.tc) last.items.push(...seg.items);
      else line.segs.push(seg);
      line.endX = endX;
      stats.joins += 1;
    } else lines.push({ head: m.slice(1, 7), matrix, size: seg.size, segs: [seg], endX });
  }
  return lines
    .map((l) => {
      let tc = 0;
      let out = `${l.head.join(' ')} Tm\n`;
      for (const s of l.segs) {
        if (s.tc !== tc) out += `${fmt((tc = s.tc))} Tc\n`;
        out += `/${s.font} ${s.size} Tf\n[ ${s.items.map((it) => (isGlyph(it) ? it : fmt(it))).join(' ')} ] TJ\n`;
      }
      return tc ? `${out}${fmt(0)} Tc\n` : out;
    })
    .join('');
}

// Rewrite each compressed content stream in place. The new stream is never
// longer than the old one, so it is padded to the same size and every other
// object keeps its position in the file.
const STREAM = /\n\s*<< \/Filter \/FlateDecode\n\s*\/Length (\d+) 0 R\n\s*>>\nstream\n/g;
let rewritten = 0;
for (const m of [...pdf.matchAll(STREAM)]) {
  const start = m.index + m[0].length;
  const lengthObj = new RegExp(`\\n${m[1]} 0 obj\\n\\s*(\\d+)\\s*\\nendobj`).exec(pdf);
  if (!lengthObj) continue;
  const length = Number(lengthObj[1]);
  let content;
  try {
    content = inflateSync(Buffer.from(pdf.slice(start, start + length), 'latin1')).toString('latin1');
  } catch {
    continue;
  }
  if (!content.includes(' TJ')) continue;

  const fixed = content.replace(/(BT\n)([\s\S]*?)(ET\n)/g, (_, bt, body, et) => bt + fixTextBlock(body) + et);
  if (fixed === content) continue;

  const packed = deflateSync(Buffer.from(fixed, 'latin1'), { level: 9 }).toString('latin1');
  const end = pdf.indexOf('endobj', start + length) + 'endobj'.length;
  const tail = '\nendstream\nendobj';
  const room = end - start;
  if (packed.length + tail.length > room) throw new Error('Rewritten stream does not fit; file left unchanged');
  pdf = pdf.slice(0, start) + packed + tail + '\n'.repeat(room - packed.length - tail.length) + pdf.slice(end);

  const digits = lengthObj[1].length;
  const at = lengthObj.index + lengthObj[0].lastIndexOf(lengthObj[1]);
  pdf = pdf.slice(0, at) + String(packed.length).padStart(digits, '0') + pdf.slice(at + digits);
  rewritten += 1;
}

if (rewritten === 0) {
  console.log(`${FILE}: nothing to fix`);
} else {
  writeFileSync(FILE, Buffer.from(pdf, 'latin1'));
  console.log(`${FILE}: removed ${stats.gaps} kerning gaps, joined ${stats.joins} split runs, fixed ${stats.tracked} letter-spaced runs`);
}
