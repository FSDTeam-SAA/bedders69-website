import api from "@/lib/api";
import {
  ApiResponse,
  PackageItem,
  PackageSearchParams,
} from "../types/membership.types";

export const membershipApi = {
  /**
   * Fetch active membership packages
   */
  async getMembershipPackages(params?: PackageSearchParams): Promise<any[]> {
    const response = await api.get<any>("/membership-plans", { params });

    if (response.data) {
      if (Array.isArray(response.data)) {
        return response.data;
      }
      if (Array.isArray(response.data.data)) {
        return response.data.data;
      }
      if (response.data.data && Array.isArray(response.data.data.data)) {
        return response.data.data.data;
      }
    }
    return [];
  },

  /**
   * Get single package by ID
   */
  async getPackageById(id: string): Promise<PackageItem | null> {
    const response = await api.get<ApiResponse<PackageItem>>(
      `/packages/get-package/${id}`
    );
    if (response.data && response.data.data) {
      return response.data.data;
    }
    return null;
  },
};

export default membershipApi;
