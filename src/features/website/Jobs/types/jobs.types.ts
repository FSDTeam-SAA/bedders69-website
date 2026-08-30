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

export interface JobProps {
  id?: string;
  title: string;
  company: string;
  urgent: boolean;
  location: string;
  type: string;
  salary: string;
  tags: string[];
  rawSalaryMin?: number;
  rawSalaryMax?: number;
  experienceYears?: number;
  publishedAt?: string;
}
