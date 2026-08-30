import api from "@/lib/api";
import {
  ApiResponse,
  AgencyItem,
  AgencySearchParams,
} from "../types/agencies.types";

export const agenciesApi = {
  /**
   * Search public recruitment agencies
   */
  async getAgencies(
    params: AgencySearchParams = { limit: 50, page: 1 }
  ): Promise<ApiResponse<AgencyItem[]>> {
    const response = await api.get<ApiResponse<AgencyItem[]>>(
      "/profiles/search-recruitment-agencies",
      {
        params,
      }
    );
    return response.data;
  },

  /**
   * Get recruitment agency by ID or slug
   */
  async getAgencyByIdOrSlug(idOrSlug: string): Promise<AgencyItem | null> {
    const response = await api.get<ApiResponse<AgencyItem[]>>(
      "/profiles/search-recruitment-agencies",
      {
        params: { limit: 50, page: 1 },
      }
    );

    if (response.data && response.data.data) {
      const decoded = decodeURIComponent(idOrSlug).toLowerCase().replace(/\s+/g, "-");
      const found = response.data.data.find(
        (a) =>
          a.id === idOrSlug ||
          a.organizationName.toLowerCase().replace(/\s+/g, "-") === decoded ||
          encodeURIComponent(a.organizationName.toLowerCase().replace(/\s+/g, "-")) === idOrSlug
      );
      return found || null;
    }
    return null;
  },
};

export default agenciesApi;
