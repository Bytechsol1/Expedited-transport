"use client";

import { useState } from "react";
import { 
  Package, Truck, CheckCircle, Clock, Map, AlertCircle, 
  Search, Filter, X, ChevronRight, Navigation, MapPin
} from "lucide-react";
import Image from "next/image";

type ShipmentStatus = "Pending" | "Picked Up" | "In Transit" | "Out for Delivery" | "Delivered" | "Delayed" | string;

export interface Shipment {
  id: string;
  rawId: string;
  customer: string;
  origin: string;
  destination: string;
  status: ShipmentStatus;
  currentLocation: string;
  eta: string;
  activity: { label: string; date: string; location: string; completed: boolean }[];
}

const getStatusColor = (status: ShipmentStatus) => {
  switch (status) {
    case "Pending": return "bg-slate-100 text-slate-700 border-slate-200";
    case "Picked Up": return "bg-blue-100 text-blue-700 border-blue-200";
    case "In Transit": return "bg-[#5eead4]/20 text-[#0d9488] border-[#5eead4]/50";
    case "Out for Delivery": return "bg-lime-100 text-lime-700 border-lime-200";
    case "Delivered": return "bg-emerald-100 text-emerald-700 border-emerald-200";
    case "Delayed": return "bg-red-100 text-red-700 border-red-200";
    default: return "bg-slate-100 text-slate-700 border-slate-200";
  }
};

const getStatusIcon = (status: ShipmentStatus) => {
  switch (status) {
    case "Pending": return <Clock size={14} />;
    case "Picked Up": return <Package size={14} />;
    case "In Transit": return <Truck size={14} />;
    case "Out for Delivery": return <Navigation size={14} />;
    case "Delivered": return <CheckCircle size={14} />;
    case "Delayed": return <AlertCircle size={14} />;
    default: return <Clock size={14} />;
  }
};

export function TrackingManager({ initialShipments = [] }: { initialShipments?: Shipment[] }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeFilter, setActiveFilter] = useState<ShipmentStatus | "All Statuses">("All Statuses");
  const [selectedShipment, setSelectedShipment] = useState<Shipment | null>(null);

  const filteredShipments = initialShipments.filter(s => {
    const matchesSearch = s.id.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          s.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          s.destination.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = activeFilter === "All Statuses" || s.status === activeFilter;
    return matchesSearch && matchesFilter;
  });

  const stats = {
    total: initialShipments.length,
    inTransit: initialShipments.filter(s => s.status === "In Transit").length,
    outForDelivery: initialShipments.filter(s => s.status === "Out for Delivery").length,
    delivered: initialShipments.filter(s => s.status === "Delivered").length,
  };

  return (
    <div className="space-y-8 pb-10">
      
      {/* Header */}
      <div>
        <h1 className="text-2xl font-black text-[#2a3441] tracking-tight mb-1">Tracking</h1>
        <p className="text-sm font-medium text-slate-500">Monitor and manage all active shipments</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm flex flex-col group hover:shadow-md transition-shadow">
          <div className="flex justify-between mb-3">
            <span className="text-sm font-bold text-slate-500">Total Shipments</span>
            <Package size={18} className="text-slate-400 group-hover:text-[#0d9488] transition-colors" />
          </div>
          <div className="text-3xl font-black text-[#2a3441]">{stats.total}</div>
        </div>
        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm flex flex-col group hover:border-[#5eead4] hover:shadow-md transition-all relative overflow-hidden">
          <div className="flex justify-between mb-3 relative z-10">
            <span className="text-sm font-bold text-slate-500 group-hover:text-[#0d9488] transition-colors">In Transit</span>
            <Truck size={18} className="text-[#0d9488]" />
          </div>
          <div className="text-3xl font-black text-[#0d9488] relative z-10">{stats.inTransit}</div>
          <div className="absolute -bottom-4 -right-4 w-16 h-16 bg-[#5eead4]/10 rounded-full blur-xl group-hover:bg-[#5eead4]/20 transition-all"></div>
        </div>
        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm flex flex-col group hover:shadow-md transition-shadow">
          <div className="flex justify-between mb-3">
            <span className="text-sm font-bold text-slate-500">Out for Delivery</span>
            <Navigation size={18} className="text-slate-400 group-hover:text-lime-500 transition-colors" />
          </div>
          <div className="text-3xl font-black text-[#2a3441]">{stats.outForDelivery}</div>
        </div>
        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm flex flex-col group hover:shadow-md transition-shadow">
          <div className="flex justify-between mb-3">
            <span className="text-sm font-bold text-slate-500">Delivered</span>
            <CheckCircle size={18} className="text-slate-400 group-hover:text-emerald-500 transition-colors" />
          </div>
          <div className="text-3xl font-black text-[#2a3441]">{stats.delivered}</div>
        </div>
      </div>

      {/* Search & Filters */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
        <h2 className="text-lg font-black text-[#2a3441] mb-5">Shipment Tracking</h2>
        
        <div className="flex flex-col lg:flex-row gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text" 
              placeholder="Search by tracking number, customer or destination" 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 text-slate-800 text-sm font-bold rounded-xl pl-11 pr-4 py-3 outline-none focus:border-[#0d9488] focus:ring-1 focus:ring-[#0d9488] transition-all"
            />
          </div>
          <div className="flex gap-3">
            <select className="bg-slate-50 border border-slate-200 text-slate-600 text-sm font-bold rounded-xl px-4 py-3 outline-none focus:border-[#0d9488] focus:ring-1 focus:ring-[#0d9488] transition-all cursor-pointer">
              <option>Any Date</option>
              <option>Today</option>
              <option>This Week</option>
            </select>
            <select className="bg-slate-50 border border-slate-200 text-slate-600 text-sm font-bold rounded-xl px-4 py-3 outline-none focus:border-[#0d9488] focus:ring-1 focus:ring-[#0d9488] transition-all cursor-pointer">
              <option>All Origins</option>
            </select>
            <select className="bg-slate-50 border border-slate-200 text-slate-600 text-sm font-bold rounded-xl px-4 py-3 outline-none focus:border-[#0d9488] focus:ring-1 focus:ring-[#0d9488] transition-all cursor-pointer">
              <option>All Destinations</option>
            </select>
            <button 
              onClick={() => { setSearchTerm(""); setActiveFilter("All Statuses"); }}
              className="bg-slate-100 hover:bg-slate-200 text-slate-600 text-sm font-bold rounded-xl px-6 py-3 transition-colors"
            >
              Reset Filters
            </button>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap gap-2">
          {["All Statuses", "Pending", "Picked Up", "In Transit", "Out for Delivery", "Delivered", "Delayed"].map(status => (
            <button
              key={status}
              onClick={() => setActiveFilter(status as ShipmentStatus | "All Statuses")}
              className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all border ${
                activeFilter === status 
                  ? 'bg-[#2a3441] text-white border-[#2a3441] shadow-md' 
                  : 'bg-white text-slate-500 border-slate-200 hover:border-slate-300 hover:bg-slate-50'
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      {/* Shipment Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-[#2a3441] text-xs font-black uppercase tracking-wider text-slate-300">
              <tr>
                <th className="px-6 py-4">Tracking Number</th>
                <th className="px-6 py-4">Customer</th>
                <th className="px-6 py-4">Origin</th>
                <th className="px-6 py-4">Destination</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Current Location</th>
                <th className="px-6 py-4">ETA</th>
                <th className="px-6 py-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredShipments.length > 0 ? filteredShipments.map((shipment) => (
                <tr key={shipment.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4 font-black text-[#2a3441]">{shipment.id}</td>
                  <td className="px-6 py-4 font-bold text-slate-600">{shipment.customer}</td>
                  <td className="px-6 py-4 font-bold text-slate-500">{shipment.origin}</td>
                  <td className="px-6 py-4 font-bold text-slate-500">{shipment.destination}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-[10px] font-black uppercase tracking-wider rounded-md border ${getStatusColor(shipment.status)}`}>
                      {getStatusIcon(shipment.status)} {shipment.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 font-bold text-slate-500">
                    <div className="flex items-center gap-1.5">
                      <MapPin size={14} className="text-[#0d9488]" />
                      {shipment.currentLocation}
                    </div>
                  </td>
                  <td className="px-6 py-4 font-black text-slate-700">{shipment.eta}</td>
                  <td className="px-6 py-4 text-right">
                    <button 
                      onClick={() => setSelectedShipment(shipment)}
                      className="text-xs font-black text-[#0d9488] hover:text-white bg-[#5eead4]/20 hover:bg-[#0d9488] px-3 py-1.5 rounded-md transition-colors"
                    >
                      View Details
                    </button>
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan={8} className="p-10 text-center text-slate-400 font-bold">No shipments found matching your search.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Side Panel / Modal */}
      {selectedShipment && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <div className="absolute inset-0 bg-slate-900/20 backdrop-blur-sm" onClick={() => setSelectedShipment(null)}></div>
          
          <div className="relative w-full max-w-lg bg-white h-full shadow-2xl flex flex-col border-l border-slate-200 transform transition-transform overflow-hidden animate-in slide-in-from-right duration-200">
            {/* Modal Header */}
            <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between bg-[#f8fafc]">
              <div>
                <h3 className="text-xl font-black text-[#2a3441] tracking-tight">{selectedShipment.id}</h3>
                <p className="text-xs font-bold text-slate-400 mt-1">Customer: <span className="text-slate-600">{selectedShipment.customer}</span></p>
              </div>
              <button onClick={() => setSelectedShipment(null)} className="w-8 h-8 flex items-center justify-center rounded-full bg-slate-200 text-slate-500 hover:bg-slate-300 hover:text-slate-800 transition-colors">
                <X size={18} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-8 custom-scrollbar">
              
              {/* Map Placeholder */}
              <div>
                <h4 className="text-sm font-black text-[#2a3441] mb-3">Live Route</h4>
                <div className="w-full h-48 bg-slate-100 rounded-xl border border-slate-200 relative overflow-hidden flex flex-col items-center justify-center p-4">
                  <Map size={48} className="text-slate-300 mb-2" />
                  <div className="flex items-center justify-between w-full mt-4 relative z-10 px-4">
                    <div className="flex flex-col items-center">
                      <div className="w-3 h-3 rounded-full bg-slate-800 ring-4 ring-slate-200"></div>
                      <span className="text-[10px] font-bold text-slate-500 mt-1 text-center w-16">{selectedShipment.origin}</span>
                    </div>
                    <div className="flex-1 h-[2px] bg-slate-300 mx-2 relative">
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-white border border-[#0d9488] rounded-full flex items-center justify-center shadow-md">
                        <Truck size={14} className="text-[#0d9488]" />
                      </div>
                    </div>
                    <div className="flex flex-col items-center">
                      <div className="w-3 h-3 rounded-full bg-[#0d9488] ring-4 ring-[#5eead4]/30"></div>
                      <span className="text-[10px] font-bold text-slate-500 mt-1 text-center w-16">{selectedShipment.destination}</span>
                    </div>
                  </div>
                  {/* Decorative map lines */}
                  <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '16px 16px' }}></div>
                </div>
              </div>

              {/* Status Info */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-slate-50 rounded-xl p-4 border border-slate-100">
                  <span className="block text-[10px] font-black text-slate-400 uppercase tracking-wider mb-1">Current Status</span>
                  <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-[10px] font-black uppercase tracking-wider rounded-md border ${getStatusColor(selectedShipment.status)}`}>
                    {getStatusIcon(selectedShipment.status)} {selectedShipment.status}
                  </span>
                </div>
                <div className="bg-slate-50 rounded-xl p-4 border border-slate-100">
                  <span className="block text-[10px] font-black text-slate-400 uppercase tracking-wider mb-1">Estimated Delivery</span>
                  <span className="text-sm font-black text-[#2a3441]">{selectedShipment.eta}</span>
                </div>
              </div>

              {/* Timeline */}
              <div>
                <h4 className="text-sm font-black text-[#2a3441] mb-4">Tracking Activity</h4>
                <div className="relative border-l-2 border-slate-100 ml-3 space-y-6">
                  {selectedShipment.activity.map((event, index) => (
                    <div key={index} className="relative pl-6">
                      <div className={`absolute -left-[9px] top-1 w-4 h-4 rounded-full border-2 flex items-center justify-center bg-white ${event.completed ? 'border-[#0d9488]' : 'border-slate-300'}`}>
                        {event.completed && <div className="w-1.5 h-1.5 rounded-full bg-[#0d9488]"></div>}
                      </div>
                      <div>
                        <p className={`text-sm font-bold ${event.completed ? 'text-[#2a3441]' : 'text-slate-400'}`}>{event.label}</p>
                        <div className="flex items-center gap-3 mt-1">
                          <span className="text-xs font-bold text-slate-400 flex items-center gap-1">
                            <Clock size={12} /> {event.date}
                          </span>
                          <span className="text-xs font-bold text-slate-400 flex items-center gap-1">
                            <MapPin size={12} /> {event.location}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>
        </div>
      )}
      
      <style dangerouslySetInnerHTML={{ __html: `
        .custom-scrollbar::-webkit-scrollbar { width: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background-color: #cbd5e1; border-radius: 10px; }
      `}} />
    </div>
  );
}
