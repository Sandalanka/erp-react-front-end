import { apiClient } from '../../api/client';
import type { ApiSuccess } from '../../api/client';
import type { Product, ProductFormValues, ProductListParams, ProductListResult } from './types';

export async function fetchProducts(params: ProductListParams) {
  const res = await apiClient.get<ApiSuccess<ProductListResult>>('/products', { params });
  return res.data.data;
}

export async function fetchProduct(id: number) {
  const res = await apiClient.get<ApiSuccess<Product>>(`/products/${id}`);
  return res.data.data;
}

export async function createProduct(input: ProductFormValues) {
  const res = await apiClient.post<ApiSuccess<Product>>('/products', input);
  return res.data.data;
}

export async function updateProduct(id: number, input: Partial<ProductFormValues>) {
  const res = await apiClient.put<ApiSuccess<Product>>(`/products/${id}`, input);
  return res.data.data;
}

export async function deleteProduct(id: number) {
  await apiClient.delete(`/products/${id}`);
}
