export interface MembershipPlan {
  id: string;
  _id?: string;
  name: string;
  subtext: string;
  price: string;
  rawPrice: number;
  period: string;
  features: string[];
  isCurrent?: boolean;
  isPopular?: boolean;
  buttonText: string;
  description?: string;
  durationDays?: number;
  usageLimit?: number;
}

export interface MembershipPlanApiItem {
  _id: string;
  title: string;
  price: number;
  date?: string;
  content?: string;
  duration?: string;
  createdAt?: string;
  updatedAt?: string;
  // Legacy / fallback fields
  name?: string;
  description?: string;
  features?: string[];
}

export interface PackagesApiResponse {
  statusCode?: number;
  success?: boolean;
  message: string;
  data: MembershipPlanApiItem[] | {
    meta?: {
      page: number;
      limit: number;
      total: number;
    };
    data: MembershipPlanApiItem[];
  };
}
