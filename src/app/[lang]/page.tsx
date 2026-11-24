import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PayvityLanding } from "@/components/PayvityLanding";
import { HOME_CONTENT } from "@/data/content";
import {
  absoluteLocalizedUrl,
  buildFaqJsonLd,
  buildPageMetadata,
  buildServiceJsonLd,
  isValidLang,
  SITE_URL,
  SUPPORTED_LANGS,
} from "@/lib/seo";

export const dynamicParams = false;

export function generateStaticParams() {
  return SUPPORTED_LANGS.map((lang) => ({ lang }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  if (!isValidLang(lang)) return {};

  const copy = HOME_CONTENT[lang];
  return buildPageMetadata({
    lang,
    routePath: "/",
    title: copy.meta.title,
    description: copy.meta.description,
    ogAlt: copy.meta.ogAlt,
  });
}

export default async function LocalizedHomePage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isValidLang(lang)) {
    notFound();
  }

  const copy = HOME_CONTENT[lang];
  const serviceJsonLd = buildServiceJsonLd({
    id: `${SITE_URL}/#paketshop-service-${lang}`,
    name:
      lang === "de"
        ? "Amazon Hub Counter Paketshop Partnerschaft"
        : "Amazon Hub Counter Parcel Shop Partnership",
    description: copy.meta.description,
    url: absoluteLocalizedUrl(lang, "/"),
    serviceType:
      lang === "de"
        ? "Amazon Paketshop & Paketannahmestelle für Einzelhändler"
        : "Amazon Parcel Shop & Hub Counter Partner Onboarding",
  });
  const faqJsonLd = buildFaqJsonLd(copy.faq.items);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <PayvityLanding lang={lang} />
    </>
  );
}
