"use client";

import React from "react";
import { SiteHeader } from "@/components/SiteHeader";
import { FooterSection } from "@/components/FooterSection";
import { HotshotFaqSection } from "@/components/HotshotFaqSection";
import { ContactSection } from "@/components/ContactSection";
import { ArrowRight, MapPin, Smartphone } from "lucide-react";
import Image from "next/image";

export default function CareersPage() {
  return (
    <>
      <SiteHeader />
      <main className="min-h-screen bg-white font-[var(--font-inter)] text-slate-900">

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
        <section className="relative overflow-hidden pt-28 pb-14 sm:pt-36 sm:pb-20 lg:pt-[200px] lg:pb-[100px]" style={{
          background: "radial-gradient(circle at 15% 50%, rgba(244, 252, 232, 0.4), transparent 25%), radial-gradient(circle at 85% 30%, rgba(224, 242, 254, 0.4), transparent 25%)"
        }}>
          {/* Subtle Grid Background */}
          <div style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, backgroundImage: "linear-gradient(rgba(15, 23, 42, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(15, 23, 42, 0.03) 1px, transparent 1px)", backgroundSize: "40px 40px", pointerEvents: "none", zIndex: 0 }} />

          <div className="relative z-1 mx-auto max-w-[1000px] px-5 text-center sm:px-6 lg:px-10">
            <h1 className="mb-6 font-[var(--font-primary)] text-[clamp(36px,8vw,80px)] leading-[1.1] font-semibold tracking-[-0.03em] text-slate-900">
              Drive Your Career<br/>Forward
            </h1>

            <p className="mx-auto mb-8 max-w-[600px] text-base leading-[1.6] font-medium text-slate-600 sm:mb-10 sm:text-lg">
              We are on a mission to redefine expedited transport. Bring your skills to a team that values innovation, speed, and reliability.
            </p>

            <a href="#open-positions" className="px-6 py-4 text-sm sm:px-9 sm:text-base" style={{
              display: "inline-block",
              backgroundColor: "#0f172a", color: "#ffffff",
              fontWeight: 700,
              borderRadius: "12px", textDecoration: "none", transition: "all 0.2s ease",
              boxShadow: "0 10px 20px rgba(15, 23, 42, 0.1)"
            }}
              onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.backgroundColor = "#E31E24"; e.currentTarget.style.color = "#ffffff"; e.currentTarget.style.boxShadow = "0 15px 30px rgba(227, 30, 36, 0.25)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.backgroundColor = "#0f172a"; e.currentTarget.style.color = "#ffffff"; e.currentTarget.style.boxShadow = "0 10px 20px rgba(15, 23, 42, 0.1)"; }}
            >
              View Open Positions
            </a>
          </div>
        </section>

        {/* INDEPENDENT CONTRACTOR SECTION */}
        <section id="open-positions" className="scroll-mt-24 overflow-hidden bg-linear-to-b from-slate-50 to-[#eef2f7] pt-10 pb-14 sm:py-16 lg:pt-20 lg:pb-[120px]">
          <div className="mx-auto max-w-[1600px] px-4 sm:px-6">
            <div style={{ position: "relative", background: "#ffffff", borderRadius: "28px", overflow: "hidden", boxShadow: "0 18px 60px rgba(15, 23, 42, 0.08)" }}>
              <div className="grid grid-cols-1 lg:min-h-[600px] lg:grid-cols-2">
                <div className="flex min-w-0 flex-col justify-center bg-linear-to-b from-white to-slate-50 px-6 py-8 sm:p-10 lg:px-10 lg:py-20 xl:px-[60px]">
                  
                  <div className="mb-6 flex flex-wrap gap-2 sm:mb-[30px] sm:gap-3">
                    <span className="rounded-full bg-slate-100 px-3 py-2 text-[10px] leading-relaxed font-bold tracking-[0.1em] text-slate-600 uppercase sm:px-4 sm:text-xs">
                      Independent Contractor
                    </span>
                    <span className="rounded-full bg-[#E31E24]/15 px-3 py-2 text-[10px] leading-relaxed font-bold tracking-[0.1em] text-[#526c00] uppercase sm:px-4 sm:text-xs">
                      Flexible Schedule
                    </span>
                  </div>

                  <h2 className="mt-0 mb-6 font-[var(--font-primary)] text-[clamp(30px,4vw,56px)] leading-[1.1] font-[450] tracking-[-0.02em] text-slate-900 lg:leading-[1.05]">
                    Join the CMJL Driver Network
                  </h2>

                  <p className="mt-0 mb-8 max-w-[600px] text-base leading-[1.7] text-slate-600 lg:text-lg">
                    Looking for flexible work and weekly pay? CMJL is hiring Independent Contractor Drivers throughout Connecticut. Whether you’re looking for full-time, part-time, or extra income, our app makes it easy to view and accept available delivery opportunities.
                  </p>

                  <div className="rounded-2xl border-l-4 border-[#E31E24] bg-red-50 p-4 sm:p-6">
                    <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "12px" }}>
                      <MapPin size={24} color="#E31E24" className="shrink-0" />
                      <h4 className="m-0 text-sm font-extrabold tracking-[0.05em] text-[#B9181D] uppercase sm:text-base">Target Locations</h4>
                    </div>
                    <p style={{ color: "#0f172a", lineHeight: 1.6, margin: 0, fontSize: "16px", fontWeight: 500 }}>
                      Hartford, West Hartford, Bloomfield, Windsor, Avon, Simsbury, Canton, Burlington, Torrington, Middletown, Berlin, Cromwell, New London County, and surrounding areas.
                    </p>
                  </div>
                </div>
                
                <div className="relative min-h-[280px] overflow-hidden bg-gray-200 sm:min-h-[420px] lg:min-h-0">
                  <Image
                    src="/images/cmjl-drivers-group.jpg"
                    alt="CMJL Drivers"
                    fill
                    sizes="(max-width: 1023px) 100vw, 50vw"
                    style={{ objectFit: "cover", objectPosition: "center" }}
                  />
                  <div className="absolute inset-0 bg-linear-to-b from-white to-transparent to-20% lg:bg-linear-to-r" />
                  
                  {/* Unique Apply Now Button over Image */}
                  <div className="absolute right-5 bottom-5 sm:right-10 sm:bottom-10">
                    <a 
                      href="https://expeditedtransport.net/register" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="px-6 py-3.5 text-sm sm:px-8 sm:py-4 sm:text-base"
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "12px",
                        background: "#E31E24",
                        borderRadius: "100px",
                        color: "#ffffff",
                        textDecoration: "none",
                        fontWeight: 800,
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
        <section className="bg-white py-14 sm:py-20 lg:py-[120px]">
          <div className="mx-auto max-w-[1500px] px-5 sm:px-6 lg:px-10">
            <div className="grid grid-cols-1 gap-12 sm:gap-16 xl:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] xl:gap-20">
              
              {/* LEFT SIDE: WHAT WE OFFER */}
              <div className="min-w-0">
                <h2 className="mt-0 mb-5 font-[var(--font-primary)] text-[clamp(40px,6vw,80px)] leading-none font-medium tracking-[-0.04em] text-slate-900">
                  What We <br/> <span style={{ color: "#E31E24" }}>Offer.</span>
                </h2>
                <p className="mt-0 mb-8 max-w-[500px] text-base leading-[1.6] text-slate-500 sm:text-lg lg:mb-[60px] lg:text-xl">
                  Join a logistics network that respects your time, pays you fast, and gives you total control.
                </p>

                <div className="flex flex-col gap-7 sm:gap-10">
                  {[
                    { title: "Flexible Scheduling", desc: "Choose full-time or part-time routes that fit your lifestyle." },
                    { title: "On-Demand Routes", desc: "Access live route postings instantly through the CMJL App." },
                    { title: "Weekly Direct Deposit", desc: "Get paid reliably every single week, directly to your account." }
                  ].map((item, idx) => (
                    <div key={idx} className="flex gap-4 sm:gap-6">
                      <div className="shrink-0 font-[var(--font-mono)] text-xl font-light text-slate-400 sm:text-2xl">
                        0{idx + 1}
                      </div>
                      <div className="min-w-0">
                        <h3 className="mb-3 font-[var(--font-primary)] text-xl leading-tight font-bold text-slate-900 sm:text-2xl">{item.title}</h3>
                        <p className="m-0 max-w-[400px] text-base leading-[1.6] text-slate-600 sm:text-lg">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* RIGHT SIDE: REQUIREMENTS (INFOGRAPHIC GRID) */}
              <div className="min-w-0">
                <div className="mb-6 flex items-center gap-3 sm:mb-10 sm:gap-4">
                  <div className="h-1 w-6 shrink-0 rounded-xs bg-[#E31E24] sm:w-12" />
                  <h3 className="m-0 font-[var(--font-primary)] text-2xl leading-tight font-bold tracking-[-0.02em] text-slate-900 sm:text-[32px]">Driver Requirements</h3>
                </div>
                
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-6 xl:grid-cols-2">
                  {[
                    { short: "21+", desc: "Years of age or older" },
                    { short: "ID", desc: "Valid driver's license" },
                    { short: "Car", desc: "Reliable vehicle access" },
                    { short: "App", desc: "Smartphone for CMJL App" },
                    { short: "Clear", desc: "Pass background check" },
                    { short: "Pro", desc: "Professional attitude" }
                  ].map((req, idx) => (
                    <div key={idx} className="min-w-0 px-4 py-5 sm:px-6 sm:py-8" style={{
                      background: "#ffffff", 
                      borderRadius: "20px", 
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
                      <div className="req-icon text-[30px] sm:text-4xl" style={{ fontWeight: 800, color: "#0f172a", marginBottom: "16px", fontFamily: "var(--font-primary)", transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)", display: "inline-block", letterSpacing: "-0.04em" }}>
                        {req.short}
                      </div>
                      <p className="m-0 text-sm leading-[1.6] font-medium text-slate-500 sm:text-base">
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
        <section className="bg-[#eef2f7] px-4 pb-16 sm:px-6 sm:pb-24 lg:px-10 lg:pb-40">
          <div className="relative mx-auto max-w-[1400px] overflow-hidden rounded-3xl bg-black px-6 py-9 shadow-[0_40px_80px_rgba(0,0,0,0.15)] sm:rounded-[40px] sm:p-10 lg:p-20">
            <div style={{ position: "absolute", top: "-50%", right: "-10%", width: "800px", height: "800px", background: "radial-gradient(circle, rgba(227, 30, 36, 0.08) 0%, transparent 70%)", borderRadius: "50%", pointerEvents: "none" }} />
            <div style={{ position: "absolute", bottom: "-20%", left: "10%", width: "400px", height: "400px", background: "radial-gradient(circle, rgba(255,255,255,0.03) 0%, transparent 70%)", borderRadius: "50%", pointerEvents: "none" }} />

            <div className="relative z-1 flex flex-col gap-8 xl:flex-row xl:items-center xl:justify-between xl:gap-[60px]">

              <div className="min-w-0 flex-1">
                <div style={{ display: "inline-flex", alignItems: "center", gap: "12px", padding: "10px 20px", backgroundColor: "rgba(227, 30, 36, 0.1)", borderRadius: "100px", marginBottom: "32px", border: "1px solid rgba(227, 30, 36, 0.2)" }}>
                  <Smartphone size={18} color="#E31E24" />
                  <span style={{ fontFamily: "var(--font-mono)", fontSize: "14px", color: "#E31E24", letterSpacing: "0.2em", textTransform: "uppercase", fontWeight: 700 }}>Start Today</span>
                </div>

                <h2 className="mb-6 font-[var(--font-primary)] text-[clamp(32px,5vw,64px)] leading-[1.1] font-[450] tracking-[-0.02em] text-white lg:leading-[1.05]">
                  Download the <span style={{ color: "#E31E24" }}>CMJL</span> <br /> Driver App<span style={{ color: "#E31E24" }}>.</span>
                </h2>

                <p className="mb-0 max-w-[540px] text-base leading-[1.6] font-normal text-white/70 sm:text-lg lg:text-xl">
                  Complete your onboarding and start accepting delivery opportunities immediately.
                </p>
              </div>

              <div className="flex w-full min-w-0 shrink-0 flex-col gap-5 xl:w-[320px]">
                <a href="https://apps.apple.com/app/cmjl/id6775973879" target="_blank" rel="noopener noreferrer"
                  className="flex items-center justify-between gap-3 rounded-[20px] bg-[#E31E24] px-4 py-4 text-sm font-bold tracking-[0.04em] text-white uppercase no-underline shadow-[0_20px_40px_rgba(227,30,36,0.2)] transition-transform hover:-translate-y-1 sm:gap-5 sm:px-10 sm:py-6 sm:text-base"
                >
                  <span>iPhone App Store</span>
                  <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-black/10">
                    <ArrowRight size={20} />
                  </div>
                </a>

                <a href="https://play.google.com/store/apps/details?id=net.expeditedtransport.driverapp&pcampaignid=web_share" target="_blank" rel="noopener noreferrer"
                  className="flex items-center justify-between gap-3 rounded-[20px] border border-white/10 bg-white/5 px-4 py-4 text-sm font-bold tracking-[0.04em] text-white uppercase no-underline transition-all hover:-translate-y-1 hover:bg-white/10 sm:gap-5 sm:px-10 sm:py-6 sm:text-base"
                >
                  <span>Google Play Store</span>
                  <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-white/10">
                    <ArrowRight size={20} />
                  </div>
                </a>
              </div>

            </div>
          </div>
        </section>

      </main>
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

