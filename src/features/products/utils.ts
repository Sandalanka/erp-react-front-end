import type { ProductFormInput } from './schema';
import type { Product } from './types';

export function productToFormValues(product: Product): ProductFormInput {
  return {
    name: product.name,
    sku: product.sku ?? '',
    category: product.category ?? '',
    description: product.description ?? '',
    unit: product.unit ?? '',
    unitPrice: product.unitPrice ?? undefined,
    costPrice: product.costPrice ?? undefined,
    status: product.status,
  };
}
