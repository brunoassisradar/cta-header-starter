import React from 'react';
import { ArrowUpRight, ArrowDownRight, Minus, TrendingUp } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Progress } from '@/components/ui/progress';

interface MetricItem {
  label: string;
  value: number | string;
  suffix?: string;
  type: 'numerator' | 'denominator' | 'result';
}

interface IndicadorConfig {
  title: string;
  metrics: MetricItem[];
  resultLabel: string;
  resultValue: number;
  resultSuffix: string;
  target?: number;
  trend?: 'up' | 'down' | 'neutral';
  trendValue?: string;
}

const indicadorConfigs: Record<string, IndicadorConfig> = {
  b1: {
    title: 'Cobertura da primeira consulta odontológica',
    resultLabel: 'Cobertura da primeira consulta odontológica programada por equipe na eSB na APS',
    resultValue: 42.3,
    resultSuffix: '%',
    target: 60,
    trend: 'up',
    trendValue: '+3.2%',
    metrics: [
      {
        label: 'Quantitativo de procedimentos odontológicos individuais preventivos registrados por eSB na APS',
        value: '1.247',
        type: 'numerator',
      },
      {
        label: 'Pessoas vinculadas à equipe',
        value: '2.948',
        type: 'denominator',
      },
    ],
  },
  b2: {
    title: 'Razão de tratamentos concluídos',
    resultLabel: 'Razão entre tratamentos concluídos por eSB na APS',
    resultValue: 68.5,
    resultSuffix: '%',
    target: 75,
    trend: 'up',
    trendValue: '+5.1%',
    metrics: [
      {
        label: 'Quantitativo de pessoas com tratamento odontológico concluído por eSB na APS',
        value: '856',
        type: 'numerator',
      },
      {
        label: 'Quantitativo de pessoas com primeira consulta odontológica programada na APS',
        value: '1.249',
        type: 'denominator',
      },
    ],
  },
  b3: {
    title: 'Taxa de exodontias',
    resultLabel: 'Taxa de exodontias realizadas por eSB na APS',
    resultValue: 12.8,
    resultSuffix: '%',
    target: 10,
    trend: 'down',
    trendValue: '-1.4%',
    metrics: [
      {
        label: 'Quantitativo de exodontias por eSB na APS',
        value: '312',
        type: 'numerator',
      },
      {
        label: 'Quantitativo de procedimentos clínicos individuais, curativos e exodontias selecionadas',
        value: '2.437',
        type: 'denominator',
      },
    ],
  },
  b4: {
    title: 'Escovação supervisionada em crianças',
    resultLabel: 'Quantitativo de pessoas participantes da ação coletiva de escovação dental supervisionada realizada em crianças entre 6 e 12 anos',
    resultValue: 734,
    resultSuffix: '',
    trend: 'up',
    trendValue: '+12.3%',
    metrics: [
      {
        label: 'Escovação supervisionada por eSB em crianças entre 6 e 12 anos no âmbito da APS',
        value: '734',
        type: 'numerator',
      },
      {
        label: 'Pessoas vinculadas à equipe',
        value: '2.948',
        type: 'denominator',
      },
    ],
  },
  b5: {
    title: 'Procedimentos odontológicos preventivos',
    resultLabel: 'Procedimentos odontológicos preventivos por eSB na APS',
    resultValue: 38.6,
    resultSuffix: '%',
    target: 50,
    trend: 'neutral',
    trendValue: '0.0%',
    metrics: [
      {
        label: 'Quantitativo de procedimentos odontológicos individuais preventivos registrados por eSB na APS',
        value: '1.247',
        type: 'numerator',
      },
      {
        label: 'Quantitativo de procedimentos odontológicos individuais registrados por eSB na APS',
        value: '3.230',
        type: 'denominator',
      },
    ],
  },
  b6: {
    title: 'Tratamento restaurador atraumático',
    resultLabel: 'Tratamentos restauradores atraumáticos (ART) realizados por eSB na APS',
    resultValue: 54.2,
    resultSuffix: '%',
    target: 60,
    trend: 'up',
    trendValue: '+2.8%',
    metrics: [
      {
        label: 'Quantitativo de procedimentos restauradores atraumáticos realizados por cirurgião dentista em eSB na APS',
        value: '489',
        type: 'numerator',
      },
      {
        label: 'Quantitativo de procedimentos restauradores na APS',
        value: '902',
        type: 'denominator',
      },
    ],
  },
};

const TrendIcon: React.FC<{ trend: 'up' | 'down' | 'neutral' }> = ({ trend }) => {
  if (trend === 'up') return <ArrowUpRight className="w-4 h-4" />;
  if (trend === 'down') return <ArrowDownRight className="w-4 h-4" />;
  return <Minus className="w-4 h-4" />;
};

interface EsbIndicadorContentProps {
  indicador: string;
}

export const EsbIndicadorContent: React.FC<EsbIndicadorContentProps> = ({ indicador }) => {
  const config = indicadorConfigs[indicador];

  if (!config) {
    return (
      <div className="text-center text-muted-foreground py-8">
        Indicador não encontrado.
      </div>
    );
  }

  const progressValue = config.target
    ? Math.min((config.resultValue / config.target) * 100, 100)
    : undefined;

  const isInverse = indicador === 'b3'; // For b3, lower is better

  return (
    <div className="space-y-6">
      {/* Result highlight */}
      <div className="rounded-lg border border-border bg-muted/30 p-5">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
          <div className="flex-1 min-w-0 space-y-1">
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
              Resultado
            </p>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {config.resultLabel}
            </p>
          </div>
          <div className="flex items-end gap-3 shrink-0">
            <span className="text-3xl font-bold text-foreground tabular-nums">
              {typeof config.resultValue === 'number'
                ? config.resultValue.toLocaleString('pt-BR', { minimumFractionDigits: config.resultSuffix === '%' ? 1 : 0 })
                : config.resultValue}
              {config.resultSuffix && (
                <span className="text-lg font-semibold text-muted-foreground ml-0.5">
                  {config.resultSuffix}
                </span>
              )}
            </span>
            {config.trend && config.trendValue && (
              <span
                className={cn(
                  'inline-flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-full mb-1',
                  config.trend === 'up' && !isInverse && 'bg-primary/10 text-primary',
                  config.trend === 'up' && isInverse && 'bg-destructive/10 text-destructive',
                  config.trend === 'down' && !isInverse && 'bg-destructive/10 text-destructive',
                  config.trend === 'down' && isInverse && 'bg-primary/10 text-primary',
                  config.trend === 'neutral' && 'bg-muted text-muted-foreground'
                )}
              >
                <TrendIcon trend={config.trend} />
                {config.trendValue}
              </span>
            )}
          </div>
        </div>

        {/* Progress toward target */}
        {config.target && progressValue !== undefined && (
          <div className="mt-4 space-y-2">
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span>Progresso em relação à meta</span>
              <span className="font-medium tabular-nums">
                Meta: {config.target}{config.resultSuffix}
              </span>
            </div>
            <Progress value={progressValue} className="h-2" />
          </div>
        )}
      </div>

      {/* Variables / Composition */}
      <div>
        <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-3">
          Composição do indicador
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {config.metrics.map((metric, idx) => (
            <div
              key={idx}
              className={cn(
                'rounded-lg border border-border p-4 space-y-2 transition-colors',
                metric.type === 'numerator' && 'bg-primary/[0.03]',
                metric.type === 'denominator' && 'bg-muted/40'
              )}
            >
              <div className="flex items-center gap-2">
                <span
                  className={cn(
                    'inline-flex items-center justify-center w-5 h-5 rounded text-[10px] font-bold shrink-0',
                    metric.type === 'numerator'
                      ? 'bg-primary/10 text-primary'
                      : 'bg-muted-foreground/10 text-muted-foreground'
                  )}
                >
                  {metric.type === 'numerator' ? 'N' : 'D'}
                </span>
                <span className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider">
                  {metric.type === 'numerator' ? 'Numerador' : 'Denominador'}
                </span>
              </div>
              <p className="text-2xl font-bold text-foreground tabular-nums">
                {metric.value}
              </p>
              <p className="text-xs text-muted-foreground leading-relaxed">
                {metric.label}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Formula hint */}
      <div className="flex items-start gap-2 rounded-md bg-muted/50 border border-border/50 px-4 py-3">
        <TrendingUp className="w-4 h-4 text-muted-foreground shrink-0 mt-0.5" />
        <p className="text-xs text-muted-foreground leading-relaxed">
          <span className="font-medium">Fórmula:</span>{' '}
          {config.metrics[0] && config.metrics[1] ? (
            <>
              Numerador <span className="text-foreground font-medium">÷</span> Denominador{' '}
              {config.resultSuffix === '%' && (
                <>
                  <span className="text-foreground font-medium">× 100</span>
                </>
              )}
              {' = '}
              <span className="text-foreground font-semibold">
                {config.resultValue.toLocaleString('pt-BR', { minimumFractionDigits: config.resultSuffix === '%' ? 1 : 0 })}
                {config.resultSuffix}
              </span>
            </>
          ) : (
            <span className="text-foreground font-semibold">
              {config.resultValue.toLocaleString('pt-BR')}{config.resultSuffix}
            </span>
          )}
        </p>
      </div>
    </div>
  );
};
