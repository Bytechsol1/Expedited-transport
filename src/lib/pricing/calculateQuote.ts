export type QuoteInputs = {
  distanceMiles: number;
  durationMinutes: number;
  costPerMile: number;
  costPerHour: number;
  minimumCharge: number;
  fuelSurchargePercent: number;
};

export type QuoteBreakdown = {
  mileageCharge: number;
  timeCharge: number;
  subtotalBeforeMinimum: number;
  subtotalAfterMinimum: number;
  fuelSurcharge: number;
  total: number;
};

export function calculateQuote(inputs: QuoteInputs): QuoteBreakdown {
  const mileageCharge = inputs.distanceMiles * inputs.costPerMile;
  const timeCharge = (inputs.durationMinutes / 60) * inputs.costPerHour;
  const subtotalBeforeMinimum = mileageCharge + timeCharge;
  const subtotalAfterMinimum = Math.max(subtotalBeforeMinimum, inputs.minimumCharge);
  const fuelSurcharge = subtotalAfterMinimum * (inputs.fuelSurchargePercent / 100);
  const total = subtotalAfterMinimum + fuelSurcharge;

  return {
    mileageCharge: round2(mileageCharge),
    timeCharge: round2(timeCharge),
    subtotalBeforeMinimum: round2(subtotalBeforeMinimum),
    subtotalAfterMinimum: round2(subtotalAfterMinimum),
    fuelSurcharge: round2(fuelSurcharge),
    total: round2(total),
  };
}

function round2(value: number): number {
  return Math.round(value * 100) / 100;
}
