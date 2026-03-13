import type { Metadata } from "next";
import "./globals.css";
import { AppShell } from "@/components/shared/app-shell";

export const metadata: Metadata = {
  title: "Bounty Tracker",
  description: "Internal bounty tracker for quarterly sales incentives.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
