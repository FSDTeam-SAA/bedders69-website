/** Normalise role values received from the session/cookie before routing. */
export function normalizeRole(role?: string | null): string {
  return (role ?? "").toLowerCase().trim().replace(/[\s-]+/g, "_");
}

/** The dashboard routes that actually exist in this website. */
export function getDashboardPath(role?: string | null): string {
  switch (normalizeRole(role)) {
    case "care_company":
      return "/care-company/dashboard-overview";
    case "agency":
    case "recruitment_agency":
      return "/recruitment-agency/overview";
    case "care":
    case "carer":
      return "/care";
    default:
      return "/";
  }
}

export function hasWebsiteDashboard(role?: string | null): boolean {
  return getDashboardPath(role) !== "/";
}

export function hasRole(role: string | null | undefined, requiredRole: string): boolean {
  const current = normalizeRole(role);
  const required = normalizeRole(requiredRole);

  return (
    current === required ||
    (required === "carer" && current === "care") ||
    (required === "agency" && current === "recruitment_agency")
  );
}
