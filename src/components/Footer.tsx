import Link from "next/link";
import { HOME_CONTENT } from "@/data/content";
import { Lang, localizedPath } from "@/lib/seo";

export function Footer({ lang }: { lang: Lang }) {
  const footer = HOME_CONTENT[lang].footer;

  return (
    <footer>
      <div className="wrap">
        <span>{footer.copy}</span>
        <div className="foot-links">
          <Link href={localizedPath(lang, "/amazon-locker/")}>
            {footer.lockerLabel}
          </Link>
          <Link href={localizedPath(lang, "/impressum/")}>
            {footer.imprintLabel}
          </Link>
          <Link href={localizedPath(lang, "/datenschutz/")}>
            {footer.privacyLabel}
          </Link>
          <Link href={localizedPath(lang, "/agb/")}>
            {footer.termsLabel}
          </Link>
        </div>
      </div>
    </footer>
  );
}
