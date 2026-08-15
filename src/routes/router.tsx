import { createBrowserRouter, Navigate } from 'react-router-dom';
import { AppLayout } from '../layouts/AppLayout';
import { DashboardPage } from '../pages/DashboardPage';
import { PlaceholderPage } from '../pages/PlaceholderPage';
import { NotFoundPage } from '../pages/NotFoundPage';
import { CustomersListPage } from '../features/customers/pages/CustomersListPage';
import { CustomerCreatePage } from '../features/customers/pages/CustomerCreatePage';
import { CustomerEditPage } from '../features/customers/pages/CustomerEditPage';

const modulePages = [
  { path: 'suppliers', title: 'Suppliers' },
  { path: 'products', title: 'Products' },
  { path: 'inventory', title: 'Inventory' },
  { path: 'purchases', title: 'Purchases' },
  { path: 'sales', title: 'Sales' },
  { path: 'invoices', title: 'Invoices' },
  { path: 'payments', title: 'Payments' },
  { path: 'expenses', title: 'Expenses' },
  { path: 'reports', title: 'Reports' },
  { path: 'settings', title: 'Settings' },
];

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      { index: true, element: <Navigate to="/dashboard" replace /> },
      { path: 'dashboard', element: <DashboardPage /> },
      { path: 'customers', element: <CustomersListPage /> },
      { path: 'customers/new', element: <CustomerCreatePage /> },
      { path: 'customers/:id/edit', element: <CustomerEditPage /> },
      ...modulePages.map((page) => ({
        path: page.path,
        element: <PlaceholderPage title={page.title} />,
      })),
    ],
  },
  { path: '*', element: <NotFoundPage /> },
]);
