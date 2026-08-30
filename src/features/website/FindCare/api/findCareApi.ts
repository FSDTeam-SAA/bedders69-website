import api from "@/lib/api";
import {
  ApiResponse,
  CarerItem,
  CarerSearchParams,
} from "../types/findCare.types";

export const findCareApi = {
  /**
   * Search public carers directory
   */
  async getCarers(
    params: CarerSearchParams = { limit: 50, page: 1 }
  ): Promise<ApiResponse<CarerItem[]>> {
    const response = await api.get<ApiResponse<CarerItem[]>>(
      "/profiles/search-carers",
      {
        params,
      }
    );
    return response.data;
  },

  /**
   * Get carer by ID or slug match
   */
  async getCarerByIdOrSlug(idOrSlug: string): Promise<CarerItem | null> {
    const response = await api.get<ApiResponse<CarerItem[]>>(
      "/profiles/search-carers",
      {
        params: { limit: 50, page: 1 },
      }
    );

    if (response.data && response.data.data) {
      const decoded = decodeURIComponent(idOrSlug).toLowerCase().replace(/\s+/g, "-");
      const found = response.data.data.find(
        (c) =>
          c.id === idOrSlug ||
          c.careName.toLowerCase().replace(/\s+/g, "-") === decoded ||
          encodeURIComponent(c.careName.toLowerCase().replace(/\s+/g, "-")) === idOrSlug
      );
      return found || null;
    }
    return null;
  },
};

export default findCareApi;
