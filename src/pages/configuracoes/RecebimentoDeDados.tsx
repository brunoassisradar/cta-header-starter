import React, { useState } from 'react';
import { Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { ClassificationCard } from '@/components/financiamento/ClassificationCard';
import { FilterBar } from '@/components/financiamento/FilterBar';

type AlertStatus = 'em_dia' | 'em_atraso';

interface FichaData {
  id: string;
  tipoFicha: string;
  quantidadeFichas: number;
  mediaRecebimento: string;
  dataRecebimento: string;
  disponibilizadoPlataforma: AlertStatus;
  dadosAtrasados: AlertStatus;
}

interface RecebimentoData {
  key: string;
  dataRecebimento: string;
  disponibilizadoPlataforma: string;
  mediaRecebimentoAtualizada: string;
  alertaRecebimento: AlertStatus;
  dadosAtrasados: AlertStatus;
  fichas: FichaData[];
}

const fichaTypes = [
  'Cadastro Domiciliar',
  'Cadastro Individual',
  'Atendimento Individual',
  'Atividade Coletiva',
  'Procedimentos',
  'Vacinação',
  'Visita Domiciliar',
  'Atendimento Domiciliar',
];

const sampleFichas: FichaData[] = fichaTypes.map((tipo, i) => ({
  id: `f${i + 1}`,
  tipoFicha: tipo,
  quantidadeFichas: Math.floor(Math.random() * 500) + 50,
  mediaRecebimento: `${Math.floor(Math.random() * 30) + 1} dias`,
  dataRecebimento: '10/03/2026',
  disponibilizadoPlataforma: i % 3 === 0 ? 'em_atraso' : 'em_dia',
  dadosAtrasados: i % 4 === 0 ? 'em_atraso' : 'em_dia',
}));

const sampleData: RecebimentoData[] = [
  {
    key: '1',
    dataRecebimento: '10/03/2026',
    disponibilizadoPlataforma: '12/03/2026',
    mediaRecebimentoAtualizada: '5 dias',
    alertaRecebimento: 'em_dia',
    dadosAtrasados: 'em_dia',
    fichas: sampleFichas,
  },
  {
    key: '2',
    dataRecebimento: '10/02/2026',
    disponibilizadoPlataforma: '14/02/2026',
    mediaRecebimentoAtualizada: '8 dias',
    alertaRecebimento: 'em_dia',
    dadosAtrasados: 'em_atraso',
    fichas: sampleFichas,
  },
  {
    key: '3',
    dataRecebimento: '10/01/2026',
    disponibilizadoPlataforma: '20/01/2026',
    mediaRecebimentoAtualizada: '15 dias',
    alertaRecebimento: 'em_atraso',
    dadosAtrasados: 'em_atraso',
    fichas: sampleFichas,
  },
  {
    key: '4',
    dataRecebimento: '10/12/2025',
    disponibilizadoPlataforma: '12/12/2025',
    mediaRecebimentoAtualizada: '4 dias',
    alertaRecebimento: 'em_dia',
    dadosAtrasados: 'em_dia',
    fichas: sampleFichas,
  },
  {
    key: '5',
    dataRecebimento: '10/11/2025',
    disponibilizadoPlataforma: '18/11/2025',
    mediaRecebimentoAtualizada: '12 dias',
    alertaRecebimento: 'em_atraso',
    dadosAtrasados: 'em_atraso',
    fichas: sampleFichas,
  },
];

const AlertStatusBadge: React.FC<{ status: AlertStatus; type: 'alerta' | 'dados' }> = ({ status, type }) => {
  const labels = {
    alerta: { em_dia: 'Dentro do prazo', em_atraso: 'Em Atraso' },
    dados: { em_dia: 'Em dia', em_atraso: 'Em atraso' },
  };
  const colors = {
    em_dia: 'bg-[hsl(var(--status-bom))]',
    em_atraso: 'bg-[hsl(var(--status-suficiente))]',
  };

  return (
    <div className="flex items-center gap-2">
      <span className={`w-2 h-2 rounded-full ${colors[status]}`} />
      <span className="text-sm">{labels[type][status]}</span>
    </div>
  );
};

const columns: ColumnsType<RecebimentoData> = [
  {
    title: 'Data de recebimento',
    dataIndex: 'dataRecebimento',
    key: 'dataRecebimento',
    width: '20%',
    render: (text: string) => <span className="font-medium">{text}</span>,
  },
  {
    title: 'Disponibilizado na plataforma',
    dataIndex: 'disponibilizadoPlataforma',
    key: 'disponibilizadoPlataforma',
    width: '20%',
  },
  {
    title: 'Média de recebimento atualizada',
    dataIndex: 'mediaRecebimentoAtualizada',
    key: 'mediaRecebimentoAtualizada',
    width: '20%',
  },
  {
    title: 'Alerta de recebimento',
    dataIndex: 'alertaRecebimento',
    key: 'alertaRecebimento',
    width: '20%',
    render: (status: AlertStatus) => <AlertStatusBadge status={status} type="alerta" />,
  },
  {
    title: 'Dados atrasados',
    dataIndex: 'dadosAtrasados',
    key: 'dadosAtrasados',
    width: '20%',
    render: (status: AlertStatus) => <AlertStatusBadge status={status} type="dados" />,
  },
];

const ExpandedRow: React.FC<{ record: RecebimentoData }> = ({ record }) => {
  return (
    <div className="bg-muted/20 border-t border-border">
      <div className="overflow-x-auto border border-border rounded-md">
        <div className="indicator-grid min-w-[800px]">
          {/* Header row */}
          <div className="indicator-grid-header">
            <div className="indicator-grid-cell font-medium text-muted-foreground">Tipo de Ficha</div>
            <div className="indicator-grid-cell font-medium text-muted-foreground">Quantidade de fichas</div>
            <div className="indicator-grid-cell font-medium text-muted-foreground">Média de recebimento</div>
            <div className="indicator-grid-cell font-medium text-muted-foreground">Data de recebimento</div>
            <div className="indicator-grid-cell font-medium text-muted-foreground">Disponibilizado na plataforma</div>
            <div className="indicator-grid-cell font-medium text-muted-foreground">Dados atrasados</div>
          </div>

          {/* Data rows */}
          {record.fichas.map((ficha) => (
            <div key={ficha.id} className="indicator-grid-row bg-card">
              <div className="indicator-grid-cell font-medium">{ficha.tipoFicha}</div>
              <div className="indicator-grid-cell">{ficha.quantidadeFichas}</div>
              <div className="indicator-grid-cell">{ficha.mediaRecebimento}</div>
              <div className="indicator-grid-cell">{ficha.dataRecebimento}</div>
              <div className="indicator-grid-cell">
                <AlertStatusBadge status={ficha.disponibilizadoPlataforma} type="alerta" />
              </div>
              <div className="indicator-grid-cell">
                <AlertStatusBadge status={ficha.dadosAtrasados} type="dados" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const RecebimentoDeDados: React.FC = () => {
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-foreground">Recebimento de Dados</h1>
      </div>

      <div className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <ClassificationCard classification="bom" count={12} label="Recebimentos em dia" countLabel=" " />
          <ClassificationCard classification="suficiente" count={5} label="Recebimentos em atraso" countLabel=" " />
          <ClassificationCard classification="regular" count={3} label="Dados em atraso" countLabel=" " />
        </div>

        <div className="rounded-lg bg-card p-4 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm text-muted-foreground">
              Total de recebimentos: <strong className="text-foreground">{sampleData.length}</strong>
            </span>
          </div>
          <Table
            columns={columns}
            dataSource={sampleData}
            expandable={{
              defaultExpandedRowKeys: ['1'],
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
        </div>
      </div>
    </div>
  );
};

export default RecebimentoDeDados;
