export interface BusinessInformationData {
  companyName: string;
  email: string;
  phoneNumber: string;
  registrationNumber: string;
  website: string;
  address: string;
  logo?: string | File | null;
  coverPhoto?: string | File | null;
  coverageRegions: string[];
  servicesOffered: string[];
}
