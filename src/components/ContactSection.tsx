"use client";

import { useState } from "react";

const BULLETS = [
  "Same-day quote turnaround",
  "24/7 dispatch & emergency coverage",
  "DOT-compliant, fully insured fleet",
];

export function ContactSection() {
  const [form, setForm] = useState({
    name: "", phone: "", email: "", company: "", service: "", message: "",
  });

  const set = (k: keyof typeof form) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
      setForm(f => ({ ...f, [k]: e.target.value }));

  return (
    <section style={{
      background: "#fff",
      padding: "7rem 2rem 6rem",
      clipPath: "polygon(25% 10%, 75% 10%, 85% 0, 100% 0, 100% 100%, 0 100%, 0 0, 15% 0)",
    }}>
      <div style={{
        maxWidth: "1100px",
        margin: "0 auto",
        display: "grid",
        gridTemplateColumns: "1fr 1.1fr",
        gap: "5rem",
        alignItems: "center",
      }}>

        {/* ── Left ── */}
        <div>
          <p style={{
            fontFamily: "var(--font-mono, monospace)",
            fontSize: "0.85rem",
            fontWeight: 700,
            letterSpacing: "0.24em",
            textTransform: "uppercase",
            color: "#b6f000",
            margin: "0 0 1.25rem",
          }}>
            Get in Touch
          </p>

          <h2 style={{
            fontFamily: "var(--font-primary, 'Inter', sans-serif)",
            fontSize: "clamp(1.75rem, 3.5vw, 2.75rem)",
            fontWeight: 700,
            lineHeight: 1.15,
            letterSpacing: "-0.03em",
            color: "#0a1628",
            margin: "0 0 1.5rem",
          }}>
            Contact us and we'll be in touch the same day
          </h2>

          <p style={{
            fontFamily: "var(--font-primary, 'Inter', sans-serif)",
            fontSize: "1rem",
            lineHeight: 1.7,
            color: "rgba(0,0,0,0.5)",
            margin: "0 0 2rem",
          }}>
            Fill out the form and our team will reach out promptly to discuss your freight needs.
          </p>

          <ul style={{ listStyle: "none", padding: 0, margin: "0 0 2.5rem", display: "flex", flexDirection: "column", gap: "0.75rem" }}>
            {BULLETS.map(b => (
              <li key={b} style={{ display: "flex", alignItems: "center", gap: "0.75rem",
                fontFamily: "var(--font-primary, 'Inter', sans-serif)",
                fontSize: "0.95rem", color: "rgba(0,0,0,0.65)" }}>
                <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#b6f000", flexShrink: 0 }} />
                {b}
              </li>
            ))}
          </ul>

          <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}>
            <a href="tel:8609883887" style={{
              fontFamily: "var(--font-primary, 'Inter', sans-serif)",
              fontSize: "1.05rem", fontWeight: 700,
              color: "#0a1628", textDecoration: "none",
              letterSpacing: "-0.01em",
            }}>
              (860) 988-3887
            </a>
            <a href="mailto:info@expeditedtransportservices.net" style={{
              fontFamily: "var(--font-primary, 'Inter', sans-serif)",
              fontSize: "0.9rem", color: "rgba(0,0,0,0.45)", textDecoration: "none",
            }}>
              info@expeditedtransportservices.net
            </a>
          </div>
        </div>

        {/* ── Right — form card ── */}
        <div className="contact-form-card" style={{
          background: "#0a1628",
          borderRadius: "20px",
          padding: "2.5rem",
          display: "flex",
          flexDirection: "column",
          gap: "1.25rem",
        }}>
          {/* Row 1 */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
            <Field label="Full Name" placeholder="Salik" value={form.name} onChange={set("name")} />
            <Field label="Phone Number" placeholder="(860) 555-0147" value={form.phone} onChange={set("phone")} type="tel" />
          </div>

          {/* Row 2 */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
            <Field label="Email" placeholder="name@email.com" value={form.email} onChange={set("email")} type="email" />
            <Field label="Company Name" placeholder="Acme Corp" value={form.company} onChange={set("company")} />
          </div>

          {/* Service text input */}
          <Field label="Service Needed" placeholder="e.g. Hotshot Trucking, Freight Shipping…" value={form.service} onChange={set("service") as (e: React.ChangeEvent<HTMLInputElement>) => void} />

          {/* Message */}
          <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}>
            <label style={LABEL_STYLE}>Message</label>
            <textarea
              placeholder="Tell us about your freight needs…"
              value={form.message}
              onChange={set("message")}
              rows={3}
              style={{ ...INPUT_STYLE, resize: "none", height: "auto" }}
            />
          </div>

          <button
            type="submit"
            style={{
              marginTop: "0.25rem",
              padding: "0.85rem 1.5rem",
              background: "#b6f000",
              color: "#0a0f00",
              border: "none",
              borderRadius: "12px",
              fontFamily: "var(--font-primary, 'Inter', sans-serif)",
              fontSize: "0.95rem",
              fontWeight: 700,
              letterSpacing: "-0.01em",
              cursor: "pointer",
              transition: "background 0.15s ease",
            }}
            onMouseEnter={e => (e.currentTarget.style.background = "#cbff1a")}
            onMouseLeave={e => (e.currentTarget.style.background = "#b6f000")}
          >
            Send Message
          </button>
        </div>
      </div>

      <style>{`
        .contact-form-card input::placeholder,
        .contact-form-card textarea::placeholder {
          color: rgba(255,255,255,0.35);
        }
        .contact-form-card input,
        .contact-form-card textarea,
        .contact-form-card select {
          color: #fff;
        }
        @media (max-width: 768px) {
          .contact-grid { grid-template-columns: 1fr !important; gap: 3rem !important; }
        }
      `}</style>
    </section>
  );
}

/* ── Shared styles ── */
const LABEL_STYLE: React.CSSProperties = {
  fontFamily: "var(--font-primary, 'Inter', sans-serif)",
  fontSize: "0.75rem",
  fontWeight: 600,
  letterSpacing: "0.06em",
  textTransform: "uppercase",
  color: "rgba(255,255,255,0.45)",
};

const INPUT_STYLE: React.CSSProperties = {
  background: "transparent",
  border: "none",
  borderBottom: "1px solid rgba(255,255,255,0.15)",
  borderRadius: 0,
  padding: "0.6rem 0",
  color: "#fff",
  fontFamily: "var(--font-primary, 'Inter', sans-serif)",
  fontSize: "0.95rem",
  outline: "none",
  width: "100%",
  transition: "border-color 0.15s ease",
};

function Field({
  label, placeholder, value, onChange, type = "text",
}: {
  label: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
}) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}>
      <label style={LABEL_STYLE}>{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        style={{ ...INPUT_STYLE, color: value ? "#fff" : undefined }}
        onFocus={e => (e.currentTarget.style.borderBottomColor = "#b6f000")}
        onBlur={e => (e.currentTarget.style.borderBottomColor = "rgba(255,255,255,0.15)")}
      />
    </div>
  );
}
