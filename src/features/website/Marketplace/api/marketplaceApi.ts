import api from "@/lib/api";
import {
  ApiResponse,
  MarketplaceItem,
  MarketplaceSearchParams,
} from "../types/marketplace.types";

export const marketplaceApi = {
  /**
   * Search public approved marketplace listings
   */
  async getListings(
    params: MarketplaceSearchParams = { limit: 50, page: 1 }
  ): Promise<ApiResponse<MarketplaceItem[]>> {
    const response = await api.get<ApiResponse<MarketplaceItem[]>>(
      "/marketplace/search-marketplace-listings",
      {
        params,
      }
    );
    return response.data;
  },

  /**
   * Get single marketplace listing by ID or slug match
   */
  async getListingByIdOrSlug(idOrSlug: string): Promise<MarketplaceItem | null> {
    try {
      // First try single ID endpoint
      const direct = await api.get<ApiResponse<MarketplaceItem>>(
        `/marketplace/get-marketplace-listing/${idOrSlug}`
      );
      if (direct.data && direct.data.data) {
        return direct.data.data;
      }
    } catch {
      // If direct ID lookup fails (e.g. slug passed), search listings
    }

    const response = await api.get<ApiResponse<MarketplaceItem[]>>(
      "/marketplace/search-marketplace-listings",
      {
        params: { limit: 50, page: 1 },
      }
    );

    if (response.data && response.data.data) {
      const decoded = decodeURIComponent(idOrSlug).toLowerCase().replace(/\s+/g, "-");
      const found = response.data.data.find(
        (item) =>
          item.id === idOrSlug ||
          item.title.toLowerCase().replace(/\s+/g, "-") === decoded ||
          encodeURIComponent(item.title.toLowerCase().replace(/\s+/g, "-")) === idOrSlug
      );
      return found || null;
    }
    return null;
  },
};

export default marketplaceApi;
