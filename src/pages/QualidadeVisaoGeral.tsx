import React, { useState, useEffect } from 'react';
import { Tabs } from 'antd';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { PageHeader } from '@/components/layout/PageHeader';
import { FilterBar } from '@/components/financiamento/FilterBar';
import { ClassificationCard } from '@/components/financiamento/ClassificationCard';
import { OverviewTable, sampleDataEsb } from '@/components/financiamento/OverviewTable';
import { VinculoAcompanhamentoTable } from '@/components/financiamento/VinculoAcompanhamentoTable';
import { ResultadoMunicipio } from '@/components/financiamento/ResultadoMunicipio';
import { ComparativoCadastro } from '@/components/financiamento/ComparativoCadastro';
import { CriteriosVinculacao } from '@/components/financiamento/CriteriosVinculacao';
import { EvolucaoCadastrosChart } from '@/components/financiamento/EvolucaoCadastrosChart';
import { Button } from '@/components/ui/button';

const validTabs = ['vinculo', 'qualidade', 'qualidade-esb'];

const tabTitles: Record<string, string> = {
  vinculo: 'Visão geral de Vínculo e Acompanhamento',
  qualidade: 'Visão geral de Qualidade eSF/eAP',
  'qualidade-esb': 'Visão geral de Qualidade eSB',
};

const tabBreadcrumbLabels: Record<string, string> = {
  vinculo: 'Vínculo e Acompanhamento',
  qualidade: 'Qualidade eSF/eAP',
  'qualidade-esb': 'Qualidade eSB',
};

const QualidadeVisaoGeral: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const initialTab = searchParams.get('tab') || 'vinculo';
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

  const renderQualidadeCards = () => (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <ClassificationCard classification="otimo" count={0} description="Ótimo: > 50 e ≤ 70" />
        <ClassificationCard classification="bom" count={36} description="Bom: > 30 e ≤ 50" />
        <ClassificationCard classification="suficiente" count={68} description="Suficiente: > 10 e ≤ 30" />
        <ClassificationCard classification="regular" count={304} description="Regular: ≤ 10 ou > 70" />
      </div>
      <OverviewTable />
    </>
  );

  const tabItems = [
    {
      key: 'vinculo',
      label: 'Vínculo e Acompanhamento',
      children: (
        <div className="space-y-6 pt-4">
          <FilterBar />
          <ResultadoMunicipio
            escoreCadastro={3}
            escoreAcompanhamento={3.5}
            notaFinal={6.5}
            classificacao="suficiente"
          />
          <EvolucaoCadastrosChart />
          <ComparativoCadastro
            municipio="Lorem ipsum"
            pessoasCadastradas={2339333}
            pessoasCadastroAtualizado={1500703}
            pessoasAcompanhadas={825242}
            populacaoIBGE={2800000}
            populacaoLimite={3200000}
          />
          <VinculoAcompanhamentoTable />
          <CriteriosVinculacao />
        </div>
      ),
    },
    {
      key: 'qualidade',
      label: 'Qualidade eSF/eAP',
      children: (
        <div className="space-y-6 pt-4">
          <FilterBar />
          {renderQualidadeCards()}
        </div>
      ),
    },
    {
      key: 'qualidade-esb',
      label: 'Qualidade eSB',
      children: (
        <div className="space-y-6 pt-4">
          <FilterBar />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <ClassificationCard classification="otimo" count={0} description="Ótimo: > 50 e ≤ 70" />
            <ClassificationCard classification="bom" count={36} description="Bom: > 30 e ≤ 50" />
            <ClassificationCard classification="suficiente" count={68} description="Suficiente: > 10 e ≤ 30" />
            <ClassificationCard classification="regular" count={304} description="Regular: ≤ 10 ou > 70" />
          </div>
          <OverviewTable data={sampleDataEsb} variant="qualidade-esb" />
        </div>
      ),
    },
  ];

  const breadcrumbLabel = tabBreadcrumbLabels[activeTab] || 'Qualidade eSF/eAP';
  const individualizadoPath = `/financiamento-aps/qualidade-esf-eap/individualizado?tab=${activeTab}`;

  const headerActions = (
    <Button 
      variant="outline" 
      size="sm"
      className="border-primary text-primary hover:bg-primary/5"
      onClick={() => navigate(individualizadoPath)}
    >
      Individualizado
    </Button>
  );

  return (
    <div>
      <PageHeader
        title={tabTitles[activeTab] || 'Visão geral'}
        breadcrumbs={[
          { label: 'Financiamento APS', path: '/financiamento-aps' },
          { label: breadcrumbLabel },
        ]}
        actions={headerActions}
      />

      {/* Tabs temporariamente ocultas - serão reativadas no futuro */}
      
      {/* Conteúdo renderizado com base na tab ativa da URL */}
      <div className="pt-4">
        {tabItems.find(item => item.key === activeTab)?.children || tabItems[0].children}
      </div>
    </div>
  );
};

export default QualidadeVisaoGeral;
