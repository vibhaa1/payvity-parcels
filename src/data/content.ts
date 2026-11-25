export type Lang = "de" | "en";
export type SolutionMode = "counter" | "locker";
export type InterestOption = "Paketshop" | "Amazon Locker" | "Beides";
export type SectionId =
  | "how-it-works"
  | "loesungen"
  | "warum-uns"
  | "so-funktionierts"
  | "faq";

export interface NavItem {
  id: SectionId;
  labelKey:
    | "nav_how_it_works"
    | "nav_solutions"
    | "nav_why"
    | "nav_process"
    | "nav_faq";
}

export interface HowItWorksStepItem {
  id: string;
  icon: "app" | "select" | "code" | "parcel" | "done";
  side: "left" | "right";
  startFrame: number;
  endFrame: number;
  representativeFrame: number;
  titleKey: "hiw_1_t" | "hiw_2_t" | "hiw_3_t" | "hiw_4_t" | "hiw_5_t";
  descKey: "hiw_1_p" | "hiw_2_p" | "hiw_3_p" | "hiw_4_p" | "hiw_5_p";
}

export interface StatItem {
  id: string;
  target: number;
  suffix: string;
  labelKey: "stat_1" | "stat_2" | "stat_3";
}

export interface SolutionLocaleCopy {
  heading: string;
  desc: string;
  bullets: string[];
  cta: string;
  switchLabel: string;
  alt: string;
}

export interface SolutionData {
  img: string;
  de: SolutionLocaleCopy;
  en: SolutionLocaleCopy;
}

export interface AdvantageCardItem {
  id: string;
  icon: "box" | "users" | "space" | "network";
  titleKey: "card_1_t" | "card_2_t" | "card_3_t" | "card_4_t";
  descKey: "card_1_p" | "card_2_p" | "card_3_p" | "card_4_p";
}

export interface ProcessStepItem {
  step: number;
  img: string;
  titleKey: "step_1_t" | "step_2_t" | "step_3_t";
  descKey: "step_1_p" | "step_2_p" | "step_3_p";
  alt: Record<Lang, string>;
}

export interface TrustRowItem {
  index: string;
  titleKey: "trust_1_t" | "trust_2_t" | "trust_3_t" | "trust_4_t";
  descKey: "trust_1_p" | "trust_2_p" | "trust_3_p" | "trust_4_p";
}

export interface FaqRowItem {
  id: string;
  qKey: "faq_1_q" | "faq_2_q" | "faq_3_q" | "faq_4_q" | "faq_5_q";
  aKey: "faq_1_a" | "faq_2_a" | "faq_3_a" | "faq_4_a" | "faq_5_a";
}

export const NAV_ITEMS: NavItem[] = [
  { id: "how-it-works", labelKey: "nav_how_it_works" },
  { id: "loesungen", labelKey: "nav_solutions" },
  { id: "warum-uns", labelKey: "nav_why" },
  { id: "so-funktionierts", labelKey: "nav_process" },
  { id: "faq", labelKey: "nav_faq" },
];

export const HOW_IT_WORKS_STEPS: HowItWorksStepItem[] = [
  {
    id: "app",
    icon: "app",
    side: "left",
    startFrame: 0,
    endFrame: 33,
    representativeFrame: 20,
    titleKey: "hiw_1_t",
    descKey: "hiw_1_p",
  },
  {
    id: "select",
    icon: "select",
    side: "right",
    startFrame: 34,
    endFrame: 60,
    representativeFrame: 45,
    titleKey: "hiw_2_t",
    descKey: "hiw_2_p",
  },
  {
    id: "code",
    icon: "code",
    side: "left",
    startFrame: 61,
    endFrame: 86,
    representativeFrame: 78,
    titleKey: "hiw_3_t",
    descKey: "hiw_3_p",
  },
  {
    id: "parcel",
    icon: "parcel",
    side: "right",
    startFrame: 87,
    endFrame: 127,
    representativeFrame: 118,
    titleKey: "hiw_4_t",
    descKey: "hiw_4_p",
  },
  {
    id: "done",
    icon: "done",
    side: "left",
    startFrame: 128,
    endFrame: 149,
    representativeFrame: 148,
    titleKey: "hiw_5_t",
    descKey: "hiw_5_p",
  },
];

export const STATS: StatItem[] = [
  { id: "packages", target: 5000, suffix: "+", labelKey: "stat_1" },
  { id: "partners", target: 350, suffix: "+", labelKey: "stat_2" },
  { id: "locations", target: 105, suffix: "+", labelKey: "stat_3" },
];

export const ADVANTAGES: AdvantageCardItem[] = [
  { id: "comp", icon: "box", titleKey: "card_1_t", descKey: "card_1_p" },
  { id: "traffic", icon: "users", titleKey: "card_2_t", descKey: "card_2_p" },
  { id: "space", icon: "space", titleKey: "card_3_t", descKey: "card_3_p" },
  { id: "network", icon: "network", titleKey: "card_4_t", descKey: "card_4_p" },
];

export const PROCESS_STEPS: ProcessStepItem[] = [
  {
    step: 1,
    img: "https://m.media-amazon.com/images/G/01/DSP2022/ULP-LP/01-find-sm.png",
    titleKey: "step_1_t",
    descKey: "step_1_p",
    alt: {
      de: "Schritt 1: Standort anfragen und prüfen",
      en: "Step 1: Apply and review location",
    },
  },
  {
    step: 2,
    img: "https://m.media-amazon.com/images/G/01/DSP2022/ULP-LP/02-choose-sm.png",
    titleKey: "step_2_t",
    descKey: "step_2_p",
    alt: {
      de: "Schritt 2: Unterlagen senden und Vertrag unterschreiben",
      en: "Step 2: Submit documents and sign agreement",
    },
  },
  {
    step: 3,
    img: "https://m.media-amazon.com/images/G/01/DSP2022/ULP-LP/03-pickup-sm.png",
    titleKey: "step_3_t",
    descKey: "step_3_p",
    alt: {
      de: "Schritt 3: Einrichtung und direkt durchstarten",
      en: "Step 3: Setup and go live",
    },
  },
];

export const TRUST_IMAGE =
  "https://m.media-amazon.com/images/G/01/DSP2022/ULP-LP/ULP-Image-Grid-New_compressed.png";

export const TRUST_ITEMS: TrustRowItem[] = [
  { index: "01", titleKey: "trust_1_t", descKey: "trust_1_p" },
  { index: "02", titleKey: "trust_2_t", descKey: "trust_2_p" },
  { index: "03", titleKey: "trust_3_t", descKey: "trust_3_p" },
  { index: "04", titleKey: "trust_4_t", descKey: "trust_4_p" },
];

export const FAQ_ITEMS: FaqRowItem[] = [
  { id: "faq-1", qKey: "faq_1_q", aKey: "faq_1_a" },
  { id: "faq-2", qKey: "faq_2_q", aKey: "faq_2_a" },
  { id: "faq-3", qKey: "faq_3_q", aKey: "faq_3_a" },
  { id: "faq-4", qKey: "faq_4_q", aKey: "faq_4_a" },
  { id: "faq-5", qKey: "faq_5_q", aKey: "faq_5_a" },
];

export const SOLUTIONS: Record<SolutionMode, SolutionData> = {
  counter: {
    img: "https://m.media-amazon.com/images/G/03/AmazonPickupLocations/ULP_Redesign/amazon-pickup-service.png",
    de: {
      heading: "Amazon Hub Counter (Paketshop)",
      desc: "Nutzen Sie Ihre bestehende Theke und etwas Lagerfläche für die schnelle, persönliche Paketabholung und -rückgabe. Ideal für Kioske, Einzelhandel, Cafés, Apotheken und lokale Geschäfte.",
      bullets: [
        "Direkter Kundenkontakt im Laden steigert Spontankäufe und Stammkundschaft.",
        "Einfache Scanner-App — Pakete sind in wenigen Sekunden übergeben.",
        "Komplettes Onboarding, Team-Schulung und persönlicher Support durch Payvity.",
      ],
      cta: "Als Paketshop bewerben",
      switchLabel: "Zu Amazon Locker wechseln →",
      alt: "Amazon Hub Counter Paketshop Abholservice",
    },
    en: {
      heading: "Amazon Hub Counter (Packetshop)",
      desc: "Use your existing counter and a small backroom area for fast, personal parcel pickups and returns. Ideal for retail stores, kiosks, cafés, pharmacies, and local shops.",
      bullets: [
        "Direct in-store customer interaction boosts impulse purchases and repeat visits.",
        "Simple handheld scanner app — hand over parcels in just seconds.",
        "End-to-end onboarding, team training, and dedicated support from Payvity.",
      ],
      cta: "Apply as Packetshop",
      switchLabel: "Switch to Amazon Locker →",
      alt: "Amazon Hub Counter Packetshop pickup service",
    },
  },
  locker: {
    img: "https://m.media-amazon.com/images/G/01/DSP2022/ULP-LP/ULP-Image-Grid-New_compressed.png",
    de: {
      heading: "Amazon Hub Locker",
      desc: "Verwandeln Sie ungenutzte Innen- oder Außenflächen in eine moderne, vollautomatische Amazon Paketstation. Kunden holen Sendungen kontaktlos per Code ab — komplett ohne Personalaufwand für Ihr Team.",
      bullets: [
        "100 % automatisierte Abholung und Rückgabe — auch außerhalb Ihrer Öffnungszeiten.",
        "Ideal für Supermärkte, Tankstellen, Einkaufszentren, Wohnanlagen und Gewerbeflächen.",
        "Payvity und Amazon übernehmen Planung, Lieferung, Installation und Wartung.",
      ],
      cta: "Standort für Locker anfragen",
      switchLabel: "Zu Paketshops wechseln →",
      alt: "Amazon Hub Locker Standorte im Einsatz",
    },
    en: {
      heading: "Amazon Hub Locker",
      desc: "Turn unused indoor or outdoor space into a modern, fully automated Amazon parcel kiosk. Customers collect packages contactlessly with a pickup code — with zero staff effort required.",
      bullets: [
        "100% automated pickup and returns — even outside regular store hours.",
        "Ideal for supermarkets, gas stations, shopping centers, residential hubs, and retail parks.",
        "Payvity and Amazon manage site planning, delivery, installation, and maintenance.",
      ],
      cta: "Request Locker for my site",
      switchLabel: "Switch to Packetshops →",
      alt: "Amazon Hub Locker installations",
    },
  },
};

export const I18N = {
  de: {
    nav_how_it_works: "So funktioniert's",
    nav_solutions: "Locker & Paketshops",
    nav_why: "Warum uns",
    nav_process: "Ablauf",
    nav_faq: "FAQ",
    nav_cta: "Partner werden",

    hiw_title: "So funktioniert's",
    hiw_lead:
      "Vom Öffnen der App bis zur Paketübergabe — jede Abholung dauert nur wenige Sekunden.",
    hiw_scroll_hint: "Scrollen Sie weiter, um jeden Schritt live zu erleben",
    hiw_1_t: "Amazon Hub App öffnen",
    hiw_1_p:
      "Starten Sie die Amazon Hub Counter App auf Ihrem Smartphone oder Scanner.",
    hiw_2_t: "„Abholung durch den Kunden“ wählen",
    hiw_2_p:
      "Tippen Sie im Hauptmenü auf Kundenabholung, um die Übergabe zu starten.",
    hiw_3_t: "Kunden-Abholcode scannen",
    hiw_3_p:
      "Scannen Sie den Barcode auf dem Smartphone des Kunden zur Verifizierung.",
    hiw_4_t: "Paket scannen",
    hiw_4_p:
      "Scannen Sie das Versandetikett auf dem Paket zur eindeutigen Zuordnung.",
    hiw_5_t: "Glückwunsch! Abholung abgeschlossen.",
    hiw_5_p:
      "Übergeben Sie das Paket — die Abholung wird automatisch in Sekunden verbucht.",

    hero_title: "Ihr Standort für Amazon Locker & Paketshops.",
    hero_sub:
      "Mehr Laufkundschaft und planbare Zusatzeinnahmen für Ihr Geschäft — ob mit persönlicher Paketausgabe am Counter oder vollautomatischem Amazon Locker. Wir übernehmen Einrichtung, Schulung und Betrieb.",
    hero_cta_primary: "Jetzt Partner werden",
    hero_cta_secondary: "Locker & Paketshops vergleichen",
    stat_1: "Pakete abgeholt",
    stat_2: "Aktive Partner",
    stat_3: "Standorte deutschlandweit",

    sol_title: "Payvity bietet jetzt Locker & Paketshops.",
    sol_lead:
      "Wählen Sie das Abholmodell, das optimal zu Ihrer Fläche und Ihrem Geschäft passt — oder kombinieren Sie beide Lösungen für maximale Kundenfrequenz.",
    toggle_counter: "Paketshops (Counter)",
    toggle_locker: "Amazon Locker",

    why_title: "Ihr Geschäft, unser Netzwerk.",
    why_lead:
      "Payvity verbindet lokale Geschäfte und Immobilienstandorte mit Millionen Amazon-Kunden in der Umgebung. Sie stellen die Fläche, wir übernehmen den Rest — von der Einrichtung bis zum laufenden Betrieb.",
    card_1_t: "Attraktive Vergütung",
    card_1_p:
      "Feste Provision pro abgeholtem Paket im Paketshop oder planbare Standortkonditionen für Amazon Locker — ohne versteckte Kosten.",
    card_2_t: "Mehr Laufkundschaft",
    card_2_p:
      "Amazon-Kunden kommen regelmäßig an Ihren Standort — ein großer Teil nutzt den Besuch für zusätzliche Einkäufe vor Ort.",
    card_3_t: "Freie Fläche nutzen",
    card_3_p:
      "Ob wenige Quadratmeter hinter der Theke oder ein ungenutzter Innen- bzw. Außenbereich für einen Locker — Ihre Fläche arbeitet für Sie.",
    card_4_t: "Starkes Netzwerk",
    card_4_p:
      "Als zertifizierter Amazon Hub Partner erscheinen Sie direkt im Amazon-Checkout und wachsen mit einem bundesweiten Netzwerk.",

    proc_title: "In 3 Schritten zum Amazon Hub Partner.",
    proc_lead:
      "Schnell, transparent und persönlich begleitet — vom ersten Standortcheck bis zur ersten Paketabholung vergehen oft nur wenige Tage.",
    step_1_t: "Standort anfragen & prüfen",
    step_1_p:
      "Bewerben Sie sich mit Ihrem Standort und wählen Sie Paketshop oder Locker. Wir prüfen die Eignung innerhalb weniger Tage.",
    step_2_t: "Unterlagen & Vertrag",
    step_2_p:
      "Nach der Standortfreigabe reichen Sie die Unterlagen ein und unterschreiben den Partnerschaftsvertrag digital und unkompliziert.",
    step_3_t: "Einrichtung & Start",
    step_3_p:
      "Wir übernehmen Installation oder Schulung Ihres Teams. Ihr Standort geht live im Amazon-Checkout und Sie profitieren ab Tag eins.",

    trust_title: "Warum Partner uns vertrauen.",
    trust_lead:
      "Zusätzliches Einkommen und mehr Laufkundschaft, mit einem erfahrenen Partner, der den technischen und organisatorischen Aufwand komplett übernimmt.",
    trust_alt: "Amazon Hub Locker und Paketshop Standorte im Einsatz",
    trust_1_t: "Offizieller Amazon Partner",
    trust_1_p:
      "Zertifizierter Amazon Hub Partner für Paketshops und Locker — direkt sichtbar für Millionen Amazon-Kunden beim Checkout.",
    trust_2_t: "Schneller, reibungsloser Ablauf",
    trust_2_p: "Vom Erstgespräch bis zur Einrichtung und Freischaltung vergehen oft nur wenige Tage.",
    trust_3_t: "Transparente Konditionen",
    trust_3_p:
      "Feste, faire Vergütung pro Paket oder klare Standortvereinbarungen für Locker — ganz ohne versteckte Gebühren.",
    trust_4_t: "Mehr Frequenz im Laden & Umfeld",
    trust_4_p:
      "Auch abends und am Wochenende sorgen Abholungen für wiederkehrende Besucher und zusätzlichen Umsatz.",

    faq_title: "Häufig gestellte Fragen",
    faq_lead: "Alles Wichtige rund um Amazon Hub Counter (Paketshops) und Amazon Hub Locker auf einen Blick.",
    faq_help_t: "Noch unsicher, ob Locker oder Paketshop?",
    faq_help_p:
      "Wir beraten Sie kostenlos und prüfen gemeinsam, welche Lösung das größte Potenzial für Ihren Standort bietet.",
    faq_help_cta: "Unverbindlich anfragen",
    faq_1_q: "Was ist der Unterschied zwischen Paketshop (Counter) und Amazon Locker?",
    faq_1_a:
      "Im Paketshop (Amazon Hub Counter) übergeben Ihre Mitarbeiter Pakete persönlich an der Theke. Ein Amazon Locker ist eine vollautomatische Selbstbedienungs-Paketstation, an der Kunden ihre Sendungen kontaktlos per Abholcode entgegennehmen — ohne Personalaufwand.",
    faq_2_q: "Wie werde ich Partner für einen Paketshop oder Locker?",
    faq_2_a:
      "Senden Sie uns Ihre E-Mail-Adresse und Ihr gewünschtes Modell über das Kontaktformular. Wir prüfen die Standortdaten und melden uns zeitnah mit den nächsten Schritten.",
    faq_3_q: "Was verdiene ich als Payvity Partner?",
    faq_3_a:
      "Als Paketshop erhalten Sie eine feste Vergütung pro abgeholtem Paket. Für Amazon Locker vereinbaren wir attraktive Standortkonditionen. Die genauen Details besprechen wir transparent im persönlichen Gespräch.",
    faq_4_q: "Welche Voraussetzungen gelten für meinen Standort?",
    faq_4_a:
      "Für Paketshops benötigen Sie ein bestehendes Geschäft mit guter Erreichbarkeit, regelmäßigen Öffnungszeiten und etwas Lagerfläche. Für Amazon Locker genügt eine gut zugängliche Innen- oder Außenfläche mit Stromanschluss.",
    faq_5_q: "Welche Unterstützung erhalte ich von Payvity?",
    faq_5_a:
      "Wir übernehmen die komplette Koordination, technische Einrichtung bzw. Locker-Installation, Schulung Ihres Teams sowie den laufenden persönlichen Support während der gesamten Partnerschaft.",

    cta_title: "Bereit, Amazon Hub Partner zu werden?",
    cta_lead:
      "Wählen Sie Ihr Wunschmodell und tragen Sie Ihre E-Mail ein — unser Team meldet sich kurzfristig mit einer kostenlosen Standortprüfung.",
    cta_interest_label: "Wofür interessieren Sie sich?",
    int_counter: "Paketshop (Counter)",
    int_locker: "Amazon Locker",
    int_both: "Beides",
    cta_placeholder: "ihre@email.de",
    cta_submit: "Anfrage senden",
    cta_thanks: "Danke! Wir melden uns in Kürze zu Ihrer Anfrage.",

    footer_copy: "© 2026 Payvity Parcels — Offizieller Amazon Hub Locker & Counter Partner in Frankfurt.",
    foot_contact: "Kontakt",
    foot_privacy: "Datenschutz",
    foot_imprint: "Impressum",
  },
  en: {
    nav_how_it_works: "How it works",
    nav_solutions: "Lockers & Packetshops",
    nav_why: "Why us",
    nav_process: "Onboarding",
    nav_faq: "FAQ",
    nav_cta: "Become a partner",

    hiw_title: "How it works",
    hiw_lead:
      "From opening the app to handing over the parcel — every pickup takes just seconds.",
    hiw_scroll_hint: "Scroll to scrub through each step",
    hiw_1_t: "Open Amazon Hub app",
    hiw_1_p:
      "Launch the Amazon Hub Counter app on your store smartphone or scanner.",
    hiw_2_t: 'Select "Abholung durch den Kunden"',
    hiw_2_p: "Tap customer pickup from the main menu to start the handover.",
    hiw_3_t: "Scan customer pickup code",
    hiw_3_p:
      "Scan the barcode shown on the customer's phone to verify the order.",
    hiw_4_t: "Scan packet",
    hiw_4_p:
      "Scan the shipping label on the parcel to confirm the matching package.",
    hiw_5_t: "Congratulations, you've completed the pickup.",
    hiw_5_p:
      "Hand over the parcel — the pickup is logged automatically in seconds.",

    hero_title: "Your location for Amazon Lockers & Packetshops.",
    hero_sub:
      "Drive more foot traffic and predictable revenue to your business — whether via in-store Hub Counter pickups or fully automated Amazon Lockers. We handle setup, training, and operations.",
    hero_cta_primary: "Become a partner",
    hero_cta_secondary: "Compare Lockers & Packetshops",
    stat_1: "Packages collected",
    stat_2: "Active partners",
    stat_3: "Locations across Germany",

    sol_title: "Payvity now offers Lockers & Packetshops.",
    sol_lead:
      "Choose the pickup format that best fits your space and business model — or combine both to maximize daily visitor traffic.",
    toggle_counter: "Packetshops (Counter)",
    toggle_locker: "Amazon Lockers",

    why_title: "Your business, our network.",
    why_lead:
      "Payvity connects local shops and property locations with millions of nearby Amazon customers. You provide the space, we handle everything else — from onboarding to ongoing operations.",
    card_1_t: "Attractive Compensation",
    card_1_p:
      "Fixed commission per collected package at your Packetshop or predictable site terms for Amazon Lockers — with zero hidden fees.",
    card_2_t: "More Foot Traffic",
    card_2_p:
      "Amazon shoppers visit your location regularly — and a large share make additional in-store purchases while picking up.",
    card_3_t: "Monetize Spare Space",
    card_3_p:
      "Whether a few square meters behind the counter or an unused indoor or outdoor spot for a Locker — turn space into revenue.",
    card_4_t: "Trusted Network",
    card_4_p:
      "As a certified Amazon Hub Partner, your location appears directly at Amazon checkout as part of a nationwide network.",

    proc_title: "Become an Amazon Hub Partner in 3 steps.",
    proc_lead:
      "Fast, transparent, and personally supported — from initial site check to your first parcel pickup often takes only a few days.",
    step_1_t: "Apply & Site Review",
    step_1_p:
      "Submit your location and choose Packetshop or Locker. We review suitability within just a few days.",
    step_2_t: "Documents & Contract",
    step_2_p:
      "Once approved, submit your documents and sign the partnership agreement quickly and digitally.",
    step_3_t: "Setup & Go Live",
    step_3_p:
      "We handle Locker installation or staff training. Your location goes live at Amazon checkout and you earn from day one.",

    trust_title: "Why partners trust us.",
    trust_lead:
      "Additional income and higher foot traffic with an experienced partner managing all technical and operational work.",
    trust_alt: "Amazon Hub Locker and Packetshop locations in action",
    trust_1_t: "Official Amazon Partner",
    trust_1_p:
      "Certified Amazon Hub Partner for Packetshops and Lockers — directly visible to millions of Amazon shoppers at checkout.",
    trust_2_t: "Fast, Smooth Onboarding",
    trust_2_p: "From first contact to installation and launch often takes only a few days.",
    trust_3_t: "Transparent Terms",
    trust_3_p:
      "Fixed, fair compensation per package or clear site terms for Lockers — with no hidden fees.",
    trust_4_t: "More Visitors Every Day",
    trust_4_p:
      "Evenings and weekends included, parcel pickups bring steady repeat visitors and incremental sales.",

    faq_title: "Frequently asked questions",
    faq_lead:
      "Everything you need to know about Amazon Hub Counter (Packetshops) and Amazon Hub Lockers at a glance.",
    faq_help_t: "Not sure whether Locker or Packetshop fits best?",
    faq_help_p:
      "We advise you free of charge and evaluate which option unlocks the highest potential for your location.",
    faq_help_cta: "Request free check",
    faq_1_q: "What is the difference between a Packetshop (Counter) and an Amazon Locker?",
    faq_1_a:
      "In a Packetshop (Amazon Hub Counter), your staff hands over parcels personally at the counter. An Amazon Locker is a fully automated self-service kiosk where customers pick up parcels contactlessly with a code — requiring zero staff time.",
    faq_2_q: "How do I become a Packetshop or Locker partner?",
    faq_2_a:
      "Enter your email and preferred option in the contact form. We review your location details and get back to you promptly with the next steps.",
    faq_3_q: "How much do I earn as a Payvity partner?",
    faq_3_a:
      "Packetshops earn fixed compensation per collected parcel. For Amazon Lockers we offer attractive site terms. We walk through exact conditions transparently in a personal call.",
    faq_4_q: "What are the location requirements?",
    faq_4_a:
      "Packetshops need an existing business with good accessibility, regular opening hours, and a small storage area. Amazon Lockers require an accessible indoor or outdoor space with power supply.",
    faq_5_q: "What support does Payvity provide?",
    faq_5_a:
      "We manage full coordination, technical setup or Locker installation, staff training, and dedicated ongoing personal support throughout the partnership.",

    cta_title: "Ready to become an Amazon Hub Partner?",
    cta_lead:
      "Choose your preferred option and enter your email — our team will reach out shortly with a free location check.",
    cta_interest_label: "What are you interested in?",
    int_counter: "Packetshop (Counter)",
    int_locker: "Amazon Locker",
    int_both: "Both",
    cta_placeholder: "your@email.com",
    cta_submit: "Send inquiry",
    cta_thanks: "Thank you! We will get in touch shortly regarding your inquiry.",

    footer_copy: "© 2026 Payvity Parcels — Official Amazon Hub Locker & Counter Partner in Frankfurt.",
    foot_contact: "Contact",
    foot_privacy: "Privacy",
    foot_imprint: "Legal notice",
  },
} as const;
