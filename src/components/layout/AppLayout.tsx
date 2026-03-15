import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { AppSidebar } from './AppSidebar';
import { AppHeader } from './AppHeader';

export const AppLayout: React.FC = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(() => {
    return localStorage.getItem('sidebar-collapsed') === 'true';
  });

  const handleToggleSidebar = (value?: boolean) => {
    const newValue = value !== undefined ? value : !sidebarCollapsed;
    setSidebarCollapsed(newValue);
    localStorage.setItem('sidebar-collapsed', String(newValue));
  };
  
  return (
    <div className="flex h-screen flex-col overflow-hidden bg-background">
      <AppHeader onToggleSidebar={() => setSidebarCollapsed(!sidebarCollapsed)} />
      <div className="flex flex-1 overflow-hidden">
        <AppSidebar collapsed={sidebarCollapsed} onCollapse={setSidebarCollapsed} />
        <main className="flex-1 overflow-auto p-7">
          <Outlet />
        </main>
      </div>
    </div>
  );
};