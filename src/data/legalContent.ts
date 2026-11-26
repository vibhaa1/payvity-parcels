import type { Lang } from "@/lib/seo";

export interface LegalSection {
  heading: string;
  paragraphs?: string[];
  bullets?: string[];
  afterBullets?: string[];
}

export interface LegalDocumentContent {
  metaTitle: string;
  metaDescription: string;
  breadcrumbHome: string;
  backHomeLabel: string;
  title: string;
  notice?: string;
  sections: LegalSection[];
}

export const IMPRESSUM_CONTENT: Record<Lang, LegalDocumentContent> = {
  de: {
    metaTitle: "Impressum | PAYVITY Parcels",
    metaDescription:
      "Impressum und gesetzliche Pflichtangaben gemäß §5 TMG der Payvity UG (haftungsbeschränkt).",
    breadcrumbHome: "Startseite",
    backHomeLabel: "Zurück zur Startseite",
    title: "Impressum",
    sections: [
      {
        heading: "Angaben gemäß §5 TMG",
        paragraphs: [
          "Payvity UG (haftungsbeschränkt)",
          "Merzhausener Straße 12",
          "61389 Schmitten am Taunus",
          "Deutschland",
        ],
      },
      {
        heading: "Vertreten durch",
        paragraphs: ["Deepak Arora (Geschäftsführer)"],
      },
      {
        heading: "Kontakt",
        paragraphs: [
          "Telefon: +49 1577 7777441",
          "E-Mail: sales@payvity-amazon.de",
        ],
      },
      {
        heading: "Registereintrag",
        paragraphs: [
          "Eintragung im Handelsregister.",
          "Registergericht: Königstein im Taunus",
          "Registernummer: HRB 12212",
        ],
      },
      {
        heading: "Umsatzsteuer-ID",
        paragraphs: [
          "Umsatzsteuer-Identifikationsnummer gemäß §27a Umsatzsteuergesetz:",
          "003 241 10035",
        ],
      },
      {
        heading: "Verantwortlich für den Inhalt nach §18 Abs. 2 MStV",
        paragraphs: [
          "Deepak Arora",
          "Merzhausener Straße 12, 61389 Schmitten am Taunus",
        ],
      },
      {
        heading: "Streitschlichtung",
        paragraphs: [
          "Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit: https://ec.europa.eu/consumers/odr/. Wir sind nicht verpflichtet und nicht bereit, an einem Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.",
        ],
      },
    ],
  },
  en: {
    metaTitle: "Legal Notice | PAYVITY Parcels",
    metaDescription:
      "Statutory corporate disclosures pursuant to §5 TMG for Payvity UG (haftungsbeschränkt).",
    breadcrumbHome: "Home",
    backHomeLabel: "Back to homepage",
    title: "Legal Notice",
    sections: [
      {
        heading: "Information pursuant to §5 TMG",
        paragraphs: [
          "Payvity UG (haftungsbeschränkt)",
          "Merzhausener Straße 12",
          "61389 Schmitten am Taunus",
          "Germany",
        ],
      },
      {
        heading: "Represented by",
        paragraphs: ["Deepak Arora (Managing Director)"],
      },
      {
        heading: "Contact",
        paragraphs: [
          "Phone: +49 1577 7777441",
          "Email: sales@payvity-amazon.de",
        ],
      },
      {
        heading: "Commercial Register",
        paragraphs: [
          "Entry in the Commercial Register.",
          "Register Court: Königstein im Taunus",
          "Registration Number: HRB 12212",
        ],
      },
      {
        heading: "VAT ID",
        paragraphs: [
          "VAT Identification Number pursuant to §27a of the German VAT Act (Umsatzsteuergesetz):",
          "003 241 10035",
        ],
      },
      {
        heading: "Responsible for content pursuant to §18 Abs. 2 MStV",
        paragraphs: [
          "Deepak Arora",
          "Merzhausener Straße 12, 61389 Schmitten am Taunus",
        ],
      },
      {
        heading: "Dispute Resolution",
        paragraphs: [
          "The European Commission provides a platform for Online Dispute Resolution (ODR): https://ec.europa.eu/consumers/odr/. We are neither obliged nor willing to participate in dispute resolution proceedings before a consumer arbitration board.",
        ],
      },
    ],
  },
};

export const DATENSCHUTZ_CONTENT: Record<Lang, LegalDocumentContent> = {
  de: {
    metaTitle: "Datenschutzerklärung | PAYVITY Parcels",
    metaDescription:
      "Datenschutzerklärung der Payvity UG (haftungsbeschränkt) gemäß DSGVO.",
    breadcrumbHome: "Startseite",
    backHomeLabel: "Zurück zur Startseite",
    title: "Datenschutzerklärung",
    sections: [
      {
        heading: "1. Verantwortliche Stelle",
        paragraphs: [
          "Verantwortlich für die Verarbeitung personenbezogener Daten auf dieser Website ist:",
          "Payvity UG (haftungsbeschränkt)",
          "Merzhausener Straße 12, 61389 Schmitten am Taunus",
          "Telefon: +49 1577 7777441",
          "E-Mail: sales@payvity-amazon.de",
        ],
      },
      {
        heading: "2. Welche Daten wir erheben",
        paragraphs: [
          "Im Rahmen unseres Kontakt- und Bewerbungsformulars für Gegenpartner erheben wir insbesondere folgende Kategorien personenbezogener Daten:",
        ],
        bullets: [
          "Persönliche Angaben (z. B. Name, Anschrift, Kontaktdaten)",
          "Unternehmensangaben (z. B. Firmenname, Rechtsform, Handelsregisternummer)",
          "Bankverbindung / Zahlungsdaten",
          "Hochgeladene Dokumente (z. B. Nachweise, Gewerbeanmeldung)",
          "Unterschrift",
        ],
      },
      {
        heading: "3. Zweck der Verarbeitung",
        paragraphs: [
          "Die erhobenen Daten werden verarbeitet, um Anfragen zur Gegenpartnerschaft zu bearbeiten, Verträge vorzubereiten und abzuschließen, gesetzliche Prüf- und Sorgfaltspflichten zu erfüllen.",
        ],
      },
      {
        heading: "4. Rechtsgrundlage",
        paragraphs: [
          "Die Verarbeitung erfolgt auf Grundlage von Art. 6 Abs. 1 lit. b DSGVO (Vertragsanbahnung/-erfüllung), Art. 6 Abs. 1 lit. c DSGVO (rechtliche Verpflichtung) und/oder Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse).",
        ],
      },
      {
        heading: "5. Speicherdauer",
        paragraphs: [
          "Personenbezogene Daten werden nur so lange gespeichert, wie dies für die genannten Zwecke erforderlich ist oder gesetzliche Aufbewahrungsfristen dies vorschreiben. Handelsrechtlich relevante Unterlagen werden gemäß §257 HGB in der Regel 6 Jahre aufbewahrt, steuerrechtlich relevante Unterlagen gemäß §147 AO bis zu 10 Jahre.",
        ],
      },
      {
        heading: "6. Ihre Rechte als betroffene Person",
        paragraphs: [
          "Sie haben im Rahmen der gesetzlichen Vorgaben das Recht auf:",
        ],
        bullets: [
          "Auskunft über Ihre gespeicherten Daten (Art. 15 DSGVO)",
          "Berichtigung unrichtiger Daten (Art. 16 DSGVO)",
          "Löschung Ihrer Daten (Art. 17 DSGVO)",
          "Einschränkung der Verarbeitung (Art. 18 DSGVO)",
          "Widerspruch gegen die Verarbeitung (Art. 21 DSGVO)",
          "Datenübertragbarkeit (Art. 20 DSGVO)",
        ],
        afterBullets: [
          "Ihnen steht zudem ein Beschwerderecht bei einer Datenschutzaufsichtsbehörde zu.",
        ],
      },
      {
        heading: "7. Kontakt für Datenschutzanfragen",
        paragraphs: [
          "Bei Fragen zur Verarbeitung Ihrer personenbezogenen Daten wenden Sie sich bitte an:",
          "Payvity UG (haftungsbeschränkt)",
          "E-Mail: info@payvity.de",
        ],
      },
    ],
  },
  en: {
    metaTitle: "Privacy Policy | PAYVITY Parcels",
    metaDescription:
      "Privacy Policy of Payvity UG (haftungsbeschränkt) pursuant to the GDPR.",
    breadcrumbHome: "Home",
    backHomeLabel: "Back to homepage",
    title: "Privacy Policy",
    sections: [
      {
        heading: "1. Controller",
        paragraphs: [
          "The controller responsible for processing personal data on this website is:",
          "Payvity UG (haftungsbeschränkt)",
          "Merzhausener Straße 12, 61389 Schmitten am Taunus",
          "Phone: +49 1577 7777441",
          "Email: sales@payvity-amazon.de",
        ],
      },
      {
        heading: "2. What Data We Collect",
        paragraphs: [
          "As part of our contact and application form for counter partners, we collect in particular the following categories of personal data:",
        ],
        bullets: [
          "Personal details (e.g., name, address, contact details)",
          "Company details (e.g., company name, legal form, commercial register number)",
          "Bank details / payment data",
          "Uploaded documents (e.g., verification records, trade registration)",
          "Signature",
        ],
       
      },
      {
        heading: "3. Purpose of Processing",
        paragraphs: [
          "The collected data is processed in order to process counter partnership inquiries, prepare and conclude contracts, and fulfill statutory verification and due diligence obligations.",
        ],
      },
      {
        heading: "4. Legal Basis",
        paragraphs: [
          "Processing is carried out on the basis of Art. 6(1)(b) GDPR (performance of a contract or pre-contractual steps), Art. 6(1)(c) GDPR (legal obligation), and/or Art. 6(1)(f) GDPR (legitimate interest).",
        ],
      },
      {
        heading: "5. Storage Period",
        paragraphs: [
          "Personal data is stored only for as long as necessary for the stated purposes or as required by statutory retention periods. Commercial documents are generally retained for 6 years pursuant to §257 HGB, and tax-relevant documents for up to 10 years pursuant to §147 AO. ",
        ],
      },
      {
        heading: "6. Your Rights as a Data Subject",
        paragraphs: [
          "Within the scope of applicable law, you have the right to:",
        ],
        bullets: [
          "Access to your stored data (Art. 15 GDPR)",
          "Rectification of inaccurate data (Art. 16 GDPR)",
          "Erasure of your data (Art. 17 GDPR)",
          "Restriction of processing (Art. 18 GDPR)",
          "Object to processing (Art. 21 GDPR)",
          "Data portability (Art. 20 GDPR)",
        ],
        afterBullets: [
          "You also have the right to lodge a complaint with a data protection supervisory authority.",
        ],
      },
      {
        heading: "7. Contact for Privacy Inquiries",
        paragraphs: [
          "If you have any questions regarding the processing of your personal data, please contact:",
          "Payvity UG (haftungsbeschränkt)",
          "Email: info@payvity.de",
        ],
      },
    ],
  },
};

export const AGB_CONTENT: Record<Lang, LegalDocumentContent> = {
  de: {
    metaTitle: "Allgemeine Geschäftsbedingungen | PAYVITY Parcels",
    metaDescription:
      "Allgemeine Geschäftsbedingungen (AGB) der Payvity UG (haftungsbeschränkt).",
    breadcrumbHome: "Startseite",
    backHomeLabel: "Zurück zur Startseite",
    title: "Allgemeine Geschäftsbedingungen",
    sections: [
      {
        heading: "1. Geltungsbereich",
        paragraphs: [
          "Diese Allgemeinen Geschäftsbedingungen (AGB) gelten für alle Verträge zwischen Payvity UG (haftungsbeschränkt) und den als Gegenpartner teilnehmenden Geschäftspartnern im Rahmen des Betriebs von Paketstationen.",
        ],
      },
      {
        heading: "2. Vertragsschluss",
        paragraphs: [
          "Ein Vertrag kommt zustande durch Antrag des Gegenpartners über das Kontaktformular und schriftliche Bestätigung durch Payvity UG (haftungsbeschränkt).",
        ],
      },
      {
        heading: "3. Pflichten der Vertragspartner",
        paragraphs: [
          "Beschreibung der Pflichten von Payvity UG (haftungsbeschränkt) und des Gegenpartners, z. B. Bereitstellung der Paketstation, Annahme/Ausgabe von Sendungen, Einhaltung der Sicherheitsvorgaben.",
        ],
      },
      {
        heading: "4. Haftung",
        paragraphs: [
          "Regelungen zur Haftung von Payvity UG (haftungsbeschränkt), insbesondere Haftungsausschlüsse und -beschränkungen im gesetzlich zulässigen Rahmen.",
        ],
      },
      {
        heading: "5. Laufzeit und Kündigung",
        paragraphs: [
          "Angaben zur Vertragslaufzeit, ordentlichen und außerordentlichen Kündigungsfristen sowie -formen.",
        ],
      },
      {
        heading: "6. Schlussbestimmungen",
        paragraphs: [
          "Es gilt das Recht der Bundesrepublik Deutschland. Sollten einzelne Bestimmungen dieser AGB unwirksam sein, bleibt die Wirksamkeit der übrigen Bestimmungen unberührt.",
        ],
      },
    ],
  },
  en: {
    metaTitle: "Terms and Conditions | PAYVITY Parcels",
    metaDescription:
      "General Terms and Conditions of Payvity UG (haftungsbeschränkt).",
    breadcrumbHome: "Home",
    backHomeLabel: "Back to homepage",
    title: "Terms and Conditions",
    sections: [
      {
        heading: "1. Scope",
        paragraphs: [
          "These General Terms and Conditions apply to all contracts between Payvity UG (haftungsbeschränkt) and business partners participating as counter partners in connection with operating parcel stations.",
        ],
      },
      {
        heading: "2. Conclusion of Contract",
        paragraphs: [
          "A contract is concluded upon application by the counter partner via the contact form and written confirmation by Payvity UG (haftungsbeschränkt).",
        ],
      },
      {
        heading: "3. Obligations of the Contracting Parties",
        paragraphs: [
          "Description of the obligations of Payvity UG (haftungsbeschränkt) and the counter partner, e.g., provision of the parcel station, acceptance/handover of shipments, and compliance with security requirements.",
        ],
      },
      {
        heading: "4. Liability",
        paragraphs: [
          "Provisions on the liability of Payvity UG (haftungsbeschränkt), in particular exclusions and limitations of liability to the extent permitted by law.",
        ],
      },
      {
        heading: "5. Term and Termination",
        paragraphs: [
          "Details on contract term, ordinary and extraordinary notice periods, and termination formalities.",
        ],
      },
      {
        heading: "6. Final Provisions",
        paragraphs: [
          "The laws of the Federal Republic of Germany shall apply. Should individual provisions of these Terms and Conditions be invalid, the validity of the remaining provisions shall remain unaffected.",
        ],
      },
    ],
  },
};
