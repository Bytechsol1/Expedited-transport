import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import type { ReactNode } from "react";
import type { LucideIcon } from "lucide-react";
import { ArrowRight, CheckCircle2, Shield } from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";
import { FooterSection } from "@/components/FooterSection";
import { HotshotFaqSection } from "@/components/HotshotFaqSection";
import { ContactSection } from "@/components/ContactSection";

export type ServiceCard = {
  title: string;
  description: string;
  icon: LucideIcon;
};

export type ServicePageTemplateProps = {
  eyebrow: string;
  title: string;
  summary: string;
  body: string;
  imageSrc: string;
  imageAlt: string;
  points: string[];
  cards: ServiceCard[];
  hideHeroAccent?: boolean;
  hideHeroEyebrow?: boolean;
  hideHeroNote?: boolean;
  hideHeroPoints?: boolean;
  hideLowerSections?: boolean;
  accordionTitle?: string;
  accordionDescription?: string;
  lowerContent?: ReactNode;
  heroTitleClassName?: string;
  metadata?: Metadata;
};

export function ServicePageTemplate({
  eyebrow,
  title,
  summary,
  body,
  imageSrc,
  imageAlt,
  points,
  cards,
  hideHeroAccent,
  hideHeroEyebrow,
  hideHeroNote,
  hideHeroPoints,
  hideLowerSections,
  accordionTitle,
  accordionDescription,
  lowerContent,
  heroTitleClassName,
}: ServicePageTemplateProps) {
  return (
    <>
      <svg width="0" height="0" style={{ position: "absolute", overflow: "hidden" }}>
        <defs>
          <clipPath id="hotshot-image-clip" clipPathUnits="objectBoundingBox">
            <path d="
              M 0.025,0
              L 0.545,0
              Q 0.57,0 0.5877,0.0177
              L 0.6023,0.0323
              Q 0.62,0.05 0.645,0.05
              L 0.975,0.05
              Q 1.0,0.05 1.0,0.075
              L 1.0,0.975
              Q 1.0,1.0 0.975,1.0
              L 0.025,1.0
              Q 0,1.0 0,0.975
              L 0,0.675
              Q 0,0.65 0.0177,0.6323
              L 0.0323,0.6177
              Q 0.05,0.60 0.05,0.575
              L 0.05,0.245
              Q 0.05,0.22 0.0305,0.2044
              L 0.0195,0.1956
              Q 0,0.18 0,0.155
              L 0,0.025
              Q 0,0 0.025,0
              Z
            " />
          </clipPath>
        </defs>
      </svg>
      <SiteHeader />
      <main className="service-page">
        <style>{`
          .service-page {
            background: #fff;
            color: #0f172a;
          }

          /* ── Hero ── */
          .overlay-hero {
            position: relative;
            min-height: 120vh;
            display: flex;
            flex-direction: column;
            justify-content: flex-end;
            padding: 100px 48px 20px;
            overflow: hidden;
            font-family: var(--font-inter), sans-serif;
          }

          /* Giant outline text layer */
          .bg-text {
            position: absolute;
            top: 50vh;
            left: 50%;
            transform: translate(-50%, -58%);
            z-index: 1;
            pointer-events: none;
            width: 100%;
            text-align: center;
            line-height: 0.88;
            white-space: nowrap;
          }

          .bg-text span {
            display: block;
            font-size: clamp(50px, 11vw, 200px);
            font-weight: 900;
            text-transform: uppercase;
            color: transparent;
            -webkit-text-stroke: 2px rgba(15, 23, 42, 0.8);
            letter-spacing: -0.02em;
            line-height: 0.95;
            padding: 0 20px;
          }

          /* Truck image layer – in front of text */
          .truck-layer {
            position: absolute;
            top: 50vh;
            left: 50%;
            transform: translate(-50%, -42%);
            z-index: 2;
            width: 85%;
            max-width: 1200px;
            aspect-ratio: 16 / 9;
            pointer-events: none;
          }

          .truck-layer img {
            object-fit: contain;
          }

          /* Bottom content bar */
          .hero-footer {
            position: relative;
            z-index: 3;
            display: flex;
            justify-content: space-between;
            align-items: center;
            gap: 48px;
            max-width: 1440px;
            width: 100%;
            margin: 0 auto;
          }

          .hero-footer p {
            max-width: 580px;
            font-size: 18px;
            line-height: 1.65;
            color: #334155;
            font-weight: 500;
            margin: 0;
          }

          .hero-cta {
            display: inline-flex;
            align-items: center;
            gap: 14px;
            background: #0f172a;
            color: #fff;
            padding: 22px 44px;
            font-size: 15px;
            font-weight: 700;
            letter-spacing: 0.1em;
            text-transform: uppercase;
            text-decoration: none;
            white-space: nowrap;
            border-radius: 100px;
            flex-shrink: 0;
            transition: background 0.2s, color 0.2s, transform 0.2s;
          }

          .hero-cta:hover {
            background: #E31E24;
            color: #ffffff;
            transform: translateY(-3px);
          }

          .section-shell {
            padding-top: 40px;
            padding-bottom: 96px;
          }

          .detail-grid {
            display: grid;
            grid-template-columns: minmax(0, 1.06fr) minmax(0, 0.94fr);
            gap: 28px;
            align-items: start;
          }

          .detail-card {
            padding: 30px;
            border-radius: 30px;
            background: rgba(255,255,255,0.84);
            border: 1px solid rgba(15, 23, 42, 0.08);
            box-shadow: 0 22px 46px rgba(15, 23, 42, 0.05);
          }

          .section-kicker {
            display: inline-flex;
            align-items: center;
            gap: 10px;
            padding: 8px 14px;
            border-radius: 999px;
            background: rgba(15, 23, 42, 0.06);
            color: #64748b;
            font-family: var(--font-mono);
            font-size: 11px;
            font-weight: 700;
            letter-spacing: 0.18em;
            text-transform: uppercase;
          }

          .detail-card h2 {
            margin: 16px 0 0;
            font-family: var(--font-primary);
            font-size: clamp(28px, 3vw, 48px);
            line-height: 1.05;
            letter-spacing: -0.03em;
            font-weight: 450;
          }

          .detail-card p {
            margin: 18px 0 0;
            color: #475569;
            line-height: 1.9;
            font-size: 17px;
          }

          .check-list {
            display: grid;
            gap: 12px;
            margin-top: 22px;
          }

          .check-item {
            display: flex;
            gap: 12px;
            align-items: flex-start;
            padding: 14px 16px;
            border-radius: 18px;
            background: rgba(15, 23, 42, 0.03);
            border: 1px solid rgba(15, 23, 42, 0.05);
          }

          .check-item svg {
            flex-shrink: 0;
            margin-top: 2px;
            color: #0f172a;
          }

          .check-item strong {
            display: block;
            margin-bottom: 4px;
            font-family: var(--font-mono);
            font-size: 14px;
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: 0.08em;
          }

          .check-item span {
            color: #64748b;
            line-height: 1.6;
            font-size: 14px;
          }

          .detail-side {
            display: grid;
            gap: 14px;
          }

          .side-tile {
            padding: 22px 24px;
            border-radius: 22px;
            background: rgba(15, 23, 42, 0.03);
            border: 1px solid rgba(15, 23, 42, 0.06);
          }

          .side-tile strong {
            display: block;
            margin-bottom: 8px;
            font-family: var(--font-mono);
            font-size: 15px;
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: 0.08em;
          }

          .side-tile p {
            margin: 0;
            color: #64748b;
            line-height: 1.75;
            font-size: 14px;
          }

          .cards-shell {
            padding-bottom: 96px;
          }

          .section-head {
            display: flex;
            align-items: end;
            justify-content: space-between;
            gap: 20px;
            margin-bottom: 20px;
          }

          .section-head h2 {
            margin: 0;
            font-family: var(--font-primary);
            font-size: clamp(28px, 3vw, 46px);
            line-height: 1.05;
            letter-spacing: -0.03em;
            font-weight: 450;
          }

          .section-head p {
            margin: 0;
            max-width: 560px;
            color: #64748b;
            line-height: 1.75;
          }

          .service-grid {
            display: grid;
            grid-template-columns: repeat(3, minmax(0, 1fr));
            gap: 20px;
          }

          .service-card {
            padding: 22px;
            border-radius: 24px;
            background: rgba(255,255,255,0.8);
            border: 1px solid rgba(15, 23, 42, 0.08);
            box-shadow: 0 18px 36px rgba(15, 23, 42, 0.05);
            position: relative;
            overflow: hidden;
          }

          .service-card::before {
            content: "";
            position: absolute;
            inset: 0 auto auto 0;
            width: 100%;
            height: 3px;
            background: linear-gradient(90deg, #0f172a, #E31E24);
          }

          .service-badge {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            width: 48px;
            height: 48px;
            border-radius: 16px;
            background: #0f172a;
            color: #E31E24;
            margin-bottom: 16px;
          }

          .service-card h3 {
            margin: 0 0 10px;
            font-family: var(--font-primary);
            font-size: 18px;
            line-height: 1.2;
            letter-spacing: -0.02em;
            font-weight: 600;
          }

          .service-card p {
            margin: 0;
            color: #64748b;
            line-height: 1.7;
          }

          .cta-shell {
            padding-bottom: 112px;
          }

          .cta-band {
            padding: 30px;
            border-radius: 30px;
            background: linear-gradient(135deg, #0f172a 0%, #172036 70%, #24304a 100%);
            color: #fff;
            box-shadow: 0 26px 56px rgba(15, 23, 42, 0.18);
          }

          .cta-inner {
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 18px;
          }

          .cta-inner h3 {
            margin: 0 0 8px;
            font-family: var(--font-primary);
            font-size: clamp(24px, 2.6vw, 36px);
            font-weight: 450;
            letter-spacing: -0.02em;
            line-height: 1.1;
          }

          .cta-inner p {
            margin: 0;
            color: rgba(255,255,255,0.78);
            line-height: 1.7;
          }

          .cta-actions {
            display: flex;
            gap: 12px;
            flex-wrap: wrap;
          }

          .cta-link {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            min-width: 170px;
            padding: 15px 18px;
            border-radius: 14px;
            background: #E31E24;
            color: #ffffff;
            text-decoration: none;
            font-weight: 900;
            letter-spacing: 0.08em;
            text-transform: uppercase;
          }

          .cta-link.secondary {
            background: rgba(255,255,255,0.08);
            color: #fff;
            border: 1px solid rgba(255,255,255,0.14);
          }

          @media (max-width: 1100px) {
            .hero-grid,
            .detail-grid {
              grid-template-columns: 1fr;
            }

            .service-grid {
              grid-template-columns: repeat(2, minmax(0, 1fr));
            }
          }

          @media (max-width: 900px) {
            .overlay-hero {
              min-height: auto !important;
              padding-top: 140px !important;
              padding-bottom: 60px !important;
              display: flex;
              flex-direction: column;
              align-items: center;
              justify-content: flex-start;
              gap: 20px;
            }
            .bg-text {
              position: relative !important;
              top: auto !important;
              left: auto !important;
              transform: none !important;
              white-space: normal !important;
              line-height: 1.1 !important;
            }
            .bg-text span {
              display: block !important;
              padding-left: 0 !important;
              padding-right: 0 !important;
              margin-top: 0 !important;
              transform: none !important;
              text-align: center !important;
              font-size: clamp(40px, 11vw, 80px) !important;
            }
            .truck-layer {
              position: relative !important;
              top: auto !important;
              left: auto !important;
              transform: none !important;
              width: 100% !important;
              margin-top: 20px !important;
              margin-bottom: 20px !important;
            }
            .hero-footer {
              flex-direction: column !important;
              text-align: center !important;
              gap: 24px !important;
            }
          }

          @media (max-width: 720px) {
            .service-shell,
            .section-shell,
            .cards-shell,
            .cta-shell {
              padding-left: 18px;
              padding-right: 18px;
            }

            .service-shell {
              padding-top: 120px;
              padding-bottom: 36px;
            }

            .hero-copy,
            .detail-card p {
              font-size: 16px;
            }

            .summary {
              font-size: 16px;
            }

            .points {
              grid-template-columns: 1fr;
            }

            .service-grid {
              grid-template-columns: 1fr;
            }

            .section-head,
            .cta-inner {
              flex-direction: column;
              align-items: flex-start;
            }

            .hero-media {
              min-height: 380px;
            }
          }

          /* Interactive Pillar Accordion */
          .pillar-container {
            display: flex;
            gap: 16px;
            width: 100%;
            height: 480px;
          }
          .pillar {
            flex: 1;
            border-radius: 32px;
            background: #0f172a;
            border: 1px solid #1e293b;
            transition: all 0.6s cubic-bezier(0.25, 1, 0.5, 1);
            overflow: hidden;
            position: relative;
            cursor: default;
          }
          .pillar:hover {
            flex: 2.2;
            border-color: #0f172a;
            box-shadow: 0 30px 60px rgba(0,0,0,0.25);
          }
          .pillar-bg {
            opacity: 0.5;
            transition: all 0.6s cubic-bezier(0.25, 1, 0.5, 1) !important;
            transform: scale(1.1);
            filter: grayscale(80%);
          }
          .pillar:hover .pillar-bg {
            opacity: 1;
            transform: scale(1);
            filter: grayscale(0%);
          }
          .pillar-overlay {
            position: absolute;
            inset: 0;
            background: linear-gradient(180deg, rgba(15,23,42,0.3) 0%, rgba(15,23,42,0.95) 100%);
            transition: all 0.6s cubic-bezier(0.25, 1, 0.5, 1);
            z-index: 1;
          }
          .pillar:hover .pillar-overlay {
            background: linear-gradient(180deg, rgba(15,23,42,0) 0%, rgba(15,23,42,0.85) 100%);
          }
          .pillar-inner {
            position: relative;
            z-index: 2;
            height: 100%;
            padding: 40px 32px;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
          }
          .pillar-num {
            font-size: 40px;
            font-family: var(--font-mono);
            font-weight: 700;
            color: rgba(255,255,255,0.4);
            transition: color 0.6s;
          }
          .pillar:hover .pillar-num {
            color: #E31E24;
          }
          .pillar-content {
            display: flex;
            flex-direction: column;
            gap: 24px;
          }
          .pillar-text {
            font-family: var(--font-primary);
            font-size: 22px;
            font-weight: 600;
            color: rgba(255,255,255,0.8);
            line-height: 1.3;
            margin: 0;
            transition: all 0.6s cubic-bezier(0.25, 1, 0.5, 1);
          }
          .pillar:hover .pillar-text {
            color: #ffffff;
            font-size: 26px;
          }

          @media (max-width: 900px) {
            .pillar-container {
              flex-direction: column;
              height: auto;
            }
            .pillar { height: 140px; }
            .pillar-inner { padding: 24px; }
            .pillar:hover { flex: 1; height: 200px; }
            .pillar-text { font-size: 18px; }
            .pillar:hover .pillar-text { font-size: 20px; }
          }
          .notched-card {
            display: flex;
            align-items: stretch;
            gap: 80px;
          }
          .notched-card.normal {
            flex-direction: row;
          }
          .notched-card.reverse {
            flex-direction: row-reverse;
          }
          .notched-text-wrapper {
            flex: 1 1 45%;
            display: flex;
            align-items: center;
          }
          .notched-img-wrapper {
            flex: 1 1 55%;
            position: relative;
            min-height: 450px;
            filter: drop-shadow(0 20px 40px rgba(0,0,0,0.1));
          }
          .notched-section-inner {
            max-width: 1400px; margin: 0 auto; padding: 0 40px;
          }
          @media (max-width: 900px) {
            .notched-card {
              flex-direction: column !important;
              gap: 40px;
            }
            .notched-text-wrapper {
              flex: none;
            }
            .notched-img-wrapper {
              flex: none;
              min-height: 320px;
              width: 100%;
            }
            .notched-section-inner {
              padding: 0 20px;
            }
          }
        `}</style>
        
        {/* SVG clip-path definition for perfectly rounded notches */}
        <svg style={{ width: 0, height: 0, position: "absolute", pointerEvents: "none" }}>
          <defs>
            <clipPath id="hotshot-image-clip" clipPathUnits="objectBoundingBox">
              <path d="M 0,0.06 C 0,0.026 0.02,0 0.045,0 L 0.955,0 C 0.98,0 1,0.026 1,0.06 L 1,0.67 C 1,0.704 0.98,0.73 0.955,0.73 L 0.88,0.73 C 0.865,0.73 0.85,0.74 0.84,0.75 L 0.8,0.8 C 0.79,0.81 0.775,0.82 0.76,0.82 L 0.045,0.82 C 0.02,0.82 0,0.794 0,0.76 Z" />
            </clipPath>
          </defs>
        </svg>

        <section className="overlay-hero">
          {/* Background giant text */}
          <div className="bg-text">
            {title.split(/[\s\n]+/).map((word, i) => {
              const isFirstWordSpecial = (title === 'LTL Trucking' || title === 'Freight Shipping' || title === 'Freight Transportation' || title === 'Logistics Services' || title === 'Carrier Services' || title.includes('Local Trucking')) && i === 0;
              const isSecondWordSpecial = (title === 'LTL Trucking' || title === 'Freight Shipping' || title === 'Freight Transportation' || title === 'Logistics Services' || title === 'Carrier Services' || title.includes('Local Trucking')) && i === 1;

              const isSpecialLayout = (title === 'LTL Trucking' || title === 'Freight Transportation' || title === 'Logistics Services' || title === 'Carrier Services' || title.includes('Local Trucking'));

              let customStyle: any = {};
              if (isFirstWordSpecial) {
                const isLogistics = title === 'Logistics Services';
                customStyle = {
                  textAlign: isLogistics ? 'right' : 'left',
                  paddingLeft: isLogistics ? '0' : '4vw',
                  paddingRight: isLogistics ? '4vw' : '0',
                  transform: title === 'Freight Shipping' ? 'translateY(-6vh)' : isSpecialLayout ? 'translateY(-8vh)' : 'none',
                  fontSize: (title === 'LTL Trucking' || title === 'Logistics Services') ? 'clamp(30px, 7vw, 120px)' : title === 'Freight Transportation' ? 'clamp(24px, 5vw, 95px)' : undefined
                };
              }
              if (isSecondWordSpecial) {
                const isLTL = title === 'LTL Trucking';
                const isLogistics = title === 'Logistics Services';
                customStyle = {
                  textAlign: isLogistics ? 'right' : 'left',
                  paddingLeft: isLogistics ? '0' : isLTL ? '10vw' : isSpecialLayout ? '8vw' : '51vw',
                  paddingRight: isLogistics ? '12vw' : '0',
                  fontSize: (title === 'LTL Trucking' || title === 'Logistics Services') ? 'clamp(30px, 7vw, 120px)' : title === 'Freight Transportation' ? 'clamp(24px, 5vw, 95px)' : 'clamp(40px, 8vw, 140px)',
                  position: 'relative',
                  zIndex: 3,
                  marginTop: title === 'Freight Shipping' ? '4vh' : (title === 'LTL Trucking' || title === 'Logistics Services') ? '-4vh' : isSpecialLayout ? '2vh' : '-2vh'
                };
              }

              // Carrier Services Split Design
              if (title === 'Carrier Services' && i === 0) {
                customStyle = {
                  textAlign: 'left',
                  paddingLeft: '4vw',
                  fontSize: 'clamp(40px, 8vw, 130px)',
                  transform: 'translateY(-8vh)'
                };
              }
              if (title === 'Carrier Services' && i === 1) {
                customStyle = {
                  textAlign: 'left',
                  paddingLeft: '14vw',
                  fontSize: 'clamp(40px, 8vw, 130px)',
                  marginTop: '6vh',
                  position: 'relative',
                  zIndex: 3
                };
              }

              // Local Trucking Split Design
              if (title.includes('Local Trucking') && i === 0) {
                customStyle = {
                  textAlign: 'left',
                  paddingLeft: '5vw',
                  fontSize: 'clamp(35px, 7vw, 120px)',
                  transform: 'translateY(0vh)'
                };
              }
              if (title.includes('Local Trucking') && i === 1) {
                customStyle = {
                  textAlign: 'left',
                  paddingLeft: '12vw',
                  fontSize: 'clamp(35px, 7vw, 120px)',
                  marginTop: '2vh',
                  position: 'relative',
                  zIndex: 3
                };
              }
              if (title.includes('Local Trucking') && i === 2) {
                customStyle = {
                  textAlign: 'left',
                  paddingLeft: '19vw',
                  fontSize: 'clamp(35px, 7vw, 120px)',
                  marginTop: '2vh',
                  position: 'relative',
                  zIndex: 3
                };
              }

              // Logistics Services Split Design
              if (title === 'Logistics Services' && i === 0) {
                customStyle = {
                  textAlign: 'right',
                  paddingRight: '12vw',
                  fontSize: 'clamp(30px, 6vw, 110px)',
                  transform: 'translateY(-6vh)'
                };
              }
              if (title === 'Logistics Services' && i === 1) {
                customStyle = {
                  textAlign: 'right',
                  paddingRight: '8vw',
                  fontSize: 'clamp(30px, 6vw, 110px)',
                  marginTop: '8vh',
                  position: 'relative',
                  zIndex: 3
                };
              }

              return (
                <span
                  key={i}
                  style={customStyle}
                >
                  {word}
                </span>
              );
            })}
          </div>

          {/* Truck image – overlaps text */}
          <div
            className="truck-layer"
            style={
              title === 'LTL Trucking' ? { left: '70%', width: '70%', transform: 'translate(-50%, -42%)' } :
                title === 'Logistics Services' ? { left: '30%', width: '70%', transform: 'translate(-50%, -45%)' } :
                  title === 'Freight Transportation' ? { left: '70%', width: '70%', transform: 'translate(-50%, -35%)' } :
                    title === 'Carrier Services' ? { left: '75%', width: '70%', transform: 'translate(-50%, -38%)', mixBlendMode: 'multiply' } :
                      title.includes('Local Trucking') ? { left: '75%', width: '70%', transform: 'translate(-50%, -35%)' } :
                        title === 'Freight Shipping' ? { transform: 'translate(-55%, -35%)' } :
                          {}
            }
          >
            <Image
              src={title === 'LTL Trucking' ? '/images/ltl-new.png' : title === 'Freight Transportation' ? '/images/freight-new.png' : title === 'Logistics Services' ? '/images/logistics-new.png' : title === 'Carrier Services' ? '/images/carrier-new.png' : title.includes('Local Trucking') ? '/images/local-trucking-hero-v3.png' : '/images/truck-user-final.png'}
              alt={imageAlt || title}
              fill
              priority
              sizes="(max-width: 1024px) 80vw, 62vw"
              className="object-contain"
              style={title === 'LTL Trucking' ? { transform: 'scaleX(-1)' } : undefined}
            />
          </div>

          {/* Footer content */}
          <div className="hero-footer">
            <p>{summary}</p>
            <a href="tel:+18609883887" className="hero-cta">
              Speak With Us Now
              <ArrowRight size={18} />
            </a>
          </div>
        </section>

        {hideLowerSections ? null : (
          lowerContent ?? (
            <section style={{ backgroundColor: "#ffffff", position: "relative", zIndex: 1 }}>
              {/* Top Separator */}
              <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "1px", background: "linear-gradient(90deg, transparent, rgba(0, 0, 0, 0.06), transparent)" }} />

              {/* Interactive Pillar Accordion (Using `points`) */}
              {points && points.length > 0 && (
                <div style={{ padding: "80px 40px 140px", maxWidth: "1400px", margin: "0 auto" }}>
                  <div style={{ textAlign: "center", marginBottom: "60px", maxWidth: "800px", margin: "0 auto 60px" }}>

                    <h2 style={{ fontSize: "clamp(36px, 4vw, 52px)", fontWeight: 700, letterSpacing: "-0.02em", marginBottom: "24px", lineHeight: 1.1, color: "#0f172a", fontFamily: "var(--font-primary)" }}>
                      {accordionTitle || `${title} Company for Any Job`}
                    </h2>
                    <p style={{ color: "#475569", lineHeight: 1.8, fontSize: "18px", fontFamily: "var(--font-primary)" }}>
                      {accordionDescription || `${summary} Some of the additional benefits of hiring our ${title.toLowerCase()} carrier for your job include:`}
                    </p>
                  </div>

                  <div className="pillar-container">
                    {points.slice(0, 6).map((item, i) => {
                      let images = ["/images/truck3.jpg", "/images/truck2.jpg", "/images/truck1.jpg", "/images/truck4.jpg", "/images/ware.jpg", "/images/ship.jpg"];
                      
                      if (title === "LTL Trucking") {
                        images = [
                          "/images/ltl-accordion-1-v3.jpg",
                          "/images/ltl-accordion-2-v3.jpg",
                          "/images/ltl-accordion-3-v3.jpg",
                          "/images/ltl-accordion-4-v3.jpg",
                          "/images/ltl-accordion-5-v3.jpg",
                          "/images/ltl-accordion-6-v3.jpg"
                        ];
                      } else if (title === "Logistics Services") {
                        images = [
                          "/images/logistics-accordion-3.jpg", // Planning and optimizing routes
                          "/images/logistics-accordion-1.jpg", // Order management
                          "/images/logistics-accordion-2.jpg", // Freight auditing
                          "/images/logistics-accordion-4-new.jpg", // Selecting transportation carriers
                          "/images/logistics-accordion-5-new.jpg", // Warehousing and inventory management
                          "/images/logistics-card-3.jpg"
                        ];
                      } else if (title === "Freight Shipping") {
                        images = [
                          "/images/freight-accordion-pricing.jpg",     // 0: Straightforward and competitive pricing
                          "/images/freight-accordion-2-new.jpg",       // 1: On-time deliveries
                          "/images/freight-accordion-safety.jpg",      // 2: Industry-leading safety measures
                          "/images/freight-accordion-4-new.jpg",       // 3: Accommodating customer support
                          "/images/freight-accordion-5-new.jpg",       // 4: Measurable history of success
                          "/images/freight-accordion-experienced.jpg"  // 5: Experienced and qualified drivers
                        ];
                      } else if (title === "Freight Transportation") {
                        images = [
                          "/images/freight-trans-ltl-new.jpg",         // 0: LTL trucking
                          "/images/freight-trans-dryvan-new.jpg",      // 1: Dry van trucking
                          "/images/freight-trans-card-1.jpg",          // 2: Logistics services (Using card image)
                          "/images/freight-accordion-warehouse.jpg",   // 3: Warehousing services (Kept as is)
                          "/images/freight-trans-other-new.jpg"        // 4: Or any other trucking services
                        ];
                      } else if (title === "Local Trucking Company") {
                        images = [
                          "/images/local-trucking-card-4.png",          // 0: Transparent and competitive pricing
                          "/images/local-trucking-accordion-2-new.jpg", // 1: Experienced drivers
                          "/images/local-trucking-accordion-3-new.jpg", // 2: Knowledgeable local logistics experts
                          "/images/local-trucking-accordion-4-new.jpg", // 3: Dedicated customer service
                          "/images/local-trucking-accordion-5-new.jpg", // 4: Punctual deliveries
                          "/images/local-trucking-accordion-6-new.jpg"  // 5: Well-maintained vehicles
                        ];
                      } else if (title === "Carrier Services") {
                        images = [
                          "/images/carrier-accordion-1-new.jpg", // Cost-effective shipping rates
                          "/images/carrier-card-3.png", // Accommodating freight services
                          "/images/carrier-card-4.png", // FTL, LTL, and PTL options
                          "/images/carrier-accordion-4-new.jpg", // Dependable communication
                          "/images/carrier-card-5.png"  // Professional shipping equipment
                        ];
                      }
                      return (
                        <div key={i} className="pillar">
                          <Image 
                            src={images[i % images.length]} 
                            alt={item} 
                            fill 
                            className="pillar-bg"
                            style={{ objectFit: "cover" }} 
                          />
                          <div className="pillar-overlay" />
                          
                          <div className="pillar-inner">
                            <div className="pillar-num">0{i + 1}</div>
                            <div className="pillar-content">
                              <h3 className="pillar-text">{item}</h3>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Notched Image Cards (Using `cards`) */}
              {cards && cards.length > 0 && (
                <section style={{ padding: "80px 0", backgroundColor: "#ffffff", position: "relative" }}>
                  <div className="notched-section-inner">
                    <div style={{ textAlign: "center", marginBottom: "60px" }}>
                      <h2 style={{ fontSize: "clamp(32px, 4vw, 40px)", fontWeight: 700, letterSpacing: "-0.02em", color: "#051e24", fontFamily: "var(--font-primary)" }}>{title} That You Can Depend On</h2>
                      <div style={{ width: "60px", height: "4px", backgroundColor: "#E31E24", margin: "24px auto 0", borderRadius: "2px" }} />
                    </div>

                    <div style={{ display: "flex", flexDirection: "column", gap: "80px" }}>
                      {cards.map((card, idx) => {
                        const isEven = idx % 2 !== 0;
                        
                        let images = ["/images/truck3.jpg", "/images/truck4.jpg", "/images/truck2.jpg", "/images/truck1.jpg"];
                        if (title === "Logistics Services") {
                          images = [
                            "/images/logistics-card-1.jpg", 
                            "/images/logistics-card-2.jpg", 
                            "/images/logistics-card-3.jpg", 
                            "/images/logistics-card-4.jpg"
                          ];
                        } else if (title === "LTL Trucking") {
                          images = [
                            "/images/ltl-card-4.jpg", // Fair Prices on Smaller Shipments
                            "/images/ltl-card-3.jpg", // Details Matter with LTL Trucking
                            "/images/ltl-card-1.jpg", // Keeping Your Cargo Safe
                            "/images/ltl-card-2.jpg"  // Work with a Trusted LTL Carrier
                          ];
                        } else if (title === "Freight Shipping") {
                          images = [
                            "/images/freight-shipping-1.jpg", // Upgrade Your Business with Our Freight Shipping
                            "/images/freight-shipping-2.jpg", // Experienced Freight Company
                            "/images/freight-shipping-3.jpg", // Consistency Matters with Freight Shipping
                            "/images/freight-shipping-4.jpg"  // Great Customer Service from Your Freight Company
                          ];
                        } else if (title === "Freight Transportation") {
                          images = [
                            "/images/freight-trans-card-1.jpg", // Comprehensive Freight Transportation
                            "/images/freight-accordion-2-v2.jpg", // Freight Shipping You Never Have to Wait On
                            "/images/freight-trans-card-3.jpg", // Your Freight Is Safe with Us
                            "/images/freight-trans-card-4-new.jpg"  // Budget-Conscious Freight Shipping
                          ];
                        } else if (title === "Local Trucking Company") {
                          images = [
                            "/images/local-trucking-card-1.png", // Top-Notch Service from Local Freight Carriers
                            "/images/local-trucking-card-2.png", // Feel Secure with Our Local Trucking Service
                            "/images/local-trucking-card-3.png", // Local Hauling That's Completed on Time
                            "/images/local-trucking-card-4.png"  // Save Money with Our Local Freight Company
                          ];
                        } else if (title === "Carrier Services") {
                          images = [
                            "/images/carrier-card-1.png", // Accommodating Freight Shippers
                            "/images/carrier-card-2.png", // Full Truckload (FTL) Shipping
                            "/images/carrier-card-3.png", // Less Than Truckload (LTL) Shipping
                            "/images/carrier-card-4.png", // Partial Truckload (PTL) Shipping
                            "/images/carrier-card-5.png"  // Your Shipments Are Safe with Our Carrier Services
                          ];
                        }
                        
                        const cardImage = images[idx % images.length];

                        return (
                          <div key={idx} className={`notched-card ${isEven ? 'reverse' : 'normal'}`}>
                            <div className="notched-text-wrapper">
                              <div style={{ display: "flex", alignItems: "flex-start", gap: "24px" }}>
                                <div style={{ fontSize: "13px", color: "#8b9ba5", fontWeight: 600, fontFamily: "var(--font-mono)", marginTop: "12px", letterSpacing: "1px" }}>
                                  0{idx + 1}
                                </div>
                                <div>
                                  <h3 style={{ fontSize: "clamp(26px, 4vw, 44px)", fontWeight: 600, color: "#061d26", marginBottom: "20px", letterSpacing: "-0.02em", lineHeight: 1.1, fontFamily: "var(--font-primary)" }}>
                                    {card.title}
                                  </h3>
                                  <p style={{ color: "#4a5568", fontSize: "16px", lineHeight: 1.8, fontFamily: "var(--font-primary)" }}>
                                    {card.description}
                                  </p>
                                </div>
                              </div>
                            </div>

                            <div className="notched-img-wrapper">
                              <div style={{
                                position: "absolute", inset: 0,
                                clipPath: "url(#hotshot-image-clip)",
                                transform: isEven ? "scaleX(-1)" : "none",
                                backgroundColor: "#f8fafc"
                              }}>
                                <Image
                                  src={cardImage}
                                  alt={card.title}
                                  fill
                                  style={{
                                    objectFit: "cover",
                                    transform: isEven ? "scaleX(-1)" : "none"
                                  }}
                                />
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </section>
              )}
            </section>
          )
        )}
      </main>
      <HotshotFaqSection />
      <ContactSection />
      <FooterSection />
    </>
  );
}























