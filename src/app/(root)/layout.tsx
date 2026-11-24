import type { Metadata, Viewport } from "next";
import { SITE_URL } from "@/lib/seo";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "PAYVITY Parcels — Weiterleitung zur deutschen Startseite",
  robots: {
    index: false,
    follow: true,
  },
  alternates: {
    canonical: "/de/",
  },
};

export const viewport: Viewport = {
  themeColor: "#0f172a",
};

export default function RootRedirectLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de">
      <head>
        <meta httpEquiv="refresh" content="0;url=/de/" />
      </head>
      <body
        style={{
          margin: 0,
          fontFamily: "system-ui, -apple-system, sans-serif",
          background: "#f8fafc",
          color: "#0f172a",
          display: "grid",
          placeItems: "center",
          minHeight: "100vh",
          padding: "24px",
        }}
      >
        {children}
      </body>
    </html>
  );
}
