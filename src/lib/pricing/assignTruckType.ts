export type ShipmentDimensions = {
  weightLbs: number;
  pallets: number;
  lengthIn: number;
  widthIn: number;
  heightIn: number;
};

export type TruckTypeCandidate = {
  id: string;
  maxWeightLbs: number;
  maxPallets: number;
  maxLengthIn: number;
  maxWidthIn: number;
  maxHeightIn: number;
};

/**
 * Returns the smallest active truck type (by the order given) that can
 * accommodate the shipment, or null if the shipment exceeds every truck type.
 */
export function assignTruckType<T extends TruckTypeCandidate>(
  shipment: ShipmentDimensions,
  truckTypes: T[]
): T | null {
  return (
    truckTypes.find(
      (truck) =>
        shipment.weightLbs <= truck.maxWeightLbs &&
        shipment.pallets <= truck.maxPallets &&
        shipment.lengthIn <= truck.maxLengthIn &&
        shipment.widthIn <= truck.maxWidthIn &&
        shipment.heightIn <= truck.maxHeightIn
    ) ?? null
  );
}
