import Link from "next/link";
import { CheckCircle2, Truck } from "lucide-react";
import { ServicePageTemplate } from "@/components/ServicePageTemplate";
import { servicePages } from "@/lib/service-pages";

export const metadata = servicePages.carrierServices.metadata;

const shippingTypes = [
  {
    title: "Full Truckload (FTL) Shipping",
    description: "This option is for when you know that you will be able to fill up an entire shipping container with your product and materials.",
  },
  {
    title: "Less Than Truckload (LTL) Shipping",
    description: "LTL freight shipping is ideal for when you only have a small size load that needs to be transported.",
  },
  {
    title: "Partial Truckload (PTL) Shipping",
    description: "Partial truckload shipping takes up about half of a standard freight container and helps balance cost and speed.",
  },
];

const carrierBenefits = [
  "Reliable Shipping Estimates",
  "Accommodating Freight Shippers",
  "Your Shipments Are Safe with Our Carrier Services",
  "Secure and cost-effective freight support",
];

function CarrierLowerContent() {
  return (
    <>
      <section className="section-shell">
        <div className="detail-grid">
          <article className="detail-card">
            <div className="section-kicker">Carrier Services</div>
            <h2>Reliable Shipping Estimates</h2>
            <p>Having a trustworthy overview of your shipping rates makes it much easier to feel confident when hiring a carrier service, which is something we strive to provide for all of our prospective clients.</p>
            <p>Our time in the industry, combined with our dedication to our clients, ensures that you never have to worry about hurting your bottom line when using our trucking services.</p>

            <div className="check-list">
              {carrierBenefits.map((item) => (
                <div className="check-item" key={item}>
                  <CheckCircle2 size={18} />
                  <div>
                    <strong>{item}</strong>
                    <span>Helpful support built around secure, cost-effective freight handling.</span>
                  </div>
                </div>
              ))}
            </div>
          </article>

          <div className="detail-side">
            <article className="side-tile">
              <strong>Accommodating Freight Shippers</strong>
              <p>With our shipping services, you only pay for the space you need and can count on a budget-friendly way to move your freight.</p>
            </article>
            <article className="side-tile">
              <strong>Your Shipments Are Safe with Us</strong>
              <p>We carefully load and secure materials so they stay protected from pickup to delivery.</p>
            </article>
            <article className="side-tile">
              <strong>Truck Icon</strong>
              <p>Get in touch with our team when you need a carrier service that is secure, practical, and dependable.</p>
            </article>
          </div>
        </div>
      </section>

      <section className="cards-shell">
        <div className="section-head">
          <h2>Transportation options that fit your load</h2>
          <p>We specialize in freight shipping and help you choose the right option based on the size, timing, and handling needs of your shipment.</p>
        </div>

        <div className="service-grid">
          {shippingTypes.map((card, index) => (
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
              <h3>Get in Touch with Our Shipping Company</h3>
              <p>We want to be the easy choice for all of your carrier services. Reach us at (860) 988-3887 to get started.</p>
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

export default function CarrierServicesPage() {
  return (
    <ServicePageTemplate
      {...servicePages.carrierServices}
      hideLowerSections={false}
    />
  );
}
