import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { TrendingUp, RotateCcw, Download, Building2, Info, AlertTriangle, Lightbulb, Users } from 'lucide-react';

interface MetaSlider {
  id: string;
  label: string;
  description: string;
  atual: number;
  meta: number;
  alvoIdeal: number;
}

const defaultMetas: MetaSlider[] = [
  { id: 'acompanhamento', label: 'Ativação do Acompanhamento', description: 'Cadastros válidos e ativos', atual: 62, meta: 85, alvoIdeal: 100 },
  { id: 'consultas', label: 'Cobertura de Consultas', description: 'Lorem ipsum dolor sit amet', atual: 45, meta: 60, alvoIdeal: 100 },
  { id: 'procedimentos', label: 'Cobertura de Procedimentos', description: 'Lorem ipsum dolor sit amet', atual: 58, meta: 72, alvoIdeal: 100 },
  { id: 'vacinal', label: 'Cobertura Vacinal', description: 'Lorem ipsum dolor sit amet', atual: 88, meta: 95, alvoIdeal: 95 },
  { id: 'visitas', label: 'Visitas Domiciliares', description: 'Cobertura por ACS', atual: 92, meta: 100, alvoIdeal: 100 },
];

export const SimuladorContent: React.FC = () => {
  const [metas, setMetas] = useState<MetaSlider[]>(defaultMetas);

  const handleMetaChange = (id: string, value: number[]) => {
    setMetas(prev => prev.map(m => m.id === id ? { ...m, meta: value[0] } : m));
  };

  const handleReset = () => {
    setMetas(defaultMetas);
  };

  return (
    <div className="space-y-6">
      {/* Projeção financeira header */}
      <div className="flex items-center gap-2">
        <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary/10">
          <TrendingUp className="w-4 h-4 text-primary" />
        </span>
        <h2 className="text-base font-semibold text-foreground">Projeção financeira</h2>
      </div>

      {/* Resultado projetado card */}
      <Card className="overflow-hidden">
        <div className="bg-gradient-to-br from-primary/5 via-background to-background p-8 text-center">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-[hsl(var(--status-bom-bg))] px-3 py-1 mb-4">
            <div className="w-2 h-2 rounded-full bg-[hsl(var(--status-bom))]" />
            <span className="text-xs font-semibold text-[hsl(var(--status-bom))] uppercase tracking-wider">Resultado Projetado</span>
          </div>
          <p className="text-sm text-muted-foreground">Incremento Financeiro Estimado</p>
          <p className="text-4xl font-bold text-[hsl(var(--status-bom))] tracking-tight mt-2">+ R$ 180.000,00</p>
          <p className="text-sm text-muted-foreground mt-1">/ quadrimestre</p>
        </div>
        <div className="flex items-center justify-between px-6 py-3 border-t border-border bg-muted/30">
          <span className="text-sm text-muted-foreground">Variação vs. Atual</span>
          <div className="flex items-center gap-1.5">
            <TrendingUp className="w-4 h-4 text-[hsl(var(--status-bom))]" />
            <span className="text-sm font-semibold text-[hsl(var(--status-bom))]">+12.5%</span>
          </div>
        </div>
      </Card>

      {/* Action buttons */}
      <div className="flex items-center gap-3 justify-end">
        <Button variant="outline" onClick={handleReset} className="gap-2">
          <RotateCcw className="w-4 h-4" />
          Redefinir
        </Button>
        <Button className="gap-2 bg-primary text-primary-foreground hover:bg-primary/90">
          <Download className="w-4 h-4" />
          Baixar em PDF
        </Button>
      </div>

      {/* Painel de Controle de Metas */}
      <Card>
        <CardContent className="p-6 space-y-6">
          <div>
            <h3 className="text-base font-semibold text-foreground">Painel de Controle de Metas</h3>
            <p className="text-sm text-muted-foreground mt-1">
              Ajuste os indicadores abaixo para simular o impacto financeiro no próximo quadrimestre. As projeções são baseadas nos parâmetros atuais do Previne Brasil.
            </p>
          </div>

          <div className="space-y-6">
            {metas.map((meta) => (
              <div key={meta.id} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-foreground">{meta.label}</p>
                    <p className="text-xs text-muted-foreground">{meta.description}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-muted-foreground uppercase tracking-wider">Meta</p>
                    <p className="text-lg font-bold text-primary">{meta.meta}%</p>
                  </div>
                </div>
                <Slider
                  value={[meta.meta]}
                  onValueChange={(value) => handleMetaChange(meta.id, value)}
                  min={0}
                  max={meta.alvoIdeal}
                  step={1}
                  className="w-full"
                />
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>Atual: {meta.atual}%</span>
                  <span>Alvo Ideal: {meta.alvoIdeal}%</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>


      {/* Avisos */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Card>
          <CardContent className="p-4 flex items-start gap-3">
            <Info className="w-5 h-5 text-primary shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-semibold text-foreground">Nota Metodológica</p>
              <p className="text-xs text-muted-foreground mt-1">
                Os cálculos utilizam a portaria vigente do Ministério da Saúde. O delay de processamento do SISAB pode impactar os valores reais em até 5%.
              </p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-[hsl(var(--status-suficiente))] shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-semibold text-foreground">Atenção ao Prazo</p>
              <p className="text-xs text-muted-foreground mt-1">
                O fechamento do quadrimestre atual ocorre em 15 dias. Priorize as metas de Cobertura de Consultas para maximizar o retorno imediato.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
