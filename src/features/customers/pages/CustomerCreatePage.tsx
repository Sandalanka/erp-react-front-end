import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CustomerForm } from '../components/CustomerForm';
import { useCreateCustomer } from '../hooks';
import { getApiErrorMessage } from '../../../api/client';
import type { CustomerFormOutput } from '../schema';

export function CustomerCreatePage() {
  const navigate = useNavigate();
  const createCustomer = useCreateCustomer();
  const [submitError, setSubmitError] = useState<string | null>(null);

  function handleSubmit(values: CustomerFormOutput) {
    setSubmitError(null);
    createCustomer.mutate(
      { ...values, email: values.email || undefined },
      {
        onSuccess: () => navigate('/customers'),
        onError: (err) => setSubmitError(getApiErrorMessage(err, 'Failed to create customer')),
      },
    );
  }

  return (
    <div className="mx-auto max-w-3xl space-y-4">
      <div>
        <h1 className="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">New Customer</h1>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Add a new customer account</p>
      </div>

      <div className="rounded-xl border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-gray-950 sm:p-6">
        <CustomerForm
          onSubmit={handleSubmit}
          isSubmitting={createCustomer.isPending}
          submitError={submitError}
          submitLabel="Create Customer"
          onCancel={() => navigate('/customers')}
        />
      </div>
    </div>
  );
}
