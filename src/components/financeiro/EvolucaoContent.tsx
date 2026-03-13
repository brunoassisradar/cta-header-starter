import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowUpRight, ArrowRight, AlertCircle, TrendingUp } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, Legend } from 'recharts';

const chartData = [
  { month: 'JAN', aps: 38, farmaceutica: 22, vigilancia: 12 },
  { month: 'FEV', aps: 35, farmaceutica: 24, vigilancia: 14 },
  { month: 'MAR', aps: 40, farmaceutica: 28, vigilancia: 11 },
  { month: 'ABR', aps: 42, farmaceutica: 32, vigilancia: 15 },
  { month: 'MAI', aps: 45, farmaceutica: 35, vigilancia: 18 },
  { month: 'JUN', aps: 44, farmaceutica: 38, vigilancia: 20 },
  { month: 'JUL', aps: 48, farmaceutica: 36, vigilancia: 16 },
  { month: 'AGO', aps: 52, farmaceutica: 34, vigilancia: 22 },
  { month: 'SET', aps: 55, farmaceutica: 30, vigilancia: 25 },
  { month: 'OUT', aps: 58, farmaceutica: 32, vigilancia: 24 },
  { month: 'NOV', aps: 60, farmaceutica: 35, vigilancia: 22 },
  { month: 'DEZ', aps: 62, farmaceutica: 38, vigilancia: 20 },
];

export const EvolucaoContent: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      {/* Section header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary/10">
            <TrendingUp className="w-4 h-4 text-primary" />
          </span>
          <h2 className="text-base font-semibold text-foreground">Evolução de entradas FNS</h2>
        </div>
        <button
          onClick={() => navigate('/financeiro/relatorio')}
          className="text-sm font-medium text-primary hover:underline flex items-center gap-1"
        >
          Ver relatório <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Receita total */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Receita Total Acumulada (Jan - Dez)</p>
              <p className="text-3xl font-bold text-foreground tracking-tight mt-1">R$ 507.249.854,30</p>
            </div>
            <div className="flex items-center gap-1.5 rounded-full bg-[hsl(var(--status-bom-bg))] px-3 py-1.5">
              <ArrowUpRight className="w-4 h-4 text-[hsl(var(--status-bom))]" />
              <span className="text-sm font-semibold text-[hsl(var(--status-bom))]">+12.5% vs 2024</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Chart */}
      <Card>
        <CardContent className="p-6">
          <div className="mb-4">
            <h3 className="text-base font-semibold text-foreground">Evolução de Financiamento por Bloco</h3>
            <p className="text-sm text-muted-foreground">Comparativo dos 12 meses (R$ Milhões)</p>
          </div>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData} margin={{ top: 5, right: 10, left: -10, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis
                  dataKey="month"
                  tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }}
                  axisLine={{ stroke: 'hsl(var(--border))' }}
                  tickLine={false}
                />
                <YAxis
                  tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }}
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px',
                    fontSize: '13px',
                  }}
                />
                <Legend
                  wrapperStyle={{ fontSize: '13px' }}
                />
                <Line
                  type="monotone"
                  dataKey="aps"
                  name="APS"
                  stroke="hsl(var(--primary))"
                  strokeWidth={2.5}
                  dot={{ r: 0 }}
                  activeDot={{ r: 5, fill: 'hsl(var(--primary))' }}
                />
                <Line
                  type="monotone"
                  dataKey="farmaceutica"
                  name="Farmacêutica"
                  stroke="hsl(var(--status-bom))"
                  strokeWidth={2}
                  dot={{ r: 0 }}
                  activeDot={{ r: 4, fill: 'hsl(var(--status-bom))' }}
                />
                <Line
                  type="monotone"
                  dataKey="vigilancia"
                  name="Vigilância"
                  stroke="hsl(var(--status-suficiente))"
                  strokeWidth={2}
                  dot={{ r: 0 }}
                  activeDot={{ r: 4, fill: 'hsl(var(--status-suficiente))' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Ações sugeridas */}
      <Card>
        <CardContent className="p-5">
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-3">Ações sugeridas</p>
          <div className="flex items-start gap-3 p-3 rounded-lg bg-[hsl(var(--status-regular-bg))]">
            <AlertCircle className="w-5 h-5 text-[hsl(var(--status-regular))] shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-foreground">Verificar status FNS do Bloco Farmacêutico</p>
              <p className="text-xs text-muted-foreground mt-0.5">
                Impossível localizar e exibir informação de repasse. Entre em contato com o suporte ou verifique o portal do FNS.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
