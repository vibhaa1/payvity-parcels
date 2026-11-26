interface R2BucketLike {
  put(
    key: string,
    value: ArrayBuffer | Uint8Array | string,
    options?: {
      httpMetadata?: { contentType?: string };
      customMetadata?: Record<string, string>;
    }
  ): Promise<unknown>;
}

interface LeadEnv {
  ONBOARDING_DOCS?: R2BucketLike;
  GOOGLE_SHEETS_WEBHOOK_URL?: string;
  GOOGLE_SHEETS_SECRET?: string;
  UPLOAD_DOCS_TO_DRIVE?: string;
  RESEND_API_KEY?: string;
  LEAD_TO_EMAIL?: string;
  LEAD_FROM_EMAIL?: string;
  TURNSTILE_SECRET_KEY?: string;
}

interface PagesFunctionContext {
  request: Request;
  env: LeadEnv;
}

interface ParsedFileUpload {
  fieldKey: string;
  docId: string;
  fileName: string;
  mimeType: string;
  size: number;
  bytes: Uint8Array;
}

interface RawFields {
  interest?: string;
  legalForm?: string;
  contactLanguage?: string;
  contactLanguageLabel?: string;
  salutation?: string;
  contactName?: string;
  phone?: string;
  email?: string;
  companyName?: string;
  businessName?: string;
  industry?: string;
  vatId?: string;
  iban?: string;
  street?: string;
  addressExtra?: string;
  postalCode?: string;
  city?: string;
  state?: string;
  businessPhone?: string;
  storeName?: string;
  websiteUrl?: string;
  parcelCapacity?: string;
  existingCarriers?: string;
  deferDocs?: string;
  idDocType?: string;
  openingHoursSummary?: string;
  openDays?: string;
  weeklyHours?: string;
  lang?: string;
  website?: string;
  landingPage?: string;
  referrer?: string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  turnstileToken?: string;
}

const VALID_INTERESTS = new Set([
  "Amazon Paketshop",
  "Amazon Locker",
  "Beides",
]);

const VALID_LEGAL_FORMS = new Set(["einzelunternehmen", "gesellschaft"]);
const VALID_LANG_CODES = new Set(["de", "ku", "hi", "en", "af"]);
const MAX_SINGLE_FILE_BYTES = 10 * 1024 * 1024;
const MAX_TOTAL_FILE_BYTES = 40 * 1024 * 1024;
const MAX_DRIVE_INLINE_BYTES = 15 * 1024 * 1024;

const ALLOWED_MIME_TYPES = new Set([
  "application/pdf",
  "image/jpeg",
  "image/png",
  "image/webp",
]);

function cleanString(value: unknown, maxLen: number): string {
  if (typeof value !== "string") return "";
  return value.trim().slice(0, maxLen);
}

function escapeHtml(input: string): string {
  return input
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function sanitizeFilename(name: string): string {
  return name.replace(/[^A-Za-z0-9._-]/g, "_").slice(0, 100) || "document";
}

function isValidIban(raw: string): boolean {
  const cleaned = raw.replace(/\s+/g, "").toUpperCase();
  if (!/^[A-Z]{2}\d{2}[A-Z0-9]{10,30}$/.test(cleaned)) return false;
  if (cleaned.startsWith("DE") && cleaned.length !== 22) return false;
  const rearranged = cleaned.slice(4) + cleaned.slice(0, 4);
  let remainder = 0;
  for (let i = 0; i < rearranged.length; i++) {
    const code = rearranged.charCodeAt(i);
    const digits = code >= 65 && code <= 90 ? String(code - 55) : rearranged[i];
    for (let j = 0; j < digits.length; j++) {
      remainder = (remainder * 10 + Number(digits[j])) % 97;
    }
  }
  return remainder === 1;
}

function uint8ToBase64(bytes: Uint8Array): string {
  let binary = "";
  const chunkSize = 0x8000;
  for (let i = 0; i < bytes.length; i += chunkSize) {
    const slice = bytes.subarray(i, i + chunkSize);
    binary += String.fromCharCode(...slice);
  }
  return btoa(binary);
}

function generateReferenceId(): string {
  const rand = crypto.randomUUID().replace(/-/g, "").slice(0, 6).toUpperCase();
  return `PV-${rand}`;
}

function jsonResponse(body: Record<string, unknown>, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "no-store",
    },
  });
}

async function verifyTurnstile(
  secret: string,
  token: string,
  remoteIp: string | null
): Promise<boolean> {
  if (!token) return false;
  const form = new URLSearchParams();
  form.set("secret", secret);
  form.set("response", token);
  if (remoteIp) form.set("remoteip", remoteIp);

  const res = await fetch(
    "https://challenges.cloudflare.com/turnstile/v0/siteverify",
    {
      method: "POST",
      body: form,
    }
  );
  if (!res.ok) return false;
  const data = (await res.json()) as { success?: boolean };
  return Boolean(data.success);
}

export async function onRequestOptions(): Promise<Response> {
  return new Response(null, {
    status: 204,
    headers: {
      Allow: "POST, OPTIONS",
    },
  });
}

export async function onRequestPost(
  context: PagesFunctionContext
): Promise<Response> {
  const { request, env } = context;
  const contentType = request.headers.get("content-type") || "";

  let rawFields: RawFields = {};
  const uploads: ParsedFileUpload[] = [];
  let totalUploadBytes = 0;

  if (contentType.includes("multipart/form-data")) {
    let formData: FormData;
    try {
      formData = await request.formData();
    } catch {
      return jsonResponse(
        { ok: false, error: "Ungültige Formulardaten / Invalid form data." },
        400
      );
    }

    for (const [key, value] of formData.entries()) {
      if (typeof value === "string") {
        (rawFields as Record<string, string>)[key] = value;
      } else {
        const fileObj = value as File;
        if (!fileObj || fileObj.size === 0) continue;
        if (fileObj.size > MAX_SINGLE_FILE_BYTES) {
          return jsonResponse(
            {
              ok: false,
              error: `Datei "${fileObj.name}" überschreitet das 10-MB-Limit.`,
            },
            400
          );
        }
        totalUploadBytes += fileObj.size;
        if (totalUploadBytes > MAX_TOTAL_FILE_BYTES) {
          return jsonResponse(
            {
              ok: false,
              error: "Die hochgeladenen Dateien überschreiten insgesamt 40 MB.",
            },
            400
          );
        }

        const extOk = /\.(pdf|jpe?g|png|webp)$/i.test(fileObj.name);
        if (!ALLOWED_MIME_TYPES.has(fileObj.type) && !extOk) {
          return jsonResponse(
            {
              ok: false,
              error: `Dateityp nicht erlaubt (${fileObj.name}). Bitte PDF, JPG, PNG oder WebP nutzen.`,
            },
            400
          );
        }

        const buffer = await fileObj.arrayBuffer();
        uploads.push({
          fieldKey: key,
          docId: key.replace(/^doc_/, ""),
          fileName: sanitizeFilename(fileObj.name),
          mimeType: fileObj.type || "application/octet-stream",
          size: fileObj.size,
          bytes: new Uint8Array(buffer),
        });
      }
    }
  } else {
    try {
      rawFields = (await request.json()) as RawFields;
    } catch {
      return jsonResponse(
        { ok: false, error: "Ungültige Anfrage / Invalid JSON payload." },
        400
      );
    }
  }

  const lang = rawFields.lang === "en" ? "en" : "de";

  // Silent honeypot filter
  if (cleanString(rawFields.website, 100)) {
    return jsonResponse({ ok: true, referenceId: "PV-OK" });
  }

  const interest = cleanString(rawFields.interest, 40);
  const legalForm =
    cleanString(rawFields.legalForm, 40) || "einzelunternehmen";
  const contactLanguage =
    cleanString(rawFields.contactLanguage, 16) || (lang === "en" ? "en" : "de");
  const contactLanguageLabel =
    cleanString(rawFields.contactLanguageLabel, 80) || contactLanguage;
  const salutation = cleanString(rawFields.salutation, 24);
  const contactName = cleanString(rawFields.contactName, 140);
  const phone = cleanString(rawFields.phone, 40);
  const email = cleanString(rawFields.email, 160);
  const companyName = cleanString(
    rawFields.companyName || rawFields.businessName,
    180
  );
  const storeName = cleanString(
    rawFields.storeName || rawFields.businessName || rawFields.companyName,
    180
  );
  const industry = cleanString(rawFields.industry, 120);
  const vatId = cleanString(rawFields.vatId, 40);
  const iban = cleanString(rawFields.iban, 50);
  const street = cleanString(rawFields.street, 180);
  const addressExtra = cleanString(rawFields.addressExtra, 120);
  const postalCode = cleanString(rawFields.postalCode, 16);
  const city = cleanString(rawFields.city, 120);
  const state = cleanString(rawFields.state, 80);
  const businessPhone = cleanString(rawFields.businessPhone, 40);
  const websiteUrl = cleanString(rawFields.websiteUrl, 250);
  const parcelCapacity = cleanString(rawFields.parcelCapacity, 16) || "30";
  const existingCarriers = cleanString(rawFields.existingCarriers, 120);
  const deferDocs = rawFields.deferDocs === "true";
  const idDocType = cleanString(rawFields.idDocType, 24) || "id_card";
  const openingHoursSummary = cleanString(rawFields.openingHoursSummary, 600);
  const openDays = cleanString(rawFields.openDays, 8);
  const weeklyHours = cleanString(rawFields.weeklyHours, 16);
  const landingPage = cleanString(rawFields.landingPage, 250);
  const referrer = cleanString(rawFields.referrer, 300);
  const utmSource = cleanString(rawFields.utmSource, 100);
  const utmMedium = cleanString(rawFields.utmMedium, 100);
  const utmCampaign = cleanString(rawFields.utmCampaign, 120);
  const turnstileToken = cleanString(rawFields.turnstileToken, 2048);

  if (
    !VALID_INTERESTS.has(interest) ||
    !VALID_LEGAL_FORMS.has(legalForm) ||
    !VALID_LANG_CODES.has(contactLanguage) ||
    !contactName ||
    !phone ||
    !companyName ||
    !postalCode ||
    !city
  ) {
    return jsonResponse(
      {
        ok: false,
        error:
          lang === "de"
            ? "Bitte füllen Sie alle Pflichtfelder aus."
            : "Please complete all required fields.",
      },
      400
    );
  }

  if (!/^[A-Za-z0-9\s-]{4,10}$/.test(postalCode)) {
    return jsonResponse(
      {
        ok: false,
        error:
          lang === "de"
            ? "Bitte geben Sie eine gültige Postleitzahl an."
            : "Please provide a valid postal code.",
      },
      400
    );
  }

  const isAlphaSpace = (val: string, minLetters: number) => {
    const trimmed = val.trim();
    if (!trimmed || !/^[\p{L} ]+$/u.test(trimmed)) return false;
    return (trimmed.match(/\p{L}/gu) ?? []).length >= minLetters;
  };

  if (!isAlphaSpace(contactName, 3)) {
    return jsonResponse(
      {
        ok: false,
        error:
          lang === "de"
            ? "Bitte geben Sie einen gültigen Namen mit mindestens 3 Buchstaben an."
            : "Please provide a valid full name with at least 3 letters.",
      },
      400
    );
  }

  if (!isAlphaSpace(city, 2)) {
    return jsonResponse(
      {
        ok: false,
        error:
          lang === "de"
            ? "Bitte geben Sie einen gültigen Ort an (nur Buchstaben und Leerzeichen)."
            : "Please provide a valid city (letters and spaces only).",
      },
      400
    );
  }

  const isPhoneDigits = (val: string) =>
    /^(?:\+\d{1,4}\s*)?\d{6,15}$/.test(val.trim());

  if (!isPhoneDigits(phone) || (businessPhone && !isPhoneDigits(businessPhone))) {
    return jsonResponse(
      {
        ok: false,
        error:
          lang === "de"
            ? "Bitte geben Sie eine gültige Telefonnummer (nur Ziffern) an."
            : "Please provide a valid telephone number (digits only).",
      },
      400
    );
  }

  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return jsonResponse(
      {
        ok: false,
        error:
          lang === "de"
            ? "Bitte prüfen Sie Ihre E-Mail-Adresse."
            : "Please verify your email address.",
      },
      400
    );
  }

  if (iban && !isValidIban(iban)) {
    return jsonResponse(
      {
        ok: false,
        error:
          lang === "de"
            ? "Die eingegebene IBAN scheint ungültig zu sein."
            : "The provided IBAN failed checksum validation.",
      },
      400
    );
  }

  if (env.TURNSTILE_SECRET_KEY) {
    const ip = request.headers.get("CF-Connecting-IP");
    const passed = await verifyTurnstile(
      env.TURNSTILE_SECRET_KEY,
      turnstileToken,
      ip
    );
    if (!passed) {
      return jsonResponse(
        {
          ok: false,
          error:
            lang === "de"
              ? "Sicherheitsprüfung fehlgeschlagen. Bitte versuchen Sie es erneut."
              : "Security check failed. Please try again.",
        },
        400
      );
    }
  }

  const referenceId = generateReferenceId();
  const submittedAt = new Date().toISOString();

  // Store documents in Cloudflare R2 if bound
  let r2Stored = false;
  const r2Keys: string[] = [];
  if (env.ONBOARDING_DOCS && uploads.length > 0) {
    try {
      await Promise.all(
        uploads.map(async (u) => {
          const objectKey = `applications/${referenceId}/${u.docId}_${u.fileName}`;
          await env.ONBOARDING_DOCS!.put(objectKey, u.bytes, {
            httpMetadata: { contentType: u.mimeType },
            customMetadata: {
              referenceId,
              docId: u.docId,
              originalName: u.fileName,
            },
          });
          r2Keys.push(objectKey);
        })
      );
      r2Stored = true;
    } catch {
      r2Stored = false;
    }
  }

  const uploadedDocsSummary = deferDocs
    ? "Später nachreichen"
    : uploads.length > 0
      ? uploads.map((u) => `${u.docId}: ${u.fileName}`).join("; ")
      : "Keine Dateien hochgeladen";

  const fullAddress = [street, addressExtra].filter(Boolean).join(", ");

  const leadRecord = {
    referenceId,
    submittedAt,
    interest,
    legalForm,
    contactLanguage,
    contactLanguageLabel,
    salutation,
    contactName,
    phone,
    email,
    companyName,
    storeName,
    businessName: storeName,
    industry,
    vatId,
    iban,
    street,
    addressExtra,
    fullAddress,
    postalCode,
    city,
    state,
    businessPhone,
    websiteUrl,
    parcelCapacity,
    existingCarriers,
    deferDocs,
    idDocType,
    openDays,
    weeklyHours,
    openingHoursSummary,
    uploadedDocsSummary,
    r2Keys: r2Keys.join(", "),
    lang,
    landingPage,
    referrer,
    utmSource,
    utmMedium,
    utmCampaign,
  };

  const sheetsConfigured = Boolean(env.GOOGLE_SHEETS_WEBHOOK_URL);
  const emailConfigured = Boolean(env.RESEND_API_KEY && env.LEAD_TO_EMAIL);

  if (!sheetsConfigured && !emailConfigured) {
    return jsonResponse(
      {
        ok: false,
        error:
          lang === "de"
            ? "Das Formular wird gerade eingerichtet. Bitte senden Sie Ihre Anfrage direkt an partner@payvityparcels.de."
            : "Lead delivery is being configured. Please email partner@payvityparcels.de directly.",
      },
      503
    );
  }

  const deliveries: Array<{ channel: "sheets" | "email"; promise: Promise<boolean> }> =
    [];

  if (env.GOOGLE_SHEETS_WEBHOOK_URL) {
    const webhookUrl = env.GOOGLE_SHEETS_WEBHOOK_URL;
    const includeDriveFiles =
      env.UPLOAD_DOCS_TO_DRIVE === "true" &&
      uploads.length > 0 &&
      totalUploadBytes <= MAX_DRIVE_INLINE_BYTES;

    const filesPayload = includeDriveFiles
      ? uploads.map((u) => ({
          docId: u.docId,
          fileName: u.fileName,
          mimeType: u.mimeType,
          base64: uint8ToBase64(u.bytes),
        }))
      : [];

    deliveries.push({
      channel: "sheets",
      promise: (async () => {
        const res = await fetch(webhookUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          redirect: "follow",
          body: JSON.stringify({
            secret: env.GOOGLE_SHEETS_SECRET ?? "",
            ...leadRecord,
            files: filesPayload,
          }),
        });
        return res.ok;
      })(),
    });
  }

  if (env.RESEND_API_KEY && env.LEAD_TO_EMAIL) {
    const resendKey = env.RESEND_API_KEY;
    const toEmail = env.LEAD_TO_EMAIL;
    const fromEmail =
      env.LEAD_FROM_EMAIL || "PAYVITY Parcels <noreply@payvityparcels.de>";

    const subject = `[${referenceId}] Neue Partner-Anfrage (${interest}): ${storeName} (${postalCode} ${city}) · Sprache: ${contactLanguageLabel}`;

    const textBody = [
      `Neue Partner-Bewerbung über payvityparcels.de`,
      `Referenz-ID: ${referenceId}`,
      `Bevorzugte Kontaktsprache: ${contactLanguageLabel}`,
      ``,
      `Modell: ${interest}`,
      `Rechtsform: ${legalForm}`,
      `Ansprechpartner: ${salutation ? salutation + " " : ""}${contactName}`,
      `Mobilnummer: ${phone}`,
      `E-Mail: ${email || "—"}`,
      ``,
      `Firmenname: ${companyName}`,
      `Branche: ${industry || "—"}`,
      `USt-IdNr.: ${vatId || "—"}`,
      `IBAN: ${iban || "—"}`,
      `Adresse: ${fullAddress || "—"}, ${postalCode} ${city} (${state || "—"})`,
      `Geschäftstelefon: ${businessPhone || "—"}`,
      ``,
      `Geschäftsname (Schaufenster): ${storeName}`,
      `Website: ${websiteUrl || "—"}`,
      `Paketkapazität: ${parcelCapacity} Pakete`,
      `Bestehende Paketdienste: ${existingCarriers || "Keine"}`,
      `Öffnungszeiten (${openDays || "0"} Tage, ${weeklyHours || "0"} Std./Woche): ${openingHoursSummary || "—"}`,
      `Dokumente: ${uploadedDocsSummary}`,
      r2Keys.length ? `R2 Storage Keys: ${r2Keys.join(", ")}` : "",
      ``,
      `Attribution: ${landingPage || "—"} | Referrer: ${referrer || "—"} | UTM: ${utmSource || "-"}/${utmMedium || "-"}/${utmCampaign || "-"}`,
    ]
      .filter(Boolean)
      .join("\n");

    const htmlBody = `
      <div style="font-family:Arial,sans-serif;max-width:680px;color:#0f172a;">
        <h2 style="margin-bottom:6px;">Neue Partner-Bewerbung: ${escapeHtml(storeName)}</h2>
        <p style="margin-top:0;color:#2563eb;font-weight:bold;">
          Referenz: ${escapeHtml(referenceId)} &nbsp;|&nbsp; Kontaktsprache: ${escapeHtml(contactLanguageLabel)}
        </p>
        <table cellpadding="6" cellspacing="0" border="1" bordercolor="#e2e8f0" style="border-collapse:collapse;width:100%;font-size:14px;">
          <tr><td><strong>Modell / Rechtsform</strong></td><td>${escapeHtml(interest)} / ${escapeHtml(legalForm)}</td></tr>
          <tr><td><strong>Ansprechpartner</strong></td><td>${escapeHtml(`${salutation ? salutation + " " : ""}${contactName}`)}</td></tr>
          <tr><td><strong>Mobilnummer</strong></td><td>${escapeHtml(phone)}</td></tr>
          <tr><td><strong>E-Mail</strong></td><td>${escapeHtml(email || "—")}</td></tr>
          <tr><td><strong>Firmenname</strong></td><td>${escapeHtml(companyName)} (${escapeHtml(industry || "—")})</td></tr>
          <tr><td><strong>Standort</strong></td><td>${escapeHtml(fullAddress || "—")}, ${escapeHtml(postalCode)} ${escapeHtml(city)} (${escapeHtml(state || "—")})</td></tr>
          <tr><td><strong>USt-IdNr. / IBAN</strong></td><td>${escapeHtml(vatId || "—")} / ${escapeHtml(iban || "—")}</td></tr>
          <tr><td><strong>Geschäft / Kapazität</strong></td><td>${escapeHtml(storeName)} · ${escapeHtml(parcelCapacity)} Pakete</td></tr>
          <tr><td><strong>Bestehende Paketdienste</strong></td><td>${escapeHtml(existingCarriers || "Keine")}</td></tr>
          <tr><td><strong>Öffnungszeiten</strong></td><td>${escapeHtml(openDays || "0")} Tage · ${escapeHtml(weeklyHours || "0")} Std./Woche<br/><small>${escapeHtml(openingHoursSummary || "—")}</small></td></tr>
          <tr><td><strong>Dokumente</strong></td><td>${escapeHtml(uploadedDocsSummary)}</td></tr>
          <tr><td><strong>Attribution</strong></td><td>${escapeHtml(landingPage || "—")} | ${escapeHtml(referrer || "—")} | UTM: ${escapeHtml(`${utmSource || "-"}/${utmMedium || "-"}/${utmCampaign || "-"}`)}</td></tr>
        </table>
      </div>
    `;

    deliveries.push({
      channel: "email",
      promise: (async () => {
        const res = await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${resendKey}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            from: fromEmail,
            to: [toEmail],
            ...(email ? { reply_to: email } : {}),
            subject,
            text: textBody,
            html: htmlBody,
          }),
        });
        return res.ok;
      })(),
    });
  }

  const results = await Promise.allSettled(deliveries.map((d) => d.promise));
  const channelStatus: Record<"sheets" | "email" | "r2", boolean> = {
    sheets: false,
    email: false,
    r2: r2Stored,
  };

  results.forEach((res, idx) => {
    const channel = deliveries[idx].channel;
    channelStatus[channel] = res.status === "fulfilled" && res.value === true;
  });

  if (!channelStatus.sheets && !channelStatus.email) {
    return jsonResponse(
      {
        ok: false,
        error:
          lang === "de"
            ? "Ihre Anfrage konnte technisch nicht zugestellt werden. Bitte kontaktieren Sie uns unter partner@payvityparcels.de."
            : "Technical delivery error. Please contact partner@payvityparcels.de directly.",
      },
      503
    );
  }

  return jsonResponse({
    ok: true,
    referenceId,
    channels: channelStatus,
  });
}
