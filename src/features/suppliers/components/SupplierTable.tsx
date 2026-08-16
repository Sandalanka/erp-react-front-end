import { Pencil, Trash2 } from 'lucide-react';
import type { Supplier } from '../types';
import { SupplierStatusBadge } from './SupplierStatusBadge';

interface SupplierTableProps {
  suppliers: Supplier[];
  onEdit: (supplier: Supplier) => void;
  onDelete: (supplier: Supplier) => void;
}

export function SupplierTable({ suppliers, onEdit, onDelete }: SupplierTableProps) {
  return (
    <div className="hidden overflow-x-auto rounded-xl border border-gray-200 dark:border-gray-800 lg:block">
      <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-800">
        <thead className="bg-gray-50 dark:bg-gray-900">
          <tr>
            <th className="px-4 py-3 text-left text-xs font-medium uppercase text-gray-500 dark:text-gray-400">
              Supplier
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium uppercase text-gray-500 dark:text-gray-400">
              Contact
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium uppercase text-gray-500 dark:text-gray-400">
              Payment Terms
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
          {suppliers.map((supplier) => (
            <tr key={supplier.id}>
              <td className="px-4 py-3">
                <p className="text-sm font-medium text-gray-900 dark:text-white">{supplier.name}</p>
                {supplier.contactPerson && (
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {supplier.contactPerson}
                  </p>
                )}
              </td>
              <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">
                <p>{supplier.email ?? '—'}</p>
                <p className="text-xs text-gray-400">{supplier.phone ?? ''}</p>
              </td>
              <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">
                {supplier.paymentTerms ?? '—'}
              </td>
              <td className="px-4 py-3">
                <SupplierStatusBadge status={supplier.status} />
              </td>
              <td className="px-4 py-3">
                <div className="flex justify-end gap-1">
                  <button
                    type="button"
                    onClick={() => onEdit(supplier)}
                    className="flex h-9 w-9 items-center justify-center rounded-lg text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800"
                    aria-label={`Edit ${supplier.name}`}
                  >
                    <Pencil className="h-4 w-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => onDelete(supplier)}
                    className="flex h-9 w-9 items-center justify-center rounded-lg text-gray-500 hover:bg-red-50 hover:text-red-600 dark:text-gray-400 dark:hover:bg-red-900/20"
                    aria-label={`Delete ${supplier.name}`}
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
