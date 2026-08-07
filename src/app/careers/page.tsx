"use client";

import { SiteHeader } from "@/components/SiteHeader";
import { FooterSection } from "@/components/FooterSection";
import React from "react";
import Link from "next/link";
import { Package, ShieldCheck, ArrowRight, MapPin } from "lucide-react";

export default function CareersPage() {
  return (
    <>
      <SiteHeader />
      <main className="careers-page">
        <style>{`
          .careers-page {
            min-height: 100vh;
            background-color: #f7f9fc;
          }
          .careers-hero {
            position: relative;
            width: 100%;
            min-height: 65vh;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            background: radial-gradient(circle at 10% 0%, rgba(182, 240, 0, 0.11), transparent 26%), radial-gradient(circle at 88% 10%, rgba(59, 130, 246, 0.08), transparent 20%), linear-gradient(180deg, #f7f9fc 0%, #edf2f8 100%);
            color: #0f172a;
            padding: 10rem 2rem 6rem;
            overflow: hidden;
          }
          .careers-title {
            font-family: var(--font-primary, sans-serif);
            font-size: clamp(3rem, 6vw, 5.5rem);
            font-weight: 450;
            letter-spacing: -0.03em;
            line-height: 1.05;
            margin-bottom: 1.5rem;
          }
          .careers-btn {
            display: inline-block;
            padding: 1rem 2.5rem;
            background: #0f172a;
            color: #fff;
            font-weight: 700;
            border-radius: 12px;
            text-decoration: none;
            transition: transform 0.2s ease, box-shadow 0.2s ease;
          }
          .careers-btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 12px 24px rgba(15,23,42,0.2);
          }
        `}</style>
        {/* HERO SECTION */}
        <div className="careers-hero">
          {/* Subtle grid pattern background */}
          <div style={{
            position: "absolute",
            inset: 0,
            backgroundImage: "linear-gradient(rgba(15,23,42,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(15,23,42,0.03) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
            opacity: 0.8,
            zIndex: 0
          }} />
          
          {/* Accent glow */}
          <div style={{
            position: "absolute",
            top: "20%",
            left: "50%",
            transform: "translateX(-50%)",
            width: "60vw",
            height: "60vw",
            background: "radial-gradient(circle, rgba(182, 240, 0, 0.15) 0%, transparent 60%)",
            filter: "blur(60px)",
            zIndex: 0,
            pointerEvents: "none"
          }} />

          <div style={{ position: "relative", zIndex: 1, textAlign: "center", maxWidth: "800px" }}>

            
            <h1 className="careers-title">
              Drive Your Career <br />
              <span style={{ color: "#0f172a" }}>Forward</span>
            </h1>
            
            <p style={{
              fontSize: "1.125rem",
              color: "#475569",
              lineHeight: 1.6,
              marginBottom: "2.5rem",
              maxWidth: "600px",
              margin: "0 auto 2.5rem"
            }}>
              We are on a mission to redefine expedited transport. Bring your skills to a team that values innovation, speed, and reliability.
            </p>
            
            <a href="#open-positions" className="careers-btn">
              View Open Positions
            </a>
          </div>
        </div>

        {/* JOBS SECTION */}
        <div id="open-positions" style={{ maxWidth: "1000px", margin: "0 auto", padding: "6rem 2rem", color: "#111" }}>
          <div style={{ textAlign: "center", marginBottom: "4rem" }}>
            <h2
              style={{
                fontFamily: "var(--font-primary, sans-serif)",
                fontSize: "clamp(2.5rem, 4vw, 3rem)",
                fontWeight: 800,
                letterSpacing: "-0.03em",
                marginBottom: "1rem",
                color: "#0f172a"
              }}
            >
              Current Openings
            </h2>
            <p
              style={{
                fontSize: "1.125rem",
                color: "#475569",
                maxWidth: "600px",
                margin: "0 auto",
              }}
            >
              Start your journey with Expedited Transport Services today.
            </p>
          </div>

          <div style={{
            background: "#fff",
            border: "1px solid rgba(15, 23, 42, 0.08)",
            borderRadius: "24px",
            padding: "clamp(2rem, 5vw, 4rem)",
            boxShadow: "0 20px 40px rgba(15, 23, 42, 0.04)"
          }}>
            <div style={{ display: "flex", gap: "0.75rem", marginBottom: "1.5rem", flexWrap: "wrap" }}>
              <span style={{
                padding: "0.4rem 1rem",
                background: "rgba(15, 23, 42, 0.05)",
                borderRadius: "30px",
                fontSize: "0.8rem",
                fontWeight: 700,
                letterSpacing: "0.05em",
                textTransform: "uppercase",
                color: "#475569"
              }}>
                Independent Contractor
              </span>
              <span style={{
                padding: "0.4rem 1rem",
                background: "rgba(182, 240, 0, 0.2)",
                color: "#526c00",
                borderRadius: "30px",
                fontSize: "0.8rem",
                fontWeight: 700,
                letterSpacing: "0.05em",
                textTransform: "uppercase",
              }}>
                Flexible
              </span>
            </div>

            <h3 style={{
              fontFamily: "var(--font-primary, sans-serif)",
              fontSize: "clamp(1.75rem, 3vw, 2.5rem)",
              fontWeight: 800,
              color: "#0f172a",
              marginBottom: "1.5rem",
              lineHeight: 1.2
            }}>
              Join the CMJL Driver Network
            </h3>

            <p style={{ fontSize: "1.125rem", lineHeight: 1.8, color: "#475569", marginBottom: "2rem" }}>
              Looking for flexible work and weekly pay? CMJL is hiring Independent Contractor Drivers throughout Connecticut. Whether you’re looking for full-time, part-time, or extra income, our app makes it easy to view and accept available delivery opportunities.
            </p>

            <div style={{ 
              padding: "1.25rem 1.5rem", 
              background: "rgba(0, 212, 255, 0.04)", 
              borderRadius: "16px", 
              borderLeft: "4px solid #00d4ff",
              borderTop: "1px solid rgba(0, 212, 255, 0.1)",
              borderRight: "1px solid rgba(0, 212, 255, 0.1)",
              borderBottom: "1px solid rgba(0, 212, 255, 0.1)",
              display: "inline-block"
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.5rem" }}>
                <MapPin size={18} color="#00a2c7" />
                <h4 style={{ fontSize: "1rem", fontWeight: 800, color: "#00a2c7", margin: 0, letterSpacing: "0.05em", textTransform: "uppercase" }}>Target Locations</h4>
              </div>
              <p style={{ color: "#475569", lineHeight: 1.6, margin: 0, fontSize: "0.95rem" }}>
                Hartford, West Hartford, Bloomfield, Windsor, Avon, Simsbury, Canton, Burlington, Torrington, Middletown, Berlin, Cromwell, New London County, and surrounding areas.
              </p>
            </div>
          </div>

          <div className="job-details-grid" style={{ display: "flex", flexDirection: "column", gap: "4rem", marginTop: "4rem", marginBottom: "4rem", maxWidth: "800px", marginInline: "auto" }}>
              
              {/* Offerings Column */}
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "2rem" }}>
                  <div style={{ width: "40px", height: "40px", borderRadius: "12px", background: "#b6f000", display: "flex", alignItems: "center", justifyContent: "center", color: "#0f172a" }}>
                    <Package size={20} />
                  </div>
                  <h4 style={{ fontSize: "1.5rem", fontWeight: 800, color: "#0f172a", margin: 0 }}>What We Offer</h4>
                </div>
                
                <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                  {[
                    "Flexible scheduling",
                    "Full-time and part-time opportunities",
                    "On-demand route postings similar to Amazon Flex and Veho",
                    "Weekly direct deposit",
                    "Route management and performance tracking through the CMJL Driver App"
                  ].map((offer, idx) => (
                    <div key={idx} style={{ display: "flex", alignItems: "flex-start", gap: "1rem" }}>
                      <div style={{ marginTop: "4px", width: "24px", height: "24px", borderRadius: "50%", background: "rgba(182, 240, 0, 0.2)", color: "#7a9900", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                        <span style={{ fontSize: "0.8rem", fontWeight: "bold" }}>✓</span>
                      </div>
                      <span style={{ color: "#475569", fontSize: "1.1rem", lineHeight: 1.5, fontWeight: 500 }}>{offer}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Requirements Column - Elevated Card Style */}
              <div style={{ 
                background: "linear-gradient(145deg, #0f172a 0%, #1e293b 100%)", 
                borderRadius: "24px", 
                padding: "2.5rem", 
                color: "#fff",
                position: "relative",
                overflow: "hidden",
                boxShadow: "0 24px 48px rgba(15,23,42,0.15)",
                display: "flex",
                flexDirection: "column"
              }}>
                <div style={{ position: "absolute", top: "-50px", right: "-50px", width: "150px", height: "150px", background: "#b6f000", opacity: 0.1, filter: "blur(40px)", borderRadius: "50%" }}></div>
                
                <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "2rem", position: "relative" }}>
                  <div style={{ width: "40px", height: "40px", borderRadius: "12px", background: "rgba(255,255,255,0.1)", display: "flex", alignItems: "center", justifyContent: "center", color: "#b6f000" }}>
                    <ShieldCheck size={20} />
                  </div>
                  <h4 style={{ fontSize: "1.5rem", fontWeight: 800, color: "#fff", margin: 0 }}>Requirements</h4>
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: "1rem", marginBottom: "3rem", position: "relative" }}>
                  {[
                    "21 years of age or older",
                    "Valid driver’s license",
                    "Reliable vehicle (for applicable routes)",
                    "Smartphone",
                    "Pass background screening",
                    "Professional attitude & customer service"
                  ].map((req, idx) => (
                    <div key={idx} style={{ 
                      display: "flex", alignItems: "center", gap: "1rem",
                      padding: "1rem", borderRadius: "12px",
                      background: "rgba(255,255,255,0.03)",
                      border: "1px solid rgba(255,255,255,0.05)"
                    }}>
                      <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#b6f000" }}></div>
                      <span style={{ color: "#e2e8f0", fontSize: "0.95rem", fontWeight: 500 }}>{req}</span>
                    </div>
                  ))}
                </div>

                <div style={{ marginTop: "auto", position: "relative" }}>
                  <a 
                    href="#download-app"
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      padding: "1.25rem 2rem",
                      background: "#b6f000",
                      color: "#0f172a",
                      fontWeight: 800,
                      fontSize: "1.1rem",
                      borderRadius: "16px",
                      textDecoration: "none",
                      transition: "transform 0.2s ease, box-shadow 0.2s ease"
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = "translateY(-4px)";
                      e.currentTarget.style.boxShadow = "0 12px 24px rgba(182,240,0,0.2)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = "none";
                      e.currentTarget.style.boxShadow = "none";
                    }}
                  >
                    Apply Now
                    <ArrowRight size={20} />
                  </a>
                </div>
              </div>

            </div>



          <div style={{
            background: "#fff",
            border: "1px solid rgba(15, 23, 42, 0.08)",
            borderRadius: "24px",
            padding: "clamp(2rem, 5vw, 4rem)",
            boxShadow: "0 20px 40px rgba(15, 23, 42, 0.04)"
          }}>
            <div id="download-app">
              <h4 style={{ fontSize: "1.5rem", fontWeight: 800, color: "#0f172a", marginBottom: "1rem", textAlign: "center" }}>Download the CMJL Driver App</h4>
              <p style={{ textAlign: "center", color: "#475569", marginBottom: "2.5rem", maxWidth: "500px", margin: "0 auto 2.5rem" }}>
                Download the app today, complete your onboarding, and start accepting delivery opportunities!
              </p>
              
              <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap", marginBottom: "3rem" }}>
                <a 
                  href="https://apps.apple.com/app/cmjl/id6775973879" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  style={{
                    display: "inline-flex", alignItems: "center", gap: "10px", background: "#000", color: "#fff",
                    padding: "12px 28px", borderRadius: "12px", textDecoration: "none", fontWeight: 600, fontSize: "1rem",
                    transition: "transform 0.2s"
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.transform = "translateY(-2px)"}
                  onMouseLeave={(e) => e.currentTarget.style.transform = "none"}
                >
                  iPhone App Store
                </a>
                <a 
                  href="https://play.google.com/store/apps/details?id=net.expeditedtransport.driverapp&pcampaignid=web_share" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  style={{
                    display: "inline-flex", alignItems: "center", gap: "10px", background: "#0f172a", color: "#fff",
                    padding: "12px 28px", borderRadius: "12px", textDecoration: "none", fontWeight: 600, fontSize: "1rem",
                    transition: "transform 0.2s"
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.transform = "translateY(-2px)"}
                  onMouseLeave={(e) => e.currentTarget.style.transform = "none"}
                >
                  Google Play Store
                </a>
              </div>

              <div style={{ textAlign: "center", background: "rgba(182, 240, 0, 0.15)", border: "1px solid rgba(182, 240, 0, 0.3)", padding: "1.5rem", borderRadius: "12px" }}>
                <p style={{ margin: 0, fontWeight: 600, color: "#0f172a" }}>Need assistance? Call or text: <a href="tel:8609883887" style={{ color: "#7a9900", textDecoration: "none" }}>860-988-3887</a></p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <FooterSection />
    </>
  );
}
