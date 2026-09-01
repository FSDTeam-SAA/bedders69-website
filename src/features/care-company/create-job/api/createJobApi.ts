import {
  CreateJobApiResponse,
  CreateJobFormPayload,
  JobItem,
} from "../types/createJob.types";

const getHeaders = (hasBody = true): Record<string, string> => {
  const headers: Record<string, string> = {};
  if (hasBody) {
    headers["Content-Type"] = "application/json";
  }
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("bedders_access_token");
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }
  }
  return headers;
};

export const createJobApi = {
  /**
   * Create a new job posting
   */
  async createJob(
    payload: CreateJobFormPayload
  ): Promise<CreateJobApiResponse<JobItem>> {
    const response = await fetch("/api/care-company/jobs", {
      method: "POST",
      headers: getHeaders(true),
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
      headers: getHeaders(false),
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
      headers: getHeaders(true),
      cache: "no-store",
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data?.message || "Failed to fetch jobs");
    }

    return data;
  },

  /**
   * Close a job posting
   */
  async closeJob(jobId: string): Promise<CreateJobApiResponse<JobItem>> {
    const response = await fetch(`/api/care-company/jobs/${jobId}/close`, {
      method: "PATCH",
      headers: getHeaders(false),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data?.message || "Failed to close job");
    }

    return data;
  },
};

export default createJobApi;
