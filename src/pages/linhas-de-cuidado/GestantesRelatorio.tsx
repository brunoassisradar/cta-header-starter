import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { PageHeader } from '@/components/layout/PageHeader';
import { CareLineFilterBar } from '@/components/gestantes/CareLineFilterBar';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Users, CalendarCheck, TestTube, Baby } from 'lucide-react';
import { PerfilContent } from '@/components/gestantes/PerfilContent';
import { AcompanhamentoContent } from '@/components/gestantes/AcompanhamentoContent';
import { ExamesTestesContent } from '@/components/gestantes/ExamesTestesContent';
import { PuerperioContent } from '@/components/gestantes/PuerperioContent';

const indicadores = [
  { value: 'perfil', label: 'Perfil', shortLabel: 'P1', icon: Users },
  { value: 'acompanhamento', label: 'Acompanhamento', shortLabel: 'P2', icon: CalendarCheck },
  { value: 'exame-testes', label: 'Exame/testes', shortLabel: 'P3', icon: TestTube },
  { value: 'puerperio', label: 'Puerpério', shortLabel: 'P4', icon: Baby },
];

const GestantesRelatorio: React.FC = () => {
  const [searchParams] = useSearchParams();
  const initialIndicador = searchParams.get('indicador') || 'perfil';
  const navigate = useNavigate();
  const [selectedIndicador, setSelectedIndicador] = useState(initialIndicador);

  const selectedData = indicadores.find(i => i.value === selectedIndicador);

  const headerActions = (
    <Button
      variant="outline"
      size="sm"
      className="border-primary text-primary hover:bg-primary/5"
      onClick={() => navigate('/linhas-de-cuidado/gestantes/individualizado')}
    >
      Busca ativa
    </Button>
  );

  return (
    <div>
      <PageHeader
        title="Relatório de Gestantes e Puérperas"
        breadcrumbs={[
          { label: 'Linhas de cuidado', path: '/linhas-de-cuidado' },
          { label: 'Gestantes e Puérperas', path: '/linhas-de-cuidado/gestantes' },
          { label: 'Relatório' },
        ]}
        actions={headerActions}
      />

      <div className="space-y-6">
        <CareLineFilterBar />

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Sidebar de Indicadores */}
          <nav className="shrink-0 lg:w-64">
            <div className="rounded-lg bg-card shadow-sm p-2">
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider px-3 py-2">
                Indicadores
              </p>
              <div className="space-y-1">
                {indicadores.map(ind => {
                  const isSelected = selectedIndicador === ind.value;
                  return (
                    <button
                      key={ind.value}
                      onClick={() => setSelectedIndicador(ind.value)}
                      className={cn(
                        "w-full flex items-center gap-3 px-3 py-2.5 rounded-md text-left transition-all duration-150",
                        "hover:bg-muted/50",
                        isSelected
                          ? "bg-primary/8 border-l-[3px] border-primary shadow-sm"
                          : "text-muted-foreground hover:text-foreground border-l-[3px] border-transparent"
                      )}
                    >
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

          {/* Conteúdo principal */}
          <div className="flex-1 min-w-0 space-y-6">
            <div className="rounded-lg bg-card shadow-sm overflow-hidden">
              <div className="px-6 py-4 border-b border-border bg-gradient-to-r from-primary/5 to-transparent">
                <div className="flex items-center gap-3">
                  {selectedData && (
                    <span className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary text-primary-foreground">
                      <selectedData.icon className="w-5 h-5" />
                    </span>
                  )}
                  <div>
                    <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                      Indicador
                    </p>
                    <h2 className="text-lg font-semibold text-foreground">
                      {selectedData?.label}
                    </h2>
                  </div>
                </div>
              </div>
              <div className="p-6">
                {selectedIndicador === 'perfil' && <PerfilContent />}
                {selectedIndicador === 'acompanhamento' && <AcompanhamentoContent />}
                {selectedIndicador === 'exame-testes' && <ExamesTestesContent />}
                {selectedIndicador === 'puerperio' && <PuerperioContent />}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GestantesRelatorio;
