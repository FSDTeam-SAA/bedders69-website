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

export interface AgencyProps {
  id?: string;
  name: string;
  location: string;
  rating: string;
  reviews: number;
  services: string[];
  imageBg?: string;
  phone?: string;
  email?: string;
  website?: string;
  description?: string;
}
