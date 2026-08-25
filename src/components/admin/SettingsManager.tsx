"use client";

import { useState } from "react";
import {
  Building2, User, Bell, Shield, Truck, CreditCard,
  Settings as SettingsIcon, Save, Upload, CheckCircle,
  Smartphone, Monitor, ChevronDown, type LucideIcon
} from "lucide-react";
import Image from "next/image";

type SettingsTab = "General" | "Company Information" | "Profile" | "Notifications" | "Security" | "Shipping Preferences" | "Payment Settings";

const TABS: { id: SettingsTab; icon: LucideIcon; label: string }[] = [
  { id: "General", icon: SettingsIcon, label: "General" },
  { id: "Company Information", icon: Building2, label: "Company Information" },
  { id: "Profile", icon: User, label: "Profile" },
  { id: "Notifications", icon: Bell, label: "Notifications" },
  { id: "Security", icon: Shield, label: "Security" },
  { id: "Shipping Preferences", icon: Truck, label: "Shipping Preferences" },
  { id: "Payment Settings", icon: CreditCard, label: "Payment Settings" },
];

export function SettingsManager() {
  const [activeTab, setActiveTab] = useState<SettingsTab>("General");
  const [isSaving, setIsSaving] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Form State Placeholders
  const [general, setGeneral] = useState({
    companyName: "Expedited Transport",
    businessEmail: "admin@expedited.com",
    phone: "+1 (800) 555-0147",
    website: "www.expedited.com",
    timezone: "America/New_York",
    currency: "USD ($)"
  });

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    }, 1200);
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case "General":
        return (
          <div className="space-y-6 animate-in fade-in duration-300">
            <div>
              <h2 className="text-xl font-black text-[#2a3441] mb-1">General Settings</h2>
              <p className="text-sm font-medium text-slate-500 mb-6">Manage basic system configuration and defaults.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-600 uppercase tracking-wider">Company Name</label>
                <input type="text" value={general.companyName} onChange={e => setGeneral({...general, companyName: e.target.value})} className="w-full bg-slate-50 border border-slate-200 text-slate-800 text-sm font-bold rounded-xl px-4 py-3 outline-none focus:border-[#0d9488] focus:ring-1 focus:ring-[#0d9488] transition-all" />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-600 uppercase tracking-wider">Business Email</label>
                <input type="email" value={general.businessEmail} onChange={e => setGeneral({...general, businessEmail: e.target.value})} className="w-full bg-slate-50 border border-slate-200 text-slate-800 text-sm font-bold rounded-xl px-4 py-3 outline-none focus:border-[#0d9488] focus:ring-1 focus:ring-[#0d9488] transition-all" />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-600 uppercase tracking-wider">Phone Number</label>
                <input type="text" value={general.phone} onChange={e => setGeneral({...general, phone: e.target.value})} className="w-full bg-slate-50 border border-slate-200 text-slate-800 text-sm font-bold rounded-xl px-4 py-3 outline-none focus:border-[#0d9488] focus:ring-1 focus:ring-[#0d9488] transition-all" />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-600 uppercase tracking-wider">Website</label>
                <input type="text" value={general.website} onChange={e => setGeneral({...general, website: e.target.value})} className="w-full bg-slate-50 border border-slate-200 text-slate-800 text-sm font-bold rounded-xl px-4 py-3 outline-none focus:border-[#0d9488] focus:ring-1 focus:ring-[#0d9488] transition-all" />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-600 uppercase tracking-wider">Time Zone</label>
                <select value={general.timezone} onChange={e => setGeneral({...general, timezone: e.target.value})} className="w-full bg-slate-50 border border-slate-200 text-slate-800 text-sm font-bold rounded-xl px-4 py-3 outline-none focus:border-[#0d9488] focus:ring-1 focus:ring-[#0d9488] transition-all">
                  <option>America/New_York</option>
                  <option>America/Chicago</option>
                  <option>America/Denver</option>
                  <option>America/Los_Angeles</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-600 uppercase tracking-wider">Currency</label>
                <select value={general.currency} onChange={e => setGeneral({...general, currency: e.target.value})} className="w-full bg-slate-50 border border-slate-200 text-slate-800 text-sm font-bold rounded-xl px-4 py-3 outline-none focus:border-[#0d9488] focus:ring-1 focus:ring-[#0d9488] transition-all">
                  <option>USD ($)</option>
                  <option>CAD ($)</option>
                  <option>EUR (€)</option>
                </select>
              </div>
            </div>
          </div>
        );
      
      case "Company Information":
        return (
          <div className="space-y-6 animate-in fade-in duration-300">
            <div>
              <h2 className="text-xl font-black text-[#2a3441] mb-1">Company Information</h2>
              <p className="text-sm font-medium text-slate-500 mb-6">Official business details and branding.</p>
            </div>
            
            <div className="flex flex-col md:flex-row gap-8 mb-8">
              <div className="w-32 h-32 rounded-2xl bg-slate-100 border-2 border-dashed border-slate-300 flex items-center justify-center flex-shrink-0 relative overflow-hidden group">
                <div className="w-16 h-16 bg-[#2a3441] rounded-xl flex items-center justify-center shadow-lg">
                  <Image src="/ex-logo.svg" alt="Company Logo" width={32} height={32} style={{ filter: "brightness(0) invert(1)" }} />
                </div>
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity cursor-pointer">
                  <Upload className="text-white" size={24} />
                </div>
              </div>
              <div className="flex-1 flex flex-col justify-center">
                <h4 className="text-sm font-bold text-slate-800">Company Logo</h4>
                <p className="text-xs font-medium text-slate-500 mt-1 mb-4">Recommended size: 256x256px. PNG or SVG format.</p>
                <button className="bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold px-4 py-2 rounded-lg transition-colors w-max flex items-center gap-2">
                  <Upload size={14} /> Upload New Logo
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-600 uppercase tracking-wider">Company Name</label>
                <input type="text" defaultValue="Expedited Transport Services LLC" className="w-full bg-slate-50 border border-slate-200 text-slate-800 text-sm font-bold rounded-xl px-4 py-3 outline-none focus:border-[#0d9488]" />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-600 uppercase tracking-wider">Registration Number</label>
                <input type="text" defaultValue="REG-9938120" className="w-full bg-slate-50 border border-slate-200 text-slate-800 text-sm font-bold rounded-xl px-4 py-3 outline-none focus:border-[#0d9488]" />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-600 uppercase tracking-wider">Tax ID (EIN)</label>
                <input type="text" defaultValue="XX-XXXXXXX" className="w-full bg-slate-50 border border-slate-200 text-slate-800 text-sm font-bold rounded-xl px-4 py-3 outline-none focus:border-[#0d9488]" />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-600 uppercase tracking-wider">Business Address</label>
                <input type="text" defaultValue="123 Logistics Way, Suite 400" className="w-full bg-slate-50 border border-slate-200 text-slate-800 text-sm font-bold rounded-xl px-4 py-3 outline-none focus:border-[#0d9488]" />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-600 uppercase tracking-wider">City</label>
                <input type="text" defaultValue="Chicago" className="w-full bg-slate-50 border border-slate-200 text-slate-800 text-sm font-bold rounded-xl px-4 py-3 outline-none focus:border-[#0d9488]" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-600 uppercase tracking-wider">State</label>
                  <input type="text" defaultValue="IL" className="w-full bg-slate-50 border border-slate-200 text-slate-800 text-sm font-bold rounded-xl px-4 py-3 outline-none focus:border-[#0d9488]" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-600 uppercase tracking-wider">ZIP Code</label>
                  <input type="text" defaultValue="60601" className="w-full bg-slate-50 border border-slate-200 text-slate-800 text-sm font-bold rounded-xl px-4 py-3 outline-none focus:border-[#0d9488]" />
                </div>
              </div>
            </div>
          </div>
        );

      case "Profile":
        return (
          <div className="space-y-6 animate-in fade-in duration-300">
            <div>
              <h2 className="text-xl font-black text-[#2a3441] mb-1">Admin Profile</h2>
              <p className="text-sm font-medium text-slate-500 mb-6">Manage your personal admin account details.</p>
            </div>
            
            <div className="flex gap-6 mb-8 items-center">
              <div className="w-20 h-20 rounded-full bg-[#5eead4] flex items-center justify-center text-[#1e293b] text-3xl font-black shadow-md">
                A
              </div>
              <div>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 text-[10px] font-black uppercase tracking-wider rounded-md border bg-slate-100 text-slate-700 border-slate-200 mb-2">
                  System Owner
                </span>
                <p className="text-sm font-medium text-slate-500">You have full administrative privileges.</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-600 uppercase tracking-wider">First Name</label>
                <input type="text" defaultValue="Admin" className="w-full bg-slate-50 border border-slate-200 text-slate-800 text-sm font-bold rounded-xl px-4 py-3 outline-none focus:border-[#0d9488]" />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-600 uppercase tracking-wider">Last Name</label>
                <input type="text" defaultValue="User" className="w-full bg-slate-50 border border-slate-200 text-slate-800 text-sm font-bold rounded-xl px-4 py-3 outline-none focus:border-[#0d9488]" />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-600 uppercase tracking-wider">Email Address</label>
                <input type="email" defaultValue="admin@expedited.com" className="w-full bg-slate-50 border border-slate-200 text-slate-800 text-sm font-bold rounded-xl px-4 py-3 outline-none focus:border-[#0d9488]" />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-600 uppercase tracking-wider">Phone</label>
                <input type="text" defaultValue="+1 (555) 000-0000" className="w-full bg-slate-50 border border-slate-200 text-slate-800 text-sm font-bold rounded-xl px-4 py-3 outline-none focus:border-[#0d9488]" />
              </div>
            </div>
            
            <button className="bg-[#2a3441] text-white text-sm font-bold rounded-xl px-6 py-3 hover:bg-[#374151] transition-colors w-max">
              Update Profile
            </button>
          </div>
        );

      case "Notifications":
        const toggles = [
          { title: "New Order Notifications", desc: "Receive an alert when a new quote or order is placed." },
          { title: "Shipment Updates", desc: "Get notified when a shipment changes status." },
          { title: "Delivery Notifications", desc: "Instant alerts upon successful delivery." },
          { title: "Payment Notifications", desc: "Alerts for successful or failed payments." },
          { title: "System Alerts", desc: "Crucial system updates and maintenance notices." },
          { title: "Email Notifications", desc: "Receive summary reports and alerts via email." },
          { title: "SMS Notifications", desc: "Get critical time-sensitive alerts via SMS." },
        ];
        return (
          <div className="space-y-6 animate-in fade-in duration-300">
            <div>
              <h2 className="text-xl font-black text-[#2a3441] mb-1">Notification Preferences</h2>
              <p className="text-sm font-medium text-slate-500 mb-6">Choose what events you want to be notified about.</p>
            </div>
            <div className="space-y-4">
              {toggles.map((t, i) => (
                <div key={i} className="flex items-center justify-between p-4 rounded-xl border border-slate-100 bg-slate-50/50">
                  <div>
                    <h4 className="text-sm font-bold text-slate-800">{t.title}</h4>
                    <p className="text-xs font-medium text-slate-500 mt-0.5">{t.desc}</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" defaultChecked={i < 5} />
                    <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#0d9488]"></div>
                  </label>
                </div>
              ))}
            </div>
          </div>
        );

      case "Security":
        return (
          <div className="space-y-8 animate-in fade-in duration-300">
            <div>
              <h2 className="text-xl font-black text-[#2a3441] mb-1">Security Settings</h2>
              <p className="text-sm font-medium text-slate-500 mb-6">Manage password and account security.</p>
            </div>
            
            <div className="p-6 rounded-2xl border border-slate-100 bg-slate-50">
              <h3 className="text-sm font-bold text-slate-800 mb-4">Change Password</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="space-y-2 md:col-span-2">
                  <label className="text-xs font-bold text-slate-600 uppercase tracking-wider">Current Password</label>
                  <input type="password" placeholder="••••••••" className="w-full bg-white border border-slate-200 text-slate-800 text-sm font-bold rounded-xl px-4 py-3 outline-none focus:border-[#0d9488]" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-600 uppercase tracking-wider">New Password</label>
                  <input type="password" placeholder="••••••••" className="w-full bg-white border border-slate-200 text-slate-800 text-sm font-bold rounded-xl px-4 py-3 outline-none focus:border-[#0d9488]" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-600 uppercase tracking-wider">Confirm Password</label>
                  <input type="password" placeholder="••••••••" className="w-full bg-white border border-slate-200 text-slate-800 text-sm font-bold rounded-xl px-4 py-3 outline-none focus:border-[#0d9488]" />
                </div>
              </div>
              <button className="bg-[#2a3441] text-white text-sm font-bold rounded-xl px-6 py-3 hover:bg-[#374151] transition-colors w-max">
                Update Password
              </button>
            </div>

            <div className="p-6 rounded-2xl border border-slate-100 bg-slate-50 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h3 className="text-sm font-bold text-slate-800 mb-1">Two-Factor Authentication</h3>
                <p className="text-xs font-medium text-slate-500">Add an extra layer of security to your account.</p>
                <div className="mt-3 inline-flex items-center gap-1.5 px-2.5 py-1 text-[10px] font-black uppercase tracking-wider rounded-md border bg-slate-100 text-slate-500 border-slate-200">
                  Currently Disabled
                </div>
              </div>
              <button className="bg-[#0d9488] text-white text-sm font-bold rounded-xl px-6 py-3 hover:bg-[#0f766e] transition-colors w-max">
                Enable 2FA
              </button>
            </div>

            <div>
              <h3 className="text-sm font-bold text-slate-800 mb-4">Active Sessions</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-4 rounded-xl border border-slate-100 bg-white">
                  <div className="flex items-center gap-3">
                    <Monitor size={20} className="text-emerald-500" />
                    <div>
                      <p className="text-sm font-bold text-slate-800">Windows 11 • Chrome</p>
                      <p className="text-xs font-medium text-slate-500">Current Session • IP: 192.168.1.1</p>
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between p-4 rounded-xl border border-slate-100 bg-white opacity-60">
                  <div className="flex items-center gap-3">
                    <Smartphone size={20} className="text-slate-400" />
                    <div>
                      <p className="text-sm font-bold text-slate-800">iPhone 14 Pro • Safari</p>
                      <p className="text-xs font-medium text-slate-500">Last active 2 days ago • IP: 10.0.0.4</p>
                    </div>
                  </div>
                  <button className="text-xs font-bold text-red-500 hover:underline">Revoke</button>
                </div>
              </div>
            </div>
          </div>
        );

      case "Shipping Preferences":
        return (
          <div className="space-y-6 animate-in fade-in duration-300">
            <div>
              <h2 className="text-xl font-black text-[#2a3441] mb-1">Shipping Preferences</h2>
              <p className="text-sm font-medium text-slate-500 mb-6">Configure defaults for orders and fleet management.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-600 uppercase tracking-wider">Default Service Type</label>
                <select className="w-full bg-slate-50 border border-slate-200 text-slate-800 text-sm font-bold rounded-xl px-4 py-3 outline-none focus:border-[#0d9488]">
                  <option>Expedited Trucking</option>
                  <option>LTL Trucking</option>
                  <option>Freight Shipping</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-600 uppercase tracking-wider">Weight Unit</label>
                <select className="w-full bg-slate-50 border border-slate-200 text-slate-800 text-sm font-bold rounded-xl px-4 py-3 outline-none focus:border-[#0d9488]">
                  <option>Pounds (lbs)</option>
                  <option>Kilograms (kg)</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-600 uppercase tracking-wider">Default Pickup Time</label>
                <input type="time" defaultValue="09:00" className="w-full bg-slate-50 border border-slate-200 text-slate-800 text-sm font-bold rounded-xl px-4 py-3 outline-none focus:border-[#0d9488]" />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-600 uppercase tracking-wider">Default Delivery Time</label>
                <input type="time" defaultValue="17:00" className="w-full bg-slate-50 border border-slate-200 text-slate-800 text-sm font-bold rounded-xl px-4 py-3 outline-none focus:border-[#0d9488]" />
              </div>
              <div className="space-y-2 md:col-span-2">
                <label className="text-xs font-bold text-slate-600 uppercase tracking-wider">Distance Unit</label>
                <select className="w-full md:w-1/2 bg-slate-50 border border-slate-200 text-slate-800 text-sm font-bold rounded-xl px-4 py-3 outline-none focus:border-[#0d9488]">
                  <option>Miles (mi)</option>
                  <option>Kilometers (km)</option>
                </select>
              </div>
            </div>

            <div className="space-y-4 pt-4 border-t border-slate-100">
              <h3 className="text-sm font-bold text-slate-800 mb-4">Automation Toggles</h3>
              {[
                { title: "Automatic Tracking Updates", desc: "Automatically sync HERE Maps location with customer dashboard." },
                { title: "Delivery Confirmation", desc: "Require carrier to upload POD (Proof of Delivery)." },
                { title: "Signature Required", desc: "Set signature requirement as default for all high-value loads." }
              ].map((t, i) => (
                <div key={i} className="flex items-center justify-between p-4 rounded-xl border border-slate-100 bg-slate-50/50">
                  <div>
                    <h4 className="text-sm font-bold text-slate-800">{t.title}</h4>
                    <p className="text-xs font-medium text-slate-500 mt-0.5">{t.desc}</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" defaultChecked={i < 2} />
                    <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#0d9488]"></div>
                  </label>
                </div>
              ))}
            </div>
          </div>
        );

      case "Payment Settings":
        return (
          <div className="space-y-6 animate-in fade-in duration-300">
            <div>
              <h2 className="text-xl font-black text-[#2a3441] mb-1">Payment Settings</h2>
              <p className="text-sm font-medium text-slate-500 mb-6">Manage how you accept and process payments.</p>
            </div>
            
            <div>
              <h3 className="text-sm font-bold text-slate-800 mb-4">Payment Methods</h3>
              <div className="space-y-3 mb-8">
                {["Credit / Debit Card", "Bank Transfer", "PayPal"].map((method, i) => (
                  <div key={i} className={`flex items-center justify-between p-4 rounded-xl border ${i === 0 ? 'border-[#0d9488] bg-[#5eead4]/5' : 'border-slate-200 bg-white'}`}>
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${i === 0 ? 'bg-[#0d9488] text-white' : 'bg-slate-100 text-slate-500'}`}>
                        <CreditCard size={18} />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-slate-800">{method}</p>
                        <p className="text-xs font-medium text-slate-500">{i === 0 ? "Stripe Gateway Connected" : "Not configured"}</p>
                      </div>
                    </div>
                    {i === 0 ? (
                      <span className="text-xs font-bold text-[#0d9488] bg-[#5eead4]/20 px-3 py-1 rounded-full">Active</span>
                    ) : (
                      <button className="text-xs font-bold text-slate-500 hover:text-[#0d9488] transition-colors">Configure</button>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t border-slate-100">
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-600 uppercase tracking-wider">Currency</label>
                <select className="w-full bg-slate-50 border border-slate-200 text-slate-800 text-sm font-bold rounded-xl px-4 py-3 outline-none focus:border-[#0d9488]">
                  <option>USD - US Dollar</option>
                  <option>CAD - Canadian Dollar</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-600 uppercase tracking-wider">Payment Terms</label>
                <select className="w-full bg-slate-50 border border-slate-200 text-slate-800 text-sm font-bold rounded-xl px-4 py-3 outline-none focus:border-[#0d9488]">
                  <option>Due on Receipt</option>
                  <option>Net 15</option>
                  <option>Net 30</option>
                </select>
              </div>
              <div className="space-y-2 md:col-span-2">
                <label className="text-xs font-bold text-slate-600 uppercase tracking-wider">Invoice Prefix</label>
                <input type="text" defaultValue="EXP-" className="w-full md:w-1/2 bg-slate-50 border border-slate-200 text-slate-800 text-sm font-bold rounded-xl px-4 py-3 outline-none focus:border-[#0d9488]" />
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="space-y-8 pb-10">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-[#2a3441] tracking-tight mb-1">Settings</h1>
          <p className="text-sm font-medium text-slate-500">Manage your account, company and system preferences.</p>
        </div>
        
        {/* Success message popup (top right) */}
        {showSuccess && (
          <div className="bg-emerald-50 border border-emerald-200 text-emerald-700 px-4 py-2.5 rounded-xl text-sm font-bold flex items-center gap-2 animate-in slide-in-from-top-2 fade-in duration-300 shadow-sm">
            <CheckCircle size={16} />
            Settings saved successfully
          </div>
        )}
      </div>

      <div className="flex flex-col lg:flex-row gap-8 items-start">
        
        {/* Left Navigation (Desktop) */}
        <div className="hidden lg:flex w-[260px] bg-white rounded-2xl border border-slate-200 shadow-sm p-3 flex-col gap-1 flex-shrink-0">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all text-sm font-bold text-left ${
                activeTab === tab.id 
                  ? 'bg-[#5eead4]/15 text-[#0d9488]' 
                  : 'text-slate-600 hover:bg-slate-50 hover:text-slate-800'
              }`}
            >
              <tab.icon size={18} className={activeTab === tab.id ? 'text-[#0d9488]' : 'text-slate-400'} />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Mobile Navigation Dropdown */}
        <div className="lg:hidden w-full relative">
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 flex items-center justify-between text-sm font-bold text-slate-800 shadow-sm"
          >
            <div className="flex items-center gap-2">
              {(() => {
                const ActiveIcon = TABS.find(t => t.id === activeTab)?.icon || SettingsIcon;
                return <ActiveIcon size={18} className="text-[#0d9488]" />;
              })()}
              {activeTab}
            </div>
            <ChevronDown size={18} className={`text-slate-400 transition-transform ${mobileMenuOpen ? 'rotate-180' : ''}`} />
          </button>
          
          {mobileMenuOpen && (
            <div className="absolute top-full mt-2 left-0 right-0 bg-white border border-slate-200 rounded-xl shadow-lg p-2 z-20 flex flex-col gap-1">
              {TABS.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => {
                    setActiveTab(tab.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all text-sm font-bold text-left ${
                    activeTab === tab.id 
                      ? 'bg-[#5eead4]/15 text-[#0d9488]' 
                      : 'text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <tab.icon size={18} className={activeTab === tab.id ? 'text-[#0d9488]' : 'text-slate-400'} />
                  {tab.label}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right Content */}
        <div className="flex-1 w-full bg-white rounded-2xl border border-slate-200 shadow-sm p-6 lg:p-8 min-h-[500px] flex flex-col">
          
          <div className="flex-1">
            {renderTabContent()}
          </div>
          
          {/* Action Footer */}
          <div className="mt-8 pt-6 border-t border-slate-100 flex justify-end">
            <button 
              onClick={handleSave}
              disabled={isSaving}
              className="bg-[#2a3441] text-white text-sm font-bold rounded-xl px-8 py-3.5 hover:bg-[#374151] transition-all flex items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed shadow-md hover:shadow-lg"
            >
              {isSaving ? (
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              ) : (
                <Save size={16} />
              )}
              {isSaving ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
