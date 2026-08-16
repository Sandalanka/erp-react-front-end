import { Pencil, Trash2 } from 'lucide-react';
import type { Customer } from '../types';
import { CustomerStatusBadge } from './CustomerStatusBadge';
import { formatCurrency } from '../../../utils/format';

interface CustomerTableProps {
  customers: Customer[];
  onEdit: (customer: Customer) => void;
  onDelete: (customer: Customer) => void;
}

export function CustomerTable({ customers, onEdit, onDelete }: CustomerTableProps) {
  return (
    <div className="hidden overflow-x-auto rounded-xl border border-gray-200 dark:border-gray-800 lg:block">
      <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-800">
        <thead className="bg-gray-50 dark:bg-gray-900">
          <tr>
            <th className="px-4 py-3 text-left text-xs font-medium uppercase text-gray-500 dark:text-gray-400">
              Customer
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium uppercase text-gray-500 dark:text-gray-400">
              Contact
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium uppercase text-gray-500 dark:text-gray-400">
              Credit Limit
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium uppercase text-gray-500 dark:text-gray-400">
              Status
            </th>
            <th className="px-4 py-3 text-right text-xs font-medium uppercase text-gray-500 dark:text-gray-400">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 bg-white dark:divide-gray-800 dark:bg-gray-950">
          {customers.map((customer) => (
            <tr key={customer.id}>
              <td className="px-4 py-3">
                <p className="text-sm font-medium text-gray-900 dark:text-white">{customer.name}</p>
                {customer.company && (
                  <p className="text-xs text-gray-500 dark:text-gray-400">{customer.company}</p>
                )}
              </td>
              <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">
                <p>{customer.email ?? '—'}</p>
                <p className="text-xs text-gray-400">{customer.phone ?? ''}</p>
              </td>
              <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">
                {formatCurrency(customer.creditLimit)}
              </td>
              <td className="px-4 py-3">
                <CustomerStatusBadge status={customer.status} />
              </td>
              <td className="px-4 py-3">
                <div className="flex justify-end gap-1">
                  <button
                    type="button"
                    onClick={() => onEdit(customer)}
                    className="flex h-9 w-9 items-center justify-center rounded-lg text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800"
                    aria-label={`Edit ${customer.name}`}
                  >
                    <Pencil className="h-4 w-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => onDelete(customer)}
                    className="flex h-9 w-9 items-center justify-center rounded-lg text-gray-500 hover:bg-red-50 hover:text-red-600 dark:text-gray-400 dark:hover:bg-red-900/20"
                    aria-label={`Delete ${customer.name}`}
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
