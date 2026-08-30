export interface SavedCarerItem {
  _id?: string;
  id?: string;
  carerId: string;
  name: string;
  rating: number;
  reviews: number;
  location: string;
  bio: string;
  skills: string[];
  experience: string;
  verified: string;
  rate: string;
  available: boolean;
  image: string;
  qualifications?: string[];
  availability?: string;
  serviceArea?: string;
  createdAt?: string;
}

export interface SavedCarersResponse<T = SavedCarerItem[]> {
  statusCode?: number;
  success?: boolean;
  message: string;
  data: T;
}
