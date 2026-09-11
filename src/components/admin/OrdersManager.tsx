"use client";

import { useState } from "react";
import Link from "next/link";
import { signOut } from "next-auth/react";
import {
  FULFILLMENT_STAGES,
  normalizeFulfillmentStatus,
  type FulfillmentStatus,
} from "@/lib/orders/status";

type Order = {
  id: string;
  createdAt: Date;
  pickupAddress: string;
  deliveryAddress: string;
  price: string | null;
  fulfillmentStatus: string;
  customerName: string | null;
  customerEmail: string | null;
  customerPhone: string | null;
  customerCompany: string | null;
  pickupAt: Date | null;
  pickupTimeZone: string | null;
  shipmentDetails: string | null;
  pieces: number;
  pallets: number;
  weightLbs: number;
  lengthIn: number;
  widthIn: number;
  heightIn: number;
  hazmat: boolean;
  termsAcceptedAt: Date | null;
  truckTypeName: string | null;
  accountEmail: string | null;
};

function formatPickupAt(value: Date | null, timeZone: string | null) {
  if (!value) return "—";
  return new Intl.DateTimeFormat("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
    timeZone: timeZone || undefined,
  }).format(new Date(value));
}

export function OrdersManager({ initialOrders }: { initialOrders: Order[] }) {
  const [orders, setOrders] = useState<Order[]>(initialOrders);
  const [savingId, setSavingId] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  const updateStatus = async (id: string, status: FulfillmentStatus) => {
    setSavingId(id);
    setMessage(null);

    try {
      const response = await fetch(`/api/admin/orders/${id}/status`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      const data = (await response.json()) as { ok: boolean; error?: string };

      if (response.ok) {
        setOrders((current) => current.map((order) => (
          order.id === id ? { ...order, fulfillmentStatus: status } : order
        )));
        setMessage("Order status updated.");
      } else {
        setMessage(data.error ?? "Failed to update order status.");
      }
    } catch {
      setMessage("Failed to update order status.");
    } finally {
      setSavingId(null);
    }
  };

  return (
    <div className="space-y-6">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Orders</h1>
          <p className="text-sm text-slate-500">
            Active shipments and their fulfillment status. <Link href="/admin/rates" className="underline">Rate management</Link>
          </p>
        </div>
        <button
          onClick={() => signOut({ callbackUrl: "/admin/login" })}
          className="rounded-md border border-slate-300 px-3 py-1.5 text-sm font-medium text-slate-700 hover:bg-slate-100"
        >
          Sign out
        </button>
      </header>

      {message ? <p className="rounded-md bg-slate-100 px-3 py-2 text-sm text-slate-700">{message}</p> : null}

      {orders.length === 0 ? (
        <p className="text-sm text-slate-500">No orders yet.</p>
      ) : (
        <div className="overflow-x-auto rounded-lg border border-slate-200 bg-white">
          <table className="w-full min-w-[1180px] text-left text-sm">
            <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
              <tr>
                <th className="px-4 py-3">Route &amp; Details</th>
                <th className="px-4 py-3">Customer</th>
                <th className="px-4 py-3">Pickup Schedule</th>
                <th className="px-4 py-3">Shipment</th>
                <th className="px-4 py-3">Price</th>
                <th className="px-4 py-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {orders.map((order) => (
                <tr key={order.id} className="align-top">
                  <td className="px-4 py-3">
                    <div className="font-medium text-slate-900">
                      {order.pickupAddress} → {order.deliveryAddress}
                    </div>
                    <div className="text-xs text-slate-400">{order.createdAt.toLocaleDateString("en-US")}</div>
                    {order.shipmentDetails ? (
                      <div className="mt-1 max-w-sm whitespace-normal text-xs text-slate-500">{order.shipmentDetails}</div>
                    ) : null}
                  </td>
                  <td className="px-4 py-3 text-slate-700">
                    <div className="font-medium text-slate-900">{order.customerName ?? "—"}</div>
                    <div className="text-xs">{order.customerEmail ?? order.accountEmail ?? "—"}</div>
                    <div className="text-xs">{order.customerPhone ?? "—"}</div>
                    {order.customerCompany ? <div className="text-xs text-slate-500">{order.customerCompany}</div> : null}
                  </td>
                  <td className="px-4 py-3 text-slate-700">
                    <div>{formatPickupAt(order.pickupAt, order.pickupTimeZone)}</div>
                    {order.pickupTimeZone ? <div className="text-xs text-slate-400">{order.pickupTimeZone}</div> : null}
                  </td>
                  <td className="px-4 py-3 text-slate-700">
                    <div>{order.truckTypeName ?? "—"}</div>
                    <div className="text-xs text-slate-500">
                      {order.pieces} pcs · {order.pallets} pallets · {order.weightLbs.toLocaleString()} lbs
                    </div>
                    <div className="text-xs text-slate-500">
                      {order.lengthIn} × {order.widthIn} × {order.heightIn} in{order.hazmat ? " · Hazmat" : ""}
                    </div>
                  </td>
                  <td className="px-4 py-3 text-slate-700">
                    {order.price ? `$${Number(order.price).toFixed(2)}` : "—"}
                  </td>
                  <td className="px-4 py-3">
                    <select
                      value={normalizeFulfillmentStatus(order.fulfillmentStatus)}
                      disabled={savingId === order.id}
                      onChange={(event) => updateStatus(order.id, event.target.value as FulfillmentStatus)}
                      className="rounded-md border border-slate-300 px-2 py-1.5 text-sm"
                    >
                      {FULFILLMENT_STAGES.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                    <div className="mt-1 text-xs text-slate-400">
                      {order.termsAcceptedAt
                        ? `Policies accepted ${new Date(order.termsAcceptedAt).toLocaleDateString("en-US")}`
                        : "No acceptance timestamp"}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
