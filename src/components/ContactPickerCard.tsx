"use client";

import { useState } from "react";
import {
  CONTACT_EMAIL,
  CONTACT_HANDLES,
  CONTACT_LINKS,
  type Lang,
} from "@/lib/seo";

type ChannelKey = "whatsapp" | "email" | "instagram" | "tiktok";

interface ChannelCopy {
  name: string;
  hint: string;
  ariaLabel: string;
}

interface PickerLocaleCopy {
  heading: string;
  subtitle: string;
  channels: Record<ChannelKey, ChannelCopy>;
}

const PICKER_COPY: Record<Lang, PickerLocaleCopy> = {
  de: {
    heading: "Kontakt aufnehmen",
    subtitle:
      "Haben Sie eine Frage oder möchten Sie Ihren Standort besprechen? Wählen Sie Ihren bevorzugten Kontaktweg.",
    channels: {
      whatsapp: {
        name: "WhatsApp",
        hint: "Per WhatsApp schreiben",
        ariaLabel: "PAYVITY Parcels per WhatsApp kontaktieren",
      },
      email: {
        name: "E-Mail",
        hint: CONTACT_EMAIL,
        ariaLabel: `E-Mail an ${CONTACT_EMAIL} senden`,
      },
      instagram: {
        name: "Instagram",
        hint: CONTACT_HANDLES.instagram,
        ariaLabel: "PAYVITY Parcels auf Instagram",
      },
      tiktok: {
        name: "TikTok",
        hint: CONTACT_HANDLES.tiktok,
        ariaLabel: "PAYVITY Parcels auf TikTok",
      },
    },
  },
  en: {
    heading: "Get in touch",
    subtitle:
      "Have a question or want to discuss your location? Choose your preferred way to reach us.",
    channels: {
      whatsapp: {
        name: "WhatsApp",
        hint: "Message us on WhatsApp",
        ariaLabel: "Contact PAYVITY Parcels on WhatsApp",
      },
      email: {
        name: "Email",
        hint: CONTACT_EMAIL,
        ariaLabel: `Send email to ${CONTACT_EMAIL}`,
      },
      instagram: {
        name: "Instagram",
        hint: CONTACT_HANDLES.instagram,
        ariaLabel: "PAYVITY Parcels on Instagram",
      },
      tiktok: {
        name: "TikTok",
        hint: CONTACT_HANDLES.tiktok,
        ariaLabel: "PAYVITY Parcels on TikTok",
      },
    },
  },
};

function ChannelIcon({ channel }: { channel: ChannelKey }) {
  switch (channel) {
    case "whatsapp":
      return (
        <svg
          viewBox="0 0 24 24"
          width="30"
          height="30"
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91C21.95 6.45 17.5 2 12.04 2zm5.79 14.01c-.24.68-1.41 1.3-1.95 1.38-.52.08-1.18.11-1.9-.12-.44-.14-1-.33-1.72-.64-3.03-1.31-5.01-4.35-5.16-4.55-.15-.2-1.23-1.64-1.23-3.13 0-1.49.78-2.22 1.06-2.52.28-.3.6-.38.8-.38.2 0 .4 0 .58.01.19.01.44-.07.69.53.25.6.86 2.1.94 2.25.08.15.13.33.03.53-.1.2-.15.33-.3.5-.15.18-.32.4-.45.53-.15.15-.31.31-.13.61.18.3.78 1.29 1.68 2.09 1.15 1.03 2.13 1.35 2.43 1.5.3.15.48.13.66-.08.18-.2.75-.88.95-1.18.2-.3.4-.25.68-.15.28.1 1.76.83 2.06.98.3.15.5.23.58.35.07.13.07.73-.17 1.41z" />
        </svg>
      );
    case "email":
      return (
        <svg
          viewBox="0 0 24 24"
          width="30"
          height="30"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <rect x="3" y="5" width="18" height="14" rx="2" />
          <path d="m3 7 9 6 9-6" />
        </svg>
      );
    case "instagram":
      return (
        <svg
          viewBox="0 0 32 32"
          width="30"
          height="30"
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M11.46875,5c-3.55078,0 -6.46875,2.91406 -6.46875,6.46875v9.0625c0,3.55078 2.91406,6.46875 6.46875,6.46875h9.0625c3.55078,0 6.46875,-2.91406 6.46875,-6.46875v-9.0625c0,-3.55078 -2.91406,-6.46875 -6.46875,-6.46875zM11.46875,7h9.0625c2.47266,0 4.46875,1.99609 4.46875,4.46875v9.0625c0,2.47266 -1.99609,4.46875 -4.46875,4.46875h-9.0625c-2.47266,0 -4.46875,-1.99609 -4.46875,-4.46875v-9.0625c0,-2.47266 1.99609,-4.46875 4.46875,-4.46875zM21.90625,9.1875c-0.50391,0 -0.90625,0.40234 -0.90625,0.90625c0,0.50391 0.40234,0.90625 0.90625,0.90625c0.50391,0 0.90625,-0.40234 0.90625,-0.90625c0,-0.50391 -0.40234,-0.90625 -0.90625,-0.90625zM16,10c-3.30078,0 -6,2.69922 -6,6c0,3.30078 2.69922,6 6,6c3.30078,0 6,-2.69922 6,-6c0,-3.30078 -2.69922,-6 -6,-6zM16,12c2.22266,0 4,1.77734 4,4c0,2.22266 -1.77734,4 -4,4c-2.22266,0 -4,-1.77734 -4,-4c0,-2.22266 1.77734,-4 4,-4z" />
        </svg>
      );
    case "tiktok":
      return (
        <svg
          viewBox="0 0 24 24"
          width="30"
          height="30"
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1Z" />
        </svg>
      );
  }
}

/** 4-quadrant contact channel picker placed alongside the onboarding wizard. */
export function ContactPickerCard({ lang }: { lang: Lang }) {
  const [activeChannel, setActiveChannel] = useState<ChannelKey | null>(null);
  const copy = PICKER_COPY[lang];
  const activeCopy = activeChannel ? copy.channels[activeChannel] : null;

  const renderTile = (channel: ChannelKey) => {
    const isExternal = channel !== "email";
    const meta = copy.channels[channel];
    return (
      <a
        key={channel}
        className={`contact-picker-tile contact-picker-tile--${channel}`}
        href={CONTACT_LINKS[channel]}
        target={isExternal ? "_blank" : undefined}
        rel={isExternal ? "noopener noreferrer" : undefined}
        aria-label={meta.ariaLabel}
        onMouseEnter={() => setActiveChannel(channel)}
        onMouseLeave={() =>
          setActiveChannel((prev) => (prev === channel ? null : prev))
        }
        onFocus={() => setActiveChannel(channel)}
        onBlur={() =>
          setActiveChannel((prev) => (prev === channel ? null : prev))
        }
      >
        <ChannelIcon channel={channel} />
      </a>
    );
  };

  return (
    <div className="contact-picker-wrap">
      <div className="contact-picker-card">
        <div className="contact-picker-head">
          <h2>{copy.heading}</h2>
          <p>{copy.subtitle}</p>
        </div>

        <div
          className="contact-picker-wheel"
          role="group"
          aria-label={copy.heading}
        >
          {renderTile("whatsapp")}
          {renderTile("email")}
          {renderTile("instagram")}
          {renderTile("tiktok")}
        </div>

        <div className="contact-picker-caption" aria-live="polite">
          {activeCopy && (
            <>
              <strong>{activeCopy.name}</strong>
              <span>{activeCopy.hint}</span>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
