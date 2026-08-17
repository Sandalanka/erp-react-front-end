import { Badge } from '../../../components/Badge';
import type { ProductStatus } from '../types';

export function ProductStatusBadge({ status }: { status: ProductStatus }) {
  return (
    <Badge tone={status === 'ACTIVE' ? 'success' : 'neutral'}>
      {status === 'ACTIVE' ? 'Active' : 'Inactive'}
    </Badge>
  );
}
