import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";
import { FooterSection } from "@/components/FooterSection";
import { servicePages } from "@/lib/service-pages";
import responsive from "@/components/ServiceResponsive.module.css";

const benefits = [
  { text: "Time-critical delivery planning", image: "/images/expedited-pillar-1-v2.jpg" },
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
      <main className={`expedited-page ${responsive.page}`}>
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
            color: #ffffff;
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
          <h1 className="bg-text">
            <span style={{ textAlign: 'left', paddingLeft: '4vw', transform: 'translateY(-8vh)', fontSize: 'clamp(30px, 7vw, 120px)' }}>
              Expedited
            </span>
            <span style={{ textAlign: 'left', paddingLeft: '16vw', marginTop: '-4vh', position: 'relative', zIndex: 3, fontSize: 'clamp(30px, 7vw, 120px)' }}>
              Trucking
            </span>
          </h1>

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
          <div className="mx-auto max-w-[1400px] px-5 pt-10 pb-12 sm:px-6 sm:py-20 lg:px-10 lg:pt-[140px]">
            <div className="relative flex items-center justify-between gap-8 overflow-hidden rounded-[32px] px-6 py-10 shadow-[0_40px_80px_rgba(0,0,0,0.15)] sm:p-10 lg:min-h-[420px] lg:gap-[60px] lg:px-20 lg:py-[100px]">
              <Image src="/images/truck2.jpg" alt="Expedited Trucking" fill sizes="100vw" style={{ objectFit: "cover" }} />
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(90deg, #0f172a 0%, rgba(15,23,42,0.95) 50%, rgba(15,23,42,0.4) 100%)" }} />

              <div style={{ position: "relative", zIndex: 1, maxWidth: "600px" }}>
                <h2 className="mb-6 font-[var(--font-primary)] text-[clamp(28px,4vw,52px)] leading-[1.1] font-bold tracking-[-0.02em] text-white lg:mb-8">
                  Trust Your Business with Our <br /> Expedited Freight Company
                </h2>

                <p className="mb-6 font-[var(--font-primary)] text-base leading-[1.8] text-white/80 sm:text-lg">
                  Having successfully completed many different accelerated shipping jobs, we have made a name for ourselves as a top-notch resource for quick and stress-free deliveries.
                </p>
                <p className="font-[var(--font-primary)] text-base leading-[1.8] text-white/80 sm:text-lg">
                  If you are depending on materials reaching their destination by a particular date, we encourage you to get in touch with us and we will help you work out the details for your shipment as quickly as possible.
                </p>
              </div>
            </div>
          </div>

          {/* Part 2: Interactive Pillar Accordion */}
          <div className="mx-auto max-w-[1400px] px-5 pt-12 pb-14 sm:px-6 sm:py-20 lg:px-10 lg:pt-20 lg:pb-[140px]">
            
            {/* Section Header */}
            <div className="mx-auto mb-8 max-w-[800px] text-center sm:mb-12 lg:mb-[60px]">
              <h2 className="mb-6 font-[var(--font-primary)] text-[clamp(28px,4vw,52px)] leading-[1.1] font-bold tracking-[-0.02em] text-slate-900">
                The Expedited Trucking Company for Any Job
              </h2>
              <p className="mb-6 font-[var(--font-primary)] text-base leading-[1.8] text-slate-600 sm:text-lg">
                Unlike some hotshot trucking companies, which can only accommodate smaller loads, we are happy to help you with cargo of all shapes and sizes. From single pallets to entire truckloads, our qualified team of trucking experts works hard to get your shipments delivered on time, no matter the distance.
              </p>
              <p className="font-[var(--font-primary)] text-base leading-[1.8] text-slate-600 sm:text-lg">
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
                    sizes="(max-width: 600px) 100vw, (max-width: 1279px) 50vw, 33vw"
                    style={{ objectFit: "cover" }} 
                  />
                  <div className="pillar-overlay" />
                  
                  <div className="pillar-inner">
                    <div className="pillar-num">0{i + 1}</div>
                    <div className="pillar-content">
                      <h3 className="pillar-text">{item.text}</h3>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* -- FEATURES SECTION -------------------------------------------- */}
        <section className="relative bg-white py-12 sm:py-20 lg:py-[120px]">
          <div className="mx-auto max-w-[1400px] px-5 sm:px-6 lg:px-10">

            <div className="mb-8 text-center sm:mb-12 lg:mb-20">
              <h2 className="font-[var(--font-primary)] text-[clamp(28px,4vw,40px)] leading-tight font-bold tracking-[-0.02em] text-[#051e24]">Expedited Freight Hauling That You Can Depend On</h2>
              <div style={{ width: "60px", height: "4px", backgroundColor: "#E31E24", margin: "24px auto 0", borderRadius: "2px" }} />
            </div>

            <div className="flex flex-col gap-10 sm:gap-16 lg:gap-[100px]">
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
                  desc: "Our expedited trucking services reduce stops and handling requirements during transit, helping protect freight and reduce the risk of damage or loss during the process.",
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
                  <div key={idx} className={`notched-card flex items-stretch gap-20 ${isEven ? "reverse min-[1101px]:flex-row-reverse" : "normal min-[1101px]:flex-row"}`}>
                    {/* Text Side */}
                    <div className="notched-text-wrapper flex min-w-0 flex-[1_1_45%] items-center">
                      <div className="flex min-w-0 items-start gap-3 sm:gap-6">
                        <div className="shrink-0" style={{ fontSize: "13px", color: "#8b9ba5", fontWeight: 600, fontFamily: "var(--font-mono)", marginTop: "12px", letterSpacing: "1px" }}>
                          {card.id}
                        </div>
                        <div className="min-w-0">
                          <h3 className="mb-6 font-[var(--font-primary)] text-[clamp(26px,4vw,44px)] leading-[1.1] font-semibold tracking-[-0.02em] text-[#061d26]">
                            {card.title}
                          </h3>
                          <p className="font-[var(--font-primary)] text-base leading-[1.8] text-[#4a5568] sm:text-[17px]">
                            {card.desc}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Image Side */}
                    <div className="notched-img-wrapper relative min-h-[450px] min-w-0 flex-[1_1_55%] drop-shadow-[0_20px_40px_rgba(0,0,0,0.1)]">
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
                          sizes="(max-width: 1100px) 100vw, 50vw"
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

