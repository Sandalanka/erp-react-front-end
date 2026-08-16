import { Badge } from '../../../components/Badge';
import type { SupplierStatus } from '../types';

export function SupplierStatusBadge({ status }: { status: SupplierStatus }) {
  return (
    <Badge tone={status === 'ACTIVE' ? 'success' : 'neutral'}>
      {status === 'ACTIVE' ? 'Active' : 'Inactive'}
    </Badge>
  );
}
