import React, { useState } from 'react';
import { Table, Button, Modal } from 'antd';
import type { ColumnsType, ColumnType } from 'antd/es/table';
import { Download, ChevronDown, ChevronRight, ChevronRightIcon, HelpCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

type Classification = 'otimo' | 'bom' | 'suficiente' | 'regular';

interface MonthData {
  status: Classification;
  value: string;
}

interface IndicatorData {
  id: string;
  name: string;
  janeiro: MonthData;
  fevereiro: MonthData;
  marco: MonthData;
  abril: MonthData;
  consolidado: MonthData;
}

interface TeamData {
  key: string;
  equipe: string;
  unidade: string;
  tipoEquipe: string;
  consolidado: MonthData;
  indicadores: IndicatorData[];
}

type TableVariant = 'qualidade' | 'qualidade-esb';

interface OverviewTableProps {
  data?: TeamData[];
  totalEquipes?: number;
  variant?: TableVariant;
}

const sampleIndicators: IndicatorData[] = [
  {
    id: 'c1',
    name: 'C1 - Mais acesso (peso 1)',
    janeiro: { status: 'regular', value: 'X%' },
    fevereiro: { status: 'suficiente', value: 'X%' },
    marco: { status: 'bom', value: 'X%' },
    abril: { status: 'otimo', value: 'X%' },
    consolidado: { status: 'otimo', value: 'X%' },
  },
  {
    id: 'c2',
    name: 'C2 - Cuidado Infantil (peso 2)',
    janeiro: { status: 'regular', value: 'X%' },
    fevereiro: { status: 'suficiente', value: 'X%' },
    marco: { status: 'bom', value: 'X%' },
    abril: { status: 'otimo', value: 'X%' },
    consolidado: { status: 'otimo', value: 'X%' },
  },
  {
    id: 'c3',
    name: 'C3 - Gestante e Puérpera (peso 2)',
    janeiro: { status: 'regular', value: 'X%' },
    fevereiro: { status: 'suficiente', value: 'X%' },
    marco: { status: 'bom', value: 'X%' },
    abril: { status: 'otimo', value: 'X%' },
    consolidado: { status: 'otimo', value: 'X%' },
  },
  {
    id: 'c4',
    name: 'C4 - Pessoa com Diabetes (peso 1)',
    janeiro: { status: 'regular', value: 'X%' },
    fevereiro: { status: 'suficiente', value: 'X%' },
    marco: { status: 'bom', value: 'X%' },
    abril: { status: 'otimo', value: 'X%' },
    consolidado: { status: 'otimo', value: 'X%' },
  },
  {
    id: 'c5',
    name: 'C5 - Pessoa com Hipertensão (peso 1)',
    janeiro: { status: 'regular', value: 'X%' },
    fevereiro: { status: 'suficiente', value: 'X%' },
    marco: { status: 'bom', value: 'X%' },
    abril: { status: 'otimo', value: 'X%' },
    consolidado: { status: 'otimo', value: 'X%' },
  },
  {
    id: 'c6',
    name: 'C6 - Pessoa Idosa (peso 1)',
    janeiro: { status: 'regular', value: 'X%' },
    fevereiro: { status: 'suficiente', value: 'X%' },
    marco: { status: 'bom', value: 'X%' },
    abril: { status: 'otimo', value: 'X%' },
    consolidado: { status: 'otimo', value: 'X%' },
  },
  {
    id: 'c7',
    name: 'C7 - Cuidado da mulher (peso 1)',
    janeiro: { status: 'regular', value: 'X%' },
    fevereiro: { status: 'suficiente', value: 'X%' },
    marco: { status: 'bom', value: 'X%' },
    abril: { status: 'otimo', value: 'X%' },
    consolidado: { status: 'otimo', value: 'X%' },
  },
];

const sampleIndicatorsEsb: IndicatorData[] = [
  {
    id: 'b1',
    name: 'B1 - Primeira consulta',
    janeiro: { status: 'regular', value: 'X%' },
    fevereiro: { status: 'suficiente', value: 'X%' },
    marco: { status: 'bom', value: 'X%' },
    abril: { status: 'otimo', value: 'X%' },
    consolidado: { status: 'otimo', value: 'X%' },
  },
  {
    id: 'b2',
    name: 'B2 - Tratamento concluído',
    janeiro: { status: 'regular', value: 'X%' },
    fevereiro: { status: 'suficiente', value: 'X%' },
    marco: { status: 'bom', value: 'X%' },
    abril: { status: 'otimo', value: 'X%' },
    consolidado: { status: 'otimo', value: 'X%' },
  },
  {
    id: 'b3',
    name: 'B3 - Taxa de exodontias',
    janeiro: { status: 'regular', value: 'X%' },
    fevereiro: { status: 'suficiente', value: 'X%' },
    marco: { status: 'bom', value: 'X%' },
    abril: { status: 'otimo', value: 'X%' },
    consolidado: { status: 'otimo', value: 'X%' },
  },
  {
    id: 'b4',
    name: 'B4 - Procedimentos odontológicos',
    janeiro: { status: 'regular', value: 'X%' },
    fevereiro: { status: 'suficiente', value: 'X%' },
    marco: { status: 'bom', value: 'X%' },
    abril: { status: 'otimo', value: 'X%' },
    consolidado: { status: 'otimo', value: 'X%' },
  },
  {
    id: 'b5',
    name: 'B5 - Escovação supervisionada',
    janeiro: { status: 'regular', value: 'X%' },
    fevereiro: { status: 'suficiente', value: 'X%' },
    marco: { status: 'bom', value: 'X%' },
    abril: { status: 'otimo', value: 'X%' },
    consolidado: { status: 'otimo', value: 'X%' },
  },
  {
    id: 'b6',
    name: 'B6 - Tratamento restaurador',
    janeiro: { status: 'regular', value: 'X%' },
    fevereiro: { status: 'suficiente', value: 'X%' },
    marco: { status: 'bom', value: 'X%' },
    abril: { status: 'otimo', value: 'X%' },
    consolidado: { status: 'otimo', value: 'X%' },
  },
];

const sampleData: TeamData[] = [
  {
    key: '1',
    equipe: 'ESF Vila Nova',
    unidade: 'UBS Centro',
    tipoEquipe: 'eSF',
    consolidado: { status: 'otimo', value: 'X%' },
    indicadores: sampleIndicators,
  },
  {
    key: '2',
    equipe: 'ESF Jardim América',
    unidade: 'UBS Norte',
    tipoEquipe: 'eSF',
    consolidado: { status: 'otimo', value: 'X%' },
    indicadores: sampleIndicators,
  },
  {
    key: '3',
    equipe: 'ESF Centro',
    unidade: 'UBS Sul',
    tipoEquipe: 'eAP',
    consolidado: { status: 'bom', value: 'X%' },
    indicadores: sampleIndicators,
  },
  {
    key: '4',
    equipe: 'ESF Parque Industrial',
    unidade: 'UBS Centro',
    tipoEquipe: 'eSF',
    consolidado: { status: 'suficiente', value: 'X%' },
    indicadores: sampleIndicators,
  },
  {
    key: '5',
    equipe: 'ESF Bela Vista',
    unidade: 'UBS Norte',
    tipoEquipe: 'eSF',
    consolidado: { status: 'otimo', value: 'X%' },
    indicadores: sampleIndicators,
  },
];

export const sampleDataEsb: TeamData[] = [
  {
    key: '1',
    equipe: 'ESB Vila Nova',
    unidade: 'UBS Centro',
    tipoEquipe: 'eSB',
    consolidado: { status: 'otimo', value: 'X%' },
    indicadores: sampleIndicatorsEsb,
  },
  {
    key: '2',
    equipe: 'ESB Jardim América',
    unidade: 'UBS Norte',
    tipoEquipe: 'eSB',
    consolidado: { status: 'otimo', value: 'X%' },
    indicadores: sampleIndicatorsEsb,
  },
  {
    key: '3',
    equipe: 'ESB Centro',
    unidade: 'UBS Sul',
    tipoEquipe: 'eSB',
    consolidado: { status: 'bom', value: 'X%' },
    indicadores: sampleIndicatorsEsb,
  },
  {
    key: '4',
    equipe: 'ESB Parque Industrial',
    unidade: 'UBS Centro',
    tipoEquipe: 'eSB',
    consolidado: { status: 'suficiente', value: 'X%' },
    indicadores: sampleIndicatorsEsb,
  },
  {
    key: '5',
    equipe: 'ESB Bela Vista',
    unidade: 'UBS Norte',
    tipoEquipe: 'eSB',
    consolidado: { status: 'otimo', value: 'X%' },
    indicadores: sampleIndicatorsEsb,
  },
];

const statusColors: Record<Classification, string> = {
  otimo: 'bg-[#3C8DBC]',
  bom: 'bg-[#00A65A]',
  suficiente: 'bg-[#F0AD4E]',
  regular: 'bg-[#DD4B39]',
};

const statusLabels: Record<Classification, string> = {
  otimo: 'Ótimo',
  bom: 'Bom',
  suficiente: 'Suficiente',
  regular: 'Regular',
};

interface StatusCellProps {
  data: MonthData;
  showLink?: boolean;
  indicador?: string;
  month?: string;
  equipeKey?: string;
}

const monthToParam: Record<string, string> = {
  janeiro: 'Janeiro',
  fevereiro: 'Fevereiro',
  marco: 'Março',
  abril: 'Abril',
  consolidado: 'Consolidado',
};

const indicatorToParam: Record<string, string> = {
  c1: 'c1',
  c2: 'c2',
  c3: 'c3',
  c4: 'c4',
  c5: 'c5',
  c6: 'c6',
  c7: 'c7',
  b1: 'b1',
  b2: 'b2',
  b3: 'b3',
  b4: 'b4',
  b5: 'b5',
  b6: 'b6',
};

const StatusCell: React.FC<StatusCellProps> = ({ data, showLink = true, indicador, month, equipeKey }) => {
  const content = (
    <div className={`flex items-center gap-2 ${showLink ? 'cursor-pointer hover:opacity-80 transition-opacity' : ''}`}>
      <span className={`w-2 h-2 rounded-full ${statusColors[data.status]}`} />
      <span className="text-sm">
        {statusLabels[data.status]} | {data.value}
      </span>
      {showLink && (
        <ChevronRightIcon className="h-3 w-3 text-muted-foreground" />
      )}
    </div>
  );

  if (showLink && indicador && month) {
    const isEsb = indicador.startsWith('b');
    const tabParam = isEsb ? 'qualidade-esb' : 'qualidade';
    const params = new URLSearchParams({
      tab: tabParam,
      indicador: indicatorToParam[indicador] || indicador,
      periodo: monthToParam[month] || month,
    });
    if (equipeKey) {
      params.set('equipe', equipeKey);
    }
    return (
      <Link to={`/financiamento-aps/qualidade-esf-eap/relatorio?${params.toString()}`}>
        {content}
      </Link>
    );
  }

  return content;
};

const statusOrder: Record<Classification, number> = {
  otimo: 1,
  bom: 2,
  suficiente: 3,
  regular: 4,
};

const statusFilters = [
  { text: 'Ótimo', value: 'otimo' },
  { text: 'Bom', value: 'bom' },
  { text: 'Suficiente', value: 'suficiente' },
  { text: 'Regular', value: 'regular' },
];

const getColumns = (onHelpClick: () => void, variant: TableVariant = 'qualidade'): ColumnsType<TeamData> => [
  {
    title: 'Equipe de saúde',
    dataIndex: 'equipe',
    key: 'equipe',
    width: '25%',
    render: (text: string) => <span className="font-medium">{text}</span>,
  },
  {
    title: 'Unidade',
    dataIndex: 'unidade',
    key: 'unidade',
    width: '20%',
  },
  {
    title: 'Tipo de equipe',
    dataIndex: 'tipoEquipe',
    key: 'tipoEquipe',
    width: '15%',
  },
  {
    title: (
      <div className="flex items-center gap-1">
        <span>Conceito geral obtido</span>
        <HelpCircle 
          className="h-4 w-4 text-muted-foreground cursor-pointer hover:text-foreground transition-colors" 
          onClick={(e) => {
            e.stopPropagation();
            onHelpClick();
          }}
        />
      </div>
    ),
    dataIndex: 'consolidado',
    key: 'consolidado',
    width: '25%',
    filters: statusFilters,
    onFilter: (value, record) => record.consolidado.status === value,
    sorter: (a, b) => statusOrder[a.consolidado.status] - statusOrder[b.consolidado.status],
    render: (data: MonthData) => <StatusCell data={data} showLink={false} />,
  },
  {
    title: 'Ação',
    key: 'acao',
    width: '20%',
    render: (_: unknown, record: TeamData) => (
      <div className="flex gap-2">
        <Link to={`/financiamento-aps/qualidade-esf-eap/relatorio?tab=${variant}&equipe=${record.key}`}>
          <Button type="default" size="small">Ver relatório</Button>
        </Link>
        <Link to={`/financiamento-aps/qualidade-esf-eap/individualizado?tab=${variant}&equipe=${record.key}`}>
          <Button type="default" size="small">{variant === 'qualidade-esb' ? 'Vinculações' : 'Individualizado'}</Button>
        </Link>
      </div>
    ),
  },
];

const ExpandedRow: React.FC<{ record: TeamData }> = ({ record }) => {
  const months = ['consolidado', 'janeiro', 'fevereiro', 'marco', 'abril'] as const;
  const monthLabels: Record<string, string> = {
    consolidado: 'Conceito obtido no quadrimestre',
    janeiro: 'Janeiro',
    fevereiro: 'Fevereiro',
    marco: 'Março',
    abril: 'Abril',
  };

  return (
    <div className="bg-muted/20 border-t border-border">
      {/* Indicators table-like grid */}
      <div className="overflow-x-auto border border-border rounded-md">
        <div className="indicator-grid min-w-[800px]">
          {/* Header row */}
          <div className="indicator-grid-header">
            <div className="indicator-grid-cell font-medium text-muted-foreground">Indicador</div>
            <div className="indicator-grid-cell font-medium text-muted-foreground">Conceito obtido no quadrimestre</div>
            <div className="indicator-grid-cell font-medium text-muted-foreground">Janeiro</div>
            <div className="indicator-grid-cell font-medium text-muted-foreground">Fevereiro</div>
            <div className="indicator-grid-cell font-medium text-muted-foreground">Março</div>
            <div className="indicator-grid-cell font-medium text-muted-foreground">Abril</div>
          </div>

          {/* Data rows */}
          {record.indicadores.map((indicador) => (
            <div 
              key={indicador.id} 
              className="indicator-grid-row bg-card"
            >
              <div className="indicator-grid-cell font-medium">{indicador.name}</div>
              <div className="indicator-grid-cell">
                <StatusCell data={indicador.consolidado} indicador={indicador.id} month="consolidado" equipeKey={record.key} />
              </div>
              <div className="indicator-grid-cell">
                <StatusCell data={indicador.janeiro} indicador={indicador.id} month="janeiro" equipeKey={record.key} />
              </div>
              <div className="indicator-grid-cell">
                <StatusCell data={indicador.fevereiro} indicador={indicador.id} month="fevereiro" equipeKey={record.key} />
              </div>
              <div className="indicator-grid-cell">
                <StatusCell data={indicador.marco} indicador={indicador.id} month="marco" equipeKey={record.key} />
              </div>
              <div className="indicator-grid-cell">
                <StatusCell data={indicador.abril} indicador={indicador.id} month="abril" equipeKey={record.key} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export const OverviewTable: React.FC<OverviewTableProps> = ({
  data = sampleData,
  totalEquipes = 398,
  variant = 'qualidade',
}) => {
  const [isHelpModalOpen, setIsHelpModalOpen] = useState(false);
  const columns = getColumns(() => setIsHelpModalOpen(true), variant);

  return (
    <div className="rounded-lg bg-card p-4 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <span className="text-sm text-muted-foreground">
          Total de equipes: <strong className="text-foreground">{totalEquipes}</strong>
        </span>
        <Button icon={<Download className="h-4 w-4" />}>Exportar equipes</Button>
      </div>
      <Table
        columns={columns}
        dataSource={data}
        expandable={{
          expandedRowRender: (record) => <ExpandedRow record={record} />,
          expandIcon: ({ expanded, onExpand, record }) => (
            <span 
              className="inline-flex cursor-pointer text-muted-foreground hover:text-foreground transition-colors"
              onClick={(e) => onExpand(record, e as React.MouseEvent<HTMLElement>)}
            >
              {expanded ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
            </span>
          ),
        }}
        pagination={{
          pageSize: 10,
          showSizeChanger: true,
          showTotal: (total, range) => `${range[0]}-${range[1]} de ${total} itens`,
        }}
        size="middle"
      />

      <Modal
        title="Conceito Geral Obtido"
        open={isHelpModalOpen}
        onCancel={() => setIsHelpModalOpen(false)}
        footer={[
          <Button key="ok" type="primary" onClick={() => setIsHelpModalOpen(false)}>
            Entendi
          </Button>
        ]}
      >
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground">
            O conceito geral obtido representa a classificação consolidada da equipe no quadrimestre, 
            calculada com base no desempenho em todos os indicadores de qualidade.
          </p>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-[#3C8DBC]" />
              <span className="text-sm"><strong>Ótimo:</strong> Pontuação &gt; 50 e ≤ 70</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-[#00A65A]" />
              <span className="text-sm"><strong>Bom:</strong> Pontuação &gt; 30 e ≤ 50</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-[#F0AD4E]" />
              <span className="text-sm"><strong>Suficiente:</strong> Pontuação &gt; 10 e ≤ 30</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-[#DD4B39]" />
              <span className="text-sm"><strong>Regular:</strong> Pontuação ≤ 10 ou &gt; 70</span>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};
