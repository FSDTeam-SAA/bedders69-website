import {
  ContactRequest,
  ContactRequestsApiResponse,
} from "../types/contactRequests.types";

export const contactRequestsApi = {
  /**
   * Fetch contact requests with optional pagination and status filter
   */
  async getContactRequests(params?: {
    page?: number;
    limit?: number;
    status?: string;
  }): Promise<ContactRequestsApiResponse<ContactRequest[]>> {
    const searchParams = new URLSearchParams();
    if (params?.page) searchParams.set("page", String(params.page));
    if (params?.limit) searchParams.set("limit", String(params.limit));
    if (params?.status && params.status !== "All")
      searchParams.set("status", params.status);

    const queryString = searchParams.toString();
    const url = `/api/care-company/contact-requests${
      queryString ? `?${queryString}` : ""
    }`;

    const response = await fetch(url, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      cache: "no-store",
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data?.message || "Failed to fetch contact requests");
    }

    return data;
  },

  /**
   * Create a new contact request
   */
  async createContactRequest(
    payload: Partial<ContactRequest>
  ): Promise<ContactRequestsApiResponse<ContactRequest>> {
    const response = await fetch("/api/care-company/contact-requests", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data?.message || "Failed to create contact request");
    }

    return data;
  },

  /**
   * Update contact request status (Accepted or Rejected)
   */
  async updateStatus(
    id: string,
    status: "Accepted" | "Rejected"
  ): Promise<ContactRequestsApiResponse<ContactRequest>> {
    const response = await fetch(`/api/care-company/contact-requests/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(
        data?.message || "Failed to update contact request status"
      );
    }

    return data;
  },
};

export default contactRequestsApi;
