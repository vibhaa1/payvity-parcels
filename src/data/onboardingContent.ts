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
              ? "Gut lesbares Foto der Vorderseite."
              : "Clear photo of the front side.",
            required: true,
            badge: isDe ? "Empfohlen" : "Recommended",
            helpTitle: isDe ? "Worauf achten?" : "Photo tips",
            helpSteps: isDe
              ? ["Alle vier Ecken müssen sichtbar sein, ohne Spiegelung."]
              : ["Keep all four corners visible with no flash glare."],
          },
          {
            id: "id_back",
            title: isDe
              ? "Personalausweis oder Aufenthaltstitel: Rückseite"
              : "National ID or Residence Permit: Back",
            desc: isDe
              ? "Rückseite desselben gültigen Dokuments."
              : "Reverse side of the same valid ID document.",
            required: true,
            badge: isDe ? "Empfohlen" : "Recommended",
            helpTitle: isDe ? "Worauf achten?" : "What to check",
            helpSteps: isDe
              ? ["Anschrift und Gültigkeitsdatum müssen lesbar sein."]
              : ["Current address and expiry date must be readable."],
          },
        ]
      : [
          {
            id: "passport",
            title: isDe ? "Reisepass: Fotoseite" : "Passport: Photo page",
            desc: isDe
              ? "Gut lesbare Kopie Ihrer gültigen Pass-Datenseite."
              : "Clear copy or photo of your valid passport photo page.",
            required: true,
            badge: isDe ? "Empfohlen" : "Recommended",
            helpTitle: isDe ? "Hinweis" : "Note",
            helpSteps: isDe
              ? ["Gültigkeitsdatum und Lichtbild müssen klar erkennbar sein."]
              : ["Ensure photo and expiry date are sharp and legible."],
          },
        ];

  const commonDocs: DocumentDef[] = [
    {
      id: "bank_proof",
      title: isDe ? "Bankverbindung (IBAN-Nachweis)" : "Bank account proof (IBAN)",
      desc: isDe
        ? "Dokument Ihrer Bank mit IBAN, BIC und Kontoinhaber."
        : "Bank confirmation showing IBAN, BIC, and account holder.",
      required: true,
      badge: isDe ? "Empfohlen" : "Recommended",
      helpTitle: isDe ? "Wie bekomme ich das?" : "How do I get this?",
      helpSteps: isDe
        ? [
            "Im Online-Banking als IBAN-Bestätigung oder Kontoauszug herunterladen (Kontostände dürfen geschwärzt sein).",
          ]
        : [
            "Download an IBAN confirmation from online banking (balances may be redacted).",
          ],
    },
    {
      id: "address_proof",
      title: isDe ? "Nachweis der Geschäftsadresse" : "Proof of business address",
      desc: isDe
        ? "Gewerbeanmeldung, Mietvertrag oder aktuelle Rechnung auf Firmennamen."
        : "Trade registration, lease agreement, or recent utility bill.",
      required: true,
      badge: isDe ? "Empfohlen" : "Recommended",
      helpTitle: isDe ? "Welche Dokumente zählen?" : "Accepted documents",
      helpSteps: isDe
        ? ["Erste Seite des Mietvertrags oder eine aktuelle Strom-/Telefonrechnung."]
        : ["First page of your lease agreement or a recent utility/phone bill."],
    },
    {
      id: "tax_doc",
      title: isDe ? "Steuernummer oder USt-IdNr." : "Tax ID or VAT ID notice",
      desc: isDe
        ? "Schreiben vom Finanzamt oder BZSt."
        : "Official letter from your tax office (Finanzamt) or BZSt.",
      required: true,
      badge: isDe ? "Empfohlen" : "Recommended",
      helpTitle: isDe ? "Wo finde ich das?" : "Where to find it",
      helpSteps: isDe
        ? ["Zu finden im ELSTER-Postfach oder auf Ihrem Steuerbescheid."]
        : ["Available in your ELSTER inbox or tax registration notice."],
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
              ? "Ihre Gewerbeanmeldung (GewA 1). Handelsregister nur bei e.K."
              : "Your trade registration. Commercial register only if registered as e.K.",
            required: false,
            badge: isDe ? "Je nach Form" : "If applicable",
            helpTitle: isDe ? "Wie bekomme ich das?" : "How to obtain",
            helpSteps: isDe
              ? ["Gewerbeanmeldung vom Gewerbeamt; e.K.-Auszug kostenfrei über handelsregister.de."]
              : ["Trade office registration; e.K. extracts free on handelsregister.de."],
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
              ? "Handelsregisterauszug (GmbH, UG, AG, OHG, KG)"
              : "Commercial Register Extract",
            desc: isDe
              ? "Aktueller Abdruck mit Vertretungsbefugnis."
              : "Current extract showing authorized representatives.",
            required: true,
            badge: isDe ? "Empfohlen" : "Recommended",
            helpTitle: isDe ? "Kostenloser Abruf" : "Free download",
            helpSteps: isDe
              ? ["Unter handelsregister.de Firmennamen suchen und PDF kostenlos laden."]
              : ["Search your company name on handelsregister.de and download the PDF free."],
            externalLink: {
              label: "handelsregister.de",
              href: "https://www.handelsregister.de/",
            },
          },
          {
            id: "shareholder_list",
            title: isDe
              ? "Gesellschafterliste (optional)"
              : "Shareholder list (optional)",
            desc: isDe
              ? "Falls abweichende Anteilseigner (≥ 25 %) bestehen."
              : "Only if beneficial owners (≥ 25%) differ from directors.",
            required: false,
            badge: isDe ? "Optional" : "Optional",
            helpTitle: isDe ? "Hinweis" : "Note",
            helpSteps: isDe
              ? ["Ebenfalls kostenfrei unter handelsregister.de abrufbar."]
              : ["Also downloadable free on handelsregister.de."],
          },
        ];

  const insuranceDoc: DocumentDef = {
    id: "insurance_proof",
    title: isDe
      ? "Betriebshaftpflichtversicherung"
      : "Public liability insurance",
    desc: isDe
      ? "Aktuelle Versicherungsbestätigung für Ihr Ladenlokal."
      : "Current business liability insurance confirmation.",
    required: false,
    badge: isDe ? "Nachreichbar" : "Upload later OK",
    helpTitle: isDe ? "Noch nicht griffbereit?" : "Not handy right now?",
    helpSteps: isDe
      ? ["Kein Problem – Unterlagen können auch nach dem Gespräch nachgereicht werden."]
      : ["No problem — you can provide this later during onboarding."],
  };

  return [...idDocs, ...commonDocs, ...entityDocs, insuranceDoc];
}

export interface OnboardingLocaleCopy {
  sectionHeader: {
    title: string;
    lead: string;
    resetDraft: string;
  };
  steps: Array<{
    number: number;
    shortTitle: string;
    title: string;
    subtitle: string;
  }>;
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
    idCardLabel: string;
    passportLabel: string;
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
    copiedFeedback: string;
    statusReadyPrefix: string;
    statusReadySuffix: string;
    statusWarnSuffix: string;
  };
  step7: {
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
      title: "Jetzt Amazon Paketshop werden",
      lead: "Kostenlose und unverbindliche Standortprüfung – unser Team meldet sich persönlich bei Ihnen.",
      resetDraft: "Zurücksetzen",
    },
    steps: [
      {
        number: 1,
        shortTitle: "Rechtsform",
        title: "Modell & Rechtsform",
        subtitle: "Wählen Sie Ihr gewünschtes Modell und Ihre Unternehmensform.",
      },
      {
        number: 2,
        shortTitle: "Kontakt",
        title: "Kontaktsprache & Ansprechpartner",
        subtitle: "In welcher Sprache dürfen wir Sie telefonisch beraten?",
      },
      {
        number: 3,
        shortTitle: "Unternehmen",
        title: "Unternehmens- & Standortdaten",
        subtitle: "Adresse und Angaben für die Postleitzahlen-Prüfung.",
      },
      {
        number: 4,
        shortTitle: "Dokumente",
        title: "Dokumente (sofort oder später)",
        subtitle: "Laden Sie vorhandene Nachweise hoch oder reichen Sie diese nach dem Gespräch nach.",
      },
      {
        number: 5,
        shortTitle: "Geschäft",
        title: "Ladenlokal & Kapazität",
        subtitle: "Geschäftsname am Schaufenster und geschätzter Lagerplatz.",
      },
      {
        number: 6,
        shortTitle: "Zeiten",
        title: "Öffnungszeiten",
        subtitle: "Wann sind Abholung und Anlieferung in Ihrem Geschäft möglich?",
      },
      {
        number: 7,
        shortTitle: "Übersicht",
        title: "Prüfen & absenden",
        subtitle: "Kontrollieren Sie Ihre Angaben vor dem unverbindlichen Absenden.",
      },
    ],
    step1: {
      programLabel: "Gewünschtes Partnermodell *",
      legalFormLabel: "Rechtsform Ihres Betriebs *",
      einzelTitle: "Einzelunternehmen",
      einzelDesc: "Kleingewerbe, Kiosk, Späti, e.K. …",
      gesellschaftTitle: "Gesellschaft",
      gesellschaftDesc: "GmbH, UG, AG, OHG, KG …",
    },
    step2: {
      languageLabel: "Bevorzugte Kontaktsprache *",
      languageHint: "Unser Team ruft Sie auf Wunsch genau in dieser Sprache an.",
      salutationLabel: "Anrede (optional)",
      salutationOptions: [
        { value: "frau", label: "Frau" },
        { value: "herr", label: "Herr" },
        { value: "divers", label: "Divers" },
      ],
      fullNameLabel: "Vollständiger Name *",
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
      ibanLabel: "IBAN (optional)",
      ibanHint: "Für Provisionsauszahlungen – kann auch später ergänzt werden.",
      ibanPlaceholder: "z. B. DE89 3704 0044 0532 0130 00",
      ibanValidLabel: "IBAN gültig",
      ibanInvalidLabel: "Format prüfen",
      streetLabel: "Straße & Hausnummer *",
      streetPlaceholder: "z. B. Musterstraße 12",
      addressExtraLabel: "Adresszusatz (optional)",
      addressExtraPlaceholder: "z. B. Erdgeschoss",
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
      infoBannerTitle: "Unterlagen auch später nachreichbar",
      infoBannerDesc:
        "Vorhandene Dokumente beschleunigen den Start. Noch nicht alles zur Hand? Reichen Sie fehlende Nachweise einfach nach dem Gespräch ein.",
      deferToggleTitle: "Dokumente nach dem Erstgespräch nachreichen",
      deferToggleDesc:
        "Ihr Standort wird zuerst kostenlos anhand Ihrer Adresse geprüft.",
      idTypeLabel: "Ausweisdokument (eines genügt)",
      idCardLabel: "Personalausweis / Aufenthaltstitel",
      passportLabel: "Reisepass",
      chooseFile: "Datei wählen",
      replaceFile: "Ersetzen",
      removeFile: "Entfernen",
      notUploaded: "Optional · noch nicht hochgeladen",
      formatNote: "PDF, JPG, PNG oder WebP · max. 10 MB",
      helpToggle: "Wie bekomme ich das?",
      invalidFileType: "Bitte nur PDF-, JPG-, PNG- oder WebP-Dateien wählen.",
      fileTooLarge: "Die Datei ist größer als 10 MB.",
    },
    step5: {
      storeNameLabel: "Geschäftsname am Schaufenster *",
      storeNameHint: "Diesen Namen sehen Amazon-Kunden beim Checkout.",
      storeNamePlaceholder: "z. B. City Kiosk & Getränke",
      websiteLabel: "Website oder Google-Maps-Link (optional)",
      websitePlaceholder: "https://www.meingeschaeft.de",
      capacityLabel: "Geschätzte Paketkapazität im Lager",
      capacityHint: "Der Durchschnitt kleinerer Geschäfte liegt bei ca. 30 Paketen.",
      capacityUnit: "Pakete gleichzeitig",
      carriersLabel: "Bestehende Paketdienste (optional)",
      carriersHint: "Falls Sie bereits einen Paketshop betreiben.",
    },
    step6: {
      hint: "Übliche Handelszeiten sind vorausgefüllt und lassen sich jederzeit anpassen.",
      presetsLabel: "Vorlagen:",
      presets: [
        { id: "standard", label: "Standard (Mo–Sa)" },
        { id: "kiosk", label: "Kiosk / Späti (lang)" },
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
      addSplitLabel: "+ Pause",
      copyWeekdaysLabel: "Auf Mo–Fr",
      copiedFeedback: "Übertragen",
      statusReadyPrefix: "Öffnungstage",
      statusReadySuffix: "Std./Woche · Erfüllt typische Standort-Empfehlungen",
      statusWarnSuffix:
        "Std./Woche · Hinweis: Längere Öffnungszeiten verbessern die Standorteignung",
    },
    step7: {
      editLabel: "Bearbeiten",
      sections: {
        modelAndEntity: "Modell & Rechtsform",
        contact: "Kontakt",
        company: "Unternehmen & Standort",
        documents: "Dokumente",
        store: "Geschäft & Kapazität",
        hours: "Öffnungszeiten",
      },
      deferredNote: "Werden nach dem Gespräch nachgereicht",
      noDocsUploaded: "Ohne Upload (Nachreichung möglich)",
      privacyPrefix:
        "Mit dem Absenden werden Ihre Angaben zur Prüfung Ihres Standorts gemäß unserer ",
      privacyLink: "Datenschutzerklärung",
      privacySuffix: " verarbeitet.",
      submitButton: "Kostenlose Standortprüfung absenden",
      submittingButton: "Wird gesendet…",
      trustLine:
        "Unverbindlich · Keine Startgebühren · Persönliche Betreuung · partner@payvityparcels.de",
    },
    navButtons: {
      back: "Zurück",
      next: "Speichern & weiter",
      nextReview: "Zur Übersicht",
      skipDocs: "Später nachreichen",
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
      badge: "Anfrage eingegangen",
      title: "Vielen Dank! Ihre Standortanfrage ist eingegangen.",
      desc: "Wir prüfen Ihre Adresse und melden uns persönlich bei Ihnen.",
      refLabel: "Referenz-ID",
      langNoticePrefix: "Rückruf in Ihrer Wunschsprache",
      nextStepsTitle: "Wie es weitergeht",
      nextSteps: [
        "Prüfung Ihrer Postleitzahl im Amazon Hub Netzwerk.",
        "Persönlicher Rückruf zur Besprechung aller Konditionen.",
        "Vertragsabschluss und gemeinsamer Start mit der Amazon Hub App.",
      ],
      newApplicationBtn: "Weitere Anfrage erfassen",
    },
    errorFallback:
      "Die Übermittlung ist fehlgeschlagen. Schreiben Sie uns direkt an partner@payvityparcels.de.",
  },
  en: {
    sectionHeader: {
      title: "Apply as an Amazon Parcel Shop",
      lead: "Free, non-binding site check — our team contacts you personally.",
      resetDraft: "Reset",
    },
    steps: [
      {
        number: 1,
        shortTitle: "Legal Form",
        title: "Model & Legal Structure",
        subtitle: "Choose your partnership model and business structure.",
      },
      {
        number: 2,
        shortTitle: "Contact",
        title: "Callback Language & Contact",
        subtitle: "Which language do you prefer for our callback?",
      },
      {
        number: 3,
        shortTitle: "Company",
        title: "Company & Location Details",
        subtitle: "Business details and street address for postcode evaluation.",
      },
      {
        number: 4,
        shortTitle: "Documents",
        title: "Documents (now or later)",
        subtitle: "Upload files now or simply share them after our introductory call.",
      },
      {
        number: 5,
        shortTitle: "Storefront",
        title: "Storefront & Parcel Capacity",
        subtitle: "Storefront name displayed at checkout and storage estimate.",
      },
      {
        number: 6,
        shortTitle: "Hours",
        title: "Opening Hours",
        subtitle: "When couriers deliver parcels and customers collect them.",
      },
      {
        number: 7,
        shortTitle: "Review",
        title: "Review & Submit",
        subtitle: "Review your summary before sending your non-binding request.",
      },
    ],
    step1: {
      programLabel: "Partner Model *",
      legalFormLabel: "Business Legal Structure *",
      einzelTitle: "Sole Proprietorship",
      einzelDesc: "Einzelunternehmen, Small business, Kiosk, e.K. …",
      gesellschaftTitle: "Corporation / Partnership",
      gesellschaftDesc: "GmbH, UG, AG, OHG, KG …",
    },
    step2: {
      languageLabel: "Preferred Callback Language *",
      languageHint: "Our team calls you directly in this language.",
      salutationLabel: "Salutation (optional)",
      salutationOptions: [
        { value: "frau", label: "Ms." },
        { value: "herr", label: "Mr." },
        { value: "divers", label: "Diverse" },
      ],
      fullNameLabel: "Full Name *",
      fullNamePlaceholder: "First and last name",
      phoneLabel: "Mobile Number *",
      phoneHint: "Used for your callback and Amazon Hub App verification.",
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
      ibanLabel: "IBAN (optional)",
      ibanHint: "Used for payouts — can also be added later.",
      ibanPlaceholder: "e.g. DE89 3704 0044 0532 0130 00",
      ibanValidLabel: "Valid IBAN",
      ibanInvalidLabel: "Check format",
      streetLabel: "Street & House Number *",
      streetPlaceholder: "e.g. Musterstraße 12",
      addressExtraLabel: "Address Line 2 (optional)",
      addressExtraPlaceholder: "e.g. Ground floor",
      plzLabel: "Postal Code *",
      plzPlaceholder: "60311",
      plzAutoDetected: "Auto-detected",
      cityLabel: "City *",
      cityPlaceholder: "e.g. Frankfurt am Main",
      stateLabel: "Federal State (Bundesland)",
      statePlaceholder: "Select state",
      businessPhoneLabel: "Store Telephone (optional)",
      businessPhonePlaceholder: "+49 ...",
      copyMobileLabel: "Use mobile number",
    },
    step4: {
      infoBannerTitle: "Documents can also be shared later",
      infoBannerDesc:
        "Uploading available files speeds up onboarding, or you can share missing documents after our first call.",
      deferToggleTitle: "Provide documents after our initial phone call",
      deferToggleDesc:
        "We will evaluate your store location first based on your address.",
      idTypeLabel: "ID Document (one is sufficient)",
      idCardLabel: "ID Card / Residence Permit",
      passportLabel: "Passport",
      chooseFile: "Choose file",
      replaceFile: "Replace",
      removeFile: "Remove",
      notUploaded: "Optional · not uploaded yet",
      formatNote: "PDF, JPG, PNG, or WebP · max 10 MB",
      helpToggle: "How do I get this?",
      invalidFileType: "Please select only PDF, JPG, PNG, or WebP files.",
      fileTooLarge: "File exceeds the 10 MB limit.",
    },
    step5: {
      storeNameLabel: "Storefront Display Name *",
      storeNameHint: "Displayed to Amazon shoppers at checkout.",
      storeNamePlaceholder: "e.g. City Kiosk & Drinks",
      websiteLabel: "Website or Google Maps URL (optional)",
      websitePlaceholder: "https://www.mystore.de",
      capacityLabel: "Estimated Parcel Storage Capacity",
      capacityHint: "Typical smaller retail shops store around 30 parcels.",
      capacityUnit: "parcels at once",
      carriersLabel: "Existing Parcel Services (optional)",
      carriersHint: "Select any carriers you already host.",
    },
    step6: {
      hint: "Standard German retail hours are pre-filled and can be adjusted anytime.",
      presetsLabel: "Presets:",
      presets: [
        { id: "standard", label: "Standard (Mon–Sat)" },
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
      addSplitLabel: "+ Split",
      copyWeekdaysLabel: "Copy Mon–Fri",
      copiedFeedback: "Copied",
      statusReadyPrefix: "open days",
      statusReadySuffix: "hrs/week · Meets typical location recommendations",
      statusWarnSuffix:
        "hrs/week · Tip: Longer hours improve location eligibility",
    },
    step7: {
      editLabel: "Edit",
      sections: {
        modelAndEntity: "Model & Legal Structure",
        contact: "Contact",
        company: "Company & Location",
        documents: "Documents",
        store: "Storefront & Capacity",
        hours: "Opening Hours",
      },
      deferredNote: "Will be provided after initial call",
      noDocsUploaded: "Skipped upload (can share later)",
      privacyPrefix:
        "By submitting, your details are processed for site review under our ",
      privacyLink: "Privacy Policy",
      privacySuffix: ".",
      submitButton: "Submit free location check",
      submittingButton: "Submitting…",
      trustLine:
        "Non-binding · Zero signup fee · Personal support · partner@payvityparcels.de",
    },
    navButtons: {
      back: "Back",
      next: "Save & continue",
      nextReview: "Review summary",
      skipDocs: "Share docs later",
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
      title: "Thank you! Your site inquiry has been received.",
      desc: "We will review your postcode and reach out personally.",
      refLabel: "Reference ID",
      langNoticePrefix: "Preferred callback language",
      nextStepsTitle: "What happens next",
      nextSteps: [
        "Postcode & catchment area check inside the Amazon Hub network.",
        "Personal callback to go through partner terms.",
        "Digital agreement & onboarding with the Amazon Hub App.",
      ],
      newApplicationBtn: "Submit another location",
    },
    errorFallback:
      "Submission failed right now. Please contact us at partner@payvityparcels.de.",
  },
};
