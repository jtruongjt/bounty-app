"use client";

import { Suspense } from "react";
import Image from "next/image";
import bountyImage from "../../../Bounty image.png";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

const navItems = [
  { href: "/", label: "Dashboard" },
  { href: "/claims", label: "Claims" },
];

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="app-shell">
      <div className="app-shell__inner">
        <aside className="sidebar">
          <h1 className="sidebar__title">Bounty Hunter</h1>

          <Suspense fallback={null}>
            <SidebarPoster pathname={pathname} />
          </Suspense>

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

function SidebarPoster({ pathname }: { pathname: string }) {
  const searchParams = useSearchParams();
  const selectedQuarter = searchParams.get("quarter") || "Q1 2027";
  const showPoster = pathname === "/" && selectedQuarter === "Q1 2027";

  if (!showPoster) {
    return null;
  }

  return (
    <div className="sidebar__poster">
      <Image
        src={bountyImage}
        alt="Wanted-style bounty poster"
        className="sidebar__poster-image"
        priority
      />
    </div>
  );
}
