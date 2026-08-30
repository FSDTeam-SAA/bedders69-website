export interface ApiMeta {
  page: number;
  limit: number;
  total: number;
}

export interface ApiResponse<T> {
  statusCode?: number;
  success?: boolean;
  message: string;
  meta?: ApiMeta;
  data: T;
}

export interface CareCompanyItem {
  id: string;
  companyName: string;
  email: string;
  phoneNumber?: string;
  address?: string;
  postCode?: string;
  websiteLink?: string;
  logo?: string;
  coverPhoto?: string;
  coverageRegions?: string[];
  serviceOffered?: string[];
  status?: string;
  profileCompletionStatus?: string;
  createdAt?: string;
}

export interface CareCompanySearchParams {
  search?: string;
  postCode?: string;
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}
