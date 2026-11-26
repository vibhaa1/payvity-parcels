"use client";

import { useEffect, useRef, useState } from "react";
import {
  DIAL_COUNTRIES,
  sanitizePhoneDigits,
} from "@/lib/onboardingUtils";

interface PhoneInputProps {
  id: string;
  dialCode: string;
  number: string;
  placeholder?: string;
  ariaLabelDialCode?: string;
  onDialCodeChange: (nextDialCode: string) => void;
  onNumberChange: (nextDigits: string) => void;
}

function CountryFlag({ iso }: { iso: string }) {
  switch (iso) {
    case "DE":
      return (
        <svg className="phone-flag" viewBox="0 0 20 14" aria-hidden="true">
          <rect width="20" height="4.67" y="0" fill="#111827" />
          <rect width="20" height="4.67" y="4.67" fill="#dc2626" />
          <rect width="20" height="4.67" y="9.33" fill="#facc15" />
        </svg>
      );
    case "AT":
      return (
        <svg className="phone-flag" viewBox="0 0 20 14" aria-hidden="true">
          <rect width="20" height="14" fill="#ffffff" />
          <rect width="20" height="4.67" y="0" fill="#dc2626" />
          <rect width="20" height="4.67" y="9.33" fill="#dc2626" />
        </svg>
      );
    case "CH":
      return (
        <svg className="phone-flag" viewBox="0 0 20 14" aria-hidden="true">
          <rect width="20" height="14" fill="#dc2626" />
          <rect x="8.5" y="3" width="3" height="8" fill="#ffffff" />
          <rect x="6" y="5.5" width="8" height="3" fill="#ffffff" />
        </svg>
      );
    case "NL":
      return (
        <svg className="phone-flag" viewBox="0 0 20 14" aria-hidden="true">
          <rect width="20" height="4.67" y="0" fill="#b91c1c" />
          <rect width="20" height="4.67" y="4.67" fill="#ffffff" />
          <rect width="20" height="4.67" y="9.33" fill="#1d4ed8" />
        </svg>
      );
    case "BE":
      return (
        <svg className="phone-flag" viewBox="0 0 20 14" aria-hidden="true">
          <rect width="6.67" height="14" x="0" fill="#111827" />
          <rect width="6.67" height="14" x="6.67" fill="#facc15" />
          <rect width="6.67" height="14" x="13.33" fill="#dc2626" />
        </svg>
      );
    case "FR":
      return (
        <svg className="phone-flag" viewBox="0 0 20 14" aria-hidden="true">
          <rect width="6.67" height="14" x="0" fill="#1d4ed8" />
          <rect width="6.67" height="14" x="6.67" fill="#ffffff" />
          <rect width="6.67" height="14" x="13.33" fill="#dc2626" />
        </svg>
      );
    case "LU":
      return (
        <svg className="phone-flag" viewBox="0 0 20 14" aria-hidden="true">
          <rect width="20" height="4.67" y="0" fill="#dc2626" />
          <rect width="20" height="4.67" y="4.67" fill="#ffffff" />
          <rect width="20" height="4.67" y="9.33" fill="#38bdf8" />
        </svg>
      );
    case "PL":
      return (
        <svg className="phone-flag" viewBox="0 0 20 14" aria-hidden="true">
          <rect width="20" height="7" y="0" fill="#ffffff" />
          <rect width="20" height="7" y="7" fill="#dc2626" />
        </svg>
      );
    case "CZ":
      return (
        <svg className="phone-flag" viewBox="0 0 20 14" aria-hidden="true">
          <rect width="20" height="7" y="0" fill="#ffffff" />
          <rect width="20" height="7" y="7" fill="#dc2626" />
          <polygon points="0,0 10,7 0,14" fill="#1d4ed8" />
        </svg>
      );
    case "DK":
      return (
        <svg className="phone-flag" viewBox="0 0 20 14" aria-hidden="true">
          <rect width="20" height="14" fill="#dc2626" />
          <rect x="5.5" y="0" width="2.5" height="14" fill="#ffffff" />
          <rect x="0" y="5.75" width="20" height="2.5" fill="#ffffff" />
        </svg>
      );
    case "IT":
      return (
        <svg className="phone-flag" viewBox="0 0 20 14" aria-hidden="true">
          <rect width="6.67" height="14" x="0" fill="#16a34a" />
          <rect width="6.67" height="14" x="6.67" fill="#ffffff" />
          <rect width="6.67" height="14" x="13.33" fill="#dc2626" />
        </svg>
      );
    case "ES":
      return (
        <svg className="phone-flag" viewBox="0 0 20 14" aria-hidden="true">
          <rect width="20" height="3.5" y="0" fill="#dc2626" />
          <rect width="20" height="7" y="3.5" fill="#facc15" />
          <rect width="20" height="3.5" y="10.5" fill="#dc2626" />
        </svg>
      );
    case "GB":
      return (
        <svg className="phone-flag" viewBox="0 0 20 14" aria-hidden="true">
          <rect width="20" height="14" fill="#1e3a8a" />
          <path d="M0 0L20 14M20 0L0 14" stroke="#ffffff" strokeWidth="2.4" />
          <path d="M0 0L20 14M20 0L0 14" stroke="#dc2626" strokeWidth="1.1" />
          <rect x="8" y="0" width="4" height="14" fill="#ffffff" />
          <rect x="0" y="5" width="20" height="4" fill="#ffffff" />
          <rect x="8.8" y="0" width="2.4" height="14" fill="#dc2626" />
          <rect x="0" y="5.8" width="20" height="2.4" fill="#dc2626" />
        </svg>
      );
    default:
      return null;
  }
}

export function PhoneInput({
  id,
  dialCode,
  number,
  placeholder,
  ariaLabelDialCode = "Country dial code",
  onDialCodeChange,
  onNumberChange,
}: PhoneInputProps) {
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement | null>(null);

  const selected =
    DIAL_COUNTRIES.find((c) => c.dialCode === dialCode) ?? DIAL_COUNTRIES[0];

  useEffect(() => {
    if (!open) return;
    const handleOutside = (e: MouseEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", handleOutside);
    document.addEventListener("keydown", handleKey);
    return () => {
      document.removeEventListener("mousedown", handleOutside);
      document.removeEventListener("keydown", handleKey);
    };
  }, [open]);

  return (
    <div className="phone-input-group">
      <div className="phone-dial-wrap" ref={wrapRef}>
        <button
          type="button"
          className="phone-dial-btn"
          aria-label={ariaLabelDialCode}
          aria-haspopup="listbox"
          aria-expanded={open}
          onClick={() => setOpen((prev) => !prev)}
        >
          <CountryFlag iso={selected.iso} />
          <span>
            {selected.dialCode} ({selected.iso})
          </span>
          <svg
            className={`phone-dial-chevron${open ? " is-open" : ""}`}
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M3 4.5l3 3 3-3" />
          </svg>
        </button>

        {open && (
          <div className="phone-dial-menu" role="listbox">
            {DIAL_COUNTRIES.map((country) => {
              const isSelected = country.dialCode === selected.dialCode;
              return (
                <button
                  key={country.iso}
                  type="button"
                  role="option"
                  aria-selected={isSelected}
                  className={`phone-dial-option${
                    isSelected ? " is-selected" : ""
                  }`}
                  onClick={() => {
                    onDialCodeChange(country.dialCode);
                    setOpen(false);
                  }}
                >
                  <CountryFlag iso={country.iso} />
                  <span>
                    {country.dialCode} ({country.iso})
                  </span>
                  {isSelected && (
                    <span className="phone-dial-check" aria-hidden="true">
                      ✓
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        )}
      </div>

      <input
        id={id}
        type="tel"
        inputMode="numeric"
        pattern="[0-9]*"
        autoComplete="tel-national"
        value={number}
        placeholder={placeholder}
        onChange={(e) => onNumberChange(sanitizePhoneDigits(e.target.value))}
      />
    </div>
  );
}
