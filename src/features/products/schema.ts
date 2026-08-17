import { z } from 'zod';

function priceField(label: string) {
  return z
    .union([z.string(), z.number()])
    .transform((val) => (val === '' || val === undefined ? undefined : Number(val)))
    .refine((val) => val === undefined || !Number.isNaN(val), 'Must be a valid number')
    .refine((val) => val === undefined || val >= 0, 'Must be a positive number')
    .refine((val) => val === undefined || val <= 9999999999.99, `${label} is too large`)
    .optional();
}

export const productFormSchema = z.object({
  name: z.string().trim().min(1, 'Name is required').max(191),
  sku: z.string().trim().max(100).optional().or(z.literal('')),
  category: z.string().trim().max(100).optional().or(z.literal('')),
  description: z.string().trim().max(1000).optional().or(z.literal('')),
  unit: z.string().trim().max(50).optional().or(z.literal('')),
  unitPrice: priceField('Unit price'),
  costPrice: priceField('Cost price'),
  status: z.enum(['ACTIVE', 'INACTIVE']),
});

export type ProductFormInput = z.input<typeof productFormSchema>;
export type ProductFormOutput = z.output<typeof productFormSchema>;
