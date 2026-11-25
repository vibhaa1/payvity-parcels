import { I18N, Lang } from "@/data/content";

export function Footer({ lang }: { lang: Lang }) {
  const copy = I18N[lang];

  return (
    <footer>
      <div className="wrap">
        <span>{copy.footer_copy}</span>
        <div className="foot-links">
          <a href="mailto:partner@payvityparcels.de">{copy.foot_contact}</a>
          <a href="#">{copy.foot_privacy}</a>
          <a href="#">{copy.foot_imprint}</a>
        </div>
      </div>
    </footer>
  );
}
