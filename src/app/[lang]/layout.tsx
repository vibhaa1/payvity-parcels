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
  const langScrollRestoreScript = `(function(){try{var k="payvity:lang-scroll";var raw=sessionStorage.getItem(k);if(!raw)return;var d=JSON.parse(raw);if(!d||typeof d.ts!=="number"||Date.now()-d.ts>10000){sessionStorage.removeItem(k);return;}var p=location.pathname.replace(/^\\/(de|en)(?=\\/|$)/,"");if(!p||p==="/"){p="/";}else{if(p[0]!=="/")p="/"+p;if(p[p.length-1]!=="/")p+="/";}if(d.targetLang!==${JSON.stringify(lang)}||d.route!==p)return;var y=typeof d.y==="number"?d.y:0;if(d.anchorId){var el=document.getElementById(d.anchorId);if(el)y=el.getBoundingClientRect().top+window.scrollY+(typeof d.anchorOffset==="number"?d.anchorOffset:0);}var r=document.documentElement;var prev=r.style.scrollBehavior;r.style.scrollBehavior="auto";window.scrollTo(0,Math.max(0,Math.round(y)));r.style.scrollBehavior=prev;}catch(e){}})();`;

  return (
    <html lang={lang}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgGraph) }}
        />
        {children}
        <script
          dangerouslySetInnerHTML={{ __html: langScrollRestoreScript }}
        />
      </body>
    </html>
  );
}
