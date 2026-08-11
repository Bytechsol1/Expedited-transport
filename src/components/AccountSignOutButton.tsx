"use client";

import { signOut } from "next-auth/react";

export function AccountSignOutButton() {
  return (
    <button type="button" onClick={() => signOut({ callbackUrl: "/" })} className="account-signout">
      Log out
      <style jsx>{`
        .account-signout {
          border: 1px solid var(--c-dark-green-20);
          background: transparent;
          color: var(--c-dark-green);
          font-size: 0.85rem;
          font-weight: 600;
          padding: 0.5rem 1rem;
          border-radius: 999px;
          cursor: pointer;
        }
        .account-signout:hover {
          background: var(--c-dark-green-05);
        }
      `}</style>
    </button>
  );
}
