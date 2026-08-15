import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '../../../components/Input';
import { Select } from '../../../components/Select';
import { Button } from '../../../components/Button';
import { customerFormSchema } from '../schema';
import type { CustomerFormInput, CustomerFormOutput } from '../schema';

interface CustomerFormProps {
  defaultValues?: Partial<CustomerFormInput>;
  onSubmit: (values: CustomerFormOutput) => void;
  isSubmitting?: boolean;
  submitError?: string | null;
  submitLabel?: string;
  onCancel?: () => void;
}

export function CustomerForm({
  defaultValues,
  onSubmit,
  isSubmitting,
  submitError,
  submitLabel = 'Save',
  onCancel,
}: CustomerFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CustomerFormInput, unknown, CustomerFormOutput>({
    resolver: zodResolver(customerFormSchema),
    defaultValues: {
      name: '',
      company: '',
      email: '',
      phone: '',
      address: '',
      city: '',
      country: '',
      taxNumber: '',
      paymentTerms: '',
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
        <Input label="Company" {...register('company')} error={errors.company?.message} />
        <Input label="Email" type="email" {...register('email')} error={errors.email?.message} />
        <Input label="Phone" {...register('phone')} error={errors.phone?.message} />
        <Input label="Address" {...register('address')} error={errors.address?.message} />
        <Input label="City" {...register('city')} error={errors.city?.message} />
        <Input label="Country" {...register('country')} error={errors.country?.message} />
        <Input label="Tax Number" {...register('taxNumber')} error={errors.taxNumber?.message} />
        <Input
          label="Credit Limit"
          type="number"
          step="0.01"
          min="0"
          {...register('creditLimit')}
          error={errors.creditLimit?.message}
        />
        <Input
          label="Payment Terms"
          placeholder="e.g. Net 30"
          {...register('paymentTerms')}
          error={errors.paymentTerms?.message}
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
