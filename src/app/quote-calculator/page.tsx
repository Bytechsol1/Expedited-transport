"use client";

import { useState } from "react";
import { AddressAutocomplete } from "@/components/AddressAutocomplete";

type QuoteResult = {
  ok: boolean;
  oversized?: boolean;
  error?: string;
  truckType?: { name: string };
  distanceMiles?: number;
  durationMinutes?: number;
  breakdown?: { total: number; mileageCharge: number; timeCharge: number; fuelSurcharge: number };
};

export default function QuoteCalculatorPage() {
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
    <main className="mx-auto min-h-screen max-w-3xl px-4 py-16">
      <h1 className="mb-2 text-3xl font-bold text-slate-900">Instant Freight Quote</h1>
      <p className="mb-8 text-slate-500">
        Tell us what you&apos;re shipping and we&apos;ll estimate the right truck and price.
      </p>

      <form onSubmit={handleSubmit} className="space-y-6 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
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

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          <NumberField label="Pieces" value={pieces} onChange={setPieces} />
          <NumberField label="Pallets" value={pallets} onChange={setPallets} />
          <NumberField label="Weight (lbs)" value={weightLbs} onChange={setWeightLbs} required />
          <div className="flex items-end pb-2">
            <label className="flex items-center gap-2 text-sm text-slate-600">
              <input type="checkbox" checked={hazmat} onChange={(e) => setHazmat(e.target.checked)} />
              Hazmat
            </label>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <NumberField label="Length (in)" value={lengthIn} onChange={setLengthIn} required />
          <NumberField label="Width (in)" value={widthIn} onChange={setWidthIn} required />
          <NumberField label="Height (in)" value={heightIn} onChange={setHeightIn} required />
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="w-full rounded-md bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-700 disabled:opacity-60"
        >
          {submitting ? "Calculating..." : "Get Instant Quote"}
        </button>
      </form>

      {result ? <ResultPanel result={result} /> : null}
    </main>
  );
}

function ResultPanel({ result }: { result: QuoteResult }) {
  if (!result.ok) {
    return (
      <div className="mt-6 rounded-xl border border-red-200 bg-red-50 p-6 text-red-700">
        {result.error ?? "Unable to calculate a quote right now."}
      </div>
    );
  }

  if (result.oversized) {
    return (
      <div className="mt-6 rounded-xl border border-amber-200 bg-amber-50 p-6 text-amber-800">
        This shipment exceeds our standard truck types. Please{" "}
        <a href="/#contact" className="font-semibold underline">
          contact us
        </a>{" "}
        for a custom quote.
      </div>
    );
  }

  return (
    <div className="mt-6 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
      <p className="text-sm font-semibold uppercase tracking-wide text-slate-400">Estimated Price</p>
      <p className="mb-4 text-4xl font-bold text-slate-900">${result.breakdown?.total.toFixed(2)}</p>
      <dl className="grid grid-cols-2 gap-2 text-sm text-slate-600">
        <dt>Assigned truck</dt>
        <dd className="text-right font-medium text-slate-900">{result.truckType?.name}</dd>
        <dt>Distance</dt>
        <dd className="text-right font-medium text-slate-900">{result.distanceMiles} mi</dd>
        <dt>Est. drive time</dt>
        <dd className="text-right font-medium text-slate-900">{result.durationMinutes} min</dd>
        <dt>Mileage charge</dt>
        <dd className="text-right">${result.breakdown?.mileageCharge.toFixed(2)}</dd>
        <dt>Time charge</dt>
        <dd className="text-right">${result.breakdown?.timeCharge.toFixed(2)}</dd>
        <dt>Fuel surcharge</dt>
        <dd className="text-right">${result.breakdown?.fuelSurcharge.toFixed(2)}</dd>
      </dl>
      <p className="mt-4 text-xs text-slate-400">
        This is an automated estimate. Final pricing is confirmed when we schedule your pickup.
      </p>
    </div>
  );
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
    <div className="flex flex-col gap-1">
      <label className="text-xs font-semibold uppercase tracking-wide text-slate-600">{label}</label>
      <input
        type="number"
        min="0"
        required={required}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none focus:border-slate-500"
      />
    </div>
  );
}
