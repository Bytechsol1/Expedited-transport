"use client";

import { useState } from "react";
import { SiteHeader } from "@/components/SiteHeader";
import { HeroSection } from "@/components/HeroSection";
import { TruckLogoBar } from "@/components/TruckLogoBar";
import { FeaturesSection } from "@/components/FeaturesSection";
import { ScrollFrameSection } from "@/components/ScrollFrameSection";
import { TestimonialsSection } from "@/components/TestimonialsSection";
import { ContactSection } from "@/components/ContactSection";
import { DotSeparator } from "@/components/DotSeparator";
import { FooterSection } from "@/components/FooterSection";
import { IntroAnimation } from "@/components/IntroAnimation";

export default function Home() {
  const [siteReady, setSiteReady] = useState(false);

  return (
    <>
      <IntroAnimation siteReady={siteReady} />
      <SiteHeader />
      <main>
        <div style={{ position: "relative", zIndex: 1 }}>
          <HeroSection onReady={() => setSiteReady(true)} />
        </div>
        <div
          style={{
            position: "relative",
            zIndex: 2,
            marginTop: "-60px",
            backgroundColor: "#fff",
          }}
        >
          <TruckLogoBar />
          <FeaturesSection />
        </div>
        <div style={{ position: "relative", zIndex: 3 }}>
          <ScrollFrameSection />
        </div>
        <div style={{ position: "relative", zIndex: 4, marginBottom: "0" }}>
          <TestimonialsSection />
        </div>
        <DotSeparator />
        <div style={{ position: "relative", zIndex: 5 }}>
          <ContactSection />
        </div>
      </main>
      <FooterSection />
    </>
  );
}
