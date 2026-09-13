import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { getDashboardPath, hasWebsiteDashboard } from "@/lib/auth/dashboard";

/**
 * Session-backed dashboard gateway. Keeping this decision on the server means
 * Navbar clicks always use the latest authenticated role, not stale client
 * state from a previous login.
 */
export default async function DashboardGatewayPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get("bedders_access_token")?.value;
  const role = cookieStore.get("bedders_role")?.value;

  if (!token || !role) {
    redirect("/login");
  }

  const destination = getDashboardPath(role);

  // This site only has Carer, Care Company, and Agency dashboards. A valid
  // session for any other role remains on the public site; it is not forced
  // back to the login page.
  if (!hasWebsiteDashboard(role)) {
    redirect("/");
  }

  redirect(destination);
}
