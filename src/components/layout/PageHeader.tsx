import React from 'react';
import { Breadcrumb } from './Breadcrumb';

interface BreadcrumbItem {
  label: string;
  path?: string;
}

interface PageHeaderProps {
  title: string;
  breadcrumbs: BreadcrumbItem[];
  actions?: React.ReactNode;
}

export const PageHeader: React.FC<PageHeaderProps> = ({ title, breadcrumbs, actions }) => {
  return (
    <div className="mb-6">
      <Breadcrumb items={breadcrumbs} />
      <div className="mt-2 flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-foreground">{title}</h1>
        {actions && <div className="flex items-center gap-2">{actions}</div>}
      </div>
    </div>
  );
};
