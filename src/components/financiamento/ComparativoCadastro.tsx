import React from 'react';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, ReferenceLine, Cell, LabelList } from 'recharts';

interface ComparativoCadastroProps {
  municipio?: string;
  pessoasCadastradas?: number;
  pessoasCadastroAtualizado?: number;
  pessoasAcompanhadas?: number;
  populacaoIBGE?: number;
  populacaoLimite?: number;
}

export const ComparativoCadastro: React.FC<ComparativoCadastroProps> = ({
  municipio = 'Lorem ipsum*',
  pessoasCadastradas = 2339333,
  pessoasCadastroAtualizado = 1500703,
  pessoasAcompanhadas = 825242,
  populacaoIBGE = 2800000,
  populacaoLimite = 3200000,
}) => {
  const data = [
    { name: 'Pessoas cadastradas', value: pessoasCadastradas, color: '#A8D5E5' },
    { name: 'Pessoas com cadastro atualizado', value: pessoasCadastroAtualizado, color: '#3B82F6' },
    { name: 'Pessoas acompanhadas', value: pessoasAcompanhadas, color: '#1E40AF' },
  ];

  const maxValue = Math.max(pessoasCadastradas, populacaoLimite) * 1.1;

  const formatNumber = (value: number) => {
    return value.toLocaleString('pt-BR');
  };

  return (
    <div className="bg-card rounded-lg shadow-sm p-6">
      <div className="mb-4">
        <h3 className="text-base font-semibold text-foreground">Comparativo de pessoas cadastradas e acompanhadas</h3>
        <p className="text-sm text-muted-foreground mt-1">
          Clique para visualizar os cidadãos cadastrados, com o cadastro atualizado e acompanhados.
        </p>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-4 mb-6">
        {data.map((item) => (
          <div key={item.name} className="flex items-center gap-2">
            <span 
              className="w-3 h-3 rounded-full" 
              style={{ backgroundColor: item.color }}
            />
            <span className="text-sm text-muted-foreground">{item.name}</span>
          </div>
        ))}
      </div>

      {/* Chart */}
      <div className="relative">
        <div className="flex items-center gap-4">
          <div className="text-sm text-muted-foreground w-24 text-right shrink-0">
            {municipio}
          </div>
          <div className="flex-1 h-32">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                layout="vertical"
                data={data}
                margin={{ top: 5, right: 120, left: 0, bottom: 5 }}
              >
                <XAxis 
                  type="number" 
                  domain={[0, maxValue]} 
                  tickFormatter={formatNumber}
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))' }}
                />
                <YAxis 
                  type="category" 
                  dataKey="name" 
                  hide 
                />
                <ReferenceLine
                  x={populacaoIBGE}
                  stroke="#9CA3AF"
                  strokeDasharray="4 4"
                  label={{
                    value: 'População parâmetro do IBGE para dimensão cadastro',
                    position: 'top',
                    fill: 'hsl(var(--muted-foreground))',
                    fontSize: 11,
                    textAnchor: 'middle',
                  }}
                />
                <ReferenceLine
                  x={populacaoLimite}
                  stroke="#9CA3AF"
                  strokeDasharray="4 4"
                  label={{
                    value: 'População limite máximo para dimensão cadastro',
                    position: 'insideBottomRight',
                    fill: 'hsl(var(--muted-foreground))',
                    fontSize: 11,
                    dy: 20,
                  }}
                />
                <Bar 
                  dataKey="value" 
                  radius={[0, 4, 4, 0]}
                  barSize={24}
                >
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                  <LabelList 
                    dataKey="value" 
                    position="right"
                    formatter={formatNumber}
                    style={{ 
                      fontSize: 12, 
                      fill: 'hsl(var(--foreground))',
                      fontWeight: 500,
                    }}
                  />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* X-axis start label */}
        <div className="absolute bottom-0 left-24 text-xs text-muted-foreground">0</div>
      </div>
    </div>
  );
};
