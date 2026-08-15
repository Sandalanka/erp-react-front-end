import {
  LayoutDashboard,
  Users,
  Truck,
  Package,
  Warehouse,
  ShoppingCart,
  ShoppingBag,
  FileText,
  Wallet,
  Receipt,
  BarChart3,
  Settings,
} from 'lucide-react';
import type { NavItem } from '../types/nav';

export const navItems: NavItem[] = [
  { label: 'Dashboard', to: '/dashboard', icon: LayoutDashboard },
  { label: 'Customers', to: '/customers', icon: Users },
  { label: 'Suppliers', to: '/suppliers', icon: Truck },
  { label: 'Products', to: '/products', icon: Package },
  { label: 'Inventory', to: '/inventory', icon: Warehouse },
  { label: 'Purchases', to: '/purchases', icon: ShoppingBag },
  { label: 'Sales', to: '/sales', icon: ShoppingCart },
  { label: 'Invoices', to: '/invoices', icon: FileText },
  { label: 'Payments', to: '/payments', icon: Wallet },
  { label: 'Expenses', to: '/expenses', icon: Receipt },
  { label: 'Reports', to: '/reports', icon: BarChart3 },
  { label: 'Settings', to: '/settings', icon: Settings },
];
