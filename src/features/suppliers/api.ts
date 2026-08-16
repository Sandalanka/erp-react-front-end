import { apiClient } from '../../api/client';
import type { ApiSuccess } from '../../api/client';
import type { Supplier, SupplierFormValues, SupplierListParams, SupplierListResult } from './types';

export async function fetchSuppliers(params: SupplierListParams) {
  const res = await apiClient.get<ApiSuccess<SupplierListResult>>('/suppliers', { params });
  return res.data.data;
}

export async function fetchSupplier(id: number) {
  const res = await apiClient.get<ApiSuccess<Supplier>>(`/suppliers/${id}`);
  return res.data.data;
}

export async function createSupplier(input: SupplierFormValues) {
  const res = await apiClient.post<ApiSuccess<Supplier>>('/suppliers', input);
  return res.data.data;
}

export async function updateSupplier(id: number, input: Partial<SupplierFormValues>) {
  const res = await apiClient.put<ApiSuccess<Supplier>>(`/suppliers/${id}`, input);
  return res.data.data;
}

export async function deleteSupplier(id: number) {
  await apiClient.delete(`/suppliers/${id}`);
}
