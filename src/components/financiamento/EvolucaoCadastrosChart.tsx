import React from 'react';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, LabelList, Cell } from 'recharts';
import { HelpCircle } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface MonthData {
  month: string;
  cadastroAtualizado: number;
  acompanhadas: number;
  variacaoCadastro: number;
  variacaoAcompanhamento: number;
}

const chartData: MonthData[] = [
  { month: 'Outubro de 2025', cadastroAtualizado: 96053, acompanhadas: 73542, variacaoCadastro: 8.27, variacaoAcompanhamento: 37.64 },
  { month: 'Novembro de 2025', cadastroAtualizado: 98700, acompanhadas: 77764, variacaoCadastro: 2.76, variacaoAcompanhamento: 5.74 },
  { month: 'Dezembro de 2025', cadastroAtualizado: 101202, acompanhadas: 80811, variacaoCadastro: 2.53, variacaoAcompanhamento: 3.92 },
  { month: 'Janeiro de 2026', cadastroAtualizado: 100150, acompanhadas: 78743, variacaoCadastro: -1.04, variacaoAcompanhamento: -2.56 },
  { month: 'Fevereiro de 2026', cadastroAtualizado: 102801, acompanhadas: 47361, variacaoCadastro: 2.65, variacaoAcompanhamento: -39.85 },
];

const formatNumber = (value: number) => value.toLocaleString('pt-BR');

const VariationLabel: React.FC<{ value: number }> = ({ value }) => {
  const isPositive = value >= 0;
  const color = isPositive ? '#16A34A' : '#DC2626';
  const prefix = isPositive ? '+' : '';
  return (
    <tspan fill={color} fontSize={11} fontWeight={600}>
      {prefix}{value.toFixed(2)}
    </tspan>
  );
};

// Custom label component for variation + value
const CustomBarLabel: React.FC<any> = (props) => {
  const { x, y, width, value, index, dataKey } = props;
  if (value === undefined || value === null) return null;

  const data = chartData[index];
  const variation = dataKey === 'cadastroAtualizado' ? data.variacaoCadastro : data.variacaoAcompanhamento;
  const isPositive = variation >= 0;
  const variationColor = isPositive ? '#16A34A' : '#DC2626';
  const prefix = isPositive ? '+' : '';

  return (
    <g>
      <text x={x + width / 2} y={y - 20} textAnchor="middle" fontSize={11} fontWeight={600} fill={variationColor}>
        {prefix}{variation.toFixed(2)}
      </text>
      <text x={x + width / 2} y={y - 6} textAnchor="middle" fontSize={11} fontWeight={500} fill="hsl(var(--foreground))">
        {formatNumber(value)}
      </text>
    </g>
  );
};

export const EvolucaoCadastrosChart: React.FC = () => {
  return (
    <div className="bg-card rounded-lg shadow-sm p-6">
      <div className="flex items-center gap-2 mb-4">
        <h3 className="text-base font-semibold text-foreground">Evolução de cadastros e acompanhamentos realizados</h3>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <HelpCircle className="h-4 w-4 text-muted-foreground" />
            </TooltipTrigger>
            <TooltipContent>
              <p>Evolução mensal dos cadastros atualizados e acompanhamentos realizados</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-6 mb-6">
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full" style={{ backgroundColor: '#60A5FA' }} />
          <span className="text-sm text-muted-foreground">Pessoas com cadastro atualizado</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full" style={{ backgroundColor: '#1E40AF' }} />
          <span className="text-sm text-muted-foreground">Pessoas Acompanhadas</span>
        </div>
      </div>

      {/* Chart */}
      <div className="w-full h-[350px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={chartData}
            margin={{ top: 40, right: 20, left: 20, bottom: 20 }}
            barCategoryGap="20%"
            barGap={4}
          >
            <XAxis
              dataKey="month"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))' }}
              tickFormatter={formatNumber}
              domain={[0, 'auto']}
            />
            <Bar
              dataKey="cadastroAtualizado"
              fill="#60A5FA"
              radius={[4, 4, 0, 0]}
              maxBarSize={60}
            >
              <LabelList content={<CustomBarLabel dataKey="cadastroAtualizado" />} />
            </Bar>
            <Bar
              dataKey="acompanhadas"
              fill="#1E40AF"
              radius={[4, 4, 0, 0]}
              maxBarSize={60}
            >
              <LabelList content={<CustomBarLabel dataKey="acompanhadas" />} />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
