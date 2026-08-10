"use client";

import React from "react";
import { SiteHeader } from "@/components/SiteHeader";
import { FooterSection } from "@/components/FooterSection";
import { ArrowRight, Clock, Package, ShieldCheck, MapPin, Smartphone, SmartphoneNfc, BadgeCheck } from "lucide-react";
import Image from "next/image";

export default function CareersPage() {
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
          paddingTop: "160px",
          paddingBottom: "120px",
          position: "relative",
          overflow: "hidden"
        }}>
          {/* 3D Infinite Grid Background */}
          <div style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, perspective: "800px", overflow: "hidden", pointerEvents: "none", zIndex: 0 }}>
            <div style={{
              position: "absolute",
              bottom: 0,
              left: "-50%",
              right: "-50%",
              height: "200%",
              backgroundImage: "linear-gradient(rgba(0,0,0,0.06) 2px, transparent 2px), linear-gradient(90deg, rgba(0,0,0,0.06) 2px, transparent 2px)",
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
                Careers at CMJL
              </span>
            </div>

            <h1 style={{ fontFamily: "var(--font-primary)", fontSize: "clamp(48px, 8vw, 88px)", fontWeight: 450, letterSpacing: "-0.02em", lineHeight: 1.05, marginBottom: "30px", color: "#0f172a" }}>
              Drive Your Career <br/>
              <span style={{ 
                color: "transparent",
                WebkitTextStroke: "2px #0f172a",
                backgroundImage: "linear-gradient(90deg, #0f172a, #0f172a)",
                backgroundRepeat: "no-repeat",
                backgroundSize: "100% 40%",
                backgroundPosition: "0 90%"
              }}>Forward</span>
            </h1>

            <p style={{ fontSize: "22px", color: "#475569", lineHeight: 1.7, maxWidth: "800px", margin: "0 auto 56px", fontWeight: 400 }}>
              We are on a mission to redefine expedited transport. Bring your skills to a team that values innovation, speed, and reliability. Start your journey with Expedited Transport Services today.
            </p>

            <a href="#open-positions" style={{
              display: "inline-flex", alignItems: "center", gap: "12px",
              backgroundColor: "#0f172a", color: "#ffffff",
              padding: "20px 48px", fontSize: "16px", textTransform: "uppercase", letterSpacing: "1px", fontWeight: 700,
              borderRadius: "100px", textDecoration: "none", transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
              boxShadow: "0 20px 40px rgba(15, 23, 42, 0.2)"
            }}
              onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.backgroundColor = "#b6f000"; e.currentTarget.style.color = "#000000"; e.currentTarget.style.boxShadow = "0 24px 48px rgba(182, 240, 0, 0.3)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.backgroundColor = "#0f172a"; e.currentTarget.style.color = "#ffffff"; e.currentTarget.style.boxShadow = "0 20px 40px rgba(15, 23, 42, 0.2)"; }}
            >
              View Open Positions <ArrowRight size={20} />
            </a>
          </div>
        </section>

        {/* INDEPENDENT CONTRACTOR SECTION */}
        <section id="open-positions" style={{ padding: "80px 0 120px", background: "linear-gradient(180deg, #f8fafc 0%, #eef2f7 100%)", overflow: "hidden" }}>
          <div style={{ maxWidth: "1600px", margin: "0 auto", padding: "0 24px" }}>
            <div style={{ position: "relative", background: "#ffffff", borderRadius: "28px", overflow: "hidden", boxShadow: "0 18px 60px rgba(15, 23, 42, 0.08)" }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", minHeight: "600px" }}>
                <div style={{ padding: "80px 60px", background: "linear-gradient(180deg, #ffffff 0%, #f8fafc 100%)", display: "flex", flexDirection: "column", justifyContent: "center" }}>
                  
                  <div style={{ display: "flex", gap: "12px", marginBottom: "30px", flexWrap: "wrap" }}>
                    <span style={{ padding: "8px 16px", background: "#f1f5f9", borderRadius: "100px", fontSize: "12px", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#475569" }}>
                      Independent Contractor
                    </span>
                    <span style={{ padding: "8px 16px", background: "rgba(182, 240, 0, 0.15)", color: "#526c00", borderRadius: "100px", fontSize: "12px", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase" }}>
                      Flexible Schedule
                    </span>
                  </div>

                  <h2 style={{ margin: "0 0 24px", fontFamily: "var(--font-primary)", fontSize: "clamp(36px, 4vw, 56px)", lineHeight: 1.05, letterSpacing: "-0.02em", fontWeight: 450, color: "#0f172a" }}>
                    Join the CMJL Driver Network
                  </h2>

                  <p style={{ margin: "0 0 32px", fontSize: "18px", lineHeight: 1.7, color: "#475569", maxWidth: "600px" }}>
                    Looking for flexible work and weekly pay? CMJL is hiring Independent Contractor Drivers throughout Connecticut. Whether you’re looking for full-time, part-time, or extra income, our app makes it easy to view and accept available delivery opportunities.
                  </p>

                  <div style={{ 
                    padding: "24px", 
                    background: "#f0f9ff", 
                    borderRadius: "16px", 
                    borderLeft: "4px solid #0ea5e9"
                  }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "12px" }}>
                      <MapPin size={24} color="#0284c7" />
                      <h4 style={{ fontSize: "16px", fontWeight: 800, color: "#0369a1", margin: 0, letterSpacing: "0.05em", textTransform: "uppercase" }}>Target Locations</h4>
                    </div>
                    <p style={{ color: "#0f172a", lineHeight: 1.6, margin: 0, fontSize: "16px", fontWeight: 500 }}>
                      Hartford, West Hartford, Bloomfield, Windsor, Avon, Simsbury, Canton, Burlington, Torrington, Middletown, Berlin, Cromwell, New London County, and surrounding areas.
                    </p>
                  </div>
                </div>
                
                <div style={{ position: "relative", background: "#e5e7eb", overflow: "hidden" }}>
                  <Image
                    src="/images/carrier-card-1.png"
                    alt="Driver looking at app"
                    fill
                    style={{ objectFit: "cover", objectPosition: "center" }}
                  />
                  <div style={{ position: "absolute", inset: 0, background: "linear-gradient(90deg, rgba(255,255,255,1) 0%, rgba(255,255,255,0) 20%)" }} />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* WHAT WE OFFER (3D EXTRUDED CARDS) */}
        <section style={{ padding: "0 0 120px", backgroundColor: "#eef2f7", color: "#051e24" }}>
          <div style={{ maxWidth: "1400px", margin: "0 auto", padding: "0 40px" }}>
            <div style={{ textAlign: "center", marginBottom: "80px" }}>
              <h2 style={{ fontFamily: "var(--font-primary)", fontSize: "clamp(40px, 5vw, 64px)", fontWeight: 450, letterSpacing: "-0.02em" }}>What We Offer</h2>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "50px", perspective: "1500px", padding: "20px" }}>
              {[
                { icon: <Clock size={36} color="#000" />, title: "Flexible Scheduling", desc: "Choose when you want to work. We offer full-time and part-time opportunities that fit perfectly around your life and commitments." },
                { icon: <SmartphoneNfc size={36} color="#000" />, title: "On-Demand Routes", desc: "Access route postings instantly, similar to platforms like Amazon Flex and Veho, ensuring you always have opportunities available." },
                { icon: <BadgeCheck size={36} color="#000" />, title: "Weekly Direct Deposit", desc: "Get paid reliably and quickly. We ensure our independent contractors receive their hard-earned money through weekly direct deposits." }
              ].map((card, idx) => (
                <div key={idx} style={{
                  position: "relative",
                  backgroundColor: "#ffffff",
                  padding: "48px 40px",
                  borderRadius: "20px",
                  border: "3px solid #0f172a",
                  boxShadow: "-1px 1px 0 #0f172a, -2px 2px 0 #0f172a, -3px 3px 0 #0f172a, -4px 4px 0 #0f172a, -5px 5px 0 #0f172a, -6px 6px 0 #0f172a, -7px 7px 0 #0f172a, -8px 8px 0 #0f172a, -9px 9px 0 #0f172a, -10px 10px 0 #0f172a, -20px 20px 40px rgba(0,0,0,0.15)",
                  transform: "rotateX(25deg) rotateY(-15deg) rotateZ(5deg)",
                  transformStyle: "preserve-3d",
                  transition: "all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
                  cursor: "default"
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

                    <h3 style={{ fontSize: "24px", fontWeight: 700, marginBottom: "20px", lineHeight: 1.3, color: "#0f172a" }}>
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

        {/* REQUIREMENTS */}
        <section style={{ padding: "0 40px 120px", backgroundColor: "#eef2f7" }}>
          <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
            <div style={{ 
              background: "linear-gradient(145deg, #0f172a 0%, #1e293b 100%)", 
              borderRadius: "32px", 
              padding: "60px", 
              color: "#fff",
              position: "relative",
              overflow: "hidden",
              boxShadow: "0 24px 48px rgba(15,23,42,0.15)"
            }}>
              <div style={{ position: "absolute", top: "-100px", right: "-100px", width: "400px", height: "400px", background: "radial-gradient(circle, rgba(182, 240, 0, 0.15) 0%, transparent 60%)", borderRadius: "50%", pointerEvents: "none" }} />
              
              <div style={{ display: "flex", alignItems: "center", gap: "20px", marginBottom: "40px", position: "relative" }}>
                <div style={{ width: "64px", height: "64px", borderRadius: "20px", background: "rgba(255,255,255,0.1)", display: "flex", alignItems: "center", justifyContent: "center", color: "#b6f000", border: "1px solid rgba(255,255,255,0.05)" }}>
                  <ShieldCheck size={32} />
                </div>
                <h2 style={{ fontFamily: "var(--font-primary)", fontSize: "clamp(32px, 4vw, 48px)", fontWeight: 450, letterSpacing: "-0.02em", color: "#fff", margin: 0 }}>
                  Requirements
                </h2>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px", position: "relative" }}>
                {[
                  "21 years of age or older",
                  "Valid driver’s license",
                  "Reliable vehicle (for applicable routes)",
                  "Smartphone for CMJL App",
                  "Pass background screening",
                  "Professional attitude & customer service"
                ].map((req, idx) => (
                  <div key={idx} style={{ 
                    display: "flex", alignItems: "center", gap: "16px",
                    padding: "20px 24px", borderRadius: "16px",
                    background: "rgba(255,255,255,0.03)",
                    border: "1px solid rgba(255,255,255,0.05)",
                    transition: "all 0.2s ease"
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.06)"; e.currentTarget.style.borderColor = "rgba(182, 240, 0, 0.3)"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.03)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.05)"; }}
                  >
                    <div style={{ width: "12px", height: "12px", borderRadius: "50%", background: "#b6f000", boxShadow: "0 0 10px rgba(182, 240, 0, 0.5)" }}></div>
                    <span style={{ color: "#f8fafc", fontSize: "18px", fontWeight: 500 }}>{req}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── CTA SECTION (Download App) ── */}
        <section style={{ padding: "0 40px 160px", backgroundColor: "#eef2f7" }}>
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
                  <Smartphone size={18} color="#b6f000" />
                  <span style={{ fontFamily: "var(--font-mono)", fontSize: "14px", color: "#b6f000", letterSpacing: "0.2em", textTransform: "uppercase", fontWeight: 700 }}>Start Today</span>
                </div>

                <h2 style={{ fontFamily: "var(--font-primary)", fontSize: "clamp(48px, 5vw, 64px)", fontWeight: 450, letterSpacing: "-0.02em", marginBottom: "24px", color: "#ffffff", lineHeight: 1.05 }}>
                  Download the <span style={{ color: "#b6f000" }}>CMJL</span> <br /> Driver App<span style={{ color: "#b6f000" }}>.</span>
                </h2>

                <p style={{ fontSize: "20px", color: "rgba(255, 255, 255, 0.7)", marginBottom: "0", lineHeight: 1.6, maxWidth: "540px", fontWeight: 400 }}>
                  Complete your onboarding and start accepting delivery opportunities immediately.
                </p>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "20px", minWidth: "300px", flexShrink: 0 }}>
                <a href="https://apps.apple.com/app/cmjl/id6775973879" target="_blank" rel="noopener noreferrer" style={{
                  display: "flex", alignItems: "center", justifyContent: "space-between",
                  padding: "24px 40px", backgroundColor: "#b6f000", color: "#000000",
                  textTransform: "uppercase", fontSize: "16px", fontWeight: 700, letterSpacing: "1px", textDecoration: "none",
                  borderRadius: "20px", transition: "all 0.3s ease",
                  boxShadow: "0 20px 40px rgba(182, 240, 0, 0.2)"
                }}
                  onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = "0 30px 60px rgba(182, 240, 0, 0.3)"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 20px 40px rgba(182, 240, 0, 0.2)"; }}
                >
                  <span>iPhone App Store</span>
                  <div style={{ width: "40px", height: "40px", borderRadius: "50%", backgroundColor: "rgba(0,0,0,0.1)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <ArrowRight size={20} />
                  </div>
                </a>

                <a href="https://play.google.com/store/apps/details?id=net.expeditedtransport.driverapp&pcampaignid=web_share" target="_blank" rel="noopener noreferrer" style={{
                  display: "flex", alignItems: "center", justifyContent: "space-between",
                  padding: "24px 40px", backgroundColor: "rgba(255,255,255,0.05)", color: "#ffffff",
                  textTransform: "uppercase", fontSize: "16px", fontWeight: 700, letterSpacing: "1px", textDecoration: "none",
                  borderRadius: "20px", transition: "all 0.3s ease",
                  border: "1px solid rgba(255,255,255,0.1)"
                }}
                  onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.1)"; e.currentTarget.style.transform = "translateY(-4px)"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.05)"; e.currentTarget.style.transform = "translateY(0)"; }}
                >
                  <span>Google Play Store</span>
                  <div style={{ width: "40px", height: "40px", borderRadius: "50%", backgroundColor: "rgba(255,255,255,0.1)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <ArrowRight size={20} />
                  </div>
                </a>
              </div>

            </div>
          </div>
        </section>

      </div>
      <FooterSection />
    </>
  );
}
