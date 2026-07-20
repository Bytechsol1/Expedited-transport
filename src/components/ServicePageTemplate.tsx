import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
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
}: ServicePageTemplateProps) {
  return (
    <>
      <SiteHeader />
      <main className="service-page">
        <style>{`
          .service-page {
            min-height: 100vh;
            background:
              radial-gradient(circle at 15% 0%, rgba(182, 240, 0, 0.12), transparent 26%),
              radial-gradient(circle at 90% 12%, rgba(15, 23, 42, 0.1), transparent 20%),
              linear-gradient(180deg, #f8fafc 0%, #edf2f7 100%);
            color: #0f172a;
          }

          .service-shell,
          .section-shell,
          .cards-shell,
          .cta-shell {
            max-width: 1440px;
            margin: 0 auto;
            padding-left: 32px;
            padding-right: 32px;
          }

          .service-shell {
            padding-top: 148px;
            padding-bottom: 64px;
          }

          .hero-grid {
            display: grid;
            grid-template-columns: minmax(0, 1.05fr) minmax(0, 0.95fr);
            gap: 36px;
            align-items: stretch;
          }

          .hero-copy {
            padding: 44px;
            border-radius: 34px;
            background: linear-gradient(180deg, #0f172a 0%, #111827 100%);
            color: #fff;
            position: relative;
            overflow: hidden;
            box-shadow: 0 28px 60px rgba(15, 23, 42, 0.18);
          }

          .hero-copy::after {
            content: "";
            position: absolute;
            inset: 18px 18px 18px auto;
            width: 10px;
            border-radius: 999px;
            background: linear-gradient(180deg, #b6f000 0%, #b6f000 66%, rgba(255,255,255,0.22) 66%, rgba(255,255,255,0.22) 100%);
          }

          .eyebrow {
            display: inline-flex;
            align-items: center;
            gap: 10px;
            padding: 8px 14px;
            border-radius: 999px;
            background: rgba(182, 240, 0, 0.12);
            color: #d8f97a;
            font-size: 11px;
            font-weight: 900;
            letter-spacing: 0.22em;
            text-transform: uppercase;
          }

          .service-title {
            margin: 18px 0 0;
            width: min(100%, 12ch);
            max-width: 12ch;
            overflow-wrap: anywhere;
            hyphens: auto;
            font-size: clamp(38px, 5vw, 80px);
            line-height: 0.92;
            letter-spacing: -0.07em;
            font-weight: 900;
            text-transform: uppercase;
          }

          .service-title span {
            color: #b6f000;
          }

          .summary {
            max-width: 700px;
            margin: 24px 0 0;
            color: rgba(255,255,255,0.8);
            font-size: 18px;
            line-height: 1.9;
          }

          .points {
            display: grid;
            grid-template-columns: repeat(3, minmax(0, 1fr));
            gap: 12px;
            margin-top: 30px;
          }

          .point {
            padding: 14px 16px;
            border-radius: 16px;
            background: rgba(255,255,255,0.06);
            border: 1px solid rgba(255,255,255,0.08);
            color: rgba(255,255,255,0.92);
            font-size: 13px;
            line-height: 1.45;
            min-height: 64px;
          }

          .service-actions {
            display: flex;
            flex-wrap: wrap;
            gap: 14px;
            margin-top: 28px;
          }

          .service-button,
          .service-button-alt {
            display: inline-flex;
            align-items: center;
            gap: 12px;
            padding: 16px 22px;
            border-radius: 16px;
            text-decoration: none;
            font-size: 14px;
            font-weight: 900;
            letter-spacing: 0.12em;
            text-transform: uppercase;
            transition: transform 0.2s ease, box-shadow 0.2s ease, background 0.2s ease;
          }

          .service-button {
            background: #b6f000;
            color: #0f172a;
            box-shadow: 0 16px 32px rgba(182, 240, 0, 0.16);
          }

          .service-button-alt {
            background: rgba(255,255,255,0.08);
            color: #fff;
            border: 1px solid rgba(255,255,255,0.12);
          }

          .service-button:hover,
          .service-button-alt:hover {
            transform: translateY(-2px);
          }

          .service-media {
            position: relative;
            min-height: 680px;
            border-radius: 34px;
            overflow: hidden;
            background: linear-gradient(145deg, #ffffff 0%, #e7ecf4 100%);
            box-shadow: 0 28px 60px rgba(15, 23, 42, 0.14);
          }

          .service-image {
            object-fit: cover;
            object-position: center 50%;
          }

          .service-note {
            position: absolute;
            left: 20px;
            bottom: 20px;
            right: 20px;
            z-index: 2;
            padding: 18px 20px;
            border-radius: 20px;
            background: rgba(255,255,255,0.9);
            backdrop-filter: blur(16px);
            color: #0f172a;
            box-shadow: 0 18px 32px rgba(15, 23, 42, 0.18);
            font-size: 14px;
            line-height: 1.7;
            font-weight: 600;
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
            font-size: 11px;
            font-weight: 900;
            letter-spacing: 0.22em;
            text-transform: uppercase;
          }

          .detail-card h2 {
            margin: 16px 0 0;
            font-size: clamp(28px, 3vw, 48px);
            line-height: 1;
            letter-spacing: -0.05em;
            font-weight: 900;
            text-transform: uppercase;
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
            font-size: 14px;
            font-weight: 900;
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
            font-size: 15px;
            font-weight: 900;
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
            font-size: clamp(28px, 3vw, 46px);
            line-height: 1;
            letter-spacing: -0.05em;
            font-weight: 900;
            text-transform: uppercase;
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
            font-size: 18px;
            line-height: 1.15;
            letter-spacing: -0.03em;
            font-weight: 900;
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
            font-size: clamp(24px, 2.6vw, 36px);
            letter-spacing: -0.04em;
            line-height: 1.05;
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

        <section className="service-shell">
          <div className="hero-grid">
            <div className="hero-copy">
              <div className="eyebrow">{eyebrow}</div>
              <h1 className="service-title">{title}</h1>
              <p className="summary">{summary}</p>
              <div className="points">
                {points.map((point) => (
                  <div className="point" key={point}>
                    {point}
                  </div>
                ))}
              </div>
              <div className="service-actions">
                <Link className="service-button" href="/request-a-quote">
                  Request a Quote
                  <ArrowRight size={18} />
                </Link>
                <a className="service-button-alt" href="tel:+18609883887">
                  Call Us
                </a>
              </div>
            </div>

            <div className="service-media">
              <Image
                src={imageSrc}
                alt={imageAlt}
                fill
                priority
                sizes="(max-width: 1100px) 100vw, 46vw"
                className="service-image"
              />
              <div className="service-note">
                Reliable support, straightforward communication, and freight handling that stays on schedule.
              </div>
            </div>
          </div>
        </section>

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
                <Link className="cta-link secondary" href="/request-a-quote">Request a Quote</Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <FooterSection />
    </>
  );
}






