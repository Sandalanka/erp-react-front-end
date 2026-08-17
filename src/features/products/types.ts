export type ProductStatus = 'ACTIVE' | 'INACTIVE';

export interface Product {
  id: number;
  name: string;
  sku: string | null;
  category: string | null;
  description: string | null;
  unit: string | null;
  unitPrice: string | null;
  costPrice: string | null;
  status: ProductStatus;
  createdAt: string;
  updatedAt: string;
}

export interface ProductFormValues {
  name: string;
  sku?: string;
  category?: string;
  description?: string;
  unit?: string;
  unitPrice?: number;
  costPrice?: number;
  status: ProductStatus;
}

export interface ProductListParams {
  page?: number;
  limit?: number;
  search?: string;
  status?: ProductStatus;
}

export interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface ProductListResult {
  items: Product[];
  pagination: PaginationMeta;
}
