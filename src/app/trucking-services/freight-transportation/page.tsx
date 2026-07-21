import Link from "next/link";
import { CheckCircle2, Truck } from "lucide-react";
import { ServicePageTemplate } from "@/components/ServicePageTemplate";
import { servicePages } from "@/lib/service-pages";

export const metadata = servicePages.freightTransportation.metadata;

const shippingOptions = [
  "LTL trucking",
  "Dry van trucking",
  "Logistics services",
  "Warehousing services",
  "Or any other trucking services",
];

const serviceCards = [
  {
    title: "Comprehensive Freight Transportation",
    description: "We have worked hard to develop connections and improve our services so clients can depend on a complete offering of valuable transportation services.",
  },
  {
    title: "Freight Shipping You Never Have to Wait On",
    description: "Punctuality matters in trucking, and we do everything we can to make sure your cargo arrives on time with no missed deadlines or interruptions.",
  },
  {
    title: "Your Freight Is Safe with Us",
    description: "We use industry-leading safety measures and plan every job carefully so your products reach their destination in perfect condition.",
  },
  {
    title: "Budget-Conscious Freight Shipping",
    description: "Straightforward pricing and no surprise fees help you keep freight shipping within budget while still getting dependable service.",
  },
];

function FreightTransportationLowerContent() {
  return (
    <>
      <section className="section-shell">
        <div className="detail-grid">
          <article className="detail-card">
            <div className="section-kicker">Freight Transportation</div>
            <h2>All the Information You Need on Freight Trucking</h2>
            <p>If you are looking to bring some dependability to your supply chain, then we are here to help. We want all of our prospective clients to feel comfortable working with us, which is why we pride ourselves on our honest and upfront approach.</p>
            <p>If you have any questions or concerns, all you need to do is reach out to us for a prompt response and detailed answers.</p>

            <div className="check-list">
              {shippingOptions.map((item) => (
                <div className="check-item" key={item}>
                  <CheckCircle2 size={18} />
                  <div>
                    <strong>{item}</strong>
                    <span>Make us the first company you contact when you need dependable freight support.</span>
                  </div>
                </div>
              ))}
            </div>
          </article>

          <div className="detail-side">
            <article className="side-tile">
              <strong>Consistency Matters with Freight Shipping</strong>
              <p>Having confidence in your freight carrier is important, which is why we strive for excellence with every job that we take.</p>
            </article>
            <article className="side-tile">
              <strong>Great Customer Service</strong>
              <p>Open communication, courteous support, and detailed answers help keep you informed throughout the shipping process.</p>
            </article>
            <article className="side-tile">
              <strong>Truck Icon</strong>
              <p>Get us started on your freight transportation and we will put our experience to work for your shipment.</p>
            </article>
          </div>
        </div>
      </section>

      <section className="cards-shell">
        <div className="section-head">
          <h2>Comprehensive Freight Transportation</h2>
          <p>Use us as your freight company for transportation, logistics, warehousing, and other trucking services that support your operation.</p>
        </div>

        <div className="service-grid">
          {serviceCards.map((card, index) => (
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
              <h3>Get Us Started on Your Freight Transportation</h3>
              <p>Here at Expedited Transport Services, we want to be your new go-to trucking company. Reach out today at (860) 988-3887.</p>
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

export default function FreightTransportationPage() {
  return (
    <ServicePageTemplate
      {...servicePages.freightTransportation}
      hideHeroEyebrow
      hideHeroAccent
      hideHeroNote
      hideHeroPoints
      hideLowerSections={false}
      heroTitleClassName="freight-title"
      lowerContent={<FreightTransportationLowerContent />}
    />
  );
}
