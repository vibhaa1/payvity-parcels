import Link from "next/link";
import type { LegalDocumentContent } from "@/data/legalContent";
import { Lang, localizedPath } from "@/lib/seo";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";

const URL_SPLIT_REGEX = /(https?:\/\/[^\s]+?)(?=[.,;)]?(?:\s|$))/g;

function renderTextWithLinks(text: string) {
  const parts = text.split(URL_SPLIT_REGEX);
  return parts.map((part, idx) =>
    /^https?:\/\//.test(part) ? (
      <a
        key={`link-${idx}`}
        href={part}
        target="_blank"
        rel="noopener noreferrer"
      >
        {part}
      </a>
    ) : (
      part
    )
  );
}

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
            {content.notice && <p className="legal-notice">{content.notice}</p>}

            {content.sections.map((section) => (
              <section key={section.heading} className="legal-section">
                <h2>{section.heading}</h2>
                {section.paragraphs?.map((paragraph, idx) => (
                  <p key={`${section.heading}-p-${idx}`}>
                    {renderTextWithLinks(paragraph)}
                  </p>
                ))}
                {section.bullets && section.bullets.length > 0 && (
                  <ul className="legal-list">
                    {section.bullets.map((bullet, idx) => (
                      <li key={`${section.heading}-li-${idx}`}>{bullet}</li>
                    ))}
                  </ul>
                )}
                {section.afterBullets?.map((paragraph, idx) => (
                  <p key={`${section.heading}-ab-${idx}`}>
                    {renderTextWithLinks(paragraph)}
                  </p>
                ))}
              </section>
            ))}

            <div className="legal-back-wrap">
              <Link href={homeHref} className="legal-back-link">
                {content.backHomeLabel}
              </Link>
            </div>
          </article>
        </div>
      </main>
      <Footer lang={lang} />
    </>
  );
}
