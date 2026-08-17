import { Pencil, Trash2 } from 'lucide-react';
import type { Product } from '../types';
import { ProductStatusBadge } from './ProductStatusBadge';
import { formatCurrency } from '../../../utils/format';

interface ProductCardListProps {
  products: Product[];
  onEdit: (product: Product) => void;
  onDelete: (product: Product) => void;
}

export function ProductCardList({ products, onEdit, onDelete }: ProductCardListProps) {
  return (
    <div className="flex flex-col gap-3 lg:hidden">
      {products.map((product) => (
        <div
          key={product.id}
          className="rounded-xl border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-gray-950"
        >
          <div className="flex items-start justify-between gap-2">
            <div>
              <p className="text-sm font-semibold text-gray-900 dark:text-white">{product.name}</p>
              {product.sku && (
                <p className="text-xs text-gray-500 dark:text-gray-400">{product.sku}</p>
              )}
            </div>
            <ProductStatusBadge status={product.status} />
          </div>

          <dl className="mt-3 space-y-1 text-sm">
            <div className="flex justify-between">
              <dt className="text-gray-500 dark:text-gray-400">Category</dt>
              <dd className="text-gray-700 dark:text-gray-300">{product.category ?? '—'}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-gray-500 dark:text-gray-400">Unit Price</dt>
              <dd className="text-gray-700 dark:text-gray-300">
                {formatCurrency(product.unitPrice)}
              </dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-gray-500 dark:text-gray-400">Cost Price</dt>
              <dd className="text-gray-700 dark:text-gray-300">
                {formatCurrency(product.costPrice)}
              </dd>
            </div>
          </dl>

          <div className="mt-4 flex gap-2">
            <button
              type="button"
              onClick={() => onEdit(product)}
              className="flex min-h-11 flex-1 items-center justify-center gap-2 rounded-lg border border-gray-300 text-sm font-medium text-gray-700 dark:border-gray-700 dark:text-gray-200"
            >
              <Pencil className="h-4 w-4" /> Edit
            </button>
            <button
              type="button"
              onClick={() => onDelete(product)}
              className="flex min-h-11 flex-1 items-center justify-center gap-2 rounded-lg border border-red-200 text-sm font-medium text-red-600 dark:border-red-900 dark:text-red-400"
            >
              <Trash2 className="h-4 w-4" /> Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
