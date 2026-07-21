"use client";

import Link from "next/link";
import SplitText from "./SplitText";

/* Payment logos */
function PaymentLogo({
  src,
  alt,
  width,
  height,
}: {
  src: string;
  alt: string;
  width: number;
  height: number;
}) {
  return (
    <span style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", flex: `0 0 ${width}px`, width: `${width}px`, height: `${height}px` }}>
      <img
        src={src}
        alt={alt}
        width={width}
        height={height}
        style={{
          display: "block",
          maxWidth: "100%",
          maxHeight: "100%",
          width: "auto",
          height: "auto",
          objectFit: "contain",
          objectPosition: "center",
          flexShrink: 0,
        }}
      />
    </span>
  );
}
const HOURS = [
  { day: "Mon â€“ Sun", time: "24 Hours" },
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

/* â”€â”€ Footer â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
export function FooterSection() {
  return (
    <footer style={{
      background: "#000",
      color: "#fff",
      fontFamily: "var(--font-primary, 'Inter', sans-serif)",
      paddingTop: "5rem",
    }}>

      {/* â”€â”€ Main info grid â”€â”€ */}
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
          <div
            style={{
              display: "flex",
              flexWrap: "nowrap",
              alignItems: "center",
              gap: "0",
              overflowX: "auto",
              overflowY: "hidden",
              whiteSpace: "nowrap",
              paddingBottom: "0",
            }}
          >
            <PaymentLogo src="/images/icons8-visa-48.png" alt="Visa" width={90} height={48} />
            <PaymentLogo src="/images/master.png" alt="Mastercard" width={78} height={42} />
            <PaymentLogo src="/images/amex.png" alt="American Express" width={90} height={48} />
            <PaymentLogo src="/images/discover.png" alt="Discover" width={78} height={42} />
          </div>
        </div>
      </div>

      <hr style={DIVIDER} />

      {/* â”€â”€ Bottom meta â”€â”€ */}
      <div className="footer-meta">
        <span style={{ color: "rgba(255,255,255,0.3)", fontSize: "0.78rem" }}>
          Â©2024â€“26 Expedited Transport Services. All rights reserved.
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

      {/* â”€â”€ Big SplitText brand name â€” links to home â”€â”€ */}
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
        /* â”€â”€ Desktop grid â”€â”€ */
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

        /* â”€â”€ Tablet â”€â”€ */
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

        /* â”€â”€ Mobile â”€â”€ */
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









