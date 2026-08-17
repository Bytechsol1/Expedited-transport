"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV_ITEMS = [
  { label: "Orders", href: "/account" },
  { label: "Tracking", href: "/account/tracking" },
  { label: "Profile", href: "/account/profile" },
];

export function CustomerNav() {
  const pathname = usePathname();

  return (
    <nav
      style={{
        display: "flex",
        gap: "1.5rem",
        overflowX: "auto",
        paddingBottom: "0.5rem",
        borderBottom: "1px solid rgba(0,0,0,0.08)",
        scrollbarWidth: "none",
        WebkitOverflowScrolling: "touch",
      }}
    >
      {NAV_ITEMS.map((item) => {
        const isActive =
          item.href === "/account"
            ? pathname === "/account"
            : pathname.startsWith(item.href);

        return (
          <Link
            key={item.href}
            href={item.href}
            style={{
              padding: "0.5rem 0.25rem",
              color: isActive ? "#0f172a" : "rgba(15,23,42,0.6)",
              fontWeight: isActive ? 800 : 600,
              fontSize: "0.95rem",
              textDecoration: "none",
              whiteSpace: "nowrap",
              borderBottom: isActive ? "2px solid #b6f000" : "2px solid transparent",
              transition: "color 0.2s ease, border-color 0.2s ease",
            }}
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
