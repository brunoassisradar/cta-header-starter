import React from 'react';
import { PageHeader } from '@/components/layout/PageHeader';
import { InfoCard } from '@/components/financiamento/InfoCard';
import { FAQAccordion } from '@/components/financiamento/FAQAccordion';
import { Link2, BarChart3, FileText } from 'lucide-react';

const faqItems = [
  {
    question: 'O que é e como funciona a importação de dados via "XML"?',
    answer: 'A importação de dados via XML permite que os municípios enviem informações de produção e acompanhamento de forma estruturada para o sistema, garantindo a integração com o SISAB.',
  },
  {
    question: 'Por que estou vendo uma pessoa vinculada a uma equipe à qual ela não pertence?',
    answer: 'Isso pode ocorrer devido a atualizações cadastrais pendentes ou migração de usuários entre equipes. Verifique o cadastro no e-SUS APS.',
  },
  {
    question: 'Quais perfis têm acesso a esse módulo?',
    answer: 'Gestores municipais, coordenadores de Atenção Primária e profissionais com perfil de supervisão têm acesso ao módulo de Financiamento APS.',
  },
  {
    question: 'Como funciona as faixas de resultado dos indicadores de qualidade?',
    answer: 'As faixas são: Ótimo (>75%), Bom (50-75%), Suficiente (25-50%) e Regular (≤25%). O desempenho impacta diretamente no repasse financeiro.',
  },
  {
    question: 'Como altero minha senha?',
    answer: 'Acesse o menu de configurações no canto superior direito e selecione "Alterar senha" para redefinir suas credenciais de acesso.',
  },
];

const FinanciamentoAPS: React.FC = () => {
  return (
    <div>
      <PageHeader
        title="Financiamento APS"
        breadcrumbs={[
          { label: 'Financiamento APS', path: '/financiamento-aps' },
        ]}
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <InfoCard
          icon={<Link2 className="h-6 w-6 text-white" />}
          title="Vínculo e acompanhamento"
          description="Acesse os dados detalhados sobre o cálculo do Componente Vínculo e Acompanhamento Territorial. Com isso, você poderá entender os critérios utilizados e aprimorar os resultados na sua APS."
          links={[
            { label: 'Visão geral', path: '/financiamento-aps/qualidade-esf-eap?tab=vinculo' },
            { label: 'Relatório', path: '/financiamento-aps/qualidade-esf-eap/relatorio?tab=vinculo' },
            { label: 'Individualizado', path: '/financiamento-aps/qualidade-esf-eap/individualizado?tab=vinculo' },
          ]}
        />
        <InfoCard
          icon={<BarChart3 className="h-6 w-6 text-white" />}
          title="Qualidade eSF/eAP"
          description="Acesse os dados detalhados sobre os Indicadores de qualidade. Este módulo avalia aspectos como cobertura, gestão de condições crônicas e imunização. O desempenho dos municípios impacta os repasses financeiros e promove melhorias contínuas."
          links={[
            { label: 'Visão geral', path: '/financiamento-aps/qualidade-esf-eap?tab=qualidade' },
            { label: 'Relatório', path: '/financiamento-aps/qualidade-esf-eap/relatorio?tab=qualidade' },
            { label: 'Individualizado', path: '/financiamento-aps/qualidade-esf-eap/individualizado?tab=qualidade' },
          ]}
        />
        <InfoCard
          icon={<FileText className="h-6 w-6 text-white" />}
          title="Outros componentes"
          description="Este componente é o valor mensal fixo por equipe transferido para os municípios referente a equipes homologadas e válidas. O valor do componente fixo por equipe depende da classificação do município de Equidade e Dimensionamento (IED)."
          links={[]}
        />
      </div>

      <FAQAccordion items={faqItems} />
    </div>
  );
};

export default FinanciamentoAPS;
