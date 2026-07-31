import Link from "next/link";
import { CheckCircle2, Truck } from "lucide-react";
import { ServicePageTemplate } from "@/components/ServicePageTemplate";
import { servicePages } from "@/lib/service-pages";

export const metadata = servicePages.logisticsServices.metadata;

const logisticsServicesList = [
  "Planning and optimizing routes",
  "Order management",
  "Freight auditing",
  "Selecting transportation carriers",
  "Warehousing and inventory management",
  "Customs management",
  "And more",
];

const logisticsCards = [
  {
    title: "Minimize Your Costs with Freight Logistics",
    description: "Professional logistics management helps reduce unnecessary spending and keeps your freight budget under control.",
  },
  {
    title: "Open Communication with Your Logistics Company",
    description: "You get relevant details about your transportation process and quick answers whenever questions come up.",
  },
  {
    title: "The Only Logistics Company You Need",
    description: "Let our team manage the moving parts so you are not wasting time juggling multiple transportation contacts.",
  },
  {
    title: "Highly Recommended Logistics Experts",
    description: "We have earned a reputation as a reliable resource for companies that need transportation handled properly.",
  },
];

function LogisticsLowerContent() {
  return (
    <>
      <section className="section-shell">
        <div className="detail-grid">
          <article className="detail-card">
            <div className="section-kicker">Logistics Services</div>
            <h2>Work with a Top Logistics Company</h2>
            <p>The purpose of transport logistics is to oversee your entire supply chain and make intelligent decisions that will help optimize your freight shipments. If you are tired of the headache that comes along with organizing your deliveries, then you are guaranteed to find value in our services.</p>
            <p>We are proud to be a logistics company trusted by many organizations who count on us to make sure their shipments reach their destination in the smoothest way possible. No matter the size of your business, you can count on us to scale with you and stay on top of all of your transportation needs.</p>

            <div className="check-list">
              {logisticsServicesList.map((item) => (
                <div className="check-item" key={item}>
                  <CheckCircle2 size={18} />
                  <div>
                    <strong>{item}</strong>
                    <span>Flexible support designed to keep your supply chain organized and moving efficiently.</span>
                  </div>
                </div>
              ))}
            </div>
          </article>

          <div className="detail-side">
            <article className="side-tile">
              <strong>Freight Shipping You Never Have to Wait On</strong>
              <p>Punctuality matters in the trucking industry, and we do everything in our power to ensure you never have to worry about late arrivals.</p>
            </article>
            <article className="side-tile">
              <strong>Your Freight Is Safe with Us</strong>
              <p>Industry-leading safety measures and careful planning help ensure your products reach their destination in perfect condition.</p>
            </article>
            <article className="side-tile">
              <strong>Truck Icon</strong>
              <p>Contact us today if you want a dependable logistics team that can handle the heavy lifting for your freight.</p>
            </article>
          </div>
        </div>
      </section>

      <section className="cards-shell">
        <div className="section-head">
          <h2>Our logistics services include</h2>
          <p>We bring the planning, communication, and shipping support needed to keep your freight moving on time and on budget.</p>
        </div>

        <div className="service-grid">
          {logisticsCards.map((card, index) => (
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
              <h3>Contact Us for Transportation and Logistics</h3>
              <p>If you are ready to let our team of experts handle all of your heavy lifting, reach us at (860) 988-3887 for answers to all of your questions and to get started.</p>
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

export default function LogisticsServicesPage() {
  return (
    <ServicePageTemplate
      {...servicePages.logisticsServices}
      hideLowerSections={false}
    />
  );
}
