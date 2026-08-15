import { Badge } from '../../../components/Badge';
import type { CustomerStatus } from '../types';

export function CustomerStatusBadge({ status }: { status: CustomerStatus }) {
  return <Badge tone={status === 'ACTIVE' ? 'success' : 'neutral'}>{status === 'ACTIVE' ? 'Active' : 'Inactive'}</Badge>;
}
