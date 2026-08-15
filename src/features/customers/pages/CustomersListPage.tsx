import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Users } from 'lucide-react';
import { useCustomers, useDeleteCustomer } from '../hooks';
import { CustomerFilters } from '../components/CustomerFilters';
import { CustomerTable } from '../components/CustomerTable';
import { CustomerCardList } from '../components/CustomerCardList';
import { Button } from '../../../components/Button';
import { Pagination } from '../../../components/Pagination';
import { EmptyState } from '../../../components/EmptyState';
import { Skeleton } from '../../../components/Skeleton';
import { ConfirmDialog } from '../../../components/ConfirmDialog';
import type { Customer, CustomerStatus } from '../types';
import { getApiErrorMessage } from '../../../api/client';

const PAGE_SIZE = 20;

export function CustomersListPage() {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState<CustomerStatus | ''>('');
  const [customerToDelete, setCustomerToDelete] = useState<Customer | null>(null);
  const [deleteError, setDeleteError] = useState<string | null>(null);

  const { data, isLoading, isError, error } = useCustomers({
    page,
    limit: PAGE_SIZE,
    search: search || undefined,
    status: status || undefined,
  });

  const deleteCustomer = useDeleteCustomer();

  function handleSearchChange(value: string) {
    setSearch(value);
    setPage(1);
  }

  function handleStatusChange(value: CustomerStatus | '') {
    setStatus(value);
    setPage(1);
  }

  function handleConfirmDelete() {
    if (!customerToDelete) return;
    setDeleteError(null);
    deleteCustomer.mutate(customerToDelete.id, {
      onSuccess: () => setCustomerToDelete(null),
      onError: (err) => setDeleteError(getApiErrorMessage(err, 'Failed to delete customer')),
    });
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">Customers</h1>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Manage your customer accounts and contact details
          </p>
        </div>
        <Button type="button" onClick={() => navigate('/customers/new')} className="sm:w-auto">
          <Plus className="h-4 w-4" />
          New Customer
        </Button>
      </div>

      <CustomerFilters
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
          {getApiErrorMessage(error, 'Failed to load customers')}
        </div>
      )}

      {!isLoading && !isError && data && data.items.length === 0 && (
        <EmptyState
          icon={Users}
          title="No customers found"
          description={
            search || status ? 'Try adjusting your filters.' : 'Get started by adding your first customer.'
          }
          action={
            !search && !status ? (
              <Button type="button" onClick={() => navigate('/customers/new')}>
                <Plus className="h-4 w-4" />
                New Customer
              </Button>
            ) : undefined
          }
        />
      )}

      {!isLoading && !isError && data && data.items.length > 0 && (
        <>
          <CustomerTable
            customers={data.items}
            onEdit={(customer) => navigate(`/customers/${customer.id}/edit`)}
            onDelete={setCustomerToDelete}
          />
          <CustomerCardList
            customers={data.items}
            onEdit={(customer) => navigate(`/customers/${customer.id}/edit`)}
            onDelete={setCustomerToDelete}
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
        open={customerToDelete !== null}
        title="Delete customer"
        description={
          deleteError ??
          `Are you sure you want to delete "${customerToDelete?.name}"? This action cannot be undone.`
        }
        confirmLabel="Delete"
        isLoading={deleteCustomer.isPending}
        onConfirm={handleConfirmDelete}
        onCancel={() => {
          setCustomerToDelete(null);
          setDeleteError(null);
        }}
      />
    </div>
  );
}
