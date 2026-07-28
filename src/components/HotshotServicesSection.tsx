"use client";

import React from "react";
import { ArrowRight, Check, Shield, Clock, ShieldCheck, Banknote, MapPin, Target, ChevronRight, Truck, Award } from "lucide-react";
import Image from "next/image";
import { LogoLoop } from "@/components/LogoLoop";

export function HotshotServicesSection() {
  return (
    <>
      <style>{`
        .glass-card {
          background: rgba(255, 255, 255, 0.03);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border: 1px solid rgba(255, 255, 255, 0.05);
          box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
          transition: transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275), box-shadow 0.4s ease, border-color 0.4s ease;
        }
        .glass-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4);
          border-color: rgba(182, 240, 0, 0.3);
        }
        .text-gradient {
          background: linear-gradient(135deg, #ffffff 0%, rgba(255,255,255,0.7) 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        .accent-gradient {
          background: linear-gradient(135deg, #b6f000 0%, #8cae00 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        .btn-glow {
          position: relative;
          transition: all 0.3s ease;
        }
        .btn-glow:hover {
          box-shadow: 0 0 20px rgba(182, 240, 0, 0.4);
          transform: translateY(-2px);
        }
        .btn-glass {
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          transition: all 0.3s ease;
        }
        .btn-glass:hover {
          background: rgba(255, 255, 255, 0.1);
          border-color: rgba(182, 240, 0, 0.5);
        }
        .feature-icon-wrapper {
          transition: all 0.4s ease;
        }
        .glass-card:hover .feature-icon-wrapper {
          transform: scale(1.1) rotate(5deg);
          color: #b6f000 !important;
        }
        .feature-img {
          transition: transform 0.6s ease;
        }
        .glass-card:hover .feature-img {
          transform: scale(1.05);
        }
      `}</style>

      {/* SVG clip-path definition copied from homepage for perfectly rounded notches */}
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

      <div style={{ backgroundColor: "#000000", color: "white", minHeight: "100vh", fontFamily: "'Inter', sans-serif", overflow: "hidden" }}>

        {/* ── HERO SECTION ──────────────────────────────────────────── */}
        <section style={{ paddingTop: "200px", paddingBottom: "100px", position: "relative" }}>
          <div style={{ maxWidth: "1400px", margin: "0 auto", padding: "0 40px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "80px", alignItems: "center" }}>

            {/* Left Content */}
            <div>
              <div style={{ display: "inline-flex", alignItems: "center", gap: "10px", padding: "8px 16px", borderRadius: "100px", background: "#111111", border: "1px solid #333", marginBottom: "32px" }}>
                <span style={{ width: "8px", height: "8px", borderRadius: "50%", backgroundColor: "#b6f000" }} />
                <span style={{ fontSize: "12px", textTransform: "uppercase", letterSpacing: "1.5px", color: "#ccc", fontWeight: 600 }}>
                  Premium Services
                </span>
              </div>

              <h1 style={{ fontSize: "64px", fontWeight: 700, letterSpacing: "-0.02em", lineHeight: 1.1, marginBottom: "32px" }}>
                Expedited Trucking
              </h1>

              <p style={{ fontSize: "18px", color: "#a0a0a0", lineHeight: 1.7, maxWidth: "540px", marginBottom: "48px" }}>
                If you are on a tight deadline and need freight delivered quickly, then Expedited Transport Services is the company to call. We are proud to offer expedited trucking services that you can rely on. Not only that, but we provide our dependable transportation services at great rates and alongside exceptional client care. Reach us today at (860) 988-3887 for a prompt response.
              </p>

              <div style={{ display: "flex", alignItems: "center", gap: "20px", flexWrap: "wrap" }}>
                <a href="tel:+18609883887" style={{
                  display: "inline-flex", alignItems: "center", gap: "12px",
                  backgroundColor: "#b6f000", color: "#000",
                  padding: "16px 32px", fontSize: "15px", textTransform: "uppercase", letterSpacing: "1px", fontWeight: 700,
                  borderRadius: "8px", textDecoration: "none", transition: "opacity 0.2s"
                }}
                  onMouseEnter={(e) => e.currentTarget.style.opacity = "0.9"}
                  onMouseLeave={(e) => e.currentTarget.style.opacity = "1"}
                >
                  Speak with us now <ArrowRight size={18} />
                </a>
              </div>
            </div>

            {/* Right Image Area */}
            <div style={{ position: "relative", width: "100%", height: "550px", borderRadius: "16px", overflow: "hidden" }}>
              <Image
                src="/images/truck1.jpg"
                alt="Hotshot Trucking"
                fill
                style={{ objectFit: "cover" }}
              />
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(15,23,42,0.08) 0%, rgba(15,23,42,0.22) 100%)" }} />
            </div>
          </div>
        </section>

        {/* -- BENEFITS & OUTLOOK SECTION ----------------------------- */}
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
              <Image src="/images/truck2.jpg" alt="Hotshot Trucking" fill style={{ objectFit: "cover" }} />
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(90deg, #0f172a 0%, rgba(15,23,42,0.95) 50%, rgba(15,23,42,0.4) 100%)" }} />

              <div style={{ position: "relative", zIndex: 1, maxWidth: "600px" }}>
                <h2 style={{ fontSize: "52px", fontWeight: 700, letterSpacing: "-0.02em", marginBottom: "32px", color: "white", lineHeight: 1.1 }}>
                  Trust Your Business with Our <br /> Expedited Freight Company
                </h2>

                <p style={{ color: "rgba(255,255,255,0.8)", lineHeight: 1.8, fontSize: "18px", marginBottom: "24px" }}>
                  Having successfully completed many different accelerated shipping jobs, we have made a name for ourselves as a top-notch resource for quick and stress-free deliveries.
                </p>
                <p style={{ color: "rgba(255,255,255,0.8)", lineHeight: 1.8, fontSize: "18px" }}>
                  If you are depending on materials reaching their destination by a particular date, we encourage you to get in touch with us and we will help you work out the details for your shipment as quickly as possible.
                </p>
              </div>
            </div>
          </div>

          {/* Part 2: Benefits Sticky Layout */}
          <div style={{ padding: "80px 40px 140px", maxWidth: "1400px", margin: "0 auto" }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1.2fr", gap: "100px", alignItems: "flex-start" }}>
              {/* Sticky Left Column */}
              <div style={{ position: "sticky", top: "140px" }}>
                <div style={{ display: "inline-flex", alignItems: "center", gap: "12px", padding: "8px 16px", backgroundColor: "#f0faeb", border: "1px solid #d4f0c2", borderRadius: "100px", marginBottom: "32px" }}>
                  <Shield size={16} color="#7a9900" />
                  <span style={{ fontSize: "13px", color: "#5c7500", letterSpacing: "2px", textTransform: "uppercase", fontWeight: 700 }}>System Capabilities</span>
                </div>

                <h2 style={{ fontSize: "52px", fontWeight: 700, letterSpacing: "-0.02em", marginBottom: "32px", lineHeight: 1.1, color: "#0f172a" }}>
                  The Expedited Trucking <br /> Company for Any Job
                </h2>

                <p style={{ color: "#475569", lineHeight: 1.8, fontSize: "18px", maxWidth: "500px" }}>
                  Unlike some hotshot trucking companies, which can only accommodate smaller loads, we are happy to help you with cargo of all shapes and sizes. From single pallets to entire truckloads, our qualified team of trucking experts works hard to get your shipments delivered on time, no matter the distance. Some of the additional benefits of hiring our expedited freight carrier for your job include:
                </p>
              </div>

              {/* Right Column: Animated List */}
              <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                {[
                  "Guaranteed delivery times",
                  "Real-time status notifications",
                  "Fewer stops and flexible deliveries",
                  "Reduced handling of your items",
                  "Dedicated customer service",
                ].map((item, i) => (
                  <div
                    key={i}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "24px",
                      padding: "20px 24px",
                      backgroundColor: "#ffffff",
                      border: "1px solid #f1f5f9",
                      borderRadius: "20px",
                      boxShadow: "0 4px 12px rgba(0, 0, 0, 0.03)",
                      transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                      cursor: "default",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = "#f4fce8";
                      e.currentTarget.style.borderColor = "#c6f24d";
                      e.currentTarget.style.transform = "translateX(8px)";
                      e.currentTarget.style.boxShadow = "0 12px 24px rgba(182, 240, 0, 0.15)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = "#ffffff";
                      e.currentTarget.style.borderColor = "#f1f5f9";
                      e.currentTarget.style.transform = "translateX(0)";
                      e.currentTarget.style.boxShadow = "0 4px 12px rgba(0, 0, 0, 0.03)";
                    }}
                  >
                    <div
                      style={{
                        width: "48px",
                        height: "48px",
                        borderRadius: "14px",
                        backgroundColor: "#0f172a",
                        color: "#b6f000",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "18px",
                        fontWeight: 700,
                        fontFamily: "monospace",
                        flexShrink: 0,
                      }}
                    >
                      0{i + 1}
                    </div>
                    <span style={{ fontSize: "18px", color: "#0f172a", fontWeight: 600, letterSpacing: "-0.01em" }}>
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* -- FEATURES SECTION -------------------------------------------- */}        <section style={{ padding: "120px 0", backgroundColor: "#ffffff", position: "relative" }}>
          <div style={{ maxWidth: "1400px", margin: "0 auto", padding: "0 40px" }}>

            <div style={{ textAlign: "center", marginBottom: "80px" }}>
              <h2 style={{ fontSize: "40px", fontWeight: 700, letterSpacing: "-0.02em", color: "#051e24" }}>Expedited Freight Hauling That You Can Depend On</h2>
              <div style={{ width: "60px", height: "4px", backgroundColor: "#b6f000", margin: "24px auto 0", borderRadius: "2px" }} />
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "100px" }}>
              {[
                {
                  id: "01",
                  title: "Reasonable Rates on Expedited Trucking",
                  desc: "Just because you need your products delivered quickly does not mean it needs to hurt your bottom line. Thanks to our honest and affordable pricing structure, you can get your freight to where it needs to be without overspending. In fact, many of our clients have come to depend on our expedited shipping for all of their deliveries, helping them lower inventory costs and add flexibility to their supply chain.",
                  image: "/images/truck3.jpg"
                },
                {
                  id: "02",
                  title: "Your Freight Is Safe with Our Expedited Freight Services",
                  desc: "On top of completing your shipments on time, we also guarantee their safety from start to finish. In fact, there are actually many security benefits that come from our expedited trucking services. Because there will be fewer stops and fewer handling requirements during transit, there is less chance for damage or loss during the process.",
                  image: "/images/truck4.jpg"
                },
                {
                  id: "03",
                  title: "Stay Informed with Our Expedited Trucking Company",
                  desc: "In addition to our punctual deliveries, we also pride ourselves on our fantastic customer experience. We know that our clients are hinging their business on our expedited trucking, which is why we do everything to help them feel confident with their decision. We can provide you with real-time status updates throughout the process and answer any questions that come to mind along the way.",
                  image: "/images/truck2.jpg"
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
                        <div style={{ fontSize: "13px", color: "#8b9ba5", fontWeight: 600, fontFamily: "monospace", marginTop: "12px", letterSpacing: "1px" }}>
                          {card.id}
                        </div>
                        <div>
                          <h3 style={{ fontSize: "clamp(32px, 4vw, 44px)", fontWeight: 600, color: "#061d26", marginBottom: "24px", letterSpacing: "-0.02em", lineHeight: 1.1 }}>
                            {card.title}
                          </h3>
                          <p style={{ color: "#4a5568", fontSize: "17px", lineHeight: 1.8 }}>
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

        {/* ── CTA SECTION ───────────────────────────────────────────────── */}
        <section style={{ padding: "80px 40px 160px", backgroundColor: "#ffffff" }}>
          <div style={{
            maxWidth: "1400px",
            margin: "0 auto",
            background: "#000000",
            borderRadius: "40px",
            padding: "80px",
            position: "relative",
            overflow: "hidden",
            boxShadow: "0 40px 80px rgba(0, 0, 0, 0.15)"
          }}>
            {/* Background Graphic/Texture */}
            <div style={{ position: "absolute", top: "-50%", right: "-10%", width: "800px", height: "800px", background: "radial-gradient(circle, rgba(182, 240, 0, 0.08) 0%, transparent 70%)", borderRadius: "50%", pointerEvents: "none" }} />
            <div style={{ position: "absolute", bottom: "-20%", left: "10%", width: "400px", height: "400px", background: "radial-gradient(circle, rgba(255,255,255,0.03) 0%, transparent 70%)", borderRadius: "50%", pointerEvents: "none" }} />

            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "60px", position: "relative", zIndex: 1, flexWrap: "wrap" }}>

              <div style={{ flex: "1 1 500px" }}>
                <div style={{ display: "inline-flex", alignItems: "center", gap: "12px", padding: "10px 20px", backgroundColor: "rgba(182, 240, 0, 0.1)", borderRadius: "100px", marginBottom: "32px", border: "1px solid rgba(182, 240, 0, 0.2)" }}>
                  <MapPin size={18} color="#b6f000" />
                  <span style={{ fontSize: "14px", color: "#b6f000", letterSpacing: "2px", textTransform: "uppercase", fontWeight: 700 }}>Initiate Transport</span>
                </div>

                <h2 style={{ fontSize: "clamp(48px, 5vw, 64px)", fontWeight: 700, letterSpacing: "-0.03em", marginBottom: "24px", color: "#ffffff", lineHeight: 1.05 }}>
                  <span style={{ color: "#b6f000" }}>G</span>et Started with Our Expedited <br /> Trucking Today<span style={{ color: "#b6f000" }}>.</span>
                </h2>

                <p style={{ fontSize: "20px", color: "rgba(255, 255, 255, 0.7)", marginBottom: "0", lineHeight: 1.6, maxWidth: "540px", fontWeight: 400 }}>
                  Whether you would like to know more about how we can accommodate your situation or would like to schedule our expedited shipping as soon as possible, we are here to help. We believe that our impressive history in the expedited trucking field makes us an easy choice to transport your freight quickly, carefully, and on budget. Speak with our experts today by calling (860) 988-3887.
                </p>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "20px", minWidth: "300px", flexShrink: 0 }}>
                <a href="tel:+18609883887" style={{
                  display: "flex", alignItems: "center", justifyContent: "space-between",
                  padding: "24px 40px", backgroundColor: "#b6f000", color: "#000000",
                  textTransform: "uppercase", fontSize: "16px", fontWeight: 700, letterSpacing: "1px", textDecoration: "none",
                  borderRadius: "20px", transition: "all 0.3s ease",
                  boxShadow: "0 20px 40px rgba(182, 240, 0, 0.2)"
                }}
                  onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = "0 30px 60px rgba(182, 240, 0, 0.3)"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 20px 40px rgba(182, 240, 0, 0.2)"; }}
                >
                  <span>Call Us Now</span>
                  <div style={{ width: "40px", height: "40px", borderRadius: "50%", backgroundColor: "rgba(0,0,0,0.1)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <ArrowRight size={20} />
                  </div>
                </a>

                <a href="/contact" style={{
                  display: "flex", alignItems: "center", justifyContent: "space-between",
                  padding: "24px 40px", backgroundColor: "rgba(255,255,255,0.05)", color: "#ffffff",
                  textTransform: "uppercase", fontSize: "16px", fontWeight: 700, letterSpacing: "1px", textDecoration: "none",
                  borderRadius: "20px", transition: "all 0.3s ease",
                  border: "1px solid rgba(255,255,255,0.1)"
                }}
                  onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.1)"; e.currentTarget.style.transform = "translateY(-4px)"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.05)"; e.currentTarget.style.transform = "translateY(0)"; }}
                >
                  <span>Message Us</span>
                  <div style={{ width: "40px", height: "40px", borderRadius: "50%", backgroundColor: "rgba(255,255,255,0.1)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <Target size={20} />
                  </div>
                </a>
              </div>

            </div>
          </div>
        </section>

      </div>
    </>
  );
}