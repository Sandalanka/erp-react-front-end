import { apiClient } from '../../api/client';
import type { ApiSuccess } from '../../api/client';
import type { Customer, CustomerFormValues, CustomerListParams, CustomerListResult } from './types';

export async function fetchCustomers(params: CustomerListParams) {
  const res = await apiClient.get<ApiSuccess<CustomerListResult>>('/customers', { params });
  return res.data.data;
}

export async function fetchCustomer(id: number) {
  const res = await apiClient.get<ApiSuccess<Customer>>(`/customers/${id}`);
  return res.data.data;
}

export async function createCustomer(input: CustomerFormValues) {
  const res = await apiClient.post<ApiSuccess<Customer>>('/customers', input);
  return res.data.data;
}

export async function updateCustomer(id: number, input: Partial<CustomerFormValues>) {
  const res = await apiClient.put<ApiSuccess<Customer>>(`/customers/${id}`, input);
  return res.data.data;
}

export async function deleteCustomer(id: number) {
  await apiClient.delete(`/customers/${id}`);
}
