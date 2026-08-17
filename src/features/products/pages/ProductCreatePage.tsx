import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ProductForm } from '../components/ProductForm';
import { useCreateProduct } from '../hooks';
import { getApiErrorMessage } from '../../../api/client';
import type { ProductFormOutput } from '../schema';

export function ProductCreatePage() {
  const navigate = useNavigate();
  const createProduct = useCreateProduct();
  const [submitError, setSubmitError] = useState<string | null>(null);

  function handleSubmit(values: ProductFormOutput) {
    setSubmitError(null);
    createProduct.mutate(values, {
      onSuccess: () => navigate('/products'),
      onError: (err) => setSubmitError(getApiErrorMessage(err, 'Failed to create product')),
    });
  }

  return (
    <div className="mx-auto max-w-3xl space-y-4">
      <div>
        <h1 className="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">
          New Product
        </h1>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Add a new product to the catalog
        </p>
      </div>

      <div className="rounded-xl border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-gray-950 sm:p-6">
        <ProductForm
          onSubmit={handleSubmit}
          isSubmitting={createProduct.isPending}
          submitError={submitError}
          submitLabel="Create Product"
          onCancel={() => navigate('/products')}
        />
      </div>
    </div>
  );
}
