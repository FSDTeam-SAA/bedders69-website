import { SavedCarerItem, SavedCarersResponse } from "../types/savedCarers.types";

export const savedCarersApi = {
  /**
   * Fetch all saved carers for the authenticated company
   */
  async getSavedCarers(): Promise<SavedCarersResponse<SavedCarerItem[]>> {
    const response = await fetch("/api/care-company/saved-carers", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      cache: "no-store",
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data?.message || "Failed to fetch saved carers");
    }

    return data;
  },

  /**
   * Save a new carer
   */
  async saveCarer(carer: Partial<SavedCarerItem>): Promise<SavedCarersResponse<SavedCarerItem>> {
    const response = await fetch("/api/care-company/saved-carers", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(carer),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data?.message || "Failed to save carer");
    }

    return data;
  },

  /**
   * Get single saved carer detail
   */
  async getSavedCarerDetail(id: string): Promise<SavedCarersResponse<SavedCarerItem>> {
    const response = await fetch(`/api/care-company/saved-carers/${id}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      cache: "no-store",
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data?.message || "Failed to fetch carer details");
    }

    return data;
  },

  /**
   * Remove a carer from saved list
   */
  async removeSavedCarer(id: string): Promise<{ success: boolean; message: string }> {
    const response = await fetch(`/api/care-company/saved-carers/${id}`, {
      method: "DELETE",
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data?.message || "Failed to remove carer");
    }

    return data;
  },
};

export default savedCarersApi;
