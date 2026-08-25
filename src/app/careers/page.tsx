"use client";

import React from "react";
import { SiteHeader } from "@/components/SiteHeader";
import { FooterSection } from "@/components/FooterSection";
import { HotshotFaqSection } from "@/components/HotshotFaqSection";
import { ContactSection } from "@/components/ContactSection";
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
            filter: none !important;
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
          paddingTop: "200px",
          paddingBottom: "100px",
          position: "relative",
          overflow: "hidden",
          background: "radial-gradient(circle at 15% 50%, rgba(244, 252, 232, 0.4), transparent 25%), radial-gradient(circle at 85% 30%, rgba(224, 242, 254, 0.4), transparent 25%)"
        }}>
          {/* Subtle Grid Background */}
          <div style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, backgroundImage: "linear-gradient(rgba(15, 23, 42, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(15, 23, 42, 0.03) 1px, transparent 1px)", backgroundSize: "40px 40px", pointerEvents: "none", zIndex: 0 }} />

          <div style={{ maxWidth: "1000px", margin: "0 auto", padding: "0 40px", textAlign: "center", position: "relative", zIndex: 1 }}>
            <h1 style={{ fontFamily: "var(--font-primary)", fontSize: "clamp(48px, 8vw, 80px)", fontWeight: 600, letterSpacing: "-0.03em", lineHeight: 1.1, marginBottom: "24px", color: "#0f172a" }}>
              Drive Your Career<br/>Forward
            </h1>

            <p style={{ fontSize: "18px", color: "#475569", lineHeight: 1.6, maxWidth: "600px", margin: "0 auto 40px", fontWeight: 500 }}>
              We are on a mission to redefine expedited transport. Bring your skills to a team that values innovation, speed, and reliability.
            </p>

            <a href="#open-positions" style={{
              display: "inline-block",
              backgroundColor: "#0f172a", color: "#ffffff",
              padding: "16px 36px", fontSize: "16px", fontWeight: 700,
              borderRadius: "12px", textDecoration: "none", transition: "all 0.2s ease",
              boxShadow: "0 10px 20px rgba(15, 23, 42, 0.1)"
            }}
              onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.backgroundColor = "#1e293b"; e.currentTarget.style.boxShadow = "0 15px 30px rgba(15, 23, 42, 0.15)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.backgroundColor = "#0f172a"; e.currentTarget.style.boxShadow = "0 10px 20px rgba(15, 23, 42, 0.1)"; }}
            >
              View Open Positions
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
                    <span style={{ padding: "8px 16px", background: "rgba(227, 30, 36, 0.15)", color: "#526c00", borderRadius: "100px", fontSize: "12px", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase" }}>
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
                    background: "#fef2f2", 
                    borderRadius: "16px", 
                    borderLeft: "4px solid #E31E24"
                  }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "12px" }}>
                      <MapPin size={24} color="#E31E24" />
                      <h4 style={{ fontSize: "16px", fontWeight: 800, color: "#B9181D", margin: 0, letterSpacing: "0.05em", textTransform: "uppercase" }}>Target Locations</h4>
                    </div>
                    <p style={{ color: "#0f172a", lineHeight: 1.6, margin: 0, fontSize: "16px", fontWeight: 500 }}>
                      Hartford, West Hartford, Bloomfield, Windsor, Avon, Simsbury, Canton, Burlington, Torrington, Middletown, Berlin, Cromwell, New London County, and surrounding areas.
                    </p>
                  </div>
                </div>
                
                <div style={{ position: "relative", background: "#e5e7eb", overflow: "hidden" }}>
                  <Image
                    src="/images/cmjl-drivers-group.jpg"
                    alt="CMJL Drivers"
                    fill
                    style={{ objectFit: "cover", objectPosition: "center" }}
                  />
                  <div style={{ position: "absolute", inset: 0, background: "linear-gradient(90deg, rgba(255,255,255,1) 0%, rgba(255,255,255,0) 20%)" }} />
                  
                  {/* Unique Apply Now Button over Image */}
                  <div style={{ position: "absolute", bottom: "40px", right: "40px" }}>
                    <a 
                      href="https://expeditedtransport.net/register" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "12px",
                        background: "#E31E24",
                        padding: "16px 32px",
                        borderRadius: "100px",
                        color: "#0f172a",
                        textDecoration: "none",
                        fontWeight: 800,
                        fontSize: "16px",
                        letterSpacing: "0.5px",
                        textTransform: "uppercase",
                        boxShadow: "0 24px 48px rgba(227, 30, 36, 0.4)",
                        border: "none"
                      }}
                    >
                      Apply Now <ArrowRight size={20} />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* MINIMALIST MAGAZINE SPLIT SECTION */}
        <section style={{ padding: "120px 0", backgroundColor: "#ffffff" }}>
          <div style={{ maxWidth: "1500px", margin: "0 auto", padding: "0 40px" }}>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "80px" }}>
              
              {/* LEFT SIDE: WHAT WE OFFER */}
              <div style={{ flex: "1 1 600px" }}>
                <h2 style={{ fontFamily: "var(--font-primary)", fontSize: "clamp(48px, 6vw, 80px)", fontWeight: 500, letterSpacing: "-0.04em", color: "#0f172a", margin: "0 0 20px", lineHeight: 1 }}>
                  What We <br/> <span style={{ color: "#E31E24" }}>Offer.</span>
                </h2>
                <p style={{ fontSize: "20px", color: "#64748b", margin: "0 0 60px", lineHeight: 1.6, maxWidth: "500px" }}>
                  Join a logistics network that respects your time, pays you fast, and gives you total control.
                </p>

                <div style={{ display: "flex", flexDirection: "column", gap: "40px" }}>
                  {[
                    { title: "Flexible Scheduling", desc: "Choose full-time or part-time routes that fit your lifestyle." },
                    { title: "On-Demand Routes", desc: "Access live route postings instantly through the CMJL App." },
                    { title: "Weekly Direct Deposit", desc: "Get paid reliably every single week, directly to your account." }
                  ].map((item, idx) => (
                    <div key={idx} style={{ display: "flex", gap: "24px" }}>
                      <div style={{ fontSize: "24px", fontWeight: 300, color: "#94a3b8", fontFamily: "var(--font-mono)" }}>
                        0{idx + 1}
                      </div>
                      <div>
                        <h3 style={{ fontSize: "24px", fontWeight: 700, color: "#0f172a", marginBottom: "12px", fontFamily: "var(--font-primary)" }}>{item.title}</h3>
                        <p style={{ margin: 0, color: "#475569", lineHeight: 1.6, fontSize: "18px", maxWidth: "400px" }}>{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* RIGHT SIDE: REQUIREMENTS (INFOGRAPHIC GRID) */}
              <div style={{ flex: "1 1 500px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "40px" }}>
                  <div style={{ width: "48px", height: "4px", backgroundColor: "#E31E24", borderRadius: "2px" }} />
                  <h3 style={{ fontSize: "32px", fontWeight: 700, color: "#0f172a", margin: 0, fontFamily: "var(--font-primary)", letterSpacing: "-0.02em" }}>Driver Requirements</h3>
                </div>
                
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "24px" }}>
                  {[
                    { short: "21+", desc: "Years of age or older" },
                    { short: "ID", desc: "Valid driver's license" },
                    { short: "Car", desc: "Reliable vehicle access" },
                    { short: "App", desc: "Smartphone for CMJL App" },
                    { short: "Clear", desc: "Pass background check" },
                    { short: "Pro", desc: "Professional attitude" }
                  ].map((req, idx) => (
                    <div key={idx} style={{ 
                      background: "#ffffff", 
                      borderRadius: "20px", 
                      padding: "32px 24px",
                      border: "2px solid #f1f5f9",
                      display: "flex", flexDirection: "column",
                      transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                      cursor: "default",
                      position: "relative",
                      overflow: "hidden"
                    }}
                    onMouseEnter={(e) => { 
                      e.currentTarget.style.borderColor = "#0f172a"; 
                      e.currentTarget.style.transform = "translateY(-6px)"; 
                      e.currentTarget.style.boxShadow = "0 24px 48px rgba(15, 23, 42, 0.08)"; 
                      const icon = e.currentTarget.querySelector('.req-icon') as HTMLElement;
                      if (icon) {
                        icon.style.color = "#E31E24";
                        icon.style.transform = "translateX(8px)";
                      }
                    }}
                    onMouseLeave={(e) => { 
                      e.currentTarget.style.borderColor = "#f1f5f9"; 
                      e.currentTarget.style.transform = "translateY(0)"; 
                      e.currentTarget.style.boxShadow = "none"; 
                      const icon = e.currentTarget.querySelector('.req-icon') as HTMLElement;
                      if (icon) {
                        icon.style.color = "#0f172a";
                        icon.style.transform = "translateX(0)";
                      }
                    }}
                    >
                      <div className="req-icon" style={{ fontSize: "36px", fontWeight: 800, color: "#0f172a", marginBottom: "16px", fontFamily: "var(--font-primary)", transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)", display: "inline-block", letterSpacing: "-0.04em" }}>
                        {req.short}
                      </div>
                      <p style={{ margin: 0, fontSize: "16px", color: "#64748b", fontWeight: 500, lineHeight: 1.6 }}>
                        {req.desc}
                      </p>
                    </div>
                  ))}
                </div>
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
            <div style={{ position: "absolute", top: "-50%", right: "-10%", width: "800px", height: "800px", background: "radial-gradient(circle, rgba(227, 30, 36, 0.08) 0%, transparent 70%)", borderRadius: "50%", pointerEvents: "none" }} />
            <div style={{ position: "absolute", bottom: "-20%", left: "10%", width: "400px", height: "400px", background: "radial-gradient(circle, rgba(255,255,255,0.03) 0%, transparent 70%)", borderRadius: "50%", pointerEvents: "none" }} />

            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "60px", position: "relative", zIndex: 1, flexWrap: "wrap" }}>

              <div style={{ flex: "1 1 500px" }}>
                <div style={{ display: "inline-flex", alignItems: "center", gap: "12px", padding: "10px 20px", backgroundColor: "rgba(227, 30, 36, 0.1)", borderRadius: "100px", marginBottom: "32px", border: "1px solid rgba(227, 30, 36, 0.2)" }}>
                  <Smartphone size={18} color="#E31E24" />
                  <span style={{ fontFamily: "var(--font-mono)", fontSize: "14px", color: "#E31E24", letterSpacing: "0.2em", textTransform: "uppercase", fontWeight: 700 }}>Start Today</span>
                </div>

                <h2 style={{ fontFamily: "var(--font-primary)", fontSize: "clamp(48px, 5vw, 64px)", fontWeight: 450, letterSpacing: "-0.02em", marginBottom: "24px", color: "#ffffff", lineHeight: 1.05 }}>
                  Download the <span style={{ color: "#E31E24" }}>CMJL</span> <br /> Driver App<span style={{ color: "#E31E24" }}>.</span>
                </h2>

                <p style={{ fontSize: "20px", color: "rgba(255, 255, 255, 0.7)", marginBottom: "0", lineHeight: 1.6, maxWidth: "540px", fontWeight: 400 }}>
                  Complete your onboarding and start accepting delivery opportunities immediately.
                </p>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "20px", minWidth: "300px", flexShrink: 0 }}>
                <a href="https://apps.apple.com/app/cmjl/id6775973879" target="_blank" rel="noopener noreferrer" style={{
                  display: "flex", alignItems: "center", justifyContent: "space-between", gap: "20px",
                  padding: "24px 40px", backgroundColor: "#E31E24", color: "#ffffff",
                  textTransform: "uppercase", fontSize: "16px", fontWeight: 700, letterSpacing: "1px", textDecoration: "none",
                  borderRadius: "20px", transition: "all 0.3s ease",
                  boxShadow: "0 20px 40px rgba(227, 30, 36, 0.2)"
                }}
                  onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = "0 30px 60px rgba(227, 30, 36, 0.3)"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 20px 40px rgba(227, 30, 36, 0.2)"; }}
                >
                  <span>iPhone App Store</span>
                  <div style={{ width: "40px", height: "40px", borderRadius: "50%", backgroundColor: "rgba(0,0,0,0.1)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <ArrowRight size={20} />
                  </div>
                </a>

                <a href="https://play.google.com/store/apps/details?id=net.expeditedtransport.driverapp&pcampaignid=web_share" target="_blank" rel="noopener noreferrer" style={{
                  display: "flex", alignItems: "center", justifyContent: "space-between", gap: "20px",
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
      <div style={{ position: "relative", zIndex: 6 }}>
        <HotshotFaqSection />
      </div>
      <div style={{ position: "relative", zIndex: 7 }}>
        <ContactSection />
      </div>
      <FooterSection />
    </>
  );
}

