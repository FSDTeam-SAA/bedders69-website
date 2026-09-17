export interface CareCompanyProfile {
  _id?: string;
  id?: string;
  userId?: string;
  companyName: string;
  tradingName?: string;
  about?: string;
  email: string;
  phoneNumber?: string;
  registerNumber?: string;
  websiteLink?: string;
  address?: string;
  postCode?: string;
  logo?: string;
  coverPhoto?: string;
  coverageRegions?: string[];
  serviceOffered?: string[];
  serviceHours?: string;
  founded?: string;
  staffCount?: string;
  locationsCount?: string;
  cqcRating?: string;
  status?: 'approved' | 'pending' | 'rejected';
  profileCompletionStatus?: 'complete' | 'incomplete';
  profileCompletionPercentage?: number;
  cvResume?: string;
  supportingDocuments?: string[];
  createdAt?: string;
  updatedAt?: string;
}

export interface UpdateCompanyProfilePayload {
  companyName?: string;
  tradingName?: string;
  about?: string;
  email?: string;
  phoneNumber?: string;
  registerNumber?: string;
  websiteLink?: string;
  address?: string;
  postCode?: string;
  coverageRegions?: string[];
  serviceOffered?: string[];
  serviceHours?: string;
  founded?: string;
  staffCount?: string;
  locationsCount?: string;
  cqcRating?: string;
}

export interface CompanyProfileResponse<T = CareCompanyProfile> {
  statusCode?: number;
  success?: boolean;
  message: string;
  data: T;
}

export const DEFAULT_CARE_COMPANY_PROFILE: CareCompanyProfile = {
  companyName: "",
  tradingName: "",
  email: "",
  phoneNumber: "",
  registerNumber: "",
  about: "",
  serviceOffered: [],
  serviceHours: "",
  address: "",
  postCode: "",
  founded: "",
  staffCount: "",
  locationsCount: "",
  cqcRating: "",
  logo: "",
  coverPhoto: "",
  status: "pending",
  profileCompletionStatus: "incomplete",
  profileCompletionPercentage: 0,
};
