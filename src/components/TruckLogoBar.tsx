"use client";

import LogoLoop from "./LogoLoop";

const LOGOS = [
  { src: "/logos/fedex.png",     alt: "FedEx Freight",         title: "FedEx Freight" },
  { src: "/logos/dhl.png",       alt: "DHL Express",            title: "DHL Express" },
  { src: "/logos/xpo.png",       alt: "XPO Logistics",          title: "XPO Logistics" },
  { src: "/logos/tforce.png",    alt: "TForce Freight",         title: "TForce Freight" },
  { src: "/logos/odfl.png",      alt: "Old Dominion Freight",   title: "Old Dominion" },
  { src: "/logos/amazon.png",    alt: "Amazon Logistics",       title: "Amazon Logistics" },
  { src: "/logos/arcbest.png",   alt: "ArcBest",                title: "ArcBest" },
  { src: "/logos/jbhunt.svg",    alt: "J.B. Hunt Transport",    title: "J.B. Hunt" },
  { src: "/logos/schneider.svg", alt: "Schneider National",     title: "Schneider" },
  { src: "/logos/werner.svg",    alt: "Werner Enterprises",     title: "Werner" },
];

export function TruckLogoBar() {
  return (
    <section style={{
      background: "#fff",
      padding: "3rem 0 2.8rem",
      borderBottom: "1px solid rgba(0,0,0,0.06)",
    }}>
      <p style={{
        textAlign: "center",
        fontFamily: "var(--font-primary, 'Inter', sans-serif)",
        fontSize: "0.62rem",
        fontWeight: 700,
        letterSpacing: "0.24em",
        textTransform: "uppercase",
        color: "rgba(0,0,0,0.3)",
        margin: "0 0 2rem",
      }}>
        Trusted by industry leaders
      </p>
      <style>{`
        .truck-logo-loop img {
          opacity: 0.85;
          transition: opacity 0.2s ease;
        }
        .truck-logo-loop img:hover {
          opacity: 1;
        }
      `}</style>
      <LogoLoop
        logos={LOGOS}
        speed={90}
        direction="left"
        logoHeight={32}
        gap={80}
        hoverSpeed={18}
        fadeOut
        fadeOutColor="#ffffff"
        ariaLabel="Trucking industry partners"
        className="truck-logo-loop"
      />
    </section>
  );
}
