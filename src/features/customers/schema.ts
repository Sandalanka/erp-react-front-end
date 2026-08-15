import { z } from 'zod';

export const customerFormSchema = z.object({
  name: z.string().trim().min(1, 'Name is required').max(191),
  company: z.string().trim().max(191).optional().or(z.literal('')),
  email: z.string().trim().email('Invalid email address').max(191).optional().or(z.literal('')),
  phone: z.string().trim().max(50).optional().or(z.literal('')),
  address: z.string().trim().max(255).optional().or(z.literal('')),
  city: z.string().trim().max(100).optional().or(z.literal('')),
  country: z.string().trim().max(100).optional().or(z.literal('')),
  taxNumber: z.string().trim().max(100).optional().or(z.literal('')),
  creditLimit: z
    .union([z.string(), z.number()])
    .transform((val) => (val === '' || val === undefined ? undefined : Number(val)))
    .refine((val) => val === undefined || !Number.isNaN(val), 'Must be a valid number')
    .refine((val) => val === undefined || val >= 0, 'Must be a positive number')
    .refine((val) => val === undefined || val <= 9999999999.99, 'Credit limit is too large')
    .optional(),
  paymentTerms: z.string().trim().max(100).optional().or(z.literal('')),
  status: z.enum(['ACTIVE', 'INACTIVE']),
});

export type CustomerFormInput = z.input<typeof customerFormSchema>;
export type CustomerFormOutput = z.output<typeof customerFormSchema>;
