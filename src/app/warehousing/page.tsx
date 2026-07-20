import type { Metadata } from "next";
import Image from "next/image";
import { ArrowRight, BarChart3, Boxes, CheckCircle2, Package, ShieldCheck, Truck, Warehouse } from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";

export const metadata: Metadata = {
  title: "Warehousing Services | Expedited Transport Services",
  description: "Warehousing services from Expedited Transport Services.",
};

const serviceMarks = [
  {
    title: "Freight transportation",
    description: "Move shipments between facilities, customers, and distribution points.",
    icon: Truck,
  },
  {
    title: "Warehousing",
    description: "Store freight in a controlled, organized environment until it is ready to move.",
    icon: Warehouse,
  },
  {
    title: "Logistics",
    description: "Keep the supply chain coordinated with a team that manages the moving parts.",
    icon: BarChart3,
  },
  {
    title: "Inventory management",
    description: "Track what is on hand so materials stay easy to find and easy to move.",
    icon: Boxes,
  },
  {
    title: "Product security",
    description: "Protect freight with secure storage practices and close oversight.",
    icon: ShieldCheck,
  },
  {
    title: "Order fulfillment",
    description: "Get items packed, staged, and dispatched without unnecessary delay.",
    icon: Package,
  },
];

const detailBlocks = [
  {
    title: "An Organized Warehousing Company",
    text: "One of the benefits of using our warehousing and logistics services is our ability to keep all of your materials highly organized. We use state-of-the-art software and a systematic approach to ensure that all of your inventory is in the right place at the right time.",
  },
  {
    title: "Safe and Secure Warehousing Facility",
    text: "When your materials are under our care, you never have anything to worry about. Our advanced warehousing solutions offer an extremely secure location that is constantly monitored, climate-controlled, and organized.",
  },
  {
    title: "Great Rates on Warehousing Solutions",
    text: "If you are looking for reliable warehousing services that still fit into your budget, then we are here to help. We work hard to keep our operating costs low while still offering industry-leading warehousing and transportation services.",
  },
  {
    title: "Stay Informed with Our Warehousing Services",
    text: "Our friendly team of warehousing and logistics professionals is easy to work with and promises to help you stay up to date with your inventory. Our up-to-date inventory management software allows us to gather all of the details regarding your products quickly, so you will never be out of the loop.",
  },
  {
    title: "A Trusted Warehousing Company",
    text: "We have worked with businesses of many different shapes and sizes, so you can rest assured that we are equipped to meet your needs. With a great track record of success and a constantly evolving offering of services, we guarantee that you will benefit from our professional warehousing and logistics.",
  },
];

const highlights = [
  "Freight transportation",
  "Warehousing",
  "Logistics",
  "Inventory management",
  "Product security",
  "Order fulfillment",
];

export default function WarehousingPage() {
  return (
    <>
      <SiteHeader />
      <main className="warehousing-page">
        <style>{`
          .warehousing-page {
            min-height: 100vh;
            background:
              radial-gradient(circle at 12% 0%, rgba(182, 240, 0, 0.11), transparent 24%),
              radial-gradient(circle at 92% 12%, rgba(15, 23, 42, 0.06), transparent 22%),
              linear-gradient(180deg, #f8fafc 0%, #eef2f8 100%);
            color: #0f172a;
          }

          .hero-shell,
          .content-shell,
          .services-shell,
          .cta-shell {
            max-width: 1440px;
            margin: 0 auto;
            padding-left: 32px;
            padding-right: 32px;
          }

          .hero-shell {
            padding-top: 148px;
            padding-bottom: 42px;
          }

          .hero-grid {
            display: grid;
            grid-template-columns: minmax(0, 1.04fr) minmax(0, 0.96fr);
            gap: 24px;
            align-items: stretch;
          }

          .hero-panel {
            padding: 40px;
            border-radius: 36px;
            background: linear-gradient(180deg, #0f172a 0%, #111827 100%);
            color: #fff;
            box-shadow: 0 28px 60px rgba(15, 23, 42, 0.18);
            position: relative;
            overflow: hidden;
          }

          .hero-panel::after {
            content: "";
            position: absolute;
            inset: 18px 18px 18px auto;
            width: 10px;
            border-radius: 999px;
            background: linear-gradient(180deg, #b6f000 0%, #b6f000 68%, rgba(255,255,255,0.22) 68%, rgba(255,255,255,0.22) 100%);
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

          .hero-title {
            margin: 18px 0 0;
            max-width: 760px;
            font-size: clamp(42px, 5.5vw, 88px);
            line-height: 0.92;
            letter-spacing: -0.07em;
            font-weight: 900;
            text-transform: uppercase;
          }

          .hero-title span {
            color: #b6f000;
          }

          .hero-copy {
            max-width: 700px;
            margin: 22px 0 0;
            color: rgba(255,255,255,0.8);
            font-size: 18px;
            line-height: 1.9;
          }

          .hero-points {
            display: grid;
            grid-template-columns: repeat(3, minmax(0, 1fr));
            gap: 12px;
            margin-top: 26px;
          }

          .hero-point {
            padding: 14px 16px;
            border-radius: 16px;
            background: rgba(255,255,255,0.06);
            border: 1px solid rgba(255,255,255,0.08);
            color: rgba(255,255,255,0.92);
            font-size: 13px;
            line-height: 1.45;
            min-height: 60px;
          }

          .hero-actions {
            display: flex;
            flex-wrap: wrap;
            gap: 14px;
            margin-top: 28px;
          }

          .button,
          .button-alt {
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

          .button {
            background: #b6f000;
            color: #0f172a;
            box-shadow: 0 16px 32px rgba(182, 240, 0, 0.16);
          }

          .button-alt {
            background: rgba(255,255,255,0.08);
            color: #fff;
            border: 1px solid rgba(255,255,255,0.12);
          }

          .button:hover,
          .button-alt:hover {
            transform: translateY(-2px);
          }

          .hero-media {
            position: relative;
            min-height: 640px;
            border-radius: 36px;
            overflow: hidden;
            background: linear-gradient(145deg, #ffffff 0%, #e7ecf4 100%);
            box-shadow: 0 28px 60px rgba(15, 23, 42, 0.14);
          }

          .hero-image {
            object-fit: cover;
            object-position: center 50%;
          }

          .hero-stamp {
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

          .content-shell {
            padding-top: 24px;
            padding-bottom: 84px;
          }

          .intro-grid {
            display: grid;
            grid-template-columns: minmax(0, 1.08fr) minmax(0, 0.92fr);
            gap: 22px;
            align-items: start;
          }

          .intro-card {
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

          .intro-card h2 {
            margin: 16px 0 0;
            font-size: clamp(28px, 3vw, 48px);
            line-height: 1;
            letter-spacing: -0.05em;
            font-weight: 900;
            text-transform: uppercase;
            max-width: 13ch;
          }

          .intro-card p {
            margin: 18px 0 0;
            color: #475569;
            line-height: 1.9;
            font-size: 17px;
          }

          .tag-row {
            display: flex;
            flex-wrap: wrap;
            gap: 10px;
            margin-top: 22px;
          }

          .tag {
            display: inline-flex;
            align-items: center;
            padding: 10px 14px;
            border-radius: 999px;
            background: rgba(15, 23, 42, 0.05);
            color: #0f172a;
            font-size: 13px;
            font-weight: 700;
          }

          .detail-stack {
            display: grid;
            gap: 14px;
          }

          .detail-tile {
            padding: 22px 24px;
            border-radius: 22px;
            background: rgba(15, 23, 42, 0.03);
            border: 1px solid rgba(15, 23, 42, 0.06);
          }

          .detail-top {
            display: flex;
            align-items: center;
            gap: 12px;
            margin-bottom: 12px;
          }

          .detail-index {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            width: 34px;
            height: 34px;
            border-radius: 12px;
            background: #0f172a;
            color: #b6f000;
            font-size: 12px;
            font-weight: 900;
          }

          .detail-tile strong {
            font-size: 15px;
            font-weight: 900;
            text-transform: uppercase;
            letter-spacing: 0.08em;
          }

          .detail-tile p {
            margin: 0;
            color: #64748b;
            line-height: 1.75;
            font-size: 14px;
          }

          .services-shell {
            padding-bottom: 84px;
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
            gap: 16px;
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
            padding-bottom: 92px;
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
            .intro-grid {
              grid-template-columns: 1fr;
            }

            .service-grid {
              grid-template-columns: repeat(2, minmax(0, 1fr));
            }
          }

          @media (max-width: 720px) {
            .hero-shell,
            .content-shell,
            .services-shell,
            .cta-shell {
              padding-left: 18px;
              padding-right: 18px;
            }

            .hero-shell {
              padding-top: 120px;
              padding-bottom: 26px;
            }

            .hero-panel,
            .intro-card,
            .cta-band {
              padding: 24px;
              border-radius: 26px;
            }

            .hero-title {
              font-size: clamp(36px, 12vw, 58px);
            }

            .hero-copy,
            .intro-card p {
              font-size: 16px;
            }

            .hero-points {
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

        <section className="hero-shell">
          <div className="hero-grid">
            <div className="hero-panel">
              <div className="eyebrow">Warehousing Services</div>
              <h1 className="hero-title">
                Storage That Stays <span>Organized</span>
              </h1>
              <p className="hero-copy">
                Your goods and materials won&apos;t always have to be transported to their final destination as soon as they leave your facility and if that&apos;s the case, the warehousing solutions from Expedited Transport Services are a valuable resource. We go above and beyond to provide our clients with convenient warehousing services that will help keep their supply chain organized.
              </p>
              <div className="hero-points">
                <div className="hero-point">Monitored inventory and clean access to stored freight.</div>
                <div className="hero-point">Climate-controlled handling that keeps products protected.</div>
                <div className="hero-point">Reliable transport support when items need to move.</div>
              </div>
              <p className="hero-copy" style={{ fontSize: 16, marginTop: 22 }}>
                Learn more by contacting us today at <a href="tel:+18609883887" style={{ color: "#fff", fontWeight: 800, textDecoration: "none" }}>(860) 988-3887</a>.
              </p>
              <div className="hero-actions">
                <a className="button" href="tel:+18609883887">
                  Get in touch
                  <ArrowRight size={18} />
                </a>
                <a className="button-alt" href="/request-a-quote">
                  Request a Quote
                </a>
              </div>
            </div>

            <div className="hero-media">
              <Image
                src="/images/truck4.jpg"
                alt="Warehousing support"
                fill
                priority
                sizes="(max-width: 1100px) 100vw, 46vw"
                className="hero-image"
              />
              <div className="hero-stamp">
                Clean, organized warehousing with room to move. Built to keep your freight ready for the next step.
              </div>
            </div>
          </div>
        </section>

        <section className="content-shell">
          <div className="intro-grid">
            <article className="intro-card">
              <div className="section-kicker">Your Source for Transportation and Warehousing</div>
              <h2>We keep freight moving and inventory in order.</h2>
              <p>
                We take pride in being a warehousing and logistics company that provides a wide range of services for the benefit of our clients. Much more than just warehousing, we are here to take care of everything you need to ensure your supply chain keeps moving as smoothly as possible.
              </p>
              <div className="tag-row">
                {highlights.map((item) => (
                  <span className="tag" key={item}>
                    {item}
                  </span>
                ))}
              </div>
            </article>

            <div className="detail-stack">
              {detailBlocks.map((block, index) => (
                <article className="detail-tile" key={block.title}>
                  <div className="detail-top">
                    <span className="detail-index">{String(index + 1).padStart(2, "0")}</span>
                    <strong>{block.title}</strong>
                  </div>
                  <p>{block.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="services-shell">
          <div className="section-head">
            <h2>Services we can handle</h2>
            <p>
              Some of the services we are equipped to provide include freight transportation, warehousing, logistics, inventory management, product security, order fulfillment, and more.
            </p>
          </div>

          <div className="service-grid">
            {serviceMarks.map((item, index) => {
              const Icon = item.icon;
              return (
                <article className="service-card" key={item.title}>
                  <span className="service-badge">
                    <Icon size={22} />
                  </span>
                  <h3>{String(index + 1).padStart(2, "0")}. {item.title}</h3>
                  <p>{item.description}</p>
                </article>
              );
            })}
          </div>
        </section>

        <section className="cta-shell">
          <div className="cta-band">
            <div className="cta-inner">
              <div>
                <h3>Keep your supply chain organized.</h3>
                <p>
                  If you need warehousing support that keeps materials in order and transportation moving, we are ready to help.
                </p>
              </div>
              <div className="cta-actions">
                <a className="cta-link" href="tel:+18609883887">(860) 988-3887</a>
                <a className="cta-link secondary" href="/request-a-quote">Request a Quote</a>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
