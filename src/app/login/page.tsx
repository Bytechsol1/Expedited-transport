import { Suspense } from "react";
import Image from "next/image";
import { SiteHeader } from "@/components/SiteHeader";
import { FooterSection } from "@/components/FooterSection";
import { CustomerAuthForm } from "@/components/CustomerAuthForm";

export default function LoginPage() {
  return (
    <>
      <SiteHeader />
      <main className="login-main">
        <div className="login-shell">
          <div className="login-panel">
            <span className="login-panel__eyebrow">
              <span className="login-panel__eyebrow-line" />
              Customer Access
              <span className="login-panel__eyebrow-line" />
            </span>
            <h2 className="login-panel__heading">
              Track Every Shipment.
              <br />
              Anywhere, Anytime.
            </h2>
            <p className="login-panel__body">
              Sign in to view live order status, payment history, and delivery updates — all in one place.
            </p>
            <Image
              src="/images/truck-cutout-transparent.png"
              alt=""
              width={1024}
              height={1024}
              className="login-panel__truck"
              priority
            />
          </div>

          <div className="login-form-wrap">
            <Suspense fallback={null}>
              <CustomerAuthForm />
            </Suspense>
          </div>
        </div>
      </main>
      <FooterSection />

      <style>{`
        .login-main {
          min-height: 85vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 8.5rem 1.5rem 5rem;
          background: #f7f9f7;
        }
        .login-shell {
          width: 100%;
          max-width: 64rem;
          display: grid;
          grid-template-columns: 1.1fr 1fr;
          border-radius: 1.75rem;
          overflow: hidden;
          box-shadow: 0 32px 72px rgba(5, 36, 36, 0.16);
        }
        .login-panel {
          position: relative;
          background: #0d1728;
          color: #fff;
          padding: 3.5rem 3rem;
          display: flex;
          flex-direction: column;
          justify-content: center;
          min-height: 34rem;
          overflow: hidden;
        }
        .login-panel__eyebrow {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          font-family: var(--font-mono, monospace);
          font-size: 0.6875rem;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: var(--c-lime);
          margin-bottom: 1.5rem;
        }
        .login-panel__eyebrow-line {
          height: 1px;
          width: 2rem;
          background: linear-gradient(90deg, rgba(171,255,2,0), rgba(171,255,2,0.75), rgba(171,255,2,0));
        }
        .login-panel__heading {
          font-size: clamp(1.75rem, 2.6vw, 2.4rem);
          font-weight: 600;
          line-height: 1.15;
          letter-spacing: -0.02em;
          margin: 0 0 1.1rem;
          position: relative;
          z-index: 1;
        }
        .login-panel__body {
          font-size: 0.95rem;
          line-height: 1.6;
          color: rgba(255, 255, 255, 0.7);
          max-width: 24rem;
          margin: 0;
          position: relative;
          z-index: 1;
        }
        .login-panel__truck {
          position: absolute;
          right: -12%;
          bottom: -8%;
          width: 90%;
          height: auto;
          opacity: 0.16;
          pointer-events: none;
        }
        .login-form-wrap {
          background: #fff;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 3rem 2rem;
        }
        .login-form-wrap :global(.auth-card) {
          box-shadow: none;
          padding: 0;
          max-width: 22rem;
        }

        @media (max-width: 860px) {
          .login-shell {
            grid-template-columns: 1fr;
          }
          .login-panel {
            min-height: 16rem;
            padding: 2.5rem 2rem;
          }
          .login-panel__truck {
            opacity: 0.12;
          }
        }

        @media (max-width: 480px) {
          .login-main {
            padding: 7.5rem 1rem 3rem;
          }
          .login-form-wrap {
            padding: 2rem 1.25rem;
          }
        }
      `}</style>
    </>
  );
}
