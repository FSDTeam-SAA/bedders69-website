"use client";

import { useState } from "react";
import createJobApi from "../api/createJobApi";
import { CreateJobFormPayload, JobItem } from "../types/createJob.types";

export function useCreateJob() {
  const [isPublishing, setIsPublishing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submitJob = async (
    formData: CreateJobFormPayload
  ): Promise<{ success: boolean; data?: JobItem; message?: string }> => {
    setIsPublishing(true);
    setError(null);
    try {
      // 1. Create the job in draft/active
      const createRes = await createJobApi.createJob(formData);
      const createdJob = createRes.data;

      // 2. Publish it immediately for review/live
      if (createdJob?._id || createdJob?.id) {
        const jobId = createdJob._id || createdJob.id;
        try {
          await createJobApi.publishJob(jobId!);
        } catch (publishErr) {
          console.warn("Job created, publish step note:", publishErr);
        }
      }

      return {
        success: true,
        data: createdJob,
        message: "Job created and submitted successfully!",
      };
    } catch (err: any) {
      console.error("Error creating job:", err);
      const errorMsg = err?.message || "Failed to create job posting";
      setError(errorMsg);
      return {
        success: false,
        message: errorMsg,
      };
    } finally {
      setIsPublishing(false);
    }
  };

  return {
    isPublishing,
    error,
    submitJob,
  };
}

export default useCreateJob;
