import React from 'react';
import { cn } from '@/lib/utils';

type Status = 'otimo' | 'bom' | 'suficiente' | 'regular';

interface StatusBadgeProps {
  status: Status;
  value?: string;
  showLabel?: boolean;
}

const statusConfig = {
  otimo: {
    label: 'Ótimo',
    className: 'status-badge-otimo',
  },
  bom: {
    label: 'Bom',
    className: 'status-badge-bom',
  },
  suficiente: {
    label: 'Suficiente',
    className: 'status-badge-suficiente',
  },
  regular: {
    label: 'Regular',
    className: 'status-badge-regular',
  },
};

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status, value, showLabel = true }) => {
  const config = statusConfig[status];

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 rounded-md border px-2 py-0.5 text-xs font-medium',
        config.className
      )}
    >
      {showLabel && <span>{config.label}</span>}
      {value && <span>{value}</span>}
    </span>
  );
};
