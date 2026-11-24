"use client";

import { useRef, useState } from "react";
import type { DocumentDef, OnboardingLocaleCopy } from "@/data/onboardingContent";
import {
  ACCEPTED_FILE_TYPES,
  formatFileSize,
  MAX_FILE_BYTES,
  UploadedDocMeta,
} from "@/lib/onboardingUtils";

interface DocumentUploadRowProps {
  doc: DocumentDef;
  uploaded?: UploadedDocMeta;
  stepCopy: OnboardingLocaleCopy["step4"];
  onUpload: (docId: string, file: File) => void;
  onRemove: (docId: string) => void;
}

export function DocumentUploadRow({
  doc,
  uploaded,
  stepCopy,
  onUpload,
  onRemove,
}: DocumentUploadRowProps) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [dragging, setDragging] = useState(false);
  const [helpOpen, setHelpOpen] = useState(false);
  const [fileError, setFileError] = useState<string | null>(null);

  const handleCandidateFile = (file: File | undefined) => {
    if (!file) return;
    setFileError(null);

    const mimeOk = ACCEPTED_FILE_TYPES.includes(
      file.type as (typeof ACCEPTED_FILE_TYPES)[number]
    );
    const extOk = /\.(pdf|jpe?g|png|webp)$/i.test(file.name);
    if (!mimeOk && !extOk) {
      setFileError(stepCopy.invalidFileType);
      return;
    }
    if (file.size > MAX_FILE_BYTES) {
      setFileError(stepCopy.fileTooLarge);
      return;
    }
    onUpload(doc.id, file);
  };

  return (
    <div
      className={`doc-row${uploaded ? " is-uploaded" : ""}${
        dragging ? " is-dragging" : ""
      }`}
      onDragOver={(e) => {
        e.preventDefault();
        setDragging(true);
      }}
      onDragLeave={() => setDragging(false)}
      onDrop={(e) => {
        e.preventDefault();
        setDragging(false);
        handleCandidateFile(e.dataTransfer.files?.[0]);
      }}
    >
      <input
        ref={inputRef}
        type="file"
        className="doc-file-input"
        accept="application/pdf,image/jpeg,image/png,image/webp"
        onChange={(e) => {
          handleCandidateFile(e.target.files?.[0]);
          e.target.value = "";
        }}
        aria-label={doc.title}
      />

      <div className="doc-row-main">
        <div className="doc-status-icon" aria-hidden="true">
          {uploaded ? (
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="20 6 9 17 4 12" />
            </svg>
          ) : (
            <span className="doc-dashed-circle" />
          )}
        </div>

        <div className="doc-info">
          <div className="doc-title-line">
            <h5>{doc.title}</h5>
          </div>
          <p className="doc-desc">{doc.desc}</p>

          {uploaded ? (
            <div className="doc-uploaded-meta">
              {uploaded.previewUrl ? (
                <img
                  src={uploaded.previewUrl}
                  alt={uploaded.file.name}
                  className="doc-thumb"
                />
              ) : (
                <span className="doc-pdf-badge">PDF</span>
              )}
              <div className="doc-file-details">
                <span className="doc-file-name">{uploaded.file.name}</span>
                <span className="doc-file-size">
                  {formatFileSize(uploaded.file.size)}
                </span>
              </div>
            </div>
          ) : (
            <p className="doc-empty-note">
              {stepCopy.notUploaded} · {stepCopy.formatNote}
            </p>
          )}

          {fileError && (
            <p className="doc-error" role="alert">
              {fileError}
            </p>
          )}

          <div className="doc-help-row">
            <button
              type="button"
              className="doc-help-trigger"
              aria-expanded={helpOpen}
              onClick={() => setHelpOpen((prev) => !prev)}
            >
              <span>{stepCopy.helpToggle}</span>
              <span aria-hidden="true">{helpOpen ? "▲" : "▼"}</span>
            </button>

            {doc.externalLink && (
              <a
                href={doc.externalLink.href}
                target="_blank"
                rel="noopener noreferrer"
                className="doc-ext-link"
              >
                {doc.externalLink.label} ↗
              </a>
            )}
          </div>

          <div
            className="accordion-panel"
            data-open={helpOpen ? "true" : "false"}
          >
            <div className="accordion-panel-inner">
              <div className="doc-help-drawer">
                <strong>{doc.helpTitle}</strong>
                <ul>
                  {doc.helpSteps.map((s) => (
                    <li key={s}>{s}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="doc-actions">
          <button
            type="button"
            className="doc-upload-btn"
            onClick={() => inputRef.current?.click()}
          >
            {uploaded ? stepCopy.replaceFile : stepCopy.chooseFile}
          </button>
          {uploaded && (
            <button
              type="button"
              className="doc-remove-btn"
              onClick={() => onRemove(doc.id)}
            >
              {stepCopy.removeFile}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
