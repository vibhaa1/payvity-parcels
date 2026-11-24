import type { Lang } from "@/lib/seo";
import type {
  ContactLanguageCode,
  DayKey,
  IdDocType,
  LegalForm,
} from "@/lib/onboardingUtils";

export interface ContactLanguageOption {
  code: ContactLanguageCode;
  badge: string;
  nativeLabel: string;
  deLabel: string;
  enLabel: string;
}

export const CONTACT_LANGUAGES: ContactLanguageOption[] = [
  {
    code: "de",
    badge: "DE",
    nativeLabel: "Deutsch",
    deLabel: "Deutsch",
    enLabel: "German",
  },
  {
    code: "tr",
    badge: "TR",
    nativeLabel: "Türkçe",
    deLabel: "Türkisch",
    enLabel: "Turkish",
  },
  {
    code: "ku",
    badge: "KU",
    nativeLabel: "Kurdî",
    deLabel: "Kurdisch",
    enLabel: "Kurdish",
  },
  {
    code: "hi",
    badge: "HI",
    nativeLabel: "हिन्दी",
    deLabel: "Hindi",
    enLabel: "Hindi",
  },
  {
    code: "en",
    badge: "EN",
    nativeLabel: "English",
    deLabel: "Englisch",
    enLabel: "English",
  },
  {
    code: "af",
    badge: "AF",
    nativeLabel: "دری / پښتو",
    deLabel: "Afghanisch",
    enLabel: "Afghan (Dari / Pashto)",
  },
];

export const CARRIER_OPTIONS = ["DHL", "Hermes", "DPD", "GLS", "UPS"] as const;

export const INDUSTRY_PRESETS: Record<Lang, string[]> = {
  de: [
    "Kiosk & Späti",
    "Mini-Markt & Lebensmittel",
    "Groß- und Einzelhandel",
    "Tankstelle",
    "Schreibwaren & Lotto-Annahmestelle",
    "Bäckerei & Café",
    "Buchhandlung",
    "Apotheke & Drogerie",
    "Handy- & Dienstleistungsshop",
    "Sonstiges Ladengeschäft",
  ],
  en: [
    "Kiosk & Late-night shop (Späti)",
    "Mini-market & Grocery",
    "General Retail",
    "Petrol Station",
    "Stationery & Lottery",
    "Bakery & Café",
    "Bookstore",
    "Pharmacy & Drugstore",
    "Mobile & Local Services",
    "Other Retail Location",
  ],
};

export interface DocumentDef {
  id: string;
  title: string;
  desc: string;
  required: boolean;
  badge: string;
  helpTitle: string;
  helpSteps: string[];
  externalLink?: { label: string; href: string };
}

export function getDocumentDefinitions(
  legalForm: LegalForm,
  idDocType: IdDocType,
  lang: Lang
): DocumentDef[] {
  const isDe = lang === "de";

  const idDocs: DocumentDef[] =
    idDocType === "id_card"
      ? [
          {
            id: "id_front",
            title: isDe
              ? "Personalausweis oder Aufenthaltstitel: Vorderseite"
              : "National ID or Residence Permit: Front",
            desc: isDe
              ? "Gut lesbares Foto der Vorderseite. Bei einer Gesellschaft der Ausweis des gesetzlichen Vertreters."
              : "Clear photo of the front side. For companies, the ID of the authorized representative.",
            required: true,
            badge: isDe ? "Empfohlen" : "Recommended",
            helpTitle: isDe ? "Wie fotografiere ich richtig?" : "Tips for a clear photo",
            helpSteps: isDe
              ? [
                  "Alle vier Ecken des Ausweises müssen sichtbar sein.",
                  "Blitzlicht vermeiden, damit keine Spiegelung auf dem Foto entsteht.",
                ]
              : [
                  "Make sure all four corners of the document are visible.",
                  "Avoid camera flash glare over text or portrait.",
                ],
          },
          {
            id: "id_back",
            title: isDe
              ? "Personalausweis oder Aufenthaltstitel: Rückseite"
              : "National ID or Residence Permit: Back",
            desc: isDe
              ? "Die Rückseite desselben gültigen Ausweisdokuments."
              : "The reverse side of the same valid ID document.",
            required: true,
            badge: isDe ? "Empfohlen" : "Recommended",
            helpTitle: isDe ? "Worauf achten?" : "What to check",
            helpSteps: isDe
              ? ["Aktuelle Anschrift und Gültigkeitsdatum müssen lesbar sein."]
              : ["Current address and expiry date must be readable."],
          },
        ]
      : [
          {
            id: "passport",
            title: isDe ? "Reisepass: Fotoseite" : "Passport: Photo page",
            desc: isDe
              ? "Doppelseitige, gut lesbare Kopie bzw. Foto Ihrer gültigen Pass-Datenseite."
              : "Clear copy or photo of your valid passport photo page.",
            required: true,
            badge: isDe ? "Empfohlen" : "Recommended",
            helpTitle: isDe ? "Hinweis zum Reisepass" : "Passport upload note",
            helpSteps: isDe
              ? [
                  "Bei einem Reisepass ohne Adressfeld kann zusätzlich die Meldebescheinigung hilfreich sein.",
                ]
              : [
                  "If your passport has no address field, keep a proof of address ready.",
                ],
          },
        ];

  const commonDocs: DocumentDef[] = [
    {
      id: "bank_proof",
      title: isDe ? "Bankverbindung (IBAN-Nachweis)" : "Bank account proof (IBAN)",
      desc: isDe
        ? "Kontoauszug, Briefkopf oder Screenshot Ihrer Bank mit IBAN, BIC und Kontoinhaber des Geschäftskontos."
        : "Bank statement or confirmation showing IBAN, BIC, and business account holder.",
      required: true,
      badge: isDe ? "Empfohlen" : "Recommended",
      helpTitle: isDe ? "Wie bekomme ich das?" : "How do I get this?",
      helpSteps: isDe
        ? [
            "Im Online-Banking als „IBAN-Bestätigung“ oder „Kontoauszug PDF“ herunterladen.",
            "Kontobewegungen bzw. Kontostand können Sie selbstverständlich schwärzen.",
          ]
        : [
            "Download a bank confirmation or statement header from your online banking.",
            "You may redact transaction amounts or account balances.",
          ],
    },
    {
      id: "address_proof",
      title: isDe ? "Nachweis der Geschäftsadresse" : "Proof of business address",
      desc: isDe
        ? "Gewerbeanmeldung, Mietvertrag oder aktuelle Versorger-/Telefonrechnung auf Firmennamen und Standortadresse."
        : "Trade registration, lease agreement, or recent utility bill showing company name and shop address.",
      required: true,
      badge: isDe ? "Empfohlen" : "Recommended",
      helpTitle: isDe ? "Welche Dokumente zählen?" : "Accepted documents",
      helpSteps: isDe
        ? [
            "Die ersten 1–2 Seiten Ihres Mietvertrags reichen aus (Beträge dürfen geschwärzt sein).",
            "Alternativ eine aktuelle Strom-, Wasser- oder Telefonrechnung der Geschäftsadresse.",
          ]
        : [
            "The first 1–2 pages of your lease agreement suffice (rent amounts may be redacted).",
            "Alternatively, a recent electricity, water, or phone bill for the location.",
          ],
    },
    {
      id: "tax_doc",
      title: isDe ? "Steuernummer oder USt-IdNr." : "Tax ID or VAT ID notice",
      desc: isDe
        ? "Schreiben des Finanzamts mit Steuernummer oder Bescheid des Bundeszentralamts für Steuern (BZSt)."
        : "Official letter from your tax office (Finanzamt) or Federal Central Tax Office (BZSt).",
      required: true,
      badge: isDe ? "Empfohlen" : "Recommended",
      helpTitle: isDe ? "Wo finde ich das Schreiben?" : "Where to find it",
      helpSteps: isDe
        ? [
            "Zu finden auf dem „Fragebogen zur steuerlichen Erfassung“, Umsatzsteuer-Bescheid oder ELSTER-Postfach.",
          ]
        : [
            "Found on your tax registration confirmation, VAT notice, or ELSTER inbox.",
          ],
    },
  ];

  const entityDocs: DocumentDef[] =
    legalForm === "einzelunternehmen"
      ? [
          {
            id: "trade_register",
            title: isDe
              ? "Gewerbeanmeldung / Handelsregisterauszug (e.K.)"
              : "Trade registration / Commercial register (e.K.)",
            desc: isDe
              ? "Ihre Gewerbeanmeldung (GewA 1). Ein Handelsregisterauszug ist nur bei eingetragenen Kaufleuten (e.K.) nötig."
              : "Your trade registration (Gewerbeanmeldung). Commercial register extract only if registered as e.K.",
            required: false,
            badge: isDe ? "Je nach Form" : "If applicable",
            helpTitle: isDe ? "Wie bekomme ich das?" : "How to obtain",
            helpSteps: isDe
              ? [
                  "Ihre Gewerbeanmeldung erhalten Sie vom zuständigen Gewerbeamt.",
                  "Einen e.K.-Registerauszug können Sie kostenfrei im gemeinsamen Registerportal abrufen.",
                ]
              : [
                  "Issued by your local municipality trade office (Gewerbeamt).",
                  "Registered merchants (e.K.) can download extracts free from the register portal.",
                ],
            externalLink: {
              label: "handelsregister.de",
              href: "https://www.handelsregister.de/",
            },
          },
        ]
      : [
          {
            id: "commercial_register",
            title: isDe
              ? "Aktueller Handelsregisterauszug (GmbH, UG, AG, OHG, KG)"
              : "Commercial Register Extract (GmbH, UG, AG, OHG, KG)",
            desc: isDe
              ? "Aktueller chronologischer oder aktueller Abdruck aus dem Handelsregister mit Vertretungsbefugnis."
              : "Current commercial register extract showing authorized managing directors.",
            required: true,
            badge: isDe ? "Empfohlen" : "Recommended",
            helpTitle: isDe ? "Kostenloser Abruf online" : "Free online download",
            helpSteps: isDe
              ? [
                  "Auf handelsregister.de unter „Normale Suche“ Firmennamen eingeben und das PDF kostenfrei herunterladen.",
                ]
              : [
                  "Search your company name on handelsregister.de and download the PDF free of charge.",
                ],
            externalLink: {
              label: "handelsregister.de",
              href: "https://www.handelsregister.de/",
            },
          },
          {
            id: "shareholder_list",
            title: isDe
              ? "Gesellschafterliste / Vertretungsnachweis (optional)"
              : "Shareholder list / Representation proof (optional)",
            desc: isDe
              ? "Falls abweichende wirtschaftlich Berechtigte (≥ 25 % Anteile) bestehen."
              : "Required only if beneficial owners (≥ 25%) differ from managing directors.",
            required: false,
            badge: isDe ? "Optional" : "Optional",
            helpTitle: isDe ? "Wann nötig?" : "When is this needed?",
            helpSteps: isDe
              ? [
                  "Ebenfalls kostenlos über handelsregister.de im Bereich „DK“ (Dokumente) abrufbar.",
                ]
              : ["Also downloadable via handelsregister.de under company documents."],
          },
        ];

  const insuranceDoc: DocumentDef = {
    id: "insurance_proof",
    title: isDe
      ? "Nachweis der Betriebshaftpflichtversicherung"
      : "Public liability insurance confirmation",
    desc: isDe
      ? "Aktuelle Versicherungsbestätigung bzw. Police für Ihr Ladenlokal."
      : "Current business liability insurance policy or annual confirmation.",
    required: false,
    badge: isDe ? "Nachreichbar" : "Upload later OK",
    helpTitle: isDe ? "Noch nicht griffbereit?" : "Not handy right now?",
    helpSteps: isDe
      ? [
          "Kein Problem: Sie können Ihre Anfrage jetzt absenden und Versicherungs- oder fehlende Unterlagen später im Gespräch nachreichen.",
        ]
      : [
          "No problem: you can submit your inquiry now and share missing documents during onboarding.",
        ],
  };

  return [...idDocs, ...commonDocs, ...entityDocs, insuranceDoc];
}

export interface OnboardingLocaleCopy {
  sectionHeader: {
    eyebrow: string;
    title: string;
    lead: string;
    draftSaved: string;
    resetDraft: string;
  };
  steps: Array<{
    number: number;
    shortTitle: string;
    title: string;
    subtitle: string;
    whyWeAsk: string;
    tips: string[];
  }>;
  sidebar: {
    readinessTitle: string;
    dossierTitle: string;
    programLabel: string;
    legalFormLabel: string;
    languageLabel: string;
    locationLabel: string;
    docsLabel: string;
    hoursLabel: string;
    supportTitle: string;
    supportDesc: string;
    supportLangLine: string;
    notSet: string;
  };
  step1: {
    programLabel: string;
    legalFormLabel: string;
    einzelTitle: string;
    einzelDesc: string;
    gesellschaftTitle: string;
    gesellschaftDesc: string;
  };
  step2: {
    languageLabel: string;
    languageHint: string;
    salutationLabel: string;
    salutationOptions: Array<{ value: "frau" | "herr" | "divers"; label: string }>;
    fullNameLabel: string;
    fullNamePlaceholder: string;
    phoneLabel: string;
    phoneHint: string;
    phonePlaceholder: string;
    emailLabel: string;
    emailPlaceholder: string;
  };
  step3: {
    companyNameLabel: string;
    companyNamePlaceholder: string;
    industryLabel: string;
    industryCustomPlaceholder: string;
    vatLabel: string;
    vatPlaceholder: string;
    ibanLabel: string;
    ibanHint: string;
    ibanPlaceholder: string;
    ibanValidLabel: string;
    ibanInvalidLabel: string;
    streetLabel: string;
    streetPlaceholder: string;
    addressExtraLabel: string;
    addressExtraPlaceholder: string;
    plzLabel: string;
    plzPlaceholder: string;
    plzAutoDetected: string;
    cityLabel: string;
    cityPlaceholder: string;
    stateLabel: string;
    statePlaceholder: string;
    businessPhoneLabel: string;
    businessPhonePlaceholder: string;
    copyMobileLabel: string;
  };
  step4: {
    infoBannerTitle: string;
    infoBannerDesc: string;
    deferToggleTitle: string;
    deferToggleDesc: string;
    idTypeLabel: string;
    idTypeHint: string;
    idCardLabel: string;
    passportLabel: string;
    dropTitle: string;
    chooseFile: string;
    replaceFile: string;
    removeFile: string;
    notUploaded: string;
    formatNote: string;
    helpToggle: string;
    invalidFileType: string;
    fileTooLarge: string;
  };
  step5: {
    storeNameLabel: string;
    storeNameHint: string;
    storeNamePlaceholder: string;
    websiteLabel: string;
    websitePlaceholder: string;
    capacityLabel: string;
    capacityHint: string;
    capacityUnit: string;
    carriersLabel: string;
    carriersHint: string;
    previewLabel: string;
    previewBadge: string;
    previewFallbackName: string;
    previewHoursFallback: string;
  };
  step6: {
    hint: string;
    presetsLabel: string;
    presets: Array<{ id: "standard" | "kiosk" | "split"; label: string }>;
    days: Record<DayKey, string>;
    dayShort: Record<DayKey, string>;
    closedLabel: string;
    toLabel: string;
    addSplitLabel: string;
    copyWeekdaysLabel: string;
    copyAllOpenLabel: string;
    copiedFeedback: string;
    statusReadyPrefix: string;
    statusReadySuffix: string;
    statusWarnSuffix: string;
  };
  step7: {
    title: string;
    lead: string;
    editLabel: string;
    sections: {
      modelAndEntity: string;
      contact: string;
      company: string;
      documents: string;
      store: string;
      hours: string;
    };
    deferredNote: string;
    noDocsUploaded: string;
    privacyPrefix: string;
    privacyLink: string;
    privacySuffix: string;
    submitButton: string;
    submittingButton: string;
    trustLine: string;
  };
  navButtons: {
    back: string;
    next: string;
    nextReview: string;
    skipDocs: string;
  };
  validation: {
    selectProgram: string;
    contactName: string;
    phone: string;
    email: string;
    companyName: string;
    street: string;
    plz: string;
    city: string;
    ibanInvalid: string;
    storeName: string;
    openHoursRequired: string;
  };
  success: {
    badge: string;
    title: string;
    desc: string;
    refLabel: string;
    langNoticePrefix: string;
    nextStepsTitle: string;
    nextSteps: string[];
    newApplicationBtn: string;
  };
  errorFallback: string;
}

export const ONBOARDING_COPY: Record<Lang, OnboardingLocaleCopy> = {
  de: {
    sectionHeader: {
      eyebrow: "Digitales Partner-Onboarding · 2 Min.",
      title: "Jetzt Amazon Paketshop werden",
      lead: "Führen Sie Ihre kostenlose und unverbindliche Standortprüfung direkt in unserem digitalen Partner-Portal durch. Fehlende Dokumente können Sie bei Bedarf auch später nachreichen.",
      draftSaved: "Fortschritt lokal zwischengespeichert",
      resetDraft: "Zurücksetzen",
    },
    steps: [
      {
        number: 1,
        shortTitle: "Rechtsform",
        title: "Programm & Rechtsform",
        subtitle: "Wählen Sie Ihr gewünschtes Modell und die Rechtsform Ihres Unternehmens.",
        whyWeAsk:
          "Je nach Rechtsform unterscheiden sich die benötigten Nachweise für den Partnervertrag.",
        tips: [
          "Einzelunternehmen & Kioske nutzen die schlanke Gewerbe-Prüfung.",
          "Die kostenlose Standortprüfung verpflichtet Sie noch zu keinem Vertrag.",
        ],
      },
      {
        number: 2,
        shortTitle: "Kontakt",
        title: "Persönliche Kontaktdaten",
        subtitle: "So erreicht Sie unser Partner-Team in Ihrer bevorzugten Sprache.",
        whyWeAsk:
          "Unser Team spricht 6 Sprachen — wählen Sie die Sprache, in der wir Sie telefonisch am besten beraten können.",
        tips: [
          "Ihre Mobilnummer nutzen wir für die persönliche Abstimmung und spätere Verifizierung in der Amazon Hub App.",
        ],
      },
      {
        number: 3,
        shortTitle: "Unternehmen",
        title: "Unternehmens- & Standortdaten",
        subtitle: "Die geschäftlichen Angaben Ihres Standorts für die Postleitzahlen-Prüfung.",
        whyWeAsk:
          "Anhand von Straße, Postleitzahl und Branche prüfen wir das Paketpotenzial direkt in Ihrer Nachbarschaft.",
        tips: [
          "Bei Eingabe der 5-stelligen PLZ erkennen wir das Bundesland automatisch.",
          "IBAN und USt-IdNr. können Sie jetzt eintragen oder im Gespräch ergänzen.",
        ],
      },
      {
        number: 4,
        shortTitle: "Dokumente",
        title: "Dokumente (sofort oder später)",
        subtitle: "Laden Sie Nachweise bequem per Drag & Drop oder Smartphone-Foto hoch.",
        whyWeAsk:
          "Vollständige Unterlagen beschleunigen die Freischaltung deutlich — Sie können diesen Schritt aber jederzeit auch überspringen.",
        tips: [
          "Akzeptierte Formate: PDF, JPG, PNG oder WebP bis 10 MB je Datei.",
          "Klicken Sie bei Unsicherheit einfach auf „Wie bekomme ich das?“.",
        ],
      },
      {
        number: 5,
        shortTitle: "Geschäft",
        title: "Ihr Ladenlokal & Kapazität",
        subtitle: "Wie Ihr Geschäft für Kunden beim Amazon-Checkout sichtbar wird.",
        whyWeAsk:
          "Der Schaufenstername erscheint direkt im Amazon-Checkout. Ihre Paketkapazität hilft bei der Mengensteuerung.",
        tips: [
          "Der typische Durchschnitt kleinerer Läden liegt bei ca. 30 Paketen gleichzeitig.",
          "Auch bestehende Hermes-, DPD-, GLS- oder DHL-Shops können sich bewerben (sofern vertraglich zulässig).",
        ],
      },
      {
        number: 6,
        shortTitle: "Zeiten",
        title: "Öffnungszeiten",
        subtitle: "In diesen Zeiten liefern Zusteller an und Kunden holen ihre Pakete ab.",
        whyWeAsk:
          "Verlässliche Öffnungszeiten erhöhen die Kundenzufriedenheit und Abholquote an Ihrem Standort.",
        tips: [
          "Nutzen Sie eine der Schnellvorlagen oder kopieren Sie Ihre Zeiten mit einem Klick auf Mo–Fr.",
        ],
      },
      {
        number: 7,
        shortTitle: "Übersicht",
        title: "Überprüfung & Absenden",
        subtitle: "Prüfen Sie Ihre Angaben in Ruhe und senden Sie Ihre unverbindliche Standortprüfung ab.",
        whyWeAsk:
          "Nach dem Absenden erhält unser Partner-Team Ihre Daten sofort zur persönlichen Prüfung.",
        tips: [
          "Sie können jeden Bereich per Klick auf „Bearbeiten“ sofort anpassen.",
        ],
      },
    ],
    sidebar: {
      readinessTitle: "Standort-Bereitschaft",
      dossierTitle: "Live Partner-Dossier",
      programLabel: "Modell",
      legalFormLabel: "Rechtsform",
      languageLabel: "Kontaktsprache",
      locationLabel: "Standort",
      docsLabel: "Dokumente",
      hoursLabel: "Öffnungszeiten",
      supportTitle: "Persönliche Beratung",
      supportDesc: "Fragen beim Ausfüllen? Schreiben Sie uns jederzeit direkt:",
      supportLangLine:
        "Rückruf in Deutsch, Türkisch, Kurdisch, Hindi, Englisch & Afghanisch.",
      notSet: "Noch offen",
    },
    step1: {
      programLabel: "Gewünschtes Partnermodell *",
      legalFormLabel: "Rechtsform Ihres Betriebs *",
      einzelTitle: "Einzelunternehmen",
      einzelDesc: "Kleingewerbe, Kiosk-Inhaber, Späti, e.K. …",
      gesellschaftTitle: "Gesellschaft",
      gesellschaftDesc: "GmbH, UG, AG, OHG, KG …",
    },
    step2: {
      languageLabel: "Bevorzugte Kontaktsprache *",
      languageHint:
        "Unser Onboarding-Team kontaktiert Sie auf Wunsch genau in dieser Sprache.",
      salutationLabel: "Anrede (optional)",
      salutationOptions: [
        { value: "frau", label: "Frau" },
        { value: "herr", label: "Herr" },
        { value: "divers", label: "Divers" },
      ],
      fullNameLabel: "Vollständiger Name (Ansprechpartner) *",
      fullNamePlaceholder: "Vor- und Nachname",
      phoneLabel: "Mobilnummer *",
      phoneHint: "Für Ihren Rückruf sowie die Einrichtung der Amazon Hub App.",
      phonePlaceholder: "z. B. +49 171 1234567",
      emailLabel: "E-Mail-Adresse (optional)",
      emailPlaceholder: "name@geschaeft.de",
    },
    step3: {
      companyNameLabel: "Offizieller Firmenname / Gewerbename *",
      companyNamePlaceholder: "z. B. Kiosk am Markt Inh. Max Mustermann",
      industryLabel: "Branche",
      industryCustomPlaceholder: "Eigene Branche angeben",
      vatLabel: "USt-IdNr. (optional)",
      vatPlaceholder: "DE123456789",
      ibanLabel: "IBAN für Provisionsauszahlungen (optional)",
      ibanHint: "Wird direkt per Prüfziffern-Check validiert – kann auch später ergänzt werden.",
      ibanPlaceholder: "z. B. DE89 3704 0044 0532 0130 00",
      ibanValidLabel: "IBAN gültig",
      ibanInvalidLabel: "Prüfziffer / Format prüfen",
      streetLabel: "Straße & Hausnummer *",
      streetPlaceholder: "z. B. Musterstraße 12",
      addressExtraLabel: "Adresszusatz (optional)",
      addressExtraPlaceholder: "z. B. Erdgeschoss / Ecke Hauptstraße",
      plzLabel: "Postleitzahl *",
      plzPlaceholder: "60311",
      plzAutoDetected: "Auto-erkannt",
      cityLabel: "Ort / Stadt *",
      cityPlaceholder: "z. B. Frankfurt am Main",
      stateLabel: "Bundesland",
      statePlaceholder: "Bundesland wählen",
      businessPhoneLabel: "Geschäftstelefon (optional)",
      businessPhonePlaceholder: "+49 ...",
      copyMobileLabel: "Mobilnummer übernehmen",
    },
    step4: {
      infoBannerTitle: "Kein Stress bei den Unterlagen",
      infoBannerDesc:
        "Laden Sie vorhandene Dokumente direkt hier hoch, um die Prüfung zu beschleunigen. Noch nicht alles griffbereit? Aktivieren Sie „Später nachreichen“ oder klicken Sie auf Weiter.",
      deferToggleTitle: "Dokumente lieber nach dem Erstgespräch nachreichen",
      deferToggleDesc:
        "Ihr Standort wird zuerst kostenlos anhand Ihrer Geschäftsdaten geprüft.",
      idTypeLabel: "Ausweisdokument (eines genügt)",
      idTypeHint: "Wählen Sie das Dokument des Inhabers bzw. gesetzlichen Vertreters.",
      idCardLabel: "Personalausweis / Aufenthaltstitel",
      passportLabel: "Reisepass",
      dropTitle: "Datei hierher ziehen oder auswählen",
      chooseFile: "Datei wählen",
      replaceFile: "Ersetzen",
      removeFile: "Entfernen",
      notUploaded: "Noch nicht hochgeladen",
      formatNote: "PDF, JPG, PNG oder WebP · max. 10 MB",
      helpToggle: "Wie bekomme ich das?",
      invalidFileType: "Bitte nur PDF-, JPG-, PNG- oder WebP-Dateien wählen.",
      fileTooLarge: "Die Datei ist größer als 10 MB.",
    },
    step5: {
      storeNameLabel: "Geschäftsname am Schaufenster *",
      storeNameHint:
        "Diesen Namen sehen Amazon-Kunden im Bestellprozess, wenn sie Ihren Paketshop auswählen.",
      storeNamePlaceholder: "z. B. City Kiosk & Getränke",
      websiteLabel: "Website oder Google-Maps-Link (optional)",
      websitePlaceholder: "https://www.meingeschaeft.de",
      capacityLabel: "Geschätzte Paketkapazität im Lager",
      capacityHint:
        "Wie viele Pakete können Sie gleichzeitig trocken und sicher lagern? Der Durchschnitt liegt bei 30.",
      capacityUnit: "Pakete gleichzeitig",
      carriersLabel: "Bestehende Paketdienste im Geschäft (optional)",
      carriersHint:
        "Falls Sie bereits einen Paketshop betreiben, hilft uns das bei der optimalen Einordnung (sofern vertraglich zulässig).",
      previewLabel: "Live-Vorschau im Amazon-Checkout",
      previewBadge: "Amazon Hub Counter Partner",
      previewFallbackName: "Ihr Geschäftsname",
      previewHoursFallback: "Öffnungszeiten im nächsten Schritt",
    },
    step6: {
      hint: "Übliche Handelszeiten sind bereits vorausgefüllt. Sie können Zeiten jederzeit anpassen oder auf die ganze Woche übertragen.",
      presetsLabel: "Schnellvorlagen:",
      presets: [
        { id: "standard", label: "Standard (Mo–Sa durchgehend)" },
        { id: "kiosk", label: "Kiosk / Späti (lang geöffnet)" },
        { id: "split", label: "Mit Mittagspause" },
      ],
      days: {
        mon: "Montag",
        tue: "Dienstag",
        wed: "Mittwoch",
        thu: "Donnerstag",
        fri: "Freitag",
        sat: "Samstag",
        sun: "Sonntag",
      },
      dayShort: {
        mon: "Mo",
        tue: "Di",
        wed: "Mi",
        thu: "Do",
        fri: "Fr",
        sat: "Sa",
        sun: "So",
      },
      closedLabel: "Geschlossen",
      toLabel: "bis",
      addSplitLabel: "+ 2. Zeitfenster",
      copyWeekdaysLabel: "Auf Mo–Fr kopieren",
      copyAllOpenLabel: "Auf alle offenen Tage",
      copiedFeedback: "Zeiten übertragen",
      statusReadyPrefix: "Öffnungstage",
      statusReadySuffix: "Std./Woche · Erfüllt die typischen Standort-Empfehlungen",
      statusWarnSuffix:
        "Std./Woche · Hinweis: Längere Öffnungszeiten (ab ca. 40 Std./Woche) verbessern die Standorteignung",
    },
    step7: {
      title: "Ihre Angaben im Überblick",
      lead: "Bitte prüfen Sie Ihre Daten kurz vor dem Absenden.",
      editLabel: "Bearbeiten",
      sections: {
        modelAndEntity: "Modell & Rechtsform",
        contact: "Persönliche Daten",
        company: "Unternehmen & Adresse",
        documents: "Dokumente",
        store: "Geschäft & Kapazität",
        hours: "Öffnungszeiten",
      },
      deferredNote: "Werden nach dem Gespräch nachgereicht",
      noDocsUploaded: "Keine Dateien hochgeladen (Nachreichung möglich)",
      privacyPrefix:
        "Mit dem Absenden werden Ihre Angaben zur Prüfung Ihres Standorts gemäß unserer ",
      privacyLink: "Datenschutzerklärung",
      privacySuffix: " verarbeitet.",
      submitButton: "Kostenlose Standortprüfung absenden",
      submittingButton: "Antrag wird übermittelt…",
      trustLine: "Unverbindlich · Keine Startgebühren · Persönliche Betreuung",
    },
    navButtons: {
      back: "Zurück",
      next: "Speichern & weiter",
      nextReview: "Zur Übersicht",
      skipDocs: "Ohne Upload weiter",
    },
    validation: {
      selectProgram: "Bitte wählen Sie ein Modell und eine Rechtsform.",
      contactName: "Bitte geben Sie den Namen des Ansprechpartners an.",
      phone: "Bitte geben Sie eine gültige Telefonnummer (mind. 6 Ziffern) an.",
      email: "Bitte prüfen Sie das Format Ihrer E-Mail-Adresse.",
      companyName: "Bitte geben Sie Ihren Firmen- bzw. Gewerbenamen an.",
      street: "Bitte geben Sie Straße und Hausnummer des Standorts an.",
      plz: "Bitte geben Sie eine gültige Postleitzahl an.",
      city: "Bitte geben Sie den Ort bzw. die Stadt an.",
      ibanInvalid: "Bitte prüfen Sie Ihre IBAN oder lassen Sie das optionale Feld leer.",
      storeName: "Bitte geben Sie den Namen Ihres Geschäfts am Schaufenster an.",
      openHoursRequired: "Bitte aktivieren Sie mindestens einen Öffnungstag.",
    },
    success: {
      badge: "Standortprüfung eingegangen",
      title: "Vielen Dank! Ihr Partner-Dossier ist bei PAYVITY eingegangen.",
      desc: "Wir haben Ihre Anfrage vollständig erhalten und in unserem System erfasst.",
      refLabel: "Ihre Referenz-ID",
      langNoticePrefix: "Unser Team meldet sich telefonisch in Ihrer Wunschsprache:",
      nextStepsTitle: "Wie es jetzt weitergeht",
      nextSteps: [
        "Prüfung Ihrer Postleitzahl und Standort-Eignung im Amazon Hub Netzwerk.",
        "Persönlicher Rückruf durch einen PAYVITY Ansprechpartner zur Klärung aller Fragen und Konditionen.",
        "Digitaler Vertragsabschluss und gemeinsame Begleitung bis zum Start mit der Amazon Hub App.",
      ],
      newApplicationBtn: "Weitere Anfrage erfassen",
    },
    errorFallback:
      "Die Übermittlung ist gerade fehlgeschlagen. Bitte schreiben Sie uns direkt an partner@payvityparcels.de.",
  },
  en: {
    sectionHeader: {
      eyebrow: "Digital Partner Onboarding · 2 Min.",
      title: "Apply as an Amazon Parcel Shop now",
      lead: "Complete our free, non-binding site qualification in our guided onboarding portal. Missing documents can easily be provided after our first phone call.",
      draftSaved: "Progress auto-saved locally",
      resetDraft: "Reset form",
    },
    steps: [
      {
        number: 1,
        shortTitle: "Legal Form",
        title: "Model & Legal Entity",
        subtitle: "Choose your partnership format and German legal business structure.",
        whyWeAsk:
          "Required onboarding documents depend on whether you operate as a sole proprietor or corporate entity.",
        tips: [
          "Kiosks & sole traders use our streamlined sole proprietorship path.",
          "Submitting this site review carries zero obligation.",
        ],
      },
      {
        number: 2,
        shortTitle: "Contact",
        title: "Personal Contact Details",
        subtitle: "How our partner specialists can reach you in your preferred language.",
        whyWeAsk:
          "Our team supports 6 languages so you can discuss every detail comfortably by phone.",
        tips: [
          "We use your mobile number for your site callback and later Amazon Hub App setup.",
        ],
      },
      {
        number: 3,
        shortTitle: "Company",
        title: "Business & Location Details",
        subtitle: "Registered company details and shop street address for local postcode qualification.",
        whyWeAsk:
          "We evaluate local parcel demand directly from your street address, postcode, and retail category.",
        tips: [
          "Entering a 5-digit German postcode auto-detects the federal state (Bundesland).",
          "Optional fields like VAT ID or IBAN can also be added later.",
        ],
      },
      {
        number: 4,
        shortTitle: "Documents",
        title: "Documents (now or later)",
        subtitle: "Drag & drop files or take a photo — or skip and provide documents later.",
        whyWeAsk:
          "Pre-uploading documents speeds up verification once approved, though uploading right now is optional.",
        tips: [
          "Accepted formats: PDF, JPG, PNG, or WebP up to 10 MB per file.",
          "Expand “How do I get this?” under any item for quick guidance.",
        ],
      },
      {
        number: 5,
        shortTitle: "Storefront",
        title: "Storefront & Parcel Capacity",
        subtitle: "How shoppers recognize your store during Amazon checkout.",
        whyWeAsk:
          "Your storefront name is displayed at checkout and your storage estimate guides parcel volume.",
        tips: [
          "Typical smaller retail shops store around 30 parcels at once.",
          "Existing DHL, Hermes, DPD, or GLS parcel shops can also apply where contracts allow.",
        ],
      },
      {
        number: 6,
        shortTitle: "Hours",
        title: "Opening Hours",
        subtitle: "When couriers deliver parcels and customers pick them up.",
        whyWeAsk:
          "Consistent opening hours ensure smooth parcel handovers and high customer satisfaction.",
        tips: [
          "Use quick presets or copy one day's hours across Mon–Fri with one click.",
        ],
      },
      {
        number: 7,
        shortTitle: "Review",
        title: "Review & Submit",
        subtitle: "Verify your summary before sending your non-binding location request.",
        whyWeAsk:
          "Once submitted, our partner team receives your dossier immediately for postcode review.",
        tips: [
          "Click “Edit” on any card to adjust details before submitting.",
        ],
      },
    ],
    sidebar: {
      readinessTitle: "Application Readiness",
      dossierTitle: "Live Partner Dossier",
      programLabel: "Model",
      legalFormLabel: "Legal form",
      languageLabel: "Callback language",
      locationLabel: "Location",
      docsLabel: "Documents",
      hoursLabel: "Opening hours",
      supportTitle: "Personal Support",
      supportDesc: "Questions while applying? Reach us directly:",
      supportLangLine:
        "Callbacks available in German, Turkish, Kurdish, Hindi, English & Afghan (Dari/Pashto).",
      notSet: "Pending",
    },
    step1: {
      programLabel: "Selected Partner Model *",
      legalFormLabel: "Business Legal Structure *",
      einzelTitle: "Sole Proprietorship",
      einzelDesc: "Einzelunternehmen, Small business, Kiosk, e.K. …",
      gesellschaftTitle: "Corporation / Partnership",
      gesellschaftDesc: "GmbH, UG, AG, OHG, KG …",
    },
    step2: {
      languageLabel: "Preferred Callback Language *",
      languageHint:
        "Our onboarding specialists will call you in this language.",
      salutationLabel: "Salutation (optional)",
      salutationOptions: [
        { value: "frau", label: "Ms." },
        { value: "herr", label: "Mr." },
        { value: "divers", label: "Diverse" },
      ],
      fullNameLabel: "Full Name (Contact Person) *",
      fullNamePlaceholder: "First and last name",
      phoneLabel: "Mobile Number *",
      phoneHint: "Used for your personal callback and Amazon Hub App verification.",
      phonePlaceholder: "e.g. +49 171 1234567",
      emailLabel: "Email Address (optional)",
      emailPlaceholder: "owner@store.de",
    },
    step3: {
      companyNameLabel: "Official Registered Business Name *",
      companyNamePlaceholder: "e.g. City Kiosk & Market",
      industryLabel: "Business Category",
      industryCustomPlaceholder: "Specify your store category",
      vatLabel: "VAT ID (USt-IdNr., optional)",
      vatPlaceholder: "DE123456789",
      ibanLabel: "IBAN for Commission Payouts (optional)",
      ibanHint: "Checked live via ISO checksum validation — can also be provided later.",
      ibanPlaceholder: "e.g. DE89 3704 0044 0532 0130 00",
      ibanValidLabel: "Valid IBAN",
      ibanInvalidLabel: "Check format / checksum",
      streetLabel: "Street & House Number *",
      streetPlaceholder: "e.g. Musterstraße 12",
      addressExtraLabel: "Address Line 2 (optional)",
      addressExtraPlaceholder: "e.g. Ground floor / Corner unit",
      plzLabel: "Postal Code *",
      plzPlaceholder: "60311",
      plzAutoDetected: "Auto-detected",
      cityLabel: "City *",
      cityPlaceholder: "e.g. Frankfurt am Main",
      stateLabel: "Federal State (Bundesland)",
      statePlaceholder: "Select federal state",
      businessPhoneLabel: "Store Telephone (optional)",
      businessPhonePlaceholder: "+49 ...",
      copyMobileLabel: "Copy mobile number",
    },
    step4: {
      infoBannerTitle: "No pressure if documents aren't ready yet",
      infoBannerDesc:
        "Upload available documents now to speed up onboarding, or toggle “Provide documents later” and submit your site check right away.",
      deferToggleTitle: "I prefer to submit documents after our initial call",
      deferToggleDesc:
        "We will evaluate your store location first based on your address and hours.",
      idTypeLabel: "ID Document (choose one)",
      idTypeHint: "Provide the owner's or managing director's valid ID document.",
      idCardLabel: "ID Card / Residence Permit",
      passportLabel: "Passport",
      dropTitle: "Drag & drop file here or browse",
      chooseFile: "Choose file",
      replaceFile: "Replace",
      removeFile: "Remove",
      notUploaded: "Not uploaded yet",
      formatNote: "PDF, JPG, PNG, or WebP · max 10 MB",
      helpToggle: "How do I get this?",
      invalidFileType: "Please select only PDF, JPG, PNG, or WebP files.",
      fileTooLarge: "File exceeds the 10 MB limit.",
    },
    step5: {
      storeNameLabel: "Storefront Display Name *",
      storeNameHint:
        "This is the name Amazon customers see on the storefront map at checkout.",
      storeNamePlaceholder: "e.g. City Kiosk & Drinks",
      websiteLabel: "Website or Google Maps URL (optional)",
      websitePlaceholder: "https://www.mystore.de",
      capacityLabel: "Estimated Simultaneous Parcel Capacity",
      capacityHint:
        "How many parcels can you store safely at once? Average stores hold around 30.",
      capacityUnit: "parcels at once",
      carriersLabel: "Current Parcel Services Offered (optional)",
      carriersHint:
        "Let us know if you already host another carrier (where existing contracts allow).",
      previewLabel: "Live Amazon Checkout Preview",
      previewBadge: "Amazon Hub Counter Partner",
      previewFallbackName: "Your Store Name",
      previewHoursFallback: "Opening hours set in next step",
    },
    step6: {
      hint: "Common German retail hours are pre-filled. Adjust any day or copy times across the week.",
      presetsLabel: "Quick presets:",
      presets: [
        { id: "standard", label: "Standard Retail (Mon–Sat)" },
        { id: "kiosk", label: "Kiosk / Späti (Extended)" },
        { id: "split", label: "With Lunch Break" },
      ],
      days: {
        mon: "Monday",
        tue: "Tuesday",
        wed: "Wednesday",
        thu: "Thursday",
        fri: "Friday",
        sat: "Saturday",
        sun: "Sunday",
      },
      dayShort: {
        mon: "Mon",
        tue: "Tue",
        wed: "Wed",
        thu: "Thu",
        fri: "Fri",
        sat: "Sat",
        sun: "Sun",
      },
      closedLabel: "Closed",
      toLabel: "to",
      addSplitLabel: "+ Split hours",
      copyWeekdaysLabel: "Copy to Mon–Fri",
      copyAllOpenLabel: "Copy to all open days",
      copiedFeedback: "Copied",
      statusReadyPrefix: "open days",
      statusReadySuffix: "hrs/week · Meets typical location recommendations",
      statusWarnSuffix:
        "hrs/week · Tip: Longer hours (40+ hrs/week) improve location eligibility",
    },
    step7: {
      title: "Review Your Partner Dossier",
      lead: "Double-check your details before sending your free location evaluation.",
      editLabel: "Edit",
      sections: {
        modelAndEntity: "Model & Legal Structure",
        contact: "Contact Details",
        company: "Company & Address",
        documents: "Documents",
        store: "Storefront & Capacity",
        hours: "Opening Hours",
      },
      deferredNote: "Will be provided after initial consultation",
      noDocsUploaded: "No files uploaded yet (can be shared later)",
      privacyPrefix:
        "By submitting, your data will be processed to evaluate your location in accordance with our ",
      privacyLink: "Privacy Policy",
      privacySuffix: ".",
      submitButton: "Submit free location check",
      submittingButton: "Submitting application…",
      trustLine: "Non-binding · Zero signup fee · Personal support",
    },
    navButtons: {
      back: "Back",
      next: "Save & continue",
      nextReview: "Review summary",
      skipDocs: "Continue without upload",
    },
    validation: {
      selectProgram: "Please select a partner model and legal form.",
      contactName: "Please enter the contact person's full name.",
      phone: "Please enter a valid mobile number (at least 6 digits).",
      email: "Please check your email address format.",
      companyName: "Please enter your official business name.",
      street: "Please enter the street address of your location.",
      plz: "Please enter a valid postal code.",
      city: "Please enter the city.",
      ibanInvalid: "Please verify your IBAN or leave the optional field blank.",
      storeName: "Please enter the storefront name customers recognize.",
      openHoursRequired: "Please enable at least one open day.",
    },
    success: {
      badge: "Application Received",
      title: "Thank you! PAYVITY has received your partner dossier.",
      desc: "Your location inquiry has been saved and routed to our German onboarding team.",
      refLabel: "Reference ID",
      langNoticePrefix: "Our specialist will call you in your preferred language:",
      nextStepsTitle: "What happens next",
      nextSteps: [
        "Postcode & catchment area check inside the Amazon Hub network.",
        "Personal phone call in your preferred language to review rates and store fit.",
        "Digital contract & guided setup through activation with the Amazon Hub App.",
      ],
      newApplicationBtn: "Submit another location",
    },
    errorFallback:
      "Submission failed right now. Please contact us directly at partner@payvityparcels.de.",
  },
};
