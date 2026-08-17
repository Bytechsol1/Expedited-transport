import { eq } from "drizzle-orm";
import { z } from "zod";
import { db } from "@/lib/db/client";
import { orderStatusEvents, quoteRequests } from "@/lib/db/schema";
import { auth } from "@/lib/auth";

export const runtime = "nodejs";

const statusUpdateSchema = z.object({
  status: z.enum(["confirmed", "dispatched", "in_transit", "delivered"]),
});

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth();
  const role = (session?.user as { role?: string } | undefined)?.role;

  if (!session || role !== "admin") {
    return Response.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;

  try {
    const body = statusUpdateSchema.parse(await request.json());

    const updated = await db.transaction(async (tx) => {
      const [order] = await tx
        .update(quoteRequests)
        .set({ fulfillmentStatus: body.status })
        .where(eq(quoteRequests.id, id))
        .returning();

      if (!order) return null;

      await tx.insert(orderStatusEvents).values({ quoteRequestId: id, status: body.status });
      return order;
    });

    if (!updated) {
      return Response.json({ ok: false, error: "Order not found." }, { status: 404 });
    }

    return Response.json({ ok: true, order: updated });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return Response.json({ ok: false, error: error.issues }, { status: 400 });
    }
    const message = error instanceof Error ? error.message : "Unable to update order status.";
    return Response.json({ ok: false, error: message }, { status: 500 });
  }
}
