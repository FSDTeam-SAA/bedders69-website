"use client";

import React, { useState, useRef } from "react";
import { JobsHero } from "./JobsHero";
import { JobsFilterSidebar } from "./JobsFilterSidebar";
import { JobsList } from "./JobsList";
import { JobProps } from "../types/jobs.types";
import { X, UploadCloud, Send, FileText, Check } from "lucide-react";

export const JobsView = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchTriggeredQuery, setSearchTriggeredQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const [selectedSalaries, setSelectedSalaries] = useState<string[]>([]);
  const [selectedExperience, setSelectedExperience] = useState<string[]>([]);
  const [selectedPosted, setSelectedPosted] = useState<string[]>([]);

  // Application Modal States
  const [applyingJob, setApplyingJob] = useState<JobProps | null>(null);
  const [cvFile, setCvFile] = useState<File | null>(null);
  const [coverLetter, setCoverLetter] = useState("");
  const [expectedSalary, setExpectedSalary] = useState("");
  const [startDate, setStartDate] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isApplicationSubmitted, setIsApplicationSubmitted] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSearch = () => {
    setSearchTriggeredQuery(searchQuery);
  };

  const toggleSalary = (sal: string) => {
    setSelectedSalaries((prev) =>
      prev.includes(sal) ? prev.filter((s) => s !== sal) : [...prev, sal]
    );
  };

  const toggleExperience = (exp: string) => {
    setSelectedExperience((prev) =>
      prev.includes(exp) ? prev.filter((e) => e !== exp) : [...prev, exp]
    );
  };

  const togglePosted = (posted: string) => {
    setSelectedPosted((prev) =>
      prev.includes(posted) ? prev.filter((p) => p !== posted) : [...prev, posted]
    );
  };

  const clearAllFilters = () => {
    setSearchQuery("");
    setSearchTriggeredQuery("");
    setSelectedCategory("All");
    setSelectedSalaries([]);
    setSelectedExperience([]);
    setSelectedPosted([]);
  };

  const handleApplyClick = (job: JobProps) => {
    setApplyingJob(job);
    setIsApplicationSubmitted(false);
    // Reset modal inputs
    setCvFile(null);
    setCoverLetter("");
    setExpectedSalary("");
    setStartDate("");
    setRememberMe(false);
  };

  const handleFileUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setCvFile(e.target.files[0]);
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API Submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsApplicationSubmitted(true);
    }, 1200);
  };

  const handleCloseModal = () => {
    setApplyingJob(null);
    setIsApplicationSubmitted(false);
  };

  return (
    <div className="bg-[#F4F7FC] min-h-screen pb-16 relative">
      
      {/* Jobs Hero Banner */}
      <JobsHero
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onSearch={handleSearch}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />

      {/* Main Content Layout */}
      <div className="container mx-auto px-6 md:px-12 lg:px-16 py-8">
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          
          <JobsFilterSidebar
            selectedSalaries={selectedSalaries}
            toggleSalary={toggleSalary}
            selectedExperience={selectedExperience}
            toggleExperience={toggleExperience}
            selectedPosted={selectedPosted}
            togglePosted={togglePosted}
            clearAllFilters={clearAllFilters}
          />

          <JobsList
            searchQuery={searchTriggeredQuery}
            selectedCategory={selectedCategory}
            selectedSalaries={selectedSalaries}
            selectedExperience={selectedExperience}
            selectedPosted={selectedPosted}
            onApply={handleApplyClick}
          />

        </div>
      </div>

      {/* Job Application Modal Backdrop */}
      {applyingJob && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-50 flex items-center justify-center p-4 overflow-y-auto animate-fade-in">
          
          {/* Modal Panel */}
          <div className="bg-white rounded-3xl w-full max-w-2xl border border-slate-100 shadow-2xl p-6 md:p-8 flex flex-col gap-6 relative max-h-[90vh] overflow-y-auto font-['Wix_Madefor_Text'] animate-scale-up">
            
            {/* Close Button */}
            <button
              onClick={handleCloseModal}
              className="absolute top-5 right-5 p-2 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-50 transition-all cursor-pointer"
            >
              <X className="size-5" />
            </button>

            {/* Title & Selected Job Banner Block */}
            <div className="flex flex-col gap-1 border-b border-slate-100 pb-4">
              <h2 className="text-2xl md:text-3xl font-semibold text-[#1B2C54]">
                Apply for Job
              </h2>
              
              <div className="mt-3 p-4 bg-slate-50 rounded-2xl flex flex-col gap-1 border border-slate-100">
                <span className="text-sm font-bold text-slate-800">
                  {applyingJob.title}
                </span>
                <span className="text-xs text-slate-400 font-medium">
                  {applyingJob.company} · {applyingJob.location} · {applyingJob.salary}
                </span>
              </div>
            </div>

            {/* Dynamic View: Form OR Success Screen */}
            {!isApplicationSubmitted ? (
              <form onSubmit={handleFormSubmit} className="flex flex-col gap-5">
                
                {/* Upload CV */}
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-bold text-slate-700">
                    Upload file
                  </label>
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    accept=".pdf,.doc,.docx"
                    className="hidden"
                  />
                  
                  <div
                    onClick={handleFileUploadClick}
                    className="border-2 border-dashed border-slate-200 hover:border-[#2D6A9F] rounded-2xl p-6 flex flex-col items-center justify-center gap-2.5 cursor-pointer transition-all bg-slate-50/50 hover:bg-blue-50/10 group"
                  >
                    <UploadCloud className="size-8 text-slate-400 group-hover:text-[#2D6A9F] transition-colors" />
                    {cvFile ? (
                      <div className="flex items-center gap-2 text-sm font-semibold text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-100">
                        <FileText className="size-4" />
                        <span>{cvFile.name}</span>
                      </div>
                    ) : (
                      <>
                        <span className="text-sm font-semibold text-slate-700 group-hover:text-[#2D6A9F] transition-colors">
                          Upload CV
                        </span>
                        <span className="text-xs text-slate-400 font-medium">
                          Supports PDF, DOC, DOCX
                        </span>
                      </>
                    )}
                  </div>
                </div>

                {/* Cover Letter (optional) */}
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-bold text-slate-700">
                    Cover Letter (optional)
                  </label>
                  <textarea
                    rows={4}
                    value={coverLetter}
                    onChange={(e) => setCoverLetter(e.target.value)}
                    placeholder="Briefly introduce yourself and explain why you're a great fit..."
                    className="w-full border border-slate-200 rounded-2xl px-4 py-3 text-sm text-slate-700 placeholder-slate-400 focus:outline-none focus:border-[#2D6A9F] focus:ring-1 focus:ring-[#2D6A9F] font-medium transition-all"
                  />
                </div>

                {/* Expected Salary & Start Date grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  
                  {/* Expected Salary */}
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-bold text-slate-700">
                      Expected Salary
                    </label>
                    <input
                      type="text"
                      value={expectedSalary}
                      onChange={(e) => setExpectedSalary(e.target.value)}
                      placeholder="e.g. £25,000"
                      className="w-full border border-slate-200 rounded-2xl px-4 py-3 text-sm text-slate-700 placeholder-slate-400 focus:outline-none focus:border-[#2D6A9F] focus:ring-1 focus:ring-[#2D6A9F] font-medium transition-all"
                      required
                    />
                  </div>

                  {/* Earliest Start Date */}
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-bold text-slate-700">
                      Earliest Start Date
                  </label>
                    <input
                      type="text"
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                      placeholder="dd/mm/yy"
                      className="w-full border border-slate-200 rounded-2xl px-4 py-3 text-sm text-slate-700 placeholder-slate-400 focus:outline-none focus:border-[#2D6A9F] focus:ring-1 focus:ring-[#2D6A9F] font-medium transition-all"
                      required
                    />
                  </div>

                </div>

                {/* Remember me & Forgot password */}
                <div className="flex justify-between items-center text-xs font-semibold text-slate-400 mt-2 select-none">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="rounded border-slate-300 text-[#2D6A9F] focus:ring-[#2D6A9F] size-3.5"
                    />
                    <span>Remember me</span>
                  </label>
                  <span className="hover:underline cursor-pointer">
                    Forgot password?
                  </span>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row justify-end items-center gap-3 mt-4 pt-4 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={handleCloseModal}
                    className="w-full sm:w-auto px-6 py-3 border border-slate-200 hover:border-slate-300 text-slate-600 rounded-2xl text-sm font-bold transition-all cursor-pointer text-center hover:bg-slate-50 active:scale-98"
                  >
                    Cancel
                  </button>
                  
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full sm:w-auto px-6 py-3 bg-[#2D6A9F] hover:bg-[#20527F] disabled:bg-slate-300 text-white rounded-2xl text-sm font-bold transition-all cursor-pointer flex items-center justify-center gap-2 shadow-sm hover:shadow active:scale-98"
                  >
                    {isSubmitting ? (
                      <span>Submitting...</span>
                    ) : (
                      <>
                        <span>Submit Application</span>
                        <Send className="size-4 stroke-[2.5]" />
                      </>
                    )}
                  </button>
                </div>

                {/* Bottom login link prompt */}
                <div className="text-center text-xs text-slate-400 font-semibold mt-2">
                  Don’t have an account? <span className="text-[#2D6A9F] hover:underline cursor-pointer">Sign Up Here</span>
                </div>

              </form>
            ) : (
              // FIGMA: Application Submitted Success View (5145:4515)
              <div className="flex flex-col items-center justify-center text-center py-6 gap-6 animate-fade-in">
                
                {/* Animated Green Circle Icon */}
                <div className="size-20 rounded-full bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600 shadow-sm">
                  <Check className="size-10 stroke-[3.5] animate-scale-up" />
                </div>

                {/* Text Block */}
                <div className="flex flex-col gap-2.5">
                  <h3 className="text-3xl md:text-4xl font-semibold text-[#1B2C54]">
                    Application Submitted!
                  </h3>
                  <p className="text-slate-500 font-medium text-sm md:text-base max-w-md mx-auto leading-relaxed">
                    {applyingJob.company} will review your application and be in touch within 3–5 business days.
                  </p>
                </div>

                {/* Bottom Action Done button */}
                <div className="w-full border-t border-slate-100 pt-6 mt-2 flex justify-center">
                  <button
                    onClick={handleCloseModal}
                    className="w-full sm:w-40 py-3 bg-[#2D6A9F] hover:bg-[#20527F] text-white text-base font-semibold rounded-2xl transition-all cursor-pointer shadow-sm hover:shadow text-center active:scale-98"
                  >
                    Done
                  </button>
                </div>

              </div>
            )}

          </div>

        </div>
      )}

    </div>
  );
};
