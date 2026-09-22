/** Normalise role values received from the session/cookie before routing. */
export function normalizeRole(role?: string | null): string {
  const r = (role ?? "").toLowerCase().trim().replace(/[\s-]+/g, "_");
  if (r === "product_supplier") return "supplier";
  if (r === "service") return "service_provider";
  return r;
}

export function getSupplierDashboardUrl(): string {
  const envUrl =
    process.env.NEXT_PUBLIC_SUPPLIER_DASHBOARD_URL ||
    process.env.SUPPLIER_DASHBOARD_URL ||
    process.env.NEXT_PUBLIC_EXTERNAL_DASHBOARD_URL ||
    "http://localhost:3001/supplier";

  try {
    const url = new URL(envUrl.trim());
    if (url.pathname === "/" || url.pathname === "" || url.pathname === "/supplir") {
      url.pathname = "/supplier";
    }
    return url.toString().replace(/\/+$/, "");
  } catch {
    const trimmed = envUrl.trim().replace(/\/+$/, "");
    if (trimmed.endsWith("/supplier")) {
      return trimmed;
    }
    if (trimmed.endsWith("/supplir")) {
      return trimmed.replace(/\/supplir$/, "/supplier");
    }
    return `${trimmed}/supplier`;
  }
}

export function getServiceProviderDashboardUrl(): string {
  const envUrl =
    process.env.NEXT_PUBLIC_SERVICE_PROVIDER_DASHBOARD_URL ||
    process.env.SERVICE_PROVIDER_DASHBOARD_URL ||
    process.env.NEXT_PUBLIC_SUPPLIER_DASHBOARD_URL ||
    process.env.SUPPLIER_DASHBOARD_URL ||
    process.env.NEXT_PUBLIC_EXTERNAL_DASHBOARD_URL ||
    "http://localhost:3001/service";

  try {
    const url = new URL(envUrl.trim());
    if (url.pathname === "/" || url.pathname === "") {
      url.pathname = "/service";
    }
    return url.toString().replace(/\/+$/, "");
  } catch {
    const trimmed = envUrl.trim().replace(/\/+$/, "");
    if (trimmed.endsWith("/service")) {
      return trimmed;
    }
    return `${trimmed}/service`;
  }
}

/** The dashboard routes that exist for each role (local or external). */
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
    case "supplier":
      return getSupplierDashboardUrl();
    case "service_provider":
      return getServiceProviderDashboardUrl();
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
    (required === "agency" && current === "recruitment_agency") ||
    (required === "supplier" && current === "product_supplier") ||
    (required === "service_provider" && current === "service")
  );
}
