"use client";

import { useState } from "react";
import settingsApi from "../api/settingsApi";
import { ChangePasswordPayload } from "../types/settings.types";

export function useSettings() {
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const changePassword = async (
    payload: ChangePasswordPayload
  ): Promise<{ success: boolean; message: string }> => {
    setIsSaving(true);
    setError(null);
    setSuccessMessage(null);

    try {
      const response = await settingsApi.changePassword(payload);
      const msg = response?.message || "Password changed successfully!";
      setSuccessMessage(msg);
      return { success: true, message: msg };
    } catch (err: any) {
      const errorMsg = err?.message || "Failed to change password. Please verify your current password.";
      setError(errorMsg);
      return { success: false, message: errorMsg };
    } finally {
      setIsSaving(false);
    }
  };

  return {
    isSaving,
    error,
    setError,
    successMessage,
    setSuccessMessage,
    changePassword,
  };
}

export default useSettings;
