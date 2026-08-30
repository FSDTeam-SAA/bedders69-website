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

export interface AgencyItem {
  id: string;
  organizationName: string;
  email: string;
  phoneNumber?: string;
  address?: string;
  city?: string;
  postCode?: string;
  websiteLink?: string;
  description?: string;
  services?: string[];
  status?: string;
  profileCompletionStatus?: string;
  createdAt?: string;
}

export interface AgencySearchParams {
  search?: string;
  city?: string;
  postCode?: string;
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}

export interface JobItem {
  id: string;
  title: string;
  description?: string;
  location?: string;
  city?: string;
  postCode?: string;
  jobType?: string;
  salaryMin?: number;
  salaryMax?: number;
  salaryCurrency?: string;
  requiredSkills?: string[];
  requiredExperience?: number;
  requirements?: string[];
  organization?: {
    id: string;
    name: string;
    email: string;
  } | null;
  publishedAt?: string;
  createdAt?: string;
}

export interface JobSearchParams {
  search?: string;
  city?: string;
  postCode?: string;
  jobType?: string;
  requiredSkills?: string;
  minExperience?: number;
  salaryMin?: number;
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}

export interface MarketplaceItem {
  id: string;
  title: string;
  description?: string;
  category: string;
  price?: number;
  currency?: string;
  city?: string;
  postCode?: string;
  photos?: string[];
  viewCount?: number;
  inquiryCount?: number;
  seller?: {
    id: string;
    name: string;
    email: string;
  } | null;
  publishedAt?: string;
  createdAt?: string;
}

export interface MarketplaceSearchParams {
  search?: string;
  category?: string;
  city?: string;
  postCode?: string;
  minPrice?: number;
  maxPrice?: number;
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}

export interface CarerItem {
  id: string;
  careName: string;
  profilePicture?: string;
  phoneNumber?: string;
  email?: string;
  address?: string;
  postCode?: string;
  shifts?: string;
  specialisms?: string[];
  skills?: string[];
  yearsOfExperience?: number;
  hasDrivingLicense?: boolean;
  hasVehicle?: boolean;
  isAvailable?: boolean;
  professionalSummary?: string;
  createdAt?: string;
}

export interface CarerSearchParams {
  search?: string;
  city?: string;
  postCode?: string;
  skills?: string;
  specialisms?: string;
  yearsOfExperience?: number;
  isAvailable?: boolean;
  hasDrivingLicense?: boolean;
  hasVehicle?: boolean;
  shifts?: string;
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}