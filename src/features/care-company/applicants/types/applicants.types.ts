export interface ApplicantDocument {
  name: string;
  size: string;
}

export interface Applicant {
  _id?: string;
  id: string;
  name: string;
  initials: string;
  avatarBg: string;
  experience: string;
  role: string;
  location: string;
  applied?: string;
  status: "New" | "Shortlisted" | "Interview" | "Hired" | "Rejected";
  matchScore: number;
  verified: boolean;
  notes: string;
  documents: ApplicantDocument[];
  createdAt?: string;
  updatedAt?: string;
}

export interface ApiMeta {
  page: number;
  limit: number;
  total: number;
  totalPages?: number;
}

export interface ApplicantsApiResponse<T = Applicant[]> {
  statusCode?: number;
  success?: boolean;
  message: string;
  meta?: ApiMeta;
  data: T;
}
