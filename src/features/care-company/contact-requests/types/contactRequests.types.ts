export interface ContactRequest {
  _id?: string;
  id: string;
  name: string;
  initials: string;
  avatarBg: string;
  category: string;
  status: "Pending" | "Accepted" | "Rejected";
  message: string;
  time: string;
  phone: string;
  targetUserId?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface ContactRequestCounts {
  all: number;
  pending: number;
  accepted: number;
  rejected: number;
}

export interface ApiMeta {
  page: number;
  limit: number;
  total: number;
  totalPages?: number;
}

export interface ContactRequestsApiResponse<T = ContactRequest[]> {
  statusCode?: number;
  success?: boolean;
  message: string;
  meta?: ApiMeta;
  counts?: ContactRequestCounts;
  data: T;
}
