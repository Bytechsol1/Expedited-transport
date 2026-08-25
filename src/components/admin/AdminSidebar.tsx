"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, ShoppingCart, FileText, Map, Users, 
  UserSquare2, CircleDollarSign, CreditCard, BarChart3, Globe, 
  Settings, Activity, LogOut, ChevronLeft, ChevronRight
} from "lucide-react";
import { useState } from "react";
import { signOut } from "next-auth/react";
import Image from "next/image";

const MENU_GROUPS = [
  {
    label: "Overview",
    items: [
      { name: "Dashboard", href: "/admin/portal", icon: LayoutDashboard }
    ]
  },
  {
    label: "Operations",
    items: [
      { name: "Orders", href: "/admin/orders", icon: ShoppingCart },
      { name: "Tracking", href: "/admin/tracking", icon: Map },
    ]
  },
  {
    label: "Finance",
    items: [
      { name: "Rates & Pricing", href: "/admin/rates", icon: CircleDollarSign },
    ]
  },
  {
    label: "Settings",
    items: [
      { name: "Settings", href: "/admin/settings", icon: Settings }
    ]
  }
];

export function AdminSidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside className={`bg-[#2a3441] text-white flex flex-col flex-shrink-0 z-20 shadow-2xl transition-all duration-300 ${collapsed ? 'w-[80px]' : 'w-[260px]'}`}>
      <div className={`h-20 flex border-b border-white/5 transition-all ${collapsed ? 'items-center justify-center gap-2 px-2' : 'items-center justify-between px-6'}`}>
        <div className="flex items-center gap-3 overflow-hidden">
          <Image 
            src="/ex-icon.svg" 
            alt="Expedited Logo" 
            width={collapsed ? 32 : 60} 
            height={collapsed ? 20 : 37} 
            className="flex-shrink-0 object-contain"
          />
          {!collapsed && (
            <Image
              src="/ex-text.svg"
              alt="EXPEDITED"
              width={115}
              height={11}
              style={{ objectFit: "contain", display: "block" }}
              className="mt-1"
            />
          )}
        </div>
        <button onClick={() => setCollapsed(!collapsed)} className="text-slate-400 hover:text-white transition-colors flex-shrink-0">
          {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={20} />}
        </button>
      </div>

      <div className="flex-1 overflow-y-auto custom-scrollbar py-6">
        {MENU_GROUPS.map((group, i) => (
          <div key={i} className="mb-6">
            {!collapsed && (
              <h3 className="px-6 mb-2 text-[10px] font-bold uppercase tracking-widest text-slate-500">
                {group.label}
              </h3>
            )}
            <nav className="flex flex-col gap-1 px-3">
              {group.items.map((item) => {
                const isActive = pathname.startsWith(item.href);
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    title={collapsed ? item.name : undefined}
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all ${
                      isActive 
                        ? 'bg-[#5eead4]/10 text-[#5eead4] font-bold' 
                        : 'text-slate-400 hover:bg-white/5 hover:text-slate-200 font-medium'
                    }`}
                  >
                    <item.icon size={20} className={isActive ? 'text-[#5eead4]' : 'text-slate-400'} flex-shrink={0} />
                    {!collapsed && <span className="whitespace-nowrap">{item.name}</span>}
                  </Link>
                );
              })}
            </nav>
          </div>
        ))}
      </div>

      <div className="mt-auto border-t border-white/5 p-4 flex-shrink-0">
        {!collapsed ? (
          <>
            <div className="flex items-center justify-between mb-4 px-2 text-xs text-slate-400 font-medium">
              <div className="flex items-center gap-2">
                <Activity size={14} className="text-[#5eead4] animate-pulse" />
                System Online
              </div>
            </div>
            <div className="flex items-center justify-between bg-white/5 rounded-xl p-3">
              <div className="flex items-center gap-3 overflow-hidden">
                <div className="w-8 h-8 rounded-full bg-[#5eead4] text-[#1e293b] flex items-center justify-center font-bold text-sm flex-shrink-0">
                  A
                </div>
                <div className="flex flex-col overflow-hidden">
                  <span className="text-sm font-bold text-white truncate">Admin User</span>
                  <span className="text-[10px] text-slate-400 truncate">admin@expedited.com</span>
                </div>
              </div>
              <button onClick={() => signOut({ callbackUrl: "/admin/login" })} className="text-slate-400 hover:text-red-400 transition-colors flex-shrink-0" title="Logout">
                <LogOut size={18} />
              </button>
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center gap-6 py-2">
            <span title="System Online">
              <Activity size={20} className="text-[#5eead4] animate-pulse" />
            </span>
            <button onClick={() => signOut({ callbackUrl: "/admin/login" })} className="text-slate-400 hover:text-red-400 transition-colors" title="Logout">
              <LogOut size={20} />
            </button>
          </div>
        )}
      </div>
    </aside>
  );
}
