"use client";

import React, { useState } from "react";
import { usePathname } from "next/navigation";

type SocialItem = {
  href: string;
  label: string;
  className: string;
  icon: React.ReactNode;
  wordmark?: { src: string; width: number; height: number };
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
    <img
      src="/images/appstore.webp"
      alt="App Store"
      width="26"
      height="26"
      decoding="async"
      style={{ width: "26px", height: "26px", objectFit: "contain", display: "block", borderRadius: "6px" }}
    />
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
    wordmark: { src: "/images/brand-facebook-wordmark.svg", width: 112, height: 20 },
  },
  {
    href: "https://www.instagram.com/expeditedtransportservices/",
    label: "Instagram",
    className: "social-rail__item--instagram",
    icon: <InstagramIcon />,
    wordmark: { src: "/images/brand-instagram-wordmark.svg", width: 89, height: 30 },
  },
  {
    href: "https://play.google.com/store/apps/details?id=net.expeditedtransport.driverapp",
    label: "CMJL App",
    className: "social-rail__item--playstore",
    icon: <PlayStoreIcon />,
    wordmark: { src: "/images/brand-googleplay-wordmark.svg", width: 102, height: 20 },
  },
  {
    href: "https://apps.apple.com/us/app/cmjl/id6775973879",
    label: "App Store",
    className: "social-rail__item--appstore",
    icon: <AppStoreIcon />,
    wordmark: { src: "/images/brand-appstore-badge.svg", width: 102, height: 34 },
  },
  {
    href: "https://expeditedtransport.net/register",
    label: "Driver Sign Up",
    className: "social-rail__item--driver-signup",
    icon: <CmjlLogoIcon />,
  },
];

export function SocialRail() {
  const pathname = usePathname();
  const [activeLabel, setActiveLabel] = useState<string | null>(null);

  if (pathname?.startsWith("/admin")) return null;

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
              <span className="social-rail__label">
                {item.wordmark ? (
                  <img
                    src={item.wordmark.src}
                    alt={item.label}
                    width={item.wordmark.width}
                    height={item.wordmark.height}
                    decoding="async"
                    style={{ display: "block", width: item.wordmark.width, height: item.wordmark.height, objectFit: "contain" }}
                  />
                ) : (
                  item.label
                )}
              </span>
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

        .social-rail__item--facebook .social-rail__icon {
          color: #1877f2;
        }

        .social-rail__item--instagram .social-rail__icon {
          color: #e1306c;
        }

        .social-rail__item--playstore .social-rail__icon {
          color: #111827;
        }

        .social-rail__item--driver-signup .social-rail__icon {
          background: #ffffff;
          color: #111827;
        }

        .social-rail__item--driver-signup .social-rail__label {
          font-size: 14px;
          font-weight: 600;
          letter-spacing: 0.01em;
          text-transform: none;
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
