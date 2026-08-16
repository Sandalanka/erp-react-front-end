export type CustomerStatus = 'ACTIVE' | 'INACTIVE';

export interface Customer {
  id: number;
  name: string;
  company: string | null;
  email: string | null;
  phone: string | null;
  address: string | null;
  city: string | null;
  country: string | null;
  taxNumber: string | null;
  creditLimit: string | null;
  paymentTerms: string | null;
  status: CustomerStatus;
  createdAt: string;
  updatedAt: string;
}

export interface CustomerFormValues {
  name: string;
  company?: string;
  email?: string;
  phone?: string;
  address?: string;
  city?: string;
  country?: string;
  taxNumber?: string;
  creditLimit?: number;
  paymentTerms?: string;
  status: CustomerStatus;
}

export interface CustomerListParams {
  page?: number;
  limit?: number;
  search?: string;
  status?: CustomerStatus;
}

export interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface CustomerListResult {
  items: Customer[];
  pagination: PaginationMeta;
}
