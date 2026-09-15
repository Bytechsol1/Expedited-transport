"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "./AboutUsSection.module.css";
import { ArrowRight, Truck, ShieldCheck, Clock, Award, MapPin, Target } from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";
import { HotshotFaqSection } from "@/components/HotshotFaqSection";
import { ContactSection } from "@/components/ContactSection";
import { FooterSection } from "@/components/FooterSection";

export function AboutUsSection() {
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
        <section className="relative overflow-hidden pt-28 pb-16 sm:pt-32 sm:pb-24 lg:pt-[140px] lg:pb-40">
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

          <div className="relative z-1 mx-auto max-w-[1200px] px-5 text-center sm:px-6 lg:px-10">


            <h1 className="mb-6 font-[var(--font-primary)] text-[clamp(36px,8vw,88px)] leading-[1.05] font-[450] tracking-[-0.02em] text-slate-900 lg:mb-10">
              Trucking Company
            </h1>

            <p className="mx-auto mb-8 max-w-[900px] text-base leading-[1.7] font-normal text-slate-600 sm:text-lg lg:mb-14 lg:text-[22px]">
              Here at Expedited Transport Services, we aim to be the easy choice for all your shipping needs. We provide a wide range of dependable trucking services that will help you keep your business moving. We take pride in being a top trucking company, having gained a reputation for timely, secure, and affordable deliveries. We are always happy to answer any questions you have about our services, so give us a call at (860) 988-3887.
            </p>

            <a href="tel:+18609883887" className="px-7 py-4 text-sm sm:px-12 sm:py-5 sm:text-base" style={{
              display: "inline-flex", alignItems: "center", gap: "12px",
              backgroundColor: "#0f172a", color: "#ffffff",
              textTransform: "uppercase", letterSpacing: "1px", fontWeight: 700,
              borderRadius: "100px", textDecoration: "none", transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
              boxShadow: "0 20px 40px rgba(15, 23, 42, 0.2)"
            }}
              onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.backgroundColor = "#E31E24"; e.currentTarget.style.color = "#ffffff"; e.currentTarget.style.boxShadow = "0 24px 48px rgba(227, 30, 36, 0.3)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.backgroundColor = "#0f172a"; e.currentTarget.style.color = "#ffffff"; e.currentTarget.style.boxShadow = "0 20px 40px rgba(15, 23, 42, 0.2)"; }}
            >
              Call Us Today <ArrowRight size={20} />
            </a>
          </div>
        </section>
        {/* ABOUT US FEATURE BANNER */}
        <section className="overflow-hidden bg-linear-to-b from-slate-50 to-[#eef2f7] pb-14 sm:pb-20 lg:pb-[104px]">
          <div className="mx-auto max-w-[1600px] px-4 sm:px-6">
            <div style={{ position: "relative", background: "#ffffff", borderRadius: "0 0 28px 28px", overflow: "hidden", boxShadow: "0 18px 60px rgba(15, 23, 42, 0.08)" }}>
              <div className="grid grid-cols-1 lg:min-h-[720px] lg:grid-cols-[minmax(0,1.04fr)_minmax(0,0.96fr)]">
                <div className="flex min-w-0 flex-col justify-center bg-linear-to-b from-white to-slate-50 px-6 py-9 sm:p-10 lg:px-10 lg:pt-14 lg:pb-24 xl:px-14">
                  <div className="mb-6 flex items-center gap-3 lg:mb-7">
                    <div className="flex shrink-0 items-center gap-1.5">
                      <div style={{ width: "38px", height: "8px", background: "#0f172a", transform: "skewX(-18deg)" }} />
                      <div style={{ width: "14px", height: "8px", background: "#f5bf12", transform: "skewX(-18deg)" }} />
                    </div>
                    <span className="font-[var(--font-mono)] text-[10px] leading-relaxed font-bold tracking-[0.16em] text-slate-900 uppercase sm:text-xs lg:tracking-[0.28em]">
                      Service Built Around Your Needs
                    </span>
                  </div>

                  <h2 className="m-0 font-[var(--font-primary)] text-[clamp(32px,4.6vw,72px)] leading-[1.08] font-[450] tracking-[-0.03em] text-slate-900 lg:max-w-[12ch] lg:leading-[0.98]">
                    Your New Go-To
                  </h2>
                  <h2 className="my-1.5 font-[var(--font-primary)] text-[clamp(32px,4.6vw,72px)] leading-[1.08] font-[450] tracking-[-0.03em] text-slate-900 lg:max-w-[12ch] lg:leading-[0.98]">
                    Trucking Company
                  </h2>

                  <p className="mt-6 mb-0 max-w-[700px] text-base leading-[1.7] text-slate-600 lg:text-lg">
                    We have never been satisfied with being second best, so if you have been searching for a local trucking company that will put your shipment above all else, then you have come to the right place. We pay close attention to every aspect of our service and work hard to earn your trust.
                  </p>

                  <p className="mt-[22px] mb-0 max-w-[700px] text-base leading-[1.7] text-slate-600 lg:text-lg">
                    Some of the reasons that you should consider us for your next shipment include:
                  </p>
                </div>
                <div className="relative min-h-64 overflow-hidden bg-gray-200 sm:min-h-96 lg:mt-2 lg:min-h-[680px]">
                  <Image
                    src="/images/truck4.jpg"
                    alt="Truck on the road"
                    fill
                    sizes="(max-width: 1023px) 100vw, 50vw"
                    style={{ objectFit: "cover", objectPosition: "center 48%" }}
                    priority
                  />
                  <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(15,23,42,0.02) 0%, rgba(15,23,42,0.04) 100%)" }} />
                </div>
              </div>

              <div className="relative px-3 pt-5 pb-5 sm:px-5 sm:pb-7 lg:-mt-10 lg:pt-0">
                <div style={{ background: "#ffffff", borderRadius: "26px", boxShadow: "0 16px 45px rgba(15, 23, 42, 0.08)", border: "1px solid rgba(15, 23, 42, 0.06)", overflow: "hidden" }}>
                  <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-6">
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
                        className={`flex min-w-0 flex-col items-center justify-center gap-3 border-slate-900/8 px-3 py-5 text-center sm:min-h-40 sm:gap-3.5 sm:px-[18px] sm:py-6 ${index < 5 ? "border-r" : ""} ${index % 2 === 0 ? "bg-white" : "bg-[#fbfdff]"}`}
                      >
                        <div className="flex size-14 shrink-0 items-center justify-center rounded-full bg-slate-900 lg:size-[72px]">
                          {item.icon}
                        </div>
                        <div style={{ minWidth: 0, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                          <h3 className="m-0 text-center text-sm leading-snug font-semibold whitespace-normal text-slate-900 lg:text-base">
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

        <section className="bg-slate-50 py-14 text-[#051e24] sm:py-20 lg:py-[120px]">
          <div className="mx-auto max-w-[1400px] px-5 sm:px-6 lg:px-10">
            <div className="mb-8 text-center sm:mb-12 lg:mb-20">
              <h2 className="font-[var(--font-primary)] text-[clamp(30px,4vw,48px)] leading-tight font-[450] tracking-[-0.02em]">The Best Trucking Company for Any Job</h2>
            </div>

            <div className="grid grid-cols-1 gap-8 px-2 py-4 perspective-[1500px] lg:grid-cols-3 lg:px-5 lg:py-10 xl:gap-[60px]">
              {[
                { icon: <Clock size={36} color="#000" />, title: "Reliable, Time-Critical Transportation", desc: "Punctuality is crucial in the trucking industry, which is why we plan and organize all of our shipments carefully. From route selection through unloading, our team stays focused on dependable execution." },
                { icon: <ShieldCheck size={36} color="#000" />, title: "Freight Care in Transit", desc: "In addition to efficient logistics, we use appropriate trucks, safety equipment, and careful handling practices to help protect your freight throughout transit." },
                { icon: <Award size={36} color="#000" />, title: "Reasonable Rates on Certified Trucking", desc: "When searching for a trucking company, it always helps to find one that won’t hurt your bottom line. Our honest and affordable pricing has helped us create many strong partnerships with local businesses who trust us for all of their freight shipping." }
              ].map((card, idx) => (
                <div key={idx} className={`${styles.benefitCard} relative min-w-0 rounded-[20px] border-[3px] border-slate-900 bg-white px-6 py-8 sm:p-10 lg:px-6 lg:py-12 xl:px-10`}>
                  <div className={styles.cardContent}>
                    <div style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: "70px", height: "70px", borderRadius: "16px", backgroundColor: "#E31E24", marginBottom: "32px", border: "2px solid #0f172a", boxShadow: "-4px 4px 0 #0f172a" }}>
                      {card.icon}
                    </div>

                    <h3 className="mb-5 text-xl leading-[1.3] font-semibold text-slate-900 sm:text-2xl">
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
        <section className="bg-white px-4 pt-12 pb-16 sm:px-6 sm:py-20 lg:px-10 lg:pt-20 lg:pb-40">
          <div className="relative mx-auto max-w-[1400px] overflow-hidden rounded-3xl bg-black px-6 py-9 shadow-[0_40px_80px_rgba(0,0,0,0.15)] sm:rounded-[40px] sm:p-10 lg:p-20">
            <div style={{ position: "absolute", top: "-50%", right: "-10%", width: "800px", height: "800px", background: "radial-gradient(circle, rgba(227, 30, 36, 0.08) 0%, transparent 70%)", borderRadius: "50%", pointerEvents: "none" }} />
            <div style={{ position: "absolute", bottom: "-20%", left: "10%", width: "400px", height: "400px", background: "radial-gradient(circle, rgba(255,255,255,0.03) 0%, transparent 70%)", borderRadius: "50%", pointerEvents: "none" }} />

            <div className="relative z-1 flex flex-col gap-8 xl:flex-row xl:items-center xl:justify-between xl:gap-[60px]">

              <div className="min-w-0 flex-1">
                <div style={{ display: "inline-flex", alignItems: "center", gap: "12px", padding: "10px 20px", backgroundColor: "rgba(227, 30, 36, 0.1)", borderRadius: "100px", marginBottom: "32px", border: "1px solid rgba(227, 30, 36, 0.2)" }}>
                  <MapPin size={18} color="#E31E24" />
                  <span style={{ fontFamily: "var(--font-mono)", fontSize: "14px", color: "#E31E24", letterSpacing: "0.2em", textTransform: "uppercase", fontWeight: 700 }}>Work With Us</span>
                </div>

                <h2 className="mb-6 font-[var(--font-primary)] text-[clamp(32px,5vw,64px)] leading-[1.1] font-[450] tracking-[-0.02em] text-white lg:leading-[1.05]">
                  <span style={{ color: "#E31E24" }}>P</span>artner with the best. <br /> Let&apos;s get moving<span style={{ color: "#E31E24" }}>.</span>
                </h2>

                <p className="mb-0 max-w-[540px] text-base leading-[1.6] font-normal text-white/70 sm:text-lg lg:text-xl">
                  We would love to get more in-depth about why we will make a valuable addition to your company. Reach out today.
                </p>
              </div>

              <div className="flex w-full min-w-0 shrink-0 flex-col gap-5 xl:w-[300px]">
                <a href="tel:+18609883887" className="flex items-center justify-between gap-4 rounded-[20px] bg-[#E31E24] px-5 py-4 text-sm font-bold tracking-[1px] text-white uppercase no-underline shadow-[0_20px_40px_rgba(227,30,36,0.2)] transition-transform hover:-translate-y-1 sm:px-10 sm:py-6 sm:text-base">
                  <span>Call Us Now</span>
                  <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-black/10">
                    <ArrowRight size={20} />
                  </div>
                </a>

                <Link href="/contact" className="flex items-center justify-between gap-4 rounded-[20px] border border-white/10 bg-white/5 px-5 py-4 text-sm font-bold tracking-[1px] text-white uppercase no-underline transition-all hover:-translate-y-1 hover:bg-white/10 sm:px-10 sm:py-6 sm:text-base">
                  <span>Message Us</span>
                  <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-white/10">
                    <Target size={20} />
                  </div>
                </Link>
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









