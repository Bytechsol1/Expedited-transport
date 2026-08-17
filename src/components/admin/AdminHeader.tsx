"use client";

import { Bell, Truck } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export function AdminHeader() {
  const [activeOrders] = useState(0); // Mock state

  return (
    <header className="h-20 bg-white border-b border-slate-200 flex items-center justify-between px-8 flex-shrink-0 z-10 shadow-[0_4px_20px_-10px_rgba(0,0,0,0.05)]">
      <div className="flex items-center gap-4">
        <h1 className="text-2xl font-black text-slate-800 tracking-tight">Admin Dashboard</h1>
      </div>
      
      <div className="flex items-center gap-6">
        <div className="relative group">
          <button className="w-10 h-10 bg-slate-50 rounded-full flex items-center justify-center border border-slate-200 text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors">
            <Bell size={18} />
            {activeOrders > 0 && (
              <span className="absolute top-2 right-2.5 w-2 h-2 bg-[#5eead4] rounded-full border-2 border-white shadow-[0_0_8px_rgba(94,234,212,0.6)]" />
            )}
          </button>
          
          <div className="absolute right-0 top-full mt-2 w-72 bg-white rounded-2xl shadow-xl shadow-slate-200/50 border border-slate-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 transform origin-top-right scale-95 group-hover:scale-100">
            <div className="p-4 border-b border-slate-100 flex items-center justify-between">
              <h4 className="font-bold text-slate-800">Notifications</h4>
              <span className="text-xs font-bold bg-[#5eead4]/20 text-[#0d9488] px-2 py-1 rounded-full">{activeOrders} New</span>
            </div>
            <div className="max-h-[300px] overflow-y-auto">
              {activeOrders > 0 ? (
                <Link href="/admin/orders" className="block p-4 border-b border-slate-50 hover:bg-slate-50 transition-colors">
                  <div className="flex gap-3">
                    <div className="w-8 h-8 rounded-full bg-[#5eead4]/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Truck size={14} className="text-[#0d9488]" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-slate-700">You have {activeOrders} pending actions!</p>
                      <p className="text-xs text-slate-500 mt-1">Review orders to keep the fleet moving.</p>
                    </div>
                  </div>
                </Link>
              ) : (
                <div className="p-6 text-center text-slate-500 text-sm font-medium">
                  No new notifications.
                </div>
              )}
            </div>
            {activeOrders > 0 && (
              <div className="p-3 bg-slate-50 rounded-b-2xl text-center border-t border-slate-100">
                <Link href="/admin/orders" className="text-xs font-bold text-[#0d9488] hover:text-[#115e59] transition-colors">View all orders</Link>
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center gap-3 bg-slate-50 pl-2 pr-4 py-1.5 rounded-full border border-slate-200 cursor-pointer hover:bg-slate-100 transition-colors">
          <div className="w-8 h-8 rounded-full bg-[#5eead4] text-[#1e293b] flex items-center justify-center font-bold text-sm uppercase">
            A
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-bold text-slate-800 leading-tight">Admin</span>
            <span className="text-[10px] font-medium text-slate-500 leading-tight">System Owner</span>
          </div>
        </div>
      </div>
    </header>
  );
}
