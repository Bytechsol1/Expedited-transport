import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CheckCircle2, Clock, Shield, Box, HeadphonesIcon, BadgeDollarSign, Truck, ShieldCheck, MapPin, Target } from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";
import { FooterSection } from "@/components/FooterSection";
import { servicePages } from "@/lib/service-pages";

const benefits = [
  { text: "Guaranteed delivery times", image: "/images/expedited-pillar-1-v2.jpg" },
  { text: "Real-time status notifications", image: "/images/expedited-pillar-2-final.jpg" },
  { text: "Fewer stops & flexibility", image: "/images/expedited-pillar-3-final.jpg" },
  { text: "Reduced cargo handling", image: "/images/expedited-pillar-4-final.jpg" },
  { text: "Dedicated customer service", image: "/images/expedited-pillar-5-final.jpg" },
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
            background: #E31E24;
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
          /* Hover classes for benefits and CTA */
          .benefit-card:hover {
            background-color: #f4fce8 !important;
            border-color: #c6f24d !important;
            transform: translateX(8px) !important;
            box-shadow: 0 12px 24px rgba(227, 30, 36, 0.15) !important;
          }
          .cta-btn-primary:hover {
            transform: translateY(-4px) !important;
            box-shadow: 0 30px 60px rgba(227, 30, 36, 0.3) !important;
          }
          .cta-btn-secondary:hover {
            background-color: rgba(255,255,255,0.1) !important;
            transform: translateY(-4px) !important;
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
          
          /* Background Image */
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
          
          /* Overlay */
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
          
          /* Inner Content Wrapper */
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
          .pillar-icon {
            opacity: 0;
            transform: translateX(-20px);
            color: #E31E24;
            transition: all 0.5s cubic-bezier(0.25, 1, 0.5, 1);
          }
          .pillar:hover .pillar-icon {
            opacity: 1;
            transform: translateX(0);
          }
          
          @media (max-width: 900px) {
            .pillar-container {
              flex-direction: column;
              height: auto;
            }
            .pillar {
              height: 140px;
            }
            .pillar-inner {
              padding: 24px;
            }
            .pillar:hover {
              flex: 1;
              height: 200px;
            }
            .pillar-text { font-size: 18px; }
            .pillar:hover .pillar-text { font-size: 20px; }
          }
        `}</style>
        
        {/* SVG clip-path definition for perfectly rounded notches */}
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
              If you are on a tight deadline and need freight delivered quickly, then Expedited Transport Services is the company to call. We are proud to offer expedited trucking services that you can rely on. Not only that, but we provide our dependable transportation services at great rates and alongside exceptional client care. Reach us today at (860) 988-3887 for a prompt response.
            </p>
            <a href="tel:+18609883887" className="hero-cta">
              Speak With Us Now
              <ArrowRight size={18} />
            </a>
          </div>
        </section>

        <section id="benefits" style={{ backgroundColor: "#ffffff", position: "relative", zIndex: 1 }}>
          {/* Top Separator */}
          <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "1px", background: "linear-gradient(90deg, transparent, rgba(0, 0, 0, 0.06), transparent)" }} />

          {/* Part 1: Honest Outlook Banner */}
          <div style={{ padding: "140px 40px 80px", maxWidth: "1400px", margin: "0 auto" }}>
            <div style={{
              position: "relative",
              borderRadius: "32px",
              overflow: "hidden",
              padding: "100px 80px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: "60px",
              boxShadow: "0 40px 80px rgba(0,0,0,0.15)",
              minHeight: "420px"
            }}>
              <Image src="/images/truck2.jpg" alt="Expedited Trucking" fill style={{ objectFit: "cover" }} />
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(90deg, #0f172a 0%, rgba(15,23,42,0.95) 50%, rgba(15,23,42,0.4) 100%)" }} />

              <div style={{ position: "relative", zIndex: 1, maxWidth: "600px" }}>
                <h2 style={{ fontSize: "clamp(36px, 4vw, 52px)", fontWeight: 700, letterSpacing: "-0.02em", marginBottom: "32px", color: "white", lineHeight: 1.1, fontFamily: "var(--font-primary)" }}>
                  Trust Your Business with Our <br /> Expedited Freight Company
                </h2>

                <p style={{ color: "rgba(255,255,255,0.8)", lineHeight: 1.8, fontSize: "18px", marginBottom: "24px", fontFamily: "var(--font-primary)" }}>
                  Having successfully completed many different accelerated shipping jobs, we have made a name for ourselves as a top-notch resource for quick and stress-free deliveries.
                </p>
                <p style={{ color: "rgba(255,255,255,0.8)", lineHeight: 1.8, fontSize: "18px", fontFamily: "var(--font-primary)" }}>
                  If you are depending on materials reaching their destination by a particular date, we encourage you to get in touch with us and we will help you work out the details for your shipment as quickly as possible.
                </p>
              </div>
            </div>
          </div>

          {/* Part 2: Interactive Pillar Accordion */}
          <div style={{ padding: "80px 40px 140px", maxWidth: "1400px", margin: "0 auto" }}>
            
            {/* Section Header */}
            <div style={{ textAlign: "center", marginBottom: "60px", maxWidth: "800px", margin: "0 auto 60px" }}>
              <h2 style={{ fontSize: "clamp(36px, 4vw, 52px)", fontWeight: 700, letterSpacing: "-0.02em", marginBottom: "24px", lineHeight: 1.1, color: "#0f172a", fontFamily: "var(--font-primary)" }}>
                The Expedited Trucking Company for Any Job
              </h2>
              <p style={{ color: "#475569", lineHeight: 1.8, fontSize: "18px", marginBottom: "24px", fontFamily: "var(--font-primary)" }}>
                Unlike some hotshot trucking companies, which can only accommodate smaller loads, we are happy to help you with cargo of all shapes and sizes. From single pallets to entire truckloads, our qualified team of trucking experts works hard to get your shipments delivered on time, no matter the distance.
              </p>
              <p style={{ color: "#475569", lineHeight: 1.8, fontSize: "18px", fontFamily: "var(--font-primary)" }}>
                Some of the additional benefits of hiring our expedited freight carrier for your job include:
              </p>
            </div>

            {/* Hover Pillars */}
            <div className="pillar-container">
              {benefits.map((item, i) => (
                <div key={i} className="pillar">
                  {/* Background Image that fades in on hover */}
                  <Image 
                    src={item.image} 
                    alt={item.text} 
                    fill 
                    className="pillar-bg"
                    style={{ objectFit: "cover" }} 
                  />
                  <div className="pillar-overlay" />
                  
                  <div className="pillar-inner">
                    <div className="pillar-num">0{i + 1}</div>
                    <div className="pillar-content">
                      <h3 className="pillar-text">{item.text}</h3>
                      <div className="pillar-icon">
                        <ArrowRight size={24} />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* -- FEATURES SECTION -------------------------------------------- */}
        <section style={{ padding: "120px 0", backgroundColor: "#ffffff", position: "relative" }}>
          <div style={{ maxWidth: "1400px", margin: "0 auto", padding: "0 40px" }}>

            <div style={{ textAlign: "center", marginBottom: "80px" }}>
              <h2 style={{ fontSize: "clamp(32px, 4vw, 40px)", fontWeight: 700, letterSpacing: "-0.02em", color: "#051e24", fontFamily: "var(--font-primary)" }}>Expedited Freight Hauling That You Can Depend On</h2>
              <div style={{ width: "60px", height: "4px", backgroundColor: "#E31E24", margin: "24px auto 0", borderRadius: "2px" }} />
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "100px" }}>
              {[
                {
                  id: "01",
                  title: "Reasonable Rates on Expedited Trucking",
                  desc: "Just because you need your products delivered quickly does not mean it needs to hurt your bottom line. Thanks to our honest and affordable pricing structure, you can get your freight to where it needs to be without overspending. In fact, many of our clients have come to depend on our expedited shipping for all of their deliveries, helping them lower inventory costs and add flexibility to their supply chain.",
                  image: "/images/expedited-rates.jpg"
                },
                {
                  id: "02",
                  title: "Your Freight Is Safe with Our Expedited Freight Services",
                  desc: "On top of completing your shipments on time, we also guarantee their safety from start to finish. In fact, there are actually many security benefits that come from our expedited trucking services. Because there will be fewer stops and fewer handling requirements during transit, there is less chance for damage or loss during the process.",
                  image: "/images/expedited-safe.jpg"
                },
                {
                  id: "03",
                  title: "Stay Informed with Our Expedited Trucking Company",
                  desc: "In addition to our punctual deliveries, we also pride ourselves on our fantastic customer experience. We know that our clients are hinging their business on our expedited trucking, which is why we do everything to help them feel confident with their decision. We can provide you with real-time status updates throughout the process and answer any questions that come to mind along the way.",
                  image: "/images/expedited-informed.jpg"
                }
              ].map((card, idx) => {
                const isEven = idx % 2 !== 0;

                return (
                  <div key={idx} style={{
                    display: "flex",
                    flexDirection: isEven ? "row-reverse" : "row",
                    alignItems: "stretch",
                    gap: "80px"
                  }}>
                    {/* Text Side */}
                    <div style={{ flex: "1 1 45%", display: "flex", alignItems: "center" }}>
                      <div style={{ display: "flex", alignItems: "flex-start", gap: "24px" }}>
                        <div style={{ fontSize: "13px", color: "#8b9ba5", fontWeight: 600, fontFamily: "var(--font-mono)", marginTop: "12px", letterSpacing: "1px" }}>
                          {card.id}
                        </div>
                        <div>
                          <h3 style={{ fontSize: "clamp(32px, 4vw, 44px)", fontWeight: 600, color: "#061d26", marginBottom: "24px", letterSpacing: "-0.02em", lineHeight: 1.1, fontFamily: "var(--font-primary)" }}>
                            {card.title}
                          </h3>
                          <p style={{ color: "#4a5568", fontSize: "17px", lineHeight: 1.8, fontFamily: "var(--font-primary)" }}>
                            {card.desc}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Image Side */}
                    <div style={{ flex: "1 1 55%", position: "relative", minHeight: "450px", filter: "drop-shadow(0 20px 40px rgba(0,0,0,0.1))" }}>
                      <div style={{
                        position: "absolute", inset: 0,
                        clipPath: "url(#hotshot-image-clip)",
                        transform: isEven ? "scaleX(-1)" : "none",
                        backgroundColor: "#f8fafc"
                      }}>
                        <Image
                          src={card.image}
                          alt={card.title}
                          fill
                          style={{
                            objectFit: "cover",
                            transform: isEven ? "scaleX(-1)" : "none" // Flip image back so it doesn't look mirrored
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

      </main>
      <FooterSection />
    </>
  );
}

