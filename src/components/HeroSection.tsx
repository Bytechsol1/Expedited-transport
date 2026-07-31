"use client";

import { useEffect, useRef, useState, useCallback } from "react";

const FRAME_COUNT = 240;
const pad = (n: number) => String(n).padStart(5, "0");
const frameSrc = (i: number) => `/frames/frame_${pad(i)}.webp`;

const TITLES = [
  "Work with a Top Trucking Company",
  "Hotshot, LTL & Dry Van specialists",
  "Serving West Hartford, New Haven & Stamford",
  "Trusted since 2014.",
];

function useFrames() {
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const imgs: HTMLImageElement[] = [];
    let count = 0;
    for (let i = 0; i < FRAME_COUNT; i++) {
      const img = new Image();
      img.decoding = "async";
      img.src = frameSrc(i);
      // No setLoadedCount — eliminates 240 re-renders during load
      img.onload = img.onerror = () => {
        count++;
        if (count === FRAME_COUNT) setLoaded(true);
      };
      imgs.push(img);
    }
    imagesRef.current = imgs;
  }, []);

  return { imagesRef, loaded };
}

export function HeroSection({ onReady }: { onReady?: () => void }) {
  const onReadyRef  = useRef(onReady);
  onReadyRef.current = onReady;

  const sectionRef  = useRef<HTMLElement>(null);
  const canvasRef   = useRef<HTMLCanvasElement>(null);
  const duskRef     = useRef<HTMLDivElement>(null);

  const scrollProgressRef   = useRef(0);
  const rafRef              = useRef<number | null>(null);
  const lastFrameRef        = useRef(-1);
  const lastTitleIdxRef     = useRef(-1);
  const lastRevealedRef     = useRef(-1);
  const loadedRef           = useRef(false);
  const ctxRef              = useRef<CanvasRenderingContext2D | null>(null);
  // Cache section bounds to avoid getBoundingClientRect on every scroll event
  const sectionTopRef       = useRef(0);
  const sectionHeightRef    = useRef(0);

  // titleSpansRef[titleIdx][charIdx] — updated directly in tick, no setState
  const titleSpansRef = useRef<(HTMLSpanElement | null)[][]>([]);

  const [activeTitleIdx, setActiveTitleIdx] = useState(0);

  const { imagesRef, loaded } = useFrames();
  useEffect(() => {
    loadedRef.current = loaded;
    if (loaded) onReadyRef.current?.();
  }, [loaded]);

  const drawFrame = useCallback((frameIdx: number) => {
    const ctx = ctxRef.current;
    const images = imagesRef.current;
    if (!ctx || !images.length) return;
    const img = images[frameIdx];
    if (!img || !img.complete || img.naturalWidth === 0) return;
    const canvas = ctx.canvas;
    const cw = canvas.width, ch = canvas.height;
    const iw = img.naturalWidth, ih = img.naturalHeight;
    const scale = Math.max(cw / iw, ch / ih);
    const dw = iw * scale, dh = ih * scale;
    const dx = (cw - dw) / 2, dy = (ch - dh) / 2;
    ctx.drawImage(img, dx, dy, dw, dh);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    ctxRef.current = canvas.getContext("2d");
    if (ctxRef.current) {
      ctxRef.current.imageSmoothingEnabled = true;
      ctxRef.current.imageSmoothingQuality = "medium";
    }
    const sync = () => {
      // Cap DPR at 1 — quarters the pixel count on retina, eliminates upscaling cost
      const rect = canvas.getBoundingClientRect();
      canvas.width  = rect.width;
      canvas.height = rect.height;
      // Restore smoothing after canvas resize (resize resets context state)
      if (ctxRef.current) {
        ctxRef.current.imageSmoothingEnabled = true;
        ctxRef.current.imageSmoothingQuality = "medium";
      }
      if (loadedRef.current && lastFrameRef.current >= 0) drawFrame(lastFrameRef.current);
    };
    sync();
    const ro = new ResizeObserver(sync);
    ro.observe(canvas);
    return () => ro.disconnect();
  }, [drawFrame]);

  useEffect(() => {
    if (loaded && lastFrameRef.current < 0) {
      lastFrameRef.current = 0;
      drawFrame(0);
    }
  }, [loaded, drawFrame]);

  const tick = useCallback(() => {
    rafRef.current = null;
    const p = scrollProgressRef.current;

    // Canvas frame
    const frameIdx = Math.min(FRAME_COUNT - 1, Math.max(0, Math.round(p * (FRAME_COUNT - 1))));
    if (frameIdx !== lastFrameRef.current && loadedRef.current) {
      lastFrameRef.current = frameIdx;
      drawFrame(frameIdx);
    }

    // Dusk — direct DOM write
    if (duskRef.current) {
      duskRef.current.style.opacity = String(Math.max(0, 1 - p / 0.25));
    }

    const segSize = 1 / TITLES.length;
    const idx     = Math.min(TITLES.length - 1, Math.floor(p / segSize));
    const chars   = TITLES[idx].length;
    const segProg = (p - idx * segSize) / segSize;
    const newRevealed = p < 0.01 ? 0 : Math.min(chars, Math.floor(segProg * chars * 1.5));

    // Title switch — only setState here (fires at most 3 times total)
    if (idx !== lastTitleIdxRef.current) {
      // Reset all spans of the previous title
      const prev = titleSpansRef.current[lastTitleIdxRef.current];
      if (prev) prev.forEach(el => { if (el) { el.style.opacity = "0"; el.style.color = ""; } });
      lastRevealedRef.current = -1;
      lastTitleIdxRef.current = idx;
      setActiveTitleIdx(idx);
    }

    // Character reveal — direct DOM, zero setState
    if (newRevealed !== lastRevealedRef.current) {
      lastRevealedRef.current = newRevealed;
      const spans = titleSpansRef.current[idx];
      if (spans) {
        for (let ci = 0; ci < spans.length; ci++) {
          const el = spans[ci];
          if (!el) continue;
          const revealed = p >= 0.01 && ci < newRevealed;
          el.style.opacity    = revealed ? "1" : "0";
          el.style.color      = (revealed && ci === newRevealed - 1) ? "#abff02" : "";
        }
      }
    }
  }, [drawFrame]);

  // Cache section bounds — recompute only on resize, not on every scroll event
  useEffect(() => {
    const updateBounds = () => {
      const el = sectionRef.current;
      if (!el) return;
      sectionTopRef.current    = el.getBoundingClientRect().top + window.scrollY;
      sectionHeightRef.current = el.offsetHeight;
    };
    updateBounds();
    window.addEventListener("resize", updateBounds, { passive: true });
    return () => window.removeEventListener("resize", updateBounds);
  }, []);

  useEffect(() => {
    const onScroll = () => {
      const sTop = sectionTopRef.current;
      const sH   = sectionHeightRef.current;
      const vh   = window.innerHeight;
      const scrolled = window.scrollY - sTop;
      scrollProgressRef.current = Math.max(0, Math.min(1, scrolled / (sH - vh)));
      if (!rafRef.current) rafRef.current = requestAnimationFrame(tick);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [tick]);

  return (
    <section ref={sectionRef} style={{ position: "relative", height: "350svh" }}>

      <div style={{
        position: "sticky",
        top: 0,
        height: "100svh",
        overflow: "hidden",
        backgroundColor: "#000",
        willChange: "transform",
        contain: "layout style paint",
      }}>
        <canvas
          ref={canvasRef}
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", zIndex: 0, display: "block" }}
        />

        <div
          ref={duskRef}
          style={{
            position: "absolute", inset: 0,
            background: "radial-gradient(ellipse 120% 60% at 70% 45%, rgba(200,114,42,0.35) 0%, rgba(154,79,26,0.22) 25%, transparent 60%)",
            zIndex: 1, pointerEvents: "none",
          }}
        />

        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "15%", background: "linear-gradient(to bottom, rgba(0,0,0,0.5) 0%, transparent 100%)", zIndex: 2, pointerEvents: "none" }} />
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "40%", background: "linear-gradient(to top, rgba(0,0,0,0.85) 0%, transparent 100%)", zIndex: 2, pointerEvents: "none" }} />

        {TITLES.map((title, idx) => {
          const isActive = idx === activeTitleIdx;
          return (
            <h2
              key={idx}
              aria-hidden={!isActive}
              style={{
                position: "absolute",
                bottom: "clamp(3.75rem, 8.4375vw, 8.4375rem)",
                left: "50%",
                transform: "translateX(-50%)",
                width: "min(90vw, 62.5vw)",
                maxWidth: "1000px",
                color: "#fff",
                textAlign: "center",
                fontSize: "clamp(1.75rem, 5.729vw, 5.5rem)",
                fontFamily: "var(--font-primary, 'Inter', sans-serif)",
                fontWeight: 400,
                lineHeight: 1.05,
                letterSpacing: "-0.02em",
                margin: 0,
                opacity: isActive ? 1 : 0,
                transition: "opacity 0.25s ease",
                zIndex: 3,
                pointerEvents: "none",
              }}
            >
              {title.split("").map((char, ci) => (
                <span
                  key={ci}
                  ref={el => {
                    if (!titleSpansRef.current[idx]) titleSpansRef.current[idx] = [];
                    titleSpansRef.current[idx][ci] = el;
                  }}
                  style={{ opacity: 0, transition: "opacity 0.09s ease", display: "inline", willChange: "opacity" }}
                >
                  {char}
                </span>
              ))}
            </h2>
          );
        })}

        <div style={{
          position: "absolute", bottom: "1.25rem", left: "50%", transform: "translateX(-50%)",
          display: "flex", flexDirection: "column", alignItems: "center", gap: "0.375rem",
          opacity: activeTitleIdx === 0 ? 0.55 : 0, transition: "opacity 0.5s ease", zIndex: 4,
        }}>
          <span style={{ fontFamily: "var(--font-mono, monospace)", fontSize: "0.5625rem", letterSpacing: "0.2em", color: "#fff", textTransform: "uppercase" }}>
            scroll
          </span>
          <div className="scroll-line" />
        </div>
      </div>

      <style>{`
        .scroll-line {
          width: 1px; height: 2rem;
          background: rgba(255,255,255,0.35);
          animation: scrollPulse 2s ease-in-out infinite;
        }
        @keyframes scrollPulse {
          0%, 100% { opacity: 0.2; transform: scaleY(0.5); transform-origin: top; }
          50%       { opacity: 0.8; transform: scaleY(1);   transform-origin: top; }
        }
      `}</style>
    </section>
  );
}
