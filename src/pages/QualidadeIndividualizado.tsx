import React, { useState, useEffect } from 'react';
import { Table, Button, Tabs, Modal } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { Download, ChevronDown, ChevronRight, HelpCircle } from 'lucide-react';
import { useSearchParams } from 'react-router-dom';
import { PageHeader } from '@/components/layout/PageHeader';
import { FilterBar } from '@/components/financiamento/FilterBar';
import { VinculoIndividualizadoFilterBar } from '@/components/financiamento/VinculoIndividualizadoFilterBar';

// Interface for Qualidade tab
interface PessoaQualidadeData {
  key: string;
  nome: string;
  cpfCns: string;
  equipe: string;
  unidade: string;
  indicadores: string[];
}

// Interface for Vínculo tab
interface PessoaVinculoData {
  key: string;
  nome: string;
  cpfCns: string;
  equipe: string;
  unidade: string;
  criterio: 'idoso' | 'sem_criterio';
  cadastroDomiciliar: boolean;
  cadastroIndividual: boolean;
  acompanhada: boolean;
  microarea: string;
  dataUltimoCadastroIndividual: string | null;
  cadastroIndividualObs: string | null;
  dataUltimoCadastroDomiciliar: string | null;
  cadastroDomiciliarObs: string | null;
  dataUltimaPraticaCuidado: string | null;
  ultimoContatoAssistencial: string | null;
}

// Sample data for Qualidade tab
const qualidadeData: PessoaQualidadeData[] = [
  {
    key: '1',
    nome: 'Maria da Silva Santos',
    cpfCns: '123.456.789-00',
    equipe: 'Equipe 001 - ESF',
    unidade: 'UBS Centro',
    indicadores: ['C2', 'C3'],
  },
  {
    key: '2',
    nome: 'João Pedro Oliveira',
    cpfCns: '987.654.321-00',
    equipe: 'Equipe 002 - ESF',
    unidade: 'UBS Norte',
    indicadores: ['C4'],
  },
  {
    key: '3',
    nome: 'Ana Carolina Ferreira',
    cpfCns: '456.789.123-00',
    equipe: 'Equipe 001 - ESF',
    unidade: 'UBS Centro',
    indicadores: ['C2', 'C5', 'C6'],
  },
  {
    key: '4',
    nome: 'Carlos Eduardo Lima',
    cpfCns: '789.123.456-00',
    equipe: 'Equipe 003 - eAP',
    unidade: 'UBS Sul',
    indicadores: ['C5', 'C6'],
  },
  {
    key: '5',
    nome: 'Fernanda Costa Ribeiro',
    cpfCns: '321.654.987-00',
    equipe: 'Equipe 002 - ESF',
    unidade: 'UBS Norte',
    indicadores: ['C2'],
  },
  {
    key: '6',
    nome: 'Roberto Alves Mendes',
    cpfCns: '654.987.321-00',
    equipe: 'Equipe 001 - ESF',
    unidade: 'UBS Centro',
    indicadores: ['C5'],
  },
  {
    key: '7',
    nome: 'Patrícia Souza Gomes',
    cpfCns: '147.258.369-00',
    equipe: 'Equipe 003 - eAP',
    unidade: 'UBS Sul',
    indicadores: ['C6', 'C7'],
  },
  {
    key: '8',
    nome: 'Marcos Vinícius Pereira',
    cpfCns: '258.369.147-00',
    equipe: 'Equipe 002 - ESF',
    unidade: 'UBS Norte',
    indicadores: ['C3', 'C4', 'C7'],
  },
];

// Sample data for Vínculo tab
const vinculoData: PessoaVinculoData[] = [
  {
    key: '1', nome: 'Maria da Silva Santos', cpfCns: '123.456.789-00', equipe: 'Equipe 001 - ESF', unidade: 'UBS Centro',
    criterio: 'idoso', cadastroDomiciliar: true, cadastroIndividual: true, acompanhada: true,
    microarea: '04', dataUltimoCadastroIndividual: '15/08/2025 por CARAVELAS', cadastroIndividualObs: null,
    dataUltimoCadastroDomiciliar: '20/07/2025 por CARAVELAS', cadastroDomiciliarObs: null,
    dataUltimaPraticaCuidado: '12/01/2026 por Dr. Silva', ultimoContatoAssistencial: '05/02/2026 por Enf. Santos',
  },
  {
    key: '2', nome: 'João Pedro Oliveira', cpfCns: '987.654.321-00', equipe: 'Equipe 002 - ESF', unidade: 'UBS Norte',
    criterio: 'sem_criterio', cadastroDomiciliar: true, cadastroIndividual: false, acompanhada: false,
    microarea: '02', dataUltimoCadastroIndividual: '10/03/2023 (fora do período) por CARAVELAS', cadastroIndividualObs: null,
    dataUltimoCadastroDomiciliar: null, cadastroDomiciliarObs: 'Sem cadastro domiciliar.',
    dataUltimaPraticaCuidado: null, ultimoContatoAssistencial: null,
  },
  {
    key: '3', nome: 'Ana Carolina Ferreira', cpfCns: '456.789.123-00', equipe: 'Equipe 001 - ESF', unidade: 'UBS Centro',
    criterio: 'idoso', cadastroDomiciliar: true, cadastroIndividual: true, acompanhada: true,
    microarea: '01', dataUltimoCadastroIndividual: '22/09/2025 por CARAVELAS', cadastroIndividualObs: null,
    dataUltimoCadastroDomiciliar: '22/09/2025 por CARAVELAS', cadastroDomiciliarObs: null,
    dataUltimaPraticaCuidado: '10/11/2025 por Dr. Lima', ultimoContatoAssistencial: '15/12/2025 por Enf. Costa',
  },
  {
    key: '4', nome: 'Carlos Eduardo Lima', cpfCns: '789.123.456-00', equipe: 'Equipe 003 - eAP', unidade: 'UBS Sul',
    criterio: 'sem_criterio', cadastroDomiciliar: false, cadastroIndividual: true, acompanhada: false,
    microarea: '03', dataUltimoCadastroIndividual: '05/06/2025 por SOCORRO', cadastroIndividualObs: null,
    dataUltimoCadastroDomiciliar: null, cadastroDomiciliarObs: 'Sem cadastro domiciliar.',
    dataUltimaPraticaCuidado: null, ultimoContatoAssistencial: null,
  },
  {
    key: '5', nome: 'Fernanda Costa Ribeiro', cpfCns: '321.654.987-00', equipe: 'Equipe 002 - ESF', unidade: 'UBS Norte',
    criterio: 'idoso', cadastroDomiciliar: true, cadastroIndividual: true, acompanhada: true,
    microarea: '04', dataUltimoCadastroIndividual: '18/07/2025 por PINDORAMA', cadastroIndividualObs: null,
    dataUltimoCadastroDomiciliar: '18/07/2025 por PINDORAMA', cadastroDomiciliarObs: null,
    dataUltimaPraticaCuidado: '20/01/2026 por Dr. Alves', ultimoContatoAssistencial: '28/01/2026 por Enf. Ribeiro',
  },
  {
    key: '6', nome: 'Roberto Alves Mendes', cpfCns: '654.987.321-00', equipe: 'Equipe 001 - ESF', unidade: 'UBS Centro',
    criterio: 'sem_criterio', cadastroDomiciliar: true, cadastroIndividual: true, acompanhada: false,
    microarea: '02', dataUltimoCadastroIndividual: '30/04/2025 por VERSALHES', cadastroIndividualObs: null,
    dataUltimoCadastroDomiciliar: '30/04/2025 por VERSALHES', cadastroDomiciliarObs: null,
    dataUltimaPraticaCuidado: null, ultimoContatoAssistencial: null,
  },
  {
    key: '7', nome: 'Patrícia Souza Gomes', cpfCns: '147.258.369-00', equipe: 'Equipe 003 - eAP', unidade: 'UBS Sul',
    criterio: 'idoso', cadastroDomiciliar: false, cadastroIndividual: false, acompanhada: false,
    microarea: '01', dataUltimoCadastroIndividual: '12/02/2023 (fora do período) por HUMAITA', cadastroIndividualObs: null,
    dataUltimoCadastroDomiciliar: null, cadastroDomiciliarObs: 'Sem cadastro domiciliar.',
    dataUltimaPraticaCuidado: null, ultimoContatoAssistencial: null,
  },
  {
    key: '8', nome: 'Marcos Vinícius Pereira', cpfCns: '258.369.147-00', equipe: 'Equipe 002 - ESF', unidade: 'UBS Norte',
    criterio: 'sem_criterio', cadastroDomiciliar: true, cadastroIndividual: true, acompanhada: true,
    microarea: '03', dataUltimoCadastroIndividual: '14/10/2025 por SOCORRO', cadastroIndividualObs: null,
    dataUltimoCadastroDomiciliar: '14/10/2025 por SOCORRO', cadastroDomiciliarObs: null,
    dataUltimaPraticaCuidado: '22/12/2025 por Dr. Pereira', ultimoContatoAssistencial: '10/01/2026 por Enf. Gomes',
  },
];

// Status dot+label component (matching the pattern used elsewhere)
const StatusDot: React.FC<{ 
  label: string; 
  variant: 'success' | 'error' | 'default' | 'info';
}> = ({ label, variant }) => {
  const dotColors = {
    success: 'bg-[hsl(145,63%,42%)]',
    error: 'bg-[hsl(0,65%,51%)]',
    default: 'bg-muted-foreground',
    info: 'bg-[hsl(200,60%,50%)]',
  };

  return (
    <div className="flex items-center gap-1.5">
      <span className={`w-2 h-2 rounded-full shrink-0 ${dotColors[variant]}`} />
      <span className="text-sm">{label}</span>
    </div>
  );
};

// Columns for Qualidade tab
const qualidadeColumns: ColumnsType<PessoaQualidadeData> = [
  {
    title: 'Nome',
    dataIndex: 'nome',
    key: 'nome',
    width: '25%',
    sorter: (a, b) => a.nome.localeCompare(b.nome),
  },
  {
    title: 'CPF/CNS',
    dataIndex: 'cpfCns',
    key: 'cpfCns',
    width: '15%',
  },
  {
    title: 'Equipe de saúde',
    dataIndex: 'equipe',
    key: 'equipe',
    width: '20%',
    filters: [
      { text: 'Equipe 001 - ESF', value: 'Equipe 001 - ESF' },
      { text: 'Equipe 002 - ESF', value: 'Equipe 002 - ESF' },
      { text: 'Equipe 003 - eAP', value: 'Equipe 003 - eAP' },
    ],
    onFilter: (value, record) => record.equipe === value,
  },
  {
    title: 'Unidade',
    dataIndex: 'unidade',
    key: 'unidade',
    width: '15%',
    filters: [
      { text: 'UBS Centro', value: 'UBS Centro' },
      { text: 'UBS Norte', value: 'UBS Norte' },
      { text: 'UBS Sul', value: 'UBS Sul' },
    ],
    onFilter: (value, record) => record.unidade === value,
  },
  {
    title: 'Indicador',
    dataIndex: 'indicadores',
    key: 'indicadores',
    width: '25%',
    filters: [
      { text: 'C2', value: 'C2' },
      { text: 'C3', value: 'C3' },
      { text: 'C4', value: 'C4' },
      { text: 'C5', value: 'C5' },
      { text: 'C6', value: 'C6' },
      { text: 'C7', value: 'C7' },
    ],
    onFilter: (value, record) => record.indicadores.includes(value as string),
    render: (indicadores: string[]) => (
      <div className="flex flex-wrap gap-1">
        {indicadores.map((ind) => (
          <span
            key={ind}
            className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-muted text-muted-foreground"
          >
            {ind}
          </span>
        ))}
      </div>
    ),
  },
];

// Columns for Vínculo tab
const vinculoColumns: ColumnsType<PessoaVinculoData> = [
  {
    title: 'Nome',
    dataIndex: 'nome',
    key: 'nome',
    width: '22%',
  },
  {
    title: 'CPF/CNS',
    dataIndex: 'cpfCns',
    key: 'cpfCns',
    width: '13%',
  },
  {
    title: 'EQUIPE_WITH_HELP',
    dataIndex: 'equipe',
    key: 'equipe',
    width: '17%',
  },
  {
    title: 'Unidade',
    dataIndex: 'unidade',
    key: 'unidade',
    width: '12%',
  },
  {
    title: 'Critério',
    dataIndex: 'criterio',
    key: 'criterio',
    width: '12%',
    render: (criterio: 'idoso' | 'sem_criterio') => (
      <StatusDot 
        label={criterio === 'idoso' ? 'Idoso' : 'Sem critério'} 
        variant={criterio === 'idoso' ? 'info' : 'default'} 
      />
    ),
  },
  {
    title: 'Cadastro',
    key: 'cadastro',
    width: '14%',
    render: (_, record) => (
      <div className="space-y-1">
        <StatusDot label="Domiciliar" variant={record.cadastroDomiciliar ? 'success' : 'error'} />
        <StatusDot label="Individual" variant={record.cadastroIndividual ? 'success' : 'error'} />
      </div>
    ),
  },
  {
    title: 'ACOMPANHAMENTO_WITH_HELP',
    dataIndex: 'acompanhada',
    key: 'acompanhada',
    width: '10%',
    render: (acompanhada: boolean) => (
      <StatusDot 
        label={acompanhada ? 'Acompanhada' : 'Não acompanhada'} 
        variant={acompanhada ? 'success' : 'error'} 
      />
    ),
  },
];

// Reusable table content component for Qualidade
const QualidadeTableContent: React.FC<{
  expandedRowKeys: string[];
  onExpand: (expanded: boolean, record: PessoaQualidadeData) => void;
}> = ({ expandedRowKeys, onExpand }) => (
  <div className="rounded-lg bg-card p-4 shadow-sm">
    <div className="flex items-center justify-between mb-4">
      <span className="text-sm text-muted-foreground">
        Total de registros: <strong className="text-foreground">{qualidadeData.length}</strong>
      </span>
      <Button icon={<Download className="h-4 w-4" />}>
        Exportar
      </Button>
    </div>

    <Table
      columns={qualidadeColumns}
      dataSource={qualidadeData}
      expandable={{
        expandedRowKeys,
        onExpand,
        expandedRowRender: () => (
          <div className="p-4 bg-muted/30 rounded-md">
            <span className="text-sm text-muted-foreground italic">
              Detalhes do cadastro individual (em desenvolvimento)
            </span>
          </div>
        ),
        expandIcon: ({ expanded, onExpand, record }) => (
          <button
            onClick={(e) => onExpand(record, e)}
            className="p-1 hover:bg-muted rounded transition-colors"
          >
            {expanded ? (
              <ChevronDown className="h-4 w-4 text-muted-foreground" />
            ) : (
              <ChevronRight className="h-4 w-4 text-muted-foreground" />
            )}
          </button>
        ),
      }}
      pagination={{
        pageSize: 10,
        showSizeChanger: true,
        showTotal: (total, range) => `${range[0]}-${range[1]} de ${total} registros`,
      }}
      size="middle"
    />
  </div>
);

// Reusable table content component for Vínculo
const VinculoTableContent: React.FC<{
  expandedRowKeys: string[];
  onExpand: (expanded: boolean, record: PessoaVinculoData) => void;
}> = ({ expandedRowKeys, onExpand }) => {
  const [helpModalOpen, setHelpModalOpen] = useState(false);
  const [vinculosModalOpen, setVinculosModalOpen] = useState(false);

  // Override column titles with help icons
  const columnsWithHelp = vinculoColumns.map(col => {
    if (col.title === 'ACOMPANHAMENTO_WITH_HELP') {
      return {
        ...col,
        title: (
          <div className="flex items-center gap-1.5">
            <span>Acompanhamento</span>
            <button onClick={(e) => { e.stopPropagation(); setHelpModalOpen(true); }} className="text-primary hover:text-primary/80">
              <HelpCircle className="h-3.5 w-3.5" />
            </button>
          </div>
        ),
      };
    }
    if (col.title === 'EQUIPE_WITH_HELP') {
      return {
        ...col,
        title: (
          <div className="flex items-center gap-1.5">
            <span>Equipe de saúde</span>
            <button onClick={(e) => { e.stopPropagation(); setVinculosModalOpen(true); }} className="text-primary hover:text-primary/80">
              <HelpCircle className="h-3.5 w-3.5" />
            </button>
          </div>
        ),
      };
    }
    return col;
  });

  return (
    <div className="rounded-lg bg-card p-4 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <span className="text-sm text-muted-foreground">
          Total de registros: <strong className="text-foreground">{vinculoData.length}</strong>
        </span>
        <Button icon={<Download className="h-4 w-4" />}>
          Exportar
        </Button>
      </div>

      <Modal
        open={helpModalOpen}
        onCancel={() => setHelpModalOpen(false)}
        footer={
          <div className="flex justify-end">
            <Button onClick={() => setHelpModalOpen(false)}>Fechar</Button>
          </div>
        }
        centered
        width={600}
      >
        <div className="flex flex-col items-center pt-4 pb-2">
          <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-4">
            <HelpCircle className="h-8 w-8 text-primary" />
          </div>
          <h3 className="text-lg font-semibold text-foreground mb-4">Acompanhamento</h3>
        </div>
        <div className="space-y-4 text-sm text-foreground">
          <p>
            São consideradas pessoas que tenham mais de um contato assistencial no período de 12 meses anteriores à data de término do quadrimestre e que possuam cadastro vinculado a uma equipe no quadrimestre anterior.
          </p>
          <p>
            Para que o contato assistencial seja válido, é necessário que pelo menos um deles seja <strong>um atendimento, que pode ser individual, coletivo e/ou domiciliar.</strong> Ou seja, dois procedimentos ou vacinas não serão contabilizados se não houver um atendimento.
          </p>
          <p>
            É utilizada como fonte a{' '}
            <a href="#" className="text-primary underline font-medium">Portaria SAPS/MS Nº 161, de 10 de Dezembro de 2024</a>
            {' '}e a{' '}
            <a href="#" className="text-primary underline font-medium">nota metodológica.</a>
          </p>
        </div>
      </Modal>

      <Modal
        open={vinculosModalOpen}
        onCancel={() => setVinculosModalOpen(false)}
        footer={
          <div className="flex justify-end">
            <Button onClick={() => setVinculosModalOpen(false)}>Fechar</Button>
          </div>
        }
        centered
        width={650}
      >
        <div className="flex flex-col items-center pt-4 pb-2">
          <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-4">
            <HelpCircle className="h-8 w-8 text-primary" />
          </div>
          <h3 className="text-lg font-semibold text-foreground mb-4">Vínculos</h3>
        </div>
        <div className="space-y-4 text-sm text-foreground">
          <p>
            O vínculo foi atualizado e será com base na equipe que realizar o cadastro do cidadão e os critérios para desempate são:
          </p>
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className="text-left py-2 px-4 text-sm font-semibold text-foreground w-32">Prioridade</th>
                <th className="text-left py-2 px-4 text-sm font-semibold text-foreground">Situação</th>
              </tr>
            </thead>
            <tbody>
              <tr className="bg-muted/30">
                <td className="py-3 px-4 text-center text-sm font-medium text-primary">1</td>
                <td className="py-3 px-4 text-sm border-l border-border">Equipe em que o usuário apresentar o maior número de atendimentos no período de um ano;</td>
              </tr>
              <tr className="bg-muted/30 mt-1">
                <td className="py-3 px-4 text-center text-sm font-medium text-primary">2</td>
                <td className="py-3 px-4 text-sm border-l border-border">Equipe responsável pelo atendimento mais recente do usuário;</td>
              </tr>
              <tr className="bg-muted/30 mt-1">
                <td className="py-3 px-4 text-center text-sm font-medium text-primary">3</td>
                <td className="py-3 px-4 text-sm border-l border-border">Equipe em que usuário possuir o cadastro mais atualizado, considerando as últimas informações registradas no sistema.</td>
              </tr>
            </tbody>
          </table>
          <p>
            É utilizada como fonte a{' '}
            <a href="#" className="text-primary underline font-medium">Portaria SAPS/MS Nº 161, de 10 de Dezembro de 2024.</a>
          </p>
        </div>
      </Modal>

      <Table
        columns={columnsWithHelp}
        dataSource={vinculoData}
        expandable={{
          expandedRowKeys,
          onExpand,
          expandedRowRender: (record: PessoaVinculoData) => (
            <div className="p-4 bg-muted/20 rounded-md">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Left: Cadastro */}
                <div className="space-y-4">
                  <p className="text-sm text-muted-foreground">Microárea do cidadão: <span className="text-foreground font-medium">{record.microarea}</span></p>
                  
                  <div className="space-y-3">
                    <p className="text-sm font-bold text-foreground">Cadastro:</p>
                    
                    <div>
                      <p className="text-sm font-medium text-foreground/80 italic">Data do último Cadastro Individual:</p>
                      <p className="text-sm text-foreground ml-3">
                        {record.dataUltimoCadastroIndividual || 'Sem cadastro individual.'}
                      </p>
                    </div>

                    <div>
                      <p className="text-sm font-medium text-foreground/80 italic">Data do último Cadastro Domiciliar:</p>
                      <p className="text-sm text-foreground ml-3">
                        {record.dataUltimoCadastroDomiciliar || record.cadastroDomiciliarObs || 'Sem cadastro domiciliar.'}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Right: Acompanhamento */}
                <div className="space-y-3">
                  <p className="text-sm font-bold text-foreground">Acompanhamento (Prática de cuidado + qualquer contato assistencial):</p>
                  
                  <div>
                    <p className="text-sm font-medium text-foreground/80 italic">Data do última prática de cuidado:</p>
                    <p className="text-sm text-foreground ml-3">
                      {record.dataUltimaPraticaCuidado || 'Sem último atendimento.'}
                    </p>
                  </div>

                  <div>
                    <p className="text-sm font-medium text-foreground/80 italic">Último contato assistencial:</p>
                    <p className="text-sm text-foreground ml-3">
                      {record.ultimoContatoAssistencial || 'Sem último contato assistencial.'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ),
          expandIcon: ({ expanded, onExpand, record }) => (
            <button
              onClick={(e) => onExpand(record, e)}
              className="p-1 hover:bg-muted rounded transition-colors"
            >
              {expanded ? (
                <ChevronDown className="h-4 w-4 text-muted-foreground" />
              ) : (
                <ChevronRight className="h-4 w-4 text-muted-foreground" />
              )}
            </button>
          ),
        }}
        pagination={{
          pageSize: 10,
          showSizeChanger: true,
          showTotal: (total, range) => `${range[0]}-${range[1]} de ${total} registros`,
        }}
        size="middle"
      />
    </div>
  );
};

const QualidadeIndividualizado: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [expandedQualidadeKeys, setExpandedQualidadeKeys] = useState<string[]>([]);
  const [expandedVinculoKeys, setExpandedVinculoKeys] = useState<string[]>([]);
  
  // Get initial tab from URL params
  const initialTab = searchParams.get('tab') || 'qualidade';
  const [activeTab, setActiveTab] = useState(initialTab);

  // Update state when URL params change
  useEffect(() => {
    const tabParam = searchParams.get('tab');
    if (tabParam && ['vinculo', 'qualidade'].includes(tabParam)) {
      setActiveTab(tabParam);
    }
  }, [searchParams]);

  const handleQualidadeExpand = (expanded: boolean, record: PessoaQualidadeData) => {
    if (expanded) {
      setExpandedQualidadeKeys([...expandedQualidadeKeys, record.key]);
    } else {
      setExpandedQualidadeKeys(expandedQualidadeKeys.filter(key => key !== record.key));
    }
  };

  const handleVinculoExpand = (expanded: boolean, record: PessoaVinculoData) => {
    if (expanded) {
      setExpandedVinculoKeys([...expandedVinculoKeys, record.key]);
    } else {
      setExpandedVinculoKeys(expandedVinculoKeys.filter(key => key !== record.key));
    }
  };

  const handleTabChange = (key: string) => {
    setActiveTab(key);
    const newParams = new URLSearchParams(searchParams);
    newParams.set('tab', key);
    setSearchParams(newParams, { replace: true });
  };

  const renderQualidadeContent = () => (
    <div className="space-y-6">
      <FilterBar />
      <QualidadeTableContent 
        expandedRowKeys={expandedQualidadeKeys} 
        onExpand={handleQualidadeExpand} 
      />
    </div>
  );

  const renderVinculoContent = () => (
    <div className="space-y-6">
      <VinculoIndividualizadoFilterBar />
      <VinculoTableContent 
        expandedRowKeys={expandedVinculoKeys} 
        onExpand={handleVinculoExpand} 
      />
    </div>
  );

  const tabItems = [
    {
      key: 'vinculo',
      label: 'Vínculo e Acompanhamento',
      children: <div className="pt-4">{renderVinculoContent()}</div>,
    },
    {
      key: 'qualidade',
      label: 'Qualidade eSF/eAP',
      children: <div className="pt-4">{renderQualidadeContent()}</div>,
    },
  ];

  const breadcrumbLabel = activeTab === 'vinculo' ? 'Vínculo e Acompanhamento' : 'Qualidade eSF/eAP';
  const breadcrumbPath = activeTab === 'vinculo' 
    ? '/financiamento-aps/qualidade-esf-eap?tab=vinculo' 
    : '/financiamento-aps/qualidade-esf-eap?tab=qualidade';
  const relatorioPath = activeTab === 'vinculo'
    ? '/financiamento-aps/qualidade-esf-eap/relatorio?tab=vinculo'
    : '/financiamento-aps/qualidade-esf-eap/relatorio?tab=qualidade';

  return (
    <div>
      <PageHeader
        title="Individualizado do Financiamento APS"
        breadcrumbs={[
          { label: 'Financiamento APS', path: '/financiamento-aps' },
          { label: breadcrumbLabel, path: breadcrumbPath },
          { label: 'Relatório', path: relatorioPath },
          { label: 'Individualizado' },
        ]}
      />

      {/* Tabs temporariamente ocultas - serão reativadas no futuro */}
      {/* <Tabs
        activeKey={activeTab}
        onChange={handleTabChange}
        items={tabItems}
        size="large"
        className="financiamento-tabs"
      /> */}
      
      {/* Conteúdo da aba Vínculo (padrão) */}
      <div className="pt-4">{renderVinculoContent()}</div>
    </div>
  );
};

export default QualidadeIndividualizado;
