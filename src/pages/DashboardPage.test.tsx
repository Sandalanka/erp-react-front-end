import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { DashboardPage } from './DashboardPage';

describe('DashboardPage', () => {
  it('renders the dashboard heading and stat cards', () => {
    render(<DashboardPage />);

    expect(screen.getByRole('heading', { name: 'Dashboard' })).toBeInTheDocument();
    expect(screen.getByText("Today's Sales")).toBeInTheDocument();
    expect(screen.getAllByText('$0.00')).toHaveLength(4);
  });
});
