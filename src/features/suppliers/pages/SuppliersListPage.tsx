import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Truck } from 'lucide-react';
import { useSuppliers, useDeleteSupplier } from '../hooks';
import { SupplierFilters } from '../components/SupplierFilters';
import { SupplierTable } from '../components/SupplierTable';
import { SupplierCardList } from '../components/SupplierCardList';
import { Button } from '../../../components/Button';
import { Pagination } from '../../../components/Pagination';
import { EmptyState } from '../../../components/EmptyState';
import { Skeleton } from '../../../components/Skeleton';
import { ConfirmDialog } from '../../../components/ConfirmDialog';
import type { Supplier, SupplierStatus } from '../types';
import { getApiErrorMessage } from '../../../api/client';

const PAGE_SIZE = 20;

export function SuppliersListPage() {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState<SupplierStatus | ''>('');
  const [supplierToDelete, setSupplierToDelete] = useState<Supplier | null>(null);
  const [deleteError, setDeleteError] = useState<string | null>(null);

  const { data, isLoading, isError, error } = useSuppliers({
    page,
    limit: PAGE_SIZE,
    search: search || undefined,
    status: status || undefined,
  });

  const deleteSupplier = useDeleteSupplier();

  function handleSearchChange(value: string) {
    setSearch(value);
    setPage(1);
  }

  function handleStatusChange(value: SupplierStatus | '') {
    setStatus(value);
    setPage(1);
  }

  function handleConfirmDelete() {
    if (!supplierToDelete) return;
    setDeleteError(null);
    deleteSupplier.mutate(supplierToDelete.id, {
      onSuccess: () => setSupplierToDelete(null),
      onError: (err) => setDeleteError(getApiErrorMessage(err, 'Failed to delete supplier')),
    });
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">
            Suppliers
          </h1>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Manage your supplier accounts and contact details
          </p>
        </div>
        <Button type="button" onClick={() => navigate('/suppliers/new')} className="sm:w-auto">
          <Plus className="h-4 w-4" />
          New Supplier
        </Button>
      </div>

      <SupplierFilters
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
          {getApiErrorMessage(error, 'Failed to load suppliers')}
        </div>
      )}

      {!isLoading && !isError && data && data.items.length === 0 && (
        <EmptyState
          icon={Truck}
          title="No suppliers found"
          description={
            search || status
              ? 'Try adjusting your filters.'
              : 'Get started by adding your first supplier.'
          }
          action={
            !search && !status ? (
              <Button type="button" onClick={() => navigate('/suppliers/new')}>
                <Plus className="h-4 w-4" />
                New Supplier
              </Button>
            ) : undefined
          }
        />
      )}

      {!isLoading && !isError && data && data.items.length > 0 && (
        <>
          <SupplierTable
            suppliers={data.items}
            onEdit={(supplier) => navigate(`/suppliers/${supplier.id}/edit`)}
            onDelete={setSupplierToDelete}
          />
          <SupplierCardList
            suppliers={data.items}
            onEdit={(supplier) => navigate(`/suppliers/${supplier.id}/edit`)}
            onDelete={setSupplierToDelete}
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
        open={supplierToDelete !== null}
        title="Delete supplier"
        description={
          deleteError ??
          `Are you sure you want to delete "${supplierToDelete?.name}"? This action cannot be undone.`
        }
        confirmLabel="Delete"
        isLoading={deleteSupplier.isPending}
        onConfirm={handleConfirmDelete}
        onCancel={() => {
          setSupplierToDelete(null);
          setDeleteError(null);
        }}
      />
    </div>
  );
}
