export interface OverviewCompany {
  companyName: string;
  tradingName: string;
  logo: string;
}

export interface OverviewMetrics {
  profileViews: number;
  activeJobs: number;
  newApplicants: number;
  contactRequests: number;
}

export interface RecentApplicantItem {
  id?: string;
  name: string;
  role: string;
  time: string;
}

export interface DashboardOverviewData {
  company: OverviewCompany;
  metrics: OverviewMetrics;
  recentApplicants: RecentApplicantItem[];
}

export interface DashboardOverviewApiResponse {
  statusCode?: number;
  success?: boolean;
  message: string;
  data: DashboardOverviewData;
}
