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
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false" width="22" height="22">
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
      width="22"
      height="22"
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
      width="60"
      height="60"
      decoding="async"
      style={{ width: "100%", height: "100%", objectFit: "contain", display: "block" }}
    />
  );
}

function CmjlLogoIcon() {
  return (
    <svg viewBox="0 0 64 64" aria-hidden="true" focusable="false" width="34" height="34">
      <circle cx="32" cy="32" r="31" fill="#101827" />
      <circle cx="32" cy="32" r="26" fill="none" stroke="#243247" strokeWidth="2.5" />
      <path d="M16 18 46 48" stroke="#2b3850" strokeWidth="3" strokeLinecap="round" opacity="0.75" />
      <path d="M20 14 50 44" stroke="#2b3850" strokeWidth="2.2" strokeLinecap="round" opacity="0.45" />
      <path d="M18 46 48 16" stroke="#2b3850" strokeWidth="2.2" strokeLinecap="round" opacity="0.38" />
      <path d="M24 18h16c6 0 10 4 10 10v8c0 6-4 10-10 10H24c-6 0-10-4-10-10v-8c0-6 4-10 10-10Z" fill="none" stroke="#0f172a" strokeOpacity="0.25" strokeWidth="1.5" />
      <path d="M36 16 46 10" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" opacity="0.9" />
      <path d="M45 10h-7l3.5 4.5L45 10Z" fill="#ffffff" opacity="0.9" />
      <text
        x="32"
        y="38"
        textAnchor="middle"
        dominantBaseline="middle"
        fill="#ffffff"
        fontSize="15"
        fontWeight="800"
        letterSpacing="0.7"
        fontFamily="Arial, Helvetica, sans-serif"
      >
        CMJL
      </text>
    </svg>
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
          height: 328px;
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
          box-shadow: 0 16px 34px rgba(15, 23, 42, 0.2);
        }

        .social-rail__item--facebook.is-active {
          background: #1877f2;
          color: #1877f2;
        }

        .social-rail__item--instagram.is-active {
          background: linear-gradient(135deg, #f58529 0%, #dd2a7b 52%, #8134af 100%);
          color: #dd2a7b;
        }

        .social-rail__item--playstore.is-active {
          background: #ffffff;
          color: #1f1f1f;
        }

        .social-rail__item--driver-signup.is-active {
          background: #ffffff;
          color: #101827;
        }

        .social-rail__icon {
          width: 54px;
          height: 54px;
          margin-left: 8px;
          border-radius: 999px;
          background: #fff7e7;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          color: #6b5531;
          transition: background 0.25s ease, color 0.25s ease, width 0.25s ease, height 0.25s ease, margin-left 0.25s ease, box-shadow 0.25s ease;
        }

        .social-rail__item--facebook.is-active .social-rail__icon {
          background: #ffffff;
          color: #1877f2;
        }

        .social-rail__item--instagram.is-active .social-rail__icon {
          background: #ffffff;
          color: #dd2a7b;
        }

        .social-rail__item--playstore .social-rail__icon {
          background: transparent;
          width: 60px;
          height: 60px;
          margin-left: 4px;
          box-shadow: none;
        }

        .social-rail__item--playstore.is-active .social-rail__icon {
          background: transparent;
          box-shadow: none;
          width: 60px;
          height: 60px;
          margin-left: 4px;
        }

        .social-rail__item--driver-signup .social-rail__icon {
          background: transparent;
          width: 60px;
          height: 60px;
          margin-left: 4px;
          box-shadow: none;
        }

        .social-rail__item--driver-signup.is-active .social-rail__icon {
          background: transparent;
          box-shadow: none;
          width: 60px;
          height: 60px;
          margin-left: 4px;
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
          transition: opacity 0.2s ease, transform 0.25s ease;
        }

        .social-rail__item--playstore.is-active .social-rail__label {
          color: #1f1f1f;
        }

        .social-rail__item--driver-signup.is-active .social-rail__label {
          color: #101827;
        }

        .social-rail__item.is-active .social-rail__label {
          opacity: 1;
          transform: translateX(0);
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
        }
      `}</style>
    </>
  );
}
