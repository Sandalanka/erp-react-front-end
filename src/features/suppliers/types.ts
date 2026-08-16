export type SupplierStatus = 'ACTIVE' | 'INACTIVE';

export interface Supplier {
  id: number;
  name: string;
  contactPerson: string | null;
  email: string | null;
  phone: string | null;
  address: string | null;
  city: string | null;
  country: string | null;
  taxNumber: string | null;
  paymentTerms: string | null;
  status: SupplierStatus;
  createdAt: string;
  updatedAt: string;
}

export interface SupplierFormValues {
  name: string;
  contactPerson?: string;
  email?: string;
  phone?: string;
  address?: string;
  city?: string;
  country?: string;
  taxNumber?: string;
  paymentTerms?: string;
  status: SupplierStatus;
}

export interface SupplierListParams {
  page?: number;
  limit?: number;
  search?: string;
  status?: SupplierStatus;
}

export interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface SupplierListResult {
  items: Supplier[];
  pagination: PaginationMeta;
}
