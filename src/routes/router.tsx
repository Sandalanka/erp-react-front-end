import { createBrowserRouter, Navigate } from 'react-router-dom';
import { AppLayout } from '../layouts/AppLayout';
import { DashboardPage } from '../pages/DashboardPage';
import { PlaceholderPage } from '../pages/PlaceholderPage';
import { NotFoundPage } from '../pages/NotFoundPage';
import { CustomersListPage } from '../features/customers/pages/CustomersListPage';
import { CustomerCreatePage } from '../features/customers/pages/CustomerCreatePage';
import { CustomerEditPage } from '../features/customers/pages/CustomerEditPage';
import { SuppliersListPage } from '../features/suppliers/pages/SuppliersListPage';
import { SupplierCreatePage } from '../features/suppliers/pages/SupplierCreatePage';
import { SupplierEditPage } from '../features/suppliers/pages/SupplierEditPage';
import { ProductsListPage } from '../features/products/pages/ProductsListPage';
import { ProductCreatePage } from '../features/products/pages/ProductCreatePage';
import { ProductEditPage } from '../features/products/pages/ProductEditPage';

const modulePages = [
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
      { path: 'suppliers', element: <SuppliersListPage /> },
      { path: 'suppliers/new', element: <SupplierCreatePage /> },
      { path: 'suppliers/:id/edit', element: <SupplierEditPage /> },
      { path: 'products', element: <ProductsListPage /> },
      { path: 'products/new', element: <ProductCreatePage /> },
      { path: 'products/:id/edit', element: <ProductEditPage /> },
      ...modulePages.map((page) => ({
        path: page.path,
        element: <PlaceholderPage title={page.title} />,
      })),
    ],
  },
  { path: '*', element: <NotFoundPage /> },
]);
