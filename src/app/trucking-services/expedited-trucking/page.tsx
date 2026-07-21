import Image from "next/image";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";
import { servicePages } from "@/lib/service-pages";

const benefits = [
  "Guaranteed delivery times",
  "Real-time status notifications",
  "Fewer stops and flexible deliveries",
  "Reduced handling of your items",
  "Dedicated customer service",
];

export const metadata = servicePages.expeditedTrucking.metadata;

export default function ExpeditedTruckingPage() {
  return (
    <>
      <SiteHeader />
      <main className="expedited-page">
        <style>{`
          .expedited-page {
            min-height: 100vh;
            background:
              radial-gradient(circle at top left, rgba(182, 240, 0, 0.18), transparent 28%),
              linear-gradient(180deg, #f8fafc 0%, #eef2f7 100%);
            color: #0f172a;
          }

          .expedited-shell {
            max-width: 1400px;
            margin: 0 auto;
            padding: 132px 32px 96px;
          }

          .expedited-hero {
            display: grid;
            grid-template-columns: minmax(0, 1.05fr) minmax(0, 0.95fr);
            gap: 28px;
            align-items: stretch;
          }

          .hero-copy {
            position: relative;
            overflow: hidden;
            border-radius: 34px;
            background: linear-gradient(180deg, #0f172a 0%, #111827 100%);
            color: #fff;
            padding: 46px;
            box-shadow: 0 28px 60px rgba(15, 23, 42, 0.18);
          }

          .hero-title {
            margin: 18px 0 0;
            max-width: 11ch;
            font-size: clamp(42px, 5.7vw, 86px);
            line-height: 0.94;
            letter-spacing: -0.07em;
            font-weight: 900;
            text-transform: uppercase;
          }

          .hero-summary {
            max-width: 690px;
            margin: 28px 0 0;
            color: rgba(255,255,255,0.84);
            font-size: 18px;
            line-height: 1.9;
          }

          .hero-actions {
            display: flex;
            gap: 14px;
            flex-wrap: wrap;
            margin-top: 34px;
          }

          .hero-button {
            display: inline-flex;
            align-items: center;
            gap: 12px;
            padding: 16px 24px;
            border-radius: 16px;
            background: #b6f000;
            color: #0f172a;
            text-decoration: none;
            font-size: 14px;
            font-weight: 900;
            letter-spacing: 0.12em;
            text-transform: uppercase;
            box-shadow: 0 16px 32px rgba(182, 240, 0, 0.16);
            transition: transform 0.2s ease, box-shadow 0.2s ease;
          }

          .hero-button:hover {
            transform: translateY(-2px);
            box-shadow: 0 22px 42px rgba(182, 240, 0, 0.22);
          }

          .hero-media {
            position: relative;
            min-height: 540px;
            border-radius: 34px;
            overflow: hidden;
            background: linear-gradient(145deg, #ffffff 0%, #e7ecf4 100%);
            box-shadow: 0 28px 60px rgba(15, 23, 42, 0.14);
          }

          .hero-image {
            object-fit: cover;
            object-position: center;
          }

          .content-shell {
            max-width: 1400px;
            margin: 0 auto;
            padding: 0 32px 120px;
          }

          .content-grid {
            display: grid;
            grid-template-columns: minmax(0, 1.08fr) minmax(0, 0.92fr);
            gap: 28px;
            align-items: start;
          }

          .content-card,
          .feature-card,
          .closing-card {
            border-radius: 30px;
            background: rgba(255,255,255,0.88);
            border: 1px solid rgba(15, 23, 42, 0.08);
            box-shadow: 0 22px 46px rgba(15, 23, 42, 0.06);
          }

          .content-card {
            padding: 32px;
          }

          .kicker {
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

          .content-card h2,
          .feature-card h3,
          .closing-card h3 {
            margin: 16px 0 0;
            letter-spacing: -0.05em;
            text-transform: uppercase;
          }

          .content-card h2 {
            font-size: clamp(30px, 3.5vw, 54px);
            line-height: 0.98;
          }

          .content-card p,
          .feature-card p,
          .closing-card p {
            color: #475569;
            line-height: 1.9;
            font-size: 17px;
          }

          .benefit-list {
            display: grid;
            gap: 12px;
            margin-top: 22px;
          }

          .benefit-item {
            display: flex;
            gap: 12px;
            align-items: flex-start;
            padding: 14px 16px;
            border-radius: 18px;
            background: rgba(15, 23, 42, 0.03);
            border: 1px solid rgba(15, 23, 42, 0.05);
          }

          .benefit-item svg {
            flex-shrink: 0;
            margin-top: 2px;
            color: #0f172a;
          }

          .benefit-item strong {
            display: block;
            margin-bottom: 4px;
            font-size: 14px;
            font-weight: 900;
            text-transform: uppercase;
            letter-spacing: 0.08em;
          }

          .benefit-item span {
            color: #64748b;
            line-height: 1.6;
            font-size: 14px;
          }

          .stack {
            display: grid;
            gap: 16px;
          }

          .feature-card {
            padding: 26px 28px;
          }

          .feature-card h3 {
            font-size: clamp(24px, 2.5vw, 38px);
            line-height: 1;
          }

          .feature-card .label {
            display: inline-flex;
            align-items: center;
            gap: 10px;
            margin-top: 16px;
            color: #64748b;
            font-size: 12px;
            font-weight: 900;
            letter-spacing: 0.2em;
            text-transform: uppercase;
          }

          .closing-card {
            padding: 30px;
            margin-top: 28px;
          }

          .closing-card h3 {
            font-size: clamp(26px, 3vw, 42px);
            line-height: 1.02;
          }

          .closing-actions {
            display: flex;
            gap: 12px;
            flex-wrap: wrap;
            margin-top: 24px;
          }

          .closing-link {
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

          .closing-link.secondary {
            background: rgba(15, 23, 42, 0.08);
            color: #0f172a;
          }

          @media (max-width: 1100px) {
            .expedited-hero,
            .content-grid {
              grid-template-columns: 1fr;
            }
          }

          @media (max-width: 720px) {
            .expedited-shell {
              padding: 118px 18px 72px;
            }

            .content-shell {
              padding: 0 18px 96px;
            }

            .hero-copy {
              padding: 34px 24px;
            }

            .hero-summary,
            .content-card p,
            .feature-card p,
            .closing-card p {
              font-size: 16px;
            }

            .hero-media {
              min-height: 360px;
            }
          }
        `}</style>

        <section className="expedited-shell">
          <div className="expedited-hero">
            <div className="hero-copy">
              <h1 className="hero-title">Expedited Trucking</h1>
              <p className="hero-summary">
                If you are on a tight deadline and need freight delivered quickly, then Expedited Transport Services is the company to call. We are proud to offer expedited trucking services that you can rely on. Not only that, but we provide our dependable transportation services at great rates and alongside exceptional client care. Reach us today at (860) 988-3887 for a prompt response.
              </p>
              <div className="hero-actions">
                <a className="hero-button" href="tel:+18609883887">
                  Speak with us now
                  <ArrowRight size={18} />
                </a>
              </div>
            </div>

            <div className="hero-media">
              <Image
                src="/images/truck4.jpg"
                alt="Expedited Trucking Image"
                fill
                priority
                sizes="(max-width: 1100px) 100vw, 46vw"
                className="hero-image"
              />
            </div>
          </div>
        </section>

        <section className="content-shell">
          <div className="content-grid">
            <article className="content-card">
              <div className="kicker">Trust & Delivery</div>
              <h2>Trust Your Business with Our Expedited Freight Company</h2>
              <p>
                Having successfully completed many different accelerated shipping jobs, we have made a name for ourselves as a top-notch resource for quick and stress-free deliveries. If you are depending on materials reaching their destination by a particular date, we encourage you to get in touch with us and we will help you work out the details for your shipment as quickly as possible.
              </p>

              <div className="benefit-list">
                {benefits.map((benefit) => (
                  <div className="benefit-item" key={benefit}>
                    <CheckCircle2 size={18} />
                    <div>
                      <strong>{benefit}</strong>
                      <span>Built for time-sensitive freight that needs direct handling and clear updates.</span>
                    </div>
                  </div>
                ))}
              </div>
            </article>

            <div className="stack">
              <article className="feature-card">
                <div className="kicker">Any Load Size</div>
                <h3>The Expedited Trucking Company for Any Job</h3>
                <p>
                  Unlike some hotshot trucking companies, which can only accommodate smaller loads, we are happy to help you with cargo of all shapes and sizes. From single pallets to entire truckloads, our qualified team of trucking experts works hard to get your shipments delivered on time, no matter the distance.
                </p>
              </article>

              <article className="feature-card">
                <div className="kicker">Affordable Rates</div>
                <h3>Reasonable Rates on Expedited Trucking</h3>
                <p>
                  Just because you need your products delivered quickly does not mean it needs to hurt your bottom line. Thanks to our honest and affordable pricing structure, you can get your freight to where it needs to be without overspending.
                </p>
              </article>

              <article className="feature-card">
                <div className="kicker">Safety & Updates</div>
                <h3>Your Freight Is Safe and Easy to Track</h3>
                <p>
                  Fewer stops and fewer handling requirements during transit reduce the chance for damage or loss. We also provide real-time status updates throughout the process so you can stay informed from pickup to delivery.
                </p>
              </article>
            </div>
          </div>

          <article className="closing-card">
            <div className="kicker">Next Step</div>
            <h3>Get Started with Our Expedited Trucking Today</h3>
            <p>
              Whether you would like to know more about how we can accommodate your situation or would like to schedule our expedited shipping as soon as possible, we are here to help. We believe that our impressive history in the expedited trucking field makes us an easy choice to transport your freight quickly, carefully, and on budget. Speak with our experts today by calling (860) 988-3887.
            </p>
            <div className="closing-actions">
              <a className="closing-link" href="tel:+18609883887">
                Call Us
              </a>
                            <a className="closing-link secondary" href="mailto:c.taveras@expeditedtransportservices.net?subject=Expedited%20Trucking%20Inquiry">
                Message Us
              </a>
            </div>
          </article>
        </section>
      </main>
    </>
  );
}




