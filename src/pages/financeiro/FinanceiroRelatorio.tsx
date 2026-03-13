import React, { useState } from 'react';
import { Segmented } from 'antd';
import { PageHeader } from '@/components/layout/PageHeader';
import { FinanceiroFilterBar } from '@/components/financeiro/FinanceiroFilterBar';
import { Card, CardContent } from '@/components/ui/card';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/table';
import { cn } from '@/lib/utils';
import { Building2, Shield, Eye, Stethoscope, Pill } from 'lucide-react';

const periods = ['Consolidado', 'Janeiro', 'Fevereiro'];

const gruposConfig = [
  { key: 'atencao-primaria', label: 'Atenção Primária', icon: Building2 },
  { key: 'gestao-sus', label: 'Gestão do SUS', icon: Shield },
  { key: 'vigilancia', label: 'Vigilância em Saúde', icon: Eye },
  { key: 'atencao-especializada', label: 'Atenção especializada', icon: Stethoscope },
  { key: 'farmaceutica', label: 'Farmacêutica', icon: Pill },
];

interface RepasseRow {
  grupo: string;
  acao: string;
  acaoDetalhada: string;
  processo: string;
  portaria: string;
  valorRecebido: string;
}

const investimentoData: RepasseRow[] = [
  { grupo: 'ATENÇÃO PRIMÁRIA', acao: 'ESTRUTURAÇÃO DA REDE DE SERVIÇOS DE ATENÇÃO PRIMÁRIA DE SAÚDE', acaoDetalhada: 'CONSTRUÇÃO E AMPLIAÇÃO DE UNIDADES BÁSICAS DE SAÚDE - UBS', processo: '-', portaria: '-', valorRecebido: 'R$ 0,00' },
  { grupo: 'ATENÇÃO PRIMÁRIA', acao: 'ESTRUTURAÇÃO DA REDE DE SERVIÇOS DE ATENÇÃO PRIMÁRIA DE SAÚDE', acaoDetalhada: 'ESTRUTURAÇÃO DA REDE DE SERVIÇOS DE ATENÇÃO PRIMÁRIA DE SAÚDE', processo: '-', portaria: '-', valorRecebido: 'R$ 0,00' },
  { grupo: 'ATENÇÃO PRIMÁRIA', acao: 'ESTRUTURAÇÃO DA REDE DE SERVIÇOS DE ATENÇÃO PRIMÁRIA DE SAÚDE', acaoDetalhada: 'ESTRUTURAÇÃO DA ATENÇÃO À SAÚDE BUCAL', processo: '-', portaria: '-', valorRecebido: 'R$ 0,00' },
  { grupo: 'ATENÇÃO PRIMÁRIA', acao: 'ESTRUTURAÇÃO DE UNIDADES DE ATENÇÃO ESPECIALIZADA EM SAÚDE', acaoDetalhada: 'ESTRUTURAÇÃO DE UNIDADES DE ATENÇÃO ESPECIALIZADA EM SAÚDE', processo: '-', portaria: '-', valorRecebido: 'R$ 0,00' },
  { grupo: 'ATENÇÃO PRIMÁRIA', acao: 'ESTRUTURAÇÃO DA REDE DE SERVIÇOS DE ATENÇÃO PRIMÁRIA DE SAÚDE', acaoDetalhada: 'ESTRUTURAÇÃO DA REDE CEGONHA', processo: '-', portaria: '-', valorRecebido: 'R$ 0,00' },
  { grupo: 'ATENÇÃO PRIMÁRIA', acao: 'IMPLEMENTAÇÃO DA SEGURANÇA ALIMENTAR E NUTRICIONAL NA SAÚDE', acaoDetalhada: 'IMPLEMENTAÇÃO DA SEGURANÇA ALIMENTAR E NUTRICIONAL NA SAÚDE', processo: '-', portaria: '-', valorRecebido: 'R$ 0,00' },
];

const custeioData: RepasseRow[] = [
  { grupo: 'ATENÇÃO ESPECIALIZADA', acao: 'IMPLEMENTAÇÃO DE POLÍTICAS DE ATENÇÃO ESPECIALIZADA À SAÚDE', acaoDetalhada: 'IMPLEMENTAÇÃO DE POLÍTICAS PARA A REDE DE ATENÇÃO PSICOSSOCIAL (RAPS/CAPS)', processo: '-', portaria: '-', valorRecebido: 'R$ 0,00' },
  { grupo: 'ATENÇÃO PRIMÁRIA', acao: 'PISO DA ATENÇÃO PRIMÁRIA EM SAÚDE', acaoDetalhada: 'PROGRAMAS DE INFORMATIZAÇÃO DA APS', processo: '-', portaria: '-', valorRecebido: 'R$ 0,00' },
  { grupo: 'ATENÇÃO PRIMÁRIA', acao: 'PISO DA ATENÇÃO PRIMÁRIA EM SAÚDE', acaoDetalhada: 'PISO DE ATENÇÃO PRIMÁRIA VARIÁVEL - PAP', processo: '-', portaria: '-', valorRecebido: 'R$ 0,00' },
  { grupo: 'ATENÇÃO PRIMÁRIA', acao: 'PISO DA ATENÇÃO PRIMÁRIA EM SAÚDE', acaoDetalhada: 'INCENTIVO PARA AÇÕES ESTRATÉGICAS', processo: '-', portaria: '-', valorRecebido: 'R$ 0,00' },
  { grupo: 'ATENÇÃO PRIMÁRIA', acao: 'PISO DA ATENÇÃO PRIMÁRIA EM SAÚDE', acaoDetalhada: 'CUSTEIO DE ATENÇÃO À SAÚDE BUCAL', processo: '-', portaria: '-', valorRecebido: 'R$ 0,00' },
  { grupo: 'ATENÇÃO PRIMÁRIA', acao: 'IMPLEMENTAÇÃO DE POLÍTICAS DE ATENÇÃO ESPECIALIZADA À SAÚDE', acaoDetalhada: 'IMPLEMENTAÇÃO DE POLÍTICAS PARA A REDE CEGONHA', processo: '-', portaria: '-', valorRecebido: 'R$ 0,00' },
  { grupo: 'ATENÇÃO PRIMÁRIA', acao: 'IMPLEMENTAÇÃO DE POLÍTICAS DE ATENÇÃO ESPECIALIZADA À SAÚDE', acaoDetalhada: 'IMPLEMENTAÇÃO DE POLÍTICAS DE ATENÇÃO INTEGRAL À SAÚDE DA MULHER', processo: '-', portaria: '-', valorRecebido: 'R$ 0,00' },
  { grupo: 'ATENÇÃO PRIMÁRIA', acao: 'IMPLEMENTAÇÃO DE POLÍTICAS DE ATENÇÃO ESPECIALIZADA À SAÚDE', acaoDetalhada: 'IMPLEMENTAÇÃO DE POLÍTICAS DE ATENÇÃO INTEGRAL À SAÚDE DA CRIANÇA', processo: '-', portaria: '-', valorRecebido: 'R$ 0,00' },
  { grupo: 'ATENÇÃO PRIMÁRIA', acao: 'IMPLEMENTAÇÃO DE POLÍTICAS DE ATENÇÃO ESPECIALIZADA À SAÚDE', acaoDetalhada: 'IMPLEMENTAÇÃO DE POLÍTICAS DE ATENÇÃO À SAÚDE DO HOMEM', processo: '-', portaria: '-', valorRecebido: 'R$ 0,00' },
  { grupo: 'ATENÇÃO PRIMÁRIA', acao: 'IMPLEMENTAÇÃO DE POLÍTICAS DE ATENÇÃO ESPECIALIZADA À SAÚDE', acaoDetalhada: 'IMPLEMENTAÇÃO DE POLÍTICAS DE ATENÇÃO À SAÚDE DO ADOLESCENTE E JOVEM', processo: '-', portaria: '-', valorRecebido: 'R$ 0,00' },
  { grupo: 'ATENÇÃO PRIMÁRIA', acao: 'IMPLEMENTAÇÃO DE POLÍTICAS DE ATENÇÃO ESPECIALIZADA À SAÚDE', acaoDetalhada: 'IMPLEMENTAÇÃO DE POLÍTICAS DE ATENÇÃO À SAÚDE DA PESSOA IDOSA', processo: '-', portaria: '-', valorRecebido: 'R$ 0,00' },
];

const RepasseTable: React.FC<{ tipo: string; bloco: string; data: RepasseRow[]; total: string }> = ({ tipo, bloco, data, total }) => (
  <Card className="overflow-hidden">
    <div className="px-4 py-3 bg-muted/30 border-b border-border flex items-center gap-6 text-xs text-muted-foreground">
      <div>
        <span className="font-medium text-foreground">Tipo de consulta</span>
        <p>{tipo}</p>
      </div>
      <div>
        <span className="font-medium text-foreground">Bloco</span>
        <p>{bloco}</p>
      </div>
    </div>
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="text-xs uppercase">Grupo</TableHead>
            <TableHead className="text-xs uppercase">Ação</TableHead>
            <TableHead className="text-xs uppercase">Ação Detalhada</TableHead>
            <TableHead className="text-xs uppercase">Processo</TableHead>
            <TableHead className="text-xs uppercase">Portaria</TableHead>
            <TableHead className="text-xs uppercase text-right">Valor Recebido</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((row, i) => (
            <TableRow key={i}>
              <TableCell className="text-xs">{row.grupo}</TableCell>
              <TableCell className="text-xs max-w-[200px] truncate">{row.acao}</TableCell>
              <TableCell className="text-xs max-w-[200px] truncate">{row.acaoDetalhada}</TableCell>
              <TableCell className="text-xs">{row.processo}</TableCell>
              <TableCell className="text-xs">{row.portaria}</TableCell>
              <TableCell className="text-xs text-right tabular-nums font-medium">{row.valorRecebido}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
    <div className="flex items-center justify-between px-4 py-3 bg-primary text-primary-foreground">
      <span className="text-sm font-medium">Total</span>
      <span className="text-sm font-bold tabular-nums">{total}</span>
    </div>
  </Card>
);

const FinanceiroRelatorio: React.FC = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('Consolidado');
  const [selectedGrupo, setSelectedGrupo] = useState('atencao-primaria');

  const selectedGrupoConfig = gruposConfig.find(g => g.key === selectedGrupo);

  return (
    <div>
      <PageHeader
        title="Relatório Financeiro"
        breadcrumbs={[
          { label: 'Financeiro', path: '/financeiro' },
          { label: 'Visão geral', path: '/financeiro/visao-geral' },
          { label: 'Relatório' },
        ]}
      />

      <div className="space-y-6">
        <FinanceiroFilterBar />

        <div className="rounded-lg bg-card p-1 shadow-sm">
          <Segmented
            block
            value={selectedPeriod}
            onChange={(value) => setSelectedPeriod(value as string)}
            options={periods}
            className="!bg-transparent"
          />
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Sidebar de grupos */}
          <nav className="shrink-0 lg:w-56">
            <div className="rounded-lg bg-card shadow-sm p-2">
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider px-3 py-2">Grupos</p>
              <div className="space-y-1">
                {gruposConfig.map((grupo) => {
                  const isSelected = selectedGrupo === grupo.key;
                  return (
                    <button
                      key={grupo.key}
                      onClick={() => setSelectedGrupo(grupo.key)}
                      className={cn(
                        'w-full flex items-center gap-3 px-3 py-2.5 rounded-md text-left transition-all duration-150',
                        'hover:bg-muted/50',
                        isSelected
                          ? 'bg-primary/8 border-l-[3px] border-primary shadow-sm'
                          : 'text-muted-foreground hover:text-foreground border-l-[3px] border-transparent'
                      )}
                    >
                      <span className={cn(
                        'flex items-center justify-center w-8 h-8 rounded-md shrink-0 transition-colors',
                        isSelected ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
                      )}>
                        <grupo.icon className="w-4 h-4" />
                      </span>
                      <p className={cn('text-sm font-medium truncate', isSelected ? 'text-foreground' : '')}>
                        {grupo.label}
                      </p>
                    </button>
                  );
                })}
              </div>
            </div>
          </nav>

          {/* Content */}
          <div className="flex-1 min-w-0 space-y-6">
            {/* Group header */}
            <div className="rounded-lg bg-card shadow-sm overflow-hidden">
              <div className="px-6 py-4 bg-gradient-to-r from-primary/5 to-transparent flex items-center gap-3">
                {selectedGrupoConfig && (
                  <span className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary text-primary-foreground">
                    <selectedGrupoConfig.icon className="w-5 h-5" />
                  </span>
                )}
                <div>
                  <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Grupo</p>
                  <h2 className="text-lg font-semibold text-foreground">{selectedGrupoConfig?.label}</h2>
                </div>
              </div>
            </div>

            {/* Investimento table */}
            <RepasseTable
              tipo="Fundo a Fundo"
              bloco="Investimento"
              data={investimentoData}
              total="R$ 0,00"
            />

            {/* Custeio table */}
            <RepasseTable
              tipo="Fundo a Fundo"
              bloco="Custeio"
              data={custeioData}
              total="R$ 0,00"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FinanceiroRelatorio;
