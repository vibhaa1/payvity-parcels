import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import "@fontsource-variable/inter";
import "../globals.css";
import {
  buildOrganizationWebsiteGraph,
  isValidLang,
  SITE_URL,
  SUPPORTED_LANGS,
} from "@/lib/seo";

export const dynamicParams = false;

export function generateStaticParams() {
  return SUPPORTED_LANGS.map((lang) => ({ lang }));
}

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  icons: {
    icon: [
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
  },
};

export const viewport: Viewport = {
  themeColor: "#0f172a",
};

export default async function LocalizedRootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}>) {
  const { lang } = await params;

  if (!isValidLang(lang)) {
    notFound();
  }

  const orgGraph = buildOrganizationWebsiteGraph(lang);

  return (
    <html lang={lang}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgGraph) }}
        />
        {children}
      </body>
    </html>
  );
}
