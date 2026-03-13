import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import {
  PieChart, Pie, Cell, ResponsiveContainer, Tooltip,
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend,
} from 'recharts';

interface DonutCardProps {
  title: string;
  total: number;
  segments: { name: string; value: number; color: string }[];
}

const DonutCard: React.FC<DonutCardProps> = ({ title, total, segments }) => (
  <Card>
    <CardHeader className="pb-2">
      <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
    </CardHeader>
    <CardContent>
      <div className="flex flex-col items-center">
        <div className="relative w-full" style={{ height: 160 }}>
          <ResponsiveContainer width="100%" height={160}>
            <PieChart>
              <Pie data={segments} cx="50%" cy="50%" innerRadius={45} outerRadius={65} dataKey="value" paddingAngle={2}>
                {segments.map((s, i) => <Cell key={i} fill={s.color} />)}
              </Pie>
              <Tooltip formatter={(v: number) => `${v} (${((v / total) * 100).toFixed(1)}%)`} />
            </PieChart>
          </ResponsiveContainer>
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <p className="text-xl font-bold text-foreground">{total}</p>
            <p className="text-[10px] text-muted-foreground">total gestantes</p>
          </div>
        </div>
        <div className="flex flex-wrap gap-3 text-[13px] text-muted-foreground">
          {segments.map((s, i) => (
            <span key={i} className="flex items-center gap-1">
              <span className="w-2.5 h-2.5 rounded-full" style={{ background: s.color }} />
              {s.name}
            </span>
          ))}
        </div>
      </div>
    </CardContent>
  </Card>
);

const PURPLE = 'hsl(280, 60%, 70%)';
const PURPLE_LIGHT = 'hsl(280, 60%, 85%)';

const preNatalData = { total: 85, sim: 72, nao: 13 };
const atendimentoData = { total: 85, sim: 75, nao: 10 };
const visitaData = { total: 85, sim: 61, nao: 24 };
const vacinaData = { total: 52, sim: 23, nao: 29 };
const odontoData = { total: 85, sim: 32, nao: 53 };
const consultaData = { total: 502, medico: 161, enfermeiro: 341 };

const consultasTrimestreData = [
  { trimestre: '1º Trimestre\n2 consultas previstas', receberam: 4, naoReceberam: 4 },
  { trimestre: '2º Trimestre\n2 consultas previstas', receberam: 11, naoReceberam: 14 },
  { trimestre: '3º Trimestre\n3 consultas previstas', receberam: 16, naoReceberam: 9 },
];

const condicoesData = [
  { condicao: 'Tabagismo', quantidade: 3 },
  { condicao: 'Uso de álcool', quantidade: 2 },
  { condicao: 'Uso de drogas', quantidade: 8 },
  { condicao: 'Hipertensão', quantidade: 4 },
  { condicao: 'Diabetes', quantidade: 2 },
];

const nutricionalData = [
  { classificacao: 'Baixo Peso\n(< 18,5)', quantidade: 2 },
  { classificacao: 'Eutrofia\n(≥ 18,5 e < 25)', quantidade: 17 },
  { classificacao: 'Sobrepeso\n(≥ 25 e < 30)', quantidade: 7 },
  { classificacao: 'Obesidade\n(≥ 30)', quantidade: 18 },
];

export const AcompanhamentoContent: React.FC = () => {
  const [riscoFilter, setRiscoFilter] = useState('habitual');

  return (
    <div className="space-y-6">
      {/* Row 1: 3 donut charts */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <DonutCard
          title="Início do pré-natal até a 12ª semana de gestação"
          total={preNatalData.total}
          segments={[
            { name: 'com a primeira consulta até a 12ª semana', value: preNatalData.sim, color: PURPLE },
            { name: 'com a primeira consulta após a 12ª semana', value: preNatalData.nao, color: PURPLE_LIGHT },
          ]}
        />
        <DonutCard
          title="Atendimento nos últimos 30 dias"
          total={atendimentoData.total}
          segments={[
            { name: 'com atendimento nos últimos 30 dias', value: atendimentoData.sim, color: PURPLE },
            { name: 'sem atendimento nos últimos 30 dias', value: atendimentoData.nao, color: PURPLE_LIGHT },
          ]}
        />
        <DonutCard
          title="Visita domiciliar nos últimos 30 dias"
          total={visitaData.total}
          segments={[
            { name: 'com visita domiciliar nos últimos 30 dias', value: visitaData.sim, color: PURPLE },
            { name: 'sem visita domiciliar nos últimos 30 dias', value: visitaData.nao, color: PURPLE_LIGHT },
          ]}
        />
      </div>

      {/* Row 2: 3 donut charts */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <DonutCard
          title="Situação vacinal – dTpa"
          total={vacinaData.total}
          segments={[
            { name: 'com a vacina dTpa', value: vacinaData.sim, color: PURPLE },
            { name: 'sem a vacina dTpa', value: vacinaData.nao, color: PURPLE_LIGHT },
          ]}
        />
        <DonutCard
          title="Pré-natal odontológico"
          total={odontoData.total}
          segments={[
            { name: 'realizaram pré-natal odontológico', value: odontoData.sim, color: PURPLE },
            { name: 'não realizaram pré-natal odontológico', value: odontoData.nao, color: PURPLE_LIGHT },
          ]}
        />
        <DonutCard
          title="Consultas de pré-natal por categoria profissional"
          total={consultaData.total}
          segments={[
            { name: 'consultas realizadas por médicos', value: consultaData.medico, color: PURPLE },
            { name: 'consultas realizadas por enfermeiros', value: consultaData.enfermeiro, color: PURPLE_LIGHT },
          ]}
        />
      </div>

      {/* Consultas previstas por trimestre */}
      <Card>
        <CardHeader className="pb-2 flex flex-row items-center justify-between">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            Gestantes com consultas de pré-natal previstas por trimestre de gestação
          </CardTitle>
          <Select value={riscoFilter} onValueChange={setRiscoFilter}>
            <SelectTrigger className="w-[180px] h-8 text-xs">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="habitual">Risco habitual</SelectItem>
              <SelectItem value="intermediario">Risco intermediário</SelectItem>
              <SelectItem value="alto">Alto risco</SelectItem>
            </SelectContent>
          </Select>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={consultasTrimestreData} barGap={4}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="trimestre" tick={{ fontSize: 11 }} />
              <YAxis />
              <Tooltip />
              <Legend iconType="circle" wrapperStyle={{ fontSize: 12 }} />
              <Bar dataKey="receberam" name="Receberam as consultas previstas" fill={PURPLE} radius={[4, 4, 0, 0]} barSize={50} />
              <Bar dataKey="naoReceberam" name="Não receberam as consultas previstas" fill={PURPLE_LIGHT} radius={[4, 4, 0, 0]} barSize={50} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Condições relacionadas ao risco */}
      <Card>
        <CardHeader className="pb-2 flex flex-row items-center justify-between">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            Principais condições relacionadas ao risco gestacional
          </CardTitle>
          <Select defaultValue="intermediario">
            <SelectTrigger className="w-[180px] h-8 text-xs">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="habitual">Risco habitual</SelectItem>
              <SelectItem value="intermediario">Risco intermediário</SelectItem>
              <SelectItem value="alto">Alto risco</SelectItem>
            </SelectContent>
          </Select>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={condicoesData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="condicao" tick={{ fontSize: 11 }} />
              <YAxis />
              <Tooltip />
              <Bar dataKey="quantidade" fill={PURPLE} radius={[4, 4, 0, 0]} barSize={50} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Estado nutricional */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card>
          <CardHeader className="pb-2 flex flex-row items-center justify-between">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Classificação do estado nutricional na primeira consulta
            </CardTitle>
            <Select defaultValue="1">
              <SelectTrigger className="w-[140px] h-8 text-xs">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">1º Trimestre</SelectItem>
                <SelectItem value="2">2º Trimestre</SelectItem>
                <SelectItem value="3">3º Trimestre</SelectItem>
              </SelectContent>
            </Select>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={nutricionalData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="classificacao" tick={{ fontSize: 10 }} />
                <YAxis />
                <Tooltip />
                <Bar dataKey="quantidade" fill={PURPLE} radius={[4, 4, 0, 0]} barSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Distribuição de gestantes por ganho de peso segundo a classificação do estado nutricional no início do pré-natal
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={[
                { trimestre: '1º Trimestre', p10: 1, p10ap90: 1, p90: 0 },
                { trimestre: '2º Trimestre', p10: 0, p10ap90: 0, p90: 0 },
                { trimestre: '3º Trimestre', p10: 0, p10ap90: 0, p90: 0 },
              ]}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="trimestre" tick={{ fontSize: 11 }} />
                <YAxis />
                <Tooltip />
                <Legend iconType="circle" wrapperStyle={{ fontSize: 11 }} />
                <Bar dataKey="p10" name="< P10" fill="hsl(0, 84%, 60%)" radius={[4, 4, 0, 0]} barSize={20} />
                <Bar dataKey="p10ap90" name="P10 a P90" fill="hsl(142, 71%, 45%)" radius={[4, 4, 0, 0]} barSize={20} />
                <Bar dataKey="p90" name="> P90" fill="hsl(280, 60%, 50%)" radius={[4, 4, 0, 0]} barSize={20} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
