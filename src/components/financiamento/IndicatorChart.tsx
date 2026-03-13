import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, LabelList, TooltipProps } from 'recharts';
import { Info } from 'lucide-react';
import { Tooltip } from 'antd';

interface IndicatorChartData {
  equipe: string;
  equipeName: string;
  tooltipText: string;
  // Grupo 1: Boa prática
  cumprioBoaPratica: number;
  naoCumpriuBoaPratica: number;
  // Grupo 2: Cadastro
  cumprioECadastroOk: number;
  cumprioComPendencia: number;
}

interface KpiConfig {
  label: string;
  value: number;
}

interface IndicatorChartProps {
  data?: IndicatorChartData[];
  selectedIndicador?: string;
  kpiValues?: {
    primary?: number;
    secondary?: number;
  };
}

const getKpiConfig = (indicador: string, values: { primary?: number; secondary?: number }): KpiConfig[] => {
  const primary = values.primary ?? 0;
  const secondary = values.secondary ?? 0;

  switch (indicador) {
    case 'c1':
      return [
        { label: 'Demandas programadas', value: primary },
        { label: 'Demandas espontâneas', value: secondary },
      ];
    case 'c2':
      return [{ label: 'Total de crianças', value: primary }];
    case 'c3':
      return [{ label: 'Total de gestantes que concluíram o puerpério', value: primary }];
    case 'c4':
      return [{ label: 'Total de pessoas com Diabetes', value: primary }];
    case 'c5':
      return [{ label: 'Total de pessoas com Hipertensão', value: primary }];
    case 'c6':
      return [{ label: 'Total de pessoas idosas', value: primary }];
    case 'c7':
      return [{ label: 'Total de mulheres', value: primary }];
    default:
      return [{ label: 'Total', value: primary }];
  }
};

const defaultData: IndicatorChartData[] = [
  { equipe: 'A', equipeName: 'Equipe A', tooltipText: 'Equipe A - UBS Centro', cumprioBoaPratica: 45, naoCumpriuBoaPratica: 55, cumprioECadastroOk: 60, cumprioComPendencia: 40 },
  { equipe: 'B', equipeName: 'Equipe B', tooltipText: 'Equipe B - UBS Norte', cumprioBoaPratica: 50, naoCumpriuBoaPratica: 50, cumprioECadastroOk: 70, cumprioComPendencia: 30 },
  { equipe: 'C', equipeName: 'Equipe C', tooltipText: 'Equipe C - UBS Sul', cumprioBoaPratica: 40, naoCumpriuBoaPratica: 60, cumprioECadastroOk: 55, cumprioComPendencia: 45 },
  { equipe: 'D', equipeName: 'Equipe D', tooltipText: 'Equipe D - UBS Leste', cumprioBoaPratica: 55, naoCumpriuBoaPratica: 45, cumprioECadastroOk: 65, cumprioComPendencia: 35 },
  { equipe: 'E', equipeName: 'Equipe E', tooltipText: 'Equipe E - UBS Oeste', cumprioBoaPratica: 35, naoCumpriuBoaPratica: 65, cumprioECadastroOk: 50, cumprioComPendencia: 50 },
  { equipe: 'F', equipeName: 'Equipe F', tooltipText: 'Equipe F - UBS Central', cumprioBoaPratica: 60, naoCumpriuBoaPratica: 40, cumprioECadastroOk: 75, cumprioComPendencia: 25 },
  { equipe: 'G', equipeName: 'Equipe G', tooltipText: 'Equipe G - UBS Vila Nova', cumprioBoaPratica: 48, naoCumpriuBoaPratica: 52, cumprioECadastroOk: 62, cumprioComPendencia: 38 },
  { equipe: 'H', equipeName: 'Equipe H', tooltipText: 'Equipe H - UBS Jardim', cumprioBoaPratica: 52, naoCumpriuBoaPratica: 48, cumprioECadastroOk: 68, cumprioComPendencia: 32 },
  { equipe: 'I', equipeName: 'Equipe I', tooltipText: 'Equipe I - UBS Parque', cumprioBoaPratica: 42, naoCumpriuBoaPratica: 58, cumprioECadastroOk: 58, cumprioComPendencia: 42 },
  { equipe: 'J', equipeName: 'Equipe J', tooltipText: 'Equipe J - UBS Industrial', cumprioBoaPratica: 30, naoCumpriuBoaPratica: 70, cumprioECadastroOk: 45, cumprioComPendencia: 55 },
  { equipe: 'K', equipeName: 'Equipe K', tooltipText: 'Equipe K - UBS Rural', cumprioBoaPratica: 38, naoCumpriuBoaPratica: 62, cumprioECadastroOk: 52, cumprioComPendencia: 48 },
];

// Interface para dados normalizados (100%)
interface NormalizedChartData extends IndicatorChartData {
  // Grupo 1 normalizado (%)
  cumprioECadastroOk_pct: number;
  cumprioBoaPratica_pct: number;
  // Grupo 2 normalizado (%)
  naoCumpriuBoaPratica_pct: number;
  cumprioComPendencia_pct: number;
  // Valores brutos para labels
  cumprioECadastroOk_raw: number;
  cumprioBoaPratica_raw: number;
  naoCumpriuBoaPratica_raw: number;
  cumprioComPendencia_raw: number;
}

// Normaliza os dados para 100% (todos os 4 segmentos somam 100%)
const normalizeData = (data: IndicatorChartData[]): NormalizedChartData[] => {
  return data.map(item => {
    // Total de todos os 4 segmentos
    const total = item.cumprioECadastroOk + item.cumprioBoaPratica + item.naoCumpriuBoaPratica + item.cumprioComPendencia;
    
    return {
      ...item,
      cumprioECadastroOk_pct: total > 0 ? (item.cumprioECadastroOk / total) * 100 : 0,
      cumprioBoaPratica_pct: total > 0 ? (item.cumprioBoaPratica / total) * 100 : 0,
      naoCumpriuBoaPratica_pct: total > 0 ? (item.naoCumpriuBoaPratica / total) * 100 : 0,
      cumprioComPendencia_pct: total > 0 ? (item.cumprioComPendencia / total) * 100 : 0,
      // Valores brutos para os labels
      cumprioECadastroOk_raw: item.cumprioECadastroOk,
      cumprioBoaPratica_raw: item.cumprioBoaPratica,
      naoCumpriuBoaPratica_raw: item.naoCumpriuBoaPratica,
      cumprioComPendencia_raw: item.cumprioComPendencia,
    };
  });
};

// Cores para os 4 segmentos (seguindo as cores semânticas do projeto)
const chartColors = {
  cumprioContabiliza: '#0064FF',     // Azul - Ótimo
  cumprioNaoContabiliza: '#C4C4CC',  // Cinza claro - Bom
  naoCumpriuCadastroOk: '#7A7A85',   // Cinza médio - Suficiente
  naoCumpriuPendencia: '#5C5C66',    // Cinza escuro - Regular
};

const legendLabels: Record<string, string> = {
  cumprioContabiliza: 'Cumpriu boa prática e contabiliza para o financiamento',
  cumprioNaoContabiliza: 'Cumpriu boa prática mas cadastro desatualizado',
  naoCumpriuCadastroOk: 'Não cumpriu e cadastro atualizado',
  naoCumpriuPendencia: 'Não cumpriu e cadastro desatualizado',
};

// Tipo do tooltip do Recharts
interface CustomTooltipPayload {
  dataKey: string;
  value: number;
  color: string;
  payload: IndicatorChartData;
}

// Tooltip customizado
const CustomTooltip: React.FC<TooltipProps<number, string>> = ({ active, payload }) => {
  if (!active || !payload || payload.length === 0) return null;
  
  const data = payload[0]?.payload as NormalizedChartData;
  
  const getLabel = (dataKey: string): string => {
    switch (dataKey) {
      case 'cumprioECadastroOk_pct': return legendLabels.cumprioContabiliza;
      case 'cumprioBoaPratica_pct': return legendLabels.cumprioNaoContabiliza;
      case 'naoCumpriuBoaPratica_pct': return legendLabels.naoCumpriuCadastroOk;
      case 'cumprioComPendencia_pct': return legendLabels.naoCumpriuPendencia;
      default: return dataKey;
    }
  };
  
  return (
    <div className="bg-card border border-border rounded-lg px-4 py-3 shadow-xl">
      <p className="text-xs font-medium text-muted-foreground mb-2">
        {data?.equipeName}
      </p>
      {payload.map((entry, index) => {
        const typedEntry = entry as unknown as CustomTooltipPayload;
        return (
          <div key={index} className="flex items-center gap-2 mb-1">
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: typedEntry.color }} />
            <span className="text-sm text-foreground">
              {getLabel(typedEntry.dataKey)}: {typedEntry.value.toFixed(1)}%
            </span>
          </div>
        );
      })}
    </div>
  );
};

// Custom tick para o eixo X com letra da equipe + ícone info
interface CustomTickProps {
  x?: number;
  y?: number;
  payload?: { value: string };
  data: IndicatorChartData[];
}

const CustomXAxisTick: React.FC<CustomTickProps> = ({ x = 0, y = 0, payload, data }) => {
  const equipe = payload?.value || '';
  const item = data.find(d => d.equipe === equipe);
  
  return (
    <g transform={`translate(${x},${y})`}>
      <text
        x={0}
        y={16}
        textAnchor="middle"
        fill="hsl(220, 9%, 46%)"
        style={{ fontSize: 12, fontFamily: 'Inter, sans-serif' }}
      >
        {equipe}
      </text>
      <foreignObject x={-8} y={22} width={16} height={16}>
        <Tooltip title={item?.tooltipText || `Equipe ${equipe}`} placement="bottom">
          <div className="flex items-center justify-center cursor-pointer">
            <Info className="h-3.5 w-3.5 text-muted-foreground hover:text-primary transition-colors" />
          </div>
        </Tooltip>
      </foreignObject>
    </g>
  );
};

// Renderizador de label para LabelList - recebe value diretamente do dataKey _raw
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const renderSegmentLabel = (props: any) => {
  const { x = 0, y = 0, width = 0, height = 0, value } = props;
  
  // Sempre mostra o valor (usa 70 como fallback para debug se value for undefined)
  const displayValue = value !== undefined && value !== null ? Math.round(value) : 70;
  
  // Não renderiza se o segmento for muito pequeno
  if (height < 14) return null;
  
  return (
    <text
      x={x + width / 2}
      y={y + height / 2}
      fill="#FFFFFF"
      textAnchor="middle"
      dominantBaseline="middle"
      style={{ 
        fontSize: 11, 
        fontWeight: 600, 
        fontFamily: 'Inter, sans-serif',
        paintOrder: 'stroke',
        stroke: 'rgba(0,0,0,0.2)',
        strokeWidth: 2,
      }}
    >
      {displayValue}
    </text>
  );
};

// ==================== BULLET CHART FOR C1 ====================

interface BulletChartData {
  name: string;
  value: number;
  idealMin: number;
  idealMax: number;
  color: string;
}

const C1BulletChart: React.FC<{ kpis: KpiConfig[] }> = ({ kpis }) => {
  const programadas = kpis.find(k => k.label === 'Demandas programadas')?.value ?? 0;
  const espontaneas = kpis.find(k => k.label === 'Demandas espontâneas')?.value ?? 0;
  const total = programadas + espontaneas;
  
  const programadasPct = total > 0 ? (programadas / total) * 100 : 0;
  const espontaneasPct = total > 0 ? (espontaneas / total) * 100 : 0;
  
  const bulletData: BulletChartData[] = [
    { 
      name: 'Demandas programadas', 
      value: programadasPct, 
      idealMin: 65, 
      idealMax: 75, 
      color: '#0064FF' 
    },
    { 
      name: 'Demandas espontâneas', 
      value: espontaneasPct, 
      idealMin: 25, 
      idealMax: 35, 
      color: '#7A7A85' 
    },
  ];

  return (
    <div className="space-y-6">
      {/* Legend */}
      <div className="flex flex-wrap items-center gap-x-6 gap-y-2 px-1">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#0064FF' }} />
          <span className="text-sm text-muted-foreground">Demandas programadas (ideal: 70%)</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#7A7A85' }} />
          <span className="text-sm text-muted-foreground">Demandas espontâneas (ideal: 30%)</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-8 h-3 rounded" style={{ backgroundColor: 'hsl(142, 76%, 90%)' }} />
          <span className="text-sm text-muted-foreground">Faixa ideal</span>
        </div>
      </div>

      {/* Bullet Charts */}
      <div className="space-y-8 px-1">
        {bulletData.map((item) => (
          <div key={item.name} className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-foreground">{item.name}</span>
              <span className="text-lg font-bold text-foreground">{item.value.toFixed(1)}%</span>
            </div>
            
            <div className="relative h-10 rounded-lg bg-muted/50 overflow-hidden">
              {/* Faixa ideal (background) */}
              <div 
                className="absolute top-0 h-full rounded"
                style={{ 
                  left: `${item.idealMin}%`, 
                  width: `${item.idealMax - item.idealMin}%`,
                  backgroundColor: 'hsl(142, 76%, 90%)',
                }}
              />
              
              {/* Linha do ideal central */}
              <div 
                className="absolute top-0 h-full w-0.5"
                style={{ 
                  left: item.name === 'Demandas programadas' ? '70%' : '30%',
                  backgroundColor: 'hsl(142, 76%, 36%)',
                }}
              />
              
              {/* Barra de valor atual */}
              <div 
                className="absolute top-2 h-6 rounded transition-all duration-500"
                style={{ 
                  width: `${Math.min(item.value, 100)}%`,
                  backgroundColor: item.color,
                }}
              />
              
              {/* Marcador do valor */}
              <div 
                className="absolute top-1 h-8 w-1 rounded-full bg-foreground shadow-lg"
                style={{ 
                  left: `${Math.min(item.value, 100)}%`,
                  transform: 'translateX(-50%)',
                }}
              />
            </div>
            
            {/* Scale */}
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>0%</span>
              <span>25%</span>
              <span>50%</span>
              <span>75%</span>
              <span>100%</span>
            </div>
          </div>
        ))}
      </div>

      {/* Status indicator */}
      <div className="rounded-lg border border-border bg-muted/30 p-4">
        <div className="flex items-start gap-3">
          <div className={`w-3 h-3 rounded-full mt-0.5 ${
            programadasPct >= 65 && programadasPct <= 75 
              ? 'bg-green-500' 
              : programadasPct >= 60 && programadasPct <= 80 
                ? 'bg-yellow-500' 
                : 'bg-red-500'
          }`} />
          <div>
            <p className="text-sm font-medium text-foreground">
              {programadasPct >= 65 && programadasPct <= 75 
                ? 'Distribuição ideal atingida' 
                : programadasPct >= 60 && programadasPct <= 80 
                  ? 'Distribuição próxima do ideal' 
                  : 'Distribuição fora do ideal'}
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              A proporção ideal é de aproximadamente 70% de demandas programadas e 30% de demandas espontâneas.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

// ==================== MAIN COMPONENT ====================

export const IndicatorChart: React.FC<IndicatorChartProps> = ({
  data = defaultData,
  selectedIndicador = 'c3',
  kpiValues = { primary: 50, secondary: 40 },
}) => {
  const kpis = getKpiConfig(selectedIndicador, kpiValues);
  const normalizedData = normalizeData(data);

  // Render Bullet Chart for C1
  if (selectedIndicador === 'c1') {
    return (
      <div className="space-y-6">
        {/* Bullet Chart */}
        <C1BulletChart kpis={kpis} />
      </div>
    );
  }

  // Default stacked bar chart for other indicators
  return (
    <div className="space-y-6">
      {/* KPIs dinâmicos baseados no indicador */}
      <div className={`grid gap-4 ${kpis.length === 2 ? 'grid-cols-1 sm:grid-cols-2' : 'grid-cols-1'}`}>
        {kpis.map((kpi, index) => (
          <div 
            key={kpi.label}
            className={`rounded-xl border border-primary/20 p-4 ${
              index === 0 
                ? 'bg-gradient-to-br from-primary/10 to-primary/5' 
                : 'bg-gradient-to-br from-accent to-accent/50'
            }`}
          >
            <div>
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">{kpi.label}</p>
              <p className="text-2xl font-bold text-foreground">{kpi.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Legenda do gráfico */}
      <div className="flex flex-wrap items-center gap-x-6 gap-y-2 px-1">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: chartColors.cumprioContabiliza }} />
          <span className="text-sm text-muted-foreground">{legendLabels.cumprioContabiliza}</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: chartColors.cumprioNaoContabiliza }} />
          <span className="text-sm text-muted-foreground">{legendLabels.cumprioNaoContabiliza}</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: chartColors.naoCumpriuCadastroOk }} />
          <span className="text-sm text-muted-foreground">{legendLabels.naoCumpriuCadastroOk}</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: chartColors.naoCumpriuPendencia }} />
          <span className="text-sm text-muted-foreground">{legendLabels.naoCumpriuPendencia}</span>
        </div>
      </div>

      {/* Gráfico de barras agrupadas + empilhadas 100% com Recharts */}
      <div className="h-[360px] rounded-lg bg-muted/30 px-1">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={normalizedData}
            margin={{ top: 20, right: 10, bottom: 50, left: 30 }}
            barGap={2}
            barCategoryGap="18%"
          >
            <CartesianGrid 
              strokeDasharray="4 4" 
              stroke="hsl(220, 13%, 91%)" 
              vertical={false}
            />
            <XAxis 
              dataKey="equipe" 
              axisLine={false}
              tickLine={false}
              tick={(props) => <CustomXAxisTick {...props} data={data} />}
              interval={0}
            />
            <YAxis 
              domain={[0, 100]}
              tickFormatter={(value) => `${value}%`}
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: 'hsl(220, 9%, 46%)' }}
              ticks={[0, 20, 40, 60, 80, 100]}
            />
            <RechartsTooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(0, 0, 0, 0.05)' }} />
            
            {/* Barra única com 4 segmentos empilhados */}
            <Bar 
              dataKey="cumprioECadastroOk_pct" 
              stackId="unico" 
              fill={chartColors.cumprioContabiliza}
            >
              <LabelList dataKey="cumprioECadastroOk_raw" content={renderSegmentLabel} />
            </Bar>
            <Bar 
              dataKey="cumprioBoaPratica_pct" 
              stackId="unico" 
              fill={chartColors.cumprioNaoContabiliza}
            >
              <LabelList dataKey="cumprioBoaPratica_raw" content={renderSegmentLabel} />
            </Bar>
            <Bar 
              dataKey="naoCumpriuBoaPratica_pct" 
              stackId="unico" 
              fill={chartColors.naoCumpriuCadastroOk}
            >
              <LabelList dataKey="naoCumpriuBoaPratica_raw" content={renderSegmentLabel} />
            </Bar>
            <Bar 
              dataKey="cumprioComPendencia_pct" 
              stackId="unico" 
              fill={chartColors.naoCumpriuPendencia}
            >
              <LabelList dataKey="cumprioComPendencia_raw" content={renderSegmentLabel} />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
