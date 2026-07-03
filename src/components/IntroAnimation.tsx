"use client";
import { useEffect, useState } from "react";
import Image from "next/image";

/* Rounded rect outlines positioned in full-viewport coordinates (vh/vw) */
const RECTS: React.CSSProperties[] = [
  // Top-left — large, bleeds off top & left edges
  { top: "-9vh",  left:  "-7vw",  width: "42vw", height: "54vh" },
  // Top-right — medium, bleeds off top & right
  { top: "-5vh",  right: "-5vw",  width: "33vw", height: "40vh" },
  // Left-middle — bleeds off left edge
  { top: "26vh",  left: "-13vw",  width: "38vw", height: "46vh" },
  // Right-large — bleeds off right edge
  { top: "17vh",  right: "-7vw",  width: "50vw", height: "60vh" },
  // Bottom-left — bleeds off left & bottom
  { top: "60vh",  left:  "-5vw",  width: "32vw", height: "46vh" },
  // Bottom-right pair
  { top: "52vh",  right:  "1vw",  width: "25vw", height: "52vh" },
  { top: "69vh",  right:  "7vw",  width: "16vw", height: "34vh" },
];

function RectLayout() {
  return (
    <div style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
      {RECTS.map((style, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            border: "1.5px solid rgba(0,0,0,0.07)",
            borderRadius: "3.5rem",
            ...style,
          }}
        />
      ))}
    </div>
  );
}

export function IntroAnimation() {
  const [phase, setPhase] = useState<"hold" | "exit" | "done">("hold");

  /* Lock body scroll while intro is visible */
  useEffect(() => {
    if (phase === "done") return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = prev; };
  }, [phase]);

  useEffect(() => {
    /* Show only once per browser session */
    if (sessionStorage.getItem("ets_intro_shown")) {
      setPhase("done");
      return;
    }
    sessionStorage.setItem("ets_intro_shown", "1");

    const t1 = setTimeout(() => setPhase("exit"), 1600);
    const t2 = setTimeout(() => setPhase("done"), 1600 + 950);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  if (phase === "done") return null;

  const exiting = phase === "exit";
  const EASE = "transform 0.95s cubic-bezier(0.76, 0, 0.24, 1)";
  const BG   = "#ebebeb";

  return (
    <>
      {/* ── Top curtain (0 → 50vh) ── */}
      <div style={{
        position: "fixed", top: 0, left: 0, right: 0,
        height: "50vh",
        background: BG,
        overflow: "hidden",
        zIndex: 9999,
        transform: exiting ? "translateY(-100%)" : "translateY(0)",
        transition: exiting ? EASE : "none",
      }}>
        {/*
          Full-viewport inner layer: rects are positioned in 100vh space.
          overflow:hidden on parent clips at 50vh — shows only top half.
        */}
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "100vh" }}>
          <RectLayout />
        </div>
      </div>

      {/* ── Bottom curtain (50vh → 100vh) ── */}
      <div style={{
        position: "fixed", bottom: 0, left: 0, right: 0,
        height: "50vh",
        background: BG,
        overflow: "hidden",
        zIndex: 9999,
        transform: exiting ? "translateY(100%)" : "translateY(0)",
        transition: exiting ? EASE : "none",
      }}>
        {/*
          Shift up by 50vh so rects appear at the same viewport positions
          they occupy in the top curtain — overflow:hidden shows only bottom half.
        */}
        <div style={{ position: "absolute", top: "-50vh", left: 0, right: 0, height: "100vh" }}>
          <RectLayout />
        </div>
      </div>

      {/* ── Logo — sits above both curtains, fades out before the split ── */}
      <div style={{
        position: "fixed", inset: 0,
        zIndex: 10000,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        pointerEvents: "none",
        opacity: exiting ? 0 : 1,
        transition: exiting ? "opacity 0.2s ease" : "none",
      }}>
        <Image
          src="/logo.png"
          alt="Expedited Transport Services logo"
          width={88}
          height={88}
          style={{ objectFit: "contain" }}
          priority
        />
        <p style={{
          margin: "0.9rem 0 0",
          fontFamily: "var(--font-primary, 'Inter', sans-serif)",
          fontSize: "clamp(0.55rem, 1.1vw, 0.78rem)",
          fontWeight: 700,
          letterSpacing: "0.24em",
          textTransform: "uppercase",
          color: "#052424",
        }}>
          Expedited Transport Services
        </p>
      </div>
    </>
  );
}
