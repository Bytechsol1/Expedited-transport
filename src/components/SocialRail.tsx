"use client";

import React, { useState } from "react";

type SocialItem = {
  href: string;
  label: string;
  className: string;
  icon: React.ReactNode;
};

function FacebookIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false" width="26" height="26">
      <path
        fill="currentColor"
        d="M13.5 22v-7h2.4l.4-3H13.5V9.1c0-.9.2-1.5 1.6-1.5h1.2V5c-.2 0-1-.1-2-.1-2.1 0-3.5 1.3-3.5 3.7V12H8v3h2.8v7h2.7z"
      />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      focusable="false"
      width="26"
      height="26"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.9"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="4" y="4" width="16" height="16" rx="4" />
      <circle cx="12" cy="12" r="3.5" />
      <circle cx="17" cy="7" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

function PlayStoreIcon() {
  return (
    <img
      src="/images/playstore.png"
      alt="CMJL App"
      width="26"
      height="26"
      decoding="async"
      style={{ width: "100%", height: "100%", objectFit: "contain", display: "block" }}
    />
  );
}

function AppStoreIcon() {
  return (
    <svg viewBox="0 0 64 64" aria-hidden="true" focusable="false" width="30" height="30">
      <circle cx="32" cy="32" r="31" fill="#fff" />
      <path
        d="M28 18.5 16.5 38.5c-1.5 2.7.4 6 3.5 6h7.2"
        fill="none"
        stroke="currentColor"
        strokeWidth="4.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M36 18.5 47.5 38.5c1.5 2.7-.4 6-3.5 6H36.8"
        fill="none"
        stroke="currentColor"
        strokeWidth="4.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M23 34.5h18" fill="none" stroke="currentColor" strokeWidth="4.5" strokeLinecap="round" />
    </svg>
  );
}

function CmjlLogoIcon() {
  return (
    <img
      src="/images/cmjl.png"
      alt="CMJL"
      width="26"
      height="26"
      decoding="async"
      style={{ width: "100%", height: "100%", objectFit: "contain", display: "block" }}
    />
  );
}

const items: SocialItem[] = [
  {
    href: "https://www.facebook.com/people/Expedited-Transport-Services/61591894590936/",
    label: "Facebook",
    className: "social-rail__item--facebook",
    icon: <FacebookIcon />,
  },
  {
    href: "https://www.instagram.com/expeditedtransportservices/",
    label: "Instagram",
    className: "social-rail__item--instagram",
    icon: <InstagramIcon />,
  },
  {
    href: "https://play.google.com/store/apps/details?id=net.expeditedtransport.driverapp",
    label: "CMJL App",
    className: "social-rail__item--playstore",
    icon: <PlayStoreIcon />,
  },
  {
    href: "https://apps.apple.com/us/app/cmjl/id6775973879",
    label: "App Store",
    className: "social-rail__item--appstore",
    icon: <AppStoreIcon />,
  },
  {
    href: "https://expeditedtransport.net/register",
    label: "Driver Sign Up",
    className: "social-rail__item--driver-signup",
    icon: <CmjlLogoIcon />,
  },
];

export function SocialRail() {
  const [activeLabel, setActiveLabel] = useState<string | null>(null);

  return (
    <>
      <aside className="social-rail" aria-label="Social links">
        {items.map((item, index) => {
          const active = activeLabel === item.label;

          return (
            <a
              key={item.label}
              className={`social-rail__item ${item.className} ${active ? "is-active" : ""}`}
              href={item.href}
              target="_blank"
              rel="noreferrer noopener"
              aria-label={item.label}
              style={{ top: `${index * 82}px`, zIndex: active ? 999 : items.length - index }}
              onPointerEnter={() => setActiveLabel(item.label)}
              onPointerLeave={() => setActiveLabel(null)}
              onFocus={() => setActiveLabel(item.label)}
              onBlur={() => setActiveLabel(null)}
            >
              <span className="social-rail__icon">{item.icon}</span>
              <span className="social-rail__label">{item.label}</span>
            </a>
          );
        })}
      </aside>

      <style>{`
        .social-rail {
          position: fixed;
          right: 0;
          top: 50%;
          width: 236px;
          height: 410px;
          transform: translateY(-50%);
          z-index: 80;
          pointer-events: auto;
        }

        .social-rail__item {
          position: absolute;
          right: 0;
          display: flex;
          align-items: center;
          justify-content: flex-start;
          width: 70px;
          height: 70px;
          overflow: hidden;
          border-radius: 999px 0 0 999px;
          background: #a39064;
          box-shadow: 0 12px 28px rgba(15, 23, 42, 0.16);
          text-decoration: none;
          color: #6b5531;
          transition: width 0.25s ease, transform 0.25s ease, background 0.25s ease, box-shadow 0.25s ease;
          will-change: width, transform;
        }

        .social-rail__item.is-active {
          width: 236px;
          transform: translateX(-2px) scale(1.02);
          background: #ffffff;
          color: #111827;
          box-shadow: 0 16px 34px rgba(15, 23, 42, 0.2);
        }

        .social-rail__icon {
          width: 54px;
          height: 54px;
          margin-left: 8px;
          border-radius: 999px;
          background: #ffffff;
          border: 1px solid rgba(15, 23, 42, 0.14);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          color: #111827;
          box-shadow: none;
          transition: background 0.25s ease, color 0.25s ease, width 0.25s ease, height 0.25s ease, margin-left 0.25s ease, box-shadow 0.25s ease;
        }

        .social-rail__icon svg,
        .social-rail__icon img {
          display: block;
          width: 26px;
          height: 26px;
        }

        .social-rail__item--playstore .social-rail__icon img {
          width: 22px;
          height: 22px;
        }

        .social-rail__item--appstore .social-rail__icon svg {
          width: 30px;
          height: 30px;
        }

        .social-rail__item--facebook .social-rail__icon {
          color: #1877f2;
        }

        .social-rail__item--instagram .social-rail__icon {
          color: #e1306c;
        }

        .social-rail__item--playstore .social-rail__icon {
          color: #111827;
        }

        .social-rail__item--appstore .social-rail__icon {
          color: #0a84ff;
        }

        .social-rail__item--driver-signup .social-rail__icon {
          background: #ffffff;
          color: #111827;
        }

        .social-rail__label {
          margin-left: 16px;
          padding-right: 18px;
          font-size: 14px;
          font-weight: 700;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: #fff;
          white-space: nowrap;
          opacity: 0;
          transform: translateX(12px);
          transition: opacity 0.2s ease, transform 0.25s ease, color 0.25s ease;
        }

        .social-rail__item.is-active .social-rail__label {
          opacity: 1;
          transform: translateX(0);
          color: #111827;
        }

        @media (max-width: 768px) {
          .social-rail {
            top: auto;
            bottom: 18px;
            transform: none;
          }

          .social-rail__item {
            width: 64px;
            height: 64px;
          }

          .social-rail__item.is-active {
            width: 180px;
          }

          .social-rail__icon {
            width: 48px;
            height: 48px;
          }
        }
      `}</style>
    </>
  );
}
