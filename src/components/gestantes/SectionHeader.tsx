import React from 'react';
import { ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface SectionHeaderProps {
  title: string;
  icon: React.ReactNode;
  linkTo?: string;
  linkLabel?: string;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({ title, icon, linkTo, linkLabel = 'Ver relatório' }) => {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <span className="flex items-center justify-center w-7 h-7 rounded-md bg-primary/10">
          {icon}
        </span>
        <h3 className="text-sm font-semibold text-foreground uppercase tracking-wide">{title}</h3>
      </div>
      {linkTo && (
        <button
          onClick={() => navigate(linkTo)}
          className="flex items-center gap-1 text-[13px] font-medium text-primary hover:text-primary/80 transition-colors"
        >
          {linkLabel}
          <ChevronRight className="w-3.5 h-3.5" />
        </button>
      )}
    </div>
  );
};
