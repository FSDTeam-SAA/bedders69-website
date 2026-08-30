import api from "@/lib/api";
import {
  ApiResponse,
  JobItem,
  JobSearchParams,
} from "../types/jobs.types";

export const jobsApi = {
  /**
   * Search public approved care jobs
   */
  async getJobs(
    params: JobSearchParams = { limit: 50, page: 1 }
  ): Promise<ApiResponse<JobItem[]>> {
    const response = await api.get<ApiResponse<JobItem[]>>("/jobs/search-jobs", {
      params,
    });
    return response.data;
  },

  /**
   * Get care job by ID or slug match
   */
  async getJobByIdOrSlug(idOrSlug: string): Promise<JobItem | null> {
    const response = await api.get<ApiResponse<JobItem[]>>("/jobs/search-jobs", {
      params: { limit: 50, page: 1 },
    });

    if (response.data && response.data.data) {
      const decoded = decodeURIComponent(idOrSlug).toLowerCase().replace(/\s+/g, "-");
      const found = response.data.data.find(
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
