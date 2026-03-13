import React from 'react';
import { Table, Button, Badge } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { Download, ChevronRightIcon } from 'lucide-react';

type Classification = 'otimo' | 'bom' | 'suficiente' | 'regular';

interface ReportData {
  key: string;
  equipe: string;
  unidade: string;
  classificacao: Classification;
  numerador: number;
  denominador: number;
  pontuacao: number;
  fichasDesatualizadas: number;
}

interface ReportTableProps {
  data?: ReportData[];
  totalEquipes?: number;
  selectedPeriod?: string;
  onViewIndividual?: (key: string) => void;
  variant?: 'qualidade' | 'qualidade-esb';
}

const classificationStatus: Record<Classification, 'success' | 'warning' | 'error' | 'processing'> = {
  otimo: 'success',
  bom: 'processing',
  suficiente: 'warning',
  regular: 'error',
};

const classificationLabels: Record<Classification, string> = {
  otimo: 'Ótimo',
  bom: 'Bom',
  suficiente: 'Suficiente',
  regular: 'Regular',
};

const sampleData: ReportData[] = [
  { key: '1', equipe: 'ESF Vila Nova', unidade: 'UBS Centro', classificacao: 'regular', numerador: 2.29, denominador: 4, pontuacao: 57.25, fichasDesatualizadas: 12 },
  { key: '2', equipe: 'ESF Jardim América', unidade: 'UBS Norte', classificacao: 'regular', numerador: 2.29, denominador: 4, pontuacao: 57.25, fichasDesatualizadas: 5 },
  { key: '3', equipe: 'ESF Centro', unidade: 'UBS Sul', classificacao: 'regular', numerador: 2.64, denominador: 4, pontuacao: 52.8, fichasDesatualizadas: 0 },
  { key: '4', equipe: 'ESF Parque Industrial', unidade: 'UBS Centro', classificacao: 'suficiente', numerador: 2.29, denominador: 4, pontuacao: 57.25, fichasDesatualizadas: 3 },
  { key: '5', equipe: 'ESF Bela Vista', unidade: 'UBS Norte', classificacao: 'bom', numerador: 2.29, denominador: 4, pontuacao: 57.25, fichasDesatualizadas: 8 },
  { key: '6', equipe: 'ESF Santa Maria', unidade: 'UBS Sul', classificacao: 'regular', numerador: 2.29, denominador: 4, pontuacao: 57.25, fichasDesatualizadas: 0 },
  { key: '7', equipe: 'ESF Nova Esperança', unidade: 'UBS Centro', classificacao: 'otimo', numerador: 2.64, denominador: 4, pontuacao: 52.8, fichasDesatualizadas: 2 },
  { key: '8', equipe: 'ESF São João', unidade: 'UBS Norte', classificacao: 'regular', numerador: 2.29, denominador: 4, pontuacao: 57.25, fichasDesatualizadas: 15 },
  { key: '9', equipe: 'ESF Boa Vista', unidade: 'UBS Sul', classificacao: 'regular', numerador: 2.64, denominador: 4, pontuacao: 52.8, fichasDesatualizadas: 0 },
  { key: '10', equipe: 'ESF Primavera', unidade: 'UBS Centro', classificacao: 'regular', numerador: 2.64, denominador: 4, pontuacao: 52.8, fichasDesatualizadas: 7 },
];

export const ReportTable: React.FC<ReportTableProps> = ({
  data = sampleData,
  totalEquipes = 398,
  selectedPeriod = 'Consolidado',
  onViewIndividual,
  variant = 'qualidade',
}) => {
  const isConsolidado = selectedPeriod === 'Consolidado';
  const isEsb = variant === 'qualidade-esb';
  const columns: ColumnsType<ReportData> = [
    {
      title: 'Equipe de saúde',
      dataIndex: 'equipe',
      key: 'equipe',
      render: (text: string) => <span className="font-medium">{text}</span>,
    },
    {
      title: 'Unidade',
      dataIndex: 'unidade',
      key: 'unidade',
    },
    ...(!isConsolidado ? [{
      title: 'Numerador',
      dataIndex: 'numerador',
      key: 'numerador',
      align: 'center' as const,
    },
    {
      title: 'Denominador',
      dataIndex: 'denominador',
      key: 'denominador',
      align: 'center' as const,
    }] : []),
    {
      title: 'Pontuação',
      dataIndex: 'pontuacao',
      key: 'pontuacao',
      align: 'center',
    },
    {
      title: 'Classificação',
      dataIndex: 'classificacao',
      key: 'classificacao',
      render: (classification: Classification) => (
        <Badge status={classificationStatus[classification]} text={classificationLabels[classification]} />
      ),
    },
    ...(!isEsb ? [{
      title: 'Fichas desatualizadas',
      dataIndex: 'fichasDesatualizadas' as const,
      key: 'fichasDesatualizadas',
      render: (count: number, record: ReportData) => (
        <div 
          className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity"
          onClick={() => onViewIndividual?.(record.key)}
        >
          <span className={`w-2 h-2 rounded-full ${count === 0 ? 'bg-status-otimo' : 'bg-status-regular'}`} />
          <span className="text-sm">
            {count} fichas desatualizadas
          </span>
          <ChevronRightIcon className="h-3 w-3 text-muted-foreground" />
        </div>
      ),
    }] : []),
  ];

  return (
    <div className="rounded-lg bg-card p-4 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <span className="text-sm text-muted-foreground">
          Total de equipes: <strong className="text-foreground">{totalEquipes}</strong>
        </span>
        {!isConsolidado && (
          <Button icon={<Download className="h-4 w-4" />}>Exportar equipes</Button>
        )}
      </div>
      <Table
        columns={columns}
        dataSource={data}
        tableLayout="fixed"
        pagination={{
          pageSize: 10,
          showSizeChanger: true,
          showTotal: (total, range) => `${range[0]}-${range[1]} de ${total} itens`,
        }}
        size="middle"
      />
    </div>
  );
};
