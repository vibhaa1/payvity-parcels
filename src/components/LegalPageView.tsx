import Link from "next/link";
import type { LegalDocumentContent } from "@/data/legalContent";
import { Lang, localizedPath } from "@/lib/seo";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";

export function LegalPageView({
  lang,
  content,
}: {
  lang: Lang;
  content: LegalDocumentContent;
}) {
  const homeHref = localizedPath(lang, "/");

  return (
    <>
      <Navbar lang={lang} isHome={false} />
      <main className="legal-shell">
        <div className="wrap">
          <nav className="breadcrumb breadcrumb-dark" aria-label="Breadcrumb">
            <Link href={homeHref}>{content.breadcrumbHome}</Link>
            <span aria-hidden="true">/</span>
            <span aria-current="page">{content.title}</span>
          </nav>

          <article className="legal-card">
            <h1>{content.title}</h1>
            <p className="legal-notice">{content.notice}</p>

            {content.sections.map((section) => (
              <section key={section.heading} className="legal-section">
                <h2>{section.heading}</h2>
                {section.paragraphs.map((paragraph, idx) => (
                  <p key={`${section.heading}-${idx}`}>{paragraph}</p>
                ))}
              </section>
            ))}
          </article>
        </div>
      </main>
      <Footer lang={lang} />
    </>
  );
}
