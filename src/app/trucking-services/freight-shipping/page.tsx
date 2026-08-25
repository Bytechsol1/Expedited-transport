import Link from "next/link";
import { CheckCircle2, Truck } from "lucide-react";
import { ServicePageTemplate } from "@/components/ServicePageTemplate";
import { servicePages } from "@/lib/service-pages";

export const metadata = servicePages.freightShipping.metadata;

const freightBenefits = [
  {
    title: "Straightforward and competitive pricing",
    description: "You get clear pricing that helps you plan freight costs without guesswork.",
  },
  {
    title: "On-time deliveries",
    description: "Shipment timing stays central so your freight arrives when it should.",
  },
  {
    title: "Industry-leading safety measures",
    description: "Every move is handled with care to keep your freight protected in transit.",
  },
  {
    title: "Accommodating customer support",
    description: "You get a team that answers questions and keeps the process moving smoothly.",
  },
  {
    title: "Measurable history of success",
    description: "A proven shipping record gives you confidence before the shipment even starts.",
  },
  {
    title: "Experienced and qualified drivers",
    description: "Your freight is handled by professionals who know how to keep it moving safely.",
  },
];

const freightCards = [
  {
    title: "Experienced Freight Company",
    description: "We have handled many shipping jobs across different routes, so you can trust the process from start to finish.",
  },
  {
    title: "Consistency Matters with Freight Shipping",
    description: "We focus on punctual, damage-free deliveries so your freight partner feels dependable every time.",
  },
  {
    title: "Great Customer Service from Your Freight Company",
    description: "Open communication, quick answers, and respectful support keep you informed throughout the trip.",
  },
  {
    title: "Upgrade Your Business with Our Freight Shipping",
    description: "Use a shipping partner that helps your operation grow without adding unnecessary stress.",
  },
];

function FreightShippingLowerContent() {
  return (
    <>
      <section className="section-shell">
        <div className="detail-grid">
          <article className="detail-card">
            <div className="section-kicker">Freight Shipping</div>
            <h2>A Dedicated Freight Company</h2>
            <p>With so many carriers to choose from, it is not always easy to make the right choice for your business. We work hard to provide first-rate freight solutions that give you confidence in every shipment.</p>
            <p>Our transportation services are built to help you move materials on time and in excellent condition, no matter how much your operation needs to scale.</p>
            <div className="check-list">
              {freightBenefits.map((item) => (
                <div className="check-item" key={item.title}>
                  <CheckCircle2 size={18} />
                  <div>
                    <strong>{item.title}</strong>
                    <span>{item.description}</span>
                  </div>
                </div>
              ))}
            </div>
          </article>

          <div className="detail-side">
            {freightCards.map((card) => (
              <article className="side-tile" key={card.title}>
                <strong>{card.title}</strong>
                <p>{card.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="cards-shell">
        <div className="section-head">
          <h2>Why businesses stay with us</h2>
          <p>Freight shipping works best when pricing, safety, timing, and communication are all moving in the same direction.</p>
        </div>

        <div className="service-grid">
          {freightBenefits.slice(0, 4).map((item, index) => (
            <article className="service-card" key={item.title}>
              <span className="service-badge">
                <Truck size={22} />
              </span>
              <h3>{String(index + 1).padStart(2, "0")}. {item.title}</h3>
              <p>{item.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="cta-shell">
        <div className="cta-band">
          <div className="cta-inner">
            <div>
              <div className="section-kicker" style={{ color: "#d8f97a", background: "rgba(227, 30, 36, 0.12)" }}>
                <Truck size={14} /> Truck Icon
              </div>
              <h3>Speak with Our Freight Shipping Experts</h3>
              <p>Take the stress out of your shipping process with the services from Expedited Transport Services. Reach us at (860) 988-3887 today.</p>
            </div>
            <div className="cta-actions">
              <a className="cta-link" href="tel:+18609883887">CALL US</a>
              <Link className="cta-link secondary" href="/contact-us">MESSAGE US</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default function FreightShippingPage() {
  return (
    <ServicePageTemplate
      {...servicePages.freightShipping}
      hideHeroEyebrow
      hideLowerSections={false}
    />
  );
}
