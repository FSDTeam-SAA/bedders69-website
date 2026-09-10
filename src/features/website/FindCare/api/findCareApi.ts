import {
  ApiResponse,
  CarerItem,
  CarerSearchParams,
} from "../types/findCare.types";

export const findCareApi = {
  /**
   * Search carers directory (requires authenticated user)
   */
  async getCarers(
    params: CarerSearchParams = { limit: 50, page: 1 }
  ): Promise<ApiResponse<CarerItem[]>> {
    const searchParams = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== "") {
        searchParams.append(key, String(value));
      }
    });

    const query = searchParams.toString();
    const url = `/api/find-care/carers${query ? `?${query}` : ""}`;

    const res = await fetch(url, {
      cache: "no-store",
    });

    if (!res.ok) {
      const errData = await res.json().catch(() => ({}));
      throw new Error(errData?.message || "Failed to fetch carers");
    }

    return res.json();
  },

  /**
   * Get carer by ID or slug match
   */
  async getCarerByIdOrSlug(idOrSlug: string): Promise<CarerItem | null> {
    try {
      const response = await this.getCarers({ limit: 50, page: 1 });
      if (response && response.data) {
        const decoded = decodeURIComponent(idOrSlug).toLowerCase().replace(/\s+/g, "-");
        const found = response.data.find(
          (c) =>
            c.id === idOrSlug ||
            c.careName.toLowerCase().replace(/\s+/g, "-") === decoded ||
            encodeURIComponent(c.careName.toLowerCase().replace(/\s+/g, "-")) === idOrSlug
        );
        return found || null;
      }
    } catch {
      return null;
    }
    return null;
  },
};

export default findCareApi;
