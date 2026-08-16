import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SupplierForm } from '../components/SupplierForm';
import { useCreateSupplier } from '../hooks';
import { getApiErrorMessage } from '../../../api/client';
import type { SupplierFormOutput } from '../schema';

export function SupplierCreatePage() {
  const navigate = useNavigate();
  const createSupplier = useCreateSupplier();
  const [submitError, setSubmitError] = useState<string | null>(null);

  function handleSubmit(values: SupplierFormOutput) {
    setSubmitError(null);
    createSupplier.mutate(
      { ...values, email: values.email || undefined },
      {
        onSuccess: () => navigate('/suppliers'),
        onError: (err) => setSubmitError(getApiErrorMessage(err, 'Failed to create supplier')),
      },
    );
  }

  return (
    <div className="mx-auto max-w-3xl space-y-4">
      <div>
        <h1 className="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">
          New Supplier
        </h1>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Add a new supplier account</p>
      </div>

      <div className="rounded-xl border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-gray-950 sm:p-6">
        <SupplierForm
          onSubmit={handleSubmit}
          isSubmitting={createSupplier.isPending}
          submitError={submitError}
          submitLabel="Create Supplier"
          onCancel={() => navigate('/suppliers')}
        />
      </div>
    </div>
  );
}
