"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { HOME_CONTENT, InterestOption } from "@/data/content";
import {
  CARRIER_OPTIONS,
  CONTACT_LANGUAGES,
  getDocumentDefinitions,
  INDUSTRY_PRESETS,
  ONBOARDING_COPY,
} from "@/data/onboardingContent";
import {
  computeScheduleMetrics,
  ContactLanguageCode,
  createDefaultSchedule,
  estimateShelfSpace,
  formatIban,
  formatScheduleSummary,
  GERMAN_STATES,
  IdDocType,
  inferGermanStateFromPlz,
  LegalForm,
  Salutation,
  UploadedDocMeta,
  validateIban,
  WeeklySchedule,
} from "@/lib/onboardingUtils";
import { Lang, localizedPath } from "@/lib/seo";
import { EASE, SPRING } from "../MotionPrimitives";
import { DocumentUploadRow } from "./DocumentUploadRow";
import { ScheduleEditor } from "./ScheduleEditor";
import { StepIndicator } from "./StepIndicator";

interface OnboardingWizardProps {
  lang: Lang;
  selectedInterest?: InterestOption;
  defaultInterest?: InterestOption;
  onChangeInterest?: (interest: InterestOption) => void;
}

interface AttributionContext {
  landingPage: string;
  referrer: string;
  utmSource: string;
  utmMedium: string;
  utmCampaign: string;
}

interface PersistedDraft {
  step: number;
  maxVisitedStep: number;
  interest: InterestOption;
  legalForm: LegalForm;
  contactLanguage: ContactLanguageCode;
  salutation: Salutation;
  contactName: string;
  phone: string;
  email: string;
  companyName: string;
  industry: string;
  customIndustry: string;
  vatId: string;
  iban: string;
  street: string;
  addressExtra: string;
  postalCode: string;
  city: string;
  state: string;
  stateManual: boolean;
  businessPhone: string;
  deferDocs: boolean;
  idDocType: IdDocType;
  storeName: string;
  websiteUrl: string;
  parcelCapacity: number;
  existingCarriers: string[];
  schedule: WeeklySchedule;
}

const DRAFT_STORAGE_KEY = "payvity_onboarding_draft_v1";
const ATTR_STORAGE_KEY = "payvity_attribution_v1";

export function OnboardingWizard({
  lang,
  selectedInterest,
  defaultInterest = "Amazon Paketshop",
  onChangeInterest,
}: OnboardingWizardProps) {
  const reduced = useReducedMotion();
  const copy = ONBOARDING_COPY[lang];
  const interestOptions = HOME_CONTENT[lang].leadForm.options;
  const privacyHref = localizedPath(lang, "/datenschutz/");

  const [step, setStep] = useState(1);
  const [maxVisitedStep, setMaxVisitedStep] = useState(1);
  const [direction, setDirection] = useState<1 | -1>(1);
  const [draftHydrated, setDraftHydrated] = useState(false);

  // Step 1
  const [interest, setInterestState] = useState<InterestOption>(
    selectedInterest ?? defaultInterest
  );
  const [legalForm, setLegalForm] = useState<LegalForm>("einzelunternehmen");

  // Step 2
  const [contactLanguage, setContactLanguage] =
    useState<ContactLanguageCode>(lang === "en" ? "en" : "de");
  const [salutation, setSalutation] = useState<Salutation>("");
  const [contactName, setContactName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");

  // Step 3
  const [companyName, setCompanyName] = useState("");
  const [industry, setIndustry] = useState(INDUSTRY_PRESETS[lang][0]);
  const [customIndustry, setCustomIndustry] = useState("");
  const [vatId, setVatId] = useState("");
  const [iban, setIban] = useState("");
  const [street, setStreet] = useState("");
  const [addressExtra, setAddressExtra] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [stateManual, setStateManual] = useState(false);
  const [autoDetectedState, setAutoDetectedState] = useState(false);
  const [businessPhone, setBusinessPhone] = useState("");

  // Step 4
  const [deferDocs, setDeferDocs] = useState(false);
  const [idDocType, setIdDocType] = useState<IdDocType>("id_card");
  const [uploads, setUploads] = useState<Record<string, UploadedDocMeta>>({});

  // Step 5
  const [storeName, setStoreName] = useState("");
  const [websiteUrl, setWebsiteUrl] = useState("");
  const [parcelCapacity, setParcelCapacity] = useState(30);
  const [existingCarriers, setExistingCarriers] = useState<string[]>([]);

  // Step 6
  const [schedule, setSchedule] = useState<WeeklySchedule>(() =>
    createDefaultSchedule()
  );

  // Submission & attribution
  const [honeypot, setHoneypot] = useState("");
  const [stepError, setStepError] = useState<string | null>(null);
  const [submitState, setSubmitState] = useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");
  const [referenceId, setReferenceId] = useState<string | null>(null);
  const [attribution, setAttribution] = useState<AttributionContext>({
    landingPage: "",
    referrer: "",
    utmSource: "",
    utmMedium: "",
    utmCampaign: "",
  });

  useEffect(() => {
    if (selectedInterest) {
      setInterestState(selectedInterest);
    }
  }, [selectedInterest]);

  const setInterest = (next: InterestOption) => {
    setInterestState(next);
    onChangeInterest?.(next);
  };

  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const attrRaw = window.sessionStorage.getItem(ATTR_STORAGE_KEY);
      if (attrRaw) {
        setAttribution(JSON.parse(attrRaw) as AttributionContext);
      } else {
        const params = new URLSearchParams(window.location.search);
        const freshAttr: AttributionContext = {
          landingPage: window.location.pathname,
          referrer: document.referrer || "",
          utmSource: params.get("utm_source") || "",
          utmMedium: params.get("utm_medium") || "",
          utmCampaign: params.get("utm_campaign") || "",
        };
        window.sessionStorage.setItem(ATTR_STORAGE_KEY, JSON.stringify(freshAttr));
        setAttribution(freshAttr);
      }
    } catch {
      // sessionStorage disabled
    }

    try {
      const draftRaw = window.localStorage.getItem(DRAFT_STORAGE_KEY);
      if (draftRaw) {
        const d = JSON.parse(draftRaw) as Partial<PersistedDraft>;
        if (d.step && d.step >= 1 && d.step <= 7) setStep(d.step);
        if (d.maxVisitedStep && d.maxVisitedStep >= 1 && d.maxVisitedStep <= 7) {
          setMaxVisitedStep(d.maxVisitedStep);
        }
        if (d.legalForm) setLegalForm(d.legalForm);
        if (
          d.contactLanguage &&
          CONTACT_LANGUAGES.some((l) => l.code === d.contactLanguage)
        ) {
          setContactLanguage(d.contactLanguage);
        }
        if (d.salutation !== undefined) setSalutation(d.salutation);
        if (d.contactName) setContactName(d.contactName);
        if (d.phone) setPhone(d.phone);
        if (d.email) setEmail(d.email);
        if (d.companyName) setCompanyName(d.companyName);
        if (d.industry) setIndustry(d.industry);
        if (d.customIndustry) setCustomIndustry(d.customIndustry);
        if (d.vatId) setVatId(d.vatId);
        if (d.iban) setIban(d.iban);
        if (d.street) setStreet(d.street);
        if (d.addressExtra) setAddressExtra(d.addressExtra);
        if (d.postalCode) setPostalCode(d.postalCode);
        if (d.city) setCity(d.city);
        if (d.state) setState(d.state);
        if (d.stateManual !== undefined) setStateManual(d.stateManual);
        if (d.businessPhone) setBusinessPhone(d.businessPhone);
        if (d.deferDocs !== undefined) setDeferDocs(d.deferDocs);
        if (d.idDocType) setIdDocType(d.idDocType);
        if (d.storeName) setStoreName(d.storeName);
        if (d.websiteUrl) setWebsiteUrl(d.websiteUrl);
        if (typeof d.parcelCapacity === "number") setParcelCapacity(d.parcelCapacity);
        if (Array.isArray(d.existingCarriers)) setExistingCarriers(d.existingCarriers);
        if (d.schedule) setSchedule(d.schedule);
      }
    } catch {
      // localStorage disabled
    }
    setDraftHydrated(true);
  }, []);

  useEffect(() => {
    if (!draftHydrated || typeof window === "undefined") return;
    if (submitState === "success") return;
    try {
      const payload: PersistedDraft = {
        step,
        maxVisitedStep,
        interest,
        legalForm,
        contactLanguage,
        salutation,
        contactName,
        phone,
        email,
        companyName,
        industry,
        customIndustry,
        vatId,
        iban,
        street,
        addressExtra,
        postalCode,
        city,
        state,
        stateManual,
        businessPhone,
        deferDocs,
        idDocType,
        storeName,
        websiteUrl,
        parcelCapacity,
        existingCarriers,
        schedule,
      };
      window.localStorage.setItem(DRAFT_STORAGE_KEY, JSON.stringify(payload));
    } catch {
      // ignore storage quota errors
    }
  }, [
    draftHydrated,
    submitState,
    step,
    maxVisitedStep,
    interest,
    legalForm,
    contactLanguage,
    salutation,
    contactName,
    phone,
    email,
    companyName,
    industry,
    customIndustry,
    vatId,
    iban,
    street,
    addressExtra,
    postalCode,
    city,
    state,
    stateManual,
    businessPhone,
    deferDocs,
    idDocType,
    storeName,
    websiteUrl,
    parcelCapacity,
    existingCarriers,
    schedule,
  ]);

  const uploadsRef = useRef(uploads);
  uploadsRef.current = uploads;
  useEffect(() => {
    return () => {
      Object.values(uploadsRef.current).forEach((item) => {
        if (item.previewUrl) URL.revokeObjectURL(item.previewUrl);
      });
    };
  }, []);

  const docDefs = useMemo(
    () => getDocumentDefinitions(legalForm, idDocType, lang),
    [legalForm, idDocType, lang]
  );

  const scheduleMetrics = useMemo(
    () => computeScheduleMetrics(schedule),
    [schedule]
  );

  const ibanCheck = useMemo(() => {
    if (!iban.trim()) return null;
    return validateIban(iban);
  }, [iban]);

  const uploadedDocsForActiveForm = useMemo(() => {
    return docDefs.filter((def) => Boolean(uploads[def.id])).length;
  }, [docDefs, uploads]);

  const handlePlzChange = (val: string) => {
    setPostalCode(val);
    if (!stateManual) {
      const inferred = inferGermanStateFromPlz(val);
      if (inferred) {
        setState(inferred);
        setAutoDetectedState(true);
      } else {
        setAutoDetectedState(false);
      }
    }
  };

  const handleUploadFile = (docId: string, file: File) => {
    setUploads((prev) => {
      const existing = prev[docId];
      if (existing?.previewUrl) URL.revokeObjectURL(existing.previewUrl);
      const previewUrl = file.type.startsWith("image/")
        ? URL.createObjectURL(file)
        : null;
      return {
        ...prev,
        [docId]: { docId, file, previewUrl },
      };
    });
    setDeferDocs(false);
  };

  const handleRemoveFile = (docId: string) => {
    setUploads((prev) => {
      const next = { ...prev };
      if (next[docId]?.previewUrl) {
        URL.revokeObjectURL(next[docId].previewUrl!);
      }
      delete next[docId];
      return next;
    });
  };

  const toggleCarrier = (carrier: string) => {
    setExistingCarriers((prev) =>
      prev.includes(carrier)
        ? prev.filter((c) => c !== carrier)
        : [...prev, carrier]
    );
  };

  const validateStep = (targetStep: number): string | null => {
    if (targetStep === 1) {
      if (!interest || !legalForm) return copy.validation.selectProgram;
    }
    if (targetStep === 2) {
      if (!contactName.trim()) return copy.validation.contactName;
      if (phone.replace(/\D/g, "").length < 6) return copy.validation.phone;
      if (email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
        return copy.validation.email;
      }
    }
    if (targetStep === 3) {
      if (!companyName.trim()) return copy.validation.companyName;
      if (!street.trim()) return copy.validation.street;
      if (!/^[A-Za-z0-9\s-]{4,10}$/.test(postalCode.trim())) {
        return copy.validation.plz;
      }
      if (!city.trim()) return copy.validation.city;
      if (iban.trim() && ibanCheck && !ibanCheck.valid) {
        return copy.validation.ibanInvalid;
      }
    }
    if (targetStep === 5) {
      if (!storeName.trim()) return copy.validation.storeName;
    }
    if (targetStep === 6) {
      if (scheduleMetrics.openDays === 0) return copy.validation.openHoursRequired;
    }
    return null;
  };

  const goToStep = (targetStep: number) => {
    setStepError(null);
    if (targetStep > step) {
      for (let s = step; s < targetStep; s++) {
        const err = validateStep(s);
        if (err) {
          setStep(s);
          setStepError(err);
          return;
        }
      }
    }
    if (targetStep === 5 && !storeName.trim() && companyName.trim()) {
      setStoreName(companyName.trim());
    }
    setDirection(targetStep >= step ? 1 : -1);
    setStep(targetStep);
    setMaxVisitedStep((prev) => Math.max(prev, targetStep));
  };

  const handleReset = () => {
    Object.values(uploads).forEach((item) => {
      if (item.previewUrl) URL.revokeObjectURL(item.previewUrl);
    });
    setUploads({});
    setStep(1);
    setMaxVisitedStep(1);
    setLegalForm("einzelunternehmen");
    setContactLanguage(lang === "en" ? "en" : "de");
    setSalutation("");
    setContactName("");
    setPhone("");
    setEmail("");
    setCompanyName("");
    setIndustry(INDUSTRY_PRESETS[lang][0]);
    setCustomIndustry("");
    setVatId("");
    setIban("");
    setStreet("");
    setAddressExtra("");
    setPostalCode("");
    setCity("");
    setState("");
    setStateManual(false);
    setAutoDetectedState(false);
    setBusinessPhone("");
    setDeferDocs(false);
    setIdDocType("id_card");
    setStoreName("");
    setWebsiteUrl("");
    setParcelCapacity(30);
    setExistingCarriers([]);
    setSchedule(createDefaultSchedule());
    setStepError(null);
    setSubmitState("idle");
    setReferenceId(null);
    try {
      window.localStorage.removeItem(DRAFT_STORAGE_KEY);
    } catch {
      // ignore
    }
  };

  const handleSubmit = async () => {
    setStepError(null);
    for (const checkStep of [1, 2, 3, 5, 6]) {
      const err = validateStep(checkStep);
      if (err) {
        setStep(checkStep);
        setStepError(err);
        return;
      }
    }

    setSubmitState("submitting");
    const effectiveIndustry =
      industry === INDUSTRY_PRESETS[lang][INDUSTRY_PRESETS[lang].length - 1] &&
      customIndustry.trim()
        ? customIndustry.trim()
        : industry;

    const langMeta = CONTACT_LANGUAGES.find((l) => l.code === contactLanguage);
    const contactLanguageLabel = langMeta
      ? `${langMeta.deLabel} (${langMeta.nativeLabel})`
      : contactLanguage;

    const openingHoursSummary = formatScheduleSummary(
      schedule,
      copy.step6.dayShort,
      copy.step6.closedLabel
    );

    const formData = new FormData();
    formData.set("interest", interest);
    formData.set("legalForm", legalForm);
    formData.set("contactLanguage", contactLanguage);
    formData.set("contactLanguageLabel", contactLanguageLabel);
    formData.set("salutation", salutation);
    formData.set("contactName", contactName.trim());
    formData.set("phone", phone.trim());
    formData.set("email", email.trim());
    formData.set("companyName", companyName.trim());
    formData.set("businessName", (storeName || companyName).trim());
    formData.set("industry", effectiveIndustry);
    formData.set("vatId", vatId.trim());
    formData.set("iban", iban.trim());
    formData.set("street", street.trim());
    formData.set("addressExtra", addressExtra.trim());
    formData.set("postalCode", postalCode.trim());
    formData.set("city", city.trim());
    formData.set("state", state.trim());
    formData.set("businessPhone", businessPhone.trim());
    formData.set("storeName", storeName.trim());
    formData.set("websiteUrl", websiteUrl.trim());
    formData.set("parcelCapacity", String(parcelCapacity));
    formData.set("existingCarriers", existingCarriers.join(", "));
    formData.set("deferDocs", deferDocs ? "true" : "false");
    formData.set("idDocType", idDocType);
    formData.set("openingHoursSummary", openingHoursSummary);
    formData.set("openDays", String(scheduleMetrics.openDays));
    formData.set("weeklyHours", String(scheduleMetrics.weeklyHours));
    formData.set("lang", lang);
    formData.set("website", honeypot);
    formData.set(
      "landingPage",
      attribution.landingPage ||
        (typeof window !== "undefined" ? window.location.pathname : "")
    );
    formData.set("referrer", attribution.referrer);
    formData.set("utmSource", attribution.utmSource);
    formData.set("utmMedium", attribution.utmMedium);
    formData.set("utmCampaign", attribution.utmCampaign);

    if (!deferDocs) {
      docDefs.forEach((def) => {
        const item = uploads[def.id];
        if (item) {
          formData.append(`doc_${def.id}`, item.file, item.file.name);
        }
      });
    }

    try {
      const response = await fetch("/api/lead", {
        method: "POST",
        body: formData,
      });

      const payload = (await response.json().catch(() => null)) as {
        ok?: boolean;
        referenceId?: string;
        error?: string;
      } | null;

      if (!response.ok || !payload?.ok) {
        setSubmitState("error");
        setStepError(payload?.error || copy.errorFallback);
        return;
      }

      setSubmitState("success");
      setReferenceId(payload.referenceId ?? "PV-NEW");
      try {
        window.localStorage.removeItem(DRAFT_STORAGE_KEY);
      } catch {
        // ignore
      }
    } catch {
      setSubmitState("error");
      setStepError(copy.errorFallback);
    }
  };

  const currentStepMeta = copy.steps[step - 1] ?? copy.steps[0];
  const isCustomIndustrySelected =
    industry === INDUSTRY_PRESETS[lang][INDUSTRY_PRESETS[lang].length - 1];
  const selectedLangMeta = CONTACT_LANGUAGES.find(
    (l) => l.code === contactLanguage
  );
  const showReset =
    step > 1 || Boolean(contactName.trim() || companyName.trim() || phone.trim());

  return (
    <div className="wizard-shell">
      <div className="wizard-card">
        <div className="wizard-header">
          <div className="wizard-header-copy">
            <h2>{copy.sectionHeader.title}</h2>
            <p>{copy.sectionHeader.lead}</p>
          </div>
          {submitState !== "success" && showReset && (
            <button
              type="button"
              className="wizard-reset-btn"
              onClick={handleReset}
            >
              {copy.sectionHeader.resetDraft}
            </button>
          )}
        </div>

        {submitState === "success" ? (
            <div className="wizard-success-panel" aria-live="polite">
              <span className="wizard-success-badge">{copy.success.badge}</span>
              <h3>{copy.success.title}</h3>
              <p>{copy.success.desc}</p>

              <div className="wizard-success-meta">
                <div className="wizard-success-card">
                  <span>{copy.success.refLabel}</span>
                  <strong>{referenceId}</strong>
                </div>
                <div className="wizard-success-card">
                  <span>{copy.success.langNoticePrefix}</span>
                  <strong>
                    {selectedLangMeta
                      ? `${selectedLangMeta.badge} · ${selectedLangMeta.nativeLabel}`
                      : contactLanguage.toUpperCase()}
                  </strong>
                </div>
              </div>

              <div className="wizard-next-steps">
                <h4>{copy.success.nextStepsTitle}</h4>
                <ol>
                  {copy.success.nextSteps.map((s) => (
                    <li key={s}>{s}</li>
                  ))}
                </ol>
              </div>

              <button
                type="button"
                className="button outline-dark"
                onClick={handleReset}
              >
                {copy.success.newApplicationBtn}
              </button>
            </div>
          ) : (
            <>
              <StepIndicator
                steps={copy.steps}
                currentStep={step}
                maxVisitedStep={maxVisitedStep}
                onSelectStep={goToStep}
              />

              <div className="wizard-stage">
                <div className="lead-honeypot" aria-hidden="true">
                  <label htmlFor="wizard-website">Website</label>
                  <input
                    id="wizard-website"
                    name="website"
                    type="text"
                    tabIndex={-1}
                    autoComplete="off"
                    value={honeypot}
                    onChange={(e) => setHoneypot(e.target.value)}
                  />
                </div>

                <div className="wizard-stage-head">
                  <h3>{currentStepMeta.title}</h3>
                  <p>{currentStepMeta.subtitle}</p>
                </div>

                <AnimatePresence mode="wait" initial={false}>
                  <motion.div
                    key={step}
                    className="wizard-step-body"
                    initial={
                      reduced
                        ? false
                        : { opacity: 0, x: direction > 0 ? 14 : -14 }
                    }
                    animate={{ opacity: 1, x: 0 }}
                    exit={
                      reduced
                        ? undefined
                        : { opacity: 0, x: direction > 0 ? -14 : 14 }
                    }
                    transition={{ duration: 0.2, ease: EASE }}
                  >
                    {/* STEP 1 */}
                    {step === 1 && (
                      <div className="wizard-fields">
                        <div className="wizard-block">
                          <span className="wizard-label">
                            {copy.step1.programLabel}
                          </span>
                          <div className="wizard-segment">
                            {interestOptions.map((opt) => {
                              const isActive = interest === opt.value;
                              return (
                                <button
                                  key={opt.value}
                                  type="button"
                                  className={`wizard-seg-btn${
                                    isActive ? " is-selected" : ""
                                  }`}
                                  onClick={() => setInterest(opt.value)}
                                >
                                  {isActive && (
                                    <motion.span
                                      layoutId="wizard-interest-bg"
                                      className="wizard-seg-pill"
                                      transition={SPRING}
                                      aria-hidden="true"
                                    />
                                  )}
                                  <span>{opt.label}</span>
                                </button>
                              );
                            })}
                          </div>
                        </div>

                        <div className="wizard-block">
                          <span className="wizard-label">
                            {copy.step1.legalFormLabel}
                          </span>
                          <div className="wizard-choice-grid">
                            <button
                              type="button"
                              className={`wizard-card-choice${
                                legalForm === "einzelunternehmen"
                                  ? " is-selected"
                                  : ""
                              }`}
                              onClick={() => setLegalForm("einzelunternehmen")}
                            >
                              <div className="wizard-choice-top">
                                <strong>{copy.step1.einzelTitle}</strong>
                                <span
                                  className="wizard-choice-check"
                                  aria-hidden="true"
                                >
                                  ✓
                                </span>
                              </div>
                              <span>{copy.step1.einzelDesc}</span>
                            </button>

                            <button
                              type="button"
                              className={`wizard-card-choice${
                                legalForm === "gesellschaft"
                                  ? " is-selected"
                                  : ""
                              }`}
                              onClick={() => setLegalForm("gesellschaft")}
                            >
                              <div className="wizard-choice-top">
                                <strong>{copy.step1.gesellschaftTitle}</strong>
                                <span
                                  className="wizard-choice-check"
                                  aria-hidden="true"
                                >
                                  ✓
                                </span>
                              </div>
                              <span>{copy.step1.gesellschaftDesc}</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* STEP 2 */}
                    {step === 2 && (
                      <div className="wizard-fields">
                        <div className="wizard-block">
                          <span className="wizard-label">
                            {copy.step2.languageLabel}
                          </span>
                          <p className="wizard-hint">
                            {copy.step2.languageHint}
                          </p>
                          <div className="wizard-lang-grid">
                            {CONTACT_LANGUAGES.map((l) => {
                              const active = contactLanguage === l.code;
                              return (
                                <button
                                  key={l.code}
                                  type="button"
                                  className={`wizard-lang-card${
                                    active ? " is-selected" : ""
                                  }`}
                                  aria-pressed={active}
                                  onClick={() => setContactLanguage(l.code)}
                                >
                                  <span className="wizard-lang-badge">
                                    {l.badge}
                                  </span>
                                  <div className="wizard-lang-text">
                                    <strong>{l.nativeLabel}</strong>
                                    <span>
                                      {lang === "de" ? l.deLabel : l.enLabel}
                                    </span>
                                  </div>
                                </button>
                              );
                            })}
                          </div>
                        </div>

                        <div className="wizard-block">
                          <span className="wizard-label">
                            {copy.step2.salutationLabel}
                          </span>
                          <div className="wizard-mini-pills">
                            {copy.step2.salutationOptions.map((opt) => (
                              <button
                                key={opt.value}
                                type="button"
                                className={`wizard-mini-pill${
                                  salutation === opt.value ? " is-selected" : ""
                                }`}
                                onClick={() =>
                                  setSalutation(
                                    salutation === opt.value ? "" : opt.value
                                  )
                                }
                              >
                                {opt.label}
                              </button>
                            ))}
                          </div>
                        </div>

                        <div className="lead-grid">
                          <div className="lead-field lead-field-full">
                            <label htmlFor="wiz-contact-name">
                              {copy.step2.fullNameLabel}
                            </label>
                            <input
                              id="wiz-contact-name"
                              type="text"
                              value={contactName}
                              onChange={(e) => setContactName(e.target.value)}
                              placeholder={copy.step2.fullNamePlaceholder}
                            />
                          </div>

                          <div className="lead-field">
                            <label htmlFor="wiz-phone">
                              {copy.step2.phoneLabel}
                            </label>
                            <input
                              id="wiz-phone"
                              type="tel"
                              value={phone}
                              onChange={(e) => setPhone(e.target.value)}
                              placeholder={copy.step2.phonePlaceholder}
                            />
                            <span className="wizard-field-hint">
                              {copy.step2.phoneHint}
                            </span>
                          </div>

                          <div className="lead-field">
                            <label htmlFor="wiz-email">
                              {copy.step2.emailLabel}
                            </label>
                            <input
                              id="wiz-email"
                              type="email"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                              placeholder={copy.step2.emailPlaceholder}
                            />
                          </div>
                        </div>
                      </div>
                    )}

                    {/* STEP 3 */}
                    {step === 3 && (
                      <div className="wizard-fields">
                        <div className="lead-grid">
                          <div className="lead-field lead-field-full">
                            <label htmlFor="wiz-company-name">
                              {copy.step3.companyNameLabel}
                            </label>
                            <input
                              id="wiz-company-name"
                              type="text"
                              value={companyName}
                              onChange={(e) => setCompanyName(e.target.value)}
                              placeholder={copy.step3.companyNamePlaceholder}
                            />
                          </div>

                          <div className="lead-field">
                            <label htmlFor="wiz-industry">
                              {copy.step3.industryLabel}
                            </label>
                            <select
                              id="wiz-industry"
                              className="wizard-select"
                              value={industry}
                              onChange={(e) => setIndustry(e.target.value)}
                            >
                              {INDUSTRY_PRESETS[lang].map((preset) => (
                                <option key={preset} value={preset}>
                                  {preset}
                                </option>
                              ))}
                            </select>
                          </div>

                          <div className="lead-field">
                            <label htmlFor="wiz-vat">
                              {copy.step3.vatLabel}
                            </label>
                            <input
                              id="wiz-vat"
                              type="text"
                              value={vatId}
                              onChange={(e) => setVatId(e.target.value)}
                              placeholder={copy.step3.vatPlaceholder}
                            />
                          </div>

                          {isCustomIndustrySelected && (
                            <div className="lead-field lead-field-full">
                              <input
                                type="text"
                                aria-label={
                                  copy.step3.industryCustomPlaceholder
                                }
                                value={customIndustry}
                                onChange={(e) =>
                                  setCustomIndustry(e.target.value)
                                }
                                placeholder={
                                  copy.step3.industryCustomPlaceholder
                                }
                              />
                            </div>
                          )}

                          <div className="lead-field lead-field-full">
                            <div className="wizard-label-row">
                              <label htmlFor="wiz-iban">
                                {copy.step3.ibanLabel}
                              </label>
                              {ibanCheck && (
                                <span
                                  className={`wizard-status-chip ${
                                    ibanCheck.valid ? "is-valid" : "is-warn"
                                  }`}
                                >
                                  {ibanCheck.valid
                                    ? `✓ ${copy.step3.ibanValidLabel}`
                                    : copy.step3.ibanInvalidLabel}
                                </span>
                              )}
                            </div>
                            <input
                              id="wiz-iban"
                              type="text"
                              value={iban}
                              onChange={(e) =>
                                setIban(formatIban(e.target.value))
                              }
                              placeholder={copy.step3.ibanPlaceholder}
                            />
                            <span className="wizard-field-hint">
                              {copy.step3.ibanHint}
                            </span>
                          </div>

                          <div className="lead-field">
                            <label htmlFor="wiz-street">
                              {copy.step3.streetLabel}
                            </label>
                            <input
                              id="wiz-street"
                              type="text"
                              value={street}
                              onChange={(e) => setStreet(e.target.value)}
                              placeholder={copy.step3.streetPlaceholder}
                            />
                          </div>

                          <div className="lead-field">
                            <label htmlFor="wiz-extra">
                              {copy.step3.addressExtraLabel}
                            </label>
                            <input
                              id="wiz-extra"
                              type="text"
                              value={addressExtra}
                              onChange={(e) => setAddressExtra(e.target.value)}
                              placeholder={copy.step3.addressExtraPlaceholder}
                            />
                          </div>

                          <div className="lead-field">
                            <label htmlFor="wiz-plz">
                              {copy.step3.plzLabel}
                            </label>
                            <input
                              id="wiz-plz"
                              type="text"
                              inputMode="numeric"
                              value={postalCode}
                              onChange={(e) => handlePlzChange(e.target.value)}
                              placeholder={copy.step3.plzPlaceholder}
                            />
                          </div>

                          <div className="lead-field">
                            <label htmlFor="wiz-city">
                              {copy.step3.cityLabel}
                            </label>
                            <input
                              id="wiz-city"
                              type="text"
                              value={city}
                              onChange={(e) => setCity(e.target.value)}
                              placeholder={copy.step3.cityPlaceholder}
                            />
                          </div>

                          <div className="lead-field">
                            <div className="wizard-label-row">
                              <label htmlFor="wiz-state">
                                {copy.step3.stateLabel}
                              </label>
                              {autoDetectedState && !stateManual && state && (
                                <span className="wizard-status-chip is-info">
                                  {copy.step3.plzAutoDetected}
                                </span>
                              )}
                            </div>
                            <select
                              id="wiz-state"
                              className="wizard-select"
                              value={state}
                              onChange={(e) => {
                                setState(e.target.value);
                                setStateManual(true);
                                setAutoDetectedState(false);
                              }}
                            >
                              <option value="">
                                {copy.step3.statePlaceholder}
                              </option>
                              {GERMAN_STATES.map((st) => (
                                <option key={st} value={st}>
                                  {st}
                                </option>
                              ))}
                            </select>
                          </div>

                          <div className="lead-field">
                            <div className="wizard-label-row">
                              <label htmlFor="wiz-biz-phone">
                                {copy.step3.businessPhoneLabel}
                              </label>
                              {phone && (
                                <button
                                  type="button"
                                  className="wizard-inline-action"
                                  onClick={() => setBusinessPhone(phone)}
                                >
                                  {copy.step3.copyMobileLabel}
                                </button>
                              )}
                            </div>
                            <input
                              id="wiz-biz-phone"
                              type="tel"
                              value={businessPhone}
                              onChange={(e) => setBusinessPhone(e.target.value)}
                              placeholder={copy.step3.businessPhonePlaceholder}
                            />
                          </div>
                        </div>
                      </div>
                    )}

                    {/* STEP 4 */}
                    {step === 4 && (
                      <div className="wizard-fields">
                        <div className="wizard-info-banner">
                          <strong>{copy.step4.infoBannerTitle}</strong>
                          <p>{copy.step4.infoBannerDesc}</p>
                        </div>

                        <label className="wizard-defer-toggle">
                          <input
                            type="checkbox"
                            checked={deferDocs}
                            onChange={(e) => setDeferDocs(e.target.checked)}
                          />
                          <div>
                            <strong>{copy.step4.deferToggleTitle}</strong>
                            <span>{copy.step4.deferToggleDesc}</span>
                          </div>
                        </label>

                        {!deferDocs && (
                          <>
                            <div className="wizard-block">
                              <span className="wizard-label">
                                {copy.step4.idTypeLabel}
                              </span>
                              <div className="wizard-mini-pills">
                                <button
                                  type="button"
                                  className={`wizard-mini-pill${
                                    idDocType === "id_card"
                                      ? " is-selected"
                                      : ""
                                  }`}
                                  onClick={() => setIdDocType("id_card")}
                                >
                                  {copy.step4.idCardLabel}
                                </button>
                                <button
                                  type="button"
                                  className={`wizard-mini-pill${
                                    idDocType === "passport"
                                      ? " is-selected"
                                      : ""
                                  }`}
                                  onClick={() => setIdDocType("passport")}
                                >
                                  {copy.step4.passportLabel}
                                </button>
                              </div>
                            </div>

                            <div className="doc-list">
                              {docDefs.map((doc) => (
                                <DocumentUploadRow
                                  key={doc.id}
                                  doc={doc}
                                  uploaded={uploads[doc.id]}
                                  stepCopy={copy.step4}
                                  onUpload={handleUploadFile}
                                  onRemove={handleRemoveFile}
                                />
                              ))}
                            </div>
                          </>
                        )}
                      </div>
                    )}

                    {/* STEP 5 */}
                    {step === 5 && (
                      <div className="wizard-fields">
                        <div className="lead-grid">
                          <div className="lead-field">
                            <label htmlFor="wiz-store-name">
                              {copy.step5.storeNameLabel}
                            </label>
                            <input
                              id="wiz-store-name"
                              type="text"
                              value={storeName}
                              onChange={(e) => setStoreName(e.target.value)}
                              placeholder={copy.step5.storeNamePlaceholder}
                            />
                            <span className="wizard-field-hint">
                              {copy.step5.storeNameHint}
                            </span>
                          </div>

                          <div className="lead-field">
                            <label htmlFor="wiz-website">
                              {copy.step5.websiteLabel}
                            </label>
                            <input
                              id="wiz-website"
                              type="url"
                              value={websiteUrl}
                              onChange={(e) => setWebsiteUrl(e.target.value)}
                              placeholder={copy.step5.websitePlaceholder}
                            />
                          </div>
                        </div>

                        <div className="wizard-block capacity-box">
                          <div className="wizard-label-row">
                            <label
                              htmlFor="wiz-capacity"
                              className="wizard-label"
                            >
                              {copy.step5.capacityLabel}
                            </label>
                            <span className="capacity-readout">
                              <strong>{parcelCapacity}</strong>{" "}
                              {copy.step5.capacityUnit} ·{" "}
                              {estimateShelfSpace(parcelCapacity, lang)}
                            </span>
                          </div>
                          <p className="wizard-hint">
                            {copy.step5.capacityHint}
                          </p>
                          <input
                            id="wiz-capacity"
                            type="range"
                            min={10}
                            max={120}
                            step={5}
                            value={parcelCapacity}
                            onChange={(e) =>
                              setParcelCapacity(Number(e.target.value))
                            }
                            className="capacity-slider"
                          />
                          <div className="capacity-scale" aria-hidden="true">
                            <span>10</span>
                            <span>30</span>
                            <span>60</span>
                            <span>90</span>
                            <span>120+</span>
                          </div>
                        </div>

                        <div className="wizard-block">
                          <span className="wizard-label">
                            {copy.step5.carriersLabel}
                          </span>
                          <p className="wizard-hint">
                            {copy.step5.carriersHint}
                          </p>
                          <div className="wizard-mini-pills">
                            {CARRIER_OPTIONS.map((c) => {
                              const active = existingCarriers.includes(c);
                              return (
                                <button
                                  key={c}
                                  type="button"
                                  className={`wizard-mini-pill${
                                    active ? " is-selected" : ""
                                  }`}
                                  aria-pressed={active}
                                  onClick={() => toggleCarrier(c)}
                                >
                                  {c}
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      </div>
                    )}

                    {/* STEP 6 */}
                    {step === 6 && (
                      <ScheduleEditor
                        schedule={schedule}
                        stepCopy={copy.step6}
                        onChange={setSchedule}
                      />
                    )}

                    {/* STEP 7 */}
                    {step === 7 && (
                      <div className="wizard-fields">
                        <div className="review-grid">
                          <div className="review-card">
                            <div className="review-card-head">
                              <h5>{copy.step7.sections.modelAndEntity}</h5>
                              <button type="button" onClick={() => goToStep(1)}>
                                {copy.step7.editLabel}
                              </button>
                            </div>
                            <p>{interest}</p>
                            <p className="review-muted">
                              {legalForm === "einzelunternehmen"
                                ? copy.step1.einzelTitle
                                : copy.step1.gesellschaftTitle}
                            </p>
                          </div>

                          <div className="review-card">
                            <div className="review-card-head">
                              <h5>{copy.step7.sections.contact}</h5>
                              <button type="button" onClick={() => goToStep(2)}>
                                {copy.step7.editLabel}
                              </button>
                            </div>
                            <p>{contactName}</p>
                            <p className="review-muted">
                              {phone}
                              {email ? ` · ${email}` : ""}
                            </p>
                            <p className="review-muted">
                              {selectedLangMeta
                                ? `${selectedLangMeta.badge} · ${selectedLangMeta.nativeLabel}`
                                : contactLanguage}
                            </p>
                          </div>

                          <div className="review-card">
                            <div className="review-card-head">
                              <h5>{copy.step7.sections.company}</h5>
                              <button type="button" onClick={() => goToStep(3)}>
                                {copy.step7.editLabel}
                              </button>
                            </div>
                            <p>{companyName}</p>
                            <p className="review-muted">
                              {[street, addressExtra, `${postalCode} ${city}`, state]
                                .filter(Boolean)
                                .join(", ")}
                            </p>
                          </div>

                          <div className="review-card">
                            <div className="review-card-head">
                              <h5>{copy.step7.sections.documents}</h5>
                              <button type="button" onClick={() => goToStep(4)}>
                                {copy.step7.editLabel}
                              </button>
                            </div>
                            <p>
                              {deferDocs
                                ? copy.step7.deferredNote
                                : uploadedDocsForActiveForm > 0
                                  ? `${uploadedDocsForActiveForm} / ${docDefs.length}`
                                  : copy.step7.noDocsUploaded}
                            </p>
                          </div>

                          <div className="review-card">
                            <div className="review-card-head">
                              <h5>{copy.step7.sections.store}</h5>
                              <button type="button" onClick={() => goToStep(5)}>
                                {copy.step7.editLabel}
                              </button>
                            </div>
                            <p>{storeName}</p>
                            <p className="review-muted">
                              {parcelCapacity} {copy.step5.capacityUnit}
                              {existingCarriers.length > 0
                                ? ` · ${existingCarriers.join(", ")}`
                                : ""}
                            </p>
                          </div>

                          <div className="review-card">
                            <div className="review-card-head">
                              <h5>{copy.step7.sections.hours}</h5>
                              <button type="button" onClick={() => goToStep(6)}>
                                {copy.step7.editLabel}
                              </button>
                            </div>
                            <p>
                              {scheduleMetrics.openDays}{" "}
                              {copy.step6.statusReadyPrefix} ·{" "}
                              {scheduleMetrics.weeklyHours}h/Woche
                            </p>
                          </div>
                        </div>

                        <p className="lead-privacy">
                          {copy.step7.privacyPrefix}
                          <Link href={privacyHref}>{copy.step7.privacyLink}</Link>
                          {copy.step7.privacySuffix}
                        </p>
                      </div>
                    )}
                  </motion.div>
                </AnimatePresence>

                {stepError && (
                  <div className="wizard-error-banner" role="alert">
                    {stepError}
                  </div>
                )}

                <div className="wizard-footer-nav">
                  {step > 1 ? (
                    <button
                      type="button"
                      className="button outline-dark"
                      onClick={() => goToStep(step - 1)}
                    >
                      ← {copy.navButtons.back}
                    </button>
                  ) : (
                    <span />
                  )}

                  <div className="wizard-footer-right">
                    {step === 4 && !deferDocs && uploadedDocsForActiveForm === 0 && (
                      <button
                        type="button"
                        className="button outline-dark"
                        onClick={() => {
                          setDeferDocs(true);
                          goToStep(5);
                        }}
                      >
                        {copy.navButtons.skipDocs} →
                      </button>
                    )}

                    {step < 7 ? (
                      <button
                        type="button"
                        className="button"
                        onClick={() => goToStep(step + 1)}
                      >
                        {step === 6
                          ? copy.navButtons.nextReview
                          : copy.navButtons.next}{" "}
                        →
                      </button>
                    ) : (
                      <button
                        type="button"
                        className="button wizard-submit-btn"
                        disabled={submitState === "submitting"}
                        onClick={handleSubmit}
                      >
                        {submitState === "submitting"
                          ? copy.step7.submittingButton
                          : copy.step7.submitButton}
                      </button>
                    )}
                  </div>
                </div>

                <span className="lead-trust-line">{copy.step7.trustLine}</span>
              </div>
            </>
          )}
        </div>
      </div>
  );
}
