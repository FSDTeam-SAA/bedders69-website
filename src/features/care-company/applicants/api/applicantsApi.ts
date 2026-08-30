import { Applicant, ApplicantsApiResponse } from "../types/applicants.types";

export const applicantsApi = {
  /**
   * Fetch all applicants for the authenticated organization with pagination
   */
  async getApplicants(params?: {
    page?: number;
    limit?: number;
  }): Promise<ApplicantsApiResponse<Applicant[]>> {
    const searchParams = new URLSearchParams();
    if (params?.page) searchParams.set("page", String(params.page));
    if (params?.limit) searchParams.set("limit", String(params.limit));

    const queryString = searchParams.toString();
    const url = `/api/care-company/applicants${queryString ? `?${queryString}` : ""}`;

    const response = await fetch(url, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      cache: "no-store",
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data?.message || "Failed to fetch applicants");
    }

    return data;
  },

  /**
   * Create / insert a new applicant
   */
  async createApplicant(
    payload: Partial<Applicant>
  ): Promise<ApplicantsApiResponse<Applicant>> {
    const response = await fetch("/api/care-company/applicants", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data?.message || "Failed to create applicant");
    }

    return data;
  },

  /**
   * Update applicant status and/or add note
   */
  async updateStatus(
    id: string,
    status: string,
    reason?: string
  ): Promise<ApplicantsApiResponse<Applicant>> {
    const response = await fetch(`/api/care-company/applicants/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status, reason }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data?.message || "Failed to update applicant status");
    }

    return data;
  },
};

export default applicantsApi;
