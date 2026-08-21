"use server";

import { eq, asc, sql } from "drizzle-orm";
import { db } from "@/lib/db/client";
import { quoteRequests, orderStatusEvents, truckTypes } from "@/lib/db/schema";

export async function fetchTrackingData(id: string) {
  if (!id) {
    return { error: "Missing Tracking ID" };
  }

  // strip "EXP-" if user entered it
  const cleanId = id.replace(/^EXP-/i, "").trim().toLowerCase();

  try {
    let queryCondition;
    
    if (cleanId.length === 36) {
      queryCondition = eq(quoteRequests.id, cleanId);
    } else if (cleanId.length === 8) {
      queryCondition = sql`CAST(${quoteRequests.id} AS TEXT) LIKE ${cleanId + "-%"}`;
    } else {
      return { error: "Tracking ID not found. Please enter a complete Tracking ID." };
    }

    const results = await db
      .select({
        id: quoteRequests.id,
        pickupAddress: quoteRequests.pickupAddress,
        deliveryAddress: quoteRequests.deliveryAddress,
        fulfillmentStatus: quoteRequests.fulfillmentStatus,
        paymentStatus: quoteRequests.paymentStatus,
        status: quoteRequests.status,
        customerId: quoteRequests.customerId,
        truckTypeName: truckTypes.name,
        pieces: quoteRequests.pieces,
        pallets: quoteRequests.pallets,
        weightLbs: quoteRequests.weightLbs,
        distanceMiles: quoteRequests.distanceMiles,
        price: quoteRequests.price,
      })
      .from(quoteRequests)
      .leftJoin(truckTypes, eq(quoteRequests.assignedTruckTypeId, truckTypes.id))
      .where(queryCondition)
      .limit(1);

    const shipment = results[0];

    if (!shipment) {
      return { error: "Tracking ID not found." };
    }

    const events = await db
      .select({ status: orderStatusEvents.status, createdAt: orderStatusEvents.createdAt })
      .from(orderStatusEvents)
      .where(eq(orderStatusEvents.quoteRequestId, shipment.id))
      .orderBy(asc(orderStatusEvents.createdAt));

    return { shipment, events };
  } catch (error) {
    return { error: "Invalid Tracking ID format. Please make sure it's a valid ID." };
  }
}
