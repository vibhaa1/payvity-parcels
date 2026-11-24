import type { Metadata, Viewport } from "next";
import "@fontsource-variable/inter";
import "./globals.css";

export const metadata: Metadata = {
  title: "Payvity Parcels — Amazon Locker & Paketshops für Ihren Standort",
  description:
    "Payvity Parcels — offizieller Amazon Hub Partner für Paketshops (Counter) und Amazon Locker. Profitieren Sie von mehr Laufkundschaft und zusätzlichem Umsatz.",
};

export const viewport: Viewport = {
  themeColor: "#0f172a",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de">
      <body>{children}</body>
    </html>
  );
}
