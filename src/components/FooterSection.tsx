"use client";

import Link from "next/link";
import SplitText from "./SplitText";

/* ── Payment badge shell ─────────────────────────────────────── */
function PayBadge({ bg, border, children }: { bg: string; border?: string; children: React.ReactNode }) {
  return (
    <div style={{
      width: 62, height: 38, borderRadius: 6,
      background: bg,
      border: border ?? "1px solid rgba(255,255,255,0.1)",
      display: "flex", alignItems: "center", justifyContent: "center", gap: 1,
      flexShrink: 0,
    }}>
      {children}
    </div>
  );
}

/* ── Individual payment icons ────────────────────────────────── */
function VisaIcon() {
  return (
    <PayBadge bg="#1A1F71">
      <svg width="40" height="15" viewBox="0 0 40 15" aria-label="Visa">
        <text x="1" y="13" fill="white" fontFamily="Arial, sans-serif" fontSize="15" fontWeight="bold" fontStyle="italic">VISA</text>
      </svg>
    </PayBadge>
  );
}

function MastercardIcon() {
  return (
    <PayBadge bg="#1c1c1c">
      <svg width="36" height="22" viewBox="0 0 36 22" aria-label="Mastercard">
        <circle cx="13" cy="11" r="10" fill="#EB001B" opacity="0.95"/>
        <circle cx="23" cy="11" r="10" fill="#F79E1B" opacity="0.95"/>
        <path d="M18 2.7a10 10 0 0 1 0 16.6A10 10 0 0 1 18 2.7z" fill="#FF5F00"/>
      </svg>
    </PayBadge>
  );
}

function AmexIcon() {
  return (
    <PayBadge bg="#2E77BC">
      <svg width="40" height="15" viewBox="0 0 40 15" aria-label="American Express">
        <text x="1" y="11" fill="white" fontFamily="Arial, sans-serif" fontSize="10" fontWeight="bold" letterSpacing="1">AMEX</text>
      </svg>
    </PayBadge>
  );
}

function DiscoverIcon() {
  return (
    <PayBadge bg="#ffffff" border="1px solid rgba(0,0,0,0.12)">
      <svg width="48" height="20" viewBox="0 0 48 20" aria-label="Discover">
        <text x="1" y="13" fill="#231F20" fontFamily="Arial, sans-serif" fontSize="7.5" fontWeight="bold">DISCOVER</text>
        <circle cx="42" cy="10" r="7" fill="#f76f20"/>
      </svg>
    </PayBadge>
  );
}

function DebitIcon() {
  return (
    <PayBadge bg="#1a1f3c">
      <svg width="44" height="16" viewBox="0 0 44 16" fill="none" aria-label="Debit">
        <rect x="0.5" y="0.5" width="43" height="15" rx="2.5" stroke="rgba(255,255,255,0.25)" strokeWidth="1"/>
        <rect x="1" y="4" width="42" height="4" fill="rgba(255,255,255,0.1)"/>
        <text x="4" y="13.5" fill="rgba(255,255,255,0.75)" fontFamily="Arial, sans-serif" fontSize="6.5" fontWeight="bold" letterSpacing="0.5">DEBIT</text>
      </svg>
    </PayBadge>
  );
}

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
  fontSize: "0.65rem",
  fontWeight: 700,
  letterSpacing: "0.22em",
  textTransform: "uppercase",
  marginBottom: "1.2rem",
};

/* ── Footer ─────────────────────────────────────────────────── */
export function FooterSection() {
  return (
    <footer style={{
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
          <p style={{ fontSize: "0.88rem", color: "rgba(255,255,255,0.65)", margin: "0 0 0.5rem" }}>
            West Hartford, CT 06110
          </p>
          <a
            href="tel:+18609883887"
            style={{ display: "block", color: "rgba(255,255,255,0.52)", textDecoration: "none", fontSize: "0.86rem", marginBottom: "0.4rem" }}
            onMouseEnter={e => (e.currentTarget.style.color = "#b6f000")}
            onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.52)")}
          >
            (860) 988-3887
          </a>
          <a
            href="mailto:info@expeditedtransportservices.net"
            style={{ display: "block", color: "rgba(255,255,255,0.52)", textDecoration: "none", fontSize: "0.86rem", marginBottom: "0.9rem", wordBreak: "break-all" }}
            onMouseEnter={e => (e.currentTarget.style.color = "#b6f000")}
            onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.52)")}
          >
            info@expeditedtransportservices.net
          </a>
          <p style={{ color: "rgba(255,255,255,0.28)", fontSize: "0.8rem", margin: 0 }}>
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
                style={{ display: "flex", justifyContent: "space-between", maxWidth: 260, fontSize: "0.86rem" }}
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
              { label: "Services",  href: "/trucking-services/expedited-trucking" },
              { label: "About Us",  href: "/about-us" },
              { label: "Careers",   href: "/careers" },
            ].map(({ label, href }) => (
              <Link
                key={label}
                href={href}
                style={{ color: "rgba(255,255,255,0.52)", textDecoration: "none", fontSize: "0.86rem" }}
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
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.6rem" }}>
            <VisaIcon />
            <MastercardIcon />
            <AmexIcon />
            <DiscoverIcon />
            <DebitIcon />
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
