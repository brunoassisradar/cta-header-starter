import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface InfoCardLink {
  label: string;
  path: string;
}

interface InfoCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  links?: InfoCardLink[];
  variant?: 'default' | 'primary';
}

export const InfoCard: React.FC<InfoCardProps> = ({
  icon,
  title,
  description,
  links,
  variant = 'default',
}) => {
  return (
    <div
      className={cn(
        'rounded-lg p-5 shadow-sm h-full flex flex-col',
        variant === 'primary' ? 'bg-primary text-primary-foreground' : 'bg-card'
      )}
    >
      <div className="mb-4">
        <div
          className={cn(
            'inline-flex h-12 w-12 items-center justify-center rounded-full',
            variant === 'primary' ? 'bg-primary-foreground/20' : 'bg-primary'
          )}
        >
          {icon}
        </div>
      </div>

      <h3
        className={cn(
          'text-lg font-semibold mb-2',
          variant === 'primary' ? 'text-primary-foreground' : 'text-foreground'
        )}
      >
        {title}
      </h3>

      <p
        className={cn(
          'text-sm mb-4 flex-1',
          variant === 'primary' ? 'text-primary-foreground/80' : 'text-muted-foreground'
        )}
      >
        {description}
      </p>

      {links && links.length > 0 && (
        <div className="space-y-2 pt-2 border-t border-border/20">
          {links.map((link) => (
            <Link
              key={link.label}
              to={link.path}
              className={cn(
                'flex items-center justify-between rounded-md px-3 py-2 text-sm transition-colors',
                variant === 'primary'
                  ? 'bg-primary-foreground/10 text-primary-foreground hover:bg-primary-foreground/20'
                  : 'bg-muted text-foreground hover:bg-accent'
              )}
            >
              <span>{link.label}</span>
              <ChevronRight className="h-4 w-4" />
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};
