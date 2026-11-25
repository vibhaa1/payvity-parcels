/**
 * PAYVITY Parcels — Google Sheets, Google Drive & Email Receiver (Google Apps Script)
 *
 * 1. Open your Google Sheet -> Extensions -> Apps Script.
 * 2. Paste this file, set SHARED_SECRET, NOTIFY_EMAIL, and optional DRIVE_FOLDER_ID below.
 * 3. Deploy -> New deployment -> Web app:
 *    - Execute as: Me
 *    - Who has access: Anyone
 * 4. Copy the Web App URL into Cloudflare Pages env var GOOGLE_SHEETS_WEBHOOK_URL.
 */

const SHEET_NAME = "Leads";
const SHARED_SECRET = "REPLACE_WITH_LONG_RANDOM_SECRET"; // Match GOOGLE_SHEETS_SECRET in Cloudflare Pages
const NOTIFY_EMAIL = "partner@payvityparcels.de";
const DRIVE_FOLDER_ID = ""; // Optional: Google Drive folder ID to store uploaded partner documents

const HEADERS = [
  "Referenz-ID",
  "Zeitstempel",
  "Interesse",
  "Rechtsform",
  "Kontaktsprache",
  "Anrede",
  "Ansprechpartner",
  "Mobilnummer",
  "E-Mail",
  "Firmenname",
  "Branche",
  "USt-IdNr.",
  "IBAN",
  "Adresse",
  "PLZ",
  "Ort",
  "Bundesland",
  "Geschäftstelefon",
  "Geschäftsname (Schaufenster)",
  "Website",
  "Paketkapazität",
  "Bestehende Paketdienste",
  "Öffnungstage",
  "Wochenstunden",
  "Öffnungszeiten",
  "Dokumente",
  "Google Drive Ordner",
  "R2 Storage Keys",
  "Seitensprache",
  "Landing Page",
  "Referrer",
  "UTM Source",
  "UTM Medium",
  "UTM Campaign",
  "Status (Follow-up)",
];

function doPost(e) {
  try {
    const payload = JSON.parse(e.postData.contents || "{}");

    if (SHARED_SECRET && payload.secret !== SHARED_SECRET) {
      return ContentService.createTextOutput(
        JSON.stringify({ ok: false, error: "Unauthorized" })
      ).setMimeType(ContentService.MimeType.JSON);
    }

    // Optional: Save uploaded base64 documents into a per-applicant Drive folder
    let driveFolderUrl = "";
    if (DRIVE_FOLDER_ID && Array.isArray(payload.files) && payload.files.length > 0) {
      const rootFolder = DriveApp.getFolderById(DRIVE_FOLDER_ID);
      const folderTitle = `${payload.referenceId || "PV"}_${payload.storeName || payload.companyName || "Partner"}`;
      const subFolder = rootFolder.createFolder(folderTitle);
      driveFolderUrl = subFolder.getUrl();

      payload.files.forEach(function (fileItem) {
        if (!fileItem.base64) return;
        const decoded = Utilities.base64Decode(fileItem.base64);
        const blob = Utilities.newBlob(
          decoded,
          fileItem.mimeType || "application/octet-stream",
          `${fileItem.docId || "doc"}_${fileItem.fileName || "file"}`
        );
        subFolder.createFile(blob);
      });
    }

    const ss = SpreadsheetApp.getActiveSpreadsheet();
    let sheet = ss.getSheetByName(SHEET_NAME);
    if (!sheet) {
      sheet = ss.insertSheet(SHEET_NAME);
    }

    if (sheet.getLastRow() === 0) {
      sheet.appendRow(HEADERS);
      sheet.getRange(1, 1, 1, HEADERS.length).setFontWeight("bold");
      sheet.setFrozenRows(1);
    }

    sheet.appendRow([
      payload.referenceId || "",
      payload.submittedAt || new Date().toISOString(),
      payload.interest || "",
      payload.legalForm || "",
      payload.contactLanguageLabel || payload.contactLanguage || "",
      payload.salutation || "",
      payload.contactName || "",
      payload.phone || "",
      payload.email || "",
      payload.companyName || "",
      payload.industry || "",
      payload.vatId || "",
      payload.iban || "",
      payload.fullAddress || payload.street || "",
      payload.postalCode || "",
      payload.city || "",
      payload.state || "",
      payload.businessPhone || "",
      payload.storeName || payload.businessName || "",
      payload.websiteUrl || "",
      payload.parcelCapacity || "",
      payload.existingCarriers || "",
      payload.openDays || "",
      payload.weeklyHours || "",
      payload.openingHoursSummary || "",
      payload.uploadedDocsSummary || "",
      driveFolderUrl,
      payload.r2Keys || "",
      payload.lang || "de",
      payload.landingPage || "",
      payload.referrer || "",
      payload.utmSource || "",
      payload.utmMedium || "",
      payload.utmCampaign || "",
      "Neu",
    ]);

    if (NOTIFY_EMAIL) {
      const subject = `[${payload.referenceId || "NEW"}] Partner-Bewerbung (${payload.interest || "Paketshop"}): ${payload.storeName || payload.companyName || ""} (${payload.postalCode || ""} ${payload.city || ""}) · Sprache: ${payload.contactLanguageLabel || payload.contactLanguage || ""}`;
      const body = [
        `Neue Partner-Bewerbung über payvityparcels.de`,
        `Referenz-ID: ${payload.referenceId || ""}`,
        `Bevorzugte Kontaktsprache: ${payload.contactLanguageLabel || payload.contactLanguage || ""}`,
        ``,
        `Modell: ${payload.interest || ""} | Rechtsform: ${payload.legalForm || ""}`,
        `Ansprechpartner: ${payload.salutation ? payload.salutation + " " : ""}${payload.contactName || ""}`,
        `Mobilnummer: ${payload.phone || ""}`,
        `E-Mail: ${payload.email || "—"}`,
        ``,
        `Unternehmen: ${payload.companyName || ""} (${payload.industry || "—"})`,
        `Adresse: ${payload.fullAddress || payload.street || ""}, ${payload.postalCode || ""} ${payload.city || ""} (${payload.state || "—"})`,
        `USt-IdNr.: ${payload.vatId || "—"} | IBAN: ${payload.iban || "—"}`,
        ``,
        `Schaufenstername: ${payload.storeName || ""}`,
        `Paketkapazität: ${payload.parcelCapacity || "—"} | Bestehende Dienste: ${payload.existingCarriers || "Keine"}`,
        `Öffnungszeiten: ${payload.openDays || "0"} Tage · ${payload.weeklyHours || "0"} Std./Woche`,
        `${payload.openingHoursSummary || ""}`,
        ``,
        `Dokumente: ${payload.uploadedDocsSummary || "—"}`,
        driveFolderUrl ? `Google Drive Ordner: ${driveFolderUrl}` : "",
        payload.r2Keys ? `R2 Keys: ${payload.r2Keys}` : "",
      ]
        .filter(Boolean)
        .join("\n");

      MailApp.sendEmail({
        to: NOTIFY_EMAIL,
        subject: subject,
        body: body,
        replyTo: payload.email || undefined,
      });
    }

    return ContentService.createTextOutput(
      JSON.stringify({ ok: true, driveFolderUrl: driveFolderUrl })
    ).setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService.createTextOutput(
      JSON.stringify({ ok: false, error: String(err) })
    ).setMimeType(ContentService.MimeType.JSON);
  }
}
