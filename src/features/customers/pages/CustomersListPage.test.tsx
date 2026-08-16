import { describe, it, expect, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { MemoryRouter } from 'react-router-dom';
import { CustomersListPage } from './CustomersListPage';
import * as api from '../api';
import type { Customer } from '../types';

const mockCustomer: Customer = {
  id: 1,
  name: 'Acme Corp',
  company: 'Acme',
  email: 'acme@example.com',
  phone: '555-0100',
  address: null,
  city: null,
  country: null,
  taxNumber: null,
  creditLimit: '1000',
  paymentTerms: null,
  status: 'ACTIVE',
  createdAt: '2026-01-01T00:00:00.000Z',
  updatedAt: '2026-01-01T00:00:00.000Z',
};

function renderPage() {
  const queryClient = new QueryClient({ defaultOptions: { queries: { retry: false } } });
  return render(
    <QueryClientProvider client={queryClient}>
      <MemoryRouter>
        <CustomersListPage />
      </MemoryRouter>
    </QueryClientProvider>,
  );
}

describe('CustomersListPage', () => {
  it('renders the empty state when there are no customers', async () => {
    vi.spyOn(api, 'fetchCustomers').mockResolvedValue({
      items: [],
      pagination: { page: 1, limit: 20, total: 0, totalPages: 1 },
    });

    renderPage();

    expect(await screen.findByText('No customers found')).toBeInTheDocument();
  });

  it('renders customers returned from the API', async () => {
    vi.spyOn(api, 'fetchCustomers').mockResolvedValue({
      items: [mockCustomer],
      pagination: { page: 1, limit: 20, total: 1, totalPages: 1 },
    });

    renderPage();

    await waitFor(() => expect(screen.getAllByText('Acme Corp').length).toBeGreaterThan(0));
    expect(screen.getAllByText('$1,000.00').length).toBeGreaterThan(0);
  });

  it('shows an error state when the request fails', async () => {
    vi.spyOn(api, 'fetchCustomers').mockRejectedValue(new Error('Network error'));

    renderPage();

    expect(await screen.findByText('Failed to load customers')).toBeInTheDocument();
  });
});
