import type { Lang } from "@/lib/seo";
import type { FaqItem, ProcessStepItem } from "./content";

export interface LockerLocaleContent {
  meta: {
    title: string;
    description: string;
    ogAlt: string;
  };
  breadcrumbHome: string;
  breadcrumbCurrent: string;
  hero: {
    title: string;
    subtitle: string;
    ctaPrimary: string;
    ctaPaketshop: string;
  };
  overview: {
    title: string;
    bullets: string[];
    imageSrc: string;
    imageWidth: number;
    imageHeight: number;
    imageAlt: string;
    siteTypesTitle: string;
    siteTypes: string[];
  };
  requirements: {
    title: string;
    items: Array<{ title: string; desc: string }>;
  };
  process: {
    title: string;
    steps: ProcessStepItem[];
  };
  paketshopCrossLink: {
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
}

export const LOCKER_CONTENT: Record<Lang, LockerLocaleContent> = {
  de: {
    meta: {
      title: "Amazon Locker Standortpartner werden | PAYVITY Parcels",
      description:
        "Ungenutzte Innen- oder Außenfläche für einen Amazon Hub Locker anbieten. Selbstbedienungs-Paketstation mit geringem Personalaufwand – jetzt Standort prüfen lassen.",
      ogAlt: "Amazon Hub Locker Standortpartner werden in Deutschland — PAYVITY Parcels",
    },
    breadcrumbHome: "Startseite (Paketshop)",
    breadcrumbCurrent: "Amazon Locker",
    hero: {
      title: "Amazon Locker Standortpartner werden – freie Fläche sinnvoll nutzen.",
      subtitle:
        "PAYVITY unterstützt Supermärkte, Tankstellen, Einkaufszentren und Immobilieneigentümer bei Amazon Hub Lockern – als komfortable Selbstbedienungs-Paketstation mit geringem Personalaufwand.",
      ctaPrimary: "Locker-Standort prüfen lassen",
      ctaPaketshop: "Lieber Amazon Paketshop (Theke)? →",
    },
    overview: {
      title: "Selbstbedienungs-Paketstationen für stark frequentierte Orte.",
      bullets: [
        "Selbstbedienungs-Paketstation mit geringem Personalaufwand im täglichen Ablauf.",
        "Geeignet für gut zugängliche Innenbereiche oder witterungsfeste Außenflächen.",
        "Planung, Koordination der Aufstellung und laufender Support durch PAYVITY und Amazon.",
      ],
      imageSrc:
        "https://m.media-amazon.com/images/G/01/DSP2022/ULP-LP/ULP-Image-Grid-New_compressed.png",
      imageWidth: 960,
      imageHeight: 720,
      imageAlt: "Amazon Hub Locker Selbstbedienungs-Paketstation am Standort",
      siteTypesTitle: "Geeignete Standorte für Amazon Hub Locker",
      siteTypes: [
        "Supermärkte & Discounter",
        "Tankstellen & Waschanlagen",
        "Einkaufszentren & Fachmärkte",
        "Wohnanlagen & Quartierszentren",
        "Bahnhofsnahe Gewerbeflächen",
        "Büro- & Gewerbeparks",
      ],
    },
    requirements: {
      title: "Wichtige Standort-Voraussetzungen für einen Locker",
      items: [
        {
          title: "Gut erreichbare Fläche",
          desc: "Eine ebenerdige, für Paketabholer und Lieferfahrzeuge gut zugängliche Stellfläche im Innen- oder Außenbereich.",
        },
        {
          title: "Stromanschluss & Sicherheit",
          desc: "Regulärer Stromanschluss in Reichweite sowie ein beleuchteter, gut einsehbarer Standort für Abholungen auch abends.",
        },
        {
          title: "Stabile Zugänglichkeit",
          desc: "Lange oder rund um die Uhr nutzbare Zugangszeiten erhöhen die Attraktivität Ihres Standorts im Amazon-Checkout.",
        },
      ],
    },
    process: {
      title: "In 3 Schritten zum Amazon Locker Standort",
      steps: [
        {
          step: 1,
          img: "https://m.media-amazon.com/images/G/01/DSP2022/ULP-LP/01-find-sm.png",
          width: 480,
          height: 320,
          title: "1. Fläche unverbindlich anfragen",
          desc: "Teilen Sie uns Adresse, Geschäftsname und Telefonnummer mit. Wir prüfen Bedarf und technische Eignung der Stellfläche.",
          alt: "Schritt 1: Standortprüfung für Amazon Locker anfragen",
        },
        {
          step: 2,
          img: "https://m.media-amazon.com/images/G/01/DSP2022/ULP-LP/02-choose-sm.png",
          width: 480,
          height: 320,
          title: "2. Standortbegehung & Vertrag",
          desc: "Bei positiver Vorprüfung werden Maße, Stromanschluss und Zugang abgestimmt und die Standortvereinbarung abgeschlossen.",
          alt: "Schritt 2: Abstimmung der Locker-Fläche und Standortvertrag",
        },
        {
          step: 3,
          img: "https://m.media-amazon.com/images/G/01/DSP2022/ULP-LP/03-pickup-sm.png",
          width: 480,
          height: 320,
          title: "3. Lieferung, Aufbau & Freischaltung",
          desc: "Installation und technische Anbindung werden organisiert – danach erscheint Ihr Locker direkt im Amazon-Checkout.",
          alt: "Schritt 3: Aufbau und Inbetriebnahme des Amazon Lockers",
        },
      ],
    },
    paketshopCrossLink: {
      title: "Sie betreiben ein Ladengeschäft mit Theke?",
      desc: "Für Kioske, Einzelhändler, Bäckereien oder kleinere Läden ohne große Stellfläche ist der betreute Amazon Paketshop (Hub Counter) meist die passendere Lösung.",
      ctaLabel: "Zum Amazon Paketshop (Counter) →",
    },
    faq: {
      title: "Häufig gestellte Fragen",
      lead: "Alle wichtigen Informationen zur Aufstellung eines Amazon Hub Lockers als Standortpartner.",
      helpTitle: "Locker oder Paketshop?",
      helpDesc:
        "Wir beraten Sie ehrlich, welche Lösung zu Ihrer Fläche und Ihrem Betrieb am besten passt.",
      helpCta: "Standort prüfen lassen",
      items: [
        {
          id: "locker-faq-1",
          question: "Wie viel Platz benötigt ein Amazon Hub Locker?",
          answer:
            "Je nach Modulgröße variiert der Flächenbedarf. Bereits wenige Meter Wandbreite in einem gut zugänglichen Eingangsbereich oder auf dem Parkplatz können ausreichen. Die passenden Maße stimmen wir bei der Standortprüfung konkret mit Ihnen ab.",
        },
        {
          id: "locker-faq-2",
          question: "Wie hoch ist der Personalaufwand bei einem Amazon Locker?",
          answer:
            "Da Kunden Sendungen per Abholcode selbstständig aus dem Fach entnehmen, handelt es sich um eine Selbstbedienungs-Paketstation mit geringem Personalaufwand für Ihr Team.",
        },
        {
          id: "locker-faq-3",
          question: "Kann ein Amazon Locker auch im Außenbereich aufgestellt werden?",
          answer:
            "Ja, es gibt wetterfeste Außen-Locker sowie kompakte Modelle für Innenbereiche wie Einkaufspassagen oder Supermarkteingänge – vorausgesetzt Stromversorgung und Erreichbarkeit sind gegeben.",
        },
        {
          id: "locker-faq-4",
          question: "Was ist der Unterschied zum Amazon Paketshop (Counter)?",
          answer:
            "Beim Amazon Paketshop werden Pakete direkt durch Ihre Mitarbeitenden an der Kasse bzw. Theke mit der Amazon Hub App übergeben. Beim Locker bedienen sich Kunden selbst am Terminal.",
        },
        {
          id: "locker-faq-5",
          question: "Wie starte ich eine unverbindliche Standortprüfung?",
          answer:
            "Tragen Sie Ihre Kontaktdaten im Anfrageformular weiter unten ein (Auswahl „Amazon Locker“ oder „Beides“). Unser Team ruft Sie zurück und prüft Ihre Adresse.",
        },
      ],
    },
  },
  en: {
    meta: {
      title: "Become an Amazon Locker Host in Germany | PAYVITY Parcels",
      description:
        "Put spare indoor or outdoor commercial space to work with an Amazon Hub Locker in Germany. Self-service parcel kiosk with minimal staff involvement.",
      ogAlt: "Become an Amazon Locker Location Partner in Germany — PAYVITY Parcels",
    },
    breadcrumbHome: "Home (Parcel Shop)",
    breadcrumbCurrent: "Amazon Lockers",
    hero: {
      title: "Become an Amazon Locker host – monetize spare space.",
      subtitle:
        "PAYVITY helps supermarkets, petrol stations, shopping centers and property owners host Amazon Hub Lockers, offering a convenient self-service parcel solution with minimal staff involvement.",
      ctaPrimary: "Request Locker site check",
      ctaPaketshop: "Prefer a staffed Parcel Shop? →",
    },
    overview: {
      title: "Self-service parcel kiosks for high-footfall locations.",
      bullets: [
        "Self-service parcel kiosk with minimal day-to-day staff involvement.",
        "Available for accessible indoor entrances and weather-resistant outdoor spots.",
        "Site coordination, installation scheduling, and partner support via PAYVITY and Amazon.",
      ],
      imageSrc:
        "https://m.media-amazon.com/images/G/01/DSP2022/ULP-LP/ULP-Image-Grid-New_compressed.png",
      imageWidth: 960,
      imageHeight: 720,
      imageAlt: "Amazon Hub Locker self-service parcel station in retail setting",
      siteTypesTitle: "Suitable property types for Amazon Hub Lockers",
      siteTypes: [
        "Supermarkets & Discounters",
        "Petrol Stations",
        "Shopping Centers & Retail Parks",
        "Residential Complexes",
        "Transit-adjacent Properties",
        "Office & Business Parks",
      ],
    },
    requirements: {
      title: "Key site requirements for an Amazon Locker",
      items: [
        {
          title: "Accessible ground-level spot",
          desc: "An indoor or outdoor space easily reached on foot by customers and by Amazon delivery vans.",
        },
        {
          title: "Power supply & lighting",
          desc: "A standard electrical connection nearby plus good visibility and lighting for evening pickups.",
        },
        {
          title: "Extended opening hours",
          desc: "Longer daily access — or 24/7 outdoor availability — increases attractiveness at Amazon checkout.",
        },
      ],
    },
    process: {
      title: "3 steps to hosting an Amazon Locker",
      steps: [
        {
          step: 1,
          img: "https://m.media-amazon.com/images/G/01/DSP2022/ULP-LP/01-find-sm.png",
          width: 480,
          height: 320,
          title: "1. Submit your site",
          desc: "Share your business name, postal code, city, and phone number. We check demand and technical fit.",
          alt: "Step 1: Request an Amazon Locker location review",
        },
        {
          step: 2,
          img: "https://m.media-amazon.com/images/G/01/DSP2022/ULP-LP/02-choose-sm.png",
          width: 480,
          height: 320,
          title: "2. Technical check & agreement",
          desc: "Once pre-approved, dimensions, power access, and placement are aligned and formalized.",
          alt: "Step 2: Locker site survey and agreement",
        },
        {
          step: 3,
          img: "https://m.media-amazon.com/images/G/01/DSP2022/ULP-LP/03-pickup-sm.png",
          width: 480,
          height: 320,
          title: "3. Delivery, setup & launch",
          desc: "Installation and activation are arranged — your Locker then appears directly in Amazon checkout.",
          alt: "Step 3: Locker installation and go-live",
        },
      ],
    },
    paketshopCrossLink: {
      title: "Do you operate a shop with a staffed counter?",
      desc: "For kiosks, local retail stores, bakeries, or shops without spare locker footprint, an Amazon Hub Counter (Paketshop) is typically the better option.",
      ctaLabel: "Go to Amazon Parcel Shop →",
    },
    faq: {
      title: "Frequently asked questions",
      lead: "Common questions from German commercial property owners and retailers.",
      helpTitle: "Locker or Parcel Shop?",
      helpDesc:
        "Our team advises you free of charge on which format fits your location best.",
      helpCta: "Check my site",
      items: [
        {
          id: "locker-faq-1",
          question: "How much space does an Amazon Hub Locker need?",
          answer:
            "Footprint depends on the modular locker size. Even a few meters of wall width along an entrance or parking area can work. Exact dimensions are reviewed during site evaluation.",
        },
        {
          id: "locker-faq-2",
          question: "How much staff time does an Amazon Locker require?",
          answer:
            "Because customers scan their pickup code and retrieve packages directly from the compartment, Lockers are self-service kiosks requiring minimal staff involvement.",
        },
        {
          id: "locker-faq-3",
          question: "Can an Amazon Locker be installed outdoors?",
          answer:
            "Yes, weatherproof outdoor models as well as compact indoor units are available depending on power access and local site suitability.",
        },
        {
          id: "locker-faq-4",
          question: "How does a Locker differ from an Amazon Parcel Shop (Counter)?",
          answer:
            "In a Parcel Shop, your staff hands parcels over personally using the Amazon Hub App at the counter. With a Locker, shoppers collect packages independently at the terminal.",
        },
        {
          id: "locker-faq-5",
          question: "How do I request a location review?",
          answer:
            "Complete the inquiry form below with your business name, postal code, city, and phone number. Select Amazon Locker or Both and our team will call you.",
        },
      ],
    },
  },
};
