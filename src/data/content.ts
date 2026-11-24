import type { Lang } from "@/lib/seo";

export type InterestOption = "Amazon Paketshop" | "Amazon Locker" | "Beides";
export type SectionId = "paketshop" | "vorteile" | "so-funktionierts" | "faq";

export interface NavItem {
  id: SectionId;
  label: string;
}

export interface StatItem {
  id: string;
  target: number;
  suffix: string;
  label: string;
}

export interface AdvantageCardItem {
  id: string;
  icon: "box" | "users" | "app" | "network";
  title: string;
  desc: string;
}

export interface ProcessStepItem {
  step: number;
  img: string;
  width: number;
  height: number;
  title: string;
  desc: string;
  alt: string;
}

export interface TrustRowItem {
  index: string;
  title: string;
  desc: string;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export interface HomeLocaleContent {
  meta: {
    title: string;
    description: string;
    ogAlt: string;
  };
  nav: {
    items: NavItem[];
    lockerLinkLabel: string;
    ctaLabel: string;
    ariaMain: string;
    ariaLang: string;
    ariaMenuOpen: string;
    logoAlt: string;
  };
  hero: {
    ariaLabel: string;
    eyebrow: string;
    title: string;
    subtitle: string;
    ctaPrimary: string;
    ctaSecondary: string;
    stats: StatItem[];
  };
  paketshop: {
    title: string;
    lead: string;
    cardHeading: string;
    cardDesc: string;
    bullets: string[];
    ctaLabel: string;
    secondaryLinkLabel: string;
    imageSrc: string;
    imageWidth: number;
    imageHeight: number;
    imageAlt: string;
    verticalsHeading: string;
    verticalsLead: string;
    verticals: string[];
    multiCarrierNote: string;
  };
  advantages: {
    title: string;
    lead: string;
    cards: AdvantageCardItem[];
  };
  process: {
    title: string;
    lead: string;
    steps: ProcessStepItem[];
  };
  trust: {
    title: string;
    lead: string;
    imageSrc: string;
    imageWidth: number;
    imageHeight: number;
    imageAlt: string;
    items: TrustRowItem[];
  };
  lockerTeaser: {
    badge: string;
    title: string;
    desc: string;
    ctaLabel: string;
  };
  faq: {
    title: string;
    lead: string;
    helpTitle: string;
    helpDesc: string;
    helpCta: string;
    items: FaqItem[];
  };
  leadForm: {
    title: string;
    lead: string;
    interestLabel: string;
    options: Array<{ value: InterestOption; label: string }>;
    fields: {
      businessName: string;
      businessPlaceholder: string;
      postalCode: string;
      postalPlaceholder: string;
      city: string;
      cityPlaceholder: string;
      contactName: string;
      contactPlaceholder: string;
      phone: string;
      phonePlaceholder: string;
      email: string;
      emailPlaceholder: string;
    };
    privacyPrefix: string;
    privacyLinkLabel: string;
    privacySuffix: string;
    submitLabel: string;
    submittingLabel: string;
    trustLine: string;
    successMessage: string;
    errorFallback: string;
    validationMessages: {
      required: string;
      invalidPostal: string;
      invalidPhone: string;
      invalidEmail: string;
    };
  };
  footer: {
    copy: string;
    contactLabel: string;
    lockerLabel: string;
    privacyLabel: string;
    imprintLabel: string;
  };
}

export const HOME_CONTENT: Record<Lang, HomeLocaleContent> = {
  de: {
    meta: {
      title: "Amazon Paketshop werden in Deutschland | PAYVITY Parcels",
      description:
        "Werden Sie Amazon Hub Counter Partner in Deutschland. Mehr Laufkundschaft, zusätzliche Einnahmen pro Paket und persönliche Betreuung. Jetzt Standort prüfen lassen.",
      ogAlt:
        "PAYVITY Parcels — Amazon Paketshop werden in Deutschland für lokale Geschäfte",
    },
    nav: {
      items: [
        { id: "paketshop", label: "Paketshop" },
        { id: "vorteile", label: "Vorteile" },
        { id: "so-funktionierts", label: "Ablauf" },
        { id: "faq", label: "FAQ" },
      ],
      lockerLinkLabel: "Amazon Locker",
      ctaLabel: "Paketshop werden",
      ariaMain: "Hauptnavigation",
      ariaLang: "Sprache wählen",
      ariaMenuOpen: "Menü öffnen",
      logoAlt: "PAYVITY Parcels — Offizieller Partner von Amazon",
    },
    hero: {
      ariaLabel: "PAYVITY Parcels — Amazon Paketshop in Deutschland werden",
      eyebrow: "Offizieller Amazon Hub Partner in Deutschland",
      title: "Amazon Paketshop werden – mehr Kunden für Ihr Geschäft.",
      subtitle:
        "Werden Sie Teil des Amazon Hub Counter Netzwerks. Bieten Sie Ihren Kunden einen zusätzlichen Service, erzielen Sie zusätzliche Einnahmen pro erfolgreich abgewickeltem Paket und profitieren Sie von potenziell mehr Laufkundschaft. PAYVITY begleitet Sie von der Standortprüfung bis zum laufenden Betrieb.",
      ctaPrimary: "Jetzt Paketshop werden",
      ctaSecondary: "So funktioniert der Paketshop",
      stats: [
        {
          id: "packages",
          target: 5000,
          suffix: "+",
          label: "Pakete erfolgreich übergeben",
        },
        {
          id: "partners",
          target: 700,
          suffix: "+",
          label: "Aktive Partner",
        },
        {
          id: "locations",
          target: 105,
          suffix: "+",
          label: "Standorte deutschlandweit",
        },
      ],
    },
    paketshop: {
      title: "Ihr Geschäft als Amazon Paketshop & Annahmestelle.",
      lead: "Als Amazon Hub Counter Partner werden lokale Geschäfte zu einer offiziellen Abhol- und Annahmestelle direkt in der Nachbarschaft — ohne aufwendigen Umbau und mit persönlicher Betreuung durch PAYVITY.",
      cardHeading: "Amazon Hub Counter (Paketshop)",
      cardDesc:
        "Nutzen Sie Ihre bestehende Ladentheke und einen kleinen, sicheren Lagerbereich für die schnelle Paketausgabe. Sobald Kunden Ihren Shop beim Amazon-Checkout auswählen, steigern Sie Ihre Sichtbarkeit im Viertel und erschließen eine zusätzliche Einnahmequelle für Ihr Geschäft.",
      bullets: [
        "Zusätzliche Einnahmen pro erfolgreich abgewickeltem Paket – transparent vereinbart ohne versteckte Gebühren.",
        "Einfache Bedienung über die Amazon Hub App zur Paketabwicklung auf Smartphone oder Tablet.",
        "Paketabholung und Amazon Retouren-Annahme (sofern für Ihren Standort und das Programm freigeschaltet).",
        "Persönliche Begleitung durch PAYVITY bis zur Freischaltung, inklusive Team-Einweisung und Werbematerial.",
      ],
      ctaLabel: "Kostenlose Standortprüfung anfragen",
      secondaryLinkLabel: "Auch an Amazon Locker interessiert?",
      imageSrc:
        "https://m.media-amazon.com/images/G/03/AmazonPickupLocations/ULP_Redesign/amazon-pickup-service.png",
      imageWidth: 800,
      imageHeight: 600,
      imageAlt:
        "Amazon Hub Counter Paketshop im lokalen Einzelhandel mit persönlicher Paketübergabe",
      verticalsHeading: "Für welche Geschäfte eignet sich ein Paketshop?",
      verticalsLead:
        "Ob Sie erstmals einen Paketshop eröffnen oder Ihr bestehendes Geschäft um eine attraktive Amazon Annahmestelle erweitern möchten – entscheidend sind verlässliche Öffnungszeiten, gute Erreichbarkeit und eine trockene Ablagefläche:",
      verticals: [
        "Kiosk & Späti",
        "Einzelhandel",
        "Tankstelle",
        "Schreibwarenladen",
        "Bäckerei & Café",
        "Lotto-Annahmestelle",
        "Buchhandlung",
        "Apotheke & Drogerie",
      ],
      multiCarrierNote:
        "Sie betreiben bereits einen DHL-, Hermes-, DPD- oder GLS-Paketshop? Viele Partner nutzen Amazon Hub Counter als zusätzlichen Paketdienst, sofern bestehende Verträge mit anderen Paketdiensten keine Exklusivität vorschreiben.",
    },
    advantages: {
      title: "Warum sich ein Paketshop für Ihren Laden lohnt.",
      lead: "PAYVITY verbindet lokale Einzelhändler in ganz Deutschland mit dem Amazon Hub Counter Netzwerk – für zusätzliche Einnahmen und potenziell mehr Laufkundschaft.",
      cards: [
        {
          id: "comp",
          icon: "box",
          title: "Zusätzliche Einnahmen pro Paket",
          desc: "Sie erhalten eine feste Vergütung pro erfolgreich abgewickeltem Paket – ohne Startgebühren für Ihre Bewerbung oder Standortprüfung.",
        },
        {
          id: "traffic",
          icon: "users",
          title: "Potenziell mehr Laufkundschaft",
          desc: "Ihr Geschäft wird direkt im Amazon-Checkout angezeigt. Paketabholer betreten Ihren Laden und können zu Käufern für Ihr Kernsortiment werden.",
        },
        {
          id: "app",
          icon: "app",
          title: "Amazon Hub App zur Paketabwicklung",
          desc: "Eingehende Sendungen und Abholcodes werden in wenigen Sekunden per Smartphone oder Tablet erfasst – ganz ohne teure Spezialkassen.",
        },
        {
          id: "network",
          icon: "network",
          title: "Persönliche Begleitung auf Deutsch",
          desc: "Von der ersten Eignungsprüfung über den Vertrag bis zur Einweisung Ihres Teams steht Ihnen das Team von PAYVITY direkt zur Seite.",
        },
      ],
    },
    process: {
      title: "In 3 Schritten zum Amazon Counter Partner.",
      lead: "Klar strukturiert und unverbindlich – PAYVITY begleitet Sie persönlich von der Anfrage bis zur Freischaltung Ihres Paketshops.",
      steps: [
        {
          step: 1,
          img: "https://m.media-amazon.com/images/G/01/DSP2022/ULP-LP/01-find-sm.png",
          width: 480,
          height: 320,
          title: "1. Standort kostenlos prüfen lassen",
          desc: "Tragen Sie Ihren Geschäftsname, PLZ, Ort und Ihre Telefonnummer ein. Wir melden uns telefonisch und prüfen die Eignung Ihres Standorts.",
          alt: "Schritt 1: Standortprüfung für Ihren Amazon Paketshop anfragen",
        },
        {
          step: 2,
          img: "https://m.media-amazon.com/images/G/01/DSP2022/ULP-LP/02-choose-sm.png",
          width: 480,
          height: 320,
          title: "2. Unterlagen & Vertrag abschließen",
          desc: "Passt Ihr Standort ins Netzwerk, reichen Sie die erforderlichen Gewerbeunterlagen ein und schließen den Partnervertrag unkompliziert ab.",
          alt: "Schritt 2: Unterlagen prüfen und Partnerschaftsvertrag abschließen",
        },
        {
          step: 3,
          img: "https://m.media-amazon.com/images/G/01/DSP2022/ULP-LP/03-pickup-sm.png",
          width: 480,
          height: 320,
          title: "3. Einrichtung, Schulung & Start",
          desc: "Wir begleiten Sie bei der Einrichtung der Amazon Hub App und liefern Werbematerial für Ihr Schaufenster – anschließend geht Ihr Paketshop live.",
          alt: "Schritt 3: Einrichtung der Amazon Hub App und Start im Amazon-Checkout",
        },
      ],
    },
    trust: {
      title: "Warum Einzelhändler auf PAYVITY setzen.",
      lead: "Als spezialisierter Amazon Hub Partner in Deutschland nehmen wir Ihnen organisatorische Hürden ab, damit Sie sich auf Ihren Laden konzentrieren können.",
      imageSrc:
        "https://m.media-amazon.com/images/G/01/DSP2022/ULP-LP/ULP-Image-Grid-New_compressed.png",
      imageWidth: 960,
      imageHeight: 720,
      imageAlt:
        "Lokale Einzelhandelsgeschäfte und Amazon Paketshop-Partner im Einsatz",
      items: [
        {
          index: "01",
          title: "Offizieller Amazon Hub Partner",
          desc: "Zertifizierte Anbindung an das Amazon Hub Netzwerk: Nach Freischaltung erscheint Ihr Geschäft für Kunden im Bestellprozess als wählbare Abholstation.",
        },
        {
          index: "02",
          title: "Persönliche Begleitung bis zur Freischaltung",
          desc: "Statt anonymer Formular-Schleifen telefonieren Sie direkt mit unserem Partner-Team – wir prüfen PLZ, Öffnungszeiten und Flächenbedarf gemeinsam.",
        },
        {
          index: "03",
          title: "Transparente Konditionen ohne Startgebühren",
          desc: "Standortprüfung, Onboarding und Schaufenster-Materialien erfolgen ohne Startgebühren. Ihre Vergütung pro Paket wird vor Vertragsabschluss klar vereinbart.",
        },
        {
          index: "04",
          title: "Alternative oder Ergänzung zu bestehenden Paketshops",
          desc: "Ideal sowohl für Läden ohne bisherigen Paketservice als auch für erfahrene Betreiber, die neben Hermes, DPD oder GLS einen weiteren Paketdienst anbieten möchten (sofern vertraglich zulässig).",
        },
      ],
    },
    lockerTeaser: {
      badge: "Zusatzangebot für größere Flächen",
      title: "Freie Innen- oder Außenfläche? Amazon Locker als Zusatzoption.",
      desc: "Unser Schwerpunkt liegt auf persönlichen Paketshops im Einzelhandel. Für Supermärkte, Tankstellen, Einkaufszentren oder Gewerbeimmobilien unterstützen wir ergänzend auch bei vollautomatischen Amazon Hub Lockern (Selbstbedienungs-Paketstationen mit geringem Personalaufwand).",
      ctaLabel: "Mehr zu Amazon Locker Standorten",
    },
    faq: {
      title: "Häufig gestellte Fragen zum Paketshop",
      lead: "Alle wichtigen Antworten zu Voraussetzungen, Provision, Ablauf und Amazon Hub App auf einen Blick.",
      helpTitle: "Passt Ihr Geschäft als Standort?",
      helpDesc:
        "Lassen Sie Ihre Adresse unverbindlich prüfen – unser Team ruft Sie kurzfristig zurück und beantwortet alle Fragen zur Vergütung.",
      helpCta: "Jetzt Standort prüfen lassen",
      items: [
        {
          id: "faq-1",
          question: "Wie werde ich Amazon Paketshop Partner in Deutschland?",
          answer:
            "Senden Sie uns über das Formular Namen des Geschäfts, PLZ, Ort, Ansprechpartner und Telefonnummer. PAYVITY prüft die Nachfrage in Ihrem Postleitzahlengebiet, bespricht alle Konditionen persönlich am Telefon mit Ihnen und begleitet Sie bis zur Freischaltung im Amazon Hub Counter Netzwerk.",
        },
        {
          id: "faq-2",
          question:
            "Welche Voraussetzungen muss mein Geschäft für einen Paketshop erfüllen?",
          answer:
            "Benötigt wird ein angemeldetes, stationäres Ladengeschäft in Deutschland mit regelmäßigem Publikumsverkehr (z. B. Kiosk, Späti, Tankstelle, Schreibwarenladen, Bäckerei, Buchhandlung oder Einzelhandel), verlässlichen Öffnungszeiten, Internetzugang sowie einer trockenen, abschließbaren Ablagefläche für Pakete.",
        },
        {
          id: "faq-3",
          question:
            "Was verdient man als Paketshop und wie hoch ist die Provision?",
          answer:
            "Sie erhalten eine feste Vergütung pro erfolgreich ausgegebenem bzw. abgewickeltem Paket. Zusätzlich entsteht der größte wirtschaftliche Effekt häufig über zusätzliche Käufe von Paketabholern im eigenen Sortiment. Die konkreten Vergütungskonditionen besprechen wir transparent nach der Standortprüfung.",
        },
        {
          id: "faq-4",
          question:
            "Welche Kosten entstehen, wenn ich einen Amazon Paketshop eröffne?",
          answer:
            "Die Standortprüfung, die Registrierung sowie die Einführung in das System sind für geeignete Partner ohne Startgebühren möglich. Sie nutzen Ihre vorhandene Ladentheke und benötigen lediglich ein internetfähiges Smartphone oder Tablet für die Amazon Hub App zur Paketabwicklung.",
        },
        {
          id: "faq-5",
          question:
            "Wie funktioniert die Paketübergabe mit der Amazon Hub App?",
          answer:
            "Bei Anlieferung scannen Ihre Mitarbeitenden die Pakete kurz über die Amazon Hub App ein und legen sie sicher ab. Holt ein Kunde seine Bestellung ab, zeigt er seinen Abholcode vor – ein Scan bestätigt die Übergabe in wenigen Sekunden.",
        },
        {
          id: "faq-6",
          question:
            "Können Kunden auch Amazon Retouren in meinem Paketshop abgeben?",
          answer:
            "Viele Amazon Hub Counter Standorte ermöglichen neben der Paketabholung auch die Annahme vorbereiteter Amazon Retouren. Ob und ab wann der Retourenservice für Ihren Standort freigeschaltet wird, richtet sich nach dem jeweiligen Standortprogramm und dem lokalen Transportnetz.",
        },
        {
          id: "faq-7",
          question:
            "Kann ich einen Amazon Paketshop zusätzlich zu DHL, Hermes, DPD oder GLS betreiben?",
          answer:
            "In vielen Fällen lässt sich ein Amazon Paketshop sehr gut als zusätzlicher Paketdienst integrieren, sofern bestehende Verträge mit DHL, Hermes, DPD oder GLS keine Exklusivitätsklausel enthalten. Gleichzeitig ist das Modell auch eine attraktive Alternative für Läden, die bisher noch keinen Paketshop anbieten.",
        },
        {
          id: "faq-8",
          question:
            "Was ist der Unterschied zwischen einem Amazon Paketshop (Counter) und einem Amazon Locker?",
          answer:
            "Im Amazon Paketshop (Hub Counter) übergeben Sie Pakete persönlich an Ihrer Theke und profitieren direkt vom Kundenkontakt im Laden. Ein Amazon Locker ist eine Selbstbedienungs-Paketstation mit geringem Personalaufwand für größere Innen- oder Außenflächen, die PAYVITY als ergänzende Lösung betreut.",
        },
      ],
    },
    leadForm: {
      title: "Jetzt Amazon Paketshop werden",
      lead: "Kostenlos und unverbindlich Ihren Standort prüfen lassen. Unser Partner-Team meldet sich telefonisch bei Ihnen.",
      interestLabel: "Ich interessiere mich für",
      options: [
        { value: "Amazon Paketshop", label: "Amazon Paketshop" },
        { value: "Amazon Locker", label: "Amazon Locker" },
        { value: "Beides", label: "Beides" },
      ],
      fields: {
        businessName: "Name des Geschäfts *",
        businessPlaceholder: "z. B. Kiosk am Markt",
        postalCode: "Postleitzahl *",
        postalPlaceholder: "z. B. 60311",
        city: "Ort *",
        cityPlaceholder: "z. B. Frankfurt am Main",
        contactName: "Ansprechpartner *",
        contactPlaceholder: "Vor- und Nachname",
        phone: "Telefonnummer *",
        phonePlaceholder: "z. B. 0171 1234567",
        email: "E-Mail-Adresse (optional)",
        emailPlaceholder: "name@geschaeft.de",
      },
      privacyPrefix: "Informationen zur Verarbeitung Ihrer Daten finden Sie in unserer ",
      privacyLinkLabel: "Datenschutzerklärung",
      privacySuffix: ".",
      submitLabel: "Kostenlose Standortprüfung anfragen",
      submittingLabel: "Anfrage wird gesendet...",
      trustLine: "Unverbindlich · Persönliche Betreuung",
      successMessage:
        "Vielen Dank! Ihre Anfrage ist bei PAYVITY eingegangen. Unser Team meldet sich telefonisch zur Standortprüfung bei Ihnen.",
      errorFallback:
        "Die Anfrage konnte gerade nicht übermittelt werden. Bitte schreiben Sie uns direkt an partner@payvityparcels.de.",
      validationMessages: {
        required: "Bitte füllen Sie alle mit * markierten Pflichtfelder aus.",
        invalidPostal: "Bitte geben Sie eine gültige Postleitzahl an.",
        invalidPhone: "Bitte geben Sie eine gültige Telefonnummer für den Rückruf an.",
        invalidEmail: "Bitte prüfen Sie das Format Ihrer E-Mail-Adresse.",
      },
    },
    footer: {
      copy: "© 2026 PAYVITY Parcels — Amazon Hub Counter & Locker Partner für Deutschland.",
      contactLabel: "Kontakt",
      lockerLabel: "Amazon Locker",
      privacyLabel: "Datenschutz",
      imprintLabel: "Impressum",
    },
  },
  en: {
    meta: {
      title: "Become an Amazon Parcel Shop in Germany | PAYVITY Parcels",
      description:
        "Become an Amazon Hub Counter partner (Paketshop) in Germany. Attract potential foot traffic, earn per processed parcel, and receive personal onboarding support.",
      ogAlt:
        "PAYVITY Parcels — Become an Amazon Hub Counter Parcel Shop in Germany",
    },
    nav: {
      items: [
        { id: "paketshop", label: "Parcel Shop" },
        { id: "vorteile", label: "Benefits" },
        { id: "so-funktionierts", label: "How it works" },
        { id: "faq", label: "FAQ" },
      ],
      lockerLinkLabel: "Amazon Lockers",
      ctaLabel: "Become a partner",
      ariaMain: "Main navigation",
      ariaLang: "Select language",
      ariaMenuOpen: "Open menu",
      logoAlt: "PAYVITY Parcels — Official Partner of Amazon",
    },
    hero: {
      ariaLabel: "PAYVITY Parcels — Become an Amazon Parcel Shop in Germany",
      eyebrow: "Official Amazon Hub Partner in Germany",
      title: "Become an Amazon Parcel Shop – attract more customers.",
      subtitle:
        "Join the Amazon Hub Counter network in Germany. Offer local shoppers a convenient parcel service, generate additional income per processed parcel, and benefit from potential extra foot traffic. PAYVITY supports you from site check to ongoing operations.",
      ctaPrimary: "Apply as Parcel Shop",
      ctaSecondary: "How it works",
      stats: [
        {
          id: "packages",
          target: 5000,
          suffix: "+",
          label: "Parcels handled",
        },
        {
          id: "partners",
          target: 700,
          suffix: "+",
          label: "Active partners",
        },
        {
          id: "locations",
          target: 105,
          suffix: "+",
          label: "Locations across Germany",
        },
      ],
    },
    paketshop: {
      title: "Your store as an official Amazon Parcel Shop (Hub Counter).",
      lead: "Amazon Hub Counter turns existing retail shops in Germany into neighborhood parcel pickup and drop-off points — using your existing counter with personal guidance from PAYVITY.",
      cardHeading: "Amazon Hub Counter (Paketshop)",
      cardDesc:
        "Use your existing checkout counter and a small secure storage corner to hand over online orders to nearby shoppers. Appearing at Amazon checkout increases local visibility and creates an extra revenue stream.",
      bullets: [
        "Additional revenue per successfully processed parcel with transparent partner terms.",
        "Simple handheld workflow via the Amazon Hub App for parcel processing on a phone or tablet.",
        "Parcel collection and Amazon returns acceptance (where enabled for your store and program).",
        "Personal onboarding from PAYVITY through activation, including team training and display materials.",
      ],
      ctaLabel: "Request free location check",
      secondaryLinkLabel: "Also looking at Amazon Lockers?",
      imageSrc:
        "https://m.media-amazon.com/images/G/03/AmazonPickupLocations/ULP_Redesign/amazon-pickup-service.png",
      imageWidth: 800,
      imageHeight: 600,
      imageAlt:
        "Amazon Hub Counter parcel shop handover inside a local German retail store",
      verticalsHeading: "Which businesses fit an Amazon Parcel Shop?",
      verticalsLead:
        "Whether you are opening a parcel shop for the first time or expanding an existing store, reliable opening hours, easy neighborhood access, and dry storage space are key:",
      verticals: [
        "Kiosk & Späti",
        "Retail Store",
        "Petrol Station",
        "Stationery Shop",
        "Bakery & Café",
        "Lottery Shop",
        "Bookstore",
        "Pharmacy & Drugstore",
      ],
      multiCarrierNote:
        "Already operating a DHL, Hermes, DPD, or GLS parcel shop? Many shops add Amazon Hub Counter as an additional carrier service where existing contracts permit.",
    },
    advantages: {
      title: "Why a Parcel Shop makes sense for your store.",
      lead: "PAYVITY connects local German retailers with the Amazon Hub Counter network — built for extra per-parcel income and potential in-store footfall.",
      cards: [
        {
          id: "comp",
          icon: "box",
          title: "Additional revenue per parcel",
          desc: "Earn transparent compensation per successfully handled parcel — with no signup fee for your location review.",
        },
        {
          id: "traffic",
          icon: "users",
          title: "Potential extra foot traffic",
          desc: "Your shop is listed directly at Amazon checkout, bringing local shoppers into your store where they can browse your products.",
        },
        {
          id: "app",
          icon: "app",
          title: "Amazon Hub App workflow",
          desc: "Scan incoming parcels and customer pickup codes in seconds using a standard smartphone or tablet — no expensive POS hardware needed.",
        },
        {
          id: "network",
          icon: "network",
          title: "Personal support through launch",
          desc: "From postcode suitability checks to contract setup and team onboarding, PAYVITY provides direct personal guidance.",
        },
      ],
    },
    process: {
      title: "3 steps to becoming an Amazon Counter partner.",
      lead: "Straightforward and non-binding — PAYVITY guides you personally all the way to activation.",
      steps: [
        {
          step: 1,
          img: "https://m.media-amazon.com/images/G/01/DSP2022/ULP-LP/01-find-sm.png",
          width: 480,
          height: 320,
          title: "1. Free location check",
          desc: "Submit your store name, postal code, city, and phone number. Our team calls you directly to review suitability in your area.",
          alt: "Step 1: Request a free location check for your Amazon Parcel Shop",
        },
        {
          step: 2,
          img: "https://m.media-amazon.com/images/G/01/DSP2022/ULP-LP/02-choose-sm.png",
          width: 480,
          height: 320,
          title: "2. Documents & agreement",
          desc: "Once your store qualifies, submit your business registration documents and sign the partner agreement digitally.",
          alt: "Step 2: Submit documents and sign the partner agreement",
        },
        {
          step: 3,
          img: "https://m.media-amazon.com/images/G/01/DSP2022/ULP-LP/03-pickup-sm.png",
          width: 480,
          height: 320,
          title: "3. Setup, training & go live",
          desc: "We guide you through setting up the Amazon Hub App and ship storefront signage — then your store goes live at Amazon checkout.",
          alt: "Step 3: Amazon Hub App onboarding and live launch",
        },
      ],
    },
    trust: {
      title: "Why German retailers work with PAYVITY.",
      lead: "As an experienced Amazon Hub partner, we remove administrative friction so store owners can focus on serving their customers.",
      imageSrc:
        "https://m.media-amazon.com/images/G/01/DSP2022/ULP-LP/ULP-Image-Grid-New_compressed.png",
      imageWidth: 960,
      imageHeight: 720,
      imageAlt: "Amazon Hub Counter and Locker partner locations in retail areas",
      items: [
        {
          index: "01",
          title: "Official Amazon Hub Partner",
          desc: "Direct integration with the Amazon Hub network so eligible shoppers see your store as an official pickup option during checkout.",
        },
        {
          index: "02",
          title: "Personal support until activation",
          desc: "Instead of automated ticket queues, our team speaks with you directly by phone to align opening hours, storage capacity, and onboarding.",
        },
        {
          index: "03",
          title: "Clear terms without startup fees",
          desc: "Location checks, onboarding, and promotional storefront signs carry no upfront signup fee. Per-parcel rates are clarified transparently before signing.",
        },
        {
          index: "04",
          title: "Compatible with existing shops",
          desc: "Suitable both as your first parcel counter or alongside Hermes, DPD, or GLS operations where existing carrier contracts permit.",
        },
      ],
    },
    lockerTeaser: {
      badge: "Additional option for larger sites",
      title: "Spare indoor or outdoor space? Amazon Lockers as an add-on.",
      desc: "While staffed Parcel Shops (Counters) are our primary business across Germany, PAYVITY also helps supermarkets, petrol stations, shopping centers, and property owners host self-service Amazon Hub Lockers requiring minimal staff involvement.",
      ctaLabel: "Explore Amazon Locker locations",
    },
    faq: {
      title: "Frequently asked questions",
      lead: "Key facts about location eligibility, compensation, multi-carrier rules, and the Amazon Hub App.",
      helpTitle: "Want to check if your store qualifies?",
      helpDesc:
        "Request a free, non-binding site check and our partner team will call you to discuss local demand and rates.",
      helpCta: "Request free site check",
      items: [
        {
          id: "faq-1",
          question: "How do I become an Amazon Parcel Shop partner in Germany?",
          answer:
            "Enter your store name, postal code, city, contact person, and phone number in the form below. PAYVITY reviews local demand in your postcode area, calls you personally to go over terms, and guides you through onboarding to activation.",
        },
        {
          id: "faq-2",
          question: "What are the requirements for an Amazon Hub Counter store?",
          answer:
            "You need a registered physical retail business in Germany with customer footfall (such as a kiosk, Späti, petrol station, stationery shop, bakery, bookstore, or local retailer), consistent opening hours, internet access, and a secure, dry storage area for parcels.",
        },
        {
          id: "faq-3",
          question: "How much can I earn as a Parcel Shop partner?",
          answer:
            "Partners earn fixed compensation per successfully processed parcel. Many stores also see meaningful extra revenue from parcel visitors buying everyday items in store. Exact rates are shared transparently after checking your postcode.",
        },
        {
          id: "faq-4",
          question: "Are there any upfront startup fees?",
          answer:
            "Location evaluation, onboarding support, and official display materials are provided without upfront startup fees for qualified partners. You simply use your existing counter and a smartphone or tablet running the Amazon Hub App.",
        },
        {
          id: "faq-5",
          question: "How does daily parcel handling work with the Amazon Hub App?",
          answer:
            "When parcels arrive, staff scan them into the Amazon Hub App and store them safely. When a shopper arrives, they present a pickup code — a quick scan completes the handover in seconds.",
        },
        {
          id: "faq-6",
          question: "Can customers also drop off Amazon returns?",
          answer:
            "Many Amazon Hub Counter locations handle customer returns in addition to parcel pickups. Availability of returns depends on the local program configuration and carrier setup at your site.",
        },
        {
          id: "faq-7",
          question: "Can I run an Amazon Parcel Shop alongside DHL, Hermes, DPD, or GLS?",
          answer:
            "Yes, in many cases stores combine Amazon Hub Counter with other carriers, provided existing agreements with DHL, Hermes, DPD, or GLS do not enforce exclusivity. It is also an ideal starting option if you do not yet offer parcel services.",
        },
        {
          id: "faq-8",
          question: "What is the difference between a Parcel Shop (Counter) and an Amazon Locker?",
          answer:
            "In a Parcel Shop (Hub Counter), your staff hands over parcels personally at the counter and engages directly with visiting shoppers. An Amazon Locker is an automated self-service kiosk with minimal staff involvement suited to larger indoor or outdoor spaces.",
        },
      ],
    },
    leadForm: {
      title: "Become an Amazon Parcel Shop now",
      lead: "Check your store's eligibility free of charge and without obligation. Our partner team will follow up by phone.",
      interestLabel: "I am interested in",
      options: [
        { value: "Amazon Paketshop", label: "Amazon Parcel Shop" },
        { value: "Amazon Locker", label: "Amazon Locker" },
        { value: "Beides", label: "Both" },
      ],
      fields: {
        businessName: "Business name *",
        businessPlaceholder: "e.g. Kiosk am Markt",
        postalCode: "Postal code *",
        postalPlaceholder: "e.g. 60311",
        city: "City *",
        cityPlaceholder: "e.g. Frankfurt am Main",
        contactName: "Contact person *",
        contactPlaceholder: "Full name",
        phone: "Phone number *",
        phonePlaceholder: "e.g. +49 171 1234567",
        email: "Email address (optional)",
        emailPlaceholder: "owner@store.de",
      },
      privacyPrefix: "Information on how we process your data can be found in our ",
      privacyLinkLabel: "Privacy Policy",
      privacySuffix: ".",
      submitLabel: "Request free location check",
      submittingLabel: "Sending request...",
      trustLine: "Non-binding · Personal support",
      successMessage:
        "Thank you! Your inquiry has been received by PAYVITY. Our partner team will call you shortly regarding your location check.",
      errorFallback:
        "Unable to submit right now. Please contact us directly at partner@payvityparcels.de.",
      validationMessages: {
        required: "Please complete all required fields marked with *.",
        invalidPostal: "Please enter a valid postal code.",
        invalidPhone: "Please enter a valid phone number so we can call you.",
        invalidEmail: "Please enter a valid email address.",
      },
    },
    footer: {
      copy: "© 2026 PAYVITY Parcels — Amazon Hub Counter & Locker Partner for Germany.",
      contactLabel: "Contact",
      lockerLabel: "Amazon Lockers",
      privacyLabel: "Privacy",
      imprintLabel: "Legal notice",
    },
  },
};
