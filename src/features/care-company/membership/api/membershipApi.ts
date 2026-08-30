import { PackagesApiResponse } from "../types/membership.types";

export const membershipApi = {
  /**
   * Fetch active membership packages
   */
  async getMembershipPackages(): Promise<PackagesApiResponse> {
    const response = await fetch("/api/care-company/membership", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      cache: "no-store",
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data?.message || "Failed to fetch membership packages");
    }

    return data;
  },
};

export default membershipApi;
