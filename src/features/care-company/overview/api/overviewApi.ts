import { DashboardOverviewApiResponse } from "../types/overview.types";

export const overviewApi = {
  /**
   * Fetch dashboard overview data including company stats and recent applicants
   */
  async getDashboardOverview(): Promise<DashboardOverviewApiResponse> {
    const response = await fetch("/api/care-company/overview", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      cache: "no-store",
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data?.message || "Failed to fetch dashboard overview");
    }

    return data;
  },
};

export default overviewApi;
