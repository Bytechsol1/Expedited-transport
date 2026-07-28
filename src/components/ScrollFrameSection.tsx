"use client";

import { useEffect, useRef, useState, useCallback } from "react";

const FRAME_COUNT = 230;
const pad = (n: number) => String(n).padStart(5, "0");
const frameSrc = (i: number) => `/frames2/frame_${pad(i)}.webp`;

const CAPTIONS = [
  { heading: "Precision in Motion",    body: "Every mile is planned. Every load is secured." },
  { heading: "Built for the Long Haul", body: "Our fleet is engineered for reliability across any terrain." },
  { heading: "On Time, Every Time",    body: "We don't just promise delivery — we guarantee it." },
  { heading: "Your Cargo, Our Priority", body: "Transparent pricing. Zero hidden fees. Unlimited trust." },
];

function useFrames2() {
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const imgs: HTMLImageElement[] = [];
    let count = 0;
    for (let i = 0; i < FRAME_COUNT; i++) {
      const img = new Image();
      img.decoding = "async";
      img.src = frameSrc(i);
      // No setLoadedCount — eliminates 230 re-renders during load
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

export function ScrollFrameSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);

  // Continuous scroll values in refs — no re-renders on scroll
  const scrollProgressRef  = useRef(0);
  const rafRef             = useRef<number | null>(null);
  const lastFrameRef       = useRef(-1);
  const lastAlphaRef       = useRef(-1);
  const lastCaptionIdxRef  = useRef(-1);
  const loadedRef          = useRef(false);
  const ctxRef             = useRef<CanvasRenderingContext2D | null>(null);
  const sectionHeightRef   = useRef(0);

  // Only discrete JSX-driving values need state
  const [activeCaptionIdx, setActiveCaptionIdx] = useState(0);
  const [captionVisible, setCaptionVisible] = useState(false);
  const lastCaptionVisibleRef = useRef(false);

  const { imagesRef, loaded } = useFrames2();

  useEffect(() => { loadedRef.current = loaded; }, [loaded]);

  // Direct canvas draw — zero React overhead
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

  // Cross-fades frame idxLow into idxHigh by `alpha` — with only ~230 stills
  // covering the whole scroll range, snapping straight to the nearest frame
  // reads as a slideshow; blending the two frames either side of the exact
  // scroll position fakes the missing in-between motion and reads as smooth.
  const drawBlended = useCallback((idxLow: number, idxHigh: number, alpha: number) => {
    const ctx = ctxRef.current;
    if (!ctx) return;
    drawFrame(idxLow);
    if (idxHigh !== idxLow && alpha > 0.001) {
      ctx.globalAlpha = alpha;
      drawFrame(idxHigh);
      ctx.globalAlpha = 1;
    }
  }, [drawFrame]);

  // Sync canvas resolution
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    ctxRef.current = canvas.getContext("2d");
    if (ctxRef.current) {
      ctxRef.current.imageSmoothingEnabled = true;
      ctxRef.current.imageSmoothingQuality = "medium";
    }
    const sync = () => {
      // Cap DPR at 1 — quarters pixel count on retina, eliminates upscaling cost
      const rect = canvas.getBoundingClientRect();
      canvas.width  = rect.width;
      canvas.height = rect.height;
      // Restore smoothing after canvas resize (resize resets context state)
      if (ctxRef.current) {
        ctxRef.current.imageSmoothingEnabled = true;
        ctxRef.current.imageSmoothingQuality = "medium";
      }
      if (loadedRef.current && lastFrameRef.current >= 0) {
        const idxHigh = Math.min(FRAME_COUNT - 1, lastFrameRef.current + 1);
        drawBlended(lastFrameRef.current, idxHigh, Math.max(0, lastAlphaRef.current));
      }
    };
    sync();
    const ro = new ResizeObserver(sync);
    ro.observe(canvas);
    return () => ro.disconnect();
  }, [drawFrame, drawBlended]);

  useEffect(() => {
    if (loaded && lastFrameRef.current < 0) {
      lastFrameRef.current = 0;
      lastAlphaRef.current = 0;
      drawFrame(0);
    }
  }, [loaded, drawFrame]);

  // RAF tick — canvas draw + DOM mutations, minimal setState
  const tick = useCallback(() => {
    rafRef.current = null;
    const p = scrollProgressRef.current;

    // Canvas frame — blend the two frames straddling the exact scroll
    // position instead of snapping to the nearest integer frame.
    const raw     = Math.max(0, Math.min(FRAME_COUNT - 1, p * (FRAME_COUNT - 1)));
    const idxLow  = Math.floor(raw);
    const idxHigh = Math.min(FRAME_COUNT - 1, idxLow + 1);
    const alpha   = raw - idxLow;
    if (loadedRef.current && (idxLow !== lastFrameRef.current || Math.abs(alpha - lastAlphaRef.current) > 0.004)) {
      lastFrameRef.current = idxLow;
      lastAlphaRef.current = alpha;
      drawBlended(idxLow, idxHigh, alpha);
    }

    // Progress bar — direct DOM write
    if (progressBarRef.current) {
      progressBarRef.current.style.width = `${p * 100}%`;
    }

    // Caption index — setState only on change
    const segSize = 1 / CAPTIONS.length;
    const idx = Math.min(CAPTIONS.length - 1, Math.floor(p / segSize));
    const newVisible = p > 0.03;

    if (idx !== lastCaptionIdxRef.current) {
      lastCaptionIdxRef.current = idx;
      setActiveCaptionIdx(idx);
    }
    // Guard against redundant setState on every tick
    if (newVisible !== lastCaptionVisibleRef.current) {
      lastCaptionVisibleRef.current = newVisible;
      setCaptionVisible(newVisible);
    }
  }, [drawBlended]);

  // Cache section height — recompute only on resize, not on every scroll event
  useEffect(() => {
    const updateHeight = () => {
      const el = sectionRef.current;
      if (!el) return;
      sectionHeightRef.current = el.offsetHeight;
    };
    updateHeight();
    window.addEventListener("resize", updateHeight, { passive: true });
    return () => window.removeEventListener("resize", updateHeight);
  }, []);

  // Passive scroll listener → RAF scheduled
  useEffect(() => {
    const onScroll = () => {
      const el = sectionRef.current;
      if (!el) return;
      // Read live rather than caching an absolute scrollY-based offset —
      // see the matching note in HeroSection.tsx.
      const sTop = el.getBoundingClientRect().top;
      const sH   = sectionHeightRef.current;
      const vh   = window.innerHeight;
      const scrolled = -sTop;
      scrollProgressRef.current = Math.max(0, Math.min(1, scrolled / (sH - vh)));
      if (!rafRef.current) rafRef.current = requestAnimationFrame(tick);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener("scroll", onScroll);
      // See the matching note in HeroSection.tsx: cancelling a pending rAF
      // does not clear the stored id, so it must be nulled here or a
      // navigate-away that unmounts mid-frame permanently blocks future
      // scheduling. Reset the "last drawn" trackers too so the next tick
      // can't mistake a stale value for "already up to date."
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
      lastFrameRef.current = -1;
      lastAlphaRef.current = -1;
      lastCaptionIdxRef.current = -1;
      lastCaptionVisibleRef.current = false;
    };
  }, [tick]);

  return (
    <section
      ref={sectionRef}
      style={{ position: "relative", height: "400svh" }}
    >
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

        {/* Section label */}
        <div
          style={{
            position: "absolute",
            bottom: "3.25rem",
            left: "50%",
            transform: "translateX(-50%)",
            display: "flex",
            alignItems: "center",
            gap: "0.75rem",
            zIndex: 6,
            pointerEvents: "none",
          }}
        >
          <div style={{ width: "2rem", height: "1px", background: "rgba(182,240,0,0.6)" }} />
          <span
            style={{
              fontFamily: "var(--font-mono, monospace)",
              fontSize: "0.8rem",
              fontWeight: 600,
              letterSpacing: "0.3em",
              textTransform: "uppercase",
              color: "rgba(182,240,0,0.9)",
              whiteSpace: "nowrap",
            }}
          >
            About Us
          </span>
          <div style={{ width: "2rem", height: "1px", background: "rgba(182,240,0,0.6)" }} />
        </div>

        {/* Gradient overlays */}
        <div
          style={{
            position: "absolute",
            top: 0, left: 0, right: 0,
            height: "18%",
            background: "linear-gradient(to bottom, rgba(0,0,0,0.6) 0%, transparent 100%)",
            zIndex: 2,
            pointerEvents: "none",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: 0, left: 0, right: 0,
            height: "45%",
            background: "linear-gradient(to top, rgba(0,0,0,0.9) 0%, transparent 100%)",
            zIndex: 2,
            pointerEvents: "none",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "radial-gradient(ellipse 100% 100% at 50% 50%, transparent 40%, rgba(0,0,0,0.55) 100%)",
            zIndex: 2,
            pointerEvents: "none",
          }}
        />

        {/* Caption overlays */}
        {CAPTIONS.map((caption, idx) => {
          const isActive = idx === activeCaptionIdx;
          const show = captionVisible && isActive;
          const isTop   = idx < 2;
          const isRight = idx % 2 === 1;
          const edge    = "clamp(4.5rem, 7vw, 7rem)";
          const side    = "clamp(2rem, 4vw, 4rem)";
          const enterY  = isTop ? "-18px" : "18px";

          const posStyle: React.CSSProperties = {
            position: "absolute",
            zIndex: 5,
            pointerEvents: "none",
            maxWidth: "340px",
            textAlign: isRight ? "right" : "left",
            ...(isTop   ? { top:    edge } : { bottom: edge }),
            ...(isRight ? { right:  side } : { left:   side }),
            opacity: show ? 1 : 0,
            transform: show ? "translateY(0px)" : `translateY(${enterY})`,
            transition: "opacity 0.6s cubic-bezier(0.16,1,0.3,1), transform 0.6s cubic-bezier(0.16,1,0.3,1)",
          };

          return (
            <div key={idx} style={posStyle}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  marginBottom: "0.625rem",
                  justifyContent: isRight ? "flex-end" : "flex-start",
                }}
              >
                <div style={{ width: "1.75rem", height: "1px", background: "rgba(182,240,0,0.7)" }} />
                <span
                  style={{
                    fontFamily: "var(--font-mono, monospace)",
                    fontSize: "0.6rem",
                    letterSpacing: "0.22em",
                    color: "rgba(182,240,0,0.85)",
                    textTransform: "uppercase",
                  }}
                >
                  {String(idx + 1).padStart(2, "0")} / {String(CAPTIONS.length).padStart(2, "0")}
                </span>
                <div style={{ width: "1.75rem", height: "1px", background: "rgba(182,240,0,0.7)" }} />
              </div>

              <h2
                style={{
                  color: "#fff",
                  fontSize: "clamp(1.1rem, 2vw, 1.75rem)",
                  fontFamily: "var(--font-primary, 'Inter', sans-serif)",
                  fontWeight: 500,
                  lineHeight: 1.15,
                  letterSpacing: "-0.02em",
                  margin: "0 0 0.5rem",
                }}
              >
                {caption.heading}
              </h2>
              <p
                style={{
                  color: "rgba(255,255,255,0.6)",
                  fontSize: "clamp(0.75rem, 1vw, 0.9rem)",
                  fontFamily: "var(--font-primary, 'Inter', sans-serif)",
                  fontWeight: 400,
                  lineHeight: 1.55,
                  margin: 0,
                }}
              >
                {caption.body}
              </p>
            </div>
          );
        })}

        {/* Progress scrubber — inner bar updated via DOM ref */}
        <div
          style={{
            position: "absolute",
            bottom: "1.5rem",
            left: "50%",
            transform: "translateX(-50%)",
            width: "min(90vw, 28rem)",
            height: "2px",
            background: "rgba(255,255,255,0.15)",
            borderRadius: "9999px",
            zIndex: 6,
            overflow: "hidden",
          }}
        >
          <div
            ref={progressBarRef}
            style={{
              height: "100%",
              width: "0%",
              background: "linear-gradient(90deg, #abff02, #6bde00)",
              borderRadius: "9999px",
            }}
          />
        </div>
      </div>
    </section>
  );
}
