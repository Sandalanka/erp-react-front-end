import { Search } from 'lucide-react';
import { Select } from '../../../components/Select';
import type { SupplierStatus } from '../types';

interface SupplierFiltersProps {
  search: string;
  status: SupplierStatus | '';
  onSearchChange: (value: string) => void;
  onStatusChange: (value: SupplierStatus | '') => void;
}

export function SupplierFilters({
  search,
  status,
  onSearchChange,
  onStatusChange,
}: SupplierFiltersProps) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
      <div className="relative flex-1">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
        <input
          type="search"
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search suppliers..."
          aria-label="Search suppliers"
          className="min-h-11 w-full rounded-lg border border-gray-300 bg-white pl-9 pr-3 text-sm text-gray-900 focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500 dark:border-gray-700 dark:bg-gray-900 dark:text-white"
        />
      </div>
      <div className="sm:w-48">
        <Select
          aria-label="Filter by status"
          value={status}
          onChange={(e) => onStatusChange(e.target.value as SupplierStatus | '')}
          options={[
            { value: '', label: 'All statuses' },
            { value: 'ACTIVE', label: 'Active' },
            { value: 'INACTIVE', label: 'Inactive' },
          ]}
        />
      </div>
    </div>
  );
}
