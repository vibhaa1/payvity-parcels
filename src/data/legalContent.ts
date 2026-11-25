import type { Lang } from "@/lib/seo";

export interface LegalSection {
  heading: string;
  paragraphs: string[];
}

export interface LegalDocumentContent {
  metaTitle: string;
  metaDescription: string;
  breadcrumbHome: string;
  title: string;
  notice: string;
  sections: LegalSection[];
}

export const IMPRESSUM_CONTENT: Record<Lang, LegalDocumentContent> = {
  de: {
    metaTitle: "Impressum | PAYVITY Parcels",
    metaDescription:
      "Gesetzliche Pflichtangaben gemäß § 5 DDG für die Website payvityparcels.de der PAYVITY Parcels.",
    breadcrumbHome: "Startseite",
    title: "Impressum",
    notice:
      "Hinweis für den Betreiber: Bitte ersetzen Sie die gekennzeichneten Platzhalter [BITTE ERGÄNZEN: ...] vor dem produktiven Go-live durch Ihre vollständigen Handelsregister- und Unternehmensangaben gemäß § 5 DDG.",
    sections: [
      {
        heading: "Angaben gemäß § 5 DDG (Digitale-Dienste-Gesetz)",
        paragraphs: [
          "PAYVITY Parcels",
          "[BITTE ERGÄNZEN: Vollständiger Firmenname und Rechtsform, z. B. GmbH oder UG (haftungsbeschränkt)]",
          "[BITTE ERGÄNZEN: Straße und Hausnummer]",
          "[BITTE ERGÄNZEN: Postleitzahl und Ort, Deutschland]",
        ],
      },
      {
        heading: "Kontakt",
        paragraphs: [
          "E-Mail: partner@payvityparcels.de",
          "Telefon: [BITTE ERGÄNZEN: Offizielle geschäftliche Telefonnummer]",
          "Website: https://payvityparcels.de",
        ],
      },
      {
        heading: "Vertretungsberechtigte Person(en)",
        paragraphs: [
          "Vertreten durch: [BITTE ERGÄNZEN: Vor- und Nachname der Geschäftsführung / Inhaber]",
        ],
      },
      {
        heading: "Registereintrag & Umsatzsteuer-ID",
        paragraphs: [
          "Registergericht: [BITTE ERGÄNZEN: Amtsgericht, falls eingetragen]",
          "Registernummer: [BITTE ERGÄNZEN: HRB / HRA Nummer, falls eingetragen]",
          "Umsatzsteuer-Identifikationsnummer gemäß § 27a UStG: [BITTE ERGÄNZEN: DE...]",
        ],
      },
      {
        heading: "Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV",
        paragraphs: [
          "[BITTE ERGÄNZEN: Name und Anschrift der inhaltlich verantwortlichen Person]",
        ],
      },
      {
        heading: "Markenhinweis",
        paragraphs: [
          "Amazon, Amazon Hub Counter und Amazon Hub Locker sind eingetragene Marken der Amazon Technologies, Inc. oder verbundener Unternehmen. PAYVITY Parcels agiert als Partnerunternehmen zur Gewinnung und Betreuung von Paketshop- und Locker-Standorten in Deutschland.",
        ],
      },
    ],
  },
  en: {
    metaTitle: "Legal Notice (Impressum) | PAYVITY Parcels",
    metaDescription:
      "Statutory corporate disclosures under Section 5 of the German Digital Services Act (DDG) for payvityparcels.de.",
    breadcrumbHome: "Home",
    title: "Legal Notice (Impressum)",
    notice:
      "Operator notice: Please replace every [PLEASE COMPLETE: ...] placeholder with your verified German corporate registration details pursuant to § 5 DDG before live deployment.",
    sections: [
      {
        heading: "Information pursuant to § 5 DDG (Germany)",
        paragraphs: [
          "PAYVITY Parcels",
          "[PLEASE COMPLETE: Full legal company name and legal form, e.g. GmbH / UG]",
          "[PLEASE COMPLETE: Street address and house number]",
          "[PLEASE COMPLETE: Postal code and city, Germany]",
        ],
      },
      {
        heading: "Contact",
        paragraphs: [
          "Email: partner@payvityparcels.de",
          "Phone: [PLEASE COMPLETE: Business telephone number]",
          "Website: https://payvityparcels.de",
        ],
      },
      {
        heading: "Authorized Representative(s)",
        paragraphs: [
          "Represented by: [PLEASE COMPLETE: Managing Director / Owner name]",
        ],
      },
      {
        heading: "Commercial Register & VAT ID",
        paragraphs: [
          "Register Court: [PLEASE COMPLETE: Local Court / Amtsgericht, if applicable]",
          "Registration Number: [PLEASE COMPLETE: HRB / HRA number, if applicable]",
          "VAT Identification Number pursuant to § 27a UStG: [PLEASE COMPLETE: DE...]",
        ],
      },
      {
        heading: "Trademark Notice",
        paragraphs: [
          "Amazon, Amazon Hub Counter, and Amazon Hub Locker are trademarks of Amazon Technologies, Inc. or its affiliates. PAYVITY Parcels operates as a partner onboarding and supporting local Pickup & Locker sites in Germany.",
        ],
      },
    ],
  },
};

export const DATENSCHUTZ_CONTENT: Record<Lang, LegalDocumentContent> = {
  de: {
    metaTitle: "Datenschutzerklärung | PAYVITY Parcels",
    metaDescription:
      "Informationen zur Verarbeitung personenbezogener Daten gemäß DSGVO bei der Standortanfrage über payvityparcels.de.",
    breadcrumbHome: "Startseite",
    title: "Datenschutzerklärung",
    notice:
      "Hinweis für den Betreiber: Bitte ergänzen Sie im Abschnitt „Verantwortlicher“ Ihre vollständige Geschäftsadresse und prüfen Sie die Hinweise zu Ihrem E-Mail-Versand und Google-Sheets-Auftragsverarbeitungsvertrag (AVV).",
    sections: [
      {
        heading: "1. Verantwortlicher im Sinne der DSGVO",
        paragraphs: [
          "PAYVITY Parcels",
          "[BITTE ERGÄNZEN: Vollständiger Firmenname, Straße, Hausnummer, PLZ, Ort, Deutschland]",
          "E-Mail: partner@payvityparcels.de",
          "Telefon: [BITTE ERGÄNZEN: Telefonnummer]",
        ],
      },
      {
        heading: "2. Bereitstellung der Website und Server-Logfiles (Cloudflare Pages)",
        paragraphs: [
          "Diese Website wird als statische Webanwendung über Cloudflare Pages (Cloudflare, Inc.) bereitgestellt. Beim Aufruf der Seiten werden technisch erforderliche Verbindungsdaten (z. B. IP-Adresse, Zeitpunkt des Zugriffs, aufgerufene URL, Browsertyp) verarbeitet, um Auslieferung, Stabilität und IT-Sicherheit zu gewährleisten (Art. 6 Abs. 1 lit. f DSGVO).",
        ],
      },
      {
        heading: "3. Verarbeitung von Partneranfragen (Digitales Partner-Onboarding)",
        paragraphs: [
          "Wenn Sie unser digitales Onboarding-Formular absenden, verarbeiten wir die von Ihnen angegebenen Daten: gewünschtes Modell (Amazon Paketshop, Amazon Locker oder Beides), Rechtsform (Einzelunternehmen oder Gesellschaft), bevorzugte Kontaktsprache, Ansprechpartner, Mobilnummer, optionale E-Mail-Adresse, Unternehmens- und Standortdaten (Firmenname, Branche, optionale USt-IdNr., freiwillig angegebene IBAN, Adresse, PLZ, Ort, Bundesland), Geschäftsdaten (Schaufenstername, Website, geschätzte Paketkapazität, bestehende Paketdienste, Öffnungszeiten), optional hochgeladene Nachweisdokumente sowie technische Herkunftsparameter (Landing Page, Referrer, UTM-Parameter).",
          "Zweck der Verarbeitung ist die kostenlose Prüfung der Standort-Eignung sowie die telefonische oder elektronische Kontaktaufnahme in Ihrer gewählten Kontaktsprache zur Vorbereitung einer möglichen Partnerschaft (Art. 6 Abs. 1 lit. b DSGVO bzw. Art. 6 Abs. 1 lit. f DSGVO). Ihre Angaben werden zur internen Nachverfolgung per E-Mail an unser Partner-Team übermittelt, in einer geschützten Google-Sheets-Übersicht erfasst und – sofern Sie freiwillig Dokumente hochladen – im geschützten Dokumentenspeicher hinterlegt.",
        ],
      },
      {
        heading: "4. Cookies und Tracking",
        paragraphs: [
          "Auf payvityparcels.de setzen wir keine Werbe- oder Marketing-Cookies ein. Es erfolgt kein seitenübergreifendes Nutzer-Tracking zu Werbezwecken.",
        ],
      },
      {
        heading: "5. Speicherdauer",
        paragraphs: [
          "Anfragedaten werden gespeichert, solange dies für die Standortprüfung, die Anbahnung oder Durchführung einer Partnerschaft sowie zur Einhaltung gesetzlicher Aufbewahrungsfristen erforderlich ist.",
        ],
      },
      {
        heading: "6. Ihre Rechte nach der DSGVO",
        paragraphs: [
          "Sie haben jederzeit das Recht auf Auskunft (Art. 15 DSGVO), Berichtigung (Art. 16 DSGVO), Löschung (Art. 17 DSGVO), Einschränkung der Verarbeitung (Art. 18 DSGVO), Datenübertragbarkeit (Art. 20 DSGVO) sowie Widerspruch gegen die Verarbeitung (Art. 21 DSGVO). Zudem steht Ihnen ein Beschwerderecht bei einer zuständigen Datenschutzaufsichtsbehörde zu.",
          "Zur Ausübung Ihrer Rechte genügt eine Nachricht an partner@payvityparcels.de.",
        ],
      },
    ],
  },
  en: {
    metaTitle: "Privacy Policy | PAYVITY Parcels",
    metaDescription:
      "GDPR information on how PAYVITY Parcels processes personal and business contact details submitted via payvityparcels.de.",
    breadcrumbHome: "Home",
    title: "Privacy Policy",
    notice:
      "Operator notice: Please fill in your full registered address under Controller Details and verify your email/Google Workspace DPA setup.",
    sections: [
      {
        heading: "1. Controller under GDPR",
        paragraphs: [
          "PAYVITY Parcels",
          "[PLEASE COMPLETE: Full legal entity name, street address, postal code, city, Germany]",
          "Email: partner@payvityparcels.de",
          "Phone: [PLEASE COMPLETE: Telephone number]",
        ],
      },
      {
        heading: "2. Hosting & Technical Server Logs (Cloudflare Pages)",
        paragraphs: [
          "This website is delivered as a static application via Cloudflare Pages. When accessing pages, technically necessary connection metadata (such as IP address, timestamp, requested URL, and user agent) is processed to ensure delivery, availability, and security (Art. 6(1)(f) GDPR).",
        ],
      },
      {
        heading: "3. Partner Onboarding & Location Check Inquiries",
        paragraphs: [
          "When you submit our digital partner onboarding wizard, we process the details provided: selected model (Amazon Parcel Shop, Amazon Locker, or Both), legal entity form, preferred callback language, contact person, mobile phone number, optional email address, company and site details (company name, category, optional VAT ID, optional IBAN, street address, postal code, city, federal state), storefront metadata (display name, website, estimated parcel capacity, existing parcel carriers, opening hours), any voluntarily uploaded verification files, and optional referral/UTM context.",
          "Processing takes place solely to evaluate location suitability and contact you in your chosen language regarding a partnership (Art. 6(1)(b) and Art. 6(1)(f) GDPR). Inquiries are routed to our onboarding team via email, recorded in Google Sheets, and any voluntarily uploaded files are stored securely for verification.",
        ],
      },
      {
        heading: "4. Cookies",
        paragraphs: [
          "This website does not deploy advertising or cross-site marketing cookies.",
        ],
      },
      {
        heading: "5. Retention & Your GDPR Rights",
        paragraphs: [
          "Inquiry records are retained only for as long as needed to evaluate and manage partner onboarding or fulfill statutory retention duties. Under GDPR you have rights of access, rectification, erasure, restriction, data portability, objection, and complaint to a supervisory authority. Contact partner@payvityparcels.de for any request.",
        ],
      },
    ],
  },
};
