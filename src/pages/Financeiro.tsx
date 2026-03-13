import React from 'react';
import { PageHeader } from '@/components/layout/PageHeader';
import { InfoCard } from '@/components/financiamento/InfoCard';
import { FAQAccordion } from '@/components/financiamento/FAQAccordion';
import { Wallet, TrendingUp, Calculator } from 'lucide-react';

const faqItems = [
  {
    question: 'De onde vêm os dados financeiros exibidos?',
    answer: 'Os dados são extraídos diretamente do Fundo Nacional de Saúde (FNS) e do e-Gestor, integrando repasses federais com a execução financeira municipal para oferecer uma visão completa do financiamento em saúde.',
  },
  {
    question: 'O que é o simulador de metas e impacto?',
    answer: 'O simulador permite projetar a arrecadação financeira com base na melhoria dos indicadores de saúde do Financiamento APS, como vínculo, acompanhamento e cumprimento de práticas de qualidade.',
  },
  {
    question: 'Como o módulo financeiro se relaciona com o Previne Brasil?',
    answer: 'Os repasses do FNS são calculados com base nos componentes do Previne Brasil (Vínculo e Acompanhamento, Qualidade eSF/eAP, eSB, eMulti). A melhoria nos indicadores impacta diretamente no volume de recursos recebidos.',
  },
  {
    question: 'Qual a periodicidade dos dados?',
    answer: 'Os dados de repasse do FNS são atualizados bimestralmente, acompanhando o ciclo de avaliação do Ministério da Saúde. A evolução histórica permite comparativos mensais e anuais.',
  },
];

const Financeiro: React.FC = () => {
  return (
    <div>
      <PageHeader
        title="Financeiro"
        breadcrumbs={[{ label: 'Financeiro' }]}
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <InfoCard
          icon={<Wallet className="h-6 w-6 text-white" />}
          title="Consolidado"
          description="Visualize todas as entradas e repasses de recurso do Fundo Nacional de Saúde. Acompanhe o total recebido, repassado às equipes, retido e perdido por desempenho."
          links={[
            { label: 'Visão geral', path: '/financeiro/visao-geral?tab=consolidado' },
            { label: 'Relatório', path: '/financeiro/relatorio' },
          ]}
        />
        <InfoCard
          icon={<TrendingUp className="h-6 w-6 text-white" />}
          title="Evolução"
          description="Acompanhe a evolução dos repasses feitos pelo Fundo Nacional de Saúde. Visualize a receita total acumulada e o comparativo mensal por bloco de financiamento."
          links={[
            { label: 'Visão geral', path: '/financeiro/visao-geral?tab=evolucao' },
            { label: 'Relatório', path: '/financeiro/relatorio' },
          ]}
        />
        <InfoCard
          icon={<Calculator className="h-6 w-6 text-white" />}
          title="Simule arrecadação financeira"
          description="Com base nos indicadores de saúde do Financiamento APS faça projeções de arrecadação conforme melhoria no vínculo e acompanhamento e cumprimento de práticas de saúde."
          links={[
            { label: 'Simulador', path: '/financeiro/visao-geral?tab=simulador' },
          ]}
        />
      </div>

      <FAQAccordion items={faqItems} />
    </div>
  );
};

export default Financeiro;
