"use client";

import React, { useState } from "react";
import { CalendarDays, ChevronDown, PencilLine, Plus } from "lucide-react";

type ProfessionalProfileData = {
  yearsOfExperience: string;
  rightToWorkUk: string;
  professionalSummary: string;
  employerName: string;
  jobTitle: string;
  startDate: string;
  endDate: string;
  responsibilities: string;
  currentAvailability: string;
  preferredRegions: string;
  preferredCities: string;
  maximumTravelDistance: string;
  skills: string[];
  specialisms: string[];
  workPreferences: string[];
  preferredWorkType: string[];
  preferredShift: string[];
};

const skillOptions = [
  "Personal Care",
  "Medication Administration",
  "Companionship",
  "Moving & Handling",
  "Live-in Care",
  "First Aid",
  "Catheter Care",
  "PEG Feeding",
  "Hoist Handling",
  "Record Keeping",
];

const specialismOptions = [
  "Dementia Care",
  "Alzheimer's Care",
  "Parkinson's Care",
  "Stroke Recovery",
  "Diabetes Care",
  "Palliative Care",
  "Mental Health Support",
  "Learning Disabilities",
  "Brain Injury Support",
  "Autism Support",
  "Elderly Care",
  "End of Life Care",
];

const workPreferenceOptions = [
  "Full-Time",
  "Part-Time",
  "Temporary",
  "Contract",
  "Live-in Care",
  "Day Shift",
  "Night Shift",
  "Weekend Only",
  "Flexible Hours",
];

const preferredWorkTypeOptions = [
  "Live-in Care",
  "Home Care",
  "Residential Care",
  "Nursing Home",
  "Hospital Care",
];

const preferredShiftOptions = [
  "Day Shift",
  "Night Shift",
  "Weekend",
  "Flexible",
  "Rotational",
];

const availabilityOptions = ["Immediate", "1 Week Notice", "2 Weeks Notice", "1 Month Notice"];
const regionOptions = ["London", "Manchester", "Birmingham", "Leeds", "Bristol", "Liverpool"];
const cityOptions = ["London", "Leicester", "Reading", "Leeds", "Nottingham", "Manchester"];
const travelDistanceOptions = ["5 miles", "10 miles", "25 miles", "50 miles", "Nationwide"];

const initialFormData: ProfessionalProfileData = {
  yearsOfExperience: "",
  rightToWorkUk: "Yes",
  professionalSummary: "",
  employerName: "",
  jobTitle: "",
  startDate: "",
  endDate: "",
  responsibilities: "",
  currentAvailability: "",
  preferredRegions: "",
  preferredCities: "",
  maximumTravelDistance: "",
  skills: [],
  specialisms: [],
  workPreferences: [],
  preferredWorkType: [],
  preferredShift: [],
};

function CardHeader({
  title,
  showPlus = false,
}: {
  title: string;
  showPlus?: boolean;
}) {
  return (
    <div className="inline-flex w-full items-center gap-4">
      <h2 className="flex-1 text-xl font-semibold leading-6 text-slate-800">{title}</h2>
      <button
        type="button"
        aria-label={`Edit ${title}`}
        className="inline-flex h-8 w-8 items-center justify-center rounded-full text-slate-800 transition hover:bg-white/70"
      >
        <PencilLine className="h-5 w-5" strokeWidth={1.7} />
      </button>
      {showPlus ? (
        <button
          type="button"
          aria-label={`Add ${title}`}
          className="inline-flex h-8 w-8 items-center justify-center rounded-full text-slate-800 transition hover:bg-white/70"
        >
          <Plus className="h-5 w-5" strokeWidth={1.7} />
        </button>
      ) : null}
    </div>
  );
}

function FieldLabel({ children }: { children: React.ReactNode }) {
  return <span className="text-base font-medium leading-5 text-slate-800">{children}</span>;
}

function TextField({
  label,
  value,
  placeholder,
  onChange,
}: {
  label: string;
  value: string;
  placeholder: string;
  onChange: (value: string) => void;
}) {
  return (
    <label className="flex w-full flex-col gap-2">
      <FieldLabel>{label}</FieldLabel>
      <input
        type="text"
        value={value}
        placeholder={placeholder}
        onChange={(event) => onChange(event.target.value)}
        className="h-14 rounded-md border border-neutral-400 bg-white/70 px-4 text-base text-slate-700 outline-none transition placeholder:text-gray-500 focus:border-cyan-700"
      />
    </label>
  );
}

function TextAreaField({
  label,
  value,
  placeholder,
  rows = 4,
  onChange,
}: {
  label: string;
  value: string;
  placeholder: string;
  rows?: number;
  onChange: (value: string) => void;
}) {
  return (
    <label className="flex w-full flex-col gap-3">
      <FieldLabel>{label}</FieldLabel>
      <textarea
        value={value}
        rows={rows}
        placeholder={placeholder}
        onChange={(event) => onChange(event.target.value)}
        className="w-full rounded-lg border border-neutral-400 bg-white/70 px-4 py-4 text-base text-slate-700 outline-none transition placeholder:text-gray-500 focus:border-cyan-700"
      />
    </label>
  );
}

function SelectField({
  label,
  value,
  placeholder,
  options,
  onChange,
}: {
  label: string;
  value: string;
  placeholder: string;
  options: string[];
  onChange: (value: string) => void;
}) {
  return (
    <label className="flex w-full flex-col gap-2">
      <FieldLabel>{label}</FieldLabel>
      <div className="relative">
        <select
          value={value}
          onChange={(event) => onChange(event.target.value)}
          className={`h-14 w-full appearance-none rounded-md border border-neutral-400 bg-white/70 px-4 pr-12 text-base outline-none transition focus:border-cyan-700 ${
            value ? "text-slate-700" : "text-gray-500"
          }`}
        >
          <option value="">{placeholder}</option>
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        <ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-500" />
      </div>
    </label>
  );
}

function DateField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <label className="flex w-full flex-col gap-2">
      <FieldLabel>{label}</FieldLabel>
      <div className="relative">
        <input
          type="text"
          value={value}
          placeholder="DD/MM/YYYY"
          onChange={(event) => onChange(event.target.value)}
          className="h-14 w-full rounded-md border border-neutral-400 bg-white/70 px-4 pr-12 text-base text-slate-700 outline-none transition placeholder:text-gray-500 focus:border-cyan-700"
        />
        <CalendarDays className="pointer-events-none absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-500" strokeWidth={1.7} />
      </div>
    </label>
  );
}

function PillGroup({
  options,
  values,
  onToggle,
}: {
  options: string[];
  values: string[];
  onToggle: (option: string) => void;
}) {
  return (
    <div className="flex flex-wrap items-center gap-3">
      {options.map((option) => {
        const active = values.includes(option);
        return (
          <button
            key={option}
            type="button"
            onClick={() => onToggle(option)}
            className={`rounded-lg border px-4 py-2 text-sm leading-5 transition ${
              active
                ? "border-cyan-700 bg-cyan-700 text-white"
                : "border-neutral-400 bg-white/70 text-gray-500 hover:border-cyan-700 hover:text-cyan-700"
            }`}
          >
            {option}
          </button>
        );
      })}
    </div>
  );
}

function CheckboxGroup({
  options,
  values,
  onToggle,
}: {
  options: string[];
  values: string[];
  onToggle: (option: string) => void;
}) {
  return (
    <div className="flex flex-col gap-3 pt-1">
      {options.map((option) => (
        <label key={option} className="inline-flex items-center gap-2 text-base text-gray-500">
          <input
            type="checkbox"
            checked={values.includes(option)}
            onChange={() => onToggle(option)}
            className="h-4 w-4 rounded border-neutral-400 accent-cyan-700"
          />
          <span>{option}</span>
        </label>
      ))}
    </div>
  );
}

export function ProfessionalInformationPage() {
  const [formData, setFormData] = useState<ProfessionalProfileData>(initialFormData);

  const updateField = <K extends keyof ProfessionalProfileData>(
    field: K,
    value: ProfessionalProfileData[K]
  ) => {
    setFormData((current) => ({ ...current, [field]: value }));
  };

  const toggleMultiValue = (
    field: "skills" | "specialisms" | "workPreferences" | "preferredWorkType" | "preferredShift",
    value: string
  ) => {
    setFormData((current) => {
      const values = current[field];
      return {
        ...current,
        [field]: values.includes(value)
          ? values.filter((item) => item !== value)
          : [...values, value],
      };
    });
  };

  return (
    <div className="min-h-screen bg-white px-6 py-6 sm:px-8 xl:px-10">
      <div className="flex flex-col gap-4">
        <section className="rounded-2xl bg-cyan-700/5 p-6">
          <CardHeader title="About Me" />
          <div className="mt-5 flex flex-col gap-5">
            <div className="grid gap-5 lg:grid-cols-2">
              <TextField
                label="Years of Experience"
                value={formData.yearsOfExperience}
                placeholder="Enter your experience years"
                onChange={(value) => updateField("yearsOfExperience", value)}
              />
              <div className="flex flex-col gap-2">
                <FieldLabel>Right to work in the UK</FieldLabel>
                <div className="flex h-14 items-center gap-6">
                  {["Yes", "No"].map((option) => (
                    <label key={option} className="inline-flex items-center gap-2 text-base text-gray-500">
                      <input
                        type="radio"
                        name="rightToWorkUk"
                        checked={formData.rightToWorkUk === option}
                        onChange={() => updateField("rightToWorkUk", option)}
                        className="h-4 w-4 border-neutral-400 accent-cyan-700"
                      />
                      <span>{option}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
            <TextAreaField
              label="Professional Summary"
              value={formData.professionalSummary}
              placeholder="Write a short summary about your experience, skills, and the type of care services you provide."
              onChange={(value) => updateField("professionalSummary", value)}
            />
          </div>
        </section>

        <section className="rounded-2xl bg-cyan-700/5 p-6">
          <CardHeader title="Work Experience" />
          <div className="mt-5 flex flex-col gap-5">
            <div className="grid gap-5 lg:grid-cols-2">
              <TextField
                label="Employer Name"
                value={formData.employerName}
                placeholder="e.g., ABC Care Ltd."
                onChange={(value) => updateField("employerName", value)}
              />
              <TextField
                label="Job Title"
                value={formData.jobTitle}
                placeholder="e.g., Senior Care Assistant"
                onChange={(value) => updateField("jobTitle", value)}
              />
            </div>
            <div className="grid gap-5 lg:grid-cols-2">
              <DateField
                label="Start Date"
                value={formData.startDate}
                onChange={(value) => updateField("startDate", value)}
              />
              <DateField
                label="End Date"
                value={formData.endDate}
                onChange={(value) => updateField("endDate", value)}
              />
            </div>
            <TextAreaField
              label="Responsibilities"
              value={formData.responsibilities}
              placeholder="Describe your role..."
              rows={3}
              onChange={(value) => updateField("responsibilities", value)}
            />
          </div>
        </section>

        <section className="rounded-2xl bg-cyan-700/5 p-6">
          <CardHeader title="Skills" showPlus />
          <div className="mt-5">
            <PillGroup
              options={skillOptions}
              values={formData.skills}
              onToggle={(value) => toggleMultiValue("skills", value)}
            />
          </div>
        </section>

        <section className="rounded-2xl bg-cyan-700/5 p-6">
          <CardHeader title="Specialisms" showPlus />
          <div className="mt-5">
            <PillGroup
              options={specialismOptions}
              values={formData.specialisms}
              onToggle={(value) => toggleMultiValue("specialisms", value)}
            />
          </div>
        </section>

        <section className="rounded-2xl bg-cyan-700/5 p-6">
          <CardHeader title="Work Preferences" showPlus />
          <div className="mt-5">
            <PillGroup
              options={workPreferenceOptions}
              values={formData.workPreferences}
              onToggle={(value) => toggleMultiValue("workPreferences", value)}
            />
          </div>
        </section>

        <section className="rounded-2xl bg-cyan-700/5 p-6">
          <CardHeader title="Availability & Coverage" />
          <div className="mt-5 flex flex-col gap-5">
            <div className="grid gap-5 lg:grid-cols-2">
              <SelectField
                label="Current Availability"
                value={formData.currentAvailability}
                placeholder="Select your availability"
                options={availabilityOptions}
                onChange={(value) => updateField("currentAvailability", value)}
              />
              <SelectField
                label="Preferred Regions"
                value={formData.preferredRegions}
                placeholder="Select preferred regions"
                options={regionOptions}
                onChange={(value) => updateField("preferredRegions", value)}
              />
            </div>
            <div className="grid gap-5 lg:grid-cols-2">
              <SelectField
                label="Preferred Cities"
                value={formData.preferredCities}
                placeholder="Select preferred cities"
                options={cityOptions}
                onChange={(value) => updateField("preferredCities", value)}
              />
              <SelectField
                label="Maximum Travel Distance"
                value={formData.maximumTravelDistance}
                placeholder="Select maximum travel distance"
                options={travelDistanceOptions}
                onChange={(value) => updateField("maximumTravelDistance", value)}
              />
            </div>
            <div className="grid gap-8 lg:grid-cols-2">
              <div className="flex flex-col gap-2">
                <FieldLabel>Preferred Work Type</FieldLabel>
                <CheckboxGroup
                  options={preferredWorkTypeOptions}
                  values={formData.preferredWorkType}
                  onToggle={(value) => toggleMultiValue("preferredWorkType", value)}
                />
              </div>
              <div className="flex flex-col gap-2">
                <FieldLabel>Preferred Shift</FieldLabel>
                <CheckboxGroup
                  options={preferredShiftOptions}
                  values={formData.preferredShift}
                  onToggle={(value) => toggleMultiValue("preferredShift", value)}
                />
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
