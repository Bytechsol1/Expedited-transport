"use client";

import { useEffect, useRef, useState, useCallback } from "react";

const FRAME_COUNT = 240;
const pad = (n: number) => String(n).padStart(5, "0");
const frameSrc = (i: number) => `/frames2/frame_${pad(i)}.jpg`;

const CAPTIONS = [
  { heading: "Precision in Motion",    body: "Every mile is planned. Every load is secured." },
  { heading: "Built for the Long Haul", body: "Our fleet is engineered for reliability across any terrain." },
  { heading: "On Time, Every Time",    body: "We don't just promise delivery — we guarantee it." },
  { heading: "Your Cargo, Our Priority", body: "Transparent pricing. Zero hidden fees. Unlimited trust." },
];

function useFrames2() {
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

export function ScrollFrameSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);

  // Continuous scroll values in refs — no re-renders on scroll
  const scrollProgressRef = useRef(0);
  const rafRef = useRef<number | null>(null);
  const lastFrameRef = useRef(-1);
  const lastCaptionIdxRef = useRef(-1);
  const loadedRef = useRef(false);

  // Only discrete JSX-driving values need state
  const [activeCaptionIdx, setActiveCaptionIdx] = useState(0);
  const [captionVisible, setCaptionVisible] = useState(false);

  const { imagesRef, loaded, loadedCount } = useFrames2();

  useEffect(() => { loadedRef.current = loaded; }, [loaded]);

  // Direct canvas draw — zero React overhead
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

  // Sync canvas resolution
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

    // Canvas frame
    const frameIdx = Math.min(FRAME_COUNT - 1, Math.max(0, Math.round(p * (FRAME_COUNT - 1))));
    if (frameIdx !== lastFrameRef.current && loadedRef.current) {
      lastFrameRef.current = frameIdx;
      drawFrame(frameIdx);
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
    // captionVisible is boolean — cheap setState, only flips once
    setCaptionVisible(newVisible);
  }, [drawFrame]);

  // Passive scroll listener → RAF scheduled
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

  const pct = Math.round(loadedCount / FRAME_COUNT * 100);
  void pct;

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
