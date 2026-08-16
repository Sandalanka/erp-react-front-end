import { z } from 'zod';

export const supplierFormSchema = z.object({
  name: z.string().trim().min(1, 'Name is required').max(191),
  contactPerson: z.string().trim().max(191).optional().or(z.literal('')),
  email: z.string().trim().email('Invalid email address').max(191).optional().or(z.literal('')),
  phone: z.string().trim().max(50).optional().or(z.literal('')),
  address: z.string().trim().max(255).optional().or(z.literal('')),
  city: z.string().trim().max(100).optional().or(z.literal('')),
  country: z.string().trim().max(100).optional().or(z.literal('')),
  taxNumber: z.string().trim().max(100).optional().or(z.literal('')),
  paymentTerms: z.string().trim().max(100).optional().or(z.literal('')),
  status: z.enum(['ACTIVE', 'INACTIVE']),
});

export type SupplierFormInput = z.input<typeof supplierFormSchema>;
export type SupplierFormOutput = z.output<typeof supplierFormSchema>;
