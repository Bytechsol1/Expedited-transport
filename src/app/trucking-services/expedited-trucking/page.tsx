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

          @media (max-width: 1024px) {
            .overlay-hero { padding: 120px 28px 48px; min-height: 90vh; }
            .truck-layer { width: 80%; }
            .hero-footer { flex-direction: column; align-items: flex-start; gap: 28px; }
          }

          @media (max-width: 640px) {
            .overlay-hero { padding: 110px 18px 36px; min-height: 80vh; }
            .bg-text span { -webkit-text-stroke: 1.5px #0f172a; }
            .truck-layer { width: 95%; }
            .hero-footer p { font-size: 16px; }
            .hero-cta { padding: 18px 32px; font-size: 13px; }
          }
        `}</style>

        <section className="overlay-hero">
          {/* Background giant text */}
          <div className="bg-text">
            <span style={{ textAlign: 'left', paddingLeft: '4vw', transform: 'translateY(-8vh)', fontSize: 'clamp(30px, 7vw, 120px)' }}>
              Expedited
            </span>
            <span style={{ textAlign: 'left', paddingLeft: '16vw', marginTop: '-4vh', position: 'relative', zIndex: 3, fontSize: 'clamp(30px, 7vw, 120px)' }}>
              Trucking
            </span>
          </div>

          {/* Truck image – overlaps text */}
          <div className="truck-layer" style={{ left: '73%', width: '75%', filter: 'drop-shadow(0px 25px 35px rgba(0, 0, 0, 0.3))' }}>
            <Image
              src="/images/expedited-new.png"
              alt="Expedited Trucking"
              fill
              priority
              sizes="(max-width: 1024px) 80vw, 62vw"
            />
          </div>

          {/* Footer content */}
          <div className="hero-footer">
            <p>
              Experience unmatched reliability in time-critical delivery. Our premium semi-truck fleet, featuring high-capacity cargo bays and powerful engines, is built for speed and security. We guarantee your most urgent shipments reach their destination on schedule. Contact us to optimize your high-priority cargo logistics.
            </p>
            <a href="tel:+18609883887" className="hero-cta">
              Speak With Us Now
              <ArrowRight size={18} />
            </a>
          </div>
        </section>

        <section className="industrial-content">
          <style>{`
            .industrial-content {
              padding: 0;
              background: #fff;
              color: #0f172a;
              font-family: var(--font-inter), sans-serif;
            }

            .section-block {
              padding: 120px 32px;
              border-bottom: 2px solid #e2e8f0;
            }

            .section-block.dark {
              background: #0f172a;
              color: #fff;
              border-bottom: none;
            }

            .container-inner {
              max-width: 1400px;
              margin: 0 auto;
            }

            .split-header {
              display: grid;
              grid-template-columns: 1fr 1.2fr;
              gap: 80px;
              align-items: start;
              margin-bottom: 80px;
            }

            .kicker-label {
              display: inline-block;
              background: #b6f000;
              color: #0f172a;
              padding: 6px 12px;
              font-size: 13px;
              font-weight: 900;
              text-transform: uppercase;
              letter-spacing: 0.1em;
              margin-bottom: 24px;
            }

            .dark .kicker-label {
              background: #334155;
              color: #b6f000;
            }

            .huge-title {
              font-size: clamp(40px, 5vw, 72px);
              line-height: 1;
              font-weight: 900;
              text-transform: uppercase;
              letter-spacing: -0.04em;
              margin: 0;
            }

            .desc-text {
              font-size: 20px;
              line-height: 1.7;
              color: #475569;
              font-weight: 500;
            }

            .dark .desc-text {
              color: #94a3b8;
            }

            .benefits-grid {
              display: grid;
              grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
              gap: 0;
              border-top: 2px solid #e2e8f0;
              border-left: 2px solid #e2e8f0;
            }

            .benefit-box {
              border-bottom: 2px solid #e2e8f0;
              border-right: 2px solid #e2e8f0;
              padding: 40px 32px;
              transition: all 0.2s ease;
            }

            .benefit-box:hover {
              background: #0f172a;
              color: #b6f000;
            }
            
            .benefit-box:hover .b-icon {
              color: #b6f000;
            }

            .b-icon {
              color: #0f172a;
              margin-bottom: 20px;
              transition: color 0.2s;
            }

            .benefit-box strong {
              display: block;
              font-size: 18px;
              font-weight: 800;
              text-transform: uppercase;
              line-height: 1.3;
            }

            .features-list {
              display: grid;
              grid-template-columns: 1fr;
              gap: 24px;
            }

            .feature-row {
              display: grid;
              grid-template-columns: 400px 1fr;
              gap: 60px;
              padding: 60px;
              background: #1e293b;
              border-left: 12px solid #b6f000;
            }
            
            .feature-row h3 {
              font-size: 32px;
              font-weight: 900;
              text-transform: uppercase;
              line-height: 1.1;
              margin: 0;
            }

            .feature-row p {
              font-size: 18px;
              line-height: 1.8;
              color: #94a3b8;
              margin: 0;
            }

            .cta-area {
              text-align: center;
              padding: 120px 32px;
              background: #b6f000;
              color: #0f172a;
            }

            .cta-area h3 {
              font-size: clamp(36px, 5vw, 72px);
              font-weight: 900;
              text-transform: uppercase;
              margin: 0 auto 24px;
              line-height: 1;
              max-width: 1000px;
            }

            .cta-area p {
              font-size: 22px;
              max-width: 800px;
              margin: 0 auto 48px;
              font-weight: 600;
              line-height: 1.6;
            }

            .action-buttons {
              display: flex;
              gap: 20px;
              justify-content: center;
              flex-wrap: wrap;
            }

            .btn-primary {
              background: #0f172a;
              color: #fff;
              padding: 20px 48px;
              font-size: 18px;
              font-weight: 900;
              text-transform: uppercase;
              letter-spacing: 0.1em;
              text-decoration: none;
              transition: background 0.2s;
            }

            .btn-primary:hover {
              background: #1e293b;
            }

            .btn-outline {
              background: transparent;
              color: #0f172a;
              border: 3px solid #0f172a;
              padding: 17px 48px;
              font-size: 18px;
              font-weight: 900;
              text-transform: uppercase;
              letter-spacing: 0.1em;
              text-decoration: none;
              transition: all 0.2s;
            }

            .btn-outline:hover {
              background: #0f172a;
              color: #b6f000;
            }

            @media (max-width: 1024px) {
              .split-header, .feature-row {
                grid-template-columns: 1fr;
                gap: 32px;
              }
              .feature-row {
                padding: 40px;
              }
            }
          `}</style>

          {/* Section 1: Trust & Delivery */}
          <div className="section-block">
            <div className="container-inner">
              <div className="split-header">
                <div>
                  <span className="kicker-label">Trust & Delivery</span>
                  <h2 className="huge-title">Trust Your Business with Our Expedited Freight Company</h2>
                </div>
                <div>
                  <p className="desc-text">
                    Having successfully completed many different accelerated shipping jobs, we have made a name for ourselves as a top-notch resource for quick and stress-free deliveries. If you are depending on materials reaching their destination by a particular date, we encourage you to get in touch with us and we will help you work out the details for your shipment as quickly as possible.
                  </p>
                  <p className="desc-text" style={{ marginTop: '32px', fontWeight: 800, color: '#0f172a' }}>
                    Some of the additional benefits of hiring our expedited freight carrier for your job include:
                  </p>
                </div>
              </div>

              <div className="benefits-grid">
                {benefits.map((benefit, i) => (
                  <div className="benefit-box" key={i}>
                    <div className="b-icon">
                      <CheckCircle2 size={36} strokeWidth={2.5} />
                    </div>
                    <strong>{benefit}</strong>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Section 2: Features Rows */}
          <div className="section-block dark">
            <div className="container-inner">
              <div className="features-list">
                <div className="feature-row">
                  <div>
                    <span className="kicker-label">Any Load Size</span>
                    <h3>The Expedited Trucking Company for Any Job</h3>
                  </div>
                  <p>
                    Unlike some hotshot trucking companies, which can only accommodate smaller loads, we are happy to help you with cargo of all shapes and sizes. From single pallets to entire truckloads, our qualified team of trucking experts works hard to get your shipments delivered on time, no matter the distance.
                  </p>
                </div>

                <div className="feature-row">
                  <div>
                    <span className="kicker-label">Affordable Rates</span>
                    <h3>Reasonable Rates on Expedited Trucking</h3>
                  </div>
                  <p>
                    Just because you need your products delivered quickly does not mean it needs to hurt your bottom line. Thanks to our honest and affordable pricing structure, you can get your freight to where it needs to be without overspending. In fact, many of our clients have come to depend on our expedited shipping for all of their deliveries, helping them lower inventory costs and add flexibility to their supply chain.
                  </p>
                </div>

                <div className="feature-row">
                  <div>
                    <span className="kicker-label">Safety First</span>
                    <h3>Your Freight Is Safe with Our Expedited Freight Services</h3>
                  </div>
                  <p>
                    On top of completing your shipments on time, we also guarantee their safety from start to finish. In fact, there are actually many security benefits that come from our expedited trucking services. Because there will be fewer stops and fewer handling requirements during transit, there is less chance for damage or loss during the process.
                  </p>
                </div>

                <div className="feature-row">
                  <div>
                    <span className="kicker-label">Customer Experience</span>
                    <h3>Stay Informed with Our Expedited Trucking Company</h3>
                  </div>
                  <p>
                    In addition to our punctual deliveries, we also pride ourselves on our fantastic customer experience. We know that our clients are hinging their business on our expedited trucking, which is why we do everything to help them feel confident with their decision. We can provide you with real-time status updates throughout the process and answer any questions that come to mind along the way.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Section 3: CTA */}
          <div className="cta-area">
            <h3>Get Started with Our Expedited Trucking Today</h3>
            <p>
              Whether you would like to know more about how we can accommodate your situation or would like to schedule our expedited shipping as soon as possible, we are here to help. We believe that our impressive history in the expedited trucking field makes us an easy choice to transport your freight quickly, carefully, and on budget. Speak with our experts today by calling (860) 988-3887.
            </p>
            <div className="action-buttons">
              <a className="btn-primary" href="tel:+18609883887">
                Call Us
              </a>
              <a className="btn-outline" href="mailto:c.taveras@expeditedtransportservices.net?subject=Expedited%20Trucking%20Inquiry">
                Message Us
              </a>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
