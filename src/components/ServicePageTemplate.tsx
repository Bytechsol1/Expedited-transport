import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import type { ReactNode } from "react";
import type { LucideIcon } from "lucide-react";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";
import { FooterSection } from "@/components/FooterSection";

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
  lowerContent,
  heroTitleClassName,
}: ServicePageTemplateProps) {
  return (
    <>
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
            background: #b6f000;
            color: #0f172a;
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
            background: linear-gradient(90deg, #0f172a, #b6f000);
          }

          .service-badge {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            width: 48px;
            height: 48px;
            border-radius: 16px;
            background: #0f172a;
            color: #b6f000;
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
            background: #b6f000;
            color: #0f172a;
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
        `}</style>

        <section className="overlay-hero">
          {/* Background giant text */}
          <div className="bg-text">
            {title.split(' ').map((word, i) => {
              const isFirstWordSpecial = (title === 'LTL Trucking' || title === 'Freight Shipping' || title === 'Freight Transportation' || title === 'Logistics Services') && i === 0;
              const isSecondWordSpecial = (title === 'LTL Trucking' || title === 'Freight Shipping' || title === 'Freight Transportation' || title === 'Logistics Services') && i === 1;

              const isSpecialLayout = (title === 'LTL Trucking' || title === 'Freight Transportation' || title === 'Logistics Services');

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

              // Fix specifically for Carrier Services long words
              if (title === 'Carrier Services') {
                customStyle = {
                  fontSize: 'clamp(40px, 9vw, 150px)',
                  padding: '0 5vw',
                  lineHeight: '0.95'
                };
              }

              // Logistics Services Split Design
              if (title === 'Logistics Services' && i === 0) {
                customStyle = {
                  textAlign: 'left',
                  paddingLeft: '2vw',
                  fontSize: 'clamp(30px, 6vw, 110px)',
                  transform: 'translateY(-6vh)'
                };
              }
              if (title === 'Logistics Services' && i === 1) {
                customStyle = {
                  textAlign: 'right',
                  paddingRight: '2vw',
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
                title === 'Logistics Services' ? { left: '30%', width: '70%', transform: 'translate(-50%, -35%)' } :
                  title === 'Freight Transportation' ? { left: '70%', width: '70%', transform: 'translate(-50%, -35%)' } :
                    title === 'Freight Shipping' ? { transform: 'translate(-55%, -35%)' } :
                      {}
            }
          >
            <Image
              src={title === 'LTL Trucking' ? '/images/ltl-new.png' : title === 'Freight Transportation' ? '/images/freight-new.png' : title === 'Logistics Services' ? '/images/logistics-new.png' : '/images/truck-user-final.png'}
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
            <>
              <section className="section-shell">
                <div className="detail-grid">
                  <article className="detail-card">
                    <div className="section-kicker">Overview</div>
                    <h2>{title} built around your timeline.</h2>
                    <p>{summary}</p>
                    <p>{body}</p>
                    <div className="check-list">
                      {points.map((point) => (
                        <div className="check-item" key={point}>
                          <CheckCircle2 size={18} />
                          <div>
                            <strong>{point}</strong>
                            <span>Dummy supporting copy for this service route. Replace with final marketing text later if needed.</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </article>

                  <div className="detail-side">
                    {cards.map((card) => {
                      const Icon = card.icon;
                      return (
                        <article className="side-tile" key={card.title}>
                          <strong>{card.title}</strong>
                          <p>{card.description}</p>
                        </article>
                      );
                    })}
                  </div>
                </div>
              </section>

              <section className="cards-shell">
                <div className="section-head">
                  <h2>What this service can cover</h2>
                  <p>
                    A simple dummy section to show the route is live. This can be swapped for real copy whenever you are ready.
                  </p>
                </div>

                <div className="service-grid">
                  {cards.map((card, index) => {
                    const Icon = card.icon;
                    return (
                      <article className="service-card" key={card.title}>
                        <span className="service-badge">
                          <Icon size={22} />
                        </span>
                        <h3>{String(index + 1).padStart(2, "0")}. {card.title}</h3>
                        <p>{card.description}</p>
                      </article>
                    );
                  })}
                </div>
              </section>

              <section className="cta-shell">
                <div className="cta-band">
                  <div className="cta-inner">
                    <div>
                      <h3>Need this service configured differently?</h3>
                      <p>
                        Reach out and we can adjust the layout, copy, or route structure without touching the rest of the site.
                      </p>
                    </div>
                    <div className="cta-actions">
                      <a className="cta-link" href="tel:+18609883887">(860) 988-3887</a>
                      <Link className="cta-link secondary" href="/#contact-section">Request a Quote</Link>
                    </div>
                  </div>
                </div>
              </section>          </>
          )
        )}
      </main>
      <FooterSection />
    </>
  );
}






















