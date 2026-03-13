import React from 'react';
import { Table, Button } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { Download } from 'lucide-react';
import { Link } from 'react-router-dom';

type Classification = 'otimo' | 'bom' | 'suficiente' | 'regular';

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

const ClassificationCell: React.FC<{ classification: Classification; nota?: number }> = ({ classification, nota }) => (
  <div className="flex items-center gap-2">
    <span className={`w-2 h-2 rounded-full ${statusColors[classification]}`} />
    <span className="text-sm">
      {nota !== undefined ? `${statusLabels[classification]} | ${nota}` : statusLabels[classification]}
    </span>
  </div>
);
interface VinculoData {
  key: string;
  equipeSaude: string;
  unidade: string;
  ine: string;
  cnes: string;
  dimensaoCadastro: Classification;
  dimensaoAcompanhamento: Classification;
  resultadoFinalNota: number;
  resultadoFinal: Classification;
}

const statusFilters = [
  { text: 'Ótimo', value: 'otimo' },
  { text: 'Bom', value: 'bom' },
  { text: 'Suficiente', value: 'suficiente' },
  { text: 'Regular', value: 'regular' },
];

const sampleData: VinculoData[] = [
  { key: '1', equipeSaude: 'Equipe 001 - ESF', unidade: 'Uaps Anisio Teixeira', ine: '0000123456', cnes: '2529181', dimensaoCadastro: 'otimo', dimensaoAcompanhamento: 'regular', resultadoFinalNota: 4.75, resultadoFinal: 'regular' },
  { key: '2', equipeSaude: 'Equipe 002 - ESF', unidade: 'Uaps Vicentina Campos', ine: '0000234567', cnes: '2529203', dimensaoCadastro: 'otimo', dimensaoAcompanhamento: 'regular', resultadoFinalNota: 4.75, resultadoFinal: 'regular' },
  { key: '3', equipeSaude: 'Equipe 003 - eAP', unidade: 'Uaps Gutemberg Braun', ine: '0000345678', cnes: '2482282', dimensaoCadastro: 'bom', dimensaoAcompanhamento: 'regular', resultadoFinalNota: 4, resultadoFinal: 'regular' },
  { key: '4', equipeSaude: 'Equipe 004 - ESF', unidade: 'Uaps Fausto Freire', ine: '0000456789', cnes: '9686479', dimensaoCadastro: 'otimo', dimensaoAcompanhamento: 'regular', resultadoFinalNota: 4.75, resultadoFinal: 'regular' },
  { key: '5', equipeSaude: 'Equipe 005 - ESF', unidade: 'Uaps Helio Goes', ine: '0000567890', cnes: '2529211', dimensaoCadastro: 'regular', dimensaoAcompanhamento: 'regular', resultadoFinalNota: 2.5, resultadoFinal: 'regular' },
  { key: '6', equipeSaude: 'Equipe 006 - eAP', unidade: 'Uaps Licinio Nunes de Miranda', ine: '0000678901', cnes: '9129553', dimensaoCadastro: 'otimo', dimensaoAcompanhamento: 'regular', resultadoFinalNota: 4.75, resultadoFinal: 'regular' },
  { key: '7', equipeSaude: 'Equipe 007 - ESF', unidade: 'Uaps Pontes Neto', ine: '0000789012', cnes: '9006052', dimensaoCadastro: 'otimo', dimensaoAcompanhamento: 'regular', resultadoFinalNota: 4.75, resultadoFinal: 'regular' },
  { key: '8', equipeSaude: 'Equipe 008 - ESF', unidade: 'Uaps Fernandes Tavora', ine: '0000890123', cnes: '2528819', dimensaoCadastro: 'bom', dimensaoAcompanhamento: 'regular', resultadoFinalNota: 4, resultadoFinal: 'regular' },
  { key: '9', equipeSaude: 'Equipe 009 - eAP', unidade: 'Uaps Virgilio Tavora', ine: '0000901234', cnes: '2415585', dimensaoCadastro: 'otimo', dimensaoAcompanhamento: 'regular', resultadoFinalNota: 4.75, resultadoFinal: 'regular' },
  { key: '10', equipeSaude: 'Equipe 010 - ESF', unidade: 'Uaps Cdfam Gilmario Teixeira', ine: '0001012345', cnes: '0407836', dimensaoCadastro: 'regular', dimensaoAcompanhamento: 'regular', resultadoFinalNota: 2.5, resultadoFinal: 'regular' },
];

const columns: ColumnsType<VinculoData> = [
  {
    title: 'Equipe de Saúde',
    dataIndex: 'equipeSaude',
    key: 'equipeSaude',
    width: '15%',
    render: (text: string) => <span className="font-medium">{text}</span>,
  },
  {
    title: 'INE',
    dataIndex: 'ine',
    key: 'ine',
    width: '10%',
  },
  {
    title: 'CNES',
    dataIndex: 'cnes',
    key: 'cnes',
    width: '10%',
  },
  {
    title: 'Dimensão cadastro',
    dataIndex: 'dimensaoCadastro',
    key: 'dimensaoCadastro',
    width: '13%',
    render: (status: Classification) => <ClassificationCell classification={status} />,
  },
  {
    title: 'Dimensão acompanhamento',
    dataIndex: 'dimensaoAcompanhamento',
    key: 'dimensaoAcompanhamento',
    width: '13%',
    render: (status: Classification) => <ClassificationCell classification={status} />,
  },
  {
    title: 'Resultado final',
    key: 'resultadoFinal',
    width: '13%',
    render: (_: unknown, record: VinculoData) => (
      <ClassificationCell classification={record.resultadoFinal} nota={record.resultadoFinalNota} />
    ),
  },
  {
    title: 'Ação',
    key: 'acao',
    width: '11%',
    render: (_: unknown, record: VinculoData) => (
      <div className="flex gap-2">
        <Link to={`/financiamento-aps/qualidade-esf-eap/relatorio?tab=vinculo&equipe=${record.key}`}>
          <Button type="default" size="small">Relatório</Button>
        </Link>
        <Link to={`/financiamento-aps/qualidade-esf-eap/individualizado?tab=vinculo&equipe=${record.key}`}>
          <Button type="default" size="small">Individualizado</Button>
        </Link>
      </div>
    ),
  },
];

export const VinculoAcompanhamentoTable: React.FC = () => {
  return (
    <div className="rounded-lg bg-card p-4 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <span className="text-sm text-muted-foreground">
          Total de equipes: <strong className="text-foreground">{sampleData.length}</strong>
        </span>
        <Button icon={<Download className="h-4 w-4" />}>Exportar equipes</Button>
      </div>
      <Table
        columns={columns}
        dataSource={sampleData}
        pagination={{
          showSizeChanger: true,
          showTotal: (total, range) => `${range[0]}-${range[1]} de ${total} equipes`,
          pageSizeOptions: ['10', '20', '50'],
          defaultPageSize: 10,
        }}
        size="middle"
        scroll={{ x: 1200 }}
      />
    </div>
  );
};
