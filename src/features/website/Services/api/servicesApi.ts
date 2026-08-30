import api from "@/lib/api";
import {
  ApiResponse,
  CareCompanyItem,
  CareCompanySearchParams,
} from "../types/services.types";

export const servicesApi = {
  /**
   * Fetch approved care companies with search, postcode, and pagination
   */
  async getCareCompanies(
    params: CareCompanySearchParams = { limit: 50, page: 1 }
  ): Promise<ApiResponse<CareCompanyItem[]>> {
    const response = await api.get<ApiResponse<CareCompanyItem[]>>(
      "/profiles/search-care-companies",
      {
        params,
      }
    );
    return response.data;
  },

  /**
   * Get care company by ID or slug match
   */
  async getCareCompanyByIdOrSlug(idOrSlug: string): Promise<CareCompanyItem | null> {
    const response = await api.get<ApiResponse<CareCompanyItem[]>>(
      "/profiles/search-care-companies",
      {
        params: { limit: 50, page: 1 },
      }
    );

    if (response.data && response.data.data) {
      const decoded = decodeURIComponent(idOrSlug).toLowerCase().replace(/\s+/g, "-");
      const found = response.data.data.find(
        (c) =>
          c.id === idOrSlug ||
          c.companyName.toLowerCase().replace(/\s+/g, "-") === decoded ||
          encodeURIComponent(c.companyName.toLowerCase().replace(/\s+/g, "-")) === idOrSlug
      );
      return found || null;
    }
    return null;
  },
};

export default servicesApi;
