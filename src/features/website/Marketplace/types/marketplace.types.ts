export interface ApiMeta {
  page: number;
  limit: number;
  total: number;
}

export interface ApiResponse<T> {
  statusCode?: number;
  success?: boolean;
  message: string;
  meta?: ApiMeta;
  data: T;
}

export interface MarketplaceItem {
  id: string;
  title: string;
  description?: string;
  category: string;
  price?: number;
  currency?: string;
  city?: string;
  postCode?: string;
  photos?: string[];
  isAvailable?: boolean;
  status?: string;
  isPublished?: boolean;
  viewCount?: number;
  inquiryCount?: number;
  sellerUserId?: {
    id: string;
    fullName?: string;
    email?: string;
  } | null;
  publishedAt?: string;
  createdAt?: string;
}

export interface MarketplaceSearchParams {
  search?: string;
  category?: string;
  city?: string;
  postCode?: string;
  minPrice?: number;
  maxPrice?: number;
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}

export interface ProductProps {
  id: string;
  title: string;
  price: string;
  rawPrice?: number;
  rating: string;
  category: string;
  seller: string;
  imageBg: string;
  imageUrl?: string;
  description?: string;
}
