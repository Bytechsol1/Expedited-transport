"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";

export function CustomerAuthForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const next = searchParams.get("next");
  const modeParam = searchParams.get("mode");

  const [isSignUp, setIsSignUp] = useState(modeParam === "signup");
  
  useEffect(() => {
    setIsSignUp(modeParam === "signup");
  }, [modeParam]);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
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

    // If signup mode, we could ideally pass fullName, but NextAuth credentials provider doesn't easily let us save it in authorize function unless we pass it.
    // We will just pass fullName and update the auth logic to handle it if provided.
    const result = await signIn("customer", { email, password, fullName, redirect: false });
    setSubmitting(false);

    if (result?.error) {
      setError(result.error === "CredentialsSignin" ? "Invalid email or password." : result.error);
      return;
    }

    await afterAuth();
  };

  return (
    <div className="auth-card">

      <form onSubmit={handleSubmit}>
        <h1 className="auth-title">{isSignUp ? "Create Account" : "Welcome Back"}</h1>
        <p className="auth-subtitle">
          {next
            ? "Sign in to continue to payment for your quote."
            : isSignUp 
              ? "Sign up to track shipments and manage quotes." 
              : "Enter your email and password to access your account."}
        </p>



        {isSignUp && (
          <>
            <label className="auth-label">Full Name</label>
            <input
              type="text"
              required
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="auth-input"
              autoComplete="name"
            />
          </>
        )}

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
          autoComplete={isSignUp ? "new-password" : "current-password"}
        />

        {error ? <p className="auth-error">{error}</p> : null}

        <button type="submit" disabled={submitting} className="auth-submit">
          {submitting ? "Please wait…" : isSignUp ? "Create Account" : "Sign In"}
        </button>
        
        <div style={{ textAlign: "center", marginTop: "1.5rem" }}>
          <button 
            type="button" 
            className="auth-toggle" 
            onClick={() => setIsSignUp(!isSignUp)}
          >
            {isSignUp ? "Already have an account? Sign In" : "Don't have an account? Create an Account"}
          </button>
        </div>
      </form>

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
          color: #ffffff;
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
          background: #E31E24;
          color: #ffffff;
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
        .auth-toggle {
          background: none;
          border: none;
          color: rgba(5, 36, 36, 0.65);
          font-size: 0.85rem;
          font-weight: 500;
          cursor: pointer;
          transition: color 0.15s ease;
          text-decoration: underline;
          text-decoration-color: transparent;
        }
        .auth-toggle:hover {
          color: var(--c-dark-green);
          text-decoration-color: var(--c-dark-green);
        }
      `}</style>
    </div>
  );
}
