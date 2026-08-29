"use client";

import React, { FormEvent, useMemo, useState } from "react";
import { Check, Eye, EyeOff, X } from "lucide-react";

function PasswordField({
  label,
  value,
  onChange,
  visible,
  onToggleVisibility,
  hasError = false,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  visible: boolean;
  onToggleVisibility: () => void;
  hasError?: boolean;
}) {
  return (
    <label className="flex w-full flex-col gap-2">
      <span className="text-base font-medium leading-5 text-slate-800">{label}</span>
      <div
        className={`flex h-14 items-center rounded-md border bg-white/70 px-4 ${
          hasError ? "border-red-400" : "border-neutral-400"
        }`}
      >
        <input
          type={visible ? "text" : "password"}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder="********"
          className="w-full bg-transparent text-base text-slate-700 outline-none placeholder:text-gray-500"
        />
        <button
          type="button"
          onClick={onToggleVisibility}
          className="inline-flex h-6 w-6 items-center justify-center text-gray-500"
          aria-label={visible ? "Hide password" : "Show password"}
        >
          {visible ? <EyeOff className="h-5 w-5" strokeWidth={1.7} /> : <Eye className="h-5 w-5" strokeWidth={1.7} />}
        </button>
      </div>
    </label>
  );
}

export function CarerSecurityPage() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const rules = useMemo(() => {
    const password = confirmPassword;

    return [
      {
        label: "Minimum 8–12 characters (recommend 12+ for stronger security).",
        valid: password.length >= 8,
      },
      {
        label: "At least one uppercase letter must.",
        valid: /[A-Z]/.test(password),
      },
      {
        label: "At least one lowercase letter must.",
        valid: /[a-z]/.test(password),
      },
      {
        label: "At least one number must (0–9).",
        valid: /\d/.test(password),
      },
      {
        label: "At least special character (! @ # $ % ^ & * etc.).",
        valid: /[!@#$%^&*(),.?\":{}|<>_\-+=/\\[\];']/ .test(password),
      },
      {
        label: "No spaces allowed.",
        valid: !/\s/.test(password),
      },
    ];
  }, [confirmPassword]);

  const confirmHasError = confirmPassword.length > 0 && confirmPassword !== newPassword;
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (confirmHasError) return setMessage("New passwords do not match.");
    setIsSaving(true); setMessage("");
    const response = await fetch("/api/auth/change-password", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ oldPassword: currentPassword, newPassword }) });
    const body = await response.json(); setIsSaving(false);
    if (!response.ok) return setMessage(body?.message || "Unable to change password.");
    setCurrentPassword(""); setNewPassword(""); setConfirmPassword(""); setMessage("Password changed successfully.");
  };

  return (
    <div className="min-h-screen bg-white px-6 py-6 sm:px-8 xl:px-10">
      <section className="rounded-2xl bg-cyan-700/5 p-5 outline outline-1 outline-neutral-200">
        <h2 className="text-[32px] font-medium leading-10 text-slate-800">Changes Password</h2>

        <form onSubmit={handleSubmit} className="mt-5 flex flex-col gap-5">
          <div className="grid gap-4 lg:grid-cols-2">
            <PasswordField
              label="Current Password"
              value={currentPassword}
              onChange={setCurrentPassword}
              visible={showCurrentPassword}
              onToggleVisibility={() => setShowCurrentPassword((current) => !current)}
            />
            <PasswordField
              label="New Password"
              value={newPassword}
              onChange={setNewPassword}
              visible={showNewPassword}
              onToggleVisibility={() => setShowNewPassword((current) => !current)}
            />
          </div>

          <PasswordField
            label="Confirm New Password"
            value={confirmPassword}
            onChange={setConfirmPassword}
            visible={showConfirmPassword}
            onToggleVisibility={() => setShowConfirmPassword((current) => !current)}
            hasError={confirmHasError}
          />

          <div className="flex flex-col gap-3 pt-1">
            {rules.map((rule) => (
              <div
                key={rule.label}
                className={`inline-flex items-center gap-3 text-base leading-5 ${
                  rule.valid ? "text-emerald-600" : "text-red-500"
                }`}
              >
                {rule.valid ? (
                  <Check className="h-5 w-5" strokeWidth={1.7} />
                ) : (
                  <X className="h-5 w-5" strokeWidth={1.7} />
                )}
                <span>{rule.label}</span>
              </div>
            ))}
          </div>

          {message ? <p role="status" className={message.includes("successfully") ? "text-emerald-600" : "text-red-500"}>{message}</p> : null}
          <div className="flex items-center justify-end gap-2 pt-4">
            <button
              type="reset"
              onClick={() => { setCurrentPassword(""); setNewPassword(""); setConfirmPassword(""); setMessage(""); }}
              className="inline-flex min-w-[138px] items-center justify-center rounded-lg border border-cyan-700 px-8 py-4 text-base font-medium leading-5 text-cyan-700 transition hover:bg-white cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSaving}
              className="inline-flex min-w-[138px] items-center justify-center rounded-lg bg-cyan-700 px-8 py-4 text-base font-medium leading-5 text-white transition hover:bg-cyan-800 cursor-pointer"
            >
              {isSaving ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}
