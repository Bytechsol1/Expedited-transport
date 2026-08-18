"use client";

import { useState } from "react";
import { User, Phone, Building, Mail, Lock } from "lucide-react";
import { updateProfile, changePassword } from "./actions";

export function ProfileForm({ 
  initialData 
}: { 
  initialData: { 
    email: string; 
    fullName: string | null; 
    phone: string | null; 
    company: string | null;
  } 
}) {
  const [profileLoading, setProfileLoading] = useState(false);
  const [profileMsg, setProfileMsg] = useState<{type: 'success' | 'error', text: string} | null>(null);

  const [pwdLoading, setPwdLoading] = useState(false);
  const [pwdMsg, setPwdMsg] = useState<{type: 'success' | 'error', text: string} | null>(null);
  const [showPwdForm, setShowPwdForm] = useState(false);

  const handleProfileSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setProfileLoading(true);
    setProfileMsg(null);
    const formData = new FormData(e.currentTarget);
    const result = await updateProfile(formData);
    
    if (result.error) {
      setProfileMsg({ type: 'error', text: result.error });
    } else {
      setProfileMsg({ type: 'success', text: "Profile updated successfully!" });
      setTimeout(() => setProfileMsg(null), 3000);
    }
    setProfileLoading(false);
  };

  const handlePasswordSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setPwdLoading(true);
    setPwdMsg(null);
    const formData = new FormData(e.currentTarget);
    const result = await changePassword(formData);
    
    if (result.error) {
      setPwdMsg({ type: 'error', text: result.error });
    } else {
      setPwdMsg({ type: 'success', text: "Password changed successfully!" });
      e.currentTarget.reset();
      setTimeout(() => {
        setPwdMsg(null);
        setShowPwdForm(false);
      }, 3000);
    }
    setPwdLoading(false);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
      {/* Profile Card */}
      <div style={{ background: "#fff", borderRadius: "16px", border: "1px solid rgba(0,0,0,0.05)", boxShadow: "0 4px 20px rgba(0,0,0,0.03)", padding: "1.5rem" }}>
        <h2 style={{ fontSize: "1.1rem", fontWeight: 700, color: "#0f172a", margin: "0 0 1.5rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <User size={20} color="#0ea5e9" /> Personal Information
        </h2>
        
        <form onSubmit={handleProfileSubmit}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "1.5rem" }}>
            
            <div style={{ display: "flex", flexDirection: "column", gap: "0.25rem" }}>
              <label style={{ fontSize: "0.85rem", color: "rgba(15,23,42,0.5)", fontWeight: 600, display: "flex", alignItems: "center", gap: "0.25rem" }}>
                <User size={14} /> FULL NAME
              </label>
              <input 
                name="fullName"
                type="text" 
                defaultValue={initialData.fullName || ""} 
                placeholder="Enter your full name"
                style={{ padding: "0.75rem 1rem", background: "#f8fafc", borderRadius: "8px", border: "1px solid rgba(0,0,0,0.1)", color: "#0f172a", fontWeight: 500, fontSize: "1rem", outline: "none", transition: "border-color 0.2s" }}
                onFocus={e => e.target.style.borderColor = "#0ea5e9"}
                onBlur={e => e.target.style.borderColor = "rgba(0,0,0,0.1)"}
              />
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "0.25rem" }}>
              <label style={{ fontSize: "0.85rem", color: "rgba(15,23,42,0.5)", fontWeight: 600, display: "flex", alignItems: "center", gap: "0.25rem" }}>
                <Mail size={14} /> EMAIL ADDRESS
              </label>
              <input 
                type="email" 
                defaultValue={initialData.email} 
                disabled
                title="Email address cannot be changed"
                style={{ padding: "0.75rem 1rem", background: "#f1f5f9", borderRadius: "8px", border: "1px solid rgba(0,0,0,0.05)", color: "rgba(15,23,42,0.6)", fontWeight: 500, fontSize: "1rem", outline: "none", cursor: "not-allowed" }}
              />
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "0.25rem" }}>
              <label style={{ fontSize: "0.85rem", color: "rgba(15,23,42,0.5)", fontWeight: 600, display: "flex", alignItems: "center", gap: "0.25rem" }}>
                <Phone size={14} /> PHONE NUMBER
              </label>
              <input 
                name="phone"
                type="tel" 
                defaultValue={initialData.phone || ""} 
                placeholder="Not provided" 
                style={{ padding: "0.75rem 1rem", background: "#f8fafc", borderRadius: "8px", border: "1px solid rgba(0,0,0,0.1)", color: "#0f172a", fontWeight: 500, fontSize: "1rem", outline: "none", transition: "border-color 0.2s" }}
                onFocus={e => e.target.style.borderColor = "#0ea5e9"}
                onBlur={e => e.target.style.borderColor = "rgba(0,0,0,0.1)"}
              />
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "0.25rem" }}>
              <label style={{ fontSize: "0.85rem", color: "rgba(15,23,42,0.5)", fontWeight: 600, display: "flex", alignItems: "center", gap: "0.25rem" }}>
                <Building size={14} /> COMPANY NAME
              </label>
              <input 
                name="company"
                type="text" 
                defaultValue={initialData.company || ""} 
                placeholder="Not provided" 
                style={{ padding: "0.75rem 1rem", background: "#f8fafc", borderRadius: "8px", border: "1px solid rgba(0,0,0,0.1)", color: "#0f172a", fontWeight: 500, fontSize: "1rem", outline: "none", transition: "border-color 0.2s" }}
                onFocus={e => e.target.style.borderColor = "#0ea5e9"}
                onBlur={e => e.target.style.borderColor = "rgba(0,0,0,0.1)"}
              />
            </div>

          </div>
          
          <div style={{ marginTop: "1.5rem", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div>
              {profileMsg && (
                <span style={{ fontSize: "0.9rem", fontWeight: 600, color: profileMsg.type === 'error' ? "#ef4444" : "#10b981" }}>
                  {profileMsg.text}
                </span>
              )}
            </div>
            <button 
              type="submit" 
              disabled={profileLoading}
              style={{ padding: "0.75rem 1.5rem", background: "#b6f000", color: "#0a0f00", borderRadius: "8px", fontWeight: 700, border: "none", cursor: profileLoading ? "not-allowed" : "pointer", fontSize: "0.95rem", opacity: profileLoading ? 0.7 : 1 }}
            >
              {profileLoading ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>

      {/* Security / Account */}
      <div style={{ background: "#fff", borderRadius: "16px", border: "1px solid rgba(0,0,0,0.05)", boxShadow: "0 4px 20px rgba(0,0,0,0.03)", padding: "1.5rem" }}>
        <h2 style={{ fontSize: "1.1rem", fontWeight: 700, color: "#0f172a", margin: "0 0 1.5rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <Lock size={20} color="#8b5cf6" /> Security
        </h2>
        
        {!showPwdForm ? (
          <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
            <button 
              onClick={() => setShowPwdForm(true)}
              style={{ padding: "0.75rem 1.5rem", background: "#f8fafc", color: "#0f172a", border: "1px solid rgba(0,0,0,0.1)", borderRadius: "8px", fontWeight: 600, cursor: "pointer", fontSize: "0.9rem", transition: "background 0.2s" }}
              onMouseOver={e => e.currentTarget.style.background = "#f1f5f9"}
              onMouseOut={e => e.currentTarget.style.background = "#f8fafc"}
            >
              Change Password
            </button>
          </div>
        ) : (
          <form onSubmit={handlePasswordSubmit} style={{ maxWidth: "400px", display: "flex", flexDirection: "column", gap: "1rem" }}>
            
            <div style={{ display: "flex", flexDirection: "column", gap: "0.25rem" }}>
              <label style={{ fontSize: "0.85rem", color: "rgba(15,23,42,0.5)", fontWeight: 600 }}>Current Password</label>
              <input 
                name="currentPassword"
                type="password" 
                required
                style={{ padding: "0.65rem 1rem", background: "#f8fafc", borderRadius: "8px", border: "1px solid rgba(0,0,0,0.1)", color: "#0f172a", fontSize: "0.95rem", outline: "none" }}
              />
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "0.25rem" }}>
              <label style={{ fontSize: "0.85rem", color: "rgba(15,23,42,0.5)", fontWeight: 600 }}>New Password</label>
              <input 
                name="newPassword"
                type="password" 
                required
                minLength={8}
                style={{ padding: "0.65rem 1rem", background: "#f8fafc", borderRadius: "8px", border: "1px solid rgba(0,0,0,0.1)", color: "#0f172a", fontSize: "0.95rem", outline: "none" }}
              />
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "0.25rem" }}>
              <label style={{ fontSize: "0.85rem", color: "rgba(15,23,42,0.5)", fontWeight: 600 }}>Confirm New Password</label>
              <input 
                name="confirmPassword"
                type="password" 
                required
                minLength={8}
                style={{ padding: "0.65rem 1rem", background: "#f8fafc", borderRadius: "8px", border: "1px solid rgba(0,0,0,0.1)", color: "#0f172a", fontSize: "0.95rem", outline: "none" }}
              />
            </div>

            {pwdMsg && (
              <div style={{ fontSize: "0.85rem", fontWeight: 600, color: pwdMsg.type === 'error' ? "#ef4444" : "#10b981", marginTop: "0.25rem" }}>
                {pwdMsg.text}
              </div>
            )}

            <div style={{ display: "flex", gap: "1rem", marginTop: "0.5rem" }}>
              <button 
                type="submit" 
                disabled={pwdLoading}
                style={{ flex: 1, padding: "0.65rem", background: "#0f172a", color: "#fff", borderRadius: "8px", fontWeight: 600, border: "none", cursor: pwdLoading ? "not-allowed" : "pointer", fontSize: "0.9rem", opacity: pwdLoading ? 0.7 : 1 }}
              >
                {pwdLoading ? "Updating..." : "Update Password"}
              </button>
              <button 
                type="button" 
                onClick={() => { setShowPwdForm(false); setPwdMsg(null); }}
                style={{ padding: "0.65rem 1rem", background: "transparent", color: "rgba(15,23,42,0.6)", borderRadius: "8px", fontWeight: 600, border: "none", cursor: "pointer", fontSize: "0.9rem" }}
              >
                Cancel
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
