import type { CustomerFormInput } from './schema';
import type { Customer } from './types';

export function customerToFormValues(customer: Customer): CustomerFormInput {
  return {
    name: customer.name,
    company: customer.company ?? '',
    email: customer.email ?? '',
    phone: customer.phone ?? '',
    address: customer.address ?? '',
    city: customer.city ?? '',
    country: customer.country ?? '',
    taxNumber: customer.taxNumber ?? '',
    creditLimit: customer.creditLimit ?? undefined,
    paymentTerms: customer.paymentTerms ?? '',
    status: customer.status,
  };
}
