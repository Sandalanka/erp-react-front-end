import type { SupplierFormInput } from './schema';
import type { Supplier } from './types';

export function supplierToFormValues(supplier: Supplier): SupplierFormInput {
  return {
    name: supplier.name,
    contactPerson: supplier.contactPerson ?? '',
    email: supplier.email ?? '',
    phone: supplier.phone ?? '',
    address: supplier.address ?? '',
    city: supplier.city ?? '',
    country: supplier.country ?? '',
    taxNumber: supplier.taxNumber ?? '',
    paymentTerms: supplier.paymentTerms ?? '',
    status: supplier.status,
  };
}
