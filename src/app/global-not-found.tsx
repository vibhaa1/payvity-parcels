import type { Metadata } from "next";
import "@fontsource-variable/inter";
import "./globals.css";

export const metadata: Metadata = {
  title: "404 — Seite nicht gefunden | PAYVITY Parcels",
  description:
    "Die angeforderte Seite wurde auf payvityparcels.de nicht gefunden.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function GlobalNotFound() {
  return (
    <html lang="de">
      <body>
        <main className="not-found-shell">
          <div className="not-found-card">
            <span className="not-found-code">404</span>
            <h1>Seite nicht gefunden</h1>
            <p>
              Die angeforderte Seite existiert leider nicht oder wurde verschoben.
              <br />
              The requested page could not be found.
            </p>
            <div className="not-found-actions">
              <a className="button" href="/de/">
                Zur Startseite (DE)
              </a>
              <a className="button outline-dark" href="/de/amazon-locker/">
                Amazon Locker
              </a>
              <a className="button outline-dark" href="/en/">
                English (EN)
              </a>
            </div>
          </div>
        </main>
      </body>
    </html>
  );
}
