import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { SupplierForm } from '../components/SupplierForm';
import { supplierToFormValues } from '../utils';
import { useSupplier, useUpdateSupplier } from '../hooks';
import { getApiErrorMessage } from '../../../api/client';
import type { SupplierFormOutput } from '../schema';
import { Skeleton } from '../../../components/Skeleton';
import { EmptyState } from '../../../components/EmptyState';

export function SupplierEditPage() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const supplierId = Number(id);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const { data: supplier, isLoading, isError } = useSupplier(supplierId);
  const updateSupplier = useUpdateSupplier(supplierId);

  function handleSubmit(values: SupplierFormOutput) {
    setSubmitError(null);
    updateSupplier.mutate(
      { ...values, email: values.email || undefined },
      {
        onSuccess: () => navigate('/suppliers'),
        onError: (err) => setSubmitError(getApiErrorMessage(err, 'Failed to update supplier')),
      },
    );
  }

  return (
    <div className="mx-auto max-w-3xl space-y-4">
      <div>
        <h1 className="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">
          Edit Supplier
        </h1>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Update supplier details</p>
      </div>

      <div className="rounded-xl border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-gray-950 sm:p-6">
        {isLoading && (
          <div className="space-y-4">
            <Skeleton className="h-11 w-full" />
            <Skeleton className="h-11 w-full" />
            <Skeleton className="h-11 w-full" />
          </div>
        )}

        {isError && (
          <EmptyState title="Supplier not found" description="It may have been deleted." />
        )}

        {supplier && (
          <SupplierForm
            defaultValues={supplierToFormValues(supplier)}
            onSubmit={handleSubmit}
            isSubmitting={updateSupplier.isPending}
            submitError={submitError}
            submitLabel="Save Changes"
            onCancel={() => navigate('/suppliers')}
          />
        )}
      </div>
    </div>
  );
}
