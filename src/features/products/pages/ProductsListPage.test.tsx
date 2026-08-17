import { describe, it, expect, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { MemoryRouter } from 'react-router-dom';
import { ProductsListPage } from './ProductsListPage';
import * as api from '../api';
import type { Product } from '../types';

const mockProduct: Product = {
  id: 1,
  name: 'Widget',
  sku: 'WID-001',
  category: 'Hardware',
  description: null,
  unit: 'pcs',
  unitPrice: '19.99',
  costPrice: '9.99',
  status: 'ACTIVE',
  createdAt: '2026-01-01T00:00:00.000Z',
  updatedAt: '2026-01-01T00:00:00.000Z',
};

function renderPage() {
  const queryClient = new QueryClient({ defaultOptions: { queries: { retry: false } } });
  return render(
    <QueryClientProvider client={queryClient}>
      <MemoryRouter>
        <ProductsListPage />
      </MemoryRouter>
    </QueryClientProvider>,
  );
}

describe('ProductsListPage', () => {
  it('renders the empty state when there are no products', async () => {
    vi.spyOn(api, 'fetchProducts').mockResolvedValue({
      items: [],
      pagination: { page: 1, limit: 20, total: 0, totalPages: 1 },
    });

    renderPage();

    expect(await screen.findByText('No products found')).toBeInTheDocument();
  });

  it('renders products returned from the API', async () => {
    vi.spyOn(api, 'fetchProducts').mockResolvedValue({
      items: [mockProduct],
      pagination: { page: 1, limit: 20, total: 1, totalPages: 1 },
    });

    renderPage();

    await waitFor(() => expect(screen.getAllByText('Widget').length).toBeGreaterThan(0));
    expect(screen.getAllByText('$19.99').length).toBeGreaterThan(0);
  });

  it('shows an error state when the request fails', async () => {
    vi.spyOn(api, 'fetchProducts').mockRejectedValue(new Error('Network error'));

    renderPage();

    expect(await screen.findByText('Failed to load products')).toBeInTheDocument();
  });
});
