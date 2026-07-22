"use client";

import { useState } from "react";
import { signOut } from "next-auth/react";

type HereVehicleProfile = {
  heightCm: number;
  widthCm: number;
  lengthCm: number;
  grossWeightKg: number;
  axleCount: number;
};

type TruckType = {
  id: string;
  name: string;
  active: boolean;
  sortOrder: number;
  maxWeightLbs: number;
  maxPallets: number;
  maxLengthIn: number;
  maxWidthIn: number;
  maxHeightIn: number;
  hereVehicleProfile: HereVehicleProfile;
  costPerMile: string;
  costPerHour: string;
  avgMpg: string;
};

type PricingSettings = {
  id: string;
  fuelPricePerGallon: string;
  fuelSurchargePercent: string;
  minimumCharge: string;
};

const EMPTY_TRUCK: Omit<TruckType, "id"> = {
  name: "New Truck Type",
  active: true,
  sortOrder: 0,
  maxWeightLbs: 1000,
  maxPallets: 1,
  maxLengthIn: 100,
  maxWidthIn: 60,
  maxHeightIn: 60,
  hereVehicleProfile: { heightCm: 200, widthCm: 180, lengthCm: 400, grossWeightKg: 3000, axleCount: 2 },
  costPerMile: "2.00",
  costPerHour: "50",
  avgMpg: "12",
};

export function RatesManager({
  initialTruckTypes,
  initialSettings,
}: {
  initialTruckTypes: TruckType[];
  initialSettings: PricingSettings | null;
}) {
  const [truckTypes, setTruckTypes] = useState<TruckType[]>(initialTruckTypes);
  const [settings, setSettings] = useState<PricingSettings | null>(initialSettings);
  const [savingId, setSavingId] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  const updateTruck = (id: string, patch: Partial<TruckType>) => {
    setTruckTypes((prev) => prev.map((t) => (t.id === id ? { ...t, ...patch } : t)));
  };

  const saveTruck = async (truck: TruckType) => {
    setSavingId(truck.id);
    setMessage(null);
    const response = await fetch(`/api/admin/truck-types/${truck.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: truck.name,
        active: truck.active,
        sortOrder: truck.sortOrder,
        maxWeightLbs: Number(truck.maxWeightLbs),
        maxPallets: Number(truck.maxPallets),
        maxLengthIn: Number(truck.maxLengthIn),
        maxWidthIn: Number(truck.maxWidthIn),
        maxHeightIn: Number(truck.maxHeightIn),
        hereVehicleProfile: {
          heightCm: Number(truck.hereVehicleProfile.heightCm),
          widthCm: Number(truck.hereVehicleProfile.widthCm),
          lengthCm: Number(truck.hereVehicleProfile.lengthCm),
          grossWeightKg: Number(truck.hereVehicleProfile.grossWeightKg),
          axleCount: Number(truck.hereVehicleProfile.axleCount),
        },
        costPerMile: Number(truck.costPerMile),
        costPerHour: Number(truck.costPerHour),
        avgMpg: Number(truck.avgMpg),
      }),
    });
    setSavingId(null);
    setMessage(response.ok ? `Saved ${truck.name}.` : "Failed to save truck type.");
  };

  const deleteTruck = async (id: string) => {
    if (!confirm("Delete this truck type? This cannot be undone.")) return;
    await fetch(`/api/admin/truck-types/${id}`, { method: "DELETE" });
    setTruckTypes((prev) => prev.filter((t) => t.id !== id));
  };

  const addTruck = async () => {
    const response = await fetch("/api/admin/truck-types", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...EMPTY_TRUCK,
        costPerMile: Number(EMPTY_TRUCK.costPerMile),
        costPerHour: Number(EMPTY_TRUCK.costPerHour),
        avgMpg: Number(EMPTY_TRUCK.avgMpg),
      }),
    });
    const data = await response.json();
    if (data.truckType) {
      setTruckTypes((prev) => [...prev, data.truckType]);
    }
  };

  const saveSettings = async () => {
    if (!settings) return;
    setMessage(null);
    const response = await fetch("/api/admin/pricing-settings", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        fuelPricePerGallon: Number(settings.fuelPricePerGallon),
        fuelSurchargePercent: Number(settings.fuelSurchargePercent),
        minimumCharge: Number(settings.minimumCharge),
      }),
    });
    setMessage(response.ok ? "Saved pricing settings." : "Failed to save pricing settings.");
  };

  if (!settings) {
    return (
      <p className="text-slate-500">
        No pricing settings found. Run <code>npm run db:seed</code> to create the initial configuration.
      </p>
    );
  }

  return (
    <div className="space-y-10">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Rate Management</h1>
          <p className="text-sm text-slate-500">Truck types, thresholds, and pricing used by the quote calculator.</p>
        </div>
        <button
          onClick={() => signOut({ callbackUrl: "/admin/login" })}
          className="rounded-md border border-slate-300 px-3 py-1.5 text-sm font-medium text-slate-700 hover:bg-slate-100"
        >
          Sign out
        </button>
      </header>

      {message ? <p className="rounded-md bg-slate-100 px-3 py-2 text-sm text-slate-700">{message}</p> : null}

      <section>
        <h2 className="mb-3 text-lg font-semibold text-slate-900">Global Pricing Settings</h2>
        <div className="grid max-w-xl grid-cols-3 gap-4 rounded-lg border border-slate-200 bg-white p-4">
          <Field
            label="Fuel $/gal"
            value={settings.fuelPricePerGallon}
            onChange={(v) => setSettings({ ...settings, fuelPricePerGallon: v })}
          />
          <Field
            label="Fuel surcharge %"
            value={settings.fuelSurchargePercent}
            onChange={(v) => setSettings({ ...settings, fuelSurchargePercent: v })}
          />
          <Field
            label="Minimum charge $"
            value={settings.minimumCharge}
            onChange={(v) => setSettings({ ...settings, minimumCharge: v })}
          />
        </div>
        <button
          onClick={saveSettings}
          className="mt-3 rounded-md bg-slate-900 px-4 py-1.5 text-sm font-semibold text-white hover:bg-slate-700"
        >
          Save settings
        </button>
      </section>

      <section>
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-slate-900">Truck Types</h2>
          <button
            onClick={addTruck}
            className="rounded-md border border-slate-300 px-3 py-1.5 text-sm font-medium text-slate-700 hover:bg-slate-100"
          >
            + Add truck type
          </button>
        </div>

        <div className="space-y-4">
          {truckTypes.map((truck) => (
            <div key={truck.id} className="rounded-lg border border-slate-200 bg-white p-4">
              <div className="mb-3 flex items-center gap-3">
                <input
                  value={truck.name}
                  onChange={(e) => updateTruck(truck.id, { name: e.target.value })}
                  className="flex-1 rounded-md border border-slate-300 px-3 py-1.5 text-sm font-semibold"
                />
                <label className="flex items-center gap-1.5 text-sm text-slate-600">
                  <input
                    type="checkbox"
                    checked={truck.active}
                    onChange={(e) => updateTruck(truck.id, { active: e.target.checked })}
                  />
                  Active
                </label>
                <button
                  onClick={() => deleteTruck(truck.id)}
                  className="text-sm font-medium text-red-600 hover:underline"
                >
                  Delete
                </button>
              </div>

              <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-slate-400">
                Assignment thresholds (max shipment this truck accepts)
              </p>
              <div className="mb-3 grid grid-cols-5 gap-3">
                <Field
                  label="Weight lbs"
                  value={String(truck.maxWeightLbs)}
                  onChange={(v) => updateTruck(truck.id, { maxWeightLbs: Number(v) })}
                />
                <Field
                  label="Pallets"
                  value={String(truck.maxPallets)}
                  onChange={(v) => updateTruck(truck.id, { maxPallets: Number(v) })}
                />
                <Field
                  label="Length in"
                  value={String(truck.maxLengthIn)}
                  onChange={(v) => updateTruck(truck.id, { maxLengthIn: Number(v) })}
                />
                <Field
                  label="Width in"
                  value={String(truck.maxWidthIn)}
                  onChange={(v) => updateTruck(truck.id, { maxWidthIn: Number(v) })}
                />
                <Field
                  label="Height in"
                  value={String(truck.maxHeightIn)}
                  onChange={(v) => updateTruck(truck.id, { maxHeightIn: Number(v) })}
                />
              </div>

              <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-slate-400">
                HERE truck routing profile
              </p>
              <div className="mb-3 grid grid-cols-5 gap-3">
                <Field
                  label="Height cm"
                  value={String(truck.hereVehicleProfile.heightCm)}
                  onChange={(v) =>
                    updateTruck(truck.id, { hereVehicleProfile: { ...truck.hereVehicleProfile, heightCm: Number(v) } })
                  }
                />
                <Field
                  label="Width cm"
                  value={String(truck.hereVehicleProfile.widthCm)}
                  onChange={(v) =>
                    updateTruck(truck.id, { hereVehicleProfile: { ...truck.hereVehicleProfile, widthCm: Number(v) } })
                  }
                />
                <Field
                  label="Length cm"
                  value={String(truck.hereVehicleProfile.lengthCm)}
                  onChange={(v) =>
                    updateTruck(truck.id, { hereVehicleProfile: { ...truck.hereVehicleProfile, lengthCm: Number(v) } })
                  }
                />
                <Field
                  label="Gross wt kg"
                  value={String(truck.hereVehicleProfile.grossWeightKg)}
                  onChange={(v) =>
                    updateTruck(truck.id, {
                      hereVehicleProfile: { ...truck.hereVehicleProfile, grossWeightKg: Number(v) },
                    })
                  }
                />
                <Field
                  label="Axles"
                  value={String(truck.hereVehicleProfile.axleCount)}
                  onChange={(v) =>
                    updateTruck(truck.id, { hereVehicleProfile: { ...truck.hereVehicleProfile, axleCount: Number(v) } })
                  }
                />
              </div>

              <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-slate-400">Rates</p>
              <div className="flex items-end gap-3">
                <Field label="$/mile" value={truck.costPerMile} onChange={(v) => updateTruck(truck.id, { costPerMile: v })} />
                <Field label="$/hour" value={truck.costPerHour} onChange={(v) => updateTruck(truck.id, { costPerHour: v })} />
                <Field label="Avg MPG" value={truck.avgMpg} onChange={(v) => updateTruck(truck.id, { avgMpg: v })} />
                <button
                  onClick={() => saveTruck(truck)}
                  disabled={savingId === truck.id}
                  className="ml-auto rounded-md bg-slate-900 px-4 py-1.5 text-sm font-semibold text-white hover:bg-slate-700 disabled:opacity-60"
                >
                  {savingId === truck.id ? "Saving..." : "Save"}
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

function Field({ label, value, onChange }: { label: string; value: string; onChange: (value: string) => void }) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-xs font-medium text-slate-500">{label}</label>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        inputMode="decimal"
        className="w-full rounded-md border border-slate-300 px-2 py-1.5 text-sm"
      />
    </div>
  );
}
