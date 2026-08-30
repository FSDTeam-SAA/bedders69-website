import api from "@/lib/api";
import {
  AgencyItem,
  AgencySearchParams,
  ApiResponse,
  CareCompanyItem,
  CareCompanySearchParams,
  CarerItem,
  CarerSearchParams,
  JobItem,
  JobSearchParams,
  MarketplaceItem,
  MarketplaceSearchParams,
} from "../types/home.types";

export const homeApi = {
  /**
   * Fetch approved care companies for featured companies section & directory
   */
  async getFeaturedCareCompanies(
    params: CareCompanySearchParams = { limit: 6, page: 1 }
  ): Promise<ApiResponse<CareCompanyItem[]>> {
    const response = await api.get<ApiResponse<CareCompanyItem[]>>(
      "/profiles/search-care-companies",
      {
        params,
      }
    );
    return response.data;
  },

  /**
   * Fetch approved recruitment agencies
   */
  async getFeaturedAgencies(
    params: AgencySearchParams = { limit: 6, page: 1 }
  ): Promise<ApiResponse<AgencyItem[]>> {
    const response = await api.get<ApiResponse<AgencyItem[]>>(
      "/profiles/search-recruitment-agencies",
      {
        params,
      }
    );
    return response.data;
  },

  /**
   * Fetch approved care jobs
   */
  async getLatestJobs(
    params: JobSearchParams = { limit: 10, page: 1 }
  ): Promise<ApiResponse<JobItem[]>> {
    const response = await api.get<ApiResponse<JobItem[]>>("/jobs/search-jobs", {
      params,
    });
    return response.data;
  },

  /**
   * Fetch approved marketplace products & listings
   */
  async getMarketplaceListings(
    params: MarketplaceSearchParams = { limit: 4, page: 1 }
  ): Promise<ApiResponse<MarketplaceItem[]>> {
    const response = await api.get<ApiResponse<MarketplaceItem[]>>(
      "/marketplace/search-marketplace-listings",
      {
        params,
      }
    );
    return response.data;
  },

  /**
   * Fetch public carers directory
   */
  async getCarers(
    params: CarerSearchParams = { limit: 50, page: 1 }
  ): Promise<ApiResponse<CarerItem[]>> {
    const response = await api.get<ApiResponse<CarerItem[]>>(
      "/profiles/search-carers",
      {
        params,
      }
    );
    return response.data;
  },
};

export default homeApi;