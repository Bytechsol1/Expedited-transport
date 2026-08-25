"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { AnimatePresence, animate, motion } from "framer-motion";
import { PackageSearch, ChevronDown } from "lucide-react";
import { AddressAutocomplete } from "@/components/AddressAutocomplete";

type Coords = { lat: number; lng: number; label: string };

type QuoteResult = {
  ok: boolean;
  oversized?: boolean;
  error?: string;
  quoteRequestId?: string;
  truckType?: { name: string };
  distanceMiles?: number;
  durationMinutes?: number;
  price?: number;
  pickupCoords?: Coords;
  deliveryCoords?: Coords;
};

const MAX_WEIGHT_LBS = 45000;

function CustomTruckDropdown({ value, onChange, options }: { value: string, onChange: (v: string) => void, options: {id: string, name: string}[] }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const selected = value ? options.find(o => o.id === value)?.name : "Select Truck Type";

  return (
    <div className="iq-custom-select" ref={ref}>
      <div className="iq-select-trigger" onClick={() => setOpen(!open)}>
        <span>{selected}</span>
        <ChevronDown size={16} className={`iq-select-icon ${open ? "open" : ""}`} />
      </div>
      <AnimatePresence>
        {open && (
          <motion.ul 
            className="iq-select-options"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.15 }}
          >
            <li 
              className={`iq-select-option ${value === "" ? "selected" : ""}`}
              onClick={() => { onChange(""); setOpen(false); }}
            >
              Select Truck Type
            </li>
            {options.map(o => (
              <li 
                key={o.id}
                className={`iq-select-option ${value === o.id ? "selected" : ""}`}
                onClick={() => { onChange(o.id); setOpen(false); }}
              >
                {o.name}
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}


export function InstantQuoteSection() {
  const [pickupAddress, setPickupAddress] = useState("");
  const [deliveryAddress, setDeliveryAddress] = useState("");
  const [pieces, setPieces] = useState("1");
  const [pallets, setPallets] = useState("1");
  const [weightLbs, setWeightLbs] = useState(0);
  const [lengthIn, setLengthIn] = useState("");
  const [widthIn, setWidthIn] = useState("");
  const [heightIn, setHeightIn] = useState("");
  const [hazmat, setHazmat] = useState(false);
  const [truckTypeId, setTruckTypeId] = useState("");
  const [availableTrucks, setAvailableTrucks] = useState<{id: string, name: string}[]>([]);

  useEffect(() => {
    fetch("/api/truck-types")
      .then((res) => res.json())
      .then((data) => {
        if (data.ok) {
          setAvailableTrucks(data.truckTypes);
        }
      })
      .catch(() => {});
  }, []);

  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState<QuoteResult | null>(null);
  const [checkingOut, setCheckingOut] = useState(false);
  const [paymentBanner, setPaymentBanner] = useState<"cancelled" | null>(null);

  const { data: session } = useSession();
  const router = useRouter();

  const requestSeq = useRef(0);
  // Caches resolved geocode results by the exact address text that produced
  // them, so re-submitting after only a quantity/dimension change can skip
  // the two geocoding calls — the slowest part of each round trip.
  const geocodeCacheRef = useRef<Map<string, Coords>>(new Map());

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const payment = params.get("payment");
    if (payment === "cancelled") {
      setPaymentBanner(payment);
      params.delete("payment");
      const newSearch = params.toString();
      window.history.replaceState({}, "", `${window.location.pathname}${newSearch ? `?${newSearch}` : ""}#instant-quote`);
    }
  }, []);

  // Auto-calculates once every required field is filled in, instead of a
  // manual submit button — debounced so we don't fire a geocode/route
  // request on every keystroke.
  useEffect(() => {
    const ready =
      pickupAddress.trim().length > 2 &&
      deliveryAddress.trim().length > 2 &&
      weightLbs > 0 &&
      Number(lengthIn) > 0 &&
      Number(widthIn) > 0 &&
      Number(heightIn) > 0;

    if (!ready) {
      setResult(null);
      return;
    }

    const seq = ++requestSeq.current;
    const timer = setTimeout(async () => {
      setSubmitting(true);
      setPaymentBanner(null);

      const cachedPickup = geocodeCacheRef.current.get(pickupAddress);
      const cachedDelivery = geocodeCacheRef.current.get(deliveryAddress);

      try {
        const response = await fetch("/api/quote-calculator", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            pickupAddress,
            deliveryAddress,
            pickupCoords: cachedPickup,
            deliveryCoords: cachedDelivery,
            pieces: Number(pieces),
            pallets: Number(pallets),
            weightLbs,
            lengthIn: Number(lengthIn),
            widthIn: Number(widthIn),
            heightIn: Number(heightIn),
            hazmat,
            truckTypeId: truckTypeId || undefined,
          }),
        });

        const data: QuoteResult = await response.json();
        if (seq === requestSeq.current) setResult(data);

        if (data.ok && !data.oversized) {
          if (data.pickupCoords) geocodeCacheRef.current.set(pickupAddress, data.pickupCoords);
          if (data.deliveryCoords) geocodeCacheRef.current.set(deliveryAddress, data.deliveryCoords);
        }
      } catch {
        if (seq === requestSeq.current) {
          setResult({ ok: false, error: "Something went wrong. Please try again." });
        }
      } finally {
        if (seq === requestSeq.current) setSubmitting(false);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [pickupAddress, deliveryAddress, pieces, pallets, weightLbs, lengthIn, widthIn, heightIn, hazmat, truckTypeId]);

  const handleCheckout = async (quoteRequestId: string) => {
    const role = (session?.user as { role?: string } | undefined)?.role;
    if (role !== "customer") {
      router.push(`/login?next=${quoteRequestId}`);
      return;
    }

    setCheckingOut(true);
    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ quoteRequestId }),
      });
      const data: { ok: boolean; url?: string; error?: string } = await response.json();
      if (data.ok && data.url) {
        window.location.href = data.url;
        return;
      }
      setResult((prev) => (prev ? { ...prev, error: data.error ?? "Unable to start checkout." } : prev));
    } catch {
      setResult((prev) => (prev ? { ...prev, error: "Unable to start checkout. Please try again." } : prev));
    } finally {
      setCheckingOut(false);
    }
  };

  return (
    <section id="instant-quote" className="iq-section">
      {/* Rounded-notch clip path — copied from FeaturesSection's video panel clip so the
          results card matches the same cut-corner shape used elsewhere on the site. Content
          padding is generous enough to clear the left-edge notch (see .iq-results-panel). */}
      <svg width="0" height="0" style={{ position: "absolute", overflow: "hidden" }}>
        <defs>
          <clipPath id="quote-card-clip" clipPathUnits="objectBoundingBox">
            <path d="
              M 0.025,0
              L 0.545,0
              Q 0.57,0 0.5877,0.0177
              L 0.6023,0.0323
              Q 0.62,0.05 0.645,0.05
              L 0.975,0.05
              Q 1.0,0.05 1.0,0.075
              L 1.0,0.975
              Q 1.0,1.0 0.975,1.0
              L 0.025,1.0
              Q 0,1.0 0,0.975
              L 0,0.675
              Q 0,0.65 0.0177,0.6323
              L 0.0323,0.6177
              Q 0.05,0.60 0.05,0.575
              L 0.05,0.245
              Q 0.05,0.22 0.0305,0.2044
              L 0.0195,0.1956
              Q 0,0.18 0,0.155
              L 0,0.025
              Q 0,0 0.025,0
              Z
            " />
          </clipPath>
        </defs>
      </svg>

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
          className="iq-form-col"
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        >
          <h3 className="iq-form-title">Get a Shipping Quote</h3>

          <div className="iq-form">
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

            <span className="iq-section-label">Shipment Details</span>
            <div className="iq-row iq-row-2">
              <div className="iq-field">
                <label className="iq-label">Truck Type</label>
                <CustomTruckDropdown 
                  value={truckTypeId} 
                  onChange={setTruckTypeId} 
                  options={availableTrucks} 
                />
              </div>
              <div style={{ display: "flex", alignItems: "flex-end" }}>
                <label className="iq-hazmat" style={{ paddingBottom: "0.85rem" }}>
                  <input type="checkbox" checked={hazmat} onChange={(e) => setHazmat(e.target.checked)} />
                  Hazmat
                </label>
              </div>
            </div>

            <div className="iq-row iq-row-2">
              <NumberField label="Pieces" value={pieces} onChange={setPieces} />
              <NumberField label="Pallets" value={pallets} onChange={setPallets} />
            </div>

            <span className="iq-section-label">Dimensions</span>
            <div className="iq-row iq-row-3">
              <NumberField label="Length (in)" value={lengthIn} onChange={setLengthIn} required />
              <NumberField label="Width (in)" value={widthIn} onChange={setWidthIn} required />
              <NumberField label="Height (in)" value={heightIn} onChange={setHeightIn} required />
            </div>

            <div className="iq-row iq-row-1">
              <SliderField label="Weight" unit="lbs" max={MAX_WEIGHT_LBS} step={50} value={weightLbs} onChange={setWeightLbs} />
            </div>
          </div>
        </motion.div>

        <motion.div
          className="iq-results-panel"
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          style={{ clipPath: "url(#quote-card-clip)" }}
        >
          <div className="iq-results-glow" />

          {paymentBanner ? (
            <div className="iq-payment-banner iq-payment-banner--cancelled">
              Checkout was cancelled. Your quote is still saved below if you&apos;d like to try again.
            </div>
          ) : null}

          <div className="iq-results-head">
            <h3 className="iq-results-title">Your Quote</h3>
            <AnimatePresence mode="wait">
              {result?.ok && !result.oversized ? (
                <motion.p
                  key="price"
                  className="iq-results-price"
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                >
                  $<AnimatedNumber value={result.price ?? 0} />
                </motion.p>
              ) : (
                <p key="placeholder" className="iq-results-price iq-results-price--muted">$—</p>
              )}
            </AnimatePresence>
          </div>

          <div className="iq-divider">
            <span className="iq-divider-dot" />
          </div>

          <div className="iq-results-body">
            <AnimatePresence mode="wait">
              {result ? (
                <ResultPanel
                  key={JSON.stringify(result)}
                  result={result}
                  checkingOut={checkingOut}
                  recalculating={submitting}
                  onCheckout={handleCheckout}
                />
              ) : (
                <EmptyResults key="empty" submitting={submitting} />
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>

      <style>{`
        .iq-section {
          position: relative;
          min-height: 100svh;
          display: flex;
          flex-direction: column;
          justify-content: center;
          background: var(--c-white);
          padding: 6.25rem var(--grid-margin);
          overflow: hidden;
          scroll-margin-top: 110px;
        }

        .iq-head {
          text-align: center;
          margin-bottom: 2.75rem;
        }

        .iq-kicker-row {
          display: inline-flex;
          align-items: center;
          gap: 14px;
          font-family: var(--font-mono);
          font-size: 0.75rem;
          font-weight: 700;
          letter-spacing: 0.28em;
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
          grid-template-columns: minmax(0, 1.2fr) minmax(0, 1fr);
          gap: 3.5rem;
          align-items: start;
        }

        .iq-form-col {
          padding: 1.5rem 0;
        }

        .iq-form-title {
          margin: 0 0 2.5rem;
          font-family: var(--font-primary);
          font-size: clamp(1.5rem, 2.4vw, 2rem);
          font-weight: 450;
          letter-spacing: -0.02em;
          color: var(--c-dark-green);
        }

        .iq-results-panel {
          position: sticky;
          overflow: hidden;
          top: 120px;
          min-height: clamp(460px, 62vh, 660px);
          display: flex;
          flex-direction: column;
          /* Extra left padding clears the clip-path's left-edge notch (5% of the
             panel's width) — content needs to sit well past that inward cut. */
          padding: 3rem 2.5rem 3rem 3.5rem;
          color: #fff;
          background: #0d1728;
          box-shadow: 0 32px 72px rgba(15, 23, 42, 0.24);
        }

        .iq-results-body {
          position: relative;
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }

        .iq-results-glow {
          position: absolute;
          inset: 0;
          background: radial-gradient(ellipse 65% 55% at 88% 0%, rgba(227, 30, 36, 0.3), transparent 68%);
          pointer-events: none;
        }

        .iq-results-head {
          position: relative;
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 1rem;
        }

        .iq-results-title {
          margin: 0;
          font-family: var(--font-primary);
          font-size: 1.25rem;
          font-weight: 450;
          letter-spacing: -0.02em;
          color: #fff;
        }

        .iq-results-price {
          margin: 0;
          font-family: var(--font-primary);
          font-size: clamp(1.75rem, 3vw, 2.25rem);
          font-weight: 450;
          letter-spacing: -0.02em;
          color: #fff;
          text-align: right;
        }

        .iq-results-price--muted {
          color: rgba(255, 255, 255, 0.25);
        }

        .iq-divider {
          position: relative;
          height: 1px;
          margin: 1.75rem 0;
          background: rgba(227, 30, 36, 0.18);
        }

        .iq-divider-dot {
          position: absolute;
          top: 0;
          left: 0;
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: #5fbf5f;
          box-shadow: 0 0 4px 1px rgba(95, 191, 95, 0.6);
          transform: translateY(-50%);
          animation: iq-dot-run 3.6s ease-in-out infinite;
        }

        @keyframes iq-dot-run {
          0% { left: 0%; opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { left: 100%; opacity: 0; }
        }

        .iq-payment-banner {
          position: relative;
          margin-bottom: 1.25rem;
          padding: 0.75rem 1rem;
          border-radius: 12px;
          font-family: var(--font-primary);
          font-size: 0.8125rem;
          line-height: 1.5;
        }


        .iq-payment-banner--cancelled {
          background: rgba(255, 255, 255, 0.06);
          border: 1px solid rgba(255, 255, 255, 0.14);
          color: rgba(255, 255, 255, 0.75);
        }

        .iq-form {
          display: flex;
          flex-direction: column;
          gap: 1.4rem;
        }

        .iq-section-label {
          margin-top: 1rem;
          font-family: var(--font-mono);
          font-size: 0.6875rem;
          font-weight: 700;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: rgba(5, 36, 36, 0.45);
        }

        .iq-section-label:first-of-type {
          margin-top: 0;
        }

        .iq-row {
          display: grid;
          gap: 1.75rem;
          margin-bottom: 0.5rem;
        }

        .iq-row-1 {
          grid-template-columns: 1fr;
        }

        .iq-row-2 {
          grid-template-columns: repeat(2, minmax(0, 1fr));
        }

        .iq-row-3 {
          grid-template-columns: repeat(3, minmax(0, 1fr));
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
          border-bottom-color: #E31E24;
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

        .iq-custom-select {
          position: relative;
          width: 100%;
        }

        .iq-select-trigger {
          display: flex;
          align-items: center;
          justify-content: space-between;
          width: 100%;
          background: transparent;
          border-bottom: 1px solid var(--c-dark-green-15);
          padding: 0.6rem 0;
          color: var(--c-dark-green);
          font-family: var(--font-primary);
          font-size: 0.95rem;
          cursor: pointer;
          transition: border-color 0.15s ease;
        }

        .iq-select-trigger:hover {
          border-bottom-color: #E31E24;
        }

        .iq-select-icon {
          color: rgba(5, 36, 36, 0.45);
          transition: transform 0.2s ease;
        }

        .iq-select-icon.open {
          transform: rotate(180deg);
        }

        .iq-select-options {
          position: absolute;
          top: calc(100% + 4px);
          left: 0;
          right: 0;
          z-index: 50;
          margin: 0;
          padding: 0.5rem;
          list-style: none;
          background: #fff;
          border-radius: 12px;
          box-shadow: 0 10px 40px rgba(0,0,0,0.08);
          border: 1px solid rgba(0,0,0,0.05);
        }

        .iq-select-option {
          padding: 0.75rem 1rem;
          font-family: var(--font-primary);
          font-size: 0.875rem;
          color: var(--c-dark-green);
          border-radius: 8px;
          cursor: pointer;
          transition: background 0.15s ease, color 0.15s ease;
        }

        .iq-select-option:hover {
          background: #f8fafc;
        }

        .iq-select-option.selected {
          background: rgba(227, 30, 36, 0.15);
          color: #5c7300;
          font-weight: 600;
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

        .iq-slider-field {
          display: flex;
          flex-direction: column;
          gap: 0.6rem;
        }

        .iq-slider-header {
          display: flex;
          align-items: baseline;
          justify-content: space-between;
        }

        .iq-slider-value {
          font-family: var(--font-primary);
          font-size: 1.125rem;
          font-weight: 800;
          color: var(--c-dark-green);
        }

        .iq-slider-value span {
          margin-left: 0.25rem;
          font-size: 0.75rem;
          font-weight: 600;
          color: var(--c-gray);
        }

        .iq-slider-input {
          width: 100%;
          margin: 0;
          appearance: none;
          -webkit-appearance: none;
          border-radius: 999px;
          height: 4px;
          outline: none;
        }

        .iq-slider-input::-webkit-slider-runnable-track {
          height: 4px;
          border-radius: 999px;
        }

        .iq-slider-input::-moz-range-track {
          height: 4px;
          border-radius: 999px;
          background: var(--c-dark-green-15);
        }

        .iq-slider-input::-moz-range-progress {
          height: 4px;
          border-radius: 999px;
          background: #E31E24;
        }

        .iq-slider-input::-webkit-slider-thumb {
          -webkit-appearance: none;
          width: 18px;
          height: 18px;
          margin-top: -10px;
          border-radius: 50%;
          background: #fff;
          border: 3px solid #E31E24;
          box-shadow: 0 2px 8px rgba(5, 36, 36, 0.25);
          cursor: pointer;
        }

        .iq-slider-input::-moz-range-thumb {
          width: 18px;
          height: 18px;
          border-radius: 50%;
          background: #fff;
          border: 3px solid #E31E24;
          box-shadow: 0 2px 8px rgba(5, 36, 36, 0.25);
          cursor: pointer;
        }

        .iq-slider-scale {
          display: flex;
          justify-content: space-between;
          font-family: var(--font-primary);
          font-size: 0.6875rem;
          font-weight: 600;
          letter-spacing: 0.04em;
          color: var(--c-gray);
        }

        .iq-empty {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          gap: 0.75rem;
          min-height: 220px;
          color: rgba(255, 255, 255, 0.55);
        }

        .iq-empty svg {
          color: rgba(255, 255, 255, 0.25);
        }

        .iq-empty p {
          margin: 0;
          max-width: 24ch;
          font-family: var(--font-primary);
          font-size: 0.9375rem;
          line-height: 1.6;
        }

        .iq-result-meta {
          display: grid;
          gap: 0.85rem;
        }

        .iq-result-meta-item {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .iq-result-meta-item .label {
          font-family: var(--font-primary);
          font-size: 0.875rem;
          color: rgba(255, 255, 255, 0.55);
        }

        .iq-result-meta-item .value {
          font-family: var(--font-primary);
          font-size: 0.9375rem;
          font-weight: 700;
          color: #fff;
        }

        .iq-result-note {
          margin: 1.5rem 0 0;
          font-family: var(--font-primary);
          font-size: 0.8125rem;
          color: rgba(255, 255, 255, 0.4);
        }

        .iq-result-warn,
        .iq-result-error {
          font-family: var(--font-primary);
          font-size: 0.9375rem;
          line-height: 1.7;
          color: rgba(255, 255, 255, 0.75);
        }

        .iq-result-warn a,
        .iq-result-error a {
          color: #E31E24;
          font-weight: 700;
          text-decoration: underline;
        }

        .iq-confirm-box {
          margin-top: 1.75rem;
          padding-top: 1.5rem;
          border-top: 1px solid rgba(255, 255, 255, 0.1);
        }

        .iq-confirm-box h4 {
          margin: 0;
          font-family: var(--font-primary);
          font-size: 1rem;
          font-weight: 600;
          color: #fff;
        }

        .iq-confirm-box p {
          margin: 0.4rem 0 1.1rem;
          font-family: var(--font-primary);
          font-size: 0.8125rem;
          color: rgba(255, 255, 255, 0.55);
        }

        .iq-pay-btn {
          width: 100%;
          padding: 0.9rem 1.5rem;
          background: #E31E24;
          color: #ffffff;
          border: none;
          border-radius: 12px;
          font-family: var(--font-primary);
          font-size: 0.9375rem;
          font-weight: 800;
          letter-spacing: -0.01em;
          cursor: pointer;
          transition: background 0.15s ease, transform 0.15s ease;
        }

        .iq-pay-btn:hover:not(:disabled) {
          background: #C81920;
          transform: translateY(-1px);
        }

        .iq-pay-btn:disabled {
          opacity: 0.6;
          cursor: default;
        }

        @media (max-width: 1100px) {
          .iq-layout {
            grid-template-columns: 1fr;
          }

          .iq-results-panel {
            position: static;
            min-height: 0;
            clip-path: none !important;
            border-radius: 24px;
          }
        }

        @media (max-width: 640px) {
          .iq-section {
            padding: 4rem 1.25rem;
          }

          .iq-results-panel {
            padding: 1.5rem;
          }

          .iq-row-2,
          .iq-row-3 {
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

function ResultPanel({
  result,
  checkingOut,
  recalculating,
  onCheckout,
}: {
  result: QuoteResult;
  checkingOut: boolean;
  recalculating: boolean;
  onCheckout: (quoteRequestId: string) => void;
}) {
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
      <div className="iq-result-meta">
        <motion.div
          className="iq-result-meta-item"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <span className="label">Truck</span>
          <span className="value">{result.truckType?.name}</span>
        </motion.div>
        <motion.div
          className="iq-result-meta-item"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.17 }}
        >
          <span className="label">Distance</span>
          <span className="value">{result.distanceMiles} mi</span>
        </motion.div>
        <motion.div
          className="iq-result-meta-item"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.24 }}
        >
          <span className="label">Drive time</span>
          <span className="value">{result.durationMinutes} min</span>
        </motion.div>
      </div>
      <p className="iq-result-note">This is an automated estimate. Final pricing is confirmed when we schedule your pickup.</p>

      {result.quoteRequestId ? (
        <div className="iq-confirm-box">
          <h4>Ready to book?</h4>
          <p>Confirm this quote and pay now to lock in your price and schedule pickup.</p>
          <motion.button
            type="button"
            className="iq-pay-btn"
            disabled={checkingOut || recalculating}
            onClick={() => onCheckout(result.quoteRequestId!)}
            whileHover={checkingOut || recalculating ? undefined : { scale: 1.015, y: -1 }}
            whileTap={checkingOut || recalculating ? undefined : { scale: 0.98 }}
          >
            {checkingOut ? "Redirecting…" : recalculating ? "Updating price…" : "Confirm Order — Pay Now"}
          </motion.button>
        </div>
      ) : null}
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

function SliderField({
  label,
  unit,
  max,
  step,
  value,
  onChange,
}: {
  label: string;
  unit: string;
  max: number;
  step: number;
  value: number;
  onChange: (value: number) => void;
}) {
  const percent = (value / max) * 100;

  return (
    <div className="iq-slider-field">
      <div className="iq-slider-header">
        <label className="iq-label">{label}</label>
        <span className="iq-slider-value">
          {value.toLocaleString()}
          <span>{unit}</span>
        </span>
      </div>
      <input
        type="range"
        min={0}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="iq-slider-input"
        style={{ background: `linear-gradient(to right, #E31E24 ${percent}%, rgba(5, 36, 36, 0.15) ${percent}%)` }}
      />
      <div className="iq-slider-scale">
        <span>0 {unit}</span>
        <span>{max.toLocaleString()} {unit}</span>
      </div>
    </div>
  );
}

