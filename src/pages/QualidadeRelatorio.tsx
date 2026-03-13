import React, { useState, useEffect } from 'react';
import { Segmented, Tabs } from 'antd';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { PageHeader } from '@/components/layout/PageHeader';
import { FilterBar } from '@/components/financiamento/FilterBar';
import { IndicatorChart } from '@/components/financiamento/IndicatorChart';
import { ReportTable } from '@/components/financiamento/ReportTable';
import { CadastroResumo } from '@/components/financiamento/CadastroResumo';
import { AcompanhamentoResumo } from '@/components/financiamento/AcompanhamentoResumo';
import ComparativoCadastroContent from '@/components/financiamento/ComparativoCadastroContent';
import { cn } from '@/lib/utils';
import { Users, Baby, Heart, Activity, Stethoscope, UserCheck, Flower2, ClipboardList, UserSearch, Smile, CheckCircle2, Scissors, Sparkles, HandHeart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { EsbIndicadorContent } from '@/components/financiamento/EsbIndicadorContent';

const periods = ['Janeiro', 'Fevereiro', 'Março', 'Abril'];

const validTabs = ['vinculo', 'qualidade', 'qualidade-esb'];

const tabTitles: Record<string, string> = {
  vinculo: 'Relatório de Vínculo e Acompanhamento',
  qualidade: 'Relatório de Qualidade eSF/eAP',
  'qualidade-esb': 'Relatório de Qualidade eSB',
};

const tabBreadcrumbLabels: Record<string, string> = {
  vinculo: 'Vínculo e Acompanhamento',
  qualidade: 'Qualidade eSF/eAP',
  'qualidade-esb': 'Qualidade eSB',
};

const tabBreadcrumbPaths: Record<string, string> = {
  vinculo: '/financiamento-aps/qualidade-esf-eap?tab=vinculo',
  qualidade: '/financiamento-aps/qualidade-esf-eap?tab=qualidade',
  'qualidade-esb': '/financiamento-aps/qualidade-esf-eap?tab=qualidade-esb',
};

const indicadores = [{
  value: 'c1',
  label: 'Mais acesso',
  shortLabel: 'C1',
  icon: Users
}, {
  value: 'c2',
  label: 'Cuidado Infantil',
  shortLabel: 'C2',
  icon: Baby
}, {
  value: 'c3',
  label: 'Gestante e Puérpera',
  shortLabel: 'C3',
  icon: Heart
}, {
  value: 'c4',
  label: 'Pessoa com Diabetes',
  shortLabel: 'C4',
  icon: Activity
}, {
  value: 'c5',
  label: 'Pessoa com Hipertensão',
  shortLabel: 'C5',
  icon: Stethoscope
}, {
  value: 'c6',
  label: 'Pessoa Idosa',
  shortLabel: 'C6',
  icon: UserCheck
}, {
  value: 'c7',
  label: 'Cuidado da mulher',
  shortLabel: 'C7',
  icon: Flower2
}];

const indicadoresEsb = [{
  value: 'b1',
  label: 'Primeira consulta',
  shortLabel: 'B1',
  icon: Stethoscope
}, {
  value: 'b2',
  label: 'Tratamento concluído',
  shortLabel: 'B2',
  icon: CheckCircle2
}, {
  value: 'b3',
  label: 'Taxa de exodontias',
  shortLabel: 'B3',
  icon: Scissors
}, {
  value: 'b4',
  label: 'Procedimentos odontológicos',
  shortLabel: 'B4',
  icon: ClipboardList
}, {
  value: 'b5',
  label: 'Escovação supervisionada',
  shortLabel: 'B5',
  icon: Sparkles
}, {
  value: 'b6',
  label: 'Tratamento restaurador',
  shortLabel: 'B6',
  icon: HandHeart
}];

const dimensoes = [{
  value: 'cadastro',
  label: 'Cadastro',
  shortLabel: 'D1',
  icon: ClipboardList
}, {
  value: 'acompanhamento',
  label: 'Acompanhamento',
  shortLabel: 'D2',
  icon: UserSearch
}, {
  value: 'comparativo',
  label: 'Comparativo',
  shortLabel: 'D3',
  icon: Users
}];

const allIndicadores = [...indicadores, ...indicadoresEsb];

const QualidadeRelatorio: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  
  const initialTab = searchParams.get('tab') || 'vinculo';
  const initialIndicador = searchParams.get('indicador') || 'c1';
  const initialIndicadorEsb = searchParams.get('indicador') || 'b1';
  const initialPeriodo = searchParams.get('periodo') || 'Consolidado';
  const initialDimensao = searchParams.get('dimensao') || 'cadastro';
  
  const [activeTab, setActiveTab] = useState(initialTab);
  const [selectedPeriod, setSelectedPeriod] = useState(initialPeriodo);
  const [selectedIndicador, setSelectedIndicador] = useState(initialIndicador);
  const [selectedIndicadorEsb, setSelectedIndicadorEsb] = useState(initialIndicadorEsb);
  const [selectedDimensao, setSelectedDimensao] = useState(initialDimensao);
  const [vinculoPeriod, setVinculoPeriod] = useState(initialPeriodo);
  const [esbPeriod, setEsbPeriod] = useState(initialPeriodo);
  
  useEffect(() => {
    const tabParam = searchParams.get('tab');
    const indicadorParam = searchParams.get('indicador');
    const periodoParam = searchParams.get('periodo');
    const dimensaoParam = searchParams.get('dimensao');
    
    if (tabParam && validTabs.includes(tabParam)) {
      setActiveTab(tabParam);
    }
    if (indicadorParam) {
      if (indicadores.some(i => i.value === indicadorParam)) {
        setSelectedIndicador(indicadorParam);
      }
      if (indicadoresEsb.some(i => i.value === indicadorParam)) {
        setSelectedIndicadorEsb(indicadorParam);
      }
    }
    if (periodoParam && periods.includes(periodoParam)) {
      setSelectedPeriod(periodoParam);
      setVinculoPeriod(periodoParam);
      setEsbPeriod(periodoParam);
    }
    if (dimensaoParam && dimensoes.some(d => d.value === dimensaoParam)) {
      setSelectedDimensao(dimensaoParam);
    }
  }, [searchParams]);

  const selectedIndicadorData = indicadores.find(i => i.value === selectedIndicador);
  const selectedIndicadorEsbData = indicadoresEsb.find(i => i.value === selectedIndicadorEsb);
  const selectedDimensaoData = dimensoes.find(d => d.value === selectedDimensao);

  const renderIndicatorSidebar = (
    items: typeof indicadores,
    selected: string,
    onSelect: (value: string) => void,
    title: string
  ) => (
    <nav className="shrink-0 lg:w-64">
      <div className="rounded-lg bg-card shadow-sm p-2">
        <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider px-3 py-2">
          {title}
        </p>
        <div className="space-y-1">
          {items.map(ind => {
            const isSelected = selected === ind.value;
            return (
              <button 
                key={ind.value} 
                onClick={() => onSelect(ind.value)} 
                className={cn(
                  "w-full flex items-center gap-3 px-3 py-2.5 rounded-md text-left transition-all duration-150",
                  "hover:bg-muted/50",
                  isSelected 
                    ? "bg-primary/8 border-l-[3px] border-primary shadow-sm" 
                    : "text-muted-foreground hover:text-foreground border-l-[3px] border-transparent"
                )}
              >
                <span className={cn(
                  "flex items-center justify-center w-8 h-8 rounded-md text-sm font-semibold shrink-0 transition-colors",
                  isSelected ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                )}>
                  {ind.shortLabel}
                </span>
                <div className="min-w-0 flex-1">
                  <p className={cn("text-sm font-medium truncate", isSelected ? "text-foreground" : "")}>
                    {ind.label}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );

  const renderQualidadeContent = () => (
    <div className="space-y-6">
      <FilterBar periods={periods} selectedPeriod={selectedPeriod} onPeriodChange={setSelectedPeriod} />

      <div className="rounded-lg bg-card p-1 shadow-sm">
        <Segmented block value={selectedPeriod} onChange={value => setSelectedPeriod(value as string)} options={periods} className="!bg-transparent" />
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {renderIndicatorSidebar(indicadores, selectedIndicador, setSelectedIndicador, 'Indicadores')}

        <div className="flex-1 min-w-0 space-y-6">
          <div className="rounded-lg bg-card shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-border bg-gradient-to-r from-primary/5 to-transparent">
              <div className="flex items-center gap-3">
                {selectedIndicadorData && (
                  <span className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary text-primary-foreground">
                    <selectedIndicadorData.icon className="w-5 h-5" />
                  </span>
                )}
                <div>
                  <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    Boas práticas
                  </p>
                  <h2 className="text-lg font-semibold text-foreground">
                    {selectedIndicadorData?.label}
                  </h2>
                </div>
              </div>
            </div>
            <div className="p-4">
              <IndicatorChart 
                selectedIndicador={selectedIndicador}
                kpiValues={{ primary: 50, secondary: 40 }}
              />
            </div>
          </div>

          <div className="rounded-lg bg-card shadow-sm overflow-hidden">
            <div className="p-4">
              <ReportTable selectedPeriod={selectedPeriod} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderQualidadeEsbContent = () => (
    <div className="space-y-6">
      <FilterBar periods={periods} selectedPeriod={esbPeriod} onPeriodChange={setEsbPeriod} />

      <div className="rounded-lg bg-card p-1 shadow-sm">
        <Segmented block value={esbPeriod} onChange={value => setEsbPeriod(value as string)} options={periods} className="!bg-transparent" />
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {renderIndicatorSidebar(indicadoresEsb, selectedIndicadorEsb, setSelectedIndicadorEsb, 'Indicadores')}

        <div className="flex-1 min-w-0 space-y-6">
          {/* Card de conteúdo - estrutura base */}
          <div className="rounded-lg bg-card shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-border bg-gradient-to-r from-primary/5 to-transparent">
              <div className="flex items-center gap-3">
                {selectedIndicadorEsbData && (
                  <span className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary text-primary-foreground">
                    <selectedIndicadorEsbData.icon className="w-5 h-5" />
                  </span>
                )}
                <div>
                  <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    Indicador
                  </p>
                  <h2 className="text-lg font-semibold text-foreground">
                    {selectedIndicadorEsbData?.label}
                  </h2>
                </div>
              </div>
            </div>
            <div className="p-6">
              <EsbIndicadorContent indicador={selectedIndicadorEsb} />
            </div>
          </div>

          <div className="rounded-lg bg-card shadow-sm overflow-hidden">
            <div className="p-4">
              <ReportTable selectedPeriod={esbPeriod} variant="qualidade-esb" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderVinculoContent = () => (
    <div className="space-y-6">
      <FilterBar periods={periods} selectedPeriod={vinculoPeriod} onPeriodChange={setVinculoPeriod} />

      <div className="rounded-lg bg-card p-1 shadow-sm">
        <Segmented block value={vinculoPeriod} onChange={value => setVinculoPeriod(value as string)} options={periods} className="!bg-transparent" />
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        <nav className="shrink-0 lg:w-64">
          <div className="rounded-lg bg-card shadow-sm p-2">
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider px-3 py-2">
              Dimensões
            </p>
            <div className="space-y-1">
              {dimensoes.map(dim => {
                const isSelected = selectedDimensao === dim.value;
                return (
                  <button 
                    key={dim.value} 
                    onClick={() => setSelectedDimensao(dim.value)} 
                    className={cn(
                      "w-full flex items-center gap-3 px-3 py-2.5 rounded-md text-left transition-all duration-150",
                      "hover:bg-muted/50",
                      isSelected 
                        ? "bg-primary/8 border-l-[3px] border-primary shadow-sm" 
                        : "text-muted-foreground hover:text-foreground border-l-[3px] border-transparent"
                    )}
                  >
                    <span className={cn(
                      "flex items-center justify-center w-8 h-8 rounded-md text-sm font-semibold shrink-0 transition-colors",
                      isSelected ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                    )}>
                      {dim.shortLabel}
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className={cn("text-sm font-medium truncate", isSelected ? "text-foreground" : "")}>
                        {dim.label}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </nav>

        <div className="flex-1 min-w-0 space-y-6">
          <div className="rounded-lg bg-card shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-border bg-gradient-to-r from-primary/5 to-transparent">
              <div className="flex items-center gap-3">
                {selectedDimensaoData && (
                  <span className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary text-primary-foreground">
                    <selectedDimensaoData.icon className="w-5 h-5" />
                  </span>
                )}
                <div>
                  <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    Dimensão
                  </p>
                  <h2 className="text-lg font-semibold text-foreground">
                    {selectedDimensaoData?.label}
                  </h2>
                </div>
              </div>
            </div>
            <div className="p-6">
              {selectedDimensao === 'cadastro' ? (
                <CadastroResumo />
              ) : selectedDimensao === 'acompanhamento' ? (
                <AcompanhamentoResumo />
              ) : (
                <ComparativoCadastroContent />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const tabItems = [
    {
      key: 'vinculo',
      label: 'Vínculo e Acompanhamento',
      children: <div className="pt-4">{renderVinculoContent()}</div>,
    },
    {
      key: 'qualidade',
      label: 'Qualidade eSF/eAP',
      children: <div className="pt-4">{renderQualidadeContent()}</div>,
    },
    {
      key: 'qualidade-esb',
      label: 'Qualidade eSB',
      children: <div className="pt-4">{renderQualidadeEsbContent()}</div>,
    },
  ];

  const breadcrumbLabel = tabBreadcrumbLabels[activeTab] || 'Qualidade eSF/eAP';
  const breadcrumbPath = tabBreadcrumbPaths[activeTab] || '/financiamento-aps/qualidade-esf-eap?tab=qualidade';
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
        title={tabTitles[activeTab] || 'Relatório'} 
        breadcrumbs={[
          { label: 'Financiamento APS', path: '/financiamento-aps' },
          { label: breadcrumbLabel, path: breadcrumbPath },
          { label: 'Relatório' }
        ]}
        actions={headerActions}
      />

      {/* Tabs temporariamente ocultas - serão reativadas no futuro */}
      {/* <Tabs
        activeKey={activeTab}
        onChange={(key) => {
          setActiveTab(key);
          const newParams = new URLSearchParams(searchParams);
          newParams.set('tab', key);
          setSearchParams(newParams, { replace: true });
        }}
        items={tabItems}
        size="large"
        className="financiamento-tabs"
      /> */}
      
      {/* Conteúdo da aba Vínculo (padrão) */}
      <div className="pt-4">{renderVinculoContent()}</div>
    </div>
  );
};

export default QualidadeRelatorio;
