import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LockerLanding } from "@/components/LockerLanding";
import { LOCKER_CONTENT } from "@/data/lockerContent";
import {
  absoluteLocalizedUrl,
  buildBreadcrumbJsonLd,
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

  const copy = LOCKER_CONTENT[lang];
  return buildPageMetadata({
    lang,
    routePath: "/amazon-locker/",
    title: copy.meta.title,
    description: copy.meta.description,
    ogAlt: copy.meta.ogAlt,
  });
}

export default async function AmazonLockerPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isValidLang(lang)) {
    notFound();
  }

  const copy = LOCKER_CONTENT[lang];
  const pageUrl = absoluteLocalizedUrl(lang, "/amazon-locker/");
  const homeUrl = absoluteLocalizedUrl(lang, "/");

  const serviceJsonLd = buildServiceJsonLd({
    id: `${SITE_URL}/#locker-service-${lang}`,
    name:
      lang === "de"
        ? "Amazon Hub Locker Standortpartnerschaft"
        : "Amazon Hub Locker Location Partnership",
    description: copy.meta.description,
    url: pageUrl,
    serviceType:
      lang === "de"
        ? "Amazon Hub Locker Selbstbedienungs-Paketstation"
        : "Amazon Hub Locker Automated Parcel Station",
  });
  const faqJsonLd = buildFaqJsonLd(copy.faq.items);
  const breadcrumbJsonLd = buildBreadcrumbJsonLd([
    { name: copy.breadcrumbHome, url: homeUrl },
    { name: copy.breadcrumbCurrent, url: pageUrl },
  ]);

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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <LockerLanding lang={lang} />
    </>
  );
}
