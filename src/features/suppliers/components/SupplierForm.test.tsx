import { describe, it, expect, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { SupplierForm } from './SupplierForm';

describe('SupplierForm', () => {
  it('shows a validation error when name is missing', async () => {
    const user = userEvent.setup();
    const onSubmit = vi.fn();
    render(<SupplierForm onSubmit={onSubmit} />);

    await user.click(screen.getByRole('button', { name: /save/i }));

    expect(await screen.findByText('Name is required')).toBeInTheDocument();
    expect(onSubmit).not.toHaveBeenCalled();
  });

  it('shows a validation error for an invalid email', async () => {
    const user = userEvent.setup();
    const onSubmit = vi.fn();
    render(<SupplierForm onSubmit={onSubmit} />);

    await user.type(screen.getByLabelText('Name'), 'Acme Supplies');
    await user.type(screen.getByLabelText('Email'), 'not-an-email');
    await user.click(screen.getByRole('button', { name: /save/i }));

    expect(await screen.findByText('Invalid email address')).toBeInTheDocument();
    expect(onSubmit).not.toHaveBeenCalled();
  });

  it('submits values on valid input', async () => {
    const user = userEvent.setup();
    const onSubmit = vi.fn();
    render(<SupplierForm onSubmit={onSubmit} />);

    await user.type(screen.getByLabelText('Name'), 'Acme Supplies');
    await user.type(screen.getByLabelText('Contact Person'), 'Jane Doe');
    await user.click(screen.getByRole('button', { name: /save/i }));

    await waitFor(() => expect(onSubmit).toHaveBeenCalledTimes(1));
    const submitted = onSubmit.mock.calls[0][0];
    expect(submitted.name).toBe('Acme Supplies');
    expect(submitted.contactPerson).toBe('Jane Doe');
    expect(submitted.status).toBe('ACTIVE');
  });
});
