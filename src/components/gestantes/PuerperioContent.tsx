import React from 'react';
import { Baby } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell,
} from 'recharts';

const PURPLE = 'hsl(280, 60%, 70%)';

const atendimentoData = [
  { periodo: 'Até 10 dias pós-parto', quantidade: 18 },
  { periodo: 'De 11 a 42 dias pós-parto', quantidade: 8 },
  { periodo: 'Sem atendimento', quantidade: 7 },
];

export const PuerperioContent: React.FC = () => {
  const totalPuerperas = 25;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Total card */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total de mulheres no puerpério
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4">
              <div className="flex items-center justify-center w-14 h-14 rounded-full bg-primary/10">
                <Baby className="w-7 h-7 text-primary" />
              </div>
              <div>
                <p className="text-4xl font-bold text-foreground">{totalPuerperas}</p>
                <p className="text-sm text-muted-foreground">mulheres no puerpério</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Atendimento puerperal chart */}
        <Card className="lg:col-span-2">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Puérperas com atendimento puerperal
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={180}>
              <BarChart data={atendimentoData} layout="vertical" barSize={32}>
                <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                <XAxis type="number" />
                <YAxis type="category" dataKey="periodo" width={160} tick={{ fontSize: 11 }} />
                <Tooltip />
                <Bar dataKey="quantidade" fill={PURPLE} radius={[0, 4, 4, 0]}>
                  {atendimentoData.map((_, i) => (
                    <Cell key={i} fill={PURPLE} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
