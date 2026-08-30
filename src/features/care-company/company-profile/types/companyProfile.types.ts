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
  companyName: "Sunrise Care Group",
  tradingName: "Sunrise Care",
  email: "contact@sunrisecare.co.uk",
  phoneNumber: "+44 161 496 0555",
  registerNumber: "REG-882910",
  about:
    "Sunrise Care Group has built a strong reputation for providing professional, compassionate, and reliable care services throughout Greater Manchester. Our dedicated team specialises in elderly care, dementia support, personal care, and assisted living, ensuring every individual receives personalised support that enhances their quality of life. By combining experienced professionals with a person-centred approach, we strive to make a meaningful difference for every client and their family.",
  serviceOffered: [
    "Residential Care",
    "Dementia Care",
    "Respite Care",
    "Home Care",
    "Day Services",
  ],
  serviceHours: "Mon–Fri 7am–6pm · Sat 8am–2pm · Emergency 24/7",
  address: "Manchester, Greater Manchester",
  postCode: "M1 5QA",
  founded: "2008",
  staffCount: "320+",
  locationsCount: "8",
  cqcRating: "Outstanding (CQC)",
  logo: "/images/logo.png",
  coverPhoto: "",
  status: "approved",
  profileCompletionStatus: "complete",
  profileCompletionPercentage: 100,
};
