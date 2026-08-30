import {
  CareCompanyProfile,
  CompanyProfileResponse,
  UpdateCompanyProfilePayload,
} from "../types/companyProfile.types";

export const companyProfileApi = {
  /**
   * Fetch care company profile data for the authenticated user
   */
  async getMyProfile(): Promise<CompanyProfileResponse<CareCompanyProfile>> {
    const response = await fetch("/api/care-company/profile", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      cache: "no-store",
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data?.message || "Failed to fetch care company profile");
    }

    return data;
  },

  /**
   * Update care company profile data
   */
  async updateMyProfile(
    payload: UpdateCompanyProfilePayload
  ): Promise<CompanyProfileResponse<CareCompanyProfile>> {
    const response = await fetch("/api/care-company/profile", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data?.message || "Failed to update profile");
    }

    return data;
  },
};

export default companyProfileApi;
