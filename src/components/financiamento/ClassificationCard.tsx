import React from 'react';
import { cn } from '@/lib/utils';

type Classification = 'otimo' | 'bom' | 'suficiente' | 'regular';

interface ClassificationCardProps {
  classification: Classification;
  count: number;
  description?: string;
  label?: string;
  countLabel?: string;
  icon?: React.ReactNode;
}

const classificationConfig = {
  otimo: {
    label: 'Classificadas como Ótimo',
    bgClass: 'bg-card border-l-4 border-l-[hsl(var(--status-otimo))]',
    iconColor: 'hsl(var(--status-otimo))',
  },
  bom: {
    label: 'Classificadas como Bom',
    bgClass: 'bg-card border-l-4 border-l-[hsl(var(--status-bom))]',
    iconColor: 'hsl(var(--status-bom))',
  },
  suficiente: {
    label: 'Classificadas como Suficiente',
    bgClass: 'bg-card border-l-4 border-l-[hsl(var(--status-suficiente))]',
    iconColor: 'hsl(var(--status-suficiente))',
  },
  regular: {
    label: 'Classificadas como Regular',
    bgClass: 'bg-card border-l-4 border-l-[hsl(var(--status-regular))]',
    iconColor: 'hsl(var(--status-regular))',
  },
};

export const ClassificationCard: React.FC<ClassificationCardProps> = ({
  classification,
  count,
  description,
  label,
  countLabel,
  icon,
}) => {
  const config = classificationConfig[classification];

  return (
    <div className={cn('rounded-lg p-4 shadow-sm', config.bgClass)}>
      <div className="flex items-start gap-3">
        {icon ? (
          <svg width="24" height="24" viewBox="0 0 800 800" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ flex: 'none' }}>
            <path d="M401.622 226.862C461.323 284.178 475.322 353.084 475.322 353.084C475.322 353.084 597.447 429.861 549.683 599.406H406.161L384.991 759.73C381.948 782.789 362.298 800 339.056 800H330.948C305.356 800 284.611 779.261 284.611 753.669V599.406H265.778C265.778 599.406 265.778 303.875 265.778 234.036C265.778 179.109 346.809 174.245 401.622 226.862Z" fill={config.iconColor}/>
            <path d="M322.816 0C368.975 0 406.398 37.4297 406.398 83.5828C406.398 129.748 368.975 167.166 322.816 167.166C276.656 167.166 239.237 129.748 239.237 83.5828C239.237 37.4297 276.656 0 322.816 0Z" fill={config.iconColor}/>
          </svg>
        ) : null}
        <div className="flex-1">
          <p className="text-sm text-muted-foreground">{label || config.label}</p>
          <p className="text-xl font-semibold text-foreground">{count} {countLabel || 'Equipes'}</p>
          {description && (
            <div className="mt-2 pt-2 border-t border-border">
              <p className="text-xs text-muted-foreground">{description}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
