import type { VerticalIconKey, VerticalMarqueeItem } from "@/data/content";

interface VerticalMarqueeProps {
  items: VerticalMarqueeItem[];
  ariaLabel: string;
}

function VerticalIcon({ type }: { type: VerticalIconKey }) {
  const svgProps = {
    width: 26,
    height: 26,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.6,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };

  switch (type) {
    case "kiosk":
      return (
        <svg {...svgProps}>
          <path d="M3 9.5L5 4.5h14l2 5" />
          <path d="M3 9.5A3 2.5 0 0 0 9 9.5A3 2.5 0 0 0 15 9.5A3 2.5 0 0 0 21 9.5" />
          <path d="M5 11.8V18.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-6.7" />
          <path d="M10 19.5V15a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4.5" />
        </svg>
      );
    case "retail":
      return (
        <svg {...svgProps}>
          <path d="M6 4h12l1.5 3.5V19a2 2 0 0 1-2 2h-11a2 2 0 0 1-2-2V7.5L6 4Z" />
          <path d="M4.5 7.5h15" />
          <path d="M15.5 11a3.5 3.5 0 0 1-7 0" />
        </svg>
      );
    case "fuel":
      return (
        <svg {...svgProps}>
          <path d="M4 20h10" />
          <path d="M5.5 20V5.5A1.5 1.5 0 0 1 7 4h5a1.5 1.5 0 0 1 1.5 1.5V20" />
          <rect x="7.5" y="6.5" width="4" height="4" rx="0.5" />
          <path d="M13.5 11h1.5a1.5 1.5 0 0 1 1.5 1.5V16a1.5 1.5 0 0 0 3 0V9.5L17 7" />
          <path d="M19.5 10h-1.5" />
        </svg>
      );
    case "stationery":
      return (
        <svg {...svgProps}>
          <path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L8 18l-4 1 1-4L16.5 3.5Z" />
          <path d="M14.5 5.5l3 3" />
          <path d="M12.5 19.5h7" />
        </svg>
      );
    case "bakery":
      return (
        <svg {...svgProps}>
          <path d="M5 10h11v4a5 5 0 0 1-5 5h-1a5 5 0 0 1-5-5v-4Z" />
          <path d="M16 11h1.5a2.5 2.5 0 0 1 0 5H16" />
          <path d="M4 21h14" />
          <path d="M8.5 7V5" />
          <path d="M12.5 7V5" />
        </svg>
      );
    case "lottery":
      return (
        <svg {...svgProps}>
          <path d="M3.5 8.5A1.5 1.5 0 0 1 5 7h14a1.5 1.5 0 0 1 1.5 1.5V10a2 2 0 0 0 0 4v1.5a1.5 1.5 0 0 1-1.5 1.5H5a1.5 1.5 0 0 1-1.5-1.5V14a2 2 0 0 0 0-4V8.5Z" />
          <path d="M9.5 7v2.5M9.5 14.5V17" />
          <path d="M15 9.8l.7 1.5 1.6.2-1.2 1.1.3 1.6-1.4-.8-1.4.8.3-1.6-1.2-1.1 1.6-.2.7-1.5Z" />
        </svg>
      );
    case "book":
      return (
        <svg {...svgProps}>
          <path d="M3 5.5A1.5 1.5 0 0 1 4.5 4h5A2.5 2.5 0 0 1 12 6.5v13a2 2 0 0 0-2-2H4.5A1.5 1.5 0 0 1 3 16V5.5Z" />
          <path d="M21 5.5A1.5 1.5 0 0 0 19.5 4h-5A2.5 2.5 0 0 0 12 6.5v13a2 2 0 0 1 2-2h5.5A1.5 1.5 0 0 0 21 16V5.5Z" />
        </svg>
      );
    case "pharmacy":
      return (
        <svg {...svgProps}>
          <rect x="3.5" y="3.5" width="17" height="17" rx="4" />
          <path d="M12 8v8M8 12h8" />
        </svg>
      );
    case "supermarket":
      return (
        <svg {...svgProps}>
          <path d="M3 4.5h2.2l2.1 10.2a1.5 1.5 0 0 0 1.5 1.2h8.7a1.5 1.5 0 0 0 1.45-1.15L20.5 8H6" />
          <circle cx="9.5" cy="19.5" r="1.25" />
          <circle cx="17" cy="19.5" r="1.25" />
        </svg>
      );
    case "residential":
      return (
        <svg {...svgProps}>
          <path d="M3.5 10.5L12 3.5l8.5 7" />
          <path d="M5.5 9.5V19a1.5 1.5 0 0 0 1.5 1.5h10a1.5 1.5 0 0 0 1.5-1.5V9.5" />
          <path d="M9.5 20.5v-6h5v6" />
        </svg>
      );
    case "transit":
      return (
        <svg {...svgProps}>
          <path d="M12 21s-6.5-5.6-6.5-11a6.5 6.5 0 1 1 13 0c0 5.4-6.5 11-6.5 11Z" />
          <circle cx="12" cy="10" r="2.2" />
        </svg>
      );
    case "building":
      return (
        <svg {...svgProps}>
          <path d="M3.5 20.5h17" />
          <path d="M5 20.5V9.5a1 1 0 0 1 1-1h2.5" />
          <path d="M8.5 20.5V5a1 1 0 0 1 1-1h5a1 1 0 0 1 1 1v15.5" />
          <path d="M15.5 8.5H18a1 1 0 0 1 1 1v11" />
          <path d="M11 8h2M11 11.5h2M11 15h2" />
        </svg>
      );
  }
}

function MarqueeGroup({
  items,
  groupKey,
  ariaHidden,
}: {
  items: VerticalMarqueeItem[];
  groupKey: string;
  ariaHidden?: boolean;
}) {
  return (
    <ul className="vertical-marquee-group" aria-hidden={ariaHidden}>
      {items.map((item) => (
        <li
          key={`${groupKey}-${item.label}`}
          className="vertical-logo-item"
        >
          <span className="vertical-logo-icon" aria-hidden="true">
            <VerticalIcon type={item.icon} />
          </span>
          <span className="vertical-logo-label">{item.label}</span>
        </li>
      ))}
    </ul>
  );
}

/** Seamless left-to-right marquee of monochrome icon + uppercase wordmark lockups. */
export function VerticalMarquee({ items, ariaLabel }: VerticalMarqueeProps) {
  return (
    <div className="vertical-marquee" aria-label={ariaLabel}>
      <div className="vertical-marquee-track">
        <div className="vertical-marquee-half">
          <MarqueeGroup items={items} groupKey="h1-a" />
          <MarqueeGroup items={items} groupKey="h1-b" ariaHidden />
        </div>
        <div className="vertical-marquee-half" aria-hidden="true">
          <MarqueeGroup items={items} groupKey="h2-a" />
          <MarqueeGroup items={items} groupKey="h2-b" />
        </div>
      </div>
    </div>
  );
}
