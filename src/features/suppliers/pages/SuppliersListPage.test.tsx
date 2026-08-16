import { describe, it, expect, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { MemoryRouter } from 'react-router-dom';
import { SuppliersListPage } from './SuppliersListPage';
import * as api from '../api';
import type { Supplier } from '../types';

const mockSupplier: Supplier = {
  id: 1,
  name: 'Acme Supplies',
  contactPerson: 'Jane Doe',
  email: 'jane@acmesupplies.com',
  phone: '555-0100',
  address: null,
  city: null,
  country: null,
  taxNumber: null,
  paymentTerms: 'Net 30',
  status: 'ACTIVE',
  createdAt: '2026-01-01T00:00:00.000Z',
  updatedAt: '2026-01-01T00:00:00.000Z',
};

function renderPage() {
  const queryClient = new QueryClient({ defaultOptions: { queries: { retry: false } } });
  return render(
    <QueryClientProvider client={queryClient}>
      <MemoryRouter>
        <SuppliersListPage />
      </MemoryRouter>
    </QueryClientProvider>,
  );
}

describe('SuppliersListPage', () => {
  it('renders the empty state when there are no suppliers', async () => {
    vi.spyOn(api, 'fetchSuppliers').mockResolvedValue({
      items: [],
      pagination: { page: 1, limit: 20, total: 0, totalPages: 1 },
    });

    renderPage();

    expect(await screen.findByText('No suppliers found')).toBeInTheDocument();
  });

  it('renders suppliers returned from the API', async () => {
    vi.spyOn(api, 'fetchSuppliers').mockResolvedValue({
      items: [mockSupplier],
      pagination: { page: 1, limit: 20, total: 1, totalPages: 1 },
    });

    renderPage();

    await waitFor(() => expect(screen.getAllByText('Acme Supplies').length).toBeGreaterThan(0));
    expect(screen.getAllByText('Net 30').length).toBeGreaterThan(0);
  });

  it('shows an error state when the request fails', async () => {
    vi.spyOn(api, 'fetchSuppliers').mockRejectedValue(new Error('Network error'));

    renderPage();

    expect(await screen.findByText('Failed to load suppliers')).toBeInTheDocument();
  });
});
