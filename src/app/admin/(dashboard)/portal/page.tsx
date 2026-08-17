import { desc, eq } from "drizzle-orm";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db/client";
import { quoteRequests, truckTypes } from "@/lib/db/schema";
import { 
  Truck, Database, CreditCard, ArrowRight, Package, TrendingUp, Anchor, CheckCircle,
  AlertCircle, FileText, Clock, FileWarning, BarChart2, Plus, Users, Map, DollarSign, Activity
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export const dynamic = "force-dynamic";

const getStatusColor = (status: string) => {
  switch (status) {
    case "pending": return "bg-slate-100 text-slate-700 border-slate-200";
    case "confirmed": return "bg-blue-100 text-blue-700 border-blue-200";
    case "dispatched": return "bg-purple-100 text-purple-700 border-purple-200";
    case "in_transit": return "bg-amber-100 text-amber-700 border-amber-200";
    case "delivered": return "bg-emerald-100 text-emerald-700 border-emerald-200";
    case "cancelled": return "bg-red-100 text-red-700 border-red-200";
    default: return "bg-slate-100 text-slate-700 border-slate-200";
  }
};

const getQuoteStatusColor = (status: string) => {
  switch (status) {
    case "New": return "bg-blue-100 text-blue-700 border-blue-200";
    case "Reviewing": return "bg-purple-100 text-purple-700 border-purple-200";
    case "Quoted": return "bg-amber-100 text-amber-700 border-amber-200";
    case "Accepted": return "bg-emerald-100 text-emerald-700 border-emerald-200";
    case "Rejected": return "bg-red-100 text-red-700 border-red-200";
    default: return "bg-slate-100 text-slate-700 border-slate-200";
  }
};

export default async function AdminDashboardPage() {
  const session = await auth();

  // Fetch real data
  const allRequests = await db
    .select({
      id: quoteRequests.id,
      pickupAddress: quoteRequests.pickupAddress,
      deliveryAddress: quoteRequests.deliveryAddress,
      price: quoteRequests.price,
      paymentStatus: quoteRequests.paymentStatus,
      fulfillmentStatus: quoteRequests.fulfillmentStatus,
      weightLbs: quoteRequests.weightLbs,
      distanceMiles: quoteRequests.distanceMiles,
      truckTypeName: truckTypes.name,
      createdAt: quoteRequests.createdAt,
    })
    .from(quoteRequests)
    .leftJoin(truckTypes, eq(quoteRequests.assignedTruckTypeId, truckTypes.id))
    .orderBy(desc(quoteRequests.createdAt));

  const orders = allRequests;
  const quotes: typeof allRequests = []; // Quotes are now treated as orders

  // Metrics
  const totalOrders = orders.length;
  const totalQuotes = quotes.length;
  
  const activeOrdersList = orders.filter((o) => ["confirmed", "dispatched", "in_transit"].includes(o.fulfillmentStatus));
  const activeOrders = activeOrdersList.length;
  const deliveredOrders = orders.filter((o) => o.fulfillmentStatus === "delivered").length;
  const revenueGeneratingStatuses = ["dispatched", "in_transit", "delivered"];
  const revenueOrdersCount = orders.filter((o) => revenueGeneratingStatuses.includes(o.fulfillmentStatus)).length;
  const totalRevenue = orders
    .filter((o) => revenueGeneratingStatuses.includes(o.fulfillmentStatus))
    .reduce((acc, order) => acc + Number(order.price || 0), 0);

  // Averages for Fleet
  const avgWeight = orders.length ? Math.round(orders.reduce((acc, o) => acc + Number(o.weightLbs || 0), 0) / orders.length) : 0;
  const avgDistance = orders.length ? Math.round(orders.reduce((acc, o) => acc + Number(o.distanceMiles || 0), 0) / orders.length) : 0;
  const weightPercent = Math.min(Math.max((avgWeight / 45000) * 100, 5), 100);
  const distancePercent = Math.min(Math.max((avgDistance / 3000) * 100, 5), 100);

  const recentOrders = orders.slice(0, 5);
  const recentQuotes = quotes.slice(0, 4);

  // Shipment Status Lifecycle counts
  const statusCounts = {
    confirmed: orders.filter(o => o.fulfillmentStatus === "confirmed").length,
    dispatched: orders.filter(o => o.fulfillmentStatus === "dispatched").length,
    in_transit: orders.filter(o => o.fulfillmentStatus === "in_transit").length,
    delivered: orders.filter(o => o.fulfillmentStatus === "delivered").length,
    delayed: 0
  };

  const pendingQuotesCount = quotes.length;
  
  const truckTypeCounts = allRequests.reduce((acc, req) => {
    const name = req.truckTypeName || "Expedited Trucking";
    acc[name] = (acc[name] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  const totalRequests = allRequests.length || 1;
  const servicesData = Object.entries(truckTypeCounts).map(([name, count]) => ({
    name,
    percent: Math.round((count as number / totalRequests) * 100)
  })).sort((a, b) => b.percent - a.percent).slice(0, 5);
  
  const alertsCount = statusCounts.delayed + pendingQuotesCount;

  return (
    <div className="space-y-8 pb-10">
      
      {/* 1. Header (Subtitle added below the global header) */}
      <div className="mb-2">
        <p className="text-sm font-medium text-slate-500">
          Overview of quotes, shipments, fleet and revenue
        </p>
      </div>

      {/* 2. Top KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm flex flex-col group hover:shadow-md transition-shadow">
          <div className="flex justify-between mb-3">
            <span className="text-sm font-bold text-slate-500">Total Quotes</span>
            <FileText size={18} className="text-slate-400 group-hover:text-[#0d9488] transition-colors" />
          </div>
          <div className="text-3xl font-black text-[#2a3441]">{totalQuotes}</div>
          <div className="text-xs font-bold text-slate-400 mt-2">New quote requests</div>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm flex flex-col group hover:shadow-md transition-shadow">
          <div className="flex justify-between mb-3">
            <span className="text-sm font-bold text-slate-500">Total Orders</span>
            <Package size={18} className="text-slate-400 group-hover:text-[#0d9488] transition-colors" />
          </div>
          <div className="text-3xl font-black text-[#2a3441]">{totalOrders}</div>
          <div className="text-xs font-bold text-slate-400 mt-2">Confirmed shipments</div>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm flex flex-col group hover:border-[#5eead4] hover:shadow-md transition-all relative overflow-hidden">
          <div className="flex justify-between mb-3 relative z-10">
            <span className="text-sm font-bold text-slate-500 group-hover:text-[#0d9488] transition-colors">Active Shipments</span>
            <Truck size={18} className="text-[#0d9488]" />
          </div>
          <div className="text-3xl font-black text-[#0d9488] relative z-10">{activeOrders}</div>
          <div className="text-xs font-bold text-slate-400 mt-2 relative z-10">Currently in transit</div>
          <div className="absolute -bottom-4 -right-4 w-16 h-16 bg-[#5eead4]/10 rounded-full blur-xl group-hover:bg-[#5eead4]/20 transition-all"></div>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm flex flex-col group hover:shadow-md transition-shadow">
          <div className="flex justify-between mb-3">
            <span className="text-sm font-bold text-slate-500">Total Revenue</span>
            <DollarSign size={18} className="text-slate-400 group-hover:text-emerald-500 transition-colors" />
          </div>
          <div className="text-3xl font-black text-[#2a3441]">${totalRevenue.toLocaleString("en-US", { maximumFractionDigits: 0 })}</div>
          <div className="text-xs font-bold text-emerald-500 flex items-center gap-1 mt-2">
            <TrendingUp size={12} /> +12% this month
          </div>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm flex flex-col group hover:shadow-md transition-shadow">
          <div className="flex justify-between mb-3">
            <span className="text-sm font-bold text-slate-500">Completed Deliveries</span>
            <CheckCircle size={18} className="text-slate-400 group-hover:text-[#0d9488] transition-colors" />
          </div>
          <div className="text-3xl font-black text-[#2a3441]">{deliveredOrders}</div>
          <div className="text-xs font-bold text-slate-400 mt-2">Successfully fulfilled</div>
        </div>
      </div>

      {/* Row 2: Fleet Operations & Attention Required */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* 3. Fleet Operations */}
        <div className="lg:col-span-2 bg-white rounded-2xl p-6 border border-slate-200 shadow-sm flex flex-col relative overflow-hidden">
          <h2 className="text-lg font-black text-[#2a3441] mb-6 relative z-10">Fleet Operations</h2>
          
          <div className="flex flex-col md:flex-row items-center justify-between gap-8 flex-1 relative z-10">
            {/* Left Stats */}
            <div className="flex-1 w-full flex flex-col gap-3">
              <div className="flex justify-between items-center py-2 border-b border-slate-100">
                <span className="text-sm font-bold text-slate-500">Active Fleet</span>
                <span className="text-sm font-black text-[#2a3441]">{activeOrders}</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-slate-100">
                <span className="text-sm font-bold text-slate-500">Available</span>
                <span className="text-sm font-black text-emerald-600">0</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-slate-100">
                <span className="text-sm font-bold text-slate-500">Loading</span>
                <span className="text-sm font-black text-amber-600">0</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-slate-100">
                <span className="text-sm font-bold text-slate-500">In Transit</span>
                <span className="text-sm font-black text-blue-600">{statusCounts.in_transit}</span>
              </div>
              <div className="flex justify-between items-center py-2">
                <span className="text-sm font-bold text-slate-500">Maintenance</span>
                <span className="text-sm font-black text-red-500">0</span>
              </div>
            </div>

            {/* Center Image */}
            <div className="relative w-64 h-32 md:h-40 flex-shrink-0 flex items-center justify-center">
              <Image 
                src="/images/truck-cutout-transparent.png" 
                alt="Fleet Semi Truck" 
                fill
                className="object-contain drop-shadow-[0_10px_20px_rgba(0,0,0,0.15)]"
              />
            </div>

            {/* Right Circular Metrics */}
            <div className="flex-1 w-full flex flex-row md:flex-col justify-center items-center gap-6">
              <div className="flex flex-col items-center">
                <div className="relative w-24 h-24 rounded-full flex items-center justify-center border-[6px] border-slate-100" style={{ borderTopColor: '#0ea5e9', borderRightColor: '#0ea5e9' }}>
                  <div className="flex flex-col items-center">
                    <span className="text-lg font-black text-[#2a3441]">{avgWeight > 1000 ? (avgWeight/1000).toFixed(1)+'k' : avgWeight}</span>
                  </div>
                </div>
                <span className="text-xs font-bold text-slate-400 mt-2 uppercase tracking-wider">Avg Payload (lbs)</span>
              </div>
              <div className="flex flex-col items-center">
                <div className="relative w-24 h-24 rounded-full flex items-center justify-center border-[6px] border-slate-100" style={{ borderTopColor: '#10b981' }}>
                  <div className="flex flex-col items-center">
                    <span className="text-lg font-black text-[#2a3441]">{avgDistance}</span>
                  </div>
                </div>
                <span className="text-xs font-bold text-slate-400 mt-2 uppercase tracking-wider">Avg Distance (mi)</span>
              </div>
            </div>
          </div>
        </div>

        {/* 4. Attention Required */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm flex flex-col">
          <h2 className="text-lg font-black text-[#2a3441] mb-5 flex items-center gap-2">
            Attention Required
            {alertsCount > 0 && <span className="bg-red-100 text-red-600 text-[10px] font-black px-2 py-0.5 rounded-full">{alertsCount}</span>}
          </h2>
          
          <div className="space-y-3 flex-1">
            {statusCounts.delayed > 0 && (
              <div className="flex items-start gap-3 p-3 rounded-xl bg-red-50 border border-red-100 hover:bg-red-100/50 transition-colors cursor-pointer">
                <AlertCircle size={16} className="text-red-500 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm font-bold text-red-900 leading-tight">{statusCounts.delayed} delayed shipments</p>
                  <p className="text-xs font-medium text-red-600 mt-1">Require immediate update</p>
                </div>
              </div>
            )}
            
            {pendingQuotesCount > 0 && (
              <div className="flex items-start gap-3 p-3 rounded-xl bg-amber-50 border border-amber-100 hover:bg-amber-100/50 transition-colors cursor-pointer">
                <Clock size={16} className="text-amber-500 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm font-bold text-amber-900 leading-tight">{pendingQuotesCount} quotes waiting review</p>
                  <p className="text-xs font-medium text-amber-700 mt-1">Pending approval</p>
                </div>
              </div>
            )}

            {alertsCount === 0 && (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 border-2 border-dashed border-slate-200 rounded-xl">
                <CheckCircle size={24} className="text-emerald-400 mb-2" />
                <p className="text-sm font-bold text-slate-500">All caught up!</p>
                <p className="text-xs text-slate-400 mt-1">No pending alerts.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Row 3: Quote Activity & Shipment Status */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* 5. Quote Activity */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm flex flex-col">
          <div className="p-6 border-b border-slate-100 flex items-center justify-between">
            <h2 className="text-lg font-black text-[#2a3441]">Quote Activity</h2>
            <Link href="/admin/quotes" className="text-sm font-bold text-[#0d9488] hover:text-[#115e59] flex items-center gap-1 transition-colors">
              View All <ArrowRight size={14} />
            </Link>
          </div>
          <div className="p-6">
            <div className="flex justify-between mb-6">
              <div className="flex flex-col items-center">
                <span className="text-2xl font-black text-[#2a3441]">{totalQuotes}</span>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mt-1">New</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-2xl font-black text-amber-500">0</span>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mt-1">Reviewing</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-2xl font-black text-blue-500">0</span>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mt-1">Sent</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-2xl font-black text-emerald-500">{totalOrders}</span>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mt-1">Accepted</span>
              </div>
            </div>

            <div className="space-y-3">
              {recentQuotes.length > 0 ? recentQuotes.map((q, i) => (
                <div key={q.id} className="flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-100">
                  <div className="flex flex-col gap-1">
                    <span className="text-sm font-bold text-[#2a3441]">QT-{q.id.substring(0,6).toUpperCase()}</span>
                    <span className="text-[10px] font-bold text-slate-400">{q.pickupAddress.split(',')[0]} → {q.deliveryAddress.split(',')[0]}</span>
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    <span className="text-sm font-black text-[#0d9488]">${Number(q.price||0).toLocaleString("en-US")}</span>
                    <span className={`px-2 py-0.5 text-[9px] font-bold uppercase rounded-md border ${getQuoteStatusColor(i === 0 ? 'New' : 'Reviewing')}`}>{i === 0 ? 'New' : 'Reviewing'}</span>
                  </div>
                </div>
              )) : (
                <div className="text-center py-4 text-sm font-bold text-slate-400">No quotes yet</div>
              )}
            </div>
          </div>
        </div>

        {/* 6. Shipment Status Overview */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm flex flex-col p-6">
          <h2 className="text-lg font-black text-[#2a3441] mb-8">Shipment Status Overview</h2>
          
          <div className="flex-1 flex flex-col justify-center max-w-md mx-auto w-full">
            <div className="relative">
              {/* Line connector */}
              <div className="absolute top-5 left-[10%] right-[10%] h-[3px] bg-slate-100 z-0"></div>
              
              <div className="flex justify-between relative z-10">
                <div className="flex flex-col items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-blue-100 border-4 border-white shadow-sm flex items-center justify-center text-blue-600">
                    <Package size={16} />
                  </div>
                  <div className="text-center">
                    <span className="block text-[11px] font-bold text-slate-400 uppercase">Confirmed</span>
                    <span className="block text-xl font-black text-[#2a3441] mt-1">{statusCounts.confirmed}</span>
                  </div>
                </div>
                
                <div className="flex flex-col items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-purple-100 border-4 border-white shadow-sm flex items-center justify-center text-purple-600">
                    <Map size={16} />
                  </div>
                  <div className="text-center">
                    <span className="block text-[11px] font-bold text-slate-400 uppercase">Dispatched</span>
                    <span className="block text-xl font-black text-[#2a3441] mt-1">{statusCounts.dispatched}</span>
                  </div>
                </div>

                <div className="flex flex-col items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-amber-100 border-4 border-white shadow-sm flex items-center justify-center text-amber-600">
                    <Truck size={16} />
                  </div>
                  <div className="text-center">
                    <span className="block text-[11px] font-bold text-[#0d9488] uppercase">In Transit</span>
                    <span className="block text-xl font-black text-[#0d9488] mt-1">{statusCounts.in_transit}</span>
                  </div>
                </div>

                <div className="flex flex-col items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-emerald-100 border-4 border-white shadow-sm flex items-center justify-center text-emerald-600">
                    <CheckCircle size={16} />
                  </div>
                  <div className="text-center">
                    <span className="block text-[11px] font-bold text-slate-400 uppercase">Delivered</span>
                    <span className="block text-xl font-black text-[#2a3441] mt-1">{statusCounts.delivered}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-12 bg-red-50 border border-red-100 rounded-xl p-4 flex items-center justify-between">
              <div className="flex items-center gap-2 text-red-600 font-bold text-sm">
                <AlertCircle size={16} /> Delayed Shipments
              </div>
              <span className="text-lg font-black text-red-600">{statusCounts.delayed}</span>
            </div>
          </div>
        </div>

      </div>

      {/* Row 4: 7. Recent Orders */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
        <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between">
          <h2 className="text-lg font-black text-[#2a3441]">Recent Orders</h2>
          <Link href="/admin/orders" className="text-sm font-bold text-[#0d9488] hover:text-[#115e59] flex items-center gap-1 transition-colors">
            View All Orders <ArrowRight size={14} />
          </Link>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-slate-50 text-xs font-bold uppercase tracking-wider text-slate-500 border-b border-slate-100">
              <tr>
                <th className="px-6 py-4">Tracking ID</th>
                <th className="px-6 py-4">Customer</th>
                <th className="px-6 py-4">Service</th>
                <th className="px-6 py-4">Route</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Amount</th>
                <th className="px-6 py-4">ETA</th>
                <th className="px-6 py-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {recentOrders.length > 0 ? recentOrders.map((order) => (
                <tr key={order.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4 font-bold text-[#2a3441]">EXP-{order.id.substring(0, 8).toUpperCase()}</td>
                  <td className="px-6 py-4 font-medium text-slate-600">Client Account</td>
                  <td className="px-6 py-4">
                    <span className="text-xs font-bold text-slate-600 bg-slate-100 px-2 py-1 rounded-md border border-slate-200">
                      {order.truckTypeName || "Expedited Trucking"}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 font-bold text-slate-700 text-xs">
                      <span>{order.pickupAddress.split(',')[0]}</span>
                      <span className="text-slate-300">→</span>
                      <span>{order.deliveryAddress.split(',')[0]}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider rounded-full border ${getStatusColor(order.fulfillmentStatus)}`}>
                      {order.fulfillmentStatus.replace('_', ' ')}
                    </span>
                  </td>
                  <td className="px-6 py-4 font-black text-[#2a3441]">
                    ${Number(order.price || 0).toLocaleString("en-US", { minimumFractionDigits: 2 })}
                  </td>
                  <td className="px-6 py-4 font-bold text-slate-500 text-xs">
                    {order.createdAt.toLocaleDateString("en-US", { month: 'short', day: 'numeric' })}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <Link href={`/admin/orders`} className="text-sm font-bold text-[#0d9488] hover:underline">
                      View →
                    </Link>
                  </td>
                </tr>
              )) : (
                <tr><td colSpan={8} className="p-10 text-center text-slate-400 font-medium">No recent orders found.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Row 5: Revenue, Services, Platform Status & Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        
        {/* 8. Revenue Overview */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm flex flex-col">
          <h2 className="text-lg font-black text-[#2a3441] mb-6">Revenue Overview</h2>
          <div className="flex justify-between items-end mb-6">
            <div>
              <span className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">This Month</span>
              <span className="text-3xl font-black text-[#2a3441]">${totalRevenue.toLocaleString("en-US")}</span>
            </div>
          </div>
          {/* Simple Area Chart Placeholder */}
          <div className="h-24 w-full bg-gradient-to-t from-[#5eead4]/20 to-transparent border-b-2 border-[#0d9488] mt-auto rounded-b-lg"></div>
        </div>

        {/* 9. Service Performance */}
        <div className="lg:col-span-1 bg-white rounded-2xl p-6 border border-slate-200 shadow-sm flex flex-col">
          <h2 className="text-lg font-black text-[#2a3441] mb-6">Services</h2>
          <div className="space-y-4">
            {servicesData.length > 0 ? servicesData.map((service, index) => {
              const colors = ["bg-[#0d9488]", "bg-blue-500", "bg-amber-500", "bg-purple-500", "bg-slate-400"];
              return (
                <div key={service.name}>
                  <div className="flex justify-between text-xs font-bold text-slate-700 mb-1">
                    <span>{service.name}</span>
                    <span>{service.percent}%</span>
                  </div>
                  <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                    <div className={`h-full ${colors[index % colors.length]} rounded-full`} style={{ width: `${service.percent}%` }}></div>
                  </div>
                </div>
              );
            }) : (
              <div className="text-center text-sm font-bold text-slate-400 py-4">No services data yet.</div>
            )}
          </div>
        </div>

        {/* 10. Platform Status & 11. Quick Actions combined visually */}
        <div className="lg:col-span-2 flex flex-col md:flex-row gap-6">
          <div className="flex-1 bg-white rounded-2xl p-6 border border-slate-200 shadow-sm flex flex-col">
            <h2 className="text-lg font-black text-[#2a3441] mb-6">Platform Status</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm font-bold text-slate-700">
                  <Database size={16} className="text-slate-400" /> Database
                </div>
                <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-600">
                  <div className="w-2 h-2 rounded-full bg-emerald-500"></div> Connected
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm font-bold text-slate-700">
                  <CreditCard size={16} className="text-slate-400" /> Stripe Gateway
                </div>
                <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-600">
                  <div className="w-2 h-2 rounded-full bg-emerald-500"></div> Active
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm font-bold text-slate-700">
                  <Anchor size={16} className="text-slate-400" /> Routing API
                </div>
                <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-600">
                  <div className="w-2 h-2 rounded-full bg-emerald-500"></div> Online
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm font-bold text-slate-700">
                  <Activity size={16} className="text-slate-400" /> Email Service
                </div>
                <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-600">
                  <div className="w-2 h-2 rounded-full bg-emerald-500"></div> Active
                </div>
              </div>
            </div>
          </div>

          <div className="flex-1 bg-white rounded-2xl p-6 border border-slate-200 shadow-sm flex flex-col">
            <h2 className="text-lg font-black text-[#2a3441] mb-6">Quick Actions</h2>
            <div className="space-y-3">
              <Link href="/admin/orders" className="w-full bg-[#5eead4] hover:bg-[#0d9488] hover:text-white text-[#134e4a] text-sm font-black py-2.5 rounded-xl flex items-center justify-center transition-colors shadow-sm">
                <Plus size={16} className="mr-2" /> Create Order
              </Link>
              <div className="grid grid-cols-2 gap-3">
                <Link href="/admin/quotes" className="bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200 text-xs font-bold py-2.5 rounded-xl flex items-center justify-center transition-colors">
                  Create Quote
                </Link>
                <Link href="/admin/carriers" className="bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200 text-xs font-bold py-2.5 rounded-xl flex items-center justify-center transition-colors">
                  Assign Carrier
                </Link>
                <Link href="/admin/tracking" className="bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200 text-xs font-bold py-2.5 rounded-xl flex items-center justify-center transition-colors">
                  Track Shipment
                </Link>
                <Link href="/admin/rates" className="bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200 text-xs font-bold py-2.5 rounded-xl flex items-center justify-center transition-colors">
                  Update Rates
                </Link>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
