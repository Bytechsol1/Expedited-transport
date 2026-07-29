"use client";

import Link from "next/link";
import SplitText from "./SplitText";

/* Payment logos -- all four SVGs (from datatrans/payment-logos, CC BY-SA
   4.0) share the same 120x80 card-frame viewBox with the rounded
   background baked in, so a single uniform height keeps them perfectly
   aligned without any per-logo padding correction. */
const PAYMENT_LOGO_STYLE: React.CSSProperties = {
  height: "36px",
  width: "auto",
  flexShrink: 0,
  display: "block",
};
const HOURS = [
  { day: "Mon – Sun", time: "24 Hours" },
  { day: "Emergency Services", time: "Available" },
];

const DIVIDER: React.CSSProperties = {
  borderTop: "1px solid rgba(255,255,255,0.08)",
  margin: 0,
};

const SECTION_LABEL: React.CSSProperties = {
  display: "block",
  color: "#ffffff",
  fontSize: "0.72rem",
  fontWeight: 700,
  letterSpacing: "0.22em",
  textTransform: "uppercase",
  marginBottom: "1.2rem",
};

/* ── Footer ─────────────────────────────────────────────────── */
export function FooterSection() {
  return (
    <footer style={{
      position: "relative",
      background: "#000",
      color: "#fff",
      fontFamily: "var(--font-primary, 'Inter', sans-serif)",
      paddingTop: "5rem",
    }}>

      {/* ── Main info grid ── */}
      <div className="footer-grid">

        {/* Contact */}
        <div>
          <span style={SECTION_LABEL}>Contact</span>
          <p style={{ fontSize: "0.95rem", color: "rgba(255,255,255,0.65)", margin: "0 0 0.5rem" }}>
            West Hartford, CT 06110
          </p>
          <a
            href="tel:+18609883887"
            style={{ display: "block", color: "rgba(255,255,255,0.52)", textDecoration: "none", fontSize: "0.93rem", marginBottom: "0.4rem" }}
            onMouseEnter={e => (e.currentTarget.style.color = "#b6f000")}
            onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.52)")}
          >
            (860) 988-3887
          </a>
          <a
            href="mailto:info@expeditedtransportservices.net"
            style={{ display: "block", color: "rgba(255,255,255,0.52)", textDecoration: "none", fontSize: "0.93rem", marginBottom: "0.9rem", wordBreak: "break-all" }}
            onMouseEnter={e => (e.currentTarget.style.color = "#b6f000")}
            onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.52)")}
          >
            info@expeditedtransportservices.net
          </a>
          <p style={{ color: "rgba(255,255,255,0.28)", fontSize: "0.87rem", margin: 0 }}>
            License #: DOT 2566125
          </p>
        </div>

        {/* Hours */}
        <div>
          <span style={SECTION_LABEL}>Hours of Operation</span>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
            {HOURS.map(({ day, time }) => (
              <div
                key={day}
                style={{ display: "flex", justifyContent: "space-between", maxWidth: 260, fontSize: "0.93rem" }}
              >
                <span style={{ color: "rgba(255,255,255,0.45)" }}>{day}</span>
                <span style={{ color: time === "Available" ? "#b6f000" : "#fff", fontWeight: time === "24 Hours" ? 600 : 400 }}>
                  {time}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <span style={SECTION_LABEL}>Quick Links</span>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.55rem" }}>
            {[
              { label: "Services", href: "/trucking-services/expedited-trucking" },
              { label: "About Us", href: "/about-us" },
              { label: "Careers", href: "/careers" },
            ].map(({ label, href }) => (
              <Link
                key={label}
                href={href}
                style={{ color: "rgba(255,255,255,0.52)", textDecoration: "none", fontSize: "0.93rem" }}
                onMouseEnter={e => (e.currentTarget.style.color = "#b6f000")}
                onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.52)")}
              >
                {label}
              </Link>
            ))}
          </div>
        </div>

        {/* Payment */}
        <div>
          <span style={SECTION_LABEL}>Payment Methods</span>
          <div
            style={{
              display: "flex",
              flexWrap: "nowrap",
              alignItems: "center",
              gap: "0.625rem",
              overflowX: "auto",
              overflowY: "hidden",
              whiteSpace: "nowrap",
              paddingBottom: "0",
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/payment/visa.svg" alt="Visa" style={PAYMENT_LOGO_STYLE} />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/payment/mastercard.svg" alt="Mastercard" style={PAYMENT_LOGO_STYLE} />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/payment/amex-badge.svg" alt="American Express" style={PAYMENT_LOGO_STYLE} />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/payment/discover.svg" alt="Discover" style={PAYMENT_LOGO_STYLE} />
          </div>
        </div>
      </div>

      <hr style={DIVIDER} />

      {/* ── Bottom meta ── */}
      <div className="footer-meta">
        <span style={{ color: "rgba(255,255,255,0.3)", fontSize: "0.78rem" }}>
          ©2024–26 Expedited Transport Services. All rights reserved.
        </span>
        <div style={{ display: "flex", gap: "2rem" }}>
          {["Terms of Use", "Privacy Policy"].map(item => (
            <a
              key={item}
              href="#"
              style={{ color: "rgba(255,255,255,0.3)", fontSize: "0.78rem", textDecoration: "none" }}
              onMouseEnter={e => (e.currentTarget.style.color = "rgba(255,255,255,0.7)")}
              onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.3)")}
            >
              {item}
            </a>
          ))}
        </div>
      </div>

      {/* ── Big SplitText brand name — links to home ── */}
      <Link href="/" style={{ display: "block", overflow: "hidden", padding: "0 0 2.5rem", textDecoration: "none", cursor: "pointer" }}>
        <SplitText
          text="EXPEDITED"
          tag="p"
          splitType="chars"
          delay={80}
          duration={1.2}
          ease="power4.out"
          from={{ opacity: 0, y: 120, rotateX: -30 }}
          to={{ opacity: 1, y: 0, rotateX: 0 }}
          threshold={0.05}
          rootMargin="0px"
          textAlign="center"
          className="footer-expedited-text"
        />
      </Link>

      <div className="back-to-top-wrap">
        <button
          type="button"
          aria-label="Back to top"
          className="back-to-top-btn"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          <svg className="back-to-top-arrow" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M8 13V3M8 3L3.5 7.5M8 3l4.5 4.5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>

      <style>{`
        /* ── Desktop grid ── */
        .footer-grid {
          display: grid;
          grid-template-columns: 1.2fr 1fr 0.8fr 1fr;
          padding: 4rem 4rem 3.5rem;
          gap: 2.5rem;
        }
        .footer-meta {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 1.4rem 4rem;
        }

        /* Sits at the true bottom-right corner of the footer, over the
           watermark. The button's own hit-box stays perfectly still --
           only the arrow icon inside it bounces -- so the continuous
           motion never makes the click target harder to hit. */
        .back-to-top-wrap {
          position: absolute;
          right: 2.5rem;
          bottom: 2.5rem;
          z-index: 90;
        }

        .back-to-top-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          width: 44px;
          height: 44px;
          border-radius: 50%;
          background: #b6f000;
          border: 1px solid #b6f000;
          color: #0a0f00;
          cursor: pointer;
          padding: 0;
          transition: background 0.2s ease, border-color 0.2s ease, color 0.2s ease, transform 0.2s ease;
        }

        .back-to-top-btn:hover {
          background: #cbff1a;
          border-color: #cbff1a;
          color: #0a0f00;
          transform: scale(1.1);
        }

        .back-to-top-btn:active {
          transform: scale(0.96);
        }

        .back-to-top-arrow {
          animation: backToTopFloat 1.6s ease-in-out infinite;
        }

        @keyframes backToTopFloat {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-4px); }
        }

        /* ── Tablet ── */
        @media (max-width: 900px) {
          .footer-grid {
            grid-template-columns: 1fr 1fr;
            padding: 3rem 2rem 2.5rem;
            gap: 2rem;
          }
          .footer-meta {
            padding: 1.2rem 2rem;
          }
          .back-to-top-wrap {
            right: 1.5rem;
            bottom: 1.5rem;
          }
        }

        /* ── Mobile ── */
        @media (max-width: 600px) {
          .footer-grid {
            grid-template-columns: 1fr;
            padding: 2.5rem 1.25rem 2rem;
            gap: 2rem;
          }
          .footer-meta {
            flex-direction: column;
            align-items: flex-start;
            gap: 0.75rem;
            padding: 1.2rem 1.25rem;
          }
          .back-to-top-wrap {
            right: 1rem;
            bottom: 1rem;
          }
        }

        .footer-expedited-text {
          font-size: clamp(64px, 15.5vw, 250px) !important;
          font-weight: 900 !important;
          letter-spacing: -0.035em !important;
          color: rgba(255,255,255,0.15) !important;
          line-height: 0.85 !important;
          user-select: none !important;
          white-space: nowrap !important;
          display: block !important;
          width: 100% !important;
        }
        .split-char {
          display: inline-block;
        }
      `}</style>

    </footer>
  );
}









