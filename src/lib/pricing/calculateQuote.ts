export type QuoteInputs = {
  distanceMiles: number;
  durationMinutes: number;
  costPerMile: number;
  costPerHour: number;
  avgMpg: number;
  fuelPricePerGallon: number;
  markupPercent: number;
  minimumCharge: number;
};

export type QuoteBreakdown = {
  mileageCharge: number;
  driverCharge: number;
  fuelCost: number;
  internalCost: number;
  total: number;
};

/**
 * mileage + driver time + fuel = what the job actually costs to run.
 * That cost is marked up (markupPercent), then floored at minimumCharge —
 * the minimum never quotes below what the customer sees, not below raw cost.
 */
export function calculateQuote(inputs: QuoteInputs): QuoteBreakdown {
  const mileageCharge = inputs.distanceMiles * inputs.costPerMile;
  const driverCharge = (inputs.durationMinutes / 60) * inputs.costPerHour;
  const fuelCost = (inputs.distanceMiles / inputs.avgMpg) * inputs.fuelPricePerGallon;
  const internalCost = mileageCharge + driverCharge + fuelCost;

  const customerPrice = internalCost * (1 + inputs.markupPercent / 100);
  const total = Math.max(customerPrice, inputs.minimumCharge);

  return {
    mileageCharge: round2(mileageCharge),
    driverCharge: round2(driverCharge),
    fuelCost: round2(fuelCost),
    internalCost: round2(internalCost),
    total: round2(total),
  };
}

function round2(value: number): number {
  return Math.round(value * 100) / 100;
}
