import { describe, it, expect, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ProductForm } from './ProductForm';

describe('ProductForm', () => {
  it('shows a validation error when name is missing', async () => {
    const user = userEvent.setup();
    const onSubmit = vi.fn();
    render(<ProductForm onSubmit={onSubmit} />);

    await user.click(screen.getByRole('button', { name: /save/i }));

    expect(await screen.findByText('Name is required')).toBeInTheDocument();
    expect(onSubmit).not.toHaveBeenCalled();
  });

  it('shows a validation error for a negative unit price', async () => {
    const user = userEvent.setup();
    const onSubmit = vi.fn();
    render(<ProductForm onSubmit={onSubmit} />);

    await user.type(screen.getByLabelText('Name'), 'Widget');
    await user.type(screen.getByLabelText('Unit Price'), '-5');
    await user.click(screen.getByRole('button', { name: /save/i }));

    expect(await screen.findByText('Must be a positive number')).toBeInTheDocument();
    expect(onSubmit).not.toHaveBeenCalled();
  });

  it('submits transformed values on valid input', async () => {
    const user = userEvent.setup();
    const onSubmit = vi.fn();
    render(<ProductForm onSubmit={onSubmit} />);

    await user.type(screen.getByLabelText('Name'), 'Widget');
    await user.type(screen.getByLabelText('Unit Price'), '19.99');
    await user.click(screen.getByRole('button', { name: /save/i }));

    await waitFor(() => expect(onSubmit).toHaveBeenCalledTimes(1));
    const submitted = onSubmit.mock.calls[0][0];
    expect(submitted.name).toBe('Widget');
    expect(submitted.unitPrice).toBe(19.99);
    expect(submitted.status).toBe('ACTIVE');
  });
});
