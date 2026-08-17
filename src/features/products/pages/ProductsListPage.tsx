import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Package } from 'lucide-react';
import { useProducts, useDeleteProduct } from '../hooks';
import { ProductFilters } from '../components/ProductFilters';
import { ProductTable } from '../components/ProductTable';
import { ProductCardList } from '../components/ProductCardList';
import { Button } from '../../../components/Button';
import { Pagination } from '../../../components/Pagination';
import { EmptyState } from '../../../components/EmptyState';
import { Skeleton } from '../../../components/Skeleton';
import { ConfirmDialog } from '../../../components/ConfirmDialog';
import type { Product, ProductStatus } from '../types';
import { getApiErrorMessage } from '../../../api/client';

const PAGE_SIZE = 20;

export function ProductsListPage() {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState<ProductStatus | ''>('');
  const [productToDelete, setProductToDelete] = useState<Product | null>(null);
  const [deleteError, setDeleteError] = useState<string | null>(null);

  const { data, isLoading, isError, error } = useProducts({
    page,
    limit: PAGE_SIZE,
    search: search || undefined,
    status: status || undefined,
  });

  const deleteProduct = useDeleteProduct();

  function handleSearchChange(value: string) {
    setSearch(value);
    setPage(1);
  }

  function handleStatusChange(value: ProductStatus | '') {
    setStatus(value);
    setPage(1);
  }

  function handleConfirmDelete() {
    if (!productToDelete) return;
    setDeleteError(null);
    deleteProduct.mutate(productToDelete.id, {
      onSuccess: () => setProductToDelete(null),
      onError: (err) => setDeleteError(getApiErrorMessage(err, 'Failed to delete product')),
    });
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">
            Products
          </h1>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Manage your product catalog and pricing
          </p>
        </div>
        <Button type="button" onClick={() => navigate('/products/new')} className="sm:w-auto">
          <Plus className="h-4 w-4" />
          New Product
        </Button>
      </div>

      <ProductFilters
        search={search}
        status={status}
        onSearchChange={handleSearchChange}
        onStatusChange={handleStatusChange}
      />

      {isLoading && (
        <div className="space-y-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton key={i} className="h-16 w-full" />
          ))}
        </div>
      )}

      {isError && (
        <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 dark:border-red-900 dark:bg-red-900/20 dark:text-red-300">
          {getApiErrorMessage(error, 'Failed to load products')}
        </div>
      )}

      {!isLoading && !isError && data && data.items.length === 0 && (
        <EmptyState
          icon={Package}
          title="No products found"
          description={
            search || status
              ? 'Try adjusting your filters.'
              : 'Get started by adding your first product.'
          }
          action={
            !search && !status ? (
              <Button type="button" onClick={() => navigate('/products/new')}>
                <Plus className="h-4 w-4" />
                New Product
              </Button>
            ) : undefined
          }
        />
      )}

      {!isLoading && !isError && data && data.items.length > 0 && (
        <>
          <ProductTable
            products={data.items}
            onEdit={(product) => navigate(`/products/${product.id}/edit`)}
            onDelete={setProductToDelete}
          />
          <ProductCardList
            products={data.items}
            onEdit={(product) => navigate(`/products/${product.id}/edit`)}
            onDelete={setProductToDelete}
          />
          <Pagination
            page={data.pagination.page}
            totalPages={data.pagination.totalPages}
            total={data.pagination.total}
            onPageChange={setPage}
          />
        </>
      )}

      <ConfirmDialog
        open={productToDelete !== null}
        title="Delete product"
        description={
          deleteError ??
          `Are you sure you want to delete "${productToDelete?.name}"? This action cannot be undone.`
        }
        confirmLabel="Delete"
        isLoading={deleteProduct.isPending}
        onConfirm={handleConfirmDelete}
        onCancel={() => {
          setProductToDelete(null);
          setDeleteError(null);
        }}
      />
    </div>
  );
}
