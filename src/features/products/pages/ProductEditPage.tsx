import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ProductForm } from '../components/ProductForm';
import { productToFormValues } from '../utils';
import { useProduct, useUpdateProduct } from '../hooks';
import { getApiErrorMessage } from '../../../api/client';
import type { ProductFormOutput } from '../schema';
import { Skeleton } from '../../../components/Skeleton';
import { EmptyState } from '../../../components/EmptyState';

export function ProductEditPage() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const productId = Number(id);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const { data: product, isLoading, isError } = useProduct(productId);
  const updateProduct = useUpdateProduct(productId);

  function handleSubmit(values: ProductFormOutput) {
    setSubmitError(null);
    updateProduct.mutate(values, {
      onSuccess: () => navigate('/products'),
      onError: (err) => setSubmitError(getApiErrorMessage(err, 'Failed to update product')),
    });
  }

  return (
    <div className="mx-auto max-w-3xl space-y-4">
      <div>
        <h1 className="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">
          Edit Product
        </h1>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Update product details</p>
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
          <EmptyState title="Product not found" description="It may have been deleted." />
        )}

        {product && (
          <ProductForm
            defaultValues={productToFormValues(product)}
            onSubmit={handleSubmit}
            isSubmitting={updateProduct.isPending}
            submitError={submitError}
            submitLabel="Save Changes"
            onCancel={() => navigate('/products')}
          />
        )}
      </div>
    </div>
  );
}
