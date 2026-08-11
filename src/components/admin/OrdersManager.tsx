"use client";

import { useState } from "react";
import { signOut } from "next-auth/react";
import Link from "next/link";

type FulfillmentStatus = "confirmed" | "dispatched" | "in_transit" | "delivered";

type Order = {
  id: string;
  createdAt: Date;
  pickupAddress: string;
  deliveryAddress: string;
  price: string | null;
  fulfillmentStatus: string;
  truckTypeName: string | null;
  customerEmail: string | null;
};

const STATUS_OPTIONS: { value: FulfillmentStatus; label: string }[] = [
  { value: "confirmed", label: "Confirmed" },
  { value: "dispatched", label: "Dispatched" },
  { value: "in_transit", label: "In Transit" },
  { value: "delivered", label: "Delivered" },
];

export function OrdersManager({ initialOrders }: { initialOrders: Order[] }) {
  const [orders, setOrders] = useState<Order[]>(initialOrders);
  const [savingId, setSavingId] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  const updateStatus = async (id: string, status: FulfillmentStatus) => {
    setSavingId(id);
    setMessage(null);
    const response = await fetch(`/api/admin/orders/${id}/status`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    setSavingId(null);

    if (response.ok) {
      setOrders((prev) => prev.map((o) => (o.id === id ? { ...o, fulfillmentStatus: status } : o)));
      setMessage("Order status updated.");
    } else {
      setMessage("Failed to update order status.");
    }
  };

  return (
    <div className="space-y-6">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Orders</h1>
          <p className="text-sm text-slate-500">
            Paid shipments and their fulfillment status. <Link href="/admin/rates" className="underline">Rate management</Link>
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
        <p className="text-sm text-slate-500">No paid orders yet.</p>
      ) : (
        <div className="overflow-hidden rounded-lg border border-slate-200 bg-white">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
              <tr>
                <th className="px-4 py-3">Route</th>
                <th className="px-4 py-3">Customer</th>
                <th className="px-4 py-3">Truck</th>
                <th className="px-4 py-3">Price</th>
                <th className="px-4 py-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {orders.map((order) => (
                <tr key={order.id}>
                  <td className="px-4 py-3">
                    <div className="font-medium text-slate-900">
                      {order.pickupAddress} → {order.deliveryAddress}
                    </div>
                    <div className="text-xs text-slate-400">{order.createdAt.toLocaleDateString()}</div>
                  </td>
                  <td className="px-4 py-3 text-slate-700">{order.customerEmail ?? "—"}</td>
                  <td className="px-4 py-3 text-slate-700">{order.truckTypeName ?? "—"}</td>
                  <td className="px-4 py-3 text-slate-700">
                    {order.price ? `$${Number(order.price).toFixed(2)}` : "—"}
                  </td>
                  <td className="px-4 py-3">
                    <select
                      value={order.fulfillmentStatus}
                      disabled={savingId === order.id}
                      onChange={(e) => updateStatus(order.id, e.target.value as FulfillmentStatus)}
                      className="rounded-md border border-slate-300 px-2 py-1.5 text-sm"
                    >
                      {STATUS_OPTIONS.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                          {opt.label}
                        </option>
                      ))}
                    </select>
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
