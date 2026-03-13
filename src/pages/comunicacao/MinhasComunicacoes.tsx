import React from 'react';
import { useNavigate } from 'react-router-dom';
import { PageHeader } from '@/components/layout/PageHeader';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge, Table, Tag } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { Plus, Play, Ban, Archive, Eye, Pencil } from 'lucide-react';

interface CampaignData {
  key: string;
  nome: string;
  participantes: number;
  status: 'Ativa' | 'Encerrada' | 'Arquivada';
  canal: string;
}

const sampleData: CampaignData[] = [
  { key: '1', nome: 'Acompanhamento Pós-AVC T90', participantes: 127, status: 'Ativa', canal: 'WhatsApp' },
  { key: '2', nome: 'Pesquisa NPS Trimestral', participantes: 543, status: 'Ativa', canal: 'WhatsApp' },
  { key: '3', nome: 'Follow-up PROMIS-10 Mensal', participantes: 89, status: 'Ativa', canal: 'WhatsApp' },
  { key: '4', nome: 'Acompanhamento Pós-AVC T30', participantes: 156, status: 'Encerrada', canal: 'WhatsApp' },
  { key: '5', nome: 'Pesquisa Satisfação 2023', participantes: 892, status: 'Arquivada', canal: 'WhatsApp' },
  { key: '6', nome: 'Avaliação NIHSS Inicial', participantes: 45, status: 'Encerrada', canal: 'WhatsApp' },
];

const statusColorMap: Record<string, string> = {
  Ativa: 'green',
  Encerrada: 'orange',
  Arquivada: 'default',
};

const MinhasComunicacoes: React.FC = () => {
  const navigate = useNavigate();

  const ativas = sampleData.filter((c) => c.status === 'Ativa').length;
  const encerradas = sampleData.filter((c) => c.status === 'Encerrada').length;
  const arquivadas = sampleData.filter((c) => c.status === 'Arquivada').length;

  const columns: ColumnsType<CampaignData> = [
    {
      title: 'Nome da Campanha',
      dataIndex: 'nome',
      key: 'nome',
    },
    {
      title: 'Quantidade de Participantes',
      dataIndex: 'participantes',
      key: 'participantes',
      align: 'center',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      align: 'center',
      filters: [
        { text: 'Ativa', value: 'Ativa' },
        { text: 'Encerrada', value: 'Encerrada' },
        { text: 'Arquivada', value: 'Arquivada' },
      ],
      onFilter: (value, record) => record.status === value,
      render: (status: string) => (
        <Tag color={statusColorMap[status]}>{status}</Tag>
      ),
    },
    {
      title: 'Canal',
      dataIndex: 'canal',
      key: 'canal',
      align: 'center',
      render: (canal: string) => (
        <div className="flex items-center justify-center gap-1.5">
          <MessageCircleIcon />
          <span className="text-xs text-muted-foreground">{canal}</span>
        </div>
      ),
    },
    {
      title: 'Ação',
      key: 'acao',
      align: 'center',
      render: (_, record) => (
        <div className="flex items-center justify-center gap-2">
          <button
            onClick={() => navigate(`/comunicacao/campanha/${record.key}`)}
            className="text-muted-foreground hover:text-foreground transition-colors"
            title="Ver campanha"
          >
            <Eye className="h-4 w-4" />
          </button>
          <button
            className="text-muted-foreground hover:text-foreground transition-colors"
            title="Editar campanha"
          >
            <Pencil className="h-4 w-4" />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div>
      <PageHeader
        title="Gestão de Campanhas"
        breadcrumbs={[
          { label: 'Comunicação', path: '/comunicacao' },
          { label: 'Minhas Comunicações' },
        ]}
        actions={
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            Criar nova campanha
          </Button>
        }
      />

      <p className="text-sm text-muted-foreground mb-6 -mt-4">
        Gerencie suas campanhas de acompanhamento de pacientes via WhatsApp
      </p>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <Card className="p-5 border-l-4 border-l-green-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Campanhas Ativas</p>
              <p className="text-3xl font-bold mt-1">{ativas}</p>
            </div>
            <div className="h-10 w-10 rounded-full bg-green-50 flex items-center justify-center">
              <Play className="h-5 w-5 text-green-600" />
            </div>
          </div>
        </Card>
        <Card className="p-5 border-l-4 border-l-orange-400">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Encerradas</p>
              <p className="text-3xl font-bold mt-1">{encerradas}</p>
            </div>
            <div className="h-10 w-10 rounded-full bg-orange-50 flex items-center justify-center">
              <Ban className="h-5 w-5 text-orange-500" />
            </div>
          </div>
        </Card>
        <Card className="p-5 border-l-4 border-l-gray-400">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Arquivadas</p>
              <p className="text-3xl font-bold mt-1">{arquivadas}</p>
            </div>
            <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center">
              <Archive className="h-5 w-5 text-gray-500" />
            </div>
          </div>
        </Card>
      </div>

      {/* Table */}
      <div>
        <h2 className="text-lg font-semibold mb-4">Todas as Campanhas</h2>
        <Table
          columns={columns}
          dataSource={sampleData}
          pagination={{ pageSize: 10, showSizeChanger: true }}
          size="middle"
        />
      </div>
    </div>
  );
};

const MessageCircleIcon = () => (
  <svg viewBox="0 0 24 24" className="h-5 w-5 text-green-500" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

export default MinhasComunicacoes;
