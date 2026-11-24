import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LegalPageView } from "@/components/LegalPageView";
import { DATENSCHUTZ_CONTENT } from "@/data/legalContent";
import {
  absoluteLocalizedUrl,
  buildBreadcrumbJsonLd,
  buildPageMetadata,
  isValidLang,
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

  const copy = DATENSCHUTZ_CONTENT[lang];
  return buildPageMetadata({
    lang,
    routePath: "/datenschutz/",
    title: copy.metaTitle,
    description: copy.metaDescription,
  });
}

export default async function DatenschutzPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isValidLang(lang)) {
    notFound();
  }

  const copy = DATENSCHUTZ_CONTENT[lang];
  const breadcrumbJsonLd = buildBreadcrumbJsonLd([
    { name: copy.breadcrumbHome, url: absoluteLocalizedUrl(lang, "/") },
    { name: copy.title, url: absoluteLocalizedUrl(lang, "/datenschutz/") },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <LegalPageView lang={lang} content={copy} />
    </>
  );
}
