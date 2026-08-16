import { Pencil, Trash2 } from 'lucide-react';
import type { Customer } from '../types';
import { CustomerStatusBadge } from './CustomerStatusBadge';
import { formatCurrency } from '../../../utils/format';

interface CustomerCardListProps {
  customers: Customer[];
  onEdit: (customer: Customer) => void;
  onDelete: (customer: Customer) => void;
}

export function CustomerCardList({ customers, onEdit, onDelete }: CustomerCardListProps) {
  return (
    <div className="flex flex-col gap-3 lg:hidden">
      {customers.map((customer) => (
        <div
          key={customer.id}
          className="rounded-xl border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-gray-950"
        >
          <div className="flex items-start justify-between gap-2">
            <div>
              <p className="text-sm font-semibold text-gray-900 dark:text-white">{customer.name}</p>
              {customer.company && (
                <p className="text-xs text-gray-500 dark:text-gray-400">{customer.company}</p>
              )}
            </div>
            <CustomerStatusBadge status={customer.status} />
          </div>

          <dl className="mt-3 space-y-1 text-sm">
            <div className="flex justify-between">
              <dt className="text-gray-500 dark:text-gray-400">Email</dt>
              <dd className="text-gray-700 dark:text-gray-300">{customer.email ?? '—'}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-gray-500 dark:text-gray-400">Phone</dt>
              <dd className="text-gray-700 dark:text-gray-300">{customer.phone ?? '—'}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-gray-500 dark:text-gray-400">Credit Limit</dt>
              <dd className="text-gray-700 dark:text-gray-300">{formatCurrency(customer.creditLimit)}</dd>
            </div>
          </dl>

          <div className="mt-4 flex gap-2">
            <button
              type="button"
              onClick={() => onEdit(customer)}
              className="flex min-h-11 flex-1 items-center justify-center gap-2 rounded-lg border border-gray-300 text-sm font-medium text-gray-700 dark:border-gray-700 dark:text-gray-200"
            >
              <Pencil className="h-4 w-4" /> Edit
            </button>
            <button
              type="button"
              onClick={() => onDelete(customer)}
              className="flex min-h-11 flex-1 items-center justify-center gap-2 rounded-lg border border-red-200 text-sm font-medium text-red-600 dark:border-red-900 dark:text-red-400"
            >
              <Trash2 className="h-4 w-4" /> Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
