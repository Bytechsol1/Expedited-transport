"use client";

import React from "react";
import Image from "next/image";
import { ArrowRight, Truck, ShieldCheck, Clock, Award, MapPin, Target } from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";
import { HotshotFaqSection } from "@/components/HotshotFaqSection";
import { FooterSection } from "@/components/FooterSection";

export function AboutUsSection() {
  return (
    <>
      <SiteHeader />
      <div style={{ backgroundColor: "#ffffff", color: "#0f172a", minHeight: "100vh", fontFamily: "'Inter', sans-serif" }}>

        <style>{`
          .site-header .nav-card,
          .site-header .nav-card.scrolled {
            background: rgba(255, 255, 255, 0.9) !important;
            border-color: rgba(15, 23, 42, 0.08) !important;
            box-shadow: 0 14px 40px rgba(15, 23, 42, 0.08) !important;
            backdrop-filter: blur(14px);
            -webkit-backdrop-filter: blur(14px);
          }
          .site-header .nav-card .brand-name,
          .site-header .nav-card .nav-lnk,
          .site-header .nav-card .nav-lnk-btn {
            color: #0f172a !important;
          }
          .site-header .nav-card .logo-wrap {
            filter: brightness(0) !important;
            opacity: 1 !important;
          }
          .site-header .nav-card .burger span {
            background: #0f172a !important;
          }
          .site-header .nav-card .burger {
            border-color: rgba(15, 23, 42, 0.16) !important;
            background: transparent !important;
          }
        `}</style>

        {/* HERO SECTION */}
        <section style={{
          paddingTop: "140px",
          paddingBottom: "160px",
          position: "relative",
          overflow: "hidden"
        }}>
          {/* 3D Infinite Grid Background */}
          <div style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, perspective: "800px", overflow: "hidden", pointerEvents: "none", zIndex: 0 }}>
            {/* 3D Receding Floor */}
            <div style={{
              position: "absolute",
              bottom: 0,
              left: "-50%",
              right: "-50%",
              height: "200%",
              backgroundImage: "linear-gradient(rgba(0,0,0,0.12) 2px, transparent 2px), linear-gradient(90deg, rgba(0,0,0,0.12) 2px, transparent 2px)",
              backgroundSize: "80px 80px",
              transform: "rotateX(60deg) scale(1.5)",
              transformOrigin: "bottom center",
              maskImage: "linear-gradient(to top, rgba(0,0,0,1) 5%, transparent 60%)",
              WebkitMaskImage: "linear-gradient(to top, rgba(0,0,0,1) 5%, transparent 60%)"
            }} />
          </div>

          <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 40px", textAlign: "center", position: "relative", zIndex: 1 }}>

            <div style={{ display: "inline-flex", alignItems: "center", gap: "12px", padding: "10px 20px", borderRadius: "100px", backgroundColor: "#f4fce8", border: "1px solid #d4f0c2", marginBottom: "40px", boxShadow: "0 10px 20px rgba(182, 240, 0, 0.1)" }}>
              <span style={{ width: "8px", height: "8px", borderRadius: "50%", backgroundColor: "#7a9900" }} />
              <span style={{ fontFamily: "var(--font-mono)", fontSize: "13px", textTransform: "uppercase", letterSpacing: "0.2em", color: "#5c7500", fontWeight: 700 }}>
                About Us
              </span>
            </div>

            <h1 style={{ fontFamily: "var(--font-primary)", fontSize: "clamp(56px, 8vw, 88px)", fontWeight: 450, letterSpacing: "-0.02em", lineHeight: 1.05, marginBottom: "40px", color: "#0f172a" }}>
              Trucking Company
            </h1>

            <p style={{ fontSize: "22px", color: "#475569", lineHeight: 1.7, maxWidth: "900px", margin: "0 auto 56px", fontWeight: 400 }}>
              Here at Expedited Transport Services, we aim to be the easy choice for all your shipping needs. We provide a wide range of dependable trucking services that will help you keep your business moving. We take pride in being a top trucking company, having gained a reputation for timely, secure, and affordable deliveries. We are always happy to answer any questions you have about our services, so give us a call at (860) 988-3887.
            </p>

            <a href="tel:+18609883887" style={{
              display: "inline-flex", alignItems: "center", gap: "12px",
              backgroundColor: "#0f172a", color: "#ffffff",
              padding: "20px 48px", fontSize: "16px", textTransform: "uppercase", letterSpacing: "1px", fontWeight: 700,
              borderRadius: "100px", textDecoration: "none", transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
              boxShadow: "0 20px 40px rgba(15, 23, 42, 0.2)"
            }}
              onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.backgroundColor = "#b6f000"; e.currentTarget.style.color = "#000000"; e.currentTarget.style.boxShadow = "0 24px 48px rgba(182, 240, 0, 0.3)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.backgroundColor = "#0f172a"; e.currentTarget.style.color = "#ffffff"; e.currentTarget.style.boxShadow = "0 20px 40px rgba(15, 23, 42, 0.2)"; }}
            >
              Call Us Today <ArrowRight size={20} />
            </a>
          </div>
        </section>
        {/* ABOUT US FEATURE BANNER */}
        <section style={{ padding: "0 0 104px", background: "linear-gradient(180deg, #f8fafc 0%, #eef2f7 100%)", overflow: "hidden" }}>
          <div style={{ maxWidth: "1600px", margin: "0 auto", padding: "0 24px" }}>
            <div style={{ position: "relative", background: "#ffffff", borderRadius: "0 0 28px 28px", overflow: "hidden", boxShadow: "0 18px 60px rgba(15, 23, 42, 0.08)" }}>
              <div style={{ display: "grid", gridTemplateColumns: "1.04fr 0.96fr", minHeight: "720px" }}>
                <div style={{ padding: "56px 56px 96px 56px", background: "linear-gradient(180deg, #ffffff 0%, #f8fafc 100%)", display: "flex", flexDirection: "column", justifyContent: "center" }}>
                  <div style={{ display: "inline-flex", alignItems: "center", gap: "14px", marginBottom: "28px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                      <div style={{ width: "38px", height: "8px", background: "#0f172a", transform: "skewX(-18deg)" }} />
                      <div style={{ width: "14px", height: "8px", background: "#f5bf12", transform: "skewX(-18deg)" }} />
                    </div>
                    <span style={{ fontFamily: "var(--font-mono)", fontSize: "12px", fontWeight: 700, letterSpacing: "0.28em", textTransform: "uppercase", color: "#0f172a" }}>
                      100% Satisfaction Guaranteed
                    </span>
                  </div>

                  <h2 style={{ margin: 0, maxWidth: "12ch", fontFamily: "var(--font-primary)", fontSize: "clamp(42px, 4.6vw, 72px)", lineHeight: 0.98, letterSpacing: "-0.03em", fontWeight: 450, color: "#0f172a" }}>
                    Your New Go-To
                  </h2>
                  <h2 style={{ margin: "6px 0", maxWidth: "12ch", fontFamily: "var(--font-primary)", fontSize: "clamp(42px, 4.6vw, 72px)", lineHeight: 0.98, letterSpacing: "-0.03em", fontWeight: 450, color: "#0f172a" }}>
                    Trucking Company
                  </h2>

                  <p style={{ marginTop: "24px", marginBottom: 0, maxWidth: "700px", fontSize: "18px", lineHeight: 1.7, color: "#475569" }}>
                    We have never been satisfied with being second best, so if you have been searching for a local trucking company that will put your shipment above all else, then you have come to the right place. We pay close attention to all aspects of the service we offer, meaning that we are always guaranteed to impress.
                  </p>

                  <p style={{ marginTop: "22px", marginBottom: 0, maxWidth: "700px", fontSize: "18px", lineHeight: 1.7, color: "#475569" }}>
                    Some of the reasons that you should consider us for your next shipment include:
                  </p>
                </div>
                <div style={{ position: "relative", minHeight: "680px", background: "#e5e7eb", overflow: "hidden", marginTop: "8px" }}>
                  <Image
                    src="/images/truck4.jpg"
                    alt="Truck on the road"
                    fill
                    style={{ objectFit: "cover", objectPosition: "center 48%" }}
                    priority
                  />
                  <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(15,23,42,0.02) 0%, rgba(15,23,42,0.04) 100%)" }} />
                </div>
              </div>

              <div style={{ position: "relative", marginTop: "-40px", padding: "0 20px 28px" }}>
                <div style={{ background: "#ffffff", borderRadius: "26px", boxShadow: "0 16px 45px rgba(15, 23, 42, 0.08)", border: "1px solid rgba(15, 23, 42, 0.06)", overflow: "hidden" }}>
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(6, minmax(0, 1fr))" }}>
                    {[
                      { icon: <Target size={28} color="#f5bf12" />, title: "Straightforward pricing" },
                      { icon: <Award size={28} color="#f5bf12" />, title: "Knowledgeable and friendly staff" },
                      { icon: <ShieldCheck size={28} color="#f5bf12" />, title: "Experienced drivers" },
                      { icon: <MapPin size={28} color="#f5bf12" />, title: "Shipment tracking" },
                      { icon: <Clock size={28} color="#f5bf12" />, title: "Warehousing options" },
                      { icon: <Truck size={28} color="#f5bf12" />, title: "Accommodating vehicles and shipment sizes" },
                    ].map((item, index) => (
                      <div
                        key={item.title}
                        style={{
                          minWidth: 0,
                          minHeight: "160px",
                          padding: "24px 18px",
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          justifyContent: "center",
                          textAlign: "center",
                          gap: "14px",
                          borderRight: index < 5 ? "1px solid rgba(15, 23, 42, 0.08)" : "none",
                          background: index % 2 === 0 ? "#ffffff" : "#fbfdff"
                        }}
                      >
                        <div style={{ width: "72px", height: "72px", borderRadius: "999px", background: "#0f172a", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                          {item.icon}
                        </div>
                        <div style={{ minWidth: 0, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                          <h3 style={{ margin: 0, fontSize: "16px", lineHeight: 1.28, fontWeight: 600, color: "#0f172a", whiteSpace: "normal", overflowWrap: "anywhere", textAlign: "center" }}>
                            {item.title}
                          </h3>
                          <div style={{ width: "34px", height: "3px", marginTop: "12px", background: "#f5bf12", borderRadius: "999px" }} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section style={{ padding: "120px 0", backgroundColor: "#f8fafc", color: "#051e24" }}>
          <div style={{ maxWidth: "1400px", margin: "0 auto", padding: "0 40px" }}>
            <div style={{ textAlign: "center", marginBottom: "80px" }}>
              <h2 style={{ fontFamily: "var(--font-primary)", fontSize: "48px", fontWeight: 450, letterSpacing: "-0.02em" }}>The Best Trucking Company for Any Job</h2>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "60px", perspective: "1500px", padding: "40px 20px" }}>
              {[
                { icon: <Clock size={36} color="#000" />, title: "On Time, Every Time", desc: "Punctuality is crucial in the trucking industry, which is why we plan and organize all of our shipments carefully. From our route selection, until we unload your freight, you can count on us to do everything required to get your product to its destination on time." },
                { icon: <ShieldCheck size={36} color="#000" />, title: "Delivered in Perfect Condition", desc: "In addition to our efficient logistics, we also go to great lengths to ensure that no damage is inflicted to your materials during transit. Using advanced trucks and safety equipment means that we will drop off all of your freight in the same condition it leaves in." },
                { icon: <Award size={36} color="#000" />, title: "Reasonable Rates on Certified Trucking", desc: "When searching for a trucking company, it always helps to find one that won’t hurt your bottom line. Our honest and affordable pricing has helped us create many strong partnerships with local businesses who trust us for all of their freight shipping." }
              ].map((card, idx) => (
                <div key={idx} style={{
                  position: "relative",
                  backgroundColor: "#ffffff",
                  padding: "48px 40px",
                  borderRadius: "20px",
                  border: "3px solid #0f172a",
                  // Extruded 3D edge using multiple stacked box-shadows
                  boxShadow: "-1px 1px 0 #0f172a, -2px 2px 0 #0f172a, -3px 3px 0 #0f172a, -4px 4px 0 #0f172a, -5px 5px 0 #0f172a, -6px 6px 0 #0f172a, -7px 7px 0 #0f172a, -8px 8px 0 #0f172a, -9px 9px 0 #0f172a, -10px 10px 0 #0f172a, -20px 20px 40px rgba(0,0,0,0.15)",
                  transform: "rotateX(25deg) rotateY(-15deg) rotateZ(5deg)",
                  transformStyle: "preserve-3d",
                  transition: "all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
                  cursor: "pointer"
                }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "rotateX(0deg) rotateY(0deg) rotateZ(0deg) scale(1.05) translateY(-10px)";
                    e.currentTarget.style.boxShadow = "0 30px 60px rgba(0,0,0,0.15), 0 0 0 4px #b6f000";
                    e.currentTarget.style.borderColor = "#b6f000";
                    const inner = e.currentTarget.querySelector('.inner-content') as HTMLElement;
                    if (inner) inner.style.transform = "translateZ(30px)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "rotateX(25deg) rotateY(-15deg) rotateZ(5deg)";
                    e.currentTarget.style.boxShadow = "-1px 1px 0 #0f172a, -2px 2px 0 #0f172a, -3px 3px 0 #0f172a, -4px 4px 0 #0f172a, -5px 5px 0 #0f172a, -6px 6px 0 #0f172a, -7px 7px 0 #0f172a, -8px 8px 0 #0f172a, -9px 9px 0 #0f172a, -10px 10px 0 #0f172a, -20px 20px 40px rgba(0,0,0,0.15)";
                    e.currentTarget.style.borderColor = "#0f172a";
                    const inner = e.currentTarget.querySelector('.inner-content') as HTMLElement;
                    if (inner) inner.style.transform = "translateZ(0)";
                  }}
                >
                  <div className="inner-content" style={{ transition: "transform 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)" }}>
                    <div style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: "70px", height: "70px", borderRadius: "16px", backgroundColor: "#b6f000", marginBottom: "32px", border: "2px solid #0f172a", boxShadow: "-4px 4px 0 #0f172a" }}>
                      {card.icon}
                    </div>

                    <h3 style={{ fontSize: "24px", fontWeight: 600, marginBottom: "20px", lineHeight: 1.3, color: "#0f172a" }}>
                      {card.title}
                    </h3>
                    <p style={{ color: "#475569", lineHeight: 1.7, fontSize: "16px", fontWeight: 500 }}>
                      {card.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>



        {/* ── CTA SECTION (Reusing the premium dark banner) ── */}
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
            <div style={{ position: "absolute", top: "-50%", right: "-10%", width: "800px", height: "800px", background: "radial-gradient(circle, rgba(182, 240, 0, 0.08) 0%, transparent 70%)", borderRadius: "50%", pointerEvents: "none" }} />
            <div style={{ position: "absolute", bottom: "-20%", left: "10%", width: "400px", height: "400px", background: "radial-gradient(circle, rgba(255,255,255,0.03) 0%, transparent 70%)", borderRadius: "50%", pointerEvents: "none" }} />

            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "60px", position: "relative", zIndex: 1, flexWrap: "wrap" }}>

              <div style={{ flex: "1 1 500px" }}>
                <div style={{ display: "inline-flex", alignItems: "center", gap: "12px", padding: "10px 20px", backgroundColor: "rgba(182, 240, 0, 0.1)", borderRadius: "100px", marginBottom: "32px", border: "1px solid rgba(182, 240, 0, 0.2)" }}>
                  <MapPin size={18} color="#b6f000" />
                  <span style={{ fontFamily: "var(--font-mono)", fontSize: "14px", color: "#b6f000", letterSpacing: "0.2em", textTransform: "uppercase", fontWeight: 700 }}>Work With Us</span>
                </div>

                <h2 style={{ fontFamily: "var(--font-primary)", fontSize: "clamp(48px, 5vw, 64px)", fontWeight: 450, letterSpacing: "-0.02em", marginBottom: "24px", color: "#ffffff", lineHeight: 1.05 }}>
                  <span style={{ color: "#b6f000" }}>P</span>artner with the best. <br /> Let's get moving<span style={{ color: "#b6f000" }}>.</span>
                </h2>

                <p style={{ fontSize: "20px", color: "rgba(255, 255, 255, 0.7)", marginBottom: "0", lineHeight: 1.6, maxWidth: "540px", fontWeight: 400 }}>
                  We would love to get more in-depth about why we will make a valuable addition to your company. Reach out today.
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
      <div style={{ position: "relative", zIndex: 6 }}>
        <HotshotFaqSection />
      </div>
      <FooterSection />
    </>
  );
}








