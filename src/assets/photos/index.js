/**
 * PHOTO MANIFEST — Hamna
 * ─────────────────────────────────────────────────────────────────────────
 * Nothing here is hardcoded to a fixed count. Drop files in as
 * `n-480.webp / n-900.webp / n-1400.webp / n-1400.jpg` and the collage
 * geometry is DERIVED from however many exist — 4, 5, 6 or 8 all lay out
 * cleanly without touching the component.
 *
 * All photos are normalised to a 3:4 portrait so the scattered arrangement
 * stays even, and each ships three WebP widths plus a JPEG fallback.
 */

const WEBP = import.meta.glob("./*.webp", { eager: true, import: "default" });
const JPEG = import.meta.glob("./*-1400.jpg", { eager: true, import: "default" });

const pick = (map, name) => map[`./${name}`];

/** Derived, never assumed. */
const COUNT = Object.keys(JPEG).length;

/**
 * Collage geometry for N photos: they alternate left/right of centre down a
 * gentle serpentine, each with a different size and tilt. Deterministic — no
 * Math.random — so the layout is stable across reloads.
 */
/**
 * Collage geometry for N photos.
 *
 * THE BUG THIS REPLACES: the manifest was count-flexible but the CSS wasn't —
 * `.hm-collage` kept a hardcoded `height: clamp(30rem,72vw,44rem)` sized for
 * the old five-photo design, and positions were percentages of that fixed box.
 * With six photos the lower rows landed past the bottom edge and stacked on
 * top of each other, so photos that loaded perfectly were simply not visible.
 *
 * Rows are now emitted as an index, not a percentage, and the container height
 * is derived from the row count in CSS via calc(). Any number of photos gets a
 * correctly-sized box, at any viewport width.
 */
function layoutFor(n) {
  const out = [];
  for (let i = 0; i < n; i++) {
    const row = Math.floor(i / 2);
    const right = i % 2 === 1;
    const rows = Math.ceil(n / 2);
    const drift = (row / Math.max(1, rows - 1)) * 6;
    out.push({
      row,                                   // CSS multiplies this by --rowh
      side: right ? 1 : 0,                   // half-row vertical offset
      x: right ? 50 - drift + (row % 2) * 5 : 5 + drift + (row % 2) * 6,
      rot: [-6.5, 4.2, -3.1, 7.4, -5.2, 2.8, -4.4, 6.1][i % 8],
      scale: [1.0, 1.09, 0.93, 0.88, 1.04, 0.96, 1.01, 0.9][i % 8],
    });
  }
  return out;
}

/** Row count, exported so the collage can size itself. */
const ROWS = Math.ceil(COUNT / 2);

const ALTS = [
  "Hamna in a blush pink coat on a winter morning",
  "Hamna in an orange embroidered suit",
  "Hamna in a red jacket",
  "Hamna outdoors in black florals",
  "Hamna against an open sky",
  "Hamna out on an evening walk",
];

const geometry = layoutFor(COUNT);

const PHOTOS = Array.from({ length: COUNT }, (_, i) => {
  const n = i + 1;
  const w480 = pick(WEBP, `${n}-480.webp`);
  const w900 = pick(WEBP, `${n}-900.webp`);
  const w1400 = pick(WEBP, `${n}-1400.webp`);
  return {
    id: i,
    webp: `${w480} 480w, ${w900} 900w, ${w1400} 1400w`,
    src: pick(JPEG, `${n}-1400.jpg`),
    thumb: w480,
    w: 1400,
    h: 1867,
    alt: ALTS[i] || `Hamna, photo ${n}`,
    ...geometry[i],
  };
});

export default PHOTOS;
export { COUNT, ROWS };
