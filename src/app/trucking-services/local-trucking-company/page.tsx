import Link from "next/link";
import { CheckCircle2, Truck } from "lucide-react";
import { ServicePageTemplate } from "@/components/ServicePageTemplate";
import { servicePages } from "@/lib/service-pages";

export const metadata = servicePages.localTruckingCompany.metadata;

const localBenefits = [
  "Transparent and competitive pricing",
  "Experienced drivers",
  "Knowledgeable local logistics experts",
  "Dedicated customer service",
  "Punctual deliveries",
  "Well-maintained vehicles",
  "And more",
];

const localCards = [
  {
    title: "Top-Notch Service from Local Freight Carriers",
    description: "We put a strong emphasis on open communication and work hard to turn one-time customers into repeat customers.",
  },
  {
    title: "Feel Secure with Our Local Trucking Service",
    description: "Our vehicles are frequently inspected and serviced, and we pay careful attention during loading and unloading.",
  },
  {
    title: "Local Hauling That's Completed on Time",
    description: "We plan carefully and use our local knowledge to make sure your shipment reaches its destination on schedule.",
  },
  {
    title: "Save Money with Our Local Freight Company",
    description: "Fair, straightforward pricing helps you know exactly where your budget is going for every move.",
  },
];

function LocalTruckingLowerContent() {
  return (
    <>
      <section className="section-shell">
        <div className="detail-grid">
          <article className="detail-card">
            <div className="section-kicker">Local Trucking</div>
            <h2>The Leading Local Trucking Company</h2>
            <p>Here at Expedited Transport Services, we are driven by constant improvement and success. Providing our valued clients with exceptional service is very important to us, which has helped us earn a solid reputation both locally and nationwide.</p>
            <p>Some of the things that help us stand out as a local trucking service include:</p>

            <div className="check-list">
              {localBenefits.map((item) => (
                <div className="check-item" key={item}>
                  <CheckCircle2 size={18} />
                  <div>
                    <strong>{item}</strong>
                    <span>Reliable local freight support built around your schedule and budget.</span>
                  </div>
                </div>
              ))}
            </div>
          </article>

          <div className="detail-side">
            <article className="side-tile">
              <strong>Feel Secure with Our Local Trucking Service</strong>
              <p>We inspect and service our vehicles regularly and pay close attention during loading and unloading to reduce room for error.</p>
            </article>
            <article className="side-tile">
              <strong>Local Hauling That's Completed on Time</strong>
              <p>Our local knowledge and careful planning help us reach your destination on time and keep your operation moving.</p>
            </article>
            <article className="side-tile">
              <strong>Truck Icon</strong>
              <p>Your local trucking experts are ready to answer questions and help you get started right away.</p>
            </article>
          </div>
        </div>
      </section>

      <section className="cards-shell">
        <div className="section-head">
          <h2>What makes us stand out</h2>
          <p>We focus on reliable service, honest pricing, and local expertise so your shipments stay on track from pickup to delivery.</p>
        </div>

        <div className="service-grid">
          {localCards.map((card, index) => (
            <article className="service-card" key={card.title}>
              <span className="service-badge">
                <Truck size={22} />
              </span>
              <h3>{String(index + 1).padStart(2, "0")}. {card.title}</h3>
              <p>{card.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="cta-shell">
        <div className="cta-band">
          <div className="cta-inner">
            <div>
              <h3>Your Local Trucking Experts</h3>
              <p>Expedited Transport Services is the only company you need to keep your supply chain moving smoothly at a great price.</p>
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

export default function LocalTruckingCompanyPage() {
  return (
    <ServicePageTemplate
      {...servicePages.localTruckingCompany}
      hideLowerSections={false}
      lowerContent={<LocalTruckingLowerContent />}
    />
  );
}
