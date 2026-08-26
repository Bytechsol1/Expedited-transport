"use client";

import { useEffect, useRef, useState } from "react";
import PixelTransition from "./PixelTransition";
import { DotField } from "./DotField";

const CARD_W = 340;
const ASPECT = "128%";   // ~ 435 px tall
const GAP = 22;
const SPEED = 0.65;

const TESTIMONIALS = [
  {
    quote: "Deliveries always on time. Expedited Transport never lets us down - our entire supply chain depends on them.",
    name: "Nora Elkind",
    company: "Tri-State Parts",
    photo: "https://img.magnific.com/free-photo/cheerful-entrepreneur_1098-17978.jpg?semt=ais_hybrid&w=740&q=80",
    photoPosition: "center top",
    photoScale: 1,
  },
  {
    quote: "Best freight partner we've had in 15 years of retail operations. Wouldn't consider switching.",
    name: "Leo Hartmann",
    company: "Tynker Retail",
    photo: "https://img.magnific.com/premium-photo/happy-mid-aged-business-man-ceo-standing-office-arms-crossed-smiling-mature-confident-professional-executive-manager-proud-l-ai-generated-illustration_866663-25746.jpg?semt=ais_hybrid&w=740&q=80",
    photoPosition: "center top",
    photoScale: 1,
  },
  {
    quote: "We moved our entire Connecticut distribution through them. Flawless execution every single time.",
    name: "Amira Benali",
    company: "Paloma CT",
    photo: "https://img.magnific.com/free-photo/woman-showing-ok-sign_23-2148990150.jpg?semt=ais_hybrid&w=740&q=80",
    photoPosition: "center top",
    photoScale: 1,
  },
  {
    quote: "Our perishables reach customers fresh because these drivers understand what urgency actually means.",
    name: "Priya Sharma",
    company: "NE Supply Co.",
    photo: "https://img.magnific.com/premium-photo/portrait-young-indian-woman-happy-with-internship-human-resources-opportunity-mission-vision-company-values-goals-face-headshot-gen-z-person-with-hr-job-about-us-faq_590464-134290.jpg",
    photoPosition: "center top",
    photoScale: 1,
  },
  {
    quote: "The team stayed responsive from pickup to delivery and kept the whole move simple.",
    name: "Darnell Brooks",
    company: "North Harbor Logistics",
    photo: "/images/testimonials/darnell-brooks.jpg",
    photoPosition: "center top",
    photoScale: 1,
  },
  {
    quote: "Their communication is clear, and they always handle freight with care.",
    name: "Ethan Keller",
    company: "Blue Ridge Supply",
    photo: "/images/testimonials/ethan-keller.jpg",
    photoPosition: "center top",
    photoScale: 1,
  },
  {
    quote: "We trust them with time-sensitive deliveries because they show up prepared.",
    name: "Maya Ahmed",
    company: "Prime Distribution Co.",
    photo: "/images/testimonials/maya-ahmed.jpg",
    photoPosition: "center top",
    photoScale: 1,
  },
  {
    quote: "Reliable service, fast updates, and a smooth process from start to finish.",
    name: "Marcus Martin",
    company: "Summit Wholesale",
    photo: "/images/testimonials/sofia-martin.jpg",
    photoPosition: "center top",
    photoScale: 1,
  },
];

function TestimonialBack({
  quote, name, company, photo,
}: { quote: string; name: string; company: string; photo: string }) {
  return (
    <div style={{
      width: "100%", height: "100%",
      background: "#000",
      display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center",
      padding: "2rem 1.6rem",
      boxSizing: "border-box",
      textAlign: "center",
      gap: 0,
    }}>
      {/* Avatar */}
      <img
        src={photo}
        alt={name}
        style={{
          width: 76,
          height: 76,
          borderRadius: "50%",
          objectFit: "cover",
          objectPosition: "top center",
          border: "2.5px solid #E31E24",
          marginBottom: "1rem",
          flexShrink: 0,
        }}
      />

      {/* Name */}
      <p style={{
        color: "#ffffff",
        fontWeight: 700,
        fontSize: "1rem",
        fontFamily: "var(--font-primary, 'Inter', sans-serif)",
        margin: "0 0 0.3rem",
        letterSpacing: "-0.01em",
      }}>{name}</p>

      {/* Company */}
      <p style={{
        color: "#FFFFFF",
        fontSize: "0.78rem",
        fontFamily: "var(--font-primary, 'Inter', sans-serif)",
        margin: "0 0 1.1rem",
        fontWeight: 500,
      }}>{company}</p>

      {/* Thin separator */}
      <div style={{
        width: "52%", height: 1,
        background: "rgba(255,255,255,0.12)",
        marginBottom: "1.1rem",
      }} />

      {/* Stars */}
      <div style={{ display: "flex", gap: 3, marginBottom: "1.1rem" }}>
        {[1, 2, 3, 4, 5].map(s => (
          <span key={s} style={{ color: "#f59e0b", fontSize: "1.05rem", lineHeight: 1 }}>*</span>
        ))}
      </div>

      {/* Quote */}
      <p style={{
        color: "rgba(255,255,255,0.76)",
        fontSize: "0.875rem",
        lineHeight: 1.65,
        fontFamily: "var(--font-primary, 'Inter', sans-serif)",
        fontWeight: 400,
        fontStyle: "italic",
        margin: 0,
      }}>
        &ldquo;{quote}&rdquo;
      </p>
    </div>
  );
}

/* Pop wrapper - lifts & scales the card on hover with a spring overshoot */
function PopCard({ children, onEnter, onLeave }: {
  children: React.ReactNode;
  onEnter: () => void;
  onLeave: () => void;
}) {
  const [popped, setPopped] = useState(false);
  return (
    <div
      style={{
        flexShrink: 0,
        position: "relative",
        zIndex: popped ? 10 : 1,
        transform: popped
          ? "scale(1.055) translateY(-10px)"
          : "scale(1) translateY(0px)",
        transition: "transform 0.38s cubic-bezier(0.34, 1.56, 0.64, 1), z-index 0s",
        willChange: "transform",
      }}
      onMouseEnter={() => { setPopped(true); onEnter(); }}
      onMouseLeave={() => { setPopped(false); onLeave(); }}
    >
      {children}
    </div>
  );
}

export function TestimonialsSection() {
  const rowRef = useRef<HTMLDivElement>(null);
  const isPausedRef = useRef(false);
  const posRef = useRef(0);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const row = rowRef.current;
    if (!row) return;
    const setWidth = TESTIMONIALS.length * (CARD_W + GAP);

    function tick() {
      if (!isPausedRef.current) {
        posRef.current += SPEED;
        if (posRef.current >= setWidth) posRef.current -= setWidth;
        row!.style.transform = `translateX(-${posRef.current}px)`;
      }
      rafRef.current = requestAnimationFrame(tick);
    }

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  return (
    <section style={{
      position: "relative",
      height: "100svh",
      background: "#fff",
      display: "flex",
      flexDirection: "column",
      overflow: "hidden",
    }}>
      {/* Dot-grid background */}
      <div style={{ position: "absolute", inset: 0 }}>
        <DotField
          dotRadius={1.8}
          dotSpacing={18}
          bulgeStrength={60}
          glowRadius={0}
          gradientFrom="#9a9a9a"
          gradientTo="#b8b8b8"
          glowColor="#ffffff"
        />
      </div>

      {/* Content */}
      <div style={{
        position: "relative", zIndex: 1,
        display: "flex", flexDirection: "column",
        height: "100%",
      }}>
        {/* Section heading */}
        <div style={{ textAlign: "center", padding: "3rem 1.5rem 2rem", flexShrink: 0 }}>
          <p style={{
            fontFamily: "var(--font-primary, 'Inter', sans-serif)",
            fontSize: "0.65rem", fontWeight: 700,
            letterSpacing: "0.26em", textTransform: "uppercase",
            color: "rgba(0,0,0,0.38)", marginBottom: "0.85rem",
          }}>
            What clients say
          </p>
          <h2 style={{
            fontFamily: "var(--font-primary, 'Inter', sans-serif)",
            fontSize: "clamp(1.9rem, 3.2vw, 2.75rem)",
            fontWeight: 750, color: "#1a1814",
            letterSpacing: "-0.038em", lineHeight: 1.08,
            margin: 0,
          }}>
            Trusted by businesses<br />across Connecticut
          </h2>
        </div>

        {/* Marquee gallery */}
        <div style={{ flex: 1, display: "flex", alignItems: "center", overflow: "hidden" }}>
          <div
            ref={rowRef}
            style={{
              display: "flex",
              gap: GAP,
              willChange: "transform",
              paddingLeft: GAP,
            }}
          >
            {Array.from({ length: 6 }, () => TESTIMONIALS).flat().map((t, i) => (
              <PopCard
                key={i}
                onEnter={() => { isPausedRef.current = true; }}
                onLeave={() => { isPausedRef.current = false; }}
              >
                <PixelTransition
                  firstContent={
                    <img
                      src={t.photo}
                      alt={t.name}
                      style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: t.photoPosition ?? "center top", transform: `scale(${t.photoScale ?? 1})`, transformOrigin: "center top" }}
                    />
                  }
                  secondContent={
                    <TestimonialBack
                      quote={t.quote}
                      name={t.name}
                      company={t.company}
                      photo={t.photo}
                    />
                  }
                  gridSize={8}
                  pixelColor="#E31E24"
                  once={false}
                  animationStepDuration={0.18}
                  style={{ width: CARD_W }}
                  aspectRatio={ASPECT}
                />
              </PopCard>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}






