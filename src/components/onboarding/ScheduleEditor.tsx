"use client";

import { useState } from "react";
import type { OnboardingLocaleCopy } from "@/data/onboardingContent";
import {
  computeScheduleMetrics,
  createPresetSchedule,
  DAY_ORDER,
  DayKey,
  TIME_OPTIONS,
  WeeklySchedule,
} from "@/lib/onboardingUtils";

interface ScheduleEditorProps {
  schedule: WeeklySchedule;
  stepCopy: OnboardingLocaleCopy["step6"];
  onChange: (next: WeeklySchedule) => void;
}

export function ScheduleEditor({
  schedule,
  stepCopy,
  onChange,
}: ScheduleEditorProps) {
  const [copiedDay, setCopiedDay] = useState<DayKey | null>(null);
  const metrics = computeScheduleMetrics(schedule);

  const toggleDay = (day: DayKey) => {
    const prev = schedule[day];
    onChange({
      ...schedule,
      [day]: {
        ...prev,
        open: !prev.open,
        slots:
          prev.slots.length > 0
            ? prev.slots
            : [{ start: "09:00", end: "18:00" }],
      },
    });
  };

  const updateSlot = (
    day: DayKey,
    slotIdx: number,
    field: "start" | "end",
    value: string
  ) => {
    const dayEntry = schedule[day];
    const nextSlots = dayEntry.slots.map((s, idx) =>
      idx === slotIdx ? { ...s, [field]: value } : s
    );
    onChange({
      ...schedule,
      [day]: { ...dayEntry, slots: nextSlots },
    });
  };

  const addSplitSlot = (day: DayKey) => {
    const dayEntry = schedule[day];
    if (dayEntry.slots.length >= 2) return;
    onChange({
      ...schedule,
      [day]: {
        ...dayEntry,
        slots: [...dayEntry.slots, { start: "14:00", end: "19:00" }],
      },
    });
  };

  const removeSplitSlot = (day: DayKey, slotIdx: number) => {
    const dayEntry = schedule[day];
    if (dayEntry.slots.length <= 1) return;
    onChange({
      ...schedule,
      [day]: {
        ...dayEntry,
        slots: dayEntry.slots.filter((_, idx) => idx !== slotIdx),
      },
    });
  };

  const copyToWeekdays = (sourceDay: DayKey) => {
    const source = schedule[sourceDay];
    const copiedSlots = source.slots.map((s) => ({ ...s }));
    const next = { ...schedule };
    (["mon", "tue", "wed", "thu", "fri"] as DayKey[]).forEach((d) => {
      next[d] = { open: true, slots: copiedSlots.map((s) => ({ ...s })) };
    });
    onChange(next);
    setCopiedDay(sourceDay);
    setTimeout(() => setCopiedDay(null), 1600);
  };

  const copyToAllOpen = (sourceDay: DayKey) => {
    const source = schedule[sourceDay];
    const copiedSlots = source.slots.map((s) => ({ ...s }));
    const next = { ...schedule };
    DAY_ORDER.forEach((d) => {
      if (next[d].open) {
        next[d] = { open: true, slots: copiedSlots.map((s) => ({ ...s })) };
      }
    });
    onChange(next);
    setCopiedDay(sourceDay);
    setTimeout(() => setCopiedDay(null), 1600);
  };

  return (
    <div className="schedule-editor">
      <p className="wizard-hint">{stepCopy.hint}</p>

      <div className="schedule-presets">
        <span className="schedule-presets-label">{stepCopy.presetsLabel}</span>
        <div className="schedule-preset-pills">
          {stepCopy.presets.map((preset) => (
            <button
              key={preset.id}
              type="button"
              className="schedule-preset-btn"
              onClick={() => onChange(createPresetSchedule(preset.id))}
            >
              {preset.label}
            </button>
          ))}
        </div>
      </div>

      <div className="schedule-rows">
        {DAY_ORDER.map((day) => {
          const entry = schedule[day];
          return (
            <div
              key={day}
              className={`schedule-row${entry.open ? " is-open" : ""}`}
            >
              <div className="schedule-day-col">
                <button
                  type="button"
                  role="switch"
                  aria-checked={entry.open}
                  aria-label={stepCopy.days[day]}
                  className={`schedule-toggle${entry.open ? " is-on" : ""}`}
                  onClick={() => toggleDay(day)}
                >
                  <span className="schedule-toggle-thumb" />
                </button>
                <span className="schedule-day-name">{stepCopy.days[day]}</span>
              </div>

              {entry.open ? (
                <div className="schedule-slots-col">
                  {entry.slots.map((slot, idx) => (
                    <div key={idx} className="schedule-slot-line">
                      <select
                        aria-label={`${stepCopy.days[day]} Start ${idx + 1}`}
                        value={slot.start}
                        onChange={(e) =>
                          updateSlot(day, idx, "start", e.target.value)
                        }
                      >
                        {TIME_OPTIONS.map((t) => (
                          <option key={t} value={t}>
                            {t}
                          </option>
                        ))}
                      </select>
                      <span className="schedule-to">{stepCopy.toLabel}</span>
                      <select
                        aria-label={`${stepCopy.days[day]} End ${idx + 1}`}
                        value={slot.end}
                        onChange={(e) =>
                          updateSlot(day, idx, "end", e.target.value)
                        }
                      >
                        {TIME_OPTIONS.map((t) => (
                          <option key={t} value={t}>
                            {t}
                          </option>
                        ))}
                      </select>

                      {entry.slots.length > 1 && idx > 0 && (
                        <button
                          type="button"
                          className="schedule-slot-remove"
                          aria-label="Remove split slot"
                          onClick={() => removeSplitSlot(day, idx)}
                        >
                          ×
                        </button>
                      )}
                    </div>
                  ))}

                  {entry.slots.length < 2 && (
                    <button
                      type="button"
                      className="schedule-add-split"
                      onClick={() => addSplitSlot(day)}
                    >
                      {stepCopy.addSplitLabel}
                    </button>
                  )}
                </div>
              ) : (
                <div className="schedule-closed-col">{stepCopy.closedLabel}</div>
              )}

              {entry.open && (
                <div className="schedule-copy-col">
                  <button
                    type="button"
                    className="schedule-copy-btn"
                    onClick={() => copyToWeekdays(day)}
                  >
                    {copiedDay === day
                      ? stepCopy.copiedFeedback
                      : stepCopy.copyWeekdaysLabel}
                  </button>
                  <button
                    type="button"
                    className="schedule-copy-btn"
                    onClick={() => copyToAllOpen(day)}
                  >
                    {stepCopy.copyAllOpenLabel}
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div
        className={`schedule-meter ${
          metrics.meetsAmazonTarget ? "is-ready" : "is-warn"
        }`}
      >
        <span className="schedule-meter-dot" aria-hidden="true">
          {metrics.meetsAmazonTarget ? "✓" : "!"}
        </span>
        <span>
          <strong>
            {metrics.openDays} {stepCopy.statusReadyPrefix}
          </strong>{" "}
          · {metrics.weeklyHours}{" "}
          {metrics.meetsAmazonTarget
            ? stepCopy.statusReadySuffix
            : stepCopy.statusWarnSuffix}
        </span>
      </div>
    </div>
  );
}
