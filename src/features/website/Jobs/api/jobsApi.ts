import api from "@/lib/api";
import {
  ApiResponse,
  JobItem,
  JobSearchParams,
} from "../types/jobs.types";
import { fallbackJobs } from "../data/fallbackJobs";
import { matchJobCategory, matchJobSearch } from "../utils/jobMatching";

export const jobsApi = {
  /**
   * Search public approved care jobs with fallback support
   */
  async getJobs(
    params: JobSearchParams = { limit: 50, page: 1 }
  ): Promise<ApiResponse<JobItem[]>> {
    try {
      const response = await api.get<ApiResponse<JobItem[]>>("/jobs/search-jobs", {
        params,
      });
      if (
        response.data &&
        Array.isArray(response.data.data) &&
        response.data.data.length > 0
      ) {
        return response.data;
      }
    } catch (err) {
      console.warn("jobsApi: API call failed or unavailable, using fallback care jobs:", err);
    }

    let filtered = [...fallbackJobs];
    if (params.category && params.category !== "All") {
      filtered = filtered.filter((j) =>
        matchJobCategory(
          {
            title: j.title,
            tags: j.requiredSkills || [],
            type: j.jobType,
            description: j.description,
          },
          params.category!
        )
      );
    }
    if (params.search && params.search.trim()) {
      filtered = filtered.filter((j) =>
        matchJobSearch(
          {
            title: j.title,
            company: j.organization?.name,
            location: j.location || j.city,
            type: j.jobType,
            tags: j.requiredSkills || [],
            description: j.description,
          },
          params.search!
        )
      );
    }

    return {
      statusCode: 200,
      success: true,
      message: "Care jobs loaded successfully",
      meta: {
        page: 1,
        limit: filtered.length,
        total: filtered.length,
      },
      data: filtered,
    };
  },

  /**
   * Get care job by ID or slug match
   */
  async getJobByIdOrSlug(idOrSlug: string): Promise<JobItem | null> {
    const res = await this.getJobs({ limit: 50, page: 1 });
    if (res && res.data) {
      const decoded = decodeURIComponent(idOrSlug).toLowerCase().replace(/\s+/g, "-");
      const found = res.data.find(
        (j) =>
          j.id === idOrSlug ||
          j.title.toLowerCase().replace(/\s+/g, "-") === decoded ||
          encodeURIComponent(j.title.toLowerCase().replace(/\s+/g, "-")) === idOrSlug
      );
      return found || null;
    }
    return null;
  },
};

export default jobsApi;
