import type { Metadata } from "next";
import Link from "next/link";
import { SiteHeader } from "@/components/SiteHeader";
import { FooterSection } from "@/components/FooterSection";

export const metadata: Metadata = {
  title: "Privacy Policy — Expedited Transport",
  description:
    "How Expedited Transport collects and uses the information you provide when requesting a shipping quote or booking a shipment.",
};

export default function PrivacyPolicyPage() {
  return (
    <>
      <SiteHeader />
      <main className="privacy-main">
        <div className="privacy-shell">
          <h1 className="privacy-title">Privacy Policy</h1>

          <p className="privacy-lead">
            Your information is used to provide your shipping quote, process your booking, and contact
            you regarding your shipment. We do not use your information for unrelated purposes.
          </p>

          <h2>What we collect</h2>
          <p>
            When you request a quote or book a shipment we collect the name, email address, and phone
            number you enter, along with the pickup and delivery addresses, pickup date and time, and
            the shipment details (dimensions, weight, piece and pallet counts, truck type, hazmat
            status, any additional services, and special instructions) needed to price and arrange the
            move.
          </p>

          <h2>How we use it</h2>
          <p>
            This information is used to calculate your quote, to process and fulfil your booking, and
            to contact you about your shipment. Payment is handled by our payment processor; we do not
            store full card details.
          </p>

          <h2>Contact</h2>
          <p>
            The full, legally reviewed version of this policy is being finalized. For any question
            about the information we hold about you in the meantime, please{" "}
            <Link href="/#contact">contact us</Link>.
          </p>

          <p className="privacy-note">
            This page is a placeholder for the approved legal policy text. No specific legal
            commitments beyond the description above have been made.
          </p>
        </div>
      </main>
      <FooterSection />

      <style>{`
        .privacy-main {
          padding: 9rem var(--grid-margin) 6rem;
          background: var(--c-white);
        }
        .privacy-shell {
          max-width: 46rem;
          margin: 0 auto;
          font-family: var(--font-primary);
          color: var(--c-dark-green);
        }
        .privacy-title {
          font-size: clamp(2rem, 4vw, 2.75rem);
          font-weight: 600;
          letter-spacing: -0.03em;
          margin: 0 0 1.25rem;
        }
        .privacy-lead {
          font-size: 1.05rem;
          line-height: 1.65;
          color: rgba(5, 36, 36, 0.75);
          margin: 0 0 2.5rem;
        }
        .privacy-shell h2 {
          font-size: 1.15rem;
          font-weight: 700;
          margin: 2rem 0 0.6rem;
        }
        .privacy-shell p {
          font-size: 0.98rem;
          line-height: 1.7;
          color: rgba(5, 36, 36, 0.72);
          margin: 0 0 1rem;
        }
        .privacy-shell a {
          color: #E31E24;
          font-weight: 600;
          text-decoration: underline;
          text-underline-offset: 2px;
        }
        .privacy-note {
          margin-top: 2.5rem !important;
          padding-top: 1.5rem;
          border-top: 1px solid var(--c-dark-green-15);
          font-size: 0.85rem !important;
          color: rgba(5, 36, 36, 0.5) !important;
        }
      `}</style>
    </>
  );
}
