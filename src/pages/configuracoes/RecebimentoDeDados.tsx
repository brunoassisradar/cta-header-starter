import React from 'react';
import { Table, Select, Button, DatePicker } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { ChevronDown, ChevronRight, Calendar, Clock, BarChart3, Bell } from 'lucide-react';

const { RangePicker } = DatePicker;

type AlertStatus = 'em_dia' | 'em_atraso' | 'em_processamento';

interface FichaData {
  id: string;
  tipoFicha: string;
  quantidadeFichas: number;
  mediaRecebimento: string;
  dataRecebimento: string;
  disponibilizadoPlataforma: string | null;
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
  disponibilizadoPlataforma: i % 3 === 0 ? null : '12/03/2026',
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

const StatusWithDate: React.FC<{ date: string }> = ({ date }) => (
  <div className="flex items-center gap-2">
    <span className="w-2 h-2 rounded-full bg-[hsl(var(--status-bom))]" />
    <span className="text-sm">{date}</span>
  </div>
);

const ProcessingStatus: React.FC = () => (
  <div className="flex items-center gap-2">
    <span className="w-2 h-2 rounded-full bg-muted-foreground/40" />
    <span className="text-sm">Em processamento</span>
  </div>
);

const AlertStatusBadge: React.FC<{ status: AlertStatus; type: 'alerta' | 'dados' }> = ({ status, type }) => {
  const labels = {
    alerta: { em_dia: 'Dentro do prazo', em_atraso: 'Em Atraso', em_processamento: 'Em processamento' },
    dados: { em_dia: 'Em dia', em_atraso: 'Em atraso', em_processamento: 'Em processamento' },
  };
  const colors = {
    em_dia: 'bg-[hsl(var(--status-bom))]',
    em_atraso: 'bg-[hsl(var(--status-suficiente))]',
    em_processamento: 'bg-muted-foreground/40',
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
    render: (date: string) => <StatusWithDate date={date} />,
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
          <div className="indicator-grid-header">
            <div className="indicator-grid-cell font-medium text-muted-foreground">Tipo de Ficha</div>
            <div className="indicator-grid-cell font-medium text-muted-foreground">Quantidade de fichas</div>
            <div className="indicator-grid-cell font-medium text-muted-foreground">Média de recebimento</div>
            <div className="indicator-grid-cell font-medium text-muted-foreground">Data de recebimento</div>
            <div className="indicator-grid-cell font-medium text-muted-foreground">Disponibilizado na plataforma</div>
            <div className="indicator-grid-cell font-medium text-muted-foreground">Dados atrasados</div>
          </div>

          {record.fichas.map((ficha) => (
            <div key={ficha.id} className="indicator-grid-row bg-card">
              <div className="indicator-grid-cell font-medium">{ficha.tipoFicha}</div>
              <div className="indicator-grid-cell">{ficha.quantidadeFichas}</div>
              <div className="indicator-grid-cell">{ficha.mediaRecebimento}</div>
              <div className="indicator-grid-cell">{ficha.dataRecebimento}</div>
              <div className="indicator-grid-cell">
                {ficha.disponibilizadoPlataforma ? (
                  <StatusWithDate date={ficha.disponibilizadoPlataforma} />
                ) : (
                  <ProcessingStatus />
                )}
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

const InfoCard: React.FC<{ icon: React.ReactNode; label: string; value: string; borderColor?: string }> = ({ icon, label, value, borderColor }) => (
  <div className={`flex items-center gap-3 rounded-lg bg-card p-4 shadow-sm border-l-4 ${borderColor || 'border-border'}`}>
    <div className="text-muted-foreground">{icon}</div>
    <div>
      <p className="text-sm text-muted-foreground font-medium">{label}</p>
      <p className="text-base font-semibold text-foreground">{value}</p>
    </div>
  </div>
);

const RecebimentoDeDados: React.FC = () => {
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-foreground">Recebimento de Dados</h1>
      </div>

      <div className="space-y-6">
        {/* Filter Bar */}
        <div className="rounded-lg bg-card p-4 shadow-sm space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-foreground">Período de Recebimento</label>
              <RangePicker
                format="DD/MM/YYYY"
                placeholder={['Data inicial', 'Data final']}
                style={{ width: '100%' }}
              />
            </div>
          </div>
          <div className="flex items-center justify-end">
            <div className="flex items-center gap-2">
              <Button>Limpar filtros</Button>
              <Button type="primary">Buscar</Button>
            </div>
          </div>
        </div>

        {/* Info Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <InfoCard
            icon={<Calendar className="h-5 w-5" />}
            label="Última data de recebimento:"
            value="13/01/2026"
            borderColor="border-[hsl(var(--status-bom))]"
          />
          <InfoCard
            icon={<Clock className="h-5 w-5" />}
            label="Último recebimento:"
            value="Há 1 dia"
            borderColor="border-[hsl(var(--status-bom))]"
          />
          <InfoCard
            icon={<BarChart3 className="h-5 w-5" />}
            label="Média intervalo recebimento:"
            value="5,69"
            borderColor="border-[hsl(var(--status-bom))]"
          />
          <InfoCard
            icon={<Bell className="h-5 w-5" />}
            label="Alerta de recebimento:"
            value="Dentro do Padrão"
            borderColor="border-[hsl(var(--status-bom))]"
          />
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
