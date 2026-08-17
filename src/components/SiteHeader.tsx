"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import Script from "next/script";
import { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";

const SERVICES = [
  { label: "Expedited Trucking", href: "/trucking-services/expedited-trucking", icon: "https://cdn.lordicon.com/whrxobsb.json" },
  { label: "LTL Trucking", href: "/trucking-services/ltl-trucking", icon: "https://cdn.lordicon.com/slduhdil.json" },
  { label: "Freight Shipping", href: "/trucking-services/freight-shipping", icon: "https://cdn.lordicon.com/puvaffet.json" },
  { label: "Freight Transportation", href: "/trucking-services/freight-transportation", icon: "https://cdn.lordicon.com/whrxobsb.json" },
  { label: "Logistics Services", href: "/trucking-services/logistics-services", icon: "https://cdn.lordicon.com/slduhdil.json" },
  { label: "Carrier Services", href: "/trucking-services/carrier-services", icon: "https://cdn.lordicon.com/puvaffet.json" },
  { label: "Local Trucking", href: "/trucking-services/local-trucking-company", icon: "https://cdn.lordicon.com/whrxobsb.json" },
];

function ServicesMega({ open }: { open: boolean }) {
  const cols = [SERVICES.slice(0, 3), SERVICES.slice(3, 5), SERVICES.slice(5, 7)];

  return (
    <div
      style={{
        position: "absolute",
        top: "calc(100% + 0.5rem)",
        left: "50%",
        transform: open ? "translateX(-50%) translateY(0) scale(1)" : "translateX(-50%) translateY(-10px) scale(0.98)",
        width: "min(96vw, 860px)",
        background: "#fff",
        border: "1px solid rgba(0,0,0,0.08)",
        borderRadius: "18px",
        padding: "1.75rem 2rem",
        boxShadow: "0 12px 48px rgba(0,0,0,0.12)",
        opacity: open ? 1 : 0,
        visibility: open ? "visible" : "hidden",
        transition: "opacity 0.22s ease, transform 0.22s ease, visibility 0.22s",
        zIndex: 200,
        pointerEvents: open ? "auto" : "none",
      }}
    >
      <p
        style={{
          fontFamily: "var(--font-mono, monospace)",
          fontSize: "0.6rem",
          letterSpacing: "0.28em",
          textTransform: "uppercase",
          color: "rgba(0,0,0,0.35)",
          margin: "0 0 1.5rem 0",
        }}
      >
        Services
      </p>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1px 1fr 1px 1fr", gap: "0 1.5rem" }}>
        {cols.map((col, ci) => (
          <React.Fragment key={ci}>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.125rem" }}>
              {col.map((svc) => (
                <Link
                  key={svc.href}
                  href={svc.href}
                  className="mega-link"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.875rem",
                    padding: "0.75rem 0.875rem",
                    borderRadius: "11px",
                    textDecoration: "none",
                  }}
                >
                  {/* @ts-expect-error custom element */}
                  <lord-icon
                    src={svc.icon}
                    trigger="hover"
                    colors="primary:#111111,secondary:#111111"
                    style={{ width: "22px", height: "22px", flexShrink: 0 }}
                  />
                  <span
                    className="mega-link-text"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.35rem",
                      fontFamily: "'Segoe UI', system-ui, -apple-system, var(--font-inter), sans-serif",
                      fontSize: "0.9375rem",
                      fontWeight: 500,
                      color: "rgba(0,0,0,0.78)",
                      letterSpacing: "-0.01em",
                      lineHeight: 1.2,
                      transition: "color 0.15s ease",
                    }}
                  >
                    {svc.label}
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.3, flexShrink: 0 }}>
                      <line x1="5" y1="12" x2="19" y2="12" />
                      <polyline points="12 5 19 12 12 19" />
                    </svg>
                  </span>
                </Link>
              ))}
            </div>
            {ci < 2 && <div style={{ background: "rgba(0,0,0,0.07)" }} />}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}

export function SiteHeader() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  const { data: authSession } = useSession();
  const isCustomer = (authSession?.user as { role?: string } | undefined)?.role === "customer";
  const isLightPage = pathname === "/about-us" || pathname === "/warehousing" || pathname === "/careers" || pathname === "/login" || pathname.startsWith("/account") || pathname.startsWith("/trucking-services");
  const navCardRef = useRef<HTMLDivElement>(null);
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const openDropdown = () => {
    if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
    setServicesOpen(true);
  };

  const closeDropdown = () => {
    closeTimerRef.current = setTimeout(() => setServicesOpen(false), 120);
  };


  useEffect(() => {
    const onScroll = () => {
      if (isLightPage) {
        setIsScrolled(false);
        return;
      }
      setIsScrolled(window.scrollY > 50);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [isLightPage]);

  useEffect(() => {
    if (!servicesOpen) return;
    const handleOutsideClick = (event: MouseEvent) => {
      if (navCardRef.current && !navCardRef.current.contains(event.target as Node)) {
        setServicesOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, [servicesOpen]);


  return (
    <>
      <Script src="https://cdn.lordicon.com/lordicon.js" strategy="lazyOnload" />

      <header className={`site-header${isLightPage ? " light-page" : ""}`}>
        <div className={`nav-card ${isScrolled ? "scrolled" : ""}`} ref={navCardRef}>
          <a href="/" aria-label="Expedited Transport Services" className="brand">
            <span className="logo-wrap">
              <Image
                src="/logo.png"
                alt="Expedited Transport Services logo"
                width={28}
                height={28}
                style={{ objectFit: "contain", display: "block", width: "auto", height: "auto" }}
                priority
              />
            </span>
            <span className="brand-name">Expedited Transport</span>
          </a>

          <nav className="desk-nav" aria-label="Main navigation">
            <ul>
              <li onMouseEnter={openDropdown} onMouseLeave={closeDropdown}>
                <button className="nav-lnk nav-lnk-btn">
                  Services
                  <svg
                    width="10"
                    height="10"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    style={{ marginLeft: "0.25rem", opacity: 0.5, transform: servicesOpen ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.2s ease" }}
                  >
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </button>
              </li>
              <li><Link href="/about-us" className="nav-lnk">About Us</Link></li>
              <li><Link href="/warehousing" className="nav-lnk">Warehousing</Link></li>
              <li><Link href="/careers" className="nav-lnk">Careers</Link></li>
            </ul>
          </nav>

          <Link href={isCustomer ? "/account" : "/login"} className="cta-signin">
            {isCustomer ? "My Account" : "Sign In"}
          </Link>
          <Link href="/#instant-quote" className="cta-contact">Get a Quote</Link>

          <button
            className={`burger${mobileOpen ? " is-open" : ""}`}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            onClick={() => setMobileOpen((value) => !value)}
          >
            <span />
            <span />
            <span />
          </button>

          <div onMouseEnter={openDropdown} onMouseLeave={closeDropdown}>
            <ServicesMega open={servicesOpen} />
          </div>
        </div>

        <div className={`drawer${mobileOpen ? " drawer-open" : ""}`}>
          <div className="drawer-section-label">Services</div>
          {SERVICES.map((svc) => (
            <Link key={svc.href} href={svc.href} className="drawer-link" onClick={() => setMobileOpen(false)}>
              {svc.label}
            </Link>
          ))}
          <div style={{ height: "1px", background: "rgba(255,255,255,0.06)", margin: "0.5rem 0" }} />
          <Link href="/about-us" className="drawer-link" onClick={() => setMobileOpen(false)}>About Us</Link>
          <Link href="/warehousing" className="drawer-link" onClick={() => setMobileOpen(false)}>Warehousing</Link>
          <Link href="/careers" className="drawer-link" onClick={() => setMobileOpen(false)}>Careers</Link>
          <Link href={isCustomer ? "/account" : "/login"} className="drawer-signin" onClick={() => setMobileOpen(false)}>
            {isCustomer ? "My Account" : "Sign In"}
          </Link>
          <Link href="/#instant-quote" className="drawer-cta" onClick={() => setMobileOpen(false)}>Get a Quote</Link>
        </div>
      </header>
      <style>{`
        .site-header {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 100;
          padding: 1.5rem 1.5rem 0;
          pointer-events: none;
        }

        .site-header > * {
          pointer-events: auto;
        }

        .site-header.light-page {
          color: #0f172a;
        }

        .nav-card {
          position: relative;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          max-width: 1020px;
          margin: 0 auto;
          padding: 0.75rem 0.75rem 0.75rem 1.5rem;
          background: transparent;
          border: 1px solid rgba(255,255,255,0.15);
          border-radius: 12px;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
          text-rendering: optimizeLegibility;
          transition: background 0.3s ease, border-color 0.3s ease, backdrop-filter 0.3s ease;
        }

        .nav-card.scrolled {
          background: rgba(10, 10, 10, 0.85);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border-color: rgba(255, 255, 255, 0.1);
          box-shadow: 0 4px 30px rgba(0, 0, 0, 0.5);
        }

        .site-header.light-page .nav-card,
        .site-header.light-page .nav-card.scrolled {
          background: rgba(255, 255, 255, 0.92);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border-color: rgba(15, 23, 42, 0.08);
          box-shadow: 0 10px 30px rgba(15, 23, 42, 0.08);
        }

        .brand {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          text-decoration: none;
          flex-shrink: 0;
          margin-right: 0.25rem;
        }

        .logo-wrap {
          display: flex;
          align-items: center;
          justify-content: center;
          filter: brightness(0) invert(1);
          opacity: 0.9;
          flex-shrink: 0;
        }

        .brand-name {
          font-family: 'Segoe UI', system-ui, -apple-system, var(--font-inter), 'Inter', sans-serif;
          font-size: 1.05rem;
          font-weight: 700;
          color: #fff;
          white-space: nowrap;
          letter-spacing: -0.025em;
        }

        .site-header.light-page .logo-wrap {
          filter: none;
          opacity: 1;
        }

        .site-header.light-page .brand-name {
          color: #0f172a;
        }

        .desk-nav {
          flex: 1;
        }

        .desk-nav ul {
          display: flex;
          align-items: center;
          list-style: none;
          margin: 0;
          padding: 0;
          gap: 0.125rem;
          justify-content: center;
        }

        .nav-lnk,
        .nav-lnk-btn {
          display: flex;
          align-items: center;
          font-family: 'Segoe UI', system-ui, -apple-system, var(--font-inter), 'Inter', sans-serif;
          font-size: 0.9375rem;
          font-weight: 500;
          letter-spacing: -0.01em;
          color: rgba(255,255,255,0.72);
          text-decoration: none;
          padding: 0.5rem 0.85rem;
          border-radius: 10px;
          white-space: nowrap;
          background: none;
          border: none;
          cursor: pointer;
          transition: color 0.18s ease, transform 0.18s ease;
          will-change: transform;
        }

        .nav-lnk:hover,
        .nav-lnk-btn:hover {
          color: #b6f000;
          background: transparent;
          transform: translateY(-1px);
        }

        .site-header.light-page .nav-lnk,
        .site-header.light-page .nav-lnk-btn {
          color: rgba(15, 23, 42, 0.72);
        }

        .site-header.light-page .nav-lnk:hover,
        .site-header.light-page .nav-lnk-btn:hover {
          color: #0f172a;
        }

        .mega-link {
          transition: background 0.15s ease;
        }

        .mega-link:hover {
          background: rgba(182,240,0,0.07) !important;
        }

        .mega-link:hover .mega-link-text {
          color: #b6f000 !important;
        }

        .cta-contact {
          display: flex;
          align-items: center;
          padding: 0.65rem 1.35rem;
          border-radius: 12px;
          background: #b6f000;
          color: #0a0f00;
          text-decoration: none;
          font-family: 'Segoe UI', system-ui, -apple-system, var(--font-inter), 'Inter', sans-serif;
          font-size: 0.9375rem;
          font-weight: 700;
          white-space: nowrap;
          flex-shrink: 0;
          margin-left: 0.5rem;
          letter-spacing: -0.01em;
          transition: background 0.15s ease;
        }

        .cta-contact:hover {
          background: #cbff1a;
        }

        .cta-signin {
          display: flex;
          align-items: center;
          padding: 0.65rem 1.35rem;
          border-radius: 12px;
          background: #fff;
          color: #0a0f00;
          text-decoration: none;
          font-family: 'Segoe UI', system-ui, -apple-system, var(--font-inter), 'Inter', sans-serif;
          font-size: 0.9375rem;
          font-weight: 700;
          white-space: nowrap;
          flex-shrink: 0;
          margin-left: auto;
          letter-spacing: -0.01em;
          transition: background 0.15s ease, transform 0.15s ease;
        }

        .cta-signin:hover {
          background: #f0f0f0;
        }

        .site-header.light-page .cta-signin {
          background: #0f172a;
          color: #fff;
        }

        .site-header.light-page .cta-signin:hover {
          background: #1e293b;
        }

        .burger {
          display: none;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          gap: 4px;
          width: 34px;
          height: 34px;
          background: rgba(255,255,255,0.07);
          border: 1px solid rgba(255,255,255,0.12);
          border-radius: 8px;
          cursor: pointer;
          padding: 0;
          flex-shrink: 0;
          margin-left: 0.5rem;
          transition: background 0.15s ease;
        }

        .burger:hover {
          background: rgba(255,255,255,0.12);
        }

        .burger span {
          display: block;
          width: 16px;
          height: 1.5px;
          background: rgba(255,255,255,0.8);
          border-radius: 2px;
          transition: transform 0.22s ease, opacity 0.22s ease;
        }

        .site-header.light-page .burger {
          background: rgba(15, 23, 42, 0.06);
          border-color: rgba(15, 23, 42, 0.12);
        }

        .site-header.light-page .burger:hover {
          background: rgba(15, 23, 42, 0.1);
        }

        .site-header.light-page .burger span {
          background: rgba(15, 23, 42, 0.78);
        }

        .burger.is-open span:nth-child(1) {
          transform: translateY(5.5px) rotate(45deg);
        }

        .burger.is-open span:nth-child(2) {
          opacity: 0;
        }

        .burger.is-open span:nth-child(3) {
          transform: translateY(-5.5px) rotate(-45deg);
        }

        .drawer {
          max-width: 860px;
          margin: 0.5rem auto 0;
          max-height: 0;
          overflow: hidden;
          background: rgba(10,12,20,0.98);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 12px;
          pointer-events: auto;
          transition: max-height 0.35s cubic-bezier(0.4,0,0.2,1), opacity 0.25s ease;
          opacity: 0;
        }

        .drawer-open {
          max-height: 90vh;
          overflow-y: auto;
          opacity: 1;
        }

        .drawer-section-label {
          padding: 1rem 1.25rem 0.25rem;
          font-family: var(--font-mono, monospace);
          font-size: 0.6rem;
          font-weight: 600;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.3);
        }

        .drawer-link {
          display: block;
          padding: 0.65rem 1.25rem;
          color: rgba(255,255,255,0.72);
          font-family: 'Segoe UI', system-ui, sans-serif;
          font-size: 0.9rem;
          font-weight: 500;
          text-decoration: none;
          transition: color 0.13s ease, background 0.13s ease;
        }

        .drawer-link:hover {
          color: #fff;
          background: rgba(255,255,255,0.04);
        }

        .drawer-cta {
          display: block;
          margin: 0.75rem 1.25rem 1rem;
          padding: 0.75rem 1.25rem;
          border-radius: 10px;
          background: #b6f000;
          color: #0a0f00;
          text-align: center;
          font-family: 'Segoe UI', system-ui, sans-serif;
          font-size: 0.9rem;
          font-weight: 700;
          text-decoration: none;
        }

        .drawer-signin {
          display: block;
          margin: 0.75rem 1.25rem 0;
          padding: 0.75rem 1.25rem;
          border-radius: 10px;
          background: #fff;
          color: #0a0f00;
          text-align: center;
          font-family: 'Segoe UI', system-ui, sans-serif;
          font-size: 0.9rem;
          font-weight: 700;
          text-decoration: none;
        }

        @media (max-width: 900px) {
          .desk-nav {
            display: none;
          }

          .cta-contact {
            display: none;
          }

          .cta-signin {
            display: none;
          }

          .burger {
            display: flex;
          }
        }

        @media (max-width: 480px) {
          .site-header {
            padding: 1rem 0.75rem 0;
          }

          .brand-name {
            font-size: 0.85rem;
          }
        }
      `}</style>
    </>
  );
}








