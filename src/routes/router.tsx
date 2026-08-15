import { createBrowserRouter, Navigate } from 'react-router-dom';
import { AppLayout } from '../layouts/AppLayout';
import { DashboardPage } from '../pages/DashboardPage';
import { PlaceholderPage } from '../pages/PlaceholderPage';
import { NotFoundPage } from '../pages/NotFoundPage';

const modulePages = [
  { path: 'customers', title: 'Customers' },
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
      ...modulePages.map((page) => ({
        path: page.path,
        element: <PlaceholderPage title={page.title} />,
      })),
    ],
  },
  { path: '*', element: <NotFoundPage /> },
]);
