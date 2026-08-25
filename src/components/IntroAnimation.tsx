"use client";
import { useEffect, useState } from "react";
import Image from "next/image";

/* Rounded rect outlines positioned in full-viewport coordinates (vh/vw) */
const RECTS: React.CSSProperties[] = [
  { top: "-9vh",  left:  "-7vw",  width: "42vw", height: "54vh" },
  { top: "-5vh",  right: "-5vw",  width: "33vw", height: "40vh" },
  { top: "26vh",  left: "-13vw",  width: "38vw", height: "46vh" },
  { top: "17vh",  right: "-7vw",  width: "50vw", height: "60vh" },
  { top: "60vh",  left:  "-5vw",  width: "32vw", height: "46vh" },
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

export function IntroAnimation({ siteReady }: { siteReady: boolean }) {
  const [phase, setPhase] = useState<"hold" | "exit" | "done">("hold");

  /* Lock body scroll only during hold — release the moment curtains start moving */
  useEffect(() => {
    if (phase !== "hold") return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = prev; };
  }, [phase]);

  /* Exit as soon as frames are ready — small delay so it feels intentional */
  useEffect(() => {
    if (!siteReady || phase !== "hold") return;
    const t1 = setTimeout(() => setPhase("exit"), 300);
    const t2 = setTimeout(() => setPhase("done"), 300 + 950);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, [siteReady, phase]);

  /* Safety timeout — split open after 10 s even if images never finish */
  useEffect(() => {
    const t1 = setTimeout(() => setPhase(p => p === "hold" ? "exit" : p), 10000);
    const t2 = setTimeout(() => setPhase(p => p !== "done"  ? "done"  : p), 10950);
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
        <div style={{ position: "absolute", top: "-50vh", left: 0, right: 0, height: "100vh" }}>
          <RectLayout />
        </div>
      </div>

      {/* ── Logo + name + loading dots ── */}
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
          src="/ex-icon.svg"
          alt="Expedited icon"
          width={163}
          height={100}
          style={{ objectFit: "contain", width: "163px", height: "auto" }}
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

        {/* Loading dots — hidden once ready */}
        {!siteReady && (
          <div style={{ display: "flex", gap: "6px", marginTop: "1.5rem" }}>
            {[0, 1, 2].map(i => (
              <div
                key={i}
                style={{
                  width: "5px",
                  height: "5px",
                  borderRadius: "50%",
                  background: "#052424",
                  opacity: 0.35,
                  animation: "introDot 1.2s ease-in-out infinite",
                  animationDelay: `${i * 0.2}s`,
                }}
              />
            ))}
          </div>
        )}
      </div>

      <style>{`
        @keyframes introDot {
          0%, 80%, 100% { opacity: 0.2; transform: scale(0.8); }
          40%            { opacity: 0.8; transform: scale(1.2); }
        }
      `}</style>
    </>
  );
}
