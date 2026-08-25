"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { Phone } from "lucide-react";

const SideRays = dynamic(() => import("./SideRays"), { ssr: false });

const INITIAL_FORM = {
  name: "",
  phone: "",
  email: "",
  company: "",
  service: "",
  message: "",
};

export function ContactSection() {
  const [form, setForm] = useState({ ...INITIAL_FORM });
  const [sending, setSending] = useState(false);
  const [status, setStatus] = useState<string | null>(null);

  const set = (k: keyof typeof form) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm((f) => ({ ...f, [k]: e.target.value }));

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formElement = event.currentTarget;
    if (!formElement.checkValidity()) {
      formElement.reportValidity();
      return;
    }

    const payload = {
      fullName: form.name.trim(),
      phoneNumber: form.phone.trim(),
      email: form.email.trim(),
      companyName: form.company.trim(),
      serviceNeeded: form.service.trim(),
      message: form.message.trim(),
    };

    try {
      setSending(true);
      setStatus("Sending message...");

      const response = await fetch("/api/quote", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const result: { ok?: boolean; error?: string } = await response.json().catch(() => ({}));

      if (!response.ok || result.ok === false) {
        throw new Error(result.error || "Message could not be sent.");
      }

      setForm({ ...INITIAL_FORM });
      setStatus("Message sent. We will get back to you soon.");
    } catch {
      setStatus("Message could not be sent right now. Please try again.");
    } finally {
      setSending(false);
    }
  };

  return (
    <section
      id="contact-section"
      className="contact-section"
      style={{
        display: "flex",
        minHeight: "100vh",
        background: "#0a1628",
        overflow: "hidden",
        position: "relative",
      }}
    >
      <div
        className="contact-siderays"
        style={{
          position: "absolute",
          top: 0,
          right: 0,
          width: "60%",
          height: "70%",
          pointerEvents: "none",
          zIndex: 0,
        }}
      >
        <SideRays
          rayColor1="#E31E24"
          rayColor2="#96c8ff"
          origin="top-right"
          speed={2.5}
          intensity={2}
          spread={2}
          tilt={0}
          saturation={1.5}
          blend={0.75}
          falloff={1.6}
          opacity={1}
        />
      </div>

      <div
        className="contact-left"
        style={{
          position: "relative",
          overflow: "hidden",
          zIndex: 1,
        }}
      >
        <svg
          viewBox="0 0 500 900"
          preserveAspectRatio="xMidYMid slice"
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
          aria-hidden
        >
          <path d="M-50,80 C80,30 170,130 250,80 S420,30 550,80" fill="none" stroke="#E31E24" strokeWidth="1.8" opacity="0.25" style={{ animation: "cw-float 4.2s ease-in-out infinite alternate" }} />
          <path d="M-50,170 C80,115 170,225 250,170 S420,115 550,170" fill="none" stroke="#E31E24" strokeWidth="1.2" opacity="0.18" style={{ animation: "cw-float 3.8s ease-in-out infinite alternate", animationDelay: "0.4s" }} />
          <path d="M-50,270 C80,215 170,325 250,270 S420,215 550,270" fill="none" stroke="#E31E24" strokeWidth="2.0" opacity="0.30" style={{ animation: "cw-float 5.0s ease-in-out infinite alternate", animationDelay: "0.8s" }} />
          <path d="M-50,370 C80,315 170,425 250,370 S420,315 550,370" fill="none" stroke="#E31E24" strokeWidth="1.0" opacity="0.15" style={{ animation: "cw-float 4.5s ease-in-out infinite alternate", animationDelay: "0.2s" }} />
          <path d="M-50,470 C80,415 170,525 250,470 S420,415 550,470" fill="none" stroke="#E31E24" strokeWidth="1.6" opacity="0.22" style={{ animation: "cw-float 3.6s ease-in-out infinite alternate", animationDelay: "1.0s" }} />
          <path d="M-50,570 C80,515 170,625 250,570 S420,515 550,570" fill="none" stroke="#E31E24" strokeWidth="1.3" opacity="0.20" style={{ animation: "cw-float 4.8s ease-in-out infinite alternate", animationDelay: "0.6s" }} />
          <path d="M-50,670 C80,615 170,725 250,670 S420,615 550,670" fill="none" stroke="#E31E24" strokeWidth="1.9" opacity="0.28" style={{ animation: "cw-float 4.0s ease-in-out infinite alternate", animationDelay: "0.3s" }} />
          <path d="M-50,770 C80,715 170,825 250,770 S420,715 550,770" fill="none" stroke="#E31E24" strokeWidth="1.1" opacity="0.17" style={{ animation: "cw-float 5.2s ease-in-out infinite alternate", animationDelay: "0.9s" }} />
        </svg>

        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "radial-gradient(ellipse 80% 80% at 50% 50%, transparent 20%, rgba(10,22,40,0.55) 100%)",
            pointerEvents: "none",
          }}
        />

        <div
          style={{
            position: "absolute",
            bottom: "3rem",
            left: "3rem",
            right: "2rem",
          }}
        >
          <p
            style={{
              fontFamily: "var(--font-mono, monospace)",
              fontSize: "0.7rem",
              fontWeight: 700,
              letterSpacing: "0.28em",
              textTransform: "uppercase",
              color: "#E31E24",
              margin: "0 0 0.9rem",
            }}
          >
            Get in Touch
          </p>
          <h2
            style={{
              fontFamily: "var(--font-primary, 'Inter', sans-serif)",
              fontSize: "clamp(1.6rem, 3vw, 2.6rem)",
              fontWeight: 700,
              lineHeight: 1.1,
              letterSpacing: "-0.03em",
              color: "#fff",
              margin: "0 0 1.4rem",
            }}
          >
            Contact us and we&apos;ll be in touch the same day
          </h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.3rem" }}>
            <a
              href="tel:8609883887"
              className="contact-call-btn"
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                fontFamily: "var(--font-primary, 'Inter', sans-serif)",
                fontSize: "1rem",
                fontWeight: 700,
                color: "#ffffff",
                background: "#E31E24",
                textDecoration: "none",
                letterSpacing: "-0.01em",
                padding: "0.75rem 1.75rem",
                borderRadius: "50px",
                width: "fit-content",
                marginTop: "0.5rem",
                marginBottom: "1rem",
                transition: "all 0.2s ease",
                boxShadow: "0 4px 14px rgba(227, 30, 36, 0.25)",
              }}
            >
              Call Us Now <Phone size={18} style={{ marginLeft: "8px" }} />
            </a>
            <a
              href="mailto:info@expeditedtransportservices.net"
              style={{
                fontFamily: "var(--font-primary, 'Inter', sans-serif)",
                fontSize: "0.85rem",
                color: "rgba(255,255,255,0.45)",
                textDecoration: "none",
              }}
            >
              info@expeditedtransportservices.net
            </a>
          </div>
        </div>
      </div>

      <div
        className="contact-right"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          zIndex: 1,
        }}
      >
        <form
          className="contact-form-card"
          onSubmit={handleSubmit}
          style={{
            width: "100%",
            maxWidth: "520px",
            background: "#ffffff",
            border: "1px solid rgba(0,0,0,0.08)",
            borderRadius: "20px",
            padding: "2.5rem",
            display: "flex",
            flexDirection: "column",
            gap: "1.25rem",
            margin: 0,
          }}
        >
          <div className="form-row-2col" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
            <Field label="Full Name" placeholder="Salik" value={form.name} onChange={set("name")} required />
            <Field label="Phone Number" placeholder="(860) 555-0147" value={form.phone} onChange={set("phone")} type="tel" required />
          </div>

          <div className="form-row-2col" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
            <Field label="Email" placeholder="name@email.com" value={form.email} onChange={set("email")} type="email" required />
            <Field label="Company Name" placeholder="Bytechsol LLC" value={form.company} onChange={set("company")} required />
          </div>

          <Field
            label="Service Needed"
            placeholder="e.g. Hotshot Trucking, Freight Shipping..."
            value={form.service}
            onChange={set("service") as (e: React.ChangeEvent<HTMLInputElement>) => void}
            required
          />

          <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}>
            <label style={LABEL_STYLE}>Message</label>
            <textarea
              placeholder="Tell us about your freight needs..."
              value={form.message}
              onChange={set("message")}
              rows={3}
              required
              style={{ ...INPUT_STYLE, resize: "none", height: "auto" }}
            />
          </div>

          <button
            type="submit"
            disabled={sending}
            style={{
              marginTop: "0.25rem",
              padding: "0.85rem 1.5rem",
              background: "#E31E24",
              color: "#ffffff",
              border: "none",
              borderRadius: "12px",
              fontFamily: "var(--font-primary, 'Inter', sans-serif)",
              fontSize: "0.95rem",
              fontWeight: 700,
              letterSpacing: "-0.01em",
              cursor: "pointer",
              transition: "background 0.15s ease",
              width: "100%",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "#C81920")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "#E31E24")}
          >
            {sending ? "Sending..." : "Send Message"}
          </button>

          {status && (
            <p
              aria-live="polite"
              style={{
                margin: 0,
                padding: "0.85rem 1rem",
                borderRadius: "14px",
                background: "rgba(227, 30, 36, 0.12)",
                color: "#0f172a",
                fontSize: "0.95rem",
                fontWeight: 600,
              }}
            >
              {status}
            </p>
          )}
        </form>
      </div>

      <style>{`
        @keyframes cw-float {
          0%   { transform: translateY(0px); }
          100% { transform: translateY(-24px); }
        }

        .contact-form-card input::placeholder,
        .contact-form-card textarea::placeholder {
          color: rgba(0,0,0,0.55);
        }
        .contact-form-card input,
        .contact-form-card textarea {
          color: #0f172a;
        }

        .contact-call-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(227, 30, 36, 0.4) !important;
          background: #C81920 !important;
        }

        .contact-section { flex-direction: row; }
        .contact-left  { flex: 0 0 50%; min-height: 100%; }
        .contact-right { flex: 0 0 50%; padding: 4rem 3rem 4rem 2rem; }

        @media (max-width: 1024px) {
          .contact-section {
            flex-direction: column;
            min-height: auto;
          }
          .contact-left {
            flex: none;
            width: 100%;
            height: 320px;
            min-height: 0;
          }
          .contact-right {
            flex: none;
            width: 100%;
            padding: 2.5rem 1.5rem 3rem;
          }
          .form-row-2col {
            grid-template-columns: 1fr !important;
          }
          .contact-left > div:last-child {
            bottom: 1.5rem !important;
            left: 1.5rem !important;
            right: 1.5rem !important;
          }
          .contact-left > div:last-child h2 {
            font-size: clamp(1.1rem, 4vw, 1.5rem) !important;
            margin-bottom: 0.75rem !important;
          }
          .contact-siderays { display: none; }
        }

        @media (max-width: 480px) {
          .contact-right { padding: 2rem 1rem 2.5rem; }
          .contact-form-card { padding: 1.5rem !important; }
        }
      `}</style>
    </section>
  );
}

const LABEL_STYLE: React.CSSProperties = {
  fontFamily: "var(--font-primary, 'Inter', sans-serif)",
  fontSize: "0.75rem",
  fontWeight: 600,
  letterSpacing: "0.06em",
  textTransform: "uppercase",
  color: "rgba(0,0,0,0.65)",
};

const INPUT_STYLE: React.CSSProperties = {
  background: "transparent",
  border: "none",
  borderBottom: "1px solid rgba(0,0,0,0.15)",
  borderRadius: 0,
  padding: "0.6rem 0",
  color: "#0f172a",
  fontFamily: "var(--font-primary, 'Inter', sans-serif)",
  fontSize: "0.95rem",
  outline: "none",
  width: "100%",
  transition: "border-color 0.15s ease",
};

function Field({
  label,
  placeholder,
  value,
  onChange,
  type = "text",
  required = false,
}: {
  label: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  required?: boolean;
}) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}>
      <label style={LABEL_STYLE}>{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        style={INPUT_STYLE}
        required={required}
        onFocus={(e) => (e.currentTarget.style.borderBottomColor = "#E31E24")}
        onBlur={(e) => (e.currentTarget.style.borderBottomColor = "rgba(0,0,0,0.15)")}
      />
    </div>
  );
}

