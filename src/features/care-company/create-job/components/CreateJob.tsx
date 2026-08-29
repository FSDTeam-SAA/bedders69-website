"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import CareCompanySidebar from "@/features/care-company/components/CareCompanySidebar";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  CheckCircle2,
  ChevronDown,
} from "lucide-react";

const steps = [
  { id: 1, label: "Job Details" },
  { id: 2, label: "Requirements" },
  { id: 3, label: "Salary & Benefits" },
  { id: 4, label: "Location & Hours" },
  { id: 5, label: "Preview & Publish" },
];

export default function CreateJob() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [isPublishing, setIsPublishing] = useState(false);
  const [publishedToast, setPublishedToast] = useState(false);

  // Step 1: Job Details
  const [jobTitle, setJobTitle] = useState("");
  const [department, setDepartment] = useState("");
  const [selectedJobType, setSelectedJobType] = useState("Full-time");
  const [jobDescription, setJobDescription] = useState("");

  // Step 2: Requirements
  const [essentialRequirements, setEssentialRequirements] = useState(
    "• NVQ Level 2/3 in Health & Social Care\n• Minimum 1 year care experience\n• Valid DBS (enhanced) check\n• Good communication skills"
  );
  const [desiredSkills, setDesiredSkills] = useState<string[]>([]);
  const [minExperience, setMinExperience] = useState("No requirement");
  const [pinRequired, setPinRequired] = useState("Not required");

  // Step 3: Salary & Benefits
  const [salaryFrom, setSalaryFrom] = useState("£22,000");
  const [salaryTo, setSalaryTo] = useState("£26,000");
  const [selectedBenefits, setSelectedBenefits] = useState<string[]>([]);
  const [closingDate, setClosingDate] = useState("01/31/2027");

  // Step 4: Location & Hours
  const [workLocations, setWorkLocations] = useState<string[]>([]);
  const [address, setAddress] = useState("123 Care Lane, Manchester, M1 2AB");
  const [workingPatterns, setWorkingPatterns] = useState<string[]>([]);
  const [hoursPerWeek, setHoursPerWeek] = useState("37.5");
  const [contractType, setContractType] = useState("Permanent");

  // Step 5: Options
  const [isFeaturedBoost, setIsFeaturedBoost] = useState(false);
  const [isUrgentHire, setIsUrgentHire] = useState(false);

  const toggleItem = (list: string[], setList: (items: string[]) => void, item: string) => {
    if (list.includes(item)) {
      setList(list.filter((i) => i !== item));
    } else {
      setList([...list, item]);
    }
  };

  const handleNext = () => {
    if (currentStep < 5) {
      setCurrentStep(currentStep + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      handlePublish();
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handlePublish = () => {
    setIsPublishing(true);
    setTimeout(() => {
      setIsPublishing(false);
      setPublishedToast(true);
      setTimeout(() => {
        router.push("/care-company/job-posts");
      }, 1500);
    }, 800);
  };

  return (
    <main className="min-h-screen bg-[#f8f9fa] font-['Wix_Madefor_Text',Arial,sans-serif] text-[#203746]">
      {/* Published Toast */}
      {publishedToast && (
        <div className="fixed top-6 right-6 z-50 flex items-center gap-2.5 rounded-xl bg-emerald-600 px-5 py-3 text-white shadow-xl animate-bounce">
          <Check className="h-5 w-5" />
          <span className="font-semibold text-sm">
            Job listing created and published successfully!
          </span>
        </div>
      )}

      <div className="mx-auto flex min-h-screen w-full max-w-[1920px] flex-col lg:flex-row">
        {/* Left Sidebar */}
        <CareCompanySidebar activeHref="/care-company/create-job" />

        {/* Right Main Content */}
        <div className="min-w-0 flex-1">
          {/* Header */}
          <header className="flex min-h-[96px] w-full flex-col justify-center bg-white px-6 py-6 border-b border-[#f0f1f2]">
            <div className="flex flex-col justify-start items-start gap-1">
              <h1 className="text-2xl font-bold leading-7 text-[#2b6ea6]">
                Create Job Listing
              </h1>
              <p className="text-xs font-normal leading-4 text-gray-500">
                3 carers saved
              </p>
            </div>
          </header>

          {/* Form Content Area */}
          <div className="p-4 sm:p-6 lg:p-8 space-y-6 max-w-6xl pb-20">
            {/* Multi-Step Stepper Bar */}
            <div className="w-full p-6 bg-white rounded-2xl border border-sky-950/10 shadow-[0px_2px_4px_rgba(0,0,0,0.02)]">
              <div className="flex items-center justify-between overflow-x-auto gap-2">
                {steps.map((step, idx) => {
                  const isCompletedOrActive = step.id <= currentStep;
                  const isLineActive = step.id < currentStep;

                  return (
                    <React.Fragment key={step.id}>
                      <button
                        type="button"
                        onClick={() => setCurrentStep(step.id)}
                        className="inline-flex flex-col justify-start items-center gap-1.5 min-w-[70px] sm:min-w-[90px] cursor-pointer group"
                      >
                        <div
                          className={`size-8 rounded-2xl flex items-center justify-center transition-all ${
                            isCompletedOrActive
                              ? "bg-[#2b6ea6] text-white shadow-sm"
                              : "bg-gray-200 text-gray-500 group-hover:bg-gray-300"
                          }`}
                        >
                          <span className="text-xs font-bold font-['Wix_Madefor_Text'] leading-4">
                            {step.id}
                          </span>
                        </div>
                        <span
                          className={`text-center text-xs whitespace-nowrap transition-colors ${
                            isCompletedOrActive
                              ? "text-[#2b6ea6] font-bold"
                              : "text-gray-500 font-normal"
                          }`}
                        >
                          {step.label}
                        </span>
                      </button>

                      {idx < steps.length - 1 && (
                        <div
                          className={`flex-1 h-0.5 min-w-6 rounded-full transition-colors ${
                            isLineActive ? "bg-[#2b6ea6]" : "bg-slate-100"
                          }`}
                        />
                      )}
                    </React.Fragment>
                  );
                })}
              </div>
            </div>

            {/* ================= STEP 1: Job Details ================= */}
            {currentStep === 1 && (
              <div className="w-full p-6 sm:p-8 bg-white rounded-lg shadow-[0px_4px_6px_0px_rgba(0,0,0,0.10)] flex flex-col justify-center items-start gap-6 border border-neutral-100">
                <h2 className="text-xl font-bold font-['Wix_Madefor_Text'] leading-6 text-slate-800">
                  Job Details
                </h2>

                <div className="self-stretch flex flex-col justify-start items-start gap-6 w-full">
                  {/* Job Title */}
                  <div className="self-stretch flex flex-col justify-start items-start gap-2 w-full">
                    <label className="text-slate-800 text-base font-medium font-['Wix_Madefor_Text'] leading-5">
                      Job Title
                    </label>
                    <div className="self-stretch h-12 p-3 rounded-sm border border-neutral-300 outline-none inline-flex justify-start items-center gap-2 bg-white focus-within:border-[#2b6ea6] focus-within:ring-1 focus-within:ring-[#2b6ea6]">
                      <input
                        type="text"
                        value={jobTitle}
                        onChange={(e) => setJobTitle(e.target.value)}
                        placeholder="e.g. Senior Care Assistant"
                        className="flex-1 bg-transparent text-slate-800 text-base font-normal font-['Wix_Madefor_Text'] leading-5 focus:outline-none placeholder:text-gray-500"
                      />
                    </div>
                  </div>

                  {/* Department */}
                  <div className="self-stretch flex flex-col justify-start items-start gap-2 w-full">
                    <label className="text-slate-800 text-base font-medium font-['Wix_Madefor_Text'] leading-5">
                      Department
                    </label>
                    <div className="self-stretch h-12 p-3 rounded-sm border border-neutral-300 outline-none inline-flex justify-start items-center gap-2 bg-white focus-within:border-[#2b6ea6] focus-within:ring-1 focus-within:ring-[#2b6ea6]">
                      <input
                        type="text"
                        value={department}
                        onChange={(e) => setDepartment(e.target.value)}
                        placeholder="e.g. Residential Care"
                        className="flex-1 bg-transparent text-slate-800 text-base font-normal font-['Wix_Madefor_Text'] leading-5 focus:outline-none placeholder:text-gray-500"
                      />
                    </div>
                  </div>

                  {/* Job Type */}
                  <div className="self-stretch flex flex-col justify-start items-start gap-2 w-full">
                    <label className="text-slate-800 text-base font-medium font-['Wix_Madefor_Text'] leading-5">
                      Job Type
                    </label>
                    <div className="self-stretch flex flex-col justify-start items-start gap-3 w-full">
                      {/* Row 1: Full-time & Part-time */}
                      <div className="self-stretch inline-flex justify-start items-center gap-4 w-full">
                        <button
                          type="button"
                          onClick={() => setSelectedJobType("Full-time")}
                          className={`flex-1 h-12 p-3 rounded-sm flex justify-start items-center gap-2 cursor-pointer transition-all ${
                            selectedJobType === "Full-time"
                              ? "bg-slate-100 border-2 border-[#2b6ea6]"
                              : "border border-neutral-300 bg-white hover:bg-neutral-50"
                          }`}
                        >
                          <span
                            className={`flex-1 text-left text-base font-['Wix_Madefor_Text'] leading-5 ${
                              selectedJobType === "Full-time"
                                ? "text-[#2b6ea6] font-bold"
                                : "text-gray-500 font-normal"
                            }`}
                          >
                            Full-time
                          </span>
                        </button>

                        <button
                          type="button"
                          onClick={() => setSelectedJobType("Part-time")}
                          className={`flex-1 h-12 p-3 rounded-sm flex justify-start items-center gap-2 cursor-pointer transition-all ${
                            selectedJobType === "Part-time"
                              ? "bg-slate-100 border-2 border-[#2b6ea6]"
                              : "border border-neutral-300 bg-white hover:bg-neutral-50"
                          }`}
                        >
                          <span
                            className={`flex-1 text-left text-base font-['Wix_Madefor_Text'] leading-5 ${
                              selectedJobType === "Part-time"
                                ? "text-[#2b6ea6] font-bold"
                                : "text-gray-500 font-normal"
                            }`}
                          >
                            Part-time
                          </span>
                        </button>
                      </div>

                      {/* Row 2: Hybrid & Contract */}
                      <div className="self-stretch inline-flex justify-start items-center gap-4 w-full">
                        <button
                          type="button"
                          onClick={() => setSelectedJobType("Hybrid")}
                          className={`flex-1 h-12 p-3 rounded-sm flex justify-start items-center gap-2 cursor-pointer transition-all ${
                            selectedJobType === "Hybrid"
                              ? "bg-slate-100 border-2 border-[#2b6ea6]"
                              : "border border-neutral-300 bg-white hover:bg-neutral-50"
                          }`}
                        >
                          <span
                            className={`flex-1 text-left text-base font-['Wix_Madefor_Text'] leading-5 ${
                              selectedJobType === "Hybrid"
                                ? "text-[#2b6ea6] font-bold"
                                : "text-gray-500 font-normal"
                            }`}
                          >
                            Hybrid
                          </span>
                        </button>

                        <button
                          type="button"
                          onClick={() => setSelectedJobType("Contract")}
                          className={`flex-1 h-12 p-3 rounded-sm flex justify-start items-center gap-2 cursor-pointer transition-all ${
                            selectedJobType === "Contract"
                              ? "bg-slate-100 border-2 border-[#2b6ea6]"
                              : "border border-neutral-300 bg-white hover:bg-neutral-50"
                          }`}
                        >
                          <span
                            className={`flex-1 text-left text-base font-['Wix_Madefor_Text'] leading-5 ${
                              selectedJobType === "Contract"
                                ? "text-[#2b6ea6] font-bold"
                                : "text-gray-500 font-normal"
                            }`}
                          >
                            Contract
                          </span>
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Job Description */}
                  <div className="self-stretch flex flex-col justify-start items-start gap-2 w-full">
                    <label className="text-slate-800 text-base font-medium font-['Wix_Madefor_Text'] leading-5">
                      Job Description
                    </label>
                    <textarea
                      rows={7}
                      value={jobDescription}
                      onChange={(e) => setJobDescription(e.target.value)}
                      placeholder="Write here..."
                      className="self-stretch h-48 p-3 rounded-lg border border-neutral-300 outline-none text-base font-normal font-['Wix_Madefor_Text'] leading-5 text-slate-800 placeholder:text-gray-500 focus:border-[#2b6ea6] focus:ring-1 focus:ring-[#2b6ea6] bg-white resize-none"
                    />
                  </div>
                </div>

                {/* Buttons Row */}
                <div className="self-stretch inline-flex justify-start items-center gap-4 w-full pt-2">
                  <button
                    type="button"
                    onClick={handleBack}
                    disabled={currentStep === 1}
                    className="flex-1 h-12 p-2.5 bg-gray-200 hover:bg-gray-300 disabled:opacity-60 disabled:hover:bg-gray-200 rounded-lg flex justify-center items-center gap-2 transition-colors cursor-pointer disabled:cursor-not-allowed"
                  >
                    <ArrowLeft className="h-4 w-4 text-neutral-500" strokeWidth={2} />
                    <span className="text-neutral-500 text-sm font-semibold font-['Poppins'] leading-5">
                      Back
                    </span>
                  </button>

                  <button
                    type="button"
                    onClick={handleNext}
                    className="flex-1 h-12 p-2.5 bg-[#2b6ea6] hover:bg-[#20527f] rounded-lg flex justify-center items-center gap-2 transition-colors cursor-pointer shadow-sm active:scale-[0.99]"
                  >
                    <span className="text-white text-sm font-medium font-['Poppins'] leading-5">
                      Continue
                    </span>
                    <ArrowRight className="h-4 w-4 text-white" strokeWidth={2} />
                  </button>
                </div>
              </div>
            )}

            {/* ================= STEP 2: Requirements ================= */}
            {currentStep === 2 && (
              <div className="w-full p-6 sm:p-8 bg-white rounded-lg shadow-[0px_4px_6px_0px_rgba(0,0,0,0.10)] flex flex-col justify-center items-start gap-6 border border-neutral-100">
                <h2 className="text-xl font-bold font-['Wix_Madefor_Text'] leading-6 text-slate-800">
                  Requirements
                </h2>

                <div className="self-stretch space-y-6 w-full">
                  {/* Essential Requirements */}
                  <div className="space-y-2">
                    <label className="text-slate-800 text-base font-medium font-['Wix_Madefor_Text'] leading-5">
                      Essential Requirements (one per line)
                    </label>
                    <textarea
                      rows={5}
                      value={essentialRequirements}
                      onChange={(e) => setEssentialRequirements(e.target.value)}
                      className="w-full p-4 rounded-md border border-neutral-300 outline-none text-sm text-slate-700 font-['Wix_Madefor_Text'] bg-white focus:border-[#2b6ea6] focus:ring-1 focus:ring-[#2b6ea6] leading-relaxed resize-none"
                    />
                  </div>

                  {/* Desired Skills & Experience */}
                  <div className="space-y-3">
                    <label className="text-slate-800 text-base font-medium font-['Wix_Madefor_Text'] leading-5">
                      Desired Skills & Experience
                    </label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {[
                        { id: "Medication Administration", label: "Medication Administration" },
                        { id: "Manual Handling", label: "Manual Handling" },
                        { id: "Dementia Care", label: "Dementia Care" },
                        { id: "Palliative Care", label: "Palliative Care" },
                        { id: "PEG Feeding", label: "PEG Feeding" },
                        { id: "Moving & Handling", label: "Moving & Handling" },
                        { id: "First Aid", label: "First Aid" },
                        { id: "Mental Health", label: "Mental Health" },
                      ].map((item) => {
                        const checked = desiredSkills.includes(item.id);
                        return (
                          <div
                            key={item.id}
                            onClick={() => toggleItem(desiredSkills, setDesiredSkills, item.id)}
                            className="h-12 px-4 rounded-md border border-neutral-300 bg-white flex items-center gap-3 cursor-pointer hover:bg-neutral-50 transition-colors select-none"
                          >
                            <div
                              className={`size-4 rounded border flex items-center justify-center transition-colors ${
                                checked
                                  ? "bg-[#2b6ea6] border-[#2b6ea6] text-white"
                                  : "border-neutral-400 bg-white"
                              }`}
                            >
                              {checked && <Check className="size-3 stroke-[3]" />}
                            </div>
                            <span className="text-sm font-normal text-slate-700 font-['Wix_Madefor_Text']">
                              {item.label}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Minimum Experience */}
                  <div className="space-y-2">
                    <label className="text-slate-800 text-base font-medium font-['Wix_Madefor_Text'] leading-5">
                      Minimum Experience
                    </label>
                    <div className="relative">
                      <select
                        value={minExperience}
                        onChange={(e) => setMinExperience(e.target.value)}
                        className="w-full h-12 px-4 pr-10 rounded-md border border-neutral-300 outline-none text-base text-slate-700 bg-white focus:border-[#2b6ea6] appearance-none cursor-pointer"
                      >
                        <option value="No requirement">No requirement</option>
                        <option value="Under 1 year">Under 1 year</option>
                        <option value="1-2 years">1-2 years</option>
                        <option value="2-5 years">2-5 years</option>
                        <option value="5+ years">5+ years</option>
                      </select>
                      <ChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 size-4 text-gray-500 pointer-events-none" />
                    </div>
                  </div>

                  {/* NMC/HCPC Pin Required */}
                  <div className="space-y-2">
                    <label className="text-slate-800 text-base font-medium font-['Wix_Madefor_Text'] leading-5">
                      NMC/HCPC Pin Required
                    </label>
                    <div className="relative">
                      <select
                        value={pinRequired}
                        onChange={(e) => setPinRequired(e.target.value)}
                        className="w-full h-12 px-4 pr-10 rounded-md border border-neutral-300 outline-none text-base text-slate-700 bg-white focus:border-[#2b6ea6] appearance-none cursor-pointer"
                      >
                        <option value="Not required">Not required</option>
                        <option value="NMC Pin Required">NMC Pin Required</option>
                        <option value="HCPC Pin Required">HCPC Pin Required</option>
                        <option value="Either Required">Either Required</option>
                      </select>
                      <ChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 size-4 text-gray-500 pointer-events-none" />
                    </div>
                  </div>
                </div>

                {/* Buttons Row */}
                <div className="self-stretch inline-flex justify-start items-center gap-4 w-full pt-2">
                  <button
                    type="button"
                    onClick={handleBack}
                    className="flex-1 h-12 p-2.5 bg-gray-200 hover:bg-gray-300 rounded-lg flex justify-center items-center gap-2 transition-colors cursor-pointer"
                  >
                    <ArrowLeft className="h-4 w-4 text-neutral-500" strokeWidth={2} />
                    <span className="text-neutral-500 text-sm font-semibold font-['Poppins'] leading-5">
                      Back
                    </span>
                  </button>

                  <button
                    type="button"
                    onClick={handleNext}
                    className="flex-1 h-12 p-2.5 bg-[#2b6ea6] hover:bg-[#20527f] rounded-lg flex justify-center items-center gap-2 transition-colors cursor-pointer shadow-sm active:scale-[0.99]"
                  >
                    <span className="text-white text-sm font-medium font-['Poppins'] leading-5">
                      Continue
                    </span>
                    <ArrowRight className="h-4 w-4 text-white" strokeWidth={2} />
                  </button>
                </div>
              </div>
            )}

            {/* ================= STEP 3: Salary & Benefits ================= */}
            {currentStep === 3 && (
              <div className="w-full p-6 sm:p-8 bg-white rounded-lg shadow-[0px_4px_6px_0px_rgba(0,0,0,0.10)] flex flex-col justify-center items-start gap-6 border border-neutral-100">
                <h2 className="text-xl font-bold font-['Wix_Madefor_Text'] leading-6 text-slate-800">
                  Salary & Benefits
                </h2>

                <div className="self-stretch space-y-6 w-full">
                  {/* Salary From & To */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-slate-800 text-base font-medium font-['Wix_Madefor_Text'] leading-5">
                        Salary From
                      </label>
                      <input
                        type="text"
                        value={salaryFrom}
                        onChange={(e) => setSalaryFrom(e.target.value)}
                        placeholder="£22,000"
                        className="w-full h-12 px-4 rounded-md border border-neutral-300 outline-none text-base text-slate-700 bg-white focus:border-[#2b6ea6] focus:ring-1 focus:ring-[#2b6ea6]"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-slate-800 text-base font-medium font-['Wix_Madefor_Text'] leading-5">
                        Salary To
                      </label>
                      <input
                        type="text"
                        value={salaryTo}
                        onChange={(e) => setSalaryTo(e.target.value)}
                        placeholder="£26,000"
                        className="w-full h-12 px-4 rounded-md border border-neutral-300 outline-none text-base text-slate-700 bg-white focus:border-[#2b6ea6] focus:ring-1 focus:ring-[#2b6ea6]"
                      />
                    </div>
                  </div>

                  {/* Benefits */}
                  <div className="space-y-3">
                    <label className="text-slate-800 text-base font-medium font-['Wix_Madefor_Text'] leading-5">
                      Benefits
                    </label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {[
                        { id: "Pension Scheme (5%)", label: "Pension Scheme (5%)" },
                        { id: "Health Insurance", label: "Health Insurance" },
                        { id: "Free Meals on Shift", label: "Free Meals on Shift" },
                        { id: "Uniform Provided", label: "Uniform Provided" },
                        { id: "Training & Development", label: "Training & Development" },
                        { id: "28 Days Annual Leave", label: "28 Days Annual Leave" },
                        { id: "DBS Paid", label: "DBS Paid" },
                        { id: "Flexible Working", label: "Flexible Working" },
                        { id: "Employee Referral Bonus", label: "Employee Referral Bonus" },
                        { id: "Blue Light Card", label: "Blue Light Card" },
                      ].map((item) => {
                        const checked = selectedBenefits.includes(item.id);
                        return (
                          <div
                            key={item.id}
                            onClick={() => toggleItem(selectedBenefits, setSelectedBenefits, item.id)}
                            className="h-12 px-4 rounded-md border border-neutral-300 bg-white flex items-center gap-3 cursor-pointer hover:bg-neutral-50 transition-colors select-none"
                          >
                            <div
                              className={`size-4 rounded border flex items-center justify-center transition-colors ${
                                checked
                                  ? "bg-[#2b6ea6] border-[#2b6ea6] text-white"
                                  : "border-neutral-400 bg-white"
                              }`}
                            >
                              {checked && <Check className="size-3 stroke-[3]" />}
                            </div>
                            <span className="text-sm font-normal text-slate-700 font-['Wix_Madefor_Text']">
                              {item.label}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Closing Date */}
                  <div className="space-y-2">
                    <label className="text-slate-800 text-base font-medium font-['Wix_Madefor_Text'] leading-5">
                      Closing Date
                    </label>
                    <input
                      type="text"
                      value={closingDate}
                      onChange={(e) => setClosingDate(e.target.value)}
                      placeholder="01/31/2027"
                      className="w-full h-12 px-4 rounded-md border border-neutral-300 outline-none text-base text-slate-700 bg-white focus:border-[#2b6ea6] focus:ring-1 focus:ring-[#2b6ea6]"
                    />
                  </div>
                </div>

                {/* Buttons Row */}
                <div className="self-stretch inline-flex justify-start items-center gap-4 w-full pt-2">
                  <button
                    type="button"
                    onClick={handleBack}
                    className="flex-1 h-12 p-2.5 bg-gray-200 hover:bg-gray-300 rounded-lg flex justify-center items-center gap-2 transition-colors cursor-pointer"
                  >
                    <ArrowLeft className="h-4 w-4 text-neutral-500" strokeWidth={2} />
                    <span className="text-neutral-500 text-sm font-semibold font-['Poppins'] leading-5">
                      Back
                    </span>
                  </button>

                  <button
                    type="button"
                    onClick={handleNext}
                    className="flex-1 h-12 p-2.5 bg-[#2b6ea6] hover:bg-[#20527f] rounded-lg flex justify-center items-center gap-2 transition-colors cursor-pointer shadow-sm active:scale-[0.99]"
                  >
                    <span className="text-white text-sm font-medium font-['Poppins'] leading-5">
                      Continue
                    </span>
                    <ArrowRight className="h-4 w-4 text-white" strokeWidth={2} />
                  </button>
                </div>
              </div>
            )}

            {/* ================= STEP 4: Location & Hours ================= */}
            {currentStep === 4 && (
              <div className="w-full p-6 sm:p-8 bg-white rounded-lg shadow-[0px_4px_6px_0px_rgba(0,0,0,0.10)] flex flex-col justify-center items-start gap-6 border border-neutral-100">
                <h2 className="text-xl font-bold font-['Wix_Madefor_Text'] leading-6 text-slate-800">
                  Location & Hours
                </h2>

                <div className="self-stretch space-y-6 w-full">
                  {/* Work Location */}
                  <div className="space-y-3">
                    <label className="text-slate-800 text-base font-medium font-['Wix_Madefor_Text'] leading-5">
                      Work Location
                    </label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {[
                        { id: "On-site", label: "On-site" },
                        { id: "Hybrid", label: "Hybrid" },
                        { id: "Community-based", label: "Community-based" },
                        { id: "Live-in", label: "Live-in" },
                      ].map((item) => {
                        const checked = workLocations.includes(item.id);
                        return (
                          <div
                            key={item.id}
                            onClick={() => toggleItem(workLocations, setWorkLocations, item.id)}
                            className="h-12 px-4 rounded-md border border-neutral-300 bg-white flex items-center gap-3 cursor-pointer hover:bg-neutral-50 transition-colors select-none"
                          >
                            <div
                              className={`size-4 rounded border flex items-center justify-center transition-colors ${
                                checked
                                  ? "bg-[#2b6ea6] border-[#2b6ea6] text-white"
                                  : "border-neutral-400 bg-white"
                              }`}
                            >
                              {checked && <Check className="size-3 stroke-[3]" />}
                            </div>
                            <span className="text-sm font-normal text-slate-700 font-['Wix_Madefor_Text']">
                              {item.label}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Address */}
                  <div className="space-y-2">
                    <label className="text-slate-800 text-base font-medium font-['Wix_Madefor_Text'] leading-5">
                      Address
                    </label>
                    <input
                      type="text"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      placeholder="123 Care Lane, Manchester, M1 2AB"
                      className="w-full h-12 px-4 rounded-md border border-neutral-300 outline-none text-base text-slate-700 bg-white focus:border-[#2b6ea6] focus:ring-1 focus:ring-[#2b6ea6]"
                    />
                  </div>

                  {/* Working Patterns */}
                  <div className="space-y-3">
                    <label className="text-slate-800 text-base font-medium font-['Wix_Madefor_Text'] leading-5">
                      Working Patterns
                    </label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {[
                        { id: "Early Shifts (7am–2pm)", label: "Early Shifts (7am–2pm)" },
                        { id: "Late Shifts (2pm–9pm)", label: "Late Shifts (2pm–9pm)" },
                        { id: "Night Shifts (9pm–7am)", label: "Night Shifts (9pm–7am)" },
                        { id: "Weekend Work", label: "Weekend Work" },
                        { id: "Bank Holidays", label: "Bank Holidays" },
                        { id: "Flexible Hours", label: "Flexible Hours" },
                      ].map((item) => {
                        const checked = workingPatterns.includes(item.id);
                        return (
                          <div
                            key={item.id}
                            onClick={() => toggleItem(workingPatterns, setWorkingPatterns, item.id)}
                            className="h-12 px-4 rounded-md border border-neutral-300 bg-white flex items-center gap-3 cursor-pointer hover:bg-neutral-50 transition-colors select-none"
                          >
                            <div
                              className={`size-4 rounded border flex items-center justify-center transition-colors ${
                                checked
                                  ? "bg-[#2b6ea6] border-[#2b6ea6] text-white"
                                  : "border-neutral-400 bg-white"
                              }`}
                            >
                              {checked && <Check className="size-3 stroke-[3]" />}
                            </div>
                            <span className="text-sm font-normal text-slate-700 font-['Wix_Madefor_Text']">
                              {item.label}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Hours Per Week & Contract Type */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-slate-800 text-base font-medium font-['Wix_Madefor_Text'] leading-5">
                        Hours Per Week
                      </label>
                      <input
                        type="text"
                        value={hoursPerWeek}
                        onChange={(e) => setHoursPerWeek(e.target.value)}
                        placeholder="e.g. 37.5"
                        className="w-full h-12 px-4 rounded-md border border-neutral-300 outline-none text-base text-slate-700 bg-white focus:border-[#2b6ea6] focus:ring-1 focus:ring-[#2b6ea6]"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-slate-800 text-base font-medium font-['Wix_Madefor_Text'] leading-5">
                        Contract Type
                      </label>
                      <div className="relative">
                        <select
                          value={contractType}
                          onChange={(e) => setContractType(e.target.value)}
                          className="w-full h-12 px-4 pr-10 rounded-md border border-neutral-300 outline-none text-base text-slate-700 bg-white focus:border-[#2b6ea6] appearance-none cursor-pointer"
                        >
                          <option value="Permanent">Permanent</option>
                          <option value="Fixed Term">Fixed Term</option>
                          <option value="Temporary">Temporary</option>
                          <option value="Zero Hours">Zero Hours</option>
                        </select>
                        <ChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 size-4 text-gray-500 pointer-events-none" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Buttons Row */}
                <div className="self-stretch inline-flex justify-start items-center gap-4 w-full pt-2">
                  <button
                    type="button"
                    onClick={handleBack}
                    className="flex-1 h-12 p-2.5 bg-gray-200 hover:bg-gray-300 rounded-lg flex justify-center items-center gap-2 transition-colors cursor-pointer"
                  >
                    <ArrowLeft className="h-4 w-4 text-neutral-500" strokeWidth={2} />
                    <span className="text-neutral-500 text-sm font-semibold font-['Poppins'] leading-5">
                      Back
                    </span>
                  </button>

                  <button
                    type="button"
                    onClick={handleNext}
                    className="flex-1 h-12 p-2.5 bg-[#2b6ea6] hover:bg-[#20527f] rounded-lg flex justify-center items-center gap-2 transition-colors cursor-pointer shadow-sm active:scale-[0.99]"
                  >
                    <span className="text-white text-sm font-medium font-['Poppins'] leading-5">
                      Continue
                    </span>
                    <ArrowRight className="h-4 w-4 text-white" strokeWidth={2} />
                  </button>
                </div>
              </div>
            )}

            {/* ================= STEP 5: Preview & Publish ================= */}
            {currentStep === 5 && (
              <div className="w-full p-6 sm:p-8 bg-white rounded-lg shadow-[0px_4px_6px_0px_rgba(0,0,0,0.10)] flex flex-col justify-center items-start gap-6 border border-neutral-100">
                <h2 className="text-xl font-bold font-['Wix_Madefor_Text'] leading-6 text-slate-800">
                  Preview & Publish
                </h2>

                <div className="self-stretch space-y-4 w-full">
                  {/* Ready to Publish Banner */}
                  <div className="w-full p-4 rounded-xl border border-emerald-300 bg-[#E8F8F0]/70 flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <h3 className="text-sm font-bold text-emerald-900 leading-5">
                        Ready to publish
                      </h3>
                      <p className="text-xs font-normal text-emerald-700 leading-4 mt-0.5">
                        Your job listing has passed all validation checks.
                      </p>
                    </div>
                  </div>

                  {/* Job Summary Card */}
                  <div className="w-full p-6 rounded-xl border border-[#2b6ea6]/30 bg-white shadow-[0px_2px_4px_rgba(0,0,0,0.02)] flex flex-col gap-4">
                    <h3 className="text-xl font-bold text-[#2b6ea6]">
                      {jobTitle || "Senior Care Assistant"}
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-y-2 gap-x-8 text-sm">
                      <div className="space-y-2">
                        <p className="text-slate-700">
                          <span className="text-gray-500 font-medium">Type: </span>
                          <span className="font-bold text-slate-800">{selectedJobType}</span>
                        </p>
                        <p className="text-slate-700">
                          <span className="text-gray-500 font-medium">Salary: </span>
                          <span className="font-bold text-slate-800">
                            {salaryFrom} – {salaryTo}
                          </span>
                        </p>
                        <p className="text-slate-700">
                          <span className="text-gray-500 font-medium">Closes: </span>
                          <span className="font-bold text-slate-800">
                            {closingDate === "01/31/2027" ? "31 Jan 2027" : closingDate}
                          </span>
                        </p>
                      </div>

                      <div className="space-y-2">
                        <p className="text-slate-700">
                          <span className="text-gray-500 font-medium">Location: </span>
                          <span className="font-bold text-slate-800">{address}</span>
                        </p>
                        <p className="text-slate-700">
                          <span className="text-gray-500 font-medium">Department: </span>
                          <span className="font-bold text-slate-800">
                            {department || "Residential Care"}
                          </span>
                        </p>
                        <p className="text-slate-700">
                          <span className="text-gray-500 font-medium">Contract: </span>
                          <span className="font-bold text-slate-800">{contractType}</span>
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Boost this listing? */}
                  <div className="w-full p-5 rounded-xl border border-[#2b6ea6]/30 bg-[#eef5fa]/60 flex flex-col gap-2.5">
                    <div>
                      <h4 className="text-sm font-bold text-slate-800">
                        Boost this listing?
                      </h4>
                      <p className="text-xs text-slate-600 mt-0.5">
                        Feature your job at the top of search results for £29/week. Typically 3× more applicants.
                      </p>
                    </div>

                    <div
                      onClick={() => setIsFeaturedBoost(!isFeaturedBoost)}
                      className="flex items-center gap-2.5 cursor-pointer pt-1 select-none"
                    >
                      <div
                        className={`size-4 rounded border flex items-center justify-center transition-colors ${
                          isFeaturedBoost
                            ? "bg-[#2b6ea6] border-[#2b6ea6] text-white"
                            : "border-neutral-400 bg-white"
                        }`}
                      >
                        {isFeaturedBoost && <Check className="size-3 stroke-[3]" />}
                      </div>
                      <span className="text-sm font-semibold text-slate-800">
                        Add Featured Boost (+£29/week)
                      </span>
                    </div>
                  </div>

                  {/* Mark as Urgent? */}
                  <div className="w-full p-5 rounded-xl border border-amber-300 bg-amber-50/70 flex flex-col gap-2.5">
                    <h4 className="text-sm font-bold text-amber-900">
                      Mark as Urgent?
                    </h4>
                    <div
                      onClick={() => setIsUrgentHire(!isUrgentHire)}
                      className="flex items-center gap-2.5 cursor-pointer select-none"
                    >
                      <div
                        className={`size-4 rounded border flex items-center justify-center transition-colors ${
                          isUrgentHire
                            ? "bg-amber-600 border-amber-600 text-white"
                            : "border-amber-400 bg-white"
                        }`}
                      >
                        {isUrgentHire && <Check className="size-3 stroke-[3]" />}
                      </div>
                      <span className="text-sm font-medium text-amber-900">
                        Flag as Urgent Hire (shown with urgent badge)
                      </span>
                    </div>
                  </div>
                </div>

                {/* Buttons Row */}
                <div className="self-stretch inline-flex justify-start items-center gap-4 w-full pt-2">
                  <button
                    type="button"
                    onClick={handleBack}
                    className="flex-1 h-12 p-2.5 bg-gray-200 hover:bg-gray-300 rounded-lg flex justify-center items-center gap-2 transition-colors cursor-pointer"
                  >
                    <ArrowLeft className="h-4 w-4 text-neutral-500" strokeWidth={2} />
                    <span className="text-neutral-500 text-sm font-semibold font-['Poppins'] leading-5">
                      Back
                    </span>
                  </button>

                  <button
                    type="button"
                    onClick={handlePublish}
                    disabled={isPublishing}
                    className="flex-1 h-12 p-2.5 bg-[#2b6ea6] hover:bg-[#20527f] rounded-lg flex justify-center items-center gap-2 transition-colors cursor-pointer shadow-sm text-white font-semibold disabled:opacity-50 active:scale-[0.99]"
                  >
                    <span>{isPublishing ? "Publishing..." : "Publish Job Now"}</span>
                    <ArrowRight className="h-4 w-4 text-white" strokeWidth={2} />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}