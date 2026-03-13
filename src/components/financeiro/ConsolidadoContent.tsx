import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { FinanceiroFilterBar } from './FinanceiroFilterBar';
import { ArrowUpRight, ArrowDownRight, TrendingUp, Building2, AlertTriangle, XCircle, Sparkles, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';

const entradaCards = [
  {
    label: 'TOTAL RECEBIDO FNS',
    value: 'R$ 3.450.000,00',
    trend: '+4.5%',
    trendUp: true,
    trendLabel: 'vs. mês anterior',
    icon: Building2,
    variant: 'default' as const,
    miniChart: [40, 55, 48, 62, 58, 70, 85],
  },
  {
    label: 'REPASSADO ÀS EQUIPES',
    value: 'R$ 2.800.000,00',
    detail: '100 Equipes contempladas',
    subDetail: '82% do total recebido aplicado',
    icon: TrendingUp,
    variant: 'default' as const,
  },
  {
    label: 'RETIDO (PENDÊNCIA ADM.)',
    value: 'R$ 150.000,00',
    detail: 'Principalmente problemas de homologação.',
    linkLabel: 'Ver detalhes →',
    icon: AlertTriangle,
    variant: 'warning' as const,
  },
  {
    label: 'PERDIDO (DESEMPENHO)',
    value: 'R$ 500.000,00',
    detail: 'Recurso não repassado por metas não atingidas.',
    linkLabel: 'Analisar indicadores →',
    icon: XCircle,
    variant: 'danger' as const,
  },
];

const investimentoItems = [
  { label: 'Incentivo Financeiro da APS – Equipes Multiprofissionais – EMULTI', value: 'R$ 2.1M', pct: 100 },
  { label: 'Incentivo Financeiro da APS – Atenção à Saúde Bucal', value: 'R$ 1.2M', pct: 57 },
  { label: 'Incentivo Financeiro da APS – Atenção à Saúde Bucal', value: 'R$ 0.95M', pct: 45 },
];

const custeioItems = [
  { label: 'Incentivo Financeiro da APS – Atenção à Saúde Bucal', value: 'R$ 1.1M', pct: 100 },
  { label: 'Incentivo Financeiro da APS – Atenção à Saúde Bucal', value: 'R$ 450k', pct: 41 },
  { label: 'Incentivo Financeiro da APS – Demais Programas', value: 'R$ 290k', pct: 26 },
  { label: 'Serviços e Equipes da Atenção Primária à Saúde', value: 'R$ 180k', pct: 16 },
];

export const ConsolidadoContent: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      <FinanceiroFilterBar />

      {/* Simulador de Metas mini-banner */}
      <Card className="overflow-hidden">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center gap-3">
            <span className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10">
              <Sparkles className="w-5 h-5 text-primary" />
            </span>
            <div>
              <p className="text-sm font-semibold text-foreground">Simulador de Metas e Impacto</p>
              <button
                onClick={() => navigate('/financeiro/visao-geral?tab=simulador')}
                className="text-xs font-medium text-primary hover:underline"
              >
                Acessar Simulador →
              </button>
            </div>
          </div>

          <div className="hidden sm:flex items-center gap-8">
            <div className="text-center">
              <p className="text-xs text-muted-foreground uppercase tracking-wider">Meta Global</p>
              <p className="text-xl font-bold text-foreground">78%</p>
            </div>
            <div className="text-center">
              <p className="text-xs text-muted-foreground uppercase tracking-wider">Potencial de Incremento</p>
              <p className="text-xl font-bold text-status-bom">+ R$ 180.000,00</p>
            </div>
          </div>

          <div className="hidden lg:flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm text-muted-foreground">
            <Building2 className="w-4 h-4" />
            Potencial para +4 novas equipes eSF
          </div>
        </div>
      </Card>

      {/* Entrada section */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary/10">
            <Building2 className="w-4 h-4 text-primary" />
          </span>
          <h2 className="text-base font-semibold text-foreground">Entrada</h2>
        </div>
        <button
          onClick={() => navigate('/financeiro/relatorio')}
          className="text-sm font-medium text-primary hover:underline flex items-center gap-1"
        >
          Ver relatório <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {entradaCards.map((card) => {
          const borderClass = card.variant === 'warning'
            ? 'border-l-4 border-l-[hsl(var(--status-suficiente))]'
            : card.variant === 'danger'
              ? 'border-l-4 border-l-[hsl(var(--status-regular))]'
              : '';

          return (
            <Card key={card.label} className={cn('overflow-hidden', borderClass)}>
              <CardContent className="p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">{card.label}</p>
                  <card.icon className={cn(
                    'w-4 h-4',
                    card.variant === 'warning' ? 'text-[hsl(var(--status-suficiente))]' :
                    card.variant === 'danger' ? 'text-[hsl(var(--status-regular))]' :
                    'text-muted-foreground'
                  )} />
                </div>
                <p className={cn(
                  'text-2xl font-bold tracking-tight',
                  card.variant === 'warning' ? 'text-[hsl(var(--status-suficiente))]' :
                  card.variant === 'danger' ? 'text-[hsl(var(--status-regular))]' :
                  'text-foreground'
                )}>
                  {card.value}
                </p>

                {card.trend && (
                  <div className="flex items-center gap-1.5">
                    {card.trendUp ? (
                      <ArrowUpRight className="w-3.5 h-3.5 text-[hsl(var(--status-bom))]" />
                    ) : (
                      <ArrowDownRight className="w-3.5 h-3.5 text-[hsl(var(--status-regular))]" />
                    )}
                    <span className={cn(
                      'text-xs font-medium',
                      card.trendUp ? 'text-[hsl(var(--status-bom))]' : 'text-[hsl(var(--status-regular))]'
                    )}>
                      {card.trend}
                    </span>
                    <span className="text-xs text-muted-foreground">{card.trendLabel}</span>
                  </div>
                )}

                {card.miniChart && (
                  <div className="flex items-end gap-1 h-6">
                    {card.miniChart.map((v, i) => (
                      <div
                        key={i}
                        className="flex-1 rounded-sm bg-primary/20"
                        style={{ height: `${(v / 100) * 100}%` }}
                      />
                    ))}
                  </div>
                )}

                {card.detail && (
                  <p className="text-xs text-muted-foreground">{card.detail}</p>
                )}
                {card.subDetail && (
                  <p className="text-xs text-muted-foreground">{card.subDetail}</p>
                )}
                {card.linkLabel && (
                  <button className="text-xs font-medium text-primary hover:underline">
                    {card.linkLabel}
                  </button>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Grupos de receita */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary/10">
            <TrendingUp className="w-4 h-4 text-primary" />
          </span>
          <h2 className="text-base font-semibold text-foreground">Grupos de receita entrada para gastos em saúde</h2>
        </div>
        <button
          onClick={() => navigate('/financeiro/relatorio')}
          className="text-sm font-medium text-primary hover:underline flex items-center gap-1"
        >
          Ver relatório <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Investimento */}
      <Card>
        <CardContent className="p-6 space-y-5">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <ArrowUpRight className="w-4 h-4 text-[hsl(var(--status-bom))]" />
                <span className="text-xs font-medium text-[hsl(var(--status-bom))]">+12.5% vs período anterior</span>
              </div>
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">TOTAL INVESTIMENTO PELO FNS</p>
              <p className="text-3xl font-bold text-foreground tracking-tight mt-1">R$ 4.250.000,00</p>
            </div>
            <span className="rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-xs font-semibold text-primary uppercase">
              Investimento
            </span>
          </div>

          <div className="space-y-4">
            {investimentoItems.map((item) => (
              <div key={item.label} className="space-y-1.5">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-foreground">{item.label}</span>
                  <span className="font-medium text-foreground tabular-nums">{item.value}</span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full bg-primary transition-all duration-700"
                    style={{ width: `${item.pct}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          <button className="w-full py-2.5 text-sm font-medium text-muted-foreground hover:text-foreground border border-border rounded-lg transition-colors">
            Ver Detalhes Completos
          </button>
        </CardContent>
      </Card>

      {/* Custeio */}
      <Card>
        <CardContent className="p-6 space-y-5">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <ArrowDownRight className="w-4 h-4 text-[hsl(var(--status-regular))]" />
                <span className="text-xs font-medium text-[hsl(var(--status-regular))]">-4.2% vs período anterior</span>
              </div>
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">TOTAL CUSTEIO PELO FNS</p>
              <p className="text-3xl font-bold text-foreground tracking-tight mt-1">R$ 1.840.500,00</p>
            </div>
            <span className="rounded-full border border-border bg-muted/50 px-3 py-1 text-xs font-semibold text-muted-foreground uppercase">
              Custeio
            </span>
          </div>

          <div className="space-y-4">
            {custeioItems.map((item) => (
              <div key={item.label} className="space-y-1.5">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-foreground">{item.label}</span>
                  <span className="font-medium text-foreground tabular-nums">{item.value}</span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full bg-primary/60 transition-all duration-700"
                    style={{ width: `${item.pct}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          <button className="w-full py-2.5 text-sm font-medium text-muted-foreground hover:text-foreground border border-border rounded-lg transition-colors">
            Ver Detalhes Completos
          </button>
        </CardContent>
      </Card>
    </div>
  );
};
