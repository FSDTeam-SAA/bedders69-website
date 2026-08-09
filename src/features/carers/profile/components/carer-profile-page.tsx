import React from "react";
import { CalendarDays, ChevronDown, PencilLine } from "lucide-react";

function SectionHeader({ title }: { title: string }) {
  return (
    <div className="inline-flex w-full items-center gap-2.5">
      <h2 className="flex-1 text-xl font-semibold leading-6 text-slate-800">{title}</h2>
      <button
        type="button"
        aria-label={`Edit ${title}`}
        className="inline-flex h-8 w-8 items-center justify-center rounded-full text-slate-800 transition hover:bg-white/70"
      >
        <PencilLine className="h-5 w-5" strokeWidth={1.7} />
      </button>
    </div>
  );
}

function TextField({
  label,
  value,
  placeholder,
}: {
  label: string;
  value?: string;
  placeholder?: string;
}) {
  return (
    <label className="flex w-full flex-col gap-3">
      <span className="text-base font-medium leading-5 text-slate-800">{label}</span>
      <input
        type="text"
        defaultValue={value}
        placeholder={placeholder}
        className="h-14 rounded-lg border border-neutral-400 bg-transparent px-4 text-base leading-5 text-slate-700 outline-none transition placeholder:text-gray-500 focus:border-cyan-700"
      />
    </label>
  );
}

function SelectField({
  label,
  value,
  options,
}: {
  label: string;
  value?: string;
  options: string[];
}) {
  return (
    <label className="flex w-full flex-col gap-3">
      <span className="text-base font-medium leading-5 text-slate-800">{label}</span>
      <div className="relative">
        <select
          defaultValue={value ?? ""}
          className="h-14 w-full appearance-none rounded-lg border border-neutral-400 bg-transparent px-4 pr-12 text-base leading-5 text-slate-700 outline-none transition focus:border-cyan-700"
        >
          <option value="" disabled>
            Choose any one
          </option>
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

function DateField({ label, value }: { label: string; value?: string }) {
  return (
    <label className="flex w-full flex-col gap-3">
      <span className="text-base font-medium leading-5 text-slate-800">{label}</span>
      <div className="relative">
        <input
          type="text"
          defaultValue={value}
          placeholder="DD/MM/YYYY"
          className="h-14 w-full rounded-lg border border-neutral-400 bg-transparent px-4 pr-12 text-base leading-5 text-slate-700 outline-none transition placeholder:text-gray-500 focus:border-cyan-700"
        />
        <CalendarDays className="pointer-events-none absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-500" strokeWidth={1.7} />
      </div>
    </label>
  );
}

const countries = ["United Kingdom", "England", "Scotland", "Wales"];
const regions = ["London", "Manchester", "Birmingham", "Leeds"];
const nationalities = ["British", "Irish", "Scottish", "Welsh"];
const relationships = ["Parent", "Sibling", "Spouse", "Friend"];

export function CarerProfilePage() {
  return (
    <div className="min-h-screen bg-white px-6 py-6 sm:px-8 xl:px-10">
      <div className="grid gap-4 xl:grid-cols-[460px_minmax(0,1fr)]">
        <div className="space-y-4">
          <section className="overflow-hidden rounded-2xl bg-[#eef6ff]">
            <div className="relative h-[220px] w-full overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1584515933487-779824d29309?auto=format&fit=crop&w=1200&q=80"
                alt="Carer helping a patient at home"
                className="h-full w-full object-cover"
              />
              <button
                type="button"
                aria-label="Edit cover image"
                className="absolute right-4 top-4 inline-flex h-10 w-10 items-center justify-center rounded-full bg-indigo-700 text-white shadow-sm"
              >
                <PencilLine className="h-5 w-5" strokeWidth={1.7} />
              </button>
            </div>
            <div className="relative px-6 pb-6 pt-14">
              <div className="absolute left-6 top-0 -translate-y-1/2">
                <div className="relative">
                  <img
                    src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80"
                    alt="Profile picture of Cody Fisher"
                    className="h-[140px] w-[140px] rounded-full border-4 border-[#eef6ff] object-cover shadow-sm"
                  />
                  <button
                    type="button"
                    aria-label="Edit profile image"
                    className="absolute bottom-2 right-0 inline-flex h-10 w-10 items-center justify-center rounded-full bg-indigo-700 text-white shadow-sm"
                  >
                    <PencilLine className="h-5 w-5" strokeWidth={1.7} />
                  </button>
                </div>
              </div>
              <div className="pl-[154px]">
                <h2 className="text-[44px] font-semibold leading-[52px] text-black">
                  Cody Fisher
                </h2>
                <p className="text-[28px] leading-8 text-slate-500">@codyfisher</p>
              </div>
            </div>
          </section>

          <section className="rounded-2xl bg-[#eef6ff] p-6">
            <SectionHeader title="Personal Information" />
            <div className="mt-5 flex flex-col gap-5">
              <TextField label="First Name" value="Cody" />
              <TextField label="Last Name" value="Fisher" />
              <div className="grid gap-5 md:grid-cols-2">
                <DateField label="Date of Birth" />
                <div className="flex flex-col gap-3">
                  <span className="text-base font-medium leading-5 text-slate-800">Gender</span>
                  <div className="flex h-14 items-center gap-6">
                    <label className="inline-flex items-center gap-2 text-base text-gray-500">
                      <input
                        type="radio"
                        name="gender"
                        defaultChecked
                        className="h-4 w-4 border-neutral-400 accent-cyan-700"
                      />
                      <span>Male</span>
                    </label>
                    <label className="inline-flex items-center gap-2 text-base text-gray-500">
                      <input
                        type="radio"
                        name="gender"
                        className="h-4 w-4 border-neutral-400 accent-cyan-700"
                      />
                      <span>Female</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>

        <div className="space-y-4">
          <section className="rounded-2xl bg-[#eef6ff] p-6">
            <SectionHeader title="Contact Information" />
            <div className="mt-5 flex flex-col gap-5">
              <div className="grid gap-5 md:grid-cols-2">
                <TextField label="Email" placeholder="Enter your email address" />
                <TextField label="Phone Number" placeholder="Enter your phone number" />
              </div>
              <div className="grid gap-5 md:grid-cols-2">
                <SelectField label="Country" options={countries} />
                <SelectField label="State/Region" options={regions} />
              </div>
              <div className="grid gap-5 md:grid-cols-2">
                <SelectField label="Nationality" options={nationalities} />
                <TextField label="Postcode" placeholder="e.g. 5585" />
              </div>
              <label className="flex w-full flex-col gap-3">
                <span className="text-base font-medium leading-5 text-slate-800">Address</span>
                <textarea
                  placeholder="Enter your full address"
                  rows={4}
                  className="w-full rounded-lg border border-neutral-400 bg-transparent px-4 py-4 text-base leading-5 text-slate-700 outline-none transition placeholder:text-gray-500 focus:border-cyan-700"
                />
              </label>
            </div>
          </section>

          <section className="rounded-2xl bg-[#eef6ff] p-6">
            <SectionHeader title="Emergency Contact" />
            <div className="mt-5 flex flex-col gap-5">
              <TextField label="Contact Name" placeholder="Enter your contact name" />
              <div className="grid gap-5 md:grid-cols-2">
                <SelectField label="Relationship" options={relationships} />
                <TextField label="Phone Number" placeholder="Enter your phone number" />
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
