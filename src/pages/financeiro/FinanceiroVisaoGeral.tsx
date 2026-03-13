import React, { useState, useEffect } from 'react';
import { Tabs } from 'antd';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { PageHeader } from '@/components/layout/PageHeader';
import { Button } from '@/components/ui/button';
import { ConsolidadoContent } from '@/components/financeiro/ConsolidadoContent';
import { EvolucaoContent } from '@/components/financeiro/EvolucaoContent';
import { SimuladorContent } from '@/components/financeiro/SimuladorContent';

const validTabs = ['consolidado', 'evolucao', 'simulador'];

const tabTitles: Record<string, string> = {
  consolidado: 'Visão geral consolidado',
  evolucao: 'Visão geral de evolução',
  simulador: 'Visão geral consolidado',
};

const FinanceiroVisaoGeral: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const initialTab = searchParams.get('tab') || 'consolidado';
  const [activeTab, setActiveTab] = useState(initialTab);

  useEffect(() => {
    const tabParam = searchParams.get('tab');
    if (tabParam && validTabs.includes(tabParam)) {
      setActiveTab(tabParam);
    }
  }, [searchParams]);

  const handleTabChange = (key: string) => {
    setActiveTab(key);
    const newParams = new URLSearchParams(searchParams);
    newParams.set('tab', key);
    setSearchParams(newParams, { replace: true });
  };

  const tabItems = [
    {
      key: 'consolidado',
      label: 'Consolidado',
      children: <div className="pt-4"><ConsolidadoContent /></div>,
    },
    {
      key: 'evolucao',
      label: 'Evolução',
      children: <div className="pt-4"><EvolucaoContent /></div>,
    },
    {
      key: 'simulador',
      label: 'Simulador',
      children: <div className="pt-4"><SimuladorContent /></div>,
    },
  ];

  const headerActions = (
    <Button
      variant="outline"
      size="sm"
      className="border-primary text-primary hover:bg-primary/5"
      onClick={() => navigate('/financeiro/relatorio')}
    >
      Relatório
    </Button>
  );

  return (
    <div>
      <PageHeader
        title={tabTitles[activeTab] || 'Visão geral'}
        breadcrumbs={[
          { label: 'Financeiro', path: '/financeiro' },
          { label: 'Visão geral' },
        ]}
        actions={headerActions}
      />

      <Tabs
        activeKey={activeTab}
        onChange={handleTabChange}
        items={tabItems}
        size="large"
        className="financiamento-tabs"
      />
    </div>
  );
};

export default FinanceiroVisaoGeral;
