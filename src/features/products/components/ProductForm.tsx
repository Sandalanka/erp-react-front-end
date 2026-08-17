import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '../../../components/Input';
import { Select } from '../../../components/Select';
import { Button } from '../../../components/Button';
import { productFormSchema } from '../schema';
import type { ProductFormInput, ProductFormOutput } from '../schema';

interface ProductFormProps {
  defaultValues?: Partial<ProductFormInput>;
  onSubmit: (values: ProductFormOutput) => void;
  isSubmitting?: boolean;
  submitError?: string | null;
  submitLabel?: string;
  onCancel?: () => void;
}

export function ProductForm({
  defaultValues,
  onSubmit,
  isSubmitting,
  submitError,
  submitLabel = 'Save',
  onCancel,
}: ProductFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProductFormInput, unknown, ProductFormOutput>({
    resolver: zodResolver(productFormSchema),
    defaultValues: {
      name: '',
      sku: '',
      category: '',
      description: '',
      unit: '',
      status: 'ACTIVE',
      ...defaultValues,
    },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" noValidate>
      {submitError && (
        <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 dark:border-red-900 dark:bg-red-900/20 dark:text-red-300">
          {submitError}
        </div>
      )}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Input label="Name" required {...register('name')} error={errors.name?.message} />
        <Input label="SKU" {...register('sku')} error={errors.sku?.message} />
        <Input label="Category" {...register('category')} error={errors.category?.message} />
        <Input
          label="Unit"
          placeholder="e.g. pcs"
          {...register('unit')}
          error={errors.unit?.message}
        />
        <Input
          label="Unit Price"
          type="number"
          step="0.01"
          min="0"
          {...register('unitPrice')}
          error={errors.unitPrice?.message}
        />
        <Input
          label="Cost Price"
          type="number"
          step="0.01"
          min="0"
          {...register('costPrice')}
          error={errors.costPrice?.message}
        />
        <Select
          label="Status"
          options={[
            { value: 'ACTIVE', label: 'Active' },
            { value: 'INACTIVE', label: 'Inactive' },
          ]}
          {...register('status')}
          error={errors.status?.message}
        />
        <div className="sm:col-span-2">
          <Input
            label="Description"
            {...register('description')}
            error={errors.description?.message}
          />
        </div>
      </div>

      <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
        {onCancel && (
          <Button type="button" variant="secondary" onClick={onCancel} disabled={isSubmitting}>
            Cancel
          </Button>
        )}
        <Button type="submit" isLoading={isSubmitting}>
          {submitLabel}
        </Button>
      </div>
    </form>
  );
}
