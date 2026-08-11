"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";

export function CustomerAuthForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const next = searchParams.get("next");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const afterAuth = async () => {
    if (!next) {
      router.push("/account");
      router.refresh();
      return;
    }

    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ quoteRequestId: next }),
      });
      const data: { ok: boolean; url?: string; error?: string } = await response.json();
      if (data.ok && data.url) {
        window.location.href = data.url;
        return;
      }
      setError(data.error ?? "Unable to start checkout.");
    } catch {
      setError("Unable to start checkout. Please try again.");
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitting(true);
    setError(null);

    const result = await signIn("customer", { email, password, redirect: false });
    setSubmitting(false);

    if (result?.error) {
      setError("Invalid email or password.");
      return;
    }

    await afterAuth();
  };

  return (
    <form onSubmit={handleSubmit} className="auth-card">
      <h1 className="auth-title">Sign In</h1>
      <p className="auth-subtitle">
        {next
          ? "Sign in to continue to payment for your quote."
          : "Enter your email and password — new here? We'll set up your account automatically."}
      </p>

      <label className="auth-label">Email</label>
      <input
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="auth-input"
        autoComplete="email"
      />

      <label className="auth-label">Password</label>
      <input
        type="password"
        required
        minLength={8}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="auth-input"
        autoComplete="current-password"
      />

      {error ? <p className="auth-error">{error}</p> : null}

      <button type="submit" disabled={submitting} className="auth-submit">
        {submitting ? "Please wait…" : "Sign In"}
      </button>

      <style jsx>{`
        .auth-card {
          width: 100%;
          max-width: 25rem;
          background: #fff;
          border-radius: 1.25rem;
          padding: 2.75rem;
          box-shadow: 0 20px 60px rgba(5, 36, 36, 0.12);
        }
        .auth-title {
          font-size: 1.75rem;
          font-weight: 700;
          color: var(--c-dark-green);
          margin: 0 0 0.5rem;
          letter-spacing: -0.01em;
        }
        .auth-subtitle {
          font-size: 0.9rem;
          line-height: 1.5;
          color: rgba(5, 36, 36, 0.6);
          margin: 0 0 2rem;
        }
        .auth-label {
          display: block;
          font-size: 0.72rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.04em;
          color: rgba(5, 36, 36, 0.55);
          margin-bottom: 0.35rem;
        }
        .auth-input {
          width: 100%;
          border: 1px solid var(--c-dark-green-15);
          border-radius: 0.6rem;
          padding: 0.7rem 0.9rem;
          font-size: 0.95rem;
          margin-bottom: 1.15rem;
          outline: none;
          transition: border-color 0.15s ease;
        }
        .auth-input:focus {
          border-color: var(--c-dark-green);
        }
        .auth-error {
          margin: -0.25rem 0 1rem;
          font-size: 0.85rem;
          color: #c0392b;
        }
        .auth-submit {
          width: 100%;
          border: none;
          border-radius: 0.6rem;
          padding: 0.8rem;
          background: var(--c-lime);
          color: var(--c-dark-green);
          font-weight: 700;
          font-size: 0.95rem;
          cursor: pointer;
          transition: transform 0.15s ease;
        }
        .auth-submit:hover:not(:disabled) {
          transform: translateY(-1px);
        }
        .auth-submit:disabled {
          opacity: 0.6;
          cursor: default;
        }
      `}</style>
    </form>
  );
}
