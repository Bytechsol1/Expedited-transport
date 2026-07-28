import type { Metadata } from "next";
import Image from "next/image";
import {
  ArrowRight,
  BarChart3,
  Boxes,
  Clock3,
  Package,
  ShieldCheck,
  Truck,
  Warehouse,
} from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";
import { FooterSection } from "@/components/FooterSection";

export const metadata: Metadata = {
  title: "Warehousing Services | Expedited Transport Services",
  description: "Warehousing services from Expedited Transport Services.",
};


const warehousingSections = [
  {
    title: "An Organized Warehousing Company",
    text: "One of the benefits of using our warehousing and logistics services is our ability to keep all of your materials highly organized. We use state-of-the-art software and a systematic approach to ensure that all of your inventory is in the right place at the right time.",
    accent: "01",
  },
  {
    title: "Safe and Secure Warehousing Facility",
    text: "When your materials are under our care, you never have anything to worry about. Our advanced warehousing solutions offer an extremely secure location that is constantly monitored, climate-controlled, and organized. You never have to worry about any damage to your products or having them go missing when you trust them with us.",
    accent: "02",
  },
  {
    title: "Great Rates on Warehousing Solutions",
    text: "If you are looking for reliable warehousing services that still fit into your budget, then we are here to help. We work hard to keep our operating costs low while still offering industry-leading warehousing and transportation services, which means you can always count on us for valuable services that won't hurt your bottom line.",
    accent: "03",
  },
  {
    title: "Stay Informed with Our Warehousing Services",
    text: "Our friendly team of warehousing and logistics professionals is easy to work with and promises to help you stay up to date with your inventory. If you ever need information on the status of the materials you are storing with us, we make it easy to get it. Our up-to-date inventory management software allows us to gather all of the details regarding your products quickly, so you will never be out of the loop.",
    accent: "04",
  },
  {
    title: "A Trusted Warehousing Company",
    text: "We have worked with businesses of many different shapes and sizes, so you can rest assured that we are equipped to meet your needs. With a great track record of success and a constantly evolving offering of services, we guarantee that you will benefit from our professional warehousing and logistics.",
    accent: "05",
  },
] as const;


const warehousingServices = [
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
    icon: Clock3,
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
  {
    title: "And more",
    description: "Flexible support built around the rest of your supply chain needs.",
    icon: BarChart3,
  },
] as const;
export default function WarehousingPage() {
  return (
    <>
      <SiteHeader />
      <main className="warehousing-page">
        <style>{`
          .warehousing-page {
            min-height: 100vh;
            overflow-x: hidden;
            color: #0f172a;
            background:
              radial-gradient(circle at 10% 0%, rgba(182, 240, 0, 0.11), transparent 26%),
              radial-gradient(circle at 88% 10%, rgba(59, 130, 246, 0.08), transparent 20%),
              linear-gradient(180deg, #f7f9fc 0%, #edf2f8 100%);
          }

          .page-shell {
            max-width: 1440px;
            margin: 0 auto;
            padding-left: 32px;
            padding-right: 32px;
          }

          .hero-section {
            padding-top: 132px;
            padding-bottom: 78px;
          }

          .hero-grid {
            display: grid;
            grid-template-columns: minmax(0, 1.1fr) minmax(0, 0.9fr);
            gap: 28px;
            align-items: center;
          }

          .hero-copy {
            min-width: 0;
            padding: 46px;
            border-radius: 36px;
            color: #fff;
            background:
              radial-gradient(circle at top right, rgba(182, 240, 0, 0.16), transparent 22%),
              linear-gradient(145deg, #08111f 0%, #0d1728 58%, #111827 100%);
            box-shadow: 0 32px 72px rgba(15, 23, 42, 0.18);
            position: relative;
            overflow: hidden;
          }

          .hero-copy::before {
            content: "";
            position: absolute;
            inset: 0;
            background: linear-gradient(135deg, rgba(255,255,255,0.03) 0%, transparent 54%);
            pointer-events: none;
          }

          .hero-title {
            margin: 4px 0 0;
            max-width: 11ch;
            font-family: var(--font-primary);
            font-size: clamp(52px, 5.8vw, 96px);
            line-height: 0.98;
            letter-spacing: -0.02em;
            font-weight: 450;
          }

          .hero-summary {
            margin: 24px 0 0;
            max-width: 680px;
            color: rgba(255, 255, 255, 0.84);
            font-size: 18px;
            line-height: 1.85;
            overflow-wrap: anywhere;
          }

          .hero-actions {
            display: flex;
            flex-wrap: wrap;
            gap: 14px;
            margin-top: 30px;
          }

          .cta-button {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            gap: 12px;
            min-height: 56px;
            padding: 0 22px;
            border-radius: 16px;
            text-decoration: none;
            font-size: 14px;
            font-weight: 900;
            letter-spacing: 0.12em;
            text-transform: uppercase;
            transition: transform 0.2s ease, box-shadow 0.2s ease, background 0.2s ease;
          }

          .cta-button:hover {
            transform: translateY(-2px);
          }

          .cta-button--primary {
            background: #b6f000;
            color: #0f172a;
            box-shadow: 0 18px 32px rgba(182, 240, 0, 0.18);
          }

          .hero-aside {
            min-width: 0;
            display: grid;
            gap: 16px;
          }

          .hero-media {
            position: relative;
            min-height: 620px;
            border-radius: 36px;
            overflow: hidden;
            background: linear-gradient(145deg, #ffffff 0%, #e7ecf4 100%);
            box-shadow: 0 28px 60px rgba(15, 23, 42, 0.14);
          }

          .hero-image {
            position: absolute;
            inset: 0;
            width: 100%;
            height: 100%;
            object-fit: cover;
            object-position: center 52%;
          }
          .story-section {
            padding-bottom: 96px;
          }

          .story-rail {
            display: grid;
            grid-template-columns: minmax(0, 0.92fr) minmax(0, 1.08fr);
            gap: 26px;
            align-items: stretch;
          }

          .story-services-wrap {
            min-width: 0;
            display: grid;
            gap: 18px;
            align-content: start;
          }

          .story-intro {
            min-width: 0;
            position: relative;
            padding: 40px 38px 34px;
            border-radius: 34px;
            background:
              radial-gradient(circle at top right, rgba(182, 240, 0, 0.16), transparent 22%),
              linear-gradient(145deg, #08111f 0%, #0d1728 58%, #111827 100%);
            color: #fff;
            border: 1px solid rgba(182, 240, 0, 0.08);
            box-shadow: 0 32px 72px rgba(15, 23, 42, 0.18);
            overflow: hidden;
          }

          .story-intro::before {
            content: "";
            position: absolute;
            inset: 0 auto auto 0;
            width: 100%;
            height: 4px;
            background: linear-gradient(90deg, #0f172a 0%, #b6f000 100%);
          }

          .story-intro .section-kicker {
            background: rgba(255, 255, 255, 0.08);
            color: #dce7f9;
          }

          .story-intro h2 {
            margin: 16px 0 0;
            max-width: 10ch;
            font-family: var(--font-primary);
            font-size: clamp(34px, 3.6vw, 60px);
            line-height: 0.98;
            letter-spacing: -0.03em;
            font-weight: 450;
            color: #fff;
            overflow-wrap: anywhere;
          }

          .story-intro p {
            margin: 18px 0 0;
            max-width: 60ch;
            color: rgba(255, 255, 255, 0.82);
            font-size: 17px;
            line-height: 1.9;
            overflow-wrap: anywhere;
          }

          .story-intro__note {
            margin-top: 24px;
            padding: 18px 20px;
            border-radius: 18px;
            background: rgba(255, 255, 255, 0.06);
            border-left: 4px solid #b6f000;
            color: #fff;
            font-family: var(--font-mono);
            font-size: 14px;
            font-weight: 700;
            letter-spacing: 0.08em;
            text-transform: uppercase;
          }

          .story-details {
            padding-top: 0;
          }

          .story-timeline {
            position: relative;
            display: grid;
            gap: 18px;
            padding: 8px 0 0;
            max-width: 1180px;
            margin: 0 auto;
          }

          .story-timeline::before {
            content: "";
            position: absolute;
            left: 50%;
            top: 0;
            bottom: 0;
            width: 2px;
            transform: translateX(-50%);
            background: linear-gradient(180deg, rgba(15, 23, 42, 0.08), rgba(182, 240, 0, 0.65), rgba(15, 23, 42, 0.08));
          }

          .story-event {
            min-width: 0;
            display: grid;
            grid-template-columns: minmax(0, 1fr) 110px minmax(0, 1fr);
            gap: 18px;
            align-items: center;
            position: relative;
          }

          .story-event__number {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            width: 74px;
            height: 74px;
            border-radius: 24px;
            background: #b6f000;
            color: #0f172a;
            font-family: var(--font-mono);
            font-size: 13px;
            font-weight: 700;
            letter-spacing: 0.1em;
            box-shadow: 0 14px 28px rgba(182, 240, 0, 0.2);
            position: relative;
            z-index: 1;
            justify-self: center;
          }

          .story-event__card {
            min-width: 0;
            width: 100%;
            max-width: 560px;
            padding: 22px 24px;
            border-radius: 24px;
            background: linear-gradient(160deg, #0f172a 0%, #111827 100%);
            color: #fff;
            box-shadow: 0 22px 48px rgba(15, 23, 42, 0.12);
            border: 1px solid rgba(182, 240, 0, 0.08);
            display: grid;
            gap: 10px;
          }

          .story-event__card--left {
            justify-self: end;
          }

          .story-event__card--right {
            justify-self: start;
          }

          .story-event__spacer {
            min-height: 1px;
          }

          .story-event--light .story-event__card {
            background: rgba(255, 255, 255, 0.92);
            color: #0f172a;
            border-color: rgba(15, 23, 42, 0.08);
          }

          .story-event__eyebrow {
            display: inline-flex;
            align-items: center;
            gap: 10px;
            font-family: var(--font-mono);
            font-size: 12px;
            font-weight: 700;
            letter-spacing: 0.14em;
            text-transform: uppercase;
            color: rgba(255, 255, 255, 0.68);
          }

          .story-event--light .story-event__eyebrow {
            color: #64748b;
          }

          .story-event__eyebrow::before {
            content: "";
            width: 14px;
            height: 2px;
            border-radius: 999px;
            background: #b6f000;
          }

          .story-event__card h3 {
            margin: 0;
            font-family: var(--font-primary);
            font-size: 18px;
            line-height: 1.2;
            letter-spacing: -0.02em;
            font-weight: 600;
            overflow-wrap: anywhere;
          }

          .story-event__card p {
            margin: 0;
            color: inherit;
            opacity: 0.84;
            font-size: 14px;
            line-height: 1.72;
            overflow-wrap: anywhere;
          }

          .intro-section {
            padding-bottom: 96px;
          }

          .intro-grid {
            display: grid;
            grid-template-columns: minmax(0, 1.08fr) minmax(0, 0.92fr);
            gap: 24px;
            align-items: start;
          }

          .intro-panel {
            min-width: 0;
            padding: 34px;
            border-radius: 34px;
            background: rgba(255, 255, 255, 0.86);
            border: 1px solid rgba(15, 23, 42, 0.08);
            box-shadow: 0 24px 54px rgba(15, 23, 42, 0.06);
            backdrop-filter: blur(10px);
          }

          .intro-panel .section-kicker,
          .section-head .section-kicker {
            background: rgba(15, 23, 42, 0.06);
            color: #64748b;
          }

          .intro-panel h2 {
            margin: 16px 0 0;
            max-width: 12ch;
            font-family: var(--font-primary);
            font-size: clamp(30px, 3.2vw, 54px);
            line-height: 1;
            letter-spacing: -0.03em;
            font-weight: 450;
            overflow-wrap: anywhere;
          }

          .intro-panel p {
            margin: 18px 0 0;
            color: #475569;
            font-size: 17px;
            line-height: 1.9;
            overflow-wrap: anywhere;
          }

          .intro-panel a {
            color: #0f172a;
            font-weight: 800;
            text-decoration: underline;
            text-decoration-color: rgba(15, 23, 42, 0.2);
            text-underline-offset: 2px;
          }

          .bullet-grid {
            display: grid;
            grid-template-columns: repeat(2, minmax(0, 1fr));
            gap: 12px;
            margin-top: 24px;
          }

          .bullet-item {
            display: flex;
            align-items: flex-start;
            gap: 12px;
            padding: 14px 16px;
            border-radius: 18px;
            background: rgba(15, 23, 42, 0.04);
            color: #0f172a;
            font-size: 15px;
            line-height: 1.55;
            min-width: 0;
          }

          .bullet-item svg {
            flex-shrink: 0;
            margin-top: 1px;
            color: #7a9900;
          }

          .side-stack {
            display: grid;
            gap: 14px;
          }

          .side-card {
            min-width: 0;
            padding: 24px;
            border-radius: 26px;
            background: linear-gradient(180deg, #0f172a 0%, #111827 100%);
            color: #fff;
            border: 1px solid rgba(182, 240, 0, 0.1);
            box-shadow: 0 22px 48px rgba(15, 23, 42, 0.12);
          }

          .side-card--light {
            background: rgba(255, 255, 255, 0.92);
            color: #0f172a;
            border-color: rgba(15, 23, 42, 0.08);
          }

          .side-index {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            width: 36px;
            height: 36px;
            border-radius: 12px;
            background: #b6f000;
            color: #0f172a;
            font-family: var(--font-mono);
            font-size: 12px;
            font-weight: 700;
            margin-bottom: 14px;
          }

          .side-card h3 {
            margin: 0;
            font-family: var(--font-primary);
            font-size: 18px;
            line-height: 1.2;
            letter-spacing: -0.02em;
            font-weight: 600;
            overflow-wrap: anywhere;
          }

          .side-card p {
            margin: 14px 0 0;
            color: inherit;
            opacity: 0.8;
            font-size: 15px;
            line-height: 1.8;
            overflow-wrap: anywhere;
          }

          .services-section {
            padding-bottom: 96px;
          }

          .section-head {
            display: grid;
            grid-template-columns: minmax(0, 1fr) minmax(0, 620px);
            gap: 24px;
            align-items: end;
            margin-bottom: 24px;
          }

          .section-head h2 {
            margin: 12px 0 0;
            font-family: var(--font-primary);
            font-size: clamp(30px, 3.4vw, 54px);
            line-height: 1;
            letter-spacing: -0.03em;
            font-weight: 450;
            overflow-wrap: anywhere;
          }

          .section-head p {
            margin: 0;
            color: #475569;
            font-size: 17px;
            line-height: 1.85;
            overflow-wrap: anywhere;
          }

          .service-grid {
            display: grid;
            grid-template-columns: repeat(2, minmax(0, 1fr));
            gap: 18px;
          }

          .service-card {
            min-width: 0;
            padding: 24px;
            border-radius: 28px;
            background: linear-gradient(160deg, #0f172a 0%, #111827 100%);
            color: #fff;
            border: 1px solid rgba(182, 240, 0, 0.08);
            box-shadow: 0 22px 48px rgba(15, 23, 42, 0.12);
            position: relative;
            overflow: hidden;
            display: grid;
            gap: 14px;
            min-height: 208px;
          }

          .service-card::before {
            content: "";
            position: absolute;
            inset: 0 auto auto 0;
            width: 100%;
            height: 3px;
            background: linear-gradient(90deg, #b6f000, rgba(182, 240, 0, 0.15));
          }

          .service-badge {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            width: 54px;
            height: 54px;
            border-radius: 18px;
            background: rgba(182, 240, 0, 0.14);
            color: #b6f000;
          }

          .service-card h3 {
            margin: 0;
            font-family: var(--font-primary);
            font-size: 17px;
            line-height: 1.25;
            letter-spacing: -0.02em;
            font-weight: 600;
            overflow-wrap: anywhere;
          }

          .service-card p {
            margin: 0;
            color: rgba(255, 255, 255, 0.78);
            font-size: 15px;
            line-height: 1.75;
            overflow-wrap: anywhere;
          }

          .service-card--light {
            background: rgba(255, 255, 255, 0.92);
            color: #0f172a;
            border-color: rgba(15, 23, 42, 0.08);
          }

          .service-card--light p {
            color: #475569;
          }

          .service-card--light .service-badge {
            background: #0f172a;
            color: #b6f000;
          }

          .cta-section {
            padding-bottom: 120px;
          }

          .cta-band {
            min-width: 0;
            padding: 34px;
            border-radius: 32px;
            background:
              radial-gradient(circle at top right, rgba(182, 240, 0, 0.14), transparent 20%),
              linear-gradient(135deg, #0f172a 0%, #111827 60%, #15213a 100%);
            color: #fff;
            box-shadow: 0 32px 64px rgba(15, 23, 42, 0.18);
            display: grid;
            grid-template-columns: minmax(0, 1fr) auto;
            gap: 24px;
            align-items: center;
          }

          .cta-icon {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            width: 54px;
            height: 54px;
            border-radius: 18px;
            background: rgba(182, 240, 0, 0.14);
            color: #b6f000;
          }

          .cta-copy h2 {
            margin: 16px 0 0;
            max-width: 12ch;
            font-family: var(--font-primary);
            font-size: clamp(30px, 3.4vw, 52px);
            line-height: 1;
            letter-spacing: -0.03em;
            font-weight: 450;
            overflow-wrap: anywhere;
          }

          .cta-copy p {
            margin: 18px 0 0;
            color: rgba(255, 255, 255, 0.8);
            font-size: 16px;
            line-height: 1.85;
            overflow-wrap: anywhere;
          }

          .section-kicker--dark {
            background: rgba(255, 255, 255, 0.08);
            color: #dce7f9;
          }

          .cta-actions {
            display: flex;
            flex-direction: column;
            gap: 12px;
            min-width: 240px;
          }

          .cta-link {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            min-width: 100%;
            min-height: 52px;
            padding: 0 20px;
            border-radius: 16px;
            background: #b6f000;
            color: #0f172a;
            text-decoration: none;
            font-size: 14px;
            font-weight: 900;
            letter-spacing: 0.1em;
            text-transform: uppercase;
            transition: transform 0.2s ease, box-shadow 0.2s ease, background 0.2s ease;
          }

          .cta-link:hover {
            transform: translateY(-2px);
          }

          .cta-link.secondary {
            background: rgba(255, 255, 255, 0.08);
            color: #fff;
            border: 1px solid rgba(255, 255, 255, 0.14);
          }

          @media (max-width: 1180px) {
            .hero-grid,
            .story-rail,
            .intro-grid,
            .section-head,
            .cta-band {
              grid-template-columns: 1fr;
            }

            .hero-media {
              min-height: 520px;
            }

            .service-grid {
              grid-template-columns: repeat(2, minmax(0, 1fr));
            }
          }

          @media (max-width: 760px) {
            .page-shell {
              padding-left: 18px;
              padding-right: 18px;
            }

            .hero-section {
              padding-top: 118px;
              padding-bottom: 62px;
            }
            .hero-copy,
            .intro-panel,
            .cta-band,
            .source-panel {
              padding: 24px;
              border-radius: 24px;
            }

            .hero-title {
              font-size: clamp(42px, 13vw, 66px);
            }

            .hero-summary,
            .intro-panel p,
            .section-head p,
            .service-card p,
            .cta-copy p,
            .story-intro p,
            .story-event__card p {
              font-size: 16px;
            }

            .hero-media {
              min-height: 360px;
            }

            .bullet-grid,
            .service-grid {
              grid-template-columns: 1fr;
            }

            .story-timeline {
              padding-top: 0;
            }

            .story-timeline::before {
              display: none;
            }

            .story-event {
              grid-template-columns: 1fr;
              gap: 12px;
              justify-items: stretch;
            }

            .story-event__number {
              width: 60px;
              height: 60px;
              border-radius: 20px;
              justify-self: center;
              order: 0;
            }

            .story-event__card {
              max-width: none;
              justify-self: stretch;
              order: 1;
            }

            .story-event__spacer {
              display: none;
            }

            .cta-actions {
              min-width: 0;
            }
          }
        `}</style>

        <section className="hero-section page-shell">
          <div className="hero-grid">
            <article className="hero-copy">              <h1 className="hero-title">Warehousing Services</h1>
              <p className="hero-summary">
                Your goods and materials won&apos;t always have to be transported to their final destination as soon as they leave your facility—and if that&apos;s the case, the warehousing solutions from Expedited Transport Services are a valuable resource. We go above and beyond to provide our clients with convenient warehousing services that will help keep their supply chain organized.
              </p>
              <p className="hero-summary" style={{ marginTop: 18, fontSize: 16 }}>
                Learn more by contacting us today at (860) 988-3887.
              </p>
              <div className="hero-actions">
                <a className="cta-button cta-button--primary" href="#contact">
                  Get in touch
                  <ArrowRight size={18} />
                </a>
              </div>
            </article>

            <div className="hero-aside">
              <div className="hero-media">
                <Image
                  src="/images/ware-hires.jpg"
                  alt="Warehousing support"
                  className="hero-image"
                  fill
                  priority
                  quality={100}
                  sizes="(max-width: 1180px) 100vw, 48vw"
                />


              </div>
            </div>
          </div>
        </section>
        <section className="story-section page-shell">
          <div className="story-rail">
            <article className="story-intro">
              <span className="section-kicker">Your Source for Transportation and Warehousing</span>
              <h2>We take pride in being a warehousing and logistics company.</h2>
              <p>
                We take pride in being a warehousing and logistics company that provides a wide range of services for the benefit of our clients. Much more than just warehousing, we are here to take care of everything you need to ensure your supply chain keeps moving as smoothly as possible.
              </p>
              <div className="story-intro__note">Some of the services we are equipped to provide include:</div>
            </article>

            <div className="story-services-wrap">
              <div className="service-grid story-service-grid">
                {warehousingServices.map((service, index) => {
                  const Icon = service.icon;
                  return (
                    <article
                      key={service.title}
                      className={index % 2 === 0 ? "service-card" : "service-card service-card--light"}
                    >
                      <span className="service-badge">
                        <Icon size={22} strokeWidth={2.2} />
                      </span>
                      <h3>{service.title}</h3>
                      <p>{service.description}</p>
                    </article>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        <section className="story-section story-details page-shell">
          <div className="story-timeline">
            {warehousingSections.map((section, index) => (
              <article
                key={section.title}
                className={index % 2 === 0 ? "story-event story-event--left" : "story-event story-event--right story-event--light"}
              >
                {index % 2 === 0 ? (
                  <div className="story-event__card story-event__card--left">
                    <span className="story-event__eyebrow">Operational focus</span>
                    <h3>{section.title}</h3>
                    <p>{section.text}</p>
                  </div>
                ) : (
                  <div className="story-event__spacer" aria-hidden="true" />
                )}

                <span className="story-event__number">{section.accent}</span>

                {index % 2 === 0 ? (
                  <div className="story-event__spacer" aria-hidden="true" />
                ) : (
                  <div className="story-event__card story-event__card--right">
                    <span className="story-event__eyebrow">Operational focus</span>
                    <h3>{section.title}</h3>
                    <p>{section.text}</p>
                  </div>
                )}
              </article>
            ))}
          </div>
        </section>

        <section className="cta-section page-shell" id="contact">
          <div className="cta-band">
            <div className="cta-copy">
              <span className="cta-icon">
                <Truck size={24} strokeWidth={2.2} />
              </span>
              <h2>Learn More About Our Warehousing</h2>
              <p>
                Take some of the hassle out of your supply chain and inventory management with the help from Expedited Transport Services. We are always available to answer your questions and help you get started with us, so reach us at (860) 988-3887 today.
              </p>
            </div>
            <div className="cta-actions">
              <a className="cta-link" href="tel:+18609883887">
                CALL US
              </a>
              <a
                className="cta-link secondary"
                href="https://expeditedtransportservices.net/contact-us/"
                target="_blank"
                rel="noreferrer"
              >
                MESSAGE US
              </a>
            </div>
          </div>
        </section>
      </main>
      <FooterSection />
    </>
  );
}









