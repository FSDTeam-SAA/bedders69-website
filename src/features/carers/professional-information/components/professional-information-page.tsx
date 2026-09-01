"use client";

import React, { useState, useEffect, useRef } from "react";
import { CalendarDays, ChevronDown, PencilLine, Plus, Loader2, CheckCircle2, AlertCircle, Save, X } from "lucide-react";

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

type SectionKey =
  | "aboutMe"
  | "workExperience"
  | "skills"
  | "specialisms"
  | "workPreferences"
  | "availability";

function CardHeader({
  title,
  showPlus = false,
  isEditing = false,
  onEdit,
  onAdd,
}: {
  title: string;
  showPlus?: boolean;
  isEditing?: boolean;
  onEdit?: () => void;
  onAdd?: () => void;
}) {
  return (
    <div className="inline-flex w-full items-center gap-4">
      <h2 className="flex-1 text-xl font-semibold leading-6 text-slate-800">{title}</h2>
      <button
        type="button"
        aria-label={`Edit ${title}`}
        onClick={onEdit}
        title={isEditing ? "Section unlocked for editing" : "Click pencil icon to edit section"}
        className={`inline-flex h-8 w-8 items-center justify-center rounded-full transition active:scale-95 ${
          isEditing
            ? "bg-cyan-700 text-white shadow-xs"
            : "text-slate-800 hover:bg-cyan-700/10 hover:text-cyan-700"
        }`}
      >
        <PencilLine className="h-5 w-5" strokeWidth={1.7} />
      </button>
      {showPlus ? (
        <button
          type="button"
          aria-label={`Add ${title}`}
          onClick={onAdd}
          title={`Add ${title}`}
          className="inline-flex h-8 w-8 items-center justify-center rounded-full text-slate-800 transition hover:bg-cyan-700/10 hover:text-cyan-700 active:scale-95"
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
  disabled = false,
  inputRef,
  onChange,
}: {
  label: string;
  value: string;
  placeholder: string;
  disabled?: boolean;
  inputRef?: React.RefObject<HTMLInputElement | null>;
  onChange: (value: string) => void;
}) {
  return (
    <label className="flex w-full flex-col gap-2">
      <FieldLabel>{label}</FieldLabel>
      <input
        ref={inputRef}
        type="text"
        value={value}
        disabled={disabled}
        placeholder={placeholder}
        onChange={(event) => onChange(event.target.value)}
        className="h-14 rounded-md border border-neutral-400 bg-white/70 px-4 text-base text-slate-700 outline-none transition placeholder:text-gray-500 focus:border-cyan-700 disabled:cursor-not-allowed disabled:bg-gray-100/70 disabled:text-gray-500 disabled:border-neutral-300"
      />
    </label>
  );
}

function TextAreaField({
  label,
  value,
  placeholder,
  disabled = false,
  rows = 4,
  onChange,
}: {
  label: string;
  value: string;
  placeholder: string;
  disabled?: boolean;
  rows?: number;
  onChange: (value: string) => void;
}) {
  return (
    <label className="flex w-full flex-col gap-3">
      <FieldLabel>{label}</FieldLabel>
      <textarea
        value={value}
        rows={rows}
        disabled={disabled}
        placeholder={placeholder}
        onChange={(event) => onChange(event.target.value)}
        className="w-full rounded-lg border border-neutral-400 bg-white/70 px-4 py-4 text-base text-slate-700 outline-none transition placeholder:text-gray-500 focus:border-cyan-700 disabled:cursor-not-allowed disabled:bg-gray-100/70 disabled:text-gray-500 disabled:border-neutral-300"
      />
    </label>
  );
}

function SelectField({
  label,
  value,
  placeholder,
  options,
  disabled = false,
  selectRef,
  onChange,
}: {
  label: string;
  value: string;
  placeholder: string;
  options: string[];
  disabled?: boolean;
  selectRef?: React.RefObject<HTMLSelectElement | null>;
  onChange: (value: string) => void;
}) {
  return (
    <label className="flex w-full flex-col gap-2">
      <FieldLabel>{label}</FieldLabel>
      <div className="relative">
        <select
          ref={selectRef}
          value={value}
          disabled={disabled}
          onChange={(event) => onChange(event.target.value)}
          className={`h-14 w-full appearance-none rounded-md border border-neutral-400 bg-white/70 px-4 pr-12 text-base outline-none transition focus:border-cyan-700 disabled:cursor-not-allowed disabled:bg-gray-100/70 disabled:text-gray-500 disabled:border-neutral-300 ${
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
  disabled = false,
  onChange,
}: {
  label: string;
  value: string;
  disabled?: boolean;
  onChange: (value: string) => void;
}) {
  return (
    <label className="flex w-full flex-col gap-2">
      <FieldLabel>{label}</FieldLabel>
      <div className="relative">
        <input
          type="date"
          value={value}
          disabled={disabled}
          onChange={(event) => onChange(event.target.value)}
          className="h-14 w-full rounded-md border border-neutral-400 bg-white/70 px-4 pr-12 text-base text-slate-700 outline-none transition placeholder:text-gray-500 focus:border-cyan-700 disabled:cursor-not-allowed disabled:bg-gray-100/70 disabled:text-gray-500 disabled:border-neutral-300"
        />
      </div>
    </label>
  );
}

function PillGroup({
  options,
  values,
  disabled = false,
  onToggle,
}: {
  options: string[];
  values: string[];
  disabled?: boolean;
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
            disabled={disabled}
            onClick={() => onToggle(option)}
            className={`rounded-lg border px-4 py-2 text-sm leading-5 transition ${
              active
                ? "border-cyan-700 bg-cyan-700 text-white"
                : "border-neutral-400 bg-white/70 text-gray-500 hover:border-cyan-700 hover:text-cyan-700"
            } disabled:cursor-not-allowed disabled:opacity-60`}
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
  disabled = false,
  onToggle,
}: {
  options: string[];
  values: string[];
  disabled?: boolean;
  onToggle: (option: string) => void;
}) {
  return (
    <div className="flex flex-col gap-3 pt-1">
      {options.map((option) => (
        <label key={option} className={`inline-flex items-center gap-2 text-base text-gray-500 ${disabled ? "cursor-not-allowed opacity-60" : ""}`}>
          <input
            type="checkbox"
            checked={values.includes(option)}
            disabled={disabled}
            onChange={() => onToggle(option)}
            className="h-4 w-4 rounded border-neutral-400 accent-cyan-700 disabled:cursor-not-allowed"
          />
          <span>{option}</span>
        </label>
      ))}
    </div>
  );
}

export function ProfessionalInformationPage() {
  const [formData, setFormData] = useState<ProfessionalProfileData>(initialFormData);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [notice, setNotice] = useState("");
  const [error, setError] = useState("");

  // Section editing state - default all false (disabled)
  const [editableSections, setEditableSections] = useState<Record<SectionKey, boolean>>({
    aboutMe: false,
    workExperience: false,
    skills: false,
    specialisms: false,
    workPreferences: false,
    availability: false,
  });

  const toggleSectionEdit = (section: SectionKey) => {
    setEditableSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  // Custom added items states
  const [customSkills, setCustomSkills] = useState<string[]>([]);
  const [customSpecialisms, setCustomSpecialisms] = useState<string[]>([]);
  const [customWorkPreferences, setCustomWorkPreferences] = useState<string[]>([]);

  // Inline add input toggles & values
  const [showAddSkill, setShowAddSkill] = useState(false);
  const [newSkillInput, setNewSkillInput] = useState("");

  const [showAddSpecialism, setShowAddSpecialism] = useState(false);
  const [newSpecialismInput, setNewSpecialismInput] = useState("");

  const [showAddWorkPreference, setShowAddWorkPreference] = useState(false);
  const [newWorkPreferenceInput, setNewWorkPreferenceInput] = useState("");

  // Refs for scrolling / focusing sections
  const yearsExpRef = useRef<HTMLInputElement>(null);
  const employerNameRef = useRef<HTMLInputElement>(null);
  const availabilityRef = useRef<HTMLSelectElement>(null);

  useEffect(() => {
    async function fetchProfile() {
      try {
        setLoading(true);
        setError("");
        const response = await fetch("/api/care/profile", { cache: "no-store" });
        const body = await response.json();
        if (!response.ok) {
          throw new Error(body?.message || "Failed to load profile data");
        }
        const profile = body.data ?? body;
        const exp = Array.isArray(profile.experience) && profile.experience.length > 0 ? profile.experience[0] : {};

        const fetchedSkills = Array.isArray(profile.skills) ? profile.skills : [];
        const fetchedSpecialisms = Array.isArray(profile.specialisms) ? profile.specialisms : [];
        const fetchedWorkPreferences = Array.isArray(profile.workPreferences) ? profile.workPreferences : [];

        // Extract any custom skills/specialisms/preferences from backend that aren't in defaults
        const extraSkills = fetchedSkills.filter((s: string) => !skillOptions.includes(s));
        const extraSpecialisms = fetchedSpecialisms.filter((s: string) => !specialismOptions.includes(s));
        const extraPreferences = fetchedWorkPreferences.filter((s: string) => !workPreferenceOptions.includes(s));

        setCustomSkills(extraSkills);
        setCustomSpecialisms(extraSpecialisms);
        setCustomWorkPreferences(extraPreferences);

        setFormData({
          yearsOfExperience: profile.yearsOfExperience !== undefined && profile.yearsOfExperience !== null ? String(profile.yearsOfExperience) : "",
          rightToWorkUk: profile.rightToWorkInUk === false ? "No" : "Yes",
          professionalSummary: profile.professionalSummary || "",
          employerName: exp.companyName || "",
          jobTitle: exp.jobTitle || "",
          startDate: exp.startDate ? String(exp.startDate).slice(0, 10) : "",
          endDate: exp.endDate ? String(exp.endDate).slice(0, 10) : "",
          responsibilities: exp.responsibilities || "",
          currentAvailability: profile.currentAvailability || "",
          preferredRegions: profile.preferredRegions || "",
          preferredCities: profile.preferredCities || "",
          maximumTravelDistance: profile.maximumTravelDistance || "",
          skills: fetchedSkills,
          specialisms: fetchedSpecialisms,
          workPreferences: fetchedWorkPreferences,
          preferredWorkType: Array.isArray(profile.preferredWorkType) ? profile.preferredWorkType : [],
          preferredShift: Array.isArray(profile.preferredShift) ? profile.preferredShift : [],
        });
      } catch (e) {
        setError(e instanceof Error ? e.message : "Unable to load profile data");
      } finally {
        setLoading(false);
      }
    }

    fetchProfile();
  }, []);

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

  // Add custom Handlers
  const handleAddSkill = () => {
    const trimmed = newSkillInput.trim();
    if (!trimmed) return;
    if (!customSkills.includes(trimmed) && !skillOptions.includes(trimmed)) {
      setCustomSkills((prev) => [...prev, trimmed]);
    }
    if (!formData.skills.includes(trimmed)) {
      setFormData((prev) => ({
        ...prev,
        skills: [...prev.skills, trimmed],
      }));
    }
    setNewSkillInput("");
    setShowAddSkill(false);
  };

  const handleAddSpecialism = () => {
    const trimmed = newSpecialismInput.trim();
    if (!trimmed) return;
    if (!customSpecialisms.includes(trimmed) && !specialismOptions.includes(trimmed)) {
      setCustomSpecialisms((prev) => [...prev, trimmed]);
    }
    if (!formData.specialisms.includes(trimmed)) {
      setFormData((prev) => ({
        ...prev,
        specialisms: [...prev.specialisms, trimmed],
      }));
    }
    setNewSpecialismInput("");
    setShowAddSpecialism(false);
  };

  const handleAddWorkPreference = () => {
    const trimmed = newWorkPreferenceInput.trim();
    if (!trimmed) return;
    if (!customWorkPreferences.includes(trimmed) && !workPreferenceOptions.includes(trimmed)) {
      setCustomWorkPreferences((prev) => [...prev, trimmed]);
    }
    if (!formData.workPreferences.includes(trimmed)) {
      setFormData((prev) => ({
        ...prev,
        workPreferences: [...prev.workPreferences, trimmed],
      }));
    }
    setNewWorkPreferenceInput("");
    setShowAddWorkPreference(false);
  };

  async function handleSave() {
    setSaving(true);
    setError("");
    setNotice("");

    try {
      const payload: Record<string, any> = {
        yearsOfExperience: formData.yearsOfExperience ? Number(formData.yearsOfExperience) : 0,
        rightToWorkInUk: formData.rightToWorkUk === "Yes",
        professionalSummary: formData.professionalSummary,
        currentAvailability: formData.currentAvailability,
        preferredRegions: formData.preferredRegions,
        preferredCities: formData.preferredCities,
        maximumTravelDistance: formData.maximumTravelDistance,
        skills: formData.skills,
        specialisms: formData.specialisms,
        workPreferences: formData.workPreferences,
        preferredWorkType: formData.preferredWorkType,
        preferredShift: formData.preferredShift,
      };

      if (
        formData.employerName ||
        formData.jobTitle ||
        formData.startDate ||
        formData.endDate ||
        formData.responsibilities
      ) {
        payload.experience = [
          {
            companyName: formData.employerName,
            jobTitle: formData.jobTitle,
            startDate: formData.startDate || undefined,
            endDate: formData.endDate || undefined,
            responsibilities: formData.responsibilities,
          },
        ];
      }

      const response = await fetch("/api/care/profile", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const body = await response.json();
      if (!response.ok) {
        throw new Error(body?.message || "Failed to update professional profile");
      }

      setNotice("Professional profile updated successfully!");
      // Lock all sections back after saving
      setEditableSections({
        aboutMe: false,
        workExperience: false,
        skills: false,
        specialisms: false,
        workPreferences: false,
        availability: false,
      });
    } catch (e) {
      setError(e instanceof Error ? e.message : "Unable to update professional profile");
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center bg-white px-6 py-12">
        <div className="flex items-center gap-3 text-cyan-700">
          <Loader2 className="h-6 w-6 animate-spin" />
          <span className="text-lg font-medium">Loading professional profile...</span>
        </div>
      </div>
    );
  }

  const allSkillOptions = [...skillOptions, ...customSkills.filter((s) => !skillOptions.includes(s))];
  const allSpecialismOptions = [...specialismOptions, ...customSpecialisms.filter((s) => !specialismOptions.includes(s))];
  const allWorkPreferenceOptions = [...workPreferenceOptions, ...customWorkPreferences.filter((s) => !workPreferenceOptions.includes(s))];

  return (
    <div className="min-h-screen bg-white px-6 py-6 sm:px-8 xl:px-10">
      <div className="flex flex-col gap-4">
        {notice && (
          <div className="flex items-center gap-3 rounded-xl border border-emerald-300 bg-emerald-50 p-4 text-emerald-800">
            <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-600" />
            <span className="text-base font-medium">{notice}</span>
          </div>
        )}

        {error && (
          <div className="flex items-center gap-3 rounded-xl border border-rose-300 bg-rose-50 p-4 text-rose-800">
            <AlertCircle className="h-5 w-5 shrink-0 text-rose-600" />
            <span className="text-base font-medium">{error}</span>
          </div>
        )}

        {/* Section 1: About Me */}
        <section className="rounded-2xl bg-cyan-700/5 p-6">
          <CardHeader
            title="About Me"
            isEditing={editableSections.aboutMe}
            onEdit={() => {
              toggleSectionEdit("aboutMe");
              setTimeout(() => yearsExpRef.current?.focus(), 50);
            }}
          />
          <div className="mt-5 flex flex-col gap-5">
            <div className="grid gap-5 lg:grid-cols-2">
              <TextField
                label="Years of Experience"
                value={formData.yearsOfExperience}
                disabled={!editableSections.aboutMe}
                placeholder="Enter your experience years"
                inputRef={yearsExpRef}
                onChange={(value) => updateField("yearsOfExperience", value)}
              />
              <div className="flex flex-col gap-2">
                <FieldLabel>Right to work in the UK</FieldLabel>
                <div className="flex h-14 items-center gap-6">
                  {["Yes", "No"].map((option) => (
                    <label key={option} className={`inline-flex items-center gap-2 text-base text-gray-500 ${!editableSections.aboutMe ? "cursor-not-allowed opacity-60" : ""}`}>
                      <input
                        type="radio"
                        name="rightToWorkUk"
                        disabled={!editableSections.aboutMe}
                        checked={formData.rightToWorkUk === option}
                        onChange={() => updateField("rightToWorkUk", option)}
                        className="h-4 w-4 border-neutral-400 accent-cyan-700 disabled:cursor-not-allowed"
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
              disabled={!editableSections.aboutMe}
              placeholder="Write a short summary about your experience, skills, and the type of care services you provide."
              onChange={(value) => updateField("professionalSummary", value)}
            />
          </div>
        </section>

        {/* Section 2: Work Experience */}
        <section className="rounded-2xl bg-cyan-700/5 p-6">
          <CardHeader
            title="Work Experience"
            isEditing={editableSections.workExperience}
            onEdit={() => {
              toggleSectionEdit("workExperience");
              setTimeout(() => employerNameRef.current?.focus(), 50);
            }}
          />
          <div className="mt-5 flex flex-col gap-5">
            <div className="grid gap-5 lg:grid-cols-2">
              <TextField
                label="Employer Name"
                value={formData.employerName}
                disabled={!editableSections.workExperience}
                placeholder="e.g., ABC Care Ltd."
                inputRef={employerNameRef}
                onChange={(value) => updateField("employerName", value)}
              />
              <TextField
                label="Job Title"
                value={formData.jobTitle}
                disabled={!editableSections.workExperience}
                placeholder="e.g., Senior Care Assistant"
                onChange={(value) => updateField("jobTitle", value)}
              />
            </div>
            <div className="grid gap-5 lg:grid-cols-2">
              <DateField
                label="Start Date"
                value={formData.startDate}
                disabled={!editableSections.workExperience}
                onChange={(value) => updateField("startDate", value)}
              />
              <DateField
                label="End Date"
                value={formData.endDate}
                disabled={!editableSections.workExperience}
                onChange={(value) => updateField("endDate", value)}
              />
            </div>
            <TextAreaField
              label="Responsibilities"
              value={formData.responsibilities}
              disabled={!editableSections.workExperience}
              placeholder="Describe your role..."
              rows={3}
              onChange={(value) => updateField("responsibilities", value)}
            />
          </div>
        </section>

        {/* Section 3: Skills */}
        <section className="rounded-2xl bg-cyan-700/5 p-6">
          <CardHeader
            title="Skills"
            showPlus
            isEditing={editableSections.skills}
            onEdit={() => toggleSectionEdit("skills")}
            onAdd={() => {
              setEditableSections((prev) => ({ ...prev, skills: true }));
              setShowAddSkill(true);
            }}
          />
          <div className="mt-5">
            {showAddSkill && (
              <div className="mb-4 flex items-center gap-3 rounded-xl border border-cyan-300 bg-cyan-50/70 p-3 shadow-xs">
                <input
                  type="text"
                  value={newSkillInput}
                  placeholder="Type new skill name (e.g. Tracheostomy Care)..."
                  onChange={(e) => setNewSkillInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      handleAddSkill();
                    }
                  }}
                  className="h-10 flex-1 rounded-lg border border-neutral-300 bg-white px-3 text-sm text-slate-700 outline-none focus:border-cyan-700"
                  autoFocus
                />
                <button
                  type="button"
                  onClick={handleAddSkill}
                  className="h-10 rounded-lg bg-cyan-700 px-4 text-sm font-semibold text-white transition hover:bg-cyan-800"
                >
                  Add Skill
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowAddSkill(false);
                    setNewSkillInput("");
                  }}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-neutral-300 bg-white text-slate-500 transition hover:bg-gray-100"
                  aria-label="Close"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            )}
            <PillGroup
              options={allSkillOptions}
              values={formData.skills}
              disabled={!editableSections.skills}
              onToggle={(value) => toggleMultiValue("skills", value)}
            />
          </div>
        </section>

        {/* Section 4: Specialisms */}
        <section className="rounded-2xl bg-cyan-700/5 p-6">
          <CardHeader
            title="Specialisms"
            showPlus
            isEditing={editableSections.specialisms}
            onEdit={() => toggleSectionEdit("specialisms")}
            onAdd={() => {
              setEditableSections((prev) => ({ ...prev, specialisms: true }));
              setShowAddSpecialism(true);
            }}
          />
          <div className="mt-5">
            {showAddSpecialism && (
              <div className="mb-4 flex items-center gap-3 rounded-xl border border-cyan-300 bg-cyan-50/70 p-3 shadow-xs">
                <input
                  type="text"
                  value={newSpecialismInput}
                  placeholder="Type new specialism name (e.g. Pediatric Care)..."
                  onChange={(e) => setNewSpecialismInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      handleAddSpecialism();
                    }
                  }}
                  className="h-10 flex-1 rounded-lg border border-neutral-300 bg-white px-3 text-sm text-slate-700 outline-none focus:border-cyan-700"
                  autoFocus
                />
                <button
                  type="button"
                  onClick={handleAddSpecialism}
                  className="h-10 rounded-lg bg-cyan-700 px-4 text-sm font-semibold text-white transition hover:bg-cyan-800"
                >
                  Add Specialism
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowAddSpecialism(false);
                    setNewSpecialismInput("");
                  }}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-neutral-300 bg-white text-slate-500 transition hover:bg-gray-100"
                  aria-label="Close"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            )}
            <PillGroup
              options={allSpecialismOptions}
              values={formData.specialisms}
              disabled={!editableSections.specialisms}
              onToggle={(value) => toggleMultiValue("specialisms", value)}
            />
          </div>
        </section>

        {/* Section 5: Work Preferences */}
        <section className="rounded-2xl bg-cyan-700/5 p-6">
          <CardHeader
            title="Work Preferences"
            showPlus
            isEditing={editableSections.workPreferences}
            onEdit={() => toggleSectionEdit("workPreferences")}
            onAdd={() => {
              setEditableSections((prev) => ({ ...prev, workPreferences: true }));
              setShowAddWorkPreference(true);
            }}
          />
          <div className="mt-5">
            {showAddWorkPreference && (
              <div className="mb-4 flex items-center gap-3 rounded-xl border border-cyan-300 bg-cyan-50/70 p-3 shadow-xs">
                <input
                  type="text"
                  value={newWorkPreferenceInput}
                  placeholder="Type new work preference (e.g. Night Shifts Only)..."
                  onChange={(e) => setNewWorkPreferenceInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      handleAddWorkPreference();
                    }
                  }}
                  className="h-10 flex-1 rounded-lg border border-neutral-300 bg-white px-3 text-sm text-slate-700 outline-none focus:border-cyan-700"
                  autoFocus
                />
                <button
                  type="button"
                  onClick={handleAddWorkPreference}
                  className="h-10 rounded-lg bg-cyan-700 px-4 text-sm font-semibold text-white transition hover:bg-cyan-800"
                >
                  Add Preference
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowAddWorkPreference(false);
                    setNewWorkPreferenceInput("");
                  }}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-neutral-300 bg-white text-slate-500 transition hover:bg-gray-100"
                  aria-label="Close"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            )}
            <PillGroup
              options={allWorkPreferenceOptions}
              values={formData.workPreferences}
              disabled={!editableSections.workPreferences}
              onToggle={(value) => toggleMultiValue("workPreferences", value)}
            />
          </div>
        </section>

        {/* Section 6: Availability & Coverage */}
        <section className="rounded-2xl bg-cyan-700/5 p-6">
          <CardHeader
            title="Availability & Coverage"
            isEditing={editableSections.availability}
            onEdit={() => {
              toggleSectionEdit("availability");
              setTimeout(() => availabilityRef.current?.focus(), 50);
            }}
          />
          <div className="mt-5 flex flex-col gap-5">
            <div className="grid gap-5 lg:grid-cols-2">
              <SelectField
                label="Current Availability"
                value={formData.currentAvailability}
                disabled={!editableSections.availability}
                placeholder="Select your availability"
                options={availabilityOptions}
                selectRef={availabilityRef}
                onChange={(value) => updateField("currentAvailability", value)}
              />
              <SelectField
                label="Preferred Regions"
                value={formData.preferredRegions}
                disabled={!editableSections.availability}
                placeholder="Select preferred regions"
                options={regionOptions}
                onChange={(value) => updateField("preferredRegions", value)}
              />
            </div>
            <div className="grid gap-5 lg:grid-cols-2">
              <SelectField
                label="Preferred Cities"
                value={formData.preferredCities}
                disabled={!editableSections.availability}
                placeholder="Select preferred cities"
                options={cityOptions}
                onChange={(value) => updateField("preferredCities", value)}
              />
              <SelectField
                label="Maximum Travel Distance"
                value={formData.maximumTravelDistance}
                disabled={!editableSections.availability}
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
                  disabled={!editableSections.availability}
                  onToggle={(value) => toggleMultiValue("preferredWorkType", value)}
                />
              </div>
              <div className="flex flex-col gap-2">
                <FieldLabel>Preferred Shift</FieldLabel>
                <CheckboxGroup
                  options={preferredShiftOptions}
                  values={formData.preferredShift}
                  disabled={!editableSections.availability}
                  onToggle={(value) => toggleMultiValue("preferredShift", value)}
                />
              </div>
            </div>
          </div>
        </section>

        <div className="mt-4 flex justify-end pb-8">
          <button
            type="button"
            onClick={handleSave}
            disabled={saving}
            className="inline-flex items-center gap-2 rounded-xl bg-cyan-700 px-8 py-3.5 text-base font-semibold text-white shadow-md transition hover:bg-cyan-800 disabled:opacity-50 active:scale-95"
          >
            {saving ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin" />
                <span>Saving Changes...</span>
              </>
            ) : (
              <>
                <Save className="h-5 w-5" />
                <span>Save Changes</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}



