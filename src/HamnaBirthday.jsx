/**
 * ═══════════════════════════════════════════════════════════════════════════
 *  HAMNA — "The Albatross Chapters"
 *  A single-page Cinderella-fairytale birthday site.
 *
 *  Structure (kept in one file so it drops straight into an artifact preview;
 *  every section below is already a standalone component — split them into
 *  /src/sections/*.jsx and /src/lib/*.js when you move it into the real repo):
 *
 *    lib      → Particles (pooled), MusicBox (single shared audio), hooks
 *    sections → EntryGate, Hero, Gallery, Note, Cake, Wishes, Footer
 *    chrome   → FairyCursor, ParticleField, MuteToggle, RibbonDivider
 *
 *  ── SWAP IN HER PHOTOS ──────────────────────────────────────────────────
 *  The 5 photos weren't attached, so PHOTOS below uses obvious placeholders.
 *  Replace each entry's `src` (and add `webp`/`srcSet` if you have them) and
 *  everything else — layout, reveal, Ken Burns, lightbox — keeps working.
 * ═══════════════════════════════════════════════════════════════════════════
 */

import React, {
  useState,
  useEffect,
  useRef,
  useMemo,
  useCallback,
  useLayoutEffect,
  createContext,
  useContext,
} from "react";

/* ═══════════════════════════════════════════════════════════════════════════
   CONFIG
   ═══════════════════════════════════════════════════════════════════════════ */

const NAME = "Hamna";
const FULL_NAME = "Syeda Hamna Shah";
const NICKNAME = "Albatross";

/**
 * Chapter labels come from one ordered list. Previously each section carried a
 * hardcoded "Chapter one" / "Chapter two" string, so reordering sections left
 * stale numbers behind and two sections could claim the same label. Now the
 * number is derived from position in this array — reorder it and the labels
 * follow. The closing section deliberately has NO chapter: it gets its own
 * title, which is what the footer was wrongly borrowing from the cake.
 */
const CHAPTERS = ["cake", "gallery", "letter", "wishes"];
const ORDINALS = ["one", "two", "three", "four", "five", "six", "seven"];
const chapterOf = (key) => {
  const i = CHAPTERS.indexOf(key);
  return i < 0 ? "" : `Chapter ${ORDINALS[i]}`;
};
const BIRTHDAY_LONG = "the fourth of October";
const BIRTHDAY_MONTH = 9;   // 0-indexed: October
const BIRTHDAY_DAY = 4;

/**
 * `sizes` hints so the browser fetches the right width instead of the biggest.
 * Gallery frames are ~30% of a max-64rem collage; the lightbox fills the viewport.
 */
const FRAME_SIZES = "(max-width: 760px) 78vw, (max-width: 1100px) 30vw, 300px";
const LIGHTBOX_SIZES = "(max-width: 700px) 86vw, 700px";

/**
 * AUDIO — drop any .mp3/.m4a/.ogg/.wav into  src/assets/audio/  and it is
 * picked up automatically, hashed and bundled by Vite. No path to mistype.
 * If the folder is empty (or the file fails to load), the site plays a
 * built-in music-box arrangement of the melody via Web Audio instead — so
 * the tap is never silent.
 */
const AUDIO_FILES = import.meta.glob("./assets/audio/*.{mp3,m4a,ogg,wav}", {
  eager: true,
  import: "default",
});
const SONG_SRC = Object.keys(AUDIO_FILES).sort().map((k) => AUDIO_FILES[k])[0] || "";

/**
 * PHOTOS — her five, with WebP srcsets and JPEG fallbacks.
 * Layout and ordering live in src/assets/photos/index.js; edit the rows there
 * to re-arrange the collage. Nothing in this file needs touching for that.
 */
import PHOTOS, { ROWS } from "./assets/photos/index.js";

/* ═══════════════════════════════════════════════════════════════════════════
   HOOKS
   ═══════════════════════════════════════════════════════════════════════════ */

/** True when the OS asks for calmer motion. Live-updates if the user flips it. */
function useReducedMotion() {
  const [reduced, setReduced] = useState(
    () => typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const on = () => setReduced(mq.matches);
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, []);
  return reduced;
}

/**
 * Cheap low-power heuristic: coarse pointer (touch) or few logical cores.
 * Used to halve particle budgets and drop tilt / cursor-follow work.
 */
function useLowPower() {
  return useMemo(() => {
    if (typeof window === "undefined") return true;

    // BUG THIS REPLACES: the old version read
    //     const mem = navigator.deviceMemory || 4;   →   mem <= 4  ⇒ true
    // `navigator.deviceMemory` is undefined in Safari and Firefox, and
    // `hardwareConcurrency` is hidden by some privacy settings — so the `|| 4`
    // fallback made EVERY Safari and Firefox desktop report as low-power. That
    // silently cut the finale to 42% density, shrank the particle pool, and
    // switched the cursor trail off entirely on those browsers.
    //
    // Absence of a signal is not evidence of a weak device. Only downgrade on
    // a value the browser actually reported.
    const coarse = window.matchMedia("(pointer: coarse)").matches;
    const cores = navigator.hardwareConcurrency;
    const mem = navigator.deviceMemory;
    const weakCPU = typeof cores === "number" && cores > 0 && cores <= 4;
    const weakRAM = typeof mem === "number" && mem > 0 && mem <= 4;
    return coarse || weakCPU || weakRAM;
  }, []);
}

/**
 * Attaches to an element and reports when it leaves the viewport, so its
 * subtree's animations can be paused. This is the single biggest fast-scroll
 * win in the file: offscreen SVG animation still costs full repaints.
 */
function useOffscreen(margin = "25%") {
  const ref = useRef(null);
  const [off, setOff] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el || !("IntersectionObserver" in window)) return;
    const io = new IntersectionObserver(
      ([e]) => setOff(!e.isIntersecting),
      { rootMargin: `${margin} 0px` }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [margin]);
  return [ref, off];
}

/**
 * Measures a container's real content height from its actual rendered
 * children and applies it as an inline min-height, plus a fixed safety pad.
 *
 * THE BUG THIS REPLACES: the gallery collage sized itself with a CSS calc()
 * that approximated each photo as a bare `width * 4/3` rectangle. It never
 * accounted for the polaroid frame's own padding (8px/8px/30px) or the
 * caption row rendered below the photo — about 1–2.5rem of real height per
 * frame that the formula didn't know about. On the bottom row, at several
 * photo counts and widths, that was enough for painted pixels to spill past
 * the container's bottom edge into the next section, which — being later in
 * the DOM — paints on top and visually covers the photos beneath it.
 *
 * A CSS calc() can only ever approximate; it has to be re-derived by hand
 * every time the frame's own padding, caption, or photo count changes, which
 * is exactly how this happened twice. Measuring the actual DOM is not an
 * approximation — it's correct by construction, at every breakpoint, for any
 * future content change, with no formula to maintain.
 */
function useMeasuredHeight(containerRef, { pad = 0, enabled = true } = {}) {
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    if (!enabled) {
      // Resized down into the mobile flex-column layout (which is
      // height:auto by design) — clear any stale measurement from before,
      // or it would fight that layout's own sizing.
      el.style.minHeight = "";
      return;
    }

    const measure = () => {
      // Absolutely-positioned children don't contribute to the parent's
      // natural height, so read their real rendered extent directly and take
      // the lowest bottom edge — this is the true content height, not a guess.
      let maxBottom = 0;
      const top = el.getBoundingClientRect().top + window.scrollY;
      for (const child of el.children) {
        const r = child.getBoundingClientRect();
        const bottom = r.top + window.scrollY + r.height - top;
        if (bottom > maxBottom) maxBottom = bottom;
      }
      if (maxBottom > 0) {
        el.style.minHeight = `${Math.ceil(maxBottom + pad)}px`;
      }
    };

    // Run after paint (transforms like rotate/scale don't affect layout, so
    // measuring immediately is accurate regardless of entrance animation
    // state), and again whenever the container's own box changes size.
    const raf = requestAnimationFrame(measure);
    const ro = "ResizeObserver" in window ? new ResizeObserver(measure) : null;
    ro?.observe(el);
    window.addEventListener("resize", measure, { passive: true });

    return () => {
      cancelAnimationFrame(raf);
      ro?.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [containerRef, pad, enabled]);

  // Belt and braces on unmount, independent of the enabled-toggle cleanup
  // above, so nothing lingers if the component goes away mid-measurement.
  useEffect(() => () => { if (containerRef.current) containerRef.current.style.minHeight = ""; }, [containerRef]);
}

/** Adds `revealed` once the element scrolls into view. Fires once. */
function useReveal(options) {
  const ref = useRef(null);
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!("IntersectionObserver" in window)) { setShown(true); return; }
    const io = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setShown(true); io.disconnect(); } },
      { threshold: 0.01, rootMargin: "0px 0px 26% 0px", ...options }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [options]);
  return [ref, shown];
}

/* ═══════════════════════════════════════════════════════════════════════════
   AUDIO — ONE INSTANCE FOR THE WHOLE SITE
   ═══════════════════════════════════════════════════════════════════════════

   The rules this obeys, because they're the ones that break in the wild:

   1. `.play()` / `ctx.resume()` are called SYNCHRONOUSLY inside the entry-gate
      click handler. No await, no setState-then-play, no setTimeout — the
      moment you leave the call stack of the gesture, iOS Safari drops it.
   2. Exactly one engine object, created at module scope. The cake button
      re-uses it; it never constructs a second `Audio` or AudioContext.
   3. The promise `.play()` returns is caught. On rejection the mute toggle
      flips to a visible "tap to play" state instead of failing silently.
   4. Falls back to a synthesised music box if no file is configured or the
      file fails to load, so there is always *something* on the tap.
   5. Mute cuts a master gain node / sets `el.muted` immediately.
   ═══════════════════════════════════════════════════════════════════════════ */

/** "Happy Birthday to You" — melody only, 3/4. Public domain since 2016. */
const MELODY = [
  ["G4", 0.5], ["G4", 0.5], ["A4", 1], ["G4", 1], ["C5", 1], ["B4", 2],
  ["G4", 0.5], ["G4", 0.5], ["A4", 1], ["G4", 1], ["D5", 1], ["C5", 2],
  ["G4", 0.5], ["G4", 0.5], ["G5", 1], ["E5", 1], ["C5", 1], ["B4", 1], ["A4", 2],
  ["F5", 0.5], ["F5", 0.5], ["E5", 1], ["C5", 1], ["D5", 1], ["C5", 3],
];
const SEMITONE = { C: 0, D: 2, E: 4, F: 5, G: 7, A: 9, B: 11 };
const freqOf = (n) => {
  const midi = SEMITONE[n[0]] + (parseInt(n[1], 10) + 1) * 12;
  return 440 * Math.pow(2, (midi - 69) / 12);
};

const AudioEngine = (() => {
  let el = null;          // HTMLAudioElement, when SONG_SRC is set
  let ctx = null;         // AudioContext, for the music box + chimes
  let master = null;      // master GainNode
  let voices = [];        // scheduled oscillator nodes, so stop() can kill them
  let songStartedAt = 0;  // ctx.currentTime when the melody began
  let songLength = 0;
  let muted = false;
  let blocked = false;
  const listeners = new Set();

  const emit = () => listeners.forEach((l) => l({ muted, blocked, playing: isPlaying() }));

  /** Build the <audio> tag early so the browser can preload before the tap. */
  function prime() {
    if (SONG_SRC && !el) {
      el = new Audio(SONG_SRC);
      el.preload = "auto";
      el.loop = true;
      el.volume = 0.55;
      el.addEventListener("error", () => { el = null; }); // fall through to synth
      el.load();
    }
  }

  function ensureCtx() {
    if (ctx) return ctx;
    const AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) return null;
    ctx = new AC();
    master = ctx.createGain();
    master.gain.value = muted ? 0 : 0.32;
    master.connect(ctx.destination);
    return ctx;
  }

  /** One music-box note: triangle body + sine bloom, exponential decay. */
  function note(freq, at, dur, gain = 1) {
    const body = ctx.createOscillator();
    const bloom = ctx.createOscillator();
    const g = ctx.createGain();
    body.type = "triangle"; body.frequency.value = freq;
    bloom.type = "sine";    bloom.frequency.value = freq * 2.004; // slight beat
    g.gain.setValueAtTime(0.0001, at);
    g.gain.exponentialRampToValueAtTime(0.9 * gain, at + 0.012);
    g.gain.exponentialRampToValueAtTime(0.0001, at + dur * 0.98);
    body.connect(g); bloom.connect(g); g.connect(master);
    body.start(at); bloom.start(at);
    body.stop(at + dur); bloom.stop(at + dur);
    voices.push(body, bloom);
  }

  function scheduleMelody(from) {
    const beat = 0.58;
    let t = from + 0.12;
    MELODY.forEach(([n, beats]) => {
      note(freqOf(n), t, Math.max(0.42, beats * beat * 1.25));
      t += beats * beat;
    });
    songStartedAt = from;
    songLength = t - from;
  }

  function killVoices() {
    voices.forEach((v) => { try { v.stop(); } catch (_) {} try { v.disconnect(); } catch (_) {} });
    voices = [];
  }

  function isPlaying() {
    if (el && !el.paused) return true;
    if (ctx && songLength) return ctx.currentTime - songStartedAt < songLength;
    return false;
  }

  return {
    prime,
    subscribe(fn) { listeners.add(fn); return () => listeners.delete(fn); },
    get state() { return { muted, blocked, playing: isPlaying() }; },

    /**
     * CALL THIS DIRECTLY FROM A CLICK HANDLER. Nothing async before it.
     * Returns immediately; the rejection path is handled internally.
     */
    unlockAndPlay() {
      // Web Audio must be created + resumed inside the gesture.
      const c = ensureCtx();
      if (c && c.state === "suspended") c.resume().catch(() => {});

      if (el) {
        const p = el.play();
        if (p && typeof p.catch === "function") {
          p.then(() => { blocked = false; emit(); })
           .catch(() => {
             // File playback refused — fall back to the synth, still inside the
             // same gesture's audio-unlock window.
             blocked = true;
             if (c) { killVoices(); scheduleMelody(c.currentTime); blocked = false; }
             emit();
           });
        }
      } else if (c) {
        killVoices();
        scheduleMelody(c.currentTime);
      } else {
        blocked = true;
      }
      emit();
    },

    /**
     * The cake button. Never opens a second stream: if the song is still
     * running it leaves it alone, otherwise it restarts cleanly.
     */
    resyncOrRestart() {
      const c = ensureCtx();
      if (c && c.state === "suspended") c.resume().catch(() => {});
      if (isPlaying()) return;
      if (el) {
        el.currentTime = 0;
        const p = el.play();
        if (p && p.catch) p.catch(() => { if (c) { killVoices(); scheduleMelody(c.currentTime); } });
      } else if (c) {
        killVoices();
        scheduleMelody(c.currentTime);
      }
      emit();
    },

    /** Light glass-chime cue — separate from the song, obeys the same mute. */
    chime(root = 1318.5) {
      const c = ensureCtx();
      if (!c || muted) return;
      if (c.state === "suspended") c.resume().catch(() => {});
      const t = c.currentTime;
      [1, 1.5, 2.02].forEach((m, i) => note(root * m, t + i * 0.05, 1.1, 0.22));
    },

    toggleMute() {
      muted = !muted;
      if (master) master.gain.setTargetAtTime(muted ? 0 : 0.32, ctx.currentTime, 0.04);
      if (el) el.muted = muted;
      // If audio was blocked, treat the tap as a fresh gesture and try again.
      if (blocked && !muted) { blocked = false; this.unlockAndPlay(); }
      emit();
      return muted;
    },
  };
})();

/** Small hook so components can render the mute/blocked state. */
function useAudioState() {
  const [s, setS] = useState(AudioEngine.state);
  useEffect(() => AudioEngine.subscribe(setS), []);
  return s;
}

/* ═══════════════════════════════════════════════════════════════════════════
   PARTICLES — ONE CANVAS, ONE POOL, FIXED CEILING
   Cursor dust, firework bursts, falling petals and heart bloom all draw from
   the same pre-allocated array. Nothing is allocated during the animation.
   ═══════════════════════════════════════════════════════════════════════════ */

const ParticleCtx = createContext(null);
const useParticles = () => useContext(ParticleCtx);

const PALETTE = ["#F3D9A4", "#EAB765", "#FFFFFF", "#CBDCFA", "#F6C9D6", "#A9C2F0"];
/* Richer, more saturated set — confetti has to read against a blush page. */
const FESTIVE = ["#D98BA6", "#C79A5B", "#FFFFFF", "#EBD3A4", "#A9647F", "#F6D5E0", "#C98A72"];

function ParticleField({ enabled, budget }) {
  const canvasRef = useRef(null);
  const api = useParticles();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !enabled) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    let dpr = Math.min(window.devicePixelRatio || 1, 2);
    let w = 0, h = 0, raf = 0, last = performance.now(), liveCount = 0, dirtyOnce = false;

    // ── Canvas sizing ────────────────────────────────────────────────────
    // This used to measure once at mount and then only on window resize. If
    // the first measurement came back stale or zero — which it can, because
    // this mounts while the entry gate is still up and layout hasn't settled
    // — the backing store never matched the CSS box, and every draw was
    // stretched by the difference. Small round petals came out as long pale
    // smears. A ResizeObserver watches the element itself, so the buffer
    // tracks the box no matter what causes it to change.
    const resize = () => {
      const nw = canvas.clientWidth;
      const nh = canvas.clientHeight;
      if (!nw || !nh) return;                       // never size to zero
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      const bw = Math.floor(nw * dpr);
      const bh = Math.floor(nh * dpr);
      if (canvas.width === bw && canvas.height === bh) return;  // no-op churn
      w = nw; h = nh;
      canvas.width = bw;
      canvas.height = bh;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();

    let ro = null;
    if ("ResizeObserver" in window) {
      ro = new ResizeObserver(resize);
      ro.observe(canvas);
    }
    window.addEventListener("resize", resize);
    // devicePixelRatio changes when a window moves between displays or the
    // page is zoomed; neither fires a resize event on its own.
    const dprQuery = window.matchMedia(`(resolution: ${window.devicePixelRatio}dppx)`);
    dprQuery.addEventListener && dprQuery.addEventListener("change", resize);

    // ── Pool ────────────────────────────────────────────────────────────
    const pool = new Array(budget).fill(null).map(() => ({
      on: false, x: 0, y: 0, vx: 0, vy: 0, life: 0, max: 1,
      size: 2, spin: 0, rot: 0, color: "#fff", kind: "dust", drag: 0.98, grav: 0,
    }));
    let cursor = 0;
    const take = () => {
      for (let i = 0; i < pool.length; i++) {
        const p = pool[(cursor + i) % pool.length];
        if (!p.on) { cursor = (cursor + i + 1) % pool.length; return p; }
      }
      return null; // at ceiling — drop the request rather than grow
    };

    api.current = {
      /** Soft fairy dust following the pointer. */
      dust(x, y, n = 1) {
        for (let i = 0; i < n; i++) {
          const p = take(); if (!p) return;
          p.on = true; p.kind = "dust";
          p.x = x + (Math.random() - 0.5) * 10;
          p.y = y + (Math.random() - 0.5) * 10;
          p.vx = (Math.random() - 0.5) * 22;
          p.vy = (Math.random() - 0.5) * 22 - 14;
          p.life = 0; p.max = 0.7 + Math.random() * 0.7;
          p.size = 1 + Math.random() * 2.2;
          p.color = PALETTE[(Math.random() * PALETTE.length) | 0];
          p.drag = 0.94; p.grav = -8;
        }
      },
      /** Bibbidi-bobbidi-boo: radial burst used by the gate and the cake. */
      burst(x, y, n = 60, spread = 340, hearts = false) {
        for (let i = 0; i < n; i++) {
          const p = take(); if (!p) return;
          const a = Math.random() * Math.PI * 2;
          const s = spread * (0.25 + Math.random() * 0.75);
          p.on = true; p.kind = hearts && i % 5 === 0 ? "heart" : "spark";
          p.x = x; p.y = y;
          p.vx = Math.cos(a) * s; p.vy = Math.sin(a) * s;
          p.life = 0; p.max = 0.9 + Math.random() * 1.1;
          p.size = p.kind === "heart" ? 5 + Math.random() * 5 : 1.4 + Math.random() * 2.6;
          p.rot = Math.random() * 6.28; p.spin = (Math.random() - 0.5) * 6;
          p.color = PALETTE[(Math.random() * PALETTE.length) | 0];
          p.drag = 0.965; p.grav = 260;
        }
      },
      /** A directional cone — used for the fountains along the bottom edge. */
      spray(x, y, n, angle, spread, speed) {
        for (let i = 0; i < n; i++) {
          const p = take(); if (!p) return;
          const a = angle + (Math.random() - 0.5) * spread;
          const sp = speed * (0.55 + Math.random() * 0.75);
          p.on = true; p.kind = "spark";
          p.x = x; p.y = y;
          p.vx = Math.cos(a) * sp; p.vy = Math.sin(a) * sp;
          p.life = 0; p.max = 1.1 + Math.random() * 0.9;
          p.size = 1.8 + Math.random() * 2.8;
          p.color = FESTIVE[(Math.random() * FESTIVE.length) | 0];
          p.drag = 0.975; p.grav = 300;
        }
      },
      /** Tumbling confetti for the finale rain. */
      confetti(x, y) {
        const p = take(); if (!p) return;
        p.on = true; p.kind = "confetti";
        p.x = x; p.y = y;
        p.vx = (Math.random() - 0.5) * 90; p.vy = 90 + Math.random() * 130;
        p.life = 0; p.max = 3.4 + Math.random() * 1.8;
        p.size = 4 + Math.random() * 5;
        p.rot = Math.random() * 6.28; p.spin = (Math.random() - 0.5) * 9;
        p.color = FESTIVE[(Math.random() * FESTIVE.length) | 0];
        p.drag = 0.995; p.grav = 90;
      },
      /** A rocket climbing before it breaks. Returns its flight time in ms so
          the caller can schedule the burst at the apex. */
      rocket(x, fromY, rise) {
        const p = take(); if (!p) return 700;
        p.on = true; p.kind = "comet";
        p.x = x; p.y = fromY;
        p.vx = (Math.random() - 0.5) * 60; p.vy = -rise;
        p.life = 0; p.max = 0.9;
        p.size = 2.6;
        p.color = "#FFF3D2";
        p.drag = 0.985; p.grav = 320;
        return 620 + Math.random() * 160;
      },
      /** Slow petal/blossom drift for ambient background. */
      petal(x, y) {
        const p = take(); if (!p) return;
        p.on = true; p.kind = "petal";
        p.x = x; p.y = y;
        p.vx = (Math.random() - 0.5) * 24; p.vy = 22 + Math.random() * 26;
        p.life = 0; p.max = 8 + Math.random() * 6;
        p.size = 5 + Math.random() * 6;
        p.rot = Math.random() * 6.28; p.spin = (Math.random() - 0.5) * 1.4;
        p.color = Math.random() > 0.5 ? "#F6C9D6" : "#FBE7C9";
        p.drag = 1; p.grav = 4;
      },
    };

    // ── Draw ────────────────────────────────────────────────────────────
    const heart = (c, s) => {
      c.beginPath();
      c.moveTo(0, s * 0.35);
      c.bezierCurveTo(-s, -s * 0.35, -s * 0.5, -s, 0, -s * 0.35);
      c.bezierCurveTo(s * 0.5, -s, s, -s * 0.35, 0, s * 0.35);
      c.fill();
    };

    const tick = (now) => {
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;
      if (!w || !h) { raf = requestAnimationFrame(tick); return; }
      // Idle skip. Clearing a full-viewport buffer at DPR 2 is ~4M pixels a
      // frame; doing it when the pool is empty was pure waste, and it ran the
      // whole time she was scrolling. One extra clear after the last particle
      // dies, then nothing until something spawns again.
      if (liveCount === 0 && !dirtyOnce) { raf = requestAnimationFrame(tick); return; }
      dirtyOnce = liveCount > 0;
      ctx.clearRect(0, 0, w, h);
      ctx.globalCompositeOperation = "lighter";
      // Halve the fill count during the finale's peak: two arcs per spark is
      // fine at 200 particles, wasteful at 1800 where they all overlap.
      const dense = liveCount > 420;
      let live = 0;
      for (let i = 0; i < pool.length; i++) {
        const p = pool[i];
        if (!p.on) continue;
        live++;
        p.life += dt;
        if (p.life >= p.max) { p.on = false; continue; }
        p.vy += p.grav * dt;
        p.vx *= Math.pow(p.drag, dt * 60);
        p.vy *= Math.pow(p.drag, dt * 60);
        p.x += p.vx * dt;
        p.y += p.vy * dt;
        p.rot += p.spin * dt;
        if ((p.kind === "petal" || p.kind === "confetti") && p.y > h + 40) { p.on = false; continue; }

        const t = p.life / p.max;
        const alpha = (p.kind === "petal" || p.kind === "confetti")
          ? Math.min(1, t * 8) * (1 - Math.max(0, (t - 0.78) / 0.22))
          : (1 - t) * (1 - t);
        ctx.globalAlpha = alpha;
        ctx.fillStyle = p.color;

        if (p.kind === "heart") {
          ctx.save(); ctx.translate(p.x, p.y); ctx.rotate(p.rot);
          heart(ctx, p.size * (1 - t * 0.3)); ctx.restore();
        } else if (p.kind === "confetti") {
          // scaleX by a cosine fakes a strip tumbling edge-on and back
          ctx.save(); ctx.translate(p.x, p.y); ctx.rotate(p.rot);
          ctx.globalCompositeOperation = "source-over";
          ctx.scale(Math.cos(p.life * 7 + p.size), 1);
          ctx.fillRect(-p.size / 2, -p.size * 0.32, p.size, p.size * 0.64);
          ctx.globalCompositeOperation = "lighter";
          ctx.restore();
        } else if (p.kind === "comet") {
          ctx.save(); ctx.translate(p.x, p.y);
          ctx.rotate(Math.atan2(p.vy, p.vx));
          ctx.beginPath();
          ctx.ellipse(0, 0, p.size * 5, p.size * 0.8, 0, 0, 6.283);
          ctx.fill();
          ctx.restore();
        } else if (p.kind === "petal") {
          ctx.save(); ctx.translate(p.x, p.y); ctx.rotate(p.rot);
          ctx.globalCompositeOperation = "source-over";
          ctx.beginPath();
          ctx.ellipse(0, 0, p.size, p.size * 0.55, 0, 0, 6.283);
          ctx.fill();
          ctx.globalCompositeOperation = "lighter";
          ctx.restore();
        } else {
          const r = p.size * (p.kind === "spark" ? 1 - t * 0.55 : 1);
          ctx.beginPath(); ctx.arc(p.x, p.y, r, 0, 6.283); ctx.fill();
          if (!dense) {                       // halo pass, dropped when busy
            ctx.globalAlpha = alpha * 0.25;
            ctx.beginPath(); ctx.arc(p.x, p.y, r * 3.2, 0, 6.283); ctx.fill();
          }
        }
      }
      liveCount = live;
      if (live > 0) dirtyOnce = true;
      ctx.globalAlpha = 1;
      ctx.globalCompositeOperation = "source-over";
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    // Ambient petals, rate-limited and paused when the tab is hidden.
    const petalTimer = setInterval(() => {
      if (document.hidden) return;
      api.current.petal(Math.random() * w, -20);
    }, budget > 140 ? 900 : 1800);

    return () => {
      cancelAnimationFrame(raf);
      clearInterval(petalTimer);
      if (ro) ro.disconnect();
      window.removeEventListener("resize", resize);
      dprQuery.removeEventListener && dprQuery.removeEventListener("change", resize);
      api.current = null;
    };
  }, [enabled, budget, api]);

  if (!enabled) return null;
  return <canvas ref={canvasRef} className="hm-particles" aria-hidden="true" />;
}

/* ═══════════════════════════════════════════════════════════════════════════
   FAIRY CURSOR — site-wide glow dot + trailing photo preview
   ───────────────────────────────────────────────────────────────────────────
   Active on every section, not just the gallery. Design constraints:

   • ONE rAF loop drives everything. There is no mousemove handler doing work —
     `pointermove` only writes two numbers to a ref, which is O(1) and can't
     pile up. All reads/writes happen once per frame, so the cost is fixed
     regardless of how fast the pointer moves.
   • Nothing here re-renders React. Positions are written straight to
     `style.transform`; the only setState is the photo index, and that fires
     at most once per zone crossing (with a dwell guard), not per frame.
   • The whole thing is `pointer-events: none` and sits at z-index 45 — above
     page content so the preview reads as floating, but below the top bar (88),
     lightbox (85) and entry gate (90). It cannot intercept a click anywhere.
   • On touch devices the listener is never attached and the component returns
     null before any effect runs — no dead loop burning frames on a phone.
   ═══════════════════════════════════════════════════════════════════════════ */

const ZONES = Math.min(6, Math.max(3, PHOTOS.length)); // one band per photo
const ZONE_DWELL = 260;   // ms a band must be held before the photo swaps

function FairyCursor({ enabled }) {
  const dotRef = useRef(null);
  const photoRef = useRef(null);
  const particles = useParticles();
  const [active, setActive] = useState(0);
  const state = useRef({
    x: -200, y: -200, dx: -200, dy: -200, px: -200, py: -200,
    zone: 0, zoneSince: 0, seen: false,
  });

  useEffect(() => {
    if (!enabled) return;
    const s = state.current;
    let raf = 0;

    // Cheapest possible listener: two assignments, no layout reads, no work.
    const move = (e) => {
      s.x = e.clientX; s.y = e.clientY; s.seen = true;
      restFrames = 0;
      if (!raf) raf = requestAnimationFrame(loop);   // restart if parked
    };
    const leave = () => { s.seen = false; };
    window.addEventListener("pointermove", move, { passive: true });
    document.addEventListener("pointerleave", leave);

    let restFrames = 0;
    const loop = (now) => {
      // Two easings so the photo lags visibly behind the dot.
      s.dx += (s.x - s.dx) * 0.42;
      s.dy += (s.y - s.dy) * 0.42;
      s.px += (s.x - s.px) * 0.14;
      s.py += (s.y - s.py) * 0.14;

      if (dotRef.current) {
        dotRef.current.style.transform =
          `translate3d(${s.dx}px, ${s.dy}px, 0) translate(-50%, -50%)`;
      }
      if (photoRef.current) {
        // Tilt proportional to horizontal lag — it leans into the movement.
        const lean = Math.max(-14, Math.min(14, (s.x - s.px) * 0.07));
        photoRef.current.style.transform =
          `translate3d(${s.px}px, ${s.py}px, 0) translate(-50%, -50%) rotate(${lean}deg)`;
        photoRef.current.style.opacity = s.seen ? "0.94" : "0";
      }

      // Shuffle the preview as she crosses vertical bands. The dwell guard
      // stops it strobing when the pointer sits on a boundary.
      const band = Math.min(
        ZONES - 1,
        Math.max(0, Math.floor((s.x / window.innerWidth) * ZONES))
      );
      if (band !== s.zone) {
        if (!s.zoneSince) s.zoneSince = now;
        else if (now - s.zoneSince > ZONE_DWELL) {
          s.zone = band;
          s.zoneSince = 0;
          setActive(band % PHOTOS.length);
        }
      } else {
        s.zoneSince = 0;
      }

      // Dust only while actually moving — an idle pointer costs nothing.
      if (Math.abs(s.x - s.dx) + Math.abs(s.y - s.dy) > 1.2 && particles.current) {
        particles.current.dust(s.dx, s.dy, 1);
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", move);
      document.removeEventListener("pointerleave", leave);
    };
  }, [enabled, particles]);

  if (!enabled) return null;

  // All five thumbnails render once and crossfade by class. Swapping `src`
  // instead would cause a decode flash on every zone change.
  return (
    <>
      <div ref={dotRef} className="hm-cursor-dot" aria-hidden="true" />
      <div ref={photoRef} className="hm-cursor-photo" aria-hidden="true">
        {PHOTOS.map((p, i) => (
          <img
            key={p.id}
            className={i === active ? "is-active" : ""}
            src={p.thumb || p.src}
            alt=""
            width={p.w}
            height={p.h}
            decoding="async"
          />
        ))}
      </div>
    </>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   SMALL ICONOGRAPHY — reused as favicon, dividers, buttons
   ═══════════════════════════════════════════════════════════════════════════ */

const Slipper = (p) => (
  <svg viewBox="0 0 64 40" fill="none" aria-hidden="true" {...p}>
    <path d="M6 30c8 2 16 1 24-3 6-3 10-8 16-11 5-2.5 10-2 13 1 2.5 2.5 2 6-1 8-6 4-14 6-22 7-9 1.2-18 1.4-27 1-2.5-.1-3.6-2.4-3-3z"
      fill="currentColor" opacity=".9" />
    <path d="M46 16c2-4 6-8 10-9" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" opacity=".7" />
    <circle cx="57" cy="6" r="2.2" fill="currentColor" />
  </svg>
);

const Wand = (p) => (
  <svg viewBox="0 0 40 40" fill="none" aria-hidden="true" {...p}>
    <path d="M6 34 26 14" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
    <path d="M30 4l2.2 5.6L38 12l-5.8 2.4L30 20l-2.2-5.6L22 12l5.8-2.4z" fill="currentColor" />
    <circle cx="16" cy="26" r="1.3" fill="currentColor" opacity=".6" />
  </svg>
);

const Crown = (p) => (
  <svg viewBox="0 0 72 40" fill="none" aria-hidden="true" {...p}>
    <path d="M8 32 4 10l14 10L36 4l18 16 14-10-4 22z" stroke="currentColor" strokeWidth="1.6"
      strokeLinejoin="round" fill="none" />
    <circle cx="36" cy="4" r="2.6" fill="currentColor" />
    <circle cx="4" cy="10" r="2.2" fill="currentColor" />
    <circle cx="68" cy="10" r="2.2" fill="currentColor" />
    <circle cx="22" cy="27" r="1.6" fill="currentColor" opacity=".7" />
    <circle cx="36" cy="25" r="1.9" fill="currentColor" opacity=".7" />
    <circle cx="50" cy="27" r="1.6" fill="currentColor" opacity=".7" />
  </svg>
);

const Butterfly = (p) => (
  <svg viewBox="0 0 60 48" fill="none" aria-hidden="true" {...p}>
    <g className="hm-wing hm-wing-l">
      <path d="M30 24C22 6 6 4 4 14c-2 9 12 14 26 10z" fill="currentColor" opacity=".55" />
      <path d="M30 24C22 40 10 44 7 37c-3-7 9-11 23-13z" fill="currentColor" opacity=".4" />
    </g>
    <g className="hm-wing hm-wing-r">
      <path d="M30 24c8-18 24-20 26-10 2 9-12 14-26 10z" fill="currentColor" opacity=".55" />
      <path d="M30 24c8 16 20 20 23 13 3-7-9-11-23-13z" fill="currentColor" opacity=".4" />
    </g>
    <ellipse cx="30" cy="24" rx="1.6" ry="7" fill="currentColor" opacity=".8" />
  </svg>
);

/* ═══════════════════════════════════════════════════════════════════════════
   THE DOLLS — the motif that carries this build
   ───────────────────────────────────────────────────────────────────────────
   Two original fashion-illustration figures, drawn as SVG paths (no clipart,
   no raster). They read as elongated couture croquis — the proportions of a
   fashion sketch, not a toy — so they sit as decoration rather than as a
   children's element.

   • DollA wears a floor-length gown with a sweeping train.
   • DollB wears a tiered cocktail dress with a sash bow.

   Both idle continuously (a slow sway plus a breathing scale on their own
   cycle lengths, so a pair never moves in lockstep) and play a one-shot
   greeting — a small curtsy dip and a bloom of light — when their section
   scrolls into view. Everything is transform/opacity on a promoted layer.
   ═══════════════════════════════════════════════════════════════════════════ */

function DollA({ className = "", ...rest }) {
  return (
    <svg viewBox="0 0 130 320" className={`hm-doll hm-doll-a ${className}`}
      fill="none" aria-hidden="true" {...rest}>
    <defs>
    <linearGradient id="aGown" x1=".15" y1="0" x2=".9" y2="1">
      <stop offset="0" stopColor="#FFF0F5"/><stop offset=".28" stopColor="#FBD3E2"/>
      <stop offset=".62" stopColor="#E28FAE"/><stop offset="1" stopColor="#A8567C"/>
    </linearGradient>
    <linearGradient id="aBodice" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0" stopColor="#C46E92"/><stop offset=".4" stopColor="#F3B7CD"/>
      <stop offset="1" stopColor="#B0648A"/>
    </linearGradient>
    <linearGradient id="aHair" x1=".2" y1="0" x2=".8" y2="1">
      <stop offset="0" stopColor="#3B2130"/><stop offset=".55" stopColor="#5E3446"/>
      <stop offset="1" stopColor="#8E4756"/>
    </linearGradient>
    <linearGradient id="aSkin" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0" stopColor="#DDA890"/><stop offset=".45" stopColor="#F4CDB8"/>
      <stop offset="1" stopColor="#E0AF97"/>
    </linearGradient>
    <linearGradient id="aSleeve" x1=".2" y1="0" x2=".8" y2="1">
      <stop offset="0" stopColor="#FBD3E2"/><stop offset="1" stopColor="#C46E92"/>
    </linearGradient>
  </defs>

  {/* train */}
  <path d="M62 214c-14 24-34 40-48 72 20 10 44 12 62 8-6-26-8-54-14-80z"
    fill="url(#aGown)" opacity=".5" stroke="#5E2A4A" strokeWidth="1" strokeOpacity=".35"/>
  {/* mermaid skirt */}
  <path d="M53 186h22c5 22 4 40 2 56 10 12 16 30 18 48-22 7-48 7-70 1 4-19 12-36 24-49-1-18-1-36 4-56z"
    fill="url(#aGown)" stroke="#5E2A4A" strokeWidth="1.2" strokeLinejoin="round"/>
  <path d="M60 196c-3 20-4 38-2 52-8 12-14 26-17 40" stroke="#FFF6FA" strokeWidth="1.5" strokeLinecap="round" opacity=".5"/>
  <path d="M70 198c2 18 3 34 2 48 6 12 11 26 13 40" stroke="#8E4756" strokeWidth="1" strokeLinecap="round" opacity=".22"/>
  <path d="M66 250c-6 10-10 22-12 34" stroke="#FFF6FA" strokeWidth="1" strokeLinecap="round" opacity=".35"/>
  <path d="M27 288c20 8 46 8 68 0" stroke="#A8567C" strokeWidth="2" opacity=".25"/>

  {/* ARMS (filled, tapered, anchored under the bodice/sleeve) */}
  <g>
    {/* left arm: bends in, hand resting at the waist */}
    <path d="M50 130.5C43 136 38.5 146 39 160c.3 9.5 3.8 17.5 10 23l3.6-4.6
      C47.4 173.6 45.3 168 45.2 160c-.2-10 3.2-18.6 10.6-23.6z"
      fill="url(#aSkin)" stroke="#A8695A" strokeWidth=".9" strokeLinejoin="round"/>
    <path d="M49 183.5l3.6-4.6c4.2 2.6 6 6.1 4.4 9-1.6 2.6-5.6 1.9-8-.4z"
      fill="#F4CDB8" stroke="#A8695A" strokeWidth=".9" strokeLinejoin="round"/>
    <path d="M47.6 149.5c-3 4.8-4.2 10-4 15.4" stroke="#A8695A" strokeWidth=".8" opacity=".45" strokeLinecap="round"/>
    <g className="hm-doll-arm">
      {/* right arm: falls at the side, slight outward bow */}
    <path d="M80 130.5C87.5 136 91.6 146 91 160.5c-.4 10.6-1.8 19.3-4.2 27.6l-5.9-1.1
      c2-8.3 3.4-16.4 3.8-26.5.4-10.6-3-18.9-10.3-23.6z"
      fill="url(#aSkin)" stroke="#A8695A" strokeWidth=".9" strokeLinejoin="round"/>
    <path d="M80.9 187l5.9 1.1c1.4 4.4.4 9.3-2.5 9.8-2.9.5-4.5-2.9-4.3-6.3z"
      fill="#F4CDB8" stroke="#A8695A" strokeWidth=".9" strokeLinejoin="round"/>
    <path d="M84.6 149.5c2.2 4.7 3 9.8 2.7 15.2" stroke="#A8695A" strokeWidth=".8" opacity=".45" strokeLinecap="round"/>
    </g>
  </g>

  {/* sash */}
  <path d="M50 180h28l-1.5 8H51z" fill="#C3A4E4"/>
  <path d="M76 188c5 10 5 22 2 32" stroke="#C3A4E4" strokeWidth="3" strokeLinecap="round" opacity=".85"/>
  <circle cx="78" cy="184" r="3.2" fill="#EBD9F7"/>

  {/* bodice */}
  <path d="M53 128c4 5 10 7 12 7s8-2 12-7c4 16 5 34 3 52H50c-2-18-1-36 3-52z"
    fill="url(#aBodice)" stroke="#5E2A4A" strokeWidth="1.1" strokeLinejoin="round"/>
  <path d="M57 140c-1 14-1 28 0 40" stroke="#FFF6FA" strokeWidth="1" opacity=".38"/>
  <path d="M73 141c1 13 1 26 0 38" stroke="#8E4756" strokeWidth="1" opacity=".3"/>
  <circle cx="61" cy="150" r="1.5" fill="#FFF6FA" opacity=".85"/>
  <circle cx="69" cy="158" r="1.5" fill="#FFF6FA" opacity=".7"/>
  <circle cx="64" cy="168" r="1.4" fill="#FFF6FA" opacity=".6"/>

  {/* SLEEVE CAPS — drawn after the arms so the shoulder joint is always covered */}
  <path d="M58 127.5c-5.6-4.2-13-3.2-16.3 2.4-2.3 4.2-.9 9.3 3.3 11.2 4.7 1.9 10.7-.5 13-5.1z"
    fill="url(#aSleeve)" stroke="#5E2A4A" strokeWidth="1" strokeLinejoin="round"/>
  <path d="M72 127.5c5.6-4.2 13-3.2 16.3 2.4 2.3 4.2.9 9.3-3.3 11.2-4.7 1.9-10.7-.5-13-5.1z"
    fill="url(#aSleeve)" stroke="#5E2A4A" strokeWidth="1" strokeLinejoin="round"/>
  <path d="M46.5 131c-2.3 2.3-3.2 5.6-2.2 8.4" stroke="#FFF6FA" strokeWidth="1" opacity=".5" strokeLinecap="round"/>
  <path d="M83.5 131c2.3 2.3 3.2 5.6 2.2 8.4" stroke="#FFF6FA" strokeWidth="1" opacity=".45" strokeLinecap="round"/>

  {/* neck */}
  <path d="M60.5 108h9v16c0 3-9 3-9 0z" fill="#E5B79F" stroke="#A8695A" strokeWidth=".9"/>
  <path d="M61 112c2.5 3 6 3.5 8.5 2" stroke="#A8695A" strokeWidth=".8" opacity=".5"/>

  {/* head, turned three-quarter right */}
  <path d="M64 73.5c10 0 16 8 16 18.5 0 6.5-1.6 11.8-4.8 15.6-3 3.5-7 5.4-12.2 5.4-9.4 0-15.5-8.8-15.5-19.5S54.5 73.5 64 73.5z"
    fill="url(#aSkin)" stroke="#5E2A4A" strokeWidth="1.1"/>
  {/* face: brow, lash, lip, blush — on the exposed cheek so she reads as a
       three-quarter profile rather than a blank head */}
  <path d="M50.5 97.5c2.2-.7 4.1-.3 5.6 1.1" stroke="#5E3446" strokeWidth="1.3" strokeLinecap="round" opacity=".8"/>
  <path d="M50 104.2c1.8-.6 3.4-.4 4.7.5" stroke="#3B2130" strokeWidth="1.2" strokeLinecap="round" opacity=".75"/>
  <path d="M52.2 111.4c1.7.2 3.1-.2 4.1-1.3" stroke="#C46E92" strokeWidth="1.5" strokeLinecap="round"/>
  <ellipse cx="54.5" cy="107.5" rx="3.4" ry="2.2" fill="#E28FAE" opacity=".32"/>
  <path d="M48.6 100.6c-1.5 1.6-1.4 3.6.3 4.8" stroke="#A8695A" strokeWidth=".9" opacity=".6" strokeLinecap="round"/>
  <path d="M51.5 115.5c3.4 2.2 7.4 2.2 10.5-.2" stroke="#A8695A" strokeWidth=".9" opacity=".45" strokeLinecap="round"/>

  {/* hair: deep side part, long waves past the shoulder */}
  <path d="M65 74c14 0 23 9 22 23-.5 8-3 13-3 20 2 16-2 32-9 44-3-16-8-24-15-29 5-11 5-23-1-30-6-6-13-5-18 2-2-18 8-30 24-30z"
    fill="url(#aHair)" stroke="#3B2130" strokeWidth="1.1" strokeLinejoin="round"/>
  <path d="M78 92c3 12 2 26-2 38" stroke="#B0648A" strokeWidth="1.4" strokeLinecap="round" opacity=".5"/>
  <path d="M72 98c2 14 1 28-3 40" stroke="#B0648A" strokeWidth="1" strokeLinecap="round" opacity=".35"/>
  <path d="M55 80c6-4 13-3.5 18 1.5" stroke="#8E4756" strokeWidth="1.2" strokeLinecap="round" opacity=".45"/>
  <g>
    <circle cx="55" cy="82" r="2.6" fill="#C3A4E4"/>
    <circle cx="60" cy="79" r="2.2" fill="#D9BFF0"/>
    <circle cx="57" cy="76" r="2" fill="#C3A4E4"/>
    <circle cx="57.5" cy="79.5" r="1.2" fill="#FFF6FA"/>
  </g>
    </svg>
  );
}

function DollB({ className = "", ...rest }) {
  return (
    <svg viewBox="0 0 130 320" className={`hm-doll hm-doll-b ${className}`}
      fill="none" aria-hidden="true" {...rest}>
    <defs>
    <linearGradient id="bGown" x1=".1" y1="0" x2=".95" y2="1">
      <stop offset="0" stopColor="#FFF4EF"/><stop offset=".3" stopColor="#FBD6C6"/>
      <stop offset=".68" stopColor="#F4A088"/><stop offset="1" stopColor="#C96A55"/>
    </linearGradient>
    <linearGradient id="bBodice" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0" stopColor="#D9836B"/><stop offset=".42" stopColor="#FBC4AE"/>
      <stop offset="1" stopColor="#C4735C"/>
    </linearGradient>
    <linearGradient id="bHair" x1=".2" y1="0" x2=".85" y2="1">
      <stop offset="0" stopColor="#33203A"/><stop offset=".6" stopColor="#573A66"/>
      <stop offset="1" stopColor="#7E5AA8"/>
    </linearGradient>
    <linearGradient id="bSkin" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0" stopColor="#DFAC95"/><stop offset=".45" stopColor="#F6D2C0"/>
      <stop offset="1" stopColor="#E2B49E"/>
    </linearGradient>
    <linearGradient id="bSleeve" x1=".2" y1="0" x2=".8" y2="1">
      <stop offset="0" stopColor="#FBD6C6"/><stop offset="1" stopColor="#D9836B"/>
    </linearGradient>
  </defs>

  {/* legs + heels, tapered rather than stick strokes */}
  <path d="M56.5 268h5.5c.3 8 .2 16-.6 24h-5c-.6-8-.5-16 .1-24z" fill="url(#bSkin)" stroke="#B07A63" strokeWidth=".9" strokeLinejoin="round"/>
  <path d="M68 268h5.5c.5 8 .6 16 .1 24h-5c-.7-8-.9-16-.6-24z" fill="url(#bSkin)" stroke="#B07A63" strokeWidth=".9" strokeLinejoin="round"/>
  <path d="M55.5 291h7.5l1 5.5c.2 1.4-.7 2.3-2.2 2.3h-6.5c-1.4 0-2.2-.9-2-2.3z" fill="#C96A55" stroke="#8E4A3C" strokeWidth=".8" strokeLinejoin="round"/>
  <path d="M67 291h7.5l2.2 5.5c.5 1.4-.4 2.3-1.8 2.3h-6.5c-1.5 0-2.4-.9-2.4-2.3z" fill="#C96A55" stroke="#8E4A3C" strokeWidth=".8" strokeLinejoin="round"/>

  {/* three ruffled tiers */}
  <path d="M52 182h26c6 11 9 21 9 30-15 7-34 7-49 1 1-10 5-20 14-31z" fill="url(#bGown)" stroke="#5E2A4A" strokeWidth="1.1" strokeLinejoin="round"/>
  <path d="M40 210c17 8 34 8 51 1 5 12 7 22 6 31-21 8-45 8-65 1 1-11 4-21 8-33z" fill="url(#bGown)" opacity=".97" stroke="#5E2A4A" strokeWidth="1.1" strokeLinejoin="round"/>
  <path d="M35 240c20 9 42 9 62 1 5 12 7 22 6 30-24 9-52 9-76 1 1-11 4-21 8-32z" fill="url(#bGown)" stroke="#5E2A4A" strokeWidth="1.1" strokeLinejoin="round"/>
  <path d="M39 211c6 5 12 5 18 0s12 5 18 0 12 5 16 1" stroke="#FFF6F2" strokeWidth="1.5" opacity=".65"/>
  <path d="M34 241c7 5 14 5 21 0s14 5 21 0 13 5 17 1" stroke="#FFF6F2" strokeWidth="1.5" opacity=".55"/>
  <path d="M28 271c8 5 16 5 24 0s16 5 24 0 14 5 19 1" stroke="#FFF6F2" strokeWidth="1.5" opacity=".45"/>
  <g fill="#FFF6F2" opacity=".5">
    <circle cx="46" cy="256" r="1.4"/><circle cx="60" cy="262" r="1.4"/>
    <circle cx="76" cy="256" r="1.4"/><circle cx="53" cy="272" r="1.3"/>
    <circle cx="69" cy="272" r="1.3"/>
  </g>

  {/* sash + bow */}
  <path d="M50 176h30l-1.5 7H51z" fill="#C3A4E4"/>
  <path d="M65 182c-5-7-14-9-16-4s4 9 9 6c-5 5-3 9 1 8 4-1 6-5 6-10z" fill="#C3A4E4" stroke="#9B78C6" strokeWidth=".7" strokeLinejoin="round"/>
  <path d="M65 182c5-7 14-9 16-4s-4 9-9 6c5 5 3 9-1 8-4-1-6-5-6-10z" fill="#C3A4E4" stroke="#9B78C6" strokeWidth=".7" strokeLinejoin="round"/>
  <circle cx="65" cy="182" r="2.6" fill="#FFF6F2"/>

  {/* ARMS (filled, tapered) */}
  <g>
    {/* left: hand planted on the hip, opening a real triangle of negative space */}
    <path d="M54.5 128.5C45 133 39.5 143.5 40 157c.3 8.2 3.8 15.4 10.4 20.6l3.1-4.8
      C48 168.6 46.2 163.4 46 157c-.3-9.6 3.2-17.6 11.5-22.2z"
      fill="url(#bSkin)" stroke="#B07A63" strokeWidth=".9" strokeLinejoin="round"/>
    <path d="M50.4 177.6l3.1-4.8c4.2 2.6 6 6.2 4.3 9-1.7 2.7-5.5 2-7.4-.4z"
      fill="#F6D2C0" stroke="#B07A63" strokeWidth=".9" strokeLinejoin="round"/>
    <path d="M48.6 146.6c-2.6 4.6-3.6 9.6-3.2 14.6" stroke="#B07A63" strokeWidth=".8" opacity=".45" strokeLinecap="round"/>
    <g className="hm-doll-arm">
      {/* right: hanging with a slight swing */}
    <path d="M76.5 128.5C84.5 133.5 89.5 143.5 89 157c-.4 9.6-1.7 18.2-3.9 26.2l-6-1.2
      c2-7.8 3.3-15.6 3.7-25 .4-9.6-3-17.6-10.8-22.2z"
      fill="url(#bSkin)" stroke="#B07A63" strokeWidth=".9" strokeLinejoin="round"/>
    <path d="M79.1 182l6 1.2c1.3 4.4.2 9.2-2.7 9.6-2.9.4-4.4-3-4.1-6.4z"
      fill="#F6D2C0" stroke="#B07A63" strokeWidth=".9" strokeLinejoin="round"/>
    <path d="M82.4 146.6c2.2 4.7 3 9.8 2.6 15.2" stroke="#B07A63" strokeWidth=".8" opacity=".45" strokeLinecap="round"/>
    </g>
  </g>

  {/* bodice, square neckline */}
  <path d="M55 126h20c3 16 4 34 3 50H52c-1-16 0-34 3-50z" fill="url(#bBodice)" stroke="#5E2A4A" strokeWidth="1.1" strokeLinejoin="round"/>
  <path d="M65 128v46" stroke="#FFF6F2" strokeWidth="1" opacity=".4"/>
  <path d="M55 126h20" stroke="#FFF6F2" strokeWidth="1.6" opacity=".6"/>
  <path d="M58 134c-1 13-1.2 26-.6 39" stroke="#FFF6F2" strokeWidth=".9" opacity=".3"/>
  <path d="M73 134c1 13 1.2 26 .6 39" stroke="#8E4A3C" strokeWidth=".9" opacity=".25"/>

  {/* FLUTTER SLEEVES — drawn after the arms so the joint is always covered.
       Deliberately angular, unlike A's rounded puff. */}
  <path d="M59.5 126c-8.5-1.6-16.5 2-19.2 9.4-1 2.8.6 5.6 3.6 5.6 1.8 0 3.2-1 3.8-2.6 1.8-4.8 6-8 11.8-8.4z"
    fill="url(#bSleeve)" stroke="#5E2A4A" strokeWidth="1" strokeLinejoin="round"/>
  <path d="M70.5 126c8.5-1.6 16.5 2 19.2 9.4 1 2.8-.6 5.6-3.6 5.6-1.8 0-3.2-1-3.8-2.6-1.8-4.8-6-8-11.8-8.4z"
    fill="url(#bSleeve)" stroke="#5E2A4A" strokeWidth="1" strokeLinejoin="round"/>
  <path d="M50 131c-3.2 2-5.2 4.6-6 7.4" stroke="#FFF6F2" strokeWidth=".9" opacity=".5" strokeLinecap="round"/>
  <path d="M80 131c3.2 2 5.2 4.6 6 7.4" stroke="#FFF6F2" strokeWidth=".9" opacity=".45" strokeLinecap="round"/>

  {/* neck */}
  <path d="M61 108h8v16c0 3-8 3-8 0z" fill="#E7B9A2" stroke="#B07A63" strokeWidth=".9"/>
  <path d="M61.4 112c2.4 3 5.6 3.4 7.9 1.8" stroke="#B07A63" strokeWidth=".8" opacity=".5"/>

  {/* head, chin lifted, turned three-quarter right */}
  <path d="M65 74c9.6 0 15.6 8 15.6 18.5 0 6.6-1.7 11.9-5 15.7-3 3.4-6.8 5.2-11.6 5.2-9.2 0-15.2-8.7-15.2-19.4S55.4 74 65 74z"
    fill="url(#bSkin)" stroke="#5E2A4A" strokeWidth="1.1"/>
  {/* face on the open cheek */}
  <path d="M72.4 92c2.2.4 3.8 1.6 4.6 3.3" stroke="#573A66" strokeWidth="1.3" strokeLinecap="round" opacity=".8"/>
  <path d="M72.8 99c1.8.3 3.2.9 4.2 1.8" stroke="#33203A" strokeWidth="1.1" strokeLinecap="round" opacity=".7"/>
  <path d="M73.6 106c1.6.6 3 .5 4.2-.4" stroke="#C4735C" strokeWidth="1.5" strokeLinecap="round"/>
  <ellipse cx="70.5" cy="102.5" rx="3.4" ry="2.2" fill="#F4A088" opacity=".35"/>
  <path d="M79.4 95.5c1.6 1.4 1.6 3.6 0 5" stroke="#B07A63" strokeWidth=".9" opacity=".55" strokeLinecap="round"/>

  {/* hair: high chignon, wrapped base, blunt fringe swept left, one loose strand */}
  <path d="M51.5 100C48.5 79 55 69.5 65 69.5c10.5 0 17.2 8.5 15.4 21-1.5-9-6.8-13-13.4-12.3-5.7.6-10.6 5.8-12 13.8-.5 3-.7 6.5-.3 10z"
    fill="url(#bHair)" stroke="#33203A" strokeWidth="1.1" strokeLinejoin="round"/>
  <ellipse cx="73" cy="63.5" rx="10.5" ry="8.5" fill="url(#bHair)" stroke="#33203A" strokeWidth="1"/>
  <path d="M63 70.5c3.5-3.5 9-4.5 13.5-2.5" stroke="#9B78C6" strokeWidth="1.4" strokeLinecap="round" opacity=".55"/>
  <path d="M66 59c4-2.5 9-2 12 1.5" stroke="#9B78C6" strokeWidth="1.2" strokeLinecap="round" opacity=".4"/>
  <path d="M60 72.5c4-3 8.5-3.5 12.5-1.5" stroke="#33203A" strokeWidth="2.6" strokeLinecap="round" opacity=".8"/>
  <path d="M53.5 96c-3.5 12-2.8 24 2 34" stroke="url(#bHair)" strokeWidth="3.6" strokeLinecap="round"/>
  <path d="M55 98c-2.6 10-2 19.6 1.6 27.6" stroke="#9B78C6" strokeWidth="1" strokeLinecap="round" opacity=".4"/>
  <g>
    <circle cx="82" cy="60" r="2.6" fill="#F4A088"/>
    <circle cx="86" cy="63.5" r="2.2" fill="#FBC4AE"/>
    <circle cx="84" cy="56" r="2" fill="#F4A088"/>
    <circle cx="83.8" cy="60" r="1.2" fill="#FFF6F2"/>
  </g>
    </svg>
  );
}

/**
 * A doll pair for a section. `side` places them; `greet` triggers the one-shot
 * curtsy when the section reveals. They're decorative and `pointer-events:none`,
 * so they can never sit between a finger and a control.
 */
function DollPair({ greet, variant = "flank", className = "" }) {
  return (
    <div className={`hm-dolls hm-dolls-${variant} ${greet ? "is-greeting" : ""} ${className}`}
      aria-hidden="true">
      <span className="hm-doll-slot hm-doll-slot-l"><DollA /></span>
      <span className="hm-doll-slot hm-doll-slot-r"><DollB /></span>
    </div>
  );
}

/** Ribbon-and-bow section divider — the structural device of the whole page. */
function RibbonDivider({ icon = "slipper" }) {
  const Icon = icon === "wand" ? Wand : icon === "crown" ? Crown : Slipper;
  return (
    <div className="hm-divider" aria-hidden="true">
      <span className="hm-divider-line" />
      <span className="hm-divider-bow">
        <svg viewBox="0 0 90 40" fill="none">
          <path d="M45 20c-6-12-22-16-27-9s5 16 17 12c-10 8-6 16 2 13 5-2 8-8 8-16z" fill="currentColor" opacity=".55" />
          <path d="M45 20c6-12 22-16 27-9s-5 16-17 12c10 8 6 16-2 13-5-2-8-8-8-16z" fill="currentColor" opacity=".55" />
          <circle cx="45" cy="20" r="4" fill="currentColor" opacity=".85" />
        </svg>
      </span>
      <span className="hm-divider-icon"><Icon width="26" /></span>
      <span className="hm-divider-line" />
    </div>
  );
}

/** Starlit sky + castle silhouette — recurring background motif. */
function CastleSky({ lit = false, className = "" }) {
  const stars = useMemo(
    () => Array.from({ length: 46 }, (_, i) => ({
      x: (i * 37.7) % 100,
      y: ((i * 61.3) % 62),
      r: 0.5 + ((i * 13) % 10) / 9,
      d: (i % 7) * 0.6,
    })),
    []
  );
  return (
    <svg className={`hm-castle ${lit ? "is-lit" : ""} ${className}`} viewBox="0 0 1200 420"
      preserveAspectRatio="xMidYMax slice" aria-hidden="true">
      {stars.map((s, i) => (
        <circle key={i} className="hm-star" cx={s.x * 12} cy={s.y * 4.2} r={s.r}
          style={{ animationDelay: `${s.d}s` }} />
      ))}
      <path className="hm-castle-body" d="M0 420V352l70-10v-40l16-30 16 30v34l52-6v-92l20-34 20 34v88l40-4V210l26-46 26 46v14h30v-58l34-58 34 58v58h34v-30l30-52 30 52v28l40 4v-88l22-38 22 38v84l46 6v-84l20-34 20 34v82l48 6v-46l18-30 18 30v50l58 8v70z" />
      <g className="hm-castle-windows">
        {[[152, 300], [232, 264], [318, 246], [406, 208], [512, 232], [604, 254], [700, 268], [806, 286], [918, 300], [1046, 322]].map(([x, y], i) => (
          <rect key={i} x={x} y={y} width="7" height="12" rx="3.5" style={{ animationDelay: `${i * 0.09}s` }} />
        ))}
      </g>
    </svg>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   STORY THREAD — the ribbon that ties the chapters together
   ───────────────────────────────────────────────────────────────────────────
   A single path behind the whole page, drawn in as she scrolls, with a pearl
   at each chapter seam that lights when the ribbon reaches it. This is what
   turns four stacked blocks into one continuous story.

   Perf: `scroll` only flips a dirty flag; all reading and writing happens once
   per frame in one rAF, and it writes to exactly one element. Falls back to a
   statically-drawn ribbon under prefers-reduced-motion.
   ═══════════════════════════════════════════════════════════════════════════ */

const THREAD_D =
  "M50 0 C 20 90, 82 150, 50 240 C 18 330, 80 380, 50 470 " +
  "C 22 560, 78 610, 50 700 C 24 790, 76 840, 50 930 C 28 1000, 60 1030, 50 1100";
/* pearls sit at the chapter seams, as a fraction of the path's length */
const THREAD_NODES = [0.12, 0.34, 0.56, 0.78, 0.95];

function StoryThread({ reduced }) {
  const pathRef = useRef(null);
  const wrapRef = useRef(null);
  const [progress, setProgress] = useState(reduced ? 1 : 0);

  useEffect(() => {
    if (reduced) return;
    const path = pathRef.current;
    if (!path || typeof path.getTotalLength !== "function") return;
    let len = 0;
    try {
      len = path.getTotalLength();
    } catch (_) {
      return;                       // no path metrics here; skip the ribbon
    }
    if (!len || !isFinite(len)) return;
    path.style.strokeDasharray = `${len}`;
    path.style.strokeDashoffset = `${len}`;

    // This used to hold a requestAnimationFrame loop open for the life of the
    // page, burning a frame callback even when she wasn't scrolling. Now the
    // loop starts on scroll and shuts itself down once the value settles.
    let dirty = true, raf = 0, last = -1, idle = 0;
    const wake = () => {
      dirty = true;
      idle = 0;
      if (!raf) raf = requestAnimationFrame(tick);
    };
    const onScroll = wake;
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });

    const tick = () => {
      if (dirty) {
        dirty = false;
        idle = 0;
        const doc = document.documentElement;
        const span = doc.scrollHeight - window.innerHeight;
        // 0 → 1 across the page, finishing a little early so the ribbon is
        // complete by the time the footer arrives rather than at the very end.
        const p = span > 0 ? Math.min(1, (window.scrollY / span) * 1.12) : 1;
        if (Math.abs(p - last) > 0.002) {
          last = p;
          path.style.strokeDashoffset = `${len * (1 - p)}`;
          if (wrapRef.current) wrapRef.current.style.setProperty("--lit", p.toFixed(3));
          setProgress(p);
        }
      } else if (++idle > 12) {         // ~200ms with nothing to do
        raf = 0;
        return;                          // loop parks itself
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [reduced]);

  return (
    <div ref={wrapRef} className="hm-thread" aria-hidden="true">
      <svg viewBox="0 0 100 1100" preserveAspectRatio="none" className="hm-thread-svg">
        <defs>
          <linearGradient id="threadG" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#EBD3A4" stopOpacity=".0" />
            <stop offset=".08" stopColor="#EBD3A4" stopOpacity=".9" />
            <stop offset=".5" stopColor="#D98BA6" stopOpacity=".85" />
            <stop offset=".92" stopColor="#C98A72" stopOpacity=".8" />
            <stop offset="1" stopColor="#C98A72" stopOpacity="0" />
          </linearGradient>
        </defs>
        {/* ghost of the full path, so the ribbon reads as a route not a line */}
        <path d={THREAD_D} className="hm-thread-ghost" />
        <path ref={pathRef} d={THREAD_D} className="hm-thread-line" />
      </svg>
      {THREAD_NODES.map((t, i) => (
        <span
          key={i}
          className={`hm-thread-node ${progress >= t ? "is-lit" : ""}`}
          style={{ top: `${t * 100}%`, "--n": i }}
        />
      ))}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   1 — ENTRY GATE
   The single gesture that unlocks audio. Everything about the tap handler is
   synchronous; the animation is state that renders *after* play() is called.
   ═══════════════════════════════════════════════════════════════════════════ */

function EntryGate({ onOpen, reduced }) {
  const [phase, setPhase] = useState("closed"); // closed → opening → gone
  const particles = useParticles();

  useEffect(() => { AudioEngine.prime(); }, []);

  const open = useCallback((e) => {
    if (phase !== "closed") return;

    // ①  AUDIO FIRST — same call stack as the gesture. Do not move this line.
    AudioEngine.unlockAndPlay();

    // ②  Then the visual flourish, from the exact point she touched.
    const x = e.clientX ?? window.innerWidth / 2;
    const y = e.clientY ?? window.innerHeight / 2;
    if (particles.current && !reduced) {
      particles.current.burst(x, y, 90, 460, true);
      setTimeout(() => particles.current && particles.current.burst(x, y * 0.7, 70, 620), 180);
      setTimeout(() => particles.current && particles.current.burst(window.innerWidth / 2, window.innerHeight * 0.42, 80, 520, true), 380);
    }
    setPhase("opening");
    onOpen();
    setTimeout(() => setPhase("gone"), reduced ? 380 : 1050);
  }, [phase, onOpen, particles, reduced]);

  if (phase === "gone") return null;

  return (
    <div
      className={`hm-gate ${phase === "opening" ? "is-opening" : ""}`}
      onClick={open}
      onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") open(e); }}
      role="button"
      tabIndex={0}
      aria-label={`Open $Hamna's birthday page`}
    >
      <CastleSky lit={phase === "opening"} className="hm-gate-sky" />
      <DollPair greet variant="corner" className="hm-dolls-gate" />
      <div className="hm-gate-flash" />

      <div className="hm-invite">
        <div className="hm-invite-lace" />
        <span className="hm-eyebrow">An invitation, of sorts</span>
        <Crown className="hm-invite-crown" width="58" />
        <h1 className="hm-invite-name">{NAME}</h1>
        <p className="hm-invite-line">Something was built for you. Pull the ribbon.</p>

        {/* wax seal + ribbon bow */}
        <div className="hm-seal">
          <svg viewBox="0 0 120 90" aria-hidden="true">
            <path d="M60 46c-9-16-30-21-37-12s6 21 23 16c-14 10-9 22 3 18 7-2 11-11 11-22z" fill="currentColor" opacity=".5" />
            <path d="M60 46c9-16 30-21 37-12s-6 21-23 16c14 10 9 22-3 18-7-2-11-11-11-22z" fill="currentColor" opacity=".5" />
            <circle cx="60" cy="46" r="15" fill="currentColor" opacity=".92" />
            <circle cx="60" cy="46" r="15" fill="none" stroke="#fff" strokeOpacity=".35" strokeWidth="1" />
          </svg>
          <Slipper className="hm-seal-mark" width="30" />
        </div>

        <span className="hm-btn hm-btn-lilac hm-gate-cta">
          <Wand width="16" className="hm-btn-ico" /> tap to begin
        </span>
        <span className="hm-gate-sub">turns the music on</span>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   COUNTDOWN — days until the next 4th of October
   ───────────────────────────────────────────────────────────────────────────
   Computed client-side from the current date, so it needs no backend and never
   goes stale. It ticks live: if the page is left open across midnight the
   numbers roll over on their own. Each numeral counts up into place on load
   rather than snapping to its final value.
   ═══════════════════════════════════════════════════════════════════════════ */

/** Milliseconds until the next birthday — this year's if it's still ahead,
    otherwise next year's. Uses local midnight so "days" matches the calendar. */
function msUntilBirthday(now = new Date()) {
  const y = now.getFullYear();
  const dayStart = new Date(y, BIRTHDAY_MONTH, BIRTHDAY_DAY, 0, 0, 0, 0);
  const dayEnd = new Date(y, BIRTHDAY_MONTH, BIRTHDAY_DAY + 1, 0, 0, 0, 0);

  // The birthday lasts all day. A naive `target <= now` rolls over at 00:00 on
  // the 4th and shows 364 days ON her actual birthday — the one day it must
  // not do that. Zero holds for the whole of the 4th, then it rolls.
  if (now >= dayStart && now < dayEnd) return 0;
  const target = now >= dayEnd
    ? new Date(y + 1, BIRTHDAY_MONTH, BIRTHDAY_DAY, 0, 0, 0, 0)
    : dayStart;
  return target.getTime() - now.getTime();
}

function splitRemaining(ms) {
  const s = Math.max(0, Math.floor(ms / 1000));
  return {
    days: Math.floor(s / 86400),
    hours: Math.floor((s % 86400) / 3600),
    mins: Math.floor((s % 3600) / 60),
    secs: s % 60,
  };
}

/** A single numeral that counts up to its target on first paint. */
function Tick({ value, label, animate }) {
  const [shown, setShown] = useState(animate ? 0 : value);
  const raf = useRef(0);

  useEffect(() => {
    if (!animate) { setShown(value); return; }
    const from = 0;
    const dur = 1100;
    const t0 = performance.now();
    const step = (now) => {
      const t = Math.min(1, (now - t0) / dur);
      // ease-out so it decelerates into place instead of stopping dead
      const e = 1 - Math.pow(1 - t, 3);
      setShown(Math.round(from + (value - from) * e));
      if (t < 1) raf.current = requestAnimationFrame(step);
    };
    raf.current = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf.current);
    // deliberately runs once: after the intro, live updates set the value directly
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [animate]);

  // once the intro has played, follow the live value
  useEffect(() => { if (!animate) setShown(value); }, [value, animate]);

  return (
    <span className="hm-tick">
      <span className="hm-tick-num">{String(shown).padStart(2, "0")}</span>
      <span className="hm-tick-label hm-micro">{label}</span>
    </span>
  );
}

function Countdown({ reduced }) {
  const [left, setLeft] = useState(() => splitRemaining(msUntilBirthday()));
  const [intro, setIntro] = useState(!reduced);

  useEffect(() => {
    // One interval for the whole card. A second is plenty — the seconds column
    // is the fastest thing on it.
    const id = setInterval(() => setLeft(splitRemaining(msUntilBirthday())), 1000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    if (!intro) return;
    const t = setTimeout(() => setIntro(false), 1200);
    return () => clearTimeout(t);
  }, [intro]);

  const isToday = left.days === 0 && left.hours === 0 && left.mins === 0 && left.secs === 0;

  return (
    <div className="hm-countdown">
      <span className="hm-countdown-eyebrow hm-micro">
        {isToday ? "It's today" : "Until the fourth of October"}
      </span>
      <div className="hm-countdown-row">
        <Tick value={left.days} label="days" animate={intro} />
        <span className="hm-tick-sep">:</span>
        <Tick value={left.hours} label="hrs" animate={intro} />
        <span className="hm-tick-sep">:</span>
        <Tick value={left.mins} label="min" animate={intro} />
        <span className="hm-tick-sep">:</span>
        <Tick value={left.secs} label="sec" animate={intro} />
      </div>
      <span className="hm-countdown-tag">for the {NICKNAME}</span>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   2 — HERO
   ═══════════════════════════════════════════════════════════════════════════ */

function Hero({ started, reduced }) {
  const [skyRef, skyOff] = useOffscreen();
  return (
    <header ref={skyRef} className={`hm-hero hm-on-dark ${started ? "is-in" : ""} ${skyOff ? "hm-idle" : ""}`}>
      <CastleSky className="hm-hero-sky" lit />
      <Butterfly className="hm-butterfly hm-butterfly-1" width="46" />
      <Butterfly className="hm-butterfly hm-butterfly-2" width="34" />
      <DollPair greet={started} variant="flank" className="hm-dolls-hero" />

      <div className="hm-hero-inner">
        <Crown className="hm-hero-crown" width="64" />
        <p className="hm-eyebrow hm-hero-eyebrow">Once upon an October</p>
        <h1 className="hm-hero-name">
          <span className="hm-shimmer">{NAME}</span>
          <svg className="hm-swash" viewBox="0 0 320 34" fill="none" aria-hidden="true">
            <path d="M6 22c46 10 108 8 154-2 40-9 92-12 152 4" stroke="currentColor"
              strokeWidth="1.5" strokeLinecap="round" />
            <path d="M232 24c14-8 30-10 42-4" stroke="currentColor" strokeWidth="1.2"
              strokeLinecap="round" opacity=".6" />
            <circle cx="286" cy="26" r="2.4" fill="currentColor" />
          </svg>
        </h1>
        <p className="hm-hero-tag">
          Happy birthday to the friend who stayed
        </p>
        <p className="hm-hero-date">{BIRTHDAY_LONG}</p>
        <Countdown reduced={reduced} />
        <span className="hm-scroll-hint hm-micro" aria-hidden="true">
          <span className="hm-scroll-line" /> scroll
        </span>
      </div>
    </header>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   3 — GALLERY — flexible photo count, renders after the cake
   ═══════════════════════════════════════════════════════════════════════════ */

function PhotoFrame({ photo, index, hovered, setHovered, onOpen, reduced, lowPower }) {
  const ref = useRef(null);
  const [held, setHeld] = useState(false);
  const particles = useParticles();
  const tapRef = useRef({ last: 0 });

  const dim = hovered !== null && hovered !== index;

  /** 3D tilt toward the cursor. Written straight to style — never through state. */
  const onMove = useCallback((e) => {
    if (reduced || lowPower || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    ref.current.style.setProperty("--tx", `${-py * 11}deg`);
    ref.current.style.setProperty("--ty", `${px * 13}deg`);
    ref.current.style.setProperty("--sx", `${(px + 0.5) * 100}%`);
  }, [reduced, lowPower]);

  const reset = useCallback(() => {
    setHovered(null);
    if (ref.current) {
      ref.current.style.setProperty("--tx", "0deg");
      ref.current.style.setProperty("--ty", "0deg");
    }
  }, [setHovered]);

  /** Double click / double tap → heart bloom. Single → lightbox. */
  const onClick = (e) => {
    const now = performance.now();
    if (now - tapRef.current.last < 320) {
      tapRef.current.last = 0;
      if (particles.current && !reduced) {
        particles.current.burst(e.clientX, e.clientY, 26, 190, true);
      }
      AudioEngine.chime(1568);
      setHeld(true);
      setTimeout(() => setHeld(false), 700);
      return;
    }
    tapRef.current.last = now;
    setTimeout(() => {
      if (tapRef.current.last === now) { tapRef.current.last = 0; onOpen(index, ref.current); }
    }, 300);
  };

  return (
    <figure
      ref={ref}
      className={`hm-frame ${dim ? "is-dim" : ""} ${hovered === index ? "is-hot" : ""} ${held ? "is-held" : ""}`}
      style={{
        left: `${photo.x}%`,
        "--row": photo.row,
        "--side": photo.side,
        "--rot": `${photo.rot}deg`,
        "--scale": photo.scale,
        "--delay": `${index * 45}ms`,
        zIndex: hovered === index ? 30 : 10 + index,
      }}
      onPointerEnter={() => setHovered(index)}
      onPointerLeave={reset}
      onPointerMove={onMove}
      onClick={onClick}
      tabIndex={0}
      onKeyDown={(e) => { if (e.key === "Enter") onOpen(index, ref.current); }}
      aria-label={`Open ${photo.alt}`}
    >
      <div className="hm-frame-inner">
        <div className="hm-frame-window">
          <picture>
            <source type="image/webp" srcSet={photo.webp} sizes={FRAME_SIZES} />
            <img
              className="hm-photo"
              src={photo.src}
              alt={photo.alt}
              width={photo.w}
              height={photo.h}
              loading={index < 2 ? "eager" : "lazy"}
              decoding="async"
              style={{ animationDuration: `${16 + index * 3}s`, animationDelay: `${index * -4}s` }}
            />
          </picture>
          <span className="hm-sheen" />
          <span className="hm-curtain" />
        </div>
        <figcaption className="hm-frame-cap hm-micro">
          <Slipper width="14" /> <span>{String(index + 1).padStart(2, "0")}</span>
        </figcaption>
      </div>
      <span className="hm-heart-pop" aria-hidden="true">♥</span>
    </figure>
  );
}

function Gallery({ onOpen, reduced, lowPower }) {
  const [ref, shown] = useReveal();
  const [hovered, setHovered] = useState(null);

  // Only the desktop/tablet layout (>760px) positions frames absolutely and
  // needs a measured height — below 760px the collage is a plain flex column
  // with height:auto, which is already correct by construction and doesn't
  // need this. The check re-runs on resize, so crossing the breakpoint live
  // (e.g. rotating a tablet) switches modes cleanly either way.
  const [absoluteMode, setAbsoluteMode] = useState(
    () => typeof window !== "undefined" && window.innerWidth > 760
  );
  useEffect(() => {
    const onResize = () => setAbsoluteMode(window.innerWidth > 760);
    window.addEventListener("resize", onResize, { passive: true });
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // 3rem of deliberate breathing room ON TOP OF the real measured content
  // height — this is the "sufficient spacing, not just exact-fit" the report
  // asked for, so a future one-line caption wrap or font substitution still
  // can't close the gap back to zero.
  useMeasuredHeight(ref, { pad: 48, enabled: absoluteMode });

  return (
    <section className="hm-section hm-gallery-section" id="gallery">
      <DollPair greet={shown} variant="frame" />
      <div className="hm-section-head">
        <span className="hm-eyebrow">{chapterOf("gallery")}</span>
        <h2 className="hm-h2">Frames worth keeping</h2>
        <p className="hm-sub">Hover to lift one out of the pile. Tap twice if it makes you smile.</p>
        <p className="hm-albatross-tag">from the {NICKNAME} archives</p>
      </div>

      <div ref={ref} className={`hm-collage ${shown ? "is-in" : ""}`} style={{ "--rows": ROWS }}
        onPointerLeave={() => setHovered(null)}>
        {PHOTOS.map((p, i) => (
          <PhotoFrame
            key={p.id}
            photo={p}
            index={i}
            hovered={hovered}
            setHovered={setHovered}
            onOpen={onOpen}
            reduced={reduced}
            lowPower={lowPower}
          />
        ))}
      </div>
      <RibbonDivider icon="wand" />
    </section>
  );
}

/**
 * Lightbox with a FLIP shared-element transition: the image is rendered at its
 * final centred geometry, then inverse-transformed onto the thumbnail's rect and
 * released on the next frame, so it appears to grow out of the collage.
 */
function Lightbox({ open, index, origin, onClose, onIndex, reduced }) {
  const imgRef = useRef(null);
  const flipped = useRef(false);

  // Reset so the shared-element grow runs again the next time it's opened.
  useEffect(() => { if (!open) flipped.current = false; }, [open]);

  useLayoutEffect(() => {
    if (!open || !imgRef.current) return;
    const node = imgRef.current;
    // FLIP only on the opening frame — navigating between photos crossfades.
    if (flipped.current) return;
    flipped.current = true;
    if (reduced || !origin) { node.style.transform = ""; node.style.opacity = "1"; return; }
    const to = node.getBoundingClientRect();
    const from = origin.getBoundingClientRect();
    const sx = from.width / to.width;
    const sy = from.height / to.height;
    const dx = from.left + from.width / 2 - (to.left + to.width / 2);
    const dy = from.top + from.height / 2 - (to.top + to.height / 2);
    node.style.transition = "none";
    node.style.transformOrigin = "center";
    node.style.transform = `translate3d(${dx}px, ${dy}px, 0) scale(${sx}, ${sy})`;
    requestAnimationFrame(() => {
      node.style.transition = "transform 420ms cubic-bezier(.22,1,.28,1)";
      node.style.transform = "translate3d(0,0,0) scale(1,1)";
    });
  }, [open, index, origin, reduced]);

  useEffect(() => {
    if (!open) return;
    const key = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") { onIndex((index + 1) % PHOTOS.length); }
      if (e.key === "ArrowLeft") { onIndex((index - 1 + PHOTOS.length) % PHOTOS.length); }
    };
    window.addEventListener("keydown", key);
    document.body.style.overflow = "hidden";
    return () => { window.removeEventListener("keydown", key); document.body.style.overflow = ""; };
  }, [open, index, onClose, onIndex]);

  const touch = useRef({ x: 0 });
  if (!open) return null;
  const photo = PHOTOS[index];

  return (
    <div className="hm-lightbox" role="dialog" aria-modal="true" aria-label={photo.alt}
      onClick={onClose}
      onTouchStart={(e) => { touch.current.x = e.touches[0].clientX; }}
      onTouchEnd={(e) => {
        const d = e.changedTouches[0].clientX - touch.current.x;
        if (Math.abs(d) > 48) {
          onIndex((index + (d < 0 ? 1 : -1) + PHOTOS.length) % PHOTOS.length);
        }
      }}>
      <div className="hm-lightbox-veil" />
      <button className="hm-lb-nav hm-lb-prev" aria-label="Previous photo"
        onClick={(e) => { e.stopPropagation(); onIndex((index - 1 + PHOTOS.length) % PHOTOS.length); }}>‹</button>
      <figure className="hm-lightbox-stage" onClick={(e) => e.stopPropagation()}>
        <picture key={index}>
          <source type="image/webp" srcSet={photo.webp} sizes={LIGHTBOX_SIZES} />
          <img ref={imgRef} className="hm-lightbox-img"
            src={photo.src} alt={photo.alt} width={photo.w} height={photo.h} />
        </picture>
        <figcaption className="hm-lightbox-cap hm-micro">
          <Slipper width="16" /> {index + 1} of {PHOTOS.length}
        </figcaption>
      </figure>
      <button className="hm-lb-nav hm-lb-next" aria-label="Next photo"
        onClick={(e) => { e.stopPropagation(); onIndex((index + 1) % PHOTOS.length); }}>›</button>
      <button className="hm-lb-close" aria-label="Close" onClick={onClose}>×</button>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   4 — HANDWRITTEN NOTE
   ═══════════════════════════════════════════════════════════════════════════ */

function Note() {
  const [ref, shown] = useReveal();
  return (
    <section className={`hm-section hm-note-section ${shown ? "is-in" : ""}`} ref={ref}>
      <DollPair greet={shown} variant="corner" />
      <div className="hm-aside-grid">
        <header className="hm-aside-head">
          <span className="hm-eyebrow">{chapterOf("letter")}</span>
          <h2 className="hm-h2 hm-h2-aside">A letter,<br />friend to friend</h2>
          <span className="hm-aside-rule" aria-hidden="true" />
          <p className="hm-aside-note">Written the week before, and meant all of it.</p>
        </header>

        <div className="hm-note">
          <span className="hm-note-flourish hm-note-flourish-tl" aria-hidden="true">
            <svg viewBox="0 0 120 120" fill="none">
              <path d="M8 112C8 58 30 18 112 8" stroke="currentColor" strokeWidth="1.2" />
              <path d="M26 96c6-30 26-52 62-62" stroke="currentColor" strokeWidth="1" opacity=".6" />
              <circle cx="20" cy="70" r="3" fill="currentColor" opacity=".7" />
              <circle cx="52" cy="40" r="4.5" fill="currentColor" opacity=".5" />
              <circle cx="86" cy="22" r="2.6" fill="currentColor" opacity=".8" />
            </svg>
          </span>
          <div className="hm-note-body">
            <p>Dear {NAME},</p>
            <p>
              {/* ── Replace with your own words; this is placeholder. ── */}
              I don't say this enough, so I'm saying it here: I'm really glad
              I have you. You've shown up for me more times than I can count,
              in the small ways that actually matter — checking in, listening
              without making it weird, staying even when it would've been
              easier not to.
            </p>
            <p>
              May Allah keep you happy and healthy, always. May He make your
              future easier than you're expecting and give you every good
              thing you've been quietly hoping for. And may He keep our
              friendship exactly this easy, for a long, long time.
            </p>
            <p>
              Happy birthday, <span className="hm-nick">{NICKNAME}</span>. I hope this year is a really good one for you.
            </p>
            <p className="hm-sign">— your friend, Muneeb</p>
          </div>
        </div>
      </div>
      <RibbonDivider icon="crown" />
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   5 — CAKE & CANDLE — renders FIRST after the hero
   Drawn as an original illustration: periwinkle ballgown tiers, gold piping,
   pearl beading, a sugar glass slipper on top. Fluid viewBox, never cropped.
   ═══════════════════════════════════════════════════════════════════════════ */

function Cake({ reduced, lowPower, onWish }) {
  const [ref, shown] = useReveal();
  const [liveRef, cakeOff] = useOffscreen();
  const [blown, setBlown] = useState(false);
  const svgRef = useRef(null);

  const particles = useParticles();

  const makeWish = useCallback(() => {
    if (blown) return;
    setBlown(true);

    // The song is already running from the entry gate; this only re-starts it
    // if it has finished. It can never open a second stream.
    AudioEngine.resyncOrRestart();

    // Hand off to the site-wide finale — the cake is the trigger, not the
    // whole event. The chime ladder is the Finale's job from here.
    onWish && onWish();

    if (reduced || !particles.current || !liveRef.current) return;
    const r = liveRef.current.getBoundingClientRect();
    const cx = r.left + r.width / 2;
    const cy = r.top + r.height * 0.22;
    // Same firework vocabulary as the entry gate, so the two moments rhyme.
    particles.current.burst(cx, cy, 80, 420, true);
    [220, 460, 760].forEach((d, i) =>
      setTimeout(() => particles.current && particles.current.burst(
        r.left + r.width * (0.25 + i * 0.25), cy + i * 12, 55, 500, i === 1
      ), d)
    );
  }, [blown, particles, reduced, onWish, liveRef]);

  const stageRef = useRef(null);

  /** Pointer parallax. Writes one transform straight to style — never state,
      so moving the mouse over the cake causes no React work at all. */
  const tilt = useCallback((e) => {
    if (reduced || !stageRef.current) return;
    const r = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    stageRef.current.style.setProperty("--ry", `${px * 22}deg`);
    stageRef.current.style.setProperty("--rx", `${-py * 12}deg`);
  }, [reduced]);

  const untilt = useCallback(() => {
    if (!stageRef.current) return;
    stageRef.current.style.setProperty("--ry", "0deg");
    stageRef.current.style.setProperty("--rx", "0deg");
  }, []);

  /** Pearl-string piping. Each bead gets its own highlight so it reads round. */
  const pearls = (y, from, to, n, r = 3.2) =>
    Array.from({ length: n }, (_, i) => {
      const cx = from + ((to - from) / (n - 1)) * i;
      return (
        <g key={`${y}-${i}`}>
          <circle cx={cx} cy={y} r={r} className="hm-pearl" />
          <circle cx={cx - r * 0.3} cy={y - r * 0.32} r={r * 0.34} className="hm-pearl-hi" />
        </g>
      );
    });

  return (
    <section className={`hm-section hm-cake-section ${shown ? "is-in" : ""}`} ref={ref}>
      <DollPair greet={shown} variant="flank" />
      <div className="hm-section-head">
        <span className="hm-eyebrow">{chapterOf("cake")}</span>
        <h2 className="hm-h2">Close your eyes</h2>
        <p className="hm-sub">One candle, one wish. Midnight can wait tonight.</p>
      </div>

      <div
        ref={liveRef}
        className={`hm-cake-wrap ${blown ? "is-blown" : ""} ${cakeOff ? "hm-idle" : ""}`}
        onPointerMove={tilt}
        onPointerLeave={untilt}
      >
        <div className="hm-cake-stage">
          <div ref={stageRef} className="hm-cake-3d">
            {/* back plate — furthest from the viewer, moves least */}
            <span className="hm-cake-depth hm-cake-depth-back" />
            <svg ref={svgRef} className="hm-cake" viewBox="0 -22 400 492" role="img"
              preserveAspectRatio="xMidYMid meet"
              aria-label="A blush and gold birthday cake with a lit candle">
              <defs>
                {/* Each tier gets a horizontal gradient with dark falloff at BOTH
                    edges — that's what makes a flat rectangle read as a cylinder. */}
                <linearGradient id="tierA" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0"   stopColor="#B9718C" />
                  <stop offset=".14" stopColor="#DC9BB2" />
                  <stop offset=".38" stopColor="#F7DCE5" />
                  <stop offset=".56" stopColor="#FDF0F4" />
                  <stop offset=".78" stopColor="#EBB6C8" />
                  <stop offset=".93" stopColor="#C67F99" />
                  <stop offset="1"   stopColor="#A8637E" />
                </linearGradient>
                <linearGradient id="tierB" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0"   stopColor="#A9647F" />
                  <stop offset=".15" stopColor="#D28FA9" />
                  <stop offset=".4"  stopColor="#F3D2DE" />
                  <stop offset=".58" stopColor="#FBEAF0" />
                  <stop offset=".8"  stopColor="#E2ABBF" />
                  <stop offset="1"   stopColor="#9A5872" />
                </linearGradient>
                {/* frosted top surfaces: light at the back, shadowed at the front */}
                <linearGradient id="crown" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0"   stopColor="#FFF7FA" />
                  <stop offset=".55" stopColor="#F8DDE7" />
                  <stop offset="1"   stopColor="#E0AEC1" />
                </linearGradient>
                <linearGradient id="gold" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0"   stopColor="#F4E0B4" />
                  <stop offset=".38" stopColor="#C79A5B" />
                  <stop offset=".62" stopColor="#EFD5A2" />
                  <stop offset="1"   stopColor="#B4834A" />
                </linearGradient>
                <linearGradient id="board" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0" stopColor="#B4834A" />
                  <stop offset=".5" stopColor="#F4E0B4" />
                  <stop offset="1" stopColor="#B4834A" />
                </linearGradient>
                {/* contact shadow where each tier meets the one below */}
                <linearGradient id="seat" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0" stopColor="#8E4F68" stopOpacity=".45" />
                  <stop offset="1" stopColor="#8E4F68" stopOpacity="0" />
                </linearGradient>
                <radialGradient id="flameG" cx=".5" cy=".68" r=".62">
                  <stop offset="0"   stopColor="#FFFBEC" />
                  <stop offset=".38" stopColor="#FFD26B" />
                  <stop offset=".72" stopColor="#F59B34" stopOpacity=".8" />
                  <stop offset="1"   stopColor="#E8722A" stopOpacity="0" />
                </radialGradient>
                <radialGradient id="halo" cx=".5" cy=".5" r=".5">
                  <stop offset="0" stopColor="#FFD79C" stopOpacity=".5" />
                  <stop offset="1" stopColor="#FFD79C" stopOpacity="0" />
                </radialGradient>
                <linearGradient id="wax" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0"   stopColor="#D9A3B6" />
                  <stop offset=".26" stopColor="#FFF8FA" />
                  <stop offset=".62" stopColor="#FDEAF0" />
                  <stop offset="1"   stopColor="#C88CA2" />
                </linearGradient>
                <filter id="soft" x="-60%" y="-60%" width="220%" height="220%">
                  <feGaussianBlur stdDeviation="5" />
                </filter>
              </defs>

              {/* candle glow */}
              <ellipse className="hm-halo" cx="200" cy="104" rx="140" ry="120" fill="url(#halo)" />

              {/* ── flame: three offset layers, each flickering on its own cycle,
                     so the shape churns instead of pulsing as one rigid teardrop ── */}
              <g className="hm-flame-grp">
                <path className="hm-flame-a" d="M200 58c17 18 24 30 24 42 0 14-11 24-24 24s-24-10-24-24c0-12 7-24 24-42z" fill="url(#flameG)" />
                <path className="hm-flame-b" d="M200 72c11 13 15 21 15 29 0 9-6 15-15 15s-15-6-15-15c0-8 4-16 15-29z" fill="#FFE9A8" opacity=".9" />
                <path className="hm-flame-c" d="M200 84c6 8 9 13 9 18 0 6-4 10-9 10s-9-4-9-10c0-5 3-10 9-18z" fill="#FFFDF2" />
              </g>
              <g className="hm-smoke">
                <path d="M200 118c-9 13 9 19 0 32s7 19 0 30" stroke="#EFDCE4" strokeWidth="4"
                  strokeLinecap="round" fill="none" filter="url(#soft)" />
              </g>
              {/* wick — bends slightly, charred at the tip */}
              <path className="hm-wick" d="M200 132c0-8 2-12 1-18" stroke="#4A3226" strokeWidth="2.6"
                strokeLinecap="round" fill="none" />

              {/* ── taper candle: narrower at the top, seated in a gold collar ── */}
              <path d="M193 132c0-4 1-6 2-8h10c1 2 2 4 2 8v56h-14z" fill="url(#wax)" />
              <path d="M193 140c5 3 9 3 14 0" stroke="#E7B6C6" strokeWidth="1.6" fill="none" opacity=".7" />
              <ellipse cx="200" cy="132" rx="7" ry="2.4" fill="#FFF8FA" opacity=".9" />
              <path d="M191 188h18l-2.5 9h-13z" fill="url(#gold)" />

              {/* ═══ TOP TIER ═══ */}
              <ellipse cx="200" cy="200" rx="54" ry="14" fill="url(#crown)" />
              <path d="M146 200v44a54 14 0 0 0 108 0v-44z" fill="url(#tierA)" />
              <path className="hm-drip" d="M146 202c0 9 3 14 8 14s7-9 12-9 7 13 13 13 7-15 13-15 8 12 14 12 7-13 13-13 8 10 13 10 8-6 8-14v-2a54 14 0 0 1-108 0z"
                fill="#FFF6F9" opacity=".92" />
              <ellipse cx="200" cy="200" rx="54" ry="14" fill="none" stroke="url(#gold)" strokeWidth="2" />
              <g className="hm-piping">{pearls(243, 152, 248, 9, 3)}</g>
              <path d="M158 222c14 6 30 9 42 9s28-3 42-9" stroke="#FFFFFF" strokeWidth="1.6"
                fill="none" opacity=".3" />

              {/* seat shadow under the top tier */}
              <ellipse cx="200" cy="258" rx="60" ry="12" fill="url(#seat)" />

              {/* ═══ MIDDLE TIER ═══ */}
              <ellipse cx="200" cy="258" rx="80" ry="19" fill="url(#crown)" />
              <path d="M120 258v62a80 19 0 0 0 160 0v-62z" fill="url(#tierB)" />
              <path className="hm-drip" d="M120 260c0 11 4 17 10 17s8-11 15-11 8 15 16 15 9-17 16-17 9 14 17 14 9-15 16-15 9 12 16 12 12-7 12-15v-2a80 19 0 0 1-160 0z"
                fill="#FFF6F9" opacity=".9" />
              <ellipse cx="200" cy="258" rx="80" ry="19" fill="none" stroke="url(#gold)" strokeWidth="2.2" />
              {/* swirled frosting texture — reads as buttercream, not flat fill */}
              <g className="hm-swirls">
                <path d="M132 290c22 11 44 16 68 16s46-5 68-16" stroke="#FFFFFF" strokeWidth="2" fill="none" opacity=".24" />
                <path d="M128 304c24 12 46 17 72 17s48-5 72-17" stroke="#FFFFFF" strokeWidth="1.5" fill="none" opacity=".18" />
                <path d="M136 276c20 9 40 13 64 13s44-4 64-13" stroke="#A9647F" strokeWidth="1.2" fill="none" opacity=".14" />
              </g>
              {/* small bow on the middle tier */}
              <g className="hm-bow" transform="translate(200 292)">
                <path d="M0 0c-4-7-14-9-17-5s3 10 11 7c-6 5-4 10 1 8 3-1 5-5 5-10z" fill="url(#gold)" opacity=".9" />
                <path d="M0 0c4-7 14-9 17-5s-3 10-11 7c6 5 4 10-1 8-3-1-5-5-5-10z" fill="url(#gold)" opacity=".9" />
                <circle cx="0" cy="0" r="2.6" fill="#FFF3D6" />
              </g>
              <g className="hm-piping">{pearls(319, 124, 276, 13, 3.4)}</g>

              <ellipse cx="200" cy="338" rx="88" ry="14" fill="url(#seat)" />

              {/* ═══ BOTTOM TIER ═══ */}
              <ellipse cx="200" cy="338" rx="108" ry="25" fill="url(#crown)" />
              <path d="M92 338v78a108 25 0 0 0 216 0v-78z" fill="url(#tierA)" />
              <path className="hm-drip" d="M92 340c0 13 5 20 12 20s10-13 18-13 10 18 19 18 11-20 19-20 11 16 20 16 11-18 19-18 11 14 20 14 15-9 15-17v-2a108 25 0 0 1-216 0z"
                fill="#FFF6F9" opacity=".88" />
              <ellipse cx="200" cy="338" rx="108" ry="25" fill="none" stroke="url(#gold)" strokeWidth="2.6" />
              <g className="hm-swirls">
                <path d="M104 374c30 14 60 20 96 20s66-6 96-20" stroke="#FFFFFF" strokeWidth="2.2" fill="none" opacity=".22" />
                <path d="M100 392c32 15 62 21 100 21s68-6 100-21" stroke="#FFFFFF" strokeWidth="1.6" fill="none" opacity=".16" />
              </g>
              {/* scalloped gold lace along the base tier */}
              <g className="hm-lace-arc">
                {[0, 1, 2, 3, 4, 5].map((i) => (
                  <path key={i} d={`M${106 + i * 32} 396c8 12 24 12 32 0`} stroke="url(#gold)"
                    strokeWidth="1.6" fill="none" opacity=".75" />
                ))}
              </g>
              <g className="hm-piping">{pearls(376, 100, 300, 15, 3.8)}</g>

              {/* edible-gold shimmer */}
              <g className="hm-flecks">
                {[[166,228],[238,220],[142,300],[262,296],[120,382],[282,378],[200,232],[176,364],[228,388],[154,268],[250,272]].map(([x,y],i) => (
                  <circle key={i} cx={x} cy={y} r="1.6" fill="#F6E4BC" style={{ animationDelay: `${i * 0.34}s` }} />
                ))}
              </g>

              {/* board + cast shadow */}
              <ellipse cx="200" cy="440" rx="132" ry="17" fill="#8E4F68" opacity=".2" />
              <path d="M68 428h264a11 11 0 0 1-7 13H75a11 11 0 0 1-7-13z" fill="url(#board)" opacity=".92" />

              {/* sugar-slipper topper, perched on the top tier */}
              <g className="hm-topper" transform="translate(228 176) rotate(-9) scale(.6)">
                <path d="M6 30c8 2 16 1 24-3 6-3 10-8 16-11 5-2.5 10-2 13 1 2.5 2.5 2 6-1 8-6 4-14 6-22 7-9 1.2-18 1.4-27 1-2.5-.1-3.6-2.4-3-3z"
                  fill="#F7E2EA" opacity=".95" stroke="url(#gold)" strokeWidth="1.6" />
                <path d="M46 16c2-4 6-8 10-9" stroke="#F4E0B4" strokeWidth="1.6" strokeLinecap="round" />
                <circle cx="57" cy="6" r="2.6" fill="#FFF3D6" />
              </g>
            </svg>

            {/* front plate — nearest the viewer, moves most */}
            <span className="hm-cake-depth hm-cake-depth-front" />
          </div>
        </div>

        <button
          className={`hm-btn hm-btn-coral hm-wish-btn ${blown ? "is-done" : ""}`}
          onClick={makeWish}
          disabled={blown}
          aria-live="polite"
        >
          <span className="hm-btn-ico">{blown ? <Slipper width="18" /> : <Wand width="18" />}</span>
          {blown ? "Wish made" : "Make a wish"}
        </button>
        <p className={`hm-wish-note ${blown ? "is-on" : ""}`}>
          Whatever you asked for — consider it in motion.
        </p>
      </div>
      <RibbonDivider icon="slipper" />
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   FINALE — what happens when she makes the wish
   ───────────────────────────────────────────────────────────────────────────
   The candle going out kicks off a ~9s sequence that takes over the whole
   page, not just the cake: a bloom of light, rockets climbing from the bottom
   edge and breaking overhead, a rolling firework barrage, confetti rain from
   the top, every section reacting at once, and a script banner that blooms
   and fades.

   All of it is driven by ONE timeline of timers held in a ref, so unmounting
   or a second trigger can never leave an orphan running. The heavy lifting
   goes through the existing particle pool — the finale allocates nothing.
   Under prefers-reduced-motion the whole sequence collapses to the banner
   plus a gentle glow, and the audio path is untouched either way.
   ═══════════════════════════════════════════════════════════════════════════ */

/* ── Balloons ──────────────────────────────────────────────────────────────
   Released on the wish, alongside the candle blow-out, the fireworks and the
   audio — one combined moment. DOM nodes on CSS transforms (not canvas), so
   they cannot fail to appear the way a mis-sized canvas can.

   Each balloon gets its own size, hue, rise duration, delay, horizontal start
   and sway amplitude, so nothing moves in unison. Capped by device class. */
const BALLOON_HUES = [
  ["#F6B9CE", "#D07E9E"],   // blush
  ["#E9A9C2", "#B0648A"],   // rose
  ["#D9BFF0", "#9B78C6"],   // lilac
  ["#FBC4AE", "#DA7A60"],   // coral
  ["#F2D8C6", "#C98673"],   // rose-gold
  ["#FFF0F5", "#E9A9C2"],   // pearl
];

function buildBalloons(n) {
  return Array.from({ length: n }, (_, i) => {
    const [light, dark] = BALLOON_HUES[i % BALLOON_HUES.length];
    return {
      x: (i * 37.4) % 100,                    // deterministic spread
      size: 26 + ((i * 13) % 30),             // 26–56px wide
      dur: 5.2 + ((i * 7) % 40) / 10,         // 5.2–9.1s rise
      delay: ((i * 11) % 26) / 10,            // 0–2.5s stagger
      sway: 20 + ((i * 17) % 60),             // px of side-to-side drift
      swayDur: 2.2 + ((i * 5) % 18) / 10,
      tilt: ((i % 5) - 2) * 4,
      light, dark,
    };
  });
}

/* ── DOM fireworks ─────────────────────────────────────────────────────────
   The canvas particle system stays, but the finale no longer DEPENDS on it.
   These are real DOM nodes animated with CSS transform/opacity — if the canvas
   is mis-sized, context-lost, or blocked for any reason, the fireworks still
   fire. Mounted only while celebrating, then unmounted entirely.            */
const FW_COLORS = ["#FFF3D2", "#EBD3A4", "#D98BA6", "#C79A5B", "#FFFFFF", "#F6D5E0", "#C98A72"];

function buildFireworks(count, shards) {
  const bursts = [];
  for (let b = 0; b < count; b++) {
    const pieces = [];
    for (let i = 0; i < shards; i++) {
      const a = (i / shards) * Math.PI * 2 + Math.random() * 0.4;
      const d = 90 + Math.random() * 190;
      pieces.push({
        dx: Math.cos(a) * d,
        dy: Math.sin(a) * d,
        c: FW_COLORS[(Math.random() * FW_COLORS.length) | 0],
        s: 3 + Math.random() * 4,
        dur: 1.1 + Math.random() * 0.7,
      });
    }
    bursts.push({
      x: 6 + Math.random() * 88,          // % of viewport, edge to edge
      y: 8 + Math.random() * 62,
      delay: b * 0.34 + Math.random() * 0.2,
      pieces,
    });
  }
  return bursts;
}

function buildConfetti(n) {
  return Array.from({ length: n }, (_, i) => ({
    x: Math.random() * 100,
    delay: Math.random() * 3.2,
    dur: 3.4 + Math.random() * 2.6,
    drift: (Math.random() - 0.5) * 220,
    spin: 360 + Math.random() * 900,
    c: FW_COLORS[(Math.random() * FW_COLORS.length) | 0],
    w: 5 + Math.random() * 5,
    h: 9 + Math.random() * 8,
  }));
}

function Finale({ active, reduced, lowPower, onDone }) {
  // One multiplier drives every count in the sequence, so the shape of the
  // finale is identical on a laptop and a phone — only the density changes.
  const D = lowPower ? 0.42 : 1;
  const qty = (n) => Math.max(1, Math.round(n * D));
  const particles = useParticles();
  const timers = useRef([]);
  const doneRef = useRef(onDone);
  doneRef.current = onDone;
  const [phase, setPhase] = useState("idle"); // idle → bloom → party → banner → out

  // Regenerated per celebration so two runs never look identical.
  const fireworks = useMemo(
    () => (active && !reduced ? buildFireworks(lowPower ? 9 : 16, lowPower ? 14 : 22) : []),
    [active, reduced, lowPower]
  );
  const confetti = useMemo(
    () => (active && !reduced ? buildConfetti(lowPower ? 40 : 80) : []),
    [active, reduced, lowPower]
  );
  // 50+ on desktop as asked; halved on low-power, and reduced-motion gets a
  // small still cluster rather than a rising swarm.
  const balloons = useMemo(
    () => (active ? buildBalloons(reduced ? 10 : lowPower ? 28 : 56) : []),
    [active, reduced, lowPower]
  );

  useEffect(() => {
    if (!active) return;
    const at = (ms, fn) => timers.current.push(setTimeout(fn, ms));
    const P = () => particles.current;
    const W = () => window.innerWidth;
    const H = () => window.innerHeight;

    setPhase("bloom");
    at(260, () => setPhase("party"));
    at(1500, () => setPhase("banner"));
    at(8200, () => setPhase("out"));
    at(10500, () => { setPhase("idle"); doneRef.current && doneRef.current(); });

    // A soft chime ladder under the barrage — same voice as the entry unlock.
    [0, 260, 520, 900, 1400, 2100].forEach((d, i) =>
      at(d, () => AudioEngine.chime([1046.5, 1318.5, 1568, 2093, 1568, 1318.5][i]))
    );

    if (reduced) {
      return () => { timers.current.forEach(clearTimeout); timers.current = []; };
    }

    // ── t=0: three wide bursts across the viewport, so the screen is full
    //         of fireworks on the same frame she lifts her finger ──
    [[0.5, 0.42], [0.18, 0.3], [0.82, 0.3]].forEach(([fx, fy], i) =>
      at(i * 90, () => {
        const p = P(); if (!p) return;
        p.burst(W() * fx, H() * fy, qty(110), 700, i === 0);
      })
    );

    // ── fountains: continuous sprays from both bottom corners for 3s ──
    for (let i = 0; i < (lowPower ? 8 : 18); i++) {
      at(60 + i * 170, () => {
        const p = P(); if (!p) return;
        p.spray(W() * 0.06, H() + 10, qty(16), -Math.PI / 2.35, 0.55, 900);
        p.spray(W() * 0.94, H() + 10, qty(16), -Math.PI / 1.75, 0.55, 900);
      });
    }

    // ── rockets: climb from the bottom edge, break near the top third ──
    const launch = (delay, xFrac) =>
      at(delay, () => {
        const p = P(); if (!p) return;
        const x = W() * xFrac + (Math.random() - 0.5) * 60;
        const flight = p.rocket(x, H() + 20, 900 + Math.random() * 260);
        at(flight, () => {
          const q = P(); if (!q) return;
          q.burst(x, H() * (0.16 + Math.random() * 0.24), qty(78), 620, Math.random() > 0.6);
        });
      });
    const shots = [[120, 0.2], [260, 0.78], [430, 0.45], [640, 0.12], [860, 0.88],
                   [1150, 0.62], [1500, 0.3], [1900, 0.7], [2350, 0.5],
                   [2850, 0.22], [3350, 0.8], [3900, 0.4], [4500, 0.66], [5100, 0.28]];
    (lowPower ? shots.filter((_, i) => i % 2 === 0) : shots).forEach(([d, x]) => launch(d, x));

    // ── rolling barrage across the full viewport ──
    for (let i = 0; i < (lowPower ? 14 : 26); i++) {
      at(240 + i * (lowPower ? 380 : 230), () => {
        const p = P(); if (!p) return;
        p.burst(
          W() * (0.06 + Math.random() * 0.88),   // edge to edge, not centred
          H() * (0.08 + Math.random() * 0.72),
          qty(56 + Math.random() * 30),
          380 + Math.random() * 280,
          i % 3 === 0
        );
      });
    }

    // ── confetti rain, thinning out as it ends ──
    let rain = 0;
    at(320, () => {
      let n = 0;
      rain = setInterval(() => {
        const p = P();
        if (!p || document.hidden) return;
        const density = qty(n < 55 ? 6 : n < 90 ? 3 : 1); // tapers, doesn't stop dead
        for (let i = 0; i < density; i++) p.confetti(Math.random() * W(), -20);
        if (++n > 120) { clearInterval(rain); rain = 0; }
      }, 70);
    });

    return () => {
      timers.current.forEach(clearTimeout);
      timers.current = [];
      if (rain) clearInterval(rain);
    };
  }, [active, reduced, particles, D]);

  if (phase === "idle") return null;

  return (
    <>
      {/* under the particle canvas, so fireworks stay bright on top of it */}
      <div className={`hm-finale-under is-${phase}`} aria-hidden="true">
        <div className="hm-finale-bloom" />
        <div className="hm-finale-glow" />
      </div>
      {/* Balloons rise behind the fireworks and in front of the page. */}
      <div className={`hm-balloons is-${phase}`} aria-hidden="true">
        {balloons.map((b, i) => (
          <span
            key={i}
            className="hm-balloon"
            style={{
              left: `${b.x}%`,
              "--size": `${b.size}px`,
              "--light": b.light,
              "--dark": b.dark,
              "--sway": `${b.sway}px`,
              "--tilt": `${b.tilt}deg`,
              animationDuration: `${b.dur}s`,
              animationDelay: `${b.delay}s`,
            }}
          >
            <span className="hm-balloon-body" style={{ animationDuration: `${b.swayDur}s` }}>
              <i className="hm-balloon-shine" />
              <i className="hm-balloon-knot" />
            </span>
            <i className="hm-balloon-string" />
          </span>
        ))}
      </div>

      {/* DOM fireworks — independent of the canvas, so they cannot silently
          fail to appear. */}
      <div className={`hm-finale-fw is-${phase}`} aria-hidden="true">
        {fireworks.map((b, bi) => (
          <span key={bi} className="hm-fw" style={{ left: `${b.x}%`, top: `${b.y}%` }}>
            <span className="hm-fw-core" style={{ animationDelay: `${b.delay}s` }} />
            {b.pieces.map((p, pi) => (
              <i
                key={pi}
                style={{
                  "--dx": `${p.dx}px`,
                  "--dy": `${p.dy}px`,
                  "--c": p.c,
                  "--s": `${p.s}px`,
                  animationDelay: `${b.delay}s`,
                  animationDuration: `${p.dur}s`,
                }}
              />
            ))}
          </span>
        ))}
        {confetti.map((c, i) => (
          <b
            key={`c${i}`}
            className="hm-fw-confetti"
            style={{
              left: `${c.x}%`,
              "--drift": `${c.drift}px`,
              "--spin": `${c.spin}deg`,
              "--c": c.c,
              width: `${c.w}px`,
              height: `${c.h}px`,
              animationDelay: `${c.delay}s`,
              animationDuration: `${c.dur}s`,
            }}
          />
        ))}
      </div>

      <div className={`hm-finale is-${phase}`} aria-hidden="true">
        <div className="hm-finale-banner">
          <span className="hm-finale-eyebrow hm-micro">Happy birthday</span>
          <span className="hm-finale-name">{NAME}</span>
          <span className="hm-finale-rule" />
          <span className="hm-finale-sub">{BIRTHDAY_LONG}</span>
        </div>
      </div>
    </>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   6 — WELL WISHES / PRAYER
   ═══════════════════════════════════════════════════════════════════════════ */

const WISHES = [
  { k: "Health", t: "That you stay healthy and strong, and never have to be brave about it." },
  { k: "Future", t: "That whatever you're working toward actually happens — and it's even better than you pictured." },
  { k: "Ease",   t: "That the things weighing on you get lighter this year, one by one." },
  { k: "Faith",  t: "That Allah makes things easy for you — today, and every day after." },
  { k: "Joy",    t: "That your ordinary days feel good too, not just the special ones." },
];

function Wishes() {
  const [ref, shown] = useReveal();
  return (
    <section className={`hm-section hm-wishes ${shown ? "is-in" : ""}`} ref={ref}>
      <Butterfly className="hm-butterfly hm-butterfly-3" width="38" />
      <DollPair greet={shown} variant="corner" />
      {/* Mirror of the letter chapter: head aside again, but on the RIGHT and
          sticky, so the four wishes scroll past a heading that stays put. */}
      <div className="hm-aside-grid hm-aside-grid--flip">
        <header className="hm-aside-head hm-aside-head--sticky">
          <span className="hm-eyebrow">{chapterOf("wishes")}</span>
          <h2 className="hm-h2 hm-h2-aside">What I'd<br />wish for you</h2>
          <span className="hm-aside-rule" aria-hidden="true" />
          <p className="hm-amen">And du'as for the parts a friend can't fix — just Allah can.</p>
        </header>

        <ul className="hm-wish-list">
          {WISHES.map((w, i) => (
            <li key={w.k} className="hm-wish-card" style={{ "--delay": `${i * 40}ms` }}>
              <span className="hm-wish-gem" aria-hidden="true" />
              <h3 className="hm-micro">{w.k}</h3>
              <p>{w.t}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   7 — FOOTER + MUTE
   ═══════════════════════════════════════════════════════════════════════════ */

function Footer() {
  const [skyRef, skyOff] = useOffscreen();
  return (
    <footer ref={skyRef} className={`hm-footer hm-on-dark ${skyOff ? "hm-idle" : ""}`}>
      <DollPair greet variant="corner" className="hm-dolls-footer" />
      <CastleSky className="hm-footer-sky" lit />
      <Slipper className="hm-footer-mark" width="40" />
      {/* the closing section's OWN title — no chapter number, nothing reused */}
      <p className="hm-footer-close hm-micro">That's everything I wanted to say</p>
      <p className="hm-footer-line">
        Happy birthday, <span className="hm-shimmer hm-shimmer-slow">{NAME}</span>
      </p>
      <p className="hm-footer-albatross">
        <span className="hm-albatross-rule" aria-hidden="true" />
        for the {NICKNAME}
        <span className="hm-albatross-rule" aria-hidden="true" />
      </p>
      <p className="hm-footer-sub">
        Go wherever this year takes you. Just know there's always a way
        back here, and someone glad to see you when you do.
      </p>
      <p className="hm-footer-credit">Made for {NAME}, by Muneeb</p>
    </footer>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   FULL-PAGE SCREENSHOT
   ───────────────────────────────────────────────────────────────────────────
   Captures the whole scrollable document — hero through footer — as one PNG.

   Three things make this non-trivial on THIS page, and each has a step below:

   1. Sections are hidden until an IntersectionObserver reveals them. A naive
      capture from the top renders everything below the fold blank. So we do a
      priming pass down the page first; `useReveal` latches and disconnects on
      first intersection, so once primed the page stays revealed for good.
   2. Fixed, viewport-sized layers (the particle canvas, the cursor trail, the
      finale/balloon overlays) can't tile across a document-height capture —
      html2canvas would stamp them once at the top. They're hidden for the shot.
   3. Idle animations run forever. They're paused (not cleared) so elements
      freeze at a valid frame instead of snapping back to a pre-reveal state.
   ═══════════════════════════════════════════════════════════════════════════ */

const CAPTURE_FILENAME = "hamna-birthday-page.png";
/* Chrome tops out near 16384px per side and mobile Safari a good deal lower;
   staying under this and scaling down beats handing the browser a buffer it
   will quietly refuse to allocate. */
const CAPTURE_MAX_SIDE = 12000;

/** Walks the page top to bottom so every reveal observer fires, then returns. */
async function primeReveals() {
  const doc = document.documentElement;
  const step = Math.max(320, window.innerHeight * 0.9);
  const end = Math.max(doc.scrollHeight, document.body.scrollHeight) - window.innerHeight;
  for (let y = 0; y < end; y += step) {
    window.scrollTo(0, y);
    await new Promise((r) => setTimeout(r, 90));
  }
  window.scrollTo(0, end);
  await new Promise((r) => setTimeout(r, 160));
  window.scrollTo(0, 0);
  // the longest reveal on the page is ~780ms including its delay
  await new Promise((r) => setTimeout(r, 900));
}

function CaptureButton() {
  const [phase, setPhase] = useState("idle"); // idle | working | done | error
  const busy = useRef(false);
  const resetTimer = useRef(null);

  useEffect(() => () => clearTimeout(resetTimer.current), []);

  const capture = useCallback(async () => {
    if (busy.current) return;
    busy.current = true;
    clearTimeout(resetTimer.current);
    setPhase("working");

    const root = document.querySelector(".hm-root");
    const returnTo = window.scrollY;
    let objectUrl = null;

    try {
      await primeReveals();

      root && root.classList.add("is-capturing");
      // two frames so the paused-animation styles are actually applied
      await new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r)));

      const { default: html2canvas } = await import("html2canvas");

      const doc = document.documentElement;
      const w = Math.max(doc.scrollWidth, document.body.scrollWidth, doc.clientWidth);
      const h = Math.max(doc.scrollHeight, document.body.scrollHeight, doc.clientHeight);

      let scale = Math.min(window.devicePixelRatio || 1, 2);
      scale = Math.min(scale, CAPTURE_MAX_SIDE / h, CAPTURE_MAX_SIDE / w);
      if (!(scale > 0) || !isFinite(scale)) scale = 1;

      const canvas = await html2canvas(document.body, {
        backgroundColor: "#2B1526",
        scale,
        useCORS: true,
        logging: false,
        // width/height set the CAPTURED REGION to the whole document.
        // windowWidth/windowHeight are deliberately left at their defaults (the
        // real viewport): this page sizes the hero and gate in svh/vh, and
        // handing html2canvas a document-height "window" would resolve 100vh to
        // the full page height and stretch those sections into the sky.
        width: w,
        height: h,
        scrollX: 0,
        scrollY: 0,
        ignoreElements: (el) =>
          el.nodeType === 1 && typeof el.hasAttribute === "function" &&
          el.hasAttribute("data-no-capture"),
        onclone: (cloned) => {
          // belt and braces: the class must exist in the clone html2canvas paints
          const r = cloned.querySelector(".hm-root");
          if (r) r.classList.add("is-capturing");
        },
      });

      const blob = await new Promise((res) => canvas.toBlob(res, "image/png"));
      if (!blob) throw new Error("canvas.toBlob produced nothing");

      objectUrl = URL.createObjectURL(blob);
      const a = document.createElement("a");
      if ("download" in a) {
        a.href = objectUrl;
        a.download = CAPTURE_FILENAME;
        a.rel = "noopener";
        document.body.appendChild(a);
        a.click();
        a.remove();
      } else {
        // Older mobile Safari: no download attribute. Open it so the image can
        // be long-pressed and saved to the camera roll by hand.
        const win = window.open(objectUrl, "_blank");
        if (!win) throw new Error("blocked opening the image in a new tab");
      }
      setPhase("done");
    } catch (err) {
      // Never let a failed screenshot take the page down with it.
      console.warn("[hamna] full-page capture failed:", err);
      setPhase("error");
    } finally {
      root && root.classList.remove("is-capturing");
      window.scrollTo(0, returnTo);
      busy.current = false;
      // revoked late so the download / new tab has finished reading the blob
      if (objectUrl) setTimeout(() => URL.revokeObjectURL(objectUrl), 60000);
      resetTimer.current = setTimeout(() => setPhase("idle"), 2800);
    }
  }, []);

  const label =
    phase === "working" ? "saving…" :
    phase === "done" ? "saved" :
    phase === "error" ? "try again" : "save page";

  return (
    <button
      className={`hm-music-btn hm-cap-btn is-${phase}`}
      onClick={capture}
      disabled={phase === "working"}
      aria-label="Save the whole page as an image"
      aria-busy={phase === "working"}
    >
      <span className="hm-cap-ico" aria-hidden="true">
        {phase === "working" ? <SpinnerIcon />
          : phase === "done" ? <CheckIcon />
          : phase === "error" ? <RetryIcon />
          : <CameraIcon />}
      </span>
      <span className="hm-music-label hm-micro">{label}</span>
    </button>
  );
}

const CameraIcon = () => (
  <svg viewBox="0 0 24 24" width="17" fill="none" stroke="currentColor" strokeWidth="1.7"
    strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M3 8.5A1.5 1.5 0 0 1 4.5 7h2.2l1.2-2h8.2l1.2 2h2.2A1.5 1.5 0 0 1 21 8.5v9A1.5 1.5 0 0 1 19.5 19h-15A1.5 1.5 0 0 1 3 17.5z" />
    <circle cx="12" cy="13" r="3.6" />
  </svg>
);
const CheckIcon = () => (
  <svg viewBox="0 0 24 24" width="17" fill="none" stroke="currentColor" strokeWidth="2.2"
    strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M4.5 12.5l5 5 10-11" />
  </svg>
);
const RetryIcon = () => (
  <svg viewBox="0 0 24 24" width="17" fill="none" stroke="currentColor" strokeWidth="1.8"
    strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M20 12a8 8 0 1 1-2.6-5.9" /><path d="M20 4v5h-5" />
  </svg>
);
const SpinnerIcon = () => (
  <svg viewBox="0 0 24 24" width="17" fill="none" stroke="currentColor" strokeWidth="2.1"
    strokeLinecap="round" className="hm-cap-spin" aria-hidden="true">
    <circle cx="12" cy="12" r="8.5" opacity=".3" />
    <path d="M12 3.5a8.5 8.5 0 0 1 8.5 8.5" />
  </svg>
);

/**
 * Fixed top bar. Holds the music control so it's reachable the whole way down
 * the page. Hidden while the lightbox is open so it can't collide with the
 * lightbox's own close button.
 */
function TopBar({ hidden }) {
  const { muted, blocked, playing } = useAudioState();
  const live = playing && !muted && !blocked;

  return (
    <div className={`hm-topbar ${hidden ? "is-hidden" : ""}`} data-no-capture="">
      <span className="hm-topbar-mark" aria-hidden="true">
        <Slipper width="20" />
        <span className="hm-topbar-name">{NAME}</span>
      </span>

      <div className="hm-topbar-controls">
        <button
          className={`hm-music-btn ${blocked ? "is-blocked" : ""} ${muted ? "is-muted" : ""}`}
          onClick={() => AudioEngine.toggleMute()}
          aria-label={blocked ? "Tap to play the music" : muted ? "Play the music" : "Stop the music"}
          aria-pressed={muted}
        >
          <span className={`hm-eq ${live ? "is-live" : ""}`} aria-hidden="true">
            <i /><i /><i /><i />
          </span>
          <span className="hm-music-label hm-micro">
            {blocked ? "tap to play" : muted ? "music off" : "stop music"}
          </span>
          <span className="hm-music-ico" aria-hidden="true">
            {blocked ? <Wand width="16" /> : muted ? <MutedIcon /> : <SoundIcon />}
          </span>
        </button>

        <CaptureButton />
      </div>
    </div>
  );
}

const SoundIcon = () => (
  <svg viewBox="0 0 24 24" width="18" fill="none" stroke="currentColor" strokeWidth="1.7"
    strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M4 9v6h4l5 4V5L8 9z" fill="currentColor" stroke="none" />
    <path d="M16.5 8.5a5 5 0 0 1 0 7" />
    <path d="M19 6a8.5 8.5 0 0 1 0 12" opacity=".6" />
  </svg>
);
const MutedIcon = () => (
  <svg viewBox="0 0 24 24" width="18" fill="none" stroke="currentColor" strokeWidth="1.7"
    strokeLinecap="round" aria-hidden="true">
    <path d="M4 9v6h4l5 4V5L8 9z" fill="currentColor" stroke="none" />
    <path d="M17 10l4 4M21 10l-4 4" />
  </svg>
);

/* ═══════════════════════════════════════════════════════════════════════════
   APP
   ═══════════════════════════════════════════════════════════════════════════ */

const BUILD = "hamna-site 2026-08-15 · finale-v4 (DOM fireworks)";

export default function HamnaBirthday() {
  // Prints once on mount. If this line isn't in your console, the browser is
  // serving an older bundle — hard-reload (Ctrl+Shift+R) before debugging.
  useEffect(() => { console.info("%c" + BUILD, "color:#C79A5B"); }, []);

  const reduced = useReducedMotion();
  const lowPower = useLowPower();
  const particles = useRef(null);

  const [started, setStarted] = useState(false);
  const [celebrating, setCelebrating] = useState(false);
  const endCelebration = useCallback(() => setCelebrating(false), []);
  const startCelebration = useCallback(() => setCelebrating(true), []);
  const [lb, setLb] = useState({ open: false, index: 0, origin: null });

  // Sized above the finale's measured peak (≈1860 desktop, ≈560 low-power) so
  // the barrage runs at full density instead of silently dropping spawns. An
  // idle slot is one boolean check per frame; only LIVE particles cost draw
  // time, and outside the finale that's a handful of cursor dust.
  const budget = reduced ? 0 : lowPower ? 700 : 2200;
  // Fine pointer only. On touch the component returns null and never attaches
  // a listener, so there's no dead loop running on a phone.
  const finePointer = useMemo(
    () => typeof window !== "undefined" && window.matchMedia("(pointer: fine)").matches,
    []
  );
  const cursorOn = !reduced && !lowPower && finePointer && started;

  const openLightbox = useCallback((index, node) => {
    setLb({ open: true, index, origin: node });
    AudioEngine.chime(1174.7);
  }, []);

  return (
    <ParticleCtx.Provider value={particles}>
      <style>{CSS}</style>

      <div className={`hm-root ${started ? "is-started" : ""} ${reduced ? "is-calm" : ""} ${celebrating ? "is-celebrating" : ""}`}>
        <ParticleField enabled={budget > 0} budget={budget} />
        <FairyCursor enabled={cursorOn} />

        <EntryGate onOpen={() => setStarted(true)} reduced={reduced} />

        <main className="hm-page" aria-hidden={!started}>
          <StoryThread reduced={reduced} />
          <Hero started={started} reduced={reduced} />
          <Cake reduced={reduced} lowPower={lowPower} onWish={startCelebration} />
          <Gallery onOpen={openLightbox} reduced={reduced} lowPower={lowPower} />
          <Note />
          <Wishes />
          <Footer />
        </main>

        <Lightbox
          open={lb.open}
          index={lb.index}
          origin={lb.origin}
          reduced={reduced}
          onClose={() => setLb((s) => ({ ...s, open: false }))}
          onIndex={(i) => setLb((s) => ({ ...s, index: i }))}
        />

        <Finale
          active={celebrating}
          reduced={reduced}
          lowPower={lowPower}
          onDone={endCelebration}
        />

        {started && <TopBar hidden={lb.open} />}
      </div>
    </ParticleCtx.Provider>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   STYLES
   Kept as a scoped stylesheet rather than Tailwind arbitrary-value classes:
   this much bespoke work (keyframes, gradients, custom properties per element)
   is unreadable as `bg-[#9FBBEF]/40` soup, and it previews identically inside
   and outside a Tailwind build. Tailwind still handles the app shell around it.
   ═══════════════════════════════════════════════════════════════════════════ */

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=Jost:wght@300;400;500&family=Pinyon+Script&display=swap');

.hm-root{
  /* ── palette ─────────────────────────────────────────────────────────────
     Rose leads, as before, but the secondary accents are LILAC and CORAL
     instead of the Cinderella blue/gold of the previous build — related in
     temperature, unmistakably its own thing. Rose-gold does the trim work.  */
  --plum:#2B1526;          /* deepest — hero top, footer base            */
  --wine:#5E2A4A;          /* mid dark                                    */
  --mauve:#B06A88;         /* the hinge between dark and light            */
  --rose:#E28FAE;          /* primary accent                              */
  --blush:#FAD6E2;         /* dominant surface tint                       */
  --petal:#FDEDF2;         /* page background                             */
  --ivory:#FFFAF8;         /* cards, frames                               */
  --rosegold:#C98673;      /* trim, dividers, icons — decorative only     */
  --rosegold-ink:#8E4756;  /* the text-safe rose: 6.4:1 ivory, 4.9:1 blush*/
  --lilac:#C3A4E4;         /* secondary accent — sparkle, gems, stars     */
  --lilac-deep:#7E5AA8;
  --coral:#F4A088;         /* secondary accent — warmth, flame, glow      */
  --coral-deep:#C96A55;    /* decorative only — 3.3:1, never used for text */
  --coral-ink:#A0452F;     /* the text-safe coral: 6.4:1 ivory, 5.1:1 blush */
  --gold-lite:#F2D8C6;     /* light trim on dark (rose-gold, not yellow)  */
  --gold:#C98673;

  /* ── text tokens — the contrast safeguard ────────────────────────────────
     Every text rule resolves to one of these four. Sections declare which
     regime they're in; no rule invents its own colour. That's what stops a
     heading quietly matching its background.                               */
  --on-light:#48213A;      /* 10.1:1 on --petal, 11.8:1 on --ivory        */
  --on-light-soft:#7A4460; /* 5.5:1 on --petal — the minimum used anywhere */
  --on-dark:#FFF2F7;
  --on-dark-soft:#EFC8DA;
  --shadow-on-dark:0 1px 14px rgba(43,21,38,.75), 0 0 2px rgba(43,21,38,.5);
  --scrim-light:radial-gradient(58% 62% at 50% 50%,
    rgba(255,250,248,.94) 0%, rgba(255,250,248,.72) 55%, rgba(255,250,248,0) 100%);

  --ink:var(--on-light);

  --font-display:'Cormorant Garamond','Didot','Bodoni MT',Georgia,serif;
  --font-script:'Pinyon Script','Snell Roundhand','Apple Chancery',cursive;
  --font-ui:'Jost','Futura','Avenir Next',system-ui,sans-serif;

  /* Soft means smooth, not slow. These are the only easings used. */
  --ease-soft:cubic-bezier(.22,1,.28,1);
  --ease-spring:cubic-bezier(.34,1.42,.44,1);

  position:relative;
  min-height:100vh;
  background:var(--plum);
  color:var(--on-light);
  font-family:var(--font-ui);
  font-weight:300;
  overflow-x:hidden;
  -webkit-font-smoothing:antialiased;
}
.hm-root *,.hm-root *::before,.hm-root *::after{box-sizing:border-box;}
.hm-root :focus-visible{outline:2px solid var(--gold);outline-offset:4px;border-radius:4px;}

/* ── shared type ─────────────────────────────────────────────────────── */
.hm-eyebrow{
  font-family:var(--font-ui);font-size:.72rem;font-weight:500;
  letter-spacing:.28em;text-transform:uppercase;color:var(--rosegold-ink);
  display:block;margin-bottom:1rem;
}
.hm-h2{
  font-family:var(--font-display);font-weight:300;font-style:italic;
  font-size:clamp(2.1rem,6vw,3.6rem);line-height:1.05;color:var(--wine);
  margin:0 0 .6rem;
}
.hm-sub{
  font-size:clamp(.9rem,2.4vw,1rem);color:var(--on-light-soft);max-width:34ch;
  margin:0 auto;line-height:1.7;
}
.hm-section{position:relative;padding:clamp(4.5rem,11vw,8rem) 1.25rem 0;}
.hm-section-head{
  position:relative;text-align:center;max-width:44rem;
  margin:0 auto clamp(2.2rem,6vw,3.8rem);
}
/* Soft scrim behind every section heading. This is the general safeguard:
   whatever the background does underneath, headings sit on a known surface. */
.hm-section-head::before{
  content:"";position:absolute;inset:-18% -8%;z-index:-1;
  background:var(--scrim-light);pointer-events:none;
}

/* ── particles + cursor ──────────────────────────────────────────────── */
.hm-particles{
  position:fixed;inset:0;width:100%;height:100%;
  pointer-events:none;z-index:70;
}
.hm-cursor-dot{
  position:fixed;top:0;left:0;width:12px;height:12px;border-radius:50%;
  background:radial-gradient(circle,#FFF8E2 0%,#F6E2AE 45%,rgba(217,169,79,0) 72%);
  box-shadow:0 0 18px 6px rgba(235,211,164,.4),0 0 26px 10px rgba(217,139,166,.28);
  pointer-events:none;z-index:46;will-change:transform;
}
.hm-cursor-photo{
  position:fixed;top:0;left:0;width:104px;height:150px;pointer-events:none;z-index:45;
  opacity:0;transform-origin:center;
  transition:opacity .3s var(--ease-soft);
  will-change:transform,opacity;
}
/* identical treatment to .hm-frame-inner — same paper, same hairline, same
   shadow — so the trail belongs to the gallery's visual language */
.hm-cursor-photo img{
  position:absolute;inset:0;width:100%;height:100%;
  object-fit:cover;object-position:center 22%;
  padding:7px 7px 26px;
  background:linear-gradient(160deg,#FFFDF9,#F3EDE3);
  border-radius:3px;
  box-shadow:0 1px 0 rgba(201,138,114,.55),0 18px 34px -14px rgba(46,24,38,.5);
  opacity:0;transform:rotate(-3.5deg) scale(.94);
  transition:opacity .3s var(--ease-soft),transform .3s var(--ease-soft);
}
/* alternate the resting tilt so consecutive previews don't look stamped */
.hm-cursor-photo img:nth-child(even){transform:rotate(3.5deg) scale(.94);}
.hm-cursor-photo img.is-active{opacity:1;transform:rotate(-2.5deg) scale(1);}
.hm-cursor-photo img:nth-child(even).is-active{transform:rotate(2.5deg) scale(1);}
@media (pointer:coarse){.hm-cursor-dot,.hm-cursor-photo{display:none;}}

/* ── castle sky ──────────────────────────────────────────────────────── */
.hm-castle{position:absolute;inset:auto 0 0 0;width:100%;height:58%;pointer-events:none;}
.hm-castle-body{fill:#3A1E2F;opacity:.92;}
.hm-star{fill:#FFF6DF;opacity:.15;animation:twinkle 4.2s ease-in-out infinite;}
@keyframes twinkle{0%,100%{opacity:.12;}50%{opacity:.85;}}
.hm-castle-windows rect{fill:#F6E2AE;opacity:0;transition:opacity .5s;}
.hm-castle.is-lit .hm-castle-windows rect{opacity:.85;animation:windowGlow 3.4s ease-in-out infinite;}
@keyframes windowGlow{0%,100%{opacity:.55;}50%{opacity:.95;}}

/* ── butterflies ─────────────────────────────────────────────────────── */
.hm-butterfly{position:absolute;color:var(--lilac);pointer-events:none;opacity:.55;}
.hm-butterfly-1{top:22%;left:9%;animation:drift1 22s ease-in-out infinite;}
.hm-butterfly-2{top:62%;right:12%;color:var(--blush);animation:drift2 27s ease-in-out infinite;}
.hm-butterfly-3{top:8%;right:8%;color:var(--rose);animation:drift1 25s ease-in-out infinite;}
.hm-wing{transform-origin:30px 24px;animation:flap 1.1s ease-in-out infinite;}
.hm-wing-r{animation-delay:-.05s;}
@keyframes flap{0%,100%{transform:rotateY(0deg);}50%{transform:rotateY(58deg);}}
@keyframes drift1{
  0%{transform:translate3d(0,0,0) rotate(-4deg);}
  33%{transform:translate3d(70px,-52px,0) rotate(6deg);}
  66%{transform:translate3d(-40px,-96px,0) rotate(-8deg);}
  100%{transform:translate3d(0,0,0) rotate(-4deg);}
}
@keyframes drift2{
  0%{transform:translate3d(0,0,0) rotate(5deg);}
  50%{transform:translate3d(-86px,-70px,0) rotate(-7deg);}
  100%{transform:translate3d(0,0,0) rotate(5deg);}
}

/* ── divider ─────────────────────────────────────────────────────────── */
.hm-divider{
  display:flex;align-items:center;justify-content:center;gap:.9rem;
  max-width:34rem;margin:clamp(3.5rem,8vw,5.5rem) auto 0;color:var(--rosegold);
  padding-bottom:clamp(1.5rem,4vw,3rem);
}
.hm-divider-line{flex:1;height:1px;background:linear-gradient(90deg,transparent,var(--gold),transparent);opacity:.55;}
.hm-divider-bow svg{width:52px;display:block;}
.hm-divider-icon{opacity:.8;display:flex;}

/* ═══ ENTRY GATE ════════════════════════════════════════════════════════ */
.hm-gate{
  position:fixed;inset:0;z-index:90;display:grid;place-items:center;
  background:radial-gradient(120% 90% at 50% 10%,#7C3D5B 0%,#4A2338 44%,#20101B 100%);
  cursor:pointer;padding:2rem 1.25rem;
  padding-bottom:calc(2rem + env(safe-area-inset-bottom));
  transition:opacity .62s var(--ease-soft);
}
.hm-gate.is-opening{opacity:0;pointer-events:none;}
.hm-gate-sky{height:52%;opacity:.85;}
.hm-gate-flash{
  position:absolute;inset:0;background:radial-gradient(circle at 50% 45%,#FFF6DF,transparent 62%);
  opacity:0;pointer-events:none;
}
.hm-gate.is-opening .hm-gate-flash{animation:flash 1.1s var(--ease-soft) forwards;}
@keyframes flash{0%{opacity:0;}18%{opacity:.75;}100%{opacity:0;}}

.hm-invite{
  position:relative;text-align:center;max-width:26rem;width:100%;
  padding:clamp(2.5rem,7vw,3.5rem) clamp(1.5rem,5vw,2.75rem) clamp(2rem,6vw,3rem);
  background:linear-gradient(160deg,rgba(251,246,239,.97),rgba(240,232,244,.94));
  border-radius:6px;
  box-shadow:0 40px 90px -30px rgba(0,0,0,.7),0 0 0 1px rgba(217,169,79,.35),
             inset 0 0 0 6px rgba(255,255,255,.5),inset 0 0 0 7px rgba(217,169,79,.28);
  animation:inviteIn .8s var(--ease-soft) both;
}
.hm-gate.is-opening .hm-invite{animation:inviteOut .6s var(--ease-soft) forwards;}
@keyframes inviteIn{from{opacity:0;transform:translate3d(0,26px,0) scale(.96);}to{opacity:1;transform:none;}}
@keyframes inviteOut{
  40%{opacity:1;transform:scale(1.05);}
  100%{opacity:0;transform:scale(1.28) translate3d(0,-14px,0);}
}
/* lace filigree edge */
.hm-invite-lace{
  position:absolute;inset:10px;border-radius:3px;pointer-events:none;
  border:1px solid rgba(217,169,79,.35);
  -webkit-mask-image:repeating-linear-gradient(90deg,#000 0 8px,transparent 8px 14px);
          mask-image:repeating-linear-gradient(90deg,#000 0 8px,transparent 8px 14px);
}
.hm-invite-crown{color:var(--gold);margin:0 auto .4rem;display:block;}
.hm-invite-name{
  font-family:var(--font-script);font-weight:400;
  font-size:clamp(3.2rem,13vw,4.6rem);line-height:1;margin:0;
  color:var(--wine);
}
.hm-invite-line{
  font-size:.86rem;color:var(--on-light-soft);margin:.9rem 0 1.6rem;letter-spacing:.03em;
}
.hm-seal{position:relative;width:120px;margin:0 auto 1.5rem;color:var(--rose);}
.hm-seal svg{width:100%;display:block;}
.hm-seal-mark{
  position:absolute;top:50%;left:50%;transform:translate(-50%,-42%);
  color:var(--ivory);opacity:.95;
}
.hm-gate-cta{animation:pulseGate 2.6s var(--ease-soft) infinite;}
@keyframes pulseGate{
  0%,100%{box-shadow:0 0 0 0 rgba(217,169,79,.35);transform:scale(1);}
  50%{box-shadow:0 0 0 14px rgba(217,169,79,0);transform:scale(1.03);}
}
.hm-gate-sub{display:block;margin-top:.9rem;font-size:.72rem;font-weight:400;letter-spacing:.12em;color:var(--on-light-soft);}

/* ═══ PAGE / HERO ═══════════════════════════════════════════════════════ */
.hm-page{
  position:relative;z-index:1;
  color:var(--on-light);
  background:
    radial-gradient(70% 40% at 15% 22%,rgba(214,139,166,.16),transparent 70%),
    radial-gradient(60% 36% at 88% 58%,rgba(201,138,114,.14),transparent 72%),
    linear-gradient(180deg,var(--petal) 0%,var(--ivory) 46%,var(--petal) 100%);
}
/* Light-regime text: dark ink on blush, plus a whisper of white lift so it
   stays crisp over the radial washes above. */
.hm-page .hm-h2,.hm-page .hm-sub,.hm-page .hm-eyebrow{
  text-shadow:0 1px 0 rgba(255,255,255,.55);
}
/* Dark-regime sections opt in explicitly and inherit the shadow token. */
.hm-on-dark,.hm-on-dark .hm-h2,.hm-on-dark .hm-sub{
  color:var(--on-dark);text-shadow:var(--shadow-on-dark);
}
.hm-on-dark .hm-eyebrow{color:var(--gold-lite);text-shadow:var(--shadow-on-dark);}

.hm-hero{
  position:relative;min-height:100svh;display:grid;place-items:center;
  text-align:center;padding:6rem 1.25rem 4rem;overflow:hidden;
  /* fades to the page surface at its own bottom edge, below all hero text */
  background:linear-gradient(180deg,
    var(--plum) 0%,var(--wine) 52%,var(--mauve) 78%,
    var(--blush) 93%,var(--petal) 100%);
}
.hm-hero-sky{height:70%;opacity:.75;}
.hm-hero-inner{position:relative;z-index:2;}
.hm-hero-crown{color:var(--gold-lite);opacity:0;margin:0 auto 1.1rem;display:block;}
.hm-hero-eyebrow{color:var(--gold-lite);opacity:0;}
.hm-hero-name{
  position:relative;margin:0;
  font-family:var(--font-script);font-weight:400;
  font-size:clamp(4rem,19vw,10rem);line-height:.95;color:var(--ivory);
  opacity:0;
}
.hm-swash{
  display:block;width:min(72vw,20rem);margin:-.4rem auto 0;color:var(--gold-lite);
  opacity:0;
}
.hm-hero-tag{
  font-family:var(--font-display);font-style:italic;font-weight:300;
  font-size:clamp(1.15rem,4vw,1.7rem);color:var(--on-dark);text-shadow:var(--shadow-on-dark);margin:1.6rem 0 .5rem;opacity:0;
}
.hm-hero-date{
  font-size:.74rem;font-weight:400;letter-spacing:.3em;text-transform:uppercase;
  color:var(--on-dark-soft);text-shadow:var(--shadow-on-dark);
  opacity:0;
}
.hm-hero.is-in .hm-hero-crown{animation:riseIn .55s var(--ease-soft) .08s both;}
.hm-hero.is-in .hm-hero-eyebrow{animation:riseIn .55s var(--ease-soft) .16s both;}
.hm-hero.is-in .hm-hero-name{animation:riseIn .72s var(--ease-spring) .24s both;}
.hm-hero.is-in .hm-swash{animation:drawIn .6s var(--ease-soft) .62s both;}
.hm-hero.is-in .hm-hero-tag{animation:riseIn .55s var(--ease-soft) .54s both;}
.hm-hero.is-in .hm-hero-date{animation:riseIn .55s var(--ease-soft) .66s both;}
@keyframes riseIn{from{opacity:0;transform:translate3d(0,22px,0);}to{opacity:1;transform:none;}}
@keyframes drawIn{from{opacity:0;transform:scaleX(.7);}to{opacity:.85;transform:none;}}

/* shimmer sweep across the letters — runs twice, then settles */
.hm-shimmer{
  background:linear-gradient(100deg,var(--ivory) 30%,#FFF6DF 44%,var(--gold-lite) 50%,
    #FFF6DF 56%,var(--ivory) 70%);
  background-size:280% 100%;
  -webkit-background-clip:text;background-clip:text;
  color:transparent;
  animation:sweep 1.9s var(--ease-soft) .6s 2 both;
}
.hm-shimmer-slow{animation-duration:4.5s;animation-iteration-count:infinite;animation-delay:0s;}
@keyframes sweep{from{background-position:180% 0;}to{background-position:-80% 0;}}

.hm-scroll-hint{
  display:block;margin-top:clamp(2.5rem,8vw,4rem);
  font-size:.68rem;letter-spacing:.26em;font-weight:500;text-transform:uppercase;
  color:var(--wine);opacity:.9;
}
.hm-scroll-line{
  display:block;width:1px;height:44px;margin:0 auto .7rem;
  background:linear-gradient(180deg,transparent,var(--wine));
  animation:scrollPulse 2.4s var(--ease-soft) infinite;
}
@keyframes scrollPulse{0%,100%{transform:scaleY(.5);opacity:.4;}50%{transform:scaleY(1);opacity:1;}}

/* ── offscreen pause ─────────────────────────────────────────────────────
   Anything under .hm-idle stops animating. Applied to the hero sky, the
   footer sky and the cake when they scroll out of view. This is what stops a
   fast scroll from repainting three star fields and a filtered cake SVG that
   aren't on screen. */
.hm-idle,
.hm-idle *{animation-play-state:paused!important;}
.hm-root.is-calm .hm-doll-slot,
.hm-root.is-calm .hm-doll-arm{animation:none!important;}
.hm-root.is-calm .hm-cake-3d{transform:none!important;transition:none;}

/* ═══ BUTTONS ═══════════════════════════════════════════════════════════
   The previous builds ended up with buttons that read as flat cards: a pale
   fill, a hairline border, no depth. Every control here is built from four
   layers instead — a saturated gradient body, an inset top highlight, a
   coloured drop shadow in the button's own hue, and an outer glow ring that
   blooms on hover. Press states physically sink.                          */
.hm-btn{
  position:relative;isolation:isolate;
  display:inline-flex;align-items:center;justify-content:center;gap:.6rem;
  min-height:52px;padding:0 2.2rem;
  font-family:var(--font-ui);font-size:.74rem;font-weight:500;
  letter-spacing:.24em;text-transform:uppercase;
  color:#FFF6FA;
  border:0;border-radius:999px;cursor:pointer;
  background:linear-gradient(168deg,#F0A6C0 0%,#E28FAE 38%,#C46E92 72%,#A8567C 100%);
  box-shadow:
    inset 0 1px 0 rgba(255,255,255,.55),          /* top highlight   */
    inset 0 -2px 6px rgba(120,44,78,.35),         /* bottom shading  */
    0 10px 24px -8px rgba(168,86,124,.75),        /* coloured shadow */
    0 0 0 0 rgba(226,143,174,0);                  /* glow ring, off  */
  text-shadow:0 1px 6px rgba(96,34,62,.5);
  transition:transform .18s var(--ease-spring),box-shadow .22s var(--ease-soft),
             filter .22s var(--ease-soft);
}
/* the sheen that sits on top of the gradient */
.hm-btn::before{
  content:"";position:absolute;inset:1px;border-radius:inherit;z-index:-1;
  background:linear-gradient(180deg,rgba(255,255,255,.38) 0%,rgba(255,255,255,.06) 46%,
    rgba(255,255,255,0) 62%);
  pointer-events:none;
}
.hm-btn:hover{
  transform:translateY(-2px);
  filter:saturate(1.08) brightness(1.04);
  box-shadow:
    inset 0 1px 0 rgba(255,255,255,.6),
    inset 0 -2px 6px rgba(120,44,78,.3),
    0 16px 34px -10px rgba(168,86,124,.85),
    0 0 0 8px rgba(226,143,174,.22);
}
.hm-btn:active{
  transform:translateY(1px) scale(.985);
  box-shadow:
    inset 0 2px 8px rgba(120,44,78,.5),
    0 4px 12px -6px rgba(168,86,124,.7),
    0 0 0 3px rgba(226,143,174,.2);
}
.hm-btn:disabled{cursor:default;}
/* lilac variant for the entry gate, coral for the wish */
.hm-btn-lilac{
  background:linear-gradient(168deg,#D9BFF0 0%,#C3A4E4 38%,#9B78C6 72%,#7E5AA8 100%);
  box-shadow:inset 0 1px 0 rgba(255,255,255,.55),inset 0 -2px 6px rgba(70,44,110,.35),
    0 10px 24px -8px rgba(126,90,168,.75);
}
.hm-btn-lilac:hover{box-shadow:inset 0 1px 0 rgba(255,255,255,.6),
  inset 0 -2px 6px rgba(70,44,110,.3),0 16px 34px -10px rgba(126,90,168,.85),
  0 0 0 8px rgba(195,164,228,.24);}
.hm-btn-coral{
  background:linear-gradient(168deg,#FBC4AE 0%,#F4A088 38%,#DA7A60 72%,#B85B45 100%);
  box-shadow:inset 0 1px 0 rgba(255,255,255,.55),inset 0 -2px 6px rgba(130,54,38,.35),
    0 10px 24px -8px rgba(184,91,69,.75);
}
.hm-btn-coral:hover{box-shadow:inset 0 1px 0 rgba(255,255,255,.6),
  inset 0 -2px 6px rgba(130,54,38,.3),0 16px 34px -10px rgba(184,91,69,.85),
  0 0 0 8px rgba(244,160,136,.26);}
.hm-btn-ico{display:flex;color:rgba(255,255,255,.92);}

/* ═══ COUNTDOWN ═════════════════════════════════════════════════════════ */
.hm-countdown{
  position:relative;display:inline-flex;flex-direction:column;align-items:center;
  gap:.55rem;margin-top:clamp(1.6rem,4vw,2.4rem);
  padding:clamp(1rem,3vw,1.35rem) clamp(1.4rem,5vw,2.4rem);
  border-radius:20px;
  background:linear-gradient(160deg,rgba(255,250,248,.14),rgba(255,250,248,.05));
  box-shadow:
    inset 0 1px 0 rgba(255,255,255,.28),
    0 18px 44px -22px rgba(43,21,38,.9),
    0 0 40px -18px rgba(226,143,174,.55);
  opacity:0;
}
.hm-hero.is-in .hm-countdown{animation:riseIn .6s var(--ease-soft) .78s both;}
.hm-countdown-eyebrow{color:var(--gold-lite);opacity:.9;text-transform:uppercase;
  text-shadow:var(--shadow-on-dark);}
.hm-countdown-row{display:flex;align-items:flex-start;gap:clamp(.3rem,1.6vw,.7rem);}
.hm-tick{display:flex;flex-direction:column;align-items:center;gap:.3rem;min-width:2.6rem;}
.hm-tick-num{
  font-family:var(--font-display);font-weight:300;
  font-size:clamp(1.9rem,7vw,3rem);line-height:1;
  color:#FFF6FA;font-variant-numeric:tabular-nums;
  text-shadow:0 2px 18px rgba(226,143,174,.6),var(--shadow-on-dark);
}
.hm-tick-label{color:var(--on-dark-soft);opacity:.85;text-transform:uppercase;}
.hm-tick-sep{
  font-family:var(--font-display);font-size:clamp(1.4rem,5vw,2.2rem);
  line-height:1.1;color:var(--rose);opacity:.7;
}
.hm-countdown-tag{
  font-family:var(--font-script);font-size:1.35rem;line-height:1;
  color:var(--rose);text-shadow:var(--shadow-on-dark);
}

/* ═══ ALBATROSS LINE ════════════════════════════════════════════════════ */
.hm-footer-albatross{
  position:relative;display:flex;align-items:center;justify-content:center;gap:1rem;
  margin:1.1rem 0 .4rem;
  font-family:var(--font-script);font-size:clamp(1.6rem,5vw,2.4rem);
  color:var(--rose);text-shadow:var(--shadow-on-dark);
}
.hm-albatross-rule{
  display:block;width:clamp(2rem,8vw,4.5rem);height:1px;
  background:linear-gradient(90deg,transparent,var(--rosegold),transparent);
}
.hm-albatross-tag{
  margin:.9rem 0 0;font-family:var(--font-display);font-style:italic;
  font-size:.95rem;color:var(--rosegold-ink);opacity:.85;
}
.hm-nick{font-family:var(--font-script);font-size:1.35em;color:var(--rosegold-ink);}

/* ═══ DOLLS ═════════════════════════════════════════════════════════════
   Decorative only: pointer-events none, and they sit behind content (z 0)
   so they can never cover a photo, a heading or a control. */
.hm-dolls{
  position:absolute;inset:0;pointer-events:none;z-index:0;
  overflow:visible;
}
.hm-doll-slot{
  position:absolute;bottom:6%;
  /* Sized up from the original clamp(58px,9vw,124px) — the outline strokes
     added to the redesign need room to resolve; too small and even a
     detailed path reads as a soft blob. */
  width:clamp(74px,10vw,148px);
  opacity:.92;
  will-change:transform;
}
.hm-doll-slot-l{left:1.5%;}
.hm-doll-slot-r{right:1.5%;}
.hm-doll{width:100%;height:auto;display:block;
  filter:drop-shadow(0 12px 22px rgba(94,42,74,.18));}

/* idle: sway + breathe on deliberately mismatched cycles so the pair never
   moves in lockstep */
.hm-doll-slot-l{animation:dollSwayL 7.2s ease-in-out infinite;}
.hm-doll-slot-r{animation:dollSwayR 8.9s ease-in-out infinite;}
@keyframes dollSwayL{
  0%,100%{transform:translate3d(0,0,0) rotate(-1.6deg) scale(1);}
  50%{transform:translate3d(0,-9px,0) rotate(1.8deg) scale(1.015);}
}
@keyframes dollSwayR{
  0%,100%{transform:translate3d(0,-4px,0) rotate(1.4deg) scale(1.01);}
  50%{transform:translate3d(0,4px,0) rotate(-1.9deg) scale(1);}
}
/* the lifted arm has its own small drift, so it reads as a wave not a rock */
.hm-doll-arm{transform-box:view-box;animation:dollArm 4.4s ease-in-out infinite;}
/* The pivot is the shoulder joint in viewBox units — NOT the fill-box corner,
   which landed on the hand end and swung the arm off the body. The sleeve cap
   is painted after the arm, so the joint stays covered through the whole swing. */
.hm-doll-a .hm-doll-arm{transform-origin:80px 132px;}
.hm-doll-b .hm-doll-arm{transform-origin:76.5px 130px;}
@keyframes dollArm{0%,100%{transform:rotate(-1.6deg);}50%{transform:rotate(3.4deg);}}

/* one-shot greeting when the section arrives */
.hm-dolls.is-greeting .hm-doll-slot-l{animation:dollGreet .9s var(--ease-spring),
  dollSwayL 7.2s ease-in-out .9s infinite;}
.hm-dolls.is-greeting .hm-doll-slot-r{animation:dollGreet .9s var(--ease-spring) .12s,
  dollSwayR 8.9s ease-in-out 1.02s infinite;}
@keyframes dollGreet{
  0%{transform:translate3d(0,26px,0) scale(.9);opacity:0;}
  45%{transform:translate3d(0,-6px,0) scale(1.04);opacity:1;}
  70%{transform:translate3d(0,4px,0) scale(.99);}   /* the curtsy dip */
  100%{transform:none;opacity:.9;}
}

/* placement variants per section */
.hm-dolls-flank .hm-doll-slot{bottom:auto;top:14%;}
.hm-dolls-corner .hm-doll-slot-l{bottom:2%;left:0.5%;}
.hm-dolls-corner .hm-doll-slot-r{bottom:2%;right:0.5%;}
.hm-dolls-frame .hm-doll-slot{top:22%;width:clamp(66px,8.5vw,126px);}
.hm-dolls-gate .hm-doll-slot{bottom:4%;opacity:.75;}
.hm-dolls-footer .hm-doll-slot{bottom:12%;opacity:.8;}
.hm-dolls-hero .hm-doll-slot{top:16%;}

/* MOBILE: they scale down and tuck to the very edges, never cropped, never
   hidden. Below 520px they sit lower so they frame rather than crowd. */
@media (max-width:900px){
  .hm-doll-slot{width:clamp(60px,13vw,96px);opacity:.85;}
  .hm-dolls-flank .hm-doll-slot{top:8%;}
}
@media (max-width:520px){
  .hm-doll-slot{width:clamp(54px,16vw,80px);opacity:.78;}
  .hm-doll-slot-l{left:-1%;}
  .hm-doll-slot-r{right:-1%;}
  .hm-dolls-flank .hm-doll-slot{top:4%;}
}

/* ═══ STORY THREAD ══════/* ═══ STORY THREAD ══════════════════════════════════════════════════════ */
.hm-thread{
  position:absolute;top:0;bottom:0;left:50%;
  width:min(46rem,92vw);transform:translateX(-50%);
  pointer-events:none;z-index:0;
  --lit:0;
}
.hm-thread-svg{
  position:absolute;inset:0;width:100%;height:100%;
  overflow:visible;opacity:.55;
  /* thin out where the cake sits so the ribbon reads as passing behind it
     rather than drawn across it */
  -webkit-mask-image:linear-gradient(180deg,
    #000 0%,#000 14%,rgba(0,0,0,.15) 22%,rgba(0,0,0,.15) 32%,#000 40%,#000 100%);
          mask-image:linear-gradient(180deg,
    #000 0%,#000 14%,rgba(0,0,0,.15) 22%,rgba(0,0,0,.15) 32%,#000 40%,#000 100%);
}
.hm-thread-ghost{
  fill:none;stroke:var(--rose);stroke-opacity:.14;
  stroke-width:1.1;vector-effect:non-scaling-stroke;
}
.hm-thread-line{
  fill:none;stroke:url(#threadG);
  stroke-width:1.6;stroke-linecap:round;
  vector-effect:non-scaling-stroke;   /* stays hairline despite the 1:11 squash */
  /* no filter: this path spans the whole document height, so a
     drop-shadow re-rasterised the full strip on every scroll frame */
}
/* pearl at each chapter seam */
.hm-thread-node{
  position:absolute;left:50%;width:9px;height:9px;margin:-4.5px 0 0 -4.5px;
  border-radius:50%;
  background:radial-gradient(circle at 34% 30%,#FFFFFF,#F6E4BC 42%,var(--rosegold) 100%);
  opacity:0;transform:scale(.3);
  transition:opacity .45s var(--ease-soft),transform .45s var(--ease-spring),box-shadow .45s;
}
.hm-thread-node.is-lit{
  opacity:.9;transform:scale(1);
  box-shadow:0 0 0 4px rgba(246,213,224,.5),0 0 18px 4px rgba(235,211,164,.45);
}
/* the thread sits behind everything the reader touches */
.hm-page > *:not(.hm-thread){position:relative;z-index:1;}
@media (max-width:760px){
  .hm-thread{width:100vw;}
  .hm-thread-svg{opacity:.4;}
}

/* ═══ GALLERY ═══════════════════════════════════════════════════════════ */

.hm-collage{
  position:relative;width:min(100%,64rem);margin:0 auto;
  /* Height derived from the row count, used only as the FIRST-PAINT estimate
     before useMeasuredHeight corrects it against the real rendered DOM (see
     the hook's comment for why a calc() alone caused this bug twice). This
     value now includes the polaroid's own chrome — 8px top/side padding, the
     30px caption reserve, and the caption row itself, roughly 2.5rem per
     frame — which the original formula omitted entirely, plus a further
     3rem safety pad so the pre-JS box already errs generously large rather
     than exactly-fit. */
  --rowh:clamp(10.5rem,20vw,15rem);
  --framew:min(30%, 15rem);
  --frame-chrome:2.5rem;   /* padding + caption row, not part of the photo itself */
  --frameh:calc(var(--framew) * 4 / 3 + var(--frame-chrome));
  height:calc((var(--rows,3) - 1) * var(--rowh) + var(--frameh) + 6.5rem);
  min-height:calc((var(--rows,3) - 1) * var(--rowh) + var(--frameh) + 6.5rem);
  perspective:1100px;
}
.hm-frame{
  position:absolute;width:30%;max-width:15rem;margin:0;cursor:pointer;
  /* exact row placement — no percentage-of-a-guessed-height maths */
  top:calc(var(--row,0) * var(--rowh) + var(--side,0) * 2.6rem);
  transform-style:preserve-3d;
  --tx:0deg;--ty:0deg;--sx:50%;
  transform:translate3d(0,24px,0) rotate(var(--rot)) scale(calc(var(--scale) * .95));
  opacity:0;
  transition:transform .34s var(--ease-spring),opacity .24s var(--ease-soft);
}
.hm-frame.is-off .hm-photo{animation-play-state:paused;}
.hm-collage.is-in .hm-frame{
  opacity:1;
  transform:translate3d(0,0,0) rotate(var(--rot)) scale(var(--scale));
  transition-delay:var(--delay);
}
.hm-frame-inner{
  background:linear-gradient(160deg,#FFFDF9,#F3EDE3);
  padding:8px 8px 30px;border-radius:3px;
  box-shadow:0 1px 0 rgba(217,169,79,.5),0 22px 40px -22px rgba(20,30,70,.55);
  transform:rotateX(var(--tx)) rotateY(var(--ty));
  transition-property:box-shadow,transform;
  transition-duration:.3s,.12s;
  transition-timing-function:var(--ease-soft),linear;
}
.hm-frame-window{position:relative;overflow:hidden;border-radius:2px;background:var(--blush);}
.hm-photo{
  display:block;width:100%;height:auto;
  animation-name:kenburns;animation-timing-function:ease-in-out;
  animation-iteration-count:infinite;animation-direction:alternate;
}
/* will-change only while it matters — five permanently promoted 1400px
   textures is memory the compositor doesn't need to hold during a scroll */
.hm-frame.is-hot .hm-photo,
.hm-frame:hover .hm-photo{will-change:transform;}
@keyframes kenburns{
  from{transform:scale(1.04) translate3d(-1%,1%,0);}
  to{transform:scale(1.13) translate3d(1.5%,-1.5%,0);}
}
/* silk curtain that draws back on reveal */
.hm-curtain{
  position:absolute;inset:0;
  background:linear-gradient(180deg,var(--ivory) 0%,var(--blush) 55%,var(--rose) 100%);
  transform:translate3d(0,0,0);
  transition:transform .48s var(--ease-soft);
}
.hm-collage.is-in .hm-curtain{transform:translate3d(0,-101%,0);transition-delay:calc(var(--delay) + 30ms);}
/* shimmer sweep on hover */
.hm-sheen{
  position:absolute;inset:0;pointer-events:none;opacity:0;
  background:linear-gradient(105deg,transparent 38%,rgba(255,255,255,.65) 50%,transparent 62%);
  transform:translate3d(-120%,0,0);
  transition:opacity .3s;
}
.hm-frame.is-hot .hm-sheen{opacity:1;animation:sheen .7s var(--ease-soft);}
@keyframes sheen{from{transform:translate3d(-120%,0,0);}to{transform:translate3d(120%,0,0);}}

/* ── micro-text floor ─────────────────────────────────────────────────────
   Every caption, label and counter on the site uses this. Below 11px with
   loose tracking, thin type stops being readable no matter what the contrast
   ratio says, so the floor sets size, weight and tracking together — not just
   colour. Anything smaller than this doesn't ship. */
.hm-micro{
  font-family:var(--font-ui);
  font-size:.7rem;          /* 11.2px — the floor */
  font-weight:500;          /* not 300; hairlines vanish at this size */
  letter-spacing:.18em;     /* was .3em, which shredded 9px glyphs */
  line-height:1.2;
}
.hm-frame-cap{
  display:flex;align-items:center;justify-content:center;gap:.45rem;
  padding-top:9px;color:var(--rosegold-ink);
}
.hm-frame-cap span{font-variant-numeric:tabular-nums;}
.hm-frame.is-hot{z-index:30;transition-duration:.22s;}
.hm-collage.is-in .hm-frame.is-hot{
  transform:translate3d(0,-14px,0) rotate(0deg) scale(calc(var(--scale) * 1.08));
}
/* frames lift toward the viewer on hover, not just up the page */
.hm-frame.is-hot .hm-frame-inner{transform:rotateX(var(--tx)) rotateY(var(--ty)) translateZ(46px);}
.hm-frame.is-hot .hm-frame-inner{
  box-shadow:0 2px 0 var(--gold),0 44px 70px -24px rgba(20,30,70,.6),
             0 0 60px -10px rgba(246,226,174,.75);
}
.hm-collage.is-in .hm-frame.is-dim{
  opacity:.62;
  transform:translate3d(0,0,0) rotate(var(--rot)) scale(calc(var(--scale) * .94));
}
.hm-heart-pop{
  position:absolute;top:42%;left:50%;font-size:3rem;color:var(--rose);
  transform:translate(-50%,-50%) scale(.2);opacity:0;pointer-events:none;
}
.hm-frame.is-held .hm-heart-pop{animation:heartPop .58s var(--ease-spring);}
@keyframes heartPop{
  0%{opacity:0;transform:translate(-50%,-50%) scale(.2);}
  35%{opacity:1;transform:translate(-50%,-70%) scale(1.15);}
  100%{opacity:0;transform:translate(-50%,-140%) scale(.9);}
}

/* ── lightbox ────────────────────────────────────────────────────────── */
.hm-lightbox{position:fixed;inset:0;z-index:85;display:grid;place-items:center;padding:1.5rem;}
.hm-lightbox-veil{
  position:absolute;inset:0;
  background:radial-gradient(circle at 50% 45%,rgba(46,76,147,.7),rgba(9,14,36,.94));
  backdrop-filter:blur(10px);-webkit-backdrop-filter:blur(10px);
  animation:fadeIn .24s var(--ease-soft) both;
}
@keyframes fadeIn{from{opacity:0;}to{opacity:1;}}
.hm-lightbox-stage{position:relative;z-index:2;margin:0;text-align:center;}
.hm-lightbox-img{
  display:block;max-width:min(86vw,44rem);max-height:74vh;width:auto;height:auto;
  padding:10px 10px 34px;background:var(--ivory);border-radius:3px;
  box-shadow:0 50px 90px -30px rgba(0,0,0,.8),0 0 0 1px rgba(217,169,79,.4);
  animation:crossIn .28s var(--ease-soft) both;
  will-change:transform;
}
@keyframes crossIn{from{opacity:0;transform:scale(.97);}to{opacity:1;transform:none;}}
.hm-lightbox-cap{
  display:flex;align-items:center;justify-content:center;gap:.5rem;
  margin-top:1.1rem;color:#FBEEDA;text-shadow:var(--shadow-on-dark);
  text-transform:uppercase;
}
/* lightbox controls get the same four-layer treatment, sized round */
.hm-lb-nav,.hm-lb-close{
  position:absolute;z-index:3;border:0;border-radius:999px;
  width:48px;height:48px;font-size:1.6rem;line-height:1;cursor:pointer;
  display:grid;place-items:center;color:#FFF6FA;
  background:linear-gradient(168deg,#F0A6C0 0%,#D07E9E 55%,#A8567C 100%);
  box-shadow:
    inset 0 1px 0 rgba(255,255,255,.5),
    inset 0 -2px 5px rgba(120,44,78,.35),
    0 10px 22px -8px rgba(168,86,124,.8);
  text-shadow:0 1px 5px rgba(96,34,62,.55);
  transition:transform .18s var(--ease-spring),box-shadow .2s var(--ease-soft),filter .2s;
}
.hm-lb-nav:hover,.hm-lb-close:hover{
  transform:scale(1.08);filter:brightness(1.06);
  box-shadow:inset 0 1px 0 rgba(255,255,255,.55),inset 0 -2px 5px rgba(120,44,78,.3),
    0 16px 30px -10px rgba(168,86,124,.9),0 0 0 7px rgba(226,143,174,.24);
}
.hm-lb-nav:active,.hm-lb-close:active{transform:scale(.96);
  box-shadow:inset 0 2px 7px rgba(120,44,78,.5),0 4px 10px -6px rgba(168,86,124,.7);}
.hm-lb-prev{left:max(1rem,2vw);top:50%;margin-top:-23px;}
.hm-lb-next{right:max(1rem,2vw);top:50%;margin-top:-23px;}
.hm-lb-close{top:max(1rem,env(safe-area-inset-top));right:max(1rem,2vw);font-size:1.3rem;}
@media (max-width:600px){.hm-lb-nav{width:40px;height:40px;}}

/* ═══ ASIDE LAYOUT — the rhythm break ═══════════════════════════════════
   Used by the letter (head left) and the wishes (head right, sticky). Below
   900px both collapse to a single column with the head on top, still
   left-aligned, so the variation survives on a phone as text alignment even
   when the two columns can't. */
.hm-aside-grid{
  display:grid;gap:clamp(1.75rem,5vw,3.5rem);
  width:min(100%,64rem);margin:0 auto;
  grid-template-columns:1fr;
}
@media (min-width:900px){
  .hm-aside-grid{grid-template-columns:minmax(15rem,22rem) 1fr;align-items:start;}
  .hm-aside-grid--flip{grid-template-columns:1fr minmax(15rem,22rem);}
  .hm-aside-grid--flip > .hm-aside-head{order:2;}
  .hm-aside-grid--flip > .hm-wish-list{order:1;}
  .hm-aside-head--sticky{position:sticky;top:6rem;}
}
.hm-aside-head{position:relative;text-align:left;}
.hm-aside-head::before{
  content:"";position:absolute;inset:-14% -10%;z-index:-1;
  background:var(--scrim-light);pointer-events:none;
}
.hm-aside-head .hm-eyebrow{margin-bottom:.85rem;}
.hm-h2-aside{
  font-size:clamp(2rem,5.2vw,3.1rem);line-height:1.02;
  margin:0 0 1.1rem;text-align:left;
}
.hm-aside-rule{
  display:block;width:3.5rem;height:1px;margin:0 0 1.1rem;
  background:linear-gradient(90deg,var(--rosegold),transparent);
}
.hm-aside-note{
  font-family:var(--font-display);font-style:italic;
  font-size:1rem;line-height:1.7;color:var(--on-light-soft);
  max-width:26ch;margin:0;
}

/* ═══ NOTE ══════════════════════════════════════════════════════════════ */
.hm-note-section{display:flex;flex-direction:column;align-items:center;}
.hm-note-section .hm-note{margin:0;}
.hm-note{
  position:relative;width:100%;max-width:38rem;
  padding:clamp(2.5rem,7vw,3.75rem) clamp(1.75rem,6vw,3rem);
  background:
    linear-gradient(#FFFDF8,#FBF3EC),
    repeating-linear-gradient(0deg,transparent 0 31px,rgba(217,139,166,.22) 31px 32px);
  background-blend-mode:multiply;
  border-radius:4px;
  box-shadow:0 30px 60px -30px rgba(20,30,70,.4),0 0 0 1px rgba(217,169,79,.28);
  opacity:0;transform:translate3d(0,16px,0);
  transition:opacity .36s var(--ease-soft),transform .36s var(--ease-soft);
}
.hm-note-section.is-in .hm-note{opacity:1;transform:none;}
.hm-note-flourish{position:absolute;width:88px;color:var(--rose);opacity:.5;}
.hm-note-flourish-tl{top:-18px;left:-16px;}
.hm-note-flourish svg{width:100%;display:block;}
.hm-note-body{font-family:var(--font-display);font-size:clamp(1.02rem,2.9vw,1.22rem);
  line-height:1.95;color:var(--on-light);}
.hm-note-body p{margin:0 0 1.15rem;}
.hm-note-body p:first-child{font-family:var(--font-script);font-size:1.9rem;color:var(--wine);margin-bottom:.6rem;}
.hm-sign{font-family:var(--font-script);font-size:1.7rem;color:var(--mauve);text-align:right;margin-top:1.8rem!important;}

/* ═══ CAKE ══════════════════════════════════════════════════════════════ */

.hm-cake-wrap{
  position:relative;width:min(100%,24rem);margin:0 auto;text-align:center;
  opacity:0;transform:translate3d(0,15px,0);
  transition:opacity .36s var(--ease-soft),transform .36s var(--ease-soft);
}
.hm-cake-section.is-in .hm-cake-wrap{opacity:1;transform:none;}
/* Fluid viewBox with a height cap: on a 390px screen the cake is ~340px wide
   and ~440px tall, well inside the viewport, and it never crops. */
.hm-cake{
  width:100%;height:auto;display:block;overflow:visible;
  max-height:min(62vh,30rem);margin-inline:auto;
}
.hm-pearl{fill:#FDF2F6;opacity:.95;}
.hm-pearl-hi{fill:#FFFFFF;opacity:.85;}
.hm-drip{/* was drop-shadow — see notes; the tier gradients carry the depth now */}

/* ── flame: three layers on deliberately mismatched cycle lengths, so their
      peaks never line up and the shape churns instead of pulsing ────────── */
.hm-flame-grp{transform-box:fill-box;transform-origin:50% 100%;animation:flameSway 2.3s ease-in-out infinite;}
.hm-flame-a{transform-box:fill-box;transform-origin:50% 100%;animation:flick1 .82s ease-in-out infinite;}
.hm-flame-b{transform-box:fill-box;transform-origin:50% 100%;animation:flick2 .61s ease-in-out infinite;}
.hm-flame-c{transform-box:fill-box;transform-origin:50% 100%;animation:flick3 .47s ease-in-out infinite;}
@keyframes flameSway{
  0%,100%{transform:rotate(-1.6deg) translateX(-.6px);}
  50%{transform:rotate(1.8deg) translateX(.6px);}
}
@keyframes flick1{
  0%,100%{transform:scale(1,1);}
  30%{transform:scale(.93,1.09) skewX(2deg);}
  62%{transform:scale(1.06,.94) skewX(-1.5deg);}
}
@keyframes flick2{
  0%,100%{transform:scale(1.02,.97) skewX(-2deg);}
  45%{transform:scale(.92,1.12) skewX(3deg);}
}
@keyframes flick3{
  0%,100%{transform:scale(1,1.04);opacity:.95;}
  40%{transform:scale(1.1,.9);opacity:1;}
  70%{transform:scale(.9,1.08);opacity:.9;}
}
.hm-wick{animation:flick2 .61s ease-in-out infinite;transform-box:fill-box;transform-origin:50% 100%;}
.hm-halo{animation:haloPulse 2.2s ease-in-out infinite;transform-box:fill-box;transform-origin:50% 50%;}
@keyframes haloPulse{0%,100%{opacity:.72;transform:scale(1);}50%{opacity:1;transform:scale(1.07);}}
.hm-smoke{opacity:0;transform-box:fill-box;transform-origin:50% 100%;}
.hm-flecks circle{animation:fleck 2.8s ease-in-out infinite;}
@keyframes fleck{0%,100%{opacity:.22;}50%{opacity:1;}}
.hm-topper{animation:topperGlint 4.5s ease-in-out infinite;transform-box:fill-box;transform-origin:50% 100%;}
@keyframes topperGlint{
  0%,100%{opacity:.9;transform:rotate(-1.2deg);}
  50%{opacity:1;transform:rotate(1.2deg);}
}
/* ── Cake tilt (2D SVG cake) ────────────────────────────────────────────
   Pointer-parallax on the flat cake: a perspective stage with three depth
   layers. The SVG sits at z=0, a soft
   plate sits behind it and a highlight plate in front; tilting the stage
   moves them at different rates, which is what sells it as a solid object
   rather than a picture that rotates. One composited transform, no repaint. */
.hm-cake-stage{perspective:1000px;perspective-origin:50% 45%;}
.hm-cake-3d{
  position:relative;
  transform-style:preserve-3d;
  transform:rotateX(var(--rx,0deg)) rotateY(var(--ry,0deg));
  transition:transform .5s var(--ease-soft);
  will-change:transform;
}
.hm-cake-wrap:hover .hm-cake-3d{transition-duration:.14s;}  /* tracks live */
.hm-cake-depth{
  position:absolute;left:50%;top:50%;pointer-events:none;
  border-radius:50%;
}
.hm-cake-depth-back{
  width:78%;height:46%;margin:-6% 0 0 -39%;
  transform:translateZ(-90px) scale(1.25);
  background:radial-gradient(ellipse at 50% 50%,
    rgba(217,139,166,.4) 0%,rgba(246,213,224,.28) 45%,transparent 72%);
}
.hm-cake-depth-front{
  width:52%;height:30%;margin:-22% 0 0 -26%;
  transform:translateZ(70px);
  background:radial-gradient(ellipse at 50% 40%,
    rgba(255,246,226,.42) 0%,rgba(235,211,164,.16) 46%,transparent 72%);
}
.hm-cake{transform:translateZ(0);}
/* the flame and its halo float nearest the viewer */
.hm-flame-grp,.hm-halo{transform-box:fill-box;}

/* Breathing lives on a wrapper DIV, not the SVG. Scaling the SVG itself
   re-rasterised its gradients and blur filter every frame; scaling a promoted
   div is a compositor transform and costs nothing. */
.hm-cake-3d{animation:cakeBreathe 6.5s ease-in-out infinite;transform-origin:50% 92%;}
@keyframes cakeBreathe{0%,100%{transform:scale(1);}50%{transform:scale(1.008);}}
.hm-bow{transform-origin:center;transform-box:fill-box;}

.hm-cake-wrap.is-blown .hm-flame-grp{transform-box:fill-box;transform-origin:50% 100%;animation:snuff .6s var(--ease-soft) forwards;}
.hm-cake-wrap.is-blown .hm-flame-a,
.hm-cake-wrap.is-blown .hm-flame-b,
.hm-cake-wrap.is-blown .hm-flame-c,
.hm-cake-wrap.is-blown .hm-wick{animation:none;}
@keyframes snuff{
  0%{opacity:1;transform:scale(1);}
  35%{opacity:1;transform:scale(.7,1.25);}
  100%{opacity:0;transform:scale(.1,.4) translateY(6px);}
}
.hm-cake-wrap.is-blown .hm-halo{animation:haloOut .8s var(--ease-soft) forwards;}
@keyframes haloOut{to{opacity:0;transform:scale(1.4);}}
.hm-cake-wrap.is-blown .hm-smoke{animation:smoke 2.6s var(--ease-soft) .35s forwards;}
@keyframes smoke{
  0%{opacity:0;transform:translateY(6px) scale(.6);}
  25%{opacity:.85;}
  100%{opacity:0;transform:translateY(-70px) scale(1.5);}
}

.hm-wish-btn{margin-top:2rem;}
.hm-wish-btn.is-done{
  filter:saturate(.55) brightness(.98);
  background:linear-gradient(168deg,#E7C3B6 0%,#CFA192 55%,#A87A6C 100%);
  box-shadow:inset 0 1px 0 rgba(255,255,255,.4),inset 0 -2px 5px rgba(110,70,58,.3),
    0 8px 18px -10px rgba(140,100,86,.7);
}
.hm-wish-btn.is-done:hover{transform:none;box-shadow:inset 0 1px 0 rgba(255,255,255,.4),
  inset 0 -2px 5px rgba(110,70,58,.3),0 8px 18px -10px rgba(140,100,86,.7);}
.hm-wish-ico{display:flex;color:var(--gold);}
.hm-wish-note{
  margin-top:1rem;font-family:var(--font-display);font-style:italic;
  font-size:1rem;color:var(--on-light-soft);opacity:0;transform:translateY(8px);
  transition:opacity .4s var(--ease-soft) .28s,transform .4s var(--ease-soft) .28s;
}
.hm-wish-note.is-on{opacity:1;transform:none;}

/* ═══ WISHES ════════════════════════════════════════════════════════════ */
.hm-wishes{overflow:hidden;}
.hm-wish-list{
  list-style:none;padding:0;margin:0;width:100%;
  display:grid;gap:1rem;grid-template-columns:1fr;
}
@media (min-width:640px){.hm-wish-list{grid-template-columns:1fr 1fr;gap:1.15rem;}}
/* stagger the second column down half a card — breaks the grid's flat top
   edge. margin, not transform, so it doesn't fight the reveal animation. */
@media (min-width:900px){
  .hm-wish-list > li:nth-child(even){margin-top:1.7rem;}
  .hm-wish-card:hover{transform:translateZ(28px) rotateX(3deg);}
}
.hm-wish-list{perspective:900px;}
.hm-wish-card{
  position:relative;padding:1.75rem 1.5rem 1.6rem;text-align:left;
  transform-style:preserve-3d;
  background:linear-gradient(160deg,rgba(255,253,248,.92),rgba(246,235,244,.88));
  border-radius:4px;
  box-shadow:0 20px 44px -28px rgba(40,30,70,.5),inset 0 0 0 1px rgba(217,169,79,.25);
  opacity:0;transform:translate3d(0,14px,0);
  transition:opacity .3s var(--ease-soft),transform .32s var(--ease-spring),box-shadow .2s;
  transition-delay:var(--delay);
}
.hm-wishes.is-in .hm-wish-card{opacity:1;transform:none;}
.hm-wish-card:hover{transform:translateZ(24px) rotateX(2.5deg);box-shadow:0 26px 50px -24px rgba(40,30,70,.45),inset 0 0 0 1px rgba(217,169,79,.55),0 0 30px -8px rgba(246,226,174,.7);}
.hm-wish-gem{
  position:absolute;top:1.5rem;right:1.5rem;width:11px;height:11px;border-radius:50%;
  background:radial-gradient(circle at 32% 30%,#FFFDF6,#F6E2AE 45%,#D9A94F);
  box-shadow:0 0 0 3px rgba(246,226,174,.25);
  transition:box-shadow .25s,transform .25s var(--ease-spring);
}
.hm-wish-card:hover .hm-wish-gem{transform:scale(1.25);box-shadow:0 0 0 8px rgba(217,139,166,.28);}
.hm-wish-card h3{
  font-family:var(--font-ui);font-size:.72rem;font-weight:500;
  letter-spacing:.26em;text-transform:uppercase;color:var(--rosegold-ink);margin:0 0 .7rem;
}
.hm-wish-card p{
  font-family:var(--font-display);font-size:1.06rem;line-height:1.8;color:var(--on-light);margin:0;
}
.hm-amen{
  text-align:left;margin:1.6rem 0 0;max-width:28ch;
  font-family:var(--font-display);font-style:italic;font-size:1.1rem;color:var(--on-light-soft);
}

/* ═══ FOOTER ════════════════════════════════════════════════════════════ */
.hm-footer{
  position:relative;margin-top:clamp(3rem,8vw,5.5rem);
  padding:clamp(7rem,16vw,10rem) 1.25rem clamp(3rem,8vw,4rem);
  padding-bottom:calc(clamp(3rem,8vw,4rem) + env(safe-area-inset-bottom));
  text-align:center;overflow:hidden;
  /* mirror of the hero: fades out of the page surface, above all footer text */
  background:linear-gradient(180deg,
    var(--petal) 0%,var(--blush) 8%,var(--mauve) 22%,var(--wine) 42%,var(--plum) 100%);
}
.hm-footer-sky{height:80%;opacity:.6;}
.hm-footer-mark{position:relative;color:var(--gold-lite);opacity:.75;margin:0 auto 1.5rem;display:block;}
.hm-footer-line{
  position:relative;font-family:var(--font-display);font-style:italic;font-weight:300;
  font-size:clamp(1.5rem,5vw,2.2rem);color:var(--on-dark);text-shadow:var(--shadow-on-dark);margin:0;
}
.hm-footer-line .hm-shimmer{font-family:var(--font-script);font-style:normal;font-size:1.35em;}
.hm-footer-sub{
  position:relative;margin-top:1.2rem;font-size:.8rem;letter-spacing:.1em;
  color:var(--on-dark-soft);text-shadow:var(--shadow-on-dark);max-width:34ch;margin-inline:auto;line-height:1.9;
}

.hm-footer-credit{
  position:relative;margin-top:2.4rem;
  font-family:var(--font-display);font-style:italic;font-weight:300;
  font-size:clamp(1rem,3vw,1.2rem);letter-spacing:.01em;
  color:var(--on-dark-soft);opacity:.95;
  text-shadow:var(--shadow-on-dark);
}
.hm-footer-close{
  position:relative;color:var(--gold-lite);opacity:.9;
  text-transform:uppercase;margin:0 0 1rem;
  text-shadow:var(--shadow-on-dark);
}

/* ═══ BALLOONS ══════════════════════════════════════════════════════════
   Sits above the page (z 74) and below the fireworks (76) and banner (84).
   pointer-events:none on the layer AND on every child, so nothing underneath
   can be blocked. Two nested animations per balloon — the wrapper rises, the
   body sways — on independent durations, which is what stops them moving as
   a block. */
.hm-balloons{position:fixed;inset:0;z-index:74;pointer-events:none;overflow:hidden;}
.hm-balloon{
  position:absolute;bottom:-20vh;
  width:var(--size);pointer-events:none;
  animation-name:balloonRise;animation-timing-function:cubic-bezier(.36,.1,.5,1);
  animation-fill-mode:both;
}
@keyframes balloonRise{
  0%{transform:translate3d(0,0,0) rotate(var(--tilt));opacity:0;}
  8%{opacity:1;}
  78%{opacity:1;}
  100%{transform:translate3d(0,-135vh,0) rotate(var(--tilt));opacity:0;}
}
.hm-balloon-body{
  position:relative;display:block;
  width:var(--size);height:calc(var(--size) * 1.22);
  border-radius:50% 50% 48% 48% / 55% 55% 45% 45%;
  background:
    radial-gradient(ellipse at 32% 26%, rgba(255,255,255,.85) 0%, rgba(255,255,255,0) 42%),
    linear-gradient(158deg, var(--light) 0%, var(--dark) 88%);
  box-shadow:inset -4px -6px 10px rgba(120,44,78,.28),
             0 8px 18px -8px rgba(120,44,78,.45);
  animation-name:balloonSway;animation-timing-function:ease-in-out;
  animation-iteration-count:infinite;animation-direction:alternate;
}
@keyframes balloonSway{
  from{transform:translate3d(calc(var(--sway) * -.5),0,0) rotate(-4deg);}
  to{transform:translate3d(calc(var(--sway) * .5),0,0) rotate(4deg);}
}
.hm-balloon-shine{
  position:absolute;top:14%;left:22%;
  width:26%;height:20%;border-radius:50%;
  background:rgba(255,255,255,.7);filter:none;
}
.hm-balloon-knot{
  position:absolute;bottom:-5%;left:50%;
  width:22%;height:9%;margin-left:-11%;
  background:var(--dark);
  border-radius:0 0 50% 50%;
  clip-path:polygon(50% 100%, 0 0, 100% 0);
}
.hm-balloon-string{
  position:absolute;top:calc(var(--size) * 1.28);left:50%;
  width:1px;height:calc(var(--size) * 1.5);
  background:linear-gradient(180deg,var(--dark),transparent);
  opacity:.5;
}
/* wind down with the rest of the sequence */
.hm-balloons.is-out .hm-balloon{animation-play-state:running;opacity:.6;}
@media (max-width:520px){
  .hm-balloon{width:calc(var(--size) * .78);}
  .hm-balloon-body{width:calc(var(--size) * .78);height:calc(var(--size) * .95);}
}
/* reduced motion: they fade in low and still, no rise, no sway */
.hm-root.is-calm .hm-balloon{
  animation:none;bottom:12vh;opacity:.55;
}
.hm-root.is-calm .hm-balloon-body{animation:none;}

/* ═══ DOM FIREWORKS ═════════════════════════════════════════════════════
   Sits above the particle canvas (70) and below the banner (84). Every
   animation is transform/opacity on a GPU layer; nodes exist only while the
   finale is running and are removed with the component.                   */
.hm-finale-fw{position:fixed;inset:0;z-index:76;pointer-events:none;overflow:hidden;}
.hm-fw{position:absolute;width:0;height:0;}
/* the flash at the heart of each burst */
.hm-fw-core{
  position:absolute;left:-40px;top:-40px;width:80px;height:80px;border-radius:50%;
  background:radial-gradient(circle,#FFFDF2 0%,rgba(255,243,210,.7) 30%,transparent 70%);
  opacity:0;animation:fwCore .7s ease-out both;
}
@keyframes fwCore{
  0%{opacity:0;transform:scale(.2);}
  18%{opacity:1;transform:scale(1);}
  100%{opacity:0;transform:scale(2.1);}
}
.hm-fw i{
  position:absolute;left:0;top:0;
  width:var(--s);height:var(--s);margin:calc(var(--s) / -2);
  border-radius:50%;background:var(--c);
  box-shadow:0 0 10px 2px var(--c);
  opacity:0;
  animation-name:fwShard;animation-timing-function:cubic-bezier(.14,.72,.3,1);
  animation-fill-mode:both;
}
@keyframes fwShard{
  0%{opacity:0;transform:translate3d(0,0,0) scale(.5);}
  8%{opacity:1;transform:translate3d(calc(var(--dx) * .16),calc(var(--dy) * .16),0) scale(1.15);}
  62%{opacity:1;}
  100%{
    opacity:0;
    transform:translate3d(var(--dx),calc(var(--dy) + 90px),0) scale(.25);
  }
}
/* falling confetti strips */
.hm-fw-confetti{
  position:absolute;top:-6%;display:block;border-radius:1px;
  background:var(--c);opacity:0;
  animation-name:fwConfetti;animation-timing-function:linear;
  animation-fill-mode:both;
}
@keyframes fwConfetti{
  0%{opacity:0;transform:translate3d(0,0,0) rotate(0deg);}
  6%{opacity:1;}
  85%{opacity:1;}
  100%{
    opacity:0;
    transform:translate3d(var(--drift),110vh,0) rotate(var(--spin));
  }
}
/* stop spawning once the sequence is winding down */
.hm-finale-fw.is-out .hm-fw-core,
.hm-finale-fw.is-out .hm-fw i{animation-play-state:paused;}

/* ═══ FINALE ════════════════════════════════════════════════════════════ */
.hm-finale{position:fixed;inset:0;z-index:84;pointer-events:none;}
.hm-finale-under{position:fixed;inset:0;z-index:60;pointer-events:none;}

/* the bloom of light on the wish itself */
.hm-finale-bloom{
  position:absolute;inset:0;opacity:0;
  background:radial-gradient(circle at 50% 55%,#FFF6E2 0%,rgba(246,213,224,.55) 32%,transparent 68%);
}
.hm-finale-under.is-bloom .hm-finale-bloom{animation:finaleBloom .9s var(--ease-soft) forwards;}
@keyframes finaleBloom{0%{opacity:0;}22%{opacity:.85;}100%{opacity:0;}}

/* a warm wash that stays up through the barrage, so the whole page reads
   lit rather than only the cake */
.hm-finale-glow{
  position:absolute;inset:0;opacity:0;
  background:
    radial-gradient(80% 50% at 50% 0%,rgba(235,211,164,.34),transparent 70%),
    radial-gradient(70% 45% at 12% 88%,rgba(217,139,166,.3),transparent 72%),
    radial-gradient(70% 45% at 88% 88%,rgba(201,138,114,.28),transparent 72%);
  transition:opacity .7s var(--ease-soft);
}
.hm-finale-under.is-party .hm-finale-glow,
.hm-finale-under.is-banner .hm-finale-glow{opacity:1;animation:glowBreathe 2.6s ease-in-out infinite;}
@keyframes glowBreathe{0%,100%{opacity:.72;}50%{opacity:1;}}

/* the banner */
.hm-finale-banner{
  position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);
  display:flex;flex-direction:column;align-items:center;gap:.35rem;
  width:min(92vw,34rem);text-align:center;
  opacity:0;
}
.hm-finale.is-banner .hm-finale-banner{animation:bannerIn 1s var(--ease-spring) forwards;}
.hm-finale.is-out .hm-finale-banner{animation:bannerOut 1.4s var(--ease-soft) forwards;}
@keyframes bannerIn{
  0%{opacity:0;transform:translate(-50%,-50%) scale(.86);}
  60%{opacity:1;}
  100%{opacity:1;transform:translate(-50%,-50%) scale(1);}
}
@keyframes bannerOut{
  0%{opacity:1;transform:translate(-50%,-50%) scale(1);}
  100%{opacity:0;transform:translate(-50%,-58%) scale(1.06);}
}
.hm-finale-eyebrow{
  color:var(--gold-lite);text-transform:uppercase;
  text-shadow:0 2px 16px rgba(46,24,38,.85);
}
.hm-finale-name{
  font-family:var(--font-script);
  font-size:clamp(3.6rem,15vw,7rem);line-height:1;
  color:#FFF6E8;
  text-shadow:0 4px 30px rgba(46,24,38,.75),0 0 60px rgba(235,211,164,.55);
}
.hm-finale-rule{
  width:6rem;height:1px;margin:.5rem 0 .35rem;
  background:linear-gradient(90deg,transparent,var(--gold-lite),transparent);
}
.hm-finale-sub{
  font-family:var(--font-display);font-style:italic;
  font-size:clamp(.95rem,3vw,1.2rem);color:#FBE7EE;
  text-shadow:0 2px 14px rgba(46,24,38,.85);
}

/* ── SITE-WIDE REACTIONS — the rest of the page joins in ────────────────
   Everything here is transform/opacity only and scoped to one root class, so
   it costs nothing until the wish is made and nothing after it ends. */
.hm-root.is-celebrating .hm-frame{animation:celebrateBob 1.5s var(--ease-soft) infinite;}
.hm-root.is-celebrating .hm-frame:nth-child(2){animation-delay:-.3s;}
.hm-root.is-celebrating .hm-frame:nth-child(3){animation-delay:-.6s;}
.hm-root.is-celebrating .hm-frame:nth-child(4){animation-delay:-.9s;}
.hm-root.is-celebrating .hm-frame:nth-child(5){animation-delay:-1.2s;}
@keyframes celebrateBob{
  0%,100%{translate:0 0;}
  50%{translate:0 -9px;}
}
.hm-root.is-celebrating .hm-wish-card{animation:celebrateLift 1.9s var(--ease-soft) infinite;}
.hm-root.is-celebrating .hm-wish-card:nth-child(even){animation-delay:-.95s;}
@keyframes celebrateLift{
  0%,100%{box-shadow:0 20px 44px -28px rgba(40,30,70,.5),inset 0 0 0 1px rgba(217,169,79,.25);}
  50%{box-shadow:0 26px 54px -24px rgba(40,30,70,.45),inset 0 0 0 1px rgba(235,211,164,.85),0 0 34px -6px rgba(235,211,164,.6);}
}
.hm-root.is-celebrating .hm-wish-gem{animation:gemFlash 1.1s ease-in-out infinite;}
@keyframes gemFlash{0%,100%{transform:scale(1);}50%{transform:scale(1.35);}}
/* every pearl on the story thread lights, whatever the scroll position */
.hm-root.is-celebrating .hm-thread-node{
  opacity:.95!important;transform:scale(1)!important;
  animation:nodeFlash 1.3s ease-in-out infinite;
  animation-delay:calc(var(--n) * .13s);
}
@keyframes nodeFlash{
  0%,100%{box-shadow:0 0 0 4px rgba(246,213,224,.5),0 0 18px 4px rgba(235,211,164,.45);}
  50%{box-shadow:0 0 0 8px rgba(246,213,224,.35),0 0 34px 10px rgba(235,211,164,.8);}
}
.hm-root.is-celebrating .hm-thread-line{stroke-width:2.6;}
.hm-root.is-celebrating .hm-topbar{background:linear-gradient(180deg,rgba(94,44,70,.8),rgba(94,44,70,0));}
.hm-root.is-celebrating .hm-music-btn{box-shadow:0 0 30px -6px rgba(235,211,164,.9);}
/* the hero name sweeps again, so the top of the page reacts too */
.hm-root.is-celebrating .hm-hero-name .hm-shimmer{
  animation:sweep 1.9s var(--ease-soft) infinite;
}
.hm-root.is-celebrating .hm-h2{animation:titleGlow 2.2s ease-in-out infinite;}
@keyframes titleGlow{
  0%,100%{text-shadow:0 1px 0 rgba(255,255,255,.55);}
  50%{text-shadow:0 1px 0 rgba(255,255,255,.55),0 0 26px rgba(235,211,164,.9);}
}
.hm-root.is-celebrating .hm-butterfly{animation-duration:9s;}

/* Reduced motion: banner and a still glow, no bob, no barrage. */
.hm-root.is-calm .hm-finale-glow{animation:none;opacity:.7;}
.hm-root.is-calm.is-celebrating .hm-frame,
.hm-root.is-calm.is-celebrating .hm-wish-card,
.hm-root.is-calm.is-celebrating .hm-wish-gem,
.hm-root.is-calm.is-celebrating .hm-thread-node,
.hm-root.is-calm.is-celebrating .hm-h2,
.hm-root.is-calm.is-celebrating .hm-hero-name .hm-shimmer{animation:none!important;}

/* ═══ TOP BAR ═══════════════════════════════════════════════════════════ */
.hm-topbar{
  position:fixed;z-index:88;top:0;left:0;right:0;
  display:flex;align-items:center;justify-content:space-between;gap:1rem;
  padding:.6rem max(.9rem,env(safe-area-inset-right)) .6rem max(.9rem,env(safe-area-inset-left));
  padding-top:calc(.6rem + env(safe-area-inset-top));
  background:linear-gradient(180deg,rgba(46,24,38,.74),rgba(46,24,38,0));
  /* backdrop-filter removed: it re-composited on every scroll frame */
  -webkit-mask-image:linear-gradient(180deg,#000 62%,transparent 100%);
          mask-image:linear-gradient(180deg,#000 62%,transparent 100%);
  animation:barIn .5s var(--ease-soft) .28s both;
  transition:opacity .22s,transform .22s var(--ease-soft);
}
.hm-topbar.is-hidden{opacity:0;transform:translateY(-100%);pointer-events:none;}
@keyframes barIn{from{opacity:0;transform:translateY(-100%);}to{opacity:1;transform:none;}}
.hm-topbar-mark{
  display:inline-flex;align-items:center;gap:.55rem;color:var(--gold-lite);opacity:.85;
}
.hm-topbar-name{
  font-family:var(--font-script);font-size:1.25rem;line-height:1;color:var(--ivory);
}
.hm-music-btn{
  display:inline-flex;align-items:center;gap:.6rem;
  min-height:44px;padding:0 .9rem;
  color:var(--gold-lite);background:rgba(46,24,38,.55);
  border:1px solid rgba(246,226,174,.4);border-radius:999px;cursor:pointer;
  font-family:var(--font-ui);
  transition:transform .22s var(--ease-spring),background .2s,box-shadow .2s,color .2s;
}
.hm-music-btn:hover{transform:scale(1.05);box-shadow:0 0 26px -6px rgba(246,226,174,.8);}
.hm-music-btn:active{transform:scale(.97);}
.hm-music-btn.is-muted{color:var(--on-dark-soft);border-color:rgba(230,195,210,.35);}
.hm-music-btn.is-blocked{background:rgba(217,169,79,.92);color:#1B2340;border-color:transparent;
  animation:pulseGate 2.2s infinite;}
.hm-music-label{text-transform:uppercase;white-space:nowrap;}
.hm-music-ico{display:flex;}
/* four little bars that dance only while audio is actually running */
.hm-eq{display:inline-flex;align-items:flex-end;gap:2px;height:13px;}
.hm-eq i{
  width:2px;height:100%;border-radius:1px;background:currentColor;
  transform:scaleY(.25);transform-origin:bottom;opacity:.55;
}
.hm-eq.is-live i{animation:eq .9s ease-in-out infinite;opacity:1;}
.hm-eq.is-live i:nth-child(2){animation-delay:-.25s;animation-duration:1.05s;}
.hm-eq.is-live i:nth-child(3){animation-delay:-.55s;animation-duration:.78s;}
.hm-eq.is-live i:nth-child(4){animation-delay:-.15s;animation-duration:1.18s;}
@keyframes eq{0%,100%{transform:scaleY(.28);}50%{transform:scaleY(1);}}
@media (max-width:420px){
  .hm-music-label{display:none;}
  .hm-music-btn{padding:0 .75rem;}
}

/* ═══ SCREENSHOT CONTROL ════════════════════════════════════════════════ */
.hm-topbar-controls{display:inline-flex;align-items:center;gap:.5rem;}
/* Shares .hm-music-btn wholesale so the pair reads as one control cluster;
   only the state colours differ. */
.hm-cap-btn{gap:.5rem;}
.hm-cap-ico{display:flex;}
.hm-cap-btn:disabled{cursor:progress;transform:none;}
.hm-cap-btn.is-working{color:var(--on-dark-soft);border-color:rgba(230,195,210,.35);}
.hm-cap-btn.is-done{color:#2B1526;background:rgba(195,164,228,.92);border-color:transparent;}
.hm-cap-btn.is-error{color:#FFE3E3;border-color:rgba(255,170,170,.55);background:rgba(120,40,55,.5);}
.hm-cap-spin{animation:capSpin .9s linear infinite;transform-origin:50% 50%;}
@keyframes capSpin{to{transform:rotate(360deg);}}

/* ── capture mode ──────────────────────────────────────────────────────────
   Held only for the moment html2canvas is painting. Animations are PAUSED
   rather than cleared: animation:none would drop reveal animations that use
   fill-mode 'both' back to their opacity-0 start frame and blank the page. */
.hm-root.is-capturing *,
.hm-root.is-capturing *::before,
.hm-root.is-capturing *::after{
  animation-play-state:paused!important;
  transition:none!important;
}
/* Fixed viewport-sized layers can't tile down a document-height canvas —
   html2canvas would stamp each once at the top of the shot. */
.hm-root.is-capturing .hm-particles,
.hm-root.is-capturing .hm-cursor-dot,
.hm-root.is-capturing .hm-cursor-photo,
.hm-root.is-capturing .hm-balloons,
.hm-root.is-capturing .hm-finale-fw,
.hm-root.is-capturing .hm-finale,
.hm-root.is-capturing .hm-finale-under,
.hm-root.is-capturing .hm-curtain{display:none!important;}
/* backdrop-filter renders as a grey plate under html2canvas; drop it for the
   shot and let the element's own background carry the panel. */
.hm-root.is-capturing *{backdrop-filter:none!important;-webkit-backdrop-filter:none!important;}

@media (max-width:420px){
  .hm-topbar-controls{gap:.35rem;}
  .hm-cap-btn{padding:0 .7rem;}
}

/* ═══ RESPONSIVE ════════════════════════════════════════════════════════ */
@media (max-width:760px){
  .hm-collage{height:auto;display:flex;flex-direction:column;gap:1.5rem;align-items:center;perspective:none;}
  .hm-frame{position:relative;left:auto!important;top:auto!important;width:min(78%,17rem);}
  .hm-collage{height:auto!important;}
  .hm-frame:nth-child(even){align-self:flex-end;margin-right:6%;}
  .hm-frame:nth-child(odd){align-self:flex-start;margin-left:6%;}
  .hm-photo{animation:none;transform:scale(1.02);} /* drop Ken Burns on mobile */
}
@media (max-width:400px){
  .hm-frame{width:min(88%,15rem);}
  .hm-note{padding-inline:1.35rem;}
}

/* ═══ REDUCED MOTION — calmer, never broken. Audio stays fully live. ════ */
@media (prefers-reduced-motion:reduce){
  .hm-photo,.hm-flame-grp,.hm-flame-a,.hm-flame-b,.hm-flame-c,.hm-wick,
  .hm-halo,.hm-flecks circle,.hm-star,.hm-wing,.hm-butterfly,.hm-shimmer,
  .hm-scroll-line,.hm-gate-cta,.hm-topper,.hm-eq i,.hm-topbar,.hm-cake{
    animation:none!important;
  }
  .hm-shimmer{color:var(--ivory);-webkit-text-fill-color:currentColor;}
  .hm-curtain{display:none;}
  .hm-frame,.hm-note,.hm-wish-card,.hm-cake-wrap{transition-duration:.25s!important;}
  .hm-lightbox-img{animation-duration:.2s;}
  .hm-cursor-dot,.hm-cursor-photo,.hm-particles{display:none;}
}
.hm-root.is-calm .hm-cake,
.hm-root.is-calm .hm-topper,
.hm-root.is-calm .hm-flame-a,
.hm-root.is-calm .hm-flame-b,
.hm-root.is-calm .hm-flame-c,
.hm-root.is-calm .hm-wick,
.hm-root.is-calm .hm-photo,
.hm-root.is-calm .hm-shimmer,
.hm-root.is-calm .hm-butterfly,
.hm-root.is-calm .hm-star,
.hm-root.is-calm .hm-gate-cta,
.hm-root.is-calm .hm-eq i,
.hm-root.is-calm .hm-topbar{animation:none!important;}
.hm-root.is-calm .hm-shimmer{color:var(--ivory);-webkit-text-fill-color:currentColor;}
.hm-root.is-calm .hm-curtain{display:none;}
`;
