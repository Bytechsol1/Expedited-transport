"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import Script from "next/script";
import { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import { LogOut, LayoutDashboard } from "lucide-react";

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
  const [accountDropdownOpen, setAccountDropdownOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  const { data: authSession } = useSession();
  const isCustomer = (authSession?.user as { role?: string } | undefined)?.role === "customer";
  const isLightPage = true;
  const navCardRef = useRef<HTMLDivElement>(null);
  const accountRef = useRef<HTMLDivElement>(null);
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
    if (!servicesOpen && !accountDropdownOpen) return;
    const handleOutsideClick = (event: MouseEvent) => {
      if (servicesOpen && navCardRef.current && !navCardRef.current.contains(event.target as Node)) {
        setServicesOpen(false);
      }
      if (accountDropdownOpen && accountRef.current && !accountRef.current.contains(event.target as Node)) {
        setAccountDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, [servicesOpen, accountDropdownOpen]);


  return (
    <>
      <Script src="https://cdn.lordicon.com/lordicon.js" strategy="lazyOnload" />

      <header className={`site-header${isLightPage ? " light-page" : ""}`}>
        <div className={`nav-card ${isScrolled ? "scrolled" : ""}`} ref={navCardRef}>
          <a href="/" aria-label="Expedited Transport Services" className="brand">
            <span className="logo-wrap">
              <Image
                src="/ex-icon.svg"
                alt="Expedited icon"
                width={52}
                height={32}
                style={{ objectFit: "contain", display: "block" }}
                priority
              />
            </span>
            <Image
              src="/ex-text.svg"
              alt="EXPEDITED"
              width={136}
              height={13}
              style={{ objectFit: "contain", display: "block" }}
              className="brand-text-img"
              priority
            />
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
              <li><Link href="/tracking" className="nav-lnk">Track Order</Link></li>
            </ul>
          </nav>

          {isCustomer ? (
            <div 
              ref={accountRef} 
              style={{ position: "relative", marginLeft: "auto" }}
              onMouseEnter={() => setAccountDropdownOpen(true)}
              onMouseLeave={() => setAccountDropdownOpen(false)}
            >
              <Link 
                href="/account"
                className="cta-signin" 
                style={{ cursor: "pointer", display: "inline-block", textDecoration: "none" }}
              >
                My Account
              </Link>
              {accountDropdownOpen && (
                <div className="account-dropdown-menu">
                  <div style={{ padding: "1rem 1.25rem 0.75rem", borderBottom: "1px solid rgba(15, 23, 42, 0.06)" }}>
                    <div style={{ fontWeight: 600, color: "#0f172a", fontSize: "0.95rem" }}>{authSession?.user?.name || "Customer"}</div>
                    <div style={{ color: "rgba(15, 23, 42, 0.5)", fontSize: "0.85rem", marginTop: "2px" }}>{authSession?.user?.email || "customer@example.com"}</div>
                  </div>
                  <div style={{ padding: "0.5rem", display: "flex", flexDirection: "column" }}>
                    <button className="account-dropdown-item signout-btn" onClick={() => { setAccountDropdownOpen(false); signOut(); }}>
                      <LogOut size={18} style={{ opacity: 0.8 }} /> Sign Out
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <Link href="/login" className="cta-signin" style={{ marginLeft: 'auto' }}>Login</Link>
          )}
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
          <Link href="/tracking" className="drawer-link" onClick={() => setMobileOpen(false)}>Track Order</Link>
          {isCustomer ? (
            <>
              <button className="drawer-link" onClick={() => { setMobileOpen(false); signOut(); }} style={{ background: "transparent", border: "none", textAlign: "left", width: "100%" }}>Sign Out</button>
            </>
          ) : (
            <Link href="/login" className="drawer-link" onClick={() => setMobileOpen(false)}>Customer Login</Link>
          )}
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
          margin: 0 auto;
          padding: 0.75rem 0.75rem 0.75rem 1.5rem;
          background: rgba(255, 255, 255, 0.96);
          border: 1px solid rgba(15, 23, 42, 0.08);
          border-radius: 12px;
          max-width: 1150px;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
          text-rendering: optimizeLegibility;
          transition: background 0.3s ease, border-color 0.3s ease, backdrop-filter 0.3s ease;
        }

        .nav-card.scrolled {
          background: rgba(255, 255, 255, 0.96);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border-color: rgba(15, 23, 42, 0.08);
          box-shadow: 0 10px 30px rgba(15, 23, 42, 0.08);
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
          gap: 0.4rem;
          text-decoration: none;
          flex-shrink: 0;
          margin-right: 0.25rem;
        }

        .logo-wrap, .brand-text-img {
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 1;
          flex-shrink: 0;
        }

        .brand-name {
          font-family: 'Segoe UI', system-ui, -apple-system, var(--font-inter), 'Inter', sans-serif;
          font-size: 1.05rem;
          font-weight: 700;
          color: #0f172a;
          white-space: nowrap;
          letter-spacing: -0.025em;
        }

        .site-header.light-page .logo-wrap,
        .site-header.light-page .brand-text-img {
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
          color: rgba(15, 23, 42, 0.72);
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
          color: #E31E24;
          background: transparent;
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
          background: rgba(227,30,36,0.07) !important;
        }

        .mega-link:hover .mega-link-text {
          color: #E31E24 !important;
        }

        .cta-contact {
          display: flex;
          align-items: center;
          padding: 0.65rem 1.35rem;
          border-radius: 12px;
          background: #E31E24;
          color: #ffffff;
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
          background: #C81920;
        }

        .cta-signin {
          display: flex;
          align-items: center;
          padding: 0.65rem 1.35rem;
          border-radius: 12px;
          background: #0f172a;
          color: #ffffff;
          text-decoration: none;
          font-family: 'Segoe UI', system-ui, -apple-system, var(--font-inter), 'Inter', sans-serif;
          font-size: 0.9375rem;
          font-weight: 700;
          white-space: nowrap;
          flex-shrink: 0;
          margin-left: 0.25rem;
          letter-spacing: -0.01em;
          transition: background 0.15s ease, transform 0.15s ease;
        }

        .account-dropdown-menu {
          position: absolute;
          top: calc(100% + 8px);
          right: 0;
          background: #ffffff;
          border: 1px solid rgba(15, 23, 42, 0.08);
          border-radius: 12px;
          min-width: 240px;
          box-shadow: 0 12px 32px rgba(15, 23, 42, 0.08);
          display: flex;
          flex-direction: column;
          z-index: 100;
        }

        .account-dropdown-menu::before {
          content: "";
          position: absolute;
          top: -12px;
          left: 0;
          right: 0;
          height: 12px;
        }

        .account-dropdown-item {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.75rem 1rem;
          color: #475569;
          font-size: 0.95rem;
          font-weight: 500;
          text-decoration: none;
          border-radius: 8px;
          transition: background 0.15s ease, color 0.15s ease;
          background: transparent;
          border: none;
          text-align: left;
          cursor: pointer;
          font-family: inherit;
        }

        .account-dropdown-item:hover {
          background: rgba(15, 23, 42, 0.04);
          color: #0f172a;
        }

        .account-dropdown-item.signout-btn {
          color: #0ea5e9;
        }
        
        .account-dropdown-item.signout-btn:hover {
          background: #E31E24;
          color: #ffffff;
        }

        .site-header.light-page .cta-signin {
          background: #0f172a;
          color: #ffffff;
        }

        .cta-login-text {
          display: flex;
          align-items: center;
          padding: 0.65rem 1rem;
          color: rgba(255, 255, 255, 0.72);
          text-decoration: none;
          font-family: 'Segoe UI', system-ui, -apple-system, var(--font-inter), 'Inter', sans-serif;
          font-size: 0.9375rem;
          font-weight: 600;
          white-space: nowrap;
          flex-shrink: 0;
          margin-left: auto;
          transition: color 0.15s ease;
        }

        .cta-login-text:hover {
          color: #0f172a;
        }

        .site-header.light-page .cta-login-text {
          color: rgba(15, 23, 42, 0.72);
        }

        .site-header.light-page .cta-login-text:hover {
          color: #0f172a;
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
          color: rgba(15, 23, 42, 0.72);
          font-family: 'Segoe UI', system-ui, sans-serif;
          font-size: 0.9rem;
          font-weight: 500;
          text-decoration: none;
          transition: color 0.13s ease, background 0.13s ease;
        }

        .drawer-link:hover {
          color: #0f172a;
          background: rgba(255,255,255,0.04);
        }

        .drawer-cta {
          display: block;
          margin: 0.75rem 1.25rem 1rem;
          padding: 0.75rem 1.25rem;
          border-radius: 10px;
          background: #E31E24;
          color: #ffffff;
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
          color: #ffffff;
          text-align: center;
          font-family: 'Segoe UI', system-ui, sans-serif;
          font-size: 0.9rem;
          font-weight: 700;
          text-decoration: none;
        }

        .drawer-login-text {
          display: block;
          margin: 0;
          padding: 0.75rem 1.25rem;
          border-radius: 10px;
          background: rgba(255, 255, 255, 0.96);
          border: 1px solid rgba(15, 23, 42, 0.08);
          color: #0f172a;
          text-align: center;
          font-family: 'Segoe UI', system-ui, sans-serif;
          font-size: 0.9rem;
          font-weight: 600;
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









