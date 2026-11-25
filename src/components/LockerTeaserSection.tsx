import Link from "next/link";
import { HOME_CONTENT } from "@/data/content";
import { Lang, localizedPath } from "@/lib/seo";

export function LockerTeaserSection({ lang }: { lang: Lang }) {
  const teaser = HOME_CONTENT[lang].lockerTeaser;
  const lockerHref = localizedPath(lang, "/amazon-locker/");

  return (
    <section
      className="wrap section locker-teaser-wrap"
      id="amazon-locker-option"
    >
      <div className="locker-teaser">
        <div className="locker-teaser-copy">
          <h2>{teaser.title}</h2>
          <p>{teaser.desc}</p>
        </div>
        <div className="locker-teaser-actions">
          <Link className="button outline-dark" href={lockerHref}>
            {teaser.ctaLabel} →
          </Link>
        </div>
      </div>
    </section>
  );
}
