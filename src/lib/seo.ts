import type { Metadata } from "next";

export const SITE_URL = "https://payvityparcels.de";
export const BRAND_NAME = "PAYVITY Parcels";
export const CONTACT_EMAIL = "partner@payvityparcels.de";
export const CONTACT_LINKS = {
  // Update with final live WhatsApp number, Instagram handle, and LinkedIn company URL
  whatsapp: "https://wa.me/49",
  email: `mailto:${CONTACT_EMAIL}`,
  instagram: "https://www.instagram.com/payvityparcels/",
  linkedin: "https://www.linkedin.com/company/payvity-parcels/",
} as const;
export const OG_IMAGE_PATH = "/images/og-payvity-paketshop.jpg";
export const LOGO_PATH = "/images/payvity-logo.png";

export const SUPPORTED_LANGS = ["de", "en"] as const;
export type Lang = (typeof SUPPORTED_LANGS)[number];

export function isValidLang(value: string): value is Lang {
  return value === "de" || value === "en";
}

function normalizeRoutePath(routePath: string): string {
  if (!routePath || routePath === "/") return "/";
  const withLeading = routePath.startsWith("/") ? routePath : `/${routePath}`;
  return withLeading.endsWith("/") ? withLeading : `${withLeading}/`;
}

export function localizedPath(lang: Lang, routePath = "/"): string {
  const normalized = normalizeRoutePath(routePath);
  return `/${lang}${normalized}`;
}

export function absoluteLocalizedUrl(lang: Lang, routePath = "/"): string {
  return `${SITE_URL}${localizedPath(lang, routePath)}`;
}

interface PageMetadataOptions {
  lang: Lang;
  routePath: string;
  title: string;
  description: string;
  ogAlt?: string;
  noIndex?: boolean;
}

export function buildPageMetadata({
  lang,
  routePath,
  title,
  description,
  ogAlt,
  noIndex = false,
}: PageMetadataOptions): Metadata {
  const canonicalPath = localizedPath(lang, routePath);
  const dePath = localizedPath("de", routePath);
  const enPath = localizedPath("en", routePath);
  const canonicalUrl = `${SITE_URL}${canonicalPath}`;

  return {
    title,
    description,
    alternates: {
      canonical: canonicalPath,
      languages: {
        "de-DE": dePath,
        en: enPath,
        "x-default": dePath,
      },
    },
    openGraph: {
      type: "website",
      locale: lang === "de" ? "de_DE" : "en_US",
      alternateLocale: lang === "de" ? ["en_US"] : ["de_DE"],
      siteName: BRAND_NAME,
      url: canonicalUrl,
      title,
      description,
      images: [
        {
          url: OG_IMAGE_PATH,
          width: 1200,
          height: 630,
          alt:
            ogAlt ??
            (lang === "de"
              ? "PAYVITY Parcels — Amazon Paketshop werden in Deutschland"
              : "PAYVITY Parcels — Become an Amazon Parcel Shop in Germany"),
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [OG_IMAGE_PATH],
    },
    robots: {
      index: !noIndex,
      follow: true,
      googleBot: {
        index: !noIndex,
        follow: true,
        "max-snippet": -1,
        "max-image-preview": "large",
        "max-video-preview": -1,
      },
    },
  };
}

export function buildOrganizationWebsiteGraph(lang: Lang) {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${SITE_URL}/#organization`,
        name: BRAND_NAME,
        url: `${SITE_URL}/de/`,
        logo: {
          "@type": "ImageObject",
          url: `${SITE_URL}${LOGO_PATH}`,
        },
        email: CONTACT_EMAIL,
        areaServed: {
          "@type": "Country",
          name: "Germany",
        },
      },
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        url: `${SITE_URL}/${lang}/`,
        name: BRAND_NAME,
        inLanguage: lang === "de" ? "de-DE" : "en",
        publisher: {
          "@id": `${SITE_URL}/#organization`,
        },
      },
    ],
  };
}

export function buildServiceJsonLd({
  id,
  name,
  description,
  url,
  serviceType,
}: {
  id: string;
  name: string;
  description: string;
  url: string;
  serviceType: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": id,
    name,
    description,
    url,
    serviceType,
    provider: {
      "@id": `${SITE_URL}/#organization`,
    },
    areaServed: {
      "@type": "Country",
      name: "Germany",
    },
  };
}

export function buildFaqJsonLd(
  items: ReadonlyArray<{ question: string; answer: string }>
) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

export function buildBreadcrumbJsonLd(
  items: ReadonlyArray<{ name: string; url: string }>
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, idx) => ({
      "@type": "ListItem",
      position: idx + 1,
      name: item.name,
      item: item.url,
    })),
  };
}
