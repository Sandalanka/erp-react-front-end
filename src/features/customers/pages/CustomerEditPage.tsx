import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { CustomerForm } from '../components/CustomerForm';
import { customerToFormValues } from '../utils';
import { useCustomer, useUpdateCustomer } from '../hooks';
import { getApiErrorMessage } from '../../../api/client';
import type { CustomerFormOutput } from '../schema';
import { Skeleton } from '../../../components/Skeleton';
import { EmptyState } from '../../../components/EmptyState';

export function CustomerEditPage() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const customerId = Number(id);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const { data: customer, isLoading, isError } = useCustomer(customerId);
  const updateCustomer = useUpdateCustomer(customerId);

  function handleSubmit(values: CustomerFormOutput) {
    setSubmitError(null);
    updateCustomer.mutate(
      { ...values, email: values.email || undefined },
      {
        onSuccess: () => navigate('/customers'),
        onError: (err) => setSubmitError(getApiErrorMessage(err, 'Failed to update customer')),
      },
    );
  }

  return (
    <div className="mx-auto max-w-3xl space-y-4">
      <div>
        <h1 className="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">Edit Customer</h1>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Update customer details</p>
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
          <EmptyState title="Customer not found" description="It may have been deleted." />
        )}

        {customer && (
          <CustomerForm
            defaultValues={customerToFormValues(customer)}
            onSubmit={handleSubmit}
            isSubmitting={updateCustomer.isPending}
            submitError={submitError}
            submitLabel="Save Changes"
            onCancel={() => navigate('/customers')}
          />
        )}
      </div>
    </div>
  );
}
