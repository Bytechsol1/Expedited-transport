"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, animate, motion } from "framer-motion";
import { PackageSearch } from "lucide-react";
import CursorGrid from "@/components/CursorGrid";
import { AddressAutocomplete } from "@/components/AddressAutocomplete";

type QuoteResult = {
  ok: boolean;
  oversized?: boolean;
  error?: string;
  truckType?: { name: string };
  distanceMiles?: number;
  durationMinutes?: number;
  price?: number;
};

export function InstantQuoteSection() {
  const [pickupAddress, setPickupAddress] = useState("");
  const [deliveryAddress, setDeliveryAddress] = useState("");
  const [pieces, setPieces] = useState("1");
  const [pallets, setPallets] = useState("1");
  const [weightLbs, setWeightLbs] = useState("");
  const [lengthIn, setLengthIn] = useState("");
  const [widthIn, setWidthIn] = useState("");
  const [heightIn, setHeightIn] = useState("");
  const [hazmat, setHazmat] = useState(false);

  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState<QuoteResult | null>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitting(true);
    setResult(null);

    try {
      const response = await fetch("/api/quote-calculator", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          pickupAddress,
          deliveryAddress,
          pieces: Number(pieces),
          pallets: Number(pallets),
          weightLbs: Number(weightLbs),
          lengthIn: Number(lengthIn),
          widthIn: Number(widthIn),
          heightIn: Number(heightIn),
          hazmat,
        }),
      });

      const data: QuoteResult = await response.json();
      setResult(data);
    } catch {
      setResult({ ok: false, error: "Something went wrong. Please try again." });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="instant-quote" className="iq-section">
      <div className="iq-grid-bg">
        <CursorGrid
          cellSize={64}
          color="#b6f000"
          radius={160}
          falloff="smooth"
          holdTime={400}
          fadeDuration={800}
          lineWidth={1.2}
          maxOpacity={0.9}
          fillOpacity={0}
          gridOpacity={0}
          cellRadius={4}
          clickPulse
          pulseSpeed={600}
        />
      </div>

      <div className="iq-container">
        <motion.div
          className="iq-head"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="iq-kicker-row">
            <span className="iq-kicker-line" />
            Instant Quote
            <span className="iq-kicker-line" />
          </span>
        </motion.div>

        <div className="iq-layout">
          <motion.div
            className="iq-panel"
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            <h3 className="iq-panel-title">Get a Shipping Quote</h3>

            <form onSubmit={handleSubmit} className="iq-form">
              <span className="iq-section-label">Route</span>
              <div className="iq-row iq-row-2">
                <AddressAutocomplete
                  label="Pickup Address"
                  placeholder="City, state or full address"
                  value={pickupAddress}
                  onChange={setPickupAddress}
                />
                <AddressAutocomplete
                  label="Delivery Address"
                  placeholder="City, state or full address"
                  value={deliveryAddress}
                  onChange={setDeliveryAddress}
                />
              </div>

              <span className="iq-section-label">Shipment</span>
              <div className="iq-row iq-row-4">
                <NumberField label="Pieces" value={pieces} onChange={setPieces} />
                <NumberField label="Pallets" value={pallets} onChange={setPallets} />
                <NumberField label="Weight (lbs)" value={weightLbs} onChange={setWeightLbs} required />
                <label className="iq-hazmat">
                  <input type="checkbox" checked={hazmat} onChange={(e) => setHazmat(e.target.checked)} />
                  Hazmat
                </label>
              </div>

              <span className="iq-section-label">Dimensions</span>
              <div className="iq-row iq-row-3">
                <NumberField label="Length (in)" value={lengthIn} onChange={setLengthIn} required />
                <NumberField label="Width (in)" value={widthIn} onChange={setWidthIn} required />
                <NumberField label="Height (in)" value={heightIn} onChange={setHeightIn} required />
              </div>

              <motion.button
                type="submit"
                className="iq-submit"
                disabled={submitting}
                whileHover={submitting ? undefined : { scale: 1.015, y: -1 }}
                whileTap={submitting ? undefined : { scale: 0.98 }}
              >
                <AnimatePresence mode="wait" initial={false}>
                  <motion.span
                    key={submitting ? "loading" : "idle"}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.18 }}
                    style={{ display: "inline-block" }}
                  >
                    {submitting ? "Calculating…" : "Get Instant Quote"}
                  </motion.span>
                </AnimatePresence>
              </motion.button>
            </form>
          </motion.div>

          <motion.div
            className="iq-results-panel"
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <h3 className="iq-panel-title">Your Quote</h3>
            <AnimatePresence mode="wait">
              {result ? (
                <ResultPanel key={JSON.stringify(result)} result={result} />
              ) : (
                <EmptyResults key="empty" submitting={submitting} />
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>

      <style>{`
        .iq-section {
          position: relative;
          background: var(--c-white);
          padding: 6.25rem var(--grid-margin);
          overflow: hidden;
          scroll-margin-top: 110px;
        }

        .iq-grid-bg {
          position: absolute;
          inset: 0;
          z-index: 0;
          pointer-events: auto;
        }

        .iq-container {
          position: relative;
          z-index: 1;
          max-width: 1180px;
          margin: 0 auto;
          pointer-events: none;
        }

        .iq-container > * {
          pointer-events: auto;
        }

        .iq-head {
          text-align: center;
          margin-bottom: 2.75rem;
        }

        .iq-kicker-row {
          display: inline-flex;
          align-items: center;
          gap: 14px;
          font-family: var(--font-primary);
          font-size: 0.8125rem;
          font-weight: 800;
          letter-spacing: 0.32em;
          text-transform: uppercase;
          color: #7a9900;
        }

        .iq-kicker-line {
          width: 28px;
          height: 1px;
          background: #7a9900;
        }

        .iq-layout {
          display: grid;
          grid-template-columns: minmax(0, 1.15fr) minmax(0, 0.85fr);
          gap: 1.75rem;
          align-items: start;
        }

        .iq-panel,
        .iq-results-panel {
          border: 1px solid var(--c-dark-green-15);
          border-radius: 24px;
          padding: 2.25rem;
          background: rgba(255, 255, 255, 0.92);
          backdrop-filter: blur(6px);
          box-shadow: 0 24px 60px rgba(5, 36, 36, 0.08);
        }

        .iq-results-panel {
          position: sticky;
          top: 120px;
          min-height: 420px;
        }

        .iq-panel-title {
          margin: 0 0 1.5rem;
          font-family: var(--font-primary);
          font-size: 1.25rem;
          font-weight: 800;
          letter-spacing: -0.02em;
          color: var(--c-dark-green);
        }

        .iq-form {
          display: flex;
          flex-direction: column;
          gap: 0.9rem;
        }

        .iq-section-label {
          margin-top: 0.5rem;
          font-family: var(--font-primary);
          font-size: 0.6875rem;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: rgba(5, 36, 36, 0.45);
        }

        .iq-section-label:first-of-type {
          margin-top: 0;
        }

        .iq-row {
          display: grid;
          gap: 1.25rem;
          margin-bottom: 0.5rem;
        }

        .iq-row-2 {
          grid-template-columns: repeat(2, minmax(0, 1fr));
        }

        .iq-row-3 {
          grid-template-columns: repeat(3, minmax(0, 1fr));
        }

        .iq-row-4 {
          grid-template-columns: repeat(4, minmax(0, 1fr));
        }

        .iq-field {
          position: relative;
          display: flex;
          flex-direction: column;
          gap: 0.4rem;
          min-width: 0;
        }

        .iq-label {
          font-family: var(--font-primary);
          font-size: 0.75rem;
          font-weight: 600;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          color: rgba(5, 36, 36, 0.65);
        }

        .iq-input {
          width: 100%;
          background: transparent;
          border: none;
          border-bottom: 1px solid var(--c-dark-green-15);
          border-radius: 0;
          padding: 0.6rem 0;
          color: var(--c-dark-green);
          font-family: var(--font-primary);
          font-size: 0.95rem;
          outline: none;
          transition: border-color 0.15s ease;
        }

        .iq-input:focus {
          border-bottom-color: var(--c-lime);
        }

        .iq-suggestions {
          position: absolute;
          top: 100%;
          left: 0;
          right: 0;
          z-index: 20;
          margin-top: 6px;
          border-radius: 14px;
          border: 1px solid var(--c-dark-green-15);
          background: var(--c-white);
          box-shadow: 0 20px 40px rgba(5, 36, 36, 0.12);
          overflow: hidden;
          list-style: none;
          padding: 0;
        }

        .iq-suggestion {
          display: block;
          width: 100%;
          padding: 10px 14px;
          text-align: left;
          font-family: var(--font-primary);
          font-size: 0.875rem;
          color: var(--c-dark-green);
          background: none;
          border: none;
          cursor: pointer;
        }

        .iq-suggestion:hover {
          background: var(--c-dirty-white);
        }

        .iq-hazmat {
          display: flex;
          align-items: flex-end;
          padding-bottom: 0.65rem;
          gap: 0.5rem;
          font-family: var(--font-primary);
          font-size: 0.875rem;
          font-weight: 600;
          color: var(--c-gray);
        }

        .iq-submit {
          margin-top: 0.75rem;
          padding: 0.9rem 1.5rem;
          background: var(--c-lime);
          color: #0a0f00;
          border: none;
          border-radius: 12px;
          font-family: var(--font-primary);
          font-size: 0.95rem;
          font-weight: 700;
          letter-spacing: -0.01em;
          cursor: pointer;
          transition: background 0.15s ease, transform 0.15s ease;
        }

        .iq-submit:hover:not(:disabled) {
          background: #cbff1a;
          transform: translateY(-1px);
        }

        .iq-submit:disabled {
          opacity: 0.6;
          cursor: default;
        }

        .iq-empty {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          gap: 0.75rem;
          min-height: 300px;
          color: var(--c-gray);
        }

        .iq-empty svg {
          color: rgba(5, 36, 36, 0.2);
        }

        .iq-empty p {
          margin: 0;
          max-width: 24ch;
          font-family: var(--font-primary);
          font-size: 0.9375rem;
          line-height: 1.6;
        }

        .iq-result-label {
          font-family: var(--font-mono);
          font-size: 0.75rem;
          font-weight: 700;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: var(--c-gray);
        }

        .iq-result-price {
          margin: 0.5rem 0 0;
          font-family: var(--font-primary);
          font-size: clamp(2.25rem, 4vw, 2.75rem);
          font-weight: 450;
          letter-spacing: -0.02em;
          color: var(--c-dark-green);
        }

        .iq-result-price em {
          font-style: italic;
          color: #7a9900;
        }

        .iq-result-meta {
          margin-top: 1.25rem;
          display: grid;
          gap: 0.6rem;
        }

        .iq-result-meta-item {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0.75rem 1rem;
          border-radius: 12px;
          background: var(--c-dirty-white);
        }

        .iq-result-meta-item .label {
          font-family: var(--font-mono);
          font-size: 0.6875rem;
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: var(--c-gray);
        }

        .iq-result-meta-item .value {
          font-family: var(--font-primary);
          font-size: 0.9375rem;
          font-weight: 700;
          color: var(--c-dark-green);
        }

        .iq-result-note {
          margin: 1.25rem 0 0;
          font-family: var(--font-primary);
          font-size: 0.8125rem;
          color: var(--c-gray);
        }

        .iq-result-warn,
        .iq-result-error {
          font-family: var(--font-primary);
          font-size: 0.9375rem;
          line-height: 1.7;
          color: var(--c-dark-green);
        }

        .iq-result-warn a,
        .iq-result-error a {
          color: #7a9900;
          font-weight: 700;
          text-decoration: underline;
        }

        @media (max-width: 900px) {
          .iq-layout {
            grid-template-columns: 1fr;
          }

          .iq-results-panel {
            position: static;
            min-height: 0;
          }
        }

        @media (max-width: 640px) {
          .iq-section {
            padding: 4rem 1.25rem;
          }

          .iq-panel,
          .iq-results-panel {
            padding: 1.5rem;
            border-radius: 20px;
          }

          .iq-row-2,
          .iq-row-3,
          .iq-row-4 {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  );
}

function EmptyResults({ submitting }: { submitting: boolean }) {
  return (
    <motion.div
      className="iq-empty"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <PackageSearch size={40} strokeWidth={1.5} />
      <p>{submitting ? "Calculating your price…" : "Fill out your shipment details to see your instant price here."}</p>
    </motion.div>
  );
}

const resultMotion = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -8 },
  transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] as const },
};

function ResultPanel({ result }: { result: QuoteResult }) {
  if (!result.ok) {
    return (
      <motion.div {...resultMotion}>
        <p className="iq-result-error">{result.error ?? "Unable to calculate a quote right now."}</p>
      </motion.div>
    );
  }

  if (result.oversized) {
    return (
      <motion.div {...resultMotion}>
        <p className="iq-result-warn">
          This shipment exceeds our standard truck types. Please{" "}
          <a href="#contact">contact us</a> for a custom quote.
        </p>
      </motion.div>
    );
  }

  return (
    <motion.div {...resultMotion}>
      <span className="iq-result-label">Estimated Price</span>
      <p className="iq-result-price">
        <em>
          $<AnimatedNumber value={result.price ?? 0} />
        </em>
      </p>
      <div className="iq-result-meta">
        <motion.div
          className="iq-result-meta-item"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
        >
          <span className="label">Truck</span>
          <span className="value">{result.truckType?.name}</span>
        </motion.div>
        <motion.div
          className="iq-result-meta-item"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.22 }}
        >
          <span className="label">Distance</span>
          <span className="value">{result.distanceMiles} mi</span>
        </motion.div>
        <motion.div
          className="iq-result-meta-item"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.29 }}
        >
          <span className="label">Drive time</span>
          <span className="value">{result.durationMinutes} min</span>
        </motion.div>
      </div>
      <p className="iq-result-note">This is an automated estimate. Final pricing is confirmed when we schedule your pickup.</p>
    </motion.div>
  );
}

function AnimatedNumber({ value }: { value: number }) {
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    const controls = animate(0, value, {
      duration: 0.9,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (latest) => setDisplay(latest),
    });
    return () => controls.stop();
  }, [value]);

  return <>{display.toFixed(2)}</>;
}

function NumberField({
  label,
  value,
  onChange,
  required,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
}) {
  return (
    <div className="iq-field">
      <label className="iq-label">{label}</label>
      <input
        type="number"
        min="0"
        required={required}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="iq-input"
      />
    </div>
  );
}
