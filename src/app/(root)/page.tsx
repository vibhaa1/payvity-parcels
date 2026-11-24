import Script from "next/script";

export default function RootRedirectPage() {
  return (
    <main style={{ maxWidth: 460, textAlign: "center" }}>
      <h1 style={{ fontSize: "1.4rem", marginBottom: 12 }}>PAYVITY Parcels</h1>
      <p style={{ color: "#475569", marginBottom: 20 }}>
        Weiterleitung zur deutschen Seite… / Redirecting to German version…
      </p>
      <p style={{ display: "flex", gap: 16, justifyContent: "center" }}>
        <a href="/de/" style={{ color: "#2563eb", fontWeight: 600 }}>
          Deutsch (/de/)
        </a>
        <a href="/en/" style={{ color: "#2563eb", fontWeight: 600 }}>
          English (/en/)
        </a>
      </p>
      <Script id="root-redirect" strategy="afterInteractive">
        {`if (typeof window !== "undefined" && window.location.pathname === "/") { window.location.replace("/de/"); }`}
      </Script>
    </main>
  );
}
