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
  hourlyRate?: string;
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
