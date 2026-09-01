export interface CreateJobFormPayload {
  title: string;
  department?: string;
  jobType?: 'full_time' | 'part_time' | 'contract' | 'temporary' | 'permanent';
  description?: string;
  requirements?: string[];
  requiredSkills?: string[];
  minExperience?: string;
  pinRequired?: string;
  salaryMin?: number;
  salaryMax?: number;
  salaryCurrency?: string;
  benefits?: string[];
  closesAt?: string;
  workLocations?: string[];
  location?: string;
  address?: string;
  city?: string;
  postCode?: string;
  workingPatterns?: string[];
  hoursPerWeek?: string;
  contractType?: string;
  isFeaturedBoost?: boolean;
  isUrgentHire?: boolean;
}

export interface JobItem {
  _id?: string;
  id?: string;
  organizationUserId?: string;
  title: string;
  department?: string;
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
  benefits?: string[];
  hoursPerWeek?: string;
  contractType?: string;
  workLocations?: string[];
  workingPatterns?: string[];
  minExperience?: string;
  pinRequired?: string;
  isFeaturedBoost?: boolean;
  isUrgentHire?: boolean;
  status: string;
  isPublished: boolean;
  publishedAt?: string;
  closesAt?: string;
  createdAt?: string;
  updatedAt?: string;
  rejectionReason?: string | null;
  reason?: string | null;
  rejection_reason?: string | null;
}

export interface CreateJobApiResponse<T = JobItem> {
  statusCode?: number;
  success?: boolean;
  message: string;
  data: T;
}
