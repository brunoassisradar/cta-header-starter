import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { PageHeader } from '@/components/layout/PageHeader';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, Tag, Input, Select } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { ArrowLeft, RefreshCw, Download, User, Send as SendIcon, Calendar, Clock } from 'lucide-react';

interface DispatchData {
  key: string;
  nome: string;
  telefone: string;
  classificacao: string;
  situacao: 'Entregue' | 'Erro' | 'Lida' | 'Respondida Completa';
}

const sampleDispatches: DispatchData[] = [
{ key: '1', nome: 'Adriana Luiza Teixeira', telefone: '(47) 99222-3728', classificacao: 'Sem classificação', situacao: 'Entregue' },
{ key: '2', nome: 'Adriano Lima', telefone: '(11) 99121-4313', classificacao: 'Sem WhatsApp', situacao: 'Erro' },
{ key: '3', nome: 'Alair Moura', telefone: '(47) 93189-0033', classificacao: 'Sem WhatsApp', situacao: 'Erro' },
{ key: '4', nome: 'Ana Carolina Silva', telefone: '(48) 99871-4574', classificacao: '-', situacao: 'Lida' },
{ key: '5', nome: 'Alexandre Fernandes Biz Alves', telefone: '(11) 98876-5757', classificacao: '-', situacao: 'Entregue' },
{ key: '6', nome: 'Amanda Lima Scaratt', telefone: '(43) 99979-1485', classificacao: '-', situacao: 'Entregue' },
{ key: '7', nome: 'André Torlucci', telefone: '(48) 99844-8797', classificacao: '-', situacao: 'Respondida Completa' },
{ key: '8', nome: 'André Dias Simoni Nazário', telefone: '(48) 99896-1232', classificacao: '-', situacao: 'Entregue' },
{ key: '9', nome: 'Bruna Machado', telefone: '(21) 99503-9442', classificacao: '-', situacao: 'Entregue' },
{ key: '10', nome: 'Bruno Santos', telefone: '(47) 99957-8257', classificacao: '-', situacao: 'Lida' }];


const campaignData = {
  nome: 'Acompanhamento Pós-AVC T90',
  canal: 'WhatsApp',
  autor: 'Dr. Ricardo Silva',
  destinatarios: 1986,
  criadoEm: '04/01/2025',
  agendadoPara: '2025-01-10 08:00',
  status: 'Concluída',
  publico: ['AVC', 'T90', 'Adulto', 'Internação > 30 dias'],
  descricao: 'Campanha de acompanhamento de pacientes 90 dias após AVC conforme protocolo ICHOM/Anahp.',
  funil: {
    total: 1986,
    enviadas: 1820,
    entregues: 1654,
    lidas: 987,
    interacoes: 423
  },
  engajamento: 21.3
};

const situacaoColorMap: Record<string, string> = {
  Entregue: 'blue',
  Erro: 'red',
  Lida: 'cyan',
  'Respondida Completa': 'purple'
};

const CampanhaDetalhe: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const { funil } = campaignData;
  const maxFunil = funil.total;

  const columns: ColumnsType<DispatchData> = [
  {
    title: 'Destinatário',
    key: 'destinatario',
    render: (_, record) =>
    <div>
          <div className="font-medium text-sm">{record.nome}</div>
          <div className="text-xs text-muted-foreground">{record.telefone}</div>
        </div>

  },
  {
    title: 'Classificação',
    dataIndex: 'classificacao',
    key: 'classificacao'
  },
  {
    title: 'Situação',
    dataIndex: 'situacao',
    key: 'situacao',
    align: 'center',
    render: (situacao: string) =>
    <Tag color={situacaoColorMap[situacao] || 'default'}>{situacao}</Tag>

  },
  {
    title: 'Ação',
    key: 'acao',
    align: 'center',
    render: () =>
    <button className="text-muted-foreground hover:text-foreground transition-colors">
          <Eye className="h-4 w-4" />
        </button>

  }];


  const FunnelBar = ({ label, value }: {label: string;value: number;}) =>
  <div className="flex items-center gap-3">
      <span className="text-sm text-muted-foreground w-24 text-right">{label}</span>
      <div className="flex-1 bg-muted rounded-full h-2.5 overflow-hidden">
        <div
        className="h-full bg-primary rounded-full transition-all"
        style={{ width: `${value / maxFunil * 100}%` }} />
      
      </div>
      <span className="text-sm font-semibold w-14 text-right">{value.toLocaleString()}</span>
    </div>;


  return (
    <div>
      <PageHeader
        title={campaignData.nome}
        breadcrumbs={[
        { label: 'Comunicação', path: '/comunicacao' },
        { label: 'Minhas Comunicações', path: '/comunicacao/minhas-comunicacoes' },
        { label: campaignData.nome }]
        }
        actions={
        <div className="flex items-center gap-2">
            <Tag color="blue">{campaignData.status}</Tag>
            <Button variant="outline" size="sm" className="gap-1.5">
              <RefreshCw className="h-3.5 w-3.5" />
              Atualizar
            </Button>
            <Button variant="outline" size="sm" className="gap-1.5">
              <Download className="h-3.5 w-3.5" />
              Exportar
            </Button>
          </div>
        } />
      

      {/* Campaign meta info */}
      <Card className="p-4 mb-6">
        <div className="flex flex-wrap items-center gap-6 text-sm">
          <div className="flex items-center gap-2">
            <WhatsAppIcon />
            <div>
              <span className="text-muted-foreground text-xs">Canal</span>
              <p className="font-medium">{campaignData.canal}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <User className="h-4 w-4 text-muted-foreground" />
            


            
          </div>
          <div className="flex items-center gap-2">
            <SendIcon className="h-4 w-4 text-muted-foreground" />
            <div>
              <span className="text-muted-foreground text-xs">Qtde Destinatários</span>
              <p className="font-medium">{campaignData.destinatarios.toLocaleString()}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <div>
              <span className="text-muted-foreground text-xs">Criado em</span>
              <p className="font-medium">{campaignData.criadoEm}</p>
            </div>
          </div>
          





          
        </div>
      </Card>

      {/* Público + Funil */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold">Público da campanha</h3>
            <span className="text-xs text-primary cursor-pointer hover:underline">Critérios que selecionam esta campanha</span>
          </div>
          <div className="flex flex-wrap gap-2 mb-4">
            {campaignData.publico.map((tag) =>
            <Tag key={tag}>{tag}</Tag>
            )}
          </div>
          <p className="text-sm text-muted-foreground">{campaignData.descricao}</p>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold">Funil de conversão</h3>
            <span className="text-xs text-muted-foreground">O quanto a campanha está atingindo seus objetivos</span>
          </div>
          <div className="flex gap-6">
            <div className="flex-1 space-y-3">
              <FunnelBar label="Total" value={funil.total} />
              <FunnelBar label="Enviadas" value={funil.enviadas} />
              <FunnelBar label="Entregues" value={funil.entregues} />
              <FunnelBar label="Lidas" value={funil.lidas} />
              <FunnelBar label="Interações" value={funil.interacoes} />
            </div>
            <div className="flex flex-col items-center justify-center min-w-[120px]">
              <span className="text-3xl font-bold text-primary">{campaignData.engajamento}%</span>
              <span className="text-xs text-muted-foreground text-center">Engajamento</span>
              <span className="text-xs text-muted-foreground text-center mt-1">
                {funil.interacoes} pessoas que engajaram com sua campanha
              </span>
            </div>
          </div>
        </Card>
      </div>

      {/* Dispatches table */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-lg font-semibold">Disparos</h2>
            <p className="text-sm text-muted-foreground">Veja todos os disparos realizados</p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="gap-1.5">
              <RefreshCw className="h-3.5 w-3.5" />
              Atualizar
            </Button>
            <Button variant="outline" size="sm" className="gap-1.5">
              <Download className="h-3.5 w-3.5" />
              Exportar
            </Button>
          </div>
        </div>

        <div className="flex gap-3 mb-4">
          <Input.Search placeholder="Pesquisar..." style={{ width: 200 }} />
          <Select
            placeholder="Todas as situações"
            style={{ width: 180 }}
            allowClear
            options={[
            { label: 'Entregue', value: 'Entregue' },
            { label: 'Erro', value: 'Erro' },
            { label: 'Lida', value: 'Lida' },
            { label: 'Respondida Completa', value: 'Respondida Completa' }]
            } />
          
          <Select
            placeholder="Todas as classificações"
            style={{ width: 200 }}
            allowClear
            options={[
            { label: 'Sem classificação', value: 'Sem classificação' },
            { label: 'Sem WhatsApp', value: 'Sem WhatsApp' }]
            } />
          
        </div>

        <Table
          columns={columns}
          dataSource={sampleDispatches}
          pagination={{ pageSize: 10, showSizeChanger: true, showTotal: (total, range) => `${range[0]}-${range[1]} de ${total} disparos` }}
          size="middle" />
        
      </div>
    </div>);

};

const Eye = ({ className }: {className?: string;}) =>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
    <circle cx="12" cy="12" r="3" />
  </svg>;


const WhatsAppIcon = () =>
<svg viewBox="0 0 24 24" className="h-5 w-5 text-green-500" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>;


export default CampanhaDetalhe;