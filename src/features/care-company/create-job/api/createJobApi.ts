import {
  CreateJobApiResponse,
  CreateJobFormPayload,
  JobItem,
} from "../types/createJob.types";

export const createJobApi = {
  /**
   * Create a new job posting
   */
  async createJob(
    payload: CreateJobFormPayload
  ): Promise<CreateJobApiResponse<JobItem>> {
    const response = await fetch("/api/care-company/jobs", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data?.message || "Failed to create job posting");
    }

    return data;
  },

  /**
   * Publish a job posting for approval/live
   */
  async publishJob(jobId: string): Promise<CreateJobApiResponse<JobItem>> {
    const response = await fetch(`/api/care-company/jobs/${jobId}/publish`, {
      method: "PATCH",
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data?.message || "Failed to publish job");
    }

    return data;
  },

  /**
   * Fetch my organization jobs
   */
  async getMyJobs(): Promise<CreateJobApiResponse<JobItem[]>> {
    const response = await fetch("/api/care-company/jobs", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      cache: "no-store",
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data?.message || "Failed to fetch jobs");
    }

    return data;
  },
};

export default createJobApi;
