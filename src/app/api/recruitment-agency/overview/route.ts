import { NextResponse } from "next/server";
import { cookies } from "next/headers";

const backendUrl =
  process.env.BACKEND_API_URL ||
  process.env.NEXT_PUBLIC_BACKEND_API_URL ||
  "http://localhost:8080/api/v1";

export async function GET() {
  try {
    const token = (await cookies()).get("bedders_access_token")?.value;
    if (!token) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const headers = { Authorization: `Bearer ${token}` };

    const [requestsRes, jobsRes, applicantsRes, profileRes] = await Promise.all([
      fetch(`${backendUrl}/company/get-contact-requests`, { headers, cache: "no-store" }).catch(() => null),
      fetch(`${backendUrl}/jobs/get-my-jobs`, { headers, cache: "no-store" }).catch(() => null),
      fetch(`${backendUrl}/job-applications/get-organization-applicants`, { headers, cache: "no-store" }).catch(() => null),
      fetch(`${backendUrl}/agency/get-my-profile`, { headers, cache: "no-store" }).catch(() => null),
    ]);

    const requestsData = requestsRes && requestsRes.ok ? await requestsRes.json() : null;
    const jobsData = jobsRes && jobsRes.ok ? await jobsRes.json() : null;
    const applicantsData = applicantsRes && applicantsRes.ok ? await applicantsRes.json() : null;
    const profileData = profileRes && profileRes.ok ? await profileRes.json() : null;

    const requestsList = Array.isArray(requestsData?.data)
      ? requestsData.data
      : Array.isArray(requestsData)
      ? requestsData
      : [];
    const jobsList = Array.isArray(jobsData?.data)
      ? jobsData.data
      : Array.isArray(jobsData)
      ? jobsData
      : [];
    const applicantsList = Array.isArray(applicantsData?.data)
      ? applicantsData.data
      : Array.isArray(applicantsData)
      ? applicantsData
      : [];
    const profile = profileData?.data || profileData || {};

    const totalRequests = requestsData?.meta?.total ?? requestsList.length;
    const completedRequests = requestsList.filter(
      (r: any) => r.status === "accepted" || r.status === "completed"
    ).length;
    const totalJobPosts = jobsData?.meta?.total ?? jobsList.length;
    const totalApplicants = applicantsData?.meta?.total ?? applicantsList.length;

    // Aggregate top applied positions
    const titleCounts: Record<string, number> = {};
    applicantsList.forEach((app: any) => {
      const title = app.jobId?.title || app.jobTitle || app.title || app.role || "Care Assistant";
      titleCounts[title] = (titleCounts[title] || 0) + 1;
    });

    const mostApplied = Object.entries(titleCounts)
      .map(([title, count]) => ({ title, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5);

    // Calculate monthly placement pipeline
    const monthlyPipeline = Array(12).fill(0);
    let totalActivity = 0;

    applicantsList.forEach((app: any) => {
      const dateStr = app.createdAt || app.appliedAt;
      if (dateStr) {
        const d = new Date(dateStr);
        if (!isNaN(d.getTime())) {
          monthlyPipeline[d.getMonth()] += 1;
          totalActivity++;
        }
      }
    });

    requestsList.forEach((req: any) => {
      const dateStr = req.createdAt || req.updatedAt;
      if (dateStr) {
        const d = new Date(dateStr);
        if (!isNaN(d.getTime())) {
          monthlyPipeline[d.getMonth()] += 1;
          totalActivity++;
        }
      }
    });

    return NextResponse.json({
      totalRequests,
      completedRequests,
      totalJobPosts,
      totalApplicants,
      mostApplied,
      monthlyPipeline,
      agencyName: profile.name || "CareRecruitPro",
      logoUrl: profile.logoUrl || profile.logo || "",
    });
  } catch (error: any) {
    return NextResponse.json(
      { message: error?.message || "Internal server error" },
      { status: 500 }
    );
  }
}
