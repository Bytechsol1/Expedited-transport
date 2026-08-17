"use server";

import { eq, asc, sql } from "drizzle-orm";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db/client";
import { quoteRequests, orderStatusEvents, truckTypes } from "@/lib/db/schema";

export async function fetchTrackingData(id: string) {
  const session = await auth();
  const customerId = session?.user?.id as string | undefined;

  if (!id || !customerId) {
    return { error: "Not authorized or missing ID" };
  }

  // strip "EXP-" if user entered it
  const cleanId = id.replace(/^EXP-/i, "").trim().toLowerCase();

  try {
    let queryCondition;
    
    // If it's a full UUID (36 chars) or close to it, match exactly
    if (cleanId.length > 20) {
      queryCondition = eq(quoteRequests.id, cleanId);
    } else {
      // Otherwise, it's a short ID (like 2bc5d116). Cast UUID to text and match prefix
      queryCondition = sql`CAST(${quoteRequests.id} AS TEXT) LIKE ${cleanId + "%"}`;
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

    if (shipment.customerId !== customerId) {
      return { error: "You do not have permission to view this shipment." };
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
