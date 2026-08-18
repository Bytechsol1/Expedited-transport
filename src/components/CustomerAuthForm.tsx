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
      <div style={{ display: "flex", gap: "1rem", marginBottom: "2rem" }}>
        <button 
          type="button"
          onClick={() => setIsSignUp(false)}
          style={{
            flex: 1,
            padding: "0.5rem",
            background: !isSignUp ? "rgba(5, 36, 36, 0.05)" : "transparent",
            border: "none",
            borderRadius: "0.5rem",
            fontWeight: !isSignUp ? 700 : 500,
            color: !isSignUp ? "var(--c-dark-green)" : "rgba(5, 36, 36, 0.6)",
            cursor: "pointer",
            transition: "all 0.2s ease"
          }}
        >
          Sign In
        </button>
        <button 
          type="button"
          onClick={() => setIsSignUp(true)}
          style={{
            flex: 1,
            padding: "0.5rem",
            background: isSignUp ? "rgba(5, 36, 36, 0.05)" : "transparent",
            border: "none",
            borderRadius: "0.5rem",
            fontWeight: isSignUp ? 700 : 500,
            color: isSignUp ? "var(--c-dark-green)" : "rgba(5, 36, 36, 0.6)",
            cursor: "pointer",
            transition: "all 0.2s ease"
          }}
        >
          Sign Up
        </button>
      </div>

      <form onSubmit={handleSubmit}>
        <h1 className="auth-title">{isSignUp ? "Create Account" : "Welcome Back"}</h1>
        <p className="auth-subtitle">
          {next
            ? "Sign in to continue to payment for your quote."
            : isSignUp 
              ? "Sign up to track shipments and manage quotes." 
              : "Enter your email and password to access your account."}
        </p>

        <button 
          type="button" 
          onClick={() => signIn("google", { callbackUrl: next ? `/account?next=${next}` : "/account" })}
          className="google-btn"
        >
          <svg viewBox="0 0 24 24" width="20" height="20" style={{ marginRight: '10px' }}>
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
          </svg>
          Continue with Google
        </button>

        <div className="auth-divider">
          <span>or continue with email</span>
        </div>

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
        .google-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 100%;
          border: 1px solid rgba(5, 36, 36, 0.15);
          border-radius: 0.6rem;
          padding: 0.8rem;
          background: #fff;
          color: rgba(5, 36, 36, 0.8);
          font-weight: 600;
          font-size: 0.95rem;
          cursor: pointer;
          transition: background 0.15s ease, transform 0.15s ease;
          margin-bottom: 1.5rem;
        }
        .google-btn:hover {
          background: #f8fafc;
          transform: translateY(-1px);
        }
        .auth-divider {
          position: relative;
          text-align: center;
          margin-bottom: 1.5rem;
        }
        .auth-divider::before {
          content: "";
          position: absolute;
          top: 50%;
          left: 0;
          right: 0;
          height: 1px;
          background: rgba(5, 36, 36, 0.1);
        }
        .auth-divider span {
          position: relative;
          background: #fff;
          padding: 0 0.75rem;
          color: rgba(5, 36, 36, 0.45);
          font-size: 0.75rem;
          font-weight: 500;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }
      `}</style>
    </div>
  );
}
