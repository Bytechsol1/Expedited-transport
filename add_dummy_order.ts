import { db } from "./src/lib/db/client";
import { customers, quoteRequests, orderStatusEvents, truckTypes } from "./src/lib/db/schema";
import { eq } from "drizzle-orm";

async function main() {
  const email = "muneeb@bytechsol.com";

  // Find the customer
  let customer = await db.select().from(customers).where(eq(customers.email, email)).limit(1);
  if (customer.length === 0) {
    console.log("Customer not found. Creating customer...");
    customer = await db.insert(customers).values({
      email,
      passwordHash: "dummy",
    }).returning();
  }

  const customerId = customer[0].id;
  console.log("Customer ID:", customerId);

  // Find a truck type
  const trucks = await db.select().from(truckTypes).limit(1);
  const truckId = trucks.length > 0 ? trucks[0].id : null;

  // Insert a dummy quote request (paid order)
  const order = await db.insert(quoteRequests).values({
    customerId,
    pickupAddress: "123 Tech Lane, San Francisco, CA 94105",
    deliveryAddress: "456 Industrial Blvd, Austin, TX 73301",
    pieces: 5,
    pallets: 2,
    weightLbs: 2500,
    lengthIn: 48,
    widthIn: 40,
    heightIn: 60,
    distanceMiles: "1500",
    price: "3450.00",
    status: "quoted",
    paymentStatus: "paid",
    paidAt: new Date(),
    fulfillmentStatus: "in_transit",
    assignedTruckTypeId: truckId,
  }).returning();

  console.log("Created order:", order[0].id);

  // Insert order status events
  await db.insert(orderStatusEvents).values([
    {
      quoteRequestId: order[0].id,
      status: "confirmed",
      createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
    },
    {
      quoteRequestId: order[0].id,
      status: "dispatched",
      createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1 day ago
    },
    {
      quoteRequestId: order[0].id,
      status: "in_transit",
      createdAt: new Date(), // today
    }
  ]);

  console.log("Added status events.");
  process.exit(0);
}

main().catch(console.error);
