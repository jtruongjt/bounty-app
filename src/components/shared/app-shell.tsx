"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { href: "/", label: "Dashboard" },
  { href: "/claims", label: "Claims" },
  { href: "/reconciliation", label: "Reconciliation" },
  { href: "/settings", label: "Settings" },
];

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="app-shell">
      <div className="app-shell__inner">
        <aside className="sidebar">
          <h1 className="sidebar__title">Bounty Tracker</h1>
          <p className="sidebar__subtitle">
            Shared visibility for quarterly incentives.
          </p>

          <nav className="sidebar__nav" aria-label="Primary">
            {navItems.map((item) => {
              const isActive =
                pathname === item.href ||
                (item.href !== "/" && pathname.startsWith(item.href));

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`sidebar__link${isActive ? " sidebar__link--active" : ""}`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </aside>

        <main className="content">{children}</main>
      </div>
    </div>
  );
}
