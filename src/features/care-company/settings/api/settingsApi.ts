import {
  ChangePasswordPayload,
  ChangePasswordResponse,
} from "../types/settings.types";

export const settingsApi = {
  /**
   * Change password for the current authenticated user
   */
  async changePassword(
    payload: ChangePasswordPayload
  ): Promise<ChangePasswordResponse> {
    const response = await fetch("/api/auth/change-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data?.message || "Failed to change password");
    }

    return data;
  },
};

export default settingsApi;
