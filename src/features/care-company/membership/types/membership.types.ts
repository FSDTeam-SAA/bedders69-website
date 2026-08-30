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

export interface PackageApiItem {
  _id: string;
  name: string;
  description?: string;
  type: string;
  price: number;
  features: string[];
  durationDays: number;
  usageLimit: number;
  isActive: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface PackagesApiResponse {
  statusCode?: number;
  success?: boolean;
  message: string;
  data: {
    meta?: {
      page: number;
      limit: number;
      total: number;
    };
    data: PackageApiItem[];
  };
}
