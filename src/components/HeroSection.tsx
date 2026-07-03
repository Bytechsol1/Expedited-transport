"use client";

import { useEffect, useRef, useState, useCallback } from "react";

const FRAME_COUNT = 240;
const pad = (n: number) => String(n).padStart(5, "0");
const frameSrc = (i: number) => `/frames/frame_${pad(i)}.jpg`;

const TITLES = [
  "Work with a Top Trucking Company",
  "Hotshot, LTL & Dry Van specialists",
  "Serving West Hartford, New Haven & Stamford",
  "Trusted since 2014.",
];

function useFrames() {
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [loadedCount, setLoadedCount] = useState(0);

  useEffect(() => {
    const imgs: HTMLImageElement[] = [];
    let count = 0;
    for (let i = 0; i < FRAME_COUNT; i++) {
      const img = new Image();
      img.src = frameSrc(i);
      img.onload = img.onerror = () => {
        count++;
        setLoadedCount(count);
        if (count === FRAME_COUNT) setLoaded(true);
      };
      imgs.push(img);
    }
    imagesRef.current = imgs;
  }, []);

  return { imagesRef, loaded, loadedCount };
}

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const duskRef = useRef<HTMLDivElement>(null);

  // Continuous scroll values live in refs — no React re-renders on scroll
  const scrollProgressRef = useRef(0);
  const rafRef = useRef<number | null>(null);
  const lastFrameRef = useRef(-1);
  const lastTitleIdxRef = useRef(-1);
  const loadedRef = useRef(false);

  // Only discrete JSX-driving values need state
  const [activeTitleIdx, setActiveTitleIdx] = useState(0);
  const [revealedChars, setRevealedChars] = useState(0);

  const { imagesRef, loaded, loadedCount } = useFrames();

  // Keep loadedRef in sync without closure staleness in RAF
  useEffect(() => { loadedRef.current = loaded; }, [loaded]);

  // Draw directly to canvas — called from RAF, zero React overhead
  const drawFrame = useCallback((frameIdx: number) => {
    const canvas = canvasRef.current;
    const images = imagesRef.current;
    if (!canvas || !images.length) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const img = images[frameIdx];
    if (!img || !img.complete || img.naturalWidth === 0) return;
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = "high";
    const cw = canvas.width, ch = canvas.height;
    const iw = img.naturalWidth, ih = img.naturalHeight;
    const scale = Math.max(cw / iw, ch / ih);
    const dw = iw * scale, dh = ih * scale;
    const dx = (cw - dw) / 2, dy = (ch - dh) / 2;
    ctx.fillStyle = "#000";
    ctx.fillRect(0, 0, cw, ch);
    ctx.drawImage(img, dx, dy, dw, dh);
  }, []);

  // Sync canvas resolution to element size
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const sync = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      if (loadedRef.current && lastFrameRef.current >= 0) drawFrame(lastFrameRef.current);
    };
    sync();
    const ro = new ResizeObserver(sync);
    ro.observe(canvas);
    return () => ro.disconnect();
  }, [drawFrame]);

  // Draw frame 0 as soon as images finish loading
  useEffect(() => {
    if (loaded && lastFrameRef.current < 0) {
      lastFrameRef.current = 0;
      drawFrame(0);
    }
  }, [loaded, drawFrame]);

  // RAF tick — canvas draw + DOM mutations, minimal setState
  const tick = useCallback(() => {
    rafRef.current = null;
    const p = scrollProgressRef.current;

    // Canvas frame — only redraw when index actually changes
    const frameIdx = Math.min(FRAME_COUNT - 1, Math.max(0, Math.round(p * (FRAME_COUNT - 1))));
    if (frameIdx !== lastFrameRef.current && loadedRef.current) {
      lastFrameRef.current = frameIdx;
      drawFrame(frameIdx);
    }

    // Dusk overlay — direct DOM write, no re-render
    if (duskRef.current) {
      duskRef.current.style.opacity = String(Math.max(0, 1 - p / 0.25));
    }

    // Title index — setState only when discrete value changes
    const segSize = 1 / TITLES.length;
    const idx = Math.min(TITLES.length - 1, Math.floor(p / segSize));
    const segProgress = (p - idx * segSize) / segSize;
    const chars = TITLES[idx].length;
    const newRevealedChars = p < 0.01 ? 0 : Math.min(chars, Math.floor(segProgress * chars * 1.5));

    if (idx !== lastTitleIdxRef.current) {
      lastTitleIdxRef.current = idx;
      setActiveTitleIdx(idx);
    }
    setRevealedChars(newRevealedChars);
  }, [drawFrame]);

  // Passive scroll listener → schedules RAF, never blocks scroll thread
  useEffect(() => {
    const onScroll = () => {
      const el = sectionRef.current;
      if (!el) return;
      const { top, height } = el.getBoundingClientRect();
      const vh = window.innerHeight;
      scrollProgressRef.current = Math.max(0, Math.min(1, -top / (height - vh)));
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

      {/* Sticky viewport */}
      <div
        style={{
          position: "sticky",
          top: 0,
          height: "100svh",
          overflow: "hidden",
          backgroundColor: "#000",
          willChange: "transform",
          contain: "layout style paint",
        }}
      >
        <canvas
          ref={canvasRef}
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            zIndex: 0,
            display: "block",
          }}
        />

        {/* Dusk — opacity driven via DOM ref, never triggers React re-render */}
        <div
          ref={duskRef}
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(ellipse 120% 60% at 70% 45%, rgba(200,114,42,0.35) 0%, rgba(154,79,26,0.22) 25%, transparent 60%)",
            zIndex: 1,
            pointerEvents: "none",
          }}
        />

        {/* Top fade */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "15%",
            background: "linear-gradient(to bottom, rgba(0,0,0,0.5) 0%, transparent 100%)",
            zIndex: 2,
            pointerEvents: "none",
          }}
        />

        {/* Bottom fade */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: "40%",
            background: "linear-gradient(to top, rgba(0,0,0,0.85) 0%, transparent 100%)",
            zIndex: 2,
            pointerEvents: "none",
          }}
        />

        {/* Title sequence */}
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
              {title.split("").map((char, ci) => {
                const revealed = isActive && ci < revealedChars;
                const isFlash = isActive && ci === revealedChars - 1;
                return (
                  <span
                    key={ci}
                    style={{
                      opacity: revealed ? 1 : 0,
                      transition: `opacity 0.09s ease ${ci * 0.012}s`,
                      display: "inline",
                      willChange: "opacity",
                      color: isFlash ? "#abff02" : "inherit",
                    }}
                  >
                    {char}
                  </span>
                );
              })}
            </h2>
          );
        })}

        {/* Scroll indicator */}
        <div
          style={{
            position: "absolute",
            bottom: "1.25rem",
            left: "50%",
            transform: "translateX(-50%)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "0.375rem",
            opacity: activeTitleIdx === 0 ? 0.55 : 0,
            transition: "opacity 0.5s ease",
            zIndex: 4,
          }}
        >
          <span
            style={{
              fontFamily: "var(--font-mono, monospace)",
              fontSize: "0.5625rem",
              letterSpacing: "0.2em",
              color: "#fff",
              textTransform: "uppercase",
            }}
          >
            scroll
          </span>
          <div className="scroll-line" />
        </div>
      </div>

      <style>{`
        .scroll-line {
          width: 1px;
          height: 2rem;
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
