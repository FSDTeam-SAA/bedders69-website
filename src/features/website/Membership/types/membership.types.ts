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

export interface PackageItem {
  _id?: string;
  id?: string;
  name: string;
  description?: string;
  type: "membership" | "job_posting" | "marketplace_listing" | "advertisement" | "premium_profile";
  price: number;
  features: string[];
  durationDays: number;
  usageLimit?: number;
  isActive: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface PackageSearchParams {
  searchTerm?: string;
  type?: string;
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}

export interface PlanCardProps {
  id: string;
  name: string;
  priceMonthly: number;
  priceYearly: number;
  description: string;
  buttonText: string;
  icon: any;
  accent: string;
  isPopular?: boolean;
  bgBtn: string;
  features: string[];
}
