import React, { useState } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import {
  Home,
  Heart,
  FileText,
  AlertCircle,
  CheckSquare,
  DollarSign,
  Wallet,
  ChevronDown,
  ChevronRight,
  Compass,
  MapPin,
  Settings,
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface AppSidebarProps {
  collapsed: boolean;
  onCollapse: (collapsed: boolean) => void;
}

interface TertiaryMenuItem {
  label: string;
  path: string;
}

interface SecondaryMenuItem {
  label: string;
  path: string;
  hasActiveState?: boolean;
  tabKey?: string; // The tab key to check for active state
  children?: TertiaryMenuItem[];
}

interface MenuItem {
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  path?: string;
  children?: SecondaryMenuItem[];
}

const menuItems: MenuItem[] = [
  { label: 'Sala de situação', icon: Home, path: '/sala-de-situacao' },
  {
    label: 'Linhas de cuidado',
    icon: Heart,
    path: '/linhas-de-cuidado',
    children: [
      { label: 'Hipertensão', path: '#', hasActiveState: false },
      { label: 'Diabetes', path: '#', hasActiveState: false },
      {
        label: 'Gestantes e Puérperas',
        path: '/linhas-de-cuidado/gestantes',
        hasActiveState: true,
        children: [
          { label: 'Visão geral', path: '/linhas-de-cuidado/gestantes' },
          { label: 'Relatório', path: '/linhas-de-cuidado/gestantes/relatorio' },
          { label: 'Individualizado', path: '/linhas-de-cuidado/gestantes/individualizado' },
        ]
      },
      { label: 'Idosos', path: '#', hasActiveState: false },
      { label: 'Saúde mental', path: '#', hasActiveState: false },
    ],
  },
  {
    label: 'Financiamento APS',
    icon: Wallet,
    path: '/financiamento-aps',
    children: [
      {
        label: 'Vínculo e acompanhamento',
        path: '/financiamento-aps/qualidade-esf-eap?tab=vinculo',
        hasActiveState: true,
        tabKey: 'vinculo',
        children: [
          { label: 'Visão geral', path: '/financiamento-aps/qualidade-esf-eap?tab=vinculo' },
          { label: 'Relatório', path: '/financiamento-aps/qualidade-esf-eap/relatorio?tab=vinculo' },
          { label: 'Individualizado', path: '/financiamento-aps/qualidade-esf-eap/individualizado?tab=vinculo' },
        ],
      },
      {
        label: 'Qualidade eSF/eAP',
        path: '/financiamento-aps/qualidade-esf-eap?tab=qualidade',
        hasActiveState: true,
        tabKey: 'qualidade',
        children: [
          { label: 'Visão geral', path: '/financiamento-aps/qualidade-esf-eap?tab=qualidade' },
          { label: 'Relatório', path: '/financiamento-aps/qualidade-esf-eap/relatorio?tab=qualidade' },
          { label: 'Individualizado', path: '/financiamento-aps/qualidade-esf-eap/individualizado?tab=qualidade' },
        ],
      },
    ],
  },
  {
    label: 'Financeiro',
    icon: DollarSign,
    path: '/financeiro',
    children: [
      {
        label: 'Visão geral',
        path: '/financeiro/visao-geral',
        hasActiveState: true,
      },
      {
        label: 'Relatório',
        path: '/financeiro/relatorio',
        hasActiveState: true,
      },
    ],
  },
  { label: 'Planejamento ass...', icon: Compass, path: '#' },
  { label: 'Análise de produção', icon: FileText, path: '#' },
  { label: 'Geocalização', icon: MapPin, path: '#' },
  {
    label: 'Configuração',
    icon: Settings,
    path: '#',
    children: [
      { label: 'Recebimento de Dados', path: '/configuracoes/recebimento-de-dados', hasActiveState: true },
    ],
  },
];

export const AppSidebar: React.FC<AppSidebarProps> = ({ collapsed }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [expandedItems, setExpandedItems] = useState<string[]>([]);
  const [expandedSecondary, setExpandedSecondary] = useState<string[]>([]);

  const toggleExpanded = (label: string) => {
    setExpandedItems((prev) =>
      prev.includes(label)
        ? prev.filter((item) => item !== label)
        : [...prev, label]
    );
  };

  const toggleSecondaryExpanded = (label: string, child?: SecondaryMenuItem) => {
    setExpandedSecondary((prev) => {
      // If clicking a different item, close others and open this one
      if (!prev.includes(label)) {
        return [...prev, label];
      }
      // If clicking the already-expanded item, collapse it
      return prev.filter((item) => item !== label);
    });
    // Always navigate to the first child (Visão geral) when clicking
    if (child?.children && child.children.length > 0) {
      navigate(child.children[0].path);
    }
  };

  // Get current tab from URL
  const searchParams = new URLSearchParams(location.search);
  const currentTab = searchParams.get('tab') || 'qualidade'; // default to qualidade if no tab

  const isInQualidadeSection = location.pathname.startsWith('/financiamento-aps/qualidade-esf-eap');
  const isInFinanceiroVisaoGeral = location.pathname.startsWith('/financeiro/visao-geral');

  const isSecondaryActive = (item: SecondaryMenuItem) => {
    if (!item.hasActiveState) return false;
    if (item.path === '#') return false;
    
    // If item has a tabKey, check if we're in the qualidade section AND the tab matches
    if (item.tabKey && isInQualidadeSection) {
      return currentTab === item.tabKey;
    }
    
    // Check financeiro tabs
    if (item.tabKey && isInFinanceiroVisaoGeral) {
      return currentTab === item.tabKey;
    }
    
    // For items without tabKey, check if the current path starts with the item's base path
    if (!item.tabKey && item.path) {
      const basePath = item.path.split('?')[0];
      return location.pathname.startsWith(basePath);
    }
    
    return false;
  };

  const isTertiaryActive = (path: string, parentTabKey?: string) => {
    const [basePath, queryString] = path.split('?');
    const pathParams = new URLSearchParams(queryString);
    const pathTab = pathParams.get('tab');
    
    // Check if pathname matches
    if (location.pathname !== basePath) return false;
    
    // If the path has a tab parameter, it must match the current tab
    if (pathTab && pathTab !== currentTab) return false;
    
    // If parent has a tabKey, current tab must match it
    if (parentTabKey && parentTabKey !== currentTab) return false;
    
    // If no tab params involved, just pathname match is enough
    return true;
  };

  const isInLinhasDeCuidadoSection = location.pathname.startsWith('/linhas-de-cuidado');
  const isInFinanceiroSection = location.pathname.startsWith('/financeiro');
  const isInFinanciamentoAPSSection = location.pathname.startsWith('/financiamento-aps');

  const isParentActive = (item: MenuItem) => {
    if (!item.children) return false;
    if (item.label === 'Linhas de cuidado' && isInLinhasDeCuidadoSection) return true;
    if (item.label === 'Financeiro' && isInFinanceiroSection) return true;
    if (item.label === 'Financiamento APS' && isInFinanciamentoAPSSection) return true;
    return item.children.some((child) => isSecondaryActive(child));
  };

  return (
    <aside
      className={cn(
        'flex flex-col border-r border-sidebar-border bg-sidebar transition-all duration-300',
        collapsed ? 'w-16' : 'w-64'
      )}
    >

      <nav className="flex-1 overflow-y-auto p-3">
        <ul className="space-y-1">
          {menuItems.map((item) => (
            <li key={item.label}>
              {item.children ? (
                <div>
                  <NavLink
                    to={item.path || '#'}
                    onClick={(e) => {
                      toggleExpanded(item.label);
                      if (!item.path || item.path === '#') {
                        e.preventDefault();
                      }
                    }}
                    className={cn(
                      'flex w-full items-center justify-between rounded-md px-3 py-2.5 text-sm font-medium transition-colors',
                      isParentActive(item)
                        ? 'bg-sidebar-accent text-sidebar-accent-foreground'
                        : 'text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground'
                    )}
                  >
                    <div className="flex items-center gap-3">
                      <item.icon className="h-5 w-5" />
                      {!collapsed && <span>{item.label}</span>}
                    </div>
                    {!collapsed && (
                      expandedItems.includes(item.label) ? (
                        <ChevronDown className="h-4 w-4" />
                      ) : (
                        <ChevronRight className="h-4 w-4" />
                      )
                    )}
                  </NavLink>
                  {!collapsed && expandedItems.includes(item.label) && (
                    <ul className="ml-8 mt-1 space-y-1">
                      {item.children.map((child) => (
                        <li key={child.label}>
                          {child.children ? (
                            // Secondary item with tertiary menu
                            <div>
                              <button
                                onClick={() => toggleSecondaryExpanded(child.label, child)}
                                className={cn(
                                  'flex w-full items-center justify-between rounded-md px-3 py-2 text-sm text-left transition-colors',
                                  isSecondaryActive(child)
                                    ? 'font-medium text-sidebar-primary'
                                    : 'text-sidebar-foreground hover:text-sidebar-primary'
                                )}
                              >
                                <span>{child.label}</span>
                                {expandedSecondary.includes(child.label) ? (
                                  <ChevronDown className="h-3 w-3" />
                                ) : (
                                  <ChevronRight className="h-3 w-3" />
                                )}
                              </button>
                              {expandedSecondary.includes(child.label) && (
                                <ul className="ml-4 mt-1 space-y-1 border-l border-border pl-3">
                                  {child.children.filter((tertiary) => tertiary.label !== 'Visão geral').map((tertiary) => (
                                                    <li key={tertiary.label}>
                                                      <NavLink
                                                        to={tertiary.path}
                                                        className={cn(
                                                          'block rounded-md px-2 py-1.5 text-xs transition-colors',
                                                          isTertiaryActive(tertiary.path, child.tabKey)
                                                            ? 'font-medium text-sidebar-primary'
                                                            : 'text-muted-foreground hover:text-sidebar-primary'
                                                        )}
                                                      >
                                        {tertiary.label}
                                      </NavLink>
                                    </li>
                                  ))}
                                </ul>
                              )}
                            </div>
                          ) : (
                            // Simple secondary item
                            <NavLink
                              to={child.path}
                              className={cn(
                                'block rounded-md px-3 py-2 text-sm transition-colors',
                                isSecondaryActive(child)
                                  ? 'font-medium text-sidebar-primary'
                                  : 'text-sidebar-foreground hover:text-sidebar-primary'
                              )}
                            >
                              {child.label}
                            </NavLink>
                          )}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ) : (
                <NavLink
                  to={item.path || '#'}
                  className={({ isActive: active }) =>
                    cn(
                      'flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium transition-colors',
                      active && item.path !== '#'
                        ? 'bg-sidebar-accent text-sidebar-accent-foreground'
                        : 'text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground'
                    )
                  }
                >
                  <item.icon className="h-5 w-5" />
                  {!collapsed && <span>{item.label}</span>}
                </NavLink>
              )}
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};
