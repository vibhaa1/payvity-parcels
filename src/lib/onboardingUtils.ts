import type { Lang } from "@/lib/seo";

export type LegalForm = "einzelunternehmen" | "gesellschaft";
export type ContactLanguageCode = "de" | "tr" | "ku" | "hi" | "en" | "af";
export type Salutation = "" | "frau" | "herr" | "divers";
export type IdDocType = "id_card" | "passport";
export type DayKey = "mon" | "tue" | "wed" | "thu" | "fri" | "sat" | "sun";

export interface TimeRange {
  start: string;
  end: string;
}

export interface DaySchedule {
  open: boolean;
  slots: TimeRange[];
}

export type WeeklySchedule = Record<DayKey, DaySchedule>;

export interface UploadedDocMeta {
  docId: string;
  file: File;
  previewUrl: string | null;
}

export const MAX_FILE_BYTES = 10 * 1024 * 1024; // 10 MB
export const ACCEPTED_FILE_TYPES = [
  "application/pdf",
  "image/jpeg",
  "image/png",
  "image/webp",
] as const;

export const GERMAN_STATES = [
  "Baden-Württemberg",
  "Bayern",
  "Berlin",
  "Brandenburg",
  "Bremen",
  "Hamburg",
  "Hessen",
  "Mecklenburg-Vorpommern",
  "Niedersachsen",
  "Nordrhein-Westfalen",
  "Rheinland-Pfalz",
  "Saarland",
  "Sachsen",
  "Sachsen-Anhalt",
  "Schleswig-Holstein",
  "Thüringen",
] as const;

const PLZ_PREFIX_TO_STATE: Array<[RegExp, (typeof GERMAN_STATES)[number]]> = [
  [/^(10|11|12|13)/, "Berlin"],
  [/^(20|22)/, "Hamburg"],
  [/^28/, "Bremen"],
  [/^(23|24|25)/, "Schleswig-Holstein"],
  [/^(17|18|19)/, "Mecklenburg-Vorpommern"],
  [/^(03|14|15|16)/, "Brandenburg"],
  [/^(01|02|04|08|09)/, "Sachsen"],
  [/^(06|39)/, "Sachsen-Anhalt"],
  [/^(07|98|99)/, "Thüringen"],
  [/^(21|26|27|29|30|31|37|38|49)/, "Niedersachsen"],
  [/^(32|33|40|41|42|44|45|46|47|48|50|51|52|53|57|58|59)/, "Nordrhein-Westfalen"],
  [/^(34|35|36|60|61|63|64|65)/, "Hessen"],
  [/^(54|55|56|67)/, "Rheinland-Pfalz"],
  [/^66/, "Saarland"],
  [/^(68|69|70|71|72|73|74|75|76|77|78|79|88|89)/, "Baden-Württemberg"],
  [/^(80|81|82|83|84|85|86|87|90|91|92|93|94|95|96|97)/, "Bayern"],
];

export function inferGermanStateFromPlz(plz: string): string | null {
  const digits = plz.replace(/\D/g, "");
  if (digits.length < 2) return null;
  const two = digits.slice(0, 2);
  for (const [pattern, state] of PLZ_PREFIX_TO_STATE) {
    if (pattern.test(two)) return state;
  }
  return null;
}

export function formatIban(raw: string): string {
  const cleaned = raw.replace(/[^A-Za-z0-9]/g, "").toUpperCase().slice(0, 34);
  return cleaned.replace(/(.{4})/g, "$1 ").trim();
}

export function validateIban(raw: string): { valid: boolean; reason?: "format" | "checksum" } {
  const cleaned = raw.replace(/\s+/g, "").toUpperCase();
  if (!cleaned) return { valid: false, reason: "format" };
  if (!/^[A-Z]{2}\d{2}[A-Z0-9]{10,30}$/.test(cleaned)) {
    return { valid: false, reason: "format" };
  }
  if (cleaned.startsWith("DE") && cleaned.length !== 22) {
    return { valid: false, reason: "format" };
  }

  const rearranged = cleaned.slice(4) + cleaned.slice(0, 4);
  let remainder = 0;
  for (let i = 0; i < rearranged.length; i++) {
    const code = rearranged.charCodeAt(i);
    const digits = code >= 65 && code <= 90 ? String(code - 55) : rearranged[i];
    for (let j = 0; j < digits.length; j++) {
      remainder = (remainder * 10 + Number(digits[j])) % 97;
    }
  }

  return remainder === 1 ? { valid: true } : { valid: false, reason: "checksum" };
}

export const DAY_ORDER: DayKey[] = [
  "mon",
  "tue",
  "wed",
  "thu",
  "fri",
  "sat",
  "sun",
];

export const TIME_OPTIONS: string[] = (() => {
  const out: string[] = [];
  for (let h = 6; h <= 23; h++) {
    out.push(`${String(h).padStart(2, "0")}:00`);
    out.push(`${String(h).padStart(2, "0")}:30`);
  }
  return out;
})();

export function createDefaultSchedule(): WeeklySchedule {
  return {
    mon: { open: true, slots: [{ start: "09:00", end: "12:00" }, { start: "14:00", end: "19:00" }] },
    tue: { open: true, slots: [{ start: "09:00", end: "12:00" }, { start: "14:00", end: "19:00" }] },
    wed: { open: true, slots: [{ start: "09:00", end: "12:00" }, { start: "14:00", end: "19:00" }] },
    thu: { open: true, slots: [{ start: "09:00", end: "12:00" }, { start: "14:00", end: "19:00" }] },
    fri: { open: true, slots: [{ start: "09:00", end: "12:00" }, { start: "14:00", end: "19:00" }] },
    sat: { open: true, slots: [{ start: "09:00", end: "14:00" }] },
    sun: { open: false, slots: [{ start: "10:00", end: "18:00" }] },
  };
}

export function createPresetSchedule(
  preset: "standard" | "kiosk" | "split"
): WeeklySchedule {
  if (preset === "standard") {
    const weekday = { open: true, slots: [{ start: "09:00", end: "18:30" }] };
    return {
      mon: { ...weekday, slots: [{ ...weekday.slots[0] }] },
      tue: { ...weekday, slots: [{ ...weekday.slots[0] }] },
      wed: { ...weekday, slots: [{ ...weekday.slots[0] }] },
      thu: { ...weekday, slots: [{ ...weekday.slots[0] }] },
      fri: { ...weekday, slots: [{ ...weekday.slots[0] }] },
      sat: { open: true, slots: [{ start: "09:00", end: "16:00" }] },
      sun: { open: false, slots: [{ start: "10:00", end: "16:00" }] },
    };
  }
  if (preset === "kiosk") {
    const longDay = { open: true, slots: [{ start: "08:00", end: "22:00" }] };
    return {
      mon: { ...longDay, slots: [{ ...longDay.slots[0] }] },
      tue: { ...longDay, slots: [{ ...longDay.slots[0] }] },
      wed: { ...longDay, slots: [{ ...longDay.slots[0] }] },
      thu: { ...longDay, slots: [{ ...longDay.slots[0] }] },
      fri: { ...longDay, slots: [{ ...longDay.slots[0] }] },
      sat: { ...longDay, slots: [{ ...longDay.slots[0] }] },
      sun: { open: true, slots: [{ start: "10:00", end: "20:00" }] },
    };
  }
  return createDefaultSchedule();
}

function toMinutes(hhmm: string): number {
  const [h, m] = hhmm.split(":").map(Number);
  if (Number.isNaN(h) || Number.isNaN(m)) return 0;
  return h * 60 + m;
}

export function computeScheduleMetrics(schedule: WeeklySchedule): {
  openDays: number;
  weeklyHours: number;
  meetsAmazonTarget: boolean;
} {
  let openDays = 0;
  let totalMinutes = 0;

  for (const day of DAY_ORDER) {
    const entry = schedule[day];
    if (!entry.open) continue;
    let dayMinutes = 0;
    for (const slot of entry.slots) {
      const diff = toMinutes(slot.end) - toMinutes(slot.start);
      if (diff > 0) dayMinutes += diff;
    }
    if (dayMinutes > 0) {
      openDays += 1;
      totalMinutes += dayMinutes;
    }
  }

  const weeklyHours = Math.round((totalMinutes / 60) * 10) / 10;
  return {
    openDays,
    weeklyHours,
    meetsAmazonTarget: openDays >= 5 && weeklyHours >= 40,
  };
}

export function formatScheduleSummary(
  schedule: WeeklySchedule,
  dayShortLabels: Record<DayKey, string>,
  closedLabel: string
): string {
  return DAY_ORDER.map((day) => {
    const entry = schedule[day];
    if (!entry.open) return `${dayShortLabels[day]}: ${closedLabel}`;
    const slots = entry.slots.map((s) => `${s.start}-${s.end}`).join(", ");
    return `${dayShortLabels[day]}: ${slots}`;
  }).join(" | ");
}

export function estimateShelfSpace(capacity: number, lang: Lang): string {
  if (capacity <= 25) {
    return lang === "de" ? "ca. 1–2 m² Regalfläche" : "approx. 1–2 m² shelf space";
  }
  if (capacity <= 45) {
    return lang === "de" ? "ca. 2–3 m² Regalfläche" : "approx. 2–3 m² shelf space";
  }
  if (capacity <= 80) {
    return lang === "de" ? "ca. 3–5 m² Lagerbereich" : "approx. 3–5 m² storage area";
  }
  return lang === "de" ? "ca. 5–8 m² separater Bereich" : "approx. 5–8 m² dedicated area";
}

export function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${Math.round(bytes / 1024)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}
