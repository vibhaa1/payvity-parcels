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

export type VerticalIconKey =
  | "kiosk"
  | "retail"
  | "fuel"
  | "stationery"
  | "bakery"
  | "lottery"
  | "book"
  | "pharmacy"
  | "supermarket"
  | "residential"
  | "transit"
  | "building";

export interface VerticalMarqueeItem {
  icon: VerticalIconKey;
  label: string;
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

export type HowItWorksIconKey = "app" | "select" | "code" | "parcel" | "done";

export interface HowItWorksStepItem {
  id: string;
  icon: HowItWorksIconKey;
  side: "left" | "right";
  startFrame: number;
  endFrame: number;
  representativeFrame: number;
  title: string;
  desc: string;
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
    title: string;
    subtitle: string;
    ctaPrimary: string;
    ctaSecondary: string;
    stats: StatItem[];
  };
  paketshop: {
    title: string;
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
    verticals: VerticalMarqueeItem[];
  };
  advantages: {
    title: string;
    cards: AdvantageCardItem[];
  };
  howItWorks: {
    title: string;
    lead: string;
    scrollHint: string;
    steps: HowItWorksStepItem[];
  };
  process: {
    title: string;
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
    options: Array<{ value: InterestOption; label: string }>;
  };
  footer: {
    copy: string;
    contactLabel: string;
    lockerLabel: string;
    privacyLabel: string;
    imprintLabel: string;
    termsLabel: string;
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
      title: "Amazon Paketshop werden – mehr Kunden für Ihr Geschäft.",
      subtitle:
        "Werden Sie Teil des Amazon Hub Counter Netzwerks in Deutschland. Erzielen Sie zusätzliche Einnahmen pro Paket und gewinnen Sie neue Laufkundschaft – persönlich begleitet durch PAYVITY.",
      ctaPrimary: "Jetzt Paketshop werden",
      ctaSecondary: "So funktioniert der Paketshop",
      stats: [
        {
          id: "packages",
          target: 50000,
          suffix: "+",
          label: "Pakete erfolgreich übergeben",
        },
        {
          id: "partners",
          target: 700,
          suffix: "+",
          label: "Partner",
        },
        {
          id: "locations",
          target: 145,
          suffix: "+",
          label: "Städte deutschlandweit",
        },
      ],
    },
    paketshop: {
      title: "Ihr Geschäft als offizieller Amazon Paketshop (Hub Counter).",
      cardHeading: "Amazon Hub Counter (Paketshop)",
      cardDesc:
        "Verwandeln Sie Ihren bestehenden Laden in einen Amazon Paketshop. Geben Sie Pakete aus, gewinnen Sie neue Kunden und erzielen Sie zusätzliche Einnahmen mit minimalem Aufwand.",
      bullets: [
        "Zusätzliche Einnahmen pro erfolgreich abgewickeltem Paket – transparent ohne versteckte Gebühren.",
        "Einfache Bedienung über die Amazon Hub App zur Paketabwicklung auf Smartphone oder Tablet.",
        "Persönliche Begleitung durch PAYVITY bis zur Freischaltung inklusive Einweisung und Werbematerial.",
      ],
      ctaLabel: "Kostenlose Standortprüfung anfragen",
      secondaryLinkLabel: "Auch an Amazon Locker interessiert?",
      imageSrc: "/images/amazon-abholort-banner.jpeg",
      imageWidth: 1086,
      imageHeight: 204,
      imageAlt: "Amazon Abholort Banner",
      verticalsHeading: "Für welche Geschäfte eignet sich ein Paketshop?",
      verticals: [
        { icon: "kiosk", label: "Kiosk & Späti" },
        { icon: "retail", label: "Einzelhandel" },
        { icon: "fuel", label: "Tankstelle" },
        { icon: "stationery", label: "Schreibwarenladen" },
        { icon: "bakery", label: "Bäckerei & Café" },
        { icon: "lottery", label: "Lotto-Annahmestelle" },
        { icon: "book", label: "Buchhandlung" },
        { icon: "pharmacy", label: "Apotheke & Drogerie" },
      ],
    },
    advantages: {
      title: "Warum sich ein Paketshop für Ihren Laden lohnt.",
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
    howItWorks: {
      title: "So funktioniert's",
      lead: "Vom Öffnen der App bis zur Paketübergabe – jede Abholung dauert nur wenige Sekunden.",
      scrollHint: "Scrollen Sie, um jeden Schritt live zu erleben",
      steps: [
        {
          id: "app",
          icon: "app",
          side: "left",
          startFrame: 0,
          endFrame: 33,
          representativeFrame: 20,
          title: "Amazon Hub App öffnen",
          desc: "Starten Sie die App auf Ihrem Smartphone oder Scanner.",
        },
        {
          id: "select",
          icon: "select",
          side: "right",
          startFrame: 34,
          endFrame: 60,
          representativeFrame: 45,
          title: "„Abholung durch Kunden“ wählen",
          desc: "Tippen Sie im Hauptmenü auf Kundenabholung.",
        },
        {
          id: "code",
          icon: "code",
          side: "left",
          startFrame: 61,
          endFrame: 86,
          representativeFrame: 78,
          title: "Kunden-Abholcode scannen",
          desc: "Scannen Sie den Barcode auf dem Smartphone des Kunden.",
        },
        {
          id: "parcel",
          icon: "parcel",
          side: "right",
          startFrame: 87,
          endFrame: 127,
          representativeFrame: 118,
          title: "Paket scannen",
          desc: "Scannen Sie das Versandetikett auf dem Paket.",
        },
        {
          id: "done",
          icon: "done",
          side: "left",
          startFrame: 128,
          endFrame: 149,
          representativeFrame: 148,
          title: "Glückwunsch! Fertig.",
          desc: "Paket übergeben – die Abholung ist in Sekunden abgeschlossen.",
        },
      ],
    },
    process: {
      title: "In 3 Schritten zum Amazon Counter Partner.",
      steps: [
        {
          step: 1,
          img: "https://m.media-amazon.com/images/G/01/DSP2022/ULP-LP/01-find-sm.png",
          width: 480,
          height: 320,
          title: "Standort kostenlos prüfen lassen",
          desc: "Tragen Sie Ihren Geschäftsname, PLZ, Ort und Ihre Telefonnummer ein. Wir melden uns telefonisch und prüfen die Eignung Ihres Standorts.",
          alt: "Schritt 1: Standortprüfung für Ihren Amazon Paketshop anfragen",
        },
        {
          step: 2,
          img: "https://m.media-amazon.com/images/G/01/DSP2022/ULP-LP/02-choose-sm.png",
          width: 480,
          height: 320,
          title: "Unterlagen & Vertrag abschließen",
          desc: "Passt Ihr Standort ins Netzwerk, reichen Sie die erforderlichen Gewerbeunterlagen ein und schließen den Partnervertrag unkompliziert ab.",
          alt: "Schritt 2: Unterlagen prüfen und Partnerschaftsvertrag abschließen",
        },
        {
          step: 3,
          img: "https://m.media-amazon.com/images/G/01/DSP2022/ULP-LP/03-pickup-sm.png",
          width: 480,
          height: 320,
          title: "Einrichtung, Schulung & Start",
          desc: "Wir begleiten Sie bei der Einrichtung der Amazon Hub App und liefern Werbematerial für Ihr Schaufenster – anschließend geht Ihr Paketshop live.",
          alt: "Schritt 3: Einrichtung der Amazon Hub App und Start im Amazon-Checkout",
        },
      ],
    },
    trust: {
      title: "Warum Einzelhändler auf PAYVITY setzen.",
      lead: "Wir übernehmen Einrichtung und Organisation – Sie konzentrieren sich auf Ihr Geschäft.",
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
      title: "Freie Innen- oder Außenfläche? Amazon Locker als Zusatzoption.",
      desc: "PAYVITY unterstützt außerdem Supermärkte, Tankstellen, Einkaufszentren und Immobilieneigentümer bei Amazon Hub Lockern – als komfortable Selbstbedienungs-Paketstation mit geringem Personalaufwand.",
      ctaLabel: "Mehr zu Amazon Locker Standorten",
    },
    faq: {
      title: "Häufig gestellte Fragen",
      lead: "Voraussetzungen, Vergütung, Ablauf und die Amazon Hub App auf einen Blick.",
      helpTitle: "Passt Ihr Geschäft als Standort?",
      helpDesc:
        "Lassen Sie Ihre Adresse unverbindlich prüfen – unser Team ruft Sie kurzfristig zurück.",
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
        {
          id: "faq-9",
          question: "Was passiert, nachdem ich das Formular abgeschickt habe?",
          answer:
            "Wir rufen Sie werktags innerhalb von 24 Stunden an, um Ihr Gebiet zu prüfen, Ihren Standort zu besprechen und den Vertrag abzuschließen. Die Freischaltung erfolgt unmittelbar nach Einreichung der Unterlagen und Vertragsunterzeichnung.",
        },
      ],
    },
    leadForm: {
      options: [
        { value: "Amazon Paketshop", label: "Amazon Paketshop" },
        { value: "Amazon Locker", label: "Amazon Locker" },
        { value: "Beides", label: "Beides" },
      ],
    },
    footer: {
      copy: "© 2026 PAYVITY Parcels — Amazon Hub Counter & Locker Partner für Deutschland.",
      contactLabel: "Kontakt",
      lockerLabel: "Amazon Locker",
      privacyLabel: "Datenschutzerklärung",
      imprintLabel: "Impressum",
      termsLabel: "AGB",
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
      title: "Become an Amazon Parcel Shop – attract more customers.",
      subtitle:
        "Join the Amazon Hub Counter network in Germany. Earn additional income per processed parcel and attract new visitors to your store with personal guidance from PAYVITY.",
      ctaPrimary: "Apply as Parcel Shop",
      ctaSecondary: "How it works",
      stats: [
        {
          id: "packages",
          target: 50000,
          suffix: "+",
          label: "Parcels handled",
        },
        {
          id: "partners",
          target: 700,
          suffix: "+",
          label: "Partners",
        },
        {
          id: "locations",
          target: 145,
          suffix: "+",
          label: "Cities across Germany",
        },
      ],
    },
    paketshop: {
      title: "Your store as an official Amazon Parcel Shop (Hub Counter).",
      cardHeading: "Amazon Hub Counter (Paketshop)",
      cardDesc:
        "Turn your existing shop into an Amazon Paketshop. Hand over parcels, attract more customers and earn additional income with minimal effort.",
      bullets: [
        "Additional revenue per successfully processed parcel with transparent partner terms.",
        "Simple handheld workflow via the Amazon Hub App for parcel processing on a phone or tablet.",
        "Personal onboarding from PAYVITY through activation, including team training and display materials.",
      ],
      ctaLabel: "Request free location check",
      secondaryLinkLabel: "Also looking at Amazon Lockers?",
      imageSrc: "/images/amazon-abholort-banner.jpeg",
      imageWidth: 1086,
      imageHeight: 204,
      imageAlt: "Amazon Abholort pickup location banner",
      verticalsHeading: "Which businesses fit an Amazon Parcel Shop?",
      verticals: [
        { icon: "kiosk", label: "Kiosk & Späti" },
        { icon: "retail", label: "Retail Store" },
        { icon: "fuel", label: "Petrol Station" },
        { icon: "stationery", label: "Stationery Shop" },
        { icon: "bakery", label: "Bakery & Café" },
        { icon: "lottery", label: "Lottery Shop" },
        { icon: "book", label: "Bookstore" },
        { icon: "pharmacy", label: "Pharmacy & Drugstore" },
      ],
    },
    advantages: {
      title: "Why a Parcel Shop makes sense for your store.",
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
    howItWorks: {
      title: "How it works",
      lead: "From opening the app to handing over the parcel — every pickup takes just seconds.",
      scrollHint: "Scroll to step through the live workflow",
      steps: [
        {
          id: "app",
          icon: "app",
          side: "left",
          startFrame: 0,
          endFrame: 33,
          representativeFrame: 20,
          title: "Open app",
          desc: "Launch the Amazon Hub App on your phone or scanner.",
        },
        {
          id: "select",
          icon: "select",
          side: "right",
          startFrame: 34,
          endFrame: 60,
          representativeFrame: 45,
          title: 'Click "Abholung durch Kunden"',
          desc: "Select customer pickup from the main menu.",
        },
        {
          id: "code",
          icon: "code",
          side: "left",
          startFrame: 61,
          endFrame: 86,
          representativeFrame: 78,
          title: "Scan customer pickup code",
          desc: "Scan the barcode on the customer's phone.",
        },
        {
          id: "parcel",
          icon: "parcel",
          side: "right",
          startFrame: 87,
          endFrame: 127,
          representativeFrame: 118,
          title: "Scan the packet",
          desc: "Scan the shipping label on the parcel.",
        },
        {
          id: "done",
          icon: "done",
          side: "left",
          startFrame: 128,
          endFrame: 149,
          representativeFrame: 148,
          title: "Congratulations, it's done!",
          desc: "Hand over the parcel — pickup completed in seconds.",
        },
      ],
    },
    process: {
      title: "3 steps to becoming an Amazon Counter partner.",
      steps: [
        {
          step: 1,
          img: "https://m.media-amazon.com/images/G/01/DSP2022/ULP-LP/01-find-sm.png",
          width: 480,
          height: 320,
          title: "Free location check",
          desc: "Submit your store details, postal code, and phone number. Our team calls you directly to review suitability in your area.",
          alt: "Step 1: Request a free location check for your Amazon Parcel Shop",
        },
        {
          step: 2,
          img: "https://m.media-amazon.com/images/G/01/DSP2022/ULP-LP/02-choose-sm.png",
          width: 480,
          height: 320,
          title: "Documents & agreement",
          desc: "Once your store qualifies, submit your business registration documents and sign the partner agreement digitally.",
          alt: "Step 2: Submit documents and sign the partner agreement",
        },
        {
          step: 3,
          img: "https://m.media-amazon.com/images/G/01/DSP2022/ULP-LP/03-pickup-sm.png",
          width: 480,
          height: 320,
          title: "Setup, training & go live",
          desc: "We guide you through setting up the Amazon Hub App and ship storefront signage — then your store goes live at Amazon checkout.",
          alt: "Step 3: Amazon Hub App onboarding and live launch",
        },
      ],
    },
    trust: {
      title: "Why German retailers work with PAYVITY.",
      lead: "We handle onboarding and coordination so you can focus on serving your customers.",
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
      title: "Spare indoor or outdoor space? Amazon Lockers as an add-on.",
      desc: "PAYVITY also helps supermarkets, petrol stations, shopping centers and property owners host Amazon Hub Lockers, offering a convenient self-service parcel solution with minimal staff involvement.",
      ctaLabel: "Explore Amazon Locker locations",
    },
    faq: {
      title: "Frequently asked questions",
      lead: "Key facts about location eligibility, compensation, multi-carrier rules, and the Amazon Hub App.",
      helpTitle: "Want to check if your store qualifies?",
      helpDesc:
        "Request a free, non-binding site check and our partner team will call you.",
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
          question:
            "Can I run an Amazon Parcel Shop alongside DHL, Hermes, DPD, or GLS?",
          answer:
            "Yes, in many cases stores combine Amazon Hub Counter with other carriers, provided existing agreements with DHL, Hermes, DPD, or GLS do not enforce exclusivity. It is also an ideal starting option if you do not yet offer parcel services.",
        },
        {
          id: "faq-8",
          question:
            "What is the difference between a Parcel Shop (Counter) and an Amazon Locker?",
          answer:
            "In a Parcel Shop (Hub Counter), your staff hands over parcels personally at the counter and engages directly with visiting shoppers. An Amazon Locker is an automated self-service kiosk with minimal staff involvement suited to larger indoor or outdoor spaces.",
        },
        {
          id: "faq-9",
          question: "What happens after I submit the form?",
          answer:
            "We call you within 24 working hours to validate your area, review your location and sign the contract. Activation is done immediately after the documents are submitted and the contract is signed.",
        },
      ],
    },
    leadForm: {
      options: [
        { value: "Amazon Paketshop", label: "Amazon Parcel Shop" },
        { value: "Amazon Locker", label: "Amazon Locker" },
        { value: "Beides", label: "Both" },
      ],
    },
    footer: {
      copy: "© 2026 PAYVITY Parcels — Amazon Hub Counter & Locker Partner for Germany.",
      contactLabel: "Contact",
      lockerLabel: "Amazon Lockers",
      privacyLabel: "Privacy Policy",
      imprintLabel: "Legal Notice",
      termsLabel: "Terms & Conditions",
    },
  },
};
