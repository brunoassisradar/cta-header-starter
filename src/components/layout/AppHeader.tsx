import React from 'react';
import { Menu, Bell, Grid3X3, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
interface AppHeaderProps {
  onToggleSidebar: () => void;
}
export const AppHeader: React.FC<AppHeaderProps> = ({
  onToggleSidebar
}) => {
  return <header className="flex h-14 items-center justify-between border-b border-border bg-card px-4">
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon" onClick={onToggleSidebar} className="h-8 w-8">
          <Menu className="h-5 w-5" />
        </Button>
        
        {/* Logo placeholder - substitua pelo seu logotipo */}
        <div className="flex h-10 items-center">
          <img alt="Logo" className="h-8 w-auto object-contain" src="/lovable-uploads/fcf5ea7d-9058-4034-bfac-f10a4aa13354.png" />
        </div>
      </div>
      
      <div className="flex items-center gap-1">
        <Button variant="ghost" size="icon" className="h-9 w-9 text-muted-foreground hover:text-foreground">
          <Bell className="h-5 w-5" />
        </Button>
        <Button variant="ghost" size="icon" className="h-9 w-9 text-muted-foreground hover:text-foreground">
          <Grid3X3 className="h-5 w-5" />
        </Button>
        <Button variant="ghost" size="icon" className="h-9 w-9 rounded-full bg-status-regular text-status-regular-bg">
          <User className="h-5 w-5" />
        </Button>
      </div>
    </header>;
};